const BecazCrowdsale = artifacts.require('BecazCrowdsale');

contract('BecazCrowdsale', () => {
  let contr = null;
  let otherAddr = null;
  let contractOwnerAddr = null;
  let accounts = null;

  before( async () =>{
    accounts = await web3.eth.getAccounts();

    contr = await BecazCrowdsale.new(
      300, /* rate, 1 ETH = 200 TKN */
      accounts[3], /* payable wallet address */
      accounts[2], /* IERC20 token address */
      accounts[0],  /* IERC20 token owner's address */);

    zeroAddr = '0x0000000000000000000000000000000000000000';
    otherAddr = accounts[1];
    contractOwnerAddr = accounts[0];
    newOwnerAddr = accounts[4];
  });

  describe('setOwner', async () => {

    describe('when a new owner address is the zero address', async () => {
      it('raises exception', async () =>{
        try {
          await contr.setOwner(zeroAddr, {from: contractOwnerAddr});
        } catch(e)
        {
          return;
        }
        assert(false);
      });
    });

    describe('when sender is not an owner', async () => {
      it('raises exception', async () =>{
        try {
          await contr.setOwner(newOwnerAddr, {from: otherAddr});
        } catch(e)
        {
          assert(e.message.includes('NOT_OWNER'));
          return;
        }
        assert(false);
      });
    });


    describe('when sender is the owner', async () => {
      it('sets a new owner', async () =>{
        await contr.setOwner(newOwnerAddr, {from: contractOwnerAddr});
        const result = await contr.owner();
        assert.equal(result, newOwnerAddr, 'it sets a new owner');
      });
    });

  });

});
