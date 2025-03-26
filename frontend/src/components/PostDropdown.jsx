import { useSelector } from 'react-redux'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import {
  Menu,
  MenuItem,
  MenuButton,
  MenuItems,
  Transition,
} from '@headlessui/react'

const PostDropdown = ({ post }) => {
  const { userInfo } = useSelector((state) => state.auth)
  const isAuthor = post?.creator?._id === userInfo?._id
  console.log('post creator:', post?.creator?._id)
  console.log('current user:', userInfo)

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-offset-gray-100">
          <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div className="py-1">
          {isAuthor ? (
            <>
              <MenuItem
                as="button"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Edit
              </MenuItem>
              <MenuItem
                as="button"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Delete
              </MenuItem>
            </>
          ) : (
            <MenuItem
              as="button"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Save
            </MenuItem>
          )}
        </div>
      </MenuItems>
    </Menu>
  )
}

export default PostDropdown
