import React, { useState, useRef } from "react";
import { FiUploadCloud, FiTrash2, FiSend } from "react-icons/fi";

function ImageUploader({ onSubmit, onImageRemove }) {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => { 
    setImage(null); 
    setPreviewUrl(''); 
    if (onImageRemove) onImageRemove();
  };

  const handleSelectFile = () => { fileInputRef.current.click(); };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleSubmit = () => {
    if (!image) return;
    
    if (onSubmit) {
      onSubmit();
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
            <FiUploadCloud className="text-gray-400 text-4xl sm:text-5xl mb-4" />
            <p className="text-gray-300 text-sm sm:text-base">Kéo và thả ảnh vào đây</p>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">hoặc</p>
            <p className="text-blue-400 font-semibold mt-2 text-sm sm:text-base">Nhấn để chọn ảnh</p>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-full max-h-60 sm:max-h-80 md:max-h-96 overflow-hidden rounded-lg mb-6 border border-white/10">
              <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button
                onClick={handleRemoveImage}
                className="w-full sm:w-auto flex items-center justify-center gap-x-2 bg-gray-700 hover:bg-gray-600 text-white/90 font-semibold py-2.5 px-5 rounded-full transition-colors"
              >
                <FiTrash2 /> Bỏ chọn
              </button>
              <button
                onClick={handleSubmit}
                className="w-full sm:w-auto cursor-pointer flex items-center justify-center gap-x-2 text-white font-semibold py-2.5 px-6 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20"
              >
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