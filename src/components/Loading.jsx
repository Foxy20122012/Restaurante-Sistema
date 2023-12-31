import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
      <img src="nova.jpeg" alt="Loading" className="w-44 h-44 animate-pulse rounded-lg" />
    </div>
  );
}

export default Loading;

