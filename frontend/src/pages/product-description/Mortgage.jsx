import React, { useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const Mortgage = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [initialDeposit, setInitialDeposit] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
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
    const monthlyInterestRate = deposit >= principal * 0.5 ? 0.04 : 0.08; // 4% if deposit is >= 50% of loan amount, else 8%
    const numberOfPayments = parseFloat(loanTerm) * 12;

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
            textAlign="center"
          >
            MORTGAGE CALCULATOR
          </Typography>

          <Stack spacing={2}>

          <InputLabel>Down Payment</InputLabel>
            <input
              type="number"
              value={initialDeposit}
              onChange={(e) => setInitialDeposit(e.target.value)}
              style={{ borderRadius: "10px", padding: "8px", width: "100%" }}
            />

            <InputLabel>Loan Amount</InputLabel>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              style={{ borderRadius: "10px", padding: "8px", width: "100%" }}
            />

            <InputLabel>Loan Interest Rate (%)</InputLabel>
            <input
              type="text"
              value={`${(loanInterest * 100).toFixed(2)}%`}
              readOnly
              style={{ borderRadius: "10px", padding: "8px", width: "100%" }}
            />

            <InputLabel>Loan Term (years)</InputLabel>
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              style={{ borderRadius: "10px", padding: "8px", width: "100%" }}
            />

            <Button
              onClick={calculateMonthlyPayment}
              sx={{
                textTransform: "none",
                bgcolor: "primary.main",
                color: "white",
                paddingX: "20px",
                paddingY: "10px",
                borderRadius: "16px",
                width: "100%",
                "&:hover": {
                  backgroundColor: "#fc973f",
                },
              }}
            >
              Calculate
            </Button>

            {monthlyPayment !== null && (
              <div>
                <Typography variant="h5">Monthly Payment:</Typography>
                <Typography variant="h5">₦ {monthlyPayment}</Typography>
              </div>
            )}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Mortgage;
