import React, { Fragment } from "react";
import "./section2.css";

export default function Section2() {
	return (
		<Fragment>
			<div className="section2-container row m-0 justify-content-center">
				<div className="section2-box">
					<div className="section2-bg-div">
						<div className="section2-intro">
							<h1>
								<strong>A New Generation for the Creator Economy</strong>
							</h1>
							{/* <h1>New Generation of Music Collection</h1> */}
							<p className="mt-4">
							We aim to uplift podcasters by enabling them to create NFTs of their podcasts. We intend to provide them with royalties and recognition that they deserve but are not able to get enough from other sources.
							</p>
						</div>
						<div className="green-card mt-5">
							<h3>
								<strong>Create and Sell your Podcasts as an NFT</strong>
							</h3>
							<p className="mt-4">
							If you're an Indie podcaster, Podmatic is for you. The podcast industry is evolving, but it's still hard for Indie podcasters to be heard and make a living. Podmatic is here to help you change that. With our platform, you can build a following and make a sustainable income from your passion. 
							</p>
							<p className="mb-4">Join us and let's create a new future for podcasting together.</p>
						</div>
						<div className="podcast-info-preview"></div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
