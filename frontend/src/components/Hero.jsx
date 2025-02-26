import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="flex flex-grow items-center justify-center">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl">
              Write, share and inspire - welcome to{' '}
              <div className="relative inline-flex">
                <span className="absolute inset-x-0 bottom-0 border-b-[30px] border-[#4ADE80]"></span>
                <h1 className="relative text-4xl font-bold text-black sm:text-6xl lg:text-7xl">
                  Blogboard.
                </h1>
              </div>
            </h1>

            <p className="mt-8 text-base text-black sm:text-xl">
              Share your thoughts, read amazing articles, and engage with a
              growing community!
            </p>

            {/* buttons */}
            <div className="mt-10 sm:flex sm:items-center sm:space-x-8">
              <Link
                to={'/signup'}
                className="inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-white transition-all duration-200 bg-orange-500 hover:bg-orange-600 focus:bg-orange-600"
              >
                Start exploring
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div>
            <img
              className="w-full"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/2/hero-img.png"
              alt="Hero"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
