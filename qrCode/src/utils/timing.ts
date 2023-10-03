import { QrCodeNodeType, QrCodeType } from "../components/QrCodeTypes";
import { mergePatternToTemplate } from "./general";
import { emptyVal, fillVal, finderPatternSize } from "./constants";

const getHorizontalTiming = (templateSize: number):QrCodeType => [ Array(templateSize - (finderPatternSize * 2)).fill(emptyVal).map((val:QrCodeNodeType, index: number) => index%2 == 0 ? fillVal : emptyVal) ];

const getVerticalTiming = (templateSize:number):QrCodeType => Array(templateSize - (finderPatternSize * 2)).fill(0).map((val:QrCodeNodeType, index:number) => index%2 == 0 ? [ fillVal ] : [ emptyVal ]);

const mergeTimingToTemplate = (template:QrCodeType): QrCodeType => {
    const horizontalTiming: QrCodeType = getHorizontalTiming(template.length);
    const verticalTiming:QrCodeType = getVerticalTiming(template.length);

    let mergedTemplate = mergePatternToTemplate(template, horizontalTiming, [ finderPatternSize - 1, finderPatternSize + 1 ]);
    mergedTemplate = mergePatternToTemplate(mergedTemplate, verticalTiming, [ finderPatternSize + 1, finderPatternSize - 1 ]);

    return mergedTemplate;
};

export { mergeTimingToTemplate, };