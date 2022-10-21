import React from "react";
import web3 from "web3";
import "./trendingCard.css";

export default function TrendingCard(props) {
	return (
		<div className="trending_card">
			<div className="row trending_card_row justify-content-center mb-3">
				<div className="col-12 p-0">
					<img
						className="trending_album_cover"
						src={`https://podmatic.infura-ipfs.io/ipfs/${props.podcast.hashes.imgHash}`}
						width="100%"
						alt="album cover"
					/>
				</div>
			</div>

			<p className="trending_podcast_name">{props.podcast.podcastName}</p>
			<p className="trending_podcast_by">Artist name: {props.podcast.podcasterName}</p>
			<p className="trending_podcast_price">{parseFloat(web3.utils.fromWei(props.podcast.price.toString(), "Ether")).toFixed(2)} MATIC</p>
		</div>
	);
}
