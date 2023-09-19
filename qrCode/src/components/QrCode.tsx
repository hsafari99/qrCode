import React from 'react';
import { QrCodeRowType, QrCodeType } from './QrCodeTypes';
import QrCodeRow from './QrCodeRow';

interface QrCodeProps {
    qrCodeData: QrCodeType;
}

const QrCode = ({ qrCodeData }: QrCodeProps): React.ReactElement => {
  return (
    <div style = {{
        border: '1px solid black',
        // padding: '10px',
        display: 'inline-block',
    }}>
        { qrCodeData.map((rowData: QrCodeRowType, index: number) => <QrCodeRow key={index} rowData={rowData} />) }
    </div>
  )
}

export default QrCode;