export default function LeaveHistory() {
    const data = [
        {
            title: "Full day Leave",
            description:
                "I would like to request leave as I need to attend to some personal work and will be unavailable on that day.",
            date: "01 Jan, 2026",
        },
        {
            title: "Full day Leave",
            description:
                "I will be out of station due to personal reasons and request leave for the mentioned date.",
            date: "01 Feb, 2026",
        },
        {
            title: "Full day Leave",
            description:
                "I need to take leave to accompany a family member for a medical checkup.",
            date: "01 Mar, 2026",
        },
        {
            title: "Full day Leave",
            description:
                "I am not feeling well and would like to take a day off to rest and recover.",
            date: "01 Apr, 2026",
        },
        {
            title: "Full day Leave",
            description:
                "I request leave due to a family commitment that requires my presence.",
            date: "01 May, 2026",
        },
    ];

    return (
        <>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="text-sm font-semibold mb-4">Leave History</h3>

                <div className="relative">
                    {data.map((item, i) => (
                        <div
                            key={i}
                            className="relative flex gap-3 pb-6 last:pb-0"
                        >
                            {/* Vertical line */}
                            {i !== data.length - 1 && (
                                <span className="absolute left-[5px] top-4 h-full w-px bg-gray-200" />
                            )}

                            {/* Timeline dot */}
                            <span className="relative z-10 mt-1.5 h-3 w-3 rounded-full border border-gray-300 bg-white" />

                            {/* Content */}
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <p className="text-sm font-medium text-gray-900">
                                        {item.title}
                                    </p>
                                    <span className="text-xs text-gray-400">
                                        {item.date}
                                    </span>
                                </div>

                                <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
