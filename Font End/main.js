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

              let newval = formatEther(transactionResponse[i][4]);

              for (let j = 0; j < transactionResponse[i].length; j++) {
                const itemDiv = document.createElement("div");
                itemDiv.classList.add("item");
            
                if (j == 3) { // Assuming index 2 corresponds to itemImageUrl in your transactionResponse
                    const imgElement = document.createElement("img");
                    imgElement.src = transactionResponse[i][j];
                    imgElement.alt = "Product Image"; // You can set an alt attribute for accessibility
                    imgElement.classList.add("product-image");
            
                    // Append the img element to the item div
                    itemDiv.appendChild(imgElement);
                } else if (j === 4) {
                    itemDiv.textContent = newval;
                } else {
                    itemDiv.textContent = transactionResponse[i][j];
                }
            
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
};







document.addEventListener("DOMContentLoaded", async function () {
  await getMyItems();
});

// Inside the getMyItemsBtn event listener
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
        myItemContainer.classList.add("itemContainer"); // Add a class for styling, adjust in your CSS

        let newval = formatEther(transactionResponse[i][4]);

        for (let j = 0; j < transactionResponse[i].length; j++) {
          const itemDiv = document.createElement("div");
          itemDiv.classList.add("item");
      
          if (j == 3) { // Assuming index 2 corresponds to itemImageUrl in your transactionResponse
              const imgElement = document.createElement("img");
              imgElement.src = transactionResponse[i][j];
              imgElement.alt = "Product Image"; // You can set an alt attribute for accessibility
              imgElement.classList.add("product-image");
      
              // Append the img element to the item div
              itemDiv.appendChild(imgElement);}}

        for (let j = 0; j < transactionResponse[i].length; j++) {
          // Create a new div for each item
          const myItemDiv = document.createElement("div");
          myItemDiv.classList.add("item"); // Add a class for styling, adjust in your CSS

          if (j == 4) {
            myItemDiv.textContent = newval;
          } else {
            // Display item information
            myItemDiv.textContent = transactionResponse[i][j];
          }

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
          boughtItemDiv.classList.add("item"); // Add a class for styling, adjust in your CSS

          for (let j = 0; j < transactionResponse[i].length; j++) {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("item");
        
            if (j == 3) { // Assuming index 2 corresponds to itemImageUrl in your transactionResponse
                const imgElement = document.createElement("img");
                imgElement.src = transactionResponse[i][j];
                imgElement.alt = "Product Image"; // You can set an alt attribute for accessibility
                imgElement.classList.add("product-image");
        
                // Append the img element to the item div
                itemDiv.appendChild(imgElement);}}

          if (j === 4) {
            boughtItemDiv.textContent = "newval"; // Assuming newval is a string, replace with the correct value
          } else {
            // Display item information
            boughtItemDiv.textContent = transactionResponse[i][j];
          }

          // Append the item div to the container
          boughtItemContainer.appendChild(boughtItemDiv);
        }

        // Append the container for each set of bought items
        boughtItemsContainer.appendChild(boughtItemContainer);
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