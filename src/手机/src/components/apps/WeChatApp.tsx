import React from 'react';
import { ChevronLeft, Plus, Search, Camera, MessageCircle, Users, Compass, User } from 'lucide-react';

export default function WeChatApp({ onClose }: { onClose: () => void }) {
  const chats = [
    {
      id: 1,
      name: 'Mom',
      avatar: 'https://i.pravatar.cc/150?u=mom',
      lastMessage: 'Did you eat yet?',
      time: '12:30',
      unread: 2
    },
    {
      id: 2,
      name: 'Work Group',
      avatar: 'https://i.pravatar.cc/150?u=work',
      lastMessage: 'Project deadline is tomorrow.',
      time: 'Yesterday',
      unread: 0
    },
    {
      id: 3,
      name: 'Best Friend',
      avatar: 'https://i.pravatar.cc/150?u=friend',
      lastMessage: 'Check out this funny video!',
      time: 'Tuesday',
      unread: 1
    },
    {
      id: 4,
      name: 'File Transfer',
      avatar: 'https://i.pravatar.cc/150?u=file',
      lastMessage: '[File] presentation.pdf',
      time: 'Monday',
      unread: 0
    }
  ];

  return (
    <div className="flex flex-col h-full bg-[#EDEDED]">
      {/* Header */}
      <div className="bg-[#EDEDED] pt-12 pb-3 px-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2 w-1/3">
          <button onClick={onClose} className="p-1 -ml-1 text-gray-900">
            <ChevronLeft size={28} />
          </button>
        </div>
        <div className="w-1/3 text-center">
          <h1 className="text-[17px] font-semibold text-gray-900">微信</h1>
        </div>
        <div className="flex items-center justify-end gap-4 text-gray-900 w-1/3">
          <Search size={22} />
          <Plus size={24} />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto bg-white">
        {chats.map((chat, index) => (
          <div key={chat.id} className="flex items-center px-4 py-3 active:bg-gray-100 transition-colors">
            <div className="relative">
              <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-lg object-cover" />
              {chat.unread > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {chat.unread}
                </div>
              )}
            </div>
            <div className="ml-3 flex-1 border-b border-gray-100 pb-3 pt-1">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-[16px] font-medium text-gray-900">{chat.name}</h3>
                <span className="text-xs text-gray-400">{chat.time}</span>
              </div>
              <p className="text-[14px] text-gray-500 truncate pr-4">{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Tab Bar */}
      <div className="bg-[#F7F7F7] border-t border-gray-200 flex justify-around items-center h-[83px] pb-5 pt-1">
        <div className="flex flex-col items-center gap-0.5 text-[#07C160]">
          <MessageCircle size={26} className="fill-current" />
          <span className="text-[10px] font-medium">微信</span>
        </div>
        <div className="flex flex-col items-center gap-0.5 text-gray-900">
          <Users size={26} />
          <span className="text-[10px] font-medium">通讯录</span>
        </div>
        <div className="flex flex-col items-center gap-0.5 text-gray-900">
          <Compass size={26} />
          <span className="text-[10px] font-medium">发现</span>
        </div>
        <div className="flex flex-col items-center gap-0.5 text-gray-900">
          <User size={26} />
          <span className="text-[10px] font-medium">我</span>
        </div>
      </div>
    </div>
  );
}
