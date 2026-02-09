import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import { FiX, FiSend, FiUser, FiUsers, FiType, FiFileText } from "react-icons/fi";
import { useSelector } from "react-redux";

const ComposeModal = ({ onClose, onSent }) => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    receiverId: "",
    subject: "",
    body: "",
    isGroup: false,
    groupId: "GROUP_ALL"
  });
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector(state => state.user.user);

  // Identify team context for group posting
  const userId = currentUser?._id || currentUser?.id;
  const teamId = currentUser?.tl || userId; // Simplified for selection

  useEffect(() => {
    api.get("/employee/list")
      .then(res => setEmployees(res.data.filter(emp => emp._id !== userId)))
      .catch(err => console.error("Failed to fetch employees", err));
  }, [userId]);

  const sendMail = async (e) => {
    e.preventDefault();
    if (!form.isGroup && (!form.receiverId || !form.subject)) {
      alert("Please select a recipient and subject.");
      return;
    }
    if (!form.body.trim()) {
      alert("Message body cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/message/send", form);
      if (onSent) onSent(res.data);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to transmit data node.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-6 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col h-fit max-h-[90vh]">
   
        <div className="px-10 py-8 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tighter uppercase leading-none mb-1">New Communication</h2>
            <p className="text-[10px] text-[#2C3EA1] font-black uppercase tracking-[0.2em]">Secure Data Node Creation</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-xl text-gray-400 transition-all">
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={sendMail} className="flex-1 overflow-y-auto p-10 space-y-8 ">
        
          <div className="flex gap-4">
             <button
               type="button"
               onClick={() => setForm({ ...form, isGroup: false })}
               className={`flex-1 h-14 rounded border text-[11px] font-black uppercase tracking-[0.1em] transition-all flex items-center justify-center gap-3 ${!form.isGroup ? "bg-[#2C3EA1] text-white  shadow-indigo-100" : "bg-white text-gray-400 border-gray-100 hover:border-indigo-100"}`}
             >
               <FiUser size={16} /> Direct Link
             </button>
             <button
               type="button"
               onClick={() => setForm({ ...form, isGroup: true, groupId: "GROUP_ALL" })}
               className={`flex-1 h-14 rounded border text-[11px] font-black uppercase tracking-[0.1em] transition-all flex items-center justify-center gap-3 ${form.isGroup ? "bg-[#2C3EA1] text-white border-indigo-600  shadow-indigo-100" : "bg-white text-gray-400 border-gray-100 hover:border-indigo-100"}`}
             >
               <FiUsers size={16} /> Group Post
             </button>
          </div>

          <div className="space-y-6">
            {!form.isGroup ? (
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-1 space-y-2">
                  <label className="text-[10px]  text-gray-800 uppercase tracking-widest  ml-1">To Representative</label>
                  <select
                    required
                    className="w-full h-12 bg-gray-50 border border-gray-100 rounded px-4 text-xs font-bold outline-none   transition-all appearance-none"
                    value={form.receiverId}
                    onChange={(e) => setForm({ ...form, receiverId: e.target.value })}
                  >
                    <option value="">Select Target...</option>
                    {employees.map(emp => (
                      <option key={emp._id} value={emp._id}>{emp.name} {emp.lastName}</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-1 space-y-2">
                  <label className="text-[10px]  text-gray-800 uppercase tracking-widest italic ml-1">Subject Vector</label>
                  <input
                    required
                    placeholder="Enter subject"
                    className="w-full h-12 bg-gray-50 border border-gray-100 rounded px-4 text-xs font-bold outline-none   transition-all placeholder:text-gray-300"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-[10px]  text-gray-400 uppercase tracking-widest  ml-1">Broadcast Channel</label>
                <select
                  required
                  className="w-full h-12 bg-indigo-50 border border-indigo-100 rounded px-4 text-xs font-black text-indigo-600 outline-none  transition-all appearance-none"
                  value={form.groupId}
                  onChange={(e) => setForm({ ...form, groupId: e.target.value })}
                >
                  <option value="GROUP_ALL">General (All Members)</option>
                  {teamId && <option value={`TEAM_${teamId}`}>My Department Team</option>}
                </select>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] text-gray-800 uppercase tracking-widest  ml-1">Payload Content</label>
              <textarea
                required
                placeholder="Initialize message stream..."
                rows={6}
                className="w-full bg-gray-50 border border-gray-100 rounded p-6 text-sm font-semibold outline-none  transition-all resize-none placeholder:text-gray-300 leading-relaxed"
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-6 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-8 h-10 text-[10px] font-medium border border-gray-200 rounded text-gray-800 uppercase tracking-widest hover:text-red-400 transition-colors"
            >
              Discard Node
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#2C3EA1] text-white px-12 h-10 rounded text-[11px] uppercase tracking-[0.2em]  hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-50"
            >
              {loading ? "Transmitting..." : (
                <>
                  Connect Stream
                  <FiSend size={18} className="translate-x-1 -translate-y-0.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default ComposeModal;
