import { useCallback, useState, useEffect } from 'react';
import useTombFinance from './useTombFinance';
import { Bank } from '../tomb-finance';

import config from '../config';

const usePoolInfo = (bank: Bank) => {
  const tombFinance = useTombFinance();

  const [poolAPRs, setPoolAPRs] = useState<number>(0);

  const fetchAPRsForPool = useCallback(async () => {
    setPoolAPRs(await tombFinance.getDepositFee(bank));
  }, [tombFinance, bank]);

  useEffect(() => {
    fetchAPRsForPool().catch((err) => console.error(`Failed to fetch DBOND price: ${err.stack}`));
    const refreshInterval = setInterval(fetchAPRsForPool, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setPoolAPRs, tombFinance, fetchAPRsForPool]);

  return poolAPRs;
};

export default usePoolInfo;
