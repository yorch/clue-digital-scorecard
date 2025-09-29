import React from 'react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-gray-100 text-center py-3 px-4 border-t-2 border-black text-sm font-typewriter text-gray-600">
      <p>© {currentYear} Jorge Barnaby</p>
    </div>
  );
};
