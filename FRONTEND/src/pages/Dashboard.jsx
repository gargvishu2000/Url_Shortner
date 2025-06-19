import React from 'react'
import UrlForms from '../components/UrlForms'
import UserUrl from '../components/UserUrl'
const Dashboard = () => {
  return (
     <div className="min-h-screen -mt-30 bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">URL Shortener</h1>
        
        <UrlForms />
        <UserUrl />
      </div>
    </div>
  )
}

export default Dashboard
