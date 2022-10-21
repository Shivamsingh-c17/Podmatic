import React from "react";
import "./LogoAndHeadline.css";
import LogoSVG from "../../../assets/red_circle.svg";

const LogoAndHeadline = () => {
	return (
		<div className="abcd">
			<div className="heading-logo">Be a part of the Creator Economy in this new Blockchain Era</div>
			<div className="heading-logo-master-container">
				<div className="grey-background"></div>
				<div className="heading-logo-container">
					<div className="heading-logo-2">
						<div>Become a</div>
						<div>part of</div>
					</div>
					<img className="image-logo" src={LogoSVG} alt="Podmatic logo"></img>
					<div className="heading-logo-2">
						<div>New Crypto</div>
						<div>World</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default LogoAndHeadline;
