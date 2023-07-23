// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "forge-std/Script.sol";
import "../src/AudioRegistry.sol";

contract AudioRegistryScript is Script {
    function setUp() public {}

    function run() public {
        // uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        // vm.startBroadcast(deployerPrivateKey);
        address micAddress = vm.envAddress("MICROPHONE_ADDRESS");
        vm.startBroadcast();
        AudioRegistry registry = new AudioRegistry(address(0));
        console.log("Registry address", address(registry));
        registry.registerMicrophone(micAddress);
    }
}
