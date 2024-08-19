import React from 'react'
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { addOrUpdateToCart, removeFromCart } from '../api/firebase'
import { useAuthContext } from '../context/AuthContext'
import { useQueryClient, useMutation } from '@tanstack/react-query'

export default function CartItem({
  product,
  product: { id, image, title, option, quantity, price },
}) {
  const { uid } = useAuthContext()
  const queryClient = useQueryClient()

  const addOrUpdateItem = useMutation({
    mutationFn: (product) => addOrUpdateToCart(uid, product),
    onSuccess: () => {
      // 캐시된 데이터를 무효화하고, 최신 데이터를 가져옴
      queryClient.invalidateQueries(['carts', uid])
    },
  })
  const removeItem = useMutation({
    mutationFn: (id) => removeFromCart(uid, id),
    onSuccess: () => queryClient.invalidateQueries(['carts', uid]),
  })

  const handleMinus = () => {
    if (quantity < 2) return
    addOrUpdateItem.mutate({ ...product, quantity: quantity - 1 })
  }
  const handlePlus = () =>
    addOrUpdateItem.mutate({ ...product, quantity: quantity + 1 })
  const handleDelete = () => removeItem.mutate(id)

  return (
    <li className="flex justify-between my-2 items-center">
      <img className="w-28 md:w-48 rounded-lg" src={image} alt={title} />
      <div className="flex-1 flex justify-between ml-4">
        <div className="basis-2/3">
          <p className="text-lg">{title}</p>
          <p className="text-xl font-bold text-brand">{option}</p>
          <p>₩{parseInt(price) * parseInt(option.charAt(0))}</p>
        </div>
        <div className="text-2xl flex items-center">
          <AiOutlineMinusSquare
            className="cursor-pointer"
            onClick={handleMinus}
          />
          <span>{quantity}</span>
          <AiOutlinePlusSquare
            className="cursor-pointer"
            onClick={handlePlus}
          />
          <RiDeleteBin5Fill className="cursor-pointer" onClick={handleDelete} />
        </div>
      </div>
    </li>
  )
}
