function update_dash()
{

    $('#networkhodl').html('Network HODL Coin: '+show_big_values(game.networkhodl));
    $('#networkpot').html('Network HODL <i class="fab fa-ethereum"></i>: '+game.networkpot);
    $('#networkhash').html('Network hash: '+show_big_values(game.networkhash)+' Hash /s');
    $('#networkshare').html('Your Network Share: '+personal_share()+"%");


    $('#balance').html(show_big_values(game.futurebalance));
    $('#prodPerSec').html(show_big_values(game.prodPerSec)+" Hash/s");

    if(game.prodPerSec>0)
    {
        $('#start').hide();  
    }

    var daily_income =  parseInt(game.prodPerSec)*86400;
    $('#prodPerDay').html(show_big_values(daily_income)+" /day");

    $('#exhaust').html(game.countdownexhaust);
    $('#immunity').html(game.countdownimmune);

    $('#attackpower').html(game.attackpower);
    $('#defensepower').html(parseInt(game.defensepower*1.25));


    
}

function update_dash_slow()
{
    $('.mining-anim').html(generate_output());
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
    $('.card').find('[data-price-next-army="' + id+'-1"]').html(show_big_values(cost_next));

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

    $('.card').find('[data-price-booster="' + id+ '"]').html(web3.fromWei(price,'ether'));

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

            console.log(user_data);

          if(game.leaderboard[index][21] < game.current_unixtime)  
            {

                if(game.attackpower > parseInt(game.leaderboard[index][20])) //Attackable!
                    button = '<button type="button" onclick="leader_attack('+index+')" class="btn btn-outline-success">Attackable</button>';
                else // Protected
                {
                    button = '<a class="btn btn-outline-secondary" >Protected</a>';  
                }

            }
          if(game.leaderboard[index][21] > game.current_unixtime) 
          {
            button = '<a class="btn btn-outline-secondary" >Immune</a>';    
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
        console.log(game.console_output);
    }

    // LOOP STARTED
    if(game.console_output.length > 0)
    {
         let value_factor = Math.random()*100;
         let random_text = Math.floor(Math.random() * (5 - 0) ) + 0;

        switch (random_text) 
        {
            case 0:
            game.console_output.push( '<span>FUTURE: 08/04/18 - 10:10:03 - New job from pool.rigwars.io:4414</span>  <br>');
                break;
            case 1:
            game.console_output.push( '<span class="claymore-blue">FUTURE: - Total Speed: '+show_big_values(game.prodPerSec)+' H/s, Total Shares: '+Math.floor((value_factor*34))+', Rejected: 0, Time: 184:56</span><br>');
                break;
            case 2:
            game.console_output.push( '<span class="claymore-green">FUTURE: 08/04/18 - 10:10:04 - SHARE FOUND - (RIG 0)</span><br>');
                break;
            case 3:
            game.console_output.push( '<span class="claymore-green">FUTURE: Share accepted('+(Math.floor(value_factor+12))+'ms)!</span><br>');
                break;
            case 4:
            game.console_output.push( '<span class="claymore-purple">RIG 0 t=55C fan=85%, RIG 1 t=58C fan=92%, RIG 3 t=58C fan=92%, RIG 4 t=58C fan=92%</span><br>');
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

