import { Link } from 'react-router-dom'
import { SparklesIcon } from '@heroicons/react/24/solid'

const PostCard = () => {
  return (
      <div className="my-4 flex flex-col overflow-hidden rounded-2xl border border-gray-300 bg-white text-gray-900 transition hover:shadow-md w-100">
        <Link to="/post/1">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBhcnRuZXJzaGlwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            className="h-56 w-full object-cover hover:brightness-75"
            alt=""
          />
          <div className="flex-auto px-6 py-5">
            <span className="mb-2 flex items-center text-sm font-semibold">
            <SparklesIcon className="h-4 w-4 mr-2" />
              AI Generated
            </span>
            <h3 className="mt-4 mb-3 text-xl font-semibold xl:text-2xl">
              We came first in Awwwards ceremony 2021
            </h3>
            <p className="mb-4 text-base font-light">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
              tempore officiis. Lorem, ipsum dolor.
            </p>
            <span className="inline-block cursor-pointer select-none rounded-full border border-gray-800 bg-gray-800 px-2 py-1 text-center align-middle text-sm font-semibold leading-normal text-white no-underline shadow-sm">
              Learn More
            </span>
          </div>
        </Link>
      </div>
  )
}

export default PostCard
