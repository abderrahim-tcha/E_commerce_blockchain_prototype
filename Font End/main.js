import { TransactionReceipt, ethers, formatEther } from "./ether-6.7.esm.min.js";
import { abi, contractAddress } from "./constant.js";
const connectBtn = document.getElementById("connect");
const addItemBtn = document.getElementById("addItem");
const buy = document.getElementById("buy");

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







document.addEventListener("DOMContentLoaded", async function () {
  await getAllItems();
});

async function getAllItems() {
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
        itemContainer.classList.add("itemContainer");

        // Display public key
        const publicKeyDiv = document.createElement("div");
        publicKeyDiv.textContent = `Public Key: ${transactionResponse[i][0]}`;
        itemContainer.appendChild(publicKeyDiv);

        // Display product name
        const productNameDiv = document.createElement("div");
        productNameDiv.textContent = `Product Name: ${transactionResponse[i][1]}`;
        itemContainer.appendChild(productNameDiv);

        // Display product category
        const productCategoryDiv = document.createElement("div");
        productCategoryDiv.textContent = `Product Category: ${transactionResponse[i][2]}`;
        itemContainer.appendChild(productCategoryDiv);

        // Display product image
        const productImageDiv = document.createElement("div");
        const imgElement = document.createElement("img");
        imgElement.src = transactionResponse[i][3];
        imgElement.classList.add("product-image");
        productImageDiv.appendChild(imgElement);
        itemContainer.appendChild(productImageDiv);

        // Display product price
        const productPriceDiv = document.createElement("div");
        const priceValue = formatEther(transactionResponse[i][4]);
        productPriceDiv.textContent = `Price: ${priceValue} ETH`;
        itemContainer.appendChild(productPriceDiv);

        // Append the container for each set of items
        itemsContainer.appendChild(itemContainer);
      }
    } catch (error) {
      console.log(error);
    }
  }
}







document.addEventListener("DOMContentLoaded", async function () {
  await getMyItems();
});

async function getMyItems() {
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
        myItemContainer.classList.add("itemContainer");

        // Display public key
        const publicKeyDiv = document.createElement("div");
        publicKeyDiv.textContent = `Public Key: ${transactionResponse[i][0]}`;
        myItemContainer.appendChild(publicKeyDiv);

        // Display product name
        const productNameDiv = document.createElement("div");
        productNameDiv.textContent = `Product Name: ${transactionResponse[i][1]}`;
        myItemContainer.appendChild(productNameDiv);

        // Display product category
        const productCategoryDiv = document.createElement("div");
        productCategoryDiv.textContent = `Product Category: ${transactionResponse[i][2]}`;
        myItemContainer.appendChild(productCategoryDiv);

        // Display product image
        const productImageDiv = document.createElement("div");
        const imgElement = document.createElement("img");
        imgElement.src = transactionResponse[i][3];
        imgElement.alt = "Product Image";
        imgElement.classList.add("product-image");
        productImageDiv.appendChild(imgElement);
        myItemContainer.appendChild(productImageDiv);

        // Display product price
        const productPriceDiv = document.createElement("div");
        const priceValue = formatEther(transactionResponse[i][4]);
        productPriceDiv.textContent = `Product Price: ${priceValue} ETH`;
        myItemContainer.appendChild(productPriceDiv);

        // Append the container for each set of items
        myItemsContainer.appendChild(myItemContainer);
      }
    } catch (error) {
      console.log(error);
    }
  }
}






document.addEventListener("DOMContentLoaded", async function () {
  await getBoughtItems();
});

async function getBoughtItems() {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    try {
      const transactionResponse = await contract.getUserbroughtItems(signer);

      // Clear previous bought items
      const BoughtItemsContainer = document.getElementById("boughtItemsContainer");
      BoughtItemsContainer.innerHTML = "";

      for (let i = 0; i < transactionResponse.length; i++) {
        // Create a new container div for each set of bought items
        const BoughtItemContainer = document.createElement("div");
        BoughtItemContainer.classList.add("itemContainer");

        // Display public key
        const publicKeyDiv = document.createElement("div");
        publicKeyDiv.textContent = `Public Key: ${transactionResponse[i][0]}`;
        BoughtItemContainer.appendChild(publicKeyDiv);

        // Display product name
        const productNameDiv = document.createElement("div");
        productNameDiv.textContent = `Product Name: ${transactionResponse[i][1]}`;
        BoughtItemContainer.appendChild(productNameDiv);

        // Display product category
        const productCategoryDiv = document.createElement("div");
        productCategoryDiv.textContent = `Product Category: ${transactionResponse[i][2]}`;
        BoughtItemContainer.appendChild(productCategoryDiv);

        // Display product image
        const productImageDiv = document.createElement("div");
        const imgElement = document.createElement("img");
        imgElement.src = transactionResponse[i][3];
        imgElement.alt = "Product Image";
        imgElement.classList.add("product-image");
        productImageDiv.appendChild(imgElement);
        BoughtItemContainer.appendChild(productImageDiv);

        // Display product price
        const productPriceDiv = document.createElement("div");
        const priceValue = formatEther(transactionResponse[i][4]);
        productPriceDiv.textContent = `Product Price: ${priceValue} ETH`;
        BoughtItemContainer.appendChild(productPriceDiv);

        // Append the container for each set of items

        // Append the container for each set of bought items
        BoughtItemsContainer.appendChild(BoughtItemContainer);
      }
    } catch (error) {
      console.log(error);
    }
  }
}







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