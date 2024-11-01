const { ethers } = require('ethers');
require('dotenv').config(); 

const provider = new ethers.AlchemyProvider('matic', process.env.ALCHEMY_API_KEY);
// const provider = new ethers.JsonRpcProvider(`https://polygon-mainnet.g.alchemy.com/v2/u2ixKAJj7hrQTs0djv6ubuQUDr8P-ts6`);
console.log('provider:', provider);

module.exports = provider;