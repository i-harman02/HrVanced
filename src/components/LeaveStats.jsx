export default function MyLeaveStats() {
    const data = [
        { month: "Jan", value: 1 },
        { month: "Feb", value: 1 },
        { month: "Mar", value: 0 },
        { month: "Apr", value: 3 },
        { month: "May", value: 1 },
        { month: "Jun", value: 0 },
        { month: "Jul", value: 0 },
        { month: "Aug", value: 3 },
        { month: "Sep", value: 0 },
        { month: "Oct", value: 0 },
        { month: "Nov", value: 0 },
        { month: "Dec", value: 5 },
    ];

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold">My Leave Stats</h3>
                <select className="text-xs border border-gray-200 rounded-md px-6 py-1 text-gray-600 bg-[#F9FAFB]">
                    <option>This Year</option>
                    <option>2024</option>
                    <option>2023</option>
                    <option>2022</option>
                    <option>2021</option>
                </select>
            </div>

            {/* Chart */}
            <div className="relative h-56">
                {/* Y-axis grid */}
                <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-gray-400">
                    {[12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((n) => (
                        <div key={n} className="flex items-center gap-2">
                            <span className="w-6 text-right">{n}</span>
                            <div className="flex-1 border-t border-gray-100" />
                        </div>
                    ))}
                </div>

                {/* Bars */}
                <div className="absolute bottom-0 left-8 right-0 flex items-end justify-between h-full px-2">
                    {data.map((item, i) => (
                        <div key={i} className="flex flex-col items-center gap-1">
                            {/* Value bubble (only for Apr like design) */}
                            {item.month === "Apr" && (
                                <span className="text-[10px] bg-white border shadow px-1.5 py-0.5 rounded">
                                    03
                                </span>
                            )}

                            <div
                                className="w-2 bg-[#2C3EA1] rounded"
                                style={{ height: `${item.value * 16}px` }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* X-axis */}
            <div className="flex justify-between text-[10px] text-gray-400 mt-3 pl-8 pr-2">
                {data.map((item) => (
                    <span key={item.month}>{item.month}</span>
                ))}
            </div>
        </div>
    );
}
