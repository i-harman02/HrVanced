import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients, deleteClient } from "../../slices/clientSlice";
import Pagination from "../../components/Pagination";
import AddClientModal from "./AddClientModal";
import { IoMdEye } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";

const ClientRow = ({ client, onEdit, onDelete, onView }) => {
  return (
    <tr className="hover:bg-gray-50 border-b border-gray-100">
      <td className="py-3 items-center gap-2.5 flex">
        <img
          className="w-7.5 h-7.5 rounded-md object-cover"
          src={client?.image || `https://i.pravatar.cc/150?u=${client?.clientName || 'Client'}`}
          alt={client?.clientName}
        />
        <span className="text-sm text-heading font-medium">
          {client?.clientName}
        </span>
      </td>
      <td className="py-3 text-sm text-textgray">
        {client?.mail || "-"}
      </td>
      <td className="py-3 text-sm text-textgray">
        {client?.contactNumber || "-"}
      </td>
      <td className="py-3 text-sm text-textgray font-medium">
        {client?.projectName || "-"}
      </td>
      <td className="py-3 text-sm text-textgray max-w-xs truncate">
        {client?.projectDescription || "-"}
      </td>
      <td className="py-3">
        <span
          className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
            client.status === "Completed"
              ? "bg-green-50 text-green-600 border-green-200"
              : client.status === "In Progress"
              ? "bg-blue-50 text-blue-600 border-blue-200"
              : "bg-orange-50 text-orange-600 border-orange-200"
          }`}
        >
          {client.status || "Pending"}
        </span>
      </td>
      <td className="py-3">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onView(client?._id)}
            className="text-textgray hover:text-blue-600 transition-colors" 
            title="View Details"
          >
            <IoMdEye size={18} />
          </button>
          <button 
            onClick={() => onEdit(client)}
            className="text-textgray hover:text-blue-600 transition-colors" 
            title="Edit"
          >
            <CiEdit size={18} />
          </button>
          <button 
            onClick={() => onDelete(client?._id)}
            className="text-textgray hover:text-red-600 transition-colors" 
            title="Delete"
          >
            <RiDeleteBin5Line size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

const AllClient = () => {
  const dispatch = useDispatch();
  const { clients, loading: clientsLoading } = useSelector((state) => state.client);
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  // Refresh clients when modal closes
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingClient(null);
    // Refresh the client list
    dispatch(fetchClients());
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      dispatch(deleteClient(id));
    }
  };

  const headers = [
    "Client Name",
    "Mail",
    "Mobile No.",
    "Project Name",
    "Project Descriptions",
    "Status",
    "Actions",
  ];

  // We now use clients directly instead of filtering projects
  const data = useMemo(() => {
    if (!clients) return [];
    return clients;
  }, [clients]);

  return (
    <div className="p-4 md:p-6 lg:p-8 border-0 lg:border bg-white border-gray-200 lg:rounded-xl min-h-full flex flex-col relative">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-heading">Total Clients</h1>
        <button
          onClick={() => {
            setEditingClient(null);
            setShowModal(true);
          }}
          className="px-5 py-2.5 bg-[#2C3EA1] text-white text-sm font-bold rounded-lg hover:bg-[#1a2b88] transition-all shadow-md active:scale-95"
        >
          Add New Client
        </button>
      </div>

      {clientsLoading ? (
        <div className="flex-1 flex items-center justify-center text-textgray animate-pulse">
          Loading client data...
        </div>
      ) : (
        <>
          <div className="bg-white border border-bordergray rounded-xl p-6 overflow-x-auto mb-6 shadow-sm">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="border-b border-bordergray">
                  {headers.map((h) => (
                    <th
                      key={h}
                      className="pb-5 text-left text-sm font-bold text-heading"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {data.map((client, index) => (
                  <ClientRow 
                    key={client._id || index} 
                    client={client} 
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onView={(id) => console.log("View client", id)}
                  />
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan={headers.length} className="py-10 text-center text-textgray">
                      No client projects found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-auto">
            <Pagination />
          </div>
        </>
      )}

      {showModal && (
        <AddClientModal 
          onClose={handleCloseModal} 
          client={editingClient} 
        />
      )}
    </div>
  );
};

export default AllClient;
