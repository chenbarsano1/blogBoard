import { useParams } from 'react-router-dom'
import { useGetPostQuery } from '../slices/postsApiSlice'
import Image from '../components/Image'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css'
import DaisyDropdown from '@/components/DaisyDropdown'

const SinglePostPage = () => {
  const { slug } = useParams()
  const { data: post, error, isLoading } = useGetPostQuery(slug)

  if (isLoading || !post) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div>
      <main>
        <article>
          <header className="mx-auto max-w-screen-xl pt-28 text-center">
          <div className='flex justify-end'>
            <DaisyDropdown post={post} />
          </div>
            <p className="text-gray-500">
              Published on {new Date(post.createdAt).toLocaleDateString()} by @
              {post.creator?.username}
            </p>
            <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-6 text-lg text-gray-700">{post.desc}</p>
            <div
              className="mt-6 flex flex-wrap justify-center gap-2"
              aria-label="Tags"
            >
              {post.tags?.map((tag, index) => (
                <button
                  key={index}
                  className="cursor-pointer rounded-lg bg-gray-100 px-2 py-1 font-medium text-gray-600 hover:bg-gray-200"
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
            <Image
              src={post.image}
              className="sm:h-[34rem] mt-10 w-full object-contain"
            />
          </header>

          <div className="mx-auto mt-10 max-w-screen-md space-y-12 px-4 py-10 text-lg tracking-wide text-gray-700">
            {/* <p>{post.content}</p> */}
            <ReactQuill value={post.content} readOnly={true} theme="bubble" />
          </div>
        </article>
      </main>

      <div className="w-fit mx-auto mt-10 flex space-x-2">
        <div className="h-0.5 w-2 bg-gray-600"></div>
        <div className="h-0.5 w-32 bg-gray-600"></div>
        <div className="h-0.5 w-2 bg-gray-600"></div>
      </div>

      <aside
        aria-label="Related Articles"
        className="mx-auto mt-10 max-w-screen-xl py-20"
      >
        <h2 className="mb-8 text-center text-5xl font-bold text-gray-900">
          More Blogs
        </h2>

        <div className="mx-auto grid max-w-screen-lg justify-center px-4 sm:grid-cols-2 sm:gap-6 sm:px-8 md:grid-cols-3">
          <article className="mx-auto my-4 flex flex-col overflow-hidden rounded-lg border border-gray-300 bg-white text-gray-900 transition hover:translate-y-2 hover:shadow-lg">
            <a href="#">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBhcnRuZXJzaGlwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                className="h-56 w-full object-cover"
                alt=""
              />
              <div className="flex-auto px-6 py-5">
                <span className="mb-2 flex items-center text-sm font-semibold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                    />
                  </svg>
                  Branding
                </span>
                <h3 className="mt-4 mb-3 text-xl font-semibold xl:text-2xl">
                  How to perform NPS Surveys
                </h3>
                <p className="mb-4 text-base font-light">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
                  tempore officiis. Lorem, ipsum dolor.
                </p>
                <span className="inline-block cursor-pointer select-none rounded-full border border-gray-800 bg-gray-800 px-2 py-1 text-center align-middle text-sm font-semibold leading-normal text-white no-underline shadow-sm">
                  Read Now
                </span>
              </div>
            </a>
          </article>

          <article className="mx-auto my-4 flex flex-col overflow-hidden rounded-lg border border-gray-300 bg-white text-gray-900 transition hover:translate-y-2 hover:shadow-lg">
            <a href="#">
              <img
                src="https://images.unsplash.com/photo-1594122230689-45899d9e6f69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXdhcmRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                className="h-56 w-full object-cover"
                alt=""
              />
              <div className="flex-auto px-6 py-5">
                <span className="mb-2 flex items-center text-sm font-semibold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                    />
                  </svg>
                  Public Relations
                </span>
                <h3 className="mt-4 mb-3 text-xl font-semibold xl:text-2xl">
                  Understanding Public Relations
                </h3>
                <p className="mb-4 text-base font-light">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
                  tempore officiis. Lorem, ipsum dolor.
                </p>
                <span className="inline-block cursor-pointer select-none rounded-full border border-gray-800 bg-gray-800 px-2 py-1 text-center align-middle text-sm font-semibold leading-normal text-white no-underline shadow-sm">
                  Read Now
                </span>
              </div>
            </a>
          </article>

          <article className="mx-auto my-4 flex flex-col overflow-hidden rounded-lg border border-gray-300 bg-white text-gray-900 transition hover:translate-y-2 hover:shadow-lg">
            <a href="#">
              <img
                src="https://images.unsplash.com/photo-1569705460033-cfaa4bf9f822?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YXdhcmRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                className="h-56 w-full object-cover"
                alt=""
              />
              <div className="flex-auto px-6 py-5">
                <span className="mb-2 flex items-center text-sm font-semibold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                    />
                  </svg>
                  Marketing
                </span>
                <h3 className="mt-4 mb-3 text-xl font-semibold xl:text-2xl">
                  Marketing is looking for untapped opportunities
                </h3>
                <p className="mb-4 text-base font-light">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
                  tempore officiis. Lorem, ipsum dolor.
                </p>
                <span className="inline-block cursor-pointer select-none rounded-full border border-gray-800 bg-gray-800 px-2 py-1 text-center align-middle text-sm font-semibold leading-normal text-white no-underline shadow-sm">
                  Read Now
                </span>
              </div>
            </a>
          </article>
        </div>
      </aside>
    </div>
  )
}

export default SinglePostPage
