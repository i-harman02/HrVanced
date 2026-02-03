const ManagerComments = () => {
  const comments = [
    {
      id: 1,
      text: "Client feedback incorporated into latest build",
      time: "2min"
    },
    {
      id: 2,
      text: "Client feedback incorporated into latest build",
      time: "2days"
    },
    {
      id: 3,
      text: "Client feedback incorporated into latest build",
      time: "1month"
    },
    {
      id: 4,
      text: "Client feedback incorporated into latest build",
      time: "2month"
    },
    {
      id: 5,
      text: "Client feedback incorporated into latest build",
      time: "2month"
    }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl ">
      
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-800">
          Manager Comments
        </h3>
      </div>

      
      <div className="p-4 md:p-6 space-y-4">
        {comments.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            
            {/* Indicator */}
            <div className="mt-1">
              <span className="w-3 h-3 rounded-full border-2 border-borderprimary block" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="text-sm text-gray-600 leading-snug">
                {item.text}
              </p>
            </div>

            {/* Time */}
            <span className="text-xs color-primary whitespace-nowrap">
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagerComments;
