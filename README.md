# Blockchain Supply Chain Solution

This project aims to create a secure and transparent supply chain solution for the coffee industry using the Ethereum (Sepolia) blockchain. The solution allows tracking of coffee products from the farmer to the end consumer, ensuring product quality and fair trade practices. To visualize the functioning of our solution, we've created Unified Modeling Language (UML) diagrams, that can be found in the 'images' folder.

The solution is built using Solidity (version 0.8.1), along with the Web3.js library (version v1.8.2) to interact with the Ethereum (Sepolia) blockchain. Its structure and flow have been depicted using UML diagrams. The contract has been deployed to the Ethereum (Sepolia) network and can be interacted with at the contract address: `0xF153e41a5ac170C4437749EB4804BD9D6bEbbB64`.

The development environment for this project consists of Truffle v5.7.7 (core: 5.7.7) and Node v16.9.1 which have been used for compiling and migrating the smart contracts as well as running tests and interact with the deployed contracts.

![Activity Diagram](images/Diagram-Activity.png)
*Activity Diagram: shows the transitions and decisions in the process.*

![Sequence Diagram](images/Diagram-Sequence.png)
*Sequence Diagram: helps to visualize how processes operate with one another and in what order.*

![State Diagram](images/Diagram-State.png)
*State Diagram: demonstrates the behavior of an object, which can be in multiple states, throughout its life cycle.*

![Class Diagram](images/Diagram-Class%20(Data).png)
*Class Diagram: displays the system's static structure, providing a clear picture of the interacting entities within it.*

## Project Files
The solution is divided into the following files:

- **SupplyChain.sol**: This file contains the main contract that combines all other components and defines the logic for tracking coffee products. It manages the different stages of the supply chain, from harvesting to purchase by the consumer.
- **Ownable.sol**: This file contains functions that establish the contract owner and provide functionality for transferring ownership. It ensures that only the owner can perform certain privileged operations, such as adding new roles.
- **ConsumerRole.sol**: This file contains functions that manage the consumer role, defining access control for consumers in the supply chain.
- **RetailerRole.sol**: This file contains functions that manage the retailer role, defining access control for retailers in the supply chain.
- **DistributorRole.sol**: This file contains functions that manage the distributor role, defining access control for distributors in the supply chain.

Web3.js (version v1.8.2) has been instrumental in enabling the solution to interact with the Ethereum (Sepolia) blockchain. This library allows our application to send transactions, interact with smart contracts, and access blockchain data directly from JavaScript.

jQuery has been used to simplify the DOM manipulation, event handling, and AJAX interactions in the frontend part of the project. This enables a seamless and interactive user experience, allowing users to track the supply chain process in real-time.

Truffle Contract has been used to simplify working with smart contracts. It provides a more convenient and flexible way to interact with our contracts, including automatic contract abstractions, function return value decoding, and transaction simulating calls. The Truffle version used in this project is v5.7.7 (core: 5.7.7).

## Smart Contract Details

In the SupplyChain.sol file, the contract imports all necessary components and inherits from Ownable, ConsumerRole, RetailerRole, FarmerRole, and DistributorRole contracts. The contract defines an Item struct that stores all relevant information about a coffee product, such as SKU, UPC, ownerID, originFarm, productNotes, and other information.

The contract uses an enum called 'State' to represent the different stages of the supply chain: Harvested, Processed, Packed, ForSale, Sold, Shipped, Received, and Purchased. The transitions between these stages are visually represented in the State Diagram (images/Diagram-State.png). It also defines a mapping called 'items' to store items by their UPC and a mapping called 'itemsHistory' to store the history of each item through the supply chain.

The contract provides functions for each stage of the supply chain, such as `harvestItem()`, `processItem()`, `packItem()`, `sellItem()`, `buyItem()`, `shipItem()`, `receiveItem()`, and `purchaseItem()`. Each function is protected by a combination of access control (role-based) and stage-based modifiers to ensure that only the appropriate role can call the function and that the item is in the correct stage of the supply chain.

To ensure product quality, the solution uses events to track the progress of each item through the supply chain. Events like Harvested, Processed, Packed, ForSale, Sold, Shipped, Received, and Purchased are emitted when the corresponding stage change occurs. This allows for real-time updates and transparency in the supply chain process.

The contract also provides utility functions `fetchItemBufferOne()` and `fetchItemBufferTwo()` to retrieve item information and state by their UPC, allowing easy access to product information and verification for all participants in the supply chain.

## Conclusion

In conclusion, this blockchain-based supply chain solution provides a secure, transparent, and efficient method for tracking coffee products from the farmer to the end consumer. By leveraging the Ethereum (Sepolia) blockchain and smart contracts, alongside Web3.js, jQuery, and Truffle Contract libraries, it ensures product quality, fair trade practices, and accountability for all participants in the supply chain. The contract is deployed at the Ethereum (Sepolia) address `0xF153e41a5ac170C4437749EB4804BD9D6bEbbB64`, which enables users to interact with it directly on the Ethereum (Sepolia) network.
