import { ethers } from "hardhat";

// TODO: Reuse deploy script, pass only contract name
export async function main(privateKey: string, rpcUrl: string) {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);
  const balance = await wallet.getBalance();

  console.log(balance.toString());

  const NFTFactory = await ethers.getContractFactory("NFT");
  const NFTContract = await NFTFactory.connect(wallet).deploy();
  await NFTContract.deployed();

  console.log(NFTContract.address);
}
