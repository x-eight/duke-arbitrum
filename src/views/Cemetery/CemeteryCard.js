import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Card, CardActions, CardContent, Typography, Grid } from '@material-ui/core';

import TokenSymbol from '../../components/TokenSymbol';
import usePoolInfo from '../../hooks/usePoolInfo';

const CemeteryCard = ({ bank }) => {
  const poolInfo = usePoolInfo(bank);
  const isLpLogo = bank.depositTokenName.includes('LP');
  return (
    <Grid item xs={12} md={4} lg={4}>
      <Card variant="outlined">
        <CardContent>
          <Box style={{ position: 'relative' }}>
            <Box
              style={{
                position: 'absolute',
                right: '0px',
                top: '-5px',
                height: '48px',
                width: '48px',
                borderRadius: '40px',
                backgroundColor: 'white',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <TokenSymbol size={!isLpLogo ? 32 : 41} width={!isLpLogo ? 32 : 49} symbol={bank.depositTokenName} />
            </Box>
            <Typography variant="h5" component="h2">
              {bank.depositTokenName}
            </Typography>
            <Typography color="textSecondary">
              {/* {bank.name} */}
              Deposit {bank.depositTokenName.toUpperCase()} Earn {` ${bank.earnTokenName}`}
            </Typography>
          </Box>
        </CardContent>
        <CardActions style={{ justifyContent: 'space-between', padding: '0rem 1rem 0.5rem' }}>
          <Typography component="h1">Deposit fee {poolInfo}%</Typography>
          <Button color="primary" size="small" variant="contained" component={Link} to={`/cemetery/${bank.contract}`}>
            View
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CemeteryCard;
