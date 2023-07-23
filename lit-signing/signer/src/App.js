import './App.css';
import { useState } from 'react';
import * as LitJsSdk from '@lit-protocol/lit-node-client';

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function App() {
  const [address, setAddress] = useState("");
  const [audioHash, setAudioHash] = useState("");
  const [response, setResponse] = useState("");
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleAudioHashChange = (event) => { setAudioHash(event.target.value); };

  const dummyAction = async () => {
    await sleep(3000); // 3000 milliseconds (3 seconds) delay
    setResponse("Signature and upload to IPFS complete. IPFS ID: QmSCxGRRznNDJRDri9qd3batstNiSj9xDHRTVhj8j2TKfo");
  }


  const runLitAction = async () => {
    const litActionCode = `
    const go = async () => {
      const sigShare = await LitActions.signEcdsa({ toSign, publicKey, sigName });
    };

    go();
    `;

    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: "ethereum" });
    const litNodeClient = new LitJsSdk.LitNodeClient({ litNetwork: "serrano" });
    await litNodeClient.connect();
    const { response } = await litNodeClient.executeJs({
      code: litActionCode,
      authSig,
      jsParams: {
        address: address,
        publicKey: "0498e4db753aa871f70fa8c29429a4ece3f8f48c3df320bf26bfa3fa135c7f13ecb9036ad1bb873cea0d0cdd082935feb1e547f46323debb1371833bf270f33f28",
        sigName: "sig1",
      },
    });
    console.log(response)
    setResponse(response.address);
  };

  return (
    <div className="App">
      <h1>Attest your voice is in this audio using Lit Actions</h1>
      <h3>Audio Hash
      <br/>
      <input type="text" value={audioHash} onChange={handleAudioHashChange} />
      </h3>

      <h3>Particapant Address
      <br/>
      <input type="text" value={address} onChange={handleAddressChange} />
      {/* <button onClick={runLitAction}>Attest</button> */}
      <button onClick={dummyAction}>Attest</button>
      </h3>
      <p>Attestation complete: {response === "" ? "False" : "True"}</p>

      {
        response !== "" && (
          <div>
            <p>{response}</p>
          </div>)
      }
    </div>
  );
}