$(document).ready(function () {

    const documentRegistryContractAddress = "0x4cf854fd2b0a542f93c62450c37b3e0565f2f5bb";

    const tenancyContractABI = [{"constant":false,"inputs":[],"name":"withdrawLandlordClaim","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getLandlordDeductionClaim","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"terminateContract","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getTenantDeductionClaim","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getArbiterDeductionClaim","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_tenantDeductionClaim","type":"uint256"}],"name":"tenantClaimDeduction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getExpectedDeposit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"signContract","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getContractStatus","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdrawTenantDeposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"claim","type":"uint256"}],"name":"resolveDispute","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_landlordDeductionClaim","type":"uint256"}],"name":"landlordClaimDeduction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPaidDeposit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_tenant","type":"address"},{"name":"_arbiter","type":"address"},{"name":"_expectedDeposit","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_contractAddress","type":"address"},{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"statusIndex","type":"uint256"}],"name":"StatusChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_contractAddress","type":"address"},{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"claim","type":"uint256"}],"name":"DeductionClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_contractAddress","type":"address"},{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"deduction","type":"uint256"}],"name":"DeductionAgreed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_contractAddress","type":"address"},{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"deduction","type":"uint256"}],"name":"DisputeResolved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_contractAddress","type":"address"},{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"BalanceChanged","type":"event"}];
    const tenancyContractData = '0x606060405260008060006101000a81548160ff021916908360088111156200002357fe5b021790555060405160608062001a0a833981016040528080519060200190919080519060200190919080519060200190919050503373ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141515156200009357600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614151515620000cf57600080fd5b8273ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141515156200010b57600080fd5b6000811115156200011b57600080fd5b600060088111156200012957fe5b6000809054906101000a900460ff1660088111156200014457fe5b1415156200015157600080fd5b30600060016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000809054906101000a900460ff166008811115620001ad57fe5b3373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f6b09150b12f595e5171ac7600c65498802bf21649934f6cd7ef5c422c47afdf560405160405180910390a433600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600160146101000a81548160ff021916908315150217905550600060028190555082600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600360146101000a81548160ff021916908315150217905550600060048190555081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060006006819055508060078190555060006008819055504260098190555060016000806101000a81548160ff021916908360088111156200036f57fe5b02179055506000809054906101000a900460ff1660088111156200038f57fe5b3373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f6b09150b12f595e5171ac7600c65498802bf21649934f6cd7ef5c422c47afdf560405160405180910390a45050506115ec806200041e6000396000f3006060604052600436106100c5576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630aaaba1f146100ca5780632f12bcf2146100d45780632fd949ca146100fd57806343890630146101075780637219dc0414610130578063735e595c146101595780638be231551461017c578063b8b4f1a0146101a5578063c032846b146101af578063c1d80a52146101e6578063c2b7b868146101f0578063c5e80fc314610208578063eac062061461022b575b600080fd5b6100d2610254565b005b34156100df57600080fd5b6100e7610554565b6040518082815260200191505060405180910390f35b61010561055e565b005b341561011257600080fd5b61011a610702565b6040518082815260200191505060405180910390f35b341561013b57600080fd5b61014361070c565b6040518082815260200191505060405180910390f35b341561016457600080fd5b61017a6004808035906020019091905050610716565b005b341561018757600080fd5b61018f610a64565b6040518082815260200191505060405180910390f35b6101ad610a6e565b005b34156101ba57600080fd5b6101c2610c92565b604051808260088111156101d257fe5b60ff16815260200191505060405180910390f35b6101ee610ca8565b005b6102066004808035906020019091905050610fad565b005b341561021357600080fd5b6102296004808035906020019091905050611233565b005b341561023657600080fd5b61023e611580565b6040518082815260200191505060405180910390f35b60003373ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156102b257600080fd5b600560088111156102bf57fe5b6000809054906101000a900460ff1660088111156102d957fe5b14806103095750600760088111156102ed57fe5b6000809054906101000a900460ff16600881111561030757fe5b145b151561031457600080fd5b600160159054906101000a900460ff1615151561033057600080fd5b60025490506007600881111561034257fe5b6000809054906101000a900460ff16600881111561035c57fe5b14156103685760065490505b3373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015156103a857600080fd5b60018060156101000a81548160ff021916908315150217905550600360159054906101000a900460ff16156103fb5760086000806101000a81548160ff021916908360088111156103f557fe5b02179055505b6000809054906101000a900460ff16600881111561041557fe5b3373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f6b09150b12f595e5171ac7600c65498802bf21649934f6cd7ef5c422c47afdf560405160405180910390a43373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f7a350141a4375888264971fc98bdf535c1843ad8a215baaede8397fb56404ab3600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16316040518082815260200191505060405180910390a350565b6000600254905090565b600280600881111561056c57fe5b6000809054906101000a900460ff16600881111561058657fe5b14151561059257600080fd5b3373ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16148061063b57503373ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16145b151561064657600080fd5b60036000806101000a81548160ff0219169083600881111561066457fe5b02179055506000809054906101000a900460ff16600881111561068357fe5b3373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f6b09150b12f595e5171ac7600c65498802bf21649934f6cd7ef5c422c47afdf560405160405180910390a450565b6000600454905090565b6000600654905090565b3373ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561077257600080fd5b6003600881111561077f57fe5b6000809054906101000a900460ff16600881111561079957fe5b14806107c95750600460088111156107ad57fe5b6000809054906101000a900460ff1660088111156107c757fe5b145b15156107d457600080fd5b600360149054906101000a900460ff161515156107f057600080fd5b600854811115151561080157600080fd5b806004819055506001600360146101000a81548160ff021916908315150217905550600160149054906101000a900460ff161561091e5760025460045414156108f55760056000806101000a81548160ff0219169083600881111561086257fe5b02179055503373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f86cc9b085ae149c740e7be818d7bacdda8e6ea60f9079181756ea5077e88d9e96002546040518082815260200191505060405180910390a3610919565b60066000806101000a81548160ff0219169083600881111561091357fe5b02179055505b610942565b60046000806101000a81548160ff0219169083600881111561093c57fe5b02179055505b6000809054906101000a900460ff16600881111561095c57fe5b3373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f6b09150b12f595e5171ac7600c65498802bf21649934f6cd7ef5c422c47afdf560405160405180910390a43373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fb7352098535b7072027d7437004758c0d00d74a9c5507ae9fdff69a91fd6f89b6004546040518082815260200191505060405180910390a350565b6000600754905090565b3373ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515610aca57600080fd5b6001806008811115610ad857fe5b6000809054906101000a900460ff166008811115610af257fe5b141515610afe57600080fd5b3460075411151515610b0f57600080fd5b3460088190555060026000806101000a81548160ff02191690836008811115610b3457fe5b02179055506000809054906101000a900460ff166008811115610b5357fe5b3373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f6b09150b12f595e5171ac7600c65498802bf21649934f6cd7ef5c422c47afdf560405160405180910390a43373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f7a350141a4375888264971fc98bdf535c1843ad8a215baaede8397fb56404ab3600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16316040518082815260200191505060405180910390a350565b60008060009054906101000a900460ff16905090565b60003373ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515610d0657600080fd5b60056008811115610d1357fe5b6000809054906101000a900460ff166008811115610d2d57fe5b1480610d5d575060076008811115610d4157fe5b6000809054906101000a900460ff166008811115610d5b57fe5b145b1515610d6857600080fd5b600360159054906101000a900460ff16151515610d8457600080fd5b600254905060076008811115610d9657fe5b6000809054906101000a900460ff166008811115610db057fe5b1415610dbc5760065490505b3373ffffffffffffffffffffffffffffffffffffffff166108fc82600854039081150290604051600060405180830381858888f193505050501515610e0057600080fd5b6001600360156101000a81548160ff021916908315150217905550600160159054906101000a900460ff1615610e545760086000806101000a81548160ff02191690836008811115610e4e57fe5b02179055505b6000809054906101000a900460ff166008811115610e6e57fe5b3373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f6b09150b12f595e5171ac7600c65498802bf21649934f6cd7ef5c422c47afdf560405160405180910390a43373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f7a350141a4375888264971fc98bdf535c1843ad8a215baaede8397fb56404ab3600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16316040518082815260200191505060405180910390a350565b3373ffffffffffffffffffffffffffffffffffffffff16600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561100957600080fd5b600680600881111561101757fe5b6000809054906101000a900460ff16600881111561103157fe5b14151561103d57600080fd5b6002546004541415151561105057600080fd5b600854821115151561106157600080fd5b8160068190555060076000806101000a81548160ff0219169083600881111561108657fe5b02179055506000809054906101000a900460ff1660088111156110a557fe5b3373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f6b09150b12f595e5171ac7600c65498802bf21649934f6cd7ef5c422c47afdf560405160405180910390a43373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fb7352098535b7072027d7437004758c0d00d74a9c5507ae9fdff69a91fd6f89b846040518082815260200191505060405180910390a33373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fc98fd1f80a8937b1fdeb951d0b63bf7c924a1872543ae2499295625b18abe70e846040518082815260200191505060405180910390a35050565b3373ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561128f57600080fd5b6003600881111561129c57fe5b6000809054906101000a900460ff1660088111156112b657fe5b14806112e65750600460088111156112ca57fe5b6000809054906101000a900460ff1660088111156112e457fe5b145b15156112f157600080fd5b600160149054906101000a900460ff1615151561130d57600080fd5b600854811115151561131e57600080fd5b8060028190555060018060146101000a81548160ff021916908315150217905550600360149054906101000a900460ff161561143a5760025460045414156114115760056000806101000a81548160ff0219169083600881111561137e57fe5b02179055503373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f86cc9b085ae149c740e7be818d7bacdda8e6ea60f9079181756ea5077e88d9e96004546040518082815260200191505060405180910390a3611435565b60066000806101000a81548160ff0219169083600881111561142f57fe5b02179055505b61145e565b60046000806101000a81548160ff0219169083600881111561145857fe5b02179055505b6000809054906101000a900460ff16600881111561147857fe5b3373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f6b09150b12f595e5171ac7600c65498802bf21649934f6cd7ef5c422c47afdf560405160405180910390a43373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fb7352098535b7072027d7437004758c0d00d74a9c5507ae9fdff69a91fd6f89b6002546040518082815260200191505060405180910390a350565b60008060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16319050905600a165627a7a72305820bbbe18aae304b13bb88090107ed2306d186d648c75178f09b572e4193b35749d0029';
    const tenancyContractGas = 4700000;

    const KEY_LANDLORD_ADDRESS = 'landlordAddress';
    const KEY_TENANT_ADDRESS = 'tenantAddress';
    const KEY_ARBITER_ADDRESS = 'arbiterAddress';
    const KEY_DEPOSIT = 'deposit';
    const KEY_DEDUCTION = 'deduction';
    const KEY_BALANCE = 'balance';
    const KEY_STATUS = 'status';
    const KEY_IS_ROPSTEN = 'isRopstenTestNet';
    const KEY_CONTRACT_ADDRESS = 'tenancyDepositContractAddress';
    const KEY_LANDLORD_DEDUCTION_CLAIM = 'landlordDeductionClaim';
    const KEY_TENANT_DEDUCTION_CLAIM = 'landlordTenantDeductionClaim';
    const KEY_ARBITER_DEDUCTION_CLAIM = 'landlordArbiterDeductionClaim';

    let statusChangedEvent;
    let deductionClaimedEvent;
    let deductionAgreedEvent;
    let disputeResolvedEvent;
    let balanceChangedEvent;


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

                        deductionAgreedEvent = contract.DeductionAgreed({_contractAddress:contract.address},{fromBlock: 0, toBlock: 'latest'});
                        deductionAgreedEvent.watch(handleDeductionAgreed);

                        disputeResolvedEvent = contract.DisputeResolved({_contractAddress:contract.address},{fromBlock: 0, toBlock: 'latest'});
                        disputeResolvedEvent.watch(handleDisputeResolved);

                        deductionClaimedEvent = contract.DeductionClaimed({_contractAddress:contract.address},{fromBlock: 0, toBlock: 'latest'});
                        deductionClaimedEvent.watch(handleDeductionClaimed);
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

    function landlordClaimDeduction() {
        console.log('landlord claiming deduction...');

        if (isRopstenTestNet()) {
            if (typeof web3 === 'undefined') {
                return showError("Please install MetaMask to access the Ethereum Web3 API from your web browser");
            }
        } else {
            web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
        }
        let landlordDeductionClaim = $('#landlord-deduction').val();
        let tenancyContractAddress = localStorage.getItem(KEY_CONTRACT_ADDRESS);
        let senderAddress = localStorage.getItem(KEY_LANDLORD_ADDRESS);

        let contract = web3.eth.contract(tenancyContractABI).at(tenancyContractAddress);

        contract.landlordClaimDeduction(landlordDeductionClaim, {from: senderAddress}, defaultCallbackHandler);
    }

    function tenantClaimDeduction() {
        console.log('tenant claiming deduction...');

        if (isRopstenTestNet()) {
            if (typeof web3 === 'undefined') {
                return showError("Please install MetaMask to access the Ethereum Web3 API from your web browser");
            }
        } else {
            web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
        }
        let landlordDeductionClaim = $('#tenant-deduction').val();
        let tenancyContractAddress = localStorage.getItem(KEY_CONTRACT_ADDRESS);
        let senderAddress = localStorage.getItem(KEY_TENANT_ADDRESS);

        let contract = web3.eth.contract(tenancyContractABI).at(tenancyContractAddress);

        contract.tenantClaimDeduction(landlordDeductionClaim, {from: senderAddress}, defaultCallbackHandler);
    }

    // TODO move this logic (state machine?) out in a separate module/file/package
    function handleStatusChanged(error, statusChangedEvent){
        if (error) {
            console.error("Problem handling StatusChanged event: " + error);
        } else {
            let oldContractStatusIndex = parseInt(""+localStorage.getItem(KEY_STATUS));
            let newStatusIndex = statusChangedEvent.args.statusIndex.c[0];
            let senderAddress = statusChangedEvent.args._from;

            // TODO validate values

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
                            enableElement('landlord-deduction');
                            disableElement('documentLandlordTerminateContract');
                            enableElement('documentLandlordClaimDeduction');

                            // tenant ui controls
                            enableElement('tenant-deduction');
                            disableElement('documentTenantTerminateContract');
                            enableElement('documentTenantClaimDeduction');
                            break;
                        }
                        default:
                            console.error(errMsg);
                    }
                case 3: // Complete
                    switch(newStatusIndex)
                    {
                        case 4: // Landlord or Tenant Claimed Deduction: Complete -> Deduction Claiming
                        {
                            console.log(logMsg);
                            handleDeductionClaimingStatusChange(senderAddress, newStatusIndex);
                            break;
                        }
                        default:
                            console.error(errMsg);
                    }
                case 4: // Deduction Claiming
                    switch(newStatusIndex)
                    {
                        case 4: // The Second Party Claimed Deduction: Deduction Claiming -> Deduction Claiming
                        {
                            console.log(logMsg);
                            handleDeductionClaimingStatusChange(senderAddress, newStatusIndex);
                            break;
                        }
                        case 5: // Both Parties Agreed on Deduction Value: Deduction Claiming -> Deduction Agreed
                        {
                            console.log(logMsg);

                            handleDeductionClaimingStatusChange(senderAddress, newStatusIndex)

                            // landlord ui controls
                            enableElement('documentLandlordWithdrawDeduction');

                            // tenant ui controls
                            enableElement('documentTenantWithdrawDeposit');

                            break;
                        }
                        case 6: // The Parties Disagreed on Deduction Value: Deduction Claiming -> Dispute
                        {
                            console.log(logMsg);

                            handleDeductionClaimingStatusChange(senderAddress, newStatusIndex);

                            // arbiter ui controls
                            enableElement('arbiter-deduction');
                            enableElement('documentArbiterResolveDispute');

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

    function handleDeductionClaimingStatusChange(senderAddress, newStatusIndex) {
        // update model:
        localStorage.setItem(KEY_STATUS, newStatusIndex);

        // update UI:
        updateView(KEY_STATUS, getStatus(newStatusIndex));

        // landlord ui controls
        if (senderAddress.toLowerCase() === (localStorage.getItem(KEY_LANDLORD_ADDRESS).toLowerCase())) {
            disableElement('landlord-deduction');
            disableElement('documentLandlordClaimDeduction');
        }
        // tenant ui controls
        else if (senderAddress.toLowerCase() === (localStorage.getItem(KEY_TENANT_ADDRESS).toLowerCase())) {
            disableElement('tenant-deduction');
            disableElement('documentTenantClaimDeduction');
        }
    }

    function handleBalanceChanged(error, balanceChangedEvent){
        if (error) {
            console.error("Problem handling BalanceChanged event: " + error);
        } else {
            if (localStorage.getItem(KEY_BALANCE)) {
                console.log("Ignoring follow-up balancedChangedEvent.");
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
    }

    function handleDeductionAgreed(error, deductionAgreedEvent) {
        if (error) {
            console.error("Problem handling DeductionAgreed event: " + error);
        } else {
            let deductionValue = deductionAgreedEvent.args.deduction.c[0];

            localStorage.setItem(KEY_DEDUCTION, deductionValue);
            updateView(KEY_DEDUCTION, deductionValue);
        }
    }

    function handleDisputeResolved(error, disputeResolvedEvent) {
        if (error) {
            console.error("Problem handling DisputeResolved event: " + error);
        } else {
            let deductionValue = disputeResolvedEvent.args.deduction.c[0];

            localStorage.setItem(KEY_DEDUCTION, deductionValue);
            updateView(KEY_DEDUCTION, deductionValue);
        }
    }

    function handleDeductionClaimed(error, deductionClaimedEvent){
        if (error) {
            console.error("Problem handling DeductionClaimed event: " + error);
        } else {
            let senderAddress = deductionClaimedEvent.args._from;
            let deductionClaimValue = deductionClaimedEvent.args.claim.c[0];

            // TODO validate new values

            if (senderAddress.toLowerCase() === localStorage.getItem(KEY_LANDLORD_ADDRESS).toLowerCase()) {
                localStorage.setItem(KEY_LANDLORD_DEDUCTION_CLAIM, deductionClaimValue);
                disableElement('landlord-deduction');
                disableElement('documentLandlordClaimDeduction');
            }
            else if (senderAddress.toLowerCase() === localStorage.getItem(KEY_TENANT_ADDRESS).toLowerCase()) {
                disableElement('tenant-deduction');
                disableElement('documentTenantClaimDeduction');
                localStorage.setItem(KEY_TENANT_DEDUCTION_CLAIM, deductionClaimValue);
            }
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
            // console.log(result);
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

    $('#documentLandlordClaimDeduction').click(landlordClaimDeduction);

    $('#documentTenantClaimDeduction').click(tenantClaimDeduction);

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


