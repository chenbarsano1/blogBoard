import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import Image from './Image'
import { SparklesIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'
import { BookmarkIcon, BookmarkSlashIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux'
import { addSavedPost, removeSavedPost } from '../slices/savedPostsSlice'
import { useSavePostMutation, useUnsavePostMutation, useGetSavedPostsQuery } from '../slices/usersApiSlice'

const PostCard = ({ post }) => {
  console.log(post)
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
  })

  const navigate = useNavigate()
  const handleTagClick = (tag) => {
    navigate(`/search?q=${encodeURIComponent(tag)}`)
  }

  const dispatch = useDispatch()
  const { data: savedPosts, refetch } = useGetSavedPostsQuery()
  const isSaved = savedPosts?.find((savedPost) => savedPost._id === post._id)

  const [savePost] = useSavePostMutation()
  const [unsavePost] = useUnsavePostMutation()

  const handleSavePost = async () => {
    console.log('Saving Post ID:', post._id)
    if (isSaved) {
      dispatch(removeSavedPost(post._id))
      await unsavePost(post._id)
    } else {
      dispatch(addSavedPost(post))
      await savePost(post._id)
    }
    refetch()
  }

  return (
    <div className="max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl">
      <div className="lg:flex ">
        <div className="lg:shrink-0">
          <Link to={`/post/${post.slug}`}>
            <Image
              src={post.image}
              className="h-56 w-full object-cover lg:w-48 hover:scale-105 transform transition duration-500 ease-in-out hover:brightness-85"
            />
          </Link>
        </div>
        <div className="flex flex-col justify-between">
          <div className="p-5">
            <div className="flex items-center justify-between w-full">
              <Link
                to={`/post/${post.slug}`}
                className="flex-grow text-2xl font-bold tracking-tight text-gray-900 hover:text-gray-700"
              >
                {post.title}
              </Link>
              <button
                className="text-gray-500 hover:text-gray-700 cursor-pointer ml-2"
                onClick={handleSavePost}
              >
                {isSaved ? (
                  <BookmarkSlashIcon className="h-6 w-6" />
                ) : (
                  <BookmarkIcon className="h-6 w-6" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-600">By @{post.creator.username}</p>
            <p className="text-xs text-gray-600">{timeAgo}</p>
            <p className="mt-2 text-gray-700">{post.desc}</p>
          </div>
          <div className="flex flex-wrap gap-2 p-5">
            {post.tags?.map((tag, index) => (
              <button
                key={index}
                className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded cursor-pointer hover:bg-blue-200"
                onClick={() => handleTagClick(tag)}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard
