const fs = require("fs");
const Podmatic = artifacts.require("Podmatic");

module.exports = async function (deployer) {
	await deployer.deploy(Podmatic);
	const pdm = await Podmatic.deployed();

	let config = `const contractAddress = "${pdm.address}";\nexport default contractAddress;`;

	let data = JSON.stringify(config);

	fs.writeFile("./src/config/address.js", JSON.parse(data), (err) => {
		if (err) {
			console.log("Error writing config.js:", err.message);
		}
	});
};
