import { SparklesIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const CreatePost = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-5xl font-bold mb-10">Create a new post!</h1>
      <div className="flex space-x-4">
      <Link to="/create-own-post">
        <button className="cursor-pointer px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 flex items-center gap-2">
          <PencilSquareIcon className="w-5 h-5 text-gray-600" />
          Create Your Own
        </button>
      </Link>
        <button className="cursor-pointer px-4 py-2 bg-black text-white rounded hover:bg-gray-800 flex items-center gap-2">
          <SparklesIcon className="w-5 h-5 text-yellow-400" />
          Generate with AI
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
