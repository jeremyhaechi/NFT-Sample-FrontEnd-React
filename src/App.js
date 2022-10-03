import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import contract from "./contracts/NFT.json";

const contractAddress = "0xC47bAD97d31c223ba0262bad489668e388A0ee6c";
const abi = contract.abi;

/*
function App() {
  return (
    <h1>Hello World</h1>
  );
}
*/
function App() {
  const [valueForTokenURI, setValueForTokenURI] = useState('');
  const [valueForReveal, setValueForReveal] = useState('');
  const [valueForGetData, setValueForGetData] = useState('');
  const [currentAccount, setCurrentAccount] = useState(null);

  const valueOfTokenURIChange = event => {
    setValueForTokenURI(event.target.value);
  }

  const valueOfRevealChange = event => {
    setValueForReveal(event.target.value);
  }

  const valueForGetDataChange = event => {
    setValueForGetData(event.target.value);
  }

  const checkWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask installed!");
      return;
    } else {
      console.log("Wallet exists! We're ready to go!");
    }

    const accounts = await ethereum.request({method: 'eth_accounts'});

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  }

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({method: 'eth_requestAccounts' });
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  }

  const mintNftHandler = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);

        console.log("Initialize payment");
        let tx = await nftContract.mint(currentAccount);
        console.log(tx);
        console.log("Mint complete");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler} className="cta-button connect-wallet-button">
        Connect Wallet
      </button>
    )
  }

  const mintNftButton = () => {
    return (
      <button onClick={mintNftHandler} className="cta-button mint-nft-button">
        Mint NFT
      </button>
    )
  }

  const tokenURIHandler = async () => {
    const targetTokenID = valueForTokenURI;

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);

        const result = await nftContract.tokenURI(targetTokenID);
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
    
  }
  const revealHandler = async () => {
    const targetTokenID = valueForReveal;

    console.log(targetTokenID);

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);

        console.log(nftContract);

        await nftContract.reveal(targetTokenID, "https://test.com");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const GetDataHandler = async () => {
    const targetTokenID = valueForGetData;
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);

        // console.log(nftContract);

        const result = await nftContract.getTokenMetadata(targetTokenID);
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const tokenURIButton = () => {
    return (
      <button onClick={tokenURIHandler} className="cta-button mint-nft-button">
        tokenURI
      </button>
    )
  }

  const revealButton = () => {
    return (
      <button onClick={revealHandler} className="cta-button mint-nft-button">
        Reveal
      </button>
    )
  }

  const GetDataButton = () => {
    return (
      <button onClick={GetDataHandler} className="cta-button mint-nft-button">
        GetData
      </button>
    )
  }

  useEffect(() => {
    checkWalletIsConnected();
  }, [])

  return (
    <div className="main-app">
      <h1>Tutorial</h1>
      <div>
        {currentAccount ? mintNftButton() : connectWalletButton()}
      </div>
      <br />
      <div>
        <input type="text" value={valueForTokenURI} onChange={valueOfTokenURIChange}></input><br />
        <br />
        {tokenURIButton()}
      </div>
      <br />
      <div>
        <input type="text" value={valueForReveal} onChange={valueOfRevealChange}></input><br />
        <br />
        {revealButton()}
      </div>
      <br />
      <div>
        <input type="text" value={valueForGetData} onChange={valueForGetDataChange}></input><br />
        <br />
        {GetDataButton()}
      </div>
    </div>
  )
}

export default App;
