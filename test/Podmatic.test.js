const { assert } = require("chai");
const BigNumber = require("bignumber.js");
const web3 = require("web3");

const Podmatic = artifacts.require("./Podmatic.sol");

require("chai").use(require("chai-as-promised")).should();

contract("Podmatic", ([deployer, seller, buyer, buyer2]) => {
	let contract;

	before(async () => {
		contract = await Podmatic.deployed();
	});

	describe("deployment", async () => {
		it("deploys successfully", async () => {
			const address = contract.address;
			assert.notEqual(address, 0x0);
			assert.notEqual(address, "");
			assert.notEqual(address, null);
			assert.notEqual(address, undefined);
		});

		it("has a name", async () => {
			const name = await contract.name();
			assert.equal(name, "Podmatic");
		});

		it("has a symbol", async () => {
			const symbol = await contract.symbol();
			assert.equal(symbol, "PDM");
		});
	});

	describe("podcasts", async () => {
		describe("minting", async () => {
			it("creates a new podcast", async () => {
				await contract.createPodcast(
					"#1609 - Elon Musk",
					"Joe Rogan",
					"Elon Musk",
					web3.utils.toWei("2", "Ether"),
					"imageHash123",
					"podcastHash123",
					"backgroundHash123",
					"summaryHash123",
					"subtitlesHash123",
					true,
					["spotifyLink.com", "applePodcasts.com", "audible.com", "googlePodcasts.com"],
					["Business", ["Investing", "Life"], "Literal", "Interview", "English", true],
					{ from: seller }
				);
				const podcastsCount = await contract.podcastsCount();

				// SUCCESS
				assert.equal(podcastsCount, 1);

				// Failure: Podcast must have a name
				await contract.createPodcast(
					"",
					"Joe Rogan",
					"Elon Musk",
					web3.utils.toWei("2", "Ether"),
					"imageHash123",
					"podcastHash123",
					"backgroundHash123",
					"summaryHash123",
					"subtitlesHash123",
					true,
					["spotifyLink.com", "applePodcasts.com", "audible.com", "googlePodcasts.com"],
					["Business", ["Investing", "Life"], "Literal", "Interview", "English", true],
					{ from: seller }
				).should.be.rejected;
			});
		});

		describe("indexing", async () => {
			it("lists podcasts", async () => {
				// Mint 3 more NFTs
				await contract.createPodcast(
					"#1600 - Naval Ravikant",
					"Joe Rogan",
					"Naval Ravikant",
					web3.utils.toWei("1", "Ether"),
					"imageHash123",
					"podcastHash123",
					"backgroundHash123",
					"summaryHash123",
					"subtitlesHash123",
					true,
					["spotifyLink.com", "applePodcasts.com", "audible.com", "googlePodcasts.com"],
					["Business", ["Investing", "Life"], "Literal", "Interview", "English", true],
					{ from: seller }
				);
				await contract.createPodcast(
					"#1500 - Mark Cuban",
					"Joe Rogan",
					"Mark Cuban",
					web3.utils.toWei("1", "Ether"),
					"imageHash123",
					"podcastHash123",
					"backgroundHash123",
					"summaryHash123",
					"subtitlesHash123",
					true,
					["spotifyLink.com", "applePodcasts.com", "audible.com", "googlePodcasts.com"],
					["Business", ["Investing", "Life"], "Literal", "Interview", "English", true],
					{ from: seller }
				);
				await contract.createPodcast(
					"#1469 - Jeff Bezos",
					"Joe Rogan",
					"Jeff Bezos",
					web3.utils.toWei("1", "Ether"),
					"imageHash123",
					"podcastHash123",
					"backgroundHash123",
					"summaryHash123",
					"subtitlesHash123",
					true,
					["spotifyLink.com", "applePodcasts.com", "audible.com", "googlePodcasts.com"],
					["Business", ["Investing", "Life"], "Literal", "Interview", "English", true],
					{ from: seller }
				);

				const podcastsCount = await contract.podcastsCount();

				let podcast;
				let result = [];

				for (var i = 1; i <= podcastsCount; i++) {
					podcast = await contract.podcasts(i);
					result.push(podcast.podcastName);
				}

				let expected = ["#1609 - Elon Musk", "#1600 - Naval Ravikant", "#1500 - Mark Cuban", "#1469 - Jeff Bezos"];
				assert.equal(result.join(","), expected.join(","));
			});
		});

		describe("purchase", async () => {
			let podcastsCount;

			before(async () => {
				podcastsCount = await contract.podcastsCount();
				podcastsCount = podcastsCount.toNumber();
			});

			it("purchases podcast when artist is also the current owner", async () => {
				let podcastId = podcastsCount;
				let _podcast = await contract.podcasts(podcastId);
				// let podcasterAddress = _podcast.podcasterAddress;
				// // Track artist balance before purchase
				// let oldArtistBalance = await web3.eth.getBalance(podcasterAddress);
				// oldArtistBalance = BigNumber(oldArtistBalance);
				// // Track seller balance before purchase
				// let sellerAddress = _podcast.currentOwnerAddress;
				// let oldSellerBalance = await web3.eth.getBalance(sellerAddress);
				// oldSellerBalance = BigNumber(oldSellerBalance);

				//Success: Buyer makes purchase
				let result = await contract.purchasePodcast(podcastId, {
					from: buyer,
					value: _podcast.price,
				});

				// // Check logs
				// let event = result.logs[3].args;
				// assert.equal(event.id.toNumber(), podcastId, "id is correct");
				// assert.equal(event.podcastName, "Oops", "podcast name is correct");
				// assert.equal(event.price.toString(), (_podcast.price * 1.2).toString(), "price is correct");
				// assert.equal(event.currentOwnerAddress, buyer, "owner is correct");
				// assert.equal(event.onSale, true, "onSale is true");

				// // Check that artist received funds
				// let newArtistBalance = await web3.eth.getBalance(podcasterAddress);
				// newArtistBalance = BigNumber(newArtistBalance);

				// let priceTransferredToArtist = await _podcast.price;
				// priceTransferredToArtist = BigNumber(priceTransferredToArtist);

				// let expectedArtistBalance = oldArtistBalance.plus(priceTransferredToArtist);
				// assert.equal(newArtistBalance.toString(), expectedArtistBalance.toString());
			});

			it("purchases podcast when artist and owner are different", async () => {
				let podcastId = podcastsCount;
				let _podcast = await contract.podcasts(podcastId);
				// let podcasterAddress = _podcast.podcasterAddress;
				// // Track artist balance before purchase
				// let oldArtistBalance = await web3.eth.getBalance(podcasterAddress);
				// oldArtistBalance = BigNumber(oldArtistBalance);

				// // Track seller balance before purchase
				// let sellerAddress = _podcast.currentOwnerAddress;
				// let oldSellerBalance = await web3.eth.getBalance(sellerAddress);
				// oldSellerBalance = BigNumber(oldSellerBalance);

				// // Track PodmaticMain balance before purchase
				// let podmaticMainAddress = "0x159507b2b3829791fAB794581D2aC074F3596013";
				// let oldPodmaticMainBalance = await web3.eth.getBalance(podmaticMainAddress);
				// oldPodmaticMainBalance = BigNumber(oldPodmaticMainBalance);

				//Success: Buyer makes purchase
				let result = await contract.purchasePodcast(podcastId, {
					from: buyer2,
					value: _podcast.price,
				});

				// // Check logs
				// let event = result.logs[3].args;
				// assert.equal(event.id.toNumber(), podcastId, "id is correct");
				// assert.equal(event.podcastName, "Oops", "podcast name is correct");
				// assert.equal(event.price.toString(), (_podcast.price * 1.2).toString(), "price is correct");
				// assert.equal(event.currentOwnerAddress, buyer2, "owner is correct");
				// assert.equal(event.onSale, true, "purchased is correct");

				// // Check that seller received funds
				// let newSellerBalance = await web3.eth.getBalance(sellerAddress);
				// newSellerBalance = BigNumber(newSellerBalance);

				// let priceTransferredToSeller = await _podcast.price;
				// priceTransferredToSeller = BigNumber(priceTransferredToSeller).multipliedBy(0.94);

				// let expectedSellerBalance = oldSellerBalance.plus(priceTransferredToSeller);
				// assert.equal(newSellerBalance.toString(), expectedSellerBalance.toString());

				// // Check that artist received funds
				// let newArtistBalance = await web3.eth.getBalance(podcasterAddress);
				// newArtistBalance = BigNumber(newArtistBalance);

				// let priceTransferredToArtist = await _podcast.price;
				// priceTransferredToArtist = BigNumber(priceTransferredToArtist).multipliedBy(0.05);

				// let expectedArtistBalance = oldArtistBalance.plus(priceTransferredToArtist);
				// assert.equal(newArtistBalance.toString(), expectedArtistBalance.toString());

				// // Check that platform fee was deducted
				// let newPodmaticMainBalance = await web3.eth.getBalance(podmaticMainAddress);
				// newPodmaticMainBalance = BigNumber(newPodmaticMainBalance);

				// let priceTransferredToPlatform = await _podcast.price;
				// priceTransferredToPlatform = BigNumber(priceTransferredToPlatform).multipliedBy(0.01);

				// let expectedPlatformBalance = oldPodmaticMainBalance.plus(priceTransferredToPlatform);
				// assert.equal(newPodmaticMainBalance.toString(), expectedPlatformBalance.toString());

				// Failure: Tries to buy a podcast that does not exist- Must have valid id
				await contract.purchasePodcast(99, { from: buyer2, value: web3.utils.toWei("0.2", "Ether") }).should.be.rejected;
				// Failure: Tries to buy without enough ether
				await contract.purchasePodcast(podcastsCount - 1, { from: buyer2, value: web3.utils.toWei("0.1", "Ether") }).should.be.rejected;
				// Failure: Buyer tries to buy again- The same address can't be both the buyer and the seller
				await contract.purchasePodcast(podcastsCount - 1, { from: buyer2, value: web3.utils.toWei("0.5", "Ether") }).should.be.rejected;
			});
		});

		describe("toggleOnSale", async () => {
			let podcastsCount;

			before(async () => {
				podcastsCount = await contract.podcastsCount();
				podcastsCount = podcastsCount.toNumber();
			});

			it("toggles the onSale attribute", async () => {
				//Success: Current owner toggles the onSale attribute
				await contract.toggleOnSale(podcastsCount, { from: buyer2 });

				// Failure: Tries to toggle a podcast that does not exist- Must have valid id
				await contract.toggleOnSale(99, { from: buyer2 }).should.be.rejected;
				// Failure: An address other than the current owner tries to toggle the onSale attribute
				await contract.toggleOnSale(podcastsCount, { from: seller }).should.be.rejected;
				await contract.toggleOnSale(podcastsCount, { from: deployer }).should.be.rejected;
			});
		});

		describe("updatePrice", async () => {
			let podcastsCount;

			before(async () => {
				podcastsCount = await contract.podcastsCount();
				podcastsCount = podcastsCount.toNumber();
			});

			it("updates the Podcast NFT Price", async () => {
				//Success: Current owner toggles the onSale attribute
				await contract.updatePrice(podcastsCount, web3.utils.toWei("1.5", "Ether"), {
					from: buyer2,
				});

				// Failure: Tries to update the price of a podcast that does not exist- Must have valid id
				await contract.updatePrice(99, { from: buyer2 }).should.be.rejected;
				// Failure: An address other than the current owner tries to update the price of the NFT
				await contract.updatePrice(podcastsCount, { from: seller }).should.be.rejected;
				await contract.updatePrice(podcastsCount, { from: deployer }).should.be.rejected;
			});
		});
	});
});
