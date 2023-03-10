// import { ChainId } from '@pancakeswap-libs/sdk';
import { ChainId } from '@spookyswap/sdk';
import { Configuration } from './tomb-finance/config';
import { BankInfo } from './tomb-finance';

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: ChainId.MAINNET,
    networkName: 'Arbitrum One',
    ftmscanUrl: 'https://explorer.arbitrum.io',
    defaultProvider: 'https://arb-mainnet.g.alchemy.com/v2/CZTZiGD6wtwwVUbmEcPc-l8YQWQSNeXf',
    deployments: require('./tomb-finance/deployments/deployments.testing.json'),
    externalTokens: {
      WFTM: ['0xf1277d1ed8ad466beddf92ef448a132661956621', 18],
      FUSDT: ['0xb7f24e6e708eabfaa9e64b40ee21a5adbffb51d6', 6],
      BOO: ['0x14f0C98e6763a5E13be5CE014d36c2b69cD94a1e', 18],
      ZOO: ['0x2317610e609674e53D9039aaB85D8cAd8485A7c5', 0],
      SHIBA: ['0x39523112753956d19A3d6a30E758bd9FF7a8F3C0', 9],
      USDC: ['0x03e3549b666D8e7248665c9015173eced59965Ec', 6],
      'USDT-FTM-LP': ['0xE7e3461C2C03c18301F66Abc9dA1F385f45047bA', 18],
      'TOMB-FTM-LP': ['0x13Fe199F19c8F719652985488F150762A5E9c3A8', 18],
      'TSHARE-FTM-LP': ['0x20bc90bB41228cb9ab412036F80CE4Ef0cAf1BD5', 18],
      'TOMB-USDC-LP': ['0x870DcE100267f9beac25d194887973808be8C6a7', 18],
    },
    baseLaunchDate: new Date('2021-06-02 13:00:00Z'),
    bondLaunchesAt: new Date('2020-12-03T15:00:00Z'),
    masonryLaunchesAt: new Date('2020-12-11T00:00:00Z'),
    refreshInterval: 10000,
  },
  production: {
    chainId: ChainId.MAINNET,
    networkName: 'Arbitrum One',
    ftmscanUrl: 'https://explorer.arbitrum.io',
    defaultProvider: 'https://arb-mainnet.g.alchemy.com/v2/CZTZiGD6wtwwVUbmEcPc-l8YQWQSNeXf',
    deployments: require('./tomb-finance/deployments/deployments.testing.json'),
    externalTokens: {
      WFTM: ['0xf1277d1ed8ad466beddf92ef448a132661956621', 18],
      FUSDT: ['0xb7f24e6e708eabfaa9e64b40ee21a5adbffb51d6', 6],
      BOO: ['0x14f0C98e6763a5E13be5CE014d36c2b69cD94a1e', 18],
      ZOO: ['0x2317610e609674e53D9039aaB85D8cAd8485A7c5', 0],
      SHIBA: ['0x39523112753956d19A3d6a30E758bd9FF7a8F3C0', 9],
      USDC: ['0x03e3549b666D8e7248665c9015173eced59965Ec', 6],
      'USDT-FTM-LP': ['0xE7e3461C2C03c18301F66Abc9dA1F385f45047bA', 18],
      'TOMB-FTM-LP': ['0x13Fe199F19c8F719652985488F150762A5E9c3A8', 18],
      'TSHARE-FTM-LP': ['0x20bc90bB41228cb9ab412036F80CE4Ef0cAf1BD5', 18],
      'TOMB-USDC-LP': ['0x870DcE100267f9beac25d194887973808be8C6a7', 18],
    },
    baseLaunchDate: new Date('2021-06-02 13:00:00Z'),
    bondLaunchesAt: new Date('2020-12-03T15:00:00Z'),
    masonryLaunchesAt: new Date('2020-12-11T00:00:00Z'),
    refreshInterval: 10000,
  },
};

