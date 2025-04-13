import React from 'react';

const CollectionSkeleton = () => {
  return (
    <div className="nft_coll skeleton-wrapper">
      <div className="nft_wrap">
        <div className="skeleton-image"></div>
      </div>
      <div className="nft_coll_pp">
        <div className="skeleton-avatar"></div>
      </div>
      <div className="nft_coll_info">
        <div className="skeleton-title"></div>
        <div className="skeleton-code"></div>
      </div>
    </div>
  );
};

export default CollectionSkeleton;