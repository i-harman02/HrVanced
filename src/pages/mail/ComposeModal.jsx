import React, { useState } from "react";
import api from "../../api/axios";

const ComposeModal = ({ onClose, onSent }) => {
  const [form, setForm] = useState({
    receiverId: "",
    subject: "",
    body: ""
  });
  const [loading, setLoading] = useState(false);

  const sendMail = async () => {
    try {
      setLoading(true);
      const res = await api.post("/message/send", form);
      onSent(res.data);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to send mail");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl p-6">
        <h2 className="text-lg font-bold mb-4">New Message</h2>

        <input
          placeholder="Receiver User ID"
          className="border w-full p-2 mb-3 rounded"
          value={form.receiverId}
          onChange={(e) =>
            setForm({ ...form, receiverId: e.target.value })
          }
        />

        <input
          placeholder="Subject"
          className="border w-full p-2 mb-3 rounded"
          value={form.subject}
          onChange={(e) =>
            setForm({ ...form, subject: e.target.value })
          }
        />

        <textarea
          placeholder="Message"
          rows={4}
          className="border w-full p-2 mb-4 rounded"
          value={form.body}
          onChange={(e) =>
            setForm({ ...form, body: e.target.value })
          }
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm">
            Cancel
          </button>
          <button
            onClick={sendMail}
            disabled={loading}
            className="bg-primary text-white px-4 py-2 rounded text-sm"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComposeModal;
