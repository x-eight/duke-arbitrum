import React, { useCallback, useMemo } from 'react';
import Page from '../../components/Page';
import { createGlobalStyle } from 'styled-components';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import UnlockWallet from '../../components/UnlockWallet';
import PageHeader from '../../components/PageHeader';
import ExchangeCard from './components/ExchangeCard';
import styled from 'styled-components';
import Spacer from '../../components/Spacer';
import useBondStats from '../../hooks/useBondStats';
import useTombFinance from '../../hooks/useTombFinance';
import useCashPriceInLastTWAP from '../../hooks/useCashPriceInLastTWAP';
import { useTransactionAdder } from '../../state/transactions/hooks';
import ExchangeStat from './components/ExchangeStat';
import useTokenBalance from '../../hooks/useTokenBalance';
import { getDisplayBalance } from '../../utils/formatBalance';
import { BOND_REDEEM_PRICE, BOND_REDEEM_PRICE_BN } from '../../tomb-finance/constants';
import { useAddPopup } from '../../state/application/hooks';

const BackgroundImage = createGlobalStyle`
  body {
    background-image: radial-gradient(at 2rem 2rem ,rgb(175, 163, 163),rgb(7, 7, 7),rgb(133, 123, 123)) !important;
    background-size: cover !important;
  }
`;

const Pit: React.FC = () => {
  const { path } = useRouteMatch();
  const { account } = useWallet();
  const tombFinance = useTombFinance();
  const addTransaction = useTransactionAdder();
  const bondStat = useBondStats();
  const cashPrice = useCashPriceInLastTWAP();

  const bondBalance = useTokenBalance(tombFinance?.DBOND);

  const addPopup = useAddPopup();

  const handleBuyBonds = useCallback(
    async (amount: string) => {
      //const tx = await tombFinance.buyBonds(amount);
      //addTransaction(tx, {summary: `Buy ${Number(amount).toFixed(2)} DBOND with ${amount} DUKE`});
      const summary=`Buy ${Number(amount).toFixed(2)} DBOND with ${amount} DUKE`
      tombFinance.buyBonds(amount).then((tx) => addTransaction(tx, { summary }))
      .catch((err) => {
        if (err.message.includes('User denied')) {
          // User denied transaction signature on MetaMask.
          return;
        }
        const message = `Unable to ${summary[0].toLowerCase()}${summary.slice(1)}`;
        console.error(`${message}: ${err.message || err.stack}`);
        addPopup({ error: { message, stack: err.message || err.stack } });

      });
    
    },
    [addPopup, tombFinance, addTransaction],
  );

  const handleRedeemBonds = useCallback(
    async (amount: string) => {
      const tx = await tombFinance.redeemBonds(amount);
      addTransaction(tx, { summary: `Redeem ${amount} DBOND` });
    },
    [tombFinance, addTransaction],
  );

  const isBondRedeemable = useMemo(() => cashPrice.gt(BOND_REDEEM_PRICE_BN), [cashPrice]);
  const isBondPurchasable = useMemo(() => Number(bondStat?.tokenInFtm) < 1.0, [bondStat]);
  
  return (
    <Switch>
      <Page>
        <BackgroundImage />
        {!!account ? (
          <>
            <Route exact path={path}>
              <PageHeader icon={'🏦'} title="Buy & Redeem Bonds" subtitle="Earn premiums upon redemption" />
            </Route>
            <StyledBond>
              <StyledCardWrapper>
                <ExchangeCard
                  action="Purchase"
                  fromToken={tombFinance.DUKE}
                  fromTokenName="DUKE"
                  toToken={tombFinance.DBOND}
                  toTokenName="DBOND"
                  priceDesc={
                    !isBondPurchasable
                      ? 'DUKE is over peg'
                      : `${Math.floor(100 / Number(bondStat.priceInDollars) - 100)}% return when DUKE > 1.1USDC`
                  }
                  onExchange={handleBuyBonds}
                  disabled={!bondStat || isBondRedeemable}
                />
              </StyledCardWrapper>
              <StyledStatsWrapper>
                <ExchangeStat
                  tokenName="DUKE"
                  description="Last-Hour TWAP Price"
                  price={getDisplayBalance(cashPrice, 18, 2)}
                />
                <Spacer size="md" />
                <ExchangeStat
                  tokenName="DBOND"
                  description="Current Price: (DUKE)^2"
                  price={Number(bondStat?.tokenInFtm).toFixed(2) || '-'}
                />
              </StyledStatsWrapper>
              <StyledCardWrapper>
                <ExchangeCard
                  action="Redeem"
                  fromToken={tombFinance.DBOND}
                  fromTokenName="DBOND"
                  toToken={tombFinance.DUKE}
                  toTokenName="DUKE"
                  priceDesc={`${getDisplayBalance(bondBalance)} DBOND Available`}
                  onExchange={handleRedeemBonds}
                  disabled={!bondStat || bondBalance.eq(0) || !isBondRedeemable}
                  disabledDescription={!isBondRedeemable ? `Enabled when DUKE > ${BOND_REDEEM_PRICE}USDC` : null}
                />
              </StyledCardWrapper>
            </StyledBond>
          </>
        ) : (
          <UnlockWallet />
        )}
      </Page>
    </Switch>
  );
};

const StyledBond = styled.div`
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const StyledStatsWrapper = styled.div`
  display: flex;
  flex: 0.8;
  margin: 0 20px;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 80%;
    margin: 16px 0;
  }
`;

export default Pit;
