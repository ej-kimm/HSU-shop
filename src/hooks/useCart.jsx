import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { addOrUpdateToCart, getCart, removeFromCart } from '../api/firebase'
import { useAuthContext } from '../context/AuthContext'

export default function useCart() {
  const { uid } = useAuthContext()
  const queryClient = useQueryClient()

  const cartQuery = useQuery({
    queryKey: ['carts', uid || ''],
    queryFn: () => getCart(uid),
    enabled: !!uid, // uid가 존재하는 경우에만 이 API query 사용
  })

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

  return { cartQuery, addOrUpdateItem, removeItem }
}
