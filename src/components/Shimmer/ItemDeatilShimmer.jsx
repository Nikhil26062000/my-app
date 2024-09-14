import React from 'react'

const ItemDeatilShimmer = ({ height, width  }) => {
  return (
    <div
      className="relative overflow-hidden bg-gray-300 rounded-[20px]"
      style={{ height: `${height}px`, width }}
    >
      <div className="absolute top-0 left-0 h-full w-full shimmer" />
    </div>
  )
}

export default ItemDeatilShimmer