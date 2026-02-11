import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import socket from "../socket";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import api from "../api/axios";
import { setPoliciesAccepted } from "../slices/userSlice";
import { FiCheckCircle, FiFileText } from "react-icons/fi";

const Layout = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [policyData, setPolicyData] = useState(null);
  const [accepting, setAccepting] = useState(false);

  useEffect(() => {
    if (user && user.acceptPolicies === false) {
       fetchPolicy();
    }
  }, [user]);

  const fetchPolicy = async () => {
    try {
      const res = await api.get("/policy");
      if (res.data && res.data.policyUrl) {
         setPolicyData(res.data);
         setShowPolicyModal(true);
      }
    } catch (err) {
      console.error("Failed to fetch policy", err);
    }
  };

  const handleAccept = async () => {
    if (!user?._id) return;
    try {
      setAccepting(true);
      await api.post(`/policy/accept-policies/${user._id}`);
      dispatch(setPoliciesAccepted());
      setShowPolicyModal(false); // Close immediately
      toast.success("Policy accepted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to accept policy.");
    } finally {
      setAccepting(false);
    }
  };

  const API_BASE_URL = api.defaults.baseURL ? api.defaults.baseURL.replace("/api", "") : "http://localhost:9000";
  const getFullFileUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    return `${API_BASE_URL}/${cleanPath.replace(/\\/g, "/")}`;
  };

  useEffect(() => {
    const handleNewMail = (mail) => {
      if (location.pathname !== "/mail") {
        toast.info(`New message from ${mail.senderName}: ${mail.subject}`, {
          icon: "✉️",
          style: { borderRadius: "12px", fontWeight: "bold" }
        });
      }
    };

    socket.on("newMail", handleNewMail);

    return () => {
      socket.off("newMail", handleNewMail);
    };
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      <Sidebar />
      <main className="w-full flex-1 overflow-auto pt-14 p-0 lg:p-8 ms-0 lg:ms-65">
        <div className="min-h-screen">
          <Outlet />
        </div>
      </main>

     
      {showPolicyModal && policyData && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden animate-fade-in-up">
            
        
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <span className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                    <FiFileText size={24} />
                  </span>
                  Policy Update Required
                </h2>
                <p className="text-gray-500 mt-1 text-sm ml-14">
                  Please review and accept the updated company policies to continue.
                </p>
              </div>
            </div>

            <div className="flex-1 bg-gray-100 p-1 overflow-hidden relative">
               <embed 
                 src={`${getFullFileUrl(policyData.policyUrl)}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                 type="application/pdf"
                 className="w-full h-full rounded-md bg-white border border-gray-200"
                 title="Policy Document"
               />
            </div>

          
            <div className="p-4 border-t border-gray-100 bg-white flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-500">
                By clicking Accept, you acknowledge that you have read and agreed to the policy.
              </div>
              <button
                onClick={handleAccept}
                disabled={accepting}
                className={`px-8 py-3 rounded-xl font-bold border border-gray-200 flex items-center gap-2 transform transition-all active:scale-95 ${
                   accepting 
                     ? "bg-[#2C3EA1] text-white cursor-not-allowed" 
                     : "bg-[#2C3EA1] text-white hover:bg-[#2C3EA1]"
                }`}
              >
                {accepting ? "Processing..." : (
                  <>
                    <FiCheckCircle size={20} />
                    I Accept & Continue
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
