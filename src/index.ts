// import "@babel/polyfill";
import './index.html';
import './index.scss';

import './modules/BitAccessor/BitAccessor';
import img from './img/darth.jpeg';
import {inverse, grayscaled} from './modules/CanvasFilter/CanvasFilter';
import './modules/EncodeDecode/EncodeDecode';

(async function canvasFilter(): Promise<void> {
    const canvasCtx = await grayscaled(img);
    await inverse(canvasCtx);
}());
