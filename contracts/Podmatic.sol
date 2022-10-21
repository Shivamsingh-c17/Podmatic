// contracts/Podmatic.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Podmatic is ERC721, ReentrancyGuard {
    using SafeMath for uint256;

    uint256 public podcastsCount = 0;
    address PodmaticMain = 0x159507b2b3829791fAB794581D2aC074F3596013;

    constructor() ERC721("Podmatic", "PDM") {}

    struct Link {
        string spotify;
        string applePodcasts;
        string audible;
        string googlePodcasts;
    }

    struct Characteristic {
        string genre; // Genre/Category
        string[] tags; // Tags to associate with the podcast
        string speech; // (Metaphorical, Literal)
        string podcastType; // (Monologue, Conversational, Interview, Investigative, etc.)
        string languageOfRecording; // Language of recording of the podcast
    }

    struct Sales {
        address[] previousOwners;
        uint256[] previousPrices;
        uint256[] previousSaleTimes;
    }

    struct Hashes {
        string imgHash;
        string podcastAudioHash;
        string summaryHash;
        string backgroundHash;
    }

    struct Podcast {
        uint256 id;
        string podcastName;
        string podcasterName;
        string podcastGuest; // Guest speaker's name
        uint256 price;
        uint256 createTime;
        Hashes hashes;
        address payable podcasterAddress;
        address payable currentOwnerAddress;
        bool onSale;
        Sales sales;
        Link links;
        Characteristic characteristics;
    }

    mapping(uint256 => Podcast) public podcasts;

    event PodcastPurchased(
        uint256 id,
        uint256 price,
        string podcastName,
        address payable podcasterAddress,
        address payable currentOwnerAddress
    );

    function createPodcast(
        string memory _podcastName,
        string memory _podcasterName,
        string memory _podcastGuest,
        uint256 _price,
        string memory _imgHash,
        string memory _podcastAudioHash,
        string memory _backgroundHash,
        string memory _summaryHash,
        bool _onSale,
        Link memory _links,
        Characteristic memory _characteristics
    ) public nonReentrant {
        // Require a name
        require(bytes(_podcastName).length > 0, "Podcast name cannot be empty");
        // Require podcaster's name
        require(
            bytes(_podcasterName).length > 0,
            "Podcaster name cannot be empty"
        );
        // Require podcast guest's name
        require(
            bytes(_podcastGuest).length > 0,
            "Podcast Guest's name cannot be empty"
        );
        // Require price > 0
        require(_price > 0, "Price must be at least 1 wei");
        require(bytes(_imgHash).length > 0, "Cover image must be provided");
        require(
            bytes(_podcastAudioHash).length > 0,
            "Podcast must be provided"
        );

        podcastsCount += 1;
        uint256 _createTime = block.timestamp;
        Sales memory _sales;

        podcasts[podcastsCount] = Podcast(
            podcastsCount,
            _podcastName,
            _podcasterName,
            _podcastGuest,
            _price,
            _createTime,
            Hashes(_imgHash, _podcastAudioHash, _backgroundHash, _summaryHash),
            payable(msg.sender),
            payable(msg.sender),
            _onSale,
            _sales,
            _links,
            _characteristics
        );

        // Call mint function
        _safeMint(msg.sender, podcastsCount);
    }

    function purchasePodcast(uint256 _id) public payable nonReentrant {
        // Make sure the id is valid
        require(_id > 0 && _id <= podcastsCount, "Invalid podcast id");
        // Fetch the podcast
        Podcast storage _podcast = podcasts[_id];
        // Require that there is enough matic provided for the transaction
        require(msg.value >= _podcast.price, "Not enough matic provided");
        // Require that the podcast is available for sale
        require(_podcast.onSale, "Podcast is not available for sale");
        // Require that buyer is not the seller
        require(
            _podcast.currentOwnerAddress != msg.sender,
            "You cannot purchase your own podcast"
        );
        // Add the owner to previousOwners
        _podcast.sales.previousOwners.push(_podcast.currentOwnerAddress);
        // Add price to previousPrices
        _podcast.sales.previousPrices.push(_podcast.price);
        // Add time to previousSaleTimes
        _podcast.sales.previousSaleTimes.push(block.timestamp);
        // Transfer matic
        if (_podcast.currentOwnerAddress == _podcast.podcasterAddress) {
            // Transfer all matic to podcaster whenever the first transaction for the NFT happens. This is because the podcaster is the owner after creating the NFT.
            payable(_podcast.currentOwnerAddress).transfer(msg.value);
        } else {
            // Pay the seller by sending 94% matic
            uint256 _value = ((msg.value).mul(94)).div(100);
            payable(_podcast.currentOwnerAddress).transfer(_value);
            // Pay the podcaster 5% of the transaction amount as royalty
            uint256 _royalty = ((msg.value).mul(5)).div(100);
            payable(_podcast.podcasterAddress).transfer(_royalty);
            // Pay the platform fee by sending the remaining 1% matic
            uint256 _platformFee = ((msg.value).mul(1)).div(100);
            payable(PodmaticMain).transfer(_platformFee);
        }
        // Transfer ownership to buyer
        _transfer(_podcast.currentOwnerAddress, msg.sender, _id);
        _podcast.currentOwnerAddress = payable(msg.sender);
        // Increase price of NFT by 20%
        _podcast.price = ((_podcast.price).mul(120)).div(100);
        // Update the podcast
        podcasts[_id] = _podcast;
        // Trigger an event
        emit PodcastPurchased(
            podcastsCount,
            _podcast.price,
            _podcast.podcastName,
            _podcast.podcasterAddress,
            _podcast.currentOwnerAddress
        );
    }

    function toggleOnSale(uint256 _id) public {
        // Make sure the id is valid
        require(_id > 0 && _id <= podcastsCount, "Invalid podcast id");
        // Fetch the podcast
        Podcast storage _podcast = podcasts[_id];
        // Require that the podcaster is calling the function
        require(
            _podcast.podcasterAddress == msg.sender,
            "Only the podcaster can toggle the on sale attribute"
        );
        // Require that the podcaster is also the current owner
        require(
            _podcast.podcasterAddress == _podcast.currentOwnerAddress,
            "Podcaster must be the current owner of the NFT"
        );
        // Toggle onSale attribute
        if (_podcast.onSale == true) {
            _podcast.onSale = false;
        } else if (_podcast.onSale == false) {
            _podcast.onSale = true;
        }
        // Update the podcast
        podcasts[_id] = _podcast;
    }

    function updatePrice(uint256 _id, uint256 _newPrice) public {
        // Make sure the id is valid
        require(_id > 0 && _id <= podcastsCount, "Invalid podcast id");
        // Fetch the podcast
        Podcast storage _podcast = podcasts[_id];
        // Require that the current owner is calling the function
        require(
            _podcast.currentOwnerAddress == msg.sender,
            "Only the current owner can update the price"
        );
        // Edit the price
        _podcast.price = _newPrice;
        // Update the podcast
        podcasts[_id] = _podcast;
    }

    /* Returns all items */
    function fetchAllNFTs() public view returns (Podcast[] memory) {
        require(podcastsCount > 0, "No podcasts to fetch");
        Podcast[] memory items = new Podcast[](podcastsCount);

        for (uint256 i = 1; i <= podcastsCount; i++) {
            Podcast storage currentItem = podcasts[i];
            items[i - 1] = currentItem;
        }
        return items;
    }
}
