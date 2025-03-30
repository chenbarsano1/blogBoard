import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux'

const DaisyDropdown = ({ post }) => {
  const { userInfo } = useSelector((state) => state.auth)
  const isAuthor = post?.creator?._id === userInfo?._id
  return (
    <details className="dropdown">
      <summary className="btn m-1">
        <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
      </summary>
      <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
        {isAuthor ? (
          <>
            <li>
              <a>Edit</a>
            </li>
            <li>
              <a>Delete</a>
            </li>
          </>
        ) : (
          <li>
            <a>Save</a>
          </li>
        )}
      </ul>
    </details>
  )
}

export default DaisyDropdown
