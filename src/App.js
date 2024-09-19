import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
//1. import web3 object and ABI
import { Web3 } from "web3";
import ABI from "./abi.mjs";
function App() {
  const [msg, setMsg] = useState("no message");
  const [account, setAccount] = useState("no address");
  //2. initialize web3(injected provider)
  const web3 = new Web3(window.ethereum);
  //3. initialize the contract
  const ADDRESS = "0xB658B42C8c209f98c19Bf6e9dD6339E04c95a163";
  const contractInstance = new web3.eth.Contract(ABI, ADDRESS);
  async function connectAccounts() {
    // request user to connect an account
    const connectedAccounts = await web3.eth.requestAccounts();
    //getting the first connected account
    const accountt = connectedAccounts[0];
    // updating the front end
    setAccount(accountt);
  }
  //5. interact with writing functions
  async function setMessage() {
    const msg = "Hello JKUAT!";
    const txReceipt = await contractInstance.methods.setMessage(msg).send({ from: account });
    console.log(txReceipt);
  }
  //4. interact with reading functions
  async function getMessage() {
    const msg = await contractInstance.methods.getMessage().call();
    setMsg(msg);
  }
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Message contract</h1>
      <button onClick={connectAccounts}>Connect Accounts</button>
      <p>Address: {account}</p>
      <div className="card">
        <button onClick={getMessage}>Get message</button>
        <p>{msg}</p>
        <button onClick={setMessage}>Set message</button>
      </div>
    </>
  );
}
export default App;

