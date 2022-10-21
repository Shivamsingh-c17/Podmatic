import React from "react";
import "./MessageDemo.css";
import ChatDemo1 from "../../../assets/new-assets/group_chat_1.svg";
import ChatDemo2 from "../../../assets/new-assets/ind_chat_1.svg";
import Asset1 from "../../../assets/new-assets/section4.svg";
import Asset1_mobile from "../../../assets/new-assets/section4_m.svg";

const MessageDemo = () => {
	return (
		<div className="message-demo-container">
			<div className="message-demo-box">
				{/* <!-- header --> */}
				<div className="message-demo-heading">
					<div>There's more to just</div>
					<div>buying and selling NFTs</div>
				</div>
				<div>
					<img className="asset1-img" src={Asset1} alt="assets-mobile"></img>
					<img className="asset1-img-mobile" src={Asset1_mobile} alt="assets-mobile"></img>
				</div>
				{/* CHAT FEATURE PREVIEW */}
				<div className="chat-sample-layout">
					<div className="message-card-1 glass_effect glass_effect_border">
						<div className="message-card-1-text">
							<h1>Group Messages</h1>
							<p>Connect with other podcasters, producers, sponsors, fans, etc. all in one place.</p>
						</div>
						<div className="message-card-1-img">
							<img src={ChatDemo1} alt="chat-demo-1"></img>
						</div>
					</div>
					<div className="message-card-2 glass_effect glass_effect_border">
						<div className="message-card-2-text">
							<h1>Private Chats</h1>
							<p>Build one-on-one connections with the people you admire!</p>
						</div>
						<div className="message-card-2-img">
							<img src={ChatDemo2} alt="chat-demo-2"></img>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default MessageDemo;
