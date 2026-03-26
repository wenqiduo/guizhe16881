import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Battery,
  Wifi,
  Signal,
  MessageCircle,
  Newspaper,
  Users,
  BookHeart,
  Aperture,
  Settings as SettingsIcon,
  X,
} from 'lucide-react';
import {postRequestCloseTavernPhone} from './tavernPhoneBridge';

// Import Apps (we will create these later)
import ForumApp from './components/apps/ForumApp';
import NewsApp from './components/apps/NewsApp';
import WeChatApp from './components/apps/WeChatApp';
import DiaryApp from './components/apps/DiaryApp';
import MomentsApp from './components/apps/MomentsApp';
import SettingsApp from './components/apps/SettingsApp';

type AppId = 'forum' | 'news' | 'wechat' | 'diary' | 'moments' | 'settings' | null;

interface AppConfig {
  id: AppId;
  name: string;
  icon: React.ReactNode;
  color: string;
  component: React.FC<{ onClose: () => void, setWallpaper?: (url: string) => void }>;
}

const APPS: AppConfig[] = [
  { id: 'wechat', name: '微信', icon: <MessageCircle size={34} color="white" strokeWidth={1.5} />, color: 'bg-[#07C160]', component: WeChatApp },
  { id: 'moments', name: '朋友圈', icon: <Aperture size={34} color="white" strokeWidth={1.5} />, color: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500', component: MomentsApp },
  { id: 'diary', name: '日记', icon: <BookHeart size={34} color="#f59e0b" strokeWidth={1.5} />, color: 'bg-white', component: DiaryApp },
  { id: 'news', name: '新闻', icon: <Newspaper size={34} color="white" strokeWidth={1.5} />, color: 'bg-[#FF2D55]', component: NewsApp },
  { id: 'forum', name: '论坛', icon: <Users size={34} color="white" strokeWidth={1.5} />, color: 'bg-[#007AFF]', component: ForumApp },
  { id: 'settings', name: '设置', icon: <SettingsIcon size={34} color="white" strokeWidth={1.5} />, color: 'bg-[#8E8E93]', component: SettingsApp },
];

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeApp, setActiveApp] = useState<AppId>(null);
  const [wallpaper, setWallpaper] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false });

  const ActiveAppComponent = APPS.find(app => app.id === activeApp)?.component;

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4 font-sans relative">
      <button
        type="button"
        className="absolute top-3 right-3 z-[100] flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white/90 backdrop-blur-md transition hover:bg-black/55"
        title="关闭小手机"
        aria-label="关闭小手机"
        onClick={() => postRequestCloseTavernPhone()}
      >
        <X size={18} strokeWidth={2.5} />
      </button>
      {/* Phone Frame */}
      <div className="relative w-[375px] h-[812px] bg-black rounded-[55px] shadow-2xl border-[8px] border-neutral-800 overflow-hidden ring-1 ring-white/10">
        
        {/* Screen Content */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-500"
          style={{ backgroundImage: `url(${wallpaper})` }}
        >
          {/* Status Bar */}
          <div className="absolute top-0 inset-x-0 h-14 flex items-center justify-between px-7 z-50 text-white text-[15px] font-semibold mix-blend-difference">
            <span className="mt-1">{timeString}</span>
            <div className="flex items-center gap-1.5 mt-1">
              <Signal size={17} strokeWidth={2.5} />
              <Wifi size={17} strokeWidth={2.5} />
              <Battery size={22} strokeWidth={2} />
            </div>
          </div>

          {/* Dynamic Island / Notch */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-[24px] z-50 flex items-center justify-between px-2 shadow-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-[#111] ml-1 shadow-inner"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#111] mr-1 shadow-inner"></div>
          </div>

          {/* Home Screen */}
          <div className="pt-20 px-6 h-full flex flex-col">
            <div className="grid grid-cols-4 gap-x-4 gap-y-7">
              {APPS.slice(0, 5).map((app) => (
                <button 
                  key={app.id} 
                  onClick={() => setActiveApp(app.id)}
                  className="flex flex-col items-center gap-1.5 group"
                >
                  <div className={`w-[62px] h-[62px] rounded-[18px] flex items-center justify-center shadow-sm group-active:scale-90 transition-transform duration-200 ${app.color} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50"></div>
                    {app.icon}
                  </div>
                  <span className="text-white text-[11px] font-medium tracking-wide drop-shadow-md">{app.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dock */}
          <div className="absolute bottom-5 inset-x-4 h-[88px] bg-white/25 backdrop-blur-2xl rounded-[34px] flex items-center justify-center gap-6 px-4 border border-white/10 shadow-xl">
             {APPS.slice(5, 6).map((app) => (
                <button 
                  key={app.id} 
                  onClick={() => setActiveApp(app.id)}
                  className="flex flex-col items-center group"
                >
                  <div className={`w-[62px] h-[62px] rounded-[18px] flex items-center justify-center shadow-sm group-active:scale-90 transition-transform duration-200 ${app.color} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50"></div>
                    {app.icon}
                  </div>
                </button>
              ))}
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-white rounded-full z-50 mix-blend-difference"></div>

          {/* Active App Overlay */}
          <AnimatePresence>
            {activeApp && ActiveAppComponent && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.9, filter: 'blur(5px)' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.8 }}
                className="absolute inset-0 bg-white z-40 overflow-hidden flex flex-col rounded-[45px]"
              >
                <ActiveAppComponent 
                  onClose={() => setActiveApp(null)} 
                  setWallpaper={activeApp === 'settings' ? setWallpaper : undefined}
                />
                
                {/* App Home Indicator (Swipe up to close) */}
                <div 
                  className="absolute bottom-0 inset-x-0 h-8 flex items-end justify-center pb-1.5 cursor-pointer z-50 bg-gradient-to-t from-white/80 to-transparent"
                  onClick={() => setActiveApp(null)}
                >
                  <div className="w-1/3 h-1 bg-black rounded-full"></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
