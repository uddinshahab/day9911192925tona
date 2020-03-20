import React from 'react';
import Heading from '../Heading';
import './index.scss';
const Details = (props) =>{
	const {description, features, quantity, title, url, btn} = props;
	console.log(features, 80)
	return(
		<React.Fragment>
      		<Heading heading="Detail" />
			<div className="detail-box">
				<div className="detail-desc">
					<figure><img src={url} alt="" /></figure>
					<aside>
						<header>
							<h3>{title}</h3>
							<p>Quantity <strong>{quantity}</strong></p>
						</header>
						<h6>Description:</h6>
						<p>{description}</p>
					</aside>
				</div>
				<h6>Features:</h6>
				<ol>
					{features.map((item, index) =>(
						<li key={index}>{item}</li>
					))}
				</ol>
				<button className="btn-scan" onClick={btn}>Scan Now</button>
			</div>
			<div id="scannedText"></div>
		</React.Fragment>	
	)
}
export default Details;