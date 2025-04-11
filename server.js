const express = require("express");
const WalletConnect = require("@walletconnect/client").default;
const QRCodeModal = require("@walletconnect/qrcode-modal");
const cors = require("cors");

const app = express();
app.use(cors());

let connector;

app.get("/connect", async (req, res) => {
  connector = new WalletConnect({
    bridge: "https://bridge.walletconnect.org",
    qrcodeModal: QRCodeModal,
  });

  if (!connector.connected) {
    await connector.createSession();
  }

  const uri = connector.uri;
  res.json({
    uri,
    deepLinks: {
      trust: `trust://wc?uri=${encodeURIComponent(uri)}`,
      metamask: `metamask://wc?uri=${encodeURIComponent(uri)}`,
      okx: `okx://wc?uri=${encodeURIComponent(uri)}`,
      inch: `inchwallet://wc?uri=${encodeURIComponent(uri)}`
    }
  });
});

app.listen(3000, () => {
  console.log("WalletConnect server running on port 3000");
});
