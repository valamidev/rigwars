
gametext = [];

gametext.error = [];

gametext.error[0] = "<p>Please install or activate your Metamask Plugin in your browser. <br> You can't play RigWars without Metamask installed.</p>";
gametext.error[1] = "<p>Your Metamask locked or you have no valid address please reload the page!</p>";
gametext.welcome = 
"<span>C:/Mining/Start > RigWarsBeta0.1.exe --tutorial</span> <br> Welcome on RigWars.io the Original Crypto Mining Idle game DAPP <br><br>"+
"- Setup your own Mining Rig and help the Futurehash network to mint more and more Coin. "+
"Being a miner is a dangerous profession recruit your own Cyber Army to protect your Coins or attack others and steal theirs.<br>"+
"Keep it up the network and your will be rewarded from the Network HODL daily!<br><br>"+
"Press Start Game Button to continue...";


/*                   price,          prod.     upgrade,        priceETH, limit
rigData[0] = RigData(100,            1,        50,             0,          100);
rigData[1] = RigData(1000,           70,       500,            0,          100);
rigData[2] = RigData(100000,         700,      50000,          0,          100);
rigData[3] = RigData(1000000,        5000,     500000,         0.01 ether, 100);
rigData[4] = RigData(80000000,       30000,    4000000,        0,          200);
rigData[5] = RigData(1900000000,     85000,    570000000,      0,          200);
rigData[6] = RigData(29000000000,    500000,   8700000000,     0,          200);
rigData[7] = RigData(300000000000,   3000000,  100000000000,   0.1 ether,  200);
rigData[8] = RigData(50000000000000, 25000000, 25000000000000, 0,          200);
*/

rigData = [];

rigData[0] = {price: 100,    eth:  0,     prod: 1,       upgrade: 50,   limit: 100};
rigData[1] = {price: 1000,     eth:  0,      prod: 70,       upgrade: 500,   limit: 100};
rigData[2] = {price: 100000,    eth:  0,       prod: 700,       upgrade: 50000,   limit: 100};
rigData[3] = {price: 0,    eth:  0.01,       prod: 5000,       upgrade: 500000,   limit: 100};
rigData[4] = {price: 80000000,   eth:  0,        prod: 30000,       upgrade: 4000000,   limit: 200};
rigData[5] = {price: 1900000000,  eth:  0,         prod: 85000,       upgrade: 570000000,   limit: 200};
rigData[6] = {price: 29000000000,   eth:  0,        prod: 500000,       upgrade: 8700000000,   limit: 200};
rigData[7] = {price: 0,   eth:  0.1,        prod: 3000000,       upgrade: 100000000000,   limit: 200};
rigData[8] = {price: 50000000000000,  eth:  0,         prod: 25000000,       upgrade: 25000000000000,   limit: 200};


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

troopData[0] = {attack: 10,  deffense: 0,    price: 100000,      ether: 0};
troopData[1] = {attack: 100,  deffense: 0,  price: 80000000,    ether: 0};
troopData[2] = {attack: 10000, deffense: 0, price: 0,           ether: 0.01};
troopData[3] = {attack: 0,    deffense: 15,  price: 100000,      ether: 0};
troopData[4] = {attack: 0,  deffense: 150,  price: 80000000,    ether: 0};
troopData[5] = {attack: 0, deffense: 15000, price: 0,           ether: 0.01};

