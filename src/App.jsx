import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import ImageUploader from './components/ImageUploader';
import SongList from './components/SongList';

function App() {
  const songListRef = useRef(null);
  const [isSongListVisible, setIsSongListVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [suggestionData, setSuggestionData] = useState(null);

  const handleSuggestionComplete = (data) => {
    setSuggestionData(data);
    setIsSongListVisible(true);
  };

  const handleImageRemove = () => {
    setIsSongListVisible(false);
    setSuggestionData(null);
    setError('');
  };
  
  useEffect(() => {
    if (isSongListVisible) {
      const timer = setTimeout(() => {
        songListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isSongListVisible]);

  return (
    <div className="relative min-h-screen w-full bg-gray-950 text-white font-sans">
      <Navbar />

      <main className="flex flex-col items-center w-full px-4 text-center py-12 sm:py-16">
        
        <div className="">
            <h1 className="text- cursor-default sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-1 lg:mb-2  
                bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                Gợi ý bài hát bằng hình ảnh
            </h1>
            <p className="text-sm cursor-default mb-6 lg:mb-8 font-bold  sm:text-base text-gray-500 max-w-xl mx-auto">
                Tải lên một bức ảnh và tìm kiếm giai điệu 
            </p>
        </div>
        
        <ImageUploader 
          onImageRemove={handleImageRemove} 
          onSuggestionComplete={handleSuggestionComplete}
          setIsLoading={setIsLoading}
          setError={setError}
        />

        {isLoading && <p className="mt-8 text-lg text-blue-400">Đang phân tích ảnh, vui lòng chờ...</p>}
        {error && <p className="mt-8 text-lg text-red-500">{error}</p>}

        {isSongListVisible && suggestionData && (
          <div ref={songListRef} className="w-full mt-12 sm:mt-16">
            <SongList 
              description={suggestionData.description} 
              songs={suggestionData.suggested_songs}
            />
          </div>
        )}

      </main>

      <footer className="absolute cursor-default font-bold bottom-0 left-0 right-0 text-center p-5 text-gray-700 text-xs sm:text-sm">
        <p>Created by Nguyen Hoang Phuc</p>
      </footer>
    </div>
  );
}

export default App;