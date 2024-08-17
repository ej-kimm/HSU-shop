import React from 'react'

export default function ProductCard({
  product: { id, image, title, category, price },
}) {
  return (
    <li className="rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105">
      <img className="w-full h-96 object-cover" src={image} alt={title} />
      <div className="m-2">
        <div className="text-lg flex justify-between items-center">
          <h3 className="truncate">{title}</h3>
          <p>{`₩${price}`}</p>
        </div>
        <p className="text-gray-600">{category}</p>
      </div>
    </li>
  )
}
