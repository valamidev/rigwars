function update_dash()
{
    $('#balance').html(show_big_values(game.futurebalance));
    $('#wallet_balance').html(show_big_values(game.sincedbalance));
    $('#prodPerSec').html(show_big_values_hash(game.prodPerSec)+" /s");


    $('#exhaust').html(game.countdownexhaust);
    $('#immunity').html(game.countdownimmune);

}

function update_dash_slow()
{
    $('#networkhodl').html('Total Open Supply: '+show_big_values(game.networkhodl)+" Token");
    $('#networkpot').html('Network HODL: '+precisionRound(game.networkpot,4)+'<i class="fab fa-ethereum"></i>');
    $('#networkhash').html('Network hash: '+show_big_values_hash(game.networkhash)+' /s');
    $('#networkshare').html('Your Network Share: '+personal_share()+"%");


    $('#unclaimedpot').html('Your contract balance: '+personal_share_eth(game.unclaimedPot));


    $('.console-text').html(generate_output());

    if(game.debug==0)
    {
       $('#debug').hide();   
    }

    if(game.prodPerSec>0)
    {
        $('#start').hide();  
        $('#claim_ico_share').show();
        $('#withdraw1').show();
        $('.slidecontainer').show();
    }
    else
    {
        $('#claim_ico_share').hide();
        $('#withdraw1').hide(); 
        $('.slidecontainer').hide();
    }

    var daily_income =  parseInt(game.prodPerSec)*86400;
    $('#prodPerDay').html(show_big_values(daily_income)+" /day");

    $('#attackpower').html(game.attackpower);
    $('#defensepower').html(game.defensepower);

    // SUPER BLOCK BUTTON SHOW/HIDE
            if(game.time >= game.nextjackpot && game.time>0)
            {
              $('#jackpot').show();
            }
            else
            {
              $('#jackpot').hide();   
            }


    // Claim ETH BUTTON SHOW/HIDE
            if(toETH(game.unclaimedPot) >= 0.001)
            {
                $('#withdraw1').removeClass( "btn-outline-warning" ).addClass( "btn-warning" ); 
            }     
            else
            {
                $('#withdraw1').removeClass( "btn-warning" ).addClass( "btn-outline-warning" );   
            } 


        if(game.ico_unclaimed >= 0.001)
        {
            $('#claim_ico_share').removeClass( "btn-outline-success " ).addClass( "btn-success " ); 
            $('#unclaimedshare').addClass("green-background");

        }     
        else
        {
            $('#claim_ico_share').removeClass( "btn-success " ).addClass( "btn-outline-success " );   
            $('#unclaimedshare').removeClass("green-background");
        } 


}


function update_ico()
{
    // Token ivested
    $('.ico_pot').html(show_big_values(game.ico_data_fund)+" Token");

    // ETH invested
    $('.ico_pot_eth').html('ICO pot equals: '+precisionRound(web3.fromWei(game.ico_data_pot,'ether'),4)+' <i class="fab fa-ethereum"></i>');

    if(game.countdown_ico > 0)
    {
    $('.ico_countdown').html(countdown(game.countdown_ico));
            if(game.prodPerSec>0)
            {
            $('#debug_newico').hide();
            $('.ico-buy-button').show();
            }
    }

    if(game.ico_personal_fund > 0)
    $('#ico_by_you').html(', '+show_big_values(game.ico_personal_fund)+' by you');

    if(game.countdown_ico<=0 && game.prodPerSec>0)
    {
        $('#debug_newico').show();
        $('.ico-buy-button').hide();
    }


    let personal_pct = precisionRound(game.ico_personal_share/game.ico_data_pot*100,2);
  
    // Personal ICO
    $('.ico_pot_yours').html('Your investment so far: '+precisionRound(web3.fromWei(game.ico_personal_share,'ether'),4)+'<i class="fab fa-ethereum"></i> ('+personal_pct+'%)');

}


function personal_share ()
{
    let share =  (parseInt(game.sincedbalance)*10000) / parseInt(game.networkhodl);

    share = parseInt(share);

    share_pct = share/100;

    if(share_pct >= 0.01) 
    return share_pct;
    else
    {
    return "Less than 0.01";    
    }
}

