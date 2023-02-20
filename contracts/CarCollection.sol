// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CarCollection is ERC1155 {
    uint256 public constant BMW = 1;
    uint256 public constant AUDI = 2;
    uint256 public constant Toyota = 3;

    constructor()
        ERC1155(
            "https://ipfs.io/ipfs/bafybeieplbl477esegdhgdhmn2kdxsdtrp262ytt3zfumu6qlykyvkz4oe/{id}.json"
        )
    {
        _mint(msg.sender, BMW, 1, "");
        _mint(msg.sender, AUDI, 1, "");
        _mint(msg.sender, Toyota, 1, "");
    }

    function uri(
        uint256 _tokenid
    ) public pure override returns (string memory) {
        return
            string(
                abi.encodePacked(
                    "https://ipfs.io/ipfs/bafybeieplbl477esegdhgdhmn2kdxsdtrp262ytt3zfumu6qlykyvkz4oe/",
                    Strings.toString(_tokenid),
                    ".json"
                )
            );
    }
}
