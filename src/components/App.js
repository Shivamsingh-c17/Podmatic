// Importing packages
import React, { useRef, useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Web3 from "web3";
import { StreamChat } from "stream-chat";
import axios from "axios";
// Importing abi
import Podmatic from "../abis/Podmatic.json";
// Importing css
import "./App.css";
// Importing components
import Navbar from "./Layout/Navbar/Navbar";
import Footer from "./Layout/Footer/Footer";
import ScrollToTop from "./Utils/ScrollToTop/ScrollToTop";
import Loading from "./Utils/Loading/Loading";
import HomePage from "./Homepage/HomePage";
import Library from "./Library/Library";
import Faq from "./Faq/Faq";
import Dashboard from "./Dashboard/Dashboard";
import ContactUs from "./ContactUs/ContactUs";
import PodcastInfo from "./PodcastInfo/PodcastInfo";
import Trending from "./Trending/Trending";
import ReportABug from "./ReportABug/ReportABug";
import Create from "./Create/Create";
import PageNotFound from "./PageNotFound/PageNotFound";
import StreamChatComponent from "./StreamChat/StreamChatComponent";
// Initializing IPFS and StreamChat clients
import { create } from "ipfs-http-client";
// Importing ENV variables
import contractAddress from "../config/address";
import configData from "../config/config.json";
const ENV = JSON.parse(JSON.stringify(configData));

var streamClient = StreamChat.getInstance(ENV.STREAM_API_KEY);

function App() {
	var enc = new TextEncoder();
	// Initializing states
	const [streamAuthToken, setStreamAuthToken] = useState("");
	const [loading, setLoading] = useState(true);
	const [account, setAccount] = useState("");
	const [podmatic, setPodmatic] = useState("");
	const [podcastNFTs, setPodcastNFTs] = useState([]);
	const [imageBuffer, setImageBuffer] = useState(Buffer(enc.encode("-")));
	const [podcastBuffer, setPodcastBuffer] = useState(Buffer(enc.encode("-")));
	const [podcastSummary, setPodcastSummary] = useState("");
	const [summaryBuffer, setSummaryBuffer] = useState(Buffer(enc.encode("-")));
	const [podcastDescription, setPodcastDescription] = useState("");
	const [descriptionBuffer, setDescriptionBuffer] = useState(Buffer(enc.encode("-")));
	const [maticUSD, setMaticUSD] = useState("");
	const [maticINR, setMaticINR] = useState("");
	// Modal States
	const [showTradeSuccess, setShowTradeSuccess] = useState(false);
	const [showCreateSuccess, setShowCreateSuccess] = useState(false);
	const [showError, setShowError] = useState(false);
	var web3 = useRef();

	const projectId = "2DaPrpX6ha5PkzH8Oo1aecmIIGY";
	const projectSecret = "1e124d7ea285db2247f3a3b203a74862";
	const auth = `Basic ` + Buffer.from(projectId + `:` + projectSecret).toString(`base64`);
	const ipfs = create({
		host: `ipfs.infura.io`,
		port: 5001,
		protocol: `https`,
		headers: {
			authorization: auth,
		},
	});

	const { ethereum } = window;
	if (ethereum) {
		ethereum.on("accountsChanged", async function (accounts) {
			if (web3.current) {
				setAccount(web3.current.utils.toChecksumAddress(accounts[0]));
			}
			window.location.reload();
		});
	}

	async function fetchMaticUSD() {
		const COINBASE_BASE_URL = "https://api.coinbase.com/v2";
		const res = await fetch(`${COINBASE_BASE_URL}/prices/MATIC-USD/buy`);
		const data = await res.json();
		setMaticUSD(data.data.amount);
	}

	async function fetchMaticINR() {
		const COINBASE_BASE_URL = "https://api.coinbase.com/v2";
		const res = await fetch(`${COINBASE_BASE_URL}/prices/MATIC-INR/buy`);
		const data = await res.json();
		setMaticINR(data.data.amount);
	}

	const loadBlockchainData = useCallback(async () => {
		var accounts;

		async function addPolygonTestnetNetwork() {
			try {
				await ethereum.request({
					method: "wallet_switchEthereumChain",
					params: [{ chainId: "0x13881" }], // Hexadecimal version of 80001, prefixed with 0x
				});
			} catch (error) {
				if (error.code === 4902) {
					try {
						await ethereum.request({
							method: "wallet_addEthereumChain",
							params: [
								{
									chainId: "0x13881", // Hexadecimal version of 80001, prefixed with 0x
									chainName: "POLYGON Testnet",
									nativeCurrency: {
										name: "MATIC",
										symbol: "MATIC",
										decimals: 18,
									},
									rpcUrls: ["https://matic-mumbai.chainstacklabs.com/"],
									blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
									iconUrls: [""],
								},
							],
						});
					} catch (addError) {
						console.log("Did not add network");
					}
				}
			}
		}

		if (ethereum) {
			window.web3 = new Web3(ethereum);
			await addPolygonTestnetNetwork();
		} else if (ethereum && (await ethereum.request({ method: "net_version" })) !== "80001") {
			window.web3 = new Web3(window.web3.currentProvider);
			await addPolygonTestnetNetwork();
		} else {
			// const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
			window.web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai.infura.io/v3/6f89b4b5242a4191af04c7939d66d6e8"));
			window.alert(
				"Non-Ethereum browser detected. You cannot perform any transactions on the blockchain, however you will still be able to watch all content present on the blockchain. To make transactions you should consider installing Metamask"
			);
		}

		web3.current = window.web3;

		// This results in a bug which converts all uppercase alphabets in the address to lowercase
		// accounts = await window.ethereum.request({ method: "eth_accounts" });
		accounts = await web3.current.eth.getAccounts();
		// accounts = await ethereum.request({ method: "eth_requestAccounts" });

		// Load account
		setAccount(accounts[0]);

		const networkData = Podmatic.networks[ENV.BLOCKCHAIN_NETWORK_ID];
		if (networkData) {
			const _podmatic = new web3.current.eth.Contract(Podmatic.abi, networkData.address);
			setPodmatic(_podmatic);

			// Fetch all NFTs
			var _nfts;
			try {
				_nfts = await _podmatic.methods.fetchAllNFTs().call();
				setPodcastNFTs(_nfts);
			} catch (err) {
				console.log(err);
			}

			setLoading(false);
		} else {
			window.alert("Podmatic contract not deployed to detected network.");
		}
	}, [ethereum]);

	const StreamAuth = async (account, setStreamAuthToken) => {
		const payload = await axios.post(`${ENV.SERVER_URL}/signin`, {
			account,
		});

		setStreamAuthToken(payload.data.responseData.token);
	};

	const streamAuthCheck = useCallback(async (streamAuthToken, setStreamAuthToken, account) => {
		if (streamAuthToken && account) {
			streamClient.connectUser(
				{
					id: account.substring(2),
					account: account,
				},
				streamAuthToken
			);
		}
		if (!streamAuthToken && account) {
			await StreamAuth(account, setStreamAuthToken);
		}
	}, []);

	useEffect(() => {
		async function tasks() {
			await loadBlockchainData();
			await streamAuthCheck(streamAuthToken, setStreamAuthToken, account);
		}
		tasks();
		fetchMaticUSD();
		fetchMaticINR();
		// setLoading(false);
	}, [loadBlockchainData, streamAuthCheck, account, streamAuthToken]);

	async function captureSummary(event) {
		event.preventDefault();

		const file = new Blob([event.target.value.length > 0 ? event.target.value : "-"], { type: "text/plain" });

		if (file) {
			const reader = new window.FileReader();
			reader.readAsArrayBuffer(file);

			reader.onloadend = () => {
				setSummaryBuffer(Buffer(reader.result));
			};
		} else {
			return;
		}
	}

	async function captureDescription(event) {
		event.preventDefault();

		const file = new Blob([event.target.value.length > 0 ? event.target.value : "-"], { type: "text/plain" });

		if (file) {
			const reader = new window.FileReader();
			reader.readAsArrayBuffer(file);

			reader.onloadend = () => {
				setDescriptionBuffer(Buffer(reader.result));
			};
		} else {
			return;
		}
	}

	async function captureImage(event) {
		event.preventDefault();

		const file = event.target.files[0];
		if (file) {
			const reader = new window.FileReader();
			reader.readAsArrayBuffer(file);

			reader.onloadend = async () => {
				setImageBuffer(Buffer(reader.result));
			};
		} else {
			return;
		}
	}

	async function capturePodcast(event) {
		event.preventDefault();

		if (document.getElementById("upload-podcast")) {
			var uploadPodcast = document.getElementById("upload-podcast");
			if (uploadPodcast.files[0].size > 100700000) {
				alert("File size is too big! Please upload a file smaller than 100MB.");
				return;
			}
		}

		const file = event.target.files[0];

		if (file) {
			const reader = new window.FileReader();
			reader.readAsArrayBuffer(file);

			reader.onloadend = () => {
				setPodcastBuffer(Buffer(reader.result));
			};
		} else {
			return;
		}
	}

	async function createPodcast(_name, _podcasterName, _podcastGuestName, _price, _onSale, _links, _characteristics) {
		// var _imgHash;
		// var _podcastHash;
		// var _summaryHash;
		// var _descriptionHash;

		setLoading(true);

		const imageFile = await ipfs.add(imageBuffer);
		const _imgHash = imageFile.path;
		console.log(imageFile.path);

		const podcastFile = await ipfs.add(podcastBuffer);
		const _podcastHash = podcastFile.path;
		console.log(podcastFile.path);

		const summaryFile = await ipfs.add(summaryBuffer);
		const _summaryHash = summaryBuffer.equals(Buffer(enc.encode("-"))) ? [] : summaryFile.path;
		console.log(summaryFile.path);

		const descriptionFile = await ipfs.add(descriptionBuffer);
		const _descriptionHash = descriptionBuffer.equals(Buffer(enc.encode("-"))) ? [] : descriptionFile.path;
		console.log(descriptionFile.path);

		// Set up your Ethereum transaction
		const transactionParameters = {
			to: contractAddress, // Required except during contract publications.
			from: account, // must match user's active address.
			data: podmatic.methods
				.createPodcast(
					_name,
					_podcasterName,
					_podcastGuestName,
					window.web3.utils.toWei(_price, "Ether"),
					_imgHash,
					_podcastHash,
					_descriptionHash,
					_summaryHash,
					_onSale,
					_links,
					_characteristics
				)
				.encodeABI(), //make call to NFT smart contract
		};

		// Sign the transaction via Metamask
		try {
			const txHash = await window.ethereum.request({
				method: "eth_sendTransaction",
				params: [transactionParameters],
			});
			setLoading(false);
			setShowCreateSuccess(true);
			return {
				success: true,
				status: "Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" + txHash,
			};
		} catch (error) {
			setLoading(false);
			setShowError(true);
			return {
				success: false,
				status: "Something went wrong: " + error.message,
			};
		}

		// await ipfs.add(imageBuffer, async (error, _imgResult) => {
		// 	console.log("_imgResult:", _imgResult);
		// 	if (error) {
		// 		console.error(error);
		// 		return;
		// 	}
		// 	_imgHash = _imgResult[0].hash;
		// 	console.log("imgHash:", _imgHash);

		// 	ipfs.add(podcastBuffer, async (error, _podcastResult) => {
		// 		console.log("_podcastResult:", _podcastResult);
		// 		if (error) {
		// 			console.error(error);
		// 			return;
		// 		}
		// 		_podcastHash = _podcastResult[0].hash;
		// 		console.log("_podcastHash:", _podcastHash);

		// 		ipfs.add(descriptionBuffer, async (error, _descriptionResult) => {
		// 			console.log("_descriptionResult:", _descriptionResult);
		// 			if (error) {
		// 				console.error(error);
		// 				return;
		// 			}
		// 			_descriptionHash = descriptionBuffer.equals(Buffer(enc.encode("-"))) ? [] : _descriptionResult[0].hash;
		// 			console.log("_descriptionHash:", _descriptionHash);

		// 			ipfs.add(summaryBuffer, async (error, _lyricsResult) => {
		// 				console.log("_lyricsResult:", _lyricsResult);
		// 				if (error) {
		// 					console.error(error);
		// 					return;
		// 				}
		// 				_summaryHash = summaryBuffer.equals(Buffer(enc.encode("-"))) ? [] : _lyricsResult[0].hash;
		// 				console.log("_summaryHash:", _summaryHash);

		// 				// Set up your Ethereum transaction
		// 				const transactionParameters = {
		// 					to: contractAddress, // Required except during contract publications.
		// 					from: account, // must match user's active address.
		// 					data: podmatic.methods
		// 						.createPodcast(
		// 							_name,
		// 							_podcasterName,
		// 							_podcastGuestName,
		// 							window.web3.utils.toWei(_price, "Ether"),
		// 							_imgHash,
		// 							_podcastHash,
		// 							_descriptionHash,
		// 							_summaryHash,
		// 							_onSale,
		// 							_links,
		// 							_characteristics
		// 						)
		// 						.encodeABI(), //make call to NFT smart contract
		// 				};

		// 				// Sign the transaction via Metamask
		// 				try {
		// 					const txHash = await window.ethereum.request({
		// 						method: "eth_sendTransaction",
		// 						params: [transactionParameters],
		// 					});
		// 					setLoading(false);
		// 					setShowCreateSuccess(true);
		// 					return {
		// 						success: true,
		// 						status: "Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" + txHash,
		// 					};
		// 				} catch (error) {
		// 					setLoading(false);
		// 					setShowError(true);
		// 					return {
		// 						success: false,
		// 						status: "Something went wrong: " + error.message,
		// 					};
		// 				}
		// 			});
		// 		});
		// 	});
		// });
	}

	const createTeamChannel = async (_podcasterAddress, _podcasterName) => {
		var selectedMembers = [streamClient.userID, _podcasterAddress.substring(2)];

		try {
			const newChannel = await streamClient.channel("team", _podcasterAddress, {
				name: _podcasterName + "'s Room",
				members: selectedMembers,
			});

			await newChannel.watch();

			await newChannel.addMembers([streamClient.userID]);

			selectedMembers = [];
		} catch (error) {
			console.log(error);
		}
	};

	const createMessagingChannel = async (_podcasterAddress, _podcasterName) => {
		var selectedUsers = [streamClient.userID, _podcasterAddress.substring(2)];
		var _channelId = streamClient.userID.substring(0, 20).concat(_podcasterAddress.substring(2, 22));

		try {
			const newChannel = await streamClient.channel("messaging", _channelId, {
				name: _podcasterName,
				members: selectedUsers,
				account: _podcasterAddress,
			});

			await newChannel.watch();

			selectedUsers = [];
		} catch (error) {
			console.log(error);
		}
	};

	async function purchasePodcast(id, price, _podcasterAddress, _podcasterName) {
		const _id = parseInt(id).toString();
		// const _price = web3.utils.fromWei(price.toString(), 'Ether')

		setLoading(true);

		podmatic.methods
			.purchasePodcast(_id)
			.send({ from: account, value: price })
			.once("receipt", async (receipt) => {
				if (account !== _podcasterAddress) {
					await createMessagingChannel(_podcasterAddress, _podcasterName);
					await createTeamChannel(_podcasterAddress, _podcasterName);
				}
				setLoading(false);
				setShowTradeSuccess(true);
			})
			.catch(function (error) {
				setLoading(false);
				setShowError(true);
				// if (error.code === 4001) {
				// 	window.location.reload();
				// }
			});
	}

	function closeTradeSuccessModal() {
		setShowTradeSuccess(false);
		window.location.reload();
	}

	function closeCreateSuccessModal() {
		setShowCreateSuccess(false);
		window.location.reload();
	}

	async function toggleOnSale(id) {
		const _id = parseInt(id).toString();

		setLoading(true);
		podmatic.methods
			.toggleOnSale(_id)
			.send({ from: account })
			.once("receipt", (receipt) => {
				setLoading(false);
				window.location.reload();
			})
			.catch(function (error) {
				if (error.code === 4001) {
					window.location.reload();
				} else {
					// show error message
				}
			});
	}

	async function updatePrice(id, price) {
		const _id = parseInt(id).toString();
		const _price = web3.current.utils.toWei(price, "Ether");

		setLoading(true);
		podmatic.methods
			.updatePrice(_id, _price)
			.send({ from: account })
			.once("receipt", (receipt) => {
				setLoading(false);
				window.location.reload();
			})
			.catch(function (error) {
				if (error.code === 4001) {
					window.location.reload();
				}
			});
	}

	return (
		<Router>
			<ScrollToTop />
			<Navbar />
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route
					exact
					path="/chat"
					render={() =>
						loading ? (
							<Loading />
						) : (
							<StreamChatComponent
								account={account}
								client={streamClient}
								streamAuthToken={streamAuthToken}
								setStreamAuthToken={setStreamAuthToken}
								streamAuthCheck={streamAuthCheck}
							/>
						)
					}
				/>
				<Route
					exact
					path="/podcast-info/:podcastId"
					render={(props) =>
						loading ? (
							<Loading />
						) : (
							<PodcastInfo
								{...props}
								account={account}
								podcastNFTs={podcastNFTs}
								purchasePodcast={purchasePodcast}
								toggleOnSale={toggleOnSale}
								updatePrice={updatePrice}
								maticUSD={maticUSD}
								maticINR={maticINR}
								showTradeSuccess={showTradeSuccess}
								closeTradeSuccessModal={closeTradeSuccessModal}
							/>
						)
					}
				/>
				<Route exact path="/library" render={() => (loading ? <Loading /> : <Library podcastNFTs={podcastNFTs} />)} />
				<Route exact path="/trending" render={() => (loading ? <Loading /> : <Trending podcastNFTs={podcastNFTs} />)} />
				<Route exact path="/dashboard" render={() => (loading ? <Loading /> : <Dashboard account={account} podcastNFTs={podcastNFTs} />)} />
				<Route
					exact
					path="/create"
					render={(props) =>
						loading ? (
							<Loading />
						) : (
							<Create
								{...props}
								createPodcast={createPodcast}
								captureImage={captureImage}
								podcastSummary={podcastSummary}
								setPodcastSummary={setPodcastSummary}
								captureSummary={captureSummary}
								podcastDescription={podcastDescription}
								setPodcastDescription={setPodcastDescription}
								captureDescription={captureDescription}
								capturePodcast={capturePodcast}
								maticUSD={maticUSD}
								maticINR={maticINR}
								showCreateSuccess={showCreateSuccess}
								closeCreateSuccessModal={closeCreateSuccessModal}
								showError={showError}
							/>
						)
					}
				/>
				<Route exact path="/faq" component={Faq} />
				<Route exact path="/bugs" component={ReportABug} />
				<Route exact path="/contact-us" component={ContactUs} />
				<Route path="/404" exact component={PageNotFound} />
				<Redirect to="/404" />
			</Switch>
			<Footer />
		</Router>
	);
}

export default App;
