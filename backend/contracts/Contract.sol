// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract CrowdFunding {
    // Define struct for our campaign
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;

    // Function for create a new campaign by user.
    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        string memory _image,
        uint256 _deadline,
        uint256 _target
    ) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];

        require(
            campaign.deadline < block.timestamp,
            "The deadline should be in future."
        );

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.image = _image;
        campaign.deadline = _deadline;
        campaign.target = _target;
        campaign.amountCollected = 0;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    // User donate to campaign
    function donateCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool success, ) = payable(campaign.owner).call{value: amount}("");

        if (success) {
            campaign.amountCollected += amount;
        }
    }

    // Get all campaign
    function getAllCampaigns() public view returns (Campaign[] memory) {
        // here we create a array of Campaign type with fix side of numberOfCampaigns.
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);
        // ArrayType[]   variable = new ArrayType(size)

        for (uint i = 0; i < numberOfCampaigns; i++) {
            // Here, campaigns[i] get that campaign from mapping table and assign to allCampaign[i]
            Campaign storage item = campaigns[i];

            // this item variable assign to the allCampaign[i]
            // [{item}, {item}]
            allCampaigns[i] = item;
        }
        return allCampaigns;
    }

    // get all donators list
    function getDonatorsList(
        uint256 _id
    ) public view returns (address[] memory, uint256[] memory) {
        address[] memory campaignOwners = campaigns[_id].donators;
        uint256[] memory campaignDonations = campaigns[_id].donations;

        return (campaignOwners, campaignDonations);
    }

    function getCurrentUserCampaign(
        address _owner
    ) public view returns (Campaign[] memory) {
        Campaign[] memory userCampaigns = new Campaign[](numberOfCampaigns);
        uint256 count = 0;

        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            if (campaigns[i].owner == _owner) {
                userCampaigns[count] = campaigns[i];
                count++;
            }
        }

        // Resize the array to the actual number of campaigns
        Campaign[] memory result = new Campaign[](count);
        for (uint256 j = 0; j < count; j++) {
            result[j] = userCampaigns[j];
        }

        return result;
    }
}
