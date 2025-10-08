import React, { useState, useEffect } from "react";
import { FaMusic } from "react-icons/fa";

function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    // Nếu scroll xuống và không ở trên cùng, ẩn navbar
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      setIsVisible(false);
    } else { // Nếu scroll lên, hiện navbar
      setIsVisible(true);
    }
    // Cập nhật vị trí scroll cuối cùng
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    // Cleanup function để gỡ event listener khi component unmount
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);


  const handleScrollToTop = (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    // Thêm các class transition và transform để tạo animation
    // Dựa vào state `isVisible` để quyết định vị trí của Navbar
    <header 
      className={`px-4 sm:px-[7rem] min-w-[20vh] justify-self-center sticky top-0 z-50 p-2 pt-4 mb-0 sm:mb-1 
                 transition-transform duration-500 ease-in-out
                 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div
        className="
          mx-auto rounded-full p-[3px]
          bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
          bg-[length:200%_auto]
          animate-gradient-move
        "
      >
        <div
          className="
            w-full h-full rounded-full
            bg-gray-900/80 backdrop-blur-xl
          "
        >
          <div className="flex items-center justify-center h-12 px-4">
            <a
              href="/"  
              onClick={handleScrollToTop}
              className="flex items-center gap-x-2.5 group cursor-pointer"
            >
              <FaMusic
                className="text-blue-400 group-hover:text-blue-300 transition-colors"
                size={18}
              />
              <span
                className="
                  lg:text-xl text-[1.2rem] font-bold tracking-normal text-transparent
                  bg-clip-text bg-gradient-to-r 
                  from-blue-400 to-purple-400
                  group-hover:from-blue-300 group-hover:to-purple-300
                  transition-all
                "
              >
                Senkyoku
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;