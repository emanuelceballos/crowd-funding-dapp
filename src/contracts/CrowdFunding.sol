// SPDX-License-Identifier: MIT
pragma solidity >=0.8.15 <0.9.0;

import {Request} from "./structs/Request.sol";

contract CrowdFunding {
    mapping(address => uint256) public Contributors;
    address public Manager;
    uint256 public minContribution;
    uint256 public deadline;
    uint256 public target;
    uint256 public raiseAmount;
    uint256 public noOfContributors;

    mapping(uint256 => Request) public requests;
    uint256 public numberOfRequests;

    event EthReceived(address indexed _from, uint256 _value);

    /// @param _target Target in Wei unit
    /// @param _deadline Deadline in seconds. For a deadline within an hour, send 3600.
    /// @dev deadline = block.timestamp + _deadline
    constructor(uint256 _target, uint256 _deadline) {
        target = _target;
        deadline = block.timestamp + _deadline; // 1hr = 60*60 = 3600
        minContribution = 100 wei;
        Manager = msg.sender;
    }

    function SendEth() public payable {
        require(block.timestamp < deadline, "Deadline has been passed");
        require(msg.value >= minContribution, "Minimum contribution not met");

        // Only increase the number of contributers if they have not
        // contributed yet.
        if (Contributors[msg.sender] == 0) {
            noOfContributors++;
        }

        Contributors[msg.sender] += msg.value;
        raiseAmount += msg.value;
        emit EthReceived(msg.sender, msg.value);
    }

    function GetContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function Refund() public {
        require(
            block.timestamp > deadline && raiseAmount < target,
            "Deadline or target reached"
        );
        require(
            Contributors[msg.sender] > 0,
            "Address is not a contributor for this funding"
        );

        // We need to make the user's address payable in order to refund
        address payable user = payable(msg.sender);
        user.transfer(Contributors[msg.sender]);
        Contributors[msg.sender] = 0;
    }

    function MakeRequest(
        string memory _description,
        address payable _recipient,
        uint256 _value
    ) public {
        require(msg.sender == Manager, "Only manager can make the request");

        Request storage newRequest = requests[numberOfRequests];
        numberOfRequests++;

        newRequest.description = _description;
        newRequest.recipient = _recipient;
        newRequest.value = _value;
        newRequest.isCompleted = false;
        newRequest.noOfVoters = 0;
    }

    function Voting(uint256 requestNumber) public {
        require(
            Contributors[msg.sender] > 0,
            "Address is not a contributor for this funding"
        );

        Request storage request = requests[requestNumber];

        require(
            request.voters[msg.sender] == false,
            "This address has already voted"
        );

        request.voters[msg.sender] = true;
        request.noOfVoters++;
    }

    function MakePayment(uint256 requestNumber) public {
        require(
            raiseAmount >= target,
            "Target needs to be reached before making payments"
        );
        require(msg.sender == Manager, "Only the manager can make a payment");

        Request storage request = requests[requestNumber];

        require(
            request.isCompleted == false,
            "The payment for this request has already been done"
        );
        require(
            request.noOfVoters > noOfContributors / 2,
            "Majority does not support"
        );

        request.recipient.transfer(request.value);
        request.isCompleted = true;
    }
}
