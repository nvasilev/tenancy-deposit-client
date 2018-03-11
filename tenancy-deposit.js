$(document).ready(function () {

    const documentRegistryContractAddress = "0x4cf854fd2b0a542f93c62450c37b3e0565f2f5bb";

    const tenancyContractABI = [{"constant":false,"inputs":[],"name":"withdrawLandlordClaim","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getLandlordDeductionClaim","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"terminateContract","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getTenantDeductionClaim","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getArbiterDeductionClaim","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_tenantDeductionClaim","type":"uint256"}],"name":"tenantClaimDeduction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getExpectedDeposit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"signContract","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getContractStatus","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdrawTenantDeposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"claim","type":"uint256"}],"name":"resolveDispute","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_landlordDeductionClaim","type":"uint256"}],"name":"landlordClaimDeduction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPaidDeposit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_tenant","type":"address"},{"name":"_arbiter","type":"address"},{"name":"_expectedDeposit","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_contractAddress","type":"address"},{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"statusIndex","type":"uint256"}],"name":"StatusChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_contractAddress","type":"address"},{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"claim","type":"uint256"}],"name":"DeductionClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_contractAddress","type":"address"},{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"BalanceChanged","type":"event"}];
    const tenancyContractData = '0x606060405260008060006101000a81548160ff0219169083600881111561002257fe5b021790555060405160608062001866833981016040528080519060200190919080519060200190919080519060200190919050503373ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415151561009157600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141515156100cc57600080fd5b8273ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415151561010757600080fd5b60008111151561011657600080fd5b6000600881111561012357fe5b6000809054906101000a900460ff16600881111561013d57fe5b14151561014957600080fd5b30600060016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000809054906101000a900460ff1660088111156101a457fe5b3373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f6b09150b12f595e5171ac7600c65498802bf21649934f6cd7ef5c422c47afdf560405160405180910390a433600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600160146101000a81548160ff021916908315150217905550600060028190555082600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600360146101000a81548160ff021916908315150217905550600060048190555081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060006006819055508060078190555060006008819055504260098190555060016000806101000a81548160ff0219169083600881111561036557fe5b02179055506000809054906101000a900460ff16600881111561038457fe5b3373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f6b09150b12f595e5171ac7600c65498802bf21649934f6cd7ef5c422c47afdf560405160405180910390a450505061145380620004136000396000f3006060604052600436106100c5576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630aaaba1f146100ca5780632f12bcf2146100d45780632fd949ca146100fd57806343890630146101075780637219dc0414610130578063735e595c146101595780638be231551461017c578063b8b4f1a0146101a5578063c032846b146101af578063c1d80a52146101e6578063c2b7b868146101f0578063c5e80fc314610208578063eac062061461022b575b600080fd5b6100d2610254565b005b34156100df57600080fd5b6100e7610554565b6040518082815260200191505060405180910390f35b61010561055e565b005b341561011257600080fd5b61011a610702565b6040518082815260200191505060405180910390f35b341561013b57600080fd5b61014361070c565b6040518082815260200191505060405180910390f35b341561016457600080fd5b61017a6004808035906020019091905050610716565b005b341561018757600080fd5b61018f6109db565b6040518082815260200191505060405180910390f35b6101ad6109e5565b005b34156101ba57600080fd5b6101c2610c09565b604051808260088111156101d257fe5b60ff16815260200191505060405180910390f35b6101ee610c1f565b005b6102066004808035906020019091905050610f24565b005b341561021357600080fd5b6102296004808035906020019091905050611123565b005b341561023657600080fd5b61023e6113e7565b6040518082815260200191505060405180910390f35b60003373ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156102b257600080fd5b600560088111156102bf57fe5b6000809054906101000a900460ff1660088111156102d957fe5b14806103095750600760088111156102ed57fe5b6000809054906101000a900460ff16600881111561030757fe5b145b151561031457600080fd5b600160159054906101000a900460ff1615151561033057600080fd5b60025490506007600881111561034257fe5b6000809054906101000a900460ff16600881111561035c57fe5b14156103685760065490505b3373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015156103a857600080fd5b60018060156101000a81548160ff021916908315150217905550600360159054906101000a900460ff16156103fb5760086000806101000a81548160ff021916908360088111156103f557fe5b02179055505b6000809054906101000a900460ff16600881111561041557fe5b3373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f6b09150b12f595e5171ac7600c65498802bf21649934f6cd7ef5c422c47afdf560405160405180910390a43373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f7a350141a4375888264971fc98bdf535c1843ad8a215baaede8397fb56404ab3600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16316040518082815260200191505060405180910390a350565b6000600254905090565b600280600881111561056c57fe5b6000809054906101000a900460ff16600881111561058657fe5b14151561059257600080fd5b3373ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16148061063b57503373ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16145b151561064657600080fd5b60036000806101000a81548160ff0219169083600881111561066457fe5b02179055506000809054906101000a900460ff16600881111561068357fe5b3373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f6b09150b12f595e5171ac7600c65498802bf21649934f6cd7ef5c422c47afdf560405160405180910390a450565b6000600454905090565b6000600654905090565b3373ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561077257600080fd5b6003600881111561077f57fe5b6000809054906101000a900460ff16600881111561079957fe5b14806107c95750600460088111156107ad57fe5b6000809054906101000a900460ff1660088111156107c757fe5b145b15156107d457600080fd5b600360149054906101000a900460ff161515156107f057600080fd5b600854811115151561080157600080fd5b806004819055506001600360146101000a81548160ff021916908315150217905550600160149054906101000a900460ff161561089557600254600454141561086c5760056000806101000a81548160ff0219169083600881111561086257fe5b0217905550610890565b60066000806101000a81548160ff0219169083600881111561088a57fe5b02179055505b6108b9565b60046000806101000a81548160ff021916908360088111156108b357fe5b02179055505b6000809054906101000a900460ff1660088111156108d357fe5b3373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f6b09150b12f595e5171ac7600c65498802bf21649934f6cd7ef5c422c47afdf560405160405180910390a43373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fb7352098535b7072027d7437004758c0d00d74a9c5507ae9fdff69a91fd6f89b6004546040518082815260200191505060405180910390a350565b6000600754905090565b3373ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515610a4157600080fd5b6001806008811115610a4f57fe5b6000809054906101000a900460ff166008811115610a6957fe5b141515610a7557600080fd5b3460075411151515610a8657600080fd5b3460088190555060026000806101000a81548160ff02191690836008811115610aab57fe5b02179055506000809054906101000a900460ff166008811115610aca57fe5b3373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f6b09150b12f595e5171ac7600c65498802bf21649934f6cd7ef5c422c47afdf560405160405180910390a43373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f7a350141a4375888264971fc98bdf535c1843ad8a215baaede8397fb56404ab3600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16316040518082815260200191505060405180910390a350565b60008060009054906101000a900460ff16905090565b60003373ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515610c7d57600080fd5b60056008811115610c8a57fe5b6000809054906101000a900460ff166008811115610ca457fe5b1480610cd4575060076008811115610cb857fe5b6000809054906101000a900460ff166008811115610cd257fe5b145b1515610cdf57600080fd5b600360159054906101000a900460ff16151515610cfb57600080fd5b600254905060076008811115610d0d57fe5b6000809054906101000a900460ff166008811115610d2757fe5b1415610d335760065490505b3373ffffffffffffffffffffffffffffffffffffffff166108fc82600854039081150290604051600060405180830381858888f193505050501515610d7757600080fd5b6001600360156101000a81548160ff021916908315150217905550600160159054906101000a900460ff1615610dcb5760086000806101000a81548160ff02191690836008811115610dc557fe5b02179055505b6000809054906101000a900460ff166008811115610de557fe5b3373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f6b09150b12f595e5171ac7600c65498802bf21649934f6cd7ef5c422c47afdf560405160405180910390a43373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f7a350141a4375888264971fc98bdf535c1843ad8a215baaede8397fb56404ab3600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16316040518082815260200191505060405180910390a350565b3373ffffffffffffffffffffffffffffffffffffffff16600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515610f8057600080fd5b6006806008811115610f8e57fe5b6000809054906101000a900460ff166008811115610fa857fe5b141515610fb457600080fd5b60025460045414151515610fc757600080fd5b6008548211151515610fd857600080fd5b8160068190555060076000806101000a81548160ff02191690836008811115610ffd57fe5b02179055506000809054906101000a900460ff16600881111561101c57fe5b3373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f6b09150b12f595e5171ac7600c65498802bf21649934f6cd7ef5c422c47afdf560405160405180910390a43373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fb7352098535b7072027d7437004758c0d00d74a9c5507ae9fdff69a91fd6f89b846040518082815260200191505060405180910390a35050565b3373ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561117f57600080fd5b6003600881111561118c57fe5b6000809054906101000a900460ff1660088111156111a657fe5b14806111d65750600460088111156111ba57fe5b6000809054906101000a900460ff1660088111156111d457fe5b145b15156111e157600080fd5b600160149054906101000a900460ff161515156111fd57600080fd5b600854811115151561120e57600080fd5b8060028190555060018060146101000a81548160ff021916908315150217905550600360149054906101000a900460ff16156112a15760025460045414156112785760056000806101000a81548160ff0219169083600881111561126e57fe5b021790555061129c565b60066000806101000a81548160ff0219169083600881111561129657fe5b02179055505b6112c5565b60046000806101000a81548160ff021916908360088111156112bf57fe5b02179055505b6000809054906101000a900460ff1660088111156112df57fe5b3373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f6b09150b12f595e5171ac7600c65498802bf21649934f6cd7ef5c422c47afdf560405160405180910390a43373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fb7352098535b7072027d7437004758c0d00d74a9c5507ae9fdff69a91fd6f89b6002546040518082815260200191505060405180910390a350565b60008060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16319050905600a165627a7a7230582045db9dcbd6738bdc7e8484da79727ec7075cd62e06fa3cb0f2745824907d8d130029';
    const tenancyContractGas = 4469392;

    const KEY_LANDLORD_ADDRESS = 'landlordAddress';
    const KEY_TENANT_ADDRESS = 'tenantAddress';
    const KEY_ARBITER_ADDRESS = 'arbiterAddress';
    const KEY_DEPOSIT = 'deposit';
    const KEY_BALANCE = 'balance';
    const KEY_STATUS = 'status';
    const KEY_IS_ROPSTEN = 'isRopstenTestNet';
    const KEY_CONTRACT_ADDRESS = 'tenancyDepositContractAddress';

    var statusChangedEvent;
    var depositClaimedEvent;
    var balanceChangedEvent;

    resetTenancyDepositContractData();

    function createTenancyDepositContractData() {
        console.log("setup Tenancy Deposit Contract Details...");
        if (typeof(Storage) !== "undefined") {

            let landlordAddress = $('#contract-landlordAddress').val();
            let tenantAddress = $('#contract-tenantAddress').val();
            let arbiterAddress = $('#contract-arbiterAddress').val();
            let deposit = $('#contract-deposit').val();
            let isRopstenTestNet = $('#contract-ropstenTestNet').is(':checked');

            // validate input
            // validateActorAddress(landlordAddress, "landlord");
            // validateActorAddress(tenantAddress, "tenant");
            // validateActorAddress(arbiterAddress, "arbiter");

            createContract(isRopstenTestNet, landlordAddress, tenantAddress, arbiterAddress, deposit, defaultCallbackHandler);

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

    function createContract(isRopstenTestNet, landlordAddress, tenantAddress, arbiterAddress, expectedDeposit) {
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
                    gas: tenancyContractGas
                }, function (error, contract){
                    if(error) {
                        console.error(error, contract);
                    } else if (typeof contract.address !== 'undefined') {
                        console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);

                        // persist contract data to local storage
                        localStorage.setItem(KEY_LANDLORD_ADDRESS, landlordAddress);
                        localStorage.setItem(KEY_TENANT_ADDRESS, tenantAddress);
                        localStorage.setItem(KEY_ARBITER_ADDRESS, arbiterAddress);
                        localStorage.setItem(KEY_DEPOSIT, ""+expectedDeposit);
                        localStorage.setItem(KEY_IS_ROPSTEN, isRopstenTestNet);
                        localStorage.setItem(KEY_CONTRACT_ADDRESS, contract.address);

                        // register event listeners
                        statusChangedEvent = contract.StatusChanged({_contractAddress:contract.address},{fromBlock: 0, toBlock: 'latest'});
                        statusChangedEvent.watch(handleStatusChanged);

                        balanceChangedEvent = contract.BalanceChanged({_contractAddress:contract.address},{fromBlock: 0, toBlock: 'latest'});
                        balanceChangedEvent.watch(handleBalanceChanged);
                    }
                });
        }
    }

    function tenantSignContract() {
        console.log('tenant signs contract...');

        if (isRopstenTestNet()) {
            if (typeof web3 === 'undefined') {
                return showError("Please install MetaMask to access the Ethereum Web3 API from your web browser");
            }
        } else {
            web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
        }
        let tenancyContractAddress = localStorage.getItem(KEY_CONTRACT_ADDRESS);
        let tenantAddress = localStorage.getItem(KEY_TENANT_ADDRESS);
        let deposit = localStorage.getItem(KEY_DEPOSIT);

        let contract = web3.eth.contract(tenancyContractABI).at(tenancyContractAddress);

        contract.signContract({from: tenantAddress, value: deposit}, defaultCallbackHandler);
    }

    function landlordTerminateContract() {
        terminateContract(KEY_LANDLORD_ADDRESS);
    }

    function tenantTerminateContract() {
        terminateContract(KEY_TENANT_ADDRESS);
    }

    function terminateContract(senderAddressKey) {
        console.log('terminating contract...');

        if (isRopstenTestNet()) {
            if (typeof web3 === 'undefined') {
                return showError("Please install MetaMask to access the Ethereum Web3 API from your web browser");
            }
        } else {
            web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
        }

        let tenancyContractAddress = localStorage.getItem(KEY_CONTRACT_ADDRESS);
        let senderAddress = localStorage.getItem(senderAddressKey);

        let contract = web3.eth.contract(tenancyContractABI).at(tenancyContractAddress);

        contract.terminateContract({from: senderAddress}, defaultCallbackHandler);
    }

    // TODO move this logic (state machine?) out in a separate module/file/package
    function handleStatusChanged(error, statusChangedEvent){
        if (error) {
            console.error("Problem handling StatusChanged event: " + error);
        } else {
            let oldContractStatusIndex = parseInt(""+localStorage.getItem(KEY_STATUS));
            let newStatusIndex = statusChangedEvent.args.statusIndex.c[0];
            // TODO validate newStatusIndex

            let newContractStatus = getStatus(newStatusIndex);
            let oldContractStatus = getStatus(oldContractStatusIndex);

            let logMsg = "changing status: "+ oldContractStatusIndex + " -> " + newStatusIndex;
            let errMsg = "Invalid new contract status '" + newContractStatus
                + "' when old one is '" + oldContractStatus + "'";

            switch(oldContractStatusIndex) {
                case -1: // N/A
                    switch (newStatusIndex) {
                        case 0: // Booting Up: N/A -> Not Signed
                        {
                            console.log(logMsg);

                            // update model:
                            localStorage.setItem(KEY_STATUS, newStatusIndex);

                            updateView(KEY_STATUS, newContractStatus);
                        }
                        default:
                            console.error(errMsg);
                        break;
                    }
                case 0: // Not Signed
                    switch (newStatusIndex) {
                        case 1: // Contract Created: Not Signed -> Deposit Required
                        {
                            console.log(logMsg);

                            // update model:
                            localStorage.setItem(KEY_STATUS, newStatusIndex);

                            // update UI:
                            updateView(KEY_LANDLORD_ADDRESS, localStorage.getItem(KEY_LANDLORD_ADDRESS));
                            updateView(KEY_TENANT_ADDRESS, localStorage.getItem(KEY_TENANT_ADDRESS));
                            updateView(KEY_ARBITER_ADDRESS, localStorage.getItem(KEY_ARBITER_ADDRESS));
                            updateView(KEY_DEPOSIT, localStorage.getItem(KEY_DEPOSIT));
                            updateView(KEY_STATUS, newContractStatus);

                            disableElement('contract-landlordAddress');
                            disableElement('contract-tenantAddress');
                            disableElement('contract-arbiterAddress');
                            disableElement('contract-deposit');
                            disableElement('contract-deduction');
                            disableElement('contract-ropstenTestNet');
                            disableElement('documentCreateTenancyDepositContract');

                            enableElement('documentResetTenancyDepositContract');
                            enableElement('documentTenantSignContract');
                        }
                        default:
                            console.error(errMsg);
                    }
                    break;
                case 1: // Deposit Required
                    switch(newStatusIndex)
                    {
                        case 2: // Tenants Signs Contract: Deposit Required -> Active
                        {
                            console.log(logMsg);
                            // update model:
                            localStorage.setItem(KEY_STATUS, newStatusIndex);

                            // update UI:
                            updateView(KEY_STATUS, newContractStatus);

                            // landlord ui controls
                            enableElement('documentLandlordTerminateContract');

                            // tenant ui controls
                            disableElement('documentTenantSignContract');
                            enableElement('documentTenantTerminateContract');
                            break;
                        }
                        default:
                            console.error(errMsg);
                    }
                case 2: // Active
                    switch(newStatusIndex)
                    {
                        case 3: // Contract Comes to an End: Active -> Complete
                        {
                            console.log(logMsg);
                            // update model:
                            localStorage.setItem(KEY_STATUS, newStatusIndex);

                            // update UI:
                            updateView(KEY_STATUS, newContractStatus);

                            // landlord ui controls
                            disableElement('documentLandlordTerminateContract');
                            enableElement('documentLandlordClaimDeduction');

                            // tenant ui controls
                            disableElement('documentTenantTerminateContract');
                            enableElement('documentTenantClaimDeduction');
                            break;
                        }
                        default:
                            console.error(errMsg);
                    }
                default:
                    console.error(errMsg);
            }
        }
    }

    function handleBalanceChanged(error, balanceChangedEvent){
        if (error) {
            console.error("Problem handling BalanceChanged event: " + error);
        } else {
            let newBalanceValue = balanceChangedEvent.args.value.c[0];
            // TODO validate new balance value

            console.log('balance changed to: ' + newBalanceValue);

            // update model
            localStorage.setItem(KEY_BALANCE, newBalanceValue);

            // update UI
            updateView(KEY_BALANCE, newBalanceValue);
        }
    }

    function getStatus(statusIndex) {
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
        if (statusIndex < 0 || statusIndex >= ContractStatus.length) {
            return "N/A";
        }
        return ContractStatus[statusIndex];
    }

    function defaultCallbackHandler(error, result) {
        if(error) {
            console.error(error);
        } else {
            console.log(result);
        }
    }

    function resetTenancyDepositContractData() {
        console.log("cleanup...");

        (function resetView() {
            updateView(KEY_LANDLORD_ADDRESS, "");
            updateView(KEY_TENANT_ADDRESS, "");
            updateView(KEY_ARBITER_ADDRESS, "");
            updateView(KEY_DEPOSIT, "");
            updateView("deduction", "");
            updateView(KEY_STATUS, "N/A");
            $('#contract-ropstenTestNet').prop('checked', false);

            // reset tenancy deposit agreement controls
            enableElement('contract-landlordAddress');
            enableElement('contract-tenantAddress');
            enableElement('contract-arbiterAddress');
            enableElement('contract-deposit');
            enableElement('contract-ropstenTestNet');
            enableElement('documentCreateTenancyDepositContract');
            enableElement('documentResetTenancyDepositContract');

            // disable landlord ui controls
            disableElement('documentLandlordTerminateContract');
            disableElement('documentLandlordClaimDeduction');
            disableElement('documentLandlordWithdrawDeduction');

            // disable tenant ui controls
            disableElement('documentTenantSignContract');
            disableElement('documentTenantTerminateContract');
            disableElement('documentTenantClaimDeduction');
            disableElement('documentTenantWithdrawDeposit');

            // disable arbiter ui controls
            disableElement('documentArbiterResolveDispute');
        })();

        // reset local storage
        if (typeof(Storage) !== "undefined") {
            localStorage.clear();
            localStorage.setItem(KEY_STATUS, -1);
        } else {
            // TODO make it visible
            console.error("no local storage support...");
        }
    }

    function isRopstenTestNet() {
        return JSON.parse(localStorage.getItem(KEY_IS_ROPSTEN)) === true;
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


    function getContract() {
        let tenancyContractAddress = localStorage.getItem('tenancyContractAddress');
        let isRopstenTestNet = JSON.parse(localStorage.getItem(KEY_IS_ROPSTEN));
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

    $('#documentTenantSignContract').click(tenantSignContract);

    $('#documentLandlordTerminateContract').click(landlordTerminateContract);

    $('#documentTenantTerminateContract').click(tenantTerminateContract);

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


