'use client';
import { useState, useEffect } from 'react';

type Comment = {
  id: number;
  content: string;
  createdAt: string;
  user: {
    username: string;
  };
};

export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');

  // Fetch comments on mount
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`);
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        const data = await response.json();
        setComments(data);
      } catch (err) {
        console.error('Error loading comments:', err);
        alert('Failed to load comments. Please try again later.');
      }
    };
    fetchComments();
  }, []);

  // Submit new comment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: newComment }),
            credentials: 'include' // Include cookies in the request
          });

      if (!response.ok) {
        throw new Error('Failed to post comment');
      }

      const comment = await response.json();
      setComments([comment, ...comments]);
      setNewComment('');
    } catch (err) {
      console.error('Error posting comment:', err);
      alert('Failed to post comment. Please try again later.');
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
          rows={3}
          className="w-full p-3 border rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
        
        {comments?.map(comment => (
          <div key={comment.id} className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-700">{comment.user.username}</span>
              <span className="text-sm text-gray-500">
                {comment.createdAt
                  ? new Date(comment.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })
                  : 'Invalid date'}
              </span>
            </div>
            <p className="text-gray-800 leading-relaxed">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}