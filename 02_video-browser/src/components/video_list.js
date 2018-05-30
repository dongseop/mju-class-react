import React from 'react';
import VideoListItem from './video_list_item';

const VideoList = ({videos, onSelectVideo}) => {
  const videoItems = videos.map(video => {
    return (
      <VideoListItem
        key={video.etag}
        video={video}
        onSelectVideo={onSelectVideo}
      />
    );
  });
  return (
    <ul className="col col-md-4 video-list">
      {videoItems}
    </ul>
  );
};
export default VideoList;
