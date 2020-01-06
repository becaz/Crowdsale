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

    otherAddr = accounts[1];
    contractOwnerAddr = accounts[0];
  });

  describe('_getTokenAmount', async () => {
    it('returns token amount', async () =>{
      const result = await contr.testGetTokenAmount(1); //in wei
      assert.equal(result, 300, 'it returns 300');
    });

    describe('when rate is set with a new value', async () => {
      it('returns token amount', async () =>{
        await contr.setRate(100, {from: contractOwnerAddr});
        const result = await contr.testGetTokenAmount(25);//in wei
        assert.equal(result, 2500, 'it returns 2500');
      });
    });
  });

  describe('setRate', async () => {
    describe('when sender has the setter role', async () => {
      it('sets rate', async () =>{
        await contr.setRate(150, {from: contractOwnerAddr});
        const result = await contr.rate();
        assert.equal(result, 150, 'it assigns rate value');
      });
    });

    describe('when sender does not have the setter role', async () => {
      it('raises exception', async () =>{
        try {
          await contr.setRate(2, {from: otherAddr});
        } catch(e)
        {
          assert(e.message.includes('DOES_NOT_HAVE_RATE_SETTER_ROLE'));
          return;
        }
        assert(false);
      });
    });

    describe('when new rate is 0', async () => {
      it('raises exception', async () =>{
        try {
          await contr.setRate(0, {from: contractOwnerAddr});
        } catch(e)
        {
          return;
        }
        assert(false);
      });
    });

    describe('when new rate is negative', async () => {
      it('raises exception', async () =>{
        try {
          await contr.setRate(-2, {from: contractOwnerAddr});
        } catch(e)
        {
          return;
        }
        assert(false);
      });
    });

    describe('when new rate is too large (> 1 billion)', async () => {
      it('raises exception', async () =>{
        try {
          await contr.setRate(1000000001, {from: contractOwnerAddr});
        } catch(e)
        {
          return;
        }
        assert(false);
      });
    });


  });

});
