// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "forge-std/Test.sol";
import "../src/AudioRegistry.sol";

contract AudioRegistryTest is Test {
    AudioRegistry audioRegistry;

    function setUp() public {
        audioRegistry = new AudioRegistry(address(0));
    }

    function test_Audio() public {
        audioRegistry.registerMicrophone(address(1));
    }

}
