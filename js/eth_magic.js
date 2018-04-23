    window.addEventListener('load', function() {
            if (typeof web3 !== 'undefined') 
            {
            startApp(web3);
            } 
            else 
            { 
              $('#metamask_alert_message').html(gametext.error[0]);
              $('#metamask_alert').modal('show');
            }
            });
   // WEB3 INIT DONE!
  
      const contract_address = "0x79f645d4aaa1138b63aab0241c876e58f36b38d6";
      var account =  web3.eth.accounts[0];

      //  var account = web3.eth.accounts[0];
     

      function startApp(web3) 
      {

          web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/anb94achAHWObifKnoZ7"));

          window.web4 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/anb94achAHWObifKnoZ7"));

          contract_init(); // GAME LOAD!
      }    

      function contract_init()
      {

        if(typeof web3.eth.accounts[0]  != 'undefined')
        {
          $('#user_address').html(web3.eth.accounts[0]);

          // CALLBACK IN GAME.JS!!!!
          rig_wars_contract = web3.eth.contract(abi).at(contract_address);

          rig_wars_contract.GetMinerData.call(account,{},minerdata);  

          // GET GLOBAL POT
          rig_wars_contract.GetPotInfo.call({},plotdata);  

          // GET NETWORK HASH and MONEY 

          rig_wars_contract.GetGlobalProduction.call({},network_money);

          // GET BOOSTER INFOS
          rig_wars_contract.GetBoosterData.call({},booster_init);

          // GET PVP DATA
          rig_wars_contract.GetPVPData.call(account,{},pvpdata);

          // GET ETH BALANCE OF USER
          web3.eth.getBalance(web3.eth.accounts[0],function(err,ress){
           if(!err)
           {
             game.ethbalance =  ress;
             console.log("ETH balance: "+ress); 
           } 
          })

        }
        else // No Metamask Address Found!
        {
          $('#metamask_alert_message').html(gametext.error[1]);
          $('#metamask_alert').modal('show');
        }  
      }


      function start_game_contract()
      {

        if(typeof web3.eth.accounts[0]  != 'undefined')
        {

          rig_wars_contract = web3.eth.contract(abi).at(contract_address);

          rig_wars_contract.StartNewMiner.sendTransaction({from:account},function(err,ress)
          {
            waitForReceipt(ress, function (receipt) 
            {
              console.log('Force!');
              update_balance(1);
              contract_init();
            });  
          }
        );


        }
        else // No Metamask Address Found!
        {
          $('#metamask_alert_message').html(gametext.error[1]);
          $('#metamask_alert').modal('show');
        }  
      }

      function buy_rig (rigID,count)
      {
         rigID = parseInt(rigID);
         count = parseInt(count);

        rig_wars_contract = web3.eth.contract(abi).at(contract_address);

        console.log(rigID,count);

        rig_wars_contract.UpgradeRig.sendTransaction(rigID,count,{from:account},callback);

      }

      function buy_rig_eth (rigID,count)
      {
         rigID = parseInt(rigID);
         count = parseInt(count);

        rig_wars_contract = web3.eth.contract(abi).at(contract_address);

        console.log(rigID,count);

          let wei_price = web3.toWei((rigData[rigID].eth*count), 'ether');

            console.log(wei_price);

        rig_wars_contract.UpgradeRigETH.sendTransaction(rigID,count,{from:account, value: wei_price},callback);

      }




      function buy_army(id,count,eth)
      {

        rig_wars_contract = web3.eth.contract(abi).at(contract_address);

            if(eth>0) // ETH-s shoping
            {
              //rig_wars_contract.BuyTroop.sendTransaction(id,{from:account, value: web3.toWei(boost_data.price)},callback);
            }
            else
            {
              rig_wars_contract.BuyTroop.sendTransaction(id,count,{from:account},callback);
            }
      
       // BuyTroop(uint idx, uint count) public payable 
      }

      function price_army(id,count,owned)
      {
        rig_wars_contract = web3.eth.contract(abi).at(contract_address);
        rig_wars_contract.GetPriceOfTroops.call(id,count,owned,{from:account},function(error,ress)
      {
        if(!error)
                  {
                    return console.log("Price: "+ress);
                  } 
                  else
                  {
                      console.log(error);
                  }

      }
      );

      }


      function jackpot_claim()
      {
        rig_wars_contract = web3.eth.contract(abi).at(contract_address);

        rig_wars_contract.SnapshotAndDistributePot.sendTransaction({from:account},callback);
      }


      function buy_boost(price)
      {


        rig_wars_contract = web3.eth.contract(abi).at(contract_address);

        /* BuyBooster() public payable */

        let value = price;

        console.log(price);

        rig_wars_contract.BuyBooster.sendTransaction({from:account, value: value},callback);

      }


      function buy_upgrade(id)
      {
           console.log(id);

          let boost_data = boostData[id];

        rig_wars_contract = web3.eth.contract(abi).at(contract_address);

          let value = web3.toWei(boost_data.price,'ether');

          console.log(value);

         rig_wars_contract.BuyUpgrade.sendTransaction(id,{from:account, value: web3.toWei(boost_data.price)},callback);

      }


      function save_game()
      {

        if(typeof web3.eth.accounts[0]  != 'undefined')
        {

          rig_wars_contract = web3.eth.contract(abi).at(contract_address);

          rig_wars_contract.UpdateMoney.sendTransaction({from:account},callback);
        }
        else // No Metamask Address Found!
        {
          $('#metamask_alert_message').html(gametext.error[1]);
          $('#metamask_alert').modal('show');
        }  
      }


      function debug_gold()
      {

        if(typeof web3.eth.accounts[0]  != 'undefined')
        {

          rig_wars_contract = web3.eth.contract(abi).at(contract_address);

          rig_wars_contract.DEBUGSetMoney.sendTransaction(100000000,{from:account},callback);
        }
        else // No Metamask Address Found!
        {
          $('#metamask_alert_message').html(gametext.error[1]);
          $('#metamask_alert').modal('show');
        }  
      }

      function attack_address(address) // Attack(address defenderAddr) public
      {

        if(typeof web3.eth.accounts[0]  != 'undefined')
        {

          rig_wars_contract = web3.eth.contract(abi).at(contract_address);

          rig_wars_contract.Attack.sendTransaction(address,{from:account},callback);
        }
        else // No Metamask Address Found!
        {
          $('#metamask_alert_message').html(gametext.error[1]);
          $('#metamask_alert').modal('show');
        }  
      }



      function ClaimPersonalShare()
      {
        if(typeof web3.eth.accounts[0]  != 'undefined')
        {

          rig_wars_contract = web3.eth.contract(abi).at(contract_address);

          rig_wars_contract.WithdrawPotShare.sendTransaction({from:account},callback);
        }
        else // No Metamask Address Found!
        {
          $('#metamask_alert_message').html(gametext.error[1]);
          $('#metamask_alert').modal('show');
        }  
      }



      // TESTED FINISHED!
      function GetTotalMinerCount(callback)
      {

        rig_wars_contract = web3.eth.contract(abi).at(contract_address);

          rig_wars_contract.GetTotalMinerCount.call({from:account},
          function (error, result) {
            if(!error)
                {
                  return callback(result.toString());
                } 
                else
                {
                    console.log(error);
                }
          }
        );
      };

      function GetMinerAt(id,callback)
      {

        rig_wars_contract = web3.eth.contract(abi).at(contract_address);

          rig_wars_contract.GetMinerAt.call(id,{from:account},
          function (error, result) {
            if(!error)
                {
                  return callback(result.toString());
                } 
                else
                {
                    console.log(error);
                }
          }
        );
      };

      function GetMinerData(address,callback)
        {

          rig_wars_contract = web3.eth.contract(abi).at(contract_address);

            rig_wars_contract.GetMinerData.call(address,{from:account},
            function (error, result) {
              if(!error)
                  {
                    return callback(result);
                  } 
                  else
                  {
                      console.log(error);
                  }
            }
          );
        };

        function GetPVPData(address,callback)
        {

          rig_wars_contract = web3.eth.contract(abi).at(contract_address);

            rig_wars_contract.GetPVPData.call(address,{from:account},
            function (error, result) {
              if(!error)
                  {
                    return callback(result);
                  } 
                  else
                  {
                      console.log(error);
                  }
            }
          );
        };




function callback (error, result)
{
        if(!error)
        {
          console.log(result);
        } 
        else
        {
            console.log(error);
        }
};


function waitForReceipt(hash, callback) {
  web3.eth.getTransactionReceipt(hash, function (err, receipt) {
    if (err) {
      error(err);
    }

    if (receipt !== null) {
      // Transaction went through
      if (callback) {
        callback(receipt);
      }
    } else {
      // Try again in 1 second
      window.setTimeout(function () {
        waitForReceipt(hash, callback);
      }, 1000);
    }
  });
}