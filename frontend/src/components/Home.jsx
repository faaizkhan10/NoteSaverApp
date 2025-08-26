import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPaste, updatePaste } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { pastes, loading } = useSelector((state) => state.paste);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (pasteId) {
      const paste = pastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
        setIsPublic(paste.isPublic);
      }
    }
  }, [pasteId, pastes, isAuthenticated, navigate]);

  const handleCreatePaste = async () => {
    if (!title.trim() || !value.trim()) {
      return;
    }

    const pasteData = {
      title: title.trim(),
      content: value.trim(),
      isPublic,
    };

    if (pasteId) {
      await dispatch(updatePaste({ id: pasteId, pasteData }));
    } else {
      await dispatch(createPaste(pasteData));
    }

    setTitle("");
    setValue("");
    setIsPublic(false);
    setSearchParams({});
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-md text-gray-900">
      <div className="flex flex-col gap-4 mb-4">
        <input
          className="flex-1 p-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white text-gray-900"
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex items-center gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">
              Make this paste public
            </span>
          </label>
          <button
            onClick={handleCreatePaste}
            disabled={loading || !title.trim() || !value.trim()}
            className="px-4 py-2 rounded-2xl bg-blue-200 text-white hover:bg-blue-300 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Saving..."
              : pasteId
              ? "Update My Paste"
              : "Create My Paste"}
          </button>
        </div>
      </div>
      <textarea
        className="w-full rounded-2xl mt-4 min-h-[200px] p-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white text-gray-900"
        value={value}
        placeholder="Enter your note here"
        onChange={(e) => setValue(e.target.value)}
        rows={10}
      />
    </div>
  );
};

export default Home;
