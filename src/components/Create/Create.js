import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import "./create.css";
import CreateYourNFT from "./CreateYourNFT/CreateYourNFT.js";
import Button from "../Layout/Button/Button";
import UploadPodcast from "./UploadPodcast/UploadPodcast";
import UploadPodcastDiv2 from "./UploadPodcast/UploadPodcastDiv2/UploadPodcastDiv2";
import UploadPodcastDiv3 from "./UploadPodcast/UploadPodcastDiv3/UploadPodcastDiv3";
import CreateSuccessModal from "../Layout/Modal/CreateSuccessModal";
import ErrorModal from "../Layout/Modal/ErrorModal";
import CreateErrorModal from "../Layout/Modal/CreateErrorModal";
import configData from "../../config/config.json";
const ENV = JSON.parse(JSON.stringify(configData));

export default function Create(props) {
	const [showCreateError, setShowCreateError] = useState(false);
	const [isrcNumber, setIsrcNumber] = useState("");
	const [podcastName, setPodcastName] = useState("");
	const [podcasterName, setPodcasterName] = useState("");
	const [podcastGuest, setPodcastGuest] = useState("");
	const [podcastPrice, setPrice] = useState("");
	const [tagsAvailable, setTagsAvailable] = useState([]);
	const [links, setLinks] = useState({
		spotify: "",
		applePodcasts: "",
		audible: "",
		googlePodcasts: "",
	});

	return (
		<Fragment>
			<div className="create_container">
				<div className="create_box row justify-content-center">
					<form
						onSubmit={async (event) => {
							event.preventDefault();
							const _name = podcastName;
							const _podcasterName = podcasterName;
							const _podcastGuest = podcastGuest;
							const _price = podcastPrice;
							const _onSale = true;
							// Links
							const _links = [links.spotify, links.applePodcasts, links.audible, links.googlePodcasts];
							// Characteristics
							const _genre =
								document.getElementById("genreDropdown").textContent === "Select here"
									? "-"
									: document.getElementById("genreDropdown").textContent;
							const _tags = [];
							tagsAvailable.map((tag) => _tags.push(tag.value));
							const _typeOfSpeech =
								document.querySelector('input[name="summaryRadioOptions"]:checked').value === "No"
									? "-"
									: document.getElementById("typeOfSummaryDropdown").textContent === "Metaphorical"
									? "Metaphorical"
									: document.getElementById("typeOfSummaryDropdown").textContent === "Literal"
									? "Literal"
									: "-";
							const _podcastType =
								document.getElementById("podcastTypeDropdown").textContent === "Select here"
									? "-"
									: document.getElementById("podcastTypeDropdown").textContent;
							const _languageOfRecording =
								document.getElementById("languageOfRecordingDropdown").textContent === "Select here"
									? "-"
									: document.getElementById("languageOfRecordingDropdown").textContent;
							// Characteristics array in required format
							const _characteristics = [_genre, _tags, _typeOfSpeech, _podcastType, _languageOfRecording];

							// TODO: Comment out this line when testing
							props.createPodcast(_name, _podcasterName, _podcastGuest, _price, _onSale, _links, _characteristics);

							// props.createPodcast(_name, _podcasterName, _price, _onSale, _links, _characteristics);
							// I'm the highest in the room. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lacus libero, pharetra a ex non, venenatis pellentesque quam. Integer scelerisque magna pellentesque, ornare elit eleifend, interdum nisl. Nulla porttitor non tellus non dignissim. Integer diam quam, condimentum sit amet arcu tempus, semper aliquet mauris. Nullam porta mi non justo fermentum, scelerisque tincidunt purus tincidunt. Morbi eleifend mauris eros, vitae consequat lectus rhoncus et. Fusce suscipit ipsum varius porttitor porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lacus libero, pharetra a ex non, venenatis pellentesque quam. Integer scelerisque magna pellentesque, ornare elit eleifend, interdum nisl. Nulla porttitor non tellus non dignissim. Integer diam quam, condimentum sit amet arcu tempus, semper aliquet mauris. Nullam porta mi non justo fermentum, scelerisque tincidunt purus tincidunt. Morbi eleifend mauris eros, vitae consequat lectus rhoncus et. Fusce suscipit ipsum varius porttitor porttitor.
						}}
					>
						<div className="row justify-content-center nft_content m-0 p-0">
							<CreateYourNFT
								podcastName={podcastName}
								setPodcastName={setPodcastName}
								podcasterName={podcasterName}
								setPodcasterName={setPodcasterName}
								podcastGuest={podcastGuest}
								setPodcastGuest={setPodcastGuest}
								podcastPrice={podcastPrice}
								setPrice={setPrice}
								isrcNumber={isrcNumber}
								setIsrcNumber={setIsrcNumber}
								captureImage={props.captureImage}
								maticUSD={props.maticUSD}
								maticINR={props.maticINR}
							/>
							<UploadPodcast
								capturePodcast={props.capturePodcast}
								links={links}
								setLinks={setLinks}
								captureSummary={props.captureSummary}
								podcastSummary={props.podcastSummary}
								setPodcastSummary={props.setPodcastSummary}
								captureDescription={props.captureDescription}
								podcastDescription={props.podcastDescription}
								setPodcastDescription={props.setPodcastDescription}
								tagsAvailable={tagsAvailable}
								setTagsAvailable={setTagsAvailable}
							/>
						</div>

						{/* HIDDEN DIV FOR >= 1300px */}
						<div className="row justify-content-center small-screen-div">
							{/* DIV 2*/}
							<UploadPodcastDiv2
								smallScreen={true}
								captureSummary={props.captureSummary}
								podcastSummary={props.podcastSummary}
								setPodcastSummary={props.setPodcastSummary}
								captureDescription={props.captureDescription}
								podcastDescription={props.podcastDescription}
								setPodcastDescription={props.setPodcastDescription}
							/>
							{/* DIV 3 */}
							<UploadPodcastDiv3 smallScreen={true} tagsAvailable={tagsAvailable} setTagsAvailable={setTagsAvailable} />
						</div>

						{/* TERMS AND CONDITIONS */}
						<div className="row justify-content-center terms-conditions-div-row">
							<div className="terms-conditions-div glass_effect glass_effect_border m-0 mt-4">
								{/* CHECK BOX 1 */}
								<div className="form-check">
									<input className="form-check-input" type="checkbox" value="" id="checkbox1" required />
									<label className="form-check-label" htmlFor="checkbox1">
										I hereby declare that this piece of music is my own creation and if any case of copyright infringement is reported, I
										will solely be held responsible for the consequences.
									</label>
								</div>
								{/* CHECK BOX 2 */}
								<div className="form-check">
									<input className="form-check-input" type="checkbox" value="" id="checkbox2" required />
									<label className="form-check-label" htmlFor="checkbox2">
										I have read all <a href="#/">terms of use</a> and the <a href="#/">privacy policy</a> and I agree to all of them.
									</label>
								</div>
								<div className="row mt-2">
									<div className="col-xl-2 col-lg-3 col-md-4 mt-md-0 mt-4 col-sm-6 col-8 submit-btn-div">
										<Button type="submit">Submit</Button>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>

			{/* Error Modal */}
			<ErrorModal show={props.showError} />

			{/* Create Error Modal */}
			<CreateErrorModal show={showCreateError} />

			{/* Success Modal */}
			<CreateSuccessModal show={props.showCreateSuccess} closeModal={props.closeCreateSuccessModal} />
		</Fragment>
	);
}
