const BecazCrowdsale = artifacts.require('BecazCrowdsale');

contract('BecazCrowdsale', () => {
  let contr = null;

  before( async () =>{
    contr = await BecazCrowdsale.deployed();
  });

  it('should deploy smart contract properly', async function(){
    assert(contr.address != '');
  });

  it('initializes the contract with the correct name', async () =>{
    const result = await contr.rate();
    assert.equal(result, 300, 'it assigns rate value');
  });
});
