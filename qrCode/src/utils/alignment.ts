import { QrCodeType } from "../components/QrCodeTypes";
import { getPattern, getQrSizeByVersion, mergePatternToTemplate, nodeIsInFinderBlock, } from "./general";
import { alignmentPatternSize } from "./constants";

const getAlignmentQtyByVersion = (version:number): {qty: number, loc: number[]} => {
    switch (version) {
        case 2:
            return { qty: 1, loc: [6,18] };
        case 3:
            return { qty: 1, loc: [6,22] };
        case 4:
            return { qty: 1, loc: [6,26] };
        case 5:
            return { qty: 1, loc: [6,30] };
        case 6:
            return { qty: 1, loc: [6,34] };
        case 7:
            return { qty: 6, loc: [6,22,38] };
        case 8:
            return { qty: 6, loc: [6,24,42] };
        case 9:
            return { qty: 6, loc: [6,26,46] };
        case 10:
            return { qty: 6, loc: [6,28,50] };
        case 11:
            return { qty: 6, loc: [6,30,54] };
        case 12:
            return { qty: 6, loc: [6,32,58] };
        case 13:
            return { qty: 6, loc: [6,34,62] };
        case 14:
            return { qty: 13, loc: [6,26,46,66] };
        case 15:
            return { qty: 13, loc: [6,26,48,70] };
        case 16:
            return { qty: 13, loc: [6,26,50,74] };
        case 17:
            return { qty: 13, loc: [6,30,54,78] };
        case 18:
            return { qty: 13, loc: [6,30,56,82] };
        case 19:
            return { qty: 13, loc: [6,30,58,86] };
        case 20:
            return { qty: 13, loc: [6,34,62,90] };
        case 21:
            return { qty: 22, loc: [6,28,50,72,94] };
        case 22:
            return { qty: 22, loc: [6,26,50,74,98] };
        case 23:
            return { qty: 22, loc: [6,30,54,78,102] };
        case 24:
            return { qty: 22, loc: [6,28,54,80,106] };
        case 25:
            return { qty: 22, loc: [6,32,58,84,110] };
        case 26:
            return { qty: 22, loc: [6,30,58,86,114] };
        case 27:
            return { qty: 22, loc: [6,34,62,90,118] };
        case 28:
            return { qty: 33, loc: [6,26,50,74,98,122] };
        case 29:
            return { qty: 33, loc: [6,30,54,78,102,126] };
        case 30:
            return { qty: 33, loc: [6,26,52,78,104,130] };
        case 31:
            return { qty: 33, loc: [6,30,56,82,108,134] };
        case 32:
            return { qty: 33, loc: [6,34,60,86,112,138] };
        case 33:
            return { qty: 33, loc: [6,30,58,86,114,142] };
        case 34:
            return { qty: 33, loc: [6,34,62,90,118,146] };
        case 35:
            return { qty: 46, loc: [6,30,54,78,102,126,150] };
        case 36:
            return { qty: 46, loc: [6,24,50,76,102,128,154] };
        case 37:
            return { qty: 46, loc: [6,28,54,80,106,132,158] };
        case 38:
            return { qty: 46, loc: [6,32,58,84,110,136,162] };
        case 39:
            return { qty: 46, loc: [6,26,54,82,110,138,166] };
        case 40:
            return { qty: 46, loc: [6,30,58,86,114,142,170] };
    }

    return { qty: 0, loc: [] };
};

const getLocationsBySize = (size: number):number[][] => {
    const { qty, loc } = getAlignmentQtyByVersion(size);
    const templateSize = getQrSizeByVersion(size.toString());
    if (!qty) {
        return [[]];
    }

    const locations:number[][] = [];
    loc.forEach((nodex: number) => {
        loc.forEach((nodey:number) => {
            locations.push([nodex, nodey]);
        });
    });

    const filteredLocation:number[][] = locations.filter((point: number[]) => {
        const [x, y]:number[] = point;
        return nodeIsInFinderBlock([x, y], templateSize) ? false : true;
    });

    return filteredLocation;
}

const mergeAlignmentToTemplate = (template:QrCodeType, size: number): QrCodeType => {
    const locations = getLocationsBySize(size);

    const newTemplate:QrCodeType = locations.reduce((temp:QrCodeType, loc:number[]) => {
        const [ nodex, nodey ]:number[] = loc;
        const newTemp:QrCodeType = mergePatternToTemplate(temp, getPattern(alignmentPatternSize), [nodex -2, nodey -2]);
        return newTemp;
    }, template);

    return newTemplate;
};

const nodeIsInAlignmentBlock = ([x, y]: [number, number], size:number): boolean => {
    const locations = getLocationsBySize(size);

    let isInBlock = false;
    locations.forEach((location) => {
        const xStart = location[0] - 2;
        const yStart = location[1] - 2;
        const xFinish = location[0] + 2;
        const yFinish = location[1] + 2;

        const xInAlignmentBlock = x >= xStart && x <= xFinish;
        const yInAlignmentBlock = y >= yStart && y <= yFinish;
        if (xInAlignmentBlock && yInAlignmentBlock) {
            isInBlock = true;
        }
    })

    return isInBlock;
}
export { mergeAlignmentToTemplate, nodeIsInAlignmentBlock, };
