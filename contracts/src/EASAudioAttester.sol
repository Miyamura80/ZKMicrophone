// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "./AudioRegistry.sol";

contract EASAudioAttester {
    AudioRegistry audioRegistry;

    constructor(address audioRegistryAddress_) {
        audioRegistry = AudioRegistry(audioRegistryAddress_);
    }

    function attest (bytes32 editedAudioFullHash) external {
        require(audioRegistry.audioExists(editedAudioFullHash)); 
        // msg.sender
    }

}
