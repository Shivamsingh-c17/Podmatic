import React from "react";
import SocialsDropdown from "./UploadPodcastUtils/CreatePageDropdowns/SocialsDropdown";
import UploadPodcastDiv2 from "./UploadPodcastDiv2/UploadPodcastDiv2";
import UploadPodcastDiv3 from "./UploadPodcastDiv3/UploadPodcastDiv3";
import MusicUploadLabel from "./UploadPodcastUtils/CreatePageDropdowns/MusicUploadLabel/MusicUploadLabel";
import "./uploadPodcast.css";

export default function UploadPodcast(props) {
	const genre = [
		"Society and Culture",
		"Business",
		"Leadership",
		"History",
		"Philosophy",
		"Travel",
		"Marketing",
		"Sales",
		"Personal Finance",
		"Investing",
		"Real Estate",
		"News and Politics",
		"Health",
		"Sport",
		"Comedy",
	];

	const handleLinksChange = (e) => {
		const { name, value } = e.target;
		props.setLinks((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	return (
		<div className="main-upload-div row p-0">
			{/* DIV 1 */}
			<div className="create_nft_bg glass_effect glass_effect_border upload-podcast-div-1">
				{/* DIV HEADING */}
				<h3 className="create_nft_heading">Upload your podcast</h3>
				{/* DIV CONTENT */}
				<div className="div1-content">
					{/* UPLOAD LABEL */}
					<div className="upload-image-label-div">
						<MusicUploadLabel capturePodcast={props.capturePodcast} />
					</div>
					{/* DROPDOWN LINKS */}
					<div className="mt-1">
						<p>Add Links (Optional)</p>
						<div className="add-social-links">
							<label htmlFor="spotify-music" className="music-link-label">
								Spotify
							</label>
							<input
								type="text"
								id="spotify-music"
								className="links-input"
								name="spotify"
								value={props.links.spotify}
								onChange={handleLinksChange}
							/>
						</div>

						<div className="add-social-links mt-2">
							<label htmlFor="amazon-music" className="music-link-label">
								Audible
							</label>
							<input
								type="text"
								id="amazon-music"
								className="links-input"
								name="audible"
								value={props.links.audible}
								onChange={handleLinksChange}
							/>
						</div>

						<div className="add-social-links mt-2">
							<label htmlFor="apple-music" className="music-link-label">
								Apple Podcasts
							</label>
							<input
								type="text"
								id="apple-music"
								className="links-input"
								name="applePodcasts"
								value={props.links.applePodcasts}
								onChange={handleLinksChange}
							/>
						</div>

						<div className="add-social-links mt-2">
							<label htmlFor="yt-music" className="music-link-label">
								Google Podcasts
							</label>
							<input
								type="text"
								id="yt-music"
								className="links-input"
								name="googlePodcasts"
								value={props.links.googlePodcasts}
								onChange={handleLinksChange}
							/>
						</div>
					</div>

					{/* GENRE */}
					<div className="large-dropdown-div">
						<p>Genre/Category</p>
						<SocialsDropdown optionsArray={genre} dropdownID="genreDropdown" />
					</div>
				</div>
			</div>

			{/* DIV 2 */}
			<UploadPodcastDiv2
				smallScreen={false}
				captureSummary={props.captureSummary}
				podcastSummary={props.podcastSummary}
				setPodcastSummary={props.setPodcastSummary}
				captureDescription={props.captureDescription}
				podcastDescription={props.podcastDescription}
				setPodcastDescription={props.setPodcastDescription}
			/>

			{/* DIV 3 */}
			<UploadPodcastDiv3 smallScreen={false} tagsAvailable={props.tagsAvailable} setTagsAvailable={props.setTagsAvailable} />
		</div>
	);
}
