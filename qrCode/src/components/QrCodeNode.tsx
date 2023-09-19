import React from 'react';
import type { QrCodeNodeType } from './QrCodeTypes';

interface QrCodeNodeProps {
    val: QrCodeNodeType;
}

const QrCodeNode = ( { val }: QrCodeNodeProps ):React.ReactElement => {
  const bgColor = val == 0 ? 'white' : 'black';

  return (
    <div style={{ display: 'inline-block', backgroundColor: bgColor, width: '10px', height: '10px', }}>
    </div>
  )
}

export default QrCodeNode;