import { ethers } from "hardhat";

// TODO: Reuse deploy script, pass only contract name
export async function main(privateKey: string, rpcUrl: string) {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);
  const balance = await wallet.getBalance();

  console.log(balance.toString());
  const wrapValue = ethers.utils.parseEther("1");

  const ETHWrapperFactory = await ethers.getContractFactory("ETHWrapper");
  const ETHWrapperContract = await ETHWrapperFactory.connect(wallet).deploy();
  await ETHWrapperContract.deployed();

  console.log(ETHWrapperContract.address);
}
