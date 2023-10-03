import { QrCodeNodeType } from "../components/QrCodeTypes";

export type errorLevelType = 'L' | 'M' | 'Q' | 'H';
export type errLevelCode = `${QrCodeNodeType}${QrCodeNodeType}`;

const errorLevels: { [key in errorLevelType]: errorLevelType } = {
    L: 'L',
    M: 'M',
    Q: 'Q',
    H: 'H',
};

const errorRecoveryPercentage: { [key in errorLevelType]: number } = {
    L: 7,
    M: 15,
    Q: 25,
    H: 30,
};

const errorCorrectionLevel: { [key in errorLevelType]: errLevelCode} = {
    L: '01',
    M: '00',
    Q: '11',
    H: '10',
};

export { errorLevels, errorCorrectionLevel, errorRecoveryPercentage };
