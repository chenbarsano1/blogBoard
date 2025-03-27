import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const OutputSection = ({
  generatedContent,
  setGeneratedContent,
  handlePublish,
}) => {
  return (
    <div className="output-container p-15 rounded-lg shadow bg-white">
      <h2 className="text-3xl font-bold mb-2">Generated Post</h2>
      <ReactQuill
        theme="snow"
        className="flex-1 border rounded-2xl border-gray-300 h-[85%] bg-white shadow-md"
        value={generatedContent}
        onChange={setGeneratedContent} // Updates content when user edits
      />
      <button
        onClick={handlePublish}
        className="btn btn-primary w-full text-lg mt-4"
      >
        Publish
      </button>
    </div>
  )
}

export default OutputSection
