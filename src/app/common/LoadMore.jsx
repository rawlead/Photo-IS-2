import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const LoadMore = ({ isLoading, handleLoadMore, isHidden, isLast }) => {
  if (isHidden) {
    return '';
  }
  return (<div className="load-more-section">
    {(!isLoading && !isLast)
      ? (
        <button
          className="btn load-more-btn"
          onClick={handleLoadMore}
          disabled={isLoading}
        >
          Load more
        </button>
      ) : null}

    <ClipLoader
      sizeUnit={"px"}
      size={50}
      className="spinner"
      color={'#CDD3CE'}
      loading={isLoading}
    />
  </div>
  )
}

export default LoadMore;
