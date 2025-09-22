import * as React from "react";
import "../allStyles.css";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useAuth0 } from "@auth0/auth0-react";

const steps = ["cart", "Address", "Payment", "Summary"];

const Checkout = () => {
  const { isAuthenticated } = useAuth0();
  const step = useSelector((state) => state.step);
  return (
    isAuthenticated && (
      <nav className="checkoutNav">
        <Box className="stepsbox">
          <Stepper sx={{}} activeStep={step} alternativeLabel>
            {steps.map((label) => (
              <Step sx={{}} key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </nav>
    )
  );
};

export default Checkout;
