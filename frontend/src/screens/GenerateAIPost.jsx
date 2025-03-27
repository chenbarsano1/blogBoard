import FormSection from '@/components/FormSection'
import OutputSection from '@/components/OutputSection'
import { useState } from 'react'

const GenerateAIPost = () => {
  const [postData, setPostData] = useState({
    title: '',
    description: '',
    cover: '',
    tags: [],
    prompt: '',
    aiContent: '',
  })

  const [generatedContent, setGeneratedContent] = useState('')

  const handleGeneratePost = async (e) => {
    // try {
    //   const response = await fetch('/api/generate-post', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ prompt }),
    //   })
    //   const data = await response.json()
    //   setGeneratedContent(data.generatedText) // Update editor with AI response
    // } catch (error) {
    //   console.error('Error generating post:', error)
    // }
    e.preventDefault()
    if (!postData.prompt) {
      toast.error('Please enter a prompt!')
      return
    }

    // Simulate generating content by appending "hello" to the prompt
    const simulatedGeneratedContent = `${postData.prompt} hello`

    // Update the generated content in the state
    setGeneratedContent(simulatedGeneratedContent)
  }

  const handlePublish = async () => {
    if (!postData.title || !postData.description || !generatedContent) {
      toast.error('Title, description, and content are required!')
      return
    }

    const postDetails = {
      title: postData.title,
      description: postData.description,
      tags: postData.tags,
      cover: postData.cover?.url || '',
      content: generatedContent,
    }

    try {
      const response = await createPost(postDetails).unwrap()
      toast.success('Post published successfully!')
      navigate(`/post/${response.slug}`)
    } catch (error) {
      toast.error('Failed to publish post. Please try again.')
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 w-full h-full">
      <FormSection
        postData={postData}
        setPostData={setPostData}
        handleGeneratePost={handleGeneratePost}
      />
      <OutputSection
        generatedContent={generatedContent}
        setContent={setGeneratedContent}
        handlePublish={handlePublish}
      />
    </div>
  )
}

export default GenerateAIPost
