import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { increaseStep } from "../../Redux/action";
import PhoneIconOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import "./address.css";
import InputField from "./Input/InputField";

const initState = {
  name: "",
  phone: "",
  address: {
    house: "",
    area: "",
    pincode: "",
    city: "",
    state: "",
    landmark: "",
  },
};

const Address = ({ handelSave }) => {
  const [state, setState] = useState(initState);
  const [error, setError] = useState(() => new Array(7).fill(0));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTopChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddChange = (e) => {
    setState({
      ...state,
      address: {
        ...state.address,
        [e.target.name]: e.target.value,
      },
    });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = () => {
    dispatch(increaseStep());
    navigate("/checkout/payment");
    let res = 0;
    let flag = true;
    const updateArr = [...error];
    for (const item in state) {
      if (item === "address") {
        for (const add in state.address) {
          if (state.address[add].length === 0) {
            updateArr[res] = 1;
          } else if (add === "pincode" && state.address[add].length < 6) {
            updateArr[res] = 1;
          } else {
            updateArr[res] = 0;
          }
          res++;
          if (res === 5) break;
        }
      } else {
        if (state[item].length === 0) {
          updateArr[res] = 1;
        } else if (item === "phone" && state[item].length < 10) {
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
      handelSave(state);
    }

    setError(updateArr);
  };

  return (
    <section id="address-section">
      <form action="" onSubmit={handleSubmit}>
        <h1>Select Delivery Address</h1>
        <hr />
        <div>
          <PhoneIconOutlinedIcon
            sx={{ color: "#9F2089", marginRight: "10px" }}
          />
          <h2>Contact Details</h2>
        </div>

        <InputField
          type="text"
          name="name"
          required={true}
          val={state.name}
          isError={error[0]}
          onChange={handleTopChange}
          label="Name"
        />
        <InputField
          type="number"
          name="phone"
          required={true}
          val={state.phone}
          isError={error[1]}
          maxLen={10}
          onChange={handleTopChange}
          label="Phone Number"
        />
        <div>
          <LocationOnOutlinedIcon
            sx={{ color: "#9F2089", marginRight: "10px" }}
          />
          <h2>Address Details</h2>
        </div>
        <InputField
          type="text"
          name="house"
          required={true}
          val={state.address.house}
          isError={error[2]}
          onChange={handleAddChange}
          label="House no. / Building Name"
        />
        <InputField
          type="text"
          name="area"
          required={true}
          val={state.address.area}
          isError={error[3]}
          onChange={handleAddChange}
          label="Road Name / Area / Colony"
        />

        <div className="city">
          <InputField
            type="number"
            name="pincode"
            maxLength={6}
            required={true}
            val={state.address.pincode}
            isError={error[4]}
            onChange={handleAddChange}
            label="Pincode"
          />
          <InputField
            type="text"
            name="city"
            required={true}
            val={state.address.city}
            isError={error[5]}
            onChange={handleAddChange}
            label="City"
          />
          <InputField
            type="text"
            name="state"
            required={true}
            val={state.address.state}
            isError={error[6]}
            onChange={handleAddChange}
            label="State"
          />
        </div>
        <InputField
          type="text"
          name="landmark"
          val={state.address.landmark}
          isError={error[7]}
          onChange={handleAddChange}
          label="Nearby Location (optional) "
        />
        <button className="continue">Deliver to this Address</button>
      </form>
      <div>
        <h1>Price Details</h1>
        <p>
          Product Charges<span>₹ {localStorage.getItem("total")}</span>
        </p>
        <p>
          Deleviery Charges<span>+ ₹ 0</span>
        </p>
        <p>
          COD Charges<span>+ ₹ 0</span>
        </p>
        <p>
          1st order Discount<span>- ₹ 50</span>
        </p>
        <hr />
        <h2>
          Order Total<span> ₹ {localStorage.getItem("total") - 50}</span>
        </h2>
      </div>
    </section>
  );
};

export default Address;
