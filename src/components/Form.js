import React from "react";
import { useState } from "react";
import CheckBalance from "./CheckBalance";
import ShowTokens from "./ShowTokens";

function Form() {
  const [address, setAddress] = useState("");
  const searchValue = React.useRef(address);

  function handleSubmit(e) {
    e.preventDefault();
    //console.log(searchValue.current.value)
  }

  return (
    <div>
      <form className="search-form" onSubmit={handleSubmit}>
        <h2>eCash Address Balance</h2>
        <label htmlFor="address"></label>
        <input
          type="text"
          name="address"
          ref={searchValue}
          value={address}
          placeholder="enter address"
          className="form-input"
          onChange={(e) => setAddress(e.target.value)}
        />
        {/* <div className="btn-container">
        <button type='submit' className='btn-container button'>SUBMIT</button>
       
        </div>  */}
      </form>
      <div>
        {address === "" ? (
          <span className="section"></span>
        ) : (
          <div className="section2">
            <div className="btn-container2 button">
              <div>
                <CheckBalance props={searchValue.current.value} />
                <ShowTokens props={searchValue.current.value} />
              </div>
            </div>

            <div className="btn-container2 button">
              <button
                type="submit"
                className="btn-container2 button"
                onClick={() => {
                  setAddress("");
                }}
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Form;
