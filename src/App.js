import React, {Component} from 'react';
import axios from 'axios';
import Carousels from './Components/Carausel';
import Details from './Components/Details';
import './App.scss';
class App extends Component {
	state = {
    	users: [],
    	isLoading: true,
		errors: null,
		items: []
	};
	handleApiCall = (user) => {
		axios.get(`https://74k4rzrsqubz5ma3f-mock.stoplight-proxy.io/api/v1/images?id=${user.id}`)
      	.then(users => {
        	this.setState({
          		users,
				  isLoading: false
			});
      	})
      	.catch(error => this.setState({ error }));
  }

   handleScanImg = (users) => {
	const { createWorker } = require('tesseract.js');
	const worker = createWorker();
	(async () => {
	await worker.load();
	await worker.loadLanguage('eng');
	await worker.initialize('eng');
	const { data: { text } } = await worker.recognize(users);
	document.getElementById('scannedText').innerText = text;
	})();
  }
  
	render(props){
    const { isLoading, users } = this.state;
	return (
    	<div className="wrapper">
      		<Carousels clickEvent={this.handleApiCall} />
          	{!isLoading ? (
				<Details 
					description={users.data.description} 
					features={users.data.features}
					quantity= {users.data.quantity}
					title = {users.data.title}
					url = {users.data.url}
					btn = {this.handleScanImg(users.data.url)}
				/>
			)
            : 
            (<h3>Please click on above Image</h3>)
        	}
		</div>
  	);
	}
}
export default App;
