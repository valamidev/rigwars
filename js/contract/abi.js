 abi  = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "idx",
				"type": "uint256"
			}
		],
		"name": "BuyUpgrade",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "minerAddr",
				"type": "address"
			}
		],
		"name": "GetProductionPerSecond",
		"outputs": [
			{
				"name": "personalProduction",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "ATTACKER_END_IDX",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "rigIdx",
				"type": "uint8"
			}
		],
		"name": "GetRigData",
		"outputs": [
			{
				"name": "price",
				"type": "uint256"
			},
			{
				"name": "production",
				"type": "uint256"
			},
			{
				"name": "upgrade",
				"type": "uint256"
			},
			{
				"name": "limit",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "idx",
				"type": "uint8"
			}
		],
		"name": "DEBUGSetUpgrades",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "UpdateMoney",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "money",
				"type": "uint256"
			}
		],
		"name": "DEBUGSetMoney",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "WithdrawPotShare",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "rigIdx",
				"type": "uint256"
			},
			{
				"name": "count",
				"type": "uint256"
			},
			{
				"name": "owned",
				"type": "uint256"
			}
		],
		"name": "GetPriceOfRigs",
		"outputs": [
			{
				"name": "price",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "NUMBER_OF_TROOPS",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "GetGlobalProduction",
		"outputs": [
			{
				"name": "globalMoney",
				"type": "uint256"
			},
			{
				"name": "globalHashRate",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "addr",
				"type": "address"
			}
		],
		"name": "GetPVPData",
		"outputs": [
			{
				"name": "attackpower",
				"type": "uint256"
			},
			{
				"name": "defensepower",
				"type": "uint256"
			},
			{
				"name": "immunityTime",
				"type": "uint256"
			},
			{
				"name": "exhaustTime",
				"type": "uint256"
			},
			{
				"name": "troops",
				"type": "uint256[6]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "rigIdx",
				"type": "uint8"
			},
			{
				"name": "count",
				"type": "uint256"
			}
		],
		"name": "DEBUGSetRig",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "GetPotInfo",
		"outputs": [
			{
				"name": "_honeyPotAmount",
				"type": "uint256"
			},
			{
				"name": "_devFunds",
				"type": "uint256"
			},
			{
				"name": "_potShare",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "rigIdx",
				"type": "uint8"
			},
			{
				"name": "count",
				"type": "uint256"
			}
		],
		"name": "UpgradeRig",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "SnapshotAndDistributePot",
		"outputs": [
			{
				"name": "networkMoney",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "DEFENDER_END_IDX",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "NUMBER_OF_RIG_TYPES",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "idx",
				"type": "uint256"
			},
			{
				"name": "count",
				"type": "uint256"
			},
			{
				"name": "owned",
				"type": "uint256"
			}
		],
		"name": "GetPriceOfTroops",
		"outputs": [
			{
				"name": "price",
				"type": "uint256"
			},
			{
				"name": "priceETH",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "ATTACKER_START_IDX",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "GetTotalMinerCount",
		"outputs": [
			{
				"name": "count",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "NUMBER_OF_UPGRADES",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "BuyHandler",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "addr",
				"type": "address"
			}
		],
		"name": "HasBooster",
		"outputs": [
			{
				"name": "hasBoost",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "GetNumberOfRigs",
		"outputs": [
			{
				"name": "rigNum",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "WithdrawDevFunds",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "idx",
				"type": "uint256"
			},
			{
				"name": "count",
				"type": "uint256"
			}
		],
		"name": "BuyTroop",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "defenderAddr",
				"type": "address"
			}
		],
		"name": "Attack",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "GetBoosterData",
		"outputs": [
			{
				"name": "_boosterHolders",
				"type": "address[5]"
			},
			{
				"name": "currentPrice",
				"type": "uint256"
			},
			{
				"name": "currentIndex",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "minerAddr",
				"type": "address"
			}
		],
		"name": "GetMinerData",
		"outputs": [
			{
				"name": "money",
				"type": "uint256"
			},
			{
				"name": "lastupdate",
				"type": "uint256"
			},
			{
				"name": "prodPerSec",
				"type": "uint256"
			},
			{
				"name": "rigs",
				"type": "uint256[9]"
			},
			{
				"name": "upgrades",
				"type": "uint256[3]"
			},
			{
				"name": "unclaimedPot",
				"type": "uint256"
			},
			{
				"name": "lastPot",
				"type": "uint256"
			},
			{
				"name": "hasBooster",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "idx",
				"type": "uint256"
			}
		],
		"name": "GetMinerAt",
		"outputs": [
			{
				"name": "minerAddr",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "NUMBER_OF_BOOSTERS",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "DEFENDER_START_IDX",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "StartNewMiner",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "BuyBooster",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	}
];