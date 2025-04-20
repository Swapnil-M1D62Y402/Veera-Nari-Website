'use client';
import { useState, useEffect } from 'react';

export default function CommentSection() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Fetch comments on mount
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments`);
        const data = await response.json();
        setComments(data);
      } catch (err) {
        console.error('Error loading comments:', err);
      }
    };
    fetchComments();
  }, []);

  // Submit new comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ content: newComment })
      });

      const comment = await response.json();
      setComments([comment, ...comments]);
      setNewComment('');
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Comments ({comments.length})</h2>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment..."
          rows="3"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          required
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Post Comment
        </button>
      </form>

      <div className="space-y-4">
        {comments.length === 0 && (
          <p className="text-gray-500 italic">No comments yet. Be the first to share your thoughts!</p>
        )}
        
        {comments.map(comment => (
          <div key={comment.id} className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-700">{comment.user.username}</span>
              <span className="text-sm text-gray-500">
                {new Date(comment.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            <p className="text-gray-800 leading-relaxed">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};