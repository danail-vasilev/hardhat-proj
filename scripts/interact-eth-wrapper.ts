import { JsonRpcProvider } from "@ethersproject/providers";
import { ethers } from "hardhat";
import ETHWrapper from "../artifacts/contracts/ETHWrapper.sol/ETHWrapper.json";

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
  const wrapValue = ethers.utils.parseEther("1");

  // 1) Approach use attach
  const ETHWrapperFactory = await ethers.getContractFactory("ETHWrapper");
  const ETHWrapperContract = await ETHWrapperFactory.connect(wallet).attach(
    contractAddress
  );

  // 2) Approach initiate contract instance
  // const ETHWrapperContract = new ethers.Contract(
  //   contractAddress,
  //   ETHWrapperContract.abi,
  //   wallet
  // );

  console.log(`ETHWrapper deployed to: ${ETHWrapperContract.address}`);

  // Wrapping value
  // 1) Approach - call wrap method
  const tx = await ETHWrapperContract.wrap({ value: wrapValue });
  await tx.wait();
  // 2) Approach - directly send value, receive function in conract must call wrap()
  const wrapTx = await wallet.sendTransaction({
    to: ETHWrapperContract.address,
    value: wrapValue,
  });

  let contractETHBalance = await provider.getBalance(
    ETHWrapperContract.address
  );
  console.log(
    "Contract ETH balance after wrapping:",
    contractETHBalance.toString()
  );

  // Unwrapping value
  const WETHFactory = await ethers.getContractFactory("WETH");
  const wethAddress = await ETHWrapperContract.WETHToken();
  const WETHContract = await WETHFactory.connect(wallet).attach(wethAddress);

  const approveTx = await WETHContract.approve(
    ETHWrapperContract.address,
    wrapValue
  );
  await approveTx.wait();

  const unwrapTx = await ETHWrapperContract.unwrap(wrapValue);
  await unwrapTx.wait();

  balance = await WETHContract.balanceOf(wallet.address);
  console.log("Balance after unwrapping:", balance.toString());

  contractETHBalance = await provider.getBalance(ETHWrapperContract.address);
  console.log(
    "Contract ETH balance after unwrapping:",
    contractETHBalance.toString()
  );
}
