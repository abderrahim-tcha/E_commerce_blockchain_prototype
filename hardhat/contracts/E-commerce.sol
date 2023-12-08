// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "hardhat/console.sol";

contract E_commerce {
    address public owner;

    struct Item {
        address deployerAddress;
        string name;
        string category;
        string image;
        uint256 stock;
        uint256 cost;
    }

    struct saleItem {
        address buyer;
        address deployerAddress;
        string name;
        string category;
        string image;
        uint256 stock;
        uint256 cost;
    }

    Item[] public allItems;
    mapping(string => Item) public items;
    mapping(address => Item[]) private userItems;
    mapping(address => saleItem[]) private soldItems;
    mapping(address => Item[]) private broughtItems;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function list(
        string memory _name,
        string memory _category,
        string memory _image,
        uint256 _stock,
        uint256 _cost
    ) public {
        // Create Item
        Item memory item = Item(
            msg.sender,
            _name,
            _category,
            _image,
            _stock,
            _cost
        );

        // Add Item to mapping
        allItems.push(item);
        userItems[msg.sender].push(item);
        items[_name] = item;
    }

    function getUserItemList(address user) public view returns (Item[] memory) {
        return userItems[user];
    }

    function getUserbroughtItems(
        address user
    ) public view returns (Item[] memory) {
        return broughtItems[user];
    }

    function getAllItems() public view returns (Item[] memory) {
        return allItems;
    }

    function getSoldItems() public view returns (saleItem[] memory) {
        return soldItems[msg.sender];
    }

    function buy(string memory name, address reciverAdress) public payable {
        require(
            items[name].deployerAddress == reciverAdress,
            "Item with the given name does not exist"
        );
        require(items[name].cost == msg.value, "missing some eth");
        require(items[name].stock > 0, "Item out of stock");
        (bool callSeccess, ) = payable(reciverAdress).call{value: msg.value}(
            ""
        );
        require(callSeccess, "Call Failed");
        items[name].stock -= 1;

        for (uint256 i = 0; i < allItems.length; i++) {
            if (keccak256(bytes(allItems[i].name)) == keccak256(bytes(name))) {
                allItems[i].stock -= 1;
                if (allItems[i].stock == 0) {
                    for (uint256 j = i; j < allItems.length - 1; j++) {
                        allItems[j] = allItems[j + 1];
                    }
                    allItems.pop();
                }
            }
        }

        for (uint256 i = 0; i < userItems[reciverAdress].length; i++) {
            if (
                keccak256(bytes(userItems[reciverAdress][i].name)) ==
                keccak256(bytes(name))
            ) {
                userItems[reciverAdress][i].stock -= 1;
                if (userItems[reciverAdress][i].stock == 0) {
                    for (
                        uint256 j = i;
                        j < userItems[reciverAdress].length - 1;
                        j++
                    ) {
                        userItems[reciverAdress][j] = userItems[reciverAdress][
                            j + 1
                        ];
                    }
                    userItems[reciverAdress].pop();
                }
            }
        }

        saleItem memory newItem = saleItem({
            buyer: msg.sender,
            deployerAddress: reciverAdress,
            name: name,
            category: items[name].category,
            image: items[name].image,
            stock: items[name].stock,
            cost: items[name].cost
        });

        soldItems[reciverAdress].push(newItem);
        broughtItems[msg.sender].push(items[name]);

        if (items[name].stock == 0) {
            delete items[name];
        }
    }
}
