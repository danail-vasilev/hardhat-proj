import { ethers } from "hardhat";

export async function main(_privateKey: string, _rpcUrl: string) {
  console.log(_privateKey);
  console.log(_rpcUrl);

  const provider = new ethers.providers.JsonRpcProvider(_rpcUrl);
  const wallet = new ethers.Wallet(_privateKey, provider);
  // console.log(
  //   `private key: ${_privateKey}\nprovider: ${ethers.provider.connection.url}`
  // );
  // const wallet = new ethers.Wallet(_privateKey, ethers.provider); // New wallet with the privateKey passed from CLI as param
  console.log("Deploying contracts with the account:", wallet.address); // We are printing the address of the deployer
  const USElection_Factory = await ethers.getContractFactory("USElection");
  const usElection = await USElection_Factory.connect(wallet).deploy();
  await usElection.deployed();
  console.log(`The US Election contract is deployed to ${usElection.address}`);
  const owner = await usElection.owner();
  console.log(`The US Election contract owner is ${owner}`);
}
