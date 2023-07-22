// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "forge-std/Test.sol";
import "../src/AudioVerifier.sol";

contract AudioVerifierTest is Test {
    AudioVerifier audioVerifier;

    function setUp() public {
        audioVerifier = new AudioVerifier(address(0));
    }

    function test_Audio() public {
        audioVerifier.registerMicrophone(address(1));
    }

}
