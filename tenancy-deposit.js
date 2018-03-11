$(document).ready(function () {
    resetTenancyDepositContractData();

    const documentRegistryContractAddress = "0x4cf854fd2b0a542f93c62450c37b3e0565f2f5bb";

    const tenancyContractABI = [{"constant":false,"inputs":[],"name":"withdrawLandlordClaim","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"terminateContract","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_tenantDeductionClaim","type":"uint256"}],"name":"tenantClaimDeduction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getExpectedDeposit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"signContract","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getContractStatus","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdrawTenantDeposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"claim","type":"uint256"}],"name":"resolveDispute","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_landlordDeductionClaim","type":"uint256"}],"name":"landlordClaimDeduction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPaidDeposit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_tenant","type":"address"},{"name":"_arbiter","type":"address"},{"name":"_expectedDeposit","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"constructor"}];

    const tenancyContractData = '0x606060405260008060006101000a81548160ff0219169083600881111561002257fe5b0217905550604051606080610e8b833981016040528080519060200190919080519060200190919080519060200190919050503373ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415151561009057600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141515156100cb57600080fd5b8273ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415151561010657600080fd5b60008111151561011557600080fd5b6000600881111561012257fe5b6000809054906101000a900460ff16600881111561013c57fe5b14151561014857600080fd5b30600060016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600160146101000a81548160ff021916908315150217905550600060028190555082600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600360146101000a81548160ff021916908315150217905550600060048190555081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060006006819055508060078190555060006008819055504260098190555060016000806101000a81548160ff021916908360088111156102ce57fe5b0217905550505050610ba6806102e56000396000f3006060604052600436106100a4576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630aaaba1f146100a95780632fd949ca146100b3578063735e595c146100bd5780638be23155146100e0578063b8b4f1a014610109578063c032846b14610113578063c1d80a521461014a578063c2b7b86814610154578063c5e80fc31461016c578063eac062061461018f575b600080fd5b6100b16101b8565b005b6100bb610362565b005b34156100c857600080fd5b6100de6004808035906020019091905050610470565b005b34156100eb57600080fd5b6100f3610616565b6040518082815260200191505060405180910390f35b610111610620565b005b341561011e57600080fd5b6101266106ee565b6040518082600881111561013657fe5b60ff16815260200191505060405180910390f35b610152610704565b005b61016a60048080359060200190919050506108b3565b005b341561017757600080fd5b61018d6004808035906020019091905050610995565b005b341561019a57600080fd5b6101a2610b3a565b6040518082815260200191505060405180910390f35b60003373ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561021657600080fd5b6005600881111561022357fe5b6000809054906101000a900460ff16600881111561023d57fe5b148061026d57506007600881111561025157fe5b6000809054906101000a900460ff16600881111561026b57fe5b145b151561027857600080fd5b600160159054906101000a900460ff1615151561029457600080fd5b6002549050600760088111156102a657fe5b6000809054906101000a900460ff1660088111156102c057fe5b14156102cc5760065490505b3373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050151561030c57600080fd5b60018060156101000a81548160ff021916908315150217905550600360159054906101000a900460ff161561035f5760086000806101000a81548160ff0219169083600881111561035957fe5b02179055505b50565b600280600881111561037057fe5b6000809054906101000a900460ff16600881111561038a57fe5b14151561039657600080fd5b3373ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16148061043f57503373ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16145b151561044a57600080fd5b60036000806101000a81548160ff0219169083600881111561046857fe5b021790555050565b3373ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156104cc57600080fd5b600360088111156104d957fe5b6000809054906101000a900460ff1660088111156104f357fe5b148061052357506004600881111561050757fe5b6000809054906101000a900460ff16600881111561052157fe5b145b151561052e57600080fd5b600360149054906101000a900460ff1615151561054a57600080fd5b600854811115151561055b57600080fd5b806004819055506001600360146101000a81548160ff021916908315150217905550600160149054906101000a900460ff16156105ef5760025460045414156105c65760056000806101000a81548160ff021916908360088111156105bc57fe5b02179055506105ea565b60066000806101000a81548160ff021916908360088111156105e457fe5b02179055505b610613565b60046000806101000a81548160ff0219169083600881111561060d57fe5b02179055505b50565b6000600754905090565b3373ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561067c57600080fd5b600180600881111561068a57fe5b6000809054906101000a900460ff1660088111156106a457fe5b1415156106b057600080fd5b34600754111515156106c157600080fd5b3460088190555060026000806101000a81548160ff021916908360088111156106e657fe5b021790555050565b60008060009054906101000a900460ff16905090565b60003373ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561076257600080fd5b6005600881111561076f57fe5b6000809054906101000a900460ff16600881111561078957fe5b14806107b957506007600881111561079d57fe5b6000809054906101000a900460ff1660088111156107b757fe5b145b15156107c457600080fd5b600360159054906101000a900460ff161515156107e057600080fd5b6002549050600760088111156107f257fe5b6000809054906101000a900460ff16600881111561080c57fe5b14156108185760065490505b3373ffffffffffffffffffffffffffffffffffffffff166108fc82600854039081150290604051600060405180830381858888f19350505050151561085c57600080fd5b6001600360156101000a81548160ff021916908315150217905550600160159054906101000a900460ff16156108b05760086000806101000a81548160ff021916908360088111156108aa57fe5b02179055505b50565b3373ffffffffffffffffffffffffffffffffffffffff16600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561090f57600080fd5b600680600881111561091d57fe5b6000809054906101000a900460ff16600881111561093757fe5b14151561094357600080fd5b6002546004541415151561095657600080fd5b600854821115151561096757600080fd5b8160068190555060076000806101000a81548160ff0219169083600881111561098c57fe5b02179055505050565b3373ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156109f157600080fd5b600360088111156109fe57fe5b6000809054906101000a900460ff166008811115610a1857fe5b1480610a48575060046008811115610a2c57fe5b6000809054906101000a900460ff166008811115610a4657fe5b145b1515610a5357600080fd5b600160149054906101000a900460ff16151515610a6f57600080fd5b6008548111151515610a8057600080fd5b8060028190555060018060146101000a81548160ff021916908315150217905550600360149054906101000a900460ff1615610b13576002546004541415610aea5760056000806101000a81548160ff02191690836008811115610ae057fe5b0217905550610b0e565b60066000806101000a81548160ff02191690836008811115610b0857fe5b02179055505b610b37565b60046000806101000a81548160ff02191690836008811115610b3157fe5b02179055505b50565b60008060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16319050905600a165627a7a72305820962d60cef77d7a1f72b2d6e9174ba89aafea9eb59cb0861e49b68eb31ec6fa240029';

    let tenancyContractAddress;

    const ContractStatus = [
        "Not Signed",
        "Deposit Required",
        "Active" ,
        "Complete",
        "Deduction Claiming" ,
        "Deduction Agreed",
        "Dispute",
        "Dispute Resolved",
        "Done"
    ];

    function createTenancyDepositContractData() {
        console.log("setup Tenancy Deposit Contract Details...");
        if (typeof(Storage) !== "undefined") {

            let landlordAddress = $('#contract-landlordAddress').val();
            let tenantAddress = $('#contract-tenantAddress').val();
            let arbiterAddress = $('#contract-arbiterAddress').val();
            let deposit = $('#contract-deposit').val();
            let isRopstenTestNet = $('#ropstenTestNet').is(':checked');

            // validate input
            // validateActorAddress(landlordAddress, "landlord");
            // validateActorAddress(tenantAddress, "tenant");
            // validateActorAddress(arbiterAddress, "arbiter");

            createContract(isRopstenTestNet, landlordAddress, tenantAddress, arbiterAddress, deposit,
                function callback(tenancyDepositContract) {
                    getContractStatus(tenancyDepositContract.address, isRopstenTestNet,
                        function updateModelAndView(contractStatus) {

                            // persist contract data to local storage
                            localStorage.setItem('landlordAddress', landlordAddress);
                            localStorage.setItem('tenantAddress', tenantAddress);
                            localStorage.setItem('arbiterAddress', arbiterAddress);
                            localStorage.setItem('deposit', ""+deposit);
                            localStorage.setItem('isRopstenTestNet', isRopstenTestNet);
                            localStorage.setItem('tenancyDepositContractAddress', tenancyDepositContract.address);
                            localStorage.setItem('contractStatus', contractStatus);

                            // update view
                            updateView("landlordAddress", landlordAddress);
                            updateView("tenantAddress", tenantAddress);
                            updateView("arbiterAddress", arbiterAddress);
                            updateView("deposit", deposit);
                            updateView("status", contractStatus);

                            disableElement('contract-landlordAddress');
                            disableElement('contract-tenantAddress');
                            disableElement('contract-arbiterAddress');
                            disableElement('contract-deposit');
                            disableElement('contract-deduction');
                            disableElement('documentCreateTenancyDepositContract');

                            enableElement('documentResetTenancyDepositContract');
                            enableElement('documentTenantPayDeposit');
                        });
            });
        } else {
            // TODO make it visible
            console.error("no local storage support...");
        }
    }

    function validateActorAddress(address, actorType) {
        if ((typeof address === 'undefined') || ! (/^(0x){1}[0-9a-fA-F]{40}$/i.test(address))) {
            return showError("Please provide valid " + actorType + " address.");
        }
    }

    function setItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    function getItem(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    function updateView(key, value) {
        $('#' + key).val(value);
        $('#contract-' + key).val(value);
        $('#landlord-' + key).val(value);
        $('#tenant-' + key).val(value);
        $('#arbiter-' + key).val(value);
    }

    function enableElement(key) {
        $('#'+key).prop("disabled", false);
    }

    function disableElement(key) {
        $('#'+key).prop("disabled", true);
    }

    function resetTenancyDepositContractData() {
        console.log("cleanup...");
        if (typeof(Storage) !== "undefined") {
            updateView("landlordAddress", "");
            updateView("tenantAddress", "");
            updateView("arbiterAddress", "");
            updateView("deposit", "");
            updateView("deduction", "");
            updateView("status", "N/A");

            disableElement('landlord-deposit');
            disableElement('landlord-deduction');

            localStorage.clear();
        } else {
            // TODO make it visible
            console.error("no local storage support...");
        }
    }

    function createContract(isRopstenTestNet, landlordAddress, tenantAddress, arbiterAddress, expectedDeposit, _callback) {
        console.log("createContract...");
        if (typeof(Storage) !== "undefined") {

            if (isRopstenTestNet) {
                if (typeof web3 === 'undefined') {
                    return showError("Please install MetaMask to access the Ethereum Web3 API from your web browser");
                }
            } else {
                web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
            }
            let TenancyDepositContract = web3.eth.contract(tenancyContractABI);
            let tenancyDepositContractInstance = TenancyDepositContract.new(
                tenantAddress,
                arbiterAddress,
                expectedDeposit,
                {
                    from: landlordAddress,
                    data: tenancyContractData,
                    gas: '4469392'
                }, function (error, contract){
                    if(error) {
                        console.error(error, contract);
                    } else if (typeof contract.address !== 'undefined') {
                        console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
                        _callback(contract);
                    }
                });
        }
    }

    function getContractStatus(tenancyContractAddress, isRopstenTestNet, _callback) {
        console.log("retrieve status...")
        let contractStatus = "N/A";
        if (isRopstenTestNet) {
            if (typeof web3 === 'undefined') {
                return showError("Please install MetaMask to access the Ethereum Web3 API from your web browser");
            }
        } else {
            web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
        }
        let contract = web3.eth.contract(tenancyContractABI).at(tenancyContractAddress);

        contract.getContractStatus(function (err, contractStatusIndex) {
            if (err) {
                console.error(err);
            } else {
                if (contractStatusIndex >= 0 && contractStatusIndex < ContractStatus.length)
                {
                    contractStatus = ContractStatus[contractStatusIndex];
                    _callback(contractStatus);
                    return;
                } else {
                    console.error("Invalid contract status index: " + contractStatusIndex);
                }
            }
        });
        _callback(contractStatus);
    }

    function getContract() {
        let tenancyContractAddress = localStorage.getItem('tenancyContractAddress');
        let isRopstenTestNet = JSON.parse(localStorage.getItem('isRopstenTestNet'));
        if (isRopstenTestNet) {
            if (typeof web3 === 'undefined') {
                return showError("Please install MetaMask to access the Ethereum Web3 API from your web browser");
            }
        } else {
            web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
        }
        return web3.eth.contract(tenancyContractABI).at(tenancyContractAddress);
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

    $('#linkContractDetails').click(function () {
        showView("viewContractDetails");
    });

    $('#linkContractAdd').click(function () {
        showView("viewContractAdd");
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

    $('#documentCreateTenancyDepositContract').click(createTenancyDepositContractData);

    $('#documentResetTenancyDepositContract').click(resetTenancyDepositContractData);

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
});


