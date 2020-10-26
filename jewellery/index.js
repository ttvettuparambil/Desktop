import hidden from './entries/hidden.js';
import client from './entries/client.js';
import navStart from './entries/navStart.js';
import navFinish from './entries/navFinish.js';
import wixStart from './entries/wixStart.js';
import wixFinish from './entries/wixFinish.js';
import scripts from './entries/scripts.js';
import images from './entries/images.js';
import fonts from './entries/fonts.js';
import fcp from './entries/fcp.js';
import tti_tbt from './entries/tti-tbt.js';
import lcp from './entries/lcp.js';
import cls from './entries/cls.js';
import fid from './entries/fid.js';
import pages from './entries/pages.js';

import config from './utils/config.js';
import {batch, extract} from './utils/utils.js';
import {applyConsent} from './utils/consent.js';
import {fireEvent} from './utils/windowEvents.js';

import loadInfo from './actions/loadInfo.js';
import markAndMeasure from './actions/markAndMeasure.js';
import log from './actions/log.js';
import lighthouse from './actions/lighthouse.js';

const TAG_ID = 'wix-perf-measure';

measure(window);

/**
 * Measure page performance
 * @param {Window} window 
 */
function measure(window) {
    if (typeof Promise !== 'function' || !Promise.allSettled) {
        return;
    }

    const {document, performance} = window;
    const script = document.currentScript || document.getElementById(TAG_ID);
    if (script) {
        config.load(window, script.dataset);
    }
    const {noMeasure, log: isLogging, label, clientType} = config;

    const state = [window, performance, window.PerformanceObserver, window.setTimeout, window.clearTimeout];
    const measurements = obtainMeasurements(state, clientType);
    loadInfo(window, document, script, measurements);
    Object.freeze(measurements);

    const together = measurements.slice(0, 3);
    const individually = measurements.slice(3, 5);
    if (!noMeasure) {
        markAndMeasure(performance, together);
    }
    if (isLogging) {
        log(together, individually);
    }

    window[label] = measurements;
    fireEvent(window, label, measurements);
}

/**
 * @param {import('../utils/utils.js').State} state 
 */
function obtainMeasurements(state, clientType) {
    const environment = batch('environment', client(state), navStart(state), wixStart(state));

    const initialPaint = fcp(state);
    const interaction = fid(state);
    const interactive = tti_tbt(state, extract(initialPaint, 'fcp'), interaction);
    const lastPaint = lcp(state, initialPaint, interactive);
    const layoutShift = cls(state, interactive, lastPaint);
    const score = lighthouse(state, initialPaint, interactive, lastPaint, layoutShift);

    const ss = scripts(state);
    const is = images(state);
    const fs = fonts(state);

    const loaded = batch('loaded', interactive, lastPaint, layoutShift, ss, is, fs, navFinish(state), wixFinish(state, interactive), score);

    return [environment, initialPaint, loaded, interaction, hidden(state), pages(state)]
        .map(measurement => measurement.then(result => {
            result.clientType = clientType;
            return Object.freeze(applyConsent(state[0], result));
        }));
}
