import React from 'react';

const Logo: React.FC = () => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shopping basket outline */}
      <path d="M5 13H35L32 30H8L5 13Z" stroke="#2B7A0B" strokeWidth="2" fill="none" />
      {/* Basket handle */}
      <path d="M13 13C13 7.5 16.5 4 20 4C23.5 4 27 7.5 27 13" stroke="#2B7A0B" strokeWidth="2" fill="none" />
      {/* Produce items */}
      <circle cx="15" cy="20" r="3" fill="#FF7F00" />  {/* Orange */}
      <circle cx="20" cy="22" r="3" fill="#FF0000" />  {/* Apple */}
      <circle cx="25" cy="20" r="3" fill="#FFD700" />  {/* Lemon */}
      {/* Leaf accents */}
      <path d="M12 18C10 17 9 19 10 20" stroke="#2B7A0B" strokeWidth="1.5" fill="none" />
      <path d="M22 19C24 18 25 20 24 21" stroke="#2B7A0B" strokeWidth="1.5" fill="none" />
    </svg>
  );
};

export default Logo;