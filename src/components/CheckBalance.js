//Set NETWORK to either testnet or mainnet

import React from "react";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import UsdPrice from "./UsdPrice";
import BigNumber from "bignumber.js";

const CheckBalance = (props) => {
  //console.log(props)
  const NETWORK = "mainnet";

  // REST API servers.
  //const BCHN_MAINNET = "https://api.fullstack.cash/v5/";
  const ABC_MAINNET = "https://abc.fullstack.cash/v4/";
  const TESTNET3 = "https://testnet3.fullstack.cash/v4/";

  // bch-js-examples require code from the main bch-js repo
  const BCHJS = require("@psf/bch-js");

  // Instantiate bch-js based on the network.
  let bchjs;
  if (NETWORK === "mainnet") bchjs = new BCHJS({ restURL: ABC_MAINNET });
  else bchjs = new BCHJS({ restURL: TESTNET3 });

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([]);

  const fromLegacyDecimals = (amount, cashDecimals) => {
    // Input 0.00000546 BCH
    // Output 5.46 XEC or 0.00000546 BCH, depending on currency.cashDecimals
    //const cashDecimals = 2;
    const amountBig = new BigNumber(amount);
    const conversionFactor = new BigNumber(10 ** (8 - cashDecimals));
    const amountSmallestDenomination = amountBig
      .times(conversionFactor)
      .toNumber();
    return amountSmallestDenomination;
  };

  //Get the balance of the wallet.
  const GetBalance = async () => {
    setLoading(true);

    console.log(props);

    // first get BCH balance
    try {
      const toBcashAdd = bchjs.Address.ecashtoCashAddress(props.props);
      const balance = await bchjs.Electrumx.balance(toBcashAdd);
      const bchDenom = bchjs.BitcoinCash.toBitcoinCash(
        balance.balance.confirmed
      );
      const xecDenom = fromLegacyDecimals(bchDenom, 2);
      const result = [xecDenom];

      console.log(result);
      setLoading(false);
      setResult(result);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    GetBalance();
  }, []);

  if (loading) {
    return (
      <div>
        <h2>Loading</h2>
        <Loading />
      </div>
    );
  }
  if (result.length === 0) {
    return (
      <main>
        <div className="section">
          <h2>No XEC Found</h2>
        </div>
      </main>
    );
  }

  return result.map((item) => {
    return (
      <div id="body">
        <div key={item.id}>
          <h2 className="section">
            Balance: {result}
            <h2>
              <UsdPrice balance={result} />
            </h2>
          </h2>
        </div>
      </div>
    );
  });
};

export default CheckBalance;
