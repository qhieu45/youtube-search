import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyDy8i_KSYyo1UQnf-U96ucMzgPilH-jY_Q';

//Downwards data flow
// -> App should be responsible for fetching the data
class App extends Component {
	constructor(props) {
		super(props);

		this.state = {videos: [], 
					selectedVideo: null
		};

		// default videos
		this.videoSearch("Front-End Development")
	}


	//function for searching new videos and display
	videoSearch(term) {
		YTSearch({key: API_KEY, term: term}, 
			videos => this.setState({ 
				videos: videos,
				selectedVideo: videos[0]  
			}));
	}

	render() {
		// make videoSearch only after a word is entered
		const videoSearch = _.debounce(term => this.videoSearch(term), 300);

		return (
		<div>
			{/*everytime a new search term is entered, function videoSearch is called*/}
			<SearchBar onSearchTermChange={videoSearch} />
			
			<VideoDetail video={this.state.selectedVideo} />
			{/* transfer the state(videos) from App to VideoList as a prop*/}
			<VideoList videos={this.state.videos} 
					onVideoSelect={selectedVideo => this.setState({selectedVideo})} />
		</div>
		);
	}
}


ReactDOM.render(<App />, document.querySelector('.container'));