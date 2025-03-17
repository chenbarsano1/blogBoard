import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'
import { useEffect, useState } from 'react'
import { PhotoIcon } from '@heroicons/react/24/outline'
import Upload from '../components/Upload'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useCreatePostMutation } from '../slices/postsApiSlice'

const CreateOwnPost = () => {
  const [value, setValue] = useState('') // Quill editor value, holds the post content
  const [cover, setCover] = useState('') // Cover image URL for the post
  const [img, setImg] = useState('') //
  const [progress, setProgress] = useState(0) // Image upload progress

  const { userInfo } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [createPost, { isLoading, error }] = useCreatePostMutation()

  useEffect(() => {
    img && setValue((prev) => prev + `<p><image src="${img.url}"/></p>`)
  }, [img])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!userInfo) {
      toast.error('Please login to create a post')
      navigate('/login')
      return
    }

    const formData = new FormData(e.target)
    const data = {
      img: cover.filePath || '',
      title: formData.get('title'),
      desc: formData.get('desc'),
      content: value,
    }

    try {
      const response = await createPost(data).unwrap()
      toast.success('Post created successfully!')
      navigate(`/posts/${response.slug}`)
    } catch (error) {
      toast.error('Failed to create post. Please try again.')
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-light">Create a New Post</h1>
      <form className="flex flex-col gap-6 flex-1 mb-6" onSubmit={handleSubmit}>
        <Upload type="image" setProgress={setProgress} setData={setCover}>
          <button className="w-max cursor-pointer px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 flex items-center gap-2">
            <PhotoIcon className="w-5 h-5 text-gray-600" />
            Add a cover image
          </button>
        </Upload>
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
          <Upload type="image" setProgress={setProgress} setData={setImg}>
            🌆
          </Upload>

          <ReactQuill
            theme="snow"
            className="flex-1 rounded-xl bg-white shadow-md"
            value={value}
            onChange={setValue}
            readOnly={0 < progress && progress < 100}
          />
        </div>
        <button
          disabled={isLoading || (0 < progress && progress < 100)}
          className="w-max cursor-pointer px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          {isLoading ? 'Loading...' : 'Send'}
        </button>
        {'Progress: ' + progress + '%'}
      </form>
    </div>
  )
}

export default CreateOwnPost
