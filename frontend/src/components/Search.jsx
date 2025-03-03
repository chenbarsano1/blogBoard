import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchTerm.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <div className='relative'>
      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
        className="w-full pl-12 pr-4 py-2 text-black border border-gray-300 rounded-full focus:broder-black hover:border-black"
      />
    </div>
  )
}

export default Search
