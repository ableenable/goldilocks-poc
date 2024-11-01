// controllers/agentController.js

const OpenAI = require('openai');
const { ethers } = require('ethers');
const User = require('../models/User');
const provider = require('../utils/provider');
const {completeUSDCTransaction} = require('./transactionController');
require('dotenv').config();


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Handle agent messages
exports.handleAgent = async (req, res) => {
  const userId = req.user; // Assuming auth middleware sets req.user
  const { message } = req.body;

  try {
    // Construct the conversation
    const systemPrompt = `
    You are an assistant that helps users with their USDC wallet.
    If the user asks to send USDC, extract the recipient address and amount.
    Reply with a confirmation message including the recipient and amount.
    Format your response as JSON:
    {
      "action": "transfer",
      "recipient": "recipient_address",
      "amount": "amount"
    }
    If not a transfer request, respond normally.
    `;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o', // Use 'gpt-4' if you have access
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
      temperature: 0.7,
    });

    const reply = completion.choices[0].message.content.trim();
    console.log('OpenAI reply:', reply);

    // Attempt to parse JSON from the reply
    let action = null;
    try {
      const parsedReply = JSON.parse(reply);
      console.log('Parsed reply action:', parsedReply.action);
      if (parsedReply.action === 'transfer') {
        action = parsedReply;
      }
    } catch (e) {
      // Not a JSON response; proceed as normal text reply
      console.log('Reply is not JSON:', e);
    }

    if (action && action.action === 'transfer') {
      // Validate recipient address and amount
      console.log("action:", action);
      const { recipient, amount } = action;

      // Perform server-side validation
      if (!/^0x[a-fA-F0-9]{40}$/.test(recipient)) {
        return res.status(400).json({ message: 'Invalid recipient address.' });
      }

      if (isNaN(amount) || parseFloat(amount) <= 0) {
        return res.status(400).json({ message: 'Invalid amount.' });
      }

      // Initiate the transfer
      // Call your existing transfer function or controller
      // For example:
      console.log(`Initiating transfer of ${amount} USDC to ${recipient} for user ${userId}`);
      const transferResult = await transferUSDC(userId, recipient, amount);

      if (transferResult.success) {
        res.json({ reply: `Transfer successful! Sent ${amount} USDC to ${recipient}.` });
      } else {
        res.status(500).json({ message: 'Transfer failed.' });
      }
    } else {
      // Regular reply
      res.json({ reply });
    }
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    res.status(500).json({ message: 'Error communicating with the assistant.' });
  }
};

// Helper function to perform the transfer
async function transferUSDC(userId, recipientAddress, amount) {
  try {
    const safeTransaction = await completeUSDCTransaction(userId, recipientAddress, amount);

    return { success: true, transaction: safeTransaction};
  } catch (error) {
    console.error('Error sending USDC:', error);
    return { success: false, error: error.message };
  }
}
