import React from 'react';

const Logo = ({ width = '100px' }) => {
  return (
    <div
      className="
   
       px-7
       sm:py:7
       sm:px5
        font-extrabold
         
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
