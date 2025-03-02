import { Link } from 'react-router-dom'
// import { format } from 'timeago.js'
import Image from './Image'
import { SparklesIcon } from '@heroicons/react/24/solid'

const PostCard = ({ post }) => {
  const fallbackImage = 'fallback-image.png'
  const imageSrc =
    post.image && post.image.trim() !== '' ? post.image : fallbackImage
  console.log(imageSrc)
  return (
    <div className="flex flex-col items-center h-[20vh] bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100">
      {/* <Image
        src={post.image && post.image.trim() !== '' ? post.image : "fallback-image.png"} // Image path from DB
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        w={192} // Define width (optional)
        h={256} // Define height (optional)
        alt={post.title}
      /> */}
      {/* {imageSrc && (
        <div className="w-full h-48 md:w-48 md:h-auto md:rounded-none md:rounded-l-lg">
          <Image src={imageSrc} />
        </div>
      )} */}
      <img
        src={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT + imageSrc}
        className="object-cover max-h-full rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {post.title}
        </h5>
        <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
          By {post.creator.username}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {post.desc}
        </p>
        <div className="flex flex-wrap gap-2">
          {post.tags?.map((tag, index) => (
            <span
              key={index}
              className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PostCard
