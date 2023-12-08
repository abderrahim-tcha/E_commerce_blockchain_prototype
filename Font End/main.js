import { TransactionReceipt, ethers, formatEther } from "./ether-6.7.esm.min.js";
import { abi, contractAddress } from "./constant.js";
const connectBtn = document.getElementById("connect");
const addItemBtn = document.getElementById("addItem");
const buy = document.getElementById("buy");
/* const getSoldItem = document.getElementById("getSoldItem"); */

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
  const itemStock = document.getElementById("itemStock").value;
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
        itemStock,
        ethers.parseEther(itemPrice)
      );;
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

        //Display public key
        const publicKeyDiv = document.createElement("div");
        publicKeyDiv.textContent = `Public Key: ${transactionResponse[i][0]}`;
        itemContainer.appendChild(publicKeyDiv);
        publicKeyDiv.style.background="#64FDDA ";
        publicKeyDiv.style.color="#161617";
        publicKeyDiv.style.margin= "10px 0";
        publicKeyDiv.style.padding= "5px";
        publicKeyDiv.style.borderRadius= "15px";

        // Display product name
        const productNameDiv = document.createElement("div");
        const paragraphe= document.createElement("p");
        paragraphe.textContent = `product name: ${transactionResponse[i][1]}`;
        productNameDiv.classList.add("info") 
        productNameDiv.appendChild(paragraphe);
        itemContainer.appendChild(productNameDiv);

        // Display product category
        const productCategoryDiv = document.createElement("div");
        productCategoryDiv.textContent = `product Category: ${transactionResponse[i][2]}`;
        productNameDiv.appendChild(productCategoryDiv);

        // Display product image
        const productImageDiv = document.createElement("div");
        const imgElement = document.createElement("img");
        imgElement.src = transactionResponse[i][3];
        imgElement.classList.add("product-image");
        productImageDiv.classList.add("cadre")
        productImageDiv.appendChild(imgElement);
        itemContainer.appendChild(productImageDiv);



        // Display product stock
        const productstockDiv = document.createElement("div");
        productstockDiv.textContent = `Stock: ${transactionResponse[i][4]}`;
        itemContainer.appendChild(productstockDiv);

        // Display product price
        const productPriceDiv = document.createElement("div");
        const priceValue = formatEther(transactionResponse[i][5]);
        productPriceDiv.textContent = `Price: ${priceValue} ETH`;
        itemContainer.appendChild(productPriceDiv);

        // Create buy button 
        const buyButton = document.createElement("div");
        buyButton.textContent = "Buy now";
        buyButton.classList.add("buy_btn")
        buyButton.addEventListener("click", async () => {
          // Call the buy function with the appropriate item details
          const testName = transactionResponse[i][1];
          const testPublicKey = transactionResponse[i][0];
          const testPrice = priceValue;
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
        });

        // Append the container for each set of items
        itemContainer.appendChild(buyButton);
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
        publicKeyDiv.style.background="#64FDDA ";
        publicKeyDiv.style.color="#161617";
        publicKeyDiv.style.margin= "10px 0";
        publicKeyDiv.style.padding= "5px";
        publicKeyDiv.style.borderRadius= "15px";

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
        const priceValue = formatEther(transactionResponse[i][5]);
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
        publicKeyDiv.style.background="#64FDDA ";
        publicKeyDiv.style.color="#161617";
        publicKeyDiv.style.margin= "10px 0";
        publicKeyDiv.style.padding= "5px";
        publicKeyDiv.style.borderRadius= "15px";

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
        const priceValue = formatEther(transactionResponse[i][5]);
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




/* getSoldItem.addEventListener("click", async function getBalance() {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const transactionResponse = await contract.getSoldItems();

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
 */



document.addEventListener("DOMContentLoaded", async function () {
  await getSoldItem();
});

async function getSoldItem() {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    try {
      const transactionResponse = await contract.getSoldItems(signer);

      // Clear previous bought items
      const soldItemsContainer = document.getElementById("soldItemsContainer");
      soldItemsContainer.innerHTML = "";

      for (let i = 0; i < transactionResponse.length; i++) {
        // Create a new container div for each set of bought items
        const soldItemContainer = document.createElement("div");
        soldItemContainer.classList.add("itemContainer");

        // Display public key
        const publicKeyDiv = document.createElement("div");
        publicKeyDiv.textContent = `buyer: ${transactionResponse[i][0]}`;
        soldItemContainer.appendChild(publicKeyDiv);
        publicKeyDiv.style.background="#64FDDA ";
        publicKeyDiv.style.color="#161617";
        publicKeyDiv.style.margin= "10px 0";
        publicKeyDiv.style.padding= "5px";
        publicKeyDiv.style.borderRadius= "15px";



        // Display product name
        const productNameDiv = document.createElement("div");
        productNameDiv.textContent = `Product Name: ${transactionResponse[i][2]}`;
        soldItemContainer.appendChild(productNameDiv);

        // Display product category
        const productCategoryDiv = document.createElement("div");
        productCategoryDiv.textContent = `Product Category: ${transactionResponse[i][3]}`;
        soldItemContainer.appendChild(productCategoryDiv);

        // Display product image
        const productImageDiv = document.createElement("div");
        const imgElement = document.createElement("img");
        imgElement.src = transactionResponse[i][4];
        imgElement.alt = "Product Image";
        imgElement.classList.add("product-image");
        productImageDiv.appendChild(imgElement);
        soldItemContainer.appendChild(productImageDiv);


        // Display product price
        const productPriceDiv = document.createElement("div");
        const priceValue = formatEther(transactionResponse[i][6]);
        productPriceDiv.textContent = `Product Price: ${priceValue} ETH`;
        soldItemContainer.appendChild(productPriceDiv);

        // Append the container for each set of items

        // Append the container for each set of bought items
        soldItemsContainer.appendChild(soldItemContainer);
      }
    } catch (error) {
      console.log(error);
    }
  }
}









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