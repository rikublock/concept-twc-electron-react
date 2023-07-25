import React from "react";
import Logo from "./logo.svg";
import "./home.css";

type WalletInfo = {
  address: string;
  mnemonic: string;
};

function Home() {
  const [value, setValue] = React.useState<string>("btc");
  const [walletInfo, setWalletInfo] = React.useState<WalletInfo>();

  const handleClick = async () => {
    const [mnemonic, address] = await window.WALLET.generateAddress(value);
    setWalletInfo({
      address,
      mnemonic,
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Concept Trust Wallet Core</h1>
        <Logo className="App-logo" />
        <div>
          <select value={value} onChange={handleChange}>
            <option value="btc">Bitcoin (BTC)</option>
            <option value="eth">Ethereum (ETH)</option>
            <option value="xrp">Ripple (XRP)</option>
          </select>
          <button type="button" onClick={handleClick}>
            Generate
          </button>
        </div>
        <div>
          <p>
            <b>mnemonic:</b> {walletInfo?.mnemonic}
          </p>
          <p>
            <b>address:</b> {walletInfo?.address}
          </p>
        </div>
      </header>
    </div>
  );
}

export default Home;
