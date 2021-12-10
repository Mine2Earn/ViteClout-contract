//const Connector = require("@vite/connector");
const { WS_RPC } = require("@vite/vitejs-ws");
const { ViteAPI, accountBlock, wallet, constant } = require("@vite/vitejs");

let provider = new WS_RPC("wss://buidl.vite.net/gvite/ws");
let client = new ViteAPI(provider);

// import account
let mnemonic = "";
let myAccount = wallet.getWallet(mnemonic).deriveAddress(0);

let abi = [
  {
    constant: true,
    inputs: [{ name: "vftid", type: "address" }],
    name: "getSellPrice",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "offchain",
  },
  {
    constant: false,
    inputs: [],
    name: "mint",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "vftid", type: "address" }],
    name: "getReserve",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "offchain",
  },
  {
    constant: false,
    inputs: [{ name: "vftid", type: "address" }],
    name: "buyVFT",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "vftid", type: "address" }],
    name: "sellVFT",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "vftid", type: "address" }],
    name: "getBuyPrice",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "offchain",
  },
  {
    constant: true,
    inputs: [
      { name: "vftid", type: "address" },
      { name: "holder", type: "address" },
    ],
    name: "getBalance",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "offchain",
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "addr",
        type: "address",
        result: "vite_601d64d5005984f62fd0496d72e84a06e4dac246848fa3d66d",
      },
      {
        indexed: true,
        name: "vftid",
        type: "address",
        result: "vite_601d64d5005984f62fd0496d72e84a06e4dac246848fa3d66d",
      },
      { indexed: false, name: "value", type: "uint256" },
      { indexed: false, name: "tid", type: "tokenId" },
    ],
    name: "buyEvent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "addr", type: "address" },
      { indexed: true, name: "vftid", type: "address" },
      { indexed: false, name: "value", type: "uint256" },
      { indexed: false, name: "tid", type: "tokenId" },
    ],
    name: "sellEvent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, name: "addr", type: "address" }],
    name: "mintEvent",
    type: "event",
  },
];

