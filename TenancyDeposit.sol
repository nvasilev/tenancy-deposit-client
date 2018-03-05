pragma solidity ^0.4.18;

// import "dev.oraclize.it/api.sol";
// import "github.com/oraclize/ethereum-api/oraclizeAPI.sol";
// import "./oraclizeAPI.sol";

contract TenancyContract { // is usingOraclize {

    enum Status {UNSIGNED, DEPOSIT_REQUIRED, ACTIVE, COMPLETE,
        OWNER_DEDUCTION_REQUESTED, TENANT_DEDUCTION_REQUESTED,
        DEDUCTION_DISPUTE, DISPUTE_RESOLVED, TERMINATED}
    Status status = Status.UNSIGNED;

    uint constant MAX_VALUE = ~uint256(0);

    struct Actor {
        address addr;
        uint deductionClaim;
    }

    struct Deposit {
        uint expectedValue;
        uint paidValue;
    }

    struct TTL {
        uint creationTimestamp;
        uint value;
    }

    modifier landlordOnly() {
        require(landlord.addr == msg.sender);
        _;
    }

    modifier tenantOnly() {
        require(tenant.addr == msg.sender);
        _;
    }

    modifier arbiterOnly() {
        require(arbiter.addr == msg.sender);
        _;
    }

    modifier withStatus(Status _status) {
        require(status == _status);
        _;
    }

    Actor landlord;
    Actor tenant;
    Actor arbiter;
    Deposit deposit;
    TTL ttl;
    // uint pricePerPack = 1 finney;

    function TenancyContract(address tenantAddress, address arbiterAddress, uint depositValue, uint _ttl)
    public
    payable
    {
        require(tenantAddress != msg.sender);
        require(arbiterAddress != msg.sender);
        require(tenantAddress != arbiterAddress);
        require(depositValue > 0 ether);
        require(status == Status.UNSIGNED);

        landlord = Actor({addr: msg.sender, deductionClaim: MAX_VALUE});
        tenant = Actor({addr: tenantAddress, deductionClaim: MAX_VALUE});
        arbiter = Actor({addr: arbiterAddress, deductionClaim: MAX_VALUE});
        deposit = Deposit({expectedValue: depositValue, paidValue: 0 ether});
        ttl = TTL({creationTimestamp: block.timestamp, value: _ttl}); // * 60 in secs
        status = Status.DEPOSIT_REQUIRED;
        // scheduleContractTermination();
    }

    function signContract() public payable
    tenantOnly
    withStatus(Status.DEPOSIT_REQUIRED)
    {
        require(deposit.expectedValue <= msg.value);
        deposit.paidValue = msg.value;
        status = Status.ACTIVE;
    }

    // DELETE ME
    function expireTenancyContract() public payable
    landlordOnly
    withStatus(Status.ACTIVE)
    {
        status = Status.COMPLETE;
        // TODO add events

        // assert(this.balance == ...)
        // address.transfer(msg.value) (takes the value from contract's amount and sends it to address)
        // owner.transfer(this.balance);
        // contractAddress.withdrawBalance.sendTransaction()

        // selfdestruct(landlord.addr); // perhaps not necessary
    }

    // TODO investigate potential collision issues
    function claimOwnerDeduction(uint _landlordDeductionClaim) public landlordOnly {
        require(status == Status.COMPLETE || status == Status.TENANT_DEDUCTION_REQUESTED);
        require(landlord.deductionClaim == MAX_VALUE);
        require(_landlordDeductionClaim >= 0);
        require(_landlordDeductionClaim <= deposit.paidValue);

        landlord.deductionClaim = _landlordDeductionClaim;

        if (status == Status.COMPLETE) {
            status = Status.OWNER_DEDUCTION_REQUESTED;
        }
        else if (status == Status.TENANT_DEDUCTION_REQUESTED) {
            if (landlord.deductionClaim == tenant.deductionClaim) {
                status = Status.TERMINATED;
            } else {
                status = Status.DEDUCTION_DISPUTE;
                // TODO notify arbiter?
            }
        }
    }

    // TODO investigate potential collision issues
    function claimTenantDeduction(uint _tenantDeductionClaim) public payable tenantOnly {
        require(status == Status.OWNER_DEDUCTION_REQUESTED || status == Status.COMPLETE);
        require(status == Status.COMPLETE);
        require(tenant.deductionClaim == MAX_VALUE);
        require(_tenantDeductionClaim >= 0);
        require(_tenantDeductionClaim <= deposit.paidValue);

        tenant.deductionClaim = _tenantDeductionClaim;

        if (status == Status.COMPLETE) {
            status = Status.TENANT_DEDUCTION_REQUESTED;
        }
        else if (status == Status.OWNER_DEDUCTION_REQUESTED) {
            if (landlord.deductionClaim == tenant.deductionClaim) {
                status = Status.TERMINATED;
            } else {
                status = Status.DEDUCTION_DISPUTE;
                // TODO notify arbiter?
            }
        }
    }

    function resolveDispute(uint _arbiterDeductionVerdict) public arbiterOnly {
        require(status == Status.DEDUCTION_DISPUTE);
        require(arbiter.deductionClaim != MAX_VALUE);
        require(_arbiterDeductionVerdict >= 0);
        require(_arbiterDeductionVerdict <= deposit.paidValue);

        arbiter.deductionClaim = _arbiterDeductionVerdict;
        status = Status.DISPUTE_RESOLVED;
    }

    function withdrawDeduction() public landlordOnly payable {
        require(status == Status.TERMINATED || status == Status.DISPUTE_RESOLVED);
        // require();

        // mapping needed owner => deduction
    }



    function getExpectedDeposit() view public returns (uint) {
        return deposit.expectedValue;
    }

    function getPaidDeposit() view public returns (uint) {
        return deposit.paidValue;
    }

    function getStatus() view public returns (Status) {
        return status;
    }



    // function scheduleContractTermination() {
    //   oraclize_query(lengthInSeconds, "URL", "");
    // }

    // function __callback(bytes32 myid, string result) {
    //     require(msg.sender == oraclize_cbAddress());

    //     // status = Status.TENANCY_COMPLETE;
    //      expireTenancyContract();
    // }

}