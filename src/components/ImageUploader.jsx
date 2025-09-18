import React, { useState, useRef } from "react";
import { FiUploadCloud, FiTrash2, FiSend, FiLoader } from "react-icons/fi";

function ImageUploader({ onImageRemove, onSuggestionComplete, setIsLoading, setError }) {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isFetchingUrl, setIsFetchingUrl] = useState(false); 
  const fileInputRef = useRef(null);

  const urlToFile = async (url, filename, mimeType) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: mimeType });
  };

  const processFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleFileChange = (event) => {
    processFile(event.target.files[0]);
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      processFile(event.dataTransfer.files[0]);
      return;
    }
    const html = event.dataTransfer.getData('text/html');
    if (html) {
      const match = html.match(/<img src="([^"]+)"/);
      const url = match && match[1];
      if (url) {
        setIsFetchingUrl(true); 
        setError('');
        try {
          const file = await urlToFile(url, 'image-from-web.jpg', 'image/jpeg');
          processFile(file);
        } catch (err) {
          setError('Không thể tải ảnh từ trang web này. Vui lòng thử ảnh khác.');
          console.error("Lỗi khi tải ảnh từ URL:", err);
        } finally {
          setIsFetchingUrl(false);
        }
        return;
      }
    }
    setError('Không thể xử lý đối tượng được kéo vào. Vui lòng thử lại với file ảnh.');
  };

  const handleRemoveImage = () => { 
    setImage(null); 
    setPreviewUrl(''); 
    if (onImageRemove) onImageRemove();
  };

  const handleSelectFile = () => { fileInputRef.current.click(); };
  const handleDragOver = (event) => { event.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (event) => { event.preventDefault(); setIsDragging(false); };

  const handleSubmit = async () => {
    if (!image) return;
    setIsLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('file', image);
    try {
      const response = await fetch('http://127.0.0.1:5001/suggest', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Server không thể xử lý ảnh này. Vui lòng thử lại.');
      }
      const data = await response.json();
      onSuggestionComplete(data);
    } catch (err) {
      setError(err.message || 'Không thể kết nối đến server.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-gray-900/70 backdrop-blur-xl border border-white/20 rounded-2xl mx-2 p-4 sm:p-6 shadow-2xl">
        {!previewUrl ? (
          <div
            className={`w-full h-56 sm:h-64 border-2 border-dashed rounded-xl flex flex-col justify-center items-center cursor-pointer transition-colors ${isDragging ? 'border-purple-400 bg-gray-800/50' : 'border-gray-600 hover:border-gray-500'}`}
            onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={handleSelectFile}
          >
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" ref={fileInputRef} />
            {isFetchingUrl ? (
              <>
                <FiLoader className="text-gray-400 text-4xl sm:text-5xl mb-4 animate-spin" />
                <p className="text-gray-300 text-sm sm:text-base">Đang tải ảnh từ web...</p>
              </>
            ) : (
              <>
                <FiUploadCloud className="text-gray-400 text-4xl sm:text-5xl mb-4" />
                <p className="text-gray-300 text-sm sm:text-base">Kéo và thả ảnh vào đây</p>
                <p className="text-gray-500 text-xs sm:text-sm mt-1">hoặc</p>
                <p className="text-blue-400 font-semibold mt-2 text-sm sm:text-base">Nhấn để chọn ảnh</p>
              </>
            )}
          </div>
        ) : (
          <div className="text-center">
            <div 
              className="relative mx-auto overflow-hidden rounded-lg mb-6 border border-white/10"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <img src={previewUrl} alt="Preview" className="w-full max-h-[50vh] h-full object-contain" />

              {isDragging && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col justify-center items-center pointer-events-none rounded-lg">
                  <FiUploadCloud className="text-white/80 text-5xl mb-4" />
                  <p className="text-white font-semibold">Thả ảnh mới để thay thế</p>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button onClick={handleRemoveImage} className="w-full sm:w-auto flex items-center justify-center gap-x-2 bg-gray-700 hover:bg-gray-600 text-white/90 font-semibold py-2.5 px-5 rounded-full transition-colors">
                <FiTrash2 /> Bỏ chọn
              </button>
              <button onClick={handleSubmit} className="w-full sm:w-auto cursor-pointer flex items-center justify-center gap-x-2 text-white font-semibold py-2.5 px-6 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20">
                <FiSend /> Xác nhận
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUploader;