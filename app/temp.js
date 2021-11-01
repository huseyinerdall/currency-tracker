let fs = require('fs');
const path = require('path');
/*
Bitcoin
Ethereum
Binance Coin
Polkadot
Cardano
Tether
XRP
Uniswap
Litecoin
Chainlink
Bitcoin Cash
Stellar
USD Coin
Dogecoin
Wrapped Bitcoin
Theta Network
NEM
Aave
Cosmos
OKB
Terra
Crypto.com Coin
VeChain
Avalanche
Monero
Solana
EOS
TRON
IOTA
Bitcoin SV
Synthetix Network Token
Binance USD
FTX Token
Tezos
Huobi Token
NEO
Algorand
Kusama
Elrond
Dai
cDAI
The Graph
cETH
Dash
Filecoin
Sushi
Decred
Compound
Celsius Network
cUSDC
Maker
LEO Token
Near
PancakeSwap
Polygon
Enjin Coin
Huobi BTC
Zilliqa
Ravencoin
Hedera Hashgraph
THORChain
Zcash
UMA
SwissBorg
Ethereum Classic
Bancor Network Token
Chiliz
yearn.finance
NEXO
Voyager Token
Fantom
Stacks
REN
Basic Attention Token
ICON
0x
Flow
Waves
BitTorrent
Amp
Reserve Rights Token
Ontology
IOST
xSUSHI
TerraUSD
DigiByte
Nano
Paxos Standard
Loopring
renBTC
OMG Network
Bitmax Token
Decentraland
Qtum
Arweave
1inch
Pundi X
Ocean Protocol
Bitcoin Gold
Holo
Siacoin
ZKSwap
Curve DAO Token
Mdex
HUSD
Horizen
Quant
Energy Web Token
Balancer
Nexus Mutual
Golem
Lisk
Venus
XDC Network
Alpha Finance
Kyber Network
KuCoin Token
Reef Finance
Orion Protocol
Ampleforth
Harmony
DODO
Helium
Klever
Verge
Celo
Status
Polymath Network
SAND
Badger DAO
Nervos Network
Lido Staked Ether
Fetch.ai
Band Protocol
Bitcoin Cash ABC
Mirror Protocol
cUNI
SKALE
cUSDT
Serum
COTI
LUKSO Token
Civic
TrueUSD
Ankr
GateToken
Swipe
sUSD
MaidSafeCoin
Aave [OLD]
Polkastarter
Telcoin
WAX
Kava.io
IoTeX
NuCypher
Gala
Ultra
Numeraire
RedFOX Labs
Axie Infinity
Electroneum
Gnosis
RSK Infrastructure Framework
Ardor
OriginTrail
Ark
Tokamak Network
Bitcoin Diamond
sETH
SafePal
Secret
SingularityNET
Trustswap
UTRUST
district0x
TomoChain
Oasis Network
Akash Network
MATH
Augur
VeThor Token
FunFair
BTC Standard Hashrate Token
Dent
Trust Wallet Token
Sora
WHALE
Shabu Shabu
Komodo
Aragon
WINk
Rocket Pool
DerivaDAO
saffron.finance
Haven
Injective Protocol
Raydium
Steem
Audius
Neutrino USD
Litentry
Keep Network
Hathor
CoinMetro
Origin Protocol
c0x
BitShares
Unibright
iExec RLC
LTO Network
MonaCoin
Hifi Finance
Perpetual Protocol
Divi
Syntropy
Wanchain
Edgeware
Gas
Rari Governance Token
Aave USDC v1
Power Ledger
IRISnet
Tether Gold
Stratis
sBTC
JulSwap
Bytom
DeFiPulse Index
elf
PAX Gold
Vai
Tokenlon
Linear
Celer Network
Syscoin
Mask Network
Hive
Travala.com
KeeperDAO
Rarible
Reddcoin
NFTX
e-Radix
Loom Network
QuarkChain
Gemini Dollar
Atari
API3
PARSIQ
*/
/*
const prev = require('./static/seo.json');
const next = require('./static/seooo.json');
let temp = {};
let i = 0;
for (const key in prev) {
    console.log(key)
    temp[key] = next[i];
    i++;
}

fs.writeFileSync("./static/new.json",JSON.stringify(temp),(err) => {
    res.send("NO");
});*/

const testFolder = './public/avatars/';
let temp = [];
fs.readdir(testFolder, (err, files) => {
    console.log(files)
    fs.writeFileSync("./static/avatars.json",JSON.stringify(files),(err) => {
        console.log(err)
    });
    files.forEach(file => {
        temp.push(file);
    });
});


