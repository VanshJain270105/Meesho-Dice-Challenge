import React from "react";
import { Section } from "./Styled-Profile";
// import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { emptyCart } from "../../Redux/action";

const Profile = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const dispatch = useDispatch();
  return (
    <Section>
      <div>
        {isAuthenticated ? (
          <>
            <h2>Email: {user.email}</h2>
            <h2>UserName: {user.Username}</h2>
            <button
              onClick={() =>
                logout(
                  {
                    logoutParams: { returnTo: window.location.origin },
                  },
                  dispatch(emptyCart())
                )
              }
            >
              Log Out
            </button>
          </>
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

export default Profile;
