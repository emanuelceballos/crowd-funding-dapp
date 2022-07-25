// SPDX-License-Identifier: MIT
pragma solidity >=0.8.15 <0.9.0;

struct Request {
    string description;
    address payable recipient;
    uint256 value;
    bool isCompleted;
    uint256 noOfVoters;
    mapping(address => bool) voters;
}
