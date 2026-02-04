import React from 'react';
import { GoEye } from "react-icons/go";

const AdminAllClients = () => {
  return (
    <>
    <div className="bg-white border border-bordergray rounded-lg p-6 overflow-x-auto">
        <div className='flex items-center justify-between gap-2 flex-wrap mb-6'>
            <h4 className="text-base text-black font-semibold">Clients</h4>
            <a href="#" className='text-sm text-textgray'>View All</a>
        </div>
        <div className='flex items-center justify-between mb-5'>
            <div className='flex items-center gap-4'>
                <img src="https://i.pravatar.cc/300?img=65" className='w-16 h-16 rounded-md' alt="Client Image" />
                <div>
                    <div className="text-sm font-medium text-black leading-none mb-2">Isaac H</div>
                    <p className="text-xs text-textgray leading-none">Nineyard Project</p>
                </div>
            </div>
            <span className="cursor-pointer text-textgray"><GoEye size={16} /></span>
        </div>
        <div className='flex items-center justify-between mb-5'>
            <div className='flex items-center gap-4'>
                <img src="https://i.pravatar.cc/300?img=59" className='w-16 h-16 rounded-md' alt="Client Image" />
                <div>
                    <div className="text-sm font-medium text-black leading-none mb-2">Ismail</div>
                    <p className="text-xs text-textgray leading-none">Hatzalah Project</p>
                </div>
            </div>
            <span className="cursor-pointer text-textgray"><GoEye size={16} /></span>
        </div>
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
                <img src="https://i.pravatar.cc/300?img=68" className='w-16 h-16 rounded-md' alt="Client Image" />
                <div>
                    <div className="text-sm font-medium text-black leading-none mb-2">Krish</div>
                    <p className="text-xs text-textgray leading-none">Pitch Playlist</p>
                </div>
            </div>
            <span className="cursor-pointer text-textgray"><GoEye size={16} /></span>
        </div>
    </div>
    </>
  )
}

export default AdminAllClients;