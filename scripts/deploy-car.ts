import { ethers } from "hardhat";

// TODO: Reuse deploy script, pass only contract name
export async function main(privateKey: string, rpcUrl: string) {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);
  const balance = await wallet.getBalance();

  console.log(balance.toString());

  const CarCollectionFactory = await ethers.getContractFactory("CarCollection");
  const carCollection = await CarCollectionFactory.connect(wallet).deploy();
  await carCollection.deployed();

  console.log(carCollection.address);
}
