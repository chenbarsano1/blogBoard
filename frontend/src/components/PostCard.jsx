import { Link } from 'react-router-dom'
// import { format } from 'timeago.js'
import Image from './Image'
import { SparklesIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'

const PostCard = ({ post }) => {
  // const fallbackImage = 'fallback-image.png'
  // const imageSrc =
  //   post.image && post.image.trim() !== '' ? post.image : fallbackImage
  // console.log(imageSrc)
  // return (
  //   <Link
  //     to={`/post/${post.slug}`}
  //     className="flex flex-col overflow-hidden items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row hover:bg-gray-100"
  //   >
  {
    /* <Image
        src={post.image && post.image.trim() !== '' ? post.image : "fallback-image.png"} // Image path from DB
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        w={192} // Define width (optional)
        h={256} // Define height (optional)
        alt={post.title}
      /> */
  }
  {
    /* {imageSrc && (
        <div className="w-full h-48 md:w-48 md:h-auto md:rounded-none md:rounded-l-lg">
          <Image src={imageSrc} />
        </div>
      )} */
  }
  const navigate = useNavigate()
  const handleTagClick = (tag) => {
    navigate(`/search?q=${encodeURIComponent(tag)}`)
  }
  return (
    <div className="max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl">
      <div className="lg:flex ">
        <div className="lg:shrink-0">
          <Link to={`/post/${post.slug}`}>
            <img
              className="h-56 w-full object-cover lg:w-48 hover:scale-105 transform transition duration-500 ease-in-out hover:brightness-85"
              src={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT + post.image}
              alt="something"
            />
          </Link>
        </div>
        <div className="flex flex-col justify-between">
          <div className="p-5">
            <Link
              to={`/post/${post.slug}`}
              className="text-2xl font-bold tracking-tight text-gray-900 hover:text-gray-700"
            >
              {post.title}
            </Link>
            <p className="text-xs text-gray-600">By @{post.creator.username}</p>
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
