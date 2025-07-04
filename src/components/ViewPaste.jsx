import React, { use, useEffect } from 'react'
import { useParams,useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch
import { addToPaste, updateToPastes } from '../redux/pasteSlice';

const ViewPaste = () => {

  const {id} = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);
  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="p-2 rounded-2xl mt-2
        w-[66%] pl-5"
          type="text"
          placeholder="Enter title here"
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* 
        <button
          onClick={createPaste}
          className="p-2 rounded-2xl mt-2">
          {
            pasteId ? 'Update My Paste' : 'Create My Paste'
          }
        </button> */}
      </div>
      <div className="">
        <textarea
          className="rounded-2xl mt-4,min-h-[500px] p-4"
          value={paste.content}
          disabled
          placeholder="Enter your note here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>

  )
}

export default ViewPaste
