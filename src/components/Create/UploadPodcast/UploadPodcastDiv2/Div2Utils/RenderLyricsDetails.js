import React, { Fragment } from "react";
import SocialsDropdown from "../../UploadPodcastUtils/CreatePageDropdowns/SocialsDropdown";

export default function RenderLyricsDetails(props) {
	const typeOfLyrics = ["Metaphorical", "Literal"];
	return (
		<Fragment>
			<div className="large-dropdown-div">
				<p>Speech</p>
				<SocialsDropdown optionsArray={typeOfLyrics} dropdownID="typeOfSummaryDropdown" />
			</div>
			{/* UPLOAD LYRICS */}
			<p>Summary</p>
			<div className="form-group">
				<textarea
					value={props.podcastSummary}
					className="form-control upload-lyrics-area"
					name="lyrics-box"
					onChange={(e) => {
						props.setPodcastSummary(e.target.value);
						props.captureSummary(e);
					}}
					data-bs-toggle="modal"
					data-bs-target="#lyricsModal"
					spellCheck="false"
				></textarea>
			</div>
		</Fragment>
	);
}
