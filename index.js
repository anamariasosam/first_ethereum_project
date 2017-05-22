web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
VotingContract = web3.eth.contract(abi);

contractInstance = VotingContract.at('0xc5ab24433f2c739d18c2ddcad296e46acaff66e6');
candidates = {"Darth Vader": "candidate-1", "Darth Maul": "candidate-2", "Darth Sidious": "candidate-3"}

function voteForCandidate(candidate) {
  candidateName = $("#candidate").val();
  contractInstance.voteForCandidate(candidateName, {from: web3.eth.accounts[0]}, function() {
    let div_id = candidates[candidateName];
    $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
  });
}

$(document).ready(function() {
  candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    let val = contractInstance.totalVotesFor.call(name).toString()
    $("#" + candidates[name]).html(val);
  }
});


// var candidateNames = ['Darth Vader', 'Darth Maul', 'Darth Sidious'];
// var ballot_sol_votingContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]);
// var ballot_sol_voting = ballot_sol_votingContract.new(
//    candidateNames,
//    {
//      from: web3.eth.accounts[0],
//      data: '0x6060604052341561000c57fe5b6040516103d83803806103d8833981016040528080518201919050505b806001908051906020019061003f929190610047565b505b506100bf565b828054828255906000526020600020908101928215610089579160200282015b82811115610088578251829060001916905591602001919060010190610067565b5b509050610096919061009a565b5090565b6100bc91905b808211156100b85760008160009055506001016100a0565b5090565b90565b61030a806100ce6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632f265cf714610067578063392e6678146100a55780637021939f146100e1578063b13c744b1461011f578063cc9ab2671461015b575bfe5b341561006f57fe5b61008960048080356000191690602001909190505061017f565b604051808260ff1660ff16815260200191505060405180910390f35b34156100ad57fe5b6100c76004808035600019169060200190919050506101cd565b604051808215151515815260200191505060405180910390f35b34156100e957fe5b610103600480803560001916906020019091905050610233565b604051808260ff1660ff16815260200191505060405180910390f35b341561012757fe5b61013d6004808035906020019091905050610253565b60405180826000191660001916815260200191505060405180910390f35b341561016357fe5b61017d600480803560001916906020019091905050610278565b005b60006000151561018e836101cd565b1515141561019c5760006000fd5b60006000836000191660001916815260200190815260200160002060009054906101000a900460ff1690505b919050565b60006000600090505b6001805490508110156102285782600019166001828154811015156101f757fe5b906000526020600020900160005b505460001916141561021a576001915061022d565b5b80806001019150506101d6565b600091505b50919050565b60006020528060005260406000206000915054906101000a900460ff1681565b60018181548110151561026257fe5b906000526020600020900160005b915090505481565b60001515610285826101cd565b151514156102935760006000fd5b600160006000836000191660001916815260200190815260200160002060008282829054906101000a900460ff160192506101000a81548160ff021916908360ff1602179055505b505600a165627a7a72305820d348b15556432530cd06a8bfc9918fc1aef6db281bf03b770cf62d081991755f0029',
//      gas: '4700000'
//    }, function (e, contract){
//     console.log(e, contract);
//     if (typeof contract.address !== 'undefined') {
//          console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
//     }
//  })
