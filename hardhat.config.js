/* global ethers task */
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-contract-sizer");
require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
	const accounts = await ethers.getSigners();

	for (const account of accounts) {
		console.log(account.address);
	}
});

// task("deploy", "Deploy smart contracts", async (taskArgs, hre) => {
// 	const Podmatic = await ethers.getContractFactory("Podmatic");
// 	const podmatic = await Podmatic.deploy();
// 	await podmatic.deployed();
// 	console.log("\n\tPodmatic deployed:", podmatic.address);
// });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	solidity: "0.8.4",
	settings: {
		optimizer: {
			enabled: true,
			runs: 200,
			details: {
				yul: false,
			},
		},
		contractSizer: {
			alphaSort: true,
			disambiguatePaths: false,
			runOnCompile: true,
		},
	},
	networks: {
		hardhat: {
			gas: 12000000,
			blockGasLimit: 210000000,
			// allowUnlimitedContractSize: true,
			timeout: 1800000,
		},
		mumbai: {
			url: "https://polygon-mumbai.g.alchemy.com/v2/8qorAGwStqgObuxITbYVAD3T2BI1jC36",
			accounts: [process.env.PRIVATE_KEY],
			gas: 12000000,
			gasPrice: 35000000000,
			blockGasLimit: 210000000,
			timeout: 1800000,
		},
	},
	etherscan: {
		apiKey: process.env.POLYGONSCAN_API_KEY,
	},
};
