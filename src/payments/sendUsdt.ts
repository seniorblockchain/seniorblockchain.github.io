import { toNano, beginCell, Address } from 'ton';
import {
  RECEIVER_ADDRESS,
  getTxValidUntil,
  TON_FEE,
  USDT_MASTER_ADDRESS,
} from '../utils/transactionConfig';
import { getJettonWalletAddress } from '../utils/getJettonWalletAddress';

const displayMessage = (message: string, type: 'success' | 'error') => {
  let messageDiv = document.getElementById('message-box');
  if (!messageDiv) {
    messageDiv = document.createElement('div');
    messageDiv.id = 'message-box';
    messageDiv.style.position = 'fixed';
    messageDiv.style.bottom = '20px';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translateX(-50%)';
    messageDiv.style.padding = '15px 20px';
    messageDiv.style.borderRadius = '8px';
    messageDiv.style.fontFamily = 'Arial, sans-serif';
    messageDiv.style.fontSize = '16px';
    messageDiv.style.zIndex = '1000';
    messageDiv.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    document.body.appendChild(messageDiv);
  }

  messageDiv.textContent = message;
  if (type === 'success') {
    messageDiv.style.backgroundColor = '#4caf50';
    messageDiv.style.color = '#ffffff';
  } else if (type === 'error') {
    messageDiv.style.backgroundColor = '#f44336';
    messageDiv.style.color = '#ffffff';
  }

  setTimeout(() => {
    if (messageDiv) {
      messageDiv.remove();
    }
  }, 3000);
};

export const handleSendUsdt = async (
  tonConnectUI: any,
  userFriendlyAddress: string | null,
  usdtAmount: number // Accepting custom amount
) => {
  if (!userFriendlyAddress) {
    console.error('User address is not available');
    displayMessage('User address is not available', 'error');
    return;
  }

  const usdtAmountInNano = usdtAmount * 1_000_000; // Convert USDT to smallest unit

  const forwardPayload = beginCell()
    .storeUint(0, 32) // 0 opcode means we have a comment
    .storeStringTail('USDT Pass payment!')
    .endCell();

  const usdtMessageBody = beginCell()
    .storeUint(0xf8a7ea5, 32) // opcode for jetton transfer
    .storeUint(0, 64) // query id
    .storeCoins(usdtAmountInNano)
    .storeAddress(RECEIVER_ADDRESS)
    .storeAddress(Address.parse(userFriendlyAddress)) // response destination
    .storeBit(0) // no custom payload
    .storeCoins(toNano('0.01')) // forward amount - if >0, will send notification message
    .storeBit(1) // we store forwardPayload as a reference
    .storeRef(forwardPayload)
    .endCell();

  let jettonWalletAddress;
  let jettonBalance;
  if (userFriendlyAddress) {
    const result = await getJettonWalletAddress(
      userFriendlyAddress,
      USDT_MASTER_ADDRESS,
    );
    jettonWalletAddress = result.walletAddress;
    jettonBalance = result.balance;
  }

  if (!jettonBalance || jettonBalance < usdtAmountInNano) {
    displayMessage('Insufficient funds', 'error');
    return;
  }

  if (!jettonWalletAddress) {
    displayMessage('Jetton Wallet Address is not available', 'error');
    return;
  }

  const usdtTransaction = {
    validUntil: getTxValidUntil(),
    messages: [
      {
        address: jettonWalletAddress.toString(),
        amount: TON_FEE.toString(),
        payload: usdtMessageBody.toBoc().toString('base64'),
      },
    ],
  };

  try {
    await tonConnectUI.sendTransaction(usdtTransaction);
    displayMessage('USDT payment sent successfully', 'success');
    console.log('USDT payment sent successfully');
  } catch (error) {
    console.error('Error sending USDT transaction:', error);
    displayMessage('Error sending USDT transaction', 'error');
  }
};
