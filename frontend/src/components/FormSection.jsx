import { useState } from 'react'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { SparklesIcon, PhotoIcon } from '@heroicons/react/24/solid'
import Upload from './Upload'

const FormSection = ({ props }) => {
  const [cover, setCover] = useState('') // Cover image URL for the post
  const [progress, setProgress] = useState(0) // Image upload progress
  const [tags, setTags] = useState([]) // Tags for the post
  const [tagInput, setTagInput] = useState('') // Tag input field value

  const addTag = (e) => {
    e.preventDefault()
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <div className="p-15 rounded-lg shadow">
      <form className="flex flex-col gap-4 w-full">
        <div className="flex items-center font-bold text-3xl gap-1">
          <SparklesIcon className="w-5 h-5 text-yellow-400" />
          Generate a post using AI
        </div>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Title</legend>
          <input
            type="text"
            name="title"
            className="input w-[50%]"
            placeholder="My Awesome Post"
          />
        </fieldset>
        <fieldset className="fieldset mb-4">
          <legend className="fieldset-legend">A short description</legend>
          <textarea
            className="textarea h-32 w-[50%]"
            placeholder="Description"
          ></textarea>
        </fieldset>
        <Upload type="image" setProgress={setProgress} setData={setCover}>
          <button className="w-max cursor-pointer mb-4 px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 flex items-center gap-2">
            <PhotoIcon className="w-5 h-5 text-gray-600" />
            Add a cover image
          </button>
        </Upload>
        {/* 🔹 Tags Input */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-300 px-3 py-1 rounded-full"
            >
              <span>{tag}</span>
              <XCircleIcon
                className="w-4 h-4 ml-2 text-red-600 cursor-pointer"
                onClick={() => removeTag(tag)}
              />
            </div>
          ))}
        </div>

        {/* 🔹 Tag Input Field */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded"
            placeholder="Add a tag..."
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTag(e)}
          />
          <button
            type="button"
            className="btn btn-outline btn-xs sm:btn-sm md:btn-md "
            onClick={addTag}
          >
            Add
          </button>
        </div>

        <fieldset className="fieldset mb-4">
          <legend className="fieldset-legend">Prompt</legend>
          <textarea
            className="textarea h-46 w-[70%] "
            placeholder="Generate a blog post about all kinds of ice cream flavors"
          ></textarea>
        </fieldset>

        <button className="btn btn-primary w-full">Generate Post</button>
      </form>
    </div>
  )
}

export default FormSection
