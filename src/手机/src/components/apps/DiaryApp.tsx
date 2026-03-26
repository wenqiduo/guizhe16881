import React from 'react';
import { ChevronLeft, Plus, Search, MoreHorizontal } from 'lucide-react';

export default function DiaryApp({ onClose }: { onClose: () => void }) {
  const entries = [
    {
      id: 1,
      author: 'Sarah Jenkins',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
      title: 'A Beautiful Day at the Park',
      preview: 'The weather was perfect today. I went for a walk and saw so many dogs playing around. It really cleared my mind after a long week of work.',
      date: 'Today',
      time: '14:30'
    },
    {
      id: 2,
      author: 'Michael Chen',
      avatar: 'https://i.pravatar.cc/150?u=michael',
      title: 'Project Launch Success',
      preview: 'We finally launched the new feature! The team worked so hard and the feedback has been overwhelmingly positive. I am so proud of everyone.',
      date: 'Yesterday',
      time: '18:45'
    },
    {
      id: 3,
      author: 'Emma Wilson',
      avatar: 'https://i.pravatar.cc/150?u=emma',
      title: 'New Recipe Attempt',
      preview: 'Tried making sourdough bread for the first time. It did not rise as much as I hoped, but the flavor was actually pretty good. Will try again next week.',
      date: 'Monday',
      time: '20:15'
    }
  ];

  return (
    <div className="flex flex-col h-full bg-[#F2F2F7]">
      {/* Header */}
      <div className="bg-[#F2F2F7] pt-12 pb-3 px-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <button onClick={onClose} className="p-1 -ml-1 text-amber-500">
            <ChevronLeft size={28} />
          </button>
          <span className="text-amber-500 font-medium text-lg">Folders</span>
        </div>
        <button className="p-1 text-amber-500">
          <MoreHorizontal size={24} />
        </button>
      </div>

      <div className="px-4 pb-2 pt-4">
        <h1 className="text-[34px] font-bold text-black mb-2 tracking-tight">日记</h1>
        
        {/* Search */}
        <div className="bg-[#E3E3E8] rounded-[10px] flex items-center px-2 py-1.5 mb-6">
          <Search size={18} className="text-[#8E8E93] mr-1.5 ml-1" />
          <input 
            type="text" 
            placeholder="Search" 
            className="bg-transparent border-none outline-none text-[17px] w-full placeholder-[#8E8E93]"
          />
        </div>
      </div>

      {/* Entries List */}
      <div className="flex-1 overflow-y-auto px-4 pb-20">
        <div className="bg-white rounded-[10px] overflow-hidden shadow-sm">
          {entries.map((entry, index) => (
            <div key={entry.id} className={`p-4 ${index !== entries.length - 1 ? 'border-b border-gray-100' : ''}`}>
              <div className="flex items-center gap-2.5 mb-2.5">
                <img src={entry.avatar} alt={entry.author} className="w-7 h-7 rounded-full object-cover" />
                <span className="text-[15px] font-medium text-black">{entry.author}</span>
                <span className="text-[14px] text-[#8E8E93] ml-auto">{entry.date}</span>
              </div>
              <h3 className="text-[17px] font-semibold text-black mb-1">{entry.title}</h3>
              <p className="text-[15px] text-[#8E8E93] line-clamp-2 leading-snug">{entry.preview}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="absolute bottom-0 inset-x-0 h-20 bg-[#F2F2F7]/80 backdrop-blur-md border-t border-gray-200 flex items-center justify-between px-6 pb-6">
        <span className="text-xs text-gray-500 font-medium">{entries.length} Notes</span>
        <button className="text-amber-500">
          <Plus size={28} />
        </button>
      </div>
    </div>
  );
}
