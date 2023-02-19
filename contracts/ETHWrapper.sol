// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;
import "./WETH.sol";

contract ETHWrapper {
    WETH public WETHToken;
    event LogETHWrapped(address sender, uint256 amount);
    event LogETHUnwrapped(address sender, uint256 amount);

    // 1) Approach - Not an usual case because the token contract would have been previously created.
    constructor() {
        WETHToken = new WETH();
    }

    // 2) Approach - To pass an external contract to your contract just pass its address and cast it.
    // As long as you have the correct ABI interface you will be able to interact with it freely.
    // constructor(address wethTokenAddress) public {
    //     WETHToken = WETH(wethTokenAddress);
    // }

    // In value is send directly to contract wrap it
    receive() external payable {
        wrap();
    }

    // Triggered if no other function is matched; receive will only be triggered by
    // ETH transactions, whereas fallback will be triggered even without ETH but just data.
    fallback() external payable {
        wrap();
    }

    function wrap() public payable {
        require(msg.value > 0, "We need to wrap at least 1 WETH");
        WETHToken.mint(msg.sender, msg.value);
        emit LogETHWrapped(msg.sender, msg.value);
    }

    function unwrap(uint256 value) public {
        require(value > 0, "We need to unwrap at least 1 WETH");
        WETHToken.transferFrom(msg.sender, address(this), value);
        WETHToken.burn(value);
        payable(msg.sender).transfer(value);
        emit LogETHUnwrapped(msg.sender, value);
    }
}
