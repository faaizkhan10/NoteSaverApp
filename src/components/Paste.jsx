import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPastes, deletePaste } from "../redux/pasteSlice";

const Paste = () => {
  const dispatch = useDispatch();
  const { pastes, loading } = useSelector((state) => state.paste);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchPastes());
    }
  }, [dispatch, isAuthenticated]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this paste?")) {
      await dispatch(deletePaste(id));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please log in to view your pastes
          </h2>
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Pastes</h1>
        <Link
          to="/"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Create New Paste
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="text-gray-600">Loading your pastes...</div>
        </div>
      ) : pastes.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-600 mb-4">No pastes found</div>
          <Link
            to="/"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Create your first paste
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {pastes.map((paste) => (
            <div
              key={paste._id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {paste.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Created: {formatDate(paste.createdAt)}
                  </p>
                  {paste.isPublic && (
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Public
                    </span>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <Link
                    to={`/?pasteId=${paste._id}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/pastes/${paste._id}`}
                    className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(paste._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded border">
                <p className="text-gray-800 text-sm line-clamp-3">
                  {paste.content.length > 200
                    ? `${paste.content.substring(0, 200)}...`
                    : paste.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Paste;
