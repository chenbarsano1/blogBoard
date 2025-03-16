import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'
import { useEffect, useState } from 'react'
import { PhotoIcon } from '@heroicons/react/24/outline'

const CreateOwnPost = () => {
  const [value, setValue] = useState('')
  const [progress, setProgress] = useState(0)
  const [img, setImg] = useState('')

  useEffect(() => {
    img && setValue((prev) => prev + `<p><image src="${img.url}"/></p>`)
  }, [img])

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-light">Create a New Post</h1>
      <form className="flex flex-col gap-6 flex-1 mb-6">
        <button className="w-max cursor-pointer px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 flex items-center gap-2">
          <PhotoIcon className="w-5 h-5 text-gray-600" />
          Add a cover image
        </button>
        <input
          className="text-4xl font-semibold bg-transparent outline-none"
          type="text"
          placeholder="My Awesome Post"
          name="title"
        />
        <textarea
          className="p-4 rounded-xl bg-white shadow-md"
          name="desc"
          placeholder="A Short Description"
        />
        <div className="flex flex-1 ">
          <ReactQuill
            theme="snow"
            className="flex-1 rounded-xl bg-white shadow-md"
            value={value}
            onChange={setValue}
            readOnly={0 < progress && progress < 100}
          />
        </div>
      </form>
    </div>
  )
}

export default CreateOwnPost
