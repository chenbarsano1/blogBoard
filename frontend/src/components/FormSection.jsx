import { useState } from 'react'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { SparklesIcon, PhotoIcon } from '@heroicons/react/24/solid'
import Upload from './Upload'

const FormSection = ({ postData, setPostData, handleGeneratePost }) => {
  const [progress, setProgress] = useState(0) // Image upload progress
  const [tagInput, setTagInput] = useState('') // Tag input field value

  // Function to update the cover image in postData
  const handleCoverUpload = (data) => {
    setPostData((prev) => ({
      ...prev,
      cover: data, // Store the uploaded image URL in postData
    }))
  }

  // Function to add a tag
  const addTag = (e) => {
    e.preventDefault()
    const newTag = tagInput.trim()

    if (newTag && !postData.tags.includes(newTag)) {
      setPostData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag], // Update postData.tags
      }))
      setTagInput('')
    }
  }

  // Function to remove a tag
  const removeTag = (tagToRemove) => {
    setPostData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove), // Remove tag
    }))
  }

  return (
    <div className="p-15 rounded-lg shadow bg-white ">
      <form className="flex flex-col gap-4 w-full">
        <div className="flex items-center font-bold text-3xl gap-1">
          <SparklesIcon className="w-5 h-5 text-yellow-400" />
          Generate a post using AI
        </div>

        {/* 🔹 Title Input */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Title</legend>
          <input
            type="text"
            name="title"
            className="input w-[50%]"
            placeholder="My Awesome Post"
            value={postData.title}
            onChange={(e) =>
              setPostData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </fieldset>

        {/* 🔹 Description Input */}
        <fieldset className="fieldset mb-4">
          <legend className="fieldset-legend">A short description</legend>
          <textarea
            className="textarea  w-[50%]"
            placeholder="Description"
            value={postData.description}
            onChange={(e) =>
              setPostData((prev) => ({ ...prev, description: e.target.value }))
            }
          ></textarea>
        </fieldset>

        {/* 🔹 Cover Image Upload */}
        <Upload
          type="image"
          setProgress={setProgress}
          setData={handleCoverUpload}
        >
          <button className="w-max cursor-pointer mb-4 px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 flex items-center gap-2">
            <PhotoIcon className="w-5 h-5 text-gray-600" />
            Add a cover image
          </button>
        </Upload>
        {/* 🔹 Display uploaded cover image */}
        {postData.cover?.url && (
          <div className="relative">
            <img
              src={postData.cover.url}
              alt="Cover"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}

        {/* 🔹 Tags Display */}
        <div className="flex flex-wrap gap-2">
          {postData.tags.map((tag, index) => (
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
            className="btn btn-outline btn-xs sm:btn-sm md:btn-md"
            onClick={addTag}
          >
            Add
          </button>
        </div>

        {/* 🔹 Prompt Input */}
        <fieldset className="fieldset mb-4">
          <legend className="fieldset-legend">Prompt</legend>
          <textarea
            className="textarea h-46 w-[70%] "
            placeholder="Generate a blog post about all kinds of ice cream flavors"
            value={postData.prompt}
            onChange={(e) =>
              setPostData((prev) => ({ ...prev, prompt: e.target.value }))
            }
          ></textarea>
        </fieldset>

        <button
          onClick={handleGeneratePost}
          className="btn btn-primary w-full text-lg"
        >
          Generate Post
        </button>
      </form>
    </div>
  )
}

export default FormSection
