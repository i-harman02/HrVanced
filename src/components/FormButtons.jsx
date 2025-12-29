export default function FormButtons(){  
    return(
        <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-50 text-textgray text-sm font-medium cursor-pointer px-3.5 py-2.5 border border-bordergray rounded-sm leading-none"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              type="submit"
              className="bg-primary text-white text-sm font-medium cursor-pointer px-3.5 py-2.5 border border-borderprimary rounded-sm leading-none"
            >
              Send
            </button>
          </div>
    );
}
