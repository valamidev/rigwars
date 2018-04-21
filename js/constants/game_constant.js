
gametext = [];

gametext.error = [];

gametext.error[0] = "<p>Please install or activate your Metamask Plugin in your browser. <br> You can't play RigWars without Metamask installed.</p>";
gametext.error[1] = "<p>Your Metamask locked or you have no valid address please reload the page!</p>";

/*
        rigData[0] = RigData(100,            1,        50,             100);
        rigData[1] = RigData(1000,           70,       500,            100);
        rigData[2] = RigData(100000,         700,      50000,          100);
        rigData[3] = RigData(1000000,        5000,     500000,         100);
        rigData[4] = RigData(80000000,       30000,    4000000,        100);
        rigData[5] = RigData(1900000000,     85000,    570000000,      100);
        rigData[6] = RigData(29000000000,    500000,   8700000000,     100);
        rigData[7] = RigData(300000000000,   3000000,  100000000000,   100);
        rigData[8] = RigData(50000000000000, 25000000, 25000000000000, 100);
*/

rigData = [];

rigData[0] = {price: 100,           prod: 1,       upgrade: 50,   limit: 100};
rigData[1] = {price: 1000,           prod: 70,       upgrade: 500,   limit: 100};
rigData[2] = {price: 100000,           prod: 700,       upgrade: 50000,   limit: 100};
rigData[3] = {price: 1000000,           prod: 5000,       upgrade: 500000,   limit: 100};
rigData[4] = {price: 80000000,           prod: 30000,       upgrade: 4000000,   limit: 100};
rigData[5] = {price: 1900000000,           prod: 85000,       upgrade: 570000000,   limit: 100};
rigData[6] = {price: 29000000000,           prod: 500000,       upgrade: 8700000000,   limit: 100};
rigData[7] = {price: 300000000000,           prod: 3000000,       upgrade: 100000000000,   limit: 100};
rigData[8] = {price: 50000000000000,           prod: 25000000,       upgrade: 25000000000000,   limit: 100};


/*
        boostData[0] = BoostData(30, 0.001 ether);
        boostData[1] = BoostData(50, 0.1 ether);
        boostData[2] = BoostData(100, 1 ether);
*/
boostData = [];

boostData[0] = {bonus: 30, price: 0.001};
boostData[1] = {bonus: 50, price: 0.1};
boostData[2] = {bonus: 100, price: 1};

/*
        troopData[0] = TroopData(1,     0,     100000,   0);
        troopData[1] = TroopData(100,   0,     80000000, 0);
        troopData[2] = TroopData(10000, 0,     0,        0.01 ether);
        troopData[3] = TroopData(0,     1,     100000,   0);
        troopData[4] = TroopData(0,     100,   80000000, 0);
        troopData[5] = TroopData(0,     10000, 0,        0.01 ether);
*/


troopData = [];

troopData[0] = {attack: 1,  deffense: 0,    price: 100000,      ether: 0};
troopData[1] = {attack: 100,  deffense: 0,  price: 80000000,    ether: 0};
troopData[2] = {attack: 10000, deffense: 0, price: 0,           ether: 0.01};
troopData[3] = {attack: 0,    deffense: 1,  price: 100000,      ether: 0};
troopData[4] = {attack: 0,  deffense: 100,  price: 80000000,    ether: 0};
troopData[5] = {attack: 0, deffense: 10000,  price: 0,          ether: 0.01};

