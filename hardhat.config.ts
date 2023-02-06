import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

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
  networks: {
    // Goerli Testnet
    goerli: {
      url: `https://goerli.infura.io/v3/YOUR_INFURA_KEY`,
      chainId: 5,
      accounts: [`YOUR_PRIVATE_KEY`],
    },
  },
};

export default config;
