$(document).ready(function () {

    const documentRegistryContractAddress = "0x4cf854fd2b0a542f93c62450c37b3e0565f2f5bb";

    const tenancyContractABI = [{"constant":false,"inputs":[],"name":"withdrawLandlordClaim","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getLandlordDeductionClaim","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"terminateContract","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getTenantDeductionClaim","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getContractBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getArbiterDeductionClaim","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_tenantDeductionClaim","type":"uint256"}],"name":"tenantClaimDeduction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getExpectedDeposit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTenantBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"signContract","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getContractStatus","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdrawTenantDeposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"claim","type":"uint256"}],"name":"resolveDispute","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_landlordDeductionClaim","type":"uint256"}],"name":"landlordClaimDeduction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPaidDeposit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getLandlordBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_tenant","type":"address"},{"name":"_arbiter","type":"address"},{"name":"_expectedDeposit","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_contractAddress","type":"address"},{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"statusIndex","type":"uint256"}],"name":"StatusChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_contractAddress","type":"address"},{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"claim","type":"uint256"}],"name":"DeductionClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_contractAddress","type":"address"},{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"deduction","type":"uint256"}],"name":"DeductionAgreed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_contractAddress","type":"address"},{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"deduction","type":"uint256"}],"name":"DisputeResolved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_contractAddress","type":"address"},{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"BalanceChanged","type":"event"}];
    const tenancyContractData = '0x606060405260008060006101000a81548160ff021916908360098111156200002357fe5b021790555034156200003457600080fd5b60405160608062001c87833981016040528080519060200190919080519060200190919080519060200190919050503373ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141515156200009f57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614151515620000db57600080fd5b8273ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141515156200011757600080fd5b6000811115156200012757600080fd5b600060098111156200013557fe5b6000809054906101000a900460ff1660098111156200015057fe5b1415156200015d57600080fd5b30600060016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000809054906101000a900460ff166009811115620001b957fe5b3373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f6b09150b12f595e5171ac7600c65498802bf21649934f6cd7ef5c422c47afdf560405160405180910390a433600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600160146101000a81548160ff021916908315150217905550600060028190555082600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600360146101000a81548160ff021916908315150217905550600060048190555081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060006006819055508060078190555060006008819055504260098190555060016000806101000a81548160ff021916908360098111156200037b57fe5b02179055506000809054906101000a900460ff1660098111156200039b57fe5b3373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f6b09150b12f595e5171ac7600c65498802bf21649934f6cd7ef5c422c47afdf560405160405180910390a450505061185d806200042a6000396000f3006060604052600436106100e6576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630aaaba1f146100eb5780632f12bcf2146100f55780632fd949ca1461011e57806343890630146101285780636f9fb98a146101515780637219dc041461017a578063735e595c146101a35780638be23155146101c65780638d6b621d146101ef578063b8b4f1a014610218578063c032846b14610222578063c1d80a5214610259578063c2b7b86814610263578063c5e80fc31461027b578063eac062061461029e578063feeaea4e146102c7575b600080fd5b6100f36102f0565b005b341561010057600080fd5b610108610669565b6040518082815260200191505060405180910390f35b610126610673565b005b341561013357600080fd5b61013b610817565b6040518082815260200191505060405180910390f35b341561015c57600080fd5b610164610821565b6040518082815260200191505060405180910390f35b341561018557600080fd5b61018d610861565b6040518082815260200191505060405180910390f35b34156101ae57600080fd5b6101c4600480803590602001909190505061086b565b005b34156101d157600080fd5b6101d9610bb9565b6040518082815260200191505060405180910390f35b34156101fa57600080fd5b610202610bc3565b6040518082815260200191505060405180910390f35b610220610c3e565b005b341561022d57600080fd5b610235610e62565b6040518082600981111561024557fe5b60ff16815260200191505060405180910390f35b610261610e78565b005b61027960048080359060200190919050506111d9565b005b341561028657600080fd5b61029c600480803590602001909190505061145f565b005b34156102a957600080fd5b6102b16117ac565b6040518082815260200191505060405180910390f35b34156102d257600080fd5b6102da6117b6565b6040518082815260200191505060405180910390f35b6000803373ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561034f57600080fd5b6005600981111561035c57fe5b6000809054906101000a900460ff16600981111561037657fe5b14806103a657506007600981111561038a57fe5b6000809054906101000a900460ff1660098111156103a457fe5b145b806103d55750600860098111156103b957fe5b6000809054906101000a900460ff1660098111156103d357fe5b145b15156103e057600080fd5b600160159054906101000a900460ff161515156103fc57600080fd5b60025491506007600981111561040e57fe5b6000809054906101000a900460ff16600981111561042857fe5b14156104345760065491505b81600854033073ffffffffffffffffffffffffffffffffffffffff16310390503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050151561049457600080fd5b60018060156101000a81548160ff021916908315150217905550600360159054906101000a900460ff16156104eb5760096000806101000a81548160ff021916908360098111156104e157fe5b021790555061050f565b60086000806101000a81548160ff0219169083600981111561050957fe5b02179055505b6000809054906101000a900460ff16600981111561052957fe5b3373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f6b09150b12f595e5171ac7600c65498802bf21649934f6cd7ef5c422c47afdf560405160405180910390a43373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f7a350141a4375888264971fc98bdf535c1843ad8a215baaede8397fb56404ab3600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16316040518082815260200191505060405180910390a35050565b6000600254905090565b600280600981111561068157fe5b6000809054906101000a900460ff16600981111561069b57fe5b1415156106a757600080fd5b3373ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16148061075057503373ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16145b151561075b57600080fd5b60036000806101000a81548160ff0219169083600981111561077957fe5b02179055506000809054906101000a900460ff16600981111561079857fe5b3373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f6b09150b12f595e5171ac7600c65498802bf21649934f6cd7ef5c422c47afdf560405160405180910390a450565b6000600454905090565b60008060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1631905090565b6000600654905090565b3373ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156108c757600080fd5b600360098111156108d457fe5b6000809054906101000a900460ff1660098111156108ee57fe5b148061091e57506004600981111561090257fe5b6000809054906101000a900460ff16600981111561091c57fe5b145b151561092957600080fd5b600360149054906101000a900460ff1615151561094557600080fd5b600854811115151561095657600080fd5b806004819055506001600360146101000a81548160ff021916908315150217905550600160149054906101000a900460ff1615610a73576002546004541415610a4a5760056000806101000a81548160ff021916908360098111156109b757fe5b02179055503373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f86cc9b085ae149c740e7be818d7bacdda8e6ea60f9079181756ea5077e88d9e96002546040518082815260200191505060405180910390a3610a6e565b60066000806101000a81548160ff02191690836009811115610a6857fe5b02179055505b610a97565b60046000806101000a81548160ff02191690836009811115610a9157fe5b02179055505b6000809054906101000a900460ff166009811115610ab157fe5b3373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f6b09150b12f595e5171ac7600c65498802bf21649934f6cd7ef5c422c47afdf560405160405180910390a43373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fb7352098535b7072027d7437004758c0d00d74a9c5507ae9fdff69a91fd6f89b6004546040518082815260200191505060405180910390a350565b6000600754905090565b60003373ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515610c2157600080fd5b3373ffffffffffffffffffffffffffffffffffffffff1631905090565b3373ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515610c9a57600080fd5b6001806009811115610ca857fe5b6000809054906101000a900460ff166009811115610cc257fe5b141515610cce57600080fd5b3460075411151515610cdf57600080fd5b3460088190555060026000806101000a81548160ff02191690836009811115610d0457fe5b02179055506000809054906101000a900460ff166009811115610d2357fe5b3373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f6b09150b12f595e5171ac7600c65498802bf21649934f6cd7ef5c422c47afdf560405160405180910390a43373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f7a350141a4375888264971fc98bdf535c1843ad8a215baaede8397fb56404ab3600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16316040518082815260200191505060405180910390a350565b60008060009054906101000a900460ff16905090565b6000803373ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515610ed757600080fd5b60056009811115610ee457fe5b6000809054906101000a900460ff166009811115610efe57fe5b1480610f2e575060076009811115610f1257fe5b6000809054906101000a900460ff166009811115610f2c57fe5b145b80610f5d575060086009811115610f4157fe5b6000809054906101000a900460ff166009811115610f5b57fe5b145b1515610f6857600080fd5b600360159054906101000a900460ff16151515610f8457600080fd5b600254915060076009811115610f9657fe5b6000809054906101000a900460ff166009811115610fb057fe5b1415610fbc5760065491505b816008540390503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050151561100357600080fd5b6001600360156101000a81548160ff021916908315150217905550600160159054906101000a900460ff161561105b5760096000806101000a81548160ff0219169083600981111561105157fe5b021790555061107f565b60086000806101000a81548160ff0219169083600981111561107957fe5b02179055505b6000809054906101000a900460ff16600981111561109957fe5b3373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f6b09150b12f595e5171ac7600c65498802bf21649934f6cd7ef5c422c47afdf560405160405180910390a43373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f7a350141a4375888264971fc98bdf535c1843ad8a215baaede8397fb56404ab3600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16316040518082815260200191505060405180910390a35050565b3373ffffffffffffffffffffffffffffffffffffffff16600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561123557600080fd5b600680600981111561124357fe5b6000809054906101000a900460ff16600981111561125d57fe5b14151561126957600080fd5b6002546004541415151561127c57600080fd5b600854821115151561128d57600080fd5b8160068190555060076000806101000a81548160ff021916908360098111156112b257fe5b02179055506000809054906101000a900460ff1660098111156112d157fe5b3373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f6b09150b12f595e5171ac7600c65498802bf21649934f6cd7ef5c422c47afdf560405160405180910390a43373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fb7352098535b7072027d7437004758c0d00d74a9c5507ae9fdff69a91fd6f89b846040518082815260200191505060405180910390a33373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fc98fd1f80a8937b1fdeb951d0b63bf7c924a1872543ae2499295625b18abe70e846040518082815260200191505060405180910390a35050565b3373ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156114bb57600080fd5b600360098111156114c857fe5b6000809054906101000a900460ff1660098111156114e257fe5b14806115125750600460098111156114f657fe5b6000809054906101000a900460ff16600981111561151057fe5b145b151561151d57600080fd5b600160149054906101000a900460ff1615151561153957600080fd5b600854811115151561154a57600080fd5b8060028190555060018060146101000a81548160ff021916908315150217905550600360149054906101000a900460ff161561166657600254600454141561163d5760056000806101000a81548160ff021916908360098111156115aa57fe5b02179055503373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f86cc9b085ae149c740e7be818d7bacdda8e6ea60f9079181756ea5077e88d9e96004546040518082815260200191505060405180910390a3611661565b60066000806101000a81548160ff0219169083600981111561165b57fe5b02179055505b61168a565b60046000806101000a81548160ff0219169083600981111561168457fe5b02179055505b6000809054906101000a900460ff1660098111156116a457fe5b3373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f6b09150b12f595e5171ac7600c65498802bf21649934f6cd7ef5c422c47afdf560405160405180910390a43373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fb7352098535b7072027d7437004758c0d00d74a9c5507ae9fdff69a91fd6f89b6002546040518082815260200191505060405180910390a350565b6000600854905090565b60003373ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561181457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff16319050905600a165627a7a72305820fb978774849623b41db8891f14198e3fdc12607ef56e494c7ef3781d4d91abbf0029';
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
        let tenantDeductionClaim = $('#tenant-deduction').val();
        let tenancyContractAddress = localStorage.getItem(KEY_CONTRACT_ADDRESS);
        let senderAddress = localStorage.getItem(KEY_TENANT_ADDRESS);

        let contract = web3.eth.contract(tenancyContractABI).at(tenancyContractAddress);

        contract.tenantClaimDeduction(tenantDeductionClaim, {from: senderAddress}, defaultCallbackHandler);
    }

    function arbiterResolvesDispute() {
        console.log('arbiter resolves dispute...');

        if (isRopstenTestNet()) {
            if (typeof web3 === 'undefined') {
                return showError("Please install MetaMask to access the Ethereum Web3 API from your web browser");
            }
        } else {
            web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
        }
        let deductionValue = $('#arbiter-deduction').val();
        let tenancyContractAddress = localStorage.getItem(KEY_CONTRACT_ADDRESS);
        let senderAddress = localStorage.getItem(KEY_ARBITER_ADDRESS);

        let contract = web3.eth.contract(tenancyContractABI).at(tenancyContractAddress);

        contract.resolveDispute(deductionValue, {from: senderAddress}, defaultCallbackHandler);
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

                            handleDeductionClaimingStatusChange(senderAddress, newStatusIndex);

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
                case 5: // Deduction Agreed
                    switch(newStatusIndex)
                    {
                        case 8: // Tenant or Landlord Withdraws Money: Deduction Agreed -> Money Withdrawal
                        {
                            // TODO -> Pending

                            // console.log(logMsg);
                            // // update model:
                            // localStorage.setItem(KEY_STATUS, newStatusIndex);
                            //
                            // // update UI:
                            // updateView(KEY_STATUS, newContractStatus);
                            //
                            // // landlord ui controls
                            // enableElement('landlord-deduction');
                            // disableElement('documentLandlordTerminateContract');
                            // enableElement('documentLandlordClaimDeduction');
                            //
                            // // tenant ui controls
                            // enableElement('tenant-deduction');
                            // disableElement('documentTenantTerminateContract');
                            // enableElement('documentTenantClaimDeduction');
                            break;
                        }
                        default:
                            console.error(errMsg);
                    }
                case 6: // Dispute
                    switch(newStatusIndex)
                    {
                        case 7: // Arbiter Resolves Dispute: Dispute -> Dispute Resolved
                        {
                            console.log(logMsg);
                            // update model:
                            localStorage.setItem(KEY_STATUS, newStatusIndex);

                            // update UI:
                            updateView(KEY_STATUS, newContractStatus);

                            // landlord ui controls
                            enableElement('documentLandlordWithdrawDeduction');

                            // tenant ui controls
                            enableElement('documentTenantWithdrawDeposit');

                            // arbiter ui controls
                            disableElement('arbiter-deduction');
                            disableElement('documentArbiterResolveDispute');

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
            let localBalanceValue = localStorage.getItem(KEY_BALANCE);
            let newBalanceValue = balanceChangedEvent.args.value.c[0];
            // TODO validate new balance value

            if (!newBalanceValue && localBalanceValue != newBalanceValue) {
                console.log('balance changed to: ' + newBalanceValue);

                // update model
                localStorage.setItem(KEY_BALANCE, newBalanceValue);

                // update UI
                updateView(KEY_BALANCE, newBalanceValue);
            } else {
                console.log("Ignoring follow-up balancedChangedEvent.");
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
            "Money Withdrawal",
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

    $('#documentArbiterResolveDispute').click(arbiterResolvesDispute);

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


