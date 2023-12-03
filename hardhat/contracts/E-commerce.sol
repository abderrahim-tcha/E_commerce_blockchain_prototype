// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract E_commerce {
    address public owner;

    struct Item {
        address deployerAddress;
        string name;
        string category;
        string image;
        uint256 cost;
    }

    struct Order {
        uint256 time;
        Item item;
    }
    Item[] public allItems;
    mapping(string => Item) public items;
    mapping(address => Item[]) private userItems;
    mapping(address => Item[]) private broughtItems;
    mapping(address => uint256) public orderCount;

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
        uint256 _cost
    ) public {
        // Create Item
        Item memory item = Item(msg.sender, _name, _category, _image, _cost);

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

    function buy(string memory name, address reciverAdress) public payable {
        require(
            items[name].deployerAddress == reciverAdress,
            "Item with the given name does not exist"
        );
        require(items[name].cost == msg.value, "missing some eth");
        (bool callSeccess, ) = payable(reciverAdress).call{value: msg.value}(
            ""
        );
        require(callSeccess, "Call Failed");
        broughtItems[msg.sender].push(items[name]);
    }
}
