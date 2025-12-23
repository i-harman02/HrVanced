export default function LeaveHistory() {
    const data = [
        { title: "Full day Leave", description: "I would like to request leave as I need to attend to some personal work and will be unavailable on that day.", date: "01 Jan, 2026" },
        { title: "Full day Leave", description: "I will be out of station due to personal reasons and request leave for the mentioned date.", date: "01 Feb, 2026" },
        { title: "Full day Leave", description: "I need to take leave to accompany a family member for a medical checkup.", date: "01 Mar, 2026" },
        { title: "Full day Leave", description: "I am not feeling well and would like to take a day off to rest and recover.", date: "01 Apr, 2026" },
        { title: "Full day Leave", description: "I request leave due to a family commitment that requires my presence.", date: "01 May, 2026" },
    ]
    return (
        <>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="text-sm font-semibold">Leave History</h3>
     
                <div className="space-y-4 text-sm">
                    {data.map((item, i) => (
                        <div key={i} >
                            <span>{item.title}</span>
                            <p>{item.description}</p>
                            <span text-gray-400 text-xs>{item.date}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}