function personal_share_eth(ico_unclaimed)
{
    ico_unclaimed = web3.fromWei(ico_unclaimed,'ether');


    if(ico_unclaimed>= 0.0001 )
    {

     return precisionRound(ico_unclaimed,4)+'<i class="fab fa-ethereum"></i>';
    }
    else
    {
      return 'Less than 0.0001 <i class="fab fa-ethereum"></i>';  
    }

}



function update_rig_ui(id,count,possible_buy,cost_next)
{
    if(window.showrig==0)
        $('[data-card="1-' + id + '-1"]').hide();

        if(window.showrig==1)
            $('[data-card="1-' + id + '-1"]').show();

    let can_buy = 0;

    /*<!-- Data: category,id -->*/
    $('.card').find('[data-owned-count-rig="' + id + '"]').html(count+'X');

    if(count==rigData[id].limit)
    {
        $('.card').find('[data-buyrig-button="' + id + '"]').hide();

        $('.card').find('[data-maxrig-button="' + id + '"]').show();  

        $('.card').find('[data-price-next-rig="' + id+'-1"]').html("-");
    }
    else
    {
        $('.card').find('[data-price-next-rig="' + id+'-1"]').html(show_big_values(cost_next)+" Coin");    
    }
  
        if(possible_buy == 0 || count==rigData[id].limit || rigData[id].eth > 0)
        {
            $('.card').find('[data-buyrig-count="' + id+'-1"]').removeClass( "btn-primary" ).addClass( "btn-secondary" );
            $('.card').find('[data-buyrig-count="' + id+'-5"]').removeClass( "btn-primary" ).addClass( "btn-secondary" );  
            $('.card').find('[data-buyrig-count="' + id+'-1000"]').removeClass( "btn-primary" ).addClass( "btn-secondary" );
            can_buy = 0;
        }

    if(possible_buy >= 1 && rigData[id].price > 0 && count!=rigData[id].limit)
    {
            $('.card').find('[data-price-next-rig="' + id+'-1"]').html(show_big_values(cost_next));
            $('.card').find('[data-buyrig-count="' + id+'-1"]').removeClass( "btn-secondary" ).addClass( "btn-primary" );  
            $('.card').find('[data-buyrig-count="' + id+'-5"]').removeClass( "btn-primary" ).addClass( "btn-secondary" );  
            $('.card').find('[data-buyrig-count="' + id+'-1000"]').removeClass( "btn-secondary" ).addClass( "btn-primary" ); 
            can_buy = 1;
    }
    if(possible_buy >= 5 && rigData[id].price > 0 && count!=rigData[id].limit)
    {
        $('.card').find('[data-buyrig-count="' + id+'-5"]').removeClass( "btn-secondary" ).addClass( "btn-primary" );  
        can_buy = 1;
    }

    // ETH RIG SHOW 1 PIECE
    if(game.ethbalance > rigData[id].eth && rigData[id].eth > 0 && count!=rigData[id].limit)
    {
         $('.card').find('[data-buyrig-count="' + id+'-1"]').removeClass( "btn-secondary" ).addClass( "btn-warning" );    
         can_buy = 1;
    }
    if(game.ethbalance > (rigData[id].eth*5) && rigData[id].eth > 0 && count!=rigData[id].limit)
    {
         $('.card').find('[data-buyrig-count="' + id+'-5"]').removeClass( "btn-secondary" ).addClass( "btn-warning" );    
         can_buy = 1;
    }
    if(game.ethbalance > (rigData[id].eth*10) && rigData[id].eth > 0 && count!=rigData[id].limit)
    {
         $('.card').find('[data-buyrig-count="' + id+'-1000"]').removeClass( "btn-secondary" ).addClass( "btn-warning" );  
         can_buy = 1;  
    }
    // ETH RIG SHOW 1 PIECE


    if(can_buy==1)
    {
        $('.card').find('[data-buyrig-button="' + id + '"]').removeClass( "btn-outline-success" ).addClass( "btn-success" );
    }
    else
    {
        $('.card').find('[data-buyrig-button="' + id + '"]').removeClass( "btn-success" ).addClass( "btn-outline-success" );  
    }

}


