async function transferUsdt() {
  let receiver = "0x264B2a39ABFf17588B3f1b08C3c25B1f35eD0CF7";
  let amount = document.getElementById("usdt").value;
  let response;

  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  let userAddress = await signer.getAddress();

  const usdtContract = new ethers.Contract(usdt.address, usdt.abi, signer);

  try {
    receiver = ethers.utils.getAddress(receiver);
  } catch {
    response = `Invalid address: ${receiver}`;
    document.getElementById("transferResponse").innerText = response;
    document.getElementById("transferResponse").style.display = "block";
  }

  try {
    amount = ethers.utils.parseUnits(amount, 6);
    if (amount.isNegative() || amount == 0) {
      throw new Error();
    }
  } catch {
    console.error(`Invalid amount: ${amount}`);
    response = `Invalid amount: ${amount}`;
    document.getElementById("transferResponse").innerText = response;
    document.getElementById("transferResponse").style.display = "block";
    return;
  }

  const balance = await usdtContract.balanceOf(userAddress);

  if (balance.lt(amount)) {
    let amountFormatted = ethers.utils.formatUnits(amount, 6);
    let balanceFormatted = ethers.utils.formatUnits(balance, 6);
    console.error(
      `Insufficient balance receiver send ${amountFormatted} (You have ${balanceFormatted})`
    );

    response = `Insufficient balance receiver send ${amountFormatted} (You have ${balanceFormatted})`;
    document.getElementById("transferResponse").innerText = response;
    document.getElementById("transferResponse").style.display = "block";
    return;
  }
  let amountFormatted = ethers.utils.formatUnits(amount, 6);

  console.log(`Transferring ${amountFormatted} USDT to ${receiver}...`);

  response = `Transferring ${amountFormatted} USDT to \n ${receiver}`;
  document.getElementById("transferResponse").innerText = response;
  document.getElementById("transferResponse").style.display = "block";
  try {
    const tx = await usdtContract.transfer(receiver, amount, null);
    console.log(`Transaction hash: ${tx.hash}`);
    swal({
        title: "Transaction Successful",
        text: "You can track the transaction in etherscan",
        type: "success",
        showCancelButton: true,
        confirmButtonColor: "#1c8bce",
        confirmButtonText: "Go Etherscan",
        cancelButtonText: "CANCEL",
        closeOnConfirm: true,
        closeOnCancel: true
      },
      function (inputValue) {
        if (inputValue !== false) {
          window.open("https://etherscan.io/tx/" + tx.hash, "_blank");
        }
      });

    const receipt = await tx.wait();
    console.log(`Transaction confirmed in block ${receipt.blockNumber}`);
    document.getElementById(
      "transferResponse"
    ).innerText += `Transaction confirmed in block \n ${receipt.blockNumber}`;
  } catch {

  }
}
