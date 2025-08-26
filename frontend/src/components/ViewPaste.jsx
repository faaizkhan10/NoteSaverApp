import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ViewPaste = () => {
  const { id } = useParams();
  const [paste, setPaste] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, user } = useSelector((state) => state.auth);

  // API URL from environment variable
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    const fetchPaste = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/pastes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Paste not found or access denied");
        }

        const data = await response.json();
        setPaste(data.paste);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchPaste();
    }
  }, [id, token, API_URL]);

  const handleCopy = () => {
    if (paste) {
      navigator.clipboard.writeText(paste.content);
      toast.success("Content copied to clipboard!");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-6">
        <div className="text-center">
          <div className="text-gray-600">Loading paste...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            to="/pastes"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Back to My Pastes
          </Link>
        </div>
      </div>
    );
  }

  if (!paste) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Paste not found
          </h2>
          <Link
            to="/pastes"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Back to My Pastes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {paste.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Created: {formatDate(paste.createdAt)}</span>
                {paste.updatedAt !== paste.createdAt && (
                  <span>Updated: {formatDate(paste.updatedAt)}</span>
                )}
                {paste.isPublic && (
                  <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    Public
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                to={`/?pasteId=${paste._id}`}
                className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700"
              >
                Edit
              </Link>
              <button
                onClick={handleCopy}
                className="bg-gray-600 text-white px-3 py-2 rounded text-sm hover:bg-gray-700"
              >
                Copy
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="bg-gray-50 p-4 rounded border font-mono text-sm whitespace-pre-wrap">
            {paste.content}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <Link
              to="/pastes"
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              ← Back to My Pastes
            </Link>
            <div className="text-sm text-gray-600">Paste ID: {paste._id}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
