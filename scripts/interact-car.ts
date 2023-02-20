import { JsonRpcProvider } from "@ethersproject/providers";
import { ethers } from "hardhat";
import CarCollection from "../artifacts/contracts/CarCollection.sol/CarCollection.json";

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

  const CarCollectionFactory = await ethers.getContractFactory("CarCollection");
  const carCol = await CarCollectionFactory.connect(wallet).attach(
    contractAddress
  );

  console.log(`Car collection deployed to: ${carCol.address}`);

  // ipfs://bafkreiflw5oh2rpnho75fgyg5vugns54dvtfxwvhaq7fzlyo56kap2ecmi - bmw
  // ipfs://bafkreicgd3jprugtkkbl2lenvabkfrgomsxa6taysdbe22i75xq2uwcdf4 - toyota
  // ipfs://bafkreih4cnslbedhqtdnxekt7j6k2ku2rdb6oyacnmdfhx2kievcbgp7la - audi

  // Car file contains all 3 json files:
  // https://ipfs.io/ipfs/bafybeieplbl477esegdhgdhmn2kdxsdtrp262ytt3zfumu6qlykyvkz4oe/1.json

  const balance1 = await carCol.balanceOf(wallet.address, 1);
  console.log(balance1);

  const balance2 = await carCol.balanceOf(wallet.address, 2);
  console.log(balance2);

  const uri1 = await carCol.uri(1);
  console.log(uri1);
  const uri2 = await carCol.uri(2);
  console.log(uri2);
  const uri3 = await carCol.uri(3);
  console.log(uri3);
}
