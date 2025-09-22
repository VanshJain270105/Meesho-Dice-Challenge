import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { increaseStep } from "../../Redux/action";
import InputField from "./Input/InputField";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const cardDetails = {
  cardNumber: "",
  expire: "",
  cvv: "",
  name: "",
};

const Payment = ({ handelSave }) => {
  const [inp, setInp] = useState(cardDetails);
  const [color, setColor] = useState("#06A759");
  const [error, setError] = useState(() => new Array(3).fill(0));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth0();

  const handleClick = () => {
    dispatch(increaseStep());
    navigate("/checkout/summary");
    let res = 0;
    let flag = true;
    const updateArr = [...error];
    for (const item in inp) {
      if (item === "cardNumber") {
        for (const add in inp.cardNumber) {
          if (inp.cardNumber[add].length === 0) {
            updateArr[res] = 1;
          } else if (add === "cvv" && inp.cardNumber[add].length < 16) {
            updateArr[res] = 1;
          } else {
            updateArr[res] = 0;
          }
          res++;
          if (res === 5) break;
        }
      } else {
        if (inp[item].length === 0) {
          updateArr[res] = 1;
        } else if (item === "name" && inp[item].length < 10) {
          updateArr[res] = 1;
        } else {
          updateArr[res] = 0;
        }
        res++;
      }
    }
    for (const item of updateArr) {
      if (item === 1) {
        flag = false;
      }
    }
    if (flag) {
      handelSave(inp);
    }
    setError(updateArr);
  };
  const clr = () => {
    if (color === "#06A759") {
      setColor("grey");
      return;
    }
    setColor("#06A759");
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const changeHandlear = (e) => {
    setInp({
      ...inp,
      [e.target.name]: e.target.value,
    });
  };

  return isAuthenticated ? (
    <Section>
      <div>
        <svg
          width="28"
          height="28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          iconSize="20"
          className="Icon-sc-1iwi4w1-0 bpNwUI"
          style={{ marginRight: "13px" }}
        >
          <path
            d="M24.029 9.01v6.277L28 13.782 22.869.93a1 1 0 00-1.3-.558L0 9.011"
            fill="#56BB8A"
          ></path>
          <path
            d="M0 8.82h27a1 1 0 011 1v13.512a1 1 0 01-1 1H1a1 1 0 01-1-1V8.82z"
            fill="#56BB8A"
          ></path>
          <path
            d="M1.559 14.358c1.656-.35 2.952-1.265 3.447-2.435H23c.495 1.17 1.791 2.085 3.448 2.435v4.437c-1.657.35-2.953 1.265-3.448 2.435H5.006c-.496-1.17-1.791-2.085-3.447-2.435v-4.437z"
            fill="#91E5BD"
          ></path>
          <path
            d="M13.751 19.28c1.58 0 2.86-1.277 2.86-2.852a2.857 2.857 0 00-2.86-2.853 2.857 2.857 0 00-2.86 2.853 2.857 2.857 0 002.86 2.852z"
            fill="#56BB8A"
          ></path>
          <path
            d="M23.635 9.01L22.28 5.53l-.062-.153a4.018 4.018 0 01-3.5-1.501l-.154.062L6.296 9.01h17.34z"
            fill="#91E5BD"
          ></path>
          <path
            d="M7.28 16.998a.571.571 0 100-1.142.571.571 0 000 1.143zM19.865 16.998a.571.571 0 10.002-1.142.571.571 0 00-.002 1.143z"
            fill="#56BB8A"
          ></path>
        </svg>
        <p>Cash On Delivery</p>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          width="24"
          iconSize="20"
          className="Icon-sc-1iwi4w1-0 fvvrdU"
          onClick={clr}
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zM6.355 12.322l2.761 2.76 7.863-7.85A.793.793 0 1118.1 8.355l-8.42 8.413a.793.793 0 01-1.122 0l-3.326-3.324a.791.791 0 01.56-1.354c.211 0 .413.084.562.233z"
            fill={color}
          ></path>
        </svg>
      </div>
      <form action="" onSubmit={handleClick}>
        <h1>Add Payment Method</h1>
        <hr />
        <InputField
          type="text"
          name="cardNumber"
          required={true}
          isError={error[0]}
          value={inp.cardNumber}
          onChange={changeHandlear}
          label="Card Number"
        />
        <InputField
          type="text"
          name="expire"
          required={true}
          isError={error[1]}
          value={inp.expire}
          onChange={changeHandlear}
          label="Expiry Date (MM / YY)"
        />
        <InputField
          type="text"
          name="cvv"
          required={true}
          isError={error[2]}
          value={inp.cvv}
          onChange={changeHandlear}
          label="CVV"
        />
        <InputField
          type="text"
          name="name"
          required={true}
          isError={error[3]}
          value={inp.name}
          onChange={changeHandlear}
          label="Name on Card"
        />
        <button>Place Order</button>
      </form>
    </Section>
  ) : (
    alert("First login", navigate("/profile"))
  );
};

export default Payment;

let Section = styled.section`
  padding: 50px 0;
  max-width: 95%;
  width: 400px;
  display: grid;
  gap: 2.5vw;
  margin: 30px auto 50px;
  box-shadow: 1px 1px 6px 1px #e4e4e4;
  padding: 20px 15px;
  padding-bottom: 20px;
  border-radius: 3px;
  @media screen and (max-width: 800px) {
    display: grid;
    grid-template-columns: 1fr;
  }
  div {
    display: flex;
    align-items: center;
    p {
      flex-grow: 1;
    }
  }
  h1 {
    font-size: 22px;
  }
  hr {
    border: none;
    border-bottom: 1px solid rgb(221, 221, 221);
    margin: 20px 0;
  }
  h2 {
    font-size: 16px;
    font-weight: 500;
  }
  form InputField {
    width: 99%;
    margin: 18px 0;
    border: none;
    border-bottom: 1px solid #000;
    border-bottom: 1px solid rgb(178, 178, 178);
    padding: 0 0 8px 6px;
    cursor: pointer;
    &:focus {
      outline: none;
    }
  }
  button {
    width: 100%;
    padding: 10px;
    margin-top: 20px;
    border: 1px solid rgb(159, 32, 137);
    background-color: rgb(255, 231, 251);
    color: rgb(159, 32, 137);
    font-weight: 500;
    border-radius: 3px;
    &:hover {
      background-color: rgb(159, 32, 137);
      color: #ffff;
    }
  }
`;
