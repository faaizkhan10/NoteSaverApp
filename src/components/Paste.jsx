import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { removeFromPaste } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = pastes.filter((paste) => {
    return paste.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  function handleDelete(pasteId) {
    dispatch(removeFromPaste(pasteId));
  }
  return (
    <div>
      <input
        className='p-2 rounded-2xl mt-2 w-[600px] pl-5'
        type='search'
        placeholder='search here'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='flex flex-col gap-5'>
        {
          filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div className='border' key={paste?._id}>
                <div>
                  {paste.title}
                </div>
                <div>
                  {paste.content}
                </div>
                <div className='flex flex-row gap-4 place-content-evenly'>
                  <button>
                    <a href={`/?pasteId=${paste?._id}`}>
                      Edit
                    </a>
                  </button>
                  <button>
                    <a href ={`/pastes/${paste?._id}`}>
                      View
                    </a>
                    
                  </button>
                  <button onClick={() => handleDelete(paste?._id)}>
                    Delete
                  </button>
                  <button onClick={() => {
                    navigator.clipboard.writeText(paste?.content)
                    toast.success("Content copied to clipboard!")
                  }}>
                    Copy
                  </button>
                  <button>
                    Share
                  </button>
                </div>
                <div>
                  {paste.createdAt}
                </div>
              </div>
            )
          }
          )
        }
      </div>
    </div>
  )
}

export default Paste
