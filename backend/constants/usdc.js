// const USDC_ADDRESS = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'; // Polygon USDC address
const USDC_ADDRESS = '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359'
// const USDC_ADDRESS = '0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582'; // Polygon PoS Amoy Testnet address

const USDC_ABI = [
  'function transfer(address to, uint256 value) returns (bool)',
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  // Add other necessary functions
];

module.exports = { USDC_ADDRESS, USDC_ABI };