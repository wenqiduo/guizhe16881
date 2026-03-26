import React from 'react';
import { MessageSquare, ThumbsUp, Share2, MoreHorizontal, ChevronLeft } from 'lucide-react';

export default function ForumApp({ onClose }: { onClose: () => void }) {
  const posts = [
    {
      id: 1,
      author: 'TechEnthusiast',
      avatar: 'https://i.pravatar.cc/150?u=1',
      title: 'Just got the new AI Studio, it is amazing!',
      content: 'I have been playing around with the new features and the code generation is incredibly fast. Anyone else tried it?',
      likes: 342,
      comments: 56,
      time: '2h ago'
    },
    {
      id: 2,
      author: 'DesignGuru',
      avatar: 'https://i.pravatar.cc/150?u=2',
      title: 'What are your favorite UI trends for 2026?',
      content: 'I am seeing a lot of glassmorphism coming back, combined with brutalist typography. What do you guys think?',
      likes: 128,
      comments: 34,
      time: '4h ago'
    },
    {
      id: 3,
      author: 'CodeNinja',
      avatar: 'https://i.pravatar.cc/150?u=3',
      title: 'Help with React useEffect dependency array',
      content: 'I keep getting infinite loops when I add objects to my dependency array. How do you guys handle this?',
      likes: 45,
      comments: 12,
      time: '5h ago'
    }
  ];

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md pt-12 pb-2 px-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <button onClick={onClose} className="p-1 -ml-1 text-[#007AFF]">
            <ChevronLeft size={28} />
          </button>
        </div>
        <button className="text-[#007AFF] font-medium text-[17px]">Post</button>
      </div>

      <div className="bg-white px-4 pb-2 pt-2">
        <h1 className="text-[34px] font-bold text-black tracking-tight">论坛</h1>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto pb-8">
        <div className="flex gap-4 px-4 py-3 bg-white mb-2 overflow-x-auto hide-scrollbar border-b border-gray-100">
          {['All', 'Tech', 'Design', 'Help', 'Showcase'].map((tag, i) => (
            <button key={i} className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[15px] font-medium ${i === 0 ? 'bg-[#007AFF] text-white' : 'bg-[#F2F2F7] text-black'}`}>
              {tag}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          {posts.map(post => (
            <div key={post.id} className="bg-white p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <img src={post.avatar} alt={post.author} className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{post.author}</p>
                    <p className="text-xs text-gray-500">{post.time}</p>
                  </div>
                </div>
                <button className="text-gray-400"><MoreHorizontal size={20} /></button>
              </div>
              <h2 className="text-base font-semibold text-gray-900 mb-1">{post.title}</h2>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{post.content}</p>
              
              <div className="flex items-center gap-6 text-gray-500">
                <button className="flex items-center gap-1.5 text-sm hover:text-blue-500">
                  <ThumbsUp size={18} />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-1.5 text-sm hover:text-blue-500">
                  <MessageSquare size={18} />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center gap-1.5 text-sm hover:text-blue-500 ml-auto">
                  <Share2 size={18} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
