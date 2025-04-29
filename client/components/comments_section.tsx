'use client';
import { useState, useEffect } from 'react';
import DashBoard_Navbar from './dashboard_navbar';
import { commentService } from '@/app/api/api';
import Link from 'next/link';
import { SidebarNav } from './sidebar-nav';

type Comment = {
  id: number;
  content: string;
  createdAt: string;
  isAnonymous: boolean,
  user: {
    username: string;
  };
};

export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);

  // Fetch comments on mount
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await commentService.getComments();
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
      const comment = await commentService.createComment(newComment, isAnonymous);
      setComments([comment, ...comments]);
      setNewComment('');
      setIsAnonymous(false);
    } catch (err) {
      console.error('Error posting comment:', err);
      alert('Failed to post comment. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#121212]">
      <SidebarNav className="w-full md:w-64" />
      <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
        <DashBoard_Navbar />
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Comments ({comments.length})</h2>
            {/* <Link 
              href="/dashboard" 
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Back to Dashboard
            </Link> */}
          </div>
          <form onSubmit={handleSubmit} className="mb-8">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment..."
              rows={3}
              className="w-full p-3 border rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-600">Post anonymously</span>
              </label>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Post Comment
              </button>
            </div>
          </form>

          <div className="space-y-4">
            {comments.length === 0 && (
              <p className="text-gray-500 italic">No comments yet. Be the first to share your thoughts!</p>
            )}
            
            {comments?.map(comment => (
              <div key={comment.id} className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700">
                    {comment.isAnonymous ? 'Anonymous' : comment.user.username}
                  </span>
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
      </main>
    </div>
  );
}