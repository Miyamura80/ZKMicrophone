// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "forge-std/Script.sol";
import "../src/AudioRegistry.sol";
import "../src/plonk_vk.sol";

contract VerifierScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        UltraVerifier verifier = new UltraVerifier();
        console.log("verifier address", address(verifier));
    }
}
