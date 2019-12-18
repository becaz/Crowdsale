const BecazCrowdsale = artifacts.require("BecazCrowdsale");

module.exports = function(deployer) {
  deployer.deploy(BecazCrowdsale,
    300, /* rate, 1 ETH = 300 TKN */
    '0xf066b9ac14e31d06815b214f8f18fb46a31b6ee4', /* payable wallet address, where ETH is deposited */
    '0x1725979A2D2486D1499a7530ee3B74B1A2F6066B', /* IERC20 token contract address */
    '0xf066b9ac14e31d06815b214f8f18fb46a31b6ee4'  /* owner's address, who is allowed to change rate */
  );
};
