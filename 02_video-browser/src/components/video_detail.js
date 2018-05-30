import React from 'react';

const VideoDetail = ({video}) => {
  if (!video) {
    return <div className="video-detail col col-md-8">Loading...</div>;
  }
  const {videoId} = video.id;
  const url = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  return (
    <div className="video-detail col col-md-8">
      <div className="embed-responsive embed-responsive-16by9">
        <iframe className="embed-responsive-item" src={url}>
        </iframe>
      </div>
      <div className="details mt-3">
        <h3>{video.snippet.title}</h3>
        <div>{video.snippet.description}</div>
      </div>
    </div>
  );
};

export default VideoDetail; 