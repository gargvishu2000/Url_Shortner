import React from 'react'
import UrlForms from '../components/UrlForms'

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">URL Shortener</h1>
        
        <UrlForms />

      </div>
    </div>
  )
}

export default Homepage;
