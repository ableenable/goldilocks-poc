// Import the Alchemy class
const { ethers } = require('ethers');
require('dotenv').config(); 

const provider = new ethers.AlchemyProvider('matic-amoy', process.env.ALCHEMY_API_KEY);


// Configure the Alchemy settings
// const settings = {
//   apiKey: process.env.ALCHEMY_API_KEY,
//   network: Network.MATIC_AMOY, // Specify the network
// };

// const alchemy = new Alchemy(settings);

// Get the current block number
// console.log('Connecting to Ethereum network...');
// alchemy.core.getBlockNumber()
//   .then((blockNumber) => {
//     console.log('Connected to Ethereum network.');
//     console.log('Current block number:', blockNumber);
//   })
//   .catch((error) => {
//     console.error('Error connecting to the network:', error.message);
//   });

// Setup: npm install alchemy-sdk
// Github: https://github.com/alchemyplatform/alchemy-sdk-js
// const { Network, Alchemy } = require('alchemy-sdk');

// // Optional config object, but defaults to demo api-key and eth-mainnet.
// const settings = {
//   apiKey: "u2ixKAJj7hrQTs0djv6ubuQUDr8P-ts6", // Replace with your Alchemy API Key.
//   network: Network.MATIC_AMOY, // Replace with your network.
// };
// const alchemy = new Alchemy(settings);

// alchemy.core.getBlockNumber("finalized").then(console.log);