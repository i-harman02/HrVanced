import React from 'react'
import Tabs from '../components/Tabs'
import LeaveStats from '../components/LeaveStats'
import LeaveTable from '../components/LeaveTable'
import LeaveHistory from '../components/LeaveHistory'

const LeaveManagement = () => {
    return (
        <>

            <main className="flex-1 p-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <Tabs />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                        <LeaveStats />
                        <LeaveHistory />
                    </div>

                    <div className="mt-6">
                        <LeaveTable />
                    </div>
                </div>
            </main>
        </>
    )
}

export default LeaveManagement