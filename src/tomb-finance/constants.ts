import { BigNumber } from 'ethers';

export const DECIMALS_6 = BigNumber.from(10).pow(6);

export const BOND_REDEEM_PRICE = 1.01;
export const BOND_REDEEM_PRICE_BN = DECIMALS_6.mul(101).div(100);
