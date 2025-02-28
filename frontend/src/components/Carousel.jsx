import { useState } from 'react'

const Carousel = ({ posts }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length)
  }

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + posts.length) % posts.length
    )
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  return (
    <div className="relative w-full">
      {/* Carousel wrapper */}
      <div className="relative h-56 md:h-96 bg-gray-100 rounded-lg flex items-center justify-center p-6">
        {posts.map((post, index) => (
          <div
            key={post._id}
            className={`absolute w-full h-full flex flex-col justify-center items-center transition-opacity duration-700 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <h3 className="text-xl font-bold text-center">{post.title}</h3>
            <p className="text-gray-700 text-sm text-center mt-2">
              {post.desc}
            </p>
            <p className="text-gray-500 text-xs mt-1">By @{post.creator?.username}</p>
            <div className="mt-2 flex flex-wrap justify-center">
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-gray-200 text-gray-600 text-xs rounded-full px-2 py-1 mx-1"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Slider indicators */}
      <div className="absolute z-30 flex bottom-5 left-1/2 -translate-x-1/2 space-x-3">
        {posts.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Slider controls */}
      <button
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={prevSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-400 hover:bg-gray-600">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>

      <button
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={nextSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-400 hover:bg-gray-600">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  )
}

export default Carousel
