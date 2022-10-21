import React, { Fragment, useState } from "react";
import Cta from "../Homepage/CtaSection/Cta";
import "./library.css";
import Dropdown from "./LibraryUtils/Dropdown/Dropdown";
import MultiDropdown from "./LibraryUtils/Dropdown/MultiDropdown";
import PodcastPages from "./LibraryUtils/PodcastPages/PodcastPages";
import { tagsAvailable } from "./tags";

export default function Library(props) {
	const [appliedFilters, setAppliedFilters] = useState({
		genre: "Any",
		// summary: "Any",
		languageofrecording: "Any",
		instrumentsUsed: [],
	});
	const [searchedString, setSearchedString] = useState("");

	const onFilterChange = (filter, selectedOption) => {
		console.log(filter);
		setAppliedFilters((prevState) => ({
			...prevState,
			[filter]: selectedOption,
		}));
	};
	console.log("Applied Filters")
	console.log({...appliedFilters})
	//Dropdown Options
	const genres = [
		"Any",
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
	// const summary = ["Any", "Yes", "No"];
	const languageArray = [
		"Any",
		"Hindi",
		"English",
		"Arabic",
		"Armenian",
		"Assamese",
		"Awadhi",
		"Bengali",
		"Bhojpuri",
		"Chinese",
		"Czech",
		"Danish",
		"Dutch",
		"English",
		"Filipino",
		"Finnish",
		"French",
		"German",
		"Greek",
		"Gujarati",
		"Haryanvi",
		"Hebrew",
		"Hindi",
		"Hungarian",
		"Icelandic",
		"Indonesian",
		"Irish",
		"Italian",
		"Japanese",
		"Kannada",
		"Kashmiri",
		"Konkani",
		"Korean",
		"Malayalam",
		"Maltese",
		"Mandarin",
		"Marathi",
		"Nepali",
		"Odia",
		"Pahari",
		"Persian",
		"Polish",
		"Portuguese",
		"Punjabi",
		"Rajasthani",
		"Romanian",
		"Russian",
		"Serbian",
		"Spanish",
		"Swedish",
		"Tamil",
		"Telugu",
		"Thai",
		"Turkish",
		"Ukrainian",
		"Urdu",
	];
	const filteredPodcastNFTs = [];
	const n = props.podcastNFTs.length;
	const m = appliedFilters.instrumentsUsed.length;

	for (let i = 0; i < n; i++) {
		// if (appliedFilters.summary === "Yes") {
		// 	console.log(props.podcastNFTs[i]);
		// 	if (props.podcastNFTs[i].characteristics.languageOfRecording.length > 0) {
		// 		if (appliedFilters.genre !== "Any") {
		// 			if (appliedFilters.genre === props.podcastNFTs[i].characteristics.genre) {
		// 				if (m > 0) {
		// 					let checkCtr = 0;
		// 					for (let j = 0; j < m; j++) {
		// 						if (props.podcastNFTs[i].characteristics.tags.includes(appliedFilters.instrumentsUsed[j].value)) checkCtr++;
		// 					}
		// 					if (checkCtr === m) filteredPodcastNFTs.push(props.podcastNFTs[i]);
		// 				} else filteredPodcastNFTs.push(props.podcastNFTs[i]);
		// 			}
		// 		} else {
		// 			if (m > 0) {
		// 				let checkCtr = 0;
		// 				for (let j = 0; j < m; j++) {
		// 					if (props.podcastNFTs[i].characteristics.tags.includes(appliedFilters.instrumentsUsed[j].value)) checkCtr++;
		// 				}
		// 				if (checkCtr === m) filteredPodcastNFTs.push(props.podcastNFTs[i]);
		// 			} else filteredPodcastNFTs.push(props.podcastNFTs[i]);
		// 		}
		// 	}
		// } else if (appliedFilters.summary === "No") {
		// 	if (props.podcastNFTs[i].characteristics.languageOfRecording.length === 0) {
		// 		if (appliedFilters.genre !== "Any") {
		// 			if (appliedFilters.genre === props.podcastNFTs[i].characteristics.genre) {
		// 				if (m > 0) {
		// 					let checkCtr = 0;
		// 					for (let j = 0; j < m; j++) {
		// 						if (props.podcastNFTs[i].characteristics.tags.includes(appliedFilters.instrumentsUsed[j].value)) checkCtr++;
		// 					}
		// 					if (checkCtr === m) filteredPodcastNFTs.push(props.podcastNFTs[i]);
		// 				} else filteredPodcastNFTs.push(props.podcastNFTs[i]);
		// 			}
		// 		} else {
		// 			if (m > 0) {
		// 				let checkCtr = 0;
		// 				for (let j = 0; j < m; j++) {
		// 					if (props.podcastNFTs[i].characteristics.tags.includes(appliedFilters.instrumentsUsed[j].value)) checkCtr++;
		// 				}
		// 				if (checkCtr === m) filteredPodcastNFTs.push(props.podcastNFTs[i]);
		// 			} else filteredPodcastNFTs.push(props.podcastNFTs[i]);
		// 		}
		// 	}
		// } else {
			if (appliedFilters.genre !== "Any") {
				if (appliedFilters.genre === props.podcastNFTs[i].characteristics.genre) {
					if (m > 0) {
						let checkCtr = 0;
						for (let j = 0; j < m; j++) {
							if (props.podcastNFTs[i].characteristics.tags.includes(appliedFilters.instrumentsUsed[j].value)) checkCtr++;
						}
						// if (checkCtr === m) filteredPodcastNFTs.push(props.podcastNFTs[i]);
						if(checkCtr === m){
							if(appliedFilters.languageofrecording !== "Any"){
								if(appliedFilters.languageofrecording === props.podcastNFTs[i].characteristics.languageOfRecording)
									filteredPodcastNFTs.push(props.podcastNFTs[i]);
							}
							else
								filteredPodcastNFTs.push(props.podcastNFTs[i]);
						}
					} else filteredPodcastNFTs.push(props.podcastNFTs[i]);
				}
			} 
			else {
				if (m > 0) {
					let checkCtr = 0;
					for (let j = 0; j < m; j++) {
						if (props.podcastNFTs[i].characteristics.tags.includes(appliedFilters.instrumentsUsed[j].value)) checkCtr++;
					}
					if(checkCtr === m){
						if(appliedFilters.languageofrecording !== "Any"){
							if(appliedFilters.languageofrecording === props.podcastNFTs[i].characteristics.languageOfRecording)
								filteredPodcastNFTs.push(props.podcastNFTs[i]);
						}
						else
							filteredPodcastNFTs.push(props.podcastNFTs[i]);
					}
				} else {
					// filteredPodcastNFTs.push(props.podcastNFTs[i]);
					if(appliedFilters.languageofrecording !== "Any"){
						if(appliedFilters.languageofrecording === props.podcastNFTs[i].characteristics.languageOfRecording)
							filteredPodcastNFTs.push(props.podcastNFTs[i]);
					}
					else
						filteredPodcastNFTs.push(props.podcastNFTs[i]);
				}
			}
		// }
	}
	// Logic for searched podcasts and ids
	const l = filteredPodcastNFTs.length;
	const searchedNFTs = [];
	// Important !!! Need to add a tooltip to not to search '#' in ids.
	// Also, currently our search is case sensitive so we either need to change it or inform the user
	if (searchedString.length === 0) {
		// if searchedString is empty, do nothing
	} else if (!isNaN(searchedString) && !isNaN(parseFloat(searchedString))) {
		//if searched string is an id
		for (let i = 0; i < l; i++) {
			if (parseInt(filteredPodcastNFTs[i].id) === parseInt(searchedString)) searchedNFTs.push(filteredPodcastNFTs[i]);
		}
	} else {
		//else, search for podcasters or podcasts in our newNFT array
		for (let i = 0; i < l; i++) {
			if (
				filteredPodcastNFTs[i].podcastName.toLowerCase().includes(searchedString.toLowerCase()) ||
				filteredPodcastNFTs[i].podcasterName.toLowerCase().includes(searchedString.toLowerCase())
			)
				searchedNFTs.push(filteredPodcastNFTs[i]);
		}
	}

	const searchHandler = (e) => {
		setSearchedString(e.target.value);
	};

	return (
		<Fragment>
			<div className="library_container">
				<div className="library_box ">
					<div className="row justify-content-center">
						{/* Library CARD */}
						<div className="library_card glass_effect glass_effect_border">
							<div className="left_filters_section">
								<p className="mxv_library_heading">Podmatic Library</p>
								<p className="library_filters">Filters:</p>
								{/* DROPDOWNS */}
								<div className="library-dropdowns">
									<div className="single-dropdowns">
										<Dropdown handleFilters={onFilterChange} optionsArray={genres} filter={"genre"}>
											Genre/Category
										</Dropdown>
										<Dropdown handleFilters={onFilterChange} optionsArray={languageArray} filter={"languageOfRecording"}>
											Language Of Recording
										</Dropdown>
										{/* <Dropdown handleFilters={onFilterChange} optionsArray={summary} filter={"summary"}>
											Summary
										</Dropdown> */}
									</div>
									<MultiDropdown instrumentsUsed={appliedFilters.instrumentsUsed} handleFilters={onFilterChange} options={tagsAvailable} />
								</div>
							</div>

							<div className="right_filters_section">
								<div className="search_bar_div">
									<input
										className="search_bar"
										type="text"
										placeholder="Search by Name or ID"
										onChange={searchHandler}
										value={searchedString}
									></input>
									<button className="search_button">
										<i className="fas fa-search"></i>
									</button>
								</div>
								{/* <p className="additional_filters mt-5">
									Additional Filters<i className="fas fa-filter"></i>
								</p> */}
							</div>
						</div>

						{/* PAGES SECTION */}
						<PodcastPages podcastNFTs={searchedString.length > 0 ? searchedNFTs : filteredPodcastNFTs} />
					</div>
				</div>
			</div>

			{/* CTA SECTION */}
			<Cta isHomeSection={false} />
		</Fragment>
	);
}
