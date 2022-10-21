import React from "react";
import Select from "react-select";
import SocialsDropdown from "../UploadPodcastUtils/CreatePageDropdowns/SocialsDropdown";
import Tooltip from "../../../Utils/Tooltip/Tooltip";
import style from "./Div3Utils/StyleForSelect";
import "./uploadPodcastDiv3.css";
import { tagsAvailable } from "../../../Library/tags";

export default function UploadPodcastDiv3(props) {
	const languageOfRecording = ["English", "Hindi", "Spanish", "French", "German", "Italian", "Portuguese", "Russian", "Japanese", "Chinese"];
	

	const handleInstrumentsChange = (selectedOption) => {
		props.setTagsAvailable(selectedOption);
	};

	return (
		<div className={"create_nft_bg glass_effect glass_effect_border upload-podcast-div-3" + (props.smallScreen ? " mt-5" : " small-screen-div-3")}>
			<h3 className="create_nft_heading hidden-head">Other Details</h3>
			<div className="large-dropdown-div">
				<p>Language of Recording</p>
				<SocialsDropdown optionsArray={languageOfRecording} dropdownID="languageOfRecordingDropdown" />
			</div>

			<p>
				Tags &nbsp;
				<Tooltip labelText="Know more" message="Select the 5 most appropriate tags in your podcast" />
			</p>
			{/* on backend connection, we need a logic that user is only able to select 4 like set display none for the arrow */}
			<Select
				maxMenuHeight={125}
				placeholder="Select here"
				isMulti={true}
				isOptionDisabled={(option, test) => props.tagsAvailable.length >= 5}
				styles={style}
				closeMenuOnSelect={false}
				options={tagsAvailable}
				onChange={handleInstrumentsChange}
			/>
		</div>
	);
}
