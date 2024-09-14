import React from 'react';
import '../../styles/ShimmerMap.css'
const ShimmerMap = ({ height , width  }) => {
  return (
    <div
      className="relative overflow-hidden bg-gray-300 rounded-lg"
      style={{ height: `${height}px`, width }}
    >
      <div className="absolute top-0 left-0 h-full w-full shimmer" />
    </div>
  );
};

export default ShimmerMap;
