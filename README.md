## Crowdsale
This smart contract allows to buy token buy sending ETH to the contract.

When creating the contract it is provided with an initial rate and three EOAs:
- payable wallet address, where ETH is deposited
- ERC20 token contract address
- Contract owner address

Only the contract owner is able to change the rate. The rate of the token to ETH is changeable and is set using the method `setRate`. Initially the rate is 1/300, i.e., 1 ETH = 300 Becaz.
