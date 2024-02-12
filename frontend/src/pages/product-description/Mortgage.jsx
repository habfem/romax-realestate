import React, { useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  Button,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";

const Mortgage = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculateMonthlyPayment = () => {
    const principal = parseFloat(loanAmount);
    const monthlyInterestRate = parseFloat(interestRate) / 100 / 12;
    const numberOfPayments = parseFloat(loanTerm) * 12;

    const numerator = principal * monthlyInterestRate * (Math.pow(1 + monthlyInterestRate, numberOfPayments));
    const denominator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;

    const monthlyPaymentValue = (numerator / denominator).toFixed(2);

    setMonthlyPayment(monthlyPaymentValue);
  };

  const interestRates = [10, 20, 30, 40, 50, 60];

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
            <InputLabel>Loan Amount</InputLabel>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              style={{ borderRadius: "10px", padding: "8px", width: "100%" }}
            />

            <InputLabel>Interest Rate (%)</InputLabel>
            <Select
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              style={{ borderRadius: "10px", padding: "0px", width: "100%" }}
            >
              {interestRates.map((rate) => (
                <MenuItem key={rate} value={rate}>
                  {rate}%
                </MenuItem>
              ))}
            </Select>

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
                <Typography variant="h6">Monthly Payment:</Typography>
                <Typography>₦ {monthlyPayment}</Typography>
              </div>
            )}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Mortgage;
