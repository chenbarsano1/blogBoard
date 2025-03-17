import { IKContext, IKUpload } from 'imagekitio-react'
import { useRef } from 'react'
import { toast } from 'react-toastify'

const authenticator = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/posts/upload-auth`
    )
    console.log(response)

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      )
    }

    const data = await response.json()
    const { signature, expire, token } = data
    return { signature, expire, token }
  } catch (error) {
    console.error(error)
    toast.error('Failed to authenticate')
  }
}

const Upload = ({ children, type, setProgress, setData }) => {
  const ref = useRef(null)

  const onError = (error) => {
    console.error(error)
    toast.error('Failed to upload')
  }

  const onSuccess = (data) => {
    console.log(data)
    setData(data)
  }

  const onUploadProgress = (progress) => {
    console.log(progress)
    setProgress(Math.round((progress.loaded / progress.total) * 100))
  }

  const handleClick = (e) => {
    e.preventDefault()
    ref.current.click()
  }

  return (
    <IKContext
      publicKey={import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY}
      urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
      authenticator={authenticator}
    >
      <IKUpload
        useUniqueFileName={true}
        onError={onError}
        onSuccess={onSuccess}
        onUploadProgress={onUploadProgress}
        className="hidden"
        ref={ref}
        accept={`${type}/*`}
      />
      <div className="cursor-pointer" onClick={handleClick}>
        {children}
      </div>
    </IKContext>
  )
}

export default Upload
