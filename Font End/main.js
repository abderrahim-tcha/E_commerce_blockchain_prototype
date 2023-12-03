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

// Inside the getAllItemsBtn event listener
getAllItemsBtn.addEventListener("click", async function getAllItems() {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    try {
      const transactionResponse = await contract.getAllItems(signer);

      // Clear previous items
      const itemsContainer = document.getElementById("itemsContainer");
      itemsContainer.innerHTML = "";

      for (let i = 0; i < transactionResponse.length; i++) {
        // Create a new container div for each set of items
        const itemContainer = document.createElement("div");
        itemContainer.classList.add("itemContainer"); // Add a class for styling, adjust in your CSS

        for (let j = 0; j < transactionResponse[i].length; j++) {
          // Create a new div for each item
          const itemDiv = document.createElement("div");
          itemDiv.classList.add("item"); // Add a class for styling, adjust in your CSS

          // Display item information
          itemDiv.textContent = transactionResponse[i][j];

          // Append the item div to the container
          itemContainer.appendChild(itemDiv);
        }

        // Append the container for each set of items
        itemsContainer.appendChild(itemContainer);
      }
    } catch (error) {
      console.log(error);
    }
  }
});

// Inside the getMyItemsBtn event listener
getMyItemsBtn.addEventListener("click", async function () {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    try {
      const transactionResponse = await contract.getUserItemList(signer);

      // Clear previous items
      const myItemsContainer = document.getElementById("userItemsContainer");
      myItemsContainer.innerHTML = "";

      for (let i = 0; i < transactionResponse.length; i++) {
        // Create a new container div for each set of items
        const myItemContainer = document.createElement("div");
        myItemContainer.classList.add("itemContainer"); // Add a class for styling, adjust in your CSS

        for (let j = 0; j < transactionResponse[i].length; j++) {
          // Create a new div for each item
          const myItemDiv = document.createElement("div");
          myItemDiv.classList.add("item"); // Add a class for styling, adjust in your CSS

          // Display item information
          myItemDiv.textContent = transactionResponse[i][j];

          // Append the item div to the container
          myItemContainer.appendChild(myItemDiv);
        }

        // Append the container for each set of items
        myItemsContainer.appendChild(myItemContainer);
      }
    } catch (error) {
      console.log(error);
    }
  }
});

// Inside the getBroughtItemsBtn event listener
getBroughtItemsBtn.addEventListener("click", async function getBoughtItems() {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    try {
      const transactionResponse = await contract.getUserbroughtItems(signer);

      // Clear previous bought items
      const boughtItemsContainer = document.getElementById(
        "boughtItemsContainer"
      );
      boughtItemsContainer.innerHTML = "";

      for (let i = 0; i < transactionResponse.length; i++) {
        // Create a new container div for each set of bought items
        const boughtItemContainer = document.createElement("div");
        boughtItemContainer.classList.add("itemContainer"); // Add a class for styling, adjust in your CSS

        for (let j = 0; j < transactionResponse[i].length; j++) {
          // Create a new div for each bought item
          const boughtItemDiv = document.createElement("div");
          boughtItemDiv.classList.add("bought-item"); // Add a class for styling, adjust in your CSS

          // Display bought item information
          boughtItemDiv.textContent = transactionResponse[i][j];

          // Append the bought item div to the container
          boughtItemContainer.appendChild(boughtItemDiv);
        }

        // Append the container for each set of bought items
        boughtItemsContainer.appendChild(boughtItemContainer);
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
