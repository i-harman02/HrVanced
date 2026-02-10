import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../../api/axios";
import { FiUpload, FiFileText, FiTrash2, FiDownload } from "react-icons/fi";

const Privacy = () => {
  const { user } = useSelector((state) => state.user);
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Form State
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // For previewing selected PDF
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");

  const isAdmin = user?.role === "admin" || user?.role === "superadmin";

  const API_BASE_URL = api.defaults.baseURL ? api.defaults.baseURL.replace("/api", "") : "http://localhost:9000";

  useEffect(() => {
    fetchPolicy();
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl); 
    };
  }, []);

  const fetchPolicy = async () => {
    try {
      setLoading(true);
      const res = await api.get("/policy");
      if (res.data && !res.data.message && res.data._id) {
         setPolicy(res.data);
         setHeading(res.data.heading || "");
         setDescription(res.data.description || "");
      } else {
        setPolicy(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Create a preview URL for the PDF
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const handleSave = async (e) => {
     e.preventDefault();
     if (!file && !policy) {
       alert("Please select a file to upload.");
       return;
     }

     try {
       setUploading(true);
       let policyUrl = policy?.policyUrl;

       // 1. Upload File if selected
       if (file) {
         const formData = new FormData();
         formData.append("file", file);
         const uploadRes = await api.post("/image/file-upload", formData, {
           headers: { "Content-Type": "multipart/form-data" }
         });
         policyUrl = uploadRes.data.imagePath; 
       }

       const payload = {
         heading: heading || "Privacy Policy",
         description: description || "",
         policyUrl
       };

       if (policy?._id) {
         await api.put(`/policy/${policy._id}`, payload);
       } else {
         await api.post("/policy", payload);
       }
       
       setFile(null);
       if (previewUrl) {
         URL.revokeObjectURL(previewUrl);
         setPreviewUrl(null);
       }
       fetchPolicy();
       alert("Policy updated successfully!");

     } catch (err) {
       console.error(err);
       alert("Failed to save policy. " + (err.response?.data?.message || err.message));
     } finally {
       setUploading(false);
     }
  };

  const handleDelete = async () => {
    if(!window.confirm("Are you sure you want to delete this policy?")) return;
    try {
      await api.delete(`/policy/${policy._id}`);
      setPolicy(null);
      setHeading("");
      setDescription("");
      setFile(null);
      setPreviewUrl(null);
      alert("Policy deleted.");
    } catch(err) {
      console.error(err);
      alert("Failed to delete policy.");
    }
  }

  const getFullFileUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    return `${API_BASE_URL}/${cleanPath.replace(/\\/g, "/")}`;
  };

  
  const displayUrl = previewUrl || (policy?.policyUrl ? getFullFileUrl(policy.policyUrl) : null);

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-white border border-gray-200 lg:rounded min-h-full flex flex-col">
      <div className="mb-6 flex justify-between items-end">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Privacy Policy</h1>
           <p className="text-gray-500 text-sm mt-1">View and manage company privacy policies.</p>
        </div>
        {isAdmin && policy && (
           <button 
             onClick={handleDelete}
             className="text-red-500 hover:text-red-700 p-2 flex items-center gap-2 text-sm font-medium"
           >
             <FiTrash2 size={16} /> Delete Policy
           </button>
        )}
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading policy...</div>
      ) : (
        <div className="space-y-8">
          
          {/* Document Viewer (Shows Saved Policy OR Live Preview) */}
          {(displayUrl) ? (
            <div className="border border-gray-200 rounded-xl p-1 bg-gray-50">
               {/* Show heading/desc only if not previewing new file (or show new heading?) */}
               {(!previewUrl && policy) && (
                 <div className="p-4 pb-2">
                    <h2 className="text-lg font-bold text-gray-800">{policy.heading}</h2>
                    {policy.description && <p className="text-gray-600 text-sm mt-1">{policy.description}</p>}
                 </div>
               )}
               {previewUrl && (
                  <div className="p-2 bg-indigo-50 text-indigo-700 text-sm font-medium text-center mb-1 rounded">
                    Preview Mode: Saving will apply this document.
                  </div>
               )}
              <iframe 
                src={displayUrl} 
                className="w-full h-[800px] border border-gray-200 rounded-lg bg-white"
                title="Privacy Policy Document"
              />
            </div>
          ) : (
             !isAdmin && (
              <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500">No active policy found.</p>
              </div>
             )
          )}

          {/* Admin Upload/Edit Form */}
          {isAdmin && (
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                {policy ? "Update Policy" : "Upload New Policy"}
              </h3>
              
              <form onSubmit={handleSave} className="max-w-3xl space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Policy Heading</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="e.g. Employee Privacy Agreement"
                        value={heading}
                        onChange={(e) => setHeading(e.target.value)}
                      />
                   </div>
                   {/* Description is optional and often redundant with PDF content, kept minimal */}
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Internal Note / Description (Optional)</label>
                      <input 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="Short description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                   </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Policy File (PDF)</label>
                  
                  {!file ? (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FiUpload className="w-8 h-8 mb-3 text-gray-400" />
                        <p className="text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PDF only (MAX. 10MB)</p>
                      </div>
                      <input 
                        type="file" 
                        accept="application/pdf"
                        className="hidden" 
                        onChange={handleFileChange}
                      />
                    </label>
                  ) : (
                    <div className="flex items-center justify-between w-full p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="p-2 bg-white rounded border border-gray-200 text-red-500">
                           <FiFileText size={24} />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-sm font-medium text-gray-700 truncate">{file.name}</span>
                          <span className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setFile(null);
                          setPreviewUrl(null);
                        }}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        title="Remove file"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    disabled={uploading || (!file && !policy)}
                    className={`bg-[#2C3EA1] rounded px-4 py-2 text-sm text-white hover:bg-[#24338a] flex gap-2 items-center ${
                      uploading || (!file && !policy)
                        ? "bg-[#2C3EA1] text-gray-500 cursor-not-allowed"
                        : "bg-[#2C3EA1] text-white hover:bg-[#24338a]"
                    }`}
                  >
                    {uploading ? "Uploading..." : "Save Policy"}
                    {!uploading && <FiUpload />}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Privacy;
