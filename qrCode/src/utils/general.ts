import { QrCodeType } from "../components/QrCodeTypes";

const fillVal = 1;
const emptyVal = 0;

const getQrSizeByVersion = (version: string):number => {
    const size: {[key: string]: number} = {
        '1': 21,
        '2': 25,
        '6': 41,
        '7': 45,
        '14': 73,
        '21': 101,
        '40': 177,
    };

    return size[version];
};

const microQrSizeByVersion = {
    'M1': 11,
    'M2': 13,
    'M3': 15,
    'M4': 17,
};

const getCoreSectionIndices = (length: number): number[] => {
    const indices = [];
    for (let index = 0; index < length; index++) {
        if (index < 2 || index > length - 3 ) {
            continue;
        }
        indices.push(index);
    }

    return indices;
};

const getPattern = (length: number): QrCodeType => {
    const firstIndex: number = 0;
    const lastIndex: number = length -1;
    const corSectionIndices = getCoreSectionIndices(length);

    const finalArray = [];
    for (let i = 0; i < length; i++) {
        if ([firstIndex, lastIndex].includes(i)) {
            finalArray.push(Array(length).fill(fillVal));
            continue;
        }

        const row = [];
        for (let j = 0; j < length; j++) {
            if ([firstIndex, lastIndex].includes(j)
                || (corSectionIndices.includes(j)
                && corSectionIndices.includes(i))
            ) {
                row.push(fillVal);
            }
            else {
                row.push(emptyVal);
            }
        }

        finalArray.push(row);
    }

    return finalArray;
};

const getQrTempate = (size:number) => {
    const rowData = Array(size).fill(emptyVal);
    return Array(size).fill(rowData);
};

const mergePatternToTemplate = (template: QrCodeType, pattern: QrCodeType, mergelocation: [number, number]): QrCodeType => {
    let mergedTemplate = [ ...template ];

    for (let i = mergelocation[0]; i < (mergelocation[0] + pattern.length); i++) {
        let mergedRow = [...mergedTemplate[i]];
        for (let j = mergelocation[1]; j < (mergelocation[1] + pattern[i - mergelocation[0]].length); j++) {
            mergedRow[j] = pattern[i - mergelocation[0]][j - mergelocation[1]];
        }
        mergedTemplate[i] = mergedRow;
    }
    return mergedTemplate;
};

export {
    fillVal,
    emptyVal,
    getQrSizeByVersion,
    microQrSizeByVersion,
    getPattern,
    getQrTempate,
    mergePatternToTemplate,
};