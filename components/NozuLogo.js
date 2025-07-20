// components/NozuLogo.js

import React from 'react';

// This component renders the NozuDrones SVG logo.
// The SVG is inlined here for performance and to avoid Next.js Image component issues
// in the current development environment.
// It is designed to be reusable across the application.
const NozuLogo = ({ width = 90, height = 90, className = '', ...props }) => {
  return (
    <svg
      style={{ maxHeight: '500px' }}
      viewBox="9.433704 9.767896995708155 320.409018 138.09785407725323"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink" // Note: xmlns:xlink is written as xmlnsXlink in React JSX
      overflow="hidden"
      width={width} // Dynamic width prop
      height={height} // Dynamic height prop
      className={className} // Prop for additional Tailwind classes
      aria-label="NozuDrones Logo"
      {...props} // Pass any other props (like onClick, etc.)
    >
      <g>
        <path d="M10.638 125.860C10.638 114.538 24.293 105.360 41.138 105.360 57.983 105.360 71.638 114.538 71.638 125.860 71.638 137.182 57.983 146.360 41.138 146.360 24.293 146.360 10.638 137.182 10.638 125.860Z" fill="#1F2937" fillRule="evenodd"/>
        <path d="M55.638 77.860C55.638 41.133 116.751 11.360 192.138 11.360 267.525 11.360 328.638 41.133 328.638 77.860 328.638 114.587 267.525 144.360 192.138 144.360 116.751 144.360 55.638 114.587 55.638 77.860Z" fill="#1F2937" fillRule="evenodd"/>
        <text fill="#FFFFFF" fontFamily="Inter Black,Inter Black_MSFontService,sans-serif" fontWeight="900" fontSize="80" transform="translate(88.941 106.360)">Nozu</text>
      </g>
    </svg>
  );
};

export default NozuLogo;