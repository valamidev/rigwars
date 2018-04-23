function update_dash()
{
    $('#balance').html(show_big_values(game.futurebalance));
    $('#prodPerSec').html(show_big_values(game.prodPerSec)+" Hash/s");

    $('#exhaust').html(game.countdownexhaust);
    $('#immunity').html(game.countdownimmune);

}

function update_dash_slow()
{
    $('#networkhodl').html('Network HODL: '+show_big_values(game.networkhodl));
    $('#networkpot').html('Network HODL: '+precisionRound(game.networkpot,4)+'<i class="fab fa-ethereum"></i>');
    $('#networkhash').html('Network hash: '+show_big_values(game.networkhash)+' Hash /s');
    $('#networkshare').html('Your Network Share: '+personal_share()+"%");
    $('#unclaimedshare').html('Unlcaimed share: : '+personal_share_eth(personal_share()));

    $('.mining-anim').html(generate_output());

    if(game.debug==0)
    {
       $('#debug').hide();   
    }

    if(game.prodPerSec>0)
    {
        $('#start').hide();  
        $('#save_game').show();
        $('#withdraw1').show();
    }
    else
    {
        $('#save_game').hide();
        $('#withdraw1').hide(); 
    }

    var daily_income =  parseInt(game.prodPerSec)*86400;
    $('#prodPerDay').html(show_big_values(daily_income)+" /day");

    $('#attackpower').html(game.attackpower);
    $('#defensepower').html(game.defensepower);
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

function personal_share_eth()
{
    if(game.unclaimedPot>= 0.0001 )
    {

     return precisionRound(game.unclaimedPot,4)+'<i class="fab fa-ethereum"></i>';
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

    /*<!-- Data: category,id -->*/
    $('.card').find('[data-owned-count-rig="' + id + '"]').html(count+'X');

    if(count==100)
    {
        $('.card').find('[data-buyrig-button="' + id + '"]').hide();

        $('.card').find('[data-maxrig-button="' + id + '"]').show();  
    }

    // Change Color of Select Buy Buttons!

    $('.card').find('[data-price-next-rig="' + id+'-1"]').html(show_big_values(cost_next));  


    if(possible_buy >= 1 && rigData[id].price > 0)
    {
            $('.card').find('[data-price-next-rig="' + id+'-1"]').html(show_big_values(cost_next));
            $('.card').find('[data-buyrig-count="' + id+'-1"]').removeClass( "btn-secondary" ).addClass( "btn-primary" );  
            $('.card').find('[data-buyrig-count="' + id+'-1000"]').removeClass( "btn-secondary" ).addClass( "btn-primary" ); 
    }
    if(possible_buy >= 5 && rigData[id].price > 0)
    {
        $('.card').find('[data-buyrig-count="' + id+'-5"]').removeClass( "btn-secondary" ).addClass( "btn-primary" );  
    }
}


function update_army_ui(id,count,possible_buy,cost_next)
{
    if(window.showarmy==0)
    $('[data-card="3-' + id + '-1"]').hide();

    if(window.showarmy==1)
        $('[data-card="3-' + id + '-1"]').show();    


    $('.card').find('[data-owned-count-army="' + id + '"]').html(count+'X');

    if(troopData[id].ether == 0)
    {
        $('.card').find('[data-price-next-army="' + id+'-1"]').html(show_big_values(cost_next));
    }



    if(possible_buy >= 1)
    {
            $('.card').find('[data-army-count="' + id+'-1"]').removeClass( "btn-secondary" ).addClass( "btn-primary" );  
            $('.card').find('[data-army-count="' + id+'-1000"]').removeClass( "btn-secondary" ).addClass( "btn-primary" ); 
    }
    if(possible_buy >= 5)
    {
        $('.card').find('[data-army-count="' + id+'-5"]').removeClass( "btn-secondary" ).addClass( "btn-primary" );  
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

    if(own == "true")
    {
    $('.card').find('[data-booster-button="' + id + '"]').hide();

    $('.card').find('[data-booster-own-button="' + id + '"]').show();
    }

}


function generate_leaderboard()
{
    let content = "";

    for (let index = 0; index < game.leaderboard.length; index++) {
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

          if(game.leaderboard[index][21] < game.current_unixtime)  
            {

                if(game.attackpower > parseInt(game.leaderboard[index][20])) //Attackable!
                    button = '<button type="button" onclick="leader_attack('+index+')" class="btn btn-outline-success">Click to Attack</button>';
                else // Protected
                {
                    button = '<a class="btn btn-outline-secondary" >Protected</a>';  
                }

            }
          if(game.leaderboard[index][21] > game.current_unixtime) 
          {
            button = '<a class="btn btn-outline-secondary" >Immune</a>';    
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
            "<td>"+game.leaderboard[index][18]+"</td>"+ 
            "<td>"+show_big_values(game.leaderboard[index][0])+"</td>"+
            "<td>"+game.leaderboard[index][20]+"</td>"+
            "<td>"+button+"</td>"+
            "</tr>";
    }


    return content;
}


function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
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

    ? Math.round(Math.abs(Number(labelValue) / 1.0e+3)*100) /100 + "K"

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
         let random_text = Math.floor(Math.random() * (6 - 0) ) + 0;
         let random_temp = Math.floor(Math.random() * (90 - 56) ) + 56;
         let random_vent = Math.floor(Math.random() * (95 - 80) ) + 80;

        let date = new Date();

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
            game.console_output.push( '<span class="claymore-green">FUTURE: '+date.getUTCDate()+'/'+date.getMonth()+'/18 - '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+' - SHARE FOUND - (RIG '+random_text+')</span><br>');
                break;
            case 4:
            game.console_output.push( '<span class="claymore-green">FUTURE: Share accepted('+(Math.floor(value_factor+12))+'ms)!</span><br>');
                break;
            case 5:
            game.console_output.push( '<span class="claymore-purple">RIG 0 t='+random_temp+'C fan='+random_vent+'%, RIG 1 t='+(random_temp-7)+'C fan='+(random_vent-3)+'%, RIG 3 t='+(random_temp+2)+'C fan='+(random_vent+5)+'%, RIG 4 t='+(random_temp-4)+'C fan='+(random_vent+3)+'%</span><br>');
                break;

            default:
            game.console_output.push( '<span class="claymore-purple">RIG 0 t=55C fan=85%, RIG 1 t=58C fan=92%, RIG 3 t=58C fan=92%, RIG 4 t=58C fan=92%</span><br>');
                break;
        }

            if(game.console_output.length>6)
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

