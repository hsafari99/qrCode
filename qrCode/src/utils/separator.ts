import { QrCodeType } from "../components/QrCodeTypes";
import { mergePatternToTemplate } from "./general";
import { emptyVal, finderPatternSize } from "./constants";

const horizontalSeparator: QrCodeType = [Array(finderPatternSize + 1).fill(emptyVal)];
const verticalSeparator:QrCodeType = Array(finderPatternSize + 1).fill(0).map((index:number) => [emptyVal]);

const mergeSeparatorToTemplate = (template: QrCodeType):QrCodeType => {
    // Horizontal Separators
    let mergedTemplate:QrCodeType = mergePatternToTemplate(template, horizontalSeparator, [ finderPatternSize, 0 ]);
    mergedTemplate = mergePatternToTemplate(mergedTemplate, horizontalSeparator, [ (template.length - finderPatternSize -1), 0 ]);
    mergedTemplate = mergePatternToTemplate(mergedTemplate, horizontalSeparator, [ finderPatternSize, (template.length - finderPatternSize -1) ]);

    // Vertical Separators
    mergedTemplate = mergePatternToTemplate(mergedTemplate, verticalSeparator, [ 0, finderPatternSize ]);
    mergedTemplate = mergePatternToTemplate(mergedTemplate, verticalSeparator, [ 0, (template.length - finderPatternSize -1) ]);
    mergedTemplate = mergePatternToTemplate(mergedTemplate, verticalSeparator, [ (template.length - finderPatternSize -1), finderPatternSize ]);

    return mergedTemplate;
};

export { mergeSeparatorToTemplate };