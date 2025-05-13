import React from 'react'

function Dashboard() {
  return (
    <div>
      <h1 className='text-center text-white'>Welcome to the Dashboard</h1>
      <p className='text-center'>This is where you can manage your stocks and plans.</p>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h2>Stock Management</h2>
            <p>View and manage your stocks here.</p>
          </div>
          <div className="col-md-4">
            <h2>Plans</h2>
            <p>Check your subscription plans.</p>
          </div>
          <div className="col-md-4">
            <h2>Settings</h2>
            <p>Update your account settings.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