export const bankDefinitions: { [contractName: string]: BankInfo } = {
  /*
  Explanation:
  name: description of the card
  poolId: the poolId assigned in the contract
  sectionInUI: way to distinguish in which of the 3 pool groups it should be listed
        - 0 = Single asset stake pools
        - 1 = LP asset staking rewarding TOMB
        - 2 = LP asset staking rewarding TSHARE
  contract: the contract name which will be loaded from the deployment.environmnet.json
  depositTokenName : the name of the token to be deposited
  earnTokenName: the rewarded token
  finished: will disable the pool on the UI if set to true
  sort: the order of the pool
  */

  /*
  TombFtmRewardPool: {
    name: 'Earn TOMB by FTM',
    poolId: 0,
    sectionInUI: 0,
    contract: 'TombFtmRewardPool',
    depositTokenName: 'WFTM',
    earnTokenName: 'TOMB',
    finished: false,
    sort: 1,
    closedForStaking: true,
  },
  TombBooRewardPool: {
    name: 'Earn TOMB by BOO',
    poolId: 1,
    sectionInUI: 0,
    contract: 'TombBooGenesisRewardPool',
    depositTokenName: 'BOO',
    earnTokenName: 'TOMB',
    finished: false,
    sort: 2,
    closedForStaking: true,
  },
  TombShibaRewardPool: {
    name: 'Earn TOMB by SHIBA',
    poolId: 2,
    sectionInUI: 0,
    contract: 'TombShibaGenesisRewardPool',
    depositTokenName: 'SHIBA',
    earnTokenName: 'TOMB',
    finished: false,
    sort: 3,
    closedForStaking: true,
  },
  TombZooRewardPool: {
    name: 'Earn TOMB by ZOO',
    poolId: 3,
    sectionInUI: 0,
    contract: 'TombZooGenesisRewardPool',
    depositTokenName: 'ZOO',
    earnTokenName: 'TOMB',
    finished: false,
    sort: 4,
    closedForStaking: true,
  },
  TombFtmLPTombRewardPool: {
    name: 'Earn TOMB by TOMB-FTM LP',
    poolId: 0,
    sectionInUI: 1,
    contract: 'TombFtmLpTombRewardPool',
    depositTokenName: 'TOMB-FTM-LP',
    earnTokenName: 'TOMB',
    finished: false,
    sort: 5,
    closedForStaking: true,
  },
  TombFtmLPTombRewardPoolOld: {
    name: 'Earn TOMB by TOMB-FTM LP',
    poolId: 0,
    sectionInUI: 1,
    contract: 'TombFtmLpTombRewardPoolOld',
    depositTokenName: 'TOMB-FTM-LP',
    earnTokenName: 'TOMB',
    finished: true,
    sort: 9,
    closedForStaking: true,
  },
  TombFtmLPTShareRewardPool: {
    name: 'Earn TSHARE by TOMB-FTM LP',
    poolId: 0,
    sectionInUI: 2,
    contract: 'TombFtmLPTShareRewardPool',
    depositTokenName: 'TOMB-FTM-LP',
    earnTokenName: 'TSHARE',
    finished: false,
    sort: 6,
    closedForStaking: false,
  },
  TshareFtmLPTShareRewardPool: {
    name: 'Earn TSHARE by TSHARE-FTM LP',
    poolId: 1,
    sectionInUI: 2,
    contract: 'TshareFtmLPTShareRewardPool',
    depositTokenName: 'TSHARE-FTM-LP',
    earnTokenName: 'TSHARE',
    finished: false,
    sort: 7,
    closedForStaking: false,
  },
  */
  //============USDC==============//
  TombUsdcLPTombRewardPool: {
    name: 'Earn TOMB by TOMB-USDC LP',
    poolId: 0,
    sectionInUI: 0,
    contract: 'TombGenesisRewardPool',
    depositTokenName: 'TOMB-USDC-LP',
    earnTokenName: 'TOMB',
    finished: false,
    sort: 5,
    closedForStaking: true,
  },
  TombUsdcRewardPool: {
    name: 'Earn TOMB by USDC',
    poolId: 1,
    sectionInUI: 0,
    contract: 'TombGenesisRewardPool',
    depositTokenName: 'USDC',
    earnTokenName: 'TOMB',
    finished: false,
    sort: 4,
    closedForStaking: true,
  },
};

export default configurations[process.env.NODE_ENV || 'development'];
