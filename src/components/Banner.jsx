import React from 'react'

export default function Banner() {
  return (
    <section className="h-96 relative">
      <div className="w-full h-full bg-cover bg-banner bg-center" />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-500 ease-out">
        <div className="text-gray-50 text-center">
          <h2 className="text-6xl font-semibold mb-2">Shop With HSU</h2>
          <p className="text-2xl">Best Products, High Quality</p>
        </div>
      </div>
    </section>
  )
}
