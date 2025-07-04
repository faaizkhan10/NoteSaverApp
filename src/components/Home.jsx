import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPaste, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get('pasteId');
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);

    }

  }, [pasteId]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }

    if (pasteId) {
      dispatch(updateToPastes(paste));
    }
    else {
      dispatch(addToPaste(paste));
    }

    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-md text-gray-900">
      <div className="flex flex-row gap-4 mb-4">
        <input
          className="flex-1 p-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white text-gray-900"
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={createPaste}
          className="px-4 py-2 rounded-2xl bg-blue-200 text-white hover:bg-blue-300 transition font-semibold"
        >
          {pasteId ? 'Update My Paste' : 'Create My Paste'}
        </button>
      </div>
      <textarea
        className="w-full rounded-2xl mt-4 min-h-[200px] p-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white text-gray-900"
        value={value}
        placeholder="Enter your note here"
        onChange={(e) => setValue(e.target.value)}
        rows={10}
      />
    </div>

  )
}

export default Home


