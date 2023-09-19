import React from "react";
import { QrCodeType } from "./components/QrCodeTypes";
import QrCode from "./components/QrCode";
import { getTemplate } from "./utils/qrCode";

const qrCodeData:QrCodeType = getTemplate('7');

const App = ():React.ReactElement<void> => {
  return (
    <>
      <QrCode qrCodeData={qrCodeData} />
    </>
  )
}

export default App;
