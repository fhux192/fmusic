
import React from "react";

const SongCard = ({ song }) => {

  if (!song.url) {
    return null;
  }

  return (
    <div className="group cursor-pointer relative flex flex-col p-3 rounded-2xl bg-neutral-800/50 hover:bg-neutral-700/80 transition-all duration-300 ease-in-out">
      <div className="relative cursor-pointer w-full mb-3 md:mb-4 aspect-square rounded-md overflow-hidden bg-neutral-700">
        <iframe
          className="w-full h-full cursor-pointer"
          src={song.url}
          title={song.title} 
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="flex cursor-pointer flex-col">
        <h3
          className="font-bold cursor-pointer text-white text-xs sm:text-sm truncate"
          title={song.title}
        >
          {song.title}
        </h3>
        <p
          className="text-neutral-400 cursor-pointer text-[11px] sm:text-xs truncate"
          title={song.artist}
        >
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
      <h2 className="text-2xl sm:text-3xl lg:text-4xl cursor-default font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-bl from-red-500 to-blue-500">
        Bài hát gợi ý cho bạn
      </h2>

      <div className="mb-10 text-center">
        <p className="text-neutral-300 italic max-w-3xl mx-auto">
          "{description}"
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {songs.map((song) => (
          <SongCard className="cursor-pointer" key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
}

export default SongList;
