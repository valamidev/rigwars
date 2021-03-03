   window.rigwarsLoaded = 0;
   
   window.addEventListener('load', function() {
            if (typeof web3 !== 'undefined') 
            {

            window.ethereum.enable();

            startApp(web3);
            } 
            else 
            { 
              $('#metamask_alert_message').html(gametext.error[0]);
              $('#metamask_alert').modal('show');
            }
            });
   // WEB3 INIT DONE!
  
      const contract_address = "0x8dc727e0cc8ad6911d110b1fec592b2ed1547e11";
      var account =  web3.eth.accounts[0];

      function startApp(web3) 
      {

           window.ethereum.enable();

           web3 = new Web3(web3.currentProvider);


           web3.eth.getAccounts().then(() =>{
            contract_init(); // GAME LOAD!
           }
           );

          
      }    

      function contract_init()
      {

        if(typeof web3.eth.accounts[0]  != 'undefined')
        {
          $('#user_address').html(web3.eth.accounts[0]);

          game.user_address = web3.eth.accounts[0];

          // CALLBACK IN GAME.JS!!!!
          rig_wars_contract = web3.eth.contract(abi).at(contract_address);

          rig_wars_contract.GetMinerData.call(game.user_address,{},minerdata);  

          // GET GLOBAL POT
          rig_wars_contract.GetPotInfo.call({},plotdata);  

          // GET NETWORK HASH and MONEY 

          rig_wars_contract.GetGlobalProduction.call({},network_money);

          // GET BOOSTER INFOS
          rig_wars_contract.GetBoosterData.call({},booster_init);

          // GET PVP DATA
          rig_wars_contract.GetPVPData.call(game.user_address,{},pvpdata);

          // ICO FEATURE
          GetCurrentICOCycle();
          if(game.ico_cycle > 0)
          {
            GetMinerUnclaimedICOShare();
          }
          // GET ETH BALANCE OF USER
          web3.eth.getBalance(game.user_address,function(err,ress){
           if(!err)
           {
             game.ethbalance = web3.fromWei(ress,'ether'); ;
             console.log("ETH balance: "+game.ethbalance+" Ether"); 
           } 
          });


          // WHY IT IS SO UGLY JS WHY?!
         (async ()=> { await web3.eth.getBlockNumber(
           function(err,ress)
           {
            web3.eth.getBlock(ress,function(err,ress){

              if(!ress)
              {
                setTimeout(function () {contract_init()}, 2000);
              }
              else
              {
              game.time = ress.timestamp;
              }

            });
           }
         ) })();

         window.rigwarsLoaded = 1;

        }
        else // No Metamask Address Found!
        {
          $('#metamask_alert_message').html(gametext.error[2]);
          $('#metamask_alert').modal('show');
        }  
      }


      function start_game_contract()
      {

        if(typeof web3.eth.accounts[0]  != 'undefined')
        {

          rig_wars_contract = web3.eth.contract(abi).at(contract_address);

          rig_wars_contract.StartNewMiner.sendTransaction({from:account,gasPrice: game.default_gas_price},function(err,ress)
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

     /*
      game.ico_cycle = 0;
      game.ico_data_fund = 0;
      game.ico_data_pot = 0;
      game.ico_personal_fund = 0;
      game.ico_personal_share = 0;
      game.ico_unclaimed = 0;
     */ 


    // GetCurrentICOCycle() public constant returns (uint256), ez az utolsó éppen "in-progress" ICO index  
      function GetCurrentICOCycle()
      {
        rig_wars_contract.GetCurrentICOCycle.call({from:account},function(err,ress)
          {
            if(!err)
            {
              game.ico_cycle = ress.toNumber();
                console.log("ICO cycle: "+game.ico_cycle);
                    GetICOData(game.ico_cycle); // Call Daily ICO data!
                    GetMinerICOData(game.ico_cycle); // Call Miner ICO data!
            } 
            else
            {
                console.log("ICO-cylce" +err);
            }
          });

      }

       // (uint256 idx) public constant returns (uint256 ICOFund, uint256 ICOPot)
       function GetICOData(ico_id)
       {
         rig_wars_contract.GetICOData.call(ico_id, {from:account},function(err,ress)
           {
             if(!err)
             {
              game.ico_data_fund = ress[0].toNumber();
              game.ico_data_pot = ress[1].toNumber();
              console.log("Ico data pot: "+game.ico_data_pot);
             } 
             else
             {
                 console.log(err);
             }
           });
 
       }
       /* GetMinerICOData(address miner, uint256 idx) public constant returns (uint256 ICOFund, uint256 ICOShare , uint256 lastClaimIndex)*/
       function GetMinerICOData(ico_id)
       {
         rig_wars_contract.GetMinerICOData.call(account, ico_id, {from:account},function(err,ress)
           {
             if(!err)
             {
                  if(typeof ress[0]  != 'undefined') 
                  {
                      game.ico_personal_fund = ress[0].toNumber();
                      game.ico_personal_share = ress[1].toNumber();
                      game.ico_personal_lastclaim = ress[2].toNumber();

                      console.log("ICO cycle: "+game.ico_cycle+"Last claim: "+game.ico_personal_lastclaim)

                      if(game.ico_cycle > game.ico_personal_lastclaim)
                      {
                        game.ico_unclaimed = 1;   
                        console.log("Game unclaime ICO: "+game.ico_unclaime)
                      }

                      console.log(game.ico_personal_fund,game.ico_personal_share,game.ico_personal_lastclaim);
                  }
             } 
             else
             {
                 console.log(err);
             }
           });
 
       }

       /* GetMinerUnclaimedICOShare(address miner) public constant returns (uint256 unclaimedPot)  last 30 days*/ 
       function GetMinerUnclaimedICOShare()
       {
         rig_wars_contract.GetMinerUnclaimedICOShare.call(account,{from:account},function(err,ress)
           {
             if(!err)
             {
             game.ico_unclaimed = ress.toNumber();
             } 
             else
             {
                 console.log(err);
             }
           });
 
       }



      function buy_rig (rigID,count)
      {
         rigID = parseInt(rigID);
         count = parseInt(count);

        rig_wars_contract = web3.eth.contract(abi).at(contract_address);

        console.log(rigID,count);



        rig_wars_contract.UpgradeRig.sendTransaction(rigID,count,{from:account,gasPrice: game.default_gas_price},function(err,ress)
        {
          waitForReceipt(ress, function (receipt) 
          {
            console.log('Force!');
            update_balance(1);
            contract_init();
          });  
        });

      }

      function buy_rig_eth (rigID,count)
      {
         rigID = parseInt(rigID);
         count = parseInt(count);

        rig_wars_contract = web3.eth.contract(abi).at(contract_address);

        console.log(rigID,count);

          let wei_price = web3.toWei((rigData[rigID].eth*count), 'ether');

            console.log(wei_price);

        rig_wars_contract.UpgradeRigETH.sendTransaction(rigID,count,{from:account, value: wei_price,gasPrice: game.default_gas_price},function(err,ress)
        {
          waitForReceipt(ress, function (receipt) 
          {
            console.log('Force!');
            update_balance(1);
            contract_init();
          });  
        });

      }


      function buy_army(id,count,eth)
      {

        rig_wars_contract = web3.eth.contract(abi).at(contract_address);

            if(eth>0) // ETH-s shoping
            {
              rig_wars_contract.BuyTroop.sendTransaction(id,count,{from:account, value: web3.toWei(eth,'ether'),gasPrice: game.default_gas_price},function(err,ress)
              {
                waitForReceipt(ress, function (receipt) 
                {
                  console.log('Force!');
                  update_balance(1);
                  contract_init();
                }); 
            });
            }
            else
            {
              rig_wars_contract.BuyTroop.sendTransaction(id,count,{from:account,gasPrice: game.default_gas_price},function(err,ress)
              {
                waitForReceipt(ress, function (receipt) 
                {
                  console.log('Force!');
                  update_balance(1);
                  contract_init();
                }); 
            });
          }
      }

      // ICO

      function ReleaseICO()
      {
        rig_wars_contract = web3.eth.contract(abi).at(contract_address);

        rig_wars_contract.ReleaseICO.sendTransaction({from:account,gasPrice: game.default_gas_price},function(err,ress)
        {
          waitForReceipt(ress, function (receipt) 
          {
            console.log('Force!');
            update_balance(1);
            contract_init();
          });  
        });
      }

      function FundICO(amount)
      {
        rig_wars_contract = web3.eth.contract(abi).at(contract_address);

        rig_wars_contract.FundICO.sendTransaction(amount,{from:account,gasPrice: game.default_gas_price},function(err,ress)
        {
          waitForReceipt(ress, function (receipt) 
          {
            console.log('Force!');
            update_balance(1);
            contract_init();
          });  
        });
      }


      function WithdrawICOEarnings()
      {
        rig_wars_contract = web3.eth.contract(abi).at(contract_address);

        rig_wars_contract.WithdrawICOEarnings.sendTransaction({from:account,gasPrice: game.default_gas_price},function(err,ress)
        {
          waitForReceipt(ress, function (receipt) 
          {
            console.log('Force!');
            update_balance(1);
            contract_init();
          });  
        });
      }

   // ICO   


      function buy_boost(price)
      {

        rig_wars_contract = web3.eth.contract(abi).at(contract_address);

        let value = price - (price % 10000000) + 10000000;

        console.log("BOOSTER: "+price);

        console.log("BOOSTER: "+value);

        if(game.debug==1)
        {
          rig_wars_contract.BuyBooster.call({from:account},function(err,ress)
          {
            console.log(ress);
            console.log(err);
          });
        }


        rig_wars_contract.BuyBooster.sendTransaction({from:account, value: value,gasPrice: game.default_gas_price},function(err,ress)
        {
          waitForReceipt(ress, function (receipt) 
          {
            console.log('Force!');
            update_balance(1);
            contract_init();
          });  
        });

      }


      function buy_upgrade(id)
      {
           console.log(id);

          let boost_data = boostData[id];

        rig_wars_contract = web3.eth.contract(abi).at(contract_address);

          let value = web3.toWei(boost_data.price,'ether');

          console.log(value);

         rig_wars_contract.BuyUpgrade.sendTransaction(id,{from:account, value: web3.toWei(boost_data.price),gasPrice: game.default_gas_price},function(err,ress)
         {
           waitForReceipt(ress, function (receipt) 
           {
             console.log('Force!');
             update_balance(1);
             contract_init();
           });  
         });

      }


      function save_game()
      {

        if(typeof web3.eth.accounts[0]  != 'undefined')
        {

          rig_wars_contract = web3.eth.contract(abi).at(contract_address);

          rig_wars_contract.UpdateMoney.sendTransaction({from:account,gasPrice: game.default_gas_price},function(err,ress)
          {
            waitForReceipt(ress, function (receipt) 
            {
              console.log('Force!');
              update_balance(1);
              contract_init();
            });  
          });
        }
        else // No Metamask Address Found!
        {
          $('#metamask_alert_message').html(gametext.error[1]);
          $('#metamask_alert').modal('show');
        }  
      }

      /*
      function debug_gold()
      {

        if(typeof web3.eth.accounts[0]  != 'undefined')
        {

          rig_wars_contract = web3.eth.contract(abi).at(contract_address);

          rig_wars_contract.DEBUGSetMoney.sendTransaction(500000000000000,{from:account,gasPrice: game.default_gas_price},callback);
        }
        else // No Metamask Address Found!
        {
          $('#metamask_alert_message').html(gametext.error[1]);
          $('#metamask_alert').modal('show');
        }  
      }
      */

      function attack_address(address) // Attack(address defenderAddr) public
      {

        if(typeof web3.eth.accounts[0]  != 'undefined')
        {

          rig_wars_contract = web3.eth.contract(abi).at(contract_address);

          rig_wars_contract.Attack.sendTransaction(address,{from:account,gasPrice: game.default_gas_price},function(err,ress)
        {
          waitForReceipt(ress, function (receipt) 
          {
            console.log('Force!');
            update_balance(1);
            contract_init();
          });  
        });
        }
        else // No Metamask Address Found!
        {
          $('#metamask_alert_message').html(gametext.error[1]);
          $('#metamask_alert').modal('show');
        }  
      }

   
      function debug_devfund()
      {
        if(typeof web3.eth.accounts[0]  != 'undefined')
        {

          rig_wars_contract = web3.eth.contract(abi).at(contract_address);

          rig_wars_contract.WithdrawDevFunds.sendTransaction({from:account,gasPrice: game.default_gas_price},callback);
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

          rig_wars_contract.WithdrawPotShare.sendTransaction({from:account,gasPrice: game.default_gas_price},function(err,ress)
          {
            waitForReceipt(ress, function (receipt) 
            {
              console.log('Force!');
              update_balance(1);
              contract_init();
            });  
          });
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

function toETH(number)
{
  return web3.fromWei(number,'ether');
}
