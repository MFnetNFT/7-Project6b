/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * truffleframework.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like truffle-hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura API
 * keys are available for free at: infura.io/register
 *
 *   > > Using Truffle V5 or later? Make sure you install the `web3-one` version.
 *
 *   > > $ npm install truffle-hdwallet-provider@web3-one
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

require("dotenv").config(); // Store environment-specific variable from '.env' to process.env
const HDWalletProvider = require("@truffle/hdwallet-provider");
const infuraKey = process.env.INFURA_API_KEY;
const mnemonic = process.env.MNEMONIC;

module.exports = {

  /**
  dashboard: {
    // host: "localhost",
    // port: 24012,
  },
  */

  networks: {
    dashboard: {
      timeout: 300000, // Increase timeout value to 5 minutes (in milliseconds)
      networkCheckTimeout: 300000 // Increase network check timeout to 5 minutes (in milliseconds)
    },

    development: {
      host: "localhost",     // Localhost (default: none)
      port: 8545,
      network_id: "*",       // Match any network id
    },

    sepolia: {
      // provider: () => new HDWalletProvider(mnemonic, "https://sepolia.infura.io/v3/" + infuraKey),
      provider: () => new HDWalletProvider(mnemonic, "wss://sepolia.infura.io/ws/v3/" + infuraKey),
      // network_id: 11155111,
      network_id: "*",
      // gas: 8000000,  // optional: set the gas limit for this network
      // gasPrice: 20000000000,  // optional: set the gas price for this network
      timeout: 300000, // Increase timeout value to 5 minutes (in milliseconds)
      networkCheckTimeout: 300000 // Increase network check timeout to 5 minutes (in milliseconds)
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.1",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },
  deploymentTimeout: 600000 // Set the deployment timeout to 600 seconds (10 minutes)
}
