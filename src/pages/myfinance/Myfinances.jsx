import React from 'react';
import FinanceTabs from '../../components/FinanceTabs';

const Myfinances = () => {
  return (
    <>
      <div className="p-4 md:p-6 lg:p-8 border-0 lg:border bg-white border-gray-200 lg:rounded-xl min-h-full flex flex-col">
        <FinanceTabs/>
      </div>
    </>
  )
}

export default Myfinances;
