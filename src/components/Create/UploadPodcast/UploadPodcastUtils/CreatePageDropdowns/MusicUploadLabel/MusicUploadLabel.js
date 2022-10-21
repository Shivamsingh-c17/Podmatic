import React, { useState } from "react";
import uploadCover from "../../../../../../assets/music.svg";
import musicRecord from "../../../../../../assets/music_record.png";
import "./musicUploadLabel.css";
import Tooltip from "../../../../../Utils/Tooltip/Tooltip";

export default function MusicUploadLabel(props) {
	const [musicUploadState, setMusicUploadState] = useState(false);

	const handlePodcastUpload = (e) => {
		if (e.target.value.length === 0) return;
		// console.log(e.target.value.split("\\").pop());
		// console.log(document.getElementById("uploaded-podcast-name"));
		// console.log(document.getElementById("upload-podcast-inp").value.split("\\").pop());
		document.getElementById("uploaded-podcast-name").textContent = e.target.value.split("\\").pop();
		props.capturePodcast(e);
		setMusicUploadState(true);
	};

	return (
		<div>
			{musicUploadState ? (
				<label className="uploaded-podcast-label" htmlFor="upload-podcast-inp">
					<img className="vinyl-record-img" src={musicRecord} alt="vinyl record" />
					<label className="edit-icon-podcast-btn" htmlFor="upload-podcast-inp">
						<i className="far fa-edit"></i>
					</label>
				</label>
			) : (
				<label htmlFor="upload-podcast-inp">
					{/* CSS FOR THIS PART IS SAME AS THAT FOR UPLOAD IMAGE */}
					<div className="upload-img-div glass_effect glass_effect_border">
						<img className="upload-podcast-option mb-2" src={uploadCover} alt="cover logo" />
						<label htmlFor="upload-podcast-inp" className="upload-image-label">
							Upload Podcast
						</label>
					</div>
				</label>
			)}
			<label htmlFor="upload-podcast-inp" id="uploaded-podcast-name" className="mt-2 ml-3">
				No file chosen
			</label>
			<input type="file" id="upload-podcast-inp" accept="audio/*" className="podcast-inp-text mt-2 ml-3" onChange={handlePodcastUpload} required />
			<span className="podcast_limit_tooltip">
				<Tooltip labelText="Know more" message={`Please upload a file having size under "100 MB"`} />
			</span>
		</div>
	);
}
