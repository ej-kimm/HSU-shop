import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getProducts as fetchProducts, addNewProduct } from '../api/firebase'

export default function useProducts() {
  const queryClient = useQueryClient()

  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(),
    staleTime: 1000 * 60,
  })

  const addProduct = useMutation({
    mutationFn: ({ product, url }) => addNewProduct(product, url),
    onSuccess: () => {
      // 3. 'products'키를 가진 캐시를 invalidate함
      queryClient.invalidateQueries(['products'])
    },
  })

  return { productsQuery, addProduct }
}
