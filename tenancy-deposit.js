$(document).ready(function () {
    cleanUp();
    setUpWeb3Provider();
    hardcodeContractDetails();

    const documentRegistryContractAddress = "0x4cf854fd2b0a542f93c62450c37b3e0565f2f5bb";
    const documentRegistryContractABI = [{
        "constant": true,
        "inputs": [{"name": "hash", "type": "string"}],
        "name": "verify",
        "outputs": [{"name": "dateAdded", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "hash", "type": "string"}],
        "name": "add",
        "outputs": [{"name": "dateAdded", "type": "uint256"}],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {"inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor"}];

    function setupAddresses() {
        console.log("setupAddresses...");
        if (typeof(Storage) !== "undefined") {
            let landlordAddress = $('#landlordAddress').val();
            let tenantAddress = $('#tenantAddress').val();
            let arbiterAddress = $('#arbiterAddress').val();

            localStorage.setItem("landlordAddress", landlordAddress);
            localStorage.setItem("tenantAddress", tenantAddress);
            localStorage.setItem("arbiterAddress", arbiterAddress);

            $('#lLandlordAddress').val(landlordAddress);
            $('#lTenantAddress').val(tenantAddress);
            $('#lArbiterAddress').val(arbiterAddress);

            $('#tLandlordAddress').val(landlordAddress);
            $('#tTenantAddress').val(tenantAddress);
            $('#tArbiterAddress').val(arbiterAddress);

            $('#aLandlordAddress').val(landlordAddress);
            $('#aTenantAddress').val(tenantAddress);
            $('#aArbiterAddress').val(arbiterAddress);
        } else {
            // TODO make it visible
            console.error("no local storage support...");
        }
    }

    function cleanUp() {
        console.log("cleanup...");
        if (typeof(Storage) !== "undefined") {
            $('#lLandlordAddress').val("");
            $('#lTenantAddress').val("");
            $('#lArbiterAddress').val("");
            $('#lContractLength').val("");

            $('#tLandlordAddress').val("");
            $('#tTenantAddress').val("");
            $('#tArbiterAddress').val("");
            $('#tContractLength').val("");

            $('#aLandlordAddress').val("");
            $('#aTenantAddress').val("");
            $('#aContractLength').val("");

            $('#lContractLength').prop("disabled", false);
            $('#documentCreateContract').prop("disabled", false);

            localStorage.clear();
        } else {
            // TODO make it visible
            console.error("no local storage support...");
        }
    }

    function setUpWeb3Provider() {
        console.log("setUpWeb3Provider...")
        if (typeof web3 !== 'undefined') {

            // let ropsten = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/'));
            // web3.currentProvider = ropsten;
            // Use the browser's ethereum provider
            var provider = web3.currentProvider;
            // console.log("Provider: " + provider.);
            // console.log("Web3 not null: " + (web3 != 'undefined'));

        } else {
            console.log('No web3? You should consider trying MetaMask!')
        }
    }

    function createContract() {
        console.log("createContract...");
        if (typeof(Storage) !== "undefined") {
            let contractLength = $('#lContractLength').val();

            localStorage.setItem("contractLength", contractLength);

            $('#tContractLength').val(contractLength);
            $('#aContractLength').val(contractLength);
            $('#lContractLength').prop("disabled", true);
            $('#documentCreateContract').prop("disabled", true);


            if (typeof web3 === 'undefined') {
                return showError("Please install MetaMask to access the Ethereum Web3 API from your web browser");
            }
            // let contract = web3.eth.contract(documentRegistryContractABI).at(documentRegistryContractAddress);
            // contract.add(documentHash, function (err, result, r1, r2, r3) {
            //     if (err) {
            //         return showError("Smart contract call failed: " + e);
            //     }
            //     showInfo("Document " + documentHash + " <b>successfully added</b> to the registry");
            // });

            // var myContract = new web3.eth.Contract([...], '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', {
            //     from: '0x1234567890123456789012345678901234567891', // default from address
            //     gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
            // });


        }
    }


    function uploadDocument() {
        if ($('#documentForUpload')[0].files.length == 0) {
            return showError("Please select a file to upload.");
        }

        let fileReader = new FileReader();
        fileReader.onload = function () {
            let documentHash = sha256(fileReader.result);
            if (typeof web3 === 'undefined') {
                return showError("Please install MetaMask to access the Ethereum Web3 API from your web browser");
            }
            let contract = web3.eth.contract(documentRegistryContractABI).at(documentRegistryContractAddress);
            contract.add(documentHash, function (err, result, r1, r2, r3) {
                if (err) {
                    return showError("Smart contract call failed: " + e);
                }
                showInfo("Document " + documentHash + " <b>successfully added</b> to the registry");
            });
        };
        fileReader.readAsBinaryString($('#documentForUpload')[0].files[0]);
    }

    function verifyDocument() {
        if ($('#documentToVerify')[0].files.length == 0) {
            return showError("Please select a file to verify.");
        }
        let fileReader = new FileReader();
        fileReader.onload = function () {
            let documentHash = sha256(fileReader.result);
            if (typeof web3 === 'undefined') {
                return showError("Please install MetaMask to access the Ethereum Web3 API from your Web browser");
            }
            let contract = web3.eth.contract(documentRegistryContractABI).at(documentRegistryContractAddress);
            contract.verify(documentHash, function (err, result) {
                if (err) {
                    return showError("Smart contract call failed: " + e);
                }
                let contractPublishDate = result.c; // Take the output from the execution
                if (contractPublishDate > 0) {
                    let displayDate = new Date(contractPublishDate * 1000).toLocaleString();
                    showInfo("Document " + documentHash + " is <b>valid</b>, date published: " + displayDate);
                } else {
                    return showError("Document " + documentHash + " is <b>valid</b>, date published: " + displayDate);
                }
            })
        };
        fileReader.readAsBinaryString($('#documentToVerify')[0].files[0]);
    }

    $('#linkHome').click(function () {
        showView("viewHome");
    });

    $('#linkLandlord').click(function () {
        showView("viewLandlord")
    });

    $('#linkTenant').click(function () {
        showView("viewTenant")
    });

    $('#linkArbiter').click(function () {
        showView("viewArbiter")
    });

    // delete me
    $('#linkSubmitDocument').click(function () {
        showView("viewSubmitDocument")
    });

    // delete me
    $('#linkVerifyDocument').click(function () {
        showView("viewVerifyDocument")
    });

    // delete me
    $('#documentUploadButton').click(uploadDocument);

    // delete me
    $('#documentVerifyButton').click(verifyDocument);

    $('#documentSetupAddresses').click(setupAddresses);

    $('#documentCreateContract').click(createContract);

    $('#documentCleanUp').click(cleanUp);

// Attach AJAX "loading" event listener
    $(document).on({
        ajaxStart: function () {
            $("#loadingBox").show()
        },
        ajaxStop: function () {
            $("#loadingBox").hide()
        }
    });

    function showView(viewName) {
        // Hide all views and show the selected view only
        $('main > section').hide();
        $('#' + viewName).show();
    }

    function showInfo(message) {
        $('#infoBox>p').html(message);
        $('#infoBox').show();
        $('#infoBox>header').click(function () {
            $('#infoBox').hide();
        });
    }

    function showError(errorMsg) {
        $('#errorBox>p').html("Error: " + errorMsg);
        $('#errorBox').show();
        $('#errorBox>header').click(function () {
            $('#errorBox').hide();
        });
    }

    function hardcodeContractDetails() {
        console.log("hardcodeContractDetails...");
        if (typeof web3 !== 'undefined') {

            let landlordAddress = '0xC32B4EbEa0B17e6aF9A868E629A62430aA491eB5';
            let tenantAddress = '0x3F416c89F86784B4698Ce01c367177c2007F793d';
            let arbiterAddress = '0xE56bE9b076f861f92CaCe19219073EddD44Bd5D2';

            // let landlordAddress = '0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1';
            // let tenantAddress = '0xffcf8fdee72ac11b5c542428b35eef5769c409f0';
            // let arbiterAddress = '0x22d491bde2303f2f43325b2108d26f1eaba1e32b';

            let depositAmount = 1;
            let ttl = 20;

            let tenancyDepositContractBytecode = '606060405260008060006101000a81548160ff0219169083600881111561002257fe5b02179055506040516080806105cf833981016040528080519060200190919080519060200190919080519060200190919080519060200190919050503373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161415151561009957600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141515156100d457600080fd5b8273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161415151561010f57600080fd5b60008211151561011e57600080fd5b6000600881111561012b57fe5b6000809054906101000a900460ff16600881111561014557fe5b14151561015157600080fd5b60408051908101604052803373ffffffffffffffffffffffffffffffffffffffff168152602001600019815250600160008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015590505060408051908101604052808573ffffffffffffffffffffffffffffffffffffffff168152602001600019815250600360008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015590505060408051908101604052808473ffffffffffffffffffffffffffffffffffffffff168152602001600019815250600560008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015590505060408051908101604052808381526020016000815250600760008201518160000155602082015181600101559050506040805190810160405280428152602001828152506009600082015181600001556020820151816001015590505060016000806101000a81548160ff0219169083600881111561035557fe5b0217905550505050506102628061036d6000396000f300606060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063759cceb11461005c5780638be2315514610066578063b8b4f1a01461008f575b600080fd5b610064610099565b005b341561007157600080fd5b610079610152565b6040518082815260200191505060405180910390f35b61009761015f565b005b3373ffffffffffffffffffffffffffffffffffffffff16600160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156100f857600080fd5b600280600881111561010657fe5b6000809054906101000a900460ff16600881111561012057fe5b14151561012c57600080fd5b60036000806101000a81548160ff0219169083600881111561014a57fe5b021790555050565b6000600760000154905090565b3373ffffffffffffffffffffffffffffffffffffffff16600360000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156101be57600080fd5b60018060088111156101cc57fe5b6000809054906101000a900460ff1660088111156101e657fe5b1415156101f257600080fd5b346007600001541115151561020657600080fd5b3460076001018190555060026000806101000a81548160ff0219169083600881111561022e57fe5b0217905550505600a165627a7a7230582061fcec13d638d4a3d3256e9e8cb0f51466c9fbd5bb7045200e604021d61d724e0029';

            let tenancyDepositContractABI = [
                {
                    "constant": false,
                    "inputs": [],
                    "name": "expireTenancyContract",
                    "outputs": [],
                    "payable": true,
                    "stateMutability": "payable",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "getExpectedDeposit",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [],
                    "name": "signContract",
                    "outputs": [],
                    "payable": true,
                    "stateMutability": "payable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "name": "tenantAddress",
                            "type": "address"
                        },
                        {
                            "name": "arbiterAddress",
                            "type": "address"
                        },
                        {
                            "name": "depositValue",
                            "type": "uint256"
                        },
                        {
                            "name": "_ttl",
                            "type": "uint256"
                        }
                    ],
                    "payable": true,
                    "stateMutability": "payable",
                    "type": "constructor"
                }
            ];
// web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/'));

            // web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

            let myContract = web3.eth.contract(tenancyDepositContractABI);

// let gasEstimate = web3.eth.estimateGas({data: '0x' + tenancyDepositContractBytecode}, function(err,res) {console.error(err)});

            myContract.new({
                data: '0x' + tenancyDepositContractBytecode,
                arguments: [tenantAddress, arbiterAddress, depositAmount, ttl]
            }, function (error, result) {
                if (!error)
                    console.log(result)
                else
                    console.error(error);
            })
                .send({
                        from: landlordAddress,
                        gas: '10000000000',
                        gasPrice: '20000000000000',
                        value: '500000'
                    },
                    function (error, result) {
                        if (!error)
                            console.log(result);
                        else
                            console.error(error);
                    }
                )
                .on('error', function (error) {
                    console.error(error);
                })
                .on('transactionHash', function (transactionHash) {
                    console.log("TransactionHash: " + transactionHash);
                })
                .on('receipt', function (receipt) {
                    console.log("ContractAddress: " + receipt.contractAddress) // contains the new contract address
                })
                .on('confirmation', function (confirmationNumber, receipt) {
                    console.log("Contract confirmation number: " + confirmationNumber + receipt);
                })
                .then(function (newContractInstance) {
                    console.log(newContractInstance.options.address) // instance with the new contract address
                });
        }
        else {
            // TODO make it visible
            console.error("no local storage support...");
        }
    }


});


