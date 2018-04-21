
// START GAME BUTTON
$(function(){
    $("#start").click(function(){
        start_game_contract();
    });
});

$(function(){
    $("#save_game").click(function(){
        save_game();
    });
});

$(function(){
    $("#withdraw1").click(function(){
        WithdrawDevFunds();
    });
});

$(function(){
    $("#debug_gold").click(function(){
        debug_gold();
    });
});

$(function(){
    $("#debug_attack").click(function(){
        attack_address("0x6c9ab3a2cd5a104cec2bf019c7377d16dc54de96"); // DEBUG ADDRESS!
    });
});

$(function(){
    $("#leaderboard").click(function(){

        $('#leaderboard_modal_content').html(generate_leaderboard());
        $('#leaderboard_modal').modal('show');
        
    });
});

$(function(){
    $("#showrig").click(function(){
        if(window.showrig==1)
        {
            window.showrig = 0;
            window.showarmy = 1;
        }
        else
        {
            window.showrig = 1;
            window.showarmy = 0;
        }
    });
});

$(function(){
    $("#showarmy").click(function(){
        if(window.showarmy==1)
        {
            window.showarmy = 0;
            window.showrig = 1;
        }
        else
        {
            window.showarmy = 1;
            window.showrig = 0;
        }
    });
});




//$('#metamask_alert').modal('show');


// RIG BUY
$(function(){

        // BUY BUTTON!
        $(".buy_rig").click(function(){

            buy_action_rig($(this).closest(".card").data('card'));

        });

        // BUY TOGGLE! RIG!
        $('.buy_toggle .btn').on('click', function(event) {

            var count = $(this).find('input').val();
            /* Data: category,id,count, */
            var str = $(this).closest(".card").data('card');
            var res = str.split("-", 3);

            var nem_data = res[0]+"-"+res[1]+"-"+count;

            $(this).closest(".card").data('card',nem_data);

        });


        // BUY BUTTON ARMY!
        $(".buy_army").click(function(){

           // console.log($(this).closest(".card").data('card'));

           buy_action_army($(this).closest(".card").data('card'));

        });



        // BUY UPGRADE!
        $(".buy_upgrade").click(function(){

            buy_action_upgrade($(this).closest(".card").data('card'));

        });

        $(".buy_booster").click(function(){

            buy_boost_button();

        });

        


});  