pragma solidity >=0.4.21 <0.6.0;

//import "@openzeppelin/contracts/access/Roles.sol";
import "@openzeppelin/contracts/crowdsale/Crowdsale.sol";

contract BecazCrowdsale is Crowdsale{
  //using Roles for Roles.Role;

  address private _owner;
  uint256 private _changeableRate;

  constructor(uint256 initialRate, address payable wallet, IERC20 tokenAddr, address ownerAddr)
  Crowdsale(1, wallet, tokenAddr)
  public
  {
    _owner = ownerAddr;
    _changeableRate = initialRate;
  }

  function setRate(uint256 newRate) public
  {
    require(_owner == msg.sender, "DOES_NOT_HAVE_RATE_SETTER_ROLE");
    require(newRate > 0 && newRate <= 1000000000);
    _changeableRate = newRate;
  }

  function rate() public view returns(uint256)
  {
    return _changeableRate;
  }

  function setOwner(address ownerAddr) public
  {
    require(_owner == msg.sender, "NOT_OWNER");
    require(ownerAddr != address(0), "ZERO_ADDR");

    _owner = ownerAddr;
  }

  function owner() public view returns(address)
  {
    return _owner;
  }

  function _getTokenAmount(uint256 weiAmount) internal view returns (uint256) {
      return weiAmount.mul(_changeableRate);
  }

  // Uncomment this function when testing
  // and comment when deploying to the mainnet
  /* function testGetTokenAmount(uint256 weiAmount) public view returns (uint256) {
      return _getTokenAmount(weiAmount);
  } */

}
