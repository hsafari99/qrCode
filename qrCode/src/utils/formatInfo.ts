import { errorCorrectionLevel, errorLevelType } from "./errorLevel";
import { maskMode, mask } from "./mask";

const errCorrBits: {[key:string]: string} = {
    '11000': '0101001101',
    '11111': '1111111111',
    '11110': '1011001000',
    '11101': '0110010001',
    '11100': '0010100110',
    '11011': '1000010100',
    '11010': '1100100011',
    '11001': '0001111010',

    '10000': '1010011011',
    '10111': '0000101001',
    '10110': '0100011110',
    '10101': '1001000111',
    '10100': '1101110000',
    '10011': '0111000010',
    '10010': '0011110101',
    '10001': '1110101100',

    '01000': '1111010110',
    '01110': '0001010011',
    '01101': '1100001010',
    '01100': '1000111101',
    '01011': '0010001111',
    '01010': '0110111000',
    '01001': '1011100001',

    '00000': '0000000000',
    '00111': '1010110010',
    '00110': '1110000101',
    '00101': '0011011100',
    '00100': '0111101011',
    '00011': '1101011001',
    '00010': '1001101110',
    '00001': '0100110111',
};
const getFormatInfo = (mask: mask, errLevelCode: errorLevelType): string => {
    const dataBits = `${maskMode[mask]}${errorCorrectionLevel[errLevelCode]}`;
    return `${dataBits}${errCorrBits[dataBits]}`;
};

const xorPattern: string = '101010000010010';

const getmaskedInfo = (rawInfo:string): string => {
    let maskedInfo = '';
    for (let index = 0; index < rawInfo.length; index++) {
        maskedInfo = `${maskedInfo}${rawInfo[index] == xorPattern[index] ? '0' : '1'}`;
    }

    return maskedInfo;
}

const getFormatInfoLocHoriz = () => {};
const getFormatInfoLocVert = () => {};
const mergeHorizFormatDtToTempl = (template) => {}
const mergeVertFormatDtToTempl = (template) => {}

const mergeFormatInfoToTempl = (template) => {};