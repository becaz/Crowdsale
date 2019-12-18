pragma solidity >=0.4.21 <0.6.0;

import "@openzeppelin/contracts/access/Roles.sol";
import "@openzeppelin/contracts/crowdsale/Crowdsale.sol";

contract BecazCrowdsale is Crowdsale{
  using Roles for Roles.Role;

  Roles.Role private _owners;
  uint256 private _changeableRate;

  constructor(uint256 initialRate, address payable wallet, IERC20 tokenAddr, address ownerAddr)
  Crowdsale(1, wallet, tokenAddr)
  public
  {
    _owners.add(ownerAddr);
    _changeableRate = initialRate;
  }

  function setRate(uint256 newRate) public
  {
    require(_owners.has(msg.sender), "DOES_NOT_HAVE_RATE_SETTER_ROLE");
    require(newRate > 0 && newRate <= 1000000000);
    _changeableRate = newRate;
  }

  function rate() public view returns(uint256) {
    return _changeableRate;
  }

  function _getTokenAmount(uint256 weiAmount) internal view returns (uint256) {
      return weiAmount.mul(_changeableRate);
  }

  // Uncomment this function when testing
  // and comment when deploying to the mainnet
  function testGetTokenAmount(uint256 weiAmount) public view returns (uint256) {
      return _getTokenAmount(weiAmount);
  }

}
