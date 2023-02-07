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
  // networks: {
  //   // Goerli Testnet
  //   goerli: {
  //     url: `https://goerli.infura.io/v3/`,
  //     chainId: 5,
  //     accounts: [``],
  //   },
  // },
};

export default config;
