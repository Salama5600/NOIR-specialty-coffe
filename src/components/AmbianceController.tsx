import React from 'react';
import { Volume2, VolumeX, Play, Pause, Music, X, Disc3 } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';

export const AmbianceController: React.FC = () => {
  const {
    isAmbianceOpen,
    setIsAmbianceOpen,
    isPlayingAudio,
    toggleAudio,
    audioVolume,
    setAudioVolume
  } = useApp();

  if (!isAmbianceOpen) {
    return (
      <button
        onClick={() => setIsAmbianceOpen(true)}
        className="fixed bottom-6 right-6 z-40 px-4 py-2.5 rounded-full bg-white border border-[#EBE4DA] shadow-lg flex items-center gap-2 text-xs text-[#1A1816] hover:text-[#B57438] transition-all cursor-pointer caramel-glow-hover"
      >
        <div className="relative">
          <Music className={`w-3.5 h-3.5 text-[#B57438] ${isPlayingAudio ? 'animate-bounce' : ''}`} />
          {isPlayingAudio && (
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#B57438] rounded-full animate-ping" />
          )}
        </div>
        <span className="font-sans text-[11px] font-bold hidden sm:inline">
          {isPlayingAudio ? 'Lounge Jazz Playing' : 'Ambiance Sound'}
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 w-[280px] rounded-[16px] bg-white border border-[#EBE4DA] p-4 shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#EBE4DA]">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#B57438] uppercase tracking-wider">
          <Disc3 className={`w-4 h-4 ${isPlayingAudio ? 'animate-spin' : ''}`} />
          <span>NOIR Sound System</span>
        </div>
        <button
          onClick={() => setIsAmbianceOpen(false)}
          className="text-neutral-400 hover:text-neutral-800 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Track Info */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#EBE4DA] flex items-center justify-center text-[#B57438]">
          <Music className="w-5 h-5" />
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="text-xs font-serif font-bold text-[#1A1816] truncate">
            Late Night Lounge Jazz
          </div>
          <div className="text-[10px] text-[#7A736A] truncate font-sans">
            Analog Rhodes & Warm Vinyl
          </div>
        </div>
      </div>

      {/* Mute/Play Toggle + Animated Audio Equalizer Bars */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={toggleAudio}
          className="px-4 py-1.5 rounded-full bg-[#B57438] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[#9E6028] transition-all cursor-pointer shadow-sm"
        >
          {isPlayingAudio ? (
            <>
              <Pause className="w-3 h-3 fill-current" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 fill-current" />
              <span>Play Jazz</span>
            </>
          )}
        </button>

        {/* Dynamic equalizer */}
        <div className="flex items-end gap-1 h-4">
          {[0.8, 0.4, 0.9, 0.5, 0.7].map((h, i) => (
            <span
              key={i}
              className={`w-1 bg-[#B57438] rounded-full transition-all duration-300 ${
                isPlayingAudio ? 'animate-pulse' : 'opacity-25'
              }`}
              style={{
                height: isPlayingAudio ? `${h * 16}px` : '4px',
                animationDelay: `${i * 150}ms`
              }}
            />
          ))}
        </div>
      </div>

      {/* Volume Slider */}
      <div className="pt-2 border-t border-[#EBE4DA]">
        <div className="flex items-center justify-between text-[10px] text-[#68625B] mb-1">
          <span className="flex items-center gap-1">
            {audioVolume === 0 ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3 text-[#B57438]" />}
            <span>Volume</span>
          </span>
          <span className="font-mono font-bold text-[#B57438]">{Math.round(audioVolume * 100)}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={audioVolume}
          onChange={(e) => setAudioVolume(parseFloat(e.target.value))}
          className="w-full accent-[#B57438] h-1.5 bg-[#FAF7F2] rounded-lg cursor-pointer"
        />
      </div>

    </div>
  );
};
