import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients } from '../slices/clientSlice';
import { GoEye } from "react-icons/go";
import { Link } from 'react-router-dom';

const AdminAllClients = () => {
  const dispatch = useDispatch();
  const { clients, loading } = useSelector((state) => state.client);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  // Show only the first 3 clients
  const displayClients = clients?.slice(0, 3) || [];

  return (
    <>
      <div className="bg-white border border-bordergray rounded-lg p-6 overflow-x-auto">
        <div className='flex items-center justify-between gap-2 flex-wrap mb-6'>
          <h4 className="text-base text-black font-semibold">Clients</h4>
          <Link to="/all-employees/clients" className='text-sm text-textgray hover:text-primary transition-colors'>
            View All
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-8 text-textgray">
            Loading clients...
          </div>
        ) : displayClients.length === 0 ? (
          <div className="text-center py-8 text-textgray">
            No clients found
          </div>
        ) : (
          displayClients.map((client, index) => (
            <div 
              key={client._id || index} 
              className={`flex items-center justify-between ${index < displayClients.length - 1 ? 'mb-5' : ''}`}
            >
              <div className='flex items-center gap-4'>
                <img 
                  src={client.image || `https://i.pravatar.cc/300?u=${client.clientName}`} 
                  className='w-16 h-16 rounded-md object-cover' 
                  alt={client.clientName} 
                />
                <div>
                  <div className="text-sm font-medium text-black leading-none mb-2">
                    {client.clientName}
                  </div>
                  <p className="text-xs text-textgray leading-none">
                    {client.projectName || 'No project assigned'}
                  </p>
                </div>
              </div>
              <Link 
                to={`/all-employees/clients`}
                className="cursor-pointer text-textgray hover:text-primary transition-colors"
              >
                <GoEye size={16} />
              </Link>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default AdminAllClients;