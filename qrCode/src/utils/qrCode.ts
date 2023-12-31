import { QrCodeType } from "../components/QrCodeTypes";

import { getQrTempate, getQrSizeByVersion } from "./general";
import { mergeFinderToTemplate } from "./finder";
import { mergeSeparatorToTemplate } from './separator';
import { mergeTimingToTemplate } from "./timing";
import { mergeAlignmentToTemplate } from './alignment';
import { mergeMaskToTemplate } from "./mask";

const getTemplate = (version: string):QrCodeType => {
    const size:number = getQrSizeByVersion(version);
    let template: QrCodeType = getQrTempate(size);

    template = mergeFinderToTemplate(template);
    template = mergeSeparatorToTemplate(template);
    template = mergeTimingToTemplate(template);
    template = mergeAlignmentToTemplate(template, parseInt(version));
    template = mergeMaskToTemplate('111', template);

    return template;
};

export { getTemplate };