let binaryCode =
  "6080604052695649544520544f4b454e600360006101000a81548169ffffffffffffffffffff021916908369ffffffffffffffffffff160217905550660aa87bee53800060045534801561005257600080fd5b506109d8806100626000396000f3fe608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063384b54821461005c57806361a2ca35146100735780636eba87b3146100b8575b600080fd5b34801561006857600080fd5b5061007161010a565b005b6100b66004803603602081101561008957600080fd5b81019080803574ffffffffffffffffffffffffffffffffffffffffff1690602001909291905050506102bc565b005b3480156100c457600080fd5b50610108600480360360208110156100db57600080fd5b81019080803574ffffffffffffffffffffffffffffffffffffffffff1690602001909291905050506105a6565b005b6000600260003374ffffffffffffffffffffffffffffffffffffffffff1674ffffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002160009054906101000a900460ff1660ff161415156101d3576040517f4b2bae7e00000000000000000000000000000000000000000000000000000000815260040180806020018281038252601c8152602001807f416464726573732068617320616c7265616479206d696e74205646540000000081525060200191505060405180910390fd5b6001600260003374ffffffffffffffffffffffffffffffffffffffffff1674ffffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002160006101000a81548160ff021916908360ff1602179055506103e8600160003374ffffffffffffffffffffffffffffffffffffffffff1674ffffffffffffffffffffffffffffffffffffffffff168152602001908152602001600021819055503374ffffffffffffffffffffffffffffffffffffffffff167f37ebb6640dae44e9ab39e5a15d67bd7b5b7e5f6ee5fbaf228473285e58e35bf560405160405180910390a2565b6000600160008374ffffffffffffffffffffffffffffffffffffffffff1674ffffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002154111515610375576040517f4b2bae7e00000000000000000000000000000000000000000000000000000000815260040180806020018281038252600e8152602001807f4e6f7420656e6f7567682056465400000000000000000000000000000000000081525060200191505060405180910390fd5b6000610382826001610880565b9050803410151515610422576040517f4b2bae7e0000000000000000000000000000000000000000000000000000000081526004018080602001828103825260238152602001807f5072696365206973206e6f7420657175616c20746f2073656e64656420616d6f81526020017f756e74000000000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b600160008374ffffffffffffffffffffffffffffffffffffffffff1674ffffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002160008154809291906001900391905055506000808374ffffffffffffffffffffffffffffffffffffffffff1674ffffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002160003374ffffffffffffffffffffffffffffffffffffffffff1674ffffffffffffffffffffffffffffffffffffffffff168152602001908152602001600021600081548092919060010191905055508174ffffffffffffffffffffffffffffffffffffffffff163374ffffffffffffffffffffffffffffffffffffffffff167fd19a76ada15bc7b83411df4fbbecb4371caad4ff7a3b8fc5a81839c388108b6683600360009054906101000a900469ffffffffffffffffffff16604051808381526020018269ffffffffffffffffffff1669ffffffffffffffffffff1681526020019250505060405180910390a35050565b60008060008374ffffffffffffffffffffffffffffffffffffffffff1674ffffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002160003374ffffffffffffffffffffffffffffffffffffffffff1674ffffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000215411151561069d576040517f4b2bae7e00000000000000000000000000000000000000000000000000000000815260040180806020018281038252600e8152602001807f4e6f7420656e6f7567682056465400000000000000000000000000000000000081525060200191505060405180910390fd5b60006106aa826000610880565b9050600160008374ffffffffffffffffffffffffffffffffffffffffff1674ffffffffffffffffffffffffffffffffffffffffff168152602001908152602001600021600081548092919060010191905055506000808374ffffffffffffffffffffffffffffffffffffffffff1674ffffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002160003374ffffffffffffffffffffffffffffffffffffffffff1674ffffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002160008154809291906001900391905055503374ffffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900469ffffffffffffffffffff1669ffffffffffffffffffff168260405160405180820390838587f1505050508174ffffffffffffffffffffffffffffffffffffffffff163374ffffffffffffffffffffffffffffffffffffffffff167f6f3a28565331d25513f1849f0f0373199eca14eebe3c0e508c7513d2807727e183600360009054906101000a900469ffffffffffffffffffff16604051808381526020018269ffffffffffffffffffff1669ffffffffffffffffffff1681526020019250505060405180910390a35050565b600080600160008574ffffffffffffffffffffffffffffffffffffffffff1674ffffffffffffffffffffffffffffffffffffffffff168152602001908152602001600021546103e80390506001831415610936576000600160008674ffffffffffffffffffffffffffffffffffffffffff1674ffffffffffffffffffffffffffffffffffffffffff168152602001908152602001600021541115156109295760009150506109a6565b8080600101915050610996565b6103e8600160008674ffffffffffffffffffffffffffffffffffffffffff1674ffffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000215410151561098c5760009150506109a6565b8080600190039150505b808102660aa87bee538000029150505b9291505056fea165627a7a7230582046e9afbf9d3b8aa7ce19fe5527a36b3b9b27d9290e1d14e79796e7d01a1d0f170029";

// create a new contract
let block = accountBlock
  .createAccountBlock("createContract", {
    address: myAccount.address,
    abi,
    code: binaryCode,
    params: [],
  })
  .setProvider(client)
  .setPrivateKey(myAccount.privateKey);

block
  .autoSetPreviousAccountBlock()
  .then(() => {
    block
      .sign()
      .send()
      .then((result) => {
        console.log("Smart contract %s deployed!", result.toAddress);

        // stake 1000 VITE for the new contract for quota
        let contractAddress = result.toAddress;
        let block = accountBlock
          .createAccountBlock("stakeForQuota", {
            address: myAccount.address,
            beneficiaryAddress: contractAddress,
            amount: "1000000000000000000000",
          })
          .setProvider(client)
          .setPrivateKey(myAccount.privateKey);
        block.autoSetPreviousAccountBlock().then(() => {
          block
            .sign()
            .send()
            .then(() => {
              console.log(
                "Staked %s VITE to address %s!",
                10000,
                contractAddress
              );
            })
            .catch((err) => {
              console.error("Error", err);
            });
        });
      });
  })
  .catch((err) => {
    console.error(err);
  });
