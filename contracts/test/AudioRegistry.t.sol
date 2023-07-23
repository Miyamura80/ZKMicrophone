// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "forge-std/Test.sol";
import "../src/AudioRegistry.sol";
import "../src/EASAudioAttester.sol";

contract AudioRegistryTest is Test {
    AudioRegistry audioRegistry;
    EASAudioAttester eas;

    function setUp() public {
        audioRegistry = new AudioRegistry(address(0));
        eas = new EASAudioAttester(address(audioRegistry));
    }

    function test_Audio() public {
        audioRegistry.registerMicrophone(address(1));
    }

    function test_EAS() public view {
        eas.attest(bytes32(0));
    }
}
