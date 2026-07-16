import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-gray-300 text-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        
        <p>
          © {new Date().getFullYear()} KeyNest. All rights reserved.
        </p>

        <p className="text-gray-400">
          Secure • Simple • Reliable
        </p>

      </div>
    </footer>
  )
}

export default Footer
