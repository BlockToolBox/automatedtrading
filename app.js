  const contractAddress = 'INSERT QUICKSWAP OR SNIPE CONTRACT ADDRESS HERE'; 
  const contractABI = [INSERT ABI HERE];

  const contractAddressA = 'INSERT WETH ADDRESS HERE';
  const contractABIA = [INSERT WETH CONTRACT ABI HERE];

  let web3;
  let contract;
  let contractA;
  
  async function init() {
  if (typeof window.ethereum === 'undefined') {
    alert("Please install MetaMask to use this application");
    return;
  }

  if (window.ethereum.selectedAddress === null) {
    try {
      await ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      alert("Failed to connect MetaMask. Please try again or check your MetaMask setup.");
      return;
    }
  }

  web3 = new Web3(window.ethereum);
  contract = new web3.eth.Contract(contractABI, contractAddress);
  contractA = new web3.eth.Contract(contractABIA, contractAddressA);
}

async function approveTokens() {
  if (typeof web3 === 'undefined' || typeof ethereum === 'undefined' || typeof ethereum.selectedAddress === 'undefined') {
 
    try {
      await ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.error(error);
      alert("Failed to connect MetaMask. Please try again or check your MetaMask setup.");
      return;
    }
  }


  const addressToApprove = 'INSERT QUICKSWAP OR SNIPE CONTRACT ADDRESS HERE';

  try {
    await contractA.methods.approve(addressToApprove, 'INSERT FIXED AMOUNT TO APPROVE IN WEI HERE').send({ from: ethereum.selectedAddress });

    alert('Tokens approved successfully!');
  } catch (error) {
    console.error(error);
    alert('Error occurred during token approval');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('approveButton');
  button.addEventListener('click', approveTokens);
});



async function buyTokens() {
  try {
    const provider = new Web3.providers.HttpProvider('INSERT INFURA OR QUICKNODE URL HERE');
    const web3WithProvider = new Web3(provider);
    const contractWithProvider = new web3WithProvider.eth.Contract(contractABI, contractAddress);

    const privateKey = 'INSERT WALLET PRIVATE KEY HERE';
    web3WithProvider.eth.accounts.wallet.add(privateKey);
    const fromAddress = web3WithProvider.eth.accounts.wallet[0].address;

    const wethAddress = 'INSERT WETH CONTRACT ADDRESS HERE';
    const tokenOutAddress = document.getElementById('tokenOutAddress').value;
    const amountInEth = document.getElementById('amountInEth').value;
    const toAddress = document.getElementById('toAddress').value;
    const amountInWei = web3WithProvider.utils.toWei(amountInEth, 'ether');

    await contractWithProvider.methods.swap(wethAddress, tokenOutAddress, amountInWei, 1, toAddress).send({ from: fromAddress, gas: 3000000 });
  } catch (error) {
    console.error(error);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('buyButton');
  button.addEventListener('click', buyTokens);
});

window.addEventListener('DOMContentLoaded', init);