import React from 'react';

//Graveyard ecosystem logos
import tombLogoPNG from '../../assets/img/crypto_tomb_cash.f2b44ef4.png';
import tShareLogoPNG from '../../assets/img/crypto_tomb_share.bf1a6c52.png';

import tombFtmLpLogo from '../../assets/img/tomb_ftm_lp.png';
import tshareFtmLpLogo from '../../assets/img/tshare_ftm_lp.png';

import wftmLogo from '../../assets/img/ftm_logo_blue.svg';
import booLogo from '../../assets/img/spooky.png';
import zooLogo from '../../assets/img/zoo_logo.svg';
import shibaLogo from '../../assets/img/shiba_logo.svg';

import dukeUsdcLpLogo from '../../assets/img/DUKE_USDC.png';
import dshareUsdcLpLogo from '../../assets/img/DSHARE_USDC.png';
import usdcLogo from '../../assets/img/USDC.png';
import dukeLogo from '../../assets/img/DUKE.png';
import dbondLogo from '../../assets/img/DBOND.png';
import dshareLogo from '../../assets/img/DSHARE.png';

const logosBySymbol: { [title: string]: string } = {
  //Real tokens
  //=====================
  TOMB: dukeLogo,//tombLogo,
  TOMBPNG: tombLogoPNG,
  TSHAREPNG: tShareLogoPNG,
  TSHARE: dshareLogo,//tShareLogo,
  TBOND: dbondLogo,//tBondLogo,
  WFTM: wftmLogo,
  BOO: booLogo,
  SHIBA: shibaLogo,
  ZOO: zooLogo,
  USDC: usdcLogo,
  DSHARE: dshareLogo,
  DBOND: dbondLogo,
  DUKE: dukeLogo,
  'DUKE-USDC-LP': dukeUsdcLpLogo,
  'DSHARE-USDC-LP': dshareUsdcLpLogo,
  'TOMB-FTM-LP': tombFtmLpLogo,
  'TSHARE-FTM-LP': tshareFtmLpLogo,
};

type LogoProps = {
  symbol: string;
  size?: number;
  width?: number;
};

const TokenSymbol: React.FC<LogoProps> = ({ symbol, size = 64, width=undefined }) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid Token Logo symbol: ${symbol}`);
  }
  return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={width? width:size} height={size} />;
};

export default TokenSymbol;
