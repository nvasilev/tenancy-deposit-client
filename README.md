# Tenancy Deposit DApp Client

A web client which deploys and interacts with a Solidity smart contract to the Etherereum blockchain network.

Please find it deployed live at: [http://tenancy-deposit-dapp.nvasilev.com](http://tenancy-deposit-dapp.nvasilev.com)

## Running/Testing Locally
In order to run/test the client locally you would need to:
1. Launch [Ganache](http://truffleframework.com/ganache/) in your command line:
```
> ganache-cli -d
```
2. Then open `index.html` in your browser but when creating a tenancy deposit agreement in the `Contract Details` tab, you should leave the `Ropsten Test Net` option _unticked_.  

## Running/Testing with Ropsten
In order to run/test the client on Ropsten Test Network you would need to make sure that:
1. You have [MetaMask](https://metamask.io/) add-on installed in your browser
2. When creating a tenancy deposit agreement in the `Contract Details` tab, you should tick the `Ropsten Test Net` option.
