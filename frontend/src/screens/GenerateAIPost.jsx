import FormSection from '@/components/FormSection'
import OutputSection from '@/components/OutputSection'
import { useState } from 'react'

const GenerateAIPost = () => {
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState([])
  const [prompt, setPrompt] = useState('')
  const [coverImage, setCoverImage] = useState(null)
  const [generatedContent, setGeneratedContent] = useState('')

  const [postData, setPostData] = useState({
    title: '',
    description: '',
    cover: '',
    tags: [],
    prompt: '',
    aiContent: '',
  })

  const handleGeneratePost = async () => {
    try {
      const response = await fetch('/api/generate-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })
      const data = await response.json()
      setGeneratedContent(data.generatedText) // Update editor with AI response
    } catch (error) {
      console.error('Error generating post:', error)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 w-full h-full">
      <FormSection
        postData={postData}
        setPostData={setPostData}
        
      />
      <OutputSection
        content={generatedContent}
        setContent={setGeneratedContent}
      />
    </div>
  )
}

export default GenerateAIPost
