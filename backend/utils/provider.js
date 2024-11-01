const { ethers } = require('ethers');
require('dotenv').config(); 

const provider = new ethers.AlchemyProvider('matic', process.env.ALCHEMY_API_KEY);

module.exports = provider;