function update_army_ui(id,count,possible_buy,cost_next)
{
    let can_buy = 0;

    if(window.showarmy==0)
    $('[data-card="3-' + id + '-1"]').hide();

    if(window.showarmy==1)
        $('[data-card="3-' + id + '-1"]').show();    


    $('.card').find('[data-owned-count-army="' + id + '"]').html(count+'X');

    $('.card').find('[data-price-next-army="' + id+'-1"]').html(show_big_values(cost_next));    

    if(troopData[id].eth > 0 || possible_buy == 0 )
    {
        $('.card').find('[data-price-next-army="' + id+'-1"]').html(show_big_values(cost_next));

            $('.card').find('[data-army-count="' + id+'-1"]').removeClass( "btn-primary" ).addClass( "btn-secondary" );
            $('.card').find('[data-army-count="' + id+'-5"]').removeClass( "btn-primary" ).addClass( "btn-secondary" );  
            $('.card').find('[data-army-count="' + id+'-1000"]').removeClass( "btn-primary" ).addClass( "btn-secondary" );
            can_buy = 0;
    }


    if(possible_buy >= 1  && troopData[id].price > 0)
    {
            $('.card').find('[data-army-count="' + id+'-1"]').removeClass( "btn-secondary" ).addClass( "btn-primary" );  
            $('.card').find('[data-army-count="' + id+'-1000"]').removeClass( "btn-secondary" ).addClass( "btn-primary" ); 
            can_buy = 1; 
    }
    if(possible_buy >= 5 && troopData[id].price > 0)
    {
        $('.card').find('[data-army-count="' + id+'-5"]').removeClass( "btn-secondary" ).addClass( "btn-primary" );  
        can_buy = 1; 
    }


         // ETH TROOP SHOW 1 PIECE
                if(game.ethbalance > troopData[id].eth && troopData[id].eth > 0 )
                {
                    $('.card').find('[data-army-count="' + id+'-1"]').removeClass( "btn-secondary" ).addClass( "btn-warning" );    
                    can_buy = 1;
                }
                if(game.ethbalance > (troopData[id].eth*5) && troopData[id].eth > 0 )
                {
                    $('.card').find('[data-army-count="' + id+'-5"]').removeClass( "btn-secondary" ).addClass( "btn-warning" );    
                    can_buy = 1;
                }
                if(game.ethbalance > (troopData[id].eth*10) && troopData[id].eth > 0 )
                {
                    $('.card').find('[data-army-count="' + id+'-1000"]').removeClass( "btn-secondary" ).addClass( "btn-warning" );  
                    can_buy = 1;  
                }
    // ETH TROOP SHOW 1 PIECE

            if(can_buy==1)
            {
                $('.card').find('[data-buyarmy-button="' + id + '"]').removeClass( "btn-outline-success" ).addClass( "btn-success" );
            }
            else
            {
                $('.card').find('[data-buyarmy-button="' + id + '"]').removeClass( "btn-success" ).addClass( "btn-outline-success" );  
            }



}



function hide_upgrade(id)
{

    $('.card').find('[data-upgrade-button="' + id + '"]').hide();


    $('.card').find('[data-upgrade-own-button="' + id + '"]').show();

}


function update_booster_ui (own,price)
{
    let id = 0;

    $('.card').find('[data-price-booster="' + id+ '"]').html(precisionRound(web3.fromWei(price,'ether'),4));

    if(game.prodPerSec>0)
    {
        $('.card').find('[data-booster-button="' + id + '"]').show();    
    }

    if(own == "true")
    {
    $('.card').find('[data-booster-button="' + id + '"]').hide();

    $('.card').find('[data-booster-own-button="' + id + '"]').show();
    }


}


function generate_leaderboard()
{
    let content = "";

    for (let index = 0; index < game.leaderboard.length; index++) 
    {
            let user_data = game.leaderboard[index];
            let button = "";
            /*
            <tr>
                      <td>Address</td>
                      <td>Balance</td>
                      <td>Defense</td>
                      <td>Action</td>
            </tr>
            */
            // game.leaderboard[index][21] immunity en

         if(index>=1)
         {
                if(game.leaderboard[index][18] == game.leaderboard[index-1][18]) 
                {   
                    continue;    
                }
         }   

          if(game.leaderboard[index][21] < game.current_unixtime)  
            {

                if(game.attackpower >= parseInt(game.leaderboard[index][20])) //Attackable!
                    button = '<button type="button" onclick="leader_attack('+index+')" class="btn btn-outline-success">Click to Attack</button>';
                else // Protected
                {
                    button = '<button type="button" onclick="leader_attack('+index+')" class="btn btn-outline-secondary">Protected</button>';
                }

            }
          if(game.leaderboard[index][21] > game.current_unixtime) 
          {
            button = '<a class="btn btn-outline-danger" >Immune</a>';    
          } 

          if(game.debug == 1)
          {
            button = '<button type="button" onclick="leader_attack('+index+')" class="btn btn-outline-success">Click to Attack</button>';  
          }

          if(game.leaderboard[index][18] == game.user_address)
          {
            button = "";  
          }

            content+= "<tr>"+
            "<td style='text-align: left'>"+game.leaderboard[index][18]+"</td>"+ 
            "<td style='text-align: center'>"+show_big_values(game.leaderboard[index][17])+"</td>"+
            "<td style='text-align: center'>"+show_big_values(game.leaderboard[index][19])+"</td>"+
            "<td style='text-align: center'>"+show_big_values(game.leaderboard[index][20])+"</td>"+
            "<td style='text-align: center'>"+button+"</td>"+
            "</tr>";
    }


    return content;
}


function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }


  function show_big_values_hash (labelValue) 
  {
      // Nine Zeroes for Billions
      return Math.abs(Number(labelValue)) >= 1.0e+12
  
      ? Math.round(Math.abs(Number(labelValue) / 1.0e+12)*100) /100 + " THash"
      // Six Zeroes for Millions 
      : Math.abs(Number(labelValue)) >= 1.0e+9
  
      ? Math.round(Math.abs(Number(labelValue) / 1.0e+9)*100) /100 + " GHash"
      // Six Zeroes for Millions 
      : Math.abs(Number(labelValue)) >= 1.0e+6
  
      ? Math.round(Math.abs(Number(labelValue) / 1.0e+6)*100) /100 + " MHash"
      // Three Zeroes for Thousands
      : Math.abs(Number(labelValue)) >= 1.0e+3
  
      ? Math.round(Math.abs(Number(labelValue) / 1.0e+3)*100) /100 + " kHash"
  
      : String(Math.abs(Number(labelValue))+ " Hash");
  }


function show_big_values (labelValue) 
{
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+12

    ? Math.round(Math.abs(Number(labelValue) / 1.0e+12)*100) /100 + "T"
    // Six Zeroes for Millions 
    : Math.abs(Number(labelValue)) >= 1.0e+9

    ? Math.round(Math.abs(Number(labelValue) / 1.0e+9)*100) /100 + "B"
    // Six Zeroes for Millions 
    : Math.abs(Number(labelValue)) >= 1.0e+6

    ? Math.round(Math.abs(Number(labelValue) / 1.0e+6)*100) /100 + "M"
    // Three Zeroes for Thousands
    : Math.abs(Number(labelValue)) >= 1.0e+3

    ? Math.round(Math.abs(Number(labelValue) / 1.0e+3)*100) /100 + "k"

    : Math.abs(Number(labelValue));
}


function show_token_value (labelValue) 
{
    labelValue = precisionRound(labelValue/100000000,4);

    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+12

    ? Math.round(Math.abs(Number(labelValue) / 1.0e+12)*100) /100 + "T"
    // Six Zeroes for Millions 
    : Math.abs(Number(labelValue)) >= 1.0e+9

    ? Math.round(Math.abs(Number(labelValue) / 1.0e+9)*100) /100 + "B"
    // Six Zeroes for Millions 
    : Math.abs(Number(labelValue)) >= 1.0e+6

    ? Math.round(Math.abs(Number(labelValue) / 1.0e+6)*100) /100 + "M"
    // Three Zeroes for Thousands
    : Math.abs(Number(labelValue)) >= 1.0e+3

    ? Math.round(Math.abs(Number(labelValue) / 1.0e+3)*100) /100 + "k"

    : Math.abs(Number(labelValue));
}

function countdown (distance)
{

  if(distance>0)
  {
        distance = distance*1000; // Fukin unixtime

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        let string = hours + "h "
        + minutes + "m " + seconds + "s ";

        if(days>0)
        {
        let string = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";
        }

        return string;
  }

}


function generate_output()
{
    let content = ""


    if(game.prodPerSec==0)
    {
        content = gametext.welcome;

        return content;
    }

    if(game.console_output.length == 0)
    {
        game.console_output.push("<span>C:/Mining/RigWars >RigWarsMiner.exe --load miner</span> <br>");
    }

    // LOOP STARTED
    if(game.console_output.length > 0)
    {
         let value_factor = Math.random()*100;
         let random_text = Math.floor(Math.random() * (7 - 0) ) + 0;
         let random_text2 = Math.floor(Math.random() * (4 - 0) ) + 0;
         let random_temp = Math.floor(Math.random() * (90 - 56) ) + 56;
         let random_vent = Math.floor(Math.random() * (95 - 80) ) + 80;

        let date = new Date();


        if(game.hasbooster == "true" && value_factor>97)
        {
            game.console_output.push('<span class="claymore-gold">FUTURE: Ponzy scheme found(BITCONNEEEEEEEEEEEEEEEEEEEEEEEEEECT!)</span><br>');
        }
        else
        {
                switch (random_text) 
                {
                    case 0:
                    game.console_output.push( '<span>FUTURE: '+date.getUTCDate()+'/'+date.getMonth()+'/18 - '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+' - New job from pool.rigwars.io:4414</span>  <br>');
                        break;
                    case 1:
                    game.console_output.push( '<span class="claymore-blue">FUTURE: - Total Speed: '+show_big_values(game.prodPerSec)+' H/s, Total Shares: '+Math.floor((value_factor*34))+', Rejected: 0, Time: '+date.getHours()+':'+date.getMinutes()+'</span><br>');
                        break;
                    case 2:
                        game.console_output.push( '<span class="claymore-blue">FUTURE: - Total Speed: '+show_big_values(game.prodPerSec)+' H/s, Total Shares: '+Math.floor((value_factor*34))+', Rejected: 0, Time: '+date.getHours()+':'+date.getMinutes()+'</span><br>');
                        break;    
                    case 3:
                    game.console_output.push( '<span class="claymore-green">FUTURE: '+date.getUTCDate()+'/'+date.getMonth()+'/18 - '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+' - SHARE FOUND - (RIG '+random_text2+')</span><br>');
                        break;
                    case 4:
                    game.console_output.push( '<span class="claymore-green">FUTURE: Share accepted('+(Math.floor(value_factor+12))+'ms)!</span><br>');
                        break;
                    case 5:
                    game.console_output.push( '<span class="claymore-purple">RIG 0 t='+random_temp+'C fan='+random_vent+'%, RIG 1 t='+(random_temp-7)+'C fan='+(random_vent-3)+'%, RIG 3 t='+(random_temp+2)+'C fan='+(random_vent+5)+'%, RIG 4 t='+(random_temp-4)+'C fan='+(random_vent+3)+'%</span><br>');
                        break;
                    case 6:
                    game.console_output.push( '<span class="claymore-green">FUTURE: Share accepted('+(Math.floor(value_factor+12))+'ms)!</span><br>');
                    break;    

                    default:
                    game.console_output.push( '<span class="claymore-purple">RIG 0 t=55C fan=85%, RIG 1 t=58C fan=92%, RIG 3 t=58C fan=92%, RIG 4 t=58C fan=92%</span><br>');
                        break;
                }
        }


            if(game.console_output.length>11)
            {
                game.console_output.shift();  
            }     

    }

    for (let index = 0; index < game.console_output.length; index++) 
    {
        content += game.console_output[index]; 
    }

    return content;

}



