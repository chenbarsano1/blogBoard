import FormSection from '@/components/FormSection'
import OutputSection from '@/components/OutputSection'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  useCreatePostMutation,
  useGeneratePostMutation,
} from '../slices/postsApiSlice'
import { toast } from 'react-toastify'

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

  const [generatePost, { isLoading: isGenerating }] = useGeneratePostMutation()

  const { userInfo } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [createPost, { isLoading, error }] = useCreatePostMutation()

  const handleGeneratePost = async (e) => {
    e.preventDefault()
    
    if (!postData.prompt) {
      toast.error('Please enter a prompt!')
      return
    }

    try {
      const response = await generatePost(postData.prompt).unwrap()
      setGeneratedContent(response.generatedText)
      toast.success('Post generated successfully!')
    } catch (error) {
      console.error('Error generating post:', error)
      toast.error(error.data?.message || 'Failed to generate post.')
    }
  }

  const handlePublish = async () => {
    if (!userInfo) {
      toast.error('Please login to publish a post')
      navigate('/login')
      return
    }
    if (!postData.title || !postData.description || !generatedContent) {
      toast.error('Title, description, and content are required!')
      return
    }

    const postDetails = {
      title: postData.title,
      desc: postData.description,
      tags: postData.tags,
      image: postData.cover?.url || '',
      content: generatedContent,
      generatedByAI: true,
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
        setGeneratedContent={setGeneratedContent}
        handlePublish={handlePublish}
      />
    </div>
  )
}

export default GenerateAIPost
