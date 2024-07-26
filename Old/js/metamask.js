const tokenAddress = "0x469a1e910faa202470238ea9d614ae16c3e8b0ee";
const tokenSymbol = "Senior";
const tokenDecimals = 18;
const tokenImage = "https://seniorblockchain.io/images/logo.svg";

async function addTokenFunction() {
    try {
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
        const wasAdded = await ethereum.request({
            method: "wallet_watchAsset",
            params: {
                type: "ERC20",
                options: {
                    address: tokenAddress,
                    symbol: tokenSymbol,
                    decimals: tokenDecimals,
                    image: tokenImage
                }
            }
        });

        if (wasAdded) {
            console.log("Thanks for your interest!");
        } else {
            console.log("Senior has not been added");
        }
    } catch (error) {
        console.log(error);
    }
}