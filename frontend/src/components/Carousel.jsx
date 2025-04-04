import { useState, useEffect } from 'react'
import Image from './Image'

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

  if (!posts || posts.length === 0) {
    return <div>Loading posts...</div>
  }
  console.log(posts.map((post) => post.image))

  return (
    <div className="relative w-full">
      {/* Carousel wrapper */}
      <div className="relative h-[60vh] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center p-6">
        {posts.map((post, index) => (
          <div
            key={post._id}
            className={`absolute w-full h-full flex flex-col justify-center items-center bg-cover bg-center transition-opacity duration-700 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={post.image}
              className="absolute top-0 left-0 w-full h-full object-cover bg-cover bg-center"
            />
            {/* Stronger overlay gradient for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
            
            {/* Content container with text shadow and padding */}
            <div className="relative max-w-lg p-6 rounded-lg text-center">
              <h3 className="text-xl font-bold text-white text-shadow-lg">
                {post.title}
              </h3>
              <p className="text-white text-sm mt-2 text-shadow-sm">
                {post.desc}
              </p>
              <p className="text-gray-200 text-xs mt-1 text-shadow-sm">
                By @{post.creator?.username}
              </p>
              <div className="mt-2 flex flex-wrap justify-center">
                {post.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-black/40 backdrop-blur-sm text-white text-xs rounded-full px-2 py-1 mx-1 shadow-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slider indicators */}
      <div className="absolute flex bottom-5 left-1/2 -translate-x-1/2 space-x-3">
        {posts.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Slider controls */}
      <button
        className="absolute top-0 left-0 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={prevSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm">
          <svg
            className="w-4 h-4 text-white"
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
        className="absolute top-0 right-0 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={nextSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm">
          <svg
            className="w-4 h-4 text-white"
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