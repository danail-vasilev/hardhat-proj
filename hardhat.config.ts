import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import "dotenv/config";

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const GOERLI_USELECTION_CONTRACT = process.env.GOERLI_USELECTION_CONTRACT;

const LOCAL_HOST_URL = process.env.LOCAL_HOST_URL;
const LOCAL_HOST_ACC = process.env.LOCAL_HOST_ACC;
const LOCAL_HOST_PRIVATE_KEY = process.env.LOCAL_HOST_PRIVATE_KEY;
const LOCAL_HOST_USELECTION_CONTRACT =
  process.env.LOCAL_HOST_USELECTION_CONTRACT;

const lazyImport = async (module: any) => {
  return await import(module);
};

task("deploy-nft", "Deploys NFT contract")
  .addParam(
    "isLocal",
    "If true - deploys contract to localhost network, otherwise goerli network"
  )
  .setAction(async ({ isLocal }) => {
    const { main } = await lazyImport("./scripts/deploy-nft");
    await main(getPrivateKey(isLocal), getRpcUrl(isLocal));
  });

task("interact-nft", "Interact with NFT contract")
  .addParam(
    "isLocal",
    "If true - interacts with contract from localhost network, otherwise goerli network"
  )
  .setAction(async ({ isLocal }) => {
    const { main } = await lazyImport("./scripts/interact-nft");
    await main(
      getPrivateKey(isLocal),
      getRpcUrl(isLocal),
      getContractAddress(isLocal)
    );
  });

task("deploy-eth-wrapper", "Deploys ETH Wrapper contract")
  .addParam(
    "isLocal",
    "If true - deploys contract to localhost network, otherwise goerli network"
  )
  .setAction(async ({ isLocal }) => {
    const { main } = await lazyImport("./scripts/deploy-eth-wrapper");
    await main(getPrivateKey(isLocal), getRpcUrl(isLocal));
  });

task("interact-eth-wrapper", "Interact with ETH Wrapper contract")
  .addParam(
    "isLocal",
    "If true - interacts with contract from localhost network, otherwise goerli network"
  )
  .setAction(async ({ isLocal }) => {
    const { main } = await lazyImport("./scripts/interact-eth-wrapper");
    await main(
      getPrivateKey(isLocal),
      getRpcUrl(isLocal),
      getContractAddress(isLocal)
    );
  });

task("interact", "Interact with US Election contract")
  .addParam(
    "isLocal",
    "If true - interacts with contract from localhost network, otherwise goerli network"
  )
  .setAction(async ({ isLocal }) => {
    const { main } = await lazyImport("./scripts/interact");
    await main(
      getPrivateKey(isLocal),
      getRpcUrl(isLocal),
      getContractAddress(isLocal)
    );
  });

task(
  "deploy-env",
  "Deploys contract with pk from env to local host or goerli network"
)
  .addParam(
    "isLocal",
    "If true - deploys contract to localhost network, otherwise goerli network"
  )
  .setAction(async ({ isLocal }) => {
    const { main } = await lazyImport("./scripts/deploy-pk");
    await main(getPrivateKey(isLocal), getRpcUrl(isLocal));
  });

function getPrivateKey(isLocalHost: string) {
  return isTrue(isLocalHost) ? LOCAL_HOST_PRIVATE_KEY : PRIVATE_KEY;
}

function getRpcUrl(isLocalHost: string) {
  return isTrue(isLocalHost) ? LOCAL_HOST_URL : GOERLI_RPC_URL;
}

function getContractAddress(isLocalHost: string) {
  return isTrue(isLocalHost)
    ? LOCAL_HOST_USELECTION_CONTRACT
    : GOERLI_USELECTION_CONTRACT;
}

function isTrue(boolStr: string) {
  return boolStr === "true";
}

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY!],
      chainId: 5,
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at <https://etherscan.io/>
    apiKey: ETHERSCAN_API_KEY,
  },
};

export default config;
