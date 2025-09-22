import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Section } from "./Styled-Profile";

const Login = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  return (
    <Section>
      <div>
        {isAuthenticated ? (
          <button
            onClick={() =>
              logout({
                logoutParams: { returnTo: window.location.origin },
              })
            }
          >
            Log Out
          </button>
        ) : (
          <>
            <img
              src="https://images.meesho.com/images/marketing/1648820929975.jpeg"
              alt=""
            />
            <h2>Sign Up to view your cart items</h2>
            <button onClick={() => loginWithRedirect()}>Login / Sign up</button>
            <p id="privacy-policy">
              <p>By continuing, you agree to Meesho’s</p>{" "}
              <span>Terms &amp; Conditions</span> and{" "}
              <span>Privacy Policy</span>
            </p>
          </>
        )}
      </div>
    </Section>
  );
};

export default Login;
