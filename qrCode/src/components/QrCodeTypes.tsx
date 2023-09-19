const QrCodeNodeTypeTrue = 1;
const QrCodeNodeTypeFalse = 0;
const QrNodeAcceptableValues = [QrCodeNodeTypeFalse, QrCodeNodeTypeTrue] as const;
type QrCodeNodeType = typeof QrNodeAcceptableValues[number];
type QrCodeRowType = QrCodeNodeType[];
type QrCodeType = QrCodeNodeType[][];

export type { QrCodeNodeType, QrCodeRowType, QrCodeType };