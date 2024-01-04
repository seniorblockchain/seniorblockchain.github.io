const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

const usdt = {
  address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  abi: [{
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [{
      "name": "",
      "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "_upgradedAddress",
      "type": "address"
    }],
    "name": "deprecate",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "_spender",
      "type": "address"
    }, {
      "name": "_value",
      "type": "uint256"
    }],
    "name": "approve",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "deprecated",
    "outputs": [{
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "_evilUser",
      "type": "address"
    }],
    "name": "addBlackList",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "_from",
      "type": "address"
    }, {
      "name": "_to",
      "type": "address"
    }, {
      "name": "_value",
      "type": "uint256"
    }],
    "name": "transferFrom",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "upgradedAddress",
    "outputs": [{
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "name": "",
      "type": "address"
    }],
    "name": "balances",
    "outputs": [{
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "maximumFee",
    "outputs": [{
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "_totalSupply",
    "outputs": [{
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [],
    "name": "unpause",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "name": "_maker",
      "type": "address"
    }],
    "name": "getBlackListStatus",
    "outputs": [{
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "name": "",
      "type": "address"
    }, {
      "name": "",
      "type": "address"
    }],
    "name": "allowed",
    "outputs": [{
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "paused",
    "outputs": [{
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "name": "who",
      "type": "address"
    }],
    "name": "balanceOf",
    "outputs": [{
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [],
    "name": "pause",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "getOwner",
    "outputs": [{
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [{
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [{
      "name": "",
      "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "_to",
      "type": "address"
    }, {
      "name": "_value",
      "type": "uint256"
    }],
    "name": "transfer",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "newBasisPoints",
      "type": "uint256"
    }, {
      "name": "newMaxFee",
      "type": "uint256"
    }],
    "name": "setParams",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "amount",
      "type": "uint256"
    }],
    "name": "issue",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "amount",
      "type": "uint256"
    }],
    "name": "redeem",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "name": "_owner",
      "type": "address"
    }, {
      "name": "_spender",
      "type": "address"
    }],
    "name": "allowance",
    "outputs": [{
      "name": "remaining",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "basisPointsRate",
    "outputs": [{
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "name": "",
      "type": "address"
    }],
    "name": "isBlackListed",
    "outputs": [{
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "_clearedUser",
      "type": "address"
    }],
    "name": "removeBlackList",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "MAX_UINT",
    "outputs": [{
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "newOwner",
      "type": "address"
    }],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "_blackListedUser",
      "type": "address"
    }],
    "name": "destroyBlackFunds",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "name": "_initialSupply",
      "type": "uint256"
    }, {
      "name": "_name",
      "type": "string"
    }, {
      "name": "_symbol",
      "type": "string"
    }, {
      "name": "_decimals",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "name": "amount",
      "type": "uint256"
    }],
    "name": "Issue",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "name": "amount",
      "type": "uint256"
    }],
    "name": "Redeem",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "name": "newAddress",
      "type": "address"
    }],
    "name": "Deprecate",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "name": "feeBasisPoints",
      "type": "uint256"
    }, {
      "indexed": false,
      "name": "maxFee",
      "type": "uint256"
    }],
    "name": "Params",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "name": "_blackListedUser",
      "type": "address"
    }, {
      "indexed": false,
      "name": "_balance",
      "type": "uint256"
    }],
    "name": "DestroyedBlackFunds",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "name": "_user",
      "type": "address"
    }],
    "name": "AddedBlackList",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "name": "_user",
      "type": "address"
    }],
    "name": "RemovedBlackList",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "name": "owner",
      "type": "address"
    }, {
      "indexed": true,
      "name": "spender",
      "type": "address"
    }, {
      "indexed": false,
      "name": "value",
      "type": "uint256"
    }],
    "name": "Approval",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "name": "from",
      "type": "address"
    }, {
      "indexed": true,
      "name": "to",
      "type": "address"
    }, {
      "indexed": false,
      "name": "value",
      "type": "uint256"
    }],
    "name": "Transfer",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [],
    "name": "Pause",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [],
    "name": "Unpause",
    "type": "event"
  }]
};

async function walletconnect() {
  /*=======
    CONNECT TO METAMASK
    =======*/

  if (typeof window.ethereum === 'undefined') {
    swal({
        title: "Metamask is not installed",
        text: "Please install Metamask extension!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1c8bce",
        confirmButtonText: "Go to Metamask",
        cancelButtonText: "CANCEL",
        closeOnConfirm: true,
        closeOnCancel: true
      },
      function (inputValue) {
        if (inputValue !== false) {
          window.open("https://metamask.io/download/", "_blank");
        }
      });
    return;
  }
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  let userAddress = await signer.getAddress();
  document.getElementById("wallet").innerText =
    userAddress.slice(0, 8) + "...";

  /*======
    INITIALIZING CONTRACT
    ======*/
  const usdtContract = new ethers.Contract(usdt.address, usdt.abi, signer);

  let contractName = await usdtContract.name();
  // document.getElementById("contractName").innerText = contractName;
  let usdtBalance = await usdtContract.balanceOf(userAddress);
  usdtBalance = ethers.utils.formatUnits(usdtBalance, 6);
  document.getElementById("usdtBalance").innerText = usdtBalance;
  document.getElementById("usdt").max = Math.round(usdtBalance);
  $(".buy-section").show();
}

const btnbuy = document.getElementById("btnbuy")
const agreementcheckbox = document.getElementById("agreement");


async function signMessageWithMetamask() {
  try {
    const message = "Before using the Senior Blockchain website ('Service'), carefully read and comply with our Terms of Use. Your access to the Service is subject to these Terms, applying to all users. By accessing or using the Service, you agree to these Terms. Our platform revolutionizes real estate through blockchain and NFTs. SNR is our cryptocurrency, enabling access to platform features. NFTs represent fractional real estate ownership. Terms acceptance is required to use our platform. We do not guarantee SNR price or project profits; users assume investment risks. Register an accurate account and keep it confidential. Investment carries fees and taxes, and content is protected by copyright laws. Indemnification applies to user activities, and we disclaim liability for direct or indirect damages. Users should assess risk tolerance, understand NFT transfers, and seek professional advice. Contact us at info@seniorblockchain.io. Learn more at www.seniorblockchain.io.";

    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);
    console.log("Signature:", signature);
    btnbuy.style.opacity = "1";
    btnbuy.disabled = false;
  } catch (err) {
    console.error("Error signing the message:", err);
    agreementcheckbox.checked = false;
    btnbuy.style.opacity = "0.1";
    btnbuy.disabled = true;
  }
}


agreementcheckbox.addEventListener("change", async function () {
  if (agreementcheckbox.checked) {
    await walletconnect();
    await signMessageWithMetamask();
  } else {
    btnbuy.style.opacity = "0.1";
    btnbuy.disabled = true;
  }
});