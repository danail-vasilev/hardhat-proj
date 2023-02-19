import { JsonRpcProvider } from "@ethersproject/providers";
import { ethers } from "hardhat";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";

export async function main(
  privateKey: string,
  rpcUrl: string,
  contractAddress: string
) {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const latestBlock = await provider.getBlock("latest");
  console.log(latestBlock.hash);
  const wallet = new ethers.Wallet(privateKey, provider);
  let balance = await wallet.getBalance();
  console.log(balance.toString());

  // 1) Approach use attach
  const NFTFactory = await ethers.getContractFactory("NFT");
  const NFTContract = await NFTFactory.connect(wallet).attach(contractAddress);

  // 2) Approach initiate contract instance
  // const NFTContract = new ethers.Contract(
  //   contractAddress,
  //   NFT.abi,
  //   wallet
  // );

  console.log(`NFT deployed to: ${NFTContract.address}`);
  const CAR_PNG_HASH = "QmPMmi5Kje3ZhrXMMCeV5JgXgbugTjYFwebjwfBQsgDX5i";
  const CAR_JSON_HASH = "QmTEkZrJStStw4Qoq3a37Rtbby391EKy9B7cRmVxUcYK2y";
  const uri = `https://ipfs.io/ipfs/${CAR_JSON_HASH}`;

  await NFTContract.safeMint(uri, wallet.address);

  const uriFromContract = await NFTContract.tokenURI(1);
  console.log("The token URI is ", uriFromContract);

  const owner = await NFTContract.ownerOf(1);
  console.log("The owner of the token with id 1 is ", owner);
}
