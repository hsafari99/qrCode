import { QrCodeType } from "../components/QrCodeTypes";
import { getPattern, mergePatternToTemplate, } from './general';
import { finderPatternSize } from "./constants";

const getFinderPatternArray: QrCodeType = getPattern(finderPatternSize);


const mergeFinderToTemplate = (template: QrCodeType): QrCodeType => {
    const finderArr = getFinderPatternArray;

    let mergedTemplate = mergePatternToTemplate(template, finderArr, [0, 0]);
    mergedTemplate = mergePatternToTemplate(mergedTemplate, finderArr, [(template.length - finderArr.length), 0]);
    mergedTemplate = mergePatternToTemplate(mergedTemplate, finderArr, [0, (template.length - finderArr.length)]);
    return mergedTemplate;
}

export { mergeFinderToTemplate, };