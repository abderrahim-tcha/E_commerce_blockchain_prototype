import { TransactionReceipt, ethers } from "./ether-6.7.esm.min.js";
import { abi, contractAddress } from "./constant.js";
const connectBtn = document.getElementById("connect");
const addItemBtn = document.getElementById("addItem");
const getAllItemsBtn = document.getElementById("getAllItems");
const getMyItemsBtn = document.getElementById("getMyItems");
const buy = document.getElementById("buy");
const getBroughtItemsBtn = document.getElementById("getBroughtItems");

connectBtn.addEventListener("click", async function () {
  if (window.ethereum) {
    await ethereum.request({ method: "eth_requestAccounts" });
    connectBtn.innerHTML = "Connected!!";
  } else {
    connectBtn.innerHTML = "Install MetaMask";
  }
});

addItemBtn.addEventListener("click", async function insertItem() {
  const itemName = document.getElementById("itemName").value;
  const itemCategory = document.getElementById("itemCategory").value;
  const itemImageUrl = document.getElementById("itemImageUrl").value;
  const itemPrice = document.getElementById("itemPrice").value;

  console.log("item name " + itemName + " with price: " + itemPrice);

  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const transactionResponse = await contract.list(
        itemName,
        itemCategory,
        itemImageUrl,
        ethers.parseEther(itemPrice)
      );
      await transactionResponse.wait(1);

      await listenForTransactionMine(transactionResponse, provider);
      console.log("Done");
    } catch (error) {
      console.log(error);
    }
  }
});

getMyItemsBtn.addEventListener("click", async function getBalance() {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const transactionResponse = await contract.getUserItemList(signer);
      for (let i = 0; i < transactionResponse.length; i++) {
        for (let j = 0; j < transactionResponse[i].length; j++) {
          console.log(transactionResponse[i][j]);
        }
        console.log("---------------------item end-----------------------");
      }
    } catch (error) {
      console.log(error);
    }
  }
});

getAllItemsBtn.addEventListener("click", async function getBalance() {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const transactionResponse = await contract.getAllItems();

      for (let i = 0; i < transactionResponse.length; i++) {
        for (let j = 0; j < transactionResponse[i].length; j++) {
          console.log(transactionResponse[i][j]);
        }
        console.log("---------------------item end-----------------------");
      }
    } catch (error) {
      console.log(error);
    }
  }
});

buy.addEventListener("click", async function insertItem() {
  const testName = document.getElementById("testName").value;
  const testPublicKey = document.getElementById("testPublicKey").value;
  const testPrice = document.getElementById("testPrice").value;

  console.log("buying item name " + testName + " with price: " + testPublicKey);

  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const transactionResponse = await contract.buy(testName, testPublicKey, {
        value: ethers.parseEther(testPrice),
      });
      await transactionResponse.wait(1);

      await listenForTransactionMine(transactionResponse, provider);
      console.log("Done");
    } catch (error) {
      console.log(error);
    }
  }
});

getBroughtItemsBtn.addEventListener("click", async function getBalance() {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const transactionResponse = await contract.getUserbroughtItems(signer);

      for (let i = 0; i < transactionResponse.length; i++) {
        for (let j = 0; j < transactionResponse[i].length; j++) {
          console.log(transactionResponse[i][j]);
        }
        console.log("---------------------item end-----------------------");
      }
    } catch (error) {
      console.log(error);
    }
  }
});

function listenForTransactionMine(transactionResponse, provider) {
  console.log("------------MINING: " + transactionResponse.hash);
  return new Promise((resolve, reject) => {
    provider.once(transactionResponse.hash, async (transactionReceipt) => {
      let confirmation = await transactionReceipt.confirmations();
      console.log("completed with " + confirmation + " confirmations");
      resolve();
    });
  });
}
