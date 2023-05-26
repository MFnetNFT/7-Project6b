App = {
    web3Provider: null,
    contracts: {},
    emptyAddress: "0x0000000000000000000000000000000000000000",
    sku: 0,
    upc: 0,
    metamaskAccountID: "0x0000000000000000000000000000000000000000",
    ownerID: "0x0000000000000000000000000000000000000000",
    originFarmerID: "0x0000000000000000000000000000000000000000",
    originFarmName: null,
    originFarmInformation: null,
    originFarmLatitude: null,
    originFarmLongitude: null,
    productNotes: null,
    productPrice: 0,
    distributorID: "0x0000000000000000000000000000000000000000",
    retailerID: "0x0000000000000000000000000000000000000000",
    consumerID: "0x0000000000000000000000000000000000000000",

    init: async function () {
        try {
            App.readForm();
            // Setup access to blockchain
            return await App.initWeb3();
        } catch (error) {
            console.error('Error in App.init: ', error);
        }
    },

    readForm: function () {
        App.sku = $("#sku").val();
        App.upc = $("#upc").val();
        App.ownerID = $("#ownerID").val();
        App.originFarmerID = $("#originFarmerID").val();
        App.originFarmName = $("#originFarmName").val();
        App.originFarmInformation = $("#originFarmInformation").val();
        App.originFarmLatitude = $("#originFarmLatitude").val();
        App.originFarmLongitude = $("#originFarmLongitude").val();
        App.productNotes = $("#productNotes").val();
        App.productPrice = $("#productPrice").val();
        App.distributorID = $("#distributorID").val();
        App.retailerID = $("#retailerID").val();
        App.consumerID = $("#consumerID").val();

        console.log(
            App.sku,
            App.upc,
            App.ownerID, 
            App.originFarmerID, 
            App.originFarmName, 
            App.originFarmInformation, 
            App.originFarmLatitude, 
            App.originFarmLongitude, 
            App.productNotes, 
            App.productPrice, 
            App.distributorID, 
            App.retailerID, 
            App.consumerID
        );
    },

    initWeb3: async function () {
        try {
            // Find or Inject Web3 Provider
            // Modern dapp browsers...
            if (window.ethereum) {
                App.web3Provider = window.ethereum;
                try {
                    // Request account access
                    // ??? await window.ethereum.enable();
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                } catch (error) {
                    // User denied account access...
                    console.error("User denied account access")
                }
            }
            // Legacy dapp browsers...
            else if (window.web3) {
                App.web3Provider = window.web3.currentProvider;
            }
            // If no injected web3 instance is detected, fall back to Ganache
            else {
                App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
            }

            await App.getMetamaskAccountID();
            
            return await App.initSupplyChain();
        } catch (error) {
            console.error('Error in App.initWeb3: ', error);
        }
    },

    getMetamaskAccountID: async function () {
        try {
            web3 = new Web3(App.web3Provider);
            // Retrieving accounts
            const accounts = await web3.eth.getAccounts();
            App.metamaskAccountID = accounts[0];
            console.log("App.metamaskAccountID", App.metamaskAccountID); // ???
            return accounts[0];
        } catch (err) {
            console.log('Error in App.getMetamaskAccountID: ', err);
        }
    },
    
    initSupplyChain: async function () {
        try {
            console.log("###initSupplyChain"); // ???
            // Source the truffle compiled smart contracts
            var jsonSupplyChain='../../build/contracts/SupplyChain.json';
            // JSONfy the smart contracts
            const data = await Promise.resolve($.getJSON(jsonSupplyChain));
            console.log('data',data);
            var SupplyChainArtifact = data;
            App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact);
            App.contracts.SupplyChain.setProvider(App.web3Provider);
            // Get the contract instance
            App.instance = await App.contracts.SupplyChain.deployed();
            console.log(">>>Contract App.instance:", App.instance); // ???
            console.log(">>>Contract App.instance.address:", App.instance.address); // ???

            await App.fetchItemBufferOne();
            await App.fetchItemBufferTwo();

            await App.fetchEvents();
            await App.initRoles(); 

            return App.bindEvents();
        } catch (error) {
            console.error('Error in App.initSupplyChain: ', error);
        }
    },

    bindEvents: function() {
        $(document).on('click', App.handleButtonClick);
    },

    handleButtonClick: async function(event) {
        event.preventDefault();

        await App.getMetamaskAccountID();

        var processId = parseInt($(event.target).data('id'));
        console.log('processId',processId);

        switch(processId) {
            case 1:
                return await App.harvestItem();
                break;
            case 2:
                return await App.processItem();
                break;
            case 3:
                return await App.packItem();
                break;
            case 4:
                return await App.sellItem();
                break;
            case 5:
                return await App.buyItem();
                break;
            case 6:
                return await App.shipItem();
                break;
            case 7:
                return await App.receiveItem();
                break;
            case 8:
                return await App.purchaseItem();
                break;
            case 9:
                return await App.fetchItemBufferOne();
                break;
            case 10:
                return await App.fetchItemBufferTwo();
                break;
            }
    },

    harvestItem: async function() {
        try {
            console.log(">>>harvestItem"); // ???
            const instance = App.instance;
            const result = await instance.harvestItem(
                App.upc, 
                App.metamaskAccountID, 
                App.originFarmName, 
                App.originFarmInformation, 
                App.originFarmLatitude, 
                App.originFarmLongitude, 
                App.productNotes,
                {from: App.metamaskAccountID}
            );
            $("#ftc-item").text(result);
            console.log('harvestItem',result);
        } catch (error) {
            console.error('Error in App.harvestItem: ', error);
        }
    },

    processItem: async function () {
        try {
            console.log(">>>processItem"); // ???
            const instance = App.instance;
            const result = await instance.processItem(
                App.upc, 
                {from: App.metamaskAccountID}
            );
            $("#ftc-item").text(result);
            console.log('processItem',result);
        } catch (error) {
            console.error('Error in App.processItem: ', error);
        }
    },
    
    packItem: async function () {
        try {
            console.log(">>>packItem"); // ???
            const instance = App.instance;
            const result = await instance.packItem(
                App.upc, 
                {from: App.metamaskAccountID}
            );
            $("#ftc-item").text(result);
            console.log('packItem',result);
        } catch (error) {
            console.error('Error in App.packItem: ', error);
        }
    },

    sellItem: async function () {
        try {
            console.log(">>>sellItem"); // ???
            const instance = App.instance;
            const priceInWei = web3.utils.toWei(App.productPrice.toString(), "ether");
            const result = await instance.sellItem(
                App.upc,
                // ??? App.productPrice,
                priceInWei, 
                {from: App.metamaskAccountID}
            );
            $("#ftc-item").text(result);
            console.log('sellItem',result);
        } catch (error) {
            console.error('Error in App.sellItem: ', error);
        }
    },

    buyItem: async function () {
        try {
            console.log(">>>buyItem"); // ???
            const instance = App.instance;
            const priceInWei = web3.utils.toWei(App.productPrice.toString(), "ether"); // convert product price to wei
            // ??? const productPrice = web3.utils.toWei(App.productPrice, "ether"); // convert product price to wei
            const result = await instance.buyItem(
                App.upc, 
                {from: App.metamaskAccountID, value: priceInWei} // add value to transaction
            );
            $("#ftc-item").text(result);
            console.log('buyItem',result);
        } catch (error) {
            console.error('Error in App.buyItem: ', error);
        }
    },

    shipItem: async function () {
        try {
            console.log(">>>shipItem"); // ???
            const instance = App.instance;
            const result = await instance.shipItem(
                App.upc, 
                {from: App.metamaskAccountID}
            );
            $("#ftc-item").text(result);
            console.log('shipItem',result);
        } catch (error) {
            console.error('Error in App.shipItem: ', error);
        }
    },

    receiveItem: async function () {
        try {
            console.log(">>>receiveItem"); // ???
            const instance = App.instance;
            const result = await instance.receiveItem(
                App.upc, 
                {from: App.metamaskAccountID}
            );
            $("#ftc-item").text(result);
            console.log('receiveItem',result);
        } catch (error) {
            console.error('Error in App.receiveItem: ', error);
        }
    },

    purchaseItem: async function () {
        try {
            console.log(">>>purchaseItem"); // ???
            const instance = App.instance;
            const result = await instance.purchaseItem(
                App.upc, 
                {from: App.metamaskAccountID}
            );
            $("#ftc-item").text(result);
            console.log('purchaseItem',result);
        } catch (error) {
            console.error('Error in App.purchaseItem: ', error);
        }
    },

    fetchItemBufferOne: async function () {
        console.log(">>>fetchItemBufferOne"); // ???
        App.upc = $('#upc').val();
        console.log('upc',App.upc);
        try {
            const instance = App.instance;
            const result = await instance.fetchItemBufferOne(
                App.upc, 
                {from: App.metamaskAccountID}
            );
            $("#ftc-item").text(result);
            console.log('fetchItemBufferOne',result);
        } catch(err) {
            console.log(err.message);
        }
    },

    fetchItemBufferTwo: async function () {
        console.log(">>>fetchItemBufferTwo"); // ???
        App.upc = $('#upc').val();
        console.log('upc',App.upc);
        try {
            const instance = App.instance;
            const result = await instance.fetchItemBufferTwo(
                App.upc, 
                {from: App.metamaskAccountID}
            );
            $("#ftc-item").text(result);
            console.log('fetchItemBufferTwo',result);
        } catch(err) {
            console.log(err.message);
        }
    },

    fetchEvents: async function () {
        try {
            if (typeof App.contracts.SupplyChain.currentProvider.sendAsync !== "function") {
                App.contracts.SupplyChain.currentProvider.sendAsync = function () {
                    return App.contracts.SupplyChain.currentProvider.send.apply(
                        App.contracts.SupplyChain.currentProvider,
                        arguments
                    );
                };
            };
            const instance = App.instance;
            // Subscribe to all events
            console.log(">>>Subscribing to all events"); // ???
            instance.allEvents({ fromBlock: 0, toBlock: 'latest' })
                .on('data', function(event) {
                    console.log(">>>Event received:", event);
                    // Update the UI or log the event details as required
                    $("#ftc-events").append('<li>' + event.event + ' - ' + event.transactionHash + '</li>');
                })
                .on('error', function(err) {
                    console.error(">>>Error in event:", err);
                });
        } catch (error) {
            console.error('Error in App.fetchEvents: ', error);
        }
    },

    initRoles: async function() {
        try {
            // Get the contract instance
            const instance = App.instance;
            // Check if the App.metamaskAccountID is the OwnerID
            if (App.metamaskAccountID === App.ownerID) {
            // Check if the App.originFarmerID has the FarmerRole and add it if not
                const isFarmerPre = await instance.isFarmer(App.originFarmerID);
                console.log("Is Farmer?", isFarmerPre); // ???
                if (!isFarmerPre) {
                    await instance.addFarmer(App.originFarmerID, { from: App.metamaskAccountID });
                    console.log("FarmerRole added to the account", App.originFarmerID);
                    const isFarmerPos = await instance.isFarmer(App.originFarmerID); // ???
                    console.log("Is Farmer?", isFarmerPos); // ???
                }
                // Check if the App.distributorID has the DistributorRole and add it if not
                const isDistributorPre = await instance.isDistributor(App.distributorID);
                console.log("Is Distributor?", isDistributorPre); // ???
                if (!isDistributorPre) {
                    await instance.addDistributor(App.distributorID, { from: App.metamaskAccountID });
                    console.log("DistributorRole added to the account", App.distributorID);
                    const isDistributorPos = await instance.isDistributor(App.distributorID); // ???
                    console.log("Is Distributor?", isDistributorPos); // ???
                }
                // Check if the App.retailerID has the RetailerRole and add it if not
                const isRetailerPre = await instance.isRetailer(App.retailerID);
                console.log("Is Retailer?", isRetailerPre); // ???
                if (!isRetailerPre) {
                    await instance.addRetailer(App.retailerID, { from: App.metamaskAccountID });
                    console.log("RetailerRole added to the account", App.retailerID);
                    const isRetailerPos = await instance.isRetailer(App.retailerID); // ???
                    console.log("Is Retailer?", isRetailerPos); // ???
                }
                // Check if the App.consumerID has the ConsumerRole and add it if not
                const isConsumerPre = await instance.isConsumer(App.consumerID);
                console.log("Is Consumer?", isConsumerPre); // ???
                if (!isConsumerPre) {
                    await instance.addConsumer(App.consumerID, { from: App.metamaskAccountID });
                    console.log("ConsumerRole added to the account", App.consumerID);
                    const isConsumerPos = await instance.isConsumer(App.consumerID); // ???
                    console.log("Is Consumer?", isConsumerPos); // ???
                }
            }
            else {
                console.log("The App.metamaskAccountID (", App.metamaskAccountID, ") is not equal to the App.ownerID (", App.ownerID, ")");
            };
        } catch (error) {
            console.error('Error in App.initRoles: ', error);
        }
      },
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});
