export default function LeaveForm({ open, onClose }) {
    if (!open) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 z-[999]"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="fixed top-0 right-0 h-screen w-[550px] bg-white z-[1000] shadow-xl p-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-sm">Request Leave</h3>
                    <button onClick={onClose}>✕</button>
                </div>

                {/* Form */}
                <form className="space-y-4">
                    <div>
                        <label className="text-xs text-gray-500">
                            Select Type of Leave you want to apply
                        </label>
                        <select className="w-full border rounded p-2 mt-1">
                            <option>Select</option>
                            <option>Short Leave</option>
                            <option>Half Day</option>
                            <option>Full Day</option>
                        </select>
                    </div>
                    <div className="flex justify-between">
                        <label className="text-xs text-gray-500">
                            From
                        </label>
                        
                        <label className="text-xs text-gray-500">
                            To
                        </label>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="border px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-[#2C3EA1] text-white px-4 py-2 rounded"
                        >
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
