$(document).ready(function () {
    cleanUp();
    
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
        console.log("setupApp...");
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
        console.log("cleanupApp...");
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

            localStorage.clear();
        }
    }

    function createContract() {
        let contractLength = $('#lContractLength').val();
        localStorage.setItem("contractLength", contractLength);

        // if (typeof web3 === 'undefined') {
        //     return showError("Please install MetaMask to access the Ethereum Web3 API from your web browser");
        // }
        // let contract = web3.eth.contract(documentRegistryContractABI).at(documentRegistryContractAddress);
        // contract.add(documentHash, function (err, result, r1, r2, r3) {
        //     if (err) {
        //         return showError("Smart contract call failed: " + e);
        //     }
        //     showInfo("Document " + documentHash + " <b>successfully added</b> to the registry");
        // });
        $('#tContractLength').val("");
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
});


