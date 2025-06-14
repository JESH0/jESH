import React from 'react';

const Logo = ({ width = '100px' }) => {
  return (
    <div
      className="
       border
       border-b-amber-50
       px-0
       py-2
       sm:py:7
       sm:px5
        font-bold
        text-transparent
        bg-clip-text
        bg-cover
        bg-center
        hover:scale-105
        transition-transform
        duration-300
        space-y-0
        text:xs      /* default mobile */
        sm:text-sm    /* small screens */
        md:text-5xl    /* medium screens */
        lg:text-6xl    /* large screens */
      "
      style={{
        backgroundImage: "url('/src/assets/jesh.jpg')",
        width: width,
        minWidth: width, // to keep consistent sizing
        WebkitBackgroundClip: 'text',
         // for some browsers
      }}
    
    >
      jESH
    
    </div>
  );
};

export default Logo;
