import React from 'react';
import AdminLeavedetalcard from './AdminLeavedetalcard';
import AdminAllLeaveData from './AdminAllLeaveData';

const LeaveApproval = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-1 gap-8'>
      <AdminLeavedetalcard />
      <AdminAllLeaveData />
    </div>
  )
}

export default LeaveApproval;