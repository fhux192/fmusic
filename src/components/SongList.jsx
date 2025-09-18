import React, { useState, useEffect } from 'react';
import { FaPlay, FaMusic } from 'react-icons/fa';

const iconColors = [
  'text-rose-400', 'text-amber-400', 'text-lime-400', 'text-emerald-400', 
  'text-cyan-400', 'text-sky-400', 'text-indigo-400', 'text-violet-400',
  'text-fuchsia-400', 'text-orange-400', 'text-teal-400', 'text-pink-400',
];

const SongCard = ({ song, index }) => { 
  const [colorIndex, setColorIndex] = useState(index % iconColors.length);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setColorIndex(prevIndex => (prevIndex + 1) % iconColors.length);
    }, 2000); 
    return () => clearInterval(intervalId);
  }, []);

  const colorClass = iconColors[colorIndex];

  return (
    <div className="group relative flex flex-col p-3 rounded-2xl cursor-pointer bg-neutral-800/50 hover:bg-neutral-700/80 transition-all duration-300 ease-in-out">
      <div className="relative w-full mb-3 md:mb-4 aspect-square rounded-md flex items-center justify-center bg-neutral-700/60">
        <FaMusic className={`text-4xl md:text-5xl transition-colors duration-500 ${colorClass}`} />
        <button className="cursor-pointer absolute bottom-2 right-2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-green-600 flex items-center justify-center text-white shadow-xl opacity-0 group-hover:opacity-100 group-hover:bottom-3 md:group-hover:bottom-4 transform transition-all duration-300 ease-in-out">
          <FaPlay size={14} className="ml-1" />
        </button>
      </div>
      <div className="flex flex-col">
        <h3 className="font-bold text-white text-xs sm:text-sm truncate" title={song.title}>
          {song.title}
        </h3>
        <p className="text-neutral-400 text-[11px] sm:text-xs truncate" title={song.artist}>
          {song.artist}
        </p>
      </div>
    </div>
  );
};

function SongList({ description, songs }) {
  if (!songs || songs.length === 0) {
    return null; 
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-bl from-red-500 to-blue-500">
        Bài hát gợi ý cho bạn
      </h2>
      
      <div className="mb-10 text-center">
        <p className="text-neutral-300 italic max-w-3xl mx-auto">"{description}"</p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {songs.map((song, index) => (
          <SongCard key={song.id} song={song} index={index} />
        ))}
      </div>
    </div>
  );
}

export default SongList;