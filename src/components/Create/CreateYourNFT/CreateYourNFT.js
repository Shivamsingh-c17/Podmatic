import React from "react";
import "./createYourNFT.css";
import UploadImage from "./CreateUtils/UploadImage.js";
import Tooltip from "../../Utils/Tooltip/Tooltip";

export default function CreateYourNFT(props) {
	return (
		<div className="create_nft_bg glass_effect glass_effect_border upload_cover_image_div">
			{/* UPLOAD COVER IMAGE */}
			<h3 className="create_nft_heading">Create your NFT</h3>
			{/* NEED TO EXPORT CLASSES FROM CURRENT FILE"S CSS TO UPLOAD IMAGE */}
			<div className="upload-image-label-div">
				<UploadImage captureImage={props.captureImage} />
			</div>
			{/* INPUT FIELDS */}
			<div className="mt-2">
				{/* NFT DETAILS */}
				<p>Podcast Name</p>
				<input
					type="text"
					className="input-text-field"
					placeholder="Enter Podcast name"
					value={props.podcastName}
					onChange={(e) => {
						props.setPodcastName(e.target.value);
					}}
					required
				/>

				<p>Podcaster Name</p>
				<input
					type="text"
					className="input-text-field"
					placeholder="Enter your name"
					value={props.podcasterName}
					onChange={(e) => {
						props.setPodcasterName(e.target.value);
					}}
					required
				/>

				<p>Podcast Guest</p>
				<input
					type="text"
					className="input-text-field"
					placeholder="Enter guest's name"
					value={props.podcastGuest}
					onChange={(e) => {
						props.setPodcastGuest(e.target.value);
					}}
					required
				/>

				<p>
					Price &nbsp; <Tooltip labelText="Know more" message={`1 MATIC = $${props.maticUSD} or ₹${props.maticINR}`} />
				</p>
				<input
					type="number"
					className="input-text-field"
					placeholder="Enter Price in MATIC"
					value={props.podcastPrice}
					onChange={(e) => {
						props.setPrice(e.target.value);
					}}
					step="0.1"
					min="0"
					required
				/>

				{/* ON SALE */}
				{/*<div className="on-sale-div mt-3">
					<p>
						<span className="mr-2">On Sale</span>
						<Tooltip
							labelText=""
							message={`Do you want to keep the NFT on the Podmatic marketplace for sale? If you choose no, then interested buyers will not be able to buy this NFT until you put it back up on the marketplace again.`}
						/>
					</p>

					{/* ON SALE RADIOS */}
				{/*<div>
						<div className="form-check form-check-inline mr-3">
							<input className="custom-radio-box form-check-input" type="radio" name="onSaleRadioOptions" id="onSaleRadio1" value="Yes" defaultChecked />
							<label className="form-check-label" htmlFor="onSaleRadio1">
								Yes
							</label>
						</div>
						<div className="form-check form-check-inline">
							<input className="custom-radio-box form-check-input" type="radio" name="onSaleRadioOptions" value="No" id="onSaleRadio2" />
							<label className="form-check-label" htmlFor="onSaleRadio2">
								No
							</label>
						</div>
					</div>
					</div>*/}
			</div>
		</div>
	);
}
