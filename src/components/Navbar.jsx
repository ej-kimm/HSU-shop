import React from 'react'
import { Link } from 'react-router-dom'
import { BsFillPencilFill } from 'react-icons/bs'
import User from './User'
import Button from './ui/Button'
import { useAuthContext } from '../context/AuthContext'

export default function Navbar() {
  const { user, login, logout } = useAuthContext()

  return (
    <header className="flex justify-between border-b border-gray-300 p-2">
      <Link to="/" className="flex items-center">
        <img src="/favicon.ico" className="w-11" alt="sangsangbugi" />
        <h1 className="text-4xl text-brand">HSU shop</h1>
      </Link>
      <nav className="flex items-center gap-4 font-semibold">
        <Link to="/products">Products</Link>
        {user && <Link to="/carts">Carts</Link>}
        {user && user.isAdmin && (
          <Link to="/products/new" className="text-xl">
            <BsFillPencilFill />
          </Link>
        )}
        {user && <User user={user} />}
        {!user && <Button text={'Login'} onClick={login} />}
        {user && <Button text={'Logout'} onClick={logout} />}
      </nav>
    </header>
  )
}
