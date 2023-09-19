import React from 'react';
import QrCodeNode from './QrCodeNode';
import { QrCodeNodeType, QrCodeRowType } from './QrCodeTypes';

interface QrCodeRowProps {
    rowData: QrCodeRowType;
}

const QrCodeRow = ({ rowData }:QrCodeRowProps):React.ReactElement => {
  return (
    <div style={{
        width: `${rowData.length * 11}px`,
        height: '10px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: '1px',
    }}>
        { rowData.map((nodeVal:QrCodeNodeType, index: number) => <QrCodeNode key={index} val={nodeVal}/>) }
    </div>
  )
}

export default QrCodeRow;