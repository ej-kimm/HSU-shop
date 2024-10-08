import React, { useState } from 'react'
import Button from '../components/ui/Button'
import { uploadImage } from '../api/uploader'
import useProducts from '../hooks/useProducts'

export default function NewProduct() {
  const [product, setProduct] = useState({})
  const [file, setFile] = useState()
  const [fileKey, setFileKey] = useState(Date.now())
  const [isUploading, setIsUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { addProduct } = useProducts()

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'file') {
      setFile(files && files[0])
      return
    }
    setProduct((product) => ({ ...product, [name]: value }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsUploading(true)
    // 1. 제품의 사진을 Cloudinary에 업로드 하고 URL을 획득
    uploadImage(file)
      .then((url) => {
        // 2. Firebase에 새로운 제품을 추가함
        addProduct.mutate(
          { product, url },
          {
            // 4. mutate가 다 되고나서 onSuccess 호출
            onSuccess: () => {
              setSuccess('성공적으로 제품이 추가되었습니다.')
              setTimeout(() => setSuccess(null), 4000)

              // 입력폼 모두 지우기
              setProduct({})
              setFile(null)
              setFileKey(Date.now())
            },
          }
        )
      })
      .finally(() => setIsUploading(false))
  }

  return (
    <section className="w-full text-center mb-4">
      <h2 className="text-2xl font-bold my-4">새로운 제품 등록</h2>
      {success && <p className="my-2">✅ {success}</p>}
      {file && (
        <img
          className="w-96 mx-auto mb-2"
          src={URL.createObjectURL(file)}
          alt="local file"
        />
      )}
      <form className="flex flex-col px-12 gap-1" onSubmit={handleSubmit}>
        <input
          key={fileKey}
          type="file"
          accept="image/*"
          name="file"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="title"
          value={product.title ?? ''}
          placeholder="제품명"
          required
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          value={product.price ?? ''}
          placeholder="가격"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          value={product.category ?? ''}
          placeholder="카테고리"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={product.description ?? ''}
          placeholder="제품 설명"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="options"
          value={product.options ?? ''}
          placeholder="옵션들(콤마(,)로 구분)"
          required
          onChange={handleChange}
        />
        <Button
          text={isUploading ? '업로드중...' : '제품 등록하기'}
          disabled={isUploading}
        />
      </form>
    </section>
  )
}
