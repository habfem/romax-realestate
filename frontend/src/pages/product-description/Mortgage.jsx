import React, { useState } from 'react';
import { Box, Stack, Typography, Button, TextField, Select, MenuItem } from "@mui/material";

const Mortgage = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [initialDeposit, setInitialDeposit] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [bank, setBank] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [loanInterest, setLoanInterest] = useState(0.08); // Initial interest rate set to 8%

  const amortize = (borrowed_sum, interest_rate, loan_period) => {
    const months_in_year = 12;
    const adjusted_loan_period_months = loan_period * months_in_year;
    const adjusted_interest_rate_months = interest_rate / months_in_year;

    const payments = borrowed_sum * (adjusted_interest_rate_months / (1 - Math.pow(1 + adjusted_interest_rate_months, -adjusted_loan_period_months)));

    return payments.toFixed(2);
  };

  const calculateMonthlyPayment = () => {
    const principal = parseFloat(loanAmount);
    const deposit = parseFloat(initialDeposit);
    let monthlyInterestRate = 0.08; // Default interest rate set to 8%

    switch (bank) {
      case 'Bank of America':
        monthlyInterestRate = 0.08;
        break;
      case 'Chase':
        monthlyInterestRate = 0.0805;
        break;
      case 'WoodForest':
        monthlyInterestRate = 0.0795;
        break;
      default:
        break;
    }

    const monthlyPaymentValue = amortize(principal, monthlyInterestRate, parseFloat(loanTerm));

    setMonthlyPayment(monthlyPaymentValue);
    setLoanInterest(monthlyInterestRate);
  };

  return (
    <Box flex={4} padding="0 20px">
      <Stack spacing={2.5}>
        <Box paddingBottom="30px">
          <Typography
            variant="h5"
            mb={4}
            fontSize={{ xs: "17px", md: "22px" }}
          >
            Mortgage Calculator
          </Typography>

          <Stack spacing={2}>
            <Box display="flex" justifyContent="space-between">
              <TextField
                fullWidth
                type="number"
                value={initialDeposit}
                onChange={(e) => setInitialDeposit(e.target.value)}
                label="Down Payment"
                variant="outlined"
                InputProps={{ style: { borderRadius: "16px" } }}
              />
              <TextField
                fullWidth
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                label="Loan Amount"
                variant="outlined"
                InputProps={{ style: { borderRadius: "16px", marginLeft: "7px" } }}
              />
            </Box>

            <Box display="flex" justifyContent="space-between">
              <TextField
                fullWidth
                type="text"
                value={`${(loanInterest * 100).toFixed(2)}%`}
                label="Loan Interest Rate (%)"
                variant="outlined"
                readOnly
                InputProps={{ style: { borderRadius: "16px" } }}
              />
              <TextField
                fullWidth
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                label="Loan Term (years)"
                variant="outlined"
                InputProps={{ style: { borderRadius: "16px", marginLeft: "7px" } }}
              />
            </Box>

            <TextField
              select
              fullWidth
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              label="Select Bank"
              variant="outlined"
              InputProps={{ style: { borderRadius: "16px" } }}
            >
              <MenuItem value="Bank of America">
                Bank of America - 8.00%
              </MenuItem>
            <MenuItem value="Chase">
              Chase - 8.05%
            </MenuItem>
            <MenuItem value="WoodForest">
              WoodForest - 7.95%
            </MenuItem>
            </TextField>
            <Button
              onClick={calculateMonthlyPayment}
              variant="contained"
              sx={{
                textTransform: "none",
                bgcolor: "primary.main",
                color: "white",
                borderRadius: "16px",
                width: "150px",
                "&:hover": {
                  backgroundColor: "#fc973f",
                },
              }}
            >
              Calculate
            </Button>

            {monthlyPayment !== null && (
              <div>
                <Typography variant="h5" fontSize={{ xs: "17px", md: "22px" }}>Monthly Payment: ₦{monthlyPayment}</Typography>
              </div>
            )}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Mortgage;
