import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

const useInfiniteScroll = ({ fetchQuery, limit = 10, sort = 'newest', ...params }) => {
  const [page, setPage] = useState(1)
  const { data, isFetching, isError, error } = fetchQuery({
    ...params,
    page,
    limit,
    sort,
  })

  const hasMore = data?.hasMore
  const posts = data?.posts || []
  const loadMoreRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetching) {
          setPage((prevPage) => prevPage + 1)
        }
      },
      { threshold: 1.0 }
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current)
      }
    }
  }, [hasMore, isFetching])

  return { posts, isFetching, isError, error, loadMoreRef }
}

export default useInfiniteScroll
