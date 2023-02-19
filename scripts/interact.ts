import { JsonRpcProvider } from "@ethersproject/providers";
import { ethers } from "hardhat";
import USElection from "../artifacts/contracts/USElection.sol/USElection.json";

export async function main(
  privateKey: string,
  rpcUrl: string,
  contractAddress: string
) {
  // testEtherUtils();
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const latestBlock = await provider.getBlock("latest");
  console.log(latestBlock.hash);
  const wallet = new ethers.Wallet(privateKey, provider);
  const balance = await wallet.getBalance();
  console.log(balance);
  console.log(balance.toString());
  console.log(ethers.utils.formatEther(balance));

  // const contractAddress = await getAddressofDeployedContract(); // 0x5FbDB2315678afecb367f032d93F642f64180aa3
  // 1) Approach use attach
  const USElectionFactory = await ethers.getContractFactory("USElection");
  const electionContract = await USElectionFactory.connect(wallet).attach(
    contractAddress
  );

  // 2) Approach initiate contract instance
  // const electionContract = new ethers.Contract(
  //   contractAddress,
  //   USElection.abi,
  //   wallet
  // );

  console.log(`USElection deployed to: ${electionContract.address}`);

  const hasEnded = await electionContract.electionEnded();
  console.log("The election has ended:", hasEnded);

  const haveResultsForOhio = await electionContract.resultsSubmitted("Ohio");
  console.log("Have results for Ohio:", haveResultsForOhio);

  const transactionOhio = await electionContract.submitStateResult([
    "Ohio",
    250,
    150,
    24,
  ]);
  const transactionReceipt = await transactionOhio.wait();
  if (transactionReceipt.status != 1) {
    // 1 means success
    console.log("Transaction was not successful");
    return;
  }
  const resultsSubmittedOhioNew = await electionContract.resultsSubmitted(
    "Ohio"
  );
  console.log("Results submitted for Ohio", resultsSubmittedOhioNew);
  const currentLeader = await electionContract.currentLeader();
  console.log("Current leader", currentLeader);
}

async function getAddressofDeployedContract() {
  const USElectionFactory = await ethers.getContractFactory("USElection");
  const electionContract = await USElectionFactory.deploy();
  await electionContract.deployed();
  return electionContract.address;
}

async function connectToOtherWallet(
  provider: JsonRpcProvider,
  contractAddress: string,
  Contract: any
) {
  const aliceWallet = new ethers.Wallet("alicePrivateKey", provider);
  const aliceContractInstance = new ethers.Contract(
    contractAddress,
    Contract.abi,
    aliceWallet
  );

  const bobsWallet = new ethers.Wallet("bobsPrivateKey", provider);
  const bobsContractInstance = await aliceContractInstance.connect(bobsWallet);
}

function testEtherUtils() {
  console.log(ethers.utils.isAddress("some string"));
  console.log(
    ethers.utils.isAddress("0xF750cdF60f11a3Dd2d09ac26C0a698C142a0795a")
  );
  let number1 = Math.pow(2, 53) - 1; // === Number.MAX_SAFE_INTEGER
  let number2 = Math.pow(2, 53);
  console.log(number1);
  console.log(number2);
  const bigNumber1 = ethers.BigNumber.from("42");
  const bigNumber2 = ethers.BigNumber.from(2);
  console.log(bigNumber2);
  const bigNumber3 = bigNumber1.mul(bigNumber2);
  console.log(bigNumber3);
  console.log(bigNumber1.toNumber());
  console.log(bigNumber1.toString());
  console.log(bigNumber1.toHexString());
}
