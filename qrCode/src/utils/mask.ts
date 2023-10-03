import { QrCodeNodeType, QrCodeType } from "../components/QrCodeTypes";
import { nodeIsInFunctionalBlock } from "./general";

export type mask = `${QrCodeNodeType}${QrCodeNodeType}${QrCodeNodeType}`;

const maskMode:{[key in mask]: mask} = {
    '000': '000',
    '001': '001',
    '010': '010',
    '011': '011',
    '100': '100',
    '101': '101',
    '110': '110',
    '111': '111',
};

const nodeVal = (bool: boolean):QrCodeNodeType => bool ? 1 : 0;

const maskModeMethod: {[key in mask]: (x:number, y:number) => QrCodeNodeType} = {
    '000': (x:number, y:number):QrCodeNodeType => nodeVal((x + y) % 2 == 0),
    '001': (x: number, y:number|undefined):QrCodeNodeType => nodeVal(x % 2 == 0),
    '010': (x: number|undefined, y:number):QrCodeNodeType => nodeVal(y % 3 == 0),
    '011': (x: number, y:number):QrCodeNodeType => nodeVal((x + y) % 3 == 0),
    '100': (x: number, y:number):QrCodeNodeType => nodeVal(((x / 2) + (y / 3)) % 2 == 0),
    '101': (x: number, y:number):QrCodeNodeType => nodeVal(((x * y) % 2) + ((x * y) % 3) == 0),
    '110': (x: number, y:number):QrCodeNodeType => nodeVal(((((x * y) % 2) + ((x * y) % 3)) % 2) == 0),
    '111': (x: number, y:number):QrCodeNodeType => nodeVal((((x + y) % 2) + ((x * y) % 3)) % 2 == 0),
};

const getMask = (type: mask) => maskModeMethod[type];

const mergeMaskToTemplate = (maskType:mask, template: QrCodeType):QrCodeType => {
    const size = template.length;
    const mergedTemplate = [ ...template ];
    for (let x = 0; x < size; x++) {
        const mergedRow = [ ...mergedTemplate[x] ];
        for (let y = 0; y < size; y++) {
            if (!nodeIsInFunctionalBlock([x, y], size)) {
                const maskMethod: (x:number, y:number) => QrCodeNodeType = getMask(maskType);
                mergedRow[y] = mergedRow[y] ^ maskMethod(x, y);
            }
        }
        mergedTemplate[x] = mergedRow;
    }

    return mergedTemplate;
};

export { mergeMaskToTemplate, maskMode, };