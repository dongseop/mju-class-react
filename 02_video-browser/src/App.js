import _ from 'lodash';
import React, { Component } from 'react';
import searchYoutube from 'youtube-api-v3-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import './App.css';

const API_KEY = 'AIzaSyCXEX1vRLigTjoCootBYCuMOLcxRuJvWSc';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      videos: [],
      selectedVideo: null
    };
    this.searchVideo('');
  }

  searchVideo(term) {
    searchYoutube(API_KEY, {q:term}).then((result) => {
      console.log(result);
      var videos = result.items;
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    }).catch((err) => {
      console.log(err);
    });

    // YTSearch({ key: API_KEY, term: term }, (videos) => {
    //   this.setState({
    //     videos: videos,
    //     selectedVideo: videos[0]
    //   });
    // });
  }

  render() {
    const searchVideo = _.debounce((term) => { this.searchVideo(term); }, 300);
    return (
      <div className="App container">
        <SearchBar onChangeSearchTerm={searchVideo}/>
        <div className="row">
          <VideoDetail video={this.state.selectedVideo} />
          <VideoList videos={this.state.videos} 
            onSelectVideo={selectedVideo => this.setState({ selectedVideo })}
          />
        </div>
      </div>
    );
  }
}

export default App;
