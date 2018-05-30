import React from 'react';

const VideoListItem = ({video, onSelectVideo}) => {
  const imageUrl = video.snippet.thumbnails.default.url;
  return (
    <li className="media mb-3 video-list-item" onClick={() => onSelectVideo(video)}>
      <img className="mr-3" src={imageUrl} />
      <div className="media-body">
        <div className="mt-1 mb-1">{video.snippet.title}</div>
      </div>
    </li>
  );
};

export default VideoListItem;
