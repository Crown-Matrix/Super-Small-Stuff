import {r as e} from "./rolldown-runtime-Cyuzqnbw.js";
import {t} from "./vite-runtime-zJ_50EbN.js";
function n() {
    return Math.floor(performance.now())
}
var r = typeof window < `u` && !!window.document
  , i = typeof WorkerGlobalScope < `u` && (typeof self < `u` && self instanceof WorkerGlobalScope && self.navigator instanceof WorkerNavigator || typeof globalThis < `u` && globalThis instanceof WorkerGlobalScope && globalThis.navigator instanceof WorkerNavigator)
  , a = r ? window : typeof WorkerGlobalScope < `u` && (typeof self < `u` && self instanceof WorkerGlobalScope && self || typeof globalThis < `u` && globalThis instanceof WorkerGlobalScope && globalThis);
a?.document?.readyState;
var o = a?.document?.visibilityState === `hidden`
  , s = `` + a?.location
  , c = /iPad|iPhone|iPod/.test(a.navigator?.userAgent)
  , l = c && typeof SharedWorker > `u`
  , u = ( () => {
    let e = a.navigator?.userAgent?.match(/Firefox[/\s](\d+\.\d+)/);
    return Array.isArray(e) && e.length >= 2 ? +e[1] : 0
}
)()
  , d = Date.now() - n()
  , f = () => {
    let e = a?.performance?.getEntriesByType?.(`navigation`)?.[0];
    if (e && e.responseStart > 0 && e.responseStart < a.performance.now())
        return e
}
  , p = `newrelic`;
function m(e={}) {
    try {
        a.dispatchEvent(new CustomEvent(p,{
            detail: e
        }))
    } catch {}
}
function h(e, t) {
    typeof console.debug == `function` && (console.debug(`New Relic Warning: https://github.com/newrelic/newrelic-browser-agent/blob/main/docs/warning-codes.md#${e}`, t),
    m({
        drained: null,
        type: `data`,
        name: `warn`,
        feature: `warn`,
        data: {
            code: e,
            secondary: t
        }
    }))
}
var g = new Map;
function _(...e) {
    return e.every(e => {
        if (g.has(e))
            return g.get(e);
        let t = typeof e == `function` ? e.toString() : ``
          , n = t.includes(`[native code]`)
          , r = t.includes(`nrWrapper`);
        return !n && !r && h(64, e?.name || t),
        g.set(e, n),
        n
    }
    )
}
var v = {
    beacon: `bam.nr-data.net`,
    errorBeacon: `bam.nr-data.net`
};
function y() {
    return a.NREUM ||= {},
    a.newrelic === void 0 && (a.newrelic = a.NREUM),
    a.NREUM
}
function b() {
    let e = y()
      , t = e.info || {};
    return e.info = {
        beacon: v.beacon,
        errorBeacon: v.errorBeacon,
        ...t
    },
    e
}
function x() {
    let e = y();
    return e.loader_config = {
        ...e.loader_config || {}
    },
    e
}
function S() {
    let e = y();
    return e.init = {
        ...e.init || {}
    },
    e
}
function C() {
    let e = y();
    return e.o || (e.o = {
        ST: a.setTimeout,
        SI: a.setImmediate || a.setInterval,
        CT: a.clearTimeout,
        XHR: a.XMLHttpRequest,
        REQ: a.Request,
        EV: a.Event,
        PR: a.Promise,
        MO: a.MutationObserver,
        FETCH: a.fetch,
        WS: a.WebSocket
    },
    _(...Object.values(e.o))),
    e
}
function ee(e, t) {
    let r = y();
    r.initializedAgents ??= {},
    t.initializedAt = {
        ms: n(),
        date: new Date
    },
    r.initializedAgents[e] = t,
    Object.keys(r.initializedAgents).length === 2 && h(69)
}
function w() {
    return b(),
    S(),
    C(),
    x(),
    y()
}
var te = Object.prototype.hasOwnProperty;
function ne(e, t, n) {
    if (te.call(e, t))
        return e[t];
    var r = n();
    if (Object.defineProperty && Object.keys)
        try {
            return Object.defineProperty(e, t, {
                value: r,
                writable: !0,
                enumerable: !1
            }),
            r
        } catch {}
    return e[t] = r,
    r
}
var re = class {
    constructor(e) {
        this.contextId = e
    }
}
  , T = `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`;
function ie(e, t) {
    return e ? e[t] & 15 : Math.random() * 16 | 0
}
function ae() {
    let e = a?.crypto || a?.msCrypto, t, n = 0;
    return e && e.getRandomValues && (t = e.getRandomValues(new Uint8Array(30))),
    T.split(``).map(e => e === `x` ? ie(t, n++).toString(16) : e === `y` ? (ie() & 3 | 8).toString(16) : e).join(``)
}
function oe(e) {
    let t = a?.crypto || a?.msCrypto, n, r = 0;
    t && t.getRandomValues && (n = t.getRandomValues(new Uint8Array(e)));
    let i = [];
    for (var o = 0; o < e; o++)
        i.push(ie(n, r++).toString(16));
    return i.join(``)
}
function se() {
    return oe(16)
}
function ce() {
    return oe(32)
}
var le = ae()
  , ue = `nr@context:${le}`
  , E = fe(void 0, `globalEE`)
  , de = y();
de.ee ||= E;
function fe(e, t) {
    var n = {}
      , r = {}
      , i = {}
      , a = !1;
    try {
        a = t.length === 16 ? de.initializedAgents?.[t]?.runtime.isolatedBacklog : !1
    } catch {}
    var o = {
        on: u,
        addEventListener: u,
        removeEventListener: d,
        emit: l,
        get: p,
        listeners: f,
        context: c,
        buffer: m,
        abort: s,
        isBuffering: h,
        debugId: t,
        backlog: a ? {} : e && typeof e.backlog == `object` ? e.backlog : {},
        isolatedBacklog: a
    };
    function s() {
        o._aborted = !0,
        Object.keys(o.backlog).forEach(e => {
            delete o.backlog[e]
        }
        )
    }
    return Object.defineProperty(o, "aborted", {
        get: () => {
            let t = o._aborted || !1;
            return t || (e && (t = e.aborted),
            t)
        }
    }),
    o;
    function c(e) {
        return e && e instanceof re ? e : e ? ne(e, ue, () => new re(ue)) : new re(ue)
    }
    function l(t, n, i, a, s) {
        if (s !== !1 && (s = !0),
        !(E.aborted && !a)) {
            e && s && e.emit(t, n, i);
            var l = c(i);
            f(t).forEach(e => {
                e.apply(l, n)
            }
            );
            var u = g()[r[t]];
            return u && u.push([o, t, n, l]),
            l
        }
    }
    function u(e, t) {
        n[e] = f(e).concat(t)
    }
    function d(e, t) {
        var r = n[e];
        if (r)
            for (var i = 0; i < r.length; i++)
                r[i] === t && r.splice(i, 1)
    }
    function f(e) {
        return n[e] || []
    }
    function p(e) {
        return i[e] = i[e] || fe(o, e)
    }
    function m(e, t) {
        let n = g();
        t ||= `feature`,
        !o.aborted && Object.entries(e || {}).forEach( ([e,i]) => {
            r[i] = t,
            t in n || (n[t] = [])
        }
        )
    }
    function h(e) {
        return !!g()[r[e]]
    }
    function g() {
        return o.backlog
    }
}
var pe = E.get(`handle`);
function D(e, t, n, r, i) {
    i ? (i.buffer([e], r),
    i.emit(e, t, n)) : (pe.buffer([e], r),
    pe.emit(e, t, n))
}
O.on = he;
var me = O.handlers = {};
function O(e, t, n, r) {
    he(r || pe, me, e, t, n)
}
function he(e, t, n, r, i) {
    i ||= `feature`,
    e ||= pe;
    var a = t[i] = t[i] || {};
    (a[n] = a[n] || []).push([e, r])
}
var ge = () => {
    let e = new WeakSet;
    return (t, n) => {
        if (typeof n == `object` && n) {
            if (e.has(n))
                return;
            e.add(n)
        }
        return n
    }
}
;
function k(e) {
    try {
        return JSON.stringify(e, ge()) ?? ``
    } catch (e) {
        try {
            E.emit(`internal-error`, [e])
        } catch {}
        return ``
    }
}
var _e = [];
function ve(e) {
    if (!e || ye(e))
        return !1;
    if (_e.length === 0)
        return !0;
    if (_e[0].hostname === `*`)
        return !1;
    for (var t = 0; t < _e.length; t++) {
        var n = _e[t];
        if (n.hostname.test(e.hostname) && n.pathname.test(e.pathname))
            return !1
    }
    return !0
}
function ye(e) {
    return e.hostname === void 0
}
function be(e) {
    if (_e = [],
    !(!e || !e.length))
        for (var t = 0; t < e.length; t++) {
            let n = e[t];
            if (!n)
                continue;
            if (n === `*`) {
                _e = [{
                    hostname: `*`
                }];
                return
            }
            n.indexOf(`http://`) === 0 ? n = n.substring(7) : n.indexOf(`https://`) === 0 && (n = n.substring(8));
            let r = n.indexOf(`/`), i, a;
            r > 0 ? (i = n.substring(0, r),
            a = n.substring(r)) : (i = n,
            a = `*`);
            let[o] = i.split(`:`);
            _e.push({
                hostname: xe(o),
                pathname: xe(a, !0)
            })
        }
}
function xe(e, t=!1) {
    let n = e.replace(/[.+?^${}()|[\]\\]/g, e => `\\` + e).replace(/\*/g, `.*?`);
    return RegExp((t ? `^` : ``) + n + `$`)
}
var Se = `events`
  , Ce = `jserrors`
  , we = `browser/blobs`
  , Te = `browser/logs`
  , A = {
    ajax: `ajax`,
    genericEvents: `generic_events`,
    jserrors: Ce,
    logging: `logging`,
    metrics: `metrics`,
    pageAction: `page_action`,
    pageViewEvent: `page_view_event`,
    pageViewTiming: `page_view_timing`,
    sessionReplay: `session_replay`,
    sessionTrace: `session_trace`,
    softNav: `soft_navigations`
}
  , Ee = {
    [A.pageViewEvent]: 1,
    [A.pageViewTiming]: 2,
    [A.metrics]: 3,
    [A.jserrors]: 4,
    [A.softNav]: 5,
    [A.ajax]: 6,
    [A.sessionTrace]: 7,
    [A.sessionReplay]: 8,
    [A.logging]: 9,
    [A.genericEvents]: 10
}
  , De = {
    [A.pageViewEvent]: `rum`,
    [A.pageViewTiming]: Se,
    [A.ajax]: Se,
    [A.softNav]: Se,
    [A.metrics]: Ce,
    [A.jserrors]: Ce,
    [A.sessionTrace]: we,
    [A.sessionReplay]: we,
    [A.logging]: Te,
    [A.genericEvents]: `ins`
}
  , Oe = A.ajax;
function ke(e, t) {
    if (!e)
        return;
    let n = {
        staged: !1,
        priority: Ee[t] || 0
    };
    e.runtime.drainRegistry.get(t) || e.runtime.drainRegistry.set(t, n)
}
function Ae(e, t) {
    if (!e)
        return;
    let n = e.runtime.drainRegistry;
    n && (n.get(t) && n.delete(t),
    Ne(e, t, !1),
    n.size && Me(e))
}
function je(e, t=`feature`, n=!1) {
    if (e) {
        if (!e.runtime.drainRegistry.get(t) || n)
            return Ne(e, t);
        e.runtime.drainRegistry.get(t).staged = !0,
        Me(e)
    }
}
function Me(e) {
    if (!e)
        return;
    let t = Array.from(e.runtime.drainRegistry);
    t.every( ([e,t]) => t.staged) && (t.sort( (e, t) => e[1].priority - t[1].priority),
    t.forEach( ([t]) => {
        e.runtime.drainRegistry.delete(t),
        Ne(e, t)
    }
    ))
}
function Ne(e, t, n=!0) {
    if (!e)
        return;
    let r = e.ee
      , i = O.handlers;
    if (!(!r || r.aborted || !r.backlog || !i)) {
        if (m({
            type: `lifecycle`,
            name: `drain`,
            feature: t
        }),
        n) {
            let e = r.backlog[t]
              , n = i[t];
            if (n) {
                for (let t = 0; e && t < e.length; ++t)
                    Pe(e[t], n);
                Object.entries(n).forEach( ([e,t]) => {
                    Object.values(t || {}).forEach(t => {
                        t[0]?.on && t[0].context() instanceof re && !t[0].listeners(e).includes(t[1]) && t[0].on(e, t[1])
                    }
                    )
                }
                )
            }
        }
        r.isolatedBacklog || delete i[t],
        r.backlog[t] = null,
        r.emit(`drain-` + t, [])
    }
}
function Pe(e, t) {
    var n = e[1];
    Object.values(t[n] || {}).forEach(t => {
        var n = e[0];
        if (t[0] === n) {
            var r = t[1]
              , i = e[3]
              , a = e[2];
            r.apply(i, a)
        }
    }
    )
}
var Fe = class {
    constructor(e, t) {
        this.agentRef = e,
        this.ee = e?.ee,
        this.featureName = t,
        this.blocked = !1
    }
    deregisterDrain() {
        Ae(this.agentRef, this.featureName)
    }
}
;
function Ie(e, t) {
    try {
        if (!e || typeof e != `object`)
            return h(3);
        if (!t || typeof t != `object`)
            return h(4);
        let n = Object.create(Object.getPrototypeOf(t), Object.getOwnPropertyDescriptors(t))
          , r = Object.keys(n).length === 0 ? e : n;
        for (let i in r)
            if (e[i] !== void 0)
                try {
                    if (e[i] === null) {
                        n[i] = null;
                        continue
                    }
                    Array.isArray(e[i]) && Array.isArray(t[i]) ? n[i] = Array.from(new Set([...e[i], ...t[i]])) : e[i] instanceof Map || e[i] instanceof Set || e[i] instanceof Date || e[i] instanceof RegExp ? n[i] = e[i] : typeof e[i] == `object` && typeof t[i] == `object` ? n[i] = Ie(e[i], t[i]) : n[i] = e[i]
                } catch (e) {
                    n[i] || h(1, e)
                }
        return n
    } catch (e) {
        h(2, e)
    }
}
var Le = {
    beacon: v.beacon,
    errorBeacon: v.errorBeacon,
    licenseKey: void 0,
    applicationID: void 0,
    sa: void 0,
    queueTime: void 0,
    applicationTime: void 0,
    ttGuid: void 0,
    user: void 0,
    account: void 0,
    product: void 0,
    extra: void 0,
    jsAttributes: {},
    userAttributes: void 0,
    atts: void 0,
    transactionName: void 0,
    tNamePlain: void 0
};
function Re(e) {
    try {
        return !!e.licenseKey && !!e.errorBeacon && !!e.applicationID
    } catch {
        return !1
    }
}
var ze = e => Ie(e, Le)
  , Be = `api-`
  , Ve = `api-ixn-`
  , He = `addPageAction`
  , Ue = `addToTrace`
  , We = `addRelease`
  , Ge = `finished`
  , Ke = `interaction`
  , qe = `noticeError`
  , Je = `pauseReplay`
  , Ye = `recordCustomEvent`
  , Xe = `recordReplay`
  , Ze = `register`
  , Qe = `setApplicationVersion`
  , $e = `setCurrentRouteName`
  , et = `setCustomAttribute`
  , tt = `setErrorHandler`
  , nt = `setPageViewName`
  , rt = `setUserId`
  , it = `start`
  , at = `wrapLogger`
  , ot = `measure`
  , st = `consent`
  , ct = class e {
    #e(t, ...n) {
        if (this[t] === e.prototype[t])
            h(35, t);
        else
            return this[t](...n)
    }
    addPageAction(e, t) {
        return this.#e(He, e, t)
    }
    register(e) {
        return this.#e(Ze, e)
    }
    recordCustomEvent(e, t) {
        return this.#e(Ye, e, t)
    }
    setPageViewName(e, t) {
        return this.#e(nt, e, t)
    }
    setCustomAttribute(e, t, n) {
        return this.#e(et, e, t, n)
    }
    noticeError(e, t) {
        return this.#e(qe, e, t)
    }
    setUserId(e, t=!1) {
        return this.#e(rt, e, t)
    }
    setApplicationVersion(e) {
        return this.#e(Qe, e)
    }
    setErrorHandler(e) {
        return this.#e(tt, e)
    }
    addRelease(e, t) {
        return this.#e(We, e, t)
    }
    log(e, t) {
        return this.#e(`log`, e, t)
    }
    start() {
        return this.#e(it)
    }
    finished(e) {
        return this.#e(Ge, e)
    }
    recordReplay() {
        return this.#e(Xe)
    }
    pauseReplay() {
        return this.#e(Je)
    }
    addToTrace(e) {
        return this.#e(Ue, e)
    }
    setCurrentRouteName(e) {
        return this.#e($e, e)
    }
    interaction(e) {
        return this.#e(Ke, e)
    }
    wrapLogger(e, t, n) {
        return this.#e(at, e, t, n)
    }
    measure(e, t) {
        return this.#e(ot, e, t)
    }
    consent(e) {
        return this.#e(st, e)
    }
}
;
function lt(e) {
    let t = w();
    Object.getOwnPropertyNames(ct.prototype).forEach(n => {
        let r = ct.prototype[n];
        if (typeof r != `function` || r === `constructor`)
            return;
        let i = t[n];
        !e[n] || e.exposed === !1 || e.runtime?.loaderType === `micro-agent` || (t[n] = (...t) => {
            let r = e[n](...t);
            return i ? i(...t) : r
        }
        )
    }
    )
}
var ut = A.genericEvents
  , dt = [`auxclick`, `click`, `copy`, `keydown`, `paste`, `scrollend`]
  , ft = [`focus`, `blur`]
  , pt = 2e3
  , mt = [`PageAction`, `UserAction`, `BrowserPerformance`]
  , ht = {
    RESOURCES: `experimental.resources`,
    REGISTER: `register`
}
  , gt = e => {
    if (!e || typeof e != `string`)
        return !1;
    try {
        document.createDocumentFragment().querySelector(e)
    } catch {
        return !1
    }
    return !0
}
  , _t = `NRBA`
  , vt = `SESSION`
  , yt = 144e5
  , bt = 18e5
  , j = {
    STARTED: `session-started`,
    PAUSE: `session-pause`,
    RESET: `session-reset`,
    RESUME: `session-resume`,
    UPDATE: `session-update`
}
  , xt = {
    SAME_TAB: `same-tab`,
    CROSS_TAB: `cross-tab`
}
  , M = {
    OFF: 0,
    FULL: 1,
    ERROR: 2
}
  , St = `[data-nr-mask]`
  , Ct = () => {
    let e = {
        feature_flags: [],
        experimental: {
            register: !1,
            resources: !1
        },
        mask_selector: `*`,
        block_selector: `[data-nr-block]`,
        mask_input_options: {
            color: !1,
            date: !1,
            "datetime-local": !1,
            email: !1,
            month: !1,
            number: !1,
            range: !1,
            search: !1,
            tel: !1,
            text: !1,
            time: !1,
            url: !1,
            week: !1,
            textarea: !1,
            select: !1,
            password: !0
        }
    };
    return {
        ajax: {
            deny_list: void 0,
            block_internal: !0,
            enabled: !0,
            autoStart: !0
        },
        api: {
            register: {
                get enabled() {
                    return e.feature_flags.includes(ht.REGISTER) || e.experimental.register
                },
                set enabled(t) {
                    e.experimental.register = t
                },
                duplicate_data_to_container: !1
            }
        },
        browser_consent_mode: {
            enabled: !1
        },
        distributed_tracing: {
            enabled: void 0,
            exclude_newrelic_header: void 0,
            cors_use_newrelic_header: void 0,
            cors_use_tracecontext_headers: void 0,
            allowed_origins: void 0
        },
        get feature_flags() {
            return e.feature_flags
        },
        set feature_flags(t) {
            e.feature_flags = t
        },
        generic_events: {
            enabled: !0,
            autoStart: !0
        },
        harvest: {
            interval: 30
        },
        jserrors: {
            enabled: !0,
            autoStart: !0
        },
        logging: {
            enabled: !0,
            autoStart: !0
        },
        metrics: {
            enabled: !0,
            autoStart: !0
        },
        obfuscate: void 0,
        page_action: {
            enabled: !0
        },
        page_view_event: {
            enabled: !0,
            autoStart: !0
        },
        page_view_timing: {
            enabled: !0,
            autoStart: !0
        },
        performance: {
            capture_marks: !1,
            capture_measures: !1,
            capture_detail: !0,
            resources: {
                get enabled() {
                    return e.feature_flags.includes(ht.RESOURCES) || e.experimental.resources
                },
                set enabled(t) {
                    e.experimental.resources = t
                },
                asset_types: [],
                first_party_domains: [],
                ignore_newrelic: !0
            }
        },
        privacy: {
            cookies_enabled: !0
        },
        proxy: {
            assets: void 0,
            beacon: void 0
        },
        session: {
            expiresMs: yt,
            inactiveMs: bt
        },
        session_replay: {
            autoStart: !0,
            enabled: !1,
            preload: !1,
            sampling_rate: 10,
            error_sampling_rate: 100,
            collect_fonts: !1,
            inline_images: !1,
            fix_stylesheets: !0,
            mask_all_inputs: !0,
            get mask_text_selector() {
                return e.mask_selector
            },
            set mask_text_selector(t) {
                gt(t) ? e.mask_selector = `${t},${St}` : t === `` || t === null ? e.mask_selector = St : h(5, t)
            },
            get block_class() {
                return `nr-block`
            },
            get ignore_class() {
                return `nr-ignore`
            },
            get mask_text_class() {
                return `nr-mask`
            },
            get block_selector() {
                return e.block_selector
            },
            set block_selector(t) {
                gt(t) ? e.block_selector += `,${t}` : t !== `` && h(6, t)
            },
            get mask_input_options() {
                return e.mask_input_options
            },
            set mask_input_options(t) {
                t && typeof t == `object` ? e.mask_input_options = {
                    ...t,
                    password: !0
                } : h(7, t)
            }
        },
        session_trace: {
            enabled: !0,
            autoStart: !0
        },
        soft_navigations: {
            enabled: !0,
            autoStart: !0
        },
        ssl: void 0,
        user_actions: {
            enabled: !0,
            elementAttributes: [`id`, `className`, `tagName`, `type`]
        }
    }
}
  , wt = e => Ie(e, Ct())
  , Tt = `1.313.1`
  , Et = `@newrelic/rrweb`
  , Dt = `1.1.0`
  , Ot = 0
  , kt = {
    buildEnv: `NPM`,
    distMethod: `NPM`,
    version: Tt,
    originTime: d
}
  , At = {
    consented: !1
}
  , jt = {
    activatedFeatures: void 0,
    appMetadata: {},
    configured: !1,
    get consented() {
        return this.session?.state?.consent || At.consented
    },
    set consented(e) {
        At.consented = e
    },
    customTransaction: void 0,
    denyList: [],
    disabled: !1,
    drainRegistry: new Map,
    harvester: void 0,
    isolatedBacklog: !1,
    isRecording: !1,
    loaderType: void 0,
    maxBytes: 3e4,
    obfuscator: void 0,
    onerror: void 0,
    ptid: void 0,
    releaseIds: {},
    session: void 0,
    timeKeeper: void 0,
    registeredEntities: [],
    jsAttributesMetadata: {
        bytes: 0
    },
    get harvestCount() {
        return ++Ot
    }
}
  , Mt = e => {
    let t = Ie(e, jt)
      , n = Object.keys(kt).reduce( (e, t) => (e[t] = {
        value: kt[t],
        writable: !1,
        configurable: !0,
        enumerable: !0
    },
    e), {});
    return Object.defineProperties(t, n)
}
  , Nt = {
    accountID: void 0,
    trustKey: void 0,
    agentID: void 0,
    licenseKey: void 0,
    applicationID: void 0,
    xpid: void 0
}
  , Pt = e => Ie(e, Nt);
function Ft(e, t={}, n, r) {
    let {init: a, info: o, loader_config: s, runtime: c={}, exposed: l=!0} = t;
    if (!o) {
        let e = w();
        a = e.init,
        o = e.info,
        s = e.loader_config
    }
    e.init = wt(a || {}),
    e.loader_config = Pt(s || {}),
    o.jsAttributes ??= {},
    i && (o.jsAttributes.isWorker = !0),
    e.info = ze(o);
    let u = e.init;
    e.runtime ??= Mt(c),
    u.proxy.assets && u.proxy.assets,
    e.runtime.configured || (Object.defineProperty(e, "beacons", {
        get() {
            return [e.info.beacon, e.info.errorBeacon, e.init.proxy.assets, e.init.proxy.beacon].filter(Boolean)
        }
    }),
    Object.defineProperty(e.runtime, "denyList", {
        get() {
            return [...e.init.ajax.deny_list || [], ...e.init.ajax.block_internal ? e.beacons : []]
        }
    }),
    e.runtime.ptid = e.agentIdentifier,
    lt(e),
    e.runtime.loaderType = n,
    e.ee = E.get(e.agentIdentifier),
    e.exposed = l,
    m({
        drained: !!e.runtime.activatedFeatures,
        type: `lifecycle`,
        name: `initialize`,
        feature: void 0,
        data: e.config
    }),
    e.runtime.configured = !0)
}
function It() {
    return a?.location?.protocol === `file:`
}
var Lt = class {
    constructor(e) {
        this.agentRef = e,
        this.warnedRegexMissing = !1,
        this.warnedInvalidRegex = !1,
        this.warnedInvalidReplacement = !1
    }
    get obfuscateConfigRules() {
        return this.agentRef.init.obfuscate || []
    }
    obfuscateString(e) {
        if (typeof e != `string` || e.trim().length === 0)
            return e;
        let t = this.obfuscateConfigRules.map(e => this.validateObfuscationRule(e));
        return It() && t.push({
            regex: /^file:\/\/(.*)/,
            replacement: atob(`ZmlsZTovL09CRlVTQ0FURUQ=`)
        }),
        t.filter(e => e.isValid).reduce( (e, t) => {
            let {rule: n} = t;
            return e.replace(n.regex, n.replacement || `*`)
        }
        , e)
    }
    validateObfuscationRule(e) {
        let t = e.regex === void 0
          , n = e.regex !== void 0 && typeof e.regex != `string` && !(e.regex instanceof RegExp)
          , r = !!(e.replacement && typeof e.replacement != `string`);
        return t && !this.warnedRegexMissing ? (h(12, e),
        this.warnedRegexMissing = !0) : n && !this.warnedInvalidRegex && (h(13, e),
        this.warnedInvalidRegex = !0),
        r && !this.warnedInvalidReplacement && (h(14, e),
        this.warnedInvalidReplacement = !0),
        {
            rule: e,
            isValid: !t && !n && !r,
            errors: {
                regexMissingDetected: t,
                invalidRegexDetected: n,
                invalidReplacementDetected: r
            }
        }
    }
}
  , Rt = A.metrics
  , N = `storeSupportabilityMetrics`
  , zt = `storeEventMetrics`;
function P(e, t) {
    return {
        capture: e,
        passive: !1,
        signal: t
    }
}
function Bt(e, t, n=!1, r) {
    window.addEventListener(e, t, P(n, r))
}
function Vt(e, t, n=!1, r) {
    document.addEventListener(e, t, P(n, r))
}
function Ht(e, t=!1, n, r) {
    Vt(`visibilitychange`, i, n, r);
    function i() {
        if (t) {
            document.visibilityState === `hidden` && e();
            return
        }
        e(document.visibilityState)
    }
}
function Ut(e, t, n) {
    Bt(`pagehide`, e, t, n)
}
if (i) {
    a.cleanupTasks = [];
    let e = a.close;
    a.close = () => {
        for (let e of a.cleanupTasks)
            e();
        e()
    }
}
function Wt(e, t) {
    r ? Ht(e, !0, t) : i && a.cleanupTasks.push(e)
}
var Gt = /([^?#]*)[^#]*(#[^?]*|$).*/
  , Kt = /([^?#]*)().*/;
function F(e, t) {
    return e && e.replace(t ? Gt : Kt, `$1$2`)
}
var qt = {
    "%2C": `,`,
    "%3A": `:`,
    "%2F": `/`,
    "%40": `@`,
    "%24": `$`,
    "%3B": `;`
}
  , Jt = new RegExp(Object.keys(qt).join(`|`),`g`);
function Yt(e) {
    return qt[e]
}
function Xt(e) {
    return e == null ? `null` : encodeURIComponent(e).replace(Jt, Yt)
}
function Zt(e, t) {
    var n = 0
      , r = ``;
    return Object.entries(e || {}).forEach( ([e,i]) => {
        var a = [], o, s;
        if (typeof i == `string` || !Array.isArray(i) && i != null && i.toString().length)
            o = `&` + e + `=` + Xt(i),
            n += o.length,
            r += o;
        else if (Array.isArray(i) && i.length) {
            for (n += 9,
            s = 0; s < i.length && (o = Xt(k(i[s])),
            n += o.length,
            !(t !== void 0 && n >= t)); s++)
                a.push(o);
            r += `&` + e + `=%5B` + a.join(`,`) + `%5D`
        }
    }
    ),
    r
}
function Qt(e, t, n={}) {
    return Object.keys(n).includes(e) ? `` : t && typeof t == `string` ? `&` + e + `=` + Xt(t) : ``
}
function $t({isFinalHarvest: e=!1}={}) {
    return e && r ? nn : typeof XMLHttpRequest < `u` ? tn : en
}
function en({url: e, body: t=null, method: n=`POST`, headers: r=[{
    key: `content-type`,
    value: `text/plain`
}]}) {
    let i = {};
    for (let e of r)
        i[e.key] = e.value;
    return fetch(e, {
        headers: i,
        method: n,
        body: t
    })
}
function tn({url: e, body: t=null, sync: n, method: r=`POST`, headers: i=[{
    key: `content-type`,
    value: `text/plain`
}]}) {
    let a = new XMLHttpRequest;
    return a.open(r, e, !n),
    i.forEach(e => {
        a.setRequestHeader(e.key, e.value)
    }
    ),
    a.send(t),
    a
}
function nn({url: e, body: t}) {
    try {
        return window.navigator.sendBeacon.bind(window.navigator)(e, t)
    } catch {
        return !1
    }
}
var rn = `Harvester/Retry/Attempted/`
  , an = `Harvester/Retry/Failed/`
  , on = `Harvester/Retry/Succeeded/`
  , sn = class {
    #e = !1;
    initializedAggregates = [];
    constructor(e) {
        this.agentRef = e,
        Wt( () => {
            this.initializedAggregates.forEach(e => {
                typeof e.harvestOpts.beforeUnload == `function` && e.harvestOpts.beforeUnload()
            }
            ),
            this.initializedAggregates.forEach(e => this.triggerHarvestFor(e, {
                isFinalHarvest: !0
            }))
        }
        , !1)
    }
    startTimer(e=this.agentRef.init.harvest.interval) {
        if (this.#e)
            return;
        this.#e = !0;
        let t = () => {
            this.initializedAggregates.forEach(e => this.triggerHarvestFor(e)),
            setTimeout(t, e * 1e3)
        }
        ;
        setTimeout(t, e * 1e3)
    }
    triggerHarvestFor(e, t={}) {
        let n = {
            ranSend: !1,
            payload: void 0,
            endpointVersion: e.harvestEndpointVersion || 1
        };
        if (e.blocked || this.agentRef.init?.browser_consent_mode?.enabled && !this.agentRef.runtime.consented)
            return n;
        let r = $t(t);
        if (!r)
            return n;
        let i = !t.isFinalHarvest && r === tn;
        if (n.payload = e.makeHarvestPayload(i, t),
        !n.payload)
            return n;
        return ln(this.agentRef, {
            endpoint: De[e.featureName],
            payload: n.payload,
            localOpts: t,
            submitMethod: r,
            cbFinished: a,
            raw: e.harvestOpts.raw,
            featureName: e.featureName,
            endpointVersion: n.endpointVersion
        }),
        n.ranSend = !0,
        n;
        function a(n) {
            if (e.harvestOpts.prevAttemptCode) {
                let t = t => D(N, [t], void 0, A.metrics, e.ee);
                t(rn + e.featureName),
                t((n.retry ? an : on) + e.harvestOpts.prevAttemptCode),
                delete e.harvestOpts.prevAttemptCode
            }
            n.retry && (e.harvestOpts.prevAttemptCode = n.status),
            t.forceNoRetry && (n.retry = !1),
            e.postHarvestCleanup(n)
        }
    }
}
  , cn = {};
function ln(e, {endpoint: t, payload: n, localOpts: r={}, submitMethod: a, cbFinished: o, raw: s, featureName: c, endpointVersion: l=1}) {
    if (!e.info.errorBeacon)
        return !1;
    let {body: u, qs: d} = un(n);
    if (Object.keys(u).length === 0 && !r.sendEmptyBody)
        return o && o({
            sent: !1
        }),
        !1;
    let f = e.init.ssl === !1 ? `http` : `https`
      , p = e.init.proxy.beacon || e.info.errorBeacon
      , g = s ? `${f}://${p}/${t}` : `${f}://${p}${t === `rum` ? `` : `/` + t}/${l}/${e.info.licenseKey}`
      , _ = s ? `` : dn(e, d, t)
      , v = Zt(d, e.runtime.maxBytes);
    _ === `` && v.startsWith(`&`) && (v = v.substring(1));
    let y = `${g}?${_}${v}`
      , b = d?.attributes?.includes(`gzip`) || t === `events` ? u : k(u);
    (!b || b.length === 0 || b === `{}` || b === `[]`) && (b = ``),
    t !== `browser/blobs` && b.length > 75e4 && (cn[t] = (cn[t] || 0) + 1) === 1 && h(28, t);
    let x = [{
        key: `content-type`,
        value: `text/plain`
    }]
      , S = a({
        url: y,
        body: b,
        sync: r.isFinalHarvest && i,
        headers: x
    });
    if (!r.isFinalHarvest && o) {
        a === tn ? S.addEventListener(`loadend`, function() {
            o({
                sent: this.status !== 0,
                status: this.status,
                retry: C(this.status),
                fullUrl: y,
                xhr: this,
                responseText: this.responseText
            }),
            C(this.status) || t()
        }, P(!1)) : a === en && S.then(async function(e) {
            let n = e.status;
            o({
                sent: !0,
                status: n,
                retry: C(n),
                fullUrl: y,
                fetchResponse: e,
                responseText: await e.text()
            }),
            C(n) || t()
        });
        function t() {
            try {
                if (c === A.jserrors && !u?.err)
                    return;
                let t = _.includes(`hr=1`)
                  , n = _.includes(`ht=1`)
                  , r = d?.attributes?.includes(`hasError=true`);
                D(`harvest-metadata`, [{
                    [c]: {
                        ...t && {
                            hasReplay: t
                        },
                        ...n && {
                            hasTrace: n
                        },
                        ...r && {
                            hasError: r
                        }
                    }
                }], void 0, A.metrics, e.ee)
            } catch {}
        }
    }
    return m({
        drained: !!e.runtime?.activatedFeatures,
        type: `data`,
        name: `harvest`,
        feature: c,
        data: {
            endpoint: t,
            headers: x,
            payload: n,
            submitMethod: ee(),
            raw: s,
            synchronousXhr: !!(r.isFinalHarvest && i)
        }
    }),
    !0;
    function C(e) {
        switch (e) {
        case 408:
        case 429:
        case 500:
            return !0
        }
        return e >= 502 && e <= 504 || e >= 512 && e <= 530
    }
    function ee() {
        return a === tn ? `xhr` : a === en ? `fetch` : `beacon`
    }
}
function un(e={}) {
    let t = e => typeof Uint8Array < `u` && e instanceof Uint8Array || Array.isArray(e) || typeof e == `string` ? e : Object.entries(e || {}).reduce( (e, [t,n]) => ((typeof n == `number` || typeof n == `string` && n.length > 0 || typeof n == `object` && Object.keys(n || {}).length > 0) && (e[t] = n),
    e), {});
    return {
        body: t(e.body),
        qs: t(e.qs)
    }
}
function dn(e, t, r) {
    let i = e.runtime.obfuscator.obfuscateString(F(`` + a.location))
      , o = e.runtime.session
      , s = !!o?.state.sessionReplaySentFirstChunk && o?.state.sessionReplayMode === 1 && r !== `jserrors`
      , c = !!o?.state.traceHarvestStarted && o?.state.sessionTraceMode === 1 && ![`browser/logs`, `browser/blobs`].includes(r)
      , l = [`a=` + e.info.applicationID, Qt(`sa`, e.info.sa ? `` + e.info.sa : ``), Qt(`v`, Tt), u(), Qt(`ct`, e.runtime.customTransaction), `&rst=` + n(), `&ck=0`, `&s=` + (o?.state.value || `0`), Qt(`ref`, i), Qt(`ptid`, e.runtime.ptid ? `` + e.runtime.ptid : ``)];
    return s && l.push(Qt(`hr`, `1`, t)),
    c && l.push(Qt(`ht`, `1`, t)),
    l.join(``);
    function u() {
        return e.info.transactionName ? Qt(`to`, e.info.transactionName) : Qt(`t`, e.info.tNamePlain || `Unnamed Transaction`)
    }
}
var fn = 1e6
  , pn = `SESSION_ERROR`
  , mn = {
    [A.logging]: !0,
    [A.genericEvents]: !0,
    [A.jserrors]: !0,
    [A.ajax]: !0
}
  , hn = class {
    #e = [];
    #t = 0;
    #n;
    #r;
    constructor(e=fn, t) {
        this.maxPayloadSize = e,
        this.featureAgg = t
    }
    get length() {
        return this.#e.length
    }
    isEmpty() {
        return this.#e.length === 0
    }
    get() {
        return this.#e
    }
    byteSize() {
        return this.#t
    }
    wouldExceedMaxSize(e) {
        return this.#t + e > this.maxPayloadSize
    }
    add(e, t) {
        let n = t || k(e)?.length || 0;
        if (this.#t + n > this.maxPayloadSize) {
            let e = e => `EventBuffer/${e}/Dropped/Bytes`;
            return this.featureAgg?.reportSupportabilityMetric(e(this.featureAgg.featureName), n),
            this.featureAgg?.reportSupportabilityMetric(e(`Combined`), n),
            !1
        }
        return this.#e.push(e),
        this.#t += n,
        this.featureAgg?.decideEarlyHarvest(),
        !0
    }
    merge(e, t) {
        if (this.isEmpty() || !e)
            return !1;
        let n = this.#e.findIndex(e);
        return n < 0 ? !1 : (this.#e[n] = {
            ...this.#e[n],
            ...t
        },
        !0)
    }
    clear(e={}) {
        e.clearBeforeTime !== void 0 && e.timestampKey ? this.#e = this.#e.filter(t => t[e.timestampKey] >= e.clearBeforeTime) : e.clearBeforeIndex === void 0 ? this.#e = [] : this.#e = this.#e.slice(e.clearBeforeIndex),
        this.#t = this.#e.length && k(this.#e)?.length || 0
    }
    save() {
        this.#n = this.#e,
        this.#r = this.#t
    }
    clearSave() {
        this.#n = void 0,
        this.#r = void 0
    }
    reloadSave() {
        this.#n && (this.#r + this.#t > this.maxPayloadSize || (this.#e = [...this.#n, ...this.#e],
        this.#t = this.#r + this.#t))
    }
}
  , gn = class {
    constructor() {
        this.aggregatedData = {}
    }
    store(e, t, n, r, i) {
        var a = this.#e(e, t, n, i);
        return a.metrics = _n(r, a.metrics),
        a
    }
    merge(e, t, n, r, i, a=!1) {
        var o = this.#e(e, t, r, i);
        if (a && (o.params = r),
        !o.metrics) {
            o.metrics = n;
            return
        }
        var s = o.metrics;
        s.count += n.count,
        Object.keys(n || {}).forEach(e => {
            if (e !== `count`) {
                var t = s[e]
                  , r = n[e];
                r && !r.c ? s[e] = vn(r.t, t) : s[e] = bn(r, s[e])
            }
        }
        )
    }
    storeMetric(e, t, n, r) {
        var i = this.#e(e, t, n);
        return i.stats = vn(r, i.stats),
        i
    }
    take(e, t=!0) {
        for (var n = {}, r = ``, i = !1, a = 0; a < e.length; a++)
            r = e[a],
            n[r] = Object.values(this.aggregatedData[r] || {}),
            n[r].length && (i = !0),
            t && delete this.aggregatedData[r];
        return i ? n : null
    }
    #e(e, t, n, r) {
        this.aggregatedData[e] || (this.aggregatedData[e] = {});
        var i = this.aggregatedData[e][t];
        return i || (i = this.aggregatedData[e][t] = {
            params: n || {}
        },
        r && (i.custom = r)),
        i
    }
}
;
function _n(e, t) {
    return t ||= {
        count: 0
    },
    t.count += 1,
    Object.entries(e || {}).forEach( ([e,n]) => {
        t[e] = vn(n, t[e])
    }
    ),
    t
}
function vn(e, t) {
    return e == null ? yn(t) : t ? (t.c || (t = xn(t.t)),
    t.c += 1,
    t.t += e,
    t.sos += e * e,
    e > t.max && (t.max = e),
    e < t.min && (t.min = e),
    t) : {
        t: e
    }
}
function yn(e) {
    return e ? e.c++ : e = {
        c: 1
    },
    e
}
function bn(e, t) {
    return t ? (t.c || (t = xn(t.t)),
    t.min = Math.min(e.min, t.min),
    t.max = Math.max(e.max, t.max),
    t.t += e.t,
    t.sos += e.sos,
    t.c += e.c,
    t) : e
}
function xn(e) {
    return {
        t: e,
        min: e,
        max: e,
        sos: e * e,
        c: 1
    }
}
var Sn = class {
    #e = new gn;
    #t = {};
    byteSize() {
        return 0
    }
    isEmpty({aggregatorTypes: e}) {
        return e ? e.every(e => !this.#e.aggregatedData[e]) : Object.keys(this.#e.aggregatedData).length === 0
    }
    add([e,t,n,r,i]) {
        return this.#e.store(e, t, n, r, i),
        !0
    }
    addMetric(e, t, n, r) {
        return this.#e.storeMetric(e, t, n, r),
        !0
    }
    save({aggregatorTypes: e}) {
        let t = e.toString()
          , n = {};
        e.forEach(e => n[e] = this.#e.aggregatedData[e]),
        this.#t[t] = n
    }
    get(e) {
        let t = Array.isArray(e) ? e : e.aggregatorTypes;
        return this.#e.take(t, !1)
    }
    clear({aggregatorTypes: e}={}) {
        if (!e) {
            this.#e.aggregatedData = {};
            return
        }
        e.forEach(e => delete this.#e.aggregatedData[e])
    }
    reloadSave({aggregatorTypes: e}) {
        let t = e.toString()
          , n = this.#t[t];
        e.forEach(e => {
            Object.keys(n[e] || {}).forEach(t => {
                let r = n[e][t];
                this.#e.merge(e, t, r.metrics, r.params, r.custom, !0)
            }
            )
        }
        )
    }
    clearSave({aggregatorTypes: e}) {
        let t = e.toString();
        delete this.#t[t]
    }
}
  , Cn = class extends Fe {
    constructor(e, t) {
        super(e, t),
        this.checkConfiguration(e),
        this.doOnceForAllAggregate(e),
        this.customAttributesAreSeparate = !1,
        this.canHarvestEarly = !0,
        this.isRetrying = !1,
        this.harvestOpts = {},
        this.#e(),
        this.waitForDrain()
    }
    #e() {
        if (!this.events)
            switch (this.featureName) {
            case A.sessionReplay:
                break;
            case A.jserrors:
            case A.metrics:
                this.events = this.agentRef.sharedAggregator ??= new Sn;
                break;
            default:
                this.events = new hn(fn,this);
                break
            }
    }
    get supportsRegisteredEntities() {
        return this.featureName in mn && (mn[this.featureName] || this.agentRef.init.feature_flags.includes(`register.` + this.featureName))
    }
    get harvestEndpointVersion() {
        return this.supportsRegisteredEntities && this.agentRef.runtime.registeredEntities.length ? 2 : 1
    }
    waitForDrain() {
        this.ee.on(`drain-` + this.featureName, () => {
            this.drained || setTimeout( () => this.agentRef.runtime.harvester.triggerHarvestFor(this), 1),
            this.drained = !0
        }
        )
    }
    decideEarlyHarvest() {
        if (!this.canHarvestEarly || this.blocked || this.isRetrying)
            return;
        let e = this.events.byteSize() + (this.customAttributesAreSeparate ? this.agentRef.runtime.jsAttributesMetadata.bytes : 0);
        e > 16e3 && (this.agentRef.runtime.harvester.triggerHarvestFor(this),
        this.reportSupportabilityMetric(`${this.featureName}/Harvest/Early/Seen`, e))
    }
    waitForFlags(e=[]) {
        return new Promise( (t, n) => {
            this.agentRef.runtime?.activatedFeatures ? t(r(this.agentRef.runtime.activatedFeatures)) : this.ee.on(`rumresp`, (e={}) => {
                t(r(e))
            }
            );
            function r(t) {
                return e.map(e => t[e] ? t[e] : 0)
            }
        }
        ).catch(e => {
            this.ee.emit(`internal-error`, [e]),
            this.blocked = !0,
            this.deregisterDrain()
        }
        )
    }
    drain() {
        je(this.agentRef, this.featureName)
    }
    preHarvestChecks(e) {
        return !this.blocked && !this.ee.aborted
    }
    makeHarvestPayload(e=!1, t={}) {
        if (!this.events || this.events.isEmpty(this.harvestOpts) || this.preHarvestChecks && !this.preHarvestChecks(t))
            return;
        e && this.events.save(this.harvestOpts);
        let n = this.events.get(this.harvestOpts);
        if (!n)
            return;
        this.events.clear(this.harvestOpts);
        let r = {
            body: this.serializer ? this.serializer(n) : n
        };
        return this.queryStringsBuilder && (r.qs = this.queryStringsBuilder(n)),
        r
    }
    postHarvestCleanup(e={}) {
        this.isRetrying = e.sent && e.retry,
        this.isRetrying && this.events.reloadSave(this.harvestOpts),
        this.events.clearSave(this.harvestOpts)
    }
    checkConfiguration(e) {
        if (!Re(e.info)) {
            let t = w()
              , n = {
                ...t.info?.jsAttributes
            };
            try {
                n = {
                    ...n,
                    ...e.info?.jsAttributes
                }
            } catch {}
            Ft(e, {
                ...t,
                info: {
                    ...t.info,
                    jsAttributes: n
                },
                runtime: e.runtime
            }, e.runtime.loaderType)
        }
    }
    doOnceForAllAggregate(e) {
        e.runtime.obfuscator || (e.runtime.obfuscator = new Lt(e)),
        this.obfuscator = e.runtime.obfuscator,
        e.runtime.harvester || (e.runtime.harvester = new sn(e))
    }
    reportSupportabilityMetric(e, t) {
        D(N, [e, t], void 0, A.metrics, this.ee)
    }
}
;
function wn(e) {
    return e?.constructor === {}.constructor
}
function Tn({body: e, query: t}={}) {
    if (!(!e && !t))
        try {
            let n = Dn(On(e));
            if (n)
                return n;
            let r = En(kn(t));
            if (r)
                return r
        } catch {}
}
function En(e) {
    if (typeof e != `object` || !e.query || typeof e.query != `string`)
        return;
    let t = e.query.trim().match(/^(query|mutation|subscription)\s?(\w*)/)
      , n = t?.[1];
    if (n)
        return {
            operationName: e.operationName || t?.[2] || `Anonymous`,
            operationType: n,
            operationFramework: `GraphQL`
        }
}
function Dn(e) {
    if (!e)
        return;
    Array.isArray(e) || (e = [e]);
    let t = []
      , n = [];
    for (let r of e) {
        let e = En(r);
        e && (t.push(e.operationName),
        n.push(e.operationType))
    }
    if (n.length)
        return {
            operationName: t.join(`,`),
            operationType: n.join(`,`),
            operationFramework: `GraphQL`
        }
}
function On(e) {
    let t;
    if (!e || typeof e != `string` && typeof e != `object` || (t = typeof e == `string` ? JSON.parse(e) : e,
    !wn(t) && !Array.isArray(t)))
        return;
    let n = !1;
    if (n = Array.isArray(t) ? t.some(e => An(e)) : An(t),
    n)
        return t
}
function kn(e) {
    if (!e || typeof e != `string`)
        return;
    let t = new URLSearchParams(e);
    return On(Object.fromEntries(t))
}
function An(e) {
    return !(typeof e != `object` || !e.query || typeof e.query != `string`)
}
var jn = Object.prototype.hasOwnProperty
  , Mn = 64;
function Nn(e, t, n) {
    return e || e === 0 || e === `` ? t(e) + (n ? `,` : ``) : `!`
}
function I(e, t) {
    return t ? Math.floor(e).toString(36) : e === void 0 || e === 0 ? `` : Math.floor(e).toString(36)
}
function Pn(e) {
    let t = 0
      , n = Object.prototype.hasOwnProperty.call(Object, `create`) ? Object.create(null) : {};
    return r;
    function r(r) {
        return r === void 0 || r === `` ? `` : (r = e.obfuscateString(String(r)),
        jn.call(n, r) ? I(n[r], !0) : (n[r] = t++,
        Ln(r)))
    }
}
function Fn(e, t) {
    var n = [];
    return Object.entries(e || {}).forEach( ([e,r]) => {
        if (!(n.length >= Mn)) {
            var i = 5, a;
            switch (e = t(e),
            typeof r) {
            case `object`:
                r ? a = t(k(r)) : i = 9;
                break;
            case `number`:
                i = 6,
                a = r % 1 ? r : r + `.`;
                break;
            case `boolean`:
                i = r ? 7 : 8;
                break;
            case `undefined`:
                i = 9;
                break;
            default:
                a = t(r)
            }
            n.push([i, e + (a ? `,` + a : ``)])
        }
    }
    ),
    n
}
var In = /([,\\;])/g;
function Ln(e) {
    return `'` + e.replace(In, `\\$1`)
}
var Rn = /function (.+?)\s*\(/, zn = /^\s*at .+ \(eval at \S+ \((?:(?:file|http|https):[^)]+)?\)(?:, [^:]*:\d+:\d+)?\)$/i, Bn = /^\s*at Function code \(Function code:\d+:\d+\)\s*/i, Vn = /^\s*at (?:((?:\[object object\])?(?:[^(]*\([^)]*\))*[^()]*(?: \[as \S+\])?) )?\(?((?:file|http|https|chrome-extension):.*?)?:(\d+)(?::(\d+))?\)?\s*$/i, Hn = /^\s*(?:([^@]*)(?:\(.*?\))?@)?((?:file|http|https|chrome|safari-extension).*?):(\d+)(?::(\d+))?\s*$/i, Un = class {
    dom = new Wn;
    performance = new Wn;
    constructor(e) {
        this.url = e
    }
    get script() {
        let e = Math.max(this.dom.start, this.performance.end);
        return {
            start: e,
            end: Math.max(this.dom.end, this.performance.end, e)
        }
    }
}
, Wn = class {
    start = 0;
    end = 0;
    value = void 0
}
, Gn;
try {
    Gn = Zn(Qn())[0]
} catch (e) {
    Gn = Zn(e)[0]
}
var Kn = e => e.initiatorType === `script` || [`link`, `fetch`].includes(e.initiatorType) && e.name.endsWith(`.js`)
  , qn = new Map
  , Jn = [];
function Yn(e) {
    return qn.get(e)
}
function Xn(e) {
    let t = Yn(e);
    if (t)
        return t;
    let n = new Un(e);
    if (qn.set(e, n),
    qn.size > 1e3) {
        let e = qn.keys().next().value;
        qn.delete(e)
    }
    return n
}
a.MutationObserver && a.document && new MutationObserver(e => {
    e.forEach(e => {
        e.addedNodes.forEach(e => {
            if (e.nodeName === `SCRIPT` && e.src) {
                let t = Xn(F(e.src));
                t.dom.start = n(),
                t.dom.value = e;
                let r = () => {
                    t.dom.end = n()
                }
                ;
                [`load`, `error`].forEach(t => e.addEventListener(t, r, {
                    once: !0
                }))
            }
        }
        )
    }
    )
}
).observe(a.document, {
    childList: !0,
    subtree: !0
}),
a.PerformanceObserver?.supportedEntryTypes.includes(`resource`) && new PerformanceObserver(e => {
    e.getEntries().filter(Kn).forEach(e => {
        let t = Xn(F(e.name));
        t.performance.start = Math.floor(e.startTime),
        t.performance.end = Math.floor(e.responseEnd),
        t.performance.value = e;
        let r = [];
        Jn.forEach( ({test: t, addedAt: i}, a) => {
            (t(e) || n() - i > 1e4) && r.push(a)
        }
        ),
        Jn = Jn.filter( (e, t) => !r.includes(t))
    }
    )
}
).observe({
    type: `resource`,
    buffered: !0
});
function Zn(e) {
    if (!e || typeof e != `string`)
        return [];
    let t = new Set
      , n = e.split(`
`);
    for (let e of n) {
        let n = e.match(Hn) || e.match(Vn) || e.match(zn);
        if (n && n[2])
            t.add(F(n[2]));
        else {
            let n = e.match(/\(([^)]+\.js):\d+:\d+\)/) || e.match(/^\s+at\s+([^\s(]+\.js):\d+:\d+/);
            n && n[1] && t.add(F(n[1]))
        }
    }
    return [...t]
}
function Qn() {
    let e;
    try {
        let t = Error.stackTraceLimit;
        Error.stackTraceLimit = 50,
        e = Error().stack,
        Error.stackTraceLimit = t
    } catch {
        e = Error().stack
    }
    return e
}
function $n(e) {
    if (!e || !a.document)
        return !1;
    try {
        let t = a.document.querySelectorAll(`link[rel="preload"][as="script"]`);
        for (let n of t)
            if (F(n.href) === e)
                return !0
    } catch {}
    return !1
}
function er(e, t) {
    return F(e.name) === t
}
function tr(e, t) {
    e.fetchStart = Math.floor(t.startTime),
    e.fetchEnd = Math.floor(t.responseEnd),
    e.asset = t.name,
    e.type = t.initiatorType
}
function nr() {
    let e = {
        registeredAt: n(),
        reportedAt: void 0,
        fetchStart: 0,
        fetchEnd: 0,
        scriptStart: 0,
        scriptEnd: 0,
        asset: void 0,
        type: `unknown`
    }
      , t = Qn();
    if (!t)
        return e;
    let r = a.performance?.getEntriesByType(`navigation`)?.[0]?.name || ``;
    try {
        let i = Zn(t)
          , a = (i.length > 1 ? i.filter(e => Gn !== e) : i)[0];
        if (!a)
            return e;
        if (r.includes(a))
            return e.asset = F(r),
            e.type = `inline`,
            e;
        e.correlation = Yn(a);
        let o = e.correlation?.performance.value || performance.getEntriesByType(`resource`).find(e => er(e, a));
        o ? tr(e, o) : $n(a) && (e.asset = a,
        e.type = `preload`,
        Jn.push({
            addedAt: n(),
            test: t => er(t, a) ? (tr(e, t),
            !0) : !1
        })),
        Object.defineProperty(e, "scriptStart", {
            get: () => e.correlation?.script.start || e.fetchEnd
        }),
        Object.defineProperty(e, "scriptEnd", {
            get: () => e.correlation?.script.end || e.registeredAt
        })
    } catch {}
    return e
}
var rr = {
    MFE: `MFE`,
    BA: `BA`
};
function ir(e, t) {
    return !e || !t?.init.api.register.enabled ? [] : t.runtime.registeredEntities?.filter(t => t.metadata.timings?.asset?.endsWith(e)).map(e => e.metadata.target) || []
}
function ar(e, t) {
    if (!lr(t))
        return {};
    let n = t.agentRef.runtime.appMetadata.agents[0].entityGuid;
    return e ? e.attributes : {
        "entity.guid": n,
        appId: t.agentRef.info.applicationID
    }
}
function or(e, t) {
    return sr(e, t) ? {
        "child.id": e.id,
        "child.type": e.type,
        ...ar(void 0, t)
    } : {}
}
function sr(e, t) {
    return !!e && !!lr(t) && t.agentRef.init.api.register.duplicate_data_to_container
}
function cr(e) {
    if (!e?.init.api.register.enabled)
        return [void 0];
    let t = [];
    try {
        var n = Zn(Qn());
        let r = n.length - 1;
        for (; n[r]; )
            t.push(...ir(n[r--], e))
    } catch {}
    return t.length || t.push(void 0),
    t
}
function lr(e) {
    return e?.harvestEndpointVersion === 2
}
var ur = class extends Cn {
    static featureName = Oe;
    constructor(e) {
        super(e, Oe),
        be(e.runtime.denyList);
        let t = this;
        e.init.ajax.block_internal ? super.customAttributesAreSeparate = !0 : super.canHarvestEarly = !1,
        O(`returnAjax`, e => this.events.add(e), this.featureName, this.ee),
        O(`xhr`, function(e, n, r, i, a, o) {
            t.storeXhr(e, n, r, i, a, o, this)
        }, this.featureName, this.ee),
        this.ee.on(`long-task`, (e, t) => {
            if (t instanceof C().o.XHR) {
                let n = this.ee.context(t);
                n.latestLongtaskEnd = e.end
            }
        }
        ),
        this.waitForFlags([]).then( () => this.drain())
    }
    storeXhr(e, t, n, r, i, a, o) {
        t.time = n;
        let s;
        s = e.cat ? k([e.status, e.cat]) : k([e.status, e.host, e.pathname]);
        let c = ve(e)
          , l = this.agentRef.init.feature_flags?.includes(`ajax_metrics_deny_list`);
        if (this.agentRef.features?.[A.jserrors] && (c || !l) && this.agentRef.sharedAggregator?.add([`xhr`, s, e, t]),
        !c) {
            e.hostname === this.agentRef.info.errorBeacon || this.agentRef.init.proxy?.beacon && e.hostname === this.agentRef.init.proxy.beacon ? (this.reportSupportabilityMetric(`Ajax/Events/Excluded/Agent`),
            l && this.reportSupportabilityMetric(`Ajax/Metrics/Excluded/Agent`)) : (this.reportSupportabilityMetric(`Ajax/Events/Excluded/App`),
            l && this.reportSupportabilityMetric(`Ajax/Metrics/Excluded/App`));
            return
        }
        D(`bstXhrAgg`, [`xhr`, s, e, t], void 0, A.sessionTrace, this.ee);
        let u = {
            method: e.method,
            status: e.status,
            domain: e.host,
            path: e.pathname,
            requestSize: t.txSize,
            responseSize: t.rxSize,
            type: i,
            startTime: n,
            endTime: r,
            callbackDuration: t.cbTime
        };
        o.dt && (u.spanId = o.dt.spanId,
        u.traceId = o.dt.traceId,
        u.spanTimestamp = Math.floor(this.agentRef.runtime.timeKeeper.correctAbsoluteTimestamp(o.dt.timestamp))),
        u.gql = e.gql = Tn({
            body: o.body,
            query: o.parsedOrigin?.search
        }),
        u.gql && this.reportSupportabilityMetric(`Ajax/Events/GraphQL/Bytes-Added`, k(u.gql).length),
        a ? (this.events.add({
            ...u,
            targetAttributes: ar(a, this)
        }),
        sr(a, this) && this.reportContainerEvent({
            ...u,
            targetAttributes: or(a, this)
        }, o)) : this.reportContainerEvent(u, o)
    }
    reportContainerEvent(e, t) {
        this.agentRef.features?.[A.softNav] ? D(`ajax`, [e, t], void 0, A.softNav, this.ee) : this.events.add(e)
    }
    serializer(e) {
        if (!e.length)
            return;
        let t = Pn(this.agentRef.runtime.obfuscator)
          , n = `bel.7;`
          , r = 0;
        for (let i = 0; i < e.length; i++) {
            let a = e[i]
              , o = a.startTime - r;
            i === 0 && (r = a.startTime);
            let s = [I(o), I(a.endTime - a.startTime), I(0), I(0), t(a.method), I(a.status), t(a.domain), t(a.path), I(a.requestSize), I(a.responseSize), a.type === `fetch` ? 1 : ``, t(0), Nn(a.spanId, t, !0) + Nn(a.traceId, t, !0) + Nn(a.spanTimestamp, I, !1)]
              , c = `2,`
              , l = this.agentRef.info.jsAttributes
              , u = Fn({
                ...l || {},
                ...a.gql || {},
                ...a.targetAttributes || {}
            }, t);
            s.unshift(I(u.length)),
            c += s.join(`,`),
            u && u.length > 0 && (c += `;` + u.join(`;`)),
            i + 1 < e.length && (c += `;`),
            n += c
        }
        return n
    }
}
;
function dr(e, t, n=`string`, r=[]) {
    return !e || typeof e != `object` || Object.keys(e).forEach(i => {
        typeof e[i] == `object` ? dr(e[i], t, n, r) : typeof e[i] === n && !r.includes(i) && (e[i] = t(e[i]))
    }
    ),
    e
}
var fr = (e, t=[]) => {
    let n = {
        path: void 0,
        nearestFields: {},
        hasButton: !1,
        hasLink: !1
    };
    if (!e)
        return n;
    if (e === window)
        return n.path = `window`,
        n;
    if (e === document)
        return n.path = `document`,
        n;
    let r = ``
      , i = mr(e);
    try {
        for (; e?.tagName; ) {
            let i = e.tagName.toLowerCase();
            n.hasLink ||= i === `a`,
            n.hasButton ||= i === `button` || i === `input` && e.type.toLowerCase() === `button`,
            t.forEach(t => {
                n.nearestFields[hr(t)] ||= e[t]?.baseVal || e[t]
            }
            ),
            r = pr(e, r),
            e = e.parentNode
        }
    } catch {}
    return n.path = r ? i ? `${r}:nth-of-type(${i})` : r : void 0,
    n
}
;
function pr(e, t) {
    let {id: n, localName: r} = e;
    return [r, n ? `#${n}` : ``, t ? `>${t}` : ``].join(``)
}
function mr(e) {
    try {
        let t = 1
          , {tagName: n} = e;
        for (; e.previousElementSibling; )
            e.previousElementSibling.tagName === n && t++,
            e = e.previousElementSibling;
        return t
    } catch {}
}
function hr(e) {
    return e === `tagName` && (e = `tag`),
    e === `className` && (e = `class`),
    `nearest${e.charAt(0).toUpperCase() + e.slice(1)}`
}
var gr = class {
    constructor(e, t) {
        this.event = e,
        this.count = 1,
        this.originMs = Math.floor(e.timeStamp),
        this.relativeMs = [0],
        this.selectorPath = t.path,
        this.rageClick = void 0,
        this.nearestTargetFields = t.nearestFields,
        this.currentUrl = F(`` + location),
        this.deadClick = !1,
        this.errorClick = !1
    }
    aggregate(e) {
        this.count++,
        this.relativeMs.push(Math.floor(e.timeStamp - this.originMs)),
        this.isRageClick() && (this.rageClick = !0)
    }
    isRageClick() {
        let e = this.relativeMs.length;
        return this.event.type === `click` && e >= 4 && this.relativeMs[e - 1] - this.relativeMs[e - 4] < 1e3
    }
}
  , _r = class {
    constructor(e, t) {
        if (!e.onEnd)
            throw Error(`onEnd handler is required`);
        if (!t)
            throw Error(`ms duration is required`);
        this.onEnd = e.onEnd,
        this.initialMs = t,
        this.startTimestamp = Date.now(),
        this.timer = this.create(this.onEnd, t)
    }
    create(e, t) {
        return this.timer && this.clear(),
        setTimeout( () => e ? e() : this.onEnd(), t || this.initialMs)
    }
    clear() {
        clearTimeout(this.timer),
        this.timer = null
    }
    end() {
        this.clear(),
        this.onEnd()
    }
    isValid() {
        return this.initialMs - (Date.now() - this.startTimestamp) > 0
    }
}
  , vr = class {
    #e = void 0;
    #t = ``;
    #n = void 0;
    #r = void 0;
    #i = void 0;
    constructor() {
        C().o.MO && (this.#r = new MutationObserver(this.isLiveClick.bind(this)))
    }
    get aggregationEvent() {
        let e = this.#e;
        return this.#t = ``,
        this.#e = void 0,
        e
    }
    process(e, t) {
        if (!e)
            return;
        let n = fr(ft.includes(e.type) ? window : e.target, t)
          , r = yr(e, n.path);
        if (r && r === this.#t)
            this.#e.aggregate(e);
        else {
            let t = this.#e;
            return this.#c(),
            this.#o(),
            this.#t = r,
            this.#e = new gr(e,n),
            e.type === `click` && (n.hasButton || n.hasLink) && (this.#s(this.#e),
            this.#a()),
            t
        }
    }
    markAsErrorClick() {
        this.#e && this.#i && (this.#e.errorClick = !0,
        this.#o())
    }
    #a() {
        this.#i = new _r({
            onEnd: () => {
                this.#o()
            }
        },pt)
    }
    #o() {
        this.#i?.clear(),
        this.#i = void 0
    }
    #s(e) {
        this.#l() || !this.#r || (this.#r.observe(document, {
            attributes: !0,
            characterData: !0,
            childList: !0,
            subtree: !0
        }),
        this.#n = new _r({
            onEnd: () => {
                e.deadClick = !0,
                this.#c()
            }
        },pt))
    }
    #c() {
        this.#r?.disconnect(),
        this.#n?.clear(),
        this.#n = void 0
    }
    #l() {
        return this.#n !== void 0
    }
    isLiveClick() {
        this.#l() && this.#c()
    }
}
;
function yr(e, t) {
    let n = e.type;
    return e.type !== `scrollend` && (n += `-` + t),
    n
}
function br(e) {
    return e ? e.self !== e.top : !1
}
var xr = class extends Cn {
    static featureName = ut;
    #e;
    constructor(e) {
        super(e, ut),
        this.referrerUrl = r && document.referrer ? F(document.referrer) : void 0,
        this.waitForFlags([`ins`]).then( ([t]) => {
            if (!t) {
                this.blocked = !0,
                this.deregisterDrain();
                return
            }
            this.#n(),
            O(`api-recordCustomEvent`, (e, t, n, r) => {
                if (mt.includes(t))
                    return h(46);
                this.addEvent({
                    eventType: t,
                    timestamp: this.#t(e),
                    ...n
                }, r)
            }
            , this.featureName, this.ee),
            e.init.page_action.enabled && O(`api-addPageAction`, (e, t, n, i) => {
                this.addEvent({
                    ...n,
                    eventType: `PageAction`,
                    timestamp: this.#t(e),
                    timeSinceLoad: e / 1e3,
                    actionName: t,
                    referrerUrl: this.referrerUrl,
                    ...r && {
                        browserWidth: window.document.documentElement?.clientWidth,
                        browserHeight: window.document.documentElement?.clientHeight
                    }
                }, i)
            }
            , this.featureName, this.ee);
            let n = () => {}
            ;
            r && e.init.user_actions.enabled && (this.#e = new vr,
            this.harvestOpts.beforeUnload = () => n?.(this.#e.aggregationEvent),
            n = e => {
                try {
                    if (e?.event) {
                        let {target: t, timeStamp: n, type: r} = e.event
                          , i = {
                            eventType: `UserAction`,
                            timestamp: this.#t(n),
                            action: r,
                            actionCount: e.count,
                            actionDuration: e.relativeMs[e.relativeMs.length - 1],
                            actionMs: e.relativeMs,
                            rageClick: e.rageClick,
                            target: e.selectorPath,
                            currentUrl: e.currentUrl,
                            ...br(window) && {
                                iframe: !0
                            },
                            ...this.agentRef.init.user_actions.elementAttributes.reduce( (e, n) => (o(n) && (e[a(n)] = String(t[n]).trim().slice(0, 128)),
                            e), {}),
                            ...e.nearestTargetFields,
                            ...e.deadClick && {
                                deadClick: !0
                            },
                            ...e.errorClick && {
                                errorClick: !0
                            }
                        };
                        this.addEvent(i),
                        this.#r(i);
                        function a(e) {
                            return e === `tagName` && (e = `tag`),
                            e === `className` && (e = `class`),
                            `target${e.charAt(0).toUpperCase() + e.slice(1)}`
                        }
                        function o(n) {
                            return !!(e.selectorPath !== `window` && e.selectorPath !== `document` && t instanceof HTMLElement && t?.[n])
                        }
                    }
                } catch {}
            }
            ,
            O(`ua`, e => {
                n(this.#e.process(e, this.agentRef.init.user_actions.elementAttributes))
            }
            , this.featureName, this.ee),
            O(`navChange`, () => {
                this.#e.isLiveClick()
            }
            , this.featureName, this.ee),
            O(`uaXhr`, () => {
                this.#e.isLiveClick()
            }
            , this.featureName, this.ee),
            O(`uaErr`, () => this.#e.markAsErrorClick(), this.featureName, this.ee));
            let i = [...e.init.performance.capture_marks ? [`mark`] : [], ...e.init.performance.capture_measures ? [`measure`] : []];
            if (i.length)
                try {
                    i.forEach(t => {
                        PerformanceObserver.supportedEntryTypes.includes(t) && new PerformanceObserver(n => {
                            n.getEntries().forEach(n => {
                                try {
                                    this.reportSupportabilityMetric(`Generic/Performance/` + t + `/Seen`);
                                    let r = e.init.performance.capture_detail ? i(n.detail) : {};
                                    this.addEvent({
                                        ...r,
                                        eventType: `BrowserPerformance`,
                                        timestamp: this.#t(n.startTime),
                                        entryName: n.name,
                                        entryDuration: n.duration,
                                        entryType: t
                                    });
                                    function i(e) {
                                        if (e == null)
                                            return {};
                                        if (wn(e))
                                            return t(e);
                                        return {
                                            entryDetail: e
                                        };
                                        function t(e, n=`entryDetail`) {
                                            let r = {};
                                            return e == null || Object.keys(e).forEach(i => {
                                                let a = n + `.` + i;
                                                wn(e[i]) ? Object.assign(r, t(e[i], a)) : e[i] !== null && e[i] !== void 0 && (r[a] = e[i])
                                            }
                                            ),
                                            r
                                        }
                                    }
                                } catch {}
                            }
                            )
                        }
                        ).observe({
                            buffered: !0,
                            type: t
                        })
                    }
                    )
                } catch {}
            r && e.init.performance.resources.enabled && O(`browserPerformance.resource`, t => {
                try {
                    let {name: n, duration: r, ...i} = t.toJSON()
                      , o = !1;
                    try {
                        let t = new URL(n).hostname
                          , r = t.includes(`newrelic.com`) || t.includes(`nr-data.net`) || t.includes(`nr-local.net`);
                        if (this.agentRef.init.performance.resources.ignore_newrelic && r || this.agentRef.init.performance.resources.asset_types.length && !this.agentRef.init.performance.resources.asset_types.includes(i.initiatorType))
                            return;
                        o = t === a?.location.hostname || e.init.performance.resources.first_party_domains.includes(t),
                        o && this.reportSupportabilityMetric(`Generic/Performance/FirstPartyResource/Seen`),
                        r && this.reportSupportabilityMetric(`Generic/Performance/NrResource/Seen`)
                    } catch {}
                    this.reportSupportabilityMetric(`Generic/Performance/Resource/Seen`);
                    let s = {
                        ...i,
                        eventType: `BrowserPerformance`,
                        timestamp: this.#t(i.startTime),
                        entryName: F(n),
                        entryDuration: r,
                        firstParty: o
                    };
                    this.addEvent(s)
                } catch (e) {
                    this.ee.emit(`internal-error`, [e, `GenericEvents-Resource`])
                }
            }
            , this.featureName, this.ee),
            O(`api-measure`, (e, t, n) => {
                let {start: r, duration: i, customAttributes: a} = e
                  , o = {
                    ...a,
                    eventType: `BrowserPerformance`,
                    timestamp: this.#t(r),
                    entryName: t,
                    entryDuration: i,
                    entryType: `measure`
                };
                this.addEvent(o, n)
            }
            , this.featureName, this.ee),
            e.init.feature_flags.includes(`websockets`) && O(`ws-complete`, e => {
                let t = {
                    ...e,
                    eventType: `WebSocket`,
                    timestamp: this.#t(e.timestamp),
                    openedAt: this.#t(e.openedAt),
                    closedAt: this.#t(e.closedAt)
                };
                this.reportSupportabilityMetric(`WebSocket/Completed/Seen`),
                this.reportSupportabilityMetric(`WebSocket/Completed/Bytes`, k(t).length),
                this.addEvent(t)
            }
            , this.featureName, this.ee),
            e.init.feature_flags.includes(`no_spv`) || O(`spv`, e => {
                this.addEvent({
                    eventType: `SecurityPolicyViolation`,
                    timestamp: this.#t(e.timeStamp),
                    blockedUri: e.blockedURI,
                    documentUri: e.documentURI,
                    effectiveDirective: e.effectiveDirective,
                    originalPolicy: e.originalPolicy,
                    sourceFile: e.sourceFile,
                    statusCode: e.statusCode,
                    lineNumber: e.lineNumber,
                    columnNumber: e.columnNumber,
                    disposition: e.disposition,
                    sample: e.sample,
                    referrer: e.referrer
                })
            }
            , this.featureName, this.ee),
            this.drain()
        }
        )
    }
    addEvent(e={}, t) {
        if (!e || !Object.keys(e).length)
            return;
        if (!e.eventType) {
            h(44);
            return
        }
        for (let t in e) {
            let n = e[t];
            e[t] = n && typeof n == `object` ? k(n) : n
        }
        let r = {
            timestamp: this.#t(n()),
            pageUrl: F(`` + s),
            currentUrl: F(`` + location),
            ...ar(t, this)
        }
          , i = {
            ...this.agentRef.info.jsAttributes || {},
            ...r,
            ...e
        };
        this.events.add(i)
    }
    serializer(e) {
        return dr({
            ins: e
        }, this.obfuscator.obfuscateString.bind(this.obfuscator), `string`)
    }
    queryStringsBuilder() {
        return {
            ua: this.agentRef.info.userAttributes,
            at: this.agentRef.info.atts
        }
    }
    #t(e) {
        return Math.floor(this.agentRef.runtime.timeKeeper.correctRelativeTimestamp(e))
    }
    #n() {
        this.agentRef.init.performance.capture_marks && this.reportSupportabilityMetric(`Config/Performance/CaptureMarks/Enabled`),
        this.agentRef.init.performance.capture_measures && this.reportSupportabilityMetric(`Config/Performance/CaptureMeasures/Enabled`),
        this.agentRef.init.performance.resources.enabled && this.reportSupportabilityMetric(`Config/Performance/Resources/Enabled`),
        this.agentRef.init.performance.resources.asset_types?.length !== 0 && this.reportSupportabilityMetric(`Config/Performance/Resources/AssetTypes/Changed`),
        this.agentRef.init.performance.resources.first_party_domains?.length !== 0 && this.reportSupportabilityMetric(`Config/Performance/Resources/FirstPartyDomains/Changed`),
        this.agentRef.init.performance.resources.ignore_newrelic === !1 && this.reportSupportabilityMetric(`Config/Performance/Resources/IgnoreNewrelic/Changed`)
    }
    #r(e) {
        e.rageClick && this.reportSupportabilityMetric(`UserAction/RageClick/Seen`),
        e.deadClick && this.reportSupportabilityMetric(`UserAction/DeadClick/Seen`),
        e.errorClick && this.reportSupportabilityMetric(`UserAction/ErrorClick/Seen`)
    }
}
  , Sr = /([a-z0-9]+)$/i;
function Cr(e) {
    if (!e)
        return;
    let t = e.match(Sr);
    if (t)
        return t[1]
}
var wr = /^\n+|\n+$/g
  , Tr = 65530;
function Er(e) {
    return Dr(e).replace(wr, ``)
}
function Dr(e) {
    var t;
    if (e.length > 100) {
        var n = e.length - 100;
        t = e.slice(0, 50).join(`
`),
        t += `
< ...truncated ` + n + ` lines... >
`,
        t += e.slice(-50).join(`
`)
    } else
        t = e.join(`
`);
    return t
}
function Or(e) {
    return e.length > Tr ? e.substr(0, Tr) : e
}
function kr(e) {
    if (typeof e != `string`)
        return ``;
    let t = F(e);
    return t === F(s) ? `<inline>` : t
}
var Ar = !1;
function jr(e) {
    var t = null;
    try {
        if (t = Mr(e),
        t)
            return t
    } catch (e) {
        if (Ar)
            throw e
    }
    try {
        if (t = Fr(e),
        t)
            return t
    } catch (e) {
        if (Ar)
            throw e
    }
    try {
        if (t = Ir(e),
        t)
            return t
    } catch (e) {
        if (Ar)
            throw e
    }
    return {
        mode: `failed`,
        stackString: ``,
        frames: []
    }
}
function Mr(e) {
    if (!e.stack)
        return null;
    var t = e.stack.split(`
`).reduce(Nr, {
        frames: [],
        stackLines: [],
        wrapperSeen: !1
    });
    return t.frames.length ? {
        mode: `stack`,
        name: e.name || Lr(e),
        message: e.message,
        stackString: Er(t.stackLines),
        frames: t.frames
    } : null
}
function Nr(e, t) {
    let n = Pr(t);
    if (!n)
        return e.stackLines.push(t),
        e;
    if (Rr(n.func) && (e.wrapperSeen = !0),
    !e.wrapperSeen) {
        let r = kr(n.url);
        r !== n.url && (t = t.replace(n.url, r),
        n.url = r),
        e.stackLines.push(t),
        e.frames.push(n)
    }
    return e
}
function Pr(e) {
    var t = e.match(Hn);
    if (t ||= e.match(Vn),
    t)
        return {
            url: t[2],
            func: t[1] !== `Anonymous function` && t[1] !== `global code` && t[1] || null,
            line: +t[3],
            column: t[4] ? +t[4] : null
        };
    if (e.match(zn) || e.match(Bn) || e === `anonymous`)
        return {
            func: `evaluated code`
        }
}
function Fr(e) {
    if (!(`line` in e))
        return null;
    var t = e.name || Lr(e);
    if (!e.sourceURL)
        return {
            mode: `sourceline`,
            name: t,
            message: e.message,
            stackString: t + `: ` + e.message + `
    in evaluated code`,
            frames: [{
                func: `evaluated code`
            }]
        };
    var n = kr(e.sourceURL)
      , r = t + `: ` + e.message + `
    at ` + n;
    return e.line && (r += `:` + e.line,
    e.column && (r += `:` + e.column)),
    {
        mode: `sourceline`,
        name: t,
        message: e.message,
        stackString: r,
        frames: [{
            url: n,
            line: e.line,
            column: e.column
        }]
    }
}
function Ir(e) {
    var t = e.name || Lr(e);
    return t ? {
        mode: `nameonly`,
        name: t,
        message: e.message,
        stackString: t + `: ` + e.message,
        frames: []
    } : null
}
function Lr(e) {
    var t = Rn.exec(String(e.constructor));
    return t && t.length > 1 ? t[1] : `unknown`
}
function Rr(e) {
    return e && e.indexOf(`nrWrapper`) >= 0
}
function zr(e) {
    var t = 0, n;
    if (!e || !e.length)
        return t;
    for (var r = 0; r < e.length; r++)
        n = e.charCodeAt(r),
        t = (t << 5) - t + n,
        t |= 0;
    return t
}
var Br = A.jserrors
  , Vr = `Rrweb`;
function Hr(e, t, n) {
    let r = {
        shouldSwallow: t || !1,
        reason: n || `Other`
    }
      , i = e.frames?.[0];
    if (!i || typeof e?.message != `string`)
        return r;
    let a = i?.url?.match(/nr-(.*)-recorder.min.js/)
      , o = i?.url?.match(/rrweb/)
      , s = i?.url?.match(/recorder/)
      , c = e.message.toLowerCase().match(/an attempt was made to break through the security policy of the user agent/);
    return a || o ? (r.shouldSwallow = !0,
    r.reason = Vr,
    c && (r.reason += `-Security-Policy`)) : s && c && (r.shouldSwallow = !0,
    r.reason = `Rrweb-Security-Policy`),
    r
}
function Ur(e) {
    let t = ``;
    if (!e?.cause)
        return t;
    if (e.cause instanceof Error) {
        let n = jr(e.cause);
        t = n.stackString || e.cause.stack,
        n.message && !t.includes(n.message) && (t = n.message + `
` + t),
        n.name && !t.includes(n.name) && (t = n.name + `: ` + t)
    } else
        t = typeof e.cause == `string` ? e.cause : k(e.cause);
    return t ||= e.cause.toString(),
    t
}
var Wr = class extends Error {
}
  , Gr = class extends Cn {
    static featureName = Br;
    constructor(e) {
        super(e, Br),
        this.harvestOpts.aggregatorTypes = [`err`, `ierr`, `xhr`],
        this.stackReported = {},
        this.observedAt = {},
        this.pageviewReported = {},
        this.errorOnPage = !1,
        O(`err`, this.processError.bind(this), this.featureName, this.ee),
        O(`ierr`, this.processError.bind(this), this.featureName, this.ee),
        O(`returnJserror`, (e, t) => this.#a(e, t), this.featureName, this.ee),
        this.waitForFlags([`err`]).then( ([e]) => {
            e ? this.drain() : (this.blocked = !0,
            this.deregisterDrain())
        }
        )
    }
    serializer(e) {
        return dr(e, this.obfuscator.obfuscateString.bind(this.obfuscator), `string`)
    }
    queryStringsBuilder(e) {
        let t = {}
          , n = k(this.agentRef.runtime.releaseIds);
        return n !== `{}` && (t.ri = n),
        e?.err?.length && (this.errorOnPage ||= (t.pve = `1`,
        !0),
        this.agentRef.features?.[A.sessionReplay]?.featAggregate?.replayIsActive() || e.err.forEach(e => delete e.params.hasReplay)),
        t
    }
    processError(e, t, r, i, a, o, s) {
        if (e) {
            t ||= n();
            try {
                let n = this.#e(e, r)
                  , c = jr(e);
                this.#t(c, r, o),
                this.#n(c, s).forEach(r => {
                    this.#r(e, t, c, n, i, a, r)
                }
                )
            } catch (e) {
                if (!(e instanceof Wr))
                    throw e
            }
        }
    }
    #e(e, t) {
        let n;
        if (!t && this.agentRef.runtime.onerror && (n = this.agentRef.runtime.onerror(e),
        n && !(typeof n.group == `string` && n.group.length)))
            throw new Wr;
        return n
    }
    #t(e, t, n) {
        let {shouldSwallow: r, reason: i} = Hr(e, t, n);
        if (r)
            throw this.reportSupportabilityMetric(`Internal/Error/` + i),
            new Wr
    }
    #n(e, t) {
        let n = [];
        if (t)
            n.push(t);
        else {
            if (this.harvestEndpointVersion === 2) {
                for (let t of e.frames)
                    if (n.push(...ir(t.url, this.agentRef)),
                    n.length)
                        break
            }
            n.length || n.push(void 0)
        }
        return n
    }
    #r(e, t, n, r, i, o, s) {
        var c = this.#i(n);
        let l = Ur(e)
          , u = {
            stackHash: zr(c),
            exceptionClass: n.name,
            request_uri: a?.location.pathname,
            ...l && {
                cause: l
            }
        };
        n.message && (u.message = `` + n.message),
        r?.group && (u.errorGroup = r.group),
        o && !s && (u.hasReplay = o);
        var d = zr(`${n.name}_${n.message}_${n.stackString}_${+!!u.hasReplay}_${s?.id || `container`}_${s?.instance || ``}`);
        this.stackReported[d] ? u.browser_stack_hash = zr(n.stackString) : (this.stackReported[d] = !0,
        u.stack_trace = Or(n.stackString),
        this.observedAt[d] = Math.floor(this.agentRef.runtime.timeKeeper.correctRelativeTimestamp(t))),
        u.releaseIds = k(this.agentRef.runtime.releaseIds),
        this.pageviewReported[d] || (u.pageview = 1,
        this.pageviewReported[d] = !0),
        u.firstOccurrenceTimestamp = this.observedAt[d],
        u.timestamp = Math.floor(this.agentRef.runtime.timeKeeper.correctRelativeTimestamp(t));
        let f = [`err`, d, u, {
            time: t
        }, i];
        s || D(`trace-jserror`, f, void 0, A.sessionTrace, this.ee),
        !this.blocked && (e.__newrelic?.socketId && (i.socketId = e.__newrelic.socketId),
        s || (this.agentRef.features?.[A.softNav] ? D(`jserror`, [f], void 0, A.softNav, this.ee) : this.#a(f)),
        s && this.#a(f, {}, s))
    }
    #i(e) {
        for (var t = ``, n = 0; n < e.frames.length; n++) {
            var r = e.frames[n]
              , i = Cr(r.func);
            t && (t += `
`),
            i && (t += i + `@`),
            typeof r.url == `string` && (t += r.url),
            r.line && (t += `:` + r.line)
        }
        return t
    }
    #a(e, t={}, n) {
        let[r,i,a,o,s] = e
          , c = {
            ...ar(n, this)
        };
        Object.entries(this.agentRef.info.jsAttributes).forEach( ([e,t]) => d(e, t)),
        Object.entries(t).forEach( ([e,t]) => d(e, t)),
        a.browserInteractionId && (i += a.browserInteractionId),
        s && Object.entries(s).forEach( ([e,t]) => d(e, t));
        let l = zr(k(c))
          , u = i + `:` + l;
        this.events.add([r, u, a, o, c]),
        sr(n, this) && this.#a([r, i, {
            ...a
        }, {
            ...o
        }, s && {
            ...s
        }], or(n, this));
        function d(e, t) {
            c[e] = t && typeof t == `object` ? k(t) : t
        }
    }
}
  , Kr = {
    ERROR: `ERROR`,
    WARN: `WARN`,
    INFO: `INFO`,
    DEBUG: `DEBUG`,
    TRACE: `TRACE`
}
  , qr = {
    OFF: 0,
    ERROR: 1,
    WARN: 2,
    INFO: 3,
    DEBUG: 4,
    TRACE: 5
}
  , Jr = A.logging
  , Yr = class {
    timestamp;
    message;
    attributes;
    level;
    constructor(e, t, n={}, r=Kr.INFO) {
        this.timestamp = e,
        this.message = t,
        this.attributes = {
            ...n,
            pageUrl: F(`` + s)
        },
        this.level = r.toUpperCase()
    }
}
;
function Xr(e, t, r={}, i=Kr.INFO, a=!0, o, s=n()) {
    D(N, [`API/logging/${i.toLowerCase()}/called`], void 0, A.metrics, e),
    D(`log`, [s, t, r, i, a, o], void 0, A.logging, e)
}
function Zr(e) {
    return typeof e == `string` ? Object.values(Kr).some(t => t === e.toUpperCase().trim()) : !1
}
var Qr = A.sessionReplay
  , $r = `errorDuringReplay`
  , ei = .12
  , ti = {
    DomContentLoaded: 0,
    Load: 1,
    FullSnapshot: 2,
    IncrementalSnapshot: 3,
    Meta: 4,
    Custom: 5
}
  , ni = {
    [M.ERROR]: 15e3,
    [M.FULL]: 3e5,
    [M.OFF]: 0
}
  , ri = {
    RESET: {
        message: `Session was reset`,
        sm: `Reset`
    },
    IMPORT: {
        message: `Recorder failed to import`,
        sm: `Import`
    },
    TOO_MANY: {
        message: `429: Too Many Requests`,
        sm: `Too-Many`
    },
    TOO_BIG: {
        message: `Payload was too large`,
        sm: `Too-Big`
    },
    CROSS_TAB: {
        message: `Session Entity was set to OFF on another tab`,
        sm: `Cross-Tab`
    },
    ENTITLEMENTS: {
        message: `Session Replay is not allowed and will not be started`,
        sm: `Entitlement`
    }
}
  , ii = 5e3
  , ai = {
    API: `api`,
    RESUME: `resume`,
    SWITCH_TO_FULL: `switchToFull`,
    INITIALIZE: `initialize`,
    PRELOAD: `preload`
}
  , oi = e => r && e?.privacy.cookies_enabled === !0
  , si = `Logging/Event/`
  , ci = class extends Cn {
    static featureName = Jr;
    constructor(e) {
        super(e, Jr);
        let t = (e, t) => {
            this.loggingMode = {
                auto: e,
                api: t
            },
            t === void 0 && (this.loggingMode.api = e)
        }
        ;
        this.harvestOpts.raw = !0,
        super.customAttributesAreSeparate = !0,
        this.ee.on(j.RESET, () => {
            this.abort(ri.RESET)
        }
        ),
        this.ee.on(j.UPDATE, (e, n) => {
            this.blocked || e !== xt.CROSS_TAB || (n.loggingMode === qr.OFF && (!n.logApiMode || n.logApiMode === qr.OFF) ? this.abort(ri.CROSS_TAB) : t(n.loggingMode, n.logApiMode))
        }
        ),
        this.waitForFlags([`log`, `logapi`]).then( ([n,r]) => {
            if (this.blocked)
                return;
            this.loggingMode ??= {
                auto: n,
                api: r
            };
            let i = this.agentRef.runtime.session;
            if (oi(e.init) && i && (i.isNew ? this.#e() : t(i.state.loggingMode, i.state.logApiMode)),
            this.loggingMode.auto === qr.OFF && this.loggingMode.api === qr.OFF) {
                this.blocked = !0,
                this.deregisterDrain();
                return
            }
            O(`log`, this.handleLog.bind(this), this.featureName, this.ee),
            this.drain(),
            e.runtime.harvester.triggerHarvestFor(this)
        }
        )
    }
    handleLog(e, t, n={}, r=Kr.INFO, i, a) {
        if (this.blocked)
            return;
        let o = i ? this.loggingMode.auto : this.loggingMode.api;
        if (!o)
            return;
        if ((!n || typeof n != `object`) && (n = {}),
        typeof r == `string` && (r = r.toUpperCase()),
        !Zr(r))
            return h(30, r);
        if (o < (qr[r] || 1 / 0)) {
            this.reportSupportabilityMetric(`Logging/Event/Dropped/Sampling`);
            return
        }
        try {
            if (typeof t != `string`) {
                let e = k(t);
                t = e && e !== `{}` ? e : String(t)
            }
        } catch {
            h(16, t),
            this.reportSupportabilityMetric(`Logging/Event/Dropped/Casting`);
            return
        }
        if (typeof t != `string` || !t)
            return h(32);
        let s = n => {
            let a = new Yr(Math.floor(this.agentRef.runtime.timeKeeper.correctRelativeTimestamp(e)),t,n,r);
            this.events.add(a) && this.reportSupportabilityMetric(si + (i ? `Auto` : `API`) + `/Added`)
        }
        ;
        s({
            ...n,
            ...ar(a, this)
        }),
        sr(a, this) && s({
            ...n,
            ...or(a, this)
        })
    }
    serializer(e) {
        let t = this.agentRef.runtime.session;
        return [{
            common: {
                attributes: {
                    ...dr(this.agentRef.info.jsAttributes, this.obfuscator.obfuscateString.bind(this.obfuscator), `string`),
                    ...this.harvestEndpointVersion === 1 && {
                        "entity.guid": this.agentRef.runtime.appMetadata.agents[0].entityGuid,
                        appId: this.agentRef.info.applicationID
                    },
                    ...t && {
                        session: t.state.value || `0`,
                        hasReplay: t.state.sessionReplayMode === 1,
                        hasTrace: t.state.sessionTraceMode === 1
                    },
                    ptid: this.agentRef.runtime.ptid,
                    standalone: !!this.agentRef.info.sa,
                    agentVersion: this.agentRef.runtime.version,
                    "instrumentation.provider": `browser`,
                    "instrumentation.version": this.agentRef.runtime.version,
                    "instrumentation.name": this.agentRef.runtime.loaderType
                }
            },
            logs: dr(e, this.obfuscator.obfuscateString.bind(this.obfuscator), `string`)
        }]
    }
    queryStringsBuilder() {
        return {
            browser_monitoring_key: this.agentRef.info.licenseKey
        }
    }
    abort(e={}) {
        this.reportSupportabilityMetric(`Logging/Abort/${e.sm}`),
        this.blocked = !0,
        this.events && (this.events.clear(),
        this.events.clearSave()),
        this.loggingMode = {
            auto: qr.OFF,
            api: qr.OFF
        },
        this.#e(),
        this.deregisterDrain()
    }
    #e() {
        this.agentRef.runtime.session?.write({
            loggingMode: this.loggingMode.auto,
            logApiMode: this.loggingMode.api
        })
    }
}
  , L = {
    REACT: `React`,
    NEXTJS: `NextJS`,
    VUE: `Vue`,
    NUXTJS: `NuxtJS`,
    ANGULAR: `Angular`,
    ANGULARUNIVERSAL: `AngularUniversal`,
    SVELTE: `Svelte`,
    SVELTEKIT: `SvelteKit`,
    PREACT: `Preact`,
    PREACTSSR: `PreactSSR`,
    ANGULARJS: `AngularJS`,
    BACKBONE: `Backbone`,
    EMBER: `Ember`,
    METEOR: `Meteor`,
    ZEPTO: `Zepto`,
    JQUERY: `Jquery`,
    MOOTOOLS: `MooTools`,
    QWIK: `Qwik`,
    FLUTTER: `Flutter`,
    ELECTRON: `Electron`
};
function li() {
    if (!r)
        return [];
    let e = [];
    try {
        ui() && (e.push(L.REACT),
        di() && e.push(L.NEXTJS)),
        fi() && (e.push(L.VUE),
        pi() && e.push(L.NUXTJS)),
        mi() && (e.push(L.ANGULAR),
        hi() && e.push(L.ANGULARUNIVERSAL)),
        gi() && (e.push(L.SVELTE),
        _i() && e.push(L.SVELTEKIT)),
        vi() && (e.push(L.PREACT),
        yi() && e.push(L.PREACTSSR)),
        bi() && e.push(L.ANGULARJS),
        Object.prototype.hasOwnProperty.call(window, `Backbone`) && e.push(L.BACKBONE),
        Object.prototype.hasOwnProperty.call(window, `Ember`) && e.push(L.EMBER),
        Object.prototype.hasOwnProperty.call(window, `Meteor`) && e.push(L.METEOR),
        Object.prototype.hasOwnProperty.call(window, `Zepto`) && e.push(L.ZEPTO),
        Object.prototype.hasOwnProperty.call(window, `jQuery`) && e.push(L.JQUERY),
        Object.prototype.hasOwnProperty.call(window, `MooTools`) && e.push(L.MOOTOOLS),
        Object.prototype.hasOwnProperty.call(window, `qwikevents`) && e.push(L.QWIK),
        Object.hasOwn(window, `_flutter`) && e.push(L.FLUTTER),
        xi() && e.push(L.ELECTRON)
    } catch {}
    return e
}
function ui() {
    try {
        return Object.prototype.hasOwnProperty.call(window, `React`) || Object.prototype.hasOwnProperty.call(window, `ReactDOM`) || Object.prototype.hasOwnProperty.call(window, `ReactRedux`) || document.querySelector(`[data-reactroot], [data-reactid]`) || ( () => {
            let e = document.querySelectorAll(`body > div`);
            for (let t = 0; t < e.length; t++)
                if (Object.prototype.hasOwnProperty.call(e[t], `_reactRootContainer`))
                    return !0
        }
        )()
    } catch {
        return !1
    }
}
function di() {
    try {
        return Object.prototype.hasOwnProperty.call(window, `next`) && Object.prototype.hasOwnProperty.call(window.next, `version`)
    } catch {
        return !1
    }
}
function fi() {
    try {
        return Object.prototype.hasOwnProperty.call(window, `Vue`)
    } catch {
        return !1
    }
}
function pi() {
    try {
        return Object.prototype.hasOwnProperty.call(window, `$nuxt`) && Object.prototype.hasOwnProperty.call(window.$nuxt, `nuxt`)
    } catch {
        return !1
    }
}
function mi() {
    try {
        return Object.prototype.hasOwnProperty.call(window, `ng`) || document.querySelector(`[ng-version]`)
    } catch {
        return !1
    }
}
function hi() {
    try {
        return document.querySelector(`[ng-server-context]`)
    } catch {
        return !1
    }
}
function gi() {
    try {
        return Object.prototype.hasOwnProperty.call(window, `__svelte`)
    } catch {
        return !1
    }
}
function _i() {
    try {
        return !!Object.keys(window).find(e => e.startsWith(`__sveltekit`))
    } catch {
        return !1
    }
}
function vi() {
    try {
        return Object.prototype.hasOwnProperty.call(window, `preact`)
    } catch {
        return !1
    }
}
function yi() {
    try {
        return document.querySelector(`script[type="__PREACT_CLI_DATA__"]`)
    } catch {
        return !1
    }
}
function bi() {
    try {
        return Object.prototype.hasOwnProperty.call(window, `angular`) || document.querySelector(`.ng-binding, [ng-app], [data-ng-app], [ng-controller], [data-ng-controller], [ng-repeat], [data-ng-repeat]`) || document.querySelector(`script[src*="angular.js"], script[src*="angular.min.js"]`)
    } catch {
        return !1
    }
}
function xi() {
    try {
        return typeof navigator == `object` && typeof navigator.userAgent == `string` && navigator.userAgent.indexOf(`Electron`) >= 0
    } catch {
        return !1
    }
}
function Si(e, t=500, n={}) {
    let r = n?.leading || !1, i;
    return (...n) => {
        r && i === void 0 && (e.apply(this, n),
        i = setTimeout( () => {
            i = clearTimeout(i)
        }
        , t)),
        r || (clearTimeout(i),
        i = setTimeout( () => {
            e.apply(this, n)
        }
        , t))
    }
}
function Ci(e) {
    let t = !1;
    return (...n) => {
        t || (t = !0,
        e.apply(this, n))
    }
}
function wi() {
    return typeof document > `u` || document.readyState === `complete`
}
function Ti(e, t) {
    if (wi())
        return e();
    let n = Ci(e)
      , r = setInterval( () => {
        wi() && (clearInterval(r),
        n())
    }
    , 500);
    Bt(`load`, n, t)
}
function Ei(e) {
    if (wi())
        return e();
    Vt(`DOMContentLoaded`, e)
}
function Di(e) {
    if (wi())
        return e();
    Bt(`popstate`, e)
}
function Oi(e) {
    try {
        let t = []
          , n = (...e) => e.join(`/`);
        function r(e, r, i, a) {
            let o = `audit`;
            i ? a ? t.push(n(o, e, r, `true`, `positive`)) : t.push(n(o, e, r, `false`, `positive`)) : a ? t.push(n(o, e, r, `false`, `negative`)) : t.push(n(o, e, r, `true`, `negative`))
        }
        return e.page_view_event && (r(`page_view`, `hasReplay`, e.page_view_event.hasReplay, !!e.session_replay),
        r(`page_view`, `hasTrace`, e.page_view_event.hasTrace, !!e.session_trace)),
        e.session_replay && r(`session_replay`, `hasError`, e.session_replay.hasError, !!e.jserrors),
        t
    } catch {
        return []
    }
}
var ki = class extends Cn {
    static featureName = Rt;
    constructor(e) {
        super(e, Rt),
        this.harvestOpts.aggregatorTypes = [`cm`, `sm`],
        this.harvestMetadata = {},
        this.harvestOpts.beforeUnload = () => {
            Oi(this.harvestMetadata).forEach(e => {
                this.storeSupportabilityMetrics(e)
            }
            )
        }
        ,
        this.agentNonce = r && document.currentScript?.nonce,
        this.waitForFlags([`err`]).then( ([e]) => {
            e ? (this.singleChecks(),
            this.eachSessionChecks(),
            this.drain()) : (this.blocked = !0,
            this.deregisterDrain())
        }
        ),
        O(N, this.storeSupportabilityMetrics.bind(this), this.featureName, this.ee),
        O(zt, this.storeEventMetrics.bind(this), this.featureName, this.ee)
    }
    preHarvestChecks(e) {
        return this.drained && e.isFinalHarvest
    }
    storeSupportabilityMetrics(e, t) {
        if (this.blocked)
            return;
        let n = {
            name: e
        };
        this.events.addMetric(`sm`, e, n, t)
    }
    storeEventMetrics(e, t) {
        if (this.blocked)
            return;
        let n = {
            name: e
        };
        this.events.add([`cm`, e, n, t])
    }
    singleChecks() {
        let {distMethod: e, loaderType: t} = this.agentRef.runtime
          , {proxy: n, privacy: a} = this.agentRef.init;
        if (t && this.storeSupportabilityMetrics(`Generic/LoaderType/${t}/Detected`),
        e && this.storeSupportabilityMetrics(`Generic/DistMethod/${e}/Detected`),
        r ? (this.storeSupportabilityMetrics(`Generic/Runtime/Browser/Detected`),
        this.agentNonce && this.agentNonce !== `` && this.storeSupportabilityMetrics(`Generic/Runtime/Nonce/Detected`),
        Ei( () => {
            li().forEach(e => {
                this.storeSupportabilityMetrics(`Framework/` + e + `/Detected`)
            }
            )
        }
        ),
        a.cookies_enabled || this.storeSupportabilityMetrics(`Config/SessionTracking/Disabled`)) : i ? this.storeSupportabilityMetrics(`Generic/Runtime/Worker/Detected`) : this.storeSupportabilityMetrics(`Generic/Runtime/Unknown/Detected`),
        It() && this.storeSupportabilityMetrics(`Generic/FileProtocol/Detected`),
        this.obfuscator.obfuscateConfigRules.length > 0 && this.storeSupportabilityMetrics(`Generic/Obfuscate/Detected`),
        n.assets && this.storeSupportabilityMetrics(`Config/AssetsUrl/Changed`),
        n.beacon && this.storeSupportabilityMetrics(`Config/BeaconUrl/Changed`),
        r && window.MutationObserver) {
            br(window) && this.storeSupportabilityMetrics(`Generic/Runtime/IFrame/Detected`);
            let e = window.document.querySelectorAll(`video`).length;
            e && this.storeSupportabilityMetrics(`Generic/VideoElement/Added`, e);
            let t = window.document.querySelectorAll(`iframe`).length;
            t && this.storeSupportabilityMetrics(`Generic/IFrame/Added`, t),
            new MutationObserver(e => {
                e.forEach(e => {
                    e.addedNodes.forEach(e => {
                        e instanceof HTMLVideoElement && this.storeSupportabilityMetrics(`Generic/VideoElement/Added`, 1),
                        e instanceof HTMLIFrameElement && this.storeSupportabilityMetrics(`Generic/IFrame/Added`, 1)
                    }
                    )
                }
                )
            }
            ).observe(window.document.body, {
                childList: !0,
                subtree: !0
            })
        }
        navigator.webdriver && this.storeSupportabilityMetrics(`Generic/WebDriver/Detected`),
        O(`harvest-metadata`, (e={}) => {
            try {
                Object.keys(e).forEach(t => {
                    Object.assign(this.harvestMetadata[t] ??= {}, e[t])
                }
                )
            } catch {}
        }
        , this.featureName, this.ee)
    }
    eachSessionChecks() {
        r && Bt(`pageshow`, e => {
            e?.persisted && this.storeSupportabilityMetrics(`Generic/BFCache/PageRestored`)
        }
        )
    }
}
  , Ai = `Start`
  , ji = `End`
  , Mi = `unloadEvent`
  , Ni = `redirect`
  , Pi = `domainLookup`
  , Fi = `onnect`
  , Ii = `request`
  , Li = `response`
  , Ri = `loadEvent`
  , zi = `domContentLoadedEvent`
  , Bi = [];
function Vi(e) {
    return typeof e == `number` ? e : {
        navigate: void 0,
        reload: 1,
        back_forward: 2,
        prerender: 3
    }[e]
}
function Hi(e, t, n={}, r=!1) {
    if (t)
        return n.of = e,
        R(n.of, n, `n`, !0),
        R(t[Mi + Ai], n, `u`, r),
        R(t[Ni + Ai], n, `r`, r),
        R(t[Mi + ji], n, `ue`, r),
        R(t[Ni + ji], n, `re`, r),
        R(t[`fetch` + Ai], n, `f`, r),
        R(t[Pi + Ai], n, `dn`, r),
        R(t[Pi + ji], n, `dne`, r),
        R(t[`c` + Fi + Ai], n, `c`, r),
        R(t[`secureC` + Fi + `ion` + Ai], n, `s`, r),
        R(t[`c` + Fi + ji], n, `ce`, r),
        R(t[Ii + Ai], n, `rq`, r),
        R(t[Li + Ai], n, `rp`, r),
        R(t[Li + ji], n, `rpe`, r),
        R(t.domLoading, n, `dl`, r),
        R(t.domInteractive, n, `di`, r),
        R(t[zi + Ai], n, `ds`, r),
        R(t[zi + ji], n, `de`, r),
        R(t.domComplete, n, `dc`, r),
        R(t[Ri + Ai], n, `l`, r),
        R(t[Ri + ji], n, `le`, r),
        n
}
function Ui(e, t) {
    try {
        R(Vi(e.type), t, `ty`),
        R(e.redirectCount, t, `rc`)
    } catch {
        t.ty = 0,
        t.rc = 0
    }
    return t
}
function R(e, t, n, r) {
    if (typeof e == `number` && e > 0) {
        if (r) {
            let n = t?.of > 0 ? t.of : 0;
            e = Math.max(e - n, 0)
        }
        e = Math.round(e),
        t[n] = e,
        Bi.push(e)
    } else
        Bi.push(void 0)
}
var Wi = A.pageViewEvent;
function Gi(e) {
    let t = [];
    try {
        Object.keys(e.features || {}).forEach(e => {
            switch (e) {
            case A.ajax:
                t.push(`xhr`);
                break;
            case A.jserrors:
                t.push(`err`);
                break;
            case A.genericEvents:
                t.push(`ins`);
                break;
            case A.sessionTrace:
                t.push(`stn`);
                break;
            case A.softNav:
                t.push(`spa`);
                break
            }
        }
        )
    } catch {}
    return t
}
function Ki(e, t) {
    !e || typeof e != `object` || t.runtime.activatedFeatures || (t.ee.emit(`rumresp`, [e]),
    t.runtime.activatedFeatures = e,
    m({
        loaded: !0,
        drained: !0,
        type: `lifecycle`,
        name: `load`,
        feature: void 0,
        data: e
    }))
}
var qi, Ji, Yi = function() {
    var e = self.performance && performance.getEntriesByType && performance.getEntriesByType(`navigation`)[0];
    if (e && e.responseStart > 0 && e.responseStart < performance.now())
        return e
}, Xi = function(e) {
    if (document.readyState === `loading`)
        return `loading`;
    var t = Yi();
    if (t) {
        if (e < t.domInteractive)
            return `loading`;
        if (t.domContentLoadedEventStart === 0 || e < t.domContentLoadedEventStart)
            return `dom-interactive`;
        if (t.domComplete === 0 || e < t.domComplete)
            return `dom-content-loaded`
    }
    return `complete`
}, Zi = function(e) {
    var t = e.nodeName;
    return e.nodeType === 1 ? t.toLowerCase() : t.toUpperCase().replace(/^#/, ``)
}, Qi = function(e, t) {
    var n = ``;
    try {
        for (; e && e.nodeType !== 9; ) {
            var r = e
              , i = r.id ? `#` + r.id : Zi(r) + (r.classList && r.classList.value && r.classList.value.trim() && r.classList.value.trim().length ? `.` + r.classList.value.trim().replace(/\s+/g, `.`) : ``);
            if (n.length + i.length > (t || 100) - 1)
                return n || i;
            if (n = n ? i + `>` + n : i,
            r.id)
                break;
            e = r.parentNode
        }
    } catch {}
    return n
}, $i = -1, ea = function() {
    return $i
}, ta = function(e) {
    addEventListener(`pageshow`, (function(t) {
        t.persisted && ($i = t.timeStamp,
        e(t))
    }
    ), !0)
}, na = function() {
    var e = Yi();
    return e && e.activationStart || 0
}, ra = function(e, t) {
    var n = Yi()
      , r = `navigate`;
    return ea() >= 0 ? r = `back-forward-cache` : n && (document.prerendering || na() > 0 ? r = `prerender` : document.wasDiscarded ? r = `restore` : n.type && (r = n.type.replace(/_/g, `-`))),
    {
        name: e,
        value: t === void 0 ? -1 : t,
        rating: `good`,
        delta: 0,
        entries: [],
        id: `v4-${Date.now()}-${Math.floor(8999999999999 * Math.random()) + 0xe8d4a51000}`,
        navigationType: r
    }
}, ia = function(e, t, n) {
    try {
        if (PerformanceObserver.supportedEntryTypes.includes(e)) {
            var r = new PerformanceObserver((function(e) {
                Promise.resolve().then((function() {
                    t(e.getEntries())
                }
                ))
            }
            ));
            return r.observe(Object.assign({
                type: e,
                buffered: !0
            }, n || {})),
            r
        }
    } catch {}
}, aa = function(e, t, n, r) {
    var i, a;
    return function(o) {
        t.value >= 0 && (o || r) && ((a = t.value - (i || 0)) || i === void 0) && (i = t.value,
        t.delta = a,
        t.rating = function(e, t) {
            return e > t[1] ? `poor` : e > t[0] ? `needs-improvement` : `good`
        }(t.value, n),
        e(t))
    }
}, oa = function(e) {
    requestAnimationFrame((function() {
        return requestAnimationFrame((function() {
            return e()
        }
        ))
    }
    ))
}, sa = function(e) {
    document.addEventListener(`visibilitychange`, (function() {
        document.visibilityState === `hidden` && e()
    }
    ))
}, ca = function(e) {
    var t = !1;
    return function() {
        t ||= (e(),
        !0)
    }
}, la = -1, ua = function() {
    return document.visibilityState !== `hidden` || document.prerendering ? 1 / 0 : 0
}, da = function(e) {
    document.visibilityState === `hidden` && la > -1 && (la = e.type === `visibilitychange` ? e.timeStamp : 0,
    pa())
}, fa = function() {
    addEventListener(`visibilitychange`, da, !0),
    addEventListener(`prerenderingchange`, da, !0)
}, pa = function() {
    removeEventListener(`visibilitychange`, da, !0),
    removeEventListener(`prerenderingchange`, da, !0)
}, ma = function() {
    return la < 0 && (la = ua(),
    fa(),
    ta((function() {
        setTimeout((function() {
            la = ua(),
            fa()
        }
        ), 0)
    }
    ))),
    {
        get firstHiddenTime() {
            return la
        }
    }
}, ha = function(e) {
    document.prerendering ? addEventListener(`prerenderingchange`, (function() {
        return e()
    }
    ), !0) : e()
}, ga = [1800, 3e3], _a = function(e, t) {
    t ||= {},
    ha((function() {
        var n, r = ma(), i = ra(`FCP`), a = ia(`paint`, (function(e) {
            e.forEach((function(e) {
                e.name === `first-contentful-paint` && (a.disconnect(),
                e.startTime < r.firstHiddenTime && (i.value = Math.max(e.startTime - na(), 0),
                i.entries.push(e),
                n(!0)))
            }
            ))
        }
        ));
        a && (n = aa(e, i, ga, t.reportAllChanges),
        ta((function(r) {
            i = ra(`FCP`),
            n = aa(e, i, ga, t.reportAllChanges),
            oa((function() {
                i.value = performance.now() - r.timeStamp,
                n(!0)
            }
            ))
        }
        )))
    }
    ))
}, va = [.1, .25], ya = function(e, t) {
    (function(e, t) {
        t ||= {},
        _a(ca((function() {
            var n, r = ra(`CLS`, 0), i = 0, a = [], o = function(e) {
                e.forEach((function(e) {
                    if (!e.hadRecentInput) {
                        var t = a[0]
                          , n = a[a.length - 1];
                        i && e.startTime - n.startTime < 1e3 && e.startTime - t.startTime < 5e3 ? (i += e.value,
                        a.push(e)) : (i = e.value,
                        a = [e])
                    }
                }
                )),
                i > r.value && (r.value = i,
                r.entries = a,
                n())
            }, s = ia(`layout-shift`, o);
            s && (n = aa(e, r, va, t.reportAllChanges),
            sa((function() {
                o(s.takeRecords()),
                n(!0)
            }
            )),
            ta((function() {
                i = 0,
                r = ra(`CLS`, 0),
                n = aa(e, r, va, t.reportAllChanges),
                oa((function() {
                    return n()
                }
                ))
            }
            )),
            setTimeout(n, 0))
        }
        )))
    }
    )((function(t) {
        e(function(e) {
            var t, n = {};
            if (e.entries.length) {
                var r = e.entries.reduce((function(e, t) {
                    return e && e.value > t.value ? e : t
                }
                ));
                if (r && r.sources && r.sources.length) {
                    var i = (t = r.sources).find((function(e) {
                        return e.node && e.node.nodeType === 1
                    }
                    )) || t[0];
                    i && (n = {
                        largestShiftTarget: Qi(i.node),
                        largestShiftTime: r.startTime,
                        largestShiftValue: r.value,
                        largestShiftSource: i,
                        largestShiftEntry: r,
                        loadState: Xi(r.startTime)
                    })
                }
            }
            return Object.assign(e, {
                attribution: n
            })
        }(t))
    }
    ), t)
}, ba = function(e, t) {
    _a((function(t) {
        e(function(e) {
            var t = {
                timeToFirstByte: 0,
                firstByteToFCP: e.value,
                loadState: Xi(ea())
            };
            if (e.entries.length) {
                var n = Yi()
                  , r = e.entries[e.entries.length - 1];
                if (n) {
                    var i = n.activationStart || 0
                      , a = Math.max(0, n.responseStart - i);
                    t = {
                        timeToFirstByte: a,
                        firstByteToFCP: e.value - a,
                        loadState: Xi(e.entries[0].startTime),
                        navigationEntry: n,
                        fcpEntry: r
                    }
                }
            }
            return Object.assign(e, {
                attribution: t
            })
        }(t))
    }
    ), t)
}, xa = 0, Sa = 1 / 0, Ca = 0, wa = function(e) {
    e.forEach((function(e) {
        e.interactionId && (Sa = Math.min(Sa, e.interactionId),
        Ca = Math.max(Ca, e.interactionId),
        xa = Ca ? (Ca - Sa) / 7 + 1 : 0)
    }
    ))
}, Ta = function() {
    return qi ? xa : performance.interactionCount || 0
}, Ea = function() {
    `interactionCount` in performance || qi || (qi = ia(`event`, wa, {
        type: `event`,
        buffered: !0,
        durationThreshold: 0
    }))
}, Da = [], Oa = new Map, ka = 0, Aa = function() {
    return Da[Math.min(Da.length - 1, Math.floor((Ta() - ka) / 50))]
}, ja = [], Ma = function(e) {
    if (ja.forEach((function(t) {
        return t(e)
    }
    )),
    e.interactionId || e.entryType === `first-input`) {
        var t = Da[Da.length - 1]
          , n = Oa.get(e.interactionId);
        if (n || Da.length < 10 || e.duration > t.latency) {
            if (n)
                e.duration > n.latency ? (n.entries = [e],
                n.latency = e.duration) : e.duration === n.latency && e.startTime === n.entries[0].startTime && n.entries.push(e);
            else {
                var r = {
                    id: e.interactionId,
                    latency: e.duration,
                    entries: [e]
                };
                Oa.set(r.id, r),
                Da.push(r)
            }
            Da.sort((function(e, t) {
                return t.latency - e.latency
            }
            )),
            Da.length > 10 && Da.splice(10).forEach((function(e) {
                return Oa.delete(e.id)
            }
            ))
        }
    }
}, Na = function(e) {
    var t = self.requestIdleCallback || self.setTimeout
      , n = -1;
    return e = ca(e),
    document.visibilityState === `hidden` ? e() : (n = t(e),
    sa(e)),
    n
}, Pa = [200, 500], Fa = function(e, t) {
    `PerformanceEventTiming` in self && `interactionId` in PerformanceEventTiming.prototype && (t ||= {},
    ha((function() {
        Ea();
        var n, r = ra(`INP`), i = function(e) {
            Na((function() {
                e.forEach(Ma);
                var t = Aa();
                t && t.latency !== r.value && (r.value = t.latency,
                r.entries = t.entries,
                n())
            }
            ))
        }, a = ia(`event`, i, {
            durationThreshold: t.durationThreshold ?? 40
        });
        n = aa(e, r, Pa, t.reportAllChanges),
        a && (a.observe({
            type: `first-input`,
            buffered: !0
        }),
        sa((function() {
            i(a.takeRecords()),
            n(!0)
        }
        )),
        ta((function() {
            ka = Ta(),
            Da.length = 0,
            Oa.clear(),
            r = ra(`INP`),
            n = aa(e, r, Pa, t.reportAllChanges)
        }
        )))
    }
    )))
}, Ia = [], La = [], Ra = 0, za = new WeakMap, Ba = new Map, Va = -1, Ha = function(e) {
    Ia = Ia.concat(e),
    Ua()
}, Ua = function() {
    Va < 0 && (Va = Na(Wa))
}, Wa = function() {
    Ba.size > 10 && Ba.forEach((function(e, t) {
        Oa.has(t) || Ba.delete(t)
    }
    ));
    var e = Da.map((function(e) {
        return za.get(e.entries[0])
    }
    ))
      , t = La.length - 50;
    La = La.filter((function(n, r) {
        return r >= t || e.includes(n)
    }
    ));
    for (var n = new Set, r = 0; r < La.length; r++) {
        var i = La[r];
        Ya(i.startTime, i.processingEnd).forEach((function(e) {
            n.add(e)
        }
        ))
    }
    var a = Ia.length - 1 - 50;
    Ia = Ia.filter((function(e, t) {
        return e.startTime > Ra && t > a || n.has(e)
    }
    )),
    Va = -1
};
ja.push((function(e) {
    e.interactionId && e.target && !Ba.has(e.interactionId) && Ba.set(e.interactionId, e.target)
}
), (function(e) {
    var t, n = e.startTime + e.duration;
    Ra = Math.max(Ra, e.processingEnd);
    for (var r = La.length - 1; r >= 0; r--) {
        var i = La[r];
        if (Math.abs(n - i.renderTime) <= 8) {
            (t = i).startTime = Math.min(e.startTime, t.startTime),
            t.processingStart = Math.min(e.processingStart, t.processingStart),
            t.processingEnd = Math.max(e.processingEnd, t.processingEnd),
            t.entries.push(e);
            break
        }
    }
    t || (t = {
        startTime: e.startTime,
        processingStart: e.processingStart,
        processingEnd: e.processingEnd,
        renderTime: n,
        entries: [e]
    },
    La.push(t)),
    (e.interactionId || e.entryType === `first-input`) && za.set(e, t),
    Ua()
}
));
var Ga, Ka, qa, Ja, Ya = function(e, t) {
    for (var n, r = [], i = 0; n = Ia[i]; i++)
        if (!(n.startTime + n.duration < e)) {
            if (n.startTime > t)
                break;
            r.push(n)
        }
    return r
}, Xa = function(e, t) {
    Ji ||= ia(`long-animation-frame`, Ha),
    Fa((function(t) {
        e(function(e) {
            var t = e.entries[0]
              , n = za.get(t)
              , r = t.processingStart
              , i = n.processingEnd
              , a = n.entries.sort((function(e, t) {
                return e.processingStart - t.processingStart
            }
            ))
              , o = Ya(t.startTime, i)
              , s = e.entries.find((function(e) {
                return e.target
            }
            ))
              , c = s && s.target || Ba.get(t.interactionId)
              , l = [t.startTime + t.duration, i].concat(o.map((function(e) {
                return e.startTime + e.duration
            }
            )))
              , u = Math.max.apply(Math, l)
              , d = {
                interactionTarget: Qi(c),
                interactionTargetElement: c,
                interactionType: t.name.startsWith(`key`) ? `keyboard` : `pointer`,
                interactionTime: t.startTime,
                nextPaintTime: u,
                processedEventEntries: a,
                longAnimationFrameEntries: o,
                inputDelay: r - t.startTime,
                processingDuration: i - r,
                presentationDelay: Math.max(u - i, 0),
                loadState: Xi(t.startTime)
            };
            return Object.assign(e, {
                attribution: d
            })
        }(t))
    }
    ), t)
}, Za = [2500, 4e3], Qa = {}, $a = function(e, t) {
    (function(e, t) {
        t ||= {},
        ha((function() {
            var n, r = ma(), i = ra(`LCP`), a = function(e) {
                t.reportAllChanges || (e = e.slice(-1)),
                e.forEach((function(e) {
                    e.startTime < r.firstHiddenTime && (i.value = Math.max(e.startTime - na(), 0),
                    i.entries = [e],
                    n())
                }
                ))
            }, o = ia(`largest-contentful-paint`, a);
            if (o) {
                n = aa(e, i, Za, t.reportAllChanges);
                var s = ca((function() {
                    Qa[i.id] || (a(o.takeRecords()),
                    o.disconnect(),
                    Qa[i.id] = !0,
                    n(!0))
                }
                ));
                [`keydown`, `click`].forEach((function(e) {
                    addEventListener(e, (function() {
                        return Na(s)
                    }
                    ), {
                        once: !0,
                        capture: !0
                    })
                }
                )),
                sa(s),
                ta((function(r) {
                    i = ra(`LCP`),
                    n = aa(e, i, Za, t.reportAllChanges),
                    oa((function() {
                        i.value = performance.now() - r.timeStamp,
                        Qa[i.id] = !0,
                        n(!0)
                    }
                    ))
                }
                ))
            }
        }
        ))
    }
    )((function(t) {
        e(function(e) {
            var t = {
                timeToFirstByte: 0,
                resourceLoadDelay: 0,
                resourceLoadDuration: 0,
                elementRenderDelay: e.value
            };
            if (e.entries.length) {
                var n = Yi();
                if (n) {
                    var r = n.activationStart || 0
                      , i = e.entries[e.entries.length - 1]
                      , a = i.url && performance.getEntriesByType(`resource`).filter((function(e) {
                        return e.name === i.url
                    }
                    ))[0]
                      , o = Math.max(0, n.responseStart - r)
                      , s = Math.max(o, a ? (a.requestStart || a.startTime) - r : 0)
                      , c = Math.max(s, a ? a.responseEnd - r : 0)
                      , l = Math.max(c, i.startTime - r);
                    t = {
                        element: Qi(i.element),
                        timeToFirstByte: o,
                        resourceLoadDelay: s - o,
                        resourceLoadDuration: c - s,
                        elementRenderDelay: l - c,
                        navigationEntry: n,
                        lcpEntry: i
                    },
                    i.url && (t.url = i.url),
                    a && (t.lcpResourceEntry = a)
                }
            }
            return Object.assign(e, {
                attribution: t
            })
        }(t))
    }
    ), t)
}, eo = [800, 1800], to = function e(t) {
    document.prerendering ? ha((function() {
        return e(t)
    }
    )) : document.readyState === `complete` ? setTimeout(t, 0) : addEventListener(`load`, (function() {
        return e(t)
    }
    ), !0)
}, no = function(e, t) {
    t ||= {};
    var n = ra(`TTFB`)
      , r = aa(e, n, eo, t.reportAllChanges);
    to((function() {
        var i = Yi();
        i && (n.value = Math.max(i.responseStart - na(), 0),
        n.entries = [i],
        r(!0),
        ta((function() {
            n = ra(`TTFB`, 0),
            (r = aa(e, n, eo, t.reportAllChanges))(!0)
        }
        )))
    }
    ))
}, ro = function(e, t) {
    no((function(t) {
        e(function(e) {
            var t = {
                waitingDuration: 0,
                cacheDuration: 0,
                dnsDuration: 0,
                connectionDuration: 0,
                requestDuration: 0
            };
            if (e.entries.length) {
                var n = e.entries[0]
                  , r = n.activationStart || 0
                  , i = Math.max((n.workerStart || n.fetchStart) - r, 0)
                  , a = Math.max(n.domainLookupStart - r, 0)
                  , o = Math.max(n.connectStart - r, 0)
                  , s = Math.max(n.connectEnd - r, 0);
                t = {
                    waitingDuration: i,
                    cacheDuration: a - i,
                    dnsDuration: o - a,
                    connectionDuration: s - o,
                    requestDuration: e.value - s,
                    navigationEntry: n
                }
            }
            return Object.assign(e, {
                attribution: t
            })
        }(t))
    }
    ), t)
}, io = {
    passive: !0,
    capture: !0
}, ao = new Date, oo = function(e, t) {
    Ga || (Ga = t,
    Ka = e,
    qa = new Date,
    lo(removeEventListener),
    so())
}, so = function() {
    if (Ka >= 0 && Ka < qa - ao) {
        var e = {
            entryType: `first-input`,
            name: Ga.type,
            target: Ga.target,
            cancelable: Ga.cancelable,
            startTime: Ga.timeStamp,
            processingStart: Ga.timeStamp + Ka
        };
        Ja.forEach((function(t) {
            t(e)
        }
        )),
        Ja = []
    }
}, co = function(e) {
    if (e.cancelable) {
        var t = (e.timeStamp > 0xe8d4a51000 ? new Date : performance.now()) - e.timeStamp;
        e.type == `pointerdown` ? function(e, t) {
            var n = function() {
                oo(e, t),
                i()
            }
              , r = function() {
                i()
            }
              , i = function() {
                removeEventListener(`pointerup`, n, io),
                removeEventListener(`pointercancel`, r, io)
            };
            addEventListener(`pointerup`, n, io),
            addEventListener(`pointercancel`, r, io)
        }(t, e) : oo(t, e)
    }
}, lo = function(e) {
    [`mousedown`, `keydown`, `touchstart`, `pointerdown`].forEach((function(t) {
        return e(t, co, io)
    }
    ))
}, uo = {
    FIRST_PAINT: `fp`,
    FIRST_CONTENTFUL_PAINT: `fcp`,
    FIRST_INTERACTION: `fi`,
    LARGEST_CONTENTFUL_PAINT: `lcp`,
    LOAD_TIME: `load`,
    CUMULATIVE_LAYOUT_SHIFT: `cls`,
    INTERACTION_TO_NEXT_PAINT: `inp`,
    TIME_TO_FIRST_BYTE: `ttfb`
}, fo = class {
    #e = new Set;
    history = [];
    constructor(e, t) {
        this.name = e,
        this.attrs = {},
        this.roundingMethod = typeof t == `function` ? t : Math.floor
    }
    update({value: e, attrs: t={}}) {
        if (e == null || e < 0)
            return;
        let n = {
            value: this.roundingMethod(e),
            name: this.name,
            attrs: t
        };
        this.history.push(n),
        this.#e.forEach(e => {
            try {
                e(n)
            } catch {}
        }
        )
    }
    get current() {
        return this.history[this.history.length - 1] || {
            value: void 0,
            name: this.name,
            attrs: {}
        }
    }
    get isValid() {
        return this.current.value >= 0
    }
    subscribe(e, t=!0) {
        if (typeof e == `function`)
            return this.#e.add(e),
            this.isValid && t && this.history.forEach(t => {
                e(t)
            }
            ),
            () => {
                this.#e.delete(e)
            }
    }
}
, po = new fo(uo.FIRST_CONTENTFUL_PAINT);
if (r)
    if (l)
        try {
            o || performance.getEntriesByType(`paint`).forEach(e => {
                e.name === `first-contentful-paint` && po.update({
                    value: Math.floor(e.startTime)
                })
            }
            )
        } catch {}
    else
        ba( ({value: e, attribution: t}) => {
            if (o || po.isValid)
                return;
            let n = {
                timeToFirstByte: t.timeToFirstByte,
                firstByteToFCP: t.firstByteToFCP,
                loadState: t.loadState
            };
            po.update({
                value: e,
                attrs: n
            })
        }
        );
var mo = new fo(uo.FIRST_PAINT);
if (r) {
    let e = e => {
        e.forEach(e => {
            e.name === `first-paint` && !mo.isValid && (t.disconnect(),
            mo.update({
                value: e.startTime
            }))
        }
        )
    }
    , t;
    try {
        PerformanceObserver.supportedEntryTypes.includes(`paint`) && !o && (t = new PerformanceObserver(t => {
            Promise.resolve().then( () => {
                e(t.getEntries())
            }
            )
        }
        ),
        t.observe({
            type: `paint`,
            buffered: !0
        }))
    } catch {}
}
var ho = new fo(uo.TIME_TO_FIRST_BYTE);
if (r && f() && !c && window === window.parent)
    ro( ({value: e, attribution: t}) => {
        ho.isValid || ho.update({
            value: e,
            attrs: {
                navigationEntry: t.navigationEntry
            }
        })
    }
    );
else if (!ho.isValid) {
    let e = {};
    for (let t in a?.performance?.timing || {})
        e[t] = Math.max(a?.performance?.timing[t] - d, 0);
    ho.update({
        value: e.responseStart,
        attrs: {
            navigationEntry: e
        }
    })
}
var go = class {
    #e;
    #t;
    #n;
    #r = !1;
    #i = !1;
    constructor(e) {
        this.#e = e,
        this.processStoredDiff(),
        _(performance.now, Date.now)
    }
    #a() {
        if (!this.#i)
            try {
                let e = Date.now() - d - performance.now();
                e > 1e3 && (this.#i = !0,
                D(N, [`Generic/TimeKeeper/ClockDrift/Detected`, e], void 0, A.metrics, this.#e.agentRef.ee))
            } catch {}
    }
    get ready() {
        return this.#r
    }
    get correctedOriginTime() {
        return this.#t
    }
    get localTimeDiff() {
        return this.#n
    }
    processRumRequest(e, t, n, r) {
        if (this.processStoredDiff(),
        this.#r)
            return;
        if (!r)
            throw Error(`nrServerTime not found`);
        let i = t + (n - t) / 2;
        if (this.#t = Math.floor(r - i),
        this.#n = d - this.#t,
        isNaN(this.#t))
            throw Error(`Failed to correct browser time to server time`);
        this.#e?.write({
            serverTimeDiff: this.#n
        }),
        this.#r = !0
    }
    convertRelativeTimestamp(e) {
        return this.#a(),
        d + e
    }
    convertAbsoluteTimestamp(e) {
        return this.#a(),
        e - d
    }
    correctAbsoluteTimestamp(e) {
        return this.#a(),
        e - this.#n
    }
    correctRelativeTimestamp(e) {
        return this.#a(),
        this.correctAbsoluteTimestamp(this.convertRelativeTimestamp(e))
    }
    processStoredDiff() {
        if (this.#r)
            return;
        let e = this.#e?.read()?.serverTimeDiff;
        typeof e == `number` && !isNaN(e) && (this.#n = e,
        this.#t = d - this.#n,
        this.#r = !0)
    }
}
  , _o = ( () => {
    try {
        return !!(typeof navigator < `u` && navigator.webdriver === !0 || r && (document.__webdriver_evaluate || document.__selenium_unwrapped || document.__driver_evaluate || document.__webdriver_script_function || window.callPhantom || window._phantom || window.__nightmare))
    } catch {
        return !1
    }
}
)()
  , vo = class extends Cn {
    static featureName = Wi;
    constructor(e) {
        if (super(e, Wi),
        this.sentRum = !1,
        this.timeToFirstByte = 0,
        this.firstByteToWindowLoad = 0,
        this.firstByteToDomContent = 0,
        this.retries = 0,
        !Re(e.info))
            return this.ee.abort(),
            h(43);
        e.runtime.timeKeeper = new go(e.runtime.session),
        r ? (ho.subscribe( ({value: e, attrs: t}) => {
            let n = t.navigationEntry;
            this.timeToFirstByte = Math.max(e, this.timeToFirstByte),
            this.firstByteToWindowLoad = Math.max(Math.round(n.loadEventEnd - this.timeToFirstByte), this.firstByteToWindowLoad),
            this.firstByteToDomContent = Math.max(Math.round(n.domContentLoadedEventEnd - this.timeToFirstByte), this.firstByteToDomContent)
        }
        ),
        setTimeout(this.sendRum.bind(this), 0)) : this.sendRum()
    }
    sendRum(e=this.agentRef.info.jsAttributes) {
        let t = this.agentRef.info
          , r = {};
        t.queueTime && (r.qt = t.queueTime),
        t.applicationTime && (r.ap = t.applicationTime),
        r.be = this.timeToFirstByte,
        r.fe = this.firstByteToWindowLoad,
        r.dc = this.firstByteToDomContent;
        let i = {
            tt: t.ttGuid,
            us: t.user,
            ac: t.account,
            pr: t.product,
            af: Gi(this.agentRef).join(`,`),
            ...r,
            xx: t.extra,
            ua: t.userAttributes,
            at: t.atts
        };
        this.agentRef.runtime.session && (i.fsh = Number(this.agentRef.runtime.session.isNew));
        let o = dr({
            ja: {
                ...e,
                webdriverDetected: _o
            }
        }, this.obfuscator.obfuscateString.bind(this.obfuscator), `string`);
        if (a.performance) {
            let e = f();
            e ? i.perf = k({
                timing: Hi(d, e, {}),
                navigation: Ui(e, {})
            }) : typeof PerformanceTiming < `u` && (i.perf = k({
                timing: Hi(d, a.performance.timing, {}, !0),
                navigation: Ui(a.performance.navigation, {})
            }))
        }
        i.fp = mo.current.value,
        i.fcp = po.current.value,
        this.queryStringsBuilder = () => {
            this.rumStartTime = n();
            let e = this.agentRef.runtime.timeKeeper;
            return e?.ready && (i.timestamp = Math.floor(e.correctRelativeTimestamp(this.rumStartTime))),
            i
        }
        ,
        this.events.add(o),
        this.agentRef.runtime.harvester.triggerHarvestFor(this, {
            sendEmptyBody: !0
        }).ranSend && (this.sentRum = !0)
    }
    serializer(e) {
        return e[0]
    }
    postHarvestCleanup({sent: e, status: t, responseText: r, xhr: i, retry: a}) {
        let o = n(), s, c;
        try {
            ({app: s, ...c} = JSON.parse(r))
        } catch (e) {
            h(53, e)
        }
        if (super.postHarvestCleanup({
            sent: e,
            retry: a
        }),
        this.isRetrying && this.retries++ < 1) {
            setTimeout( () => this.agentRef.runtime.harvester.triggerHarvestFor(this, {
                sendEmptyBody: !0
            }), 5e3);
            return
        }
        if (t >= 400 || t === 0) {
            h(18, t),
            this.blocked = !0;
            let e = new TextEncoder
              , n = Object.values(newrelic.ee.backlog).reduce( (t, n) => n ? t + e.encode(n).byteLength : t, 0)
              , r = {
                sm: [{
                    params: {
                        name: `BCS/Error/` + t
                    },
                    stats: {
                        c: 1
                    }
                }, {
                    params: {
                        name: `BCS/Error/Dropped/Bytes`
                    },
                    stats: {
                        c: 1,
                        t: n
                    }
                }, {
                    params: {
                        name: `BCS/Error/Duration/Ms`
                    },
                    stats: {
                        c: 1,
                        t: o - this.rumStartTime
                    }
                }]
            };
            ln(this.agentRef, {
                endpoint: De[A.metrics],
                payload: {
                    body: r
                },
                submitMethod: $t(),
                featureName: A.metrics
            }),
            this.ee.abort();
            return
        }
        try {
            let e = this.agentRef.runtime.timeKeeper.ready;
            if (this.agentRef.runtime.timeKeeper.processRumRequest(i, this.rumStartTime, o, s.nrServerTime),
            !this.agentRef.runtime.timeKeeper.ready)
                throw Error(`TimeKeeper not ready`);
            let t = this.agentRef.runtime.timeKeeper.correctedOriginTime - s.nrServerTime;
            e && t > 0 && this.reportSupportabilityMetric(`Generic/TimeKeeper/InvalidTimestamp/Seen`, t)
        } catch (e) {
            this.ee.abort(),
            this.blocked = !0,
            h(17, e);
            return
        }
        Object.keys(this.agentRef.runtime.appMetadata).length || (this.agentRef.runtime.appMetadata = s),
        this.drain(),
        this.agentRef.runtime.harvester.startTimer(),
        Ki(c, this.agentRef)
    }
}
  , yo = A.pageViewTiming
  , bo = new fo(uo.CUMULATIVE_LAYOUT_SHIFT,e => e);
r && ya( ({value: e, attribution: t, id: n}) => {
    let r = {
        metricId: n,
        largestShiftTarget: t.largestShiftTarget,
        largestShiftTime: t.largestShiftTime,
        largestShiftValue: t.largestShiftValue,
        loadState: t.loadState
    };
    bo.update({
        value: e,
        attrs: r
    })
}
, {
    reportAllChanges: !0
});
var xo = new fo(uo.INTERACTION_TO_NEXT_PAINT);
r && Xa( ({value: e, attribution: t, id: n}) => {
    let r = {
        metricId: n,
        eventTarget: t.interactionTarget,
        eventTime: t.interactionTime,
        interactionTarget: t.interactionTarget,
        interactionTime: t.interactionTime,
        interactionType: t.interactionType,
        inputDelay: t.inputDelay,
        nextPaintTime: t.nextPaintTime,
        processingDuration: t.processingDuration,
        presentationDelay: t.presentationDelay,
        loadState: t.loadState
    };
    xo.update({
        value: e,
        attrs: r
    })
}
);
var So = new fo(uo.LARGEST_CONTENTFUL_PAINT);
r && $a( ({value: e, attribution: t}) => {
    if (o || So.isValid)
        return;
    let n = {
        timeToFirstByte: t.timeToFirstByte,
        resourceLoadDelay: t.resourceLoadDelay,
        resourceLoadDuration: t.resourceLoadDuration,
        resourceLoadTime: t.resourceLoadDuration,
        elementRenderDelay: t.elementRenderDelay
    }
      , r = t.lcpEntry;
    r && (n.size = r.size,
    n.eid = r.id,
    r.element?.tagName && (n.elTag = r.element.tagName)),
    t.element && (n.element = t.element),
    t.url && (n.elUrl = F(t.url)),
    So.update({
        value: e,
        attrs: n
    })
}
);
function Co(e, t, n) {
    let r = `unknown`;
    if (e && e instanceof XMLHttpRequest) {
        let t = n.context(e).params;
        if (!t || !t.status || !t.method || !t.host || !t.pathname)
            return `xhrOriginMissing`;
        r = t.status + ` ` + t.method + `: ` + t.host + t.pathname
    } else if (e && typeof e.tagName == `string` && (r = e.tagName.toLowerCase(),
    e.id && (r += `#` + e.id),
    e.className))
        for (let t = 0; t < e.classList.length; t++)
            r += `.` + e.classList[t];
    return r === `unknown` && (typeof t == `string` ? r = t : t === document ? r = `document` : t === window ? r = `window` : t instanceof FileReader && (r = `FileReader`)),
    r
}
var wo = new fo(uo.LOAD_TIME);
if (r) {
    let e = a.performance;
    Ti( () => {
        if (!wo.isValid && e) {
            let t = f();
            wo.update({
                value: t ? t.loadEventEnd : e.timing?.loadEventEnd - d
            })
        }
    }
    , !0)
}
var To = class extends Cn {
    static featureName = yo;
    #e = ({name: e, value: t, attrs: n}) => {
        this.addTiming(e, t, n)
    }
    ;
    constructor(e) {
        super(e, yo),
        this.curSessEndRecorded = !1,
        this.firstIxnRecorded = !1,
        super.customAttributesAreSeparate = !0,
        O(`docHidden`, e => this.endCurrentSession(e), this.featureName, this.ee),
        O(`winPagehide`, e => this.addTiming(`unload`, e, null), this.featureName, this.ee),
        this.waitForFlags([]).then( () => {
            mo.subscribe(this.#e),
            po.subscribe(this.#e),
            So.subscribe(this.#e),
            xo.subscribe(this.#e),
            wo.subscribe( ({name: e, value: t}) => {
                this.addTiming(e, Math.round(t))
            }
            ),
            Ht( () => {
                let {name: e, value: t, attrs: n} = bo.current;
                t !== void 0 && this.addTiming(e, t * 1e3, n)
            }
            , !0, !0),
            this.drain()
        }
        )
    }
    endCurrentSession(e) {
        this.curSessEndRecorded ||= (this.addTiming(`pageHide`, e, null),
        !0)
    }
    addTiming(e, t, n) {
        n ||= {},
        n.pageUrl = F(f()?.name || s),
        Eo(n),
        e !== uo.CUMULATIVE_LAYOUT_SHIFT && bo.current.value >= 0 && (n.cls = bo.current.value);
        let r = {
            name: e,
            value: t,
            attrs: n
        };
        return this.events.add(r),
        D(`pvtAdded`, [e, t, n], void 0, A.sessionTrace, this.ee),
        this.checkForFirstInteraction(),
        r
    }
    checkForFirstInteraction() {
        if (this.firstIxnRecorded || o || !performance)
            return;
        let e = performance.getEntriesByType(`first-input`)[0];
        e && (this.firstIxnRecorded = !0,
        this.addTiming(`fi`, e.startTime, {
            type: e.name,
            eventTarget: Co(e.target),
            loadState: document.readyState
        }))
    }
    appendGlobalCustomAttributes(e) {
        var t = e.attrs || {}
          , n = [`size`, `eid`, `cls`, `type`, `fid`, `elTag`, `elUrl`, `net-type`, `net-etype`, `net-rtt`, `net-dlink`];
        Object.entries(this.agentRef.info.jsAttributes || {}).forEach( ([e,r]) => {
            n.indexOf(e) < 0 && (t[e] = r)
        }
        ),
        t.webdriverDetected = _o
    }
    preHarvestChecks() {
        return this.checkForFirstInteraction(),
        super.preHarvestChecks()
    }
    serializer(e) {
        if (!e?.length)
            return ``;
        for (var t = Pn(this.agentRef.runtime.obfuscator), n = `bel.6;`, r = 0; r < e.length; r++) {
            var i = e[r];
            n += `e,`,
            n += t(i.name) + `,`,
            n += Nn(i.value, I, !1) + `,`,
            this.appendGlobalCustomAttributes(i);
            var a = Fn(i.attrs, t);
            a && a.length > 0 && (n += I(a.length) + `;` + a.join(`;`)),
            r + 1 < e.length && (n += `;`)
        }
        return n
    }
}
;
function Eo(e) {
    var t = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    t && (t.type && (e[`net-type`] = t.type),
    t.effectiveType && (e[`net-etype`] = t.effectiveType),
    t.rtt && (e[`net-rtt`] = t.rtt),
    t.downlink && (e[`net-dlink`] = t.downlink))
}
var Do, Oo = new Promise(e => {
    Do = e
}
), ko = Object.freeze({
    onReplayReady: Do,
    sessionReplayInitialized: Oo
}), Ao = new class {
    #e = new WeakSet;
    #t = [];
    invalidStylesheetsDetected = !1;
    failedToFix = 0;
    evaluate() {
        let e = 0;
        if (this.#t = [],
        r) {
            for (let t = 0; t < Object.keys(document.styleSheets).length; t++)
                if (!this.#e.has(document.styleSheets[t]) && document.styleSheets[t] instanceof CSSStyleSheet) {
                    this.#e.add(document.styleSheets[t]);
                    try {
                        document.styleSheets[t].cssRules
                    } catch {
                        if (!document.styleSheets[t].href)
                            return;
                        e++,
                        this.#t.push(document.styleSheets[t])
                    }
                }
        }
        return e && (this.invalidStylesheetsDetected = !0),
        e
    }
    async fix() {
        await Promise.all(this.#t.map(e => this.#n(e))),
        this.#t = [];
        let e = this.failedToFix;
        return this.failedToFix = 0,
        e
    }
    async #n(e) {
        if (e?.href)
            try {
                let t = await C().o.FETCH.bind(window)(e.href);
                if (!t.ok) {
                    this.failedToFix++;
                    return
                }
                let n = await t.text();
                try {
                    let t = new CSSStyleSheet;
                    await t.replace(n),
                    Object.defineProperty(e, "cssRules", {
                        get() {
                            return t.cssRules
                        }
                    }),
                    Object.defineProperty(e, "rules", {
                        get() {
                            return t.rules
                        }
                    })
                } catch {
                    Object.defineProperty(e, "cssText", {
                        get() {
                            return n
                        }
                    }),
                    this.failedToFix++
                }
            } catch {
                this.failedToFix++
            }
    }
}
, jo = class extends Cn {
    static featureName = Qr;
    mode = M.OFF;
    constructor(e, t) {
        super(e, Qr),
        this.initialized = !1,
        this.blocked = !1,
        this.gzipper = void 0,
        this.u8 = void 0,
        this.shouldCompress = !0,
        this.entitled = !1,
        this.timeKeeper = void 0,
        this.instrumentClass = t,
        this.recorder = this.instrumentClass?.recorder,
        this.harvestOpts.raw = !0,
        this.isSessionTrackingEnabled = oi(e.init) && !!e.runtime.session,
        this.reportSupportabilityMetric(`Config/SessionReplay/Enabled`),
        this.ee.on(j.RESET, () => {
            this.abort(ri.RESET)
        }
        ),
        this.ee.on(j.PAUSE, () => {
            this.recorder?.stopRecording()
        }
        ),
        this.ee.on(j.RESUME, () => {
            this.recorder && (this.mode = e.runtime.session.state.sessionReplayMode,
            !(!this.initialized || this.mode === M.OFF) && this.recorder?.startRecording(ai.RESUME, this.mode))
        }
        ),
        this.ee.on(j.UPDATE, (e, t) => {
            !this.recorder || !this.initialized || this.blocked || e !== xt.CROSS_TAB || (this.mode !== M.OFF && t.sessionReplayMode === M.OFF && this.abort(ri.CROSS_TAB),
            this.mode = t.sessionReplayMode)
        }
        ),
        O(Je, () => {
            this.forceStop(this.mode === M.FULL)
        }
        , this.featureName, this.ee),
        O($r, e => {
            this.handleError(e)
        }
        , this.featureName, this.ee);
        let {error_sampling_rate: n, sampling_rate: r, autoStart: i, block_selector: a, mask_text_selector: o, mask_all_inputs: s, inline_images: c, collect_fonts: l} = e.init.session_replay;
        this.waitForFlags([`srs`, `sr`]).then( ([e,t]) => {
            if (this.entitled = !!t,
            !this.entitled) {
                this.deregisterDrain(),
                this.agentRef.runtime.isRecording && (this.abort(ri.ENTITLEMENTS),
                this.reportSupportabilityMetric(`SessionReplay/EnabledNotEntitled/Detected`));
                return
            }
            this.initializeRecording(e).then( () => {
                this.drain()
            }
            )
        }
        ).then( () => {
            if (this.mode === M.OFF)
                for (this.recorder?.stopRecording(); this.recorder?.getEvents().events.length; )
                    this.recorder?.clearBuffer?.();
            ko.onReplayReady(this.mode)
        }
        ),
        i || this.reportSupportabilityMetric(`Config/SessionReplay/AutoStart/Modified`),
        l === !0 && this.reportSupportabilityMetric(`Config/SessionReplay/CollectFonts/Modified`),
        c === !0 && this.reportSupportabilityMetric(`Config/SessionReplay/InlineImages/Modifed`),
        s !== !0 && this.reportSupportabilityMetric(`Config/SessionReplay/MaskAllInputs/Modified`),
        a !== `[data-nr-block]` && this.reportSupportabilityMetric(`Config/SessionReplay/BlockSelector/Modified`),
        o !== `*` && this.reportSupportabilityMetric(`Config/SessionReplay/MaskTextSelector/Modified`),
        this.reportSupportabilityMetric(`Config/SessionReplay/SamplingRate/Value`, r),
        this.reportSupportabilityMetric(`Config/SessionReplay/ErrorSamplingRate/Value`, n)
    }
    replayIsActive() {
        return !!(this.recorder && this.mode === M.FULL && !this.blocked && this.entitled)
    }
    handleError(e) {
        this.recorder && (this.recorder.events.hasError = !0),
        this.mode === M.ERROR && a?.document.visibilityState === `visible` && this.switchToFull()
    }
    switchToFull() {
        !this.entitled || this.blocked || (this.mode = M.FULL,
        this.recorder && this.initialized ? (this.agentRef.runtime.isRecording || this.recorder.startRecording(ai.SWITCH_TO_FULL, this.mode),
        this.syncWithSessionManager({
            sessionReplayMode: this.mode
        })) : this.initializeRecording(M.FULL, !0, ai.SWITCH_TO_FULL))
    }
    async initializeRecording(e, t, n=ai.INITIALIZE) {
        if (this.initialized = !0,
        !this.entitled)
            return;
        let {session: r, timeKeeper: i} = this.agentRef.runtime;
        if (this.timeKeeper = i,
        this.recorder?.trigger === ai.API && this.agentRef.runtime.isRecording ? this.mode = M.FULL : !r.isNew && !t ? this.mode = r.state.sessionReplayMode : this.mode = e,
        this.mode !== M.OFF) {
            try {
                this.recorder ??= await this.instrumentClass.importRecorder()
            } catch (e) {
                return this.abort(ri.IMPORT, e)
            }
            this.mode === M.ERROR && this.instrumentClass.errorNoticed && (this.mode = M.FULL),
            await this.prepUtils(),
            this.agentRef.runtime.isRecording || this.recorder.startRecording(n, this.mode),
            this.syncWithSessionManager({
                sessionReplayMode: this.mode
            })
        }
    }
    async prepUtils() {
        try {
            let {gzipSync: e, strToU8: n} = await t(async () => {
                let {gzipSync: e, strToU8: t} = await import(`./browser-BjVZNN8H.js`);
                return {
                    gzipSync: e,
                    strToU8: t
                }
            }
            , []);
            this.gzipper = e,
            this.u8 = n
        } catch {
            this.shouldCompress = !1
        }
    }
    makeHarvestPayload() {
        if (this.mode !== M.FULL || this.blocked || this.shouldCompress && !this.gzipper || !this.recorder || !this.timeKeeper?.ready || !(this.recorder.hasSeenSnapshot && this.recorder.hasSeenMeta))
            return;
        let e = this.recorder.getEvents();
        if (!e.events.length)
            return;
        let t = this.getHarvestContents(e);
        if (!t.body.length) {
            this.recorder.clearBuffer();
            return
        }
        this.reportSupportabilityMetric(`SessionReplay/Harvest/Attempts`);
        let n = 0;
        if (this.gzipper && this.u8)
            t.body = this.gzipper(this.u8(`[${t.body.map( ({__serialized: e}) => e).join(`,`)}]`)),
            n = t.body.length;
        else {
            for (let e in t.body)
                delete t.body[e].__serialized;
            n = k(t.body).length
        }
        if (n > 1e6) {
            this.abort(ri.TOO_BIG, n);
            return
        }
        return this.agentRef.runtime.session.state.sessionReplaySentFirstChunk || this.syncWithSessionManager({
            sessionReplaySentFirstChunk: !0
        }),
        this.recorder.clearBuffer(),
        this.agentRef.runtime.session.state.traceHarvestStarted || h(59, JSON.stringify(this.agentRef.runtime.session.state)),
        t
    }
    getFirstAndLastNodes(e=[]) {
        let t = {
            firstEvent: e[0],
            lastEvent: e[e.length - 1]
        };
        return e.forEach(e => {
            let n = e?.timestamp;
            (!t.firstEvent?.timestamp || (n || 1 / 0) < t.firstEvent.timestamp) && (t.firstEvent = e),
            (!t.lastEvent?.timestamp || (n || -1 / 0) > t.lastEvent.timestamp) && (t.lastEvent = e)
        }
        ),
        t
    }
    getHarvestContents(e) {
        e ??= this.recorder.getEvents();
        let t = e.events
          , r = this.agentRef.runtime
          , i = this.agentRef.info.jsAttributes?.[`enduser.id`];
        t?.[0]?.type === ti.FullSnapshot && this.recorder.lastMeta && (e.hasMeta = !0,
        t.unshift(this.recorder.lastMeta),
        this.recorder.lastMeta = void 0),
        t[t.length - 1]?.type === ti.Meta && (this.recorder.lastMeta = t[t.length - 1],
        t = t.slice(0, t.length - 1),
        e.hasMeta = !!t.find(e => e.type === ti.Meta));
        let a = n()
          , {firstEvent: o, lastEvent: s} = this.getFirstAndLastNodes(t)
          , c = o?.timestamp || Math.floor(this.timeKeeper.correctAbsoluteTimestamp(e.cycleTimestamp))
          , l = s?.timestamp || Math.floor(this.timeKeeper.correctRelativeTimestamp(a))
          , u = r.appMetadata?.agents?.[0] || {};
        return {
            qs: {
                browser_monitoring_key: this.agentRef.info.licenseKey,
                type: `SessionReplay`,
                app_id: this.agentRef.info.applicationID,
                protocol_version: `0`,
                timestamp: c,
                attributes: Zt({
                    ...!!this.gzipper && !!this.u8 && {
                        content_encoding: `gzip`
                    },
                    ...u.entityGuid && {
                        entityGuid: u.entityGuid
                    },
                    harvestId: [r.session?.state.value, r.ptid, r.harvestCount].filter(e => e).join(`_`),
                    "replay.firstTimestamp": c,
                    "replay.lastTimestamp": l,
                    "replay.nodes": t.length,
                    "session.durationMs": r.session.getDuration(),
                    agentVersion: r.version,
                    session: r.session.state.value,
                    rst: a,
                    hasMeta: e.hasMeta || !1,
                    hasSnapshot: e.hasSnapshot || !1,
                    hasError: e.hasError || !1,
                    isFirstChunk: r.session.state.sessionReplaySentFirstChunk === !1,
                    decompressedBytes: e.payloadBytesEstimation,
                    invalidStylesheetsDetected: Ao.invalidStylesheetsDetected,
                    inlinedAllStylesheets: e.inlinedAllStylesheets,
                    "rrweb.version": Et + `@` + Dt,
                    "payload.type": e.type,
                    ...i && {
                        "enduser.id": this.obfuscator.obfuscateString(i)
                    },
                    currentUrl: this.obfuscator.obfuscateString(F(`` + location))
                }, ii).substring(1)
            },
            body: t
        }
    }
    postHarvestCleanup(e) {
        e.status === 429 && this.abort(ri.TOO_MANY)
    }
    forceStop(e) {
        e && this.agentRef.runtime.harvester.triggerHarvestFor(this),
        this.mode = M.OFF,
        this.recorder?.stopRecording?.(),
        this.syncWithSessionManager({
            sessionReplayMode: this.mode
        })
    }
    abort(e={}, t) {
        for (h(33, e.message),
        this.reportSupportabilityMetric(`SessionReplay/Abort/${e.sm}`, t),
        this.blocked = !0,
        this.mode = M.OFF,
        this.recorder?.stopRecording?.(),
        this.syncWithSessionManager({
            sessionReplayMode: this.mode
        }),
        this.recorder?.clearTimestamps?.(); this.recorder?.getEvents().events.length; )
            this.recorder?.clearBuffer?.()
    }
    syncWithSessionManager(e={}) {
        this.isSessionTrackingEnabled && this.agentRef.runtime.session.write(e)
    }
}
, Mo = Object.defineProperty, No = (e, t, n) => t in e ? Mo(e, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: n
}) : e[t] = n, z = (e, t, n) => No(e, typeof t == `symbol` ? t : t + ``, n), Po = Object.defineProperty, Fo = (e, t, n) => t in e ? Po(e, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: n
}) : e[t] = n, Io = (e, t, n) => Fo(e, typeof t == `symbol` ? t : t + ``, n), B = (e => (e[e.Document = 0] = `Document`,
e[e.DocumentType = 1] = `DocumentType`,
e[e.Element = 2] = `Element`,
e[e.Text = 3] = `Text`,
e[e.CDATA = 4] = `CDATA`,
e[e.Comment = 5] = `Comment`,
e))(B || {}), Lo = {
    Node: [`childNodes`, `parentNode`, `parentElement`, `textContent`, `ownerDocument`],
    ShadowRoot: [`host`, `styleSheets`],
    Element: [`shadowRoot`, `querySelector`, `querySelectorAll`],
    MutationObserver: []
}, Ro = {
    Node: [`contains`, `getRootNode`],
    ShadowRoot: [`getSelection`],
    Element: [],
    MutationObserver: [`constructor`]
}, zo = {};
function Bo() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
}
function Vo(e) {
    var t;
    let n = ((t = globalThis == null ? void 0 : globalThis.Zone)?.__symbol__)?.call(t, e);
    if (n && globalThis[n])
        return globalThis[n]
}
function Ho(e) {
    if (zo[e])
        return zo[e];
    let t = Bo() && Vo(e) || globalThis[e]
      , n = t.prototype
      , r = e in Lo ? Lo[e] : void 0
      , i = !!(r && r.every(e => !!(Object.getOwnPropertyDescriptor(n, e)?.get)?.toString().includes(`[native code]`)))
      , a = e in Ro ? Ro[e] : void 0
      , o = !!(a && a.every(e => typeof n[e] == `function` && n[e]?.toString().includes(`[native code]`)))
      , s = i && o
      , c = t.prototype;
    if (!s) {
        let t;
        try {
            t = document.createElement(`iframe`),
            t.hidden = !0,
            document.body.appendChild(t);
            let n = t.contentWindow;
            if (n) {
                let t = n[e].prototype;
                t && (c = t)
            }
        } finally {
            t && document.body.removeChild(t)
        }
    }
    return zo[e] = c,
    c
}
var Uo = {};
function Wo(e, t, n) {
    let r = `${e}.${String(n)}`;
    if (Uo[r])
        return Uo[r].call(t);
    let i = Ho(e)
      , a = Object.getOwnPropertyDescriptor(i, n)?.get;
    return a ? (Uo[r] = a,
    a.call(t)) : t[n]
}
var Go = {};
function Ko(e, t, n) {
    let r = `${e}.${String(n)}`;
    if (Go[r])
        return Go[r].bind(t);
    let i = Ho(e)[n];
    return typeof i == `function` ? (Go[r] = i,
    i.bind(t)) : t[n]
}
function qo(e) {
    return Wo(`Node`, e, `ownerDocument`)
}
function Jo(e) {
    return Wo(`Node`, e, `childNodes`)
}
function Yo(e) {
    return Wo(`Node`, e, `parentNode`)
}
function Xo(e) {
    return Wo(`Node`, e, `parentElement`)
}
function Zo(e) {
    return Wo(`Node`, e, `textContent`)
}
function Qo(e, t) {
    return Ko(`Node`, e, `contains`)(t)
}
function $o(e) {
    return Ko(`Node`, e, `getRootNode`)()
}
function es(e) {
    return !e || !(`host` in e) ? null : Wo(`ShadowRoot`, e, `host`)
}
function ts(e) {
    return e.styleSheets
}
function ns(e) {
    return !e || !(`shadowRoot` in e) ? null : Wo(`Element`, e, `shadowRoot`)
}
function rs(e, t) {
    return Wo(`Element`, e, `querySelector`)(t)
}
function is(e, t) {
    return Wo(`Element`, e, `querySelectorAll`)(t)
}
function as() {
    return Ho(`MutationObserver`).constructor
}
function os(e, t, n) {
    try {
        if (!(t in e))
            return () => {}
            ;
        let r = e[t]
          , i = n(r);
        return typeof i == `function` && (i.prototype = i.prototype || {},
        Object.defineProperties(i, {
            __rrweb_original__: {
                enumerable: !1,
                value: r
            }
        })),
        e[t] = i,
        () => {
            e[t] = r
        }
    } catch {
        return () => {}
    }
}
var V = {
    ownerDocument: qo,
    childNodes: Jo,
    parentNode: Yo,
    parentElement: Xo,
    textContent: Zo,
    contains: Qo,
    getRootNode: $o,
    host: es,
    styleSheets: ts,
    shadowRoot: ns,
    querySelector: rs,
    querySelectorAll: is,
    mutationObserver: as,
    patch: os
};
function ss(e) {
    return e.nodeType === e.ELEMENT_NODE
}
function cs(e) {
    let t = e && `host` in e && `mode` in e && V.host(e) || null;
    return !!(t && `shadowRoot` in t && V.shadowRoot(t) === e)
}
function ls(e) {
    return Object.prototype.toString.call(e) === `[object ShadowRoot]`
}
function us(e) {
    return e.includes(` background-clip: text;`) && !e.includes(` -webkit-background-clip: text;`) && (e = e.replace(/\sbackground-clip:\s*text;/g, ` -webkit-background-clip: text; background-clip: text;`)),
    e
}
function ds(e) {
    let {cssText: t} = e;
    if (t.split(`"`).length < 3)
        return t;
    let n = [`@import`, `url(${JSON.stringify(e.href)})`];
    return e.layerName === `` ? n.push(`layer`) : e.layerName && n.push(`layer(${e.layerName})`),
    e.supportsText && n.push(`supports(${e.supportsText})`),
    e.media.length && n.push(e.media.mediaText),
    n.join(` `) + `;`
}
function fs(e) {
    try {
        let t = e.rules || e.cssRules;
        if (!t)
            return null;
        let n = e.href;
        return !n && e.ownerNode && (n = e.ownerNode.baseURI),
        us(Array.from(t, e => ps(e, n)).join(``))
    } catch {
        return null
    }
}
function ps(e, t) {
    if (hs(e)) {
        let t;
        try {
            t = fs(e.styleSheet) || ds(e)
        } catch {
            t = e.cssText
        }
        return e.styleSheet.href ? As(t, e.styleSheet.href) : t
    } else {
        let n = e.cssText;
        return gs(e) && e.selectorText.includes(`:`) && (n = ms(n)),
        t ? As(n, t) : n
    }
}
function ms(e) {
    return e.replace(/(\[(?:[\w-]+)[^\\])(:(?:[\w-]+)\])/gm, `$1\\$2`)
}
function hs(e) {
    return `styleSheet` in e
}
function gs(e) {
    return `selectorText` in e
}
var _s = class {
    constructor() {
        Io(this, `idNodeMap`, new Map),
        Io(this, `nodeMetaMap`, new WeakMap)
    }
    getId(e) {
        return e ? this.getMeta(e)?.id ?? -1 : -1
    }
    getNode(e) {
        return this.idNodeMap.get(e) || null
    }
    getIds() {
        return Array.from(this.idNodeMap.keys())
    }
    getMeta(e) {
        return this.nodeMetaMap.get(e) || null
    }
    removeNodeFromMap(e) {
        let t = this.getId(e);
        this.idNodeMap.delete(t),
        e.childNodes && e.childNodes.forEach(e => this.removeNodeFromMap(e))
    }
    has(e) {
        return this.idNodeMap.has(e)
    }
    hasNode(e) {
        return this.nodeMetaMap.has(e)
    }
    add(e, t) {
        let n = t.id;
        this.idNodeMap.set(n, e),
        this.nodeMetaMap.set(e, t)
    }
    replace(e, t) {
        let n = this.getNode(e);
        if (n) {
            let e = this.nodeMetaMap.get(n);
            e && this.nodeMetaMap.set(t, e)
        }
        this.idNodeMap.set(e, t)
    }
    reset() {
        this.idNodeMap = new Map,
        this.nodeMetaMap = new WeakMap
    }
}
;
function vs() {
    return new _s
}
function ys({element: e, maskInputOptions: t, tagName: n, type: r, value: i, maskInputFn: a}) {
    let o = i || ``
      , s = r && bs(r);
    return (t[n.toLowerCase()] || s && t[s]) && (o = a ? a(o, e) : `*`.repeat(o.length)),
    o
}
function bs(e) {
    return e.toLowerCase()
}
var xs = `__rrweb_original__`;
function Ss(e) {
    let t = e.getContext(`2d`);
    if (!t)
        return !0;
    for (let n = 0; n < e.width; n += 50)
        for (let r = 0; r < e.height; r += 50) {
            let i = t.getImageData
              , a = xs in i ? i[xs] : i;
            if (new Uint32Array(a.call(t, n, r, Math.min(50, e.width - n), Math.min(50, e.height - r)).data.buffer).some(e => e !== 0))
                return !1
        }
    return !0
}
function Cs(e) {
    let t = e.type;
    return e.hasAttribute(`data-rr-is-password`) ? `password` : t ? bs(t) : null
}
function ws(e, t) {
    let n;
    try {
        n = new URL(e,t ?? window.location.href)
    } catch {
        return null
    }
    return n.pathname.match(/\.([0-9a-z]+)(?:$)/i)?.[1] ?? null
}
function Ts(e) {
    let t = ``;
    return t = e.indexOf(`//`) > -1 ? e.split(`/`).slice(0, 3).join(`/`) : e.split(`/`)[0],
    t = t.split(`?`)[0],
    t
}
var Es = /url\((?:(')([^']*)'|(")(.*?)"|([^)]*))\)/gm
  , Ds = /^(?:[a-z+]+:)?\/\//i
  , Os = /^www\..*/i
  , ks = /^(data:)([^,]*),(.*)/i;
function As(e, t) {
    return (e || ``).replace(Es, (e, n, r, i, a, o) => {
        let s = r || a || o
          , c = n || i || ``;
        if (!s)
            return e;
        if (Ds.test(s) || Os.test(s) || ks.test(s))
            return `url(${c}${s}${c})`;
        if (s[0] === `/`)
            return `url(${c}${Ts(t) + s}${c})`;
        let l = t.split(`/`)
          , u = s.split(`/`);
        l.pop();
        for (let e of u)
            if (e === `.`)
                continue;
            else
                e === `..` ? l.pop() : l.push(e);
        return `url(${c}${l.join(`/`)}${c})`
    }
    )
}
function js(e, t=!1) {
    return t ? e.replace(/(\/\*[^*]*\*\/)|[\s;]/g, ``) : e.replace(/(\/\*[^*]*\*\/)|[\s;]/g, ``).replace(/0px/g, `0`)
}
function Ms(e, t, n=!1) {
    let r = Array.from(t.childNodes)
      , i = []
      , a = 0;
    if (r.length > 1 && e && typeof e == `string`) {
        let t = js(e, n)
          , o = t.length / e.length;
        for (let s = 1; s < r.length; s++)
            if (r[s].textContent && typeof r[s].textContent == `string`) {
                let c = js(r[s].textContent, n)
                  , l = 3;
                for (; l < c.length && (c[l].match(/[a-zA-Z0-9]/) || c.indexOf(c.substring(0, l), 1) !== -1); l++)
                    ;
                for (; l < c.length; l++) {
                    let u = c.substring(0, l)
                      , d = t.split(u)
                      , f = -1;
                    if (d.length === 2)
                        f = d[0].length;
                    else if (d.length > 2 && d[0] === `` && r[s - 1].textContent !== ``)
                        f = t.indexOf(u, 1);
                    else if (d.length === 1) {
                        if (u = u.substring(0, u.length - 1),
                        d = t.split(u),
                        d.length <= 1)
                            return i.push(e),
                            i;
                        l = 101
                    } else
                        l === c.length - 1 && (f = t.indexOf(u));
                    if (d.length >= 2 && l > 100) {
                        let e = r[s - 1].textContent;
                        if (e && typeof e == `string`) {
                            let n = js(e).length;
                            f = t.indexOf(u, n)
                        }
                        f === -1 && (f = d[0].length)
                    }
                    if (f !== -1) {
                        let s = Math.floor(f / o);
                        for (; s > 0 && s < e.length; ) {
                            if (a += 1,
                            a > 50 * r.length)
                                return i.push(e),
                                i;
                            let c = js(e.substring(0, s), n);
                            if (c.length === f) {
                                i.push(e.substring(0, s)),
                                e = e.substring(s),
                                t = t.substring(f);
                                break
                            } else
                                c.length < f ? s += Math.max(1, Math.floor((f - c.length) / o)) : s -= Math.max(1, Math.floor((c.length - f) * o))
                        }
                        break
                    }
                }
            }
    }
    return i.push(e),
    i
}
function Ns(e, t) {
    return Ms(e, t).join(`/* rr_split */`)
}
var Ps = 1
  , Fs = RegExp(`[^a-z0-9-_:]`)
  , Is = -2;
function Ls() {
    return Ps++
}
function Rs(e) {
    if (e instanceof HTMLFormElement)
        return `form`;
    let t = bs(e.tagName);
    return Fs.test(t) ? `div` : t
}
var zs, Bs, Vs = /^[^ \t\n\r\u000c]+/, Hs = /^[, \t\n\r\u000c]+/;
function Us(e, t) {
    if (t.trim() === ``)
        return t;
    let n = 0;
    function r(e) {
        let r, i = e.exec(t.substring(n));
        return i ? (r = i[0],
        n += r.length,
        r) : ``
    }
    let i = [];
    for (; r(Hs),
    !(n >= t.length); ) {
        let a = r(Vs);
        if (a.slice(-1) === `,`)
            a = Gs(e, a.substring(0, a.length - 1)),
            i.push(a);
        else {
            let r = ``;
            a = Gs(e, a);
            let o = !1;
            for (; ; ) {
                let e = t.charAt(n);
                if (e === ``) {
                    i.push((a + r).trim());
                    break
                } else if (o)
                    e === `)` && (o = !1);
                else if (e === `,`) {
                    n += 1,
                    i.push((a + r).trim());
                    break
                } else
                    e === `(` && (o = !0);
                r += e,
                n += 1
            }
        }
    }
    return i.join(`, `)
}
var Ws = new WeakMap;
function Gs(e, t) {
    return !t || t.trim() === `` ? t : qs(e, t)
}
function Ks(e) {
    return !!(e.tagName === `svg` || e.ownerSVGElement)
}
function qs(e, t) {
    let n = Ws.get(e);
    if (n || (n = e.createElement(`a`),
    Ws.set(e, n)),
    !t)
        t = ``;
    else if (t.startsWith(`blob:`) || t.startsWith(`data:`))
        return t;
    return n.setAttribute(`href`, t),
    n.href
}
function Js(e, t, n, r) {
    return r && (n === `src` || n === `href` && !(t === `use` && r[0] === `#`) || n === `xlink:href` && r[0] !== `#` || n === `background` && [`table`, `td`, `th`].includes(t) ? Gs(e, r) : n === `srcset` ? Us(e, r) : n === `style` ? As(r, qs(e)) : t === `object` && n === `data` ? Gs(e, r) : r)
}
function Ys(e, t, n) {
    return [`video`, `audio`].includes(e) && t === `autoplay`
}
function Xs(e, t, n) {
    try {
        if (typeof t == `string`) {
            if (e.classList.contains(t))
                return !0
        } else
            for (let n = e.classList.length; n--; ) {
                let r = e.classList[n];
                if (t.test(r))
                    return !0
            }
        if (n)
            return e.matches(n)
    } catch {}
    return !1
}
function Zs(e, t, n) {
    if (!e)
        return !1;
    if (e.nodeType !== e.ELEMENT_NODE)
        return n ? Zs(V.parentNode(e), t, n) : !1;
    for (let n = e.classList.length; n--; ) {
        let r = e.classList[n];
        if (t.test(r))
            return !0
    }
    return n ? Zs(V.parentNode(e), t, n) : !1
}
function Qs(e, t, n, r) {
    let i;
    if (ss(e)) {
        if (i = e,
        !V.childNodes(i).length)
            return !1
    } else if (V.parentElement(e) === null)
        return !1;
    else
        i = V.parentElement(e);
    try {
        if (typeof t == `string`) {
            if (r) {
                if (i.closest(`.${t}`))
                    return !0
            } else if (i.classList.contains(t))
                return !0
        } else if (Zs(i, t, r))
            return !0;
        if (n) {
            if (r) {
                if (i.closest(n))
                    return !0
            } else if (i.matches(n))
                return !0
        }
    } catch {}
    return !1
}
function $s(e, t, n) {
    let r = e.contentWindow;
    if (!r)
        return;
    let i = !1, a;
    try {
        a = r.document.readyState
    } catch {
        return
    }
    if (a !== `complete`) {
        let r = setTimeout( () => {
            i ||= (t(),
            !0)
        }
        , n);
        e.addEventListener(`load`, () => {
            clearTimeout(r),
            i = !0,
            t()
        }
        );
        return
    }
    let o = `about:blank`;
    if (r.location.href !== o || e.src === o || e.src === ``)
        return setTimeout(t, 0),
        e.addEventListener(`load`, t);
    e.addEventListener(`load`, t)
}
function ec(e, t, n) {
    let r = !1, i;
    try {
        i = e.sheet
    } catch {
        return
    }
    if (i)
        return;
    let a = setTimeout( () => {
        r ||= (t(),
        !0)
    }
    , n);
    e.addEventListener(`load`, () => {
        clearTimeout(a),
        r = !0,
        t()
    }
    )
}
function tc(e, t) {
    let {doc: n, mirror: r, blockClass: i, blockSelector: a, needsMask: o, inlineStylesheet: s, maskInputOptions: c={}, maskTextFn: l, maskInputFn: u, dataURLOptions: d={}, inlineImages: f, recordCanvas: p, keepIframeSrcFn: m, newlyAddedElement: h=!1, cssCaptured: g=!1} = t
      , _ = nc(n, r);
    switch (e.nodeType) {
    case e.DOCUMENT_NODE:
        return e.compatMode === `CSS1Compat` ? {
            type: B.Document,
            childNodes: []
        } : {
            type: B.Document,
            childNodes: [],
            compatMode: e.compatMode
        };
    case e.DOCUMENT_TYPE_NODE:
        return {
            type: B.DocumentType,
            name: e.name,
            publicId: e.publicId,
            systemId: e.systemId,
            rootId: _
        };
    case e.ELEMENT_NODE:
        return ic(e, {
            doc: n,
            blockClass: i,
            blockSelector: a,
            inlineStylesheet: s,
            maskInputOptions: c,
            maskInputFn: u,
            dataURLOptions: d,
            inlineImages: f,
            recordCanvas: p,
            keepIframeSrcFn: m,
            newlyAddedElement: h,
            rootId: _
        });
    case e.TEXT_NODE:
        return rc(e, {
            doc: n,
            needsMask: o,
            maskTextFn: l,
            rootId: _,
            cssCaptured: g
        });
    case e.CDATA_SECTION_NODE:
        return {
            type: B.CDATA,
            textContent: ``,
            rootId: _
        };
    case e.COMMENT_NODE:
        return {
            type: B.Comment,
            textContent: V.textContent(e) || ``,
            rootId: _
        };
    default:
        return !1
    }
}
function nc(e, t) {
    if (!t.hasNode(e))
        return;
    let n = t.getId(e);
    return n === 1 ? void 0 : n
}
function rc(e, t) {
    let {needsMask: n, maskTextFn: r, rootId: i, cssCaptured: a} = t
      , o = V.parentNode(e)
      , s = o && o.tagName
      , c = ``
      , l = s === `STYLE` ? !0 : void 0
      , u = s === `SCRIPT` ? !0 : void 0;
    return u ? c = `SCRIPT_PLACEHOLDER` : a || (c = V.textContent(e),
    l && c && (c = As(c, qs(t.doc)))),
    !l && !u && c && n && (c = r ? r(c, V.parentElement(e)) : c.replace(/[\S]/g, `*`)),
    {
        type: B.Text,
        textContent: c || ``,
        rootId: i
    }
}
function ic(e, t) {
    let {doc: n, blockClass: r, blockSelector: i, inlineStylesheet: a, maskInputOptions: o={}, maskInputFn: s, dataURLOptions: c={}, inlineImages: l, recordCanvas: u, keepIframeSrcFn: d, newlyAddedElement: f=!1, rootId: p} = t
      , m = Xs(e, r, i)
      , h = Rs(e)
      , g = {}
      , _ = e.attributes.length;
    for (let t = 0; t < _; t++) {
        let r = e.attributes[t];
        Ys(h, r.name, r.value) || (g[r.name] = Js(n, h, bs(r.name), r.value))
    }
    if (h === `link` && a) {
        let t = Array.from(n.styleSheets).find(t => t.href === e.href)
          , r = null;
        t && (r = fs(t)),
        r && (delete g.rel,
        delete g.href,
        g._cssText = r)
    }
    if (h === `style` && e.sheet) {
        let t = fs(e.sheet);
        t && (e.childNodes.length > 1 && (t = Ns(t, e)),
        g._cssText = t)
    }
    if ([`input`, `textarea`, `select`].includes(h)) {
        let t = e.value
          , n = e.checked;
        g.type !== `radio` && g.type !== `checkbox` && g.type !== `submit` && g.type !== `button` && t ? g.value = ys({
            element: e,
            type: Cs(e),
            tagName: h,
            value: t,
            maskInputOptions: o,
            maskInputFn: s
        }) : n && (g.checked = n)
    }
    if (h === `option` && (e.selected && !o.select ? g.selected = !0 : delete g.selected),
    h === `dialog` && e.open && (g.rr_open_mode = e.matches(`dialog:modal`) ? `modal` : `non-modal`),
    h === `canvas` && u) {
        if (e.__context === `2d`)
            Ss(e) || (g.rr_dataURL = e.toDataURL(c.type, c.quality));
        else if (!(`__context` in e)) {
            let t = e.toDataURL(c.type, c.quality)
              , r = n.createElement(`canvas`);
            r.width = e.width,
            r.height = e.height,
            t !== r.toDataURL(c.type, c.quality) && (g.rr_dataURL = t)
        }
    }
    if (h === `img` && l) {
        zs || (zs = n.createElement(`canvas`),
        Bs = zs.getContext(`2d`));
        let t = e
          , r = t.currentSrc || t.getAttribute(`src`) || `<unknown-src>`
          , i = t.crossOrigin
          , a = () => {
            t.removeEventListener(`load`, a);
            try {
                zs.width = t.naturalWidth,
                zs.height = t.naturalHeight,
                Bs.drawImage(t, 0, 0),
                g.rr_dataURL = zs.toDataURL(c.type, c.quality)
            } catch (e) {
                if (t.crossOrigin !== `anonymous`) {
                    t.crossOrigin = `anonymous`,
                    t.complete && t.naturalWidth !== 0 ? a() : t.addEventListener(`load`, a);
                    return
                } else
                    console.warn(`Cannot inline img src=${r}! Error: ${e}`)
            }
            t.crossOrigin === `anonymous` && (i ? g.crossOrigin = i : t.removeAttribute(`crossorigin`))
        }
        ;
        t.complete && t.naturalWidth !== 0 ? a() : t.addEventListener(`load`, a)
    }
    if ([`audio`, `video`].includes(h)) {
        let t = g;
        t.rr_mediaState = e.paused ? `paused` : `played`,
        t.rr_mediaCurrentTime = e.currentTime,
        t.rr_mediaPlaybackRate = e.playbackRate,
        t.rr_mediaMuted = e.muted,
        t.rr_mediaLoop = e.loop,
        t.rr_mediaVolume = e.volume
    }
    if (f || (e.scrollLeft && (g.rr_scrollLeft = e.scrollLeft),
    e.scrollTop && (g.rr_scrollTop = e.scrollTop)),
    m) {
        let {width: t, height: n} = e.getBoundingClientRect();
        g = {
            class: g.class,
            rr_width: `${t}px`,
            rr_height: `${n}px`
        }
    }
    h === `iframe` && !d(g.src) && (e.contentDocument || (g.rr_src = g.src),
    delete g.src);
    let v;
    try {
        customElements.get(h) && (v = !0)
    } catch {}
    return {
        type: B.Element,
        tagName: h,
        attributes: g,
        childNodes: [],
        isSVG: Ks(e) || void 0,
        needBlock: m,
        rootId: p,
        isCustom: v
    }
}
function H(e) {
    return e == null ? `` : e.toLowerCase()
}
function ac(e) {
    return e === !0 || e === `all` ? {
        script: !0,
        comment: !0,
        headFavicon: !0,
        headWhitespace: !0,
        headMetaSocial: !0,
        headMetaRobots: !0,
        headMetaHttpEquiv: !0,
        headMetaVerification: !0,
        headMetaAuthorship: e === `all`,
        headMetaDescKeywords: e === `all`,
        headTitleMutations: e === `all`
    } : e || {}
}
function oc(e, t) {
    return !!(t.comment && e.type === B.Comment || e.type === B.Element && (t.script && (e.tagName === `script` || e.tagName === `link` && (e.attributes.rel === `preload` && e.attributes.as === `script` || e.attributes.rel === `modulepreload`) || e.tagName === `link` && e.attributes.rel === `prefetch` && typeof e.attributes.href == `string` && ws(e.attributes.href) === `js`) || t.headFavicon && (e.tagName === `link` && e.attributes.rel === `shortcut icon` || e.tagName === `meta` && (H(e.attributes.name).match(/^msapplication-tile(image|color)$/) || H(e.attributes.name) === `application-name` || H(e.attributes.rel) === `icon` || H(e.attributes.rel) === `apple-touch-icon` || H(e.attributes.rel) === `shortcut icon`)) || e.tagName === `meta` && (t.headMetaDescKeywords && H(e.attributes.name).match(/^description|keywords$/) || t.headMetaSocial && (H(e.attributes.property).match(/^(og|twitter|fb):/) || H(e.attributes.name).match(/^(og|twitter):/) || H(e.attributes.name) === `pinterest`) || t.headMetaRobots && (H(e.attributes.name) === `robots` || H(e.attributes.name) === `googlebot` || H(e.attributes.name) === `bingbot`) || t.headMetaHttpEquiv && e.attributes[`http-equiv`] !== void 0 || t.headMetaAuthorship && (H(e.attributes.name) === `author` || H(e.attributes.name) === `generator` || H(e.attributes.name) === `framework` || H(e.attributes.name) === `publisher` || H(e.attributes.name) === `progid` || H(e.attributes.property).match(/^article:/) || H(e.attributes.property).match(/^product:/)) || t.headMetaVerification && (H(e.attributes.name) === `google-site-verification` || H(e.attributes.name) === `yandex-verification` || H(e.attributes.name) === `csrf-token` || H(e.attributes.name) === `p:domain_verify` || H(e.attributes.name) === `verify-v1` || H(e.attributes.name) === `verification` || H(e.attributes.name) === `shopify-checkout-api-token`))))
}
function sc(e, t) {
    let {doc: n, mirror: r, blockClass: i, blockSelector: a, maskTextClass: o, maskTextSelector: s, skipChild: c=!1, inlineStylesheet: l=!0, maskInputOptions: u={}, maskTextFn: d, maskInputFn: f, slimDOMOptions: p, dataURLOptions: m={}, inlineImages: h=!1, recordCanvas: g=!1, onSerialize: _, onIframeLoad: v, iframeLoadTimeout: y=5e3, onStylesheetLoad: b, stylesheetLoadTimeout: x=5e3, keepIframeSrcFn: S= () => !1, newlyAddedElement: C=!1, cssCaptured: ee=!1} = t
      , {needsMask: w} = t
      , {preserveWhiteSpace: te=!0} = t;
    w ||= Qs(e, o, s, w === void 0);
    let ne = tc(e, {
        doc: n,
        mirror: r,
        blockClass: i,
        blockSelector: a,
        needsMask: w,
        inlineStylesheet: l,
        maskInputOptions: u,
        maskTextFn: d,
        maskInputFn: f,
        dataURLOptions: m,
        inlineImages: h,
        recordCanvas: g,
        keepIframeSrcFn: S,
        newlyAddedElement: C,
        cssCaptured: ee
    });
    if (!ne)
        return console.warn(e, `not serialized`),
        null;
    let re;
    re = r.hasNode(e) ? r.getId(e) : oc(ne, p) || !te && ne.type === B.Text && !ne.textContent.replace(/^\s+|\s+$/gm, ``).length ? Is : Ls();
    let T = Object.assign(ne, {
        id: re
    });
    if (r.add(e, T),
    re === Is)
        return null;
    _ && _(e);
    let ie = !c;
    if (T.type === B.Element) {
        ie &&= !T.needBlock,
        delete T.needBlock;
        let t = V.shadowRoot(e);
        t && ls(t) && (T.isShadowHost = !0)
    }
    if ((T.type === B.Document || T.type === B.Element) && ie) {
        p.headWhitespace && T.type === B.Element && T.tagName === `head` && (te = !1);
        let t = {
            doc: n,
            mirror: r,
            blockClass: i,
            blockSelector: a,
            needsMask: w,
            maskTextClass: o,
            maskTextSelector: s,
            skipChild: c,
            inlineStylesheet: l,
            maskInputOptions: u,
            maskTextFn: d,
            maskInputFn: f,
            slimDOMOptions: p,
            dataURLOptions: m,
            inlineImages: h,
            recordCanvas: g,
            preserveWhiteSpace: te,
            onSerialize: _,
            onIframeLoad: v,
            iframeLoadTimeout: y,
            onStylesheetLoad: b,
            stylesheetLoadTimeout: x,
            keepIframeSrcFn: S,
            cssCaptured: !1
        };
        if (!(T.type === B.Element && T.tagName === `textarea` && T.attributes.value !== void 0)) {
            T.type === B.Element && T.attributes._cssText !== void 0 && typeof T.attributes._cssText == `string` && (t.cssCaptured = !0);
            for (let n of Array.from(V.childNodes(e))) {
                let e = sc(n, t);
                e && T.childNodes.push(e)
            }
        }
        let C = null;
        if (ss(e) && (C = V.shadowRoot(e)))
            for (let e of Array.from(V.childNodes(C))) {
                let n = sc(e, t);
                n && (ls(C) && (n.isShadow = !0),
                T.childNodes.push(n))
            }
    }
    let ae = V.parentNode(e);
    return ae && cs(ae) && ls(ae) && (T.isShadow = !0),
    T.type === B.Element && T.tagName === `iframe` && $s(e, () => {
        let t = e.contentDocument;
        if (t && v) {
            let n = sc(t, {
                doc: t,
                mirror: r,
                blockClass: i,
                blockSelector: a,
                needsMask: w,
                maskTextClass: o,
                maskTextSelector: s,
                skipChild: !1,
                inlineStylesheet: l,
                maskInputOptions: u,
                maskTextFn: d,
                maskInputFn: f,
                slimDOMOptions: p,
                dataURLOptions: m,
                inlineImages: h,
                recordCanvas: g,
                preserveWhiteSpace: te,
                onSerialize: _,
                onIframeLoad: v,
                iframeLoadTimeout: y,
                onStylesheetLoad: b,
                stylesheetLoadTimeout: x,
                keepIframeSrcFn: S
            });
            n && v(e, n)
        }
    }
    , y),
    T.type === B.Element && T.tagName === `link` && typeof T.attributes.rel == `string` && (T.attributes.rel === `stylesheet` || T.attributes.rel === `preload` && typeof T.attributes.href == `string` && ws(T.attributes.href) === `css`) && ec(e, () => {
        if (b) {
            let t = sc(e, {
                doc: n,
                mirror: r,
                blockClass: i,
                blockSelector: a,
                needsMask: w,
                maskTextClass: o,
                maskTextSelector: s,
                skipChild: !1,
                inlineStylesheet: l,
                maskInputOptions: u,
                maskTextFn: d,
                maskInputFn: f,
                slimDOMOptions: p,
                dataURLOptions: m,
                inlineImages: h,
                recordCanvas: g,
                preserveWhiteSpace: te,
                onSerialize: _,
                onIframeLoad: v,
                iframeLoadTimeout: y,
                onStylesheetLoad: b,
                stylesheetLoadTimeout: x,
                keepIframeSrcFn: S
            });
            t && b(e, t)
        }
    }
    , x),
    T
}
function cc(e, t) {
    let {mirror: n=new _s, blockClass: r=`rr-block`, blockSelector: i=null, maskTextClass: a=`rr-mask`, maskTextSelector: o=null, inlineStylesheet: s=!0, inlineImages: c=!1, recordCanvas: l=!1, maskAllInputs: u=!1, maskTextFn: d, maskInputFn: f, slimDOM: p=!1, dataURLOptions: m, preserveWhiteSpace: h, onSerialize: g, onIframeLoad: _, iframeLoadTimeout: v, onStylesheetLoad: y, stylesheetLoadTimeout: b, keepIframeSrcFn: x= () => !1} = t;
    return sc(e, {
        doc: e,
        mirror: n,
        blockClass: r,
        blockSelector: i,
        maskTextClass: a,
        maskTextSelector: o,
        skipChild: !1,
        inlineStylesheet: s,
        maskInputOptions: u === !0 ? {
            color: !0,
            date: !0,
            "datetime-local": !0,
            email: !0,
            month: !0,
            number: !0,
            range: !0,
            search: !0,
            tel: !0,
            text: !0,
            time: !0,
            url: !0,
            week: !0,
            textarea: !0,
            select: !0,
            password: !0
        } : u === !1 ? {
            password: !0
        } : u,
        maskTextFn: d,
        maskInputFn: f,
        slimDOMOptions: ac(p),
        dataURLOptions: m,
        inlineImages: c,
        recordCanvas: l,
        preserveWhiteSpace: h,
        onSerialize: g,
        onIframeLoad: _,
        iframeLoadTimeout: v,
        onStylesheetLoad: y,
        stylesheetLoadTimeout: b,
        keepIframeSrcFn: x,
        newlyAddedElement: !1
    })
}
function lc(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, `default`) ? e.default : e
}
function uc(e) {
    if (e.__esModule)
        return e;
    var t = e.default;
    if (typeof t == `function`) {
        var n = function e() {
            return this instanceof e ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments)
        };
        n.prototype = t.prototype
    } else
        n = {};
    return Object.defineProperty(n, "__esModule", {
        value: !0
    }),
    Object.keys(e).forEach(function(t) {
        var r = Object.getOwnPropertyDescriptor(e, t);
        Object.defineProperty(n, t, r.get ? r : {
            enumerable: !0,
            get: function() {
                return e[t]
            }
        })
    }),
    n
}
var dc = {
    exports: {}
}, fc;
function pc() {
    if (fc)
        return dc.exports;
    fc = 1;
    var e = String
      , t = function() {
        return {
            isColorSupported: !1,
            reset: e,
            bold: e,
            dim: e,
            italic: e,
            underline: e,
            inverse: e,
            hidden: e,
            strikethrough: e,
            black: e,
            red: e,
            green: e,
            yellow: e,
            blue: e,
            magenta: e,
            cyan: e,
            white: e,
            gray: e,
            bgBlack: e,
            bgRed: e,
            bgGreen: e,
            bgYellow: e,
            bgBlue: e,
            bgMagenta: e,
            bgCyan: e,
            bgWhite: e
        }
    };
    return dc.exports = t(),
    dc.exports.createColors = t,
    dc.exports
}
var mc = uc(Object.freeze(Object.defineProperty({
    __proto__: null,
    default: {}
}, Symbol.toStringTag, {
    value: `Module`
}))), hc, gc;
function _c() {
    if (gc)
        return hc;
    gc = 1;
    let e = pc()
      , t = mc;
    class n extends Error {
        constructor(e, t, r, i, a, o) {
            super(e),
            this.name = `CssSyntaxError`,
            this.reason = e,
            a && (this.file = a),
            i && (this.source = i),
            o && (this.plugin = o),
            t !== void 0 && r !== void 0 && (typeof t == `number` ? (this.line = t,
            this.column = r) : (this.line = t.line,
            this.column = t.column,
            this.endLine = r.line,
            this.endColumn = r.column)),
            this.setMessage(),
            Error.captureStackTrace && Error.captureStackTrace(this, n)
        }
        setMessage() {
            this.message = this.plugin ? this.plugin + `: ` : ``,
            this.message += this.file ? this.file : `<css input>`,
            this.line !== void 0 && (this.message += `:` + this.line + `:` + this.column),
            this.message += `: ` + this.reason
        }
        showSourceCode(n) {
            if (!this.source)
                return ``;
            let r = this.source;
            n ??= e.isColorSupported,
            t && n && (r = t(r));
            let i = r.split(/\r?\n/), a = Math.max(this.line - 3, 0), o = Math.min(this.line + 2, i.length), s = String(o).length, c, l;
            if (n) {
                let {bold: t, gray: n, red: r} = e.createColors(!0);
                c = e => t(r(e)),
                l = e => n(e)
            } else
                c = l = e => e;
            return i.slice(a, o).map( (e, t) => {
                let n = a + 1 + t
                  , r = ` ` + (` ` + n).slice(-s) + ` | `;
                if (n === this.line) {
                    let t = l(r.replace(/\d/g, ` `)) + e.slice(0, this.column - 1).replace(/[^\t]/g, ` `);
                    return c(`>`) + l(r) + e + `
 ` + t + c(`^`)
                }
                return ` ` + l(r) + e
            }
            ).join(`
`)
        }
        toString() {
            let e = this.showSourceCode();
            return e &&= `

` + e + `
`,
            this.name + `: ` + this.message + e
        }
    }
    return hc = n,
    n.default = n,
    hc
}
var vc = {}, yc;
function bc() {
    return yc ? vc : (yc = 1,
    vc.isClean = Symbol(`isClean`),
    vc.my = Symbol(`my`),
    vc)
}
var xc, Sc;
function Cc() {
    if (Sc)
        return xc;
    Sc = 1;
    let e = {
        after: `
`,
        beforeClose: `
`,
        beforeComment: `
`,
        beforeDecl: `
`,
        beforeOpen: ` `,
        beforeRule: `
`,
        colon: `: `,
        commentLeft: ` `,
        commentRight: ` `,
        emptyBody: ``,
        indent: `    `,
        semicolon: !1
    };
    function t(e) {
        return e[0].toUpperCase() + e.slice(1)
    }
    class n {
        constructor(e) {
            this.builder = e
        }
        atrule(e, t) {
            let n = `@` + e.name
              , r = e.params ? this.rawValue(e, `params`) : ``;
            if (e.raws.afterName === void 0 ? r && (n += ` `) : n += e.raws.afterName,
            e.nodes)
                this.block(e, n + r);
            else {
                let i = (e.raws.between || ``) + (t ? `;` : ``);
                this.builder(n + r + i, e)
            }
        }
        beforeAfter(e, t) {
            let n;
            n = e.type === `decl` ? this.raw(e, null, `beforeDecl`) : e.type === `comment` ? this.raw(e, null, `beforeComment`) : t === `before` ? this.raw(e, null, `beforeRule`) : this.raw(e, null, `beforeClose`);
            let r = e.parent
              , i = 0;
            for (; r && r.type !== `root`; )
                i += 1,
                r = r.parent;
            if (n.includes(`
`)) {
                let t = this.raw(e, null, `indent`);
                if (t.length)
                    for (let e = 0; e < i; e++)
                        n += t
            }
            return n
        }
        block(e, t) {
            let n = this.raw(e, `between`, `beforeOpen`);
            this.builder(t + n + `{`, e, `start`);
            let r;
            e.nodes && e.nodes.length ? (this.body(e),
            r = this.raw(e, `after`)) : r = this.raw(e, `after`, `emptyBody`),
            r && this.builder(r),
            this.builder(`}`, e, `end`)
        }
        body(e) {
            let t = e.nodes.length - 1;
            for (; t > 0 && e.nodes[t].type === `comment`; )
                --t;
            let n = this.raw(e, `semicolon`);
            for (let r = 0; r < e.nodes.length; r++) {
                let i = e.nodes[r]
                  , a = this.raw(i, `before`);
                a && this.builder(a),
                this.stringify(i, t !== r || n)
            }
        }
        comment(e) {
            let t = this.raw(e, `left`, `commentLeft`)
              , n = this.raw(e, `right`, `commentRight`);
            this.builder(`/*` + t + e.text + n + `*/`, e)
        }
        decl(e, t) {
            let n = this.raw(e, `between`, `colon`)
              , r = e.prop + n + this.rawValue(e, `value`);
            e.important && (r += e.raws.important || ` !important`),
            t && (r += `;`),
            this.builder(r, e)
        }
        document(e) {
            this.body(e)
        }
        raw(n, r, i) {
            let a;
            if (i ||= r,
            r && (a = n.raws[r],
            a !== void 0))
                return a;
            let o = n.parent;
            if (i === `before` && (!o || o.type === `root` && o.first === n || o && o.type === `document`))
                return ``;
            if (!o)
                return e[i];
            let s = n.root();
            if (s.rawCache ||= {},
            s.rawCache[i] !== void 0)
                return s.rawCache[i];
            if (i === `before` || i === `after`)
                return this.beforeAfter(n, i);
            {
                let e = `raw` + t(i);
                this[e] ? a = this[e](s, n) : s.walk(e => {
                    if (a = e.raws[r],
                    a !== void 0)
                        return !1
                }
                )
            }
            return a === void 0 && (a = e[i]),
            s.rawCache[i] = a,
            a
        }
        rawBeforeClose(e) {
            let t;
            return e.walk(e => {
                if (e.nodes && e.nodes.length > 0 && e.raws.after !== void 0)
                    return t = e.raws.after,
                    t.includes(`
`) && (t = t.replace(/[^\n]+$/, ``)),
                    !1
            }
            ),
            t &&= t.replace(/\S/g, ``),
            t
        }
        rawBeforeComment(e, t) {
            let n;
            return e.walkComments(e => {
                if (e.raws.before !== void 0)
                    return n = e.raws.before,
                    n.includes(`
`) && (n = n.replace(/[^\n]+$/, ``)),
                    !1
            }
            ),
            n === void 0 ? n = this.raw(t, null, `beforeDecl`) : n &&= n.replace(/\S/g, ``),
            n
        }
        rawBeforeDecl(e, t) {
            let n;
            return e.walkDecls(e => {
                if (e.raws.before !== void 0)
                    return n = e.raws.before,
                    n.includes(`
`) && (n = n.replace(/[^\n]+$/, ``)),
                    !1
            }
            ),
            n === void 0 ? n = this.raw(t, null, `beforeRule`) : n &&= n.replace(/\S/g, ``),
            n
        }
        rawBeforeOpen(e) {
            let t;
            return e.walk(e => {
                if (e.type !== `decl` && (t = e.raws.between,
                t !== void 0))
                    return !1
            }
            ),
            t
        }
        rawBeforeRule(e) {
            let t;
            return e.walk(n => {
                if (n.nodes && (n.parent !== e || e.first !== n) && n.raws.before !== void 0)
                    return t = n.raws.before,
                    t.includes(`
`) && (t = t.replace(/[^\n]+$/, ``)),
                    !1
            }
            ),
            t &&= t.replace(/\S/g, ``),
            t
        }
        rawColon(e) {
            let t;
            return e.walkDecls(e => {
                if (e.raws.between !== void 0)
                    return t = e.raws.between.replace(/[^\s:]/g, ``),
                    !1
            }
            ),
            t
        }
        rawEmptyBody(e) {
            let t;
            return e.walk(e => {
                if (e.nodes && e.nodes.length === 0 && (t = e.raws.after,
                t !== void 0))
                    return !1
            }
            ),
            t
        }
        rawIndent(e) {
            if (e.raws.indent)
                return e.raws.indent;
            let t;
            return e.walk(n => {
                let r = n.parent;
                if (r && r !== e && r.parent && r.parent === e && n.raws.before !== void 0) {
                    let e = n.raws.before.split(`
`);
                    return t = e[e.length - 1],
                    t = t.replace(/\S/g, ``),
                    !1
                }
            }
            ),
            t
        }
        rawSemicolon(e) {
            let t;
            return e.walk(e => {
                if (e.nodes && e.nodes.length && e.last.type === `decl` && (t = e.raws.semicolon,
                t !== void 0))
                    return !1
            }
            ),
            t
        }
        rawValue(e, t) {
            let n = e[t]
              , r = e.raws[t];
            return r && r.value === n ? r.raw : n
        }
        root(e) {
            this.body(e),
            e.raws.after && this.builder(e.raws.after)
        }
        rule(e) {
            this.block(e, this.rawValue(e, `selector`)),
            e.raws.ownSemicolon && this.builder(e.raws.ownSemicolon, e, `end`)
        }
        stringify(e, t) {
            if (!this[e.type])
                throw Error(`Unknown AST node type ` + e.type + `. Maybe you need to change PostCSS stringifier.`);
            this[e.type](e, t)
        }
    }
    return xc = n,
    n.default = n,
    xc
}
var wc, Tc;
function Ec() {
    if (Tc)
        return wc;
    Tc = 1;
    let e = Cc();
    function t(t, n) {
        new e(n).stringify(t)
    }
    return wc = t,
    t.default = t,
    wc
}
var Dc, Oc;
function kc() {
    if (Oc)
        return Dc;
    Oc = 1;
    let {isClean: e, my: t} = bc()
      , n = _c()
      , r = Cc()
      , i = Ec();
    function a(e, t) {
        let n = new e.constructor;
        for (let r in e) {
            if (!Object.prototype.hasOwnProperty.call(e, r) || r === `proxyCache`)
                continue;
            let i = e[r]
              , o = typeof i;
            r === `parent` && o === `object` ? t && (n[r] = t) : r === `source` ? n[r] = i : Array.isArray(i) ? n[r] = i.map(e => a(e, n)) : (o === `object` && i !== null && (i = a(i)),
            n[r] = i)
        }
        return n
    }
    class o {
        constructor(n={}) {
            this.raws = {},
            this[e] = !1,
            this[t] = !0;
            for (let e in n)
                if (e === `nodes`) {
                    this.nodes = [];
                    for (let t of n[e])
                        typeof t.clone == `function` ? this.append(t.clone()) : this.append(t)
                } else
                    this[e] = n[e]
        }
        addToError(e) {
            if (e.postcssNode = this,
            e.stack && this.source && /\n\s{4}at /.test(e.stack)) {
                let t = this.source;
                e.stack = e.stack.replace(/\n\s{4}at /, `$&${t.input.from}:${t.start.line}:${t.start.column}$&`)
            }
            return e
        }
        after(e) {
            return this.parent.insertAfter(this, e),
            this
        }
        assign(e={}) {
            for (let t in e)
                this[t] = e[t];
            return this
        }
        before(e) {
            return this.parent.insertBefore(this, e),
            this
        }
        cleanRaws(e) {
            delete this.raws.before,
            delete this.raws.after,
            e || delete this.raws.between
        }
        clone(e={}) {
            let t = a(this);
            for (let n in e)
                t[n] = e[n];
            return t
        }
        cloneAfter(e={}) {
            let t = this.clone(e);
            return this.parent.insertAfter(this, t),
            t
        }
        cloneBefore(e={}) {
            let t = this.clone(e);
            return this.parent.insertBefore(this, t),
            t
        }
        error(e, t={}) {
            if (this.source) {
                let {end: n, start: r} = this.rangeBy(t);
                return this.source.input.error(e, {
                    column: r.column,
                    line: r.line
                }, {
                    column: n.column,
                    line: n.line
                }, t)
            }
            return new n(e)
        }
        getProxyProcessor() {
            return {
                get(e, t) {
                    return t === `proxyOf` ? e : t === `root` ? () => e.root().toProxy() : e[t]
                },
                set(e, t, n) {
                    return e[t] === n ? !0 : (e[t] = n,
                    (t === `prop` || t === `value` || t === `name` || t === `params` || t === `important` || t === `text`) && e.markDirty(),
                    !0)
                }
            }
        }
        markDirty() {
            if (this[e]) {
                this[e] = !1;
                let t = this;
                for (; t = t.parent; )
                    t[e] = !1
            }
        }
        next() {
            if (!this.parent)
                return;
            let e = this.parent.index(this);
            return this.parent.nodes[e + 1]
        }
        positionBy(e, t) {
            let n = this.source.start;
            if (e.index)
                n = this.positionInside(e.index, t);
            else if (e.word) {
                t = this.toString();
                let r = t.indexOf(e.word);
                r !== -1 && (n = this.positionInside(r, t))
            }
            return n
        }
        positionInside(e, t) {
            let n = t || this.toString()
              , r = this.source.start.column
              , i = this.source.start.line;
            for (let t = 0; t < e; t++)
                n[t] === `
` ? (r = 1,
                i += 1) : r += 1;
            return {
                column: r,
                line: i
            }
        }
        prev() {
            if (!this.parent)
                return;
            let e = this.parent.index(this);
            return this.parent.nodes[e - 1]
        }
        rangeBy(e) {
            let t = {
                column: this.source.start.column,
                line: this.source.start.line
            }
              , n = this.source.end ? {
                column: this.source.end.column + 1,
                line: this.source.end.line
            } : {
                column: t.column + 1,
                line: t.line
            };
            if (e.word) {
                let r = this.toString()
                  , i = r.indexOf(e.word);
                i !== -1 && (t = this.positionInside(i, r),
                n = this.positionInside(i + e.word.length, r))
            } else
                e.start ? t = {
                    column: e.start.column,
                    line: e.start.line
                } : e.index && (t = this.positionInside(e.index)),
                e.end ? n = {
                    column: e.end.column,
                    line: e.end.line
                } : typeof e.endIndex == `number` ? n = this.positionInside(e.endIndex) : e.index && (n = this.positionInside(e.index + 1));
            return (n.line < t.line || n.line === t.line && n.column <= t.column) && (n = {
                column: t.column + 1,
                line: t.line
            }),
            {
                end: n,
                start: t
            }
        }
        raw(e, t) {
            return new r().raw(this, e, t)
        }
        remove() {
            return this.parent && this.parent.removeChild(this),
            this.parent = void 0,
            this
        }
        replaceWith(...e) {
            if (this.parent) {
                let t = this
                  , n = !1;
                for (let r of e)
                    r === this ? n = !0 : n ? (this.parent.insertAfter(t, r),
                    t = r) : this.parent.insertBefore(t, r);
                n || this.remove()
            }
            return this
        }
        root() {
            let e = this;
            for (; e.parent && e.parent.type !== `document`; )
                e = e.parent;
            return e
        }
        toJSON(e, t) {
            let n = {}
              , r = t == null;
            t ||= new Map;
            let i = 0;
            for (let e in this) {
                if (!Object.prototype.hasOwnProperty.call(this, e) || e === `parent` || e === `proxyCache`)
                    continue;
                let r = this[e];
                if (Array.isArray(r))
                    n[e] = r.map(e => typeof e == `object` && e.toJSON ? e.toJSON(null, t) : e);
                else if (typeof r == `object` && r.toJSON)
                    n[e] = r.toJSON(null, t);
                else if (e === `source`) {
                    let a = t.get(r.input);
                    a ?? (a = i,
                    t.set(r.input, i),
                    i++),
                    n[e] = {
                        end: r.end,
                        inputId: a,
                        start: r.start
                    }
                } else
                    n[e] = r
            }
            return r && (n.inputs = [...t.keys()].map(e => e.toJSON())),
            n
        }
        toProxy() {
            return this.proxyCache ||= new Proxy(this,this.getProxyProcessor()),
            this.proxyCache
        }
        toString(e=i) {
            e.stringify && (e = e.stringify);
            let t = ``;
            return e(this, e => {
                t += e
            }
            ),
            t
        }
        warn(e, t, n) {
            let r = {
                node: this
            };
            for (let e in n)
                r[e] = n[e];
            return e.warn(t, r)
        }
        get proxyOf() {
            return this
        }
    }
    return Dc = o,
    o.default = o,
    Dc
}
var Ac, jc;
function Mc() {
    if (jc)
        return Ac;
    jc = 1;
    let e = kc();
    class t extends e {
        constructor(e) {
            e && e.value !== void 0 && typeof e.value != `string` && (e = {
                ...e,
                value: String(e.value)
            }),
            super(e),
            this.type = `decl`
        }
        get variable() {
            return this.prop.startsWith(`--`) || this.prop[0] === `$`
        }
    }
    return Ac = t,
    t.default = t,
    Ac
}
var Nc, Pc;
function Fc() {
    return Pc ? Nc : (Pc = 1,
    Nc = {
        nanoid: (e=21) => {
            let t = ``
              , n = e;
            for (; n--; )
                t += `useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict`[Math.random() * 64 | 0];
            return t
        }
        ,
        customAlphabet: (e, t=21) => (n=t) => {
            let r = ``
              , i = n;
            for (; i--; )
                r += e[Math.random() * e.length | 0];
            return r
        }
    },
    Nc)
}
var Ic, Lc;
function Rc() {
    if (Lc)
        return Ic;
    Lc = 1;
    let {SourceMapConsumer: e, SourceMapGenerator: t} = mc
      , {existsSync: n, readFileSync: r} = mc
      , {dirname: i, join: a} = mc;
    function o(e) {
        return Buffer ? Buffer.from(e, `base64`).toString() : window.atob(e)
    }
    class s {
        constructor(e, t) {
            if (t.map === !1)
                return;
            this.loadAnnotation(e),
            this.inline = this.startWith(this.annotation, `data:`);
            let n = t.map ? t.map.prev : void 0
              , r = this.loadMap(t.from, n);
            !this.mapFile && t.from && (this.mapFile = t.from),
            this.mapFile && (this.root = i(this.mapFile)),
            r && (this.text = r)
        }
        consumer() {
            return this.consumerCache ||= new e(this.text),
            this.consumerCache
        }
        decodeInline(e) {
            let t = /^data:application\/json;charset=utf-?8;base64,/
              , n = /^data:application\/json;base64,/;
            if (/^data:application\/json;charset=utf-?8,/.test(e) || /^data:application\/json,/.test(e))
                return decodeURIComponent(e.substr(RegExp.lastMatch.length));
            if (t.test(e) || n.test(e))
                return o(e.substr(RegExp.lastMatch.length));
            let r = e.match(/data:application\/json;([^,]+),/)[1];
            throw Error(`Unsupported source map encoding ` + r)
        }
        getAnnotationURL(e) {
            return e.replace(/^\/\*\s*# sourceMappingURL=/, ``).trim()
        }
        isMap(e) {
            return typeof e == `object` ? typeof e.mappings == `string` || typeof e._mappings == `string` || Array.isArray(e.sections) : !1
        }
        loadAnnotation(e) {
            let t = e.match(/\/\*\s*# sourceMappingURL=/gm);
            if (!t)
                return;
            let n = e.lastIndexOf(t.pop())
              , r = e.indexOf(`*/`, n);
            n > -1 && r > -1 && (this.annotation = this.getAnnotationURL(e.substring(n, r)))
        }
        loadFile(e) {
            if (this.root = i(e),
            n(e))
                return this.mapFile = e,
                r(e, `utf-8`).toString().trim()
        }
        loadMap(n, r) {
            if (r === !1)
                return !1;
            if (r) {
                if (typeof r == `string`)
                    return r;
                if (typeof r == `function`) {
                    let e = r(n);
                    if (e) {
                        let t = this.loadFile(e);
                        if (!t)
                            throw Error(`Unable to load previous source map: ` + e.toString());
                        return t
                    }
                } else if (r instanceof e)
                    return t.fromSourceMap(r).toString();
                else if (r instanceof t)
                    return r.toString();
                else if (this.isMap(r))
                    return JSON.stringify(r);
                else
                    throw Error(`Unsupported previous source map format: ` + r.toString())
            } else if (this.inline)
                return this.decodeInline(this.annotation);
            else if (this.annotation) {
                let e = this.annotation;
                return n && (e = a(i(n), e)),
                this.loadFile(e)
            }
        }
        startWith(e, t) {
            return e ? e.substr(0, t.length) === t : !1
        }
        withContent() {
            return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0)
        }
    }
    return Ic = s,
    s.default = s,
    Ic
}
var zc, Bc;
function Vc() {
    if (Bc)
        return zc;
    Bc = 1;
    let {SourceMapConsumer: e, SourceMapGenerator: t} = mc
      , {fileURLToPath: n, pathToFileURL: r} = mc
      , {isAbsolute: i, resolve: a} = mc
      , {nanoid: o} = Fc()
      , s = mc
      , c = _c()
      , l = Rc()
      , u = Symbol(`fromOffsetCache`)
      , d = !!(e && t)
      , f = !!(a && i);
    class p {
        constructor(e, t={}) {
            if (e == null || typeof e == `object` && !e.toString)
                throw Error(`PostCSS received ${e} instead of CSS string`);
            if (this.css = e.toString(),
            this.css[0] === `﻿` || this.css[0] === `￾` ? (this.hasBOM = !0,
            this.css = this.css.slice(1)) : this.hasBOM = !1,
            t.from && (!f || /^\w+:\/\//.test(t.from) || i(t.from) ? this.file = t.from : this.file = a(t.from)),
            f && d) {
                let e = new l(this.css,t);
                if (e.text) {
                    this.map = e;
                    let t = e.consumer().file;
                    !this.file && t && (this.file = this.mapResolve(t))
                }
            }
            this.file || (this.id = `<input css ` + o(6) + `>`),
            this.map && (this.map.file = this.from)
        }
        error(e, t, n, i={}) {
            let a, o, s;
            if (t && typeof t == `object`) {
                let e = t
                  , r = n;
                if (typeof e.offset == `number`) {
                    let r = this.fromOffset(e.offset);
                    t = r.line,
                    n = r.col
                } else
                    t = e.line,
                    n = e.column;
                if (typeof r.offset == `number`) {
                    let e = this.fromOffset(r.offset);
                    o = e.line,
                    s = e.col
                } else
                    o = r.line,
                    s = r.column
            } else if (!n) {
                let e = this.fromOffset(t);
                t = e.line,
                n = e.col
            }
            let l = this.origin(t, n, o, s);
            return a = l ? new c(e,l.endLine === void 0 ? l.line : {
                column: l.column,
                line: l.line
            },l.endLine === void 0 ? l.column : {
                column: l.endColumn,
                line: l.endLine
            },l.source,l.file,i.plugin) : new c(e,o === void 0 ? t : {
                column: n,
                line: t
            },o === void 0 ? n : {
                column: s,
                line: o
            },this.css,this.file,i.plugin),
            a.input = {
                column: n,
                endColumn: s,
                endLine: o,
                line: t,
                source: this.css
            },
            this.file && (r && (a.input.url = r(this.file).toString()),
            a.input.file = this.file),
            a
        }
        fromOffset(e) {
            let t, n;
            if (this[u])
                n = this[u];
            else {
                let e = this.css.split(`
`);
                n = Array(e.length);
                let t = 0;
                for (let r = 0, i = e.length; r < i; r++)
                    n[r] = t,
                    t += e[r].length + 1;
                this[u] = n
            }
            t = n[n.length - 1];
            let r = 0;
            if (e >= t)
                r = n.length - 1;
            else {
                let t = n.length - 2, i;
                for (; r < t; )
                    if (i = r + (t - r >> 1),
                    e < n[i])
                        t = i - 1;
                    else if (e >= n[i + 1])
                        r = i + 1;
                    else {
                        r = i;
                        break
                    }
            }
            return {
                col: e - n[r] + 1,
                line: r + 1
            }
        }
        mapResolve(e) {
            return /^\w+:\/\//.test(e) ? e : a(this.map.consumer().sourceRoot || this.map.root || `.`, e)
        }
        origin(e, t, a, o) {
            if (!this.map)
                return !1;
            let s = this.map.consumer()
              , c = s.originalPositionFor({
                column: t,
                line: e
            });
            if (!c.source)
                return !1;
            let l;
            typeof a == `number` && (l = s.originalPositionFor({
                column: o,
                line: a
            }));
            let u;
            u = i(c.source) ? r(c.source) : new URL(c.source,this.map.consumer().sourceRoot || r(this.map.mapFile));
            let d = {
                column: c.column,
                endColumn: l && l.column,
                endLine: l && l.line,
                line: c.line,
                url: u.toString()
            };
            if (u.protocol === `file:`)
                if (n)
                    d.file = n(u);
                else
                    throw Error(`file: protocol is not available in this PostCSS build`);
            let f = s.sourceContentFor(c.source);
            return f && (d.source = f),
            d
        }
        toJSON() {
            let e = {};
            for (let t of [`hasBOM`, `css`, `file`, `id`])
                this[t] != null && (e[t] = this[t]);
            return this.map && (e.map = {
                ...this.map
            },
            e.map.consumerCache && (e.map.consumerCache = void 0)),
            e
        }
        get from() {
            return this.file || this.id
        }
    }
    return zc = p,
    p.default = p,
    s && s.registerInput && s.registerInput(p),
    zc
}
var Hc, Uc;
function Wc() {
    if (Uc)
        return Hc;
    Uc = 1;
    let {SourceMapConsumer: e, SourceMapGenerator: t} = mc
      , {dirname: n, relative: r, resolve: i, sep: a} = mc
      , {pathToFileURL: o} = mc
      , s = Vc()
      , c = !!(e && t)
      , l = !!(n && i && r && a);
    class u {
        constructor(e, t, n, r) {
            this.stringify = e,
            this.mapOpts = n.map || {},
            this.root = t,
            this.opts = n,
            this.css = r,
            this.originalCSS = r,
            this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute,
            this.memoizedFileURLs = new Map,
            this.memoizedPaths = new Map,
            this.memoizedURLs = new Map
        }
        addAnnotation() {
            let e;
            e = this.isInline() ? `data:application/json;base64,` + this.toBase64(this.map.toString()) : typeof this.mapOpts.annotation == `string` ? this.mapOpts.annotation : typeof this.mapOpts.annotation == `function` ? this.mapOpts.annotation(this.opts.to, this.root) : this.outputFile() + `.map`;
            let t = `
`;
            this.css.includes(`\r
`) && (t = `\r
`),
            this.css += t + `/*# sourceMappingURL=` + e + ` */`
        }
        applyPrevMaps() {
            for (let t of this.previous()) {
                let r = this.toUrl(this.path(t.file)), i = t.root || n(t.file), a;
                this.mapOpts.sourcesContent === !1 ? (a = new e(t.text),
                a.sourcesContent &&= null) : a = t.consumer(),
                this.map.applySourceMap(a, r, this.toUrl(this.path(i)))
            }
        }
        clearAnnotation() {
            if (this.mapOpts.annotation !== !1)
                if (this.root) {
                    let e;
                    for (let t = this.root.nodes.length - 1; t >= 0; t--)
                        e = this.root.nodes[t],
                        e.type === `comment` && e.text.indexOf(`# sourceMappingURL=`) === 0 && this.root.removeChild(t)
                } else
                    this.css &&= this.css.replace(/\n*?\/\*#[\S\s]*?\*\/$/gm, ``)
        }
        generate() {
            if (this.clearAnnotation(),
            l && c && this.isMap())
                return this.generateMap();
            {
                let e = ``;
                return this.stringify(this.root, t => {
                    e += t
                }
                ),
                [e]
            }
        }
        generateMap() {
            if (this.root)
                this.generateString();
            else if (this.previous().length === 1) {
                let e = this.previous()[0].consumer();
                e.file = this.outputFile(),
                this.map = t.fromSourceMap(e, {
                    ignoreInvalidMapping: !0
                })
            } else
                this.map = new t({
                    file: this.outputFile(),
                    ignoreInvalidMapping: !0
                }),
                this.map.addMapping({
                    generated: {
                        column: 0,
                        line: 1
                    },
                    original: {
                        column: 0,
                        line: 1
                    },
                    source: this.opts.from ? this.toUrl(this.path(this.opts.from)) : `<no source>`
                });
            return this.isSourcesContent() && this.setSourcesContent(),
            this.root && this.previous().length > 0 && this.applyPrevMaps(),
            this.isAnnotation() && this.addAnnotation(),
            this.isInline() ? [this.css] : [this.css, this.map]
        }
        generateString() {
            this.css = ``,
            this.map = new t({
                file: this.outputFile(),
                ignoreInvalidMapping: !0
            });
            let e = 1, n = 1, r = `<no source>`, i = {
                generated: {
                    column: 0,
                    line: 0
                },
                original: {
                    column: 0,
                    line: 0
                },
                source: ``
            }, a, o;
            this.stringify(this.root, (t, s, c) => {
                if (this.css += t,
                s && c !== `end` && (i.generated.line = e,
                i.generated.column = n - 1,
                s.source && s.source.start ? (i.source = this.sourcePath(s),
                i.original.line = s.source.start.line,
                i.original.column = s.source.start.column - 1,
                this.map.addMapping(i)) : (i.source = r,
                i.original.line = 1,
                i.original.column = 0,
                this.map.addMapping(i))),
                a = t.match(/\n/g),
                a ? (e += a.length,
                o = t.lastIndexOf(`
`),
                n = t.length - o) : n += t.length,
                s && c !== `start`) {
                    let t = s.parent || {
                        raws: {}
                    };
                    (!(s.type === `decl` || s.type === `atrule` && !s.nodes) || s !== t.last || t.raws.semicolon) && (s.source && s.source.end ? (i.source = this.sourcePath(s),
                    i.original.line = s.source.end.line,
                    i.original.column = s.source.end.column - 1,
                    i.generated.line = e,
                    i.generated.column = n - 2,
                    this.map.addMapping(i)) : (i.source = r,
                    i.original.line = 1,
                    i.original.column = 0,
                    i.generated.line = e,
                    i.generated.column = n - 1,
                    this.map.addMapping(i)))
                }
            }
            )
        }
        isAnnotation() {
            return this.isInline() ? !0 : this.mapOpts.annotation === void 0 ? this.previous().length ? this.previous().some(e => e.annotation) : !0 : this.mapOpts.annotation
        }
        isInline() {
            if (this.mapOpts.inline !== void 0)
                return this.mapOpts.inline;
            let e = this.mapOpts.annotation;
            return e !== void 0 && e !== !0 ? !1 : this.previous().length ? this.previous().some(e => e.inline) : !0
        }
        isMap() {
            return this.opts.map === void 0 ? this.previous().length > 0 : !!this.opts.map
        }
        isSourcesContent() {
            return this.mapOpts.sourcesContent === void 0 ? this.previous().length ? this.previous().some(e => e.withContent()) : !0 : this.mapOpts.sourcesContent
        }
        outputFile() {
            return this.opts.to ? this.path(this.opts.to) : this.opts.from ? this.path(this.opts.from) : `to.css`
        }
        path(e) {
            if (this.mapOpts.absolute || e.charCodeAt(0) === 60 || /^\w+:\/\//.test(e))
                return e;
            let t = this.memoizedPaths.get(e);
            if (t)
                return t;
            let a = this.opts.to ? n(this.opts.to) : `.`;
            typeof this.mapOpts.annotation == `string` && (a = n(i(a, this.mapOpts.annotation)));
            let o = r(a, e);
            return this.memoizedPaths.set(e, o),
            o
        }
        previous() {
            if (!this.previousMaps)
                if (this.previousMaps = [],
                this.root)
                    this.root.walk(e => {
                        if (e.source && e.source.input.map) {
                            let t = e.source.input.map;
                            this.previousMaps.includes(t) || this.previousMaps.push(t)
                        }
                    }
                    );
                else {
                    let e = new s(this.originalCSS,this.opts);
                    e.map && this.previousMaps.push(e.map)
                }
            return this.previousMaps
        }
        setSourcesContent() {
            let e = {};
            if (this.root)
                this.root.walk(t => {
                    if (t.source) {
                        let n = t.source.input.from;
                        if (n && !e[n]) {
                            e[n] = !0;
                            let r = this.usesFileUrls ? this.toFileUrl(n) : this.toUrl(this.path(n));
                            this.map.setSourceContent(r, t.source.input.css)
                        }
                    }
                }
                );
            else if (this.css) {
                let e = this.opts.from ? this.toUrl(this.path(this.opts.from)) : `<no source>`;
                this.map.setSourceContent(e, this.css)
            }
        }
        sourcePath(e) {
            return this.mapOpts.from ? this.toUrl(this.mapOpts.from) : this.usesFileUrls ? this.toFileUrl(e.source.input.from) : this.toUrl(this.path(e.source.input.from))
        }
        toBase64(e) {
            return Buffer ? Buffer.from(e).toString(`base64`) : window.btoa(unescape(encodeURIComponent(e)))
        }
        toFileUrl(e) {
            let t = this.memoizedFileURLs.get(e);
            if (t)
                return t;
            if (o) {
                let t = o(e).toString();
                return this.memoizedFileURLs.set(e, t),
                t
            } else
                throw Error("`map.absolute` option is not available in this PostCSS build")
        }
        toUrl(e) {
            let t = this.memoizedURLs.get(e);
            if (t)
                return t;
            a === `\\` && (e = e.replace(/\\/g, `/`));
            let n = encodeURI(e).replace(/[#?]/g, encodeURIComponent);
            return this.memoizedURLs.set(e, n),
            n
        }
    }
    return Hc = u,
    Hc
}
var Gc, Kc;
function qc() {
    if (Kc)
        return Gc;
    Kc = 1;
    let e = kc();
    class t extends e {
        constructor(e) {
            super(e),
            this.type = `comment`
        }
    }
    return Gc = t,
    t.default = t,
    Gc
}
var Jc, Yc;
function Xc() {
    if (Yc)
        return Jc;
    Yc = 1;
    let {isClean: e, my: t} = bc(), n = Mc(), r = qc(), i = kc(), a, o, s, c;
    function l(e) {
        return e.map(e => (e.nodes &&= l(e.nodes),
        delete e.source,
        e))
    }
    function u(t) {
        if (t[e] = !1,
        t.proxyOf.nodes)
            for (let e of t.proxyOf.nodes)
                u(e)
    }
    class d extends i {
        append(...e) {
            for (let t of e) {
                let e = this.normalize(t, this.last);
                for (let t of e)
                    this.proxyOf.nodes.push(t)
            }
            return this.markDirty(),
            this
        }
        cleanRaws(e) {
            if (super.cleanRaws(e),
            this.nodes)
                for (let t of this.nodes)
                    t.cleanRaws(e)
        }
        each(e) {
            if (!this.proxyOf.nodes)
                return;
            let t = this.getIterator(), n, r;
            for (; this.indexes[t] < this.proxyOf.nodes.length && (n = this.indexes[t],
            r = e(this.proxyOf.nodes[n], n),
            r !== !1); )
                this.indexes[t] += 1;
            return delete this.indexes[t],
            r
        }
        every(e) {
            return this.nodes.every(e)
        }
        getIterator() {
            this.lastEach ||= 0,
            this.indexes ||= {},
            this.lastEach += 1;
            let e = this.lastEach;
            return this.indexes[e] = 0,
            e
        }
        getProxyProcessor() {
            return {
                get(e, t) {
                    return t === `proxyOf` ? e : e[t] ? t === `each` || typeof t == `string` && t.startsWith(`walk`) ? (...n) => e[t](...n.map(e => typeof e == `function` ? (t, n) => e(t.toProxy(), n) : e)) : t === `every` || t === `some` ? n => e[t]( (e, ...t) => n(e.toProxy(), ...t)) : t === `root` ? () => e.root().toProxy() : t === `nodes` ? e.nodes.map(e => e.toProxy()) : t === `first` || t === `last` ? e[t].toProxy() : e[t] : e[t]
                },
                set(e, t, n) {
                    return e[t] === n ? !0 : (e[t] = n,
                    (t === `name` || t === `params` || t === `selector`) && e.markDirty(),
                    !0)
                }
            }
        }
        index(e) {
            return typeof e == `number` ? e : (e.proxyOf && (e = e.proxyOf),
            this.proxyOf.nodes.indexOf(e))
        }
        insertAfter(e, t) {
            let n = this.index(e)
              , r = this.normalize(t, this.proxyOf.nodes[n]).reverse();
            n = this.index(e);
            for (let e of r)
                this.proxyOf.nodes.splice(n + 1, 0, e);
            let i;
            for (let e in this.indexes)
                i = this.indexes[e],
                n < i && (this.indexes[e] = i + r.length);
            return this.markDirty(),
            this
        }
        insertBefore(e, t) {
            let n = this.index(e)
              , r = n === 0 ? `prepend` : !1
              , i = this.normalize(t, this.proxyOf.nodes[n], r).reverse();
            n = this.index(e);
            for (let e of i)
                this.proxyOf.nodes.splice(n, 0, e);
            let a;
            for (let e in this.indexes)
                a = this.indexes[e],
                n <= a && (this.indexes[e] = a + i.length);
            return this.markDirty(),
            this
        }
        normalize(i, c) {
            if (typeof i == `string`)
                i = l(a(i).nodes);
            else if (i === void 0)
                i = [];
            else if (Array.isArray(i)) {
                i = i.slice(0);
                for (let e of i)
                    e.parent && e.parent.removeChild(e, `ignore`)
            } else if (i.type === `root` && this.type !== `document`) {
                i = i.nodes.slice(0);
                for (let e of i)
                    e.parent && e.parent.removeChild(e, `ignore`)
            } else if (i.type)
                i = [i];
            else if (i.prop) {
                if (i.value === void 0)
                    throw Error(`Value field is missed in node creation`);
                typeof i.value != `string` && (i.value = String(i.value)),
                i = [new n(i)]
            } else if (i.selector)
                i = [new o(i)];
            else if (i.name)
                i = [new s(i)];
            else if (i.text)
                i = [new r(i)];
            else
                throw Error(`Unknown node type in node creation`);
            return i.map(n => (n[t] || d.rebuild(n),
            n = n.proxyOf,
            n.parent && n.parent.removeChild(n),
            n[e] && u(n),
            n.raws.before === void 0 && c && c.raws.before !== void 0 && (n.raws.before = c.raws.before.replace(/\S/g, ``)),
            n.parent = this.proxyOf,
            n))
        }
        prepend(...e) {
            e = e.reverse();
            for (let t of e) {
                let e = this.normalize(t, this.first, `prepend`).reverse();
                for (let t of e)
                    this.proxyOf.nodes.unshift(t);
                for (let t in this.indexes)
                    this.indexes[t] = this.indexes[t] + e.length
            }
            return this.markDirty(),
            this
        }
        push(e) {
            return e.parent = this,
            this.proxyOf.nodes.push(e),
            this
        }
        removeAll() {
            for (let e of this.proxyOf.nodes)
                e.parent = void 0;
            return this.proxyOf.nodes = [],
            this.markDirty(),
            this
        }
        removeChild(e) {
            e = this.index(e),
            this.proxyOf.nodes[e].parent = void 0,
            this.proxyOf.nodes.splice(e, 1);
            let t;
            for (let n in this.indexes)
                t = this.indexes[n],
                t >= e && (this.indexes[n] = t - 1);
            return this.markDirty(),
            this
        }
        replaceValues(e, t, n) {
            return n || (n = t,
            t = {}),
            this.walkDecls(r => {
                t.props && !t.props.includes(r.prop) || t.fast && !r.value.includes(t.fast) || (r.value = r.value.replace(e, n))
            }
            ),
            this.markDirty(),
            this
        }
        some(e) {
            return this.nodes.some(e)
        }
        walk(e) {
            return this.each( (t, n) => {
                let r;
                try {
                    r = e(t, n)
                } catch (e) {
                    throw t.addToError(e)
                }
                return r !== !1 && t.walk && (r = t.walk(e)),
                r
            }
            )
        }
        walkAtRules(e, t) {
            return t ? e instanceof RegExp ? this.walk( (n, r) => {
                if (n.type === `atrule` && e.test(n.name))
                    return t(n, r)
            }
            ) : this.walk( (n, r) => {
                if (n.type === `atrule` && n.name === e)
                    return t(n, r)
            }
            ) : (t = e,
            this.walk( (e, n) => {
                if (e.type === `atrule`)
                    return t(e, n)
            }
            ))
        }
        walkComments(e) {
            return this.walk( (t, n) => {
                if (t.type === `comment`)
                    return e(t, n)
            }
            )
        }
        walkDecls(e, t) {
            return t ? e instanceof RegExp ? this.walk( (n, r) => {
                if (n.type === `decl` && e.test(n.prop))
                    return t(n, r)
            }
            ) : this.walk( (n, r) => {
                if (n.type === `decl` && n.prop === e)
                    return t(n, r)
            }
            ) : (t = e,
            this.walk( (e, n) => {
                if (e.type === `decl`)
                    return t(e, n)
            }
            ))
        }
        walkRules(e, t) {
            return t ? e instanceof RegExp ? this.walk( (n, r) => {
                if (n.type === `rule` && e.test(n.selector))
                    return t(n, r)
            }
            ) : this.walk( (n, r) => {
                if (n.type === `rule` && n.selector === e)
                    return t(n, r)
            }
            ) : (t = e,
            this.walk( (e, n) => {
                if (e.type === `rule`)
                    return t(e, n)
            }
            ))
        }
        get first() {
            if (this.proxyOf.nodes)
                return this.proxyOf.nodes[0]
        }
        get last() {
            if (this.proxyOf.nodes)
                return this.proxyOf.nodes[this.proxyOf.nodes.length - 1]
        }
    }
    return d.registerParse = e => {
        a = e
    }
    ,
    d.registerRule = e => {
        o = e
    }
    ,
    d.registerAtRule = e => {
        s = e
    }
    ,
    d.registerRoot = e => {
        c = e
    }
    ,
    Jc = d,
    d.default = d,
    d.rebuild = e => {
        e.type === `atrule` ? Object.setPrototypeOf(e, s.prototype) : e.type === `rule` ? Object.setPrototypeOf(e, o.prototype) : e.type === `decl` ? Object.setPrototypeOf(e, n.prototype) : e.type === `comment` ? Object.setPrototypeOf(e, r.prototype) : e.type === `root` && Object.setPrototypeOf(e, c.prototype),
        e[t] = !0,
        e.nodes && e.nodes.forEach(e => {
            d.rebuild(e)
        }
        )
    }
    ,
    Jc
}
var Zc, Qc;
function $c() {
    if (Qc)
        return Zc;
    Qc = 1;
    let e = Xc(), t, n;
    class r extends e {
        constructor(e) {
            super({
                type: `document`,
                ...e
            }),
            this.nodes ||= []
        }
        toResult(e={}) {
            return new t(new n,this,e).stringify()
        }
    }
    return r.registerLazyResult = e => {
        t = e
    }
    ,
    r.registerProcessor = e => {
        n = e
    }
    ,
    Zc = r,
    r.default = r,
    Zc
}
var el, tl;
function nl() {
    if (tl)
        return el;
    tl = 1;
    let e = {};
    return el = function(t) {
        e[t] || (e[t] = !0,
        typeof console < `u` && console.warn && console.warn(t))
    }
    ,
    el
}
var rl, il;
function al() {
    if (il)
        return rl;
    il = 1;
    class e {
        constructor(e, t={}) {
            if (this.type = `warning`,
            this.text = e,
            t.node && t.node.source) {
                let e = t.node.rangeBy(t);
                this.line = e.start.line,
                this.column = e.start.column,
                this.endLine = e.end.line,
                this.endColumn = e.end.column
            }
            for (let e in t)
                this[e] = t[e]
        }
        toString() {
            return this.node ? this.node.error(this.text, {
                index: this.index,
                plugin: this.plugin,
                word: this.word
            }).message : this.plugin ? this.plugin + `: ` + this.text : this.text
        }
    }
    return rl = e,
    e.default = e,
    rl
}
var ol, sl;
function cl() {
    if (sl)
        return ol;
    sl = 1;
    let e = al();
    class t {
        constructor(e, t, n) {
            this.processor = e,
            this.messages = [],
            this.root = t,
            this.opts = n,
            this.css = void 0,
            this.map = void 0
        }
        toString() {
            return this.css
        }
        warn(t, n={}) {
            n.plugin || this.lastPlugin && this.lastPlugin.postcssPlugin && (n.plugin = this.lastPlugin.postcssPlugin);
            let r = new e(t,n);
            return this.messages.push(r),
            r
        }
        warnings() {
            return this.messages.filter(e => e.type === `warning`)
        }
        get content() {
            return this.css
        }
    }
    return ol = t,
    t.default = t,
    ol
}
var ll, ul;
function dl() {
    if (ul)
        return ll;
    ul = 1;
    let e = /[\t\n\f\r "#'()/;[\\\]{}]/g
      , t = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g
      , n = /.[\r\n"'(/\\]/
      , r = /[\da-f]/i;
    return ll = function(i, a={}) {
        let o = i.css.valueOf(), s = a.ignoreErrors, c, l, u, d, f, p, m, h, g, _, v = o.length, y = 0, b = [], x = [];
        function S() {
            return y
        }
        function C(e) {
            throw i.error(`Unclosed ` + e, y)
        }
        function ee() {
            return x.length === 0 && y >= v
        }
        function w(i) {
            if (x.length)
                return x.pop();
            if (y >= v)
                return;
            let a = i ? i.ignoreUnclosed : !1;
            switch (c = o.charCodeAt(y),
            c) {
            case 10:
            case 32:
            case 9:
            case 13:
            case 12:
                l = y;
                do
                    l += 1,
                    c = o.charCodeAt(l);
                while (c === 32 || c === 10 || c === 9 || c === 13 || c === 12);
                _ = [`space`, o.slice(y, l)],
                y = l - 1;
                break;
            case 91:
            case 93:
            case 123:
            case 125:
            case 58:
            case 59:
            case 41:
                {
                    let e = String.fromCharCode(c);
                    _ = [e, e, y];
                    break
                }
            case 40:
                if (h = b.length ? b.pop()[1] : ``,
                g = o.charCodeAt(y + 1),
                h === `url` && g !== 39 && g !== 34 && g !== 32 && g !== 10 && g !== 9 && g !== 12 && g !== 13) {
                    l = y;
                    do {
                        if (p = !1,
                        l = o.indexOf(`)`, l + 1),
                        l === -1)
                            if (s || a) {
                                l = y;
                                break
                            } else
                                C(`bracket`);
                        for (m = l; o.charCodeAt(m - 1) === 92; )
                            --m,
                            p = !p
                    } while (p);
                    _ = [`brackets`, o.slice(y, l + 1), y, l],
                    y = l
                } else
                    l = o.indexOf(`)`, y + 1),
                    d = o.slice(y, l + 1),
                    l === -1 || n.test(d) ? _ = [`(`, `(`, y] : (_ = [`brackets`, d, y, l],
                    y = l);
                break;
            case 39:
            case 34:
                u = c === 39 ? `'` : `"`,
                l = y;
                do {
                    if (p = !1,
                    l = o.indexOf(u, l + 1),
                    l === -1)
                        if (s || a) {
                            l = y + 1;
                            break
                        } else
                            C(`string`);
                    for (m = l; o.charCodeAt(m - 1) === 92; )
                        --m,
                        p = !p
                } while (p);
                _ = [`string`, o.slice(y, l + 1), y, l],
                y = l;
                break;
            case 64:
                e.lastIndex = y + 1,
                e.test(o),
                l = e.lastIndex === 0 ? o.length - 1 : e.lastIndex - 2,
                _ = [`at-word`, o.slice(y, l + 1), y, l],
                y = l;
                break;
            case 92:
                for (l = y,
                f = !0; o.charCodeAt(l + 1) === 92; )
                    l += 1,
                    f = !f;
                if (c = o.charCodeAt(l + 1),
                f && c !== 47 && c !== 32 && c !== 10 && c !== 9 && c !== 13 && c !== 12 && (l += 1,
                r.test(o.charAt(l)))) {
                    for (; r.test(o.charAt(l + 1)); )
                        l += 1;
                    o.charCodeAt(l + 1) === 32 && (l += 1)
                }
                _ = [`word`, o.slice(y, l + 1), y, l],
                y = l;
                break;
            default:
                c === 47 && o.charCodeAt(y + 1) === 42 ? (l = o.indexOf(`*/`, y + 2) + 1,
                l === 0 && (s || a ? l = o.length : C(`comment`)),
                _ = [`comment`, o.slice(y, l + 1), y, l],
                y = l) : (t.lastIndex = y + 1,
                t.test(o),
                l = t.lastIndex === 0 ? o.length - 1 : t.lastIndex - 2,
                _ = [`word`, o.slice(y, l + 1), y, l],
                b.push(_),
                y = l);
                break
            }
            return y++,
            _
        }
        function te(e) {
            x.push(e)
        }
        return {
            back: te,
            endOfFile: ee,
            nextToken: w,
            position: S
        }
    }
    ,
    ll
}
var fl, pl;
function ml() {
    if (pl)
        return fl;
    pl = 1;
    let e = Xc();
    class t extends e {
        constructor(e) {
            super(e),
            this.type = `atrule`
        }
        append(...e) {
            return this.proxyOf.nodes || (this.nodes = []),
            super.append(...e)
        }
        prepend(...e) {
            return this.proxyOf.nodes || (this.nodes = []),
            super.prepend(...e)
        }
    }
    return fl = t,
    t.default = t,
    e.registerAtRule(t),
    fl
}
var hl, gl;
function _l() {
    if (gl)
        return hl;
    gl = 1;
    let e = Xc(), t, n;
    class r extends e {
        constructor(e) {
            super(e),
            this.type = `root`,
            this.nodes ||= []
        }
        normalize(e, t, n) {
            let r = super.normalize(e);
            if (t) {
                if (n === `prepend`)
                    this.nodes.length > 1 ? t.raws.before = this.nodes[1].raws.before : delete t.raws.before;
                else if (this.first !== t)
                    for (let e of r)
                        e.raws.before = t.raws.before
            }
            return r
        }
        removeChild(e, t) {
            let n = this.index(e);
            return !t && n === 0 && this.nodes.length > 1 && (this.nodes[1].raws.before = this.nodes[n].raws.before),
            super.removeChild(e)
        }
        toResult(e={}) {
            return new t(new n,this,e).stringify()
        }
    }
    return r.registerLazyResult = e => {
        t = e
    }
    ,
    r.registerProcessor = e => {
        n = e
    }
    ,
    hl = r,
    r.default = r,
    e.registerRoot(r),
    hl
}
var vl, yl;
function bl() {
    if (yl)
        return vl;
    yl = 1;
    let e = {
        comma(t) {
            return e.split(t, [`,`], !0)
        },
        space(t) {
            return e.split(t, [` `, `
`, `	`])
        },
        split(e, t, n) {
            let r = []
              , i = ``
              , a = !1
              , o = 0
              , s = !1
              , c = ``
              , l = !1;
            for (let n of e)
                l ? l = !1 : n === `\\` ? l = !0 : s ? n === c && (s = !1) : n === `"` || n === `'` ? (s = !0,
                c = n) : n === `(` ? o += 1 : n === `)` ? o > 0 && --o : o === 0 && t.includes(n) && (a = !0),
                a ? (i !== `` && r.push(i.trim()),
                i = ``,
                a = !1) : i += n;
            return (n || i !== ``) && r.push(i.trim()),
            r
        }
    };
    return vl = e,
    e.default = e,
    vl
}
var xl, Sl;
function Cl() {
    if (Sl)
        return xl;
    Sl = 1;
    let e = Xc()
      , t = bl();
    class n extends e {
        constructor(e) {
            super(e),
            this.type = `rule`,
            this.nodes ||= []
        }
        get selectors() {
            return t.comma(this.selector)
        }
        set selectors(e) {
            let t = this.selector ? this.selector.match(/,\s*/) : null
              , n = t ? t[0] : `,` + this.raw(`between`, `beforeOpen`);
            this.selector = e.join(n)
        }
    }
    return xl = n,
    n.default = n,
    e.registerRule(n),
    xl
}
var wl, Tl;
function El() {
    if (Tl)
        return wl;
    Tl = 1;
    let e = Mc()
      , t = dl()
      , n = qc()
      , r = ml()
      , i = _l()
      , a = Cl()
      , o = {
        empty: !0,
        space: !0
    };
    function s(e) {
        for (let t = e.length - 1; t >= 0; t--) {
            let n = e[t]
              , r = n[3] || n[2];
            if (r)
                return r
        }
    }
    class c {
        constructor(e) {
            this.input = e,
            this.root = new i,
            this.current = this.root,
            this.spaces = ``,
            this.semicolon = !1,
            this.createTokenizer(),
            this.root.source = {
                input: e,
                start: {
                    column: 1,
                    line: 1,
                    offset: 0
                }
            }
        }
        atrule(e) {
            let t = new r;
            t.name = e[1].slice(1),
            t.name === `` && this.unnamedAtrule(t, e),
            this.init(t, e[2]);
            let n, i, a, o = !1, s = !1, c = [], l = [];
            for (; !this.tokenizer.endOfFile(); ) {
                if (e = this.tokenizer.nextToken(),
                n = e[0],
                n === `(` || n === `[` ? l.push(n === `(` ? `)` : `]`) : n === `{` && l.length > 0 ? l.push(`}`) : n === l[l.length - 1] && l.pop(),
                l.length === 0)
                    if (n === `;`) {
                        t.source.end = this.getPosition(e[2]),
                        t.source.end.offset++,
                        this.semicolon = !0;
                        break
                    } else if (n === `{`) {
                        s = !0;
                        break
                    } else if (n === `}`) {
                        if (c.length > 0) {
                            for (a = c.length - 1,
                            i = c[a]; i && i[0] === `space`; )
                                i = c[--a];
                            i && (t.source.end = this.getPosition(i[3] || i[2]),
                            t.source.end.offset++)
                        }
                        this.end(e);
                        break
                    } else
                        c.push(e);
                else
                    c.push(e);
                if (this.tokenizer.endOfFile()) {
                    o = !0;
                    break
                }
            }
            t.raws.between = this.spacesAndCommentsFromEnd(c),
            c.length ? (t.raws.afterName = this.spacesAndCommentsFromStart(c),
            this.raw(t, `params`, c),
            o && (e = c[c.length - 1],
            t.source.end = this.getPosition(e[3] || e[2]),
            t.source.end.offset++,
            this.spaces = t.raws.between,
            t.raws.between = ``)) : (t.raws.afterName = ``,
            t.params = ``),
            s && (t.nodes = [],
            this.current = t)
        }
        checkMissedSemicolon(e) {
            let t = this.colon(e);
            if (t === !1)
                return;
            let n = 0, r;
            for (let i = t - 1; i >= 0 && (r = e[i],
            !(r[0] !== `space` && (n += 1,
            n === 2))); i--)
                ;
            throw this.input.error(`Missed semicolon`, r[0] === `word` ? r[3] + 1 : r[2])
        }
        colon(e) {
            let t = 0, n, r, i;
            for (let[a,o] of e.entries()) {
                if (n = o,
                r = n[0],
                r === `(` && (t += 1),
                r === `)` && --t,
                t === 0 && r === `:`)
                    if (!i)
                        this.doubleColon(n);
                    else if (i[0] === `word` && i[1] === `progid`)
                        continue;
                    else
                        return a;
                i = n
            }
            return !1
        }
        comment(e) {
            let t = new n;
            this.init(t, e[2]),
            t.source.end = this.getPosition(e[3] || e[2]),
            t.source.end.offset++;
            let r = e[1].slice(2, -2);
            if (/^\s*$/.test(r))
                t.text = ``,
                t.raws.left = r,
                t.raws.right = ``;
            else {
                let e = r.match(/^(\s*)([^]*\S)(\s*)$/);
                t.text = e[2],
                t.raws.left = e[1],
                t.raws.right = e[3]
            }
        }
        createTokenizer() {
            this.tokenizer = t(this.input)
        }
        decl(t, n) {
            let r = new e;
            this.init(r, t[0][2]);
            let i = t[t.length - 1];
            for (i[0] === `;` && (this.semicolon = !0,
            t.pop()),
            r.source.end = this.getPosition(i[3] || i[2] || s(t)),
            r.source.end.offset++; t[0][0] !== `word`; )
                t.length === 1 && this.unknownWord(t),
                r.raws.before += t.shift()[1];
            for (r.source.start = this.getPosition(t[0][2]),
            r.prop = ``; t.length; ) {
                let e = t[0][0];
                if (e === `:` || e === `space` || e === `comment`)
                    break;
                r.prop += t.shift()[1]
            }
            r.raws.between = ``;
            let a;
            for (; t.length; )
                if (a = t.shift(),
                a[0] === `:`) {
                    r.raws.between += a[1];
                    break
                } else
                    a[0] === `word` && /\w/.test(a[1]) && this.unknownWord([a]),
                    r.raws.between += a[1];
            (r.prop[0] === `_` || r.prop[0] === `*`) && (r.raws.before += r.prop[0],
            r.prop = r.prop.slice(1));
            let o = [], c;
            for (; t.length && (c = t[0][0],
            !(c !== `space` && c !== `comment`)); )
                o.push(t.shift());
            this.precheckMissedSemicolon(t);
            for (let e = t.length - 1; e >= 0; e--) {
                if (a = t[e],
                a[1].toLowerCase() === `!important`) {
                    r.important = !0;
                    let n = this.stringFrom(t, e);
                    n = this.spacesFromEnd(t) + n,
                    n !== ` !important` && (r.raws.important = n);
                    break
                } else if (a[1].toLowerCase() === `important`) {
                    let n = t.slice(0)
                      , i = ``;
                    for (let t = e; t > 0; t--) {
                        let e = n[t][0];
                        if (i.trim().indexOf(`!`) === 0 && e !== `space`)
                            break;
                        i = n.pop()[1] + i
                    }
                    i.trim().indexOf(`!`) === 0 && (r.important = !0,
                    r.raws.important = i,
                    t = n)
                }
                if (a[0] !== `space` && a[0] !== `comment`)
                    break
            }
            t.some(e => e[0] !== `space` && e[0] !== `comment`) && (r.raws.between += o.map(e => e[1]).join(``),
            o = []),
            this.raw(r, `value`, o.concat(t), n),
            r.value.includes(`:`) && !n && this.checkMissedSemicolon(t)
        }
        doubleColon(e) {
            throw this.input.error(`Double colon`, {
                offset: e[2]
            }, {
                offset: e[2] + e[1].length
            })
        }
        emptyRule(e) {
            let t = new a;
            this.init(t, e[2]),
            t.selector = ``,
            t.raws.between = ``,
            this.current = t
        }
        end(e) {
            this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon),
            this.semicolon = !1,
            this.current.raws.after = (this.current.raws.after || ``) + this.spaces,
            this.spaces = ``,
            this.current.parent ? (this.current.source.end = this.getPosition(e[2]),
            this.current.source.end.offset++,
            this.current = this.current.parent) : this.unexpectedClose(e)
        }
        endFile() {
            this.current.parent && this.unclosedBlock(),
            this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon),
            this.current.raws.after = (this.current.raws.after || ``) + this.spaces,
            this.root.source.end = this.getPosition(this.tokenizer.position())
        }
        freeSemicolon(e) {
            if (this.spaces += e[1],
            this.current.nodes) {
                let e = this.current.nodes[this.current.nodes.length - 1];
                e && e.type === `rule` && !e.raws.ownSemicolon && (e.raws.ownSemicolon = this.spaces,
                this.spaces = ``)
            }
        }
        getPosition(e) {
            let t = this.input.fromOffset(e);
            return {
                column: t.col,
                line: t.line,
                offset: e
            }
        }
        init(e, t) {
            this.current.push(e),
            e.source = {
                input: this.input,
                start: this.getPosition(t)
            },
            e.raws.before = this.spaces,
            this.spaces = ``,
            e.type !== `comment` && (this.semicolon = !1)
        }
        other(e) {
            let t = !1
              , n = null
              , r = !1
              , i = null
              , a = []
              , o = e[1].startsWith(`--`)
              , s = []
              , c = e;
            for (; c; ) {
                if (n = c[0],
                s.push(c),
                n === `(` || n === `[`)
                    i ||= c,
                    a.push(n === `(` ? `)` : `]`);
                else if (o && r && n === `{`)
                    i ||= c,
                    a.push(`}`);
                else if (a.length === 0)
                    if (n === `;`)
                        if (r) {
                            this.decl(s, o);
                            return
                        } else
                            break;
                    else if (n === `{`) {
                        this.rule(s);
                        return
                    } else if (n === `}`) {
                        this.tokenizer.back(s.pop()),
                        t = !0;
                        break
                    } else
                        n === `:` && (r = !0);
                else
                    n === a[a.length - 1] && (a.pop(),
                    a.length === 0 && (i = null));
                c = this.tokenizer.nextToken()
            }
            if (this.tokenizer.endOfFile() && (t = !0),
            a.length > 0 && this.unclosedBracket(i),
            t && r) {
                if (!o)
                    for (; s.length && (c = s[s.length - 1][0],
                    !(c !== `space` && c !== `comment`)); )
                        this.tokenizer.back(s.pop());
                this.decl(s, o)
            } else
                this.unknownWord(s)
        }
        parse() {
            let e;
            for (; !this.tokenizer.endOfFile(); )
                switch (e = this.tokenizer.nextToken(),
                e[0]) {
                case `space`:
                    this.spaces += e[1];
                    break;
                case `;`:
                    this.freeSemicolon(e);
                    break;
                case `}`:
                    this.end(e);
                    break;
                case `comment`:
                    this.comment(e);
                    break;
                case `at-word`:
                    this.atrule(e);
                    break;
                case `{`:
                    this.emptyRule(e);
                    break;
                default:
                    this.other(e);
                    break
                }
            this.endFile()
        }
        precheckMissedSemicolon() {}
        raw(e, t, n, r) {
            let i, a, s = n.length, c = ``, l = !0, u, d;
            for (let e = 0; e < s; e += 1)
                i = n[e],
                a = i[0],
                a === `space` && e === s - 1 && !r ? l = !1 : a === `comment` ? (d = n[e - 1] ? n[e - 1][0] : `empty`,
                u = n[e + 1] ? n[e + 1][0] : `empty`,
                !o[d] && !o[u] ? c.slice(-1) === `,` ? l = !1 : c += i[1] : l = !1) : c += i[1];
            if (!l) {
                let r = n.reduce( (e, t) => e + t[1], ``);
                e.raws[t] = {
                    raw: r,
                    value: c
                }
            }
            e[t] = c
        }
        rule(e) {
            e.pop();
            let t = new a;
            this.init(t, e[0][2]),
            t.raws.between = this.spacesAndCommentsFromEnd(e),
            this.raw(t, `selector`, e),
            this.current = t
        }
        spacesAndCommentsFromEnd(e) {
            let t, n = ``;
            for (; e.length && (t = e[e.length - 1][0],
            !(t !== `space` && t !== `comment`)); )
                n = e.pop()[1] + n;
            return n
        }
        spacesAndCommentsFromStart(e) {
            let t, n = ``;
            for (; e.length && (t = e[0][0],
            !(t !== `space` && t !== `comment`)); )
                n += e.shift()[1];
            return n
        }
        spacesFromEnd(e) {
            let t, n = ``;
            for (; e.length && (t = e[e.length - 1][0],
            t === `space`); )
                n = e.pop()[1] + n;
            return n
        }
        stringFrom(e, t) {
            let n = ``;
            for (let r = t; r < e.length; r++)
                n += e[r][1];
            return e.splice(t, e.length - t),
            n
        }
        unclosedBlock() {
            let e = this.current.source.start;
            throw this.input.error(`Unclosed block`, e.line, e.column)
        }
        unclosedBracket(e) {
            throw this.input.error(`Unclosed bracket`, {
                offset: e[2]
            }, {
                offset: e[2] + 1
            })
        }
        unexpectedClose(e) {
            throw this.input.error(`Unexpected }`, {
                offset: e[2]
            }, {
                offset: e[2] + 1
            })
        }
        unknownWord(e) {
            throw this.input.error(`Unknown word`, {
                offset: e[0][2]
            }, {
                offset: e[0][2] + e[0][1].length
            })
        }
        unnamedAtrule(e, t) {
            throw this.input.error(`At-rule without name`, {
                offset: t[2]
            }, {
                offset: t[2] + t[1].length
            })
        }
    }
    return wl = c,
    wl
}
var Dl, Ol;
function kl() {
    if (Ol)
        return Dl;
    Ol = 1;
    let e = Xc()
      , t = El()
      , n = Vc();
    function r(e, r) {
        let i = new t(new n(e,r));
        try {
            i.parse()
        } catch (e) {
            throw e
        }
        return i.root
    }
    return Dl = r,
    r.default = r,
    e.registerParse(r),
    Dl
}
var Al, jl;
function Ml() {
    if (jl)
        return Al;
    jl = 1;
    let {isClean: e, my: t} = bc()
      , n = Wc()
      , r = Ec()
      , i = Xc()
      , a = $c();
    nl();
    let o = cl()
      , s = kl()
      , c = _l()
      , l = {
        atrule: `AtRule`,
        comment: `Comment`,
        decl: `Declaration`,
        document: `Document`,
        root: `Root`,
        rule: `Rule`
    }
      , u = {
        AtRule: !0,
        AtRuleExit: !0,
        Comment: !0,
        CommentExit: !0,
        Declaration: !0,
        DeclarationExit: !0,
        Document: !0,
        DocumentExit: !0,
        Once: !0,
        OnceExit: !0,
        postcssPlugin: !0,
        prepare: !0,
        Root: !0,
        RootExit: !0,
        Rule: !0,
        RuleExit: !0
    }
      , d = {
        Once: !0,
        postcssPlugin: !0,
        prepare: !0
    };
    function f(e) {
        return typeof e == `object` && typeof e.then == `function`
    }
    function p(e) {
        let t = !1
          , n = l[e.type];
        return e.type === `decl` ? t = e.prop.toLowerCase() : e.type === `atrule` && (t = e.name.toLowerCase()),
        t && e.append ? [n, n + `-` + t, 0, n + `Exit`, n + `Exit-` + t] : t ? [n, n + `-` + t, n + `Exit`, n + `Exit-` + t] : e.append ? [n, 0, n + `Exit`] : [n, n + `Exit`]
    }
    function m(e) {
        let t;
        return t = e.type === `document` ? [`Document`, 0, `DocumentExit`] : e.type === `root` ? [`Root`, 0, `RootExit`] : p(e),
        {
            eventIndex: 0,
            events: t,
            iterator: 0,
            node: e,
            visitorIndex: 0,
            visitors: []
        }
    }
    function h(t) {
        return t[e] = !1,
        t.nodes && t.nodes.forEach(e => h(e)),
        t
    }
    let g = {};
    class _ {
        constructor(e, n, r) {
            this.stringified = !1,
            this.processed = !1;
            let a;
            if (typeof n == `object` && n && (n.type === `root` || n.type === `document`))
                a = h(n);
            else if (n instanceof _ || n instanceof o)
                a = h(n.root),
                n.map && (r.map === void 0 && (r.map = {}),
                r.map.inline || (r.map.inline = !1),
                r.map.prev = n.map);
            else {
                let e = s;
                r.syntax && (e = r.syntax.parse),
                r.parser && (e = r.parser),
                e.parse && (e = e.parse);
                try {
                    a = e(n, r)
                } catch (e) {
                    this.processed = !0,
                    this.error = e
                }
                a && !a[t] && i.rebuild(a)
            }
            this.result = new o(e,a,r),
            this.helpers = {
                ...g,
                postcss: g,
                result: this.result
            },
            this.plugins = this.processor.plugins.map(e => typeof e == `object` && e.prepare ? {
                ...e,
                ...e.prepare(this.result)
            } : e)
        }
        async() {
            return this.error ? Promise.reject(this.error) : this.processed ? Promise.resolve(this.result) : (this.processing ||= this.runAsync(),
            this.processing)
        }
        catch(e) {
            return this.async().catch(e)
        }
        finally(e) {
            return this.async().then(e, e)
        }
        getAsyncError() {
            throw Error(`Use process(css).then(cb) to work with async plugins`)
        }
        handleError(e, t) {
            let n = this.result.lastPlugin;
            try {
                t && t.addToError(e),
                this.error = e,
                e.name === `CssSyntaxError` && !e.plugin ? (e.plugin = n.postcssPlugin,
                e.setMessage()) : n.postcssVersion
            } catch (e) {
                console && console.error && console.error(e)
            }
            return e
        }
        prepareVisitors() {
            this.listeners = {};
            let e = (e, t, n) => {
                this.listeners[t] || (this.listeners[t] = []),
                this.listeners[t].push([e, n])
            }
            ;
            for (let t of this.plugins)
                if (typeof t == `object`)
                    for (let n in t) {
                        if (!u[n] && /^[A-Z]/.test(n))
                            throw Error(`Unknown event ${n} in ${t.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`);
                        if (!d[n])
                            if (typeof t[n] == `object`)
                                for (let r in t[n])
                                    r === `*` ? e(t, n, t[n][r]) : e(t, n + `-` + r.toLowerCase(), t[n][r]);
                            else
                                typeof t[n] == `function` && e(t, n, t[n])
                    }
            this.hasListener = Object.keys(this.listeners).length > 0
        }
        async runAsync() {
            this.plugin = 0;
            for (let e = 0; e < this.plugins.length; e++) {
                let t = this.plugins[e]
                  , n = this.runOnRoot(t);
                if (f(n))
                    try {
                        await n
                    } catch (e) {
                        throw this.handleError(e)
                    }
            }
            if (this.prepareVisitors(),
            this.hasListener) {
                let t = this.result.root;
                for (; !t[e]; ) {
                    t[e] = !0;
                    let n = [m(t)];
                    for (; n.length > 0; ) {
                        let e = this.visitTick(n);
                        if (f(e))
                            try {
                                await e
                            } catch (e) {
                                let t = n[n.length - 1].node;
                                throw this.handleError(e, t)
                            }
                    }
                }
                if (this.listeners.OnceExit)
                    for (let[e,n] of this.listeners.OnceExit) {
                        this.result.lastPlugin = e;
                        try {
                            if (t.type === `document`) {
                                let e = t.nodes.map(e => n(e, this.helpers));
                                await Promise.all(e)
                            } else
                                await n(t, this.helpers)
                        } catch (e) {
                            throw this.handleError(e)
                        }
                    }
            }
            return this.processed = !0,
            this.stringify()
        }
        runOnRoot(e) {
            this.result.lastPlugin = e;
            try {
                if (typeof e == `object` && e.Once) {
                    if (this.result.root.type === `document`) {
                        let t = this.result.root.nodes.map(t => e.Once(t, this.helpers));
                        return f(t[0]) ? Promise.all(t) : t
                    }
                    return e.Once(this.result.root, this.helpers)
                } else if (typeof e == `function`)
                    return e(this.result.root, this.result)
            } catch (e) {
                throw this.handleError(e)
            }
        }
        stringify() {
            if (this.error)
                throw this.error;
            if (this.stringified)
                return this.result;
            this.stringified = !0,
            this.sync();
            let e = this.result.opts
              , t = r;
            e.syntax && (t = e.syntax.stringify),
            e.stringifier && (t = e.stringifier),
            t.stringify && (t = t.stringify);
            let i = new n(t,this.result.root,this.result.opts).generate();
            return this.result.css = i[0],
            this.result.map = i[1],
            this.result
        }
        sync() {
            if (this.error)
                throw this.error;
            if (this.processed)
                return this.result;
            if (this.processed = !0,
            this.processing)
                throw this.getAsyncError();
            for (let e of this.plugins)
                if (f(this.runOnRoot(e)))
                    throw this.getAsyncError();
            if (this.prepareVisitors(),
            this.hasListener) {
                let t = this.result.root;
                for (; !t[e]; )
                    t[e] = !0,
                    this.walkSync(t);
                if (this.listeners.OnceExit)
                    if (t.type === `document`)
                        for (let e of t.nodes)
                            this.visitSync(this.listeners.OnceExit, e);
                    else
                        this.visitSync(this.listeners.OnceExit, t)
            }
            return this.result
        }
        then(e, t) {
            return this.async().then(e, t)
        }
        toString() {
            return this.css
        }
        visitSync(e, t) {
            for (let[n,r] of e) {
                this.result.lastPlugin = n;
                let e;
                try {
                    e = r(t, this.helpers)
                } catch (e) {
                    throw this.handleError(e, t.proxyOf)
                }
                if (t.type !== `root` && t.type !== `document` && !t.parent)
                    return !0;
                if (f(e))
                    throw this.getAsyncError()
            }
        }
        visitTick(t) {
            let n = t[t.length - 1]
              , {node: r, visitors: i} = n;
            if (r.type !== `root` && r.type !== `document` && !r.parent) {
                t.pop();
                return
            }
            if (i.length > 0 && n.visitorIndex < i.length) {
                let[e,t] = i[n.visitorIndex];
                n.visitorIndex += 1,
                n.visitorIndex === i.length && (n.visitors = [],
                n.visitorIndex = 0),
                this.result.lastPlugin = e;
                try {
                    return t(r.toProxy(), this.helpers)
                } catch (e) {
                    throw this.handleError(e, r)
                }
            }
            if (n.iterator !== 0) {
                let i = n.iterator, a;
                for (; a = r.nodes[r.indexes[i]]; )
                    if (r.indexes[i] += 1,
                    !a[e]) {
                        a[e] = !0,
                        t.push(m(a));
                        return
                    }
                n.iterator = 0,
                delete r.indexes[i]
            }
            let a = n.events;
            for (; n.eventIndex < a.length; ) {
                let t = a[n.eventIndex];
                if (n.eventIndex += 1,
                t === 0) {
                    r.nodes && r.nodes.length && (r[e] = !0,
                    n.iterator = r.getIterator());
                    return
                } else if (this.listeners[t]) {
                    n.visitors = this.listeners[t];
                    return
                }
            }
            t.pop()
        }
        walkSync(t) {
            t[e] = !0;
            let n = p(t);
            for (let r of n)
                if (r === 0)
                    t.nodes && t.each(t => {
                        t[e] || this.walkSync(t)
                    }
                    );
                else {
                    let e = this.listeners[r];
                    if (e && this.visitSync(e, t.toProxy()))
                        return
                }
        }
        warnings() {
            return this.sync().warnings()
        }
        get content() {
            return this.stringify().content
        }
        get css() {
            return this.stringify().css
        }
        get map() {
            return this.stringify().map
        }
        get messages() {
            return this.sync().messages
        }
        get opts() {
            return this.result.opts
        }
        get processor() {
            return this.result.processor
        }
        get root() {
            return this.sync().root
        }
        get[Symbol.toStringTag]() {
            return `LazyResult`
        }
    }
    return _.registerPostcss = e => {
        g = e
    }
    ,
    Al = _,
    _.default = _,
    c.registerLazyResult(_),
    a.registerLazyResult(_),
    Al
}
var Nl, Pl;
function Fl() {
    if (Pl)
        return Nl;
    Pl = 1;
    let e = Wc()
      , t = Ec();
    nl();
    let n = kl()
      , r = cl();
    class i {
        constructor(n, i, a) {
            i = i.toString(),
            this.stringified = !1,
            this._processor = n,
            this._css = i,
            this._opts = a,
            this._map = void 0;
            let o = t;
            this.result = new r(this._processor,void 0,this._opts),
            this.result.css = i;
            let s = this;
            Object.defineProperty(this.result, "root", {
                get() {
                    return s.root
                }
            });
            let c = new e(o,void 0,this._opts,i);
            if (c.isMap()) {
                let[e,t] = c.generate();
                e && (this.result.css = e),
                t && (this.result.map = t)
            } else
                c.clearAnnotation(),
                this.result.css = c.css
        }
        async() {
            return this.error ? Promise.reject(this.error) : Promise.resolve(this.result)
        }
        catch(e) {
            return this.async().catch(e)
        }
        finally(e) {
            return this.async().then(e, e)
        }
        sync() {
            if (this.error)
                throw this.error;
            return this.result
        }
        then(e, t) {
            return this.async().then(e, t)
        }
        toString() {
            return this._css
        }
        warnings() {
            return []
        }
        get content() {
            return this.result.css
        }
        get css() {
            return this.result.css
        }
        get map() {
            return this.result.map
        }
        get messages() {
            return []
        }
        get opts() {
            return this.result.opts
        }
        get processor() {
            return this.result.processor
        }
        get root() {
            if (this._root)
                return this._root;
            let e, t = n;
            try {
                e = t(this._css, this._opts)
            } catch (e) {
                this.error = e
            }
            if (this.error)
                throw this.error;
            return this._root = e,
            e
        }
        get[Symbol.toStringTag]() {
            return `NoWorkResult`
        }
    }
    return Nl = i,
    i.default = i,
    Nl
}
var Il, Ll;
function Rl() {
    if (Ll)
        return Il;
    Ll = 1;
    let e = Fl()
      , t = Ml()
      , n = $c()
      , r = _l();
    class i {
        constructor(e=[]) {
            this.version = `8.4.38`,
            this.plugins = this.normalize(e)
        }
        normalize(e) {
            let t = [];
            for (let n of e)
                if (n.postcss === !0 ? n = n() : n.postcss && (n = n.postcss),
                typeof n == `object` && Array.isArray(n.plugins))
                    t = t.concat(n.plugins);
                else if (typeof n == `object` && n.postcssPlugin)
                    t.push(n);
                else if (typeof n == `function`)
                    t.push(n);
                else if (!(typeof n == `object` && (n.parse || n.stringify)))
                    throw Error(n + ` is not a PostCSS plugin`);
            return t
        }
        process(n, r={}) {
            return !this.plugins.length && !r.parser && !r.stringifier && !r.syntax ? new e(this,n,r) : new t(this,n,r)
        }
        use(e) {
            return this.plugins = this.plugins.concat(this.normalize([e])),
            this
        }
    }
    return Il = i,
    i.default = i,
    r.registerProcessor(i),
    n.registerProcessor(i),
    Il
}
var zl, Bl;
function Vl() {
    if (Bl)
        return zl;
    Bl = 1;
    let e = Mc()
      , t = Rc()
      , n = qc()
      , r = ml()
      , i = Vc()
      , a = _l()
      , o = Cl();
    function s(c, l) {
        if (Array.isArray(c))
            return c.map(e => s(e));
        let {inputs: u, ...d} = c;
        if (u) {
            l = [];
            for (let e of u) {
                let n = {
                    ...e,
                    __proto__: i.prototype
                };
                n.map &&= {
                    ...n.map,
                    __proto__: t.prototype
                },
                l.push(n)
            }
        }
        if (d.nodes &&= c.nodes.map(e => s(e, l)),
        d.source) {
            let {inputId: e, ...t} = d.source;
            d.source = t,
            e != null && (d.source.input = l[e])
        }
        if (d.type === `root`)
            return new a(d);
        if (d.type === `decl`)
            return new e(d);
        if (d.type === `rule`)
            return new o(d);
        if (d.type === `comment`)
            return new n(d);
        if (d.type === `atrule`)
            return new r(d);
        throw Error(`Unknown node type: ` + c.type)
    }
    return zl = s,
    s.default = s,
    zl
}
var Hl, Ul;
function Wl() {
    if (Ul)
        return Hl;
    Ul = 1;
    let e = _c()
      , t = Mc()
      , n = Ml()
      , r = Xc()
      , i = Rl()
      , a = Ec()
      , o = Vl()
      , s = $c()
      , c = al()
      , l = qc()
      , u = ml()
      , d = cl()
      , f = Vc()
      , p = kl()
      , m = bl()
      , h = Cl()
      , g = _l()
      , _ = kc();
    function v(...e) {
        return e.length === 1 && Array.isArray(e[0]) && (e = e[0]),
        new i(e)
    }
    return v.plugin = function(e, t) {
        let n = !1;
        function r(...r) {
            console && console.warn && !n && (n = !0,
            console.warn(e + `: postcss.plugin was deprecated. Migration guide:
https://evilmartians.com/chronicles/postcss-8-plugin-migration`),
            {}.LANG && {}.LANG.startsWith(`cn`) && console.warn(e + `: 里面 postcss.plugin 被弃用. 迁移指南:
https://www.w3ctech.com/topic/2226`));
            let a = t(...r);
            return a.postcssPlugin = e,
            a.postcssVersion = new i().version,
            a
        }
        let a;
        return Object.defineProperty(r, "postcss", {
            get() {
                return a ||= r(),
                a
            }
        }),
        r.process = function(e, t, n) {
            return v([r(n)]).process(e, t)
        }
        ,
        r
    }
    ,
    v.stringify = a,
    v.parse = p,
    v.fromJSON = o,
    v.list = m,
    v.comment = e => new l(e),
    v.atRule = e => new u(e),
    v.decl = e => new t(e),
    v.rule = e => new h(e),
    v.root = e => new g(e),
    v.document = e => new s(e),
    v.CssSyntaxError = e,
    v.Declaration = t,
    v.Container = r,
    v.Processor = i,
    v.Document = s,
    v.Comment = l,
    v.Warning = c,
    v.AtRule = u,
    v.Result = d,
    v.Input = f,
    v.Rule = h,
    v.Root = g,
    v.Node = _,
    n.registerPostcss(v),
    Hl = v,
    v.default = v,
    Hl
}
var U = lc(Wl());
U.stringify,
U.fromJSON,
U.plugin,
U.parse,
U.list,
U.document,
U.comment,
U.atRule,
U.rule,
U.decl,
U.root,
U.CssSyntaxError,
U.Declaration,
U.Container,
U.Processor,
U.Document,
U.Comment,
U.Warning,
U.AtRule,
U.Result,
U.Input,
U.Rule,
U.Root,
U.Node;
var Gl = Object.defineProperty
  , Kl = (e, t, n) => t in e ? Gl(e, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: n
}) : e[t] = n
  , ql = (e, t, n) => Kl(e, typeof t == `symbol` ? t : t + ``, n);
function Jl(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, `default`) ? e.default : e
}
function Yl(e) {
    if (e.__esModule)
        return e;
    var t = e.default;
    if (typeof t == `function`) {
        var n = function e() {
            return this instanceof e ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments)
        };
        n.prototype = t.prototype
    } else
        n = {};
    return Object.defineProperty(n, "__esModule", {
        value: !0
    }),
    Object.keys(e).forEach(function(t) {
        var r = Object.getOwnPropertyDescriptor(e, t);
        Object.defineProperty(n, t, r.get ? r : {
            enumerable: !0,
            get: function() {
                return e[t]
            }
        })
    }),
    n
}
var Xl = {
    exports: {}
}, Zl;
function Ql() {
    if (Zl)
        return Xl.exports;
    Zl = 1;
    var e = String
      , t = function() {
        return {
            isColorSupported: !1,
            reset: e,
            bold: e,
            dim: e,
            italic: e,
            underline: e,
            inverse: e,
            hidden: e,
            strikethrough: e,
            black: e,
            red: e,
            green: e,
            yellow: e,
            blue: e,
            magenta: e,
            cyan: e,
            white: e,
            gray: e,
            bgBlack: e,
            bgRed: e,
            bgGreen: e,
            bgYellow: e,
            bgBlue: e,
            bgMagenta: e,
            bgCyan: e,
            bgWhite: e
        }
    };
    return Xl.exports = t(),
    Xl.exports.createColors = t,
    Xl.exports
}
var $l = Yl(Object.freeze(Object.defineProperty({
    __proto__: null,
    default: {}
}, Symbol.toStringTag, {
    value: `Module`
}))), eu, tu;
function nu() {
    if (tu)
        return eu;
    tu = 1;
    let e = Ql()
      , t = $l;
    class n extends Error {
        constructor(e, t, r, i, a, o) {
            super(e),
            this.name = `CssSyntaxError`,
            this.reason = e,
            a && (this.file = a),
            i && (this.source = i),
            o && (this.plugin = o),
            t !== void 0 && r !== void 0 && (typeof t == `number` ? (this.line = t,
            this.column = r) : (this.line = t.line,
            this.column = t.column,
            this.endLine = r.line,
            this.endColumn = r.column)),
            this.setMessage(),
            Error.captureStackTrace && Error.captureStackTrace(this, n)
        }
        setMessage() {
            this.message = this.plugin ? this.plugin + `: ` : ``,
            this.message += this.file ? this.file : `<css input>`,
            this.line !== void 0 && (this.message += `:` + this.line + `:` + this.column),
            this.message += `: ` + this.reason
        }
        showSourceCode(n) {
            if (!this.source)
                return ``;
            let r = this.source;
            n ??= e.isColorSupported,
            t && n && (r = t(r));
            let i = r.split(/\r?\n/), a = Math.max(this.line - 3, 0), o = Math.min(this.line + 2, i.length), s = String(o).length, c, l;
            if (n) {
                let {bold: t, gray: n, red: r} = e.createColors(!0);
                c = e => t(r(e)),
                l = e => n(e)
            } else
                c = l = e => e;
            return i.slice(a, o).map( (e, t) => {
                let n = a + 1 + t
                  , r = ` ` + (` ` + n).slice(-s) + ` | `;
                if (n === this.line) {
                    let t = l(r.replace(/\d/g, ` `)) + e.slice(0, this.column - 1).replace(/[^\t]/g, ` `);
                    return c(`>`) + l(r) + e + `
 ` + t + c(`^`)
                }
                return ` ` + l(r) + e
            }
            ).join(`
`)
        }
        toString() {
            let e = this.showSourceCode();
            return e &&= `

` + e + `
`,
            this.name + `: ` + this.message + e
        }
    }
    return eu = n,
    n.default = n,
    eu
}
var ru = {}, iu;
function au() {
    return iu ? ru : (iu = 1,
    ru.isClean = Symbol(`isClean`),
    ru.my = Symbol(`my`),
    ru)
}
var ou, su;
function cu() {
    if (su)
        return ou;
    su = 1;
    let e = {
        after: `
`,
        beforeClose: `
`,
        beforeComment: `
`,
        beforeDecl: `
`,
        beforeOpen: ` `,
        beforeRule: `
`,
        colon: `: `,
        commentLeft: ` `,
        commentRight: ` `,
        emptyBody: ``,
        indent: `    `,
        semicolon: !1
    };
    function t(e) {
        return e[0].toUpperCase() + e.slice(1)
    }
    class n {
        constructor(e) {
            this.builder = e
        }
        atrule(e, t) {
            let n = `@` + e.name
              , r = e.params ? this.rawValue(e, `params`) : ``;
            if (e.raws.afterName === void 0 ? r && (n += ` `) : n += e.raws.afterName,
            e.nodes)
                this.block(e, n + r);
            else {
                let i = (e.raws.between || ``) + (t ? `;` : ``);
                this.builder(n + r + i, e)
            }
        }
        beforeAfter(e, t) {
            let n;
            n = e.type === `decl` ? this.raw(e, null, `beforeDecl`) : e.type === `comment` ? this.raw(e, null, `beforeComment`) : t === `before` ? this.raw(e, null, `beforeRule`) : this.raw(e, null, `beforeClose`);
            let r = e.parent
              , i = 0;
            for (; r && r.type !== `root`; )
                i += 1,
                r = r.parent;
            if (n.includes(`
`)) {
                let t = this.raw(e, null, `indent`);
                if (t.length)
                    for (let e = 0; e < i; e++)
                        n += t
            }
            return n
        }
        block(e, t) {
            let n = this.raw(e, `between`, `beforeOpen`);
            this.builder(t + n + `{`, e, `start`);
            let r;
            e.nodes && e.nodes.length ? (this.body(e),
            r = this.raw(e, `after`)) : r = this.raw(e, `after`, `emptyBody`),
            r && this.builder(r),
            this.builder(`}`, e, `end`)
        }
        body(e) {
            let t = e.nodes.length - 1;
            for (; t > 0 && e.nodes[t].type === `comment`; )
                --t;
            let n = this.raw(e, `semicolon`);
            for (let r = 0; r < e.nodes.length; r++) {
                let i = e.nodes[r]
                  , a = this.raw(i, `before`);
                a && this.builder(a),
                this.stringify(i, t !== r || n)
            }
        }
        comment(e) {
            let t = this.raw(e, `left`, `commentLeft`)
              , n = this.raw(e, `right`, `commentRight`);
            this.builder(`/*` + t + e.text + n + `*/`, e)
        }
        decl(e, t) {
            let n = this.raw(e, `between`, `colon`)
              , r = e.prop + n + this.rawValue(e, `value`);
            e.important && (r += e.raws.important || ` !important`),
            t && (r += `;`),
            this.builder(r, e)
        }
        document(e) {
            this.body(e)
        }
        raw(n, r, i) {
            let a;
            if (i ||= r,
            r && (a = n.raws[r],
            a !== void 0))
                return a;
            let o = n.parent;
            if (i === `before` && (!o || o.type === `root` && o.first === n || o && o.type === `document`))
                return ``;
            if (!o)
                return e[i];
            let s = n.root();
            if (s.rawCache ||= {},
            s.rawCache[i] !== void 0)
                return s.rawCache[i];
            if (i === `before` || i === `after`)
                return this.beforeAfter(n, i);
            {
                let e = `raw` + t(i);
                this[e] ? a = this[e](s, n) : s.walk(e => {
                    if (a = e.raws[r],
                    a !== void 0)
                        return !1
                }
                )
            }
            return a === void 0 && (a = e[i]),
            s.rawCache[i] = a,
            a
        }
        rawBeforeClose(e) {
            let t;
            return e.walk(e => {
                if (e.nodes && e.nodes.length > 0 && e.raws.after !== void 0)
                    return t = e.raws.after,
                    t.includes(`
`) && (t = t.replace(/[^\n]+$/, ``)),
                    !1
            }
            ),
            t &&= t.replace(/\S/g, ``),
            t
        }
        rawBeforeComment(e, t) {
            let n;
            return e.walkComments(e => {
                if (e.raws.before !== void 0)
                    return n = e.raws.before,
                    n.includes(`
`) && (n = n.replace(/[^\n]+$/, ``)),
                    !1
            }
            ),
            n === void 0 ? n = this.raw(t, null, `beforeDecl`) : n &&= n.replace(/\S/g, ``),
            n
        }
        rawBeforeDecl(e, t) {
            let n;
            return e.walkDecls(e => {
                if (e.raws.before !== void 0)
                    return n = e.raws.before,
                    n.includes(`
`) && (n = n.replace(/[^\n]+$/, ``)),
                    !1
            }
            ),
            n === void 0 ? n = this.raw(t, null, `beforeRule`) : n &&= n.replace(/\S/g, ``),
            n
        }
        rawBeforeOpen(e) {
            let t;
            return e.walk(e => {
                if (e.type !== `decl` && (t = e.raws.between,
                t !== void 0))
                    return !1
            }
            ),
            t
        }
        rawBeforeRule(e) {
            let t;
            return e.walk(n => {
                if (n.nodes && (n.parent !== e || e.first !== n) && n.raws.before !== void 0)
                    return t = n.raws.before,
                    t.includes(`
`) && (t = t.replace(/[^\n]+$/, ``)),
                    !1
            }
            ),
            t &&= t.replace(/\S/g, ``),
            t
        }
        rawColon(e) {
            let t;
            return e.walkDecls(e => {
                if (e.raws.between !== void 0)
                    return t = e.raws.between.replace(/[^\s:]/g, ``),
                    !1
            }
            ),
            t
        }
        rawEmptyBody(e) {
            let t;
            return e.walk(e => {
                if (e.nodes && e.nodes.length === 0 && (t = e.raws.after,
                t !== void 0))
                    return !1
            }
            ),
            t
        }
        rawIndent(e) {
            if (e.raws.indent)
                return e.raws.indent;
            let t;
            return e.walk(n => {
                let r = n.parent;
                if (r && r !== e && r.parent && r.parent === e && n.raws.before !== void 0) {
                    let e = n.raws.before.split(`
`);
                    return t = e[e.length - 1],
                    t = t.replace(/\S/g, ``),
                    !1
                }
            }
            ),
            t
        }
        rawSemicolon(e) {
            let t;
            return e.walk(e => {
                if (e.nodes && e.nodes.length && e.last.type === `decl` && (t = e.raws.semicolon,
                t !== void 0))
                    return !1
            }
            ),
            t
        }
        rawValue(e, t) {
            let n = e[t]
              , r = e.raws[t];
            return r && r.value === n ? r.raw : n
        }
        root(e) {
            this.body(e),
            e.raws.after && this.builder(e.raws.after)
        }
        rule(e) {
            this.block(e, this.rawValue(e, `selector`)),
            e.raws.ownSemicolon && this.builder(e.raws.ownSemicolon, e, `end`)
        }
        stringify(e, t) {
            if (!this[e.type])
                throw Error(`Unknown AST node type ` + e.type + `. Maybe you need to change PostCSS stringifier.`);
            this[e.type](e, t)
        }
    }
    return ou = n,
    n.default = n,
    ou
}
var lu, uu;
function du() {
    if (uu)
        return lu;
    uu = 1;
    let e = cu();
    function t(t, n) {
        new e(n).stringify(t)
    }
    return lu = t,
    t.default = t,
    lu
}
var fu, pu;
function mu() {
    if (pu)
        return fu;
    pu = 1;
    let {isClean: e, my: t} = au()
      , n = nu()
      , r = cu()
      , i = du();
    function a(e, t) {
        let n = new e.constructor;
        for (let r in e) {
            if (!Object.prototype.hasOwnProperty.call(e, r) || r === `proxyCache`)
                continue;
            let i = e[r]
              , o = typeof i;
            r === `parent` && o === `object` ? t && (n[r] = t) : r === `source` ? n[r] = i : Array.isArray(i) ? n[r] = i.map(e => a(e, n)) : (o === `object` && i !== null && (i = a(i)),
            n[r] = i)
        }
        return n
    }
    class o {
        constructor(n={}) {
            this.raws = {},
            this[e] = !1,
            this[t] = !0;
            for (let e in n)
                if (e === `nodes`) {
                    this.nodes = [];
                    for (let t of n[e])
                        typeof t.clone == `function` ? this.append(t.clone()) : this.append(t)
                } else
                    this[e] = n[e]
        }
        addToError(e) {
            if (e.postcssNode = this,
            e.stack && this.source && /\n\s{4}at /.test(e.stack)) {
                let t = this.source;
                e.stack = e.stack.replace(/\n\s{4}at /, `$&${t.input.from}:${t.start.line}:${t.start.column}$&`)
            }
            return e
        }
        after(e) {
            return this.parent.insertAfter(this, e),
            this
        }
        assign(e={}) {
            for (let t in e)
                this[t] = e[t];
            return this
        }
        before(e) {
            return this.parent.insertBefore(this, e),
            this
        }
        cleanRaws(e) {
            delete this.raws.before,
            delete this.raws.after,
            e || delete this.raws.between
        }
        clone(e={}) {
            let t = a(this);
            for (let n in e)
                t[n] = e[n];
            return t
        }
        cloneAfter(e={}) {
            let t = this.clone(e);
            return this.parent.insertAfter(this, t),
            t
        }
        cloneBefore(e={}) {
            let t = this.clone(e);
            return this.parent.insertBefore(this, t),
            t
        }
        error(e, t={}) {
            if (this.source) {
                let {end: n, start: r} = this.rangeBy(t);
                return this.source.input.error(e, {
                    column: r.column,
                    line: r.line
                }, {
                    column: n.column,
                    line: n.line
                }, t)
            }
            return new n(e)
        }
        getProxyProcessor() {
            return {
                get(e, t) {
                    return t === `proxyOf` ? e : t === `root` ? () => e.root().toProxy() : e[t]
                },
                set(e, t, n) {
                    return e[t] === n ? !0 : (e[t] = n,
                    (t === `prop` || t === `value` || t === `name` || t === `params` || t === `important` || t === `text`) && e.markDirty(),
                    !0)
                }
            }
        }
        markDirty() {
            if (this[e]) {
                this[e] = !1;
                let t = this;
                for (; t = t.parent; )
                    t[e] = !1
            }
        }
        next() {
            if (!this.parent)
                return;
            let e = this.parent.index(this);
            return this.parent.nodes[e + 1]
        }
        positionBy(e, t) {
            let n = this.source.start;
            if (e.index)
                n = this.positionInside(e.index, t);
            else if (e.word) {
                t = this.toString();
                let r = t.indexOf(e.word);
                r !== -1 && (n = this.positionInside(r, t))
            }
            return n
        }
        positionInside(e, t) {
            let n = t || this.toString()
              , r = this.source.start.column
              , i = this.source.start.line;
            for (let t = 0; t < e; t++)
                n[t] === `
` ? (r = 1,
                i += 1) : r += 1;
            return {
                column: r,
                line: i
            }
        }
        prev() {
            if (!this.parent)
                return;
            let e = this.parent.index(this);
            return this.parent.nodes[e - 1]
        }
        rangeBy(e) {
            let t = {
                column: this.source.start.column,
                line: this.source.start.line
            }
              , n = this.source.end ? {
                column: this.source.end.column + 1,
                line: this.source.end.line
            } : {
                column: t.column + 1,
                line: t.line
            };
            if (e.word) {
                let r = this.toString()
                  , i = r.indexOf(e.word);
                i !== -1 && (t = this.positionInside(i, r),
                n = this.positionInside(i + e.word.length, r))
            } else
                e.start ? t = {
                    column: e.start.column,
                    line: e.start.line
                } : e.index && (t = this.positionInside(e.index)),
                e.end ? n = {
                    column: e.end.column,
                    line: e.end.line
                } : typeof e.endIndex == `number` ? n = this.positionInside(e.endIndex) : e.index && (n = this.positionInside(e.index + 1));
            return (n.line < t.line || n.line === t.line && n.column <= t.column) && (n = {
                column: t.column + 1,
                line: t.line
            }),
            {
                end: n,
                start: t
            }
        }
        raw(e, t) {
            return new r().raw(this, e, t)
        }
        remove() {
            return this.parent && this.parent.removeChild(this),
            this.parent = void 0,
            this
        }
        replaceWith(...e) {
            if (this.parent) {
                let t = this
                  , n = !1;
                for (let r of e)
                    r === this ? n = !0 : n ? (this.parent.insertAfter(t, r),
                    t = r) : this.parent.insertBefore(t, r);
                n || this.remove()
            }
            return this
        }
        root() {
            let e = this;
            for (; e.parent && e.parent.type !== `document`; )
                e = e.parent;
            return e
        }
        toJSON(e, t) {
            let n = {}
              , r = t == null;
            t ||= new Map;
            let i = 0;
            for (let e in this) {
                if (!Object.prototype.hasOwnProperty.call(this, e) || e === `parent` || e === `proxyCache`)
                    continue;
                let r = this[e];
                if (Array.isArray(r))
                    n[e] = r.map(e => typeof e == `object` && e.toJSON ? e.toJSON(null, t) : e);
                else if (typeof r == `object` && r.toJSON)
                    n[e] = r.toJSON(null, t);
                else if (e === `source`) {
                    let a = t.get(r.input);
                    a ?? (a = i,
                    t.set(r.input, i),
                    i++),
                    n[e] = {
                        end: r.end,
                        inputId: a,
                        start: r.start
                    }
                } else
                    n[e] = r
            }
            return r && (n.inputs = [...t.keys()].map(e => e.toJSON())),
            n
        }
        toProxy() {
            return this.proxyCache ||= new Proxy(this,this.getProxyProcessor()),
            this.proxyCache
        }
        toString(e=i) {
            e.stringify && (e = e.stringify);
            let t = ``;
            return e(this, e => {
                t += e
            }
            ),
            t
        }
        warn(e, t, n) {
            let r = {
                node: this
            };
            for (let e in n)
                r[e] = n[e];
            return e.warn(t, r)
        }
        get proxyOf() {
            return this
        }
    }
    return fu = o,
    o.default = o,
    fu
}
var hu, gu;
function _u() {
    if (gu)
        return hu;
    gu = 1;
    let e = mu();
    class t extends e {
        constructor(e) {
            e && e.value !== void 0 && typeof e.value != `string` && (e = {
                ...e,
                value: String(e.value)
            }),
            super(e),
            this.type = `decl`
        }
        get variable() {
            return this.prop.startsWith(`--`) || this.prop[0] === `$`
        }
    }
    return hu = t,
    t.default = t,
    hu
}
var vu, yu;
function bu() {
    return yu ? vu : (yu = 1,
    vu = {
        nanoid: (e=21) => {
            let t = ``
              , n = e;
            for (; n--; )
                t += `useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict`[Math.random() * 64 | 0];
            return t
        }
        ,
        customAlphabet: (e, t=21) => (n=t) => {
            let r = ``
              , i = n;
            for (; i--; )
                r += e[Math.random() * e.length | 0];
            return r
        }
    },
    vu)
}
var xu, Su;
function Cu() {
    if (Su)
        return xu;
    Su = 1;
    let {SourceMapConsumer: e, SourceMapGenerator: t} = $l
      , {existsSync: n, readFileSync: r} = $l
      , {dirname: i, join: a} = $l;
    function o(e) {
        return Buffer ? Buffer.from(e, `base64`).toString() : window.atob(e)
    }
    class s {
        constructor(e, t) {
            if (t.map === !1)
                return;
            this.loadAnnotation(e),
            this.inline = this.startWith(this.annotation, `data:`);
            let n = t.map ? t.map.prev : void 0
              , r = this.loadMap(t.from, n);
            !this.mapFile && t.from && (this.mapFile = t.from),
            this.mapFile && (this.root = i(this.mapFile)),
            r && (this.text = r)
        }
        consumer() {
            return this.consumerCache ||= new e(this.text),
            this.consumerCache
        }
        decodeInline(e) {
            let t = /^data:application\/json;charset=utf-?8;base64,/
              , n = /^data:application\/json;base64,/;
            if (/^data:application\/json;charset=utf-?8,/.test(e) || /^data:application\/json,/.test(e))
                return decodeURIComponent(e.substr(RegExp.lastMatch.length));
            if (t.test(e) || n.test(e))
                return o(e.substr(RegExp.lastMatch.length));
            let r = e.match(/data:application\/json;([^,]+),/)[1];
            throw Error(`Unsupported source map encoding ` + r)
        }
        getAnnotationURL(e) {
            return e.replace(/^\/\*\s*# sourceMappingURL=/, ``).trim()
        }
        isMap(e) {
            return typeof e == `object` ? typeof e.mappings == `string` || typeof e._mappings == `string` || Array.isArray(e.sections) : !1
        }
        loadAnnotation(e) {
            let t = e.match(/\/\*\s*# sourceMappingURL=/gm);
            if (!t)
                return;
            let n = e.lastIndexOf(t.pop())
              , r = e.indexOf(`*/`, n);
            n > -1 && r > -1 && (this.annotation = this.getAnnotationURL(e.substring(n, r)))
        }
        loadFile(e) {
            if (this.root = i(e),
            n(e))
                return this.mapFile = e,
                r(e, `utf-8`).toString().trim()
        }
        loadMap(n, r) {
            if (r === !1)
                return !1;
            if (r) {
                if (typeof r == `string`)
                    return r;
                if (typeof r == `function`) {
                    let e = r(n);
                    if (e) {
                        let t = this.loadFile(e);
                        if (!t)
                            throw Error(`Unable to load previous source map: ` + e.toString());
                        return t
                    }
                } else if (r instanceof e)
                    return t.fromSourceMap(r).toString();
                else if (r instanceof t)
                    return r.toString();
                else if (this.isMap(r))
                    return JSON.stringify(r);
                else
                    throw Error(`Unsupported previous source map format: ` + r.toString())
            } else if (this.inline)
                return this.decodeInline(this.annotation);
            else if (this.annotation) {
                let e = this.annotation;
                return n && (e = a(i(n), e)),
                this.loadFile(e)
            }
        }
        startWith(e, t) {
            return e ? e.substr(0, t.length) === t : !1
        }
        withContent() {
            return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0)
        }
    }
    return xu = s,
    s.default = s,
    xu
}
var wu, Tu;
function Eu() {
    if (Tu)
        return wu;
    Tu = 1;
    let {SourceMapConsumer: e, SourceMapGenerator: t} = $l
      , {fileURLToPath: n, pathToFileURL: r} = $l
      , {isAbsolute: i, resolve: a} = $l
      , {nanoid: o} = bu()
      , s = $l
      , c = nu()
      , l = Cu()
      , u = Symbol(`fromOffsetCache`)
      , d = !!(e && t)
      , f = !!(a && i);
    class p {
        constructor(e, t={}) {
            if (e == null || typeof e == `object` && !e.toString)
                throw Error(`PostCSS received ${e} instead of CSS string`);
            if (this.css = e.toString(),
            this.css[0] === `﻿` || this.css[0] === `￾` ? (this.hasBOM = !0,
            this.css = this.css.slice(1)) : this.hasBOM = !1,
            t.from && (!f || /^\w+:\/\//.test(t.from) || i(t.from) ? this.file = t.from : this.file = a(t.from)),
            f && d) {
                let e = new l(this.css,t);
                if (e.text) {
                    this.map = e;
                    let t = e.consumer().file;
                    !this.file && t && (this.file = this.mapResolve(t))
                }
            }
            this.file || (this.id = `<input css ` + o(6) + `>`),
            this.map && (this.map.file = this.from)
        }
        error(e, t, n, i={}) {
            let a, o, s;
            if (t && typeof t == `object`) {
                let e = t
                  , r = n;
                if (typeof e.offset == `number`) {
                    let r = this.fromOffset(e.offset);
                    t = r.line,
                    n = r.col
                } else
                    t = e.line,
                    n = e.column;
                if (typeof r.offset == `number`) {
                    let e = this.fromOffset(r.offset);
                    o = e.line,
                    s = e.col
                } else
                    o = r.line,
                    s = r.column
            } else if (!n) {
                let e = this.fromOffset(t);
                t = e.line,
                n = e.col
            }
            let l = this.origin(t, n, o, s);
            return a = l ? new c(e,l.endLine === void 0 ? l.line : {
                column: l.column,
                line: l.line
            },l.endLine === void 0 ? l.column : {
                column: l.endColumn,
                line: l.endLine
            },l.source,l.file,i.plugin) : new c(e,o === void 0 ? t : {
                column: n,
                line: t
            },o === void 0 ? n : {
                column: s,
                line: o
            },this.css,this.file,i.plugin),
            a.input = {
                column: n,
                endColumn: s,
                endLine: o,
                line: t,
                source: this.css
            },
            this.file && (r && (a.input.url = r(this.file).toString()),
            a.input.file = this.file),
            a
        }
        fromOffset(e) {
            let t, n;
            if (this[u])
                n = this[u];
            else {
                let e = this.css.split(`
`);
                n = Array(e.length);
                let t = 0;
                for (let r = 0, i = e.length; r < i; r++)
                    n[r] = t,
                    t += e[r].length + 1;
                this[u] = n
            }
            t = n[n.length - 1];
            let r = 0;
            if (e >= t)
                r = n.length - 1;
            else {
                let t = n.length - 2, i;
                for (; r < t; )
                    if (i = r + (t - r >> 1),
                    e < n[i])
                        t = i - 1;
                    else if (e >= n[i + 1])
                        r = i + 1;
                    else {
                        r = i;
                        break
                    }
            }
            return {
                col: e - n[r] + 1,
                line: r + 1
            }
        }
        mapResolve(e) {
            return /^\w+:\/\//.test(e) ? e : a(this.map.consumer().sourceRoot || this.map.root || `.`, e)
        }
        origin(e, t, a, o) {
            if (!this.map)
                return !1;
            let s = this.map.consumer()
              , c = s.originalPositionFor({
                column: t,
                line: e
            });
            if (!c.source)
                return !1;
            let l;
            typeof a == `number` && (l = s.originalPositionFor({
                column: o,
                line: a
            }));
            let u;
            u = i(c.source) ? r(c.source) : new URL(c.source,this.map.consumer().sourceRoot || r(this.map.mapFile));
            let d = {
                column: c.column,
                endColumn: l && l.column,
                endLine: l && l.line,
                line: c.line,
                url: u.toString()
            };
            if (u.protocol === `file:`)
                if (n)
                    d.file = n(u);
                else
                    throw Error(`file: protocol is not available in this PostCSS build`);
            let f = s.sourceContentFor(c.source);
            return f && (d.source = f),
            d
        }
        toJSON() {
            let e = {};
            for (let t of [`hasBOM`, `css`, `file`, `id`])
                this[t] != null && (e[t] = this[t]);
            return this.map && (e.map = {
                ...this.map
            },
            e.map.consumerCache && (e.map.consumerCache = void 0)),
            e
        }
        get from() {
            return this.file || this.id
        }
    }
    return wu = p,
    p.default = p,
    s && s.registerInput && s.registerInput(p),
    wu
}
var Du, Ou;
function ku() {
    if (Ou)
        return Du;
    Ou = 1;
    let {SourceMapConsumer: e, SourceMapGenerator: t} = $l
      , {dirname: n, relative: r, resolve: i, sep: a} = $l
      , {pathToFileURL: o} = $l
      , s = Eu()
      , c = !!(e && t)
      , l = !!(n && i && r && a);
    class u {
        constructor(e, t, n, r) {
            this.stringify = e,
            this.mapOpts = n.map || {},
            this.root = t,
            this.opts = n,
            this.css = r,
            this.originalCSS = r,
            this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute,
            this.memoizedFileURLs = new Map,
            this.memoizedPaths = new Map,
            this.memoizedURLs = new Map
        }
        addAnnotation() {
            let e;
            e = this.isInline() ? `data:application/json;base64,` + this.toBase64(this.map.toString()) : typeof this.mapOpts.annotation == `string` ? this.mapOpts.annotation : typeof this.mapOpts.annotation == `function` ? this.mapOpts.annotation(this.opts.to, this.root) : this.outputFile() + `.map`;
            let t = `
`;
            this.css.includes(`\r
`) && (t = `\r
`),
            this.css += t + `/*# sourceMappingURL=` + e + ` */`
        }
        applyPrevMaps() {
            for (let t of this.previous()) {
                let r = this.toUrl(this.path(t.file)), i = t.root || n(t.file), a;
                this.mapOpts.sourcesContent === !1 ? (a = new e(t.text),
                a.sourcesContent &&= null) : a = t.consumer(),
                this.map.applySourceMap(a, r, this.toUrl(this.path(i)))
            }
        }
        clearAnnotation() {
            if (this.mapOpts.annotation !== !1)
                if (this.root) {
                    let e;
                    for (let t = this.root.nodes.length - 1; t >= 0; t--)
                        e = this.root.nodes[t],
                        e.type === `comment` && e.text.indexOf(`# sourceMappingURL=`) === 0 && this.root.removeChild(t)
                } else
                    this.css &&= this.css.replace(/\n*?\/\*#[\S\s]*?\*\/$/gm, ``)
        }
        generate() {
            if (this.clearAnnotation(),
            l && c && this.isMap())
                return this.generateMap();
            {
                let e = ``;
                return this.stringify(this.root, t => {
                    e += t
                }
                ),
                [e]
            }
        }
        generateMap() {
            if (this.root)
                this.generateString();
            else if (this.previous().length === 1) {
                let e = this.previous()[0].consumer();
                e.file = this.outputFile(),
                this.map = t.fromSourceMap(e, {
                    ignoreInvalidMapping: !0
                })
            } else
                this.map = new t({
                    file: this.outputFile(),
                    ignoreInvalidMapping: !0
                }),
                this.map.addMapping({
                    generated: {
                        column: 0,
                        line: 1
                    },
                    original: {
                        column: 0,
                        line: 1
                    },
                    source: this.opts.from ? this.toUrl(this.path(this.opts.from)) : `<no source>`
                });
            return this.isSourcesContent() && this.setSourcesContent(),
            this.root && this.previous().length > 0 && this.applyPrevMaps(),
            this.isAnnotation() && this.addAnnotation(),
            this.isInline() ? [this.css] : [this.css, this.map]
        }
        generateString() {
            this.css = ``,
            this.map = new t({
                file: this.outputFile(),
                ignoreInvalidMapping: !0
            });
            let e = 1, n = 1, r = `<no source>`, i = {
                generated: {
                    column: 0,
                    line: 0
                },
                original: {
                    column: 0,
                    line: 0
                },
                source: ``
            }, a, o;
            this.stringify(this.root, (t, s, c) => {
                if (this.css += t,
                s && c !== `end` && (i.generated.line = e,
                i.generated.column = n - 1,
                s.source && s.source.start ? (i.source = this.sourcePath(s),
                i.original.line = s.source.start.line,
                i.original.column = s.source.start.column - 1,
                this.map.addMapping(i)) : (i.source = r,
                i.original.line = 1,
                i.original.column = 0,
                this.map.addMapping(i))),
                a = t.match(/\n/g),
                a ? (e += a.length,
                o = t.lastIndexOf(`
`),
                n = t.length - o) : n += t.length,
                s && c !== `start`) {
                    let t = s.parent || {
                        raws: {}
                    };
                    (!(s.type === `decl` || s.type === `atrule` && !s.nodes) || s !== t.last || t.raws.semicolon) && (s.source && s.source.end ? (i.source = this.sourcePath(s),
                    i.original.line = s.source.end.line,
                    i.original.column = s.source.end.column - 1,
                    i.generated.line = e,
                    i.generated.column = n - 2,
                    this.map.addMapping(i)) : (i.source = r,
                    i.original.line = 1,
                    i.original.column = 0,
                    i.generated.line = e,
                    i.generated.column = n - 1,
                    this.map.addMapping(i)))
                }
            }
            )
        }
        isAnnotation() {
            return this.isInline() ? !0 : this.mapOpts.annotation === void 0 ? this.previous().length ? this.previous().some(e => e.annotation) : !0 : this.mapOpts.annotation
        }
        isInline() {
            if (this.mapOpts.inline !== void 0)
                return this.mapOpts.inline;
            let e = this.mapOpts.annotation;
            return e !== void 0 && e !== !0 ? !1 : this.previous().length ? this.previous().some(e => e.inline) : !0
        }
        isMap() {
            return this.opts.map === void 0 ? this.previous().length > 0 : !!this.opts.map
        }
        isSourcesContent() {
            return this.mapOpts.sourcesContent === void 0 ? this.previous().length ? this.previous().some(e => e.withContent()) : !0 : this.mapOpts.sourcesContent
        }
        outputFile() {
            return this.opts.to ? this.path(this.opts.to) : this.opts.from ? this.path(this.opts.from) : `to.css`
        }
        path(e) {
            if (this.mapOpts.absolute || e.charCodeAt(0) === 60 || /^\w+:\/\//.test(e))
                return e;
            let t = this.memoizedPaths.get(e);
            if (t)
                return t;
            let a = this.opts.to ? n(this.opts.to) : `.`;
            typeof this.mapOpts.annotation == `string` && (a = n(i(a, this.mapOpts.annotation)));
            let o = r(a, e);
            return this.memoizedPaths.set(e, o),
            o
        }
        previous() {
            if (!this.previousMaps)
                if (this.previousMaps = [],
                this.root)
                    this.root.walk(e => {
                        if (e.source && e.source.input.map) {
                            let t = e.source.input.map;
                            this.previousMaps.includes(t) || this.previousMaps.push(t)
                        }
                    }
                    );
                else {
                    let e = new s(this.originalCSS,this.opts);
                    e.map && this.previousMaps.push(e.map)
                }
            return this.previousMaps
        }
        setSourcesContent() {
            let e = {};
            if (this.root)
                this.root.walk(t => {
                    if (t.source) {
                        let n = t.source.input.from;
                        if (n && !e[n]) {
                            e[n] = !0;
                            let r = this.usesFileUrls ? this.toFileUrl(n) : this.toUrl(this.path(n));
                            this.map.setSourceContent(r, t.source.input.css)
                        }
                    }
                }
                );
            else if (this.css) {
                let e = this.opts.from ? this.toUrl(this.path(this.opts.from)) : `<no source>`;
                this.map.setSourceContent(e, this.css)
            }
        }
        sourcePath(e) {
            return this.mapOpts.from ? this.toUrl(this.mapOpts.from) : this.usesFileUrls ? this.toFileUrl(e.source.input.from) : this.toUrl(this.path(e.source.input.from))
        }
        toBase64(e) {
            return Buffer ? Buffer.from(e).toString(`base64`) : window.btoa(unescape(encodeURIComponent(e)))
        }
        toFileUrl(e) {
            let t = this.memoizedFileURLs.get(e);
            if (t)
                return t;
            if (o) {
                let t = o(e).toString();
                return this.memoizedFileURLs.set(e, t),
                t
            } else
                throw Error("`map.absolute` option is not available in this PostCSS build")
        }
        toUrl(e) {
            let t = this.memoizedURLs.get(e);
            if (t)
                return t;
            a === `\\` && (e = e.replace(/\\/g, `/`));
            let n = encodeURI(e).replace(/[#?]/g, encodeURIComponent);
            return this.memoizedURLs.set(e, n),
            n
        }
    }
    return Du = u,
    Du
}
var Au, ju;
function Mu() {
    if (ju)
        return Au;
    ju = 1;
    let e = mu();
    class t extends e {
        constructor(e) {
            super(e),
            this.type = `comment`
        }
    }
    return Au = t,
    t.default = t,
    Au
}
var Nu, Pu;
function Fu() {
    if (Pu)
        return Nu;
    Pu = 1;
    let {isClean: e, my: t} = au(), n = _u(), r = Mu(), i = mu(), a, o, s, c;
    function l(e) {
        return e.map(e => (e.nodes &&= l(e.nodes),
        delete e.source,
        e))
    }
    function u(t) {
        if (t[e] = !1,
        t.proxyOf.nodes)
            for (let e of t.proxyOf.nodes)
                u(e)
    }
    class d extends i {
        append(...e) {
            for (let t of e) {
                let e = this.normalize(t, this.last);
                for (let t of e)
                    this.proxyOf.nodes.push(t)
            }
            return this.markDirty(),
            this
        }
        cleanRaws(e) {
            if (super.cleanRaws(e),
            this.nodes)
                for (let t of this.nodes)
                    t.cleanRaws(e)
        }
        each(e) {
            if (!this.proxyOf.nodes)
                return;
            let t = this.getIterator(), n, r;
            for (; this.indexes[t] < this.proxyOf.nodes.length && (n = this.indexes[t],
            r = e(this.proxyOf.nodes[n], n),
            r !== !1); )
                this.indexes[t] += 1;
            return delete this.indexes[t],
            r
        }
        every(e) {
            return this.nodes.every(e)
        }
        getIterator() {
            this.lastEach ||= 0,
            this.indexes ||= {},
            this.lastEach += 1;
            let e = this.lastEach;
            return this.indexes[e] = 0,
            e
        }
        getProxyProcessor() {
            return {
                get(e, t) {
                    return t === `proxyOf` ? e : e[t] ? t === `each` || typeof t == `string` && t.startsWith(`walk`) ? (...n) => e[t](...n.map(e => typeof e == `function` ? (t, n) => e(t.toProxy(), n) : e)) : t === `every` || t === `some` ? n => e[t]( (e, ...t) => n(e.toProxy(), ...t)) : t === `root` ? () => e.root().toProxy() : t === `nodes` ? e.nodes.map(e => e.toProxy()) : t === `first` || t === `last` ? e[t].toProxy() : e[t] : e[t]
                },
                set(e, t, n) {
                    return e[t] === n ? !0 : (e[t] = n,
                    (t === `name` || t === `params` || t === `selector`) && e.markDirty(),
                    !0)
                }
            }
        }
        index(e) {
            return typeof e == `number` ? e : (e.proxyOf && (e = e.proxyOf),
            this.proxyOf.nodes.indexOf(e))
        }
        insertAfter(e, t) {
            let n = this.index(e)
              , r = this.normalize(t, this.proxyOf.nodes[n]).reverse();
            n = this.index(e);
            for (let e of r)
                this.proxyOf.nodes.splice(n + 1, 0, e);
            let i;
            for (let e in this.indexes)
                i = this.indexes[e],
                n < i && (this.indexes[e] = i + r.length);
            return this.markDirty(),
            this
        }
        insertBefore(e, t) {
            let n = this.index(e)
              , r = n === 0 ? `prepend` : !1
              , i = this.normalize(t, this.proxyOf.nodes[n], r).reverse();
            n = this.index(e);
            for (let e of i)
                this.proxyOf.nodes.splice(n, 0, e);
            let a;
            for (let e in this.indexes)
                a = this.indexes[e],
                n <= a && (this.indexes[e] = a + i.length);
            return this.markDirty(),
            this
        }
        normalize(i, c) {
            if (typeof i == `string`)
                i = l(a(i).nodes);
            else if (i === void 0)
                i = [];
            else if (Array.isArray(i)) {
                i = i.slice(0);
                for (let e of i)
                    e.parent && e.parent.removeChild(e, `ignore`)
            } else if (i.type === `root` && this.type !== `document`) {
                i = i.nodes.slice(0);
                for (let e of i)
                    e.parent && e.parent.removeChild(e, `ignore`)
            } else if (i.type)
                i = [i];
            else if (i.prop) {
                if (i.value === void 0)
                    throw Error(`Value field is missed in node creation`);
                typeof i.value != `string` && (i.value = String(i.value)),
                i = [new n(i)]
            } else if (i.selector)
                i = [new o(i)];
            else if (i.name)
                i = [new s(i)];
            else if (i.text)
                i = [new r(i)];
            else
                throw Error(`Unknown node type in node creation`);
            return i.map(n => (n[t] || d.rebuild(n),
            n = n.proxyOf,
            n.parent && n.parent.removeChild(n),
            n[e] && u(n),
            n.raws.before === void 0 && c && c.raws.before !== void 0 && (n.raws.before = c.raws.before.replace(/\S/g, ``)),
            n.parent = this.proxyOf,
            n))
        }
        prepend(...e) {
            e = e.reverse();
            for (let t of e) {
                let e = this.normalize(t, this.first, `prepend`).reverse();
                for (let t of e)
                    this.proxyOf.nodes.unshift(t);
                for (let t in this.indexes)
                    this.indexes[t] = this.indexes[t] + e.length
            }
            return this.markDirty(),
            this
        }
        push(e) {
            return e.parent = this,
            this.proxyOf.nodes.push(e),
            this
        }
        removeAll() {
            for (let e of this.proxyOf.nodes)
                e.parent = void 0;
            return this.proxyOf.nodes = [],
            this.markDirty(),
            this
        }
        removeChild(e) {
            e = this.index(e),
            this.proxyOf.nodes[e].parent = void 0,
            this.proxyOf.nodes.splice(e, 1);
            let t;
            for (let n in this.indexes)
                t = this.indexes[n],
                t >= e && (this.indexes[n] = t - 1);
            return this.markDirty(),
            this
        }
        replaceValues(e, t, n) {
            return n || (n = t,
            t = {}),
            this.walkDecls(r => {
                t.props && !t.props.includes(r.prop) || t.fast && !r.value.includes(t.fast) || (r.value = r.value.replace(e, n))
            }
            ),
            this.markDirty(),
            this
        }
        some(e) {
            return this.nodes.some(e)
        }
        walk(e) {
            return this.each( (t, n) => {
                let r;
                try {
                    r = e(t, n)
                } catch (e) {
                    throw t.addToError(e)
                }
                return r !== !1 && t.walk && (r = t.walk(e)),
                r
            }
            )
        }
        walkAtRules(e, t) {
            return t ? e instanceof RegExp ? this.walk( (n, r) => {
                if (n.type === `atrule` && e.test(n.name))
                    return t(n, r)
            }
            ) : this.walk( (n, r) => {
                if (n.type === `atrule` && n.name === e)
                    return t(n, r)
            }
            ) : (t = e,
            this.walk( (e, n) => {
                if (e.type === `atrule`)
                    return t(e, n)
            }
            ))
        }
        walkComments(e) {
            return this.walk( (t, n) => {
                if (t.type === `comment`)
                    return e(t, n)
            }
            )
        }
        walkDecls(e, t) {
            return t ? e instanceof RegExp ? this.walk( (n, r) => {
                if (n.type === `decl` && e.test(n.prop))
                    return t(n, r)
            }
            ) : this.walk( (n, r) => {
                if (n.type === `decl` && n.prop === e)
                    return t(n, r)
            }
            ) : (t = e,
            this.walk( (e, n) => {
                if (e.type === `decl`)
                    return t(e, n)
            }
            ))
        }
        walkRules(e, t) {
            return t ? e instanceof RegExp ? this.walk( (n, r) => {
                if (n.type === `rule` && e.test(n.selector))
                    return t(n, r)
            }
            ) : this.walk( (n, r) => {
                if (n.type === `rule` && n.selector === e)
                    return t(n, r)
            }
            ) : (t = e,
            this.walk( (e, n) => {
                if (e.type === `rule`)
                    return t(e, n)
            }
            ))
        }
        get first() {
            if (this.proxyOf.nodes)
                return this.proxyOf.nodes[0]
        }
        get last() {
            if (this.proxyOf.nodes)
                return this.proxyOf.nodes[this.proxyOf.nodes.length - 1]
        }
    }
    return d.registerParse = e => {
        a = e
    }
    ,
    d.registerRule = e => {
        o = e
    }
    ,
    d.registerAtRule = e => {
        s = e
    }
    ,
    d.registerRoot = e => {
        c = e
    }
    ,
    Nu = d,
    d.default = d,
    d.rebuild = e => {
        e.type === `atrule` ? Object.setPrototypeOf(e, s.prototype) : e.type === `rule` ? Object.setPrototypeOf(e, o.prototype) : e.type === `decl` ? Object.setPrototypeOf(e, n.prototype) : e.type === `comment` ? Object.setPrototypeOf(e, r.prototype) : e.type === `root` && Object.setPrototypeOf(e, c.prototype),
        e[t] = !0,
        e.nodes && e.nodes.forEach(e => {
            d.rebuild(e)
        }
        )
    }
    ,
    Nu
}
var Iu, Lu;
function Ru() {
    if (Lu)
        return Iu;
    Lu = 1;
    let e = Fu(), t, n;
    class r extends e {
        constructor(e) {
            super({
                type: `document`,
                ...e
            }),
            this.nodes ||= []
        }
        toResult(e={}) {
            return new t(new n,this,e).stringify()
        }
    }
    return r.registerLazyResult = e => {
        t = e
    }
    ,
    r.registerProcessor = e => {
        n = e
    }
    ,
    Iu = r,
    r.default = r,
    Iu
}
var zu, Bu;
function Vu() {
    if (Bu)
        return zu;
    Bu = 1;
    let e = {};
    return zu = function(t) {
        e[t] || (e[t] = !0,
        typeof console < `u` && console.warn && console.warn(t))
    }
    ,
    zu
}
var Hu, Uu;
function Wu() {
    if (Uu)
        return Hu;
    Uu = 1;
    class e {
        constructor(e, t={}) {
            if (this.type = `warning`,
            this.text = e,
            t.node && t.node.source) {
                let e = t.node.rangeBy(t);
                this.line = e.start.line,
                this.column = e.start.column,
                this.endLine = e.end.line,
                this.endColumn = e.end.column
            }
            for (let e in t)
                this[e] = t[e]
        }
        toString() {
            return this.node ? this.node.error(this.text, {
                index: this.index,
                plugin: this.plugin,
                word: this.word
            }).message : this.plugin ? this.plugin + `: ` + this.text : this.text
        }
    }
    return Hu = e,
    e.default = e,
    Hu
}
var Gu, Ku;
function qu() {
    if (Ku)
        return Gu;
    Ku = 1;
    let e = Wu();
    class t {
        constructor(e, t, n) {
            this.processor = e,
            this.messages = [],
            this.root = t,
            this.opts = n,
            this.css = void 0,
            this.map = void 0
        }
        toString() {
            return this.css
        }
        warn(t, n={}) {
            n.plugin || this.lastPlugin && this.lastPlugin.postcssPlugin && (n.plugin = this.lastPlugin.postcssPlugin);
            let r = new e(t,n);
            return this.messages.push(r),
            r
        }
        warnings() {
            return this.messages.filter(e => e.type === `warning`)
        }
        get content() {
            return this.css
        }
    }
    return Gu = t,
    t.default = t,
    Gu
}
var Ju, Yu;
function Xu() {
    if (Yu)
        return Ju;
    Yu = 1;
    let e = /[\t\n\f\r "#'()/;[\\\]{}]/g
      , t = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g
      , n = /.[\r\n"'(/\\]/
      , r = /[\da-f]/i;
    return Ju = function(i, a={}) {
        let o = i.css.valueOf(), s = a.ignoreErrors, c, l, u, d, f, p, m, h, g, _, v = o.length, y = 0, b = [], x = [];
        function S() {
            return y
        }
        function C(e) {
            throw i.error(`Unclosed ` + e, y)
        }
        function ee() {
            return x.length === 0 && y >= v
        }
        function w(i) {
            if (x.length)
                return x.pop();
            if (y >= v)
                return;
            let a = i ? i.ignoreUnclosed : !1;
            switch (c = o.charCodeAt(y),
            c) {
            case 10:
            case 32:
            case 9:
            case 13:
            case 12:
                l = y;
                do
                    l += 1,
                    c = o.charCodeAt(l);
                while (c === 32 || c === 10 || c === 9 || c === 13 || c === 12);
                _ = [`space`, o.slice(y, l)],
                y = l - 1;
                break;
            case 91:
            case 93:
            case 123:
            case 125:
            case 58:
            case 59:
            case 41:
                {
                    let e = String.fromCharCode(c);
                    _ = [e, e, y];
                    break
                }
            case 40:
                if (h = b.length ? b.pop()[1] : ``,
                g = o.charCodeAt(y + 1),
                h === `url` && g !== 39 && g !== 34 && g !== 32 && g !== 10 && g !== 9 && g !== 12 && g !== 13) {
                    l = y;
                    do {
                        if (p = !1,
                        l = o.indexOf(`)`, l + 1),
                        l === -1)
                            if (s || a) {
                                l = y;
                                break
                            } else
                                C(`bracket`);
                        for (m = l; o.charCodeAt(m - 1) === 92; )
                            --m,
                            p = !p
                    } while (p);
                    _ = [`brackets`, o.slice(y, l + 1), y, l],
                    y = l
                } else
                    l = o.indexOf(`)`, y + 1),
                    d = o.slice(y, l + 1),
                    l === -1 || n.test(d) ? _ = [`(`, `(`, y] : (_ = [`brackets`, d, y, l],
                    y = l);
                break;
            case 39:
            case 34:
                u = c === 39 ? `'` : `"`,
                l = y;
                do {
                    if (p = !1,
                    l = o.indexOf(u, l + 1),
                    l === -1)
                        if (s || a) {
                            l = y + 1;
                            break
                        } else
                            C(`string`);
                    for (m = l; o.charCodeAt(m - 1) === 92; )
                        --m,
                        p = !p
                } while (p);
                _ = [`string`, o.slice(y, l + 1), y, l],
                y = l;
                break;
            case 64:
                e.lastIndex = y + 1,
                e.test(o),
                l = e.lastIndex === 0 ? o.length - 1 : e.lastIndex - 2,
                _ = [`at-word`, o.slice(y, l + 1), y, l],
                y = l;
                break;
            case 92:
                for (l = y,
                f = !0; o.charCodeAt(l + 1) === 92; )
                    l += 1,
                    f = !f;
                if (c = o.charCodeAt(l + 1),
                f && c !== 47 && c !== 32 && c !== 10 && c !== 9 && c !== 13 && c !== 12 && (l += 1,
                r.test(o.charAt(l)))) {
                    for (; r.test(o.charAt(l + 1)); )
                        l += 1;
                    o.charCodeAt(l + 1) === 32 && (l += 1)
                }
                _ = [`word`, o.slice(y, l + 1), y, l],
                y = l;
                break;
            default:
                c === 47 && o.charCodeAt(y + 1) === 42 ? (l = o.indexOf(`*/`, y + 2) + 1,
                l === 0 && (s || a ? l = o.length : C(`comment`)),
                _ = [`comment`, o.slice(y, l + 1), y, l],
                y = l) : (t.lastIndex = y + 1,
                t.test(o),
                l = t.lastIndex === 0 ? o.length - 1 : t.lastIndex - 2,
                _ = [`word`, o.slice(y, l + 1), y, l],
                b.push(_),
                y = l);
                break
            }
            return y++,
            _
        }
        function te(e) {
            x.push(e)
        }
        return {
            back: te,
            endOfFile: ee,
            nextToken: w,
            position: S
        }
    }
    ,
    Ju
}
var Zu, Qu;
function $u() {
    if (Qu)
        return Zu;
    Qu = 1;
    let e = Fu();
    class t extends e {
        constructor(e) {
            super(e),
            this.type = `atrule`
        }
        append(...e) {
            return this.proxyOf.nodes || (this.nodes = []),
            super.append(...e)
        }
        prepend(...e) {
            return this.proxyOf.nodes || (this.nodes = []),
            super.prepend(...e)
        }
    }
    return Zu = t,
    t.default = t,
    e.registerAtRule(t),
    Zu
}
var ed, td;
function nd() {
    if (td)
        return ed;
    td = 1;
    let e = Fu(), t, n;
    class r extends e {
        constructor(e) {
            super(e),
            this.type = `root`,
            this.nodes ||= []
        }
        normalize(e, t, n) {
            let r = super.normalize(e);
            if (t) {
                if (n === `prepend`)
                    this.nodes.length > 1 ? t.raws.before = this.nodes[1].raws.before : delete t.raws.before;
                else if (this.first !== t)
                    for (let e of r)
                        e.raws.before = t.raws.before
            }
            return r
        }
        removeChild(e, t) {
            let n = this.index(e);
            return !t && n === 0 && this.nodes.length > 1 && (this.nodes[1].raws.before = this.nodes[n].raws.before),
            super.removeChild(e)
        }
        toResult(e={}) {
            return new t(new n,this,e).stringify()
        }
    }
    return r.registerLazyResult = e => {
        t = e
    }
    ,
    r.registerProcessor = e => {
        n = e
    }
    ,
    ed = r,
    r.default = r,
    e.registerRoot(r),
    ed
}
var rd, id;
function ad() {
    if (id)
        return rd;
    id = 1;
    let e = {
        comma(t) {
            return e.split(t, [`,`], !0)
        },
        space(t) {
            return e.split(t, [` `, `
`, `	`])
        },
        split(e, t, n) {
            let r = []
              , i = ``
              , a = !1
              , o = 0
              , s = !1
              , c = ``
              , l = !1;
            for (let n of e)
                l ? l = !1 : n === `\\` ? l = !0 : s ? n === c && (s = !1) : n === `"` || n === `'` ? (s = !0,
                c = n) : n === `(` ? o += 1 : n === `)` ? o > 0 && --o : o === 0 && t.includes(n) && (a = !0),
                a ? (i !== `` && r.push(i.trim()),
                i = ``,
                a = !1) : i += n;
            return (n || i !== ``) && r.push(i.trim()),
            r
        }
    };
    return rd = e,
    e.default = e,
    rd
}
var od, sd;
function cd() {
    if (sd)
        return od;
    sd = 1;
    let e = Fu()
      , t = ad();
    class n extends e {
        constructor(e) {
            super(e),
            this.type = `rule`,
            this.nodes ||= []
        }
        get selectors() {
            return t.comma(this.selector)
        }
        set selectors(e) {
            let t = this.selector ? this.selector.match(/,\s*/) : null
              , n = t ? t[0] : `,` + this.raw(`between`, `beforeOpen`);
            this.selector = e.join(n)
        }
    }
    return od = n,
    n.default = n,
    e.registerRule(n),
    od
}
var ld, ud;
function dd() {
    if (ud)
        return ld;
    ud = 1;
    let e = _u()
      , t = Xu()
      , n = Mu()
      , r = $u()
      , i = nd()
      , a = cd()
      , o = {
        empty: !0,
        space: !0
    };
    function s(e) {
        for (let t = e.length - 1; t >= 0; t--) {
            let n = e[t]
              , r = n[3] || n[2];
            if (r)
                return r
        }
    }
    class c {
        constructor(e) {
            this.input = e,
            this.root = new i,
            this.current = this.root,
            this.spaces = ``,
            this.semicolon = !1,
            this.createTokenizer(),
            this.root.source = {
                input: e,
                start: {
                    column: 1,
                    line: 1,
                    offset: 0
                }
            }
        }
        atrule(e) {
            let t = new r;
            t.name = e[1].slice(1),
            t.name === `` && this.unnamedAtrule(t, e),
            this.init(t, e[2]);
            let n, i, a, o = !1, s = !1, c = [], l = [];
            for (; !this.tokenizer.endOfFile(); ) {
                if (e = this.tokenizer.nextToken(),
                n = e[0],
                n === `(` || n === `[` ? l.push(n === `(` ? `)` : `]`) : n === `{` && l.length > 0 ? l.push(`}`) : n === l[l.length - 1] && l.pop(),
                l.length === 0)
                    if (n === `;`) {
                        t.source.end = this.getPosition(e[2]),
                        t.source.end.offset++,
                        this.semicolon = !0;
                        break
                    } else if (n === `{`) {
                        s = !0;
                        break
                    } else if (n === `}`) {
                        if (c.length > 0) {
                            for (a = c.length - 1,
                            i = c[a]; i && i[0] === `space`; )
                                i = c[--a];
                            i && (t.source.end = this.getPosition(i[3] || i[2]),
                            t.source.end.offset++)
                        }
                        this.end(e);
                        break
                    } else
                        c.push(e);
                else
                    c.push(e);
                if (this.tokenizer.endOfFile()) {
                    o = !0;
                    break
                }
            }
            t.raws.between = this.spacesAndCommentsFromEnd(c),
            c.length ? (t.raws.afterName = this.spacesAndCommentsFromStart(c),
            this.raw(t, `params`, c),
            o && (e = c[c.length - 1],
            t.source.end = this.getPosition(e[3] || e[2]),
            t.source.end.offset++,
            this.spaces = t.raws.between,
            t.raws.between = ``)) : (t.raws.afterName = ``,
            t.params = ``),
            s && (t.nodes = [],
            this.current = t)
        }
        checkMissedSemicolon(e) {
            let t = this.colon(e);
            if (t === !1)
                return;
            let n = 0, r;
            for (let i = t - 1; i >= 0 && (r = e[i],
            !(r[0] !== `space` && (n += 1,
            n === 2))); i--)
                ;
            throw this.input.error(`Missed semicolon`, r[0] === `word` ? r[3] + 1 : r[2])
        }
        colon(e) {
            let t = 0, n, r, i;
            for (let[a,o] of e.entries()) {
                if (n = o,
                r = n[0],
                r === `(` && (t += 1),
                r === `)` && --t,
                t === 0 && r === `:`)
                    if (!i)
                        this.doubleColon(n);
                    else if (i[0] === `word` && i[1] === `progid`)
                        continue;
                    else
                        return a;
                i = n
            }
            return !1
        }
        comment(e) {
            let t = new n;
            this.init(t, e[2]),
            t.source.end = this.getPosition(e[3] || e[2]),
            t.source.end.offset++;
            let r = e[1].slice(2, -2);
            if (/^\s*$/.test(r))
                t.text = ``,
                t.raws.left = r,
                t.raws.right = ``;
            else {
                let e = r.match(/^(\s*)([^]*\S)(\s*)$/);
                t.text = e[2],
                t.raws.left = e[1],
                t.raws.right = e[3]
            }
        }
        createTokenizer() {
            this.tokenizer = t(this.input)
        }
        decl(t, n) {
            let r = new e;
            this.init(r, t[0][2]);
            let i = t[t.length - 1];
            for (i[0] === `;` && (this.semicolon = !0,
            t.pop()),
            r.source.end = this.getPosition(i[3] || i[2] || s(t)),
            r.source.end.offset++; t[0][0] !== `word`; )
                t.length === 1 && this.unknownWord(t),
                r.raws.before += t.shift()[1];
            for (r.source.start = this.getPosition(t[0][2]),
            r.prop = ``; t.length; ) {
                let e = t[0][0];
                if (e === `:` || e === `space` || e === `comment`)
                    break;
                r.prop += t.shift()[1]
            }
            r.raws.between = ``;
            let a;
            for (; t.length; )
                if (a = t.shift(),
                a[0] === `:`) {
                    r.raws.between += a[1];
                    break
                } else
                    a[0] === `word` && /\w/.test(a[1]) && this.unknownWord([a]),
                    r.raws.between += a[1];
            (r.prop[0] === `_` || r.prop[0] === `*`) && (r.raws.before += r.prop[0],
            r.prop = r.prop.slice(1));
            let o = [], c;
            for (; t.length && (c = t[0][0],
            !(c !== `space` && c !== `comment`)); )
                o.push(t.shift());
            this.precheckMissedSemicolon(t);
            for (let e = t.length - 1; e >= 0; e--) {
                if (a = t[e],
                a[1].toLowerCase() === `!important`) {
                    r.important = !0;
                    let n = this.stringFrom(t, e);
                    n = this.spacesFromEnd(t) + n,
                    n !== ` !important` && (r.raws.important = n);
                    break
                } else if (a[1].toLowerCase() === `important`) {
                    let n = t.slice(0)
                      , i = ``;
                    for (let t = e; t > 0; t--) {
                        let e = n[t][0];
                        if (i.trim().indexOf(`!`) === 0 && e !== `space`)
                            break;
                        i = n.pop()[1] + i
                    }
                    i.trim().indexOf(`!`) === 0 && (r.important = !0,
                    r.raws.important = i,
                    t = n)
                }
                if (a[0] !== `space` && a[0] !== `comment`)
                    break
            }
            t.some(e => e[0] !== `space` && e[0] !== `comment`) && (r.raws.between += o.map(e => e[1]).join(``),
            o = []),
            this.raw(r, `value`, o.concat(t), n),
            r.value.includes(`:`) && !n && this.checkMissedSemicolon(t)
        }
        doubleColon(e) {
            throw this.input.error(`Double colon`, {
                offset: e[2]
            }, {
                offset: e[2] + e[1].length
            })
        }
        emptyRule(e) {
            let t = new a;
            this.init(t, e[2]),
            t.selector = ``,
            t.raws.between = ``,
            this.current = t
        }
        end(e) {
            this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon),
            this.semicolon = !1,
            this.current.raws.after = (this.current.raws.after || ``) + this.spaces,
            this.spaces = ``,
            this.current.parent ? (this.current.source.end = this.getPosition(e[2]),
            this.current.source.end.offset++,
            this.current = this.current.parent) : this.unexpectedClose(e)
        }
        endFile() {
            this.current.parent && this.unclosedBlock(),
            this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon),
            this.current.raws.after = (this.current.raws.after || ``) + this.spaces,
            this.root.source.end = this.getPosition(this.tokenizer.position())
        }
        freeSemicolon(e) {
            if (this.spaces += e[1],
            this.current.nodes) {
                let e = this.current.nodes[this.current.nodes.length - 1];
                e && e.type === `rule` && !e.raws.ownSemicolon && (e.raws.ownSemicolon = this.spaces,
                this.spaces = ``)
            }
        }
        getPosition(e) {
            let t = this.input.fromOffset(e);
            return {
                column: t.col,
                line: t.line,
                offset: e
            }
        }
        init(e, t) {
            this.current.push(e),
            e.source = {
                input: this.input,
                start: this.getPosition(t)
            },
            e.raws.before = this.spaces,
            this.spaces = ``,
            e.type !== `comment` && (this.semicolon = !1)
        }
        other(e) {
            let t = !1
              , n = null
              , r = !1
              , i = null
              , a = []
              , o = e[1].startsWith(`--`)
              , s = []
              , c = e;
            for (; c; ) {
                if (n = c[0],
                s.push(c),
                n === `(` || n === `[`)
                    i ||= c,
                    a.push(n === `(` ? `)` : `]`);
                else if (o && r && n === `{`)
                    i ||= c,
                    a.push(`}`);
                else if (a.length === 0)
                    if (n === `;`)
                        if (r) {
                            this.decl(s, o);
                            return
                        } else
                            break;
                    else if (n === `{`) {
                        this.rule(s);
                        return
                    } else if (n === `}`) {
                        this.tokenizer.back(s.pop()),
                        t = !0;
                        break
                    } else
                        n === `:` && (r = !0);
                else
                    n === a[a.length - 1] && (a.pop(),
                    a.length === 0 && (i = null));
                c = this.tokenizer.nextToken()
            }
            if (this.tokenizer.endOfFile() && (t = !0),
            a.length > 0 && this.unclosedBracket(i),
            t && r) {
                if (!o)
                    for (; s.length && (c = s[s.length - 1][0],
                    !(c !== `space` && c !== `comment`)); )
                        this.tokenizer.back(s.pop());
                this.decl(s, o)
            } else
                this.unknownWord(s)
        }
        parse() {
            let e;
            for (; !this.tokenizer.endOfFile(); )
                switch (e = this.tokenizer.nextToken(),
                e[0]) {
                case `space`:
                    this.spaces += e[1];
                    break;
                case `;`:
                    this.freeSemicolon(e);
                    break;
                case `}`:
                    this.end(e);
                    break;
                case `comment`:
                    this.comment(e);
                    break;
                case `at-word`:
                    this.atrule(e);
                    break;
                case `{`:
                    this.emptyRule(e);
                    break;
                default:
                    this.other(e);
                    break
                }
            this.endFile()
        }
        precheckMissedSemicolon() {}
        raw(e, t, n, r) {
            let i, a, s = n.length, c = ``, l = !0, u, d;
            for (let e = 0; e < s; e += 1)
                i = n[e],
                a = i[0],
                a === `space` && e === s - 1 && !r ? l = !1 : a === `comment` ? (d = n[e - 1] ? n[e - 1][0] : `empty`,
                u = n[e + 1] ? n[e + 1][0] : `empty`,
                !o[d] && !o[u] ? c.slice(-1) === `,` ? l = !1 : c += i[1] : l = !1) : c += i[1];
            if (!l) {
                let r = n.reduce( (e, t) => e + t[1], ``);
                e.raws[t] = {
                    raw: r,
                    value: c
                }
            }
            e[t] = c
        }
        rule(e) {
            e.pop();
            let t = new a;
            this.init(t, e[0][2]),
            t.raws.between = this.spacesAndCommentsFromEnd(e),
            this.raw(t, `selector`, e),
            this.current = t
        }
        spacesAndCommentsFromEnd(e) {
            let t, n = ``;
            for (; e.length && (t = e[e.length - 1][0],
            !(t !== `space` && t !== `comment`)); )
                n = e.pop()[1] + n;
            return n
        }
        spacesAndCommentsFromStart(e) {
            let t, n = ``;
            for (; e.length && (t = e[0][0],
            !(t !== `space` && t !== `comment`)); )
                n += e.shift()[1];
            return n
        }
        spacesFromEnd(e) {
            let t, n = ``;
            for (; e.length && (t = e[e.length - 1][0],
            t === `space`); )
                n = e.pop()[1] + n;
            return n
        }
        stringFrom(e, t) {
            let n = ``;
            for (let r = t; r < e.length; r++)
                n += e[r][1];
            return e.splice(t, e.length - t),
            n
        }
        unclosedBlock() {
            let e = this.current.source.start;
            throw this.input.error(`Unclosed block`, e.line, e.column)
        }
        unclosedBracket(e) {
            throw this.input.error(`Unclosed bracket`, {
                offset: e[2]
            }, {
                offset: e[2] + 1
            })
        }
        unexpectedClose(e) {
            throw this.input.error(`Unexpected }`, {
                offset: e[2]
            }, {
                offset: e[2] + 1
            })
        }
        unknownWord(e) {
            throw this.input.error(`Unknown word`, {
                offset: e[0][2]
            }, {
                offset: e[0][2] + e[0][1].length
            })
        }
        unnamedAtrule(e, t) {
            throw this.input.error(`At-rule without name`, {
                offset: t[2]
            }, {
                offset: t[2] + t[1].length
            })
        }
    }
    return ld = c,
    ld
}
var fd, pd;
function md() {
    if (pd)
        return fd;
    pd = 1;
    let e = Fu()
      , t = dd()
      , n = Eu();
    function r(e, r) {
        let i = new t(new n(e,r));
        try {
            i.parse()
        } catch (e) {
            throw e
        }
        return i.root
    }
    return fd = r,
    r.default = r,
    e.registerParse(r),
    fd
}
var hd, gd;
function _d() {
    if (gd)
        return hd;
    gd = 1;
    let {isClean: e, my: t} = au()
      , n = ku()
      , r = du()
      , i = Fu()
      , a = Ru();
    Vu();
    let o = qu()
      , s = md()
      , c = nd()
      , l = {
        atrule: `AtRule`,
        comment: `Comment`,
        decl: `Declaration`,
        document: `Document`,
        root: `Root`,
        rule: `Rule`
    }
      , u = {
        AtRule: !0,
        AtRuleExit: !0,
        Comment: !0,
        CommentExit: !0,
        Declaration: !0,
        DeclarationExit: !0,
        Document: !0,
        DocumentExit: !0,
        Once: !0,
        OnceExit: !0,
        postcssPlugin: !0,
        prepare: !0,
        Root: !0,
        RootExit: !0,
        Rule: !0,
        RuleExit: !0
    }
      , d = {
        Once: !0,
        postcssPlugin: !0,
        prepare: !0
    };
    function f(e) {
        return typeof e == `object` && typeof e.then == `function`
    }
    function p(e) {
        let t = !1
          , n = l[e.type];
        return e.type === `decl` ? t = e.prop.toLowerCase() : e.type === `atrule` && (t = e.name.toLowerCase()),
        t && e.append ? [n, n + `-` + t, 0, n + `Exit`, n + `Exit-` + t] : t ? [n, n + `-` + t, n + `Exit`, n + `Exit-` + t] : e.append ? [n, 0, n + `Exit`] : [n, n + `Exit`]
    }
    function m(e) {
        let t;
        return t = e.type === `document` ? [`Document`, 0, `DocumentExit`] : e.type === `root` ? [`Root`, 0, `RootExit`] : p(e),
        {
            eventIndex: 0,
            events: t,
            iterator: 0,
            node: e,
            visitorIndex: 0,
            visitors: []
        }
    }
    function h(t) {
        return t[e] = !1,
        t.nodes && t.nodes.forEach(e => h(e)),
        t
    }
    let g = {};
    class _ {
        constructor(e, n, r) {
            this.stringified = !1,
            this.processed = !1;
            let a;
            if (typeof n == `object` && n && (n.type === `root` || n.type === `document`))
                a = h(n);
            else if (n instanceof _ || n instanceof o)
                a = h(n.root),
                n.map && (r.map === void 0 && (r.map = {}),
                r.map.inline || (r.map.inline = !1),
                r.map.prev = n.map);
            else {
                let e = s;
                r.syntax && (e = r.syntax.parse),
                r.parser && (e = r.parser),
                e.parse && (e = e.parse);
                try {
                    a = e(n, r)
                } catch (e) {
                    this.processed = !0,
                    this.error = e
                }
                a && !a[t] && i.rebuild(a)
            }
            this.result = new o(e,a,r),
            this.helpers = {
                ...g,
                postcss: g,
                result: this.result
            },
            this.plugins = this.processor.plugins.map(e => typeof e == `object` && e.prepare ? {
                ...e,
                ...e.prepare(this.result)
            } : e)
        }
        async() {
            return this.error ? Promise.reject(this.error) : this.processed ? Promise.resolve(this.result) : (this.processing ||= this.runAsync(),
            this.processing)
        }
        catch(e) {
            return this.async().catch(e)
        }
        finally(e) {
            return this.async().then(e, e)
        }
        getAsyncError() {
            throw Error(`Use process(css).then(cb) to work with async plugins`)
        }
        handleError(e, t) {
            let n = this.result.lastPlugin;
            try {
                t && t.addToError(e),
                this.error = e,
                e.name === `CssSyntaxError` && !e.plugin ? (e.plugin = n.postcssPlugin,
                e.setMessage()) : n.postcssVersion
            } catch (e) {
                console && console.error && console.error(e)
            }
            return e
        }
        prepareVisitors() {
            this.listeners = {};
            let e = (e, t, n) => {
                this.listeners[t] || (this.listeners[t] = []),
                this.listeners[t].push([e, n])
            }
            ;
            for (let t of this.plugins)
                if (typeof t == `object`)
                    for (let n in t) {
                        if (!u[n] && /^[A-Z]/.test(n))
                            throw Error(`Unknown event ${n} in ${t.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`);
                        if (!d[n])
                            if (typeof t[n] == `object`)
                                for (let r in t[n])
                                    r === `*` ? e(t, n, t[n][r]) : e(t, n + `-` + r.toLowerCase(), t[n][r]);
                            else
                                typeof t[n] == `function` && e(t, n, t[n])
                    }
            this.hasListener = Object.keys(this.listeners).length > 0
        }
        async runAsync() {
            this.plugin = 0;
            for (let e = 0; e < this.plugins.length; e++) {
                let t = this.plugins[e]
                  , n = this.runOnRoot(t);
                if (f(n))
                    try {
                        await n
                    } catch (e) {
                        throw this.handleError(e)
                    }
            }
            if (this.prepareVisitors(),
            this.hasListener) {
                let t = this.result.root;
                for (; !t[e]; ) {
                    t[e] = !0;
                    let n = [m(t)];
                    for (; n.length > 0; ) {
                        let e = this.visitTick(n);
                        if (f(e))
                            try {
                                await e
                            } catch (e) {
                                let t = n[n.length - 1].node;
                                throw this.handleError(e, t)
                            }
                    }
                }
                if (this.listeners.OnceExit)
                    for (let[e,n] of this.listeners.OnceExit) {
                        this.result.lastPlugin = e;
                        try {
                            if (t.type === `document`) {
                                let e = t.nodes.map(e => n(e, this.helpers));
                                await Promise.all(e)
                            } else
                                await n(t, this.helpers)
                        } catch (e) {
                            throw this.handleError(e)
                        }
                    }
            }
            return this.processed = !0,
            this.stringify()
        }
        runOnRoot(e) {
            this.result.lastPlugin = e;
            try {
                if (typeof e == `object` && e.Once) {
                    if (this.result.root.type === `document`) {
                        let t = this.result.root.nodes.map(t => e.Once(t, this.helpers));
                        return f(t[0]) ? Promise.all(t) : t
                    }
                    return e.Once(this.result.root, this.helpers)
                } else if (typeof e == `function`)
                    return e(this.result.root, this.result)
            } catch (e) {
                throw this.handleError(e)
            }
        }
        stringify() {
            if (this.error)
                throw this.error;
            if (this.stringified)
                return this.result;
            this.stringified = !0,
            this.sync();
            let e = this.result.opts
              , t = r;
            e.syntax && (t = e.syntax.stringify),
            e.stringifier && (t = e.stringifier),
            t.stringify && (t = t.stringify);
            let i = new n(t,this.result.root,this.result.opts).generate();
            return this.result.css = i[0],
            this.result.map = i[1],
            this.result
        }
        sync() {
            if (this.error)
                throw this.error;
            if (this.processed)
                return this.result;
            if (this.processed = !0,
            this.processing)
                throw this.getAsyncError();
            for (let e of this.plugins)
                if (f(this.runOnRoot(e)))
                    throw this.getAsyncError();
            if (this.prepareVisitors(),
            this.hasListener) {
                let t = this.result.root;
                for (; !t[e]; )
                    t[e] = !0,
                    this.walkSync(t);
                if (this.listeners.OnceExit)
                    if (t.type === `document`)
                        for (let e of t.nodes)
                            this.visitSync(this.listeners.OnceExit, e);
                    else
                        this.visitSync(this.listeners.OnceExit, t)
            }
            return this.result
        }
        then(e, t) {
            return this.async().then(e, t)
        }
        toString() {
            return this.css
        }
        visitSync(e, t) {
            for (let[n,r] of e) {
                this.result.lastPlugin = n;
                let e;
                try {
                    e = r(t, this.helpers)
                } catch (e) {
                    throw this.handleError(e, t.proxyOf)
                }
                if (t.type !== `root` && t.type !== `document` && !t.parent)
                    return !0;
                if (f(e))
                    throw this.getAsyncError()
            }
        }
        visitTick(t) {
            let n = t[t.length - 1]
              , {node: r, visitors: i} = n;
            if (r.type !== `root` && r.type !== `document` && !r.parent) {
                t.pop();
                return
            }
            if (i.length > 0 && n.visitorIndex < i.length) {
                let[e,t] = i[n.visitorIndex];
                n.visitorIndex += 1,
                n.visitorIndex === i.length && (n.visitors = [],
                n.visitorIndex = 0),
                this.result.lastPlugin = e;
                try {
                    return t(r.toProxy(), this.helpers)
                } catch (e) {
                    throw this.handleError(e, r)
                }
            }
            if (n.iterator !== 0) {
                let i = n.iterator, a;
                for (; a = r.nodes[r.indexes[i]]; )
                    if (r.indexes[i] += 1,
                    !a[e]) {
                        a[e] = !0,
                        t.push(m(a));
                        return
                    }
                n.iterator = 0,
                delete r.indexes[i]
            }
            let a = n.events;
            for (; n.eventIndex < a.length; ) {
                let t = a[n.eventIndex];
                if (n.eventIndex += 1,
                t === 0) {
                    r.nodes && r.nodes.length && (r[e] = !0,
                    n.iterator = r.getIterator());
                    return
                } else if (this.listeners[t]) {
                    n.visitors = this.listeners[t];
                    return
                }
            }
            t.pop()
        }
        walkSync(t) {
            t[e] = !0;
            let n = p(t);
            for (let r of n)
                if (r === 0)
                    t.nodes && t.each(t => {
                        t[e] || this.walkSync(t)
                    }
                    );
                else {
                    let e = this.listeners[r];
                    if (e && this.visitSync(e, t.toProxy()))
                        return
                }
        }
        warnings() {
            return this.sync().warnings()
        }
        get content() {
            return this.stringify().content
        }
        get css() {
            return this.stringify().css
        }
        get map() {
            return this.stringify().map
        }
        get messages() {
            return this.sync().messages
        }
        get opts() {
            return this.result.opts
        }
        get processor() {
            return this.result.processor
        }
        get root() {
            return this.sync().root
        }
        get[Symbol.toStringTag]() {
            return `LazyResult`
        }
    }
    return _.registerPostcss = e => {
        g = e
    }
    ,
    hd = _,
    _.default = _,
    c.registerLazyResult(_),
    a.registerLazyResult(_),
    hd
}
var vd, yd;
function bd() {
    if (yd)
        return vd;
    yd = 1;
    let e = ku()
      , t = du();
    Vu();
    let n = md()
      , r = qu();
    class i {
        constructor(n, i, a) {
            i = i.toString(),
            this.stringified = !1,
            this._processor = n,
            this._css = i,
            this._opts = a,
            this._map = void 0;
            let o = t;
            this.result = new r(this._processor,void 0,this._opts),
            this.result.css = i;
            let s = this;
            Object.defineProperty(this.result, "root", {
                get() {
                    return s.root
                }
            });
            let c = new e(o,void 0,this._opts,i);
            if (c.isMap()) {
                let[e,t] = c.generate();
                e && (this.result.css = e),
                t && (this.result.map = t)
            } else
                c.clearAnnotation(),
                this.result.css = c.css
        }
        async() {
            return this.error ? Promise.reject(this.error) : Promise.resolve(this.result)
        }
        catch(e) {
            return this.async().catch(e)
        }
        finally(e) {
            return this.async().then(e, e)
        }
        sync() {
            if (this.error)
                throw this.error;
            return this.result
        }
        then(e, t) {
            return this.async().then(e, t)
        }
        toString() {
            return this._css
        }
        warnings() {
            return []
        }
        get content() {
            return this.result.css
        }
        get css() {
            return this.result.css
        }
        get map() {
            return this.result.map
        }
        get messages() {
            return []
        }
        get opts() {
            return this.result.opts
        }
        get processor() {
            return this.result.processor
        }
        get root() {
            if (this._root)
                return this._root;
            let e, t = n;
            try {
                e = t(this._css, this._opts)
            } catch (e) {
                this.error = e
            }
            if (this.error)
                throw this.error;
            return this._root = e,
            e
        }
        get[Symbol.toStringTag]() {
            return `NoWorkResult`
        }
    }
    return vd = i,
    i.default = i,
    vd
}
var xd, Sd;
function Cd() {
    if (Sd)
        return xd;
    Sd = 1;
    let e = bd()
      , t = _d()
      , n = Ru()
      , r = nd();
    class i {
        constructor(e=[]) {
            this.version = `8.4.38`,
            this.plugins = this.normalize(e)
        }
        normalize(e) {
            let t = [];
            for (let n of e)
                if (n.postcss === !0 ? n = n() : n.postcss && (n = n.postcss),
                typeof n == `object` && Array.isArray(n.plugins))
                    t = t.concat(n.plugins);
                else if (typeof n == `object` && n.postcssPlugin)
                    t.push(n);
                else if (typeof n == `function`)
                    t.push(n);
                else if (!(typeof n == `object` && (n.parse || n.stringify)))
                    throw Error(n + ` is not a PostCSS plugin`);
            return t
        }
        process(n, r={}) {
            return !this.plugins.length && !r.parser && !r.stringifier && !r.syntax ? new e(this,n,r) : new t(this,n,r)
        }
        use(e) {
            return this.plugins = this.plugins.concat(this.normalize([e])),
            this
        }
    }
    return xd = i,
    i.default = i,
    r.registerProcessor(i),
    n.registerProcessor(i),
    xd
}
var wd, Td;
function Ed() {
    if (Td)
        return wd;
    Td = 1;
    let e = _u()
      , t = Cu()
      , n = Mu()
      , r = $u()
      , i = Eu()
      , a = nd()
      , o = cd();
    function s(c, l) {
        if (Array.isArray(c))
            return c.map(e => s(e));
        let {inputs: u, ...d} = c;
        if (u) {
            l = [];
            for (let e of u) {
                let n = {
                    ...e,
                    __proto__: i.prototype
                };
                n.map &&= {
                    ...n.map,
                    __proto__: t.prototype
                },
                l.push(n)
            }
        }
        if (d.nodes &&= c.nodes.map(e => s(e, l)),
        d.source) {
            let {inputId: e, ...t} = d.source;
            d.source = t,
            e != null && (d.source.input = l[e])
        }
        if (d.type === `root`)
            return new a(d);
        if (d.type === `decl`)
            return new e(d);
        if (d.type === `rule`)
            return new o(d);
        if (d.type === `comment`)
            return new n(d);
        if (d.type === `atrule`)
            return new r(d);
        throw Error(`Unknown node type: ` + c.type)
    }
    return wd = s,
    s.default = s,
    wd
}
var Dd, Od;
function kd() {
    if (Od)
        return Dd;
    Od = 1;
    let e = nu()
      , t = _u()
      , n = _d()
      , r = Fu()
      , i = Cd()
      , a = du()
      , o = Ed()
      , s = Ru()
      , c = Wu()
      , l = Mu()
      , u = $u()
      , d = qu()
      , f = Eu()
      , p = md()
      , m = ad()
      , h = cd()
      , g = nd()
      , _ = mu();
    function v(...e) {
        return e.length === 1 && Array.isArray(e[0]) && (e = e[0]),
        new i(e)
    }
    return v.plugin = function(e, t) {
        let n = !1;
        function r(...r) {
            console && console.warn && !n && (n = !0,
            console.warn(e + `: postcss.plugin was deprecated. Migration guide:
https://evilmartians.com/chronicles/postcss-8-plugin-migration`),
            {}.LANG && {}.LANG.startsWith(`cn`) && console.warn(e + `: 里面 postcss.plugin 被弃用. 迁移指南:
https://www.w3ctech.com/topic/2226`));
            let a = t(...r);
            return a.postcssPlugin = e,
            a.postcssVersion = new i().version,
            a
        }
        let a;
        return Object.defineProperty(r, "postcss", {
            get() {
                return a ||= r(),
                a
            }
        }),
        r.process = function(e, t, n) {
            return v([r(n)]).process(e, t)
        }
        ,
        r
    }
    ,
    v.stringify = a,
    v.parse = p,
    v.fromJSON = o,
    v.list = m,
    v.comment = e => new l(e),
    v.atRule = e => new u(e),
    v.decl = e => new t(e),
    v.rule = e => new h(e),
    v.root = e => new g(e),
    v.document = e => new s(e),
    v.CssSyntaxError = e,
    v.Declaration = t,
    v.Container = r,
    v.Processor = i,
    v.Document = s,
    v.Comment = l,
    v.Warning = c,
    v.AtRule = u,
    v.Result = d,
    v.Input = f,
    v.Rule = h,
    v.Root = g,
    v.Node = _,
    n.registerPostcss(v),
    Dd = v,
    v.default = v,
    Dd
}
var W = Jl(kd());
W.stringify,
W.fromJSON,
W.plugin,
W.parse,
W.list,
W.document,
W.comment,
W.atRule,
W.rule,
W.decl,
W.root,
W.CssSyntaxError,
W.Declaration,
W.Container,
W.Processor,
W.Document,
W.Comment,
W.Warning,
W.AtRule,
W.Result,
W.Input,
W.Rule,
W.Root,
W.Node;
var Ad = class e {
    constructor(...e) {
        ql(this, `parentElement`, null),
        ql(this, `parentNode`, null),
        ql(this, `ownerDocument`),
        ql(this, `firstChild`, null),
        ql(this, `lastChild`, null),
        ql(this, `previousSibling`, null),
        ql(this, `nextSibling`, null),
        ql(this, `ELEMENT_NODE`, 1),
        ql(this, `TEXT_NODE`, 3),
        ql(this, `nodeType`),
        ql(this, `nodeName`),
        ql(this, `RRNodeType`)
    }
    get childNodes() {
        let e = []
          , t = this.firstChild;
        for (; t; )
            e.push(t),
            t = t.nextSibling;
        return e
    }
    contains(t) {
        if (!(t instanceof e) || t.ownerDocument !== this.ownerDocument)
            return !1;
        if (t === this)
            return !0;
        for (; t.parentNode; ) {
            if (t.parentNode === this)
                return !0;
            t = t.parentNode
        }
        return !1
    }
    appendChild(e) {
        throw Error(`RRDomException: Failed to execute 'appendChild' on 'RRNode': This RRNode type does not support this method.`)
    }
    insertBefore(e, t) {
        throw Error(`RRDomException: Failed to execute 'insertBefore' on 'RRNode': This RRNode type does not support this method.`)
    }
    removeChild(e) {
        throw Error(`RRDomException: Failed to execute 'removeChild' on 'RRNode': This RRNode type does not support this method.`)
    }
    toString() {
        return `RRNode`
    }
}
  , jd = {
    Node: [`childNodes`, `parentNode`, `parentElement`, `textContent`, `ownerDocument`],
    ShadowRoot: [`host`, `styleSheets`],
    Element: [`shadowRoot`, `querySelector`, `querySelectorAll`],
    MutationObserver: []
}
  , Md = {
    Node: [`contains`, `getRootNode`],
    ShadowRoot: [`getSelection`],
    Element: [],
    MutationObserver: [`constructor`]
}
  , Nd = {};
function Pd() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
}
function Fd(e) {
    var t;
    let n = ((t = globalThis == null ? void 0 : globalThis.Zone)?.__symbol__)?.call(t, e);
    if (n && globalThis[n])
        return globalThis[n]
}
function Id(e) {
    if (Nd[e])
        return Nd[e];
    let t = Pd() && Fd(e) || globalThis[e]
      , n = t.prototype
      , r = e in jd ? jd[e] : void 0
      , i = !!(r && r.every(e => !!(Object.getOwnPropertyDescriptor(n, e)?.get)?.toString().includes(`[native code]`)))
      , a = e in Md ? Md[e] : void 0
      , o = !!(a && a.every(e => typeof n[e] == `function` && n[e]?.toString().includes(`[native code]`)))
      , s = i && o
      , c = t.prototype;
    if (!s) {
        let t;
        try {
            t = document.createElement(`iframe`),
            t.hidden = !0,
            document.body.appendChild(t);
            let n = t.contentWindow;
            if (n) {
                let t = n[e].prototype;
                t && (c = t)
            }
        } finally {
            t && document.body.removeChild(t)
        }
    }
    return Nd[e] = c,
    c
}
var Ld = {};
function Rd(e, t, n) {
    let r = `${e}.${String(n)}`;
    if (Ld[r])
        return Ld[r].call(t);
    let i = Id(e)
      , a = Object.getOwnPropertyDescriptor(i, n)?.get;
    return a ? (Ld[r] = a,
    a.call(t)) : t[n]
}
var zd = {};
function Bd(e, t, n) {
    let r = `${e}.${String(n)}`;
    if (zd[r])
        return zd[r].bind(t);
    let i = Id(e)[n];
    return typeof i == `function` ? (zd[r] = i,
    i.bind(t)) : t[n]
}
function Vd(e) {
    return Rd(`Node`, e, `ownerDocument`)
}
function Hd(e) {
    return Rd(`Node`, e, `childNodes`)
}
function Ud(e) {
    return Rd(`Node`, e, `parentNode`)
}
function Wd(e) {
    return Rd(`Node`, e, `parentElement`)
}
function Gd(e) {
    return Rd(`Node`, e, `textContent`)
}
function Kd(e, t) {
    return Bd(`Node`, e, `contains`)(t)
}
function qd(e) {
    return Bd(`Node`, e, `getRootNode`)()
}
function Jd(e) {
    return !e || !(`host` in e) ? null : Rd(`ShadowRoot`, e, `host`)
}
function Yd(e) {
    return e.styleSheets
}
function Xd(e) {
    return !e || !(`shadowRoot` in e) ? null : Rd(`Element`, e, `shadowRoot`)
}
function Zd(e, t) {
    return Rd(`Element`, e, `querySelector`)(t)
}
function Qd(e, t) {
    return Rd(`Element`, e, `querySelectorAll`)(t)
}
function $d() {
    return Id(`MutationObserver`).constructor
}
function ef(e, t, n) {
    try {
        if (!(t in e))
            return () => {}
            ;
        let r = e[t]
          , i = n(r);
        return typeof i == `function` && (i.prototype = i.prototype || {},
        Object.defineProperties(i, {
            __rrweb_original__: {
                enumerable: !1,
                value: r
            }
        })),
        e[t] = i,
        () => {
            e[t] = r
        }
    } catch {
        return () => {}
    }
}
var G = {
    ownerDocument: Vd,
    childNodes: Hd,
    parentNode: Ud,
    parentElement: Wd,
    textContent: Gd,
    contains: Kd,
    getRootNode: qd,
    host: Jd,
    styleSheets: Yd,
    shadowRoot: Xd,
    querySelector: Zd,
    querySelectorAll: Qd,
    mutationObserver: $d,
    patch: ef
};
function K(e, t, n=document) {
    let r = {
        capture: !0,
        passive: !0
    };
    return n.addEventListener(e, t, r),
    () => n.removeEventListener(e, t, r)
}
var tf = `Please stop import mirror directly. Instead of that,\r
now you can use replayer.getMirror() to access the mirror instance of a replayer,\r
or you can use record.mirror to access the mirror instance during recording.`
  , nf = {
    map: {},
    getId() {
        return console.error(tf),
        -1
    },
    getNode() {
        return console.error(tf),
        null
    },
    removeNodeFromMap() {
        console.error(tf)
    },
    has() {
        return console.error(tf),
        !1
    },
    reset() {
        console.error(tf)
    }
};
typeof window < `u` && window.Proxy && window.Reflect && (nf = new Proxy(nf,{
    get(e, t, n) {
        return t === `map` && console.error(tf),
        Reflect.get(e, t, n)
    }
}));
function rf(e, t, n={}) {
    let r = null
      , i = 0;
    return function(...a) {
        let o = Date.now();
        !i && n.leading === !1 && (i = o);
        let s = t - (o - i)
          , c = this;
        s <= 0 || s > t ? (r &&= (clearTimeout(r),
        null),
        i = o,
        e.apply(c, a)) : !r && n.trailing !== !1 && (r = setTimeout( () => {
            i = n.leading === !1 ? 0 : Date.now(),
            r = null,
            e.apply(c, a)
        }
        , s))
    }
}
function af(e, t, n, r, i=window) {
    let a = i.Object.getOwnPropertyDescriptor(e, t);
    return i.Object.defineProperty(e, t, r ? n : {
        set(e) {
            setTimeout( () => {
                n.set.call(this, e)
            }
            , 0),
            a && a.set && a.set.call(this, e)
        }
    }),
    () => af(e, t, a || {}, !0)
}
var of = Date.now;
/[1-9][0-9]{12}/.test(Date.now().toString()) || (of = () => new Date().getTime());
function sf(e) {
    let t = e.document;
    return {
        left: t.scrollingElement ? t.scrollingElement.scrollLeft : e.pageXOffset === void 0 ? t.documentElement.scrollLeft || t?.body && G.parentElement(t.body)?.scrollLeft || t?.body?.scrollLeft || 0 : e.pageXOffset,
        top: t.scrollingElement ? t.scrollingElement.scrollTop : e.pageYOffset === void 0 ? t?.documentElement.scrollTop || t?.body && G.parentElement(t.body)?.scrollTop || t?.body?.scrollTop || 0 : e.pageYOffset
    }
}
function cf() {
    return window.innerHeight || document.documentElement && document.documentElement.clientHeight || document.body && document.body.clientHeight
}
function lf() {
    return window.innerWidth || document.documentElement && document.documentElement.clientWidth || document.body && document.body.clientWidth
}
function uf(e) {
    return e ? e.nodeType === e.ELEMENT_NODE ? e : G.parentElement(e) : null
}
function q(e, t, n, r) {
    if (!e)
        return !1;
    let i = uf(e);
    if (!i)
        return !1;
    try {
        if (typeof t == `string`) {
            if (i.classList.contains(t) || r && i.closest(`.` + t) !== null)
                return !0
        } else if (Zs(i, t, r))
            return !0
    } catch {}
    return !!(n && (i.matches(n) || r && i.closest(n) !== null))
}
function df(e, t) {
    return t.getId(e) !== -1
}
function ff(e, t, n) {
    return e.tagName === `TITLE` && n.headTitleMutations ? !0 : t.getId(e) === Is
}
function pf(e, t) {
    if (cs(e))
        return !1;
    let n = t.getId(e);
    if (!t.has(n))
        return !0;
    let r = G.parentNode(e);
    return r && r.nodeType === e.DOCUMENT_NODE ? !1 : r ? pf(r, t) : !0
}
function mf(e) {
    return !!e.changedTouches
}
function hf(e=window) {
    `NodeList` in e && !e.NodeList.prototype.forEach && (e.NodeList.prototype.forEach = Array.prototype.forEach),
    `DOMTokenList` in e && !e.DOMTokenList.prototype.forEach && (e.DOMTokenList.prototype.forEach = Array.prototype.forEach)
}
function gf(e, t) {
    return !!(e.nodeName === `IFRAME` && t.getMeta(e))
}
function _f(e, t) {
    return !!(e.nodeName === `LINK` && e.nodeType === e.ELEMENT_NODE && e.getAttribute && e.getAttribute(`rel`) === `stylesheet` && t.getMeta(e))
}
function vf(e) {
    return e ? e instanceof Ad && `shadowRoot` in e ? !!e.shadowRoot : !!G.shadowRoot(e) : !1
}
var yf = class {
    constructor() {
        z(this, `id`, 1),
        z(this, `styleIDMap`, new WeakMap),
        z(this, `idStyleMap`, new Map)
    }
    getId(e) {
        return this.styleIDMap.get(e) ?? -1
    }
    has(e) {
        return this.styleIDMap.has(e)
    }
    add(e, t) {
        if (this.has(e))
            return this.getId(e);
        let n;
        return n = t === void 0 ? this.id++ : t,
        this.styleIDMap.set(e, n),
        this.idStyleMap.set(n, e),
        n
    }
    getStyle(e) {
        return this.idStyleMap.get(e) || null
    }
    reset() {
        this.styleIDMap = new WeakMap,
        this.idStyleMap = new Map,
        this.id = 1
    }
    generateId() {
        return this.id++
    }
}
;
function bf(e) {
    let t = null;
    return `getRootNode` in e && G.getRootNode(e)?.nodeType === Node.DOCUMENT_FRAGMENT_NODE && G.host(G.getRootNode(e)) && (t = G.host(G.getRootNode(e))),
    t
}
function xf(e) {
    let t = e, n;
    for (; n = bf(t); )
        t = n;
    return t
}
function Sf(e) {
    let t = G.ownerDocument(e);
    if (!t)
        return !1;
    let n = xf(e);
    return G.contains(t, n)
}
function Cf(e) {
    let t = G.ownerDocument(e);
    return t ? G.contains(t, e) || Sf(e) : !1
}
var J = (e => (e[e.DomContentLoaded = 0] = `DomContentLoaded`,
e[e.Load = 1] = `Load`,
e[e.FullSnapshot = 2] = `FullSnapshot`,
e[e.IncrementalSnapshot = 3] = `IncrementalSnapshot`,
e[e.Meta = 4] = `Meta`,
e[e.Custom = 5] = `Custom`,
e[e.Plugin = 6] = `Plugin`,
e))(J || {})
  , Y = (e => (e[e.Mutation = 0] = `Mutation`,
e[e.MouseMove = 1] = `MouseMove`,
e[e.MouseInteraction = 2] = `MouseInteraction`,
e[e.Scroll = 3] = `Scroll`,
e[e.ViewportResize = 4] = `ViewportResize`,
e[e.Input = 5] = `Input`,
e[e.TouchMove = 6] = `TouchMove`,
e[e.MediaInteraction = 7] = `MediaInteraction`,
e[e.StyleSheetRule = 8] = `StyleSheetRule`,
e[e.CanvasMutation = 9] = `CanvasMutation`,
e[e.Font = 10] = `Font`,
e[e.Log = 11] = `Log`,
e[e.Drag = 12] = `Drag`,
e[e.StyleDeclaration = 13] = `StyleDeclaration`,
e[e.Selection = 14] = `Selection`,
e[e.AdoptedStyleSheet = 15] = `AdoptedStyleSheet`,
e[e.CustomElement = 16] = `CustomElement`,
e))(Y || {})
  , X = (e => (e[e.MouseUp = 0] = `MouseUp`,
e[e.MouseDown = 1] = `MouseDown`,
e[e.Click = 2] = `Click`,
e[e.ContextMenu = 3] = `ContextMenu`,
e[e.DblClick = 4] = `DblClick`,
e[e.Focus = 5] = `Focus`,
e[e.Blur = 6] = `Blur`,
e[e.TouchStart = 7] = `TouchStart`,
e[e.TouchMove_Departed = 8] = `TouchMove_Departed`,
e[e.TouchEnd = 9] = `TouchEnd`,
e[e.TouchCancel = 10] = `TouchCancel`,
e))(X || {})
  , wf = (e => (e[e.Mouse = 0] = `Mouse`,
e[e.Pen = 1] = `Pen`,
e[e.Touch = 2] = `Touch`,
e))(wf || {})
  , Tf = (e => (e[e[`2D`] = 0] = `2D`,
e[e.WebGL = 1] = `WebGL`,
e[e.WebGL2 = 2] = `WebGL2`,
e))(Tf || {})
  , Ef = (e => (e[e.Play = 0] = `Play`,
e[e.Pause = 1] = `Pause`,
e[e.Seeked = 2] = `Seeked`,
e[e.VolumeChange = 3] = `VolumeChange`,
e[e.RateChange = 4] = `RateChange`,
e))(Ef || {})
  , Df = (e => (e[e.Document = 0] = `Document`,
e[e.DocumentType = 1] = `DocumentType`,
e[e.Element = 2] = `Element`,
e[e.Text = 3] = `Text`,
e[e.CDATA = 4] = `CDATA`,
e[e.Comment = 5] = `Comment`,
e))(Df || {});
function Of(e) {
    return `__ln` in e
}
var kf = class {
    constructor() {
        z(this, `length`, 0),
        z(this, `head`, null),
        z(this, `tail`, null)
    }
    get(e) {
        if (e >= this.length)
            throw Error(`Position outside of list range`);
        let t = this.head;
        for (let n = 0; n < e; n++)
            t = t?.next || null;
        return t
    }
    addNode(e) {
        let t = {
            value: e,
            previous: null,
            next: null
        };
        if (e.__ln = t,
        e.previousSibling && Of(e.previousSibling)) {
            let n = e.previousSibling.__ln.next;
            t.next = n,
            t.previous = e.previousSibling.__ln,
            e.previousSibling.__ln.next = t,
            n && (n.previous = t)
        } else if (e.nextSibling && Of(e.nextSibling) && e.nextSibling.__ln.previous) {
            let n = e.nextSibling.__ln.previous;
            t.previous = n,
            t.next = e.nextSibling.__ln,
            e.nextSibling.__ln.previous = t,
            n && (n.next = t)
        } else
            this.head && (this.head.previous = t),
            t.next = this.head,
            this.head = t;
        t.next === null && (this.tail = t),
        this.length++
    }
    removeNode(e) {
        let t = e.__ln;
        this.head && (t.previous ? (t.previous.next = t.next,
        t.next ? t.next.previous = t.previous : this.tail = t.previous) : (this.head = t.next,
        this.head ? this.head.previous = null : this.tail = null),
        e.__ln && delete e.__ln,
        this.length--)
    }
}
  , Af = (e, t) => `${e}@${t}`
  , jf = class {
    constructor() {
        z(this, `frozen`, !1),
        z(this, `locked`, !1),
        z(this, `texts`, []),
        z(this, `attributes`, []),
        z(this, `attributeMap`, new WeakMap),
        z(this, `removes`, []),
        z(this, `mapRemoves`, []),
        z(this, `movedMap`, {}),
        z(this, `addedSet`, new Set),
        z(this, `movedSet`, new Set),
        z(this, `droppedSet`, new Set),
        z(this, `removesSubTreeCache`, new Set),
        z(this, `mutationCb`),
        z(this, `blockClass`),
        z(this, `blockSelector`),
        z(this, `maskTextClass`),
        z(this, `maskTextSelector`),
        z(this, `inlineStylesheet`),
        z(this, `maskInputOptions`),
        z(this, `maskTextFn`),
        z(this, `maskInputFn`),
        z(this, `keepIframeSrcFn`),
        z(this, `recordCanvas`),
        z(this, `inlineImages`),
        z(this, `slimDOMOptions`),
        z(this, `dataURLOptions`),
        z(this, `doc`),
        z(this, `mirror`),
        z(this, `iframeManager`),
        z(this, `stylesheetManager`),
        z(this, `shadowDomManager`),
        z(this, `canvasManager`),
        z(this, `processedNodeManager`),
        z(this, `unattachedDoc`),
        z(this, `processMutations`, e => {
            e.forEach(this.processMutation),
            this.emit()
        }
        ),
        z(this, `emit`, () => {
            if (this.frozen || this.locked)
                return;
            let e = []
              , t = new Set
              , n = new kf
              , r = e => {
                let t = e
                  , n = Is;
                for (; n === Is; )
                    t &&= t.nextSibling,
                    n = t && this.mirror.getId(t);
                return n
            }
              , i = i => {
                let a = G.parentNode(i);
                if (!a || !Cf(i))
                    return;
                let o = !1;
                if (i.nodeType === Node.TEXT_NODE) {
                    let e = a.tagName;
                    if (e === `TEXTAREA`)
                        return;
                    e === `STYLE` && this.addedSet.has(a) && (o = !0)
                }
                let s = cs(a) ? this.mirror.getId(bf(i)) : this.mirror.getId(a)
                  , c = r(i);
                if (s === -1 || c === -1)
                    return n.addNode(i);
                let l = sc(i, {
                    doc: this.doc,
                    mirror: this.mirror,
                    blockClass: this.blockClass,
                    blockSelector: this.blockSelector,
                    maskTextClass: this.maskTextClass,
                    maskTextSelector: this.maskTextSelector,
                    skipChild: !0,
                    newlyAddedElement: !0,
                    inlineStylesheet: this.inlineStylesheet,
                    maskInputOptions: this.maskInputOptions,
                    maskTextFn: this.maskTextFn,
                    maskInputFn: this.maskInputFn,
                    slimDOMOptions: this.slimDOMOptions,
                    dataURLOptions: this.dataURLOptions,
                    recordCanvas: this.recordCanvas,
                    inlineImages: this.inlineImages,
                    onSerialize: e => {
                        gf(e, this.mirror) && this.iframeManager.addIframe(e),
                        _f(e, this.mirror) && this.stylesheetManager.trackLinkElement(e),
                        vf(i) && this.shadowDomManager.addShadowRoot(G.shadowRoot(i), this.doc)
                    }
                    ,
                    onIframeLoad: (e, t) => {
                        this.iframeManager.attachIframe(e, t),
                        this.shadowDomManager.observeAttachShadow(e)
                    }
                    ,
                    onStylesheetLoad: (e, t) => {
                        this.stylesheetManager.attachLinkElement(e, t)
                    }
                    ,
                    cssCaptured: o
                });
                l && (e.push({
                    parentId: s,
                    nextId: c,
                    node: l
                }),
                t.add(l.id))
            }
            ;
            for (; this.mapRemoves.length; )
                this.mirror.removeNodeFromMap(this.mapRemoves.shift());
            for (let e of this.movedSet)
                Pf(this.removesSubTreeCache, e, this.mirror) && !this.movedSet.has(G.parentNode(e)) || i(e);
            for (let e of this.addedSet)
                !If(this.droppedSet, e) && !Pf(this.removesSubTreeCache, e, this.mirror) || If(this.movedSet, e) ? i(e) : this.droppedSet.add(e);
            let a = null;
            for (; n.length; ) {
                let e = null;
                if (a) {
                    let t = this.mirror.getId(G.parentNode(a.value))
                      , n = r(a.value);
                    t !== -1 && n !== -1 && (e = a)
                }
                if (!e) {
                    let t = n.tail;
                    for (; t; ) {
                        let n = t;
                        if (t = t.previous,
                        n) {
                            let t = this.mirror.getId(G.parentNode(n.value));
                            if (r(n.value) === -1)
                                continue;
                            if (t !== -1) {
                                e = n;
                                break
                            } else {
                                let t = n.value
                                  , r = G.parentNode(t);
                                if (r && r.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                                    let t = G.host(r);
                                    if (this.mirror.getId(t) !== -1) {
                                        e = n;
                                        break
                                    }
                                }
                            }
                        }
                    }
                }
                if (!e) {
                    for (; n.head; )
                        n.removeNode(n.head.value);
                    break
                }
                a = e.previous,
                n.removeNode(e.value),
                i(e.value)
            }
            let o = {
                texts: this.texts.map(e => {
                    let t = e.node
                      , n = G.parentNode(t);
                    return n && n.tagName === `TEXTAREA` && this.genTextAreaValueMutation(n),
                    {
                        id: this.mirror.getId(t),
                        value: e.value
                    }
                }
                ).filter(e => !t.has(e.id)).filter(e => this.mirror.has(e.id)),
                attributes: this.attributes.map(e => {
                    let {attributes: t} = e;
                    if (typeof t.style == `string`) {
                        let n = JSON.stringify(e.styleDiff)
                          , r = JSON.stringify(e._unchangedStyles);
                        n.length < t.style.length && (n + r).split(`var(`).length === t.style.split(`var(`).length && (t.style = e.styleDiff)
                    }
                    return {
                        id: this.mirror.getId(e.node),
                        attributes: t
                    }
                }
                ).filter(e => !t.has(e.id)).filter(e => this.mirror.has(e.id)),
                removes: this.removes,
                adds: e
            };
            !o.texts.length && !o.attributes.length && !o.removes.length && !o.adds.length || (this.texts = [],
            this.attributes = [],
            this.attributeMap = new WeakMap,
            this.removes = [],
            this.addedSet = new Set,
            this.movedSet = new Set,
            this.droppedSet = new Set,
            this.removesSubTreeCache = new Set,
            this.movedMap = {},
            this.mutationCb(o))
        }
        ),
        z(this, `genTextAreaValueMutation`, e => {
            let t = this.attributeMap.get(e);
            t || (t = {
                node: e,
                attributes: {},
                styleDiff: {},
                _unchangedStyles: {}
            },
            this.attributes.push(t),
            this.attributeMap.set(e, t));
            let n = Array.from(G.childNodes(e), e => G.textContent(e) || ``).join(``);
            t.attributes.value = ys({
                element: e,
                maskInputOptions: this.maskInputOptions,
                tagName: e.tagName,
                type: Cs(e),
                value: n,
                maskInputFn: this.maskInputFn
            })
        }
        ),
        z(this, `processMutation`, e => {
            if (!ff(e.target, this.mirror, this.slimDOMOptions))
                switch (e.type) {
                case `characterData`:
                    {
                        let t = G.textContent(e.target);
                        !q(e.target, this.blockClass, this.blockSelector, !1) && t !== e.oldValue && this.texts.push({
                            value: Qs(e.target, this.maskTextClass, this.maskTextSelector, !0) && t ? this.maskTextFn ? this.maskTextFn(t, uf(e.target)) : t.replace(/[\S]/g, `*`) : t,
                            node: e.target
                        });
                        break
                    }
                case `attributes`:
                    {
                        let t = e.target
                          , n = e.attributeName
                          , r = e.target.getAttribute(n);
                        if (n === `value`) {
                            let e = Cs(t);
                            r = ys({
                                element: t,
                                maskInputOptions: this.maskInputOptions,
                                tagName: t.tagName,
                                type: e,
                                value: r,
                                maskInputFn: this.maskInputFn
                            })
                        }
                        if (q(e.target, this.blockClass, this.blockSelector, !1) || r === e.oldValue)
                            return;
                        let i = this.attributeMap.get(e.target);
                        if (t.tagName === `IFRAME` && n === `src` && !this.keepIframeSrcFn(r))
                            if (!t.contentDocument)
                                n = `rr_src`;
                            else
                                return;
                        if (i || (i = {
                            node: e.target,
                            attributes: {},
                            styleDiff: {},
                            _unchangedStyles: {}
                        },
                        this.attributes.push(i),
                        this.attributeMap.set(e.target, i)),
                        n === `type` && t.tagName === `INPUT` && (e.oldValue || ``).toLowerCase() === `password` && t.setAttribute(`data-rr-is-password`, `true`),
                        !Ys(t.tagName, n))
                            if (i.attributes[n] = Js(this.doc, bs(t.tagName), bs(n), r),
                            n === `style`) {
                                if (!this.unattachedDoc)
                                    try {
                                        this.unattachedDoc = document.implementation.createHTMLDocument()
                                    } catch {
                                        this.unattachedDoc = this.doc
                                    }
                                let n = this.unattachedDoc.createElement(`span`);
                                e.oldValue && n.setAttribute(`style`, e.oldValue);
                                for (let e of Array.from(t.style)) {
                                    let r = t.style.getPropertyValue(e)
                                      , a = t.style.getPropertyPriority(e);
                                    r !== n.style.getPropertyValue(e) || a !== n.style.getPropertyPriority(e) ? a === `` ? i.styleDiff[e] = r : i.styleDiff[e] = [r, a] : i._unchangedStyles[e] = [r, a]
                                }
                                for (let e of Array.from(n.style))
                                    t.style.getPropertyValue(e) === `` && (i.styleDiff[e] = !1)
                            } else
                                n === `open` && t.tagName === `DIALOG` && (t.matches(`dialog:modal`) ? i.attributes.rr_open_mode = `modal` : i.attributes.rr_open_mode = `non-modal`);
                        break
                    }
                case `childList`:
                    if (q(e.target, this.blockClass, this.blockSelector, !0))
                        return;
                    if (e.target.tagName === `TEXTAREA`) {
                        this.genTextAreaValueMutation(e.target);
                        return
                    }
                    e.addedNodes.forEach(t => this.genAdds(t, e.target)),
                    e.removedNodes.forEach(t => {
                        let n = this.mirror.getId(t)
                          , r = cs(e.target) ? this.mirror.getId(G.host(e.target)) : this.mirror.getId(e.target);
                        q(e.target, this.blockClass, this.blockSelector, !1) || ff(t, this.mirror, this.slimDOMOptions) || !df(t, this.mirror) || (this.addedSet.has(t) ? (Mf(this.addedSet, t),
                        this.droppedSet.add(t)) : this.addedSet.has(e.target) && n === -1 || pf(e.target, this.mirror) || (this.movedSet.has(t) && this.movedMap[Af(n, r)] ? Mf(this.movedSet, t) : (this.removes.push({
                            parentId: r,
                            id: n,
                            isShadow: cs(e.target) && ls(e.target) ? !0 : void 0
                        }),
                        Nf(t, this.removesSubTreeCache))),
                        this.mapRemoves.push(t))
                    }
                    );
                    break
                }
        }
        ),
        z(this, `genAdds`, (e, t) => {
            if (!this.processedNodeManager.inOtherBuffer(e, this) && !(this.addedSet.has(e) || this.movedSet.has(e))) {
                if (this.mirror.hasNode(e)) {
                    if (ff(e, this.mirror, this.slimDOMOptions))
                        return;
                    this.movedSet.add(e);
                    let n = null;
                    t && this.mirror.hasNode(t) && (n = this.mirror.getId(t)),
                    n && n !== -1 && (this.movedMap[Af(this.mirror.getId(e), n)] = !0)
                } else
                    this.addedSet.add(e),
                    this.droppedSet.delete(e);
                q(e, this.blockClass, this.blockSelector, !1) || (G.childNodes(e).forEach(e => this.genAdds(e)),
                vf(e) && G.childNodes(G.shadowRoot(e)).forEach(t => {
                    this.processedNodeManager.add(t, this),
                    this.genAdds(t, e)
                }
                ))
            }
        }
        )
    }
    init(e) {
        [`mutationCb`, `blockClass`, `blockSelector`, `maskTextClass`, `maskTextSelector`, `inlineStylesheet`, `maskInputOptions`, `maskTextFn`, `maskInputFn`, `keepIframeSrcFn`, `recordCanvas`, `inlineImages`, `slimDOMOptions`, `dataURLOptions`, `doc`, `mirror`, `iframeManager`, `stylesheetManager`, `shadowDomManager`, `canvasManager`, `processedNodeManager`].forEach(t => {
            this[t] = e[t]
        }
        )
    }
    freeze() {
        this.frozen = !0,
        this.canvasManager.freeze()
    }
    unfreeze() {
        this.frozen = !1,
        this.canvasManager.unfreeze(),
        this.emit()
    }
    isFrozen() {
        return this.frozen
    }
    lock() {
        this.locked = !0,
        this.canvasManager.lock()
    }
    unlock() {
        this.locked = !1,
        this.canvasManager.unlock(),
        this.emit()
    }
    reset() {
        this.shadowDomManager.reset(),
        this.canvasManager.reset()
    }
}
;
function Mf(e, t) {
    e.delete(t),
    G.childNodes(t).forEach(t => Mf(e, t))
}
function Nf(e, t) {
    let n = [e];
    for (; n.length; ) {
        let e = n.pop();
        t.has(e) || (t.add(e),
        G.childNodes(e).forEach(e => n.push(e)))
    }
}
function Pf(e, t, n) {
    return e.size === 0 ? !1 : Ff(e, t)
}
function Ff(e, t, n) {
    let r = G.parentNode(t);
    return r ? e.has(r) : !1
}
function If(e, t) {
    return e.size === 0 ? !1 : Lf(e, t)
}
function Lf(e, t) {
    let n = G.parentNode(t);
    return n ? e.has(n) ? !0 : Lf(e, n) : !1
}
var Rf;
function zf(e) {
    Rf = e
}
function Bf() {
    Rf = void 0
}
var Z = e => Rf ? (...t) => {
    try {
        return e(...t)
    } catch (e) {
        if (Rf && Rf(e) === !0)
            return;
        throw e
    }
}
: e
  , Vf = [];
function Hf(e) {
    try {
        if (`composedPath` in e) {
            let t = e.composedPath();
            if (t.length)
                return t[0]
        } else if (`path` in e && e.path.length)
            return e.path[0]
    } catch {}
    return e && e.target
}
function Uf(e, t) {
    let n = new jf;
    Vf.push(n),
    n.init(e);
    let r = new ($d())(Z(n.processMutations.bind(n)));
    return r.observe(t, {
        attributes: !0,
        attributeOldValue: !0,
        characterData: !0,
        characterDataOldValue: !0,
        childList: !0,
        subtree: !0
    }),
    r
}
function Wf({mousemoveCb: e, sampling: t, doc: n, mirror: r}) {
    if (t.mousemove === !1)
        return () => {}
        ;
    let i = typeof t.mousemove == `number` ? t.mousemove : 50, a = typeof t.mousemoveCallback == `number` ? t.mousemoveCallback : 500, o = [], s, c = rf(Z(t => {
        let n = Date.now() - s;
        e(o.map(e => (e.timeOffset -= n,
        e)), t),
        o = [],
        s = null
    }
    ), a), l = Z(rf(Z(e => {
        let t = Hf(e)
          , {clientX: n, clientY: i} = mf(e) ? e.changedTouches[0] : e;
        s ||= of(),
        o.push({
            x: n,
            y: i,
            id: r.getId(t),
            timeOffset: of() - s
        }),
        c(typeof DragEvent < `u` && e instanceof DragEvent ? Y.Drag : e instanceof MouseEvent ? Y.MouseMove : Y.TouchMove)
    }
    ), i, {
        trailing: !1
    })), u = [K(`mousemove`, l, n), K(`touchmove`, l, n), K(`drag`, l, n)];
    return Z( () => {
        u.forEach(e => e())
    }
    )
}
function Gf({mouseInteractionCb: e, doc: t, mirror: n, blockClass: r, blockSelector: i, sampling: a}) {
    if (a.mouseInteraction === !1)
        return () => {}
        ;
    let o = a.mouseInteraction === !0 || a.mouseInteraction === void 0 ? {} : a.mouseInteraction
      , s = []
      , c = null
      , l = t => a => {
        let o = Hf(a);
        if (q(o, r, i, !0))
            return;
        let s = null
          , l = t;
        if (`pointerType` in a) {
            switch (a.pointerType) {
            case `mouse`:
                s = wf.Mouse;
                break;
            case `touch`:
                s = wf.Touch;
                break;
            case `pen`:
                s = wf.Pen;
                break
            }
            s === wf.Touch ? X[t] === X.MouseDown ? l = `TouchStart` : X[t] === X.MouseUp && (l = `TouchEnd`) : wf.Pen
        } else
            mf(a) && (s = wf.Touch);
        s === null ? X[t] === X.Click && (s = c,
        c = null) : (c = s,
        (l.startsWith(`Touch`) && s === wf.Touch || l.startsWith(`Mouse`) && s === wf.Mouse) && (s = null));
        let u = mf(a) ? a.changedTouches[0] : a;
        if (!u)
            return;
        let d = n.getId(o)
          , {clientX: f, clientY: p} = u;
        Z(e)({
            type: X[l],
            id: d,
            x: f,
            y: p,
            ...s !== null && {
                pointerType: s
            }
        })
    }
    ;
    return Object.keys(X).filter(e => Number.isNaN(Number(e)) && !e.endsWith(`_Departed`) && o[e] !== !1).forEach(e => {
        let n = bs(e)
          , r = l(e);
        if (window.PointerEvent)
            switch (X[e]) {
            case X.MouseDown:
            case X.MouseUp:
                n = n.replace(`mouse`, `pointer`);
                break;
            case X.TouchStart:
            case X.TouchEnd:
                return
            }
        s.push(K(n, r, t))
    }
    ),
    Z( () => {
        s.forEach(e => e())
    }
    )
}
function Kf({scrollCb: e, doc: t, mirror: n, blockClass: r, blockSelector: i, sampling: a}) {
    return K(`scroll`, Z(rf(Z(a => {
        let o = Hf(a);
        if (!o || q(o, r, i, !0))
            return;
        let s = n.getId(o);
        if (o === t && t.defaultView) {
            let n = sf(t.defaultView);
            e({
                id: s,
                x: n.left,
                y: n.top
            })
        } else
            e({
                id: s,
                x: o.scrollLeft,
                y: o.scrollTop
            })
    }
    ), a.scroll || 100)), t)
}
function qf({viewportResizeCb: e}, {win: t}) {
    let n = -1
      , r = -1;
    return K(`resize`, Z(rf(Z( () => {
        let t = cf()
          , i = lf();
        (n !== t || r !== i) && (e({
            width: Number(i),
            height: Number(t)
        }),
        n = t,
        r = i)
    }
    ), 200)), t)
}
var Jf = [`INPUT`, `TEXTAREA`, `SELECT`]
  , Yf = new WeakMap;
function Xf({inputCb: e, doc: t, mirror: n, blockClass: r, blockSelector: i, ignoreClass: a, ignoreSelector: o, maskInputOptions: s, maskInputFn: c, sampling: l, userTriggeredOnInput: u}) {
    function d(e) {
        let n = Hf(e)
          , l = e.isTrusted
          , d = n && n.tagName;
        if (n && d === `OPTION` && (n = G.parentElement(n)),
        !n || !d || Jf.indexOf(d) < 0 || q(n, r, i, !0) || n.classList.contains(a) || o && n.matches(o))
            return;
        let p = n.value
          , m = !1
          , h = Cs(n) || ``;
        h === `radio` || h === `checkbox` ? m = n.checked : (s[d.toLowerCase()] || s[h]) && (p = ys({
            element: n,
            maskInputOptions: s,
            tagName: d,
            type: h,
            value: p,
            maskInputFn: c
        })),
        f(n, u ? {
            text: p,
            isChecked: m,
            userTriggered: l
        } : {
            text: p,
            isChecked: m
        });
        let g = n.name;
        h === `radio` && g && m && t.querySelectorAll(`input[type="radio"][name="${g}"]`).forEach(e => {
            if (e !== n) {
                let t = e.value;
                f(e, u ? {
                    text: t,
                    isChecked: !m,
                    userTriggered: !1
                } : {
                    text: t,
                    isChecked: !m
                })
            }
        }
        )
    }
    function f(t, r) {
        let i = Yf.get(t);
        if (!i || i.text !== r.text || i.isChecked !== r.isChecked) {
            Yf.set(t, r);
            let i = n.getId(t);
            Z(e)({
                ...r,
                id: i
            })
        }
    }
    let p = (l.input === `last` ? [`change`] : [`input`, `change`]).map(e => K(e, Z(d), t))
      , m = t.defaultView;
    if (!m)
        return () => {
            p.forEach(e => e())
        }
        ;
    let h = m.Object.getOwnPropertyDescriptor(m.HTMLInputElement.prototype, `value`)
      , g = [[m.HTMLInputElement.prototype, `value`], [m.HTMLInputElement.prototype, `checked`], [m.HTMLSelectElement.prototype, `value`], [m.HTMLTextAreaElement.prototype, `value`], [m.HTMLSelectElement.prototype, `selectedIndex`], [m.HTMLOptionElement.prototype, `selected`]];
    return h && h.set && p.push(...g.map(e => af(e[0], e[1], {
        set() {
            Z(d)({
                target: this,
                isTrusted: !1
            })
        }
    }, !1, m))),
    Z( () => {
        p.forEach(e => e())
    }
    )
}
function Zf(e) {
    let t = [];
    function n(e, t) {
        if (cp(`CSSGroupingRule`) && e.parentRule instanceof CSSGroupingRule || cp(`CSSMediaRule`) && e.parentRule instanceof CSSMediaRule || cp(`CSSSupportsRule`) && e.parentRule instanceof CSSSupportsRule || cp(`CSSConditionRule`) && e.parentRule instanceof CSSConditionRule) {
            let r = Array.from(e.parentRule.cssRules).indexOf(e);
            return t.unshift(r),
            n(e.parentRule, t)
        } else if (e.parentStyleSheet) {
            let n = Array.from(e.parentStyleSheet.cssRules).indexOf(e);
            t.unshift(n)
        }
        return t
    }
    return n(e, t)
}
function Qf(e, t, n) {
    let r, i;
    return e ? (e.ownerNode ? r = t.getId(e.ownerNode) : i = n.getId(e),
    {
        styleId: i,
        id: r
    }) : {}
}
function $f({styleSheetRuleCb: e, mirror: t, stylesheetManager: n}, {win: r}) {
    if (!r.CSSStyleSheet || !r.CSSStyleSheet.prototype)
        return () => {}
        ;
    let i = r.CSSStyleSheet.prototype.insertRule;
    r.CSSStyleSheet.prototype.insertRule = new Proxy(i,{
        apply: Z( (r, i, a) => {
            let[o,s] = a
              , {id: c, styleId: l} = Qf(i, t, n.styleMirror);
            return (c && c !== -1 || l && l !== -1) && e({
                id: c,
                styleId: l,
                adds: [{
                    rule: o,
                    index: s
                }]
            }),
            r.apply(i, a)
        }
        )
    }),
    r.CSSStyleSheet.prototype.addRule = function(e, t, n=this.cssRules.length) {
        let i = `${e} { ${t} }`;
        return r.CSSStyleSheet.prototype.insertRule.apply(this, [i, n])
    }
    ;
    let a = r.CSSStyleSheet.prototype.deleteRule;
    r.CSSStyleSheet.prototype.deleteRule = new Proxy(a,{
        apply: Z( (r, i, a) => {
            let[o] = a
              , {id: s, styleId: c} = Qf(i, t, n.styleMirror);
            return (s && s !== -1 || c && c !== -1) && e({
                id: s,
                styleId: c,
                removes: [{
                    index: o
                }]
            }),
            r.apply(i, a)
        }
        )
    }),
    r.CSSStyleSheet.prototype.removeRule = function(e) {
        return r.CSSStyleSheet.prototype.deleteRule.apply(this, [e])
    }
    ;
    let o;
    r.CSSStyleSheet.prototype.replace && (o = r.CSSStyleSheet.prototype.replace,
    r.CSSStyleSheet.prototype.replace = new Proxy(o,{
        apply: Z( (r, i, a) => {
            let[o] = a
              , {id: s, styleId: c} = Qf(i, t, n.styleMirror);
            return (s && s !== -1 || c && c !== -1) && e({
                id: s,
                styleId: c,
                replace: o
            }),
            r.apply(i, a)
        }
        )
    }));
    let s;
    r.CSSStyleSheet.prototype.replaceSync && (s = r.CSSStyleSheet.prototype.replaceSync,
    r.CSSStyleSheet.prototype.replaceSync = new Proxy(s,{
        apply: Z( (r, i, a) => {
            let[o] = a
              , {id: s, styleId: c} = Qf(i, t, n.styleMirror);
            return (s && s !== -1 || c && c !== -1) && e({
                id: s,
                styleId: c,
                replaceSync: o
            }),
            r.apply(i, a)
        }
        )
    }));
    let c = {};
    lp(`CSSGroupingRule`) ? c.CSSGroupingRule = r.CSSGroupingRule : (lp(`CSSMediaRule`) && (c.CSSMediaRule = r.CSSMediaRule),
    lp(`CSSConditionRule`) && (c.CSSConditionRule = r.CSSConditionRule),
    lp(`CSSSupportsRule`) && (c.CSSSupportsRule = r.CSSSupportsRule));
    let l = {};
    return Object.entries(c).forEach( ([r,i]) => {
        l[r] = {
            insertRule: i.prototype.insertRule,
            deleteRule: i.prototype.deleteRule
        },
        i.prototype.insertRule = new Proxy(l[r].insertRule,{
            apply: Z( (r, i, a) => {
                let[o,s] = a
                  , {id: c, styleId: l} = Qf(i.parentStyleSheet, t, n.styleMirror);
                return (c && c !== -1 || l && l !== -1) && e({
                    id: c,
                    styleId: l,
                    adds: [{
                        rule: o,
                        index: [...Zf(i), s || 0]
                    }]
                }),
                r.apply(i, a)
            }
            )
        }),
        i.prototype.deleteRule = new Proxy(l[r].deleteRule,{
            apply: Z( (r, i, a) => {
                let[o] = a
                  , {id: s, styleId: c} = Qf(i.parentStyleSheet, t, n.styleMirror);
                return (s && s !== -1 || c && c !== -1) && e({
                    id: s,
                    styleId: c,
                    removes: [{
                        index: [...Zf(i), o]
                    }]
                }),
                r.apply(i, a)
            }
            )
        })
    }
    ),
    Z( () => {
        r.CSSStyleSheet.prototype.insertRule = i,
        r.CSSStyleSheet.prototype.deleteRule = a,
        o && (r.CSSStyleSheet.prototype.replace = o),
        s && (r.CSSStyleSheet.prototype.replaceSync = s),
        Object.entries(c).forEach( ([e,t]) => {
            t.prototype.insertRule = l[e].insertRule,
            t.prototype.deleteRule = l[e].deleteRule
        }
        )
    }
    )
}
function ep({mirror: e, stylesheetManager: t}, n) {
    let r = null;
    r = n.nodeName === `#document` ? e.getId(n) : e.getId(G.host(n));
    let i = n.nodeName === `#document` ? n.defaultView?.Document : n.ownerDocument?.defaultView?.ShadowRoot
      , a = i?.prototype ? Object.getOwnPropertyDescriptor(i?.prototype, `adoptedStyleSheets`) : void 0;
    return r === null || r === -1 || !i || !a ? () => {}
    : (Object.defineProperty(n, "adoptedStyleSheets", {
        configurable: a.configurable,
        enumerable: a.enumerable,
        get() {
            return a.get?.call(this)
        },
        set(e) {
            let n = a.set?.call(this, e);
            if (r !== null && r !== -1)
                try {
                    t.adoptStyleSheets(e, r)
                } catch {}
            return n
        }
    }),
    Z( () => {
        Object.defineProperty(n, "adoptedStyleSheets", {
            configurable: a.configurable,
            enumerable: a.enumerable,
            get: a.get,
            set: a.set
        })
    }
    ))
}
function tp({styleDeclarationCb: e, mirror: t, ignoreCSSAttributes: n, stylesheetManager: r}, {win: i}) {
    let a = i.CSSStyleDeclaration.prototype.setProperty;
    i.CSSStyleDeclaration.prototype.setProperty = new Proxy(a,{
        apply: Z( (i, o, s) => {
            let[c,l,u] = s;
            if (n.has(c))
                return a.apply(o, [c, l, u]);
            let {id: d, styleId: f} = Qf(o.parentRule?.parentStyleSheet, t, r.styleMirror);
            return (d && d !== -1 || f && f !== -1) && e({
                id: d,
                styleId: f,
                set: {
                    property: c,
                    value: l,
                    priority: u
                },
                index: Zf(o.parentRule)
            }),
            i.apply(o, s)
        }
        )
    });
    let o = i.CSSStyleDeclaration.prototype.removeProperty;
    return i.CSSStyleDeclaration.prototype.removeProperty = new Proxy(o,{
        apply: Z( (i, a, s) => {
            let[c] = s;
            if (n.has(c))
                return o.apply(a, [c]);
            let {id: l, styleId: u} = Qf(a.parentRule?.parentStyleSheet, t, r.styleMirror);
            return (l && l !== -1 || u && u !== -1) && e({
                id: l,
                styleId: u,
                remove: {
                    property: c
                },
                index: Zf(a.parentRule)
            }),
            i.apply(a, s)
        }
        )
    }),
    Z( () => {
        i.CSSStyleDeclaration.prototype.setProperty = a,
        i.CSSStyleDeclaration.prototype.removeProperty = o
    }
    )
}
function np({mediaInteractionCb: e, blockClass: t, blockSelector: n, mirror: r, sampling: i, doc: a}) {
    let o = Z(a => rf(Z(i => {
        let o = Hf(i);
        if (!o || q(o, t, n, !0))
            return;
        let {currentTime: s, volume: c, muted: l, playbackRate: u, loop: d} = o;
        e({
            type: a,
            id: r.getId(o),
            currentTime: s,
            volume: c,
            muted: l,
            playbackRate: u,
            loop: d
        })
    }
    ), i.media || 500))
      , s = [K(`play`, o(Ef.Play), a), K(`pause`, o(Ef.Pause), a), K(`seeked`, o(Ef.Seeked), a), K(`volumechange`, o(Ef.VolumeChange), a), K(`ratechange`, o(Ef.RateChange), a)];
    return Z( () => {
        s.forEach(e => e())
    }
    )
}
function rp({fontCb: e, doc: t}) {
    let n = t.defaultView;
    if (!n)
        return () => {}
        ;
    let r = []
      , i = new WeakMap
      , a = n.FontFace;
    n.FontFace = function(e, t, n) {
        let r = new a(e,t,n);
        return i.set(r, {
            family: e,
            buffer: typeof t != `string`,
            descriptors: n,
            fontSource: typeof t == `string` ? t : JSON.stringify(Array.from(new Uint8Array(t)))
        }),
        r
    }
    ;
    let o = ef(t.fonts, `add`, function(t) {
        return function(n) {
            return setTimeout(Z( () => {
                let t = i.get(n);
                t && (e(t),
                i.delete(n))
            }
            ), 0),
            t.apply(this, [n])
        }
    });
    return r.push( () => {
        n.FontFace = a
    }
    ),
    r.push(o),
    Z( () => {
        r.forEach(e => e())
    }
    )
}
function ip(e) {
    let {doc: t, mirror: n, blockClass: r, blockSelector: i, selectionCb: a} = e
      , o = !0
      , s = Z( () => {
        let e = t.getSelection();
        if (!e || o && e?.isCollapsed)
            return;
        o = e.isCollapsed || !1;
        let s = []
          , c = e.rangeCount || 0;
        for (let t = 0; t < c; t++) {
            let {startContainer: a, startOffset: o, endContainer: c, endOffset: l} = e.getRangeAt(t);
            q(a, r, i, !0) || q(c, r, i, !0) || s.push({
                start: n.getId(a),
                startOffset: o,
                end: n.getId(c),
                endOffset: l
            })
        }
        a({
            ranges: s
        })
    }
    );
    return s(),
    K(`selectionchange`, s)
}
function ap({doc: e, customElementCb: t}) {
    let n = e.defaultView;
    return !n || !n.customElements ? () => {}
    : ef(n.customElements, `define`, function(e) {
        return function(n, r, i) {
            try {
                t({
                    define: {
                        name: n
                    }
                })
            } catch {
                console.warn(`Custom element callback failed for ${n}`)
            }
            return e.apply(this, [n, r, i])
        }
    })
}
function op(e, t) {
    let {mutationCb: n, mousemoveCb: r, mouseInteractionCb: i, scrollCb: a, viewportResizeCb: o, inputCb: s, mediaInteractionCb: c, styleSheetRuleCb: l, styleDeclarationCb: u, canvasMutationCb: d, fontCb: f, selectionCb: p, customElementCb: m} = e;
    e.mutationCb = (...e) => {
        t.mutation && t.mutation(...e),
        n(...e)
    }
    ,
    e.mousemoveCb = (...e) => {
        t.mousemove && t.mousemove(...e),
        r(...e)
    }
    ,
    e.mouseInteractionCb = (...e) => {
        t.mouseInteraction && t.mouseInteraction(...e),
        i(...e)
    }
    ,
    e.scrollCb = (...e) => {
        t.scroll && t.scroll(...e),
        a(...e)
    }
    ,
    e.viewportResizeCb = (...e) => {
        t.viewportResize && t.viewportResize(...e),
        o(...e)
    }
    ,
    e.inputCb = (...e) => {
        t.input && t.input(...e),
        s(...e)
    }
    ,
    e.mediaInteractionCb = (...e) => {
        t.mediaInteaction && t.mediaInteaction(...e),
        c(...e)
    }
    ,
    e.styleSheetRuleCb = (...e) => {
        t.styleSheetRule && t.styleSheetRule(...e),
        l(...e)
    }
    ,
    e.styleDeclarationCb = (...e) => {
        t.styleDeclaration && t.styleDeclaration(...e),
        u(...e)
    }
    ,
    e.canvasMutationCb = (...e) => {
        t.canvasMutation && t.canvasMutation(...e),
        d(...e)
    }
    ,
    e.fontCb = (...e) => {
        t.font && t.font(...e),
        f(...e)
    }
    ,
    e.selectionCb = (...e) => {
        t.selection && t.selection(...e),
        p(...e)
    }
    ,
    e.customElementCb = (...e) => {
        t.customElement && t.customElement(...e),
        m(...e)
    }
}
function sp(e, t={}) {
    let n = e.doc.defaultView;
    if (!n)
        return () => {}
        ;
    op(e, t);
    let r;
    e.recordDOM && (r = Uf(e, e.doc));
    let i = Wf(e)
      , a = Gf(e)
      , o = Kf(e)
      , s = qf(e, {
        win: n
    })
      , c = Xf(e)
      , l = np(e)
      , u = () => {}
      , d = () => {}
      , f = () => {}
      , p = () => {}
    ;
    e.recordDOM && (u = $f(e, {
        win: n
    }),
    d = ep(e, e.doc),
    f = tp(e, {
        win: n
    }),
    e.collectFonts && (p = rp(e)));
    let m = ip(e)
      , h = ap(e)
      , g = [];
    for (let t of e.plugins)
        g.push(t.observer(t.callback, n, t.options));
    return Z( () => {
        Vf.forEach(e => e.reset()),
        r?.disconnect(),
        i(),
        a(),
        o(),
        s(),
        c(),
        l(),
        u(),
        d(),
        f(),
        p(),
        m(),
        h(),
        g.forEach(e => e())
    }
    )
}
function cp(e) {
    return window[e] !== void 0
}
function lp(e) {
    return !!(window[e] !== void 0 && window[e].prototype && `insertRule` in window[e].prototype && `deleteRule` in window[e].prototype)
}
for (var up = class {
    constructor(e) {
        z(this, `iframeIdToRemoteIdMap`, new WeakMap),
        z(this, `iframeRemoteIdToIdMap`, new WeakMap),
        this.generateIdFn = e
    }
    getId(e, t, n, r) {
        let i = n || this.getIdToRemoteIdMap(e)
          , a = r || this.getRemoteIdToIdMap(e)
          , o = i.get(t);
        return o || (o = this.generateIdFn(),
        i.set(t, o),
        a.set(o, t)),
        o
    }
    getIds(e, t) {
        let n = this.getIdToRemoteIdMap(e)
          , r = this.getRemoteIdToIdMap(e);
        return t.map(t => this.getId(e, t, n, r))
    }
    getRemoteId(e, t, n) {
        let r = n || this.getRemoteIdToIdMap(e);
        return typeof t == `number` ? r.get(t) || -1 : t
    }
    getRemoteIds(e, t) {
        let n = this.getRemoteIdToIdMap(e);
        return t.map(t => this.getRemoteId(e, t, n))
    }
    reset(e) {
        if (!e) {
            this.iframeIdToRemoteIdMap = new WeakMap,
            this.iframeRemoteIdToIdMap = new WeakMap;
            return
        }
        this.iframeIdToRemoteIdMap.delete(e),
        this.iframeRemoteIdToIdMap.delete(e)
    }
    getIdToRemoteIdMap(e) {
        let t = this.iframeIdToRemoteIdMap.get(e);
        return t || (t = new Map,
        this.iframeIdToRemoteIdMap.set(e, t)),
        t
    }
    getRemoteIdToIdMap(e) {
        let t = this.iframeRemoteIdToIdMap.get(e);
        return t || (t = new Map,
        this.iframeRemoteIdToIdMap.set(e, t)),
        t
    }
}
, dp = class {
    constructor(e) {
        z(this, `iframes`, new WeakMap),
        z(this, `crossOriginIframeMap`, new WeakMap),
        z(this, `crossOriginIframeMirror`, new up(Ls)),
        z(this, `crossOriginIframeStyleMirror`),
        z(this, `crossOriginIframeRootIdMap`, new WeakMap),
        z(this, `mirror`),
        z(this, `mutationCb`),
        z(this, `wrappedEmit`),
        z(this, `loadListener`),
        z(this, `stylesheetManager`),
        z(this, `recordCrossOriginIframes`),
        this.mutationCb = e.mutationCb,
        this.wrappedEmit = e.wrappedEmit,
        this.stylesheetManager = e.stylesheetManager,
        this.recordCrossOriginIframes = e.recordCrossOriginIframes,
        this.crossOriginIframeStyleMirror = new up(this.stylesheetManager.styleMirror.generateId.bind(this.stylesheetManager.styleMirror)),
        this.mirror = e.mirror,
        this.recordCrossOriginIframes && window.addEventListener(`message`, this.handleMessage.bind(this))
    }
    addIframe(e) {
        this.iframes.set(e, !0),
        e.contentWindow && this.crossOriginIframeMap.set(e.contentWindow, e)
    }
    addLoadListener(e) {
        this.loadListener = e
    }
    attachIframe(e, t) {
        var n, r;
        this.mutationCb({
            adds: [{
                parentId: this.mirror.getId(e),
                nextId: null,
                node: t
            }],
            removes: [],
            texts: [],
            attributes: [],
            isAttachIframe: !0
        }),
        this.recordCrossOriginIframes && ((n = e.contentWindow) == null || n.addEventListener(`message`, this.handleMessage.bind(this))),
        (r = this.loadListener) == null || r.call(this, e),
        e.contentDocument && e.contentDocument.adoptedStyleSheets && e.contentDocument.adoptedStyleSheets.length > 0 && this.stylesheetManager.adoptStyleSheets(e.contentDocument.adoptedStyleSheets, this.mirror.getId(e.contentDocument))
    }
    handleMessage(e) {
        let t = e;
        if (t.data.type !== `rrweb` || t.origin !== t.data.origin || !e.source)
            return;
        let n = this.crossOriginIframeMap.get(e.source);
        if (!n)
            return;
        let r = this.transformCrossOriginEvent(n, t.data.event);
        r && this.wrappedEmit(r, t.data.isCheckout)
    }
    transformCrossOriginEvent(e, t) {
        var n;
        switch (t.type) {
        case J.FullSnapshot:
            {
                this.crossOriginIframeMirror.reset(e),
                this.crossOriginIframeStyleMirror.reset(e),
                this.replaceIdOnNode(t.data.node, e);
                let n = t.data.node.id;
                return this.crossOriginIframeRootIdMap.set(e, n),
                this.patchRootIdOnNode(t.data.node, n),
                {
                    timestamp: t.timestamp,
                    type: J.IncrementalSnapshot,
                    data: {
                        source: Y.Mutation,
                        adds: [{
                            parentId: this.mirror.getId(e),
                            nextId: null,
                            node: t.data.node
                        }],
                        removes: [],
                        texts: [],
                        attributes: [],
                        isAttachIframe: !0
                    }
                }
            }
        case J.Meta:
        case J.Load:
        case J.DomContentLoaded:
            return !1;
        case J.Plugin:
            return t;
        case J.Custom:
            return this.replaceIds(t.data.payload, e, [`id`, `parentId`, `previousId`, `nextId`]),
            t;
        case J.IncrementalSnapshot:
            switch (t.data.source) {
            case Y.Mutation:
                return t.data.adds.forEach(t => {
                    this.replaceIds(t, e, [`parentId`, `nextId`, `previousId`]),
                    this.replaceIdOnNode(t.node, e);
                    let n = this.crossOriginIframeRootIdMap.get(e);
                    n && this.patchRootIdOnNode(t.node, n)
                }
                ),
                t.data.removes.forEach(t => {
                    this.replaceIds(t, e, [`parentId`, `id`])
                }
                ),
                t.data.attributes.forEach(t => {
                    this.replaceIds(t, e, [`id`])
                }
                ),
                t.data.texts.forEach(t => {
                    this.replaceIds(t, e, [`id`])
                }
                ),
                t;
            case Y.Drag:
            case Y.TouchMove:
            case Y.MouseMove:
                return t.data.positions.forEach(t => {
                    this.replaceIds(t, e, [`id`])
                }
                ),
                t;
            case Y.ViewportResize:
                return !1;
            case Y.MediaInteraction:
            case Y.MouseInteraction:
            case Y.Scroll:
            case Y.CanvasMutation:
            case Y.Input:
                return this.replaceIds(t.data, e, [`id`]),
                t;
            case Y.StyleSheetRule:
            case Y.StyleDeclaration:
                return this.replaceIds(t.data, e, [`id`]),
                this.replaceStyleIds(t.data, e, [`styleId`]),
                t;
            case Y.Font:
                return t;
            case Y.Selection:
                return t.data.ranges.forEach(t => {
                    this.replaceIds(t, e, [`start`, `end`])
                }
                ),
                t;
            case Y.AdoptedStyleSheet:
                return this.replaceIds(t.data, e, [`id`]),
                this.replaceStyleIds(t.data, e, [`styleIds`]),
                (n = t.data.styles) == null || n.forEach(t => {
                    this.replaceStyleIds(t, e, [`styleId`])
                }
                ),
                t
            }
        }
        return !1
    }
    replace(e, t, n, r) {
        for (let i of r)
            !Array.isArray(t[i]) && typeof t[i] != `number` || (Array.isArray(t[i]) ? t[i] = e.getIds(n, t[i]) : t[i] = e.getId(n, t[i]));
        return t
    }
    replaceIds(e, t, n) {
        return this.replace(this.crossOriginIframeMirror, e, t, n)
    }
    replaceStyleIds(e, t, n) {
        return this.replace(this.crossOriginIframeStyleMirror, e, t, n)
    }
    replaceIdOnNode(e, t) {
        this.replaceIds(e, t, [`id`, `rootId`]),
        `childNodes` in e && e.childNodes.forEach(e => {
            this.replaceIdOnNode(e, t)
        }
        )
    }
    patchRootIdOnNode(e, t) {
        e.type !== Df.Document && !e.rootId && (e.rootId = t),
        `childNodes` in e && e.childNodes.forEach(e => {
            this.patchRootIdOnNode(e, t)
        }
        )
    }
}
, fp = class {
    constructor(e) {
        z(this, `shadowDoms`, new WeakSet),
        z(this, `mutationCb`),
        z(this, `scrollCb`),
        z(this, `bypassOptions`),
        z(this, `mirror`),
        z(this, `restoreHandlers`, []),
        this.mutationCb = e.mutationCb,
        this.scrollCb = e.scrollCb,
        this.bypassOptions = e.bypassOptions,
        this.mirror = e.mirror,
        this.init()
    }
    init() {
        this.reset(),
        this.patchAttachShadow(Element, document)
    }
    addShadowRoot(e, t) {
        if (!ls(e) || this.shadowDoms.has(e))
            return;
        this.shadowDoms.add(e);
        let n = Uf({
            ...this.bypassOptions,
            doc: t,
            mutationCb: this.mutationCb,
            mirror: this.mirror,
            shadowDomManager: this
        }, e);
        this.restoreHandlers.push( () => n.disconnect()),
        this.restoreHandlers.push(Kf({
            ...this.bypassOptions,
            scrollCb: this.scrollCb,
            doc: e,
            mirror: this.mirror
        })),
        setTimeout( () => {
            e.adoptedStyleSheets && e.adoptedStyleSheets.length > 0 && this.bypassOptions.stylesheetManager.adoptStyleSheets(e.adoptedStyleSheets, this.mirror.getId(G.host(e))),
            this.restoreHandlers.push(ep({
                mirror: this.mirror,
                stylesheetManager: this.bypassOptions.stylesheetManager
            }, e))
        }
        , 0)
    }
    observeAttachShadow(e) {
        !e.contentWindow || !e.contentDocument || this.patchAttachShadow(e.contentWindow.Element, e.contentDocument)
    }
    patchAttachShadow(e, t) {
        let n = this;
        this.restoreHandlers.push(ef(e.prototype, `attachShadow`, function(e) {
            return function(r) {
                let i = e.call(this, r)
                  , a = G.shadowRoot(this);
                return a && Cf(this) && n.addShadowRoot(a, t),
                i
            }
        }))
    }
    reset() {
        this.restoreHandlers.forEach(e => {
            try {
                e()
            } catch {}
        }
        ),
        this.restoreHandlers = [],
        this.shadowDoms = new WeakSet
    }
}
, pp = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`, mp = typeof Uint8Array > `u` ? [] : new Uint8Array(256), hp = 0; hp < pp.length; hp++)
    mp[pp.charCodeAt(hp)] = hp;
var gp = function(e) {
    var t = new Uint8Array(e), n, r = t.length, i = ``;
    for (n = 0; n < r; n += 3)
        i += pp[t[n] >> 2],
        i += pp[(t[n] & 3) << 4 | t[n + 1] >> 4],
        i += pp[(t[n + 1] & 15) << 2 | t[n + 2] >> 6],
        i += pp[t[n + 2] & 63];
    return r % 3 == 2 ? i = i.substring(0, i.length - 1) + `=` : r % 3 == 1 && (i = i.substring(0, i.length - 2) + `==`),
    i
}
  , _p = new Map;
function vp(e, t) {
    let n = _p.get(e);
    return n || (n = new Map,
    _p.set(e, n)),
    n.has(t) || n.set(t, []),
    n.get(t)
}
var yp = (e, t, n) => {
    if (!e || !(Sp(e, t) || typeof e == `object`))
        return;
    let r = e.constructor.name
      , i = vp(n, r)
      , a = i.indexOf(e);
    return a === -1 && (a = i.length,
    i.push(e)),
    a
}
;
function bp(e, t, n) {
    if (e instanceof Array)
        return e.map(e => bp(e, t, n));
    if (e === null)
        return e;
    if (e instanceof Float32Array || e instanceof Float64Array || e instanceof Int32Array || e instanceof Uint32Array || e instanceof Uint8Array || e instanceof Uint16Array || e instanceof Int16Array || e instanceof Int8Array || e instanceof Uint8ClampedArray)
        return {
            rr_type: e.constructor.name,
            args: [Object.values(e)]
        };
    if (e instanceof ArrayBuffer)
        return {
            rr_type: e.constructor.name,
            base64: gp(e)
        };
    if (e instanceof DataView)
        return {
            rr_type: e.constructor.name,
            args: [bp(e.buffer, t, n), e.byteOffset, e.byteLength]
        };
    if (e instanceof HTMLImageElement) {
        let t = e.constructor.name
          , {src: n} = e;
        return {
            rr_type: t,
            src: n
        }
    } else if (e instanceof HTMLCanvasElement)
        return {
            rr_type: `HTMLImageElement`,
            src: e.toDataURL()
        };
    else if (e instanceof ImageData)
        return {
            rr_type: e.constructor.name,
            args: [bp(e.data, t, n), e.width, e.height]
        };
    else if (Sp(e, t) || typeof e == `object`)
        return {
            rr_type: e.constructor.name,
            index: yp(e, t, n)
        };
    return e
}
var xp = (e, t, n) => e.map(e => bp(e, t, n))
  , Sp = (e, t) => !![`WebGLActiveInfo`, `WebGLBuffer`, `WebGLFramebuffer`, `WebGLProgram`, `WebGLRenderbuffer`, `WebGLShader`, `WebGLShaderPrecisionFormat`, `WebGLTexture`, `WebGLUniformLocation`, `WebGLVertexArrayObject`, `WebGLVertexArrayObjectOES`].filter(e => typeof t[e] == `function`).find(n => e instanceof t[n]);
function Cp(e, t, n, r) {
    let i = []
      , a = Object.getOwnPropertyNames(t.CanvasRenderingContext2D.prototype);
    for (let o of a)
        try {
            if (typeof t.CanvasRenderingContext2D.prototype[o] != `function`)
                continue;
            let a = ef(t.CanvasRenderingContext2D.prototype, o, function(i) {
                return function(...a) {
                    return q(this.canvas, n, r, !0) || setTimeout( () => {
                        let n = xp(a, t, this);
                        e(this.canvas, {
                            type: Tf[`2D`],
                            property: o,
                            args: n
                        })
                    }
                    , 0),
                    i.apply(this, a)
                }
            });
            i.push(a)
        } catch {
            let n = af(t.CanvasRenderingContext2D.prototype, o, {
                set(t) {
                    e(this.canvas, {
                        type: Tf[`2D`],
                        property: o,
                        args: [t],
                        setter: !0
                    })
                }
            });
            i.push(n)
        }
    return () => {
        i.forEach(e => e())
    }
}
function wp(e) {
    return e === `experimental-webgl` ? `webgl` : e
}
function Tp(e, t, n, r) {
    let i = [];
    try {
        let a = ef(e.HTMLCanvasElement.prototype, `getContext`, function(e) {
            return function(i, ...a) {
                if (!q(this, t, n, !0)) {
                    let e = wp(i);
                    if (`__context` in this || (this.__context = e),
                    r && [`webgl`, `webgl2`].includes(e))
                        if (a[0] && typeof a[0] == `object`) {
                            let e = a[0];
                            e.preserveDrawingBuffer ||= !0
                        } else
                            a.splice(0, 1, {
                                preserveDrawingBuffer: !0
                            })
                }
                return e.apply(this, [i, ...a])
            }
        });
        i.push(a)
    } catch {
        console.error(`failed to patch HTMLCanvasElement.prototype.getContext`)
    }
    return () => {
        i.forEach(e => e())
    }
}
function Ep(e, t, n, r, i, a) {
    let o = []
      , s = Object.getOwnPropertyNames(e);
    for (let c of s)
        if (![`isContextLost`, `canvas`, `drawingBufferWidth`, `drawingBufferHeight`].includes(c))
            try {
                if (typeof e[c] != `function`)
                    continue;
                let s = ef(e, c, function(e) {
                    return function(...o) {
                        let s = e.apply(this, o);
                        if (yp(s, a, this),
                        `tagName` in this.canvas && !q(this.canvas, r, i, !0)) {
                            let e = {
                                type: t,
                                property: c,
                                args: xp(o, a, this)
                            };
                            n(this.canvas, e)
                        }
                        return s
                    }
                });
                o.push(s)
            } catch {
                let r = af(e, c, {
                    set(e) {
                        n(this.canvas, {
                            type: t,
                            property: c,
                            args: [e],
                            setter: !0
                        })
                    }
                });
                o.push(r)
            }
    return o
}
function Dp(e, t, n, r) {
    let i = [];
    return t.WebGLRenderingContext !== void 0 && i.push(...Ep(t.WebGLRenderingContext.prototype, Tf.WebGL, e, n, r, t)),
    t.WebGL2RenderingContext !== void 0 && i.push(...Ep(t.WebGL2RenderingContext.prototype, Tf.WebGL2, e, n, r, t)),
    () => {
        i.forEach(e => e())
    }
}
var Op = `(function() {
  "use strict";
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var lookup = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
  for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
  }
  var encode = function(arraybuffer) {
    var bytes = new Uint8Array(arraybuffer), i2, len = bytes.length, base64 = "";
    for (i2 = 0; i2 < len; i2 += 3) {
      base64 += chars[bytes[i2] >> 2];
      base64 += chars[(bytes[i2] & 3) << 4 | bytes[i2 + 1] >> 4];
      base64 += chars[(bytes[i2 + 1] & 15) << 2 | bytes[i2 + 2] >> 6];
      base64 += chars[bytes[i2 + 2] & 63];
    }
    if (len % 3 === 2) {
      base64 = base64.substring(0, base64.length - 1) + "=";
    } else if (len % 3 === 1) {
      base64 = base64.substring(0, base64.length - 2) + "==";
    }
    return base64;
  };
  const lastBlobMap = /* @__PURE__ */ new Map();
  const transparentBlobMap = /* @__PURE__ */ new Map();
  async function getTransparentBlobFor(width, height, dataURLOptions) {
    const id = \`\${width}-\${height}\`;
    if ("OffscreenCanvas" in globalThis) {
      if (transparentBlobMap.has(id)) return transparentBlobMap.get(id);
      const offscreen = new OffscreenCanvas(width, height);
      offscreen.getContext("2d");
      const blob = await offscreen.convertToBlob(dataURLOptions);
      const arrayBuffer = await blob.arrayBuffer();
      const base64 = encode(arrayBuffer);
      transparentBlobMap.set(id, base64);
      return base64;
    } else {
      return "";
    }
  }
  const worker = self;
  worker.onmessage = async function(e) {
    if ("OffscreenCanvas" in globalThis) {
      const { id, bitmap, width, height, dataURLOptions } = e.data;
      const transparentBase64 = getTransparentBlobFor(
        width,
        height,
        dataURLOptions
      );
      const offscreen = new OffscreenCanvas(width, height);
      const ctx = offscreen.getContext("2d");
      ctx.drawImage(bitmap, 0, 0);
      bitmap.close();
      const blob = await offscreen.convertToBlob(dataURLOptions);
      const type = blob.type;
      const arrayBuffer = await blob.arrayBuffer();
      const base64 = encode(arrayBuffer);
      if (!lastBlobMap.has(id) && await transparentBase64 === base64) {
        lastBlobMap.set(id, base64);
        return worker.postMessage({ id });
      }
      if (lastBlobMap.get(id) === base64) return worker.postMessage({ id });
      worker.postMessage({
        id,
        type,
        base64,
        width,
        height
      });
      lastBlobMap.set(id, base64);
    } else {
      return worker.postMessage({ id: e.data.id });
    }
  };
})();
//# sourceMappingURL=image-bitmap-data-url-worker-IJpC7g_b.js.map
`
  , kp = typeof self < `u` && self.Blob && new Blob([Op],{
    type: `text/javascript;charset=utf-8`
});
function Ap(e) {
    let t;
    try {
        if (t = kp && (self.URL || self.webkitURL).createObjectURL(kp),
        !t)
            throw ``;
        let n = new Worker(t,{
            name: e?.name
        });
        return n.addEventListener(`error`, () => {
            (self.URL || self.webkitURL).revokeObjectURL(t)
        }
        ),
        n
    } catch {
        return new Worker(`data:text/javascript;charset=utf-8,` + encodeURIComponent(Op),{
            name: e?.name
        })
    } finally {
        t && (self.URL || self.webkitURL).revokeObjectURL(t)
    }
}
var jp = class {
    constructor(e) {
        z(this, `pendingCanvasMutations`, new Map),
        z(this, `rafStamps`, {
            latestId: 0,
            invokeId: null
        }),
        z(this, `mirror`),
        z(this, `mutationCb`),
        z(this, `resetObservers`),
        z(this, `frozen`, !1),
        z(this, `locked`, !1),
        z(this, `processMutation`, (e, t) => {
            (this.rafStamps.invokeId && this.rafStamps.latestId !== this.rafStamps.invokeId || !this.rafStamps.invokeId) && (this.rafStamps.invokeId = this.rafStamps.latestId),
            this.pendingCanvasMutations.has(e) || this.pendingCanvasMutations.set(e, []),
            this.pendingCanvasMutations.get(e).push(t)
        }
        );
        let {sampling: t=`all`, win: n, blockClass: r, blockSelector: i, recordCanvas: a, dataURLOptions: o} = e;
        this.mutationCb = e.mutationCb,
        this.mirror = e.mirror,
        a && t === `all` && this.initCanvasMutationObserver(n, r, i),
        a && typeof t == `number` && this.initCanvasFPSObserver(t, n, r, i, {
            dataURLOptions: o
        })
    }
    reset() {
        this.pendingCanvasMutations.clear(),
        this.resetObservers && this.resetObservers()
    }
    freeze() {
        this.frozen = !0
    }
    unfreeze() {
        this.frozen = !1
    }
    lock() {
        this.locked = !0
    }
    unlock() {
        this.locked = !1
    }
    initCanvasFPSObserver(e, t, n, r, i) {
        let a = Tp(t, n, r, !0)
          , o = new Map
          , s = new Ap;
        s.onmessage = e => {
            let {id: t} = e.data;
            if (o.set(t, !1),
            !(`base64` in e.data))
                return;
            let {base64: n, type: r, width: i, height: a} = e.data;
            this.mutationCb({
                id: t,
                type: Tf[`2D`],
                commands: [{
                    property: `clearRect`,
                    args: [0, 0, i, a]
                }, {
                    property: `drawImage`,
                    args: [{
                        rr_type: `ImageBitmap`,
                        args: [{
                            rr_type: `Blob`,
                            data: [{
                                rr_type: `ArrayBuffer`,
                                base64: n
                            }],
                            type: r
                        }]
                    }, 0, 0]
                }]
            })
        }
        ;
        let c = 1e3 / e, l = 0, u, d = () => {
            let e = [];
            return t.document.querySelectorAll(`canvas`).forEach(t => {
                q(t, n, r, !0) || e.push(t)
            }
            ),
            e
        }
        , f = e => {
            if (l && e - l < c) {
                u = requestAnimationFrame(f);
                return
            }
            l = e,
            d().forEach(async e => {
                let t = this.mirror.getId(e);
                if (o.get(t) || e.width === 0 || e.height === 0)
                    return;
                if (o.set(t, !0),
                [`webgl`, `webgl2`].includes(e.__context)) {
                    let t = e.getContext(e.__context);
                    t?.getContextAttributes()?.preserveDrawingBuffer === !1 && t.clear(t.COLOR_BUFFER_BIT)
                }
                let n = await createImageBitmap(e);
                s.postMessage({
                    id: t,
                    bitmap: n,
                    width: e.width,
                    height: e.height,
                    dataURLOptions: i.dataURLOptions
                }, [n])
            }
            ),
            u = requestAnimationFrame(f)
        }
        ;
        u = requestAnimationFrame(f),
        this.resetObservers = () => {
            a(),
            cancelAnimationFrame(u)
        }
    }
    initCanvasMutationObserver(e, t, n) {
        this.startRAFTimestamping(),
        this.startPendingCanvasMutationFlusher();
        let r = Tp(e, t, n, !1)
          , i = Cp(this.processMutation.bind(this), e, t, n)
          , a = Dp(this.processMutation.bind(this), e, t, n);
        this.resetObservers = () => {
            r(),
            i(),
            a()
        }
    }
    startPendingCanvasMutationFlusher() {
        requestAnimationFrame( () => this.flushPendingCanvasMutations())
    }
    startRAFTimestamping() {
        let e = t => {
            this.rafStamps.latestId = t,
            requestAnimationFrame(e)
        }
        ;
        requestAnimationFrame(e)
    }
    flushPendingCanvasMutations() {
        this.pendingCanvasMutations.forEach( (e, t) => {
            let n = this.mirror.getId(t);
            this.flushPendingCanvasMutationFor(t, n)
        }
        ),
        requestAnimationFrame( () => this.flushPendingCanvasMutations())
    }
    flushPendingCanvasMutationFor(e, t) {
        if (this.frozen || this.locked)
            return;
        let n = this.pendingCanvasMutations.get(e);
        if (!n || t === -1)
            return;
        let r = n.map(e => {
            let {type: t, ...n} = e;
            return n
        }
        )
          , {type: i} = n[0];
        this.mutationCb({
            id: t,
            type: i,
            commands: r
        }),
        this.pendingCanvasMutations.delete(e)
    }
}
, Mp = class {
    constructor(e) {
        z(this, `trackedLinkElements`, new WeakSet),
        z(this, `mutationCb`),
        z(this, `adoptedStyleSheetCb`),
        z(this, `styleMirror`, new yf),
        this.mutationCb = e.mutationCb,
        this.adoptedStyleSheetCb = e.adoptedStyleSheetCb
    }
    attachLinkElement(e, t) {
        `_cssText` in t.attributes && this.mutationCb({
            adds: [],
            removes: [],
            texts: [],
            attributes: [{
                id: t.id,
                attributes: t.attributes
            }]
        }),
        this.trackLinkElement(e)
    }
    trackLinkElement(e) {
        this.trackedLinkElements.has(e) || (this.trackedLinkElements.add(e),
        this.trackStylesheetInLinkElement(e))
    }
    adoptStyleSheets(e, t) {
        if (e.length === 0)
            return;
        let n = {
            id: t,
            styleIds: []
        }
          , r = [];
        for (let t of e) {
            let e;
            this.styleMirror.has(t) ? e = this.styleMirror.getId(t) : (e = this.styleMirror.add(t),
            r.push({
                styleId: e,
                rules: Array.from(t.rules || CSSRule, (e, n) => ({
                    rule: ps(e, t.href),
                    index: n
                }))
            })),
            n.styleIds.push(e)
        }
        r.length > 0 && (n.styles = r),
        this.adoptedStyleSheetCb(n)
    }
    reset() {
        this.styleMirror.reset(),
        this.trackedLinkElements = new WeakSet
    }
    trackStylesheetInLinkElement(e) {}
}
, Np = class {
    constructor() {
        z(this, `nodeMap`, new WeakMap),
        z(this, `active`, !1)
    }
    inOtherBuffer(e, t) {
        let n = this.nodeMap.get(e);
        return n && Array.from(n).some(e => e !== t)
    }
    add(e, t) {
        this.active || (this.active = !0,
        requestAnimationFrame( () => {
            this.nodeMap = new WeakMap,
            this.active = !1
        }
        )),
        this.nodeMap.set(e, (this.nodeMap.get(e) || new Set).add(t))
    }
    destroy() {}
}
, Q, Pp, Fp, Ip = !1;
try {
    if (Array.from([1], e => e * 2)[0] !== 2) {
        let e = document.createElement(`iframe`);
        document.body.appendChild(e),
        Array.from = e.contentWindow?.Array.from || Array.from,
        document.body.removeChild(e)
    }
} catch (e) {
    console.debug(`Unable to override Array.from`, e)
}
var Lp = vs();
function Rp(e={}) {
    let {emit: t, checkoutEveryNms: n, checkoutEveryNth: r, blockClass: i=`rr-block`, blockSelector: a=null, ignoreClass: o=`rr-ignore`, ignoreSelector: s=null, maskTextClass: c=`rr-mask`, maskTextSelector: l=null, inlineStylesheet: u=!0, maskAllInputs: d, maskInputOptions: f, slimDOMOptions: p, maskInputFn: m, maskTextFn: h, hooks: g, packFn: _, sampling: v={}, dataURLOptions: y={}, mousemoveWait: b, recordDOM: x=!0, recordCanvas: S=!1, recordCrossOriginIframes: C=!1, recordAfter: ee=e.recordAfter === `DOMContentLoaded` ? e.recordAfter : `load`, userTriggeredOnInput: w=!1, collectFonts: te=!1, inlineImages: ne=!1, plugins: re, keepIframeSrcFn: T= () => !1, ignoreCSSAttributes: ie=new Set([]), errorHandler: ae} = e;
    zf(ae);
    let oe = C ? window.parent === window : !0
      , se = !1;
    if (!oe)
        try {
            window.parent.document && (se = !1)
        } catch {
            se = !0
        }
    if (oe && !t)
        throw Error(`emit function is required`);
    if (!oe && !se)
        return () => {}
        ;
    b !== void 0 && v.mousemove === void 0 && (v.mousemove = b),
    Lp.reset();
    let ce = d === !0 ? {
        color: !0,
        date: !0,
        "datetime-local": !0,
        email: !0,
        month: !0,
        number: !0,
        range: !0,
        search: !0,
        tel: !0,
        text: !0,
        time: !0,
        url: !0,
        week: !0,
        textarea: !0,
        select: !0,
        password: !0
    } : f === void 0 ? {
        password: !0
    } : f
      , le = ac(p);
    hf();
    let ue, E = 0, de = e => {
        for (let t of re || [])
            t.eventProcessor && (e = t.eventProcessor(e));
        return _ && !se && (e = _(e)),
        e
    }
    ;
    Q = (e, i) => {
        let a = e;
        if (a.timestamp = of(),
        Vf[0]?.isFrozen() && a.type !== J.FullSnapshot && !(a.type === J.IncrementalSnapshot && a.data.source === Y.Mutation) && Vf.forEach(e => e.unfreeze()),
        oe)
            t?.(de(a), i);
        else if (se) {
            let e = {
                type: `rrweb`,
                event: de(a),
                origin: window.location.origin,
                isCheckout: i
            };
            window.parent.postMessage(e, `*`)
        }
        if (a.type === J.FullSnapshot)
            ue = a,
            E = 0;
        else if (a.type === J.IncrementalSnapshot) {
            if (a.data.source === Y.Mutation && a.data.isAttachIframe)
                return;
            E++;
            let e = r && E >= r
              , t = n && a.timestamp - ue.timestamp > n;
            (e || t) && Pp(!0)
        }
    }
    ;
    let fe = e => {
        Q({
            type: J.IncrementalSnapshot,
            data: {
                source: Y.Mutation,
                ...e
            }
        })
    }
      , pe = e => Q({
        type: J.IncrementalSnapshot,
        data: {
            source: Y.Scroll,
            ...e
        }
    })
      , D = e => Q({
        type: J.IncrementalSnapshot,
        data: {
            source: Y.CanvasMutation,
            ...e
        }
    })
      , me = new Mp({
        mutationCb: fe,
        adoptedStyleSheetCb: e => Q({
            type: J.IncrementalSnapshot,
            data: {
                source: Y.AdoptedStyleSheet,
                ...e
            }
        })
    })
      , O = new dp({
        mirror: Lp,
        mutationCb: fe,
        stylesheetManager: me,
        recordCrossOriginIframes: C,
        wrappedEmit: Q
    });
    for (let e of re || [])
        e.getMirror && e.getMirror({
            nodeMirror: Lp,
            crossOriginIframeMirror: O.crossOriginIframeMirror,
            crossOriginIframeStyleMirror: O.crossOriginIframeStyleMirror
        });
    let he = new Np;
    Fp = new jp({
        recordCanvas: S,
        mutationCb: D,
        win: window,
        blockClass: i,
        blockSelector: a,
        mirror: Lp,
        sampling: v.canvas,
        dataURLOptions: y
    });
    let ge = new fp({
        mutationCb: fe,
        scrollCb: pe,
        bypassOptions: {
            blockClass: i,
            blockSelector: a,
            maskTextClass: c,
            maskTextSelector: l,
            inlineStylesheet: u,
            maskInputOptions: ce,
            dataURLOptions: y,
            maskTextFn: h,
            maskInputFn: m,
            recordCanvas: S,
            inlineImages: ne,
            sampling: v,
            slimDOMOptions: le,
            iframeManager: O,
            stylesheetManager: me,
            canvasManager: Fp,
            keepIframeSrcFn: T,
            processedNodeManager: he
        },
        mirror: Lp
    });
    Pp = (e=!1) => {
        if (!x)
            return;
        Q({
            type: J.Meta,
            data: {
                href: window.location.href,
                width: lf(),
                height: cf()
            }
        }, e),
        me.reset(),
        ge.init(),
        Vf.forEach(e => e.lock());
        let t = cc(document, {
            mirror: Lp,
            blockClass: i,
            blockSelector: a,
            maskTextClass: c,
            maskTextSelector: l,
            inlineStylesheet: u,
            maskAllInputs: ce,
            maskTextFn: h,
            maskInputFn: m,
            slimDOM: le,
            dataURLOptions: y,
            recordCanvas: S,
            inlineImages: ne,
            onSerialize: e => {
                gf(e, Lp) && O.addIframe(e),
                _f(e, Lp) && me.trackLinkElement(e),
                vf(e) && ge.addShadowRoot(G.shadowRoot(e), document)
            }
            ,
            onIframeLoad: (e, t) => {
                O.attachIframe(e, t),
                ge.observeAttachShadow(e)
            }
            ,
            onStylesheetLoad: (e, t) => {
                me.attachLinkElement(e, t)
            }
            ,
            keepIframeSrcFn: T
        });
        if (!t)
            return console.warn(`Failed to snapshot the document`);
        Q({
            type: J.FullSnapshot,
            data: {
                node: t,
                initialOffset: sf(window)
            }
        }, e),
        Vf.forEach(e => e.unlock()),
        document.adoptedStyleSheets && document.adoptedStyleSheets.length > 0 && me.adoptStyleSheets(document.adoptedStyleSheets, Lp.getId(document))
    }
    ;
    try {
        let e = []
          , t = e => Z(sp)({
            mutationCb: fe,
            mousemoveCb: (e, t) => Q({
                type: J.IncrementalSnapshot,
                data: {
                    source: t,
                    positions: e
                }
            }),
            mouseInteractionCb: e => Q({
                type: J.IncrementalSnapshot,
                data: {
                    source: Y.MouseInteraction,
                    ...e
                }
            }),
            scrollCb: pe,
            viewportResizeCb: e => Q({
                type: J.IncrementalSnapshot,
                data: {
                    source: Y.ViewportResize,
                    ...e
                }
            }),
            inputCb: e => Q({
                type: J.IncrementalSnapshot,
                data: {
                    source: Y.Input,
                    ...e
                }
            }),
            mediaInteractionCb: e => Q({
                type: J.IncrementalSnapshot,
                data: {
                    source: Y.MediaInteraction,
                    ...e
                }
            }),
            styleSheetRuleCb: e => Q({
                type: J.IncrementalSnapshot,
                data: {
                    source: Y.StyleSheetRule,
                    ...e
                }
            }),
            styleDeclarationCb: e => Q({
                type: J.IncrementalSnapshot,
                data: {
                    source: Y.StyleDeclaration,
                    ...e
                }
            }),
            canvasMutationCb: D,
            fontCb: e => Q({
                type: J.IncrementalSnapshot,
                data: {
                    source: Y.Font,
                    ...e
                }
            }),
            selectionCb: e => {
                Q({
                    type: J.IncrementalSnapshot,
                    data: {
                        source: Y.Selection,
                        ...e
                    }
                })
            }
            ,
            customElementCb: e => {
                Q({
                    type: J.IncrementalSnapshot,
                    data: {
                        source: Y.CustomElement,
                        ...e
                    }
                })
            }
            ,
            blockClass: i,
            ignoreClass: o,
            ignoreSelector: s,
            maskTextClass: c,
            maskTextSelector: l,
            maskInputOptions: ce,
            inlineStylesheet: u,
            sampling: v,
            recordDOM: x,
            recordCanvas: S,
            inlineImages: ne,
            userTriggeredOnInput: w,
            collectFonts: te,
            doc: e,
            maskInputFn: m,
            maskTextFn: h,
            keepIframeSrcFn: T,
            blockSelector: a,
            slimDOMOptions: le,
            dataURLOptions: y,
            mirror: Lp,
            iframeManager: O,
            stylesheetManager: me,
            shadowDomManager: ge,
            processedNodeManager: he,
            canvasManager: Fp,
            ignoreCSSAttributes: ie,
            plugins: (re?.filter(e => e.observer))?.map(e => ({
                observer: e.observer,
                options: e.options,
                callback: t => Q({
                    type: J.Plugin,
                    data: {
                        plugin: e.name,
                        payload: t
                    }
                })
            })) || []
        }, g);
        O.addLoadListener(n => {
            try {
                e.push(t(n.contentDocument))
            } catch (e) {
                console.warn(e)
            }
        }
        );
        let n = () => {
            Pp(),
            e.push(t(document)),
            Ip = !0
        }
        ;
        return [`interactive`, `complete`].includes(document.readyState) ? n() : (e.push(K(`DOMContentLoaded`, () => {
            Q({
                type: J.DomContentLoaded,
                data: {}
            }),
            ee === `DOMContentLoaded` && n()
        }
        )),
        e.push(K(`load`, () => {
            Q({
                type: J.Load,
                data: {}
            }),
            ee === `load` && n()
        }
        , window))),
        () => {
            e.forEach(e => {
                try {
                    e()
                } catch (e) {
                    String(e).toLowerCase().includes(`cross-origin`) || console.warn(e)
                }
            }
            ),
            he.destroy(),
            Ip = !1,
            Bf()
        }
    } catch (e) {
        console.warn(e)
    }
}
Rp.addCustomEvent = (e, t) => {
    if (!Ip)
        throw Error(`please add custom event after start recording`);
    Q({
        type: J.Custom,
        data: {
            tag: e,
            payload: t
        }
    })
}
,
Rp.freezePage = () => {
    Vf.forEach(e => e.freeze())
}
,
Rp.takeFullSnapshot = e => {
    if (!Ip)
        throw Error(`please take full snapshot after start recording`);
    Pp(e)
}
,
Rp.mirror = Lp;
var zp;
(function(e) {
    e[e.NotStarted = 0] = `NotStarted`,
    e[e.Running = 1] = `Running`,
    e[e.Stopped = 2] = `Stopped`
}
)(zp ||= {});
var {addCustomEvent: Bp} = Rp
  , {freezePage: Vp} = Rp
  , {takeFullSnapshot: Hp} = Rp
  , Up = class {
    #e = new hn(1 / 0);
    cycleTimestamp = Date.now();
    hasSnapshot = !1;
    hasMeta = !1;
    hasError = !1;
    constructor(e=!0) {
        this.inlinedAllStylesheets = e
    }
    add(e, t) {
        this.#e.add(e, t)
    }
    get events() {
        return this.#e.get()
    }
    get payloadBytesEstimation() {
        return this.#e.byteSize()
    }
}
;
function Wp(e) {
    return !!C().o.MO && oi(e) && e?.session_trace.enabled === !0
}
function Gp(e) {
    return e?.session_replay.preload === !0 && Wp(e)
}
function Kp(e, t) {
    try {
        if (typeof t?.type == `string`) {
            if (t.type.toLowerCase() === `password`)
                return `*`.repeat(e?.length || 0);
            if (t?.dataset?.nrUnmask !== void 0 || t?.classList?.contains(`nr-unmask`))
                return e
        }
    } catch {}
    return typeof e == `string` ? e.replace(/[\S]/g, `*`) : `*`.repeat(e?.length || 0)
}
var qp = `rrweb-data`
  , Jp = class {
    #e = !1;
    #t = Ci( () => h(47));
    #n = !0;
    triggerHistory = [];
    constructor(e) {
        this.srInstrument = e,
        this.ee = e.ee,
        this.srFeatureName = e.featureName,
        this.agentRef = e.agentRef,
        this.isErrorMode = !1,
        this.shouldFix = this.agentRef.init.session_replay.fix_stylesheets,
        this.events = new Up(this.shouldFix),
        this.backloggedEvents = new Up(this.shouldFix),
        this.hasSeenSnapshot = !1,
        this.hasSeenMeta = !1,
        this.lastMeta = !1,
        this.stopRecording = () => {
            this.agentRef.runtime.isRecording = !1
        }
        ,
        O(pn, () => {
            this.#n = !1,
            this.stopRecording()
        }
        , this.srFeatureName, this.ee);
        let t = (e, t) => {
            this.audit(e, t)
        }
        ;
        this.srInstrument.featAggregate?.drained ? this.ee.on(qp, t) : O(qp, t, this.srFeatureName, this.ee)
    }
    get trigger() {
        return this.triggerHistory[this.triggerHistory.length - 1]
    }
    getEvents() {
        return {
            events: [...this.backloggedEvents.events, ...this.events.events].filter(e => e),
            type: `standard`,
            cycleTimestamp: Math.min(this.backloggedEvents.cycleTimestamp, this.events.cycleTimestamp),
            payloadBytesEstimation: this.backloggedEvents.payloadBytesEstimation + this.events.payloadBytesEstimation,
            hasError: this.backloggedEvents.hasError || this.events.hasError,
            hasMeta: this.backloggedEvents.hasMeta || this.events.hasMeta,
            hasSnapshot: this.backloggedEvents.hasSnapshot || this.events.hasSnapshot,
            inlinedAllStylesheets: !!this.backloggedEvents.events.length && this.backloggedEvents.inlinedAllStylesheets || this.events.inlinedAllStylesheets
        }
    }
    clearBuffer() {
        this.backloggedEvents = this.isErrorMode ? this.events : new Up(this.shouldFix),
        this.events = new Up(this.shouldFix)
    }
    startRecording(e, t) {
        if (!this.#n)
            return;
        this.triggerHistory.push(e),
        this.isErrorMode = t === M.ERROR,
        this.stopRecording(),
        this.agentRef.runtime.isRecording = !0;
        let {block_class: n, ignore_class: r, mask_text_class: i, block_selector: a, mask_input_options: o, mask_text_selector: s, mask_all_inputs: c, inline_images: l, collect_fonts: u} = this.agentRef.init.session_replay, d;
        try {
            d = Rp({
                emit: (e, t) => {
                    D(qp, [e, t], void 0, this.srFeatureName, this.ee)
                }
                ,
                blockClass: n,
                ignoreClass: r,
                maskTextClass: i,
                blockSelector: a,
                maskInputOptions: o,
                maskTextSelector: s,
                maskTextFn: Kp,
                maskAllInputs: c,
                maskInputFn: Kp,
                inlineStylesheet: !0,
                inlineImages: l,
                collectFonts: u,
                checkoutEveryNms: ni[t],
                recordAfter: `DOMContentLoaded`,
                slimDOMOptions: `all`
            })
        } catch (e) {
            this.ee.emit(`internal-error`, [e])
        }
        this.stopRecording = () => {
            this.agentRef.runtime.isRecording = !1,
            d?.()
        }
    }
    audit(e, t) {
        let n = this.agentRef.init.session_replay.fix_stylesheets ? Ao.evaluate() : 0;
        if (!this.shouldFix)
            return n > 0 && (this.events.inlinedAllStylesheets = !1,
            this.#t(),
            D(N, [`SessionReplay/Payload/Missing-Inline-Css/Skipped`, n], void 0, A.metrics, this.ee)),
            this.store(e, t);
        !n && this.#e && e.type === ti.Meta && (this.#e = !1),
        n > 0 && (Ao.fix().then(e => {
            e > 0 && (this.events.inlinedAllStylesheets = !1,
            this.shouldFix = !1),
            D(N, [`SessionReplay/Payload/Missing-Inline-Css/Failed`, e], void 0, A.metrics, this.ee),
            D(N, [`SessionReplay/Payload/Missing-Inline-Css/Fixed`, n - e], void 0, A.metrics, this.ee),
            this.takeFullSnapshot()
        }
        ),
        (e.type === ti.FullSnapshot || e.type === ti.Meta) && (this.#e = !0)),
        this.#e || this.store(e, t)
    }
    store(e, t) {
        if (!e || this.srInstrument.featAggregate?.blocked)
            return;
        e.timestamp = this.agentRef.runtime.timeKeeper.correctAbsoluteTimestamp(e.timestamp),
        e.__serialized = k(e);
        let n = e.__serialized.length
          , r = this.getPayloadSize(n);
        D(N, [`rrweb/node/` + e.type + `/bytes`, n], void 0, A.metrics, this.ee),
        this.isErrorMode && t && e.type === ti.Meta && this.clearBuffer(),
        this.hasSeenMeta ||= this.events.hasMeta ||= e.type === ti.Meta,
        this.hasSeenSnapshot ||= this.events.hasSnapshot ||= e.type === ti.FullSnapshot,
        this.events.add(e, n),
        (this.events.hasSnapshot && this.events.hasMeta || r > 16e3) && !this.isErrorMode && this.agentRef.runtime.harvester.triggerHarvestFor(this.srInstrument.featAggregate)
    }
    takeFullSnapshot() {
        try {
            if (!this.agentRef.runtime.isRecording)
                return;
            Rp.takeFullSnapshot()
        } catch {}
    }
    clearTimestamps() {
        this.events.cycleTimestamp = void 0
    }
    getPayloadSize(e=0) {
        return this.estimateCompression(this.events.payloadBytesEstimation + e) + ii
    }
    estimateCompression(e) {
        return this.srInstrument.featAggregate?.gzipper && this.srInstrument.featAggregate?.u8 ? e * ei : e
    }
}
  , Yp = e({
    BST_RESOURCE: () => Zp,
    END: () => em,
    ERROR_MODE_SECONDS_WINDOW: () => am,
    FEATURE_NAME: () => Xp,
    FN_END: () => nm,
    FN_START: () => tm,
    MAX_NODES_PER_HARVEST: () => im,
    PUSH_STATE: () => rm,
    RESOURCE: () => Qp,
    START: () => $p
})
  , Xp = A.sessionTrace
  , Zp = `bstResource`
  , Qp = `resource`
  , $p = `-start`
  , em = `-end`
  , tm = `fn-start`
  , nm = `fn-end`
  , rm = `pushState`
  , im = 1e3
  , am = 30 * 1e3;
function om(e) {
    if ((e || ``).indexOf(`data:`) === 0)
        return {
            protocol: `data`
        };
    try {
        let t = new URL(e,location.href)
          , n = {
            port: t.port,
            hostname: t.hostname,
            pathname: t.pathname,
            search: t.search,
            protocol: t.protocol.slice(0, t.protocol.indexOf(`:`)),
            sameOrigin: t.protocol === a?.location?.protocol && t.host === a?.location?.host
        };
        return (!n.port || n.port === ``) && (t.protocol === `http:` && (n.port = `80`),
        t.protocol === `https:` && (n.port = `443`)),
        !n.pathname || n.pathname === `` ? n.pathname = `/` : n.pathname.startsWith(`/`) || (n.pathname = `/${n.pathname}`),
        n
    } catch {
        return {}
    }
}
var sm = class {
    constructor(e, t, n, r, i) {
        this.n = e,
        this.s = t,
        this.e = n,
        this.o = r,
        this.t = i
    }
}
;
function cm(e) {
    switch (e) {
    case `keydown`:
    case `keyup`:
    case `keypress`:
        return `typing`;
    case `mousemove`:
    case `mouseenter`:
    case `mouseleave`:
    case `mouseover`:
    case `mouseout`:
        return `mousing`;
    case `touchstart`:
    case `touchmove`:
    case `touchend`:
    case `touchcancel`:
    case `touchenter`:
    case `touchleave`:
        return `touching`;
    case `scroll`:
    case `scrollend`:
        return `scrolling`;
    default:
        return e
    }
}
var lm = {
    global: {
        mouseup: !0,
        mousedown: !0
    },
    window: {
        load: !0,
        pagehide: !0
    },
    xhrOriginMissing: {
        ignoreAll: !0
    }
}
  , um = {
    typing: `typing`,
    scrolling: `scrolling`,
    mousing: `mousing`,
    touching: `touching`
}
  , dm = {
    [um.typing]: 1e3,
    [um.scrolling]: 100,
    [um.mousing]: 1e3,
    [um.touching]: 1e3
}
  , fm = {
    [um.typing]: 2e3,
    [um.scrolling]: 1e3,
    [um.mousing]: 2e3,
    [um.touching]: 2e3
}
  , pm = class {
    prevStoredEvents = new Set;
    constructor(e) {
        this.parent = e
    }
    #e(e) {
        return e.n in um
    }
    #t(e) {
        let t = t => !(t.o !== e.o || t.n !== e.n || e.s - t.s < fm[e.o] || t.e > e.s - dm[e.o])
          , n = {
            e: e.e
        };
        return this.parent.events.merge(t, n)
    }
    #n(e) {
        if (e.n in lm.global)
            return !0;
        let t = e.o;
        return lm[t]?.ignoreAll || lm[t]?.[e.n] ? !0 : t === `xhrOriginMissing` && e.n === `Ajax`
    }
    #r() {
        if (this.parent.blocked)
            return !1;
        if (this.parent.events.length >= 1e3) {
            if (this.parent.mode !== M.ERROR)
                return !1;
            this.trimSTNsByTime(),
            this.parent.events.length >= 1e3 && this.trimSTNsByIndex(1)
        }
        return !0
    }
    #i(e) {
        return this.#n(e) || !this.#r() ? !1 : ((!this.#e(e) || !this.#t(e)) && this.parent.events.add(e),
        !0)
    }
    storeNode(e) {
        return this.#i(e)
    }
    processPVT(e, t, n) {
        return this.storeTiming({
            [e]: t
        })
    }
    storeTiming(e, t=!1) {
        if (!e)
            return !1;
        let n = !0;
        for (let r in e) {
            let i = e[r]
              , a = r.toLowerCase();
            a.indexOf(`size`) >= 0 || a.indexOf(`status`) >= 0 || typeof i == `number` && i >= 0 && (i = Math.round(i),
            t && this.parent.timeKeeper?.ready && (i = this.parent.timeKeeper.convertAbsoluteTimestamp(Math.floor(this.parent.timeKeeper.correctAbsoluteTimestamp(i)))),
            this.#i(new sm(r,i,i,`document`,`timing`)) || (n = !1))
        }
        return n
    }
    storeEvent(e, t, n, r) {
        if (this.prevStoredEvents.has(e) || !this.#r())
            return !1;
        this.prevStoredEvents.add(e);
        let i = new sm(cm(e.type),n,r,void 0,`event`);
        try {
            i.o = Co(e.target, t, this.parent.ee)
        } catch {
            i.o = Co(null, t, this.parent.ee)
        }
        return this.#i(i)
    }
    storeHist(e, t, n) {
        return this.#i(new sm(`history.pushState`,n,n,e,t))
    }
    storeResources(e) {
        if (!e || e.length === 0)
            return !1;
        let t = !0;
        for (let n = 0; n < e.length; n++) {
            let r = e[n];
            if (!this.#r())
                break;
            let {initiatorType: i, fetchStart: a, responseEnd: o, entryType: s} = r
              , {protocol: c, hostname: l, port: u, pathname: d} = om(r.name)
              , f = new sm(i,a | 0,o | 0,`${c}://${l}:${u}${d}`,s);
            this.#i(f) || (t = !1)
        }
        return t
    }
    storeErrorAgg(e, t, n, r) {
        return e === `err` ? this.#i(new sm(`error`,r.time,r.time,n.message,n.stackHash)) : !1
    }
    storeXhrAgg(e, t, n, r) {
        return e === `xhr` ? this.#i(new sm(`Ajax`,r.time,r.time + r.duration,`${n.status} ${n.method}: ${n.host}${n.pathname}`,`ajax`)) : !1
    }
    trimSTNsByTime(e=am) {
        this.parent.events.clear({
            clearBeforeTime: Math.max(n - e, 0),
            timestampKey: `e`
        })
    }
    trimSTNsByIndex(e=0) {
        this.parent.events.clear({
            clearBeforeIndex: e
        })
    }
    clear() {
        this.prevStoredEvents.clear()
    }
}
  , mm = 5e3
  , hm = class extends Cn {
    static featureName = Xp;
    constructor(e) {
        super(e, Xp),
        this.harvestOpts.raw = !0,
        this.entitled = void 0,
        this.everHarvested = !1,
        this.harvesting = !1,
        this.traceStorage = new pm(this),
        this.waitForFlags([`sts`, `st`]).then( ([e,t]) => this.initialize(e, t))
    }
    initialize(e, t, n) {
        if (this.entitled ??= t,
        this.entitled || (this.blocked = !0),
        this.blocked || (this.timeKeeper ??= this.agentRef.runtime.timeKeeper,
        this.initialized || (this.initialized = !0,
        this.ptid = this.agentRef.runtime.ptid,
        this.sessionId = this.agentRef.runtime.session?.state.value,
        this.ee.on(j.RESET, () => {
            this.blocked || this.abort(1)
        }
        ),
        this.ee.on(j.UPDATE, (e, t) => {
            this.blocked || (this.mode !== M.FULL && (t.sessionReplayMode === M.FULL || t.sessionTraceMode === M.FULL) && this.switchToFull(),
            (this.sessionId !== t.value || e === `cross-tab` && t.sessionTraceMode === M.OFF) && this.abort(2))
        }
        ),
        typeof PerformanceNavigationTiming < `u` && a.performance?.getEntriesByType(`navigation`)?.length > 0 ? this.traceStorage.storeTiming(a.performance.getEntriesByType(`navigation`)[0]) : this.traceStorage.storeTiming(a.performance?.timing, !0)),
        !this.agentRef.runtime.session.isNew && !n ? this.mode = this.agentRef.runtime.session.state.sessionTraceMode : this.mode = e,
        this.mode === M.OFF))
            return this.deregisterDrain();
        O(`bst`, (...e) => this.traceStorage.storeEvent(...e), this.featureName, this.ee),
        O(`bstResource`, (...e) => this.traceStorage.storeResources(...e), this.featureName, this.ee),
        O(`bstHist`, (...e) => this.traceStorage.storeHist(...e), this.featureName, this.ee),
        O(`bstXhrAgg`, (...e) => this.traceStorage.storeXhrAgg(...e), this.featureName, this.ee),
        O(`bstApi`, (...e) => this.traceStorage.storeNode(...e), this.featureName, this.ee),
        O(`trace-jserror`, (...e) => this.traceStorage.storeErrorAgg(...e), this.featureName, this.ee),
        O(`pvtAdded`, (...e) => this.traceStorage.processPVT(...e), this.featureName, this.ee),
        this.mode !== M.FULL && O(`trace-jserror`, () => {
            this.mode === M.ERROR && this.switchToFull()
        }
        , this.featureName, this.ee),
        this.agentRef.runtime.session.write({
            sessionTraceMode: this.mode
        }),
        this.drain()
    }
    preHarvestChecks() {
        if (!(this.blocked || this.mode !== M.FULL) && this.timeKeeper?.ready && this.agentRef.runtime.session) {
            if (this.sessionId !== this.agentRef.runtime.session.state.value || this.ptid !== this.agentRef.runtime.ptid) {
                this.abort(3);
                return
            }
            return !0
        }
    }
    serializer(e) {
        if (e.length)
            return this.everHarvested = !0,
            dr(e, this.obfuscator.obfuscateString.bind(this.obfuscator), `string`)
    }
    queryStringsBuilder(e) {
        let t = !this.agentRef.runtime.session.state.traceHarvestStarted;
        t && this.agentRef.runtime.session.write({
            traceHarvestStarted: !0
        });
        let n = this.agentRef.runtime.session.state.sessionReplayMode === 1
          , r = this.agentRef.info.jsAttributes[`enduser.id`]
          , i = this.agentRef.runtime.appMetadata.agents?.[0]?.entityGuid
          , a = e.reduce( (e, t) => Math.min(e, t.s), 1 / 0)
          , o = e.reduce( (e, t) => Math.max(e, t.s), -1 / 0);
        return {
            browser_monitoring_key: this.agentRef.info.licenseKey,
            type: `BrowserSessionChunk`,
            app_id: this.agentRef.info.applicationID,
            protocol_version: `0`,
            timestamp: Math.floor(this.timeKeeper.correctRelativeTimestamp(a)),
            attributes: Zt({
                ...i && {
                    entityGuid: i
                },
                harvestId: `${this.agentRef.runtime.session.state.value}_${this.agentRef.runtime.ptid}_${this.agentRef.runtime.harvestCount}`,
                "trace.firstTimestamp": Math.floor(this.timeKeeper.correctRelativeTimestamp(a)),
                "trace.lastTimestamp": Math.floor(this.timeKeeper.correctRelativeTimestamp(o)),
                "trace.nodes": e.length,
                "trace.originTimestamp": this.timeKeeper.correctedOriginTime,
                agentVersion: this.agentRef.runtime.version,
                ...t && {
                    firstSessionHarvest: t
                },
                ...n && {
                    hasReplay: n
                },
                ptid: `${this.ptid}`,
                session: `${this.sessionId}`,
                ...r && {
                    "enduser.id": this.obfuscator.obfuscateString(r)
                },
                currentUrl: this.obfuscator.obfuscateString(F(`` + location))
            }, mm).substring(1)
        }
    }
    switchToFull() {
        if (this.mode === M.FULL || !this.entitled || this.blocked)
            return;
        let e = this.mode;
        if (this.mode = M.FULL,
        this.agentRef.runtime.session.write({
            sessionTraceMode: this.mode
        }),
        e === M.OFF || !this.initialized)
            return this.initialize(this.mode, this.entitled);
        this.initialized && (this.traceStorage.trimSTNsByTime(),
        this.agentRef.runtime.harvester.triggerHarvestFor(this))
    }
    abort(e) {
        h(60, e),
        this.blocked = !0,
        this.mode = M.OFF,
        this.agentRef.runtime.session.write({
            sessionTraceMode: this.mode
        }),
        this.events.clear()
    }
    postHarvestCleanup(e) {
        this.traceStorage.clear(),
        super.postHarvestCleanup(e)
    }
}
  , gm = [`click`, `keydown`, `submit`]
  , _m = `popstate`
  , vm = `initialPageLoad`
  , ym = A.softNav
  , bm = 5e3
  , xm = {
    INITIAL_PAGE_LOAD: ``,
    ROUTE_CHANGE: 1,
    UNSPECIFIED: 2
}
  , Sm = {
    INTERACTION: 1,
    AJAX: 2,
    CUSTOM_END: 3,
    CUSTOM_TRACER: 4
}
  , Cm = {
    IP: `in progress`,
    PF: `pending finish`,
    FIN: `finished`,
    CAN: `cancelled`
}
  , wm = 0
  , Tm = class {
    belType;
    children = [];
    start;
    end;
    callbackEnd = 0;
    callbackDuration = 0;
    nodeId = ++wm;
    addChild(e) {
        this.children.push(e)
    }
    serialize() {}
}
  , Em = class extends Tm {
    constructor(e, t) {
        super(),
        this.belType = Sm.AJAX,
        this.method = e.method,
        this.status = e.status,
        this.domain = e.domain,
        this.path = e.path,
        this.txSize = e.requestSize,
        this.rxSize = e.responseSize,
        this.requestedWith = e.type === `fetch` ? 1 : ``,
        this.spanId = e.spanId,
        this.traceId = e.traceId,
        this.spanTimestamp = e.spanTimestamp,
        this.gql = e.gql,
        this.targetAttributes = e.targetAttributes,
        this.start = e.startTime,
        this.end = e.endTime,
        t?.latestLongtaskEnd ? (this.callbackEnd = Math.max(t.latestLongtaskEnd, this.end),
        this.callbackDuration = this.callbackEnd - this.end) : this.callbackEnd = this.end
    }
    serialize(e, t) {
        let n = Pn(t.runtime.obfuscator)
          , r = []
          , i = [I(this.belType), 0, I(this.start - e), I(this.end - this.start), I(this.callbackEnd - this.end), I(this.callbackDuration), n(this.method), I(this.status), n(this.domain), n(this.path), I(this.txSize), I(this.rxSize), this.requestedWith, n(this.nodeId), Nn(this.spanId, n, !0) + Nn(this.traceId, n, !0) + Nn(this.spanTimestamp, I)]
          , a = Fn({
            ...this.gql || {},
            ...this.targetAttributes || {}
        }, n);
        return this.children.forEach(e => a.push(e.serialize())),
        i[1] = I(a.length),
        r.push(i),
        a.length && r.push(a.join(`;`)),
        r.join(`;`)
    }
}
  , Dm = class extends Tm {
    id = ae();
    initialPageURL = s;
    customName;
    customAttributes = {};
    customDataByApi = {};
    queueTime;
    appTime;
    newRoute;
    status = Cm.IP;
    domTimestamp = 0;
    historyTimestamp = 0;
    createdByApi = !1;
    keepOpenUntilEndApi = !1;
    onDone = [];
    customEnd = 0;
    cancellationTimer;
    watchLongtaskTimer;
    constructor(e, t, n, r) {
        super(),
        this.belType = Sm.INTERACTION,
        this.trigger = e,
        this.start = t,
        this.oldRoute = n,
        this.eventSubscription = new Map([[`finished`, []], [`cancelled`, []]]),
        this.forceSave = this.forceIgnore = !1,
        this.trigger === `api` && (this.createdByApi = !0),
        this.newURL = this.oldURL = r || a?.location.href
    }
    updateHistory(e, t) {
        this.domTimestamp > 0 || !t || t === this.oldURL || (this.newURL = t,
        this.historyTimestamp = e || n())
    }
    updateDom(e) {
        !this.historyTimestamp || e < this.historyTimestamp || (this.domTimestamp = e || n())
    }
    checkHistoryAndDomChange() {
        return this.historyTimestamp > 0 && this.domTimestamp > this.historyTimestamp ? this.status === Cm.PF ? !0 : (this.status = Cm.PF,
        clearTimeout(this.cancellationTimer),
        this.watchLongtaskTimer ??= setTimeout( () => this.done(), bm),
        !0) : !1
    }
    on(e, t) {
        if (!this.eventSubscription.has(e))
            throw Error(`Cannot subscribe to non pre-defined events.`);
        if (typeof t != `function`)
            throw Error(`Must supply function as callback.`);
        this.eventSubscription.get(e).push(t)
    }
    done(e=this.customEnd, t=!1) {
        return this.keepOpenUntilEndApi && !t ? !1 : this.status === Cm.FIN || this.status === Cm.CAN ? !0 : (clearTimeout(this.cancellationTimer),
        clearTimeout(this.watchLongtaskTimer),
        this.onDone.forEach(e => e(this.customDataByApi)),
        this.forceIgnore ? this.#t() : this.status === Cm.PF ? this.#e(e) : this.forceSave ? this.#e(e || performance.now()) : this.#t(),
        !0)
    }
    #e(e) {
        this.end = Math.max(this.domTimestamp, this.historyTimestamp, e),
        this.status = Cm.FIN,
        this.eventSubscription.get(`finished`).forEach(e => e())
    }
    #t() {
        this.status = Cm.CAN,
        this.eventSubscription.get(`cancelled`).forEach(e => e())
    }
    isActiveDuring(e) {
        return this.status === Cm.IP || this.status === Cm.PF ? this.start <= e : this.status === Cm.FIN && this.start <= e && e < this.end
    }
    get firstPaint() {}
    get firstContentfulPaint() {}
    get navTiming() {}
    serialize(e, t) {
        let n = e === void 0, r = Pn(t.runtime.obfuscator), i = [], a;
        a = this.trigger === `initialPageLoad` ? xm.INITIAL_PAGE_LOAD : this.newURL === this.oldURL ? xm.UNSPECIFIED : xm.ROUTE_CHANGE;
        let o = [I(this.belType), 0, I(this.start - (n ? 0 : e)), I(this.end - this.start), I(0), I(0), r(this.trigger), r(F(this.initialPageURL, !0)), r(F(this.oldURL, !0)), r(F(this.newURL, !0)), r(this.customName), a, Nn(this.queueTime, I, !0) + Nn(this.appTime, I, !0) + Nn(this.oldRoute, r, !0) + Nn(this.newRoute, r, !0) + r(this.id), r(this.nodeId), Nn(this.firstPaint, I, !0) + Nn(this.firstContentfulPaint, I)]
          , s = Fn({
            ...t.info.jsAttributes,
            ...this.customAttributes
        }, r);
        return t.info.atts && s.push(`a,` + r(t.info.atts)),
        this.children.forEach(r => s.push(r.serialize(n ? this.start : e, t))),
        o[1] = I(s.length),
        i.push(o),
        s.length && i.push(s.join(`;`)),
        this.navTiming ? i.push(this.navTiming) : i.push(``),
        i.join(`;`)
    }
}
  , Om = class extends Dm {
    constructor(e) {
        super(vm, 0, null),
        this.queueTime = e.info.queueTime,
        this.appTime = e.info.applicationTime,
        this.oldURL = document.referrer || void 0
    }
    get firstPaint() {
        return mo.current.value
    }
    get firstContentfulPaint() {
        return po.current.value
    }
    get navTiming() {
        if (!Bi.length)
            return;
        let e = `,`
          , t = `b`
          , n = 0;
        return Bi.slice(1, 21).forEach(r => {
            r === void 0 ? (t += e + `!`,
            e = ``) : (t += e + I(r - n),
            e = `,`,
            n = r)
        }
        ),
        t
    }
}
  , km = class extends Cn {
    static featureName = ym;
    constructor(e, {domObserver: t}) {
        super(e, ym),
        super.customAttributesAreSeparate = !0,
        this.interactionsToHarvest = this.events,
        this.domObserver = t,
        this.initialPageLoadInteraction = new Om(e),
        this.initialPageLoadInteraction.onDone.push( () => {
            e.runtime.session?.isNew && (this.initialPageLoadInteraction.customAttributes.isFirstOfSession = !0),
            this.initialPageLoadInteraction.customAttributes.webdriverDetected = _o,
            this.initialPageLoadInteraction.forceSave = !0;
            let t = this.initialPageLoadInteraction;
            this.events.add(t),
            this.initialPageLoadInteraction = null
        }
        ),
        wo.subscribe( ({value: e}) => {
            this.initialPageLoadInteraction.done(e),
            this.reportSupportabilityMetric(`SoftNav/Interaction/InitialPageLoad/Duration/Ms`, Math.round(e))
        }
        ),
        this.latestRouteSetByApi = null,
        this.interactionInProgress = null,
        this.latestHistoryUrl = window.location.href,
        this.harvestOpts.beforeUnload = () => this.interactionInProgress?.done(),
        this.waitForFlags([`spa`]).then( ([e]) => {
            e ? this.drain() : (this.blocked = !0,
            this.deregisterDrain())
        }
        ),
        O(`newUIEvent`, e => this.startUIInteraction(e.type, Math.floor(e.timeStamp), e.target), this.featureName, this.ee),
        O(`newURL`, (e, t) => {
            this.latestHistoryUrl = t,
            this.interactionInProgress?.updateHistory(e, t)
        }
        , this.featureName, this.ee),
        O(`newDom`, e => {
            this.interactionInProgress?.updateDom(e),
            this.interactionInProgress?.checkHistoryAndDomChange()
        }
        , this.featureName, this.ee),
        this.ee.on(`long-task`, e => {
            this.interactionInProgress?.watchLongtaskTimer && (clearTimeout(this.interactionInProgress.watchLongtaskTimer),
            this.interactionInProgress.customEnd = e.end,
            this.interactionInProgress.watchLongtaskTimer = setTimeout( () => this.interactionInProgress.done(), bm),
            this.reportSupportabilityMetric(`SoftNav/Interaction/Extended`))
        }
        ),
        this.#n(),
        O(`ajax`, this.#e.bind(this), this.featureName, this.ee),
        O(`jserror`, this.#t.bind(this), this.featureName, this.ee)
    }
    serializer(e) {
        let t, n = [];
        for (let r of e)
            n.push(r.serialize(t, this.agentRef)),
            t === void 0 && (t = Math.floor(r.start));
        return `bel.7;${n.join(`;`)}`
    }
    startUIInteraction(e, t, n) {
        if (this.interactionInProgress?.createdByApi || e === `popstate` && this.interactionInProgress?.trigger !== `popstate` && t - this.interactionInProgress?.start <= 500 || this.interactionInProgress?.done() === !1)
            return;
        let r = e === `popstate` ? this.latestHistoryUrl : void 0;
        if (this.interactionInProgress = new Dm(e,t,this.latestRouteSetByApi,r),
        e === gm[0]) {
            let e = Am(n);
            e && (this.interactionInProgress.customAttributes.actionText = e)
        }
        this.interactionInProgress.cancellationTimer = setTimeout( () => {
            this.interactionInProgress.done(),
            this.reportSupportabilityMetric(`SoftNav/Interaction/TimeOut`)
        }
        , 3e4),
        this.setClosureHandlers()
    }
    setClosureHandlers() {
        this.interactionInProgress.on(`finished`, () => {
            let e = this.interactionInProgress;
            this.events.add(this.interactionInProgress),
            this.interactionInProgress = null,
            this.domObserver.disconnect(),
            this.reportSupportabilityMetric(`SoftNav/Interaction/${e.newURL === e.oldURL ? `Custom` : `RouteChange`}/Duration/Ms`, Math.round(e.end - e.start))
        }
        ),
        this.interactionInProgress.on(`cancelled`, () => {
            this.interactionInProgress = null,
            this.domObserver.disconnect()
        }
        )
    }
    getInteractionFor(e) {
        if (this.interactionInProgress?.isActiveDuring(e))
            return this.interactionInProgress;
        let t, n = this.interactionsToHarvest.get();
        if (n) {
            for (let r = n.length - 1; r >= 0; r--) {
                let i = n[r];
                if (i.isActiveDuring(e)) {
                    if (i.trigger !== `initialPageLoad`)
                        return i;
                    t = i
                }
            }
            if (t)
                return t;
            if (this.initialPageLoadInteraction?.isActiveDuring(e))
                return this.initialPageLoadInteraction
        }
    }
    #e(e, t) {
        let n = this.getInteractionFor(e.startTime);
        n ? n.status === Cm.FIN ? r.call(this, e, t, n) : (n.on(`finished`, () => r.call(this, e, t, n)),
        n.on(`cancelled`, () => D(`returnAjax`, [e], void 0, A.ajax, this.ee))) : D(`returnAjax`, [e], void 0, A.ajax, this.ee);
        function r(e, t, n) {
            let r = n.end;
            if (e.startTime > r) {
                D(`returnAjax`, [e], void 0, A.ajax, this.ee);
                return
            }
            let i = new Em(e,t);
            n.addChild(i)
        }
    }
    #t(e) {
        let t = e[3].time
          , n = this.getInteractionFor(t);
        if (!n)
            return D(`returnJserror`, [e], void 0, A.jserrors, this.ee);
        n.status === Cm.FIN ? r.call(this, e, n) : (n.on(`finished`, () => r.call(this, e, n)),
        n.on(`cancelled`, () => D(`returnJserror`, [e], void 0, A.jserrors, this.ee)));
        function r(e, n) {
            if (t > n.end)
                return D(`returnJserror`, [e], void 0, A.jserrors, this.ee);
            let r = e[2];
            r.browserInteractionId = n.id,
            D(`returnJserror`, [e, n.customAttributes], void 0, A.jserrors, this.ee)
        }
    }
    #n() {
        let e = this;
        O(`api-ixn-get`, function(t, {waitForEnd: n}={}) {
            this.associatedInteraction = e.getInteractionFor(t),
            this.associatedInteraction?.trigger === `initialPageLoad` && (this.associatedInteraction = null),
            this.associatedInteraction || (this.associatedInteraction = e.interactionInProgress = new Dm(`api`,Math.floor(t),e.latestRouteSetByApi),
            e.domObserver.observe(document.body, {
                attributes: !0,
                childList: !0,
                subtree: !0,
                characterData: !0
            }),
            e.setClosureHandlers()),
            n === !0 && (this.associatedInteraction.keepOpenUntilEndApi = !0,
            clearTimeout(this.associatedInteraction.cancellationTimer))
        }, e.featureName, e.ee),
        O(`api-ixn-end`, function(e) {
            this.associatedInteraction.done(e, !0)
        }, e.featureName, e.ee),
        O(`api-ixn-save`, function() {
            this.associatedInteraction.forceSave = !0
        }, e.featureName, e.ee),
        O(`api-ixn-ignore`, function() {
            this.associatedInteraction.forceIgnore = !0
        }, e.featureName, e.ee),
        O(`api-ixn-getContext`, function(e, t) {
            typeof t == `function` && setTimeout( () => t(this.associatedInteraction.customDataByApi), 0)
        }, e.featureName, e.ee),
        O(`api-ixn-onEnd`, function(e, t) {
            typeof t == `function` && this.associatedInteraction.onDone.push(t)
        }, e.featureName, e.ee),
        O(`api-ixn-actionText`, function(e, t) {
            t && (this.associatedInteraction.customAttributes.actionText = t)
        }, e.featureName, e.ee),
        O(`api-ixn-setName`, function(e, t, n) {
            t && (this.associatedInteraction.customName = t),
            n && (this.associatedInteraction.trigger = n)
        }, e.featureName, e.ee),
        O(`api-ixn-setAttribute`, function(e, t, n) {
            this.associatedInteraction.customAttributes[t] = n
        }, e.featureName, e.ee),
        O(`api-ixn-routeName`, function(t, n) {
            e.latestRouteSetByApi = n,
            e.interactionInProgress && (e.interactionInProgress.newRoute = n)
        }, e.featureName, e.ee)
    }
}
;
function Am(e) {
    let t = e.tagName?.toLowerCase();
    if ([`a`, `button`, `input`].includes(t))
        return e.title || e.value || e.innerText
}
var jm = class extends _r {
    constructor(e, t) {
        super(e, t),
        this.onPause = typeof e.onPause == `function` ? e.onPause : () => {}
        ,
        this.onRefresh = typeof e.onRefresh == `function` ? e.onRefresh : () => {}
        ,
        this.onResume = typeof e.onResume == `function` ? e.onResume : () => {}
        ,
        this.readStorage = e.readStorage,
        this.remainingMs = void 0,
        e.refreshEvents ||= [`click`, `keydown`, `scroll`];
        try {
            this.abortController = new AbortController
        } catch {}
        if (r && e.ee) {
            if (e.ee) {
                this.ee = e.ee;
                let t = Si(this.refresh.bind(this), 500, {
                    leading: !0
                });
                this.refreshHandler = n => {
                    e.refreshEvents.includes(n?.[0]?.type) && t()
                }
                ,
                e.ee.on(`fn-end`, this.refreshHandler)
            }
            Ht(e => {
                e === `hidden` ? this.pause() : this.resume()
            }
            , !1, !1, this.abortController?.signal)
        }
    }
    abort() {
        this.clear(),
        this.abortController?.abort(),
        this.refreshHandler &&= (this.ee.removeEventListener(`fn-end`, this.refreshHandler),
        this.ee = null)
    }
    pause() {
        this.onPause(),
        clearTimeout(this.timer),
        this.remainingMs = this.initialMs - (Date.now() - this.startTimestamp)
    }
    resume() {
        try {
            let t = this.readStorage()
              , n = typeof t == `string` ? JSON.parse(t) : t;
            e(n.expiresAt) || e(n.inactiveAt) ? this.end() : (this.refresh(),
            this.onResume())
        } catch {
            this.end()
        }
        function e(e) {
            return Date.now() > e
        }
    }
    refresh(e, t) {
        this.clear(),
        this.timer = this.create(e, t),
        this.startTimestamp = Date.now(),
        this.remainingMs = void 0,
        this.onRefresh()
    }
}
  , Mm = `nr@original:${le}`
  , Nm = 50
  , Pm = Object.prototype.hasOwnProperty
  , Fm = !1;
function Im(e, t, n) {
    return e ||= E,
    r.inPlace = i,
    r.flag = Mm,
    r;
    function r(t, r, i, o, s, c) {
        if (zm(t))
            return t;
        return r ||= ``,
        l[Mm] = t,
        Rm(t, l, e),
        l;
        function l() {
            var l, u, d, f;
            let p, m;
            try {
                u = this,
                l = [...arguments],
                m = c ? cr(n) : [void 0],
                d = typeof i == `function` ? i(l, u) : i || {}
            } catch (t) {
                Lm([t, ``, [l, u, o], d], e)
            }
            a(r + `start`, [l, u, o, m], d, s);
            let h = performance.now(), g;
            try {
                return f = t.apply(u, l),
                g = performance.now(),
                f
            } catch (e) {
                throw g = performance.now(),
                a(r + `err`, [l, u, e, m], d, s),
                p = e,
                p
            } finally {
                let e = g - h
                  , t = {
                    start: h,
                    end: g,
                    duration: e,
                    isLongTask: e >= Nm,
                    methodName: o,
                    thrownError: p
                };
                t.isLongTask && a(`long-task`, [t, u, m], d, s),
                a(r + `end`, [l, u, f, m], d, s)
            }
        }
    }
    function i(e, t, n, i, a, o) {
        n ||= ``;
        let s = n.charAt(0) === `-`;
        for (let c = 0; c < t.length; c++) {
            let l = t[c]
              , u = e[l];
            zm(u) || (e[l] = r(u, s ? l + n : n, i, l, a, o))
        }
    }
    function a(n, r, i, a) {
        if (!(Fm && !t)) {
            var o = Fm;
            Fm = !0;
            try {
                e.emit(n, r, i, t, a)
            } catch (t) {
                Lm([t, n, r, i], e)
            }
            Fm = o
        }
    }
}
function Lm(e, t) {
    t ||= E;
    try {
        t.emit(`internal-error`, e)
    } catch {}
}
function Rm(e, t, n) {
    if (Object.defineProperty && Object.keys)
        try {
            return Object.keys(e).forEach(function(n) {
                Object.defineProperty(t, n, {
                    get: function() {
                        return e[n]
                    },
                    set: function(t) {
                        return e[n] = t,
                        t
                    }
                })
            }),
            t
        } catch (e) {
            Lm([e], n)
        }
    for (var r in e)
        Pm.call(e, r) && (t[r] = e[r]);
    return t
}
function zm(e) {
    return !(e && typeof e == `function` && e.apply && !e[Mm])
}
var Bm = {}
  , Vm = a.XMLHttpRequest
  , Hm = `addEventListener`
  , Um = `removeEventListener`
  , Wm = `nr@wrapped:${ue}`;
function Gm(e) {
    var t = qm(e);
    if (Bm[t.debugId]++)
        return t;
    Bm[t.debugId] = 1;
    var n = Im(t, !0);
    `getPrototypeOf` in Object && (r && Km(document, i),
    Vm && Km(Vm.prototype, i),
    Km(a, i)),
    t.on(`addEventListener-start`, function(e, t) {
        var r = e[1];
        if (!(r === null || typeof r != `function` && typeof r != `object` || e[0] === `newrelic`)) {
            var i = ne(r, Wm, function() {
                var e = {
                    object: t,
                    function: r
                }[typeof r];
                return e ? n(e, `fn-`, null, e.name || `anonymous`) : r;
                function t() {
                    if (typeof r.handleEvent == `function`)
                        return r.handleEvent.apply(r, arguments)
                }
            });
            this.wrapped = e[1] = i
        }
    }),
    t.on(`removeEventListener-start`, function(e) {
        e[1] = this.wrapped || e[1]
    });
    function i(e) {
        n.inPlace(e, [Hm, Um], `-`, o)
    }
    function o(e, t) {
        return e[1]
    }
    return t
}
function Km(e, t, ...n) {
    let r = e;
    for (; typeof r == `object` && !Object.prototype.hasOwnProperty.call(r, Hm); )
        r = Object.getPrototypeOf(r);
    r && t(r, ...n)
}
function qm(e) {
    return (e || E).get(`events`)
}
var Jm = {
    value: ``,
    inactiveAt: 0,
    expiresAt: 0,
    updatedAt: Date.now(),
    sessionReplayMode: M.OFF,
    sessionReplaySentFirstChunk: !1,
    sessionTraceMode: M.OFF,
    traceHarvestStarted: !1,
    loggingMode: qr.OFF,
    logApiMode: qr.OFF,
    serverTimeDiff: null,
    custom: {},
    numOfResets: 0,
    consent: !1
}
  , Ym = class {
    constructor(e) {
        let {agentRef: t, key: n, storage: i} = e;
        if (!t || !n || !i)
            throw Error(`Missing required field(s):${t ? `` : ` agentRef`}${n ? `` : ` key`}${i ? `` : ` storage`}`);
        this.agentRef = t,
        this.storage = i,
        this.state = {},
        this.key = n,
        this.ee = t.ee,
        Gm(this.ee),
        this.setup(e),
        r && Bt(`storage`, e => {
            if (e.key === this.lookupKey) {
                let t = typeof e.newValue == `string` ? JSON.parse(e.newValue) : e.newValue;
                this.sync(t),
                this.ee.emit(j.UPDATE, [xt.CROSS_TAB, this.state])
            }
        }
        )
    }
    setup({value: e=oe(16), expiresMs: t=yt, inactiveMs: n=bt, numOfResets: r=0}) {
        let i = {
            serverTimeDiff: this.state.serverTimeDiff || Jm.serverTimeDiff,
            consent: this.state.consent || Jm.consent
        };
        this.state = {},
        this.sync({
            ...Jm,
            ...i
        }),
        this.state.value = e,
        this.expiresMs = t,
        this.inactiveMs = n;
        let a = this.read();
        t ? (this.state.expiresAt = a?.expiresAt || this.getFutureTimestamp(t),
        this.state.numOfResets = a?.numOfResets || r,
        this.expiresTimer = new _r({
            onEnd: () => {
                this.collectSM(`expired`),
                this.collectSM(`duration`),
                this.reset()
            }
        },this.state.expiresAt - Date.now())) : this.state.expiresAt = 1 / 0,
        n ? (this.state.inactiveAt = a?.inactiveAt || this.getFutureTimestamp(n),
        this.inactiveTimer = new jm({
            onEnd: () => {
                this.collectSM(`inactive`),
                this.collectSM(`duration`),
                this.reset()
            }
            ,
            onRefresh: this.refresh.bind(this),
            onResume: () => {
                this.ee.emit(j.RESUME)
            }
            ,
            onPause: () => {
                this.initialized && this.ee.emit(j.PAUSE),
                this.write(Ie(this.state, Jm))
            }
            ,
            ee: this.ee,
            refreshEvents: [`click`, `keydown`, `scroll`],
            readStorage: () => this.storage.get(this.lookupKey)
        },this.state.inactiveAt - Date.now())) : this.state.inactiveAt = 1 / 0,
        this.isNew ||= !Object.keys(a).length,
        this.isNew ? this.write(Ie(this.state, Jm), !0) : this.sync(a),
        this.initialized = !0,
        this.ee.emit(j.STARTED, [this.isNew])
    }
    get lookupKey() {
        return `${_t}_${this.key}`
    }
    sync(e) {
        Object.assign(this.state, e)
    }
    read() {
        try {
            let e = this.storage.get(this.lookupKey);
            if (!e)
                return {};
            let t = typeof e == `string` ? JSON.parse(e) : e;
            return this.isInvalid(t) ? {} : this.isExpired(t.expiresAt) ? (this.collectSM(`expired`),
            this.collectSM(`duration`, t, !0),
            this.reset()) : this.isExpired(t.inactiveAt) ? (this.collectSM(`inactive`),
            this.collectSM(`duration`, t, !0),
            this.reset()) : t
        } catch (e) {
            return h(10, e),
            {}
        }
    }
    write(e) {
        try {
            return !e || typeof e != `object` ? void 0 : (e.updatedAt = Date.now(),
            this.sync(e),
            this.storage.set(this.lookupKey, k(this.state)),
            this.ee.emit(j.UPDATE, [xt.SAME_TAB, this.state]),
            e)
        } catch (e) {
            return h(11, e),
            null
        }
    }
    reset() {
        try {
            return h(66),
            this.initialized && (this.ee.emit(j.RESET),
            this.state.numOfResets++),
            this.storage.remove(this.lookupKey),
            this.inactiveTimer?.abort?.(),
            this.expiresTimer?.clear?.(),
            delete this.isNew,
            this.setup({
                agentRef: this.agentRef,
                key: this.key,
                storage: this.storage,
                expiresMs: this.expiresMs,
                inactiveMs: this.inactiveMs,
                numOfResets: this.state.numOfResets
            }),
            this.read()
        } catch {
            return {}
        }
    }
    refresh() {
        let e = this.read();
        this.write({
            ...e,
            inactiveAt: this.getFutureTimestamp(this.inactiveMs)
        })
    }
    isExpired(e) {
        return Date.now() > e
    }
    isInvalid(e) {
        return !Object.keys(Jm).every(t => Object.keys(e).includes(t))
    }
    collectSM(e, t, n) {
        let r, i;
        e === `duration` && (r = this.getDuration(t, n),
        i = `Session/Duration/Ms`),
        e === `expired` && (i = `Session/Expired/Seen`),
        e === `inactive` && (i = `Session/Inactive/Seen`),
        i && D(N, [i, r], void 0, A.metrics, this.ee)
    }
    getDuration(e=this.state, t) {
        let n = e.expiresAt - this.expiresMs;
        return (t ? Date.now() : e.updatedAt) - n
    }
    getFutureTimestamp(e) {
        return Date.now() + e
    }
    syncCustomAttribute(e, t) {
        if (r)
            if (t === null) {
                let t = this.read();
                t.custom && (delete t.custom[e],
                this.write({
                    ...t
                }))
            } else {
                let n = this.read();
                this.custom = {
                    ...n?.custom || {},
                    [e]: t
                },
                this.write({
                    ...n,
                    custom: this.custom
                })
            }
    }
}
  , Xm = class {
    get(e) {
        try {
            return localStorage.getItem(e) || void 0
        } catch {
            return ``
        }
    }
    set(e, t) {
        try {
            return t == null ? this.remove(e) : localStorage.setItem(e, t)
        } catch {}
    }
    remove(e) {
        try {
            localStorage.removeItem(e)
        } catch {}
    }
}
;
function Zm(e, t) {
    let n = e[t] ??= {}
      , r = {
        bytes: Object.keys(n).reduce( (e, t) => e + t.length + k(n[t]).length, 0)
    };
    return e[t] = new Proxy(n,{
        set(e, t, n) {
            return r.bytes += t.length + k(n).length,
            e[t] = n,
            !0
        },
        deleteProperty(e, t) {
            return r.bytes -= t.length + k(e[t]).length,
            delete e[t]
        }
    }),
    r
}
var Qm = class extends ct {
    agentIdentifier = oe(16)
}
;
function $(e, t, n, r) {
    let i = r || n;
    !i || i[e] && i[e] !== Qm.prototype[e] || (i[e] = function() {
        D(N, [`API/` + e + `/called`], void 0, A.metrics, n.ee),
        m({
            drained: !!n.runtime?.activatedFeatures,
            type: `data`,
            name: `api`,
            feature: Be + e,
            data: {}
        });
        try {
            return t.apply(this, arguments)
        } catch (e) {
            h(23, e)
        }
    }
    )
}
function $m(e, t, r, i, a) {
    let o = e.info;
    r === null ? delete o.jsAttributes[t] : o.jsAttributes[t] = r,
    (a || r === null) && D(Be + i, [n(), t, r], void 0, `session`, e.ee)
}
function eh(e) {
    if (e.runtime.session)
        return e.runtime.session;
    let t = e.init.session;
    e.runtime.session = new Ym({
        agentRef: e,
        key: vt,
        storage: new Xm,
        expiresMs: t?.expiresMs,
        inactiveMs: t?.inactiveMs
    });
    let n = e.runtime.session.state.custom;
    n && Object.keys(n).length && (e.info = ze({
        ...e.info,
        jsAttributes: {
            ...n,
            ...e.info.jsAttributes
        }
    })),
    e.runtime.jsAttributesMetadata = Zm(e.info, `jsAttributes`);
    let r = e.ee;
    return O(`api-setCustomAttribute`, (t, n, r) => {
        e.runtime.session.syncCustomAttribute(n, r)
    }
    , `session`, r),
    O(`api-setUserId`, (t, n, r) => {
        e.runtime.session.syncCustomAttribute(n, r)
    }
    , `session`, r),
    O(`api-setUserIdAndResetSession`, t => {
        e.runtime.session.reset(),
        D(N, [`API/` + rt + `/resetSession/called`], void 0, A.metrics, r),
        $m(e, `enduser.id`, t, rt, !0)
    }
    , `session`, r),
    O(`api-consent`, t => {
        e.runtime.session.write({
            consent: t === void 0 ? !0 : t
        })
    }
    , `session`, r),
    je(e, `session`),
    e.runtime.session
}
var th = Object.values(A);
function nh(e) {
    let t = {};
    return th.forEach(n => {
        t[n] = !!e[n]?.enabled
    }
    ),
    t
}
function rh(e) {
    switch (e) {
    case A.ajax:
        return [A.jserrors];
    case A.sessionTrace:
        return [A.ajax, A.pageViewEvent];
    case A.sessionReplay:
        return [A.sessionTrace];
    case A.pageViewTiming:
        return [A.pageViewEvent];
    default:
        return []
    }
}
function ih(e) {
    $(nt, function(t, r) {
        typeof t == `string` && (t.charAt(0) !== `/` && (t = `/` + t),
        e.runtime.customTransaction = (r || `http://custom.transaction`) + t,
        D(Be + nt, [n()], void 0, void 0, e.ee))
    }, e)
}
var ah = class extends Fe {
    constructor(e, t) {
        super(e, t),
        this.abortHandler = void 0,
        this.featAggregate = void 0,
        this.loadedSuccessfully = void 0,
        this.onAggregateImported = new Promise(e => {
            this.loadedSuccessfully = e
        }
        ),
        this.deferred = Promise.resolve(),
        e.init[this.featureName].autoStart === !1 ? this.deferred = new Promise( (t, n) => {
            this.ee.on(`manual-start-all`, Ci( () => {
                ke(e, this.featureName),
                t()
            }
            ))
        }
        ) : ke(e, t)
    }
    importAggregator(e, n, i={}) {
        if (this.featAggregate)
            return;
        let a = async () => {
            await this.deferred;
            let r;
            try {
                if (oi(e.init)) {
                    let {setupAgentSession: n} = await t(async () => {
                        let {setupAgentSession: e} = await import(`./agent-session-DPoxIKrp.js`);
                        return {
                            setupAgentSession: e
                        }
                    }
                    , []);
                    r = n(e)
                }
            } catch (e) {
                h(20, e),
                this.ee.emit(`internal-error`, [e]),
                D(pn, [e], void 0, this.featureName, this.ee)
            }
            try {
                if (!this.#e(this.featureName, r, e.init)) {
                    je(this.agentRef, this.featureName),
                    this.loadedSuccessfully(!1);
                    return
                }
                let {Aggregate: t} = await n();
                this.featAggregate = new t(e,i),
                e.runtime.harvester.initializedAggregates.push(this.featAggregate),
                this.loadedSuccessfully(!0)
            } catch (e) {
                h(34, e),
                this.abortHandler?.(),
                je(this.agentRef, this.featureName, !0),
                this.loadedSuccessfully(!1),
                this.ee && this.ee.abort()
            }
        }
        ;
        r ? Ti( () => a(), !0) : a()
    }
    #e(e, t, n) {
        if (this.blocked)
            return !1;
        switch (e) {
        case A.sessionReplay:
            return Wp(n) && !!t;
        case A.sessionTrace:
            return !!t;
        default:
            return !0
        }
    }
}
  , oh = class extends ah {
    static featureName = Wi;
    constructor(e) {
        super(e, Wi),
        this.setupInspectionEvents(),
        ih(e),
        this.importAggregator(e, () => t( () => import(`./aggregate-DBFNcRGT.js`), []))
    }
    setupInspectionEvents() {
        let e = (e, t) => {
            e && m({
                timeStamp: e.timeStamp,
                loaded: e.target.readyState === `complete`,
                type: `window`,
                name: t,
                data: e.target.location + ``
            })
        }
        ;
        Ei(t => {
            e(t, `DOMContentLoaded`)
        }
        ),
        Ti(t => {
            e(t, `load`)
        }
        ),
        Di(t => {
            e(t, `navigate`)
        }
        ),
        this.ee.on(j.UPDATE, (e, t) => {
            m({
                type: `lifecycle`,
                name: `session`,
                data: t
            })
        }
        )
    }
}
;
function sh(e) {
    $(et, function(t, n, r=!1) {
        if (typeof t != `string`) {
            h(39, typeof t);
            return
        }
        if (!([`string`, `number`, `boolean`].includes(typeof n) || n === null)) {
            h(40, typeof n);
            return
        }
        return $m(e, t, n, et, r)
    }, e)
}
function ch(e) {
    $(rt, function(t, n=!1) {
        if (!(typeof t == `string` || t === null)) {
            h(41, typeof t);
            return
        }
        let r = e.info.jsAttributes[`enduser.id`];
        n && r != null && r !== t ? D(Be + `setUserIdAndResetSession`, [t], void 0, `session`, e.ee) : $m(e, `enduser.id`, t, rt, !0)
    }, e)
}
function lh(e) {
    $(Qe, function(t) {
        if (!(typeof t == `string` || t === null)) {
            h(42, typeof t);
            return
        }
        return $m(e, `application.version`, t, Qe, !1)
    }, e)
}
function uh(e) {
    $(it, function() {
        e.ee.emit(`manual-start-all`)
    }, e)
}
function dh(e) {
    $(st, function(t=!0) {
        if (typeof t != `boolean`) {
            h(65, typeof t);
            return
        }
        if (D(Be + st, [t], void 0, `session`, e.ee),
        e.runtime.consented = t,
        t) {
            let t = e.features.page_view_event;
            t.onAggregateImported.then(e => {
                let n = t.featAggregate;
                e && !n.sentRum && n.sendRum()
            }
            )
        }
    }, e)
}
var fh = class extends Qm {
    constructor(e) {
        if (super(),
        !a) {
            h(21);
            return
        }
        this.features = {},
        ee(this.agentIdentifier, this),
        this.desiredFeatures = new Set(e.features || []),
        this.desiredFeatures.add(oh),
        Ft(this, e, e.loaderType || `agent`),
        sh(this),
        ch(this),
        lh(this),
        uh(this),
        dh(this),
        this.run()
    }
    get config() {
        return {
            info: this.info,
            init: this.init,
            loader_config: this.loader_config,
            runtime: this.runtime
        }
    }
    get api() {
        return this
    }
    run() {
        try {
            let e = nh(this.init)
              , t = [...this.desiredFeatures];
            t.sort( (e, t) => Ee[e.featureName] - Ee[t.featureName]),
            t.forEach(t => {
                if (!e[t.featureName] && t.featureName !== A.pageViewEvent)
                    return;
                let n = rh(t.featureName).filter(e => !(e in this.features));
                n.length > 0 && h(36, {
                    targetFeature: t.featureName,
                    missingDependencies: n
                }),
                this.features[t.featureName] = new t(this)
            }
            )
        } catch (e) {
            h(22, e);
            for (let e in this.features)
                this.features[e].abortHandler?.();
            let t = y();
            return delete t.initializedAgents[this.agentIdentifier]?.features,
            delete this.sharedAggregator,
            t.ee.get(this.agentIdentifier).abort(),
            !1
        }
    }
}
  , ph = class extends ah {
    static featureName = yo;
    constructor(e) {
        super(e, yo),
        r && (Ht( () => D(`docHidden`, [n()], void 0, yo, this.ee), !0),
        Ut( () => D(`winPagehide`, [n()], void 0, yo, this.ee)),
        this.importAggregator(e, () => t( () => import(`./aggregate-DHS-oLw3.js`), [])))
    }
}
  , mh = class extends ah {
    static featureName = Rt;
    constructor(e) {
        super(e, Rt),
        this.importAggregator(e, () => t( () => import(`./aggregate-Bq0--SwF.js`), []))
    }
}
  , hh = class {
    constructor(e, t, n, r, i) {
        this.name = `UncaughtError`,
        this.message = typeof e == `string` ? e : k(e),
        this.sourceURL = t,
        this.line = n,
        this.column = r,
        this.__newrelic = i
    }
}
;
function gh(e) {
    return yh(e) ? e : new hh(e?.message === void 0 ? e : e.message,e?.filename || e?.sourceURL,e?.lineno || e?.line,e?.colno || e?.col,e?.__newrelic,e?.cause)
}
function _h(e) {
    let t = `Unhandled Promise Rejection: `;
    if (!e?.reason)
        return;
    if (yh(e.reason)) {
        try {
            e.reason.message.startsWith(t) || (e.reason.message = t + e.reason.message)
        } catch {}
        return gh(e.reason)
    }
    let n = gh(e.reason);
    return (n.message || ``).startsWith(t) || (n.message = t + n.message),
    n
}
function vh(e) {
    if (e.error instanceof SyntaxError && !/:\d+$/.test(e.error.stack?.trim())) {
        let t = new hh(e.message,e.filename,e.lineno,e.colno,e.error.__newrelic,e.cause);
        return t.name = SyntaxError.name,
        t
    }
    return yh(e.error) ? e.error : gh(e)
}
function yh(e) {
    return e instanceof Error && !!e.stack
}
function bh(e) {
    $(qe, (t, n) => xh(t, n, e), e)
}
function xh(e, t, r, i, a=n()) {
    typeof e == `string` && (e = Error(e)),
    D(`err`, [e, a, !1, t, r.runtime.isRecording, void 0, i], void 0, A.jserrors, r.ee),
    D(`uaErr`, [], void 0, A.genericEvents, r.ee)
}
function Sh(e) {
    $(tt, function(t) {
        e.runtime.onerror = t
    }, e)
}
function Ch(e) {
    let t = 0;
    $(We, function(e, n) {
        ++t > 10 || (this.runtime.releaseIds[e.slice(-200)] = (`` + n).slice(-200))
    }, e)
}
function wh(e) {
    $(`log`, (t, n) => Th(t, n, e), e)
}
function Th(e, {customAttributes: t={}, level: r=Kr.INFO}={}, i, a, o=n()) {
    Xr(i.ee, e, t, r, !1, a, o)
}
function Eh(e) {
    $(He, (t, n) => Dh(t, n, e), e)
}
function Dh(e, t, r, i, a=n()) {
    D(Be + He, [a, e, t, i], void 0, A.genericEvents, r.ee)
}
function Oh(e) {
    $(ot, (t, n) => kh(t, n, e), e)
}
function kh(e, t, r, i, a=n()) {
    let {start: o, end: s, customAttributes: c} = t || {}
      , l = {
        customAttributes: c || {}
    };
    if (typeof l.customAttributes != `object` || typeof e != `string` || e.length === 0) {
        h(57);
        return
    }
    let u = (e, t) => e == null ? t : typeof e == `number` ? e : e instanceof PerformanceMark ? e.startTime : NaN;
    if (l.start = u(o, 0),
    l.end = u(s, a),
    Number.isNaN(l.start) || Number.isNaN(l.end)) {
        h(57);
        return
    }
    if (l.duration = l.end - l.start,
    l.duration < 0) {
        h(58);
        return
    }
    return D(Be + ot, [l, e, i], void 0, A.genericEvents, r.ee),
    l
}
function Ah(e) {
    $(Ye, (t, n) => jh(t, n, e), e)
}
function jh(e, t={}, r, i, a=n()) {
    D(Be + Ye, [a, e, t, i], void 0, A.genericEvents, r.ee)
}
var Mh = [`name`, `id`, `type`]
  , Nh = new Map([[Dh, `addPageAction`], [Th, `log`], [kh, `measure`], [xh, `noticeError`], [jh, `recordCustomEvent`]])
  , Ph = {
    experimental: Ci( () => h(54, `newrelic.register`)),
    disabled: Ci( () => h(55)),
    invalidTarget: Ci(e => h(48, e)),
    deregistered: Ci( () => h(68))
};
function Fh(e) {
    $(Ze, function(t) {
        return Ih(e, t)
    }, e)
}
function Ih(e, t) {
    Ph.experimental(),
    t ||= {},
    t.instance = oe(8),
    t.type = rr.MFE,
    t.licenseKey ||= e.info.licenseKey,
    t.blocked = !1,
    (typeof t.tags != `object` || t.tags === null || Array.isArray(t.tags)) && (t.tags = {}),
    t.parent ??= {
        get id() {
            return e.runtime.appMetadata.agents[0].entityGuid
        },
        type: rr.BA
    };
    let r = nr()
      , i = {};
    Object.prototype.hasOwnProperty.call(t, `attributes`) || Object.defineProperty(t, "attributes", {
        get() {
            return {
                ...i,
                "source.id": t.id,
                "source.name": t.name,
                "source.type": t.type,
                "parent.type": t.parent?.type || rr.BA,
                "parent.id": t.parent?.id
            }
        }
    }),
    Object.entries(t.tags).forEach( ([e,t]) => {
        Mh.includes(e) || (i[`source.${e}`] = t)
    }
    );
    let a = () => {}
      , o = e.runtime.registeredEntities
      , s = e => {
        t.blocked = !0,
        a = e
    }
    ;
    function c(e) {
        return typeof e == `string` && !!e.trim() && e.trim().length < 501
    }
    e.init.api.register.enabled || s(Ph.disabled),
    (!c(t.id) || !c(t.name)) && s( () => Ph.invalidTarget(t));
    let l = {
        addPageAction: (n, r={}) => p(Dh, [n, {
            ...i,
            ...r
        }, e], t),
        deregister: () => {
            d(),
            s(Ph.deregistered)
        }
        ,
        log: (n, r={}) => p(Th, [n, {
            ...r,
            customAttributes: {
                ...i,
                ...r.customAttributes || {}
            }
        }, e], t),
        measure: (n, r={}) => p(kh, [n, {
            ...r,
            customAttributes: {
                ...i,
                ...r.customAttributes || {}
            }
        }, e], t),
        noticeError: (n, r={}) => p(xh, [n, {
            ...i,
            ...r
        }, e], t),
        recordCustomEvent: (n, r={}) => p(jh, [n, {
            ...i,
            ...r
        }, e], t),
        setApplicationVersion: e => f(`application.version`, e),
        setCustomAttribute: (e, t) => f(e, t),
        setUserId: e => f(`enduser.id`, e),
        metadata: {
            get customAttributes() {
                return i
            },
            target: t,
            timings: r
        }
    }
      , u = () => (t.blocked && a(),
    t.blocked);
    u() || (o.push(l),
    Ut(d));
    function d() {
        if (r.reportedAt)
            return;
        r.reportedAt = n();
        let e = r.fetchEnd - r.fetchStart
          , t = r.scriptEnd - r.scriptStart;
        l.recordCustomEvent(`MicroFrontEndTiming`, {
            assetUrl: r.asset,
            assetType: r.type,
            timeAlive: r.reportedAt - r.registeredAt,
            timeToBeRequested: r.fetchStart,
            timeToExecute: t,
            timeToFetch: e,
            timeToLoad: e + t,
            timeToRegister: r.registeredAt
        })
    }
    let f = (e, t) => {
        u() || (i[e] = t)
    }
      , p = (t, r, i) => {
        if (u() && t !== Ih)
            return;
        let a = n();
        D(N, [`API/register/${Nh.get(t) || `unknown`}/called`], void 0, A.metrics, e.ee);
        try {
            return t(...r, i, a)
        } catch (e) {
            h(50, e)
        }
    }
    ;
    return l
}
var Lh = class extends ah {
    static featureName = Br;
    constructor(e) {
        super(e, Br),
        bh(e),
        Sh(e),
        Ch(e),
        Fh(e);
        try {
            this.removeOnAbort = new AbortController
        } catch {}
        this.ee.on(`internal-error`, (t, r) => {
            this.abortHandler && D(`ierr`, [gh(t), n(), !0, {}, e.runtime.isRecording, r], void 0, this.featureName, this.ee)
        }
        ),
        a.addEventListener(`unhandledrejection`, t => {
            this.abortHandler && D(`err`, [_h(t), n(), !1, {
                unhandledPromiseRejection: 1
            }, e.runtime.isRecording], void 0, this.featureName, this.ee)
        }
        , P(!1, this.removeOnAbort?.signal)),
        a.addEventListener(`error`, t => {
            this.abortHandler && D(`err`, [vh(t), n(), !1, {}, e.runtime.isRecording], void 0, this.featureName, this.ee)
        }
        , P(!1, this.removeOnAbort?.signal)),
        this.abortHandler = this.#e,
        this.importAggregator(e, () => t( () => import(`./aggregate-9oTXHcE8.js`), []))
    }
    #e() {
        this.removeOnAbort?.abort(),
        this.abortHandler = void 0
    }
}
  , Rh = 1
  , zh = `nr@id`;
function Bh(e) {
    let t = typeof e;
    return !e || !(t === `object` || t === `function`) ? -1 : e === a ? 0 : ne(e, zh, function() {
        return Rh++
    })
}
function Vh(e) {
    if (typeof e == `string` && e.length)
        return e.length;
    if (typeof e == `object`) {
        if (typeof ArrayBuffer < `u` && e instanceof ArrayBuffer && e.byteLength)
            return e.byteLength;
        if (typeof Blob < `u` && e instanceof Blob && e.size)
            return e.size;
        if (!(typeof FormData < `u` && e instanceof FormData))
            try {
                return k(e).length
            } catch {
                return
            }
    }
}
var Hh = {}
  , Uh = [`open`, `send`];
function Wh(e, t) {
    var n = e || E;
    let r = Gh(n);
    if (a.XMLHttpRequest === void 0 || Hh[r.debugId]++)
        return r;
    Hh[r.debugId] = 1,
    Gm(n);
    var i = Im(r)
      , o = a.XMLHttpRequest
      , s = a.MutationObserver
      , c = a.Promise
      , l = a.setInterval
      , u = `readystatechange`
      , d = [`onload`, `onerror`, `onabort`, `onloadstart`, `onloadend`, `onprogress`, `ontimeout`]
      , f = []
      , p = a.XMLHttpRequest = m;
    function m(e) {
        let n = new o(e)
          , i = r.context(n);
        i.targets = cr(t);
        try {
            r.emit(`new-xhr`, [n], i),
            n.addEventListener(u, _(i), P(!1))
        } catch (e) {
            h(15, e);
            try {
                r.emit(`internal-error`, [e])
            } catch {}
        }
        return n
    }
    ee(o, p),
    p.prototype = o.prototype,
    i.inPlace(p.prototype, Uh, `-xhr-`, C),
    r.on(`send-xhr-start`, function(e, t) {
        g(e, t),
        x(t)
    }),
    r.on(`open-xhr-start`, g);
    function g(e, t) {
        i.inPlace(t, [`onreadystatechange`], `fn-`, C)
    }
    function _(e) {
        return function() {
            var t = this;
            t.readyState > 3 && !e.resolved && (e.resolved = !0,
            r.emit(`xhr-resolved`, [], t)),
            i.inPlace(t, d, `fn-`, C)
        }
    }
    if (s) {
        var v = c && c.resolve();
        if (!l && !c) {
            var y = 1
              , b = document.createTextNode(y);
            new s(S).observe(b, {
                characterData: !0
            })
        }
    } else
        n.on(`fn-end`, function(e) {
            e[0] && e[0].type === u || S()
        });
    function x(e) {
        f.push(e),
        s && (v ? v.then(S) : l ? l(S) : (y = -y,
        b.data = y))
    }
    function S() {
        for (var e = 0; e < f.length; e++)
            g([], f[e]);
        f.length && (f = [])
    }
    function C(e, t) {
        return t
    }
    function ee(e, t) {
        for (var n in e)
            t[n] = e[n];
        return t
    }
    return r
}
function Gh(e) {
    return (e || E).get(`xhr`)
}
var Kh = `fetch-`
  , qh = Kh + `body-`
  , Jh = [`arrayBuffer`, `blob`, `json`, `text`, `formData`]
  , Yh = a.Request
  , Xh = a.Response
  , Zh = `prototype`
  , Qh = {};
function $h(e, t) {
    let n = eg(e);
    if (!(Yh && Xh && a.fetch) || Qh[n.debugId]++)
        return n;
    Qh[n.debugId] = 1,
    Jh.forEach(e => {
        r(Yh[Zh], e, qh),
        r(Xh[Zh], e, qh)
    }
    ),
    r(a, `fetch`, Kh),
    n.on(Kh + `end`, function(e, t, r) {
        var i = this;
        if (i.targets = r || [void 0],
        t) {
            var a = t.headers.get(`content-length`);
            a !== null && (i.rxSize = a),
            n.emit(Kh + `done`, [null, t], i)
        } else
            n.emit(Kh + `done`, [e], i)
    });
    function r(e, r, i) {
        var a = e[r];
        typeof a == `function` && (e[r] = function() {
            var e = [...arguments];
            let r = {}
              , o = cr(t);
            n.emit(i + `before-start`, [e], r);
            var s;
            r[ue] && r[ue].dt && (s = r[ue].dt);
            var c = a.apply(this, e);
            return n.emit(i + `start`, [e, s], c),
            c.then(function(e) {
                return n.emit(i + `end`, [null, e, o], c),
                e
            }, function(e) {
                throw n.emit(i + `end`, [e, void 0, o], c),
                e
            })
        }
        )
    }
    return n
}
function eg(e) {
    return (e || E).get(`fetch`)
}
var tg = class {
    constructor(e) {
        this.agentRef = e
    }
    generateTracePayload(e) {
        let t = this.agentRef.loader_config;
        if (!this.shouldGenerateTrace(e) || !t)
            return null;
        var n = (t.accountID || ``).toString() || null
          , r = (t.agentID || ``).toString() || null
          , i = (t.trustKey || ``).toString() || null;
        if (!n || !r)
            return null;
        var a = se()
          , o = ce()
          , s = Date.now()
          , c = {
            spanId: a,
            traceId: o,
            timestamp: s
        };
        return (e.sameOrigin || this.isAllowedOrigin(e) && this.useTraceContextHeadersForCors()) && (c.traceContextParentHeader = this.generateTraceContextParentHeader(a, o),
        c.traceContextStateHeader = this.generateTraceContextStateHeader(a, s, n, r, i)),
        (e.sameOrigin && !this.excludeNewrelicHeader() || !e.sameOrigin && this.isAllowedOrigin(e) && this.useNewrelicHeaderForCors()) && (c.newrelicHeader = this.generateTraceHeader(a, o, s, n, r, i)),
        c
    }
    generateTraceContextParentHeader(e, t) {
        return `00-` + t + `-` + e + `-01`
    }
    generateTraceContextStateHeader(e, t, n, r, i) {
        return i + `@nr=0-1-` + n + `-` + r + `-` + e + `----` + t
    }
    generateTraceHeader(e, t, n, r, i, o) {
        if (typeof a?.btoa != `function`)
            return null;
        var s = {
            v: [0, 1],
            d: {
                ty: `Browser`,
                ac: r,
                ap: i,
                id: e,
                tr: t,
                ti: n
            }
        };
        return o && r !== o && (s.d.tk = o),
        btoa(k(s))
    }
    shouldGenerateTrace(e) {
        return this.agentRef.init?.distributed_tracing?.enabled && this.isAllowedOrigin(e)
    }
    isAllowedOrigin(e) {
        var t = !1;
        let n = this.agentRef.init?.distributed_tracing;
        if (e.sameOrigin)
            t = !0;
        else if (n?.allowed_origins instanceof Array)
            for (var r = 0; r < n.allowed_origins.length; r++) {
                var i = om(n.allowed_origins[r]);
                if (e.hostname === i.hostname && e.protocol === i.protocol && e.port === i.port) {
                    t = !0;
                    break
                }
            }
        return t
    }
    excludeNewrelicHeader() {
        var e = this.agentRef.init?.distributed_tracing;
        return e ? !!e.exclude_newrelic_header : !1
    }
    useNewrelicHeaderForCors() {
        var e = this.agentRef.init?.distributed_tracing;
        return e ? e.cors_use_newrelic_header !== !1 : !1
    }
    useTraceContextHeadersForCors() {
        var e = this.agentRef.init?.distributed_tracing;
        return e ? !!e.cors_use_tracecontext_headers : !1
    }
}
;
function ng(e, t) {
    var n = e.responseType;
    if (n === `json` && t !== null)
        return t;
    if (n === `arraybuffer` || n === `blob` || n === `json`)
        return Vh(e.response);
    if (n === `text` || n === `` || n === void 0)
        return Vh(e.responseText)
}
function rg(e) {
    if (typeof e == `string`)
        return e;
    if (e instanceof C().o.REQ)
        return e.url;
    if (a?.URL && e instanceof URL)
        return e.href
}
var ig = [`load`, `error`, `abort`, `timeout`]
  , ag = ig.length
  , og = C().o.REQ
  , sg = C().o.XHR
  , cg = `X-NewRelic-App-Data`
  , lg = class extends ah {
    static featureName = Oe;
    constructor(e) {
        super(e, Oe),
        this.dt = new tg(e),
        this.handler = (e, t, n, r) => D(e, t, n, r, this.ee);
        try {
            let e = {
                xmlhttprequest: `xhr`,
                fetch: `fetch`,
                beacon: `beacon`
            };
            a?.performance?.getEntriesByType(`resource`).forEach(t => {
                if (t.initiatorType in e && t.responseStatus !== 0) {
                    let n = {
                        status: t.responseStatus
                    }
                      , r = {
                        rxSize: t.transferSize,
                        duration: Math.floor(t.duration),
                        cbTime: 0
                    };
                    dg(n, t.name),
                    this.handler(`xhr`, [n, r, t.startTime, t.responseEnd, e[t.initiatorType]], void 0, A.ajax)
                }
            }
            )
        } catch {}
        $h(this.ee, e),
        Wh(this.ee, e),
        ug(e, this.ee, this.handler, this.dt),
        this.importAggregator(e, () => t( () => import(`./aggregate-D8lafj-n.js`), []))
    }
}
;
function ug(e, t, i, o) {
    t.on(`new-xhr`, s),
    t.on(`open-xhr-start`, c),
    t.on(`open-xhr-end`, l),
    t.on(`send-xhr-start`, d),
    t.on(`xhr-cb-time`, f),
    t.on(`xhr-load-added`, p),
    t.on(`xhr-load-removed`, m),
    t.on(`xhr-resolved`, h),
    t.on(`addEventListener-end`, g),
    t.on(`removeEventListener-end`, _),
    t.on(`fn-end`, y),
    t.on(`fetch-before-start`, b),
    t.on(`fetch-start`, x),
    t.on(`fn-start`, v),
    t.on(`fetch-done`, S);
    function s(e) {
        var t = this;
        t.totalCbs = 0,
        t.called = 0,
        t.cbTime = 0,
        t.end = C,
        t.ended = !1,
        t.xhrGuids = {},
        t.lastSize = null,
        t.loadCaptureCalled = !1,
        t.params = this.params || {},
        t.metrics = this.metrics || {},
        t.latestLongtaskEnd = 0,
        e.addEventListener(`load`, function(n) {
            w(t, e)
        }, P(!1)),
        !u && e.addEventListener(`progress`, function(e) {
            t.lastSize = e.loaded
        }, P(!1))
    }
    function c(e) {
        this.params = {
            method: e[0]
        },
        dg(this, e[1]),
        this.metrics = {}
    }
    function l(t, n) {
        e.loader_config.xpid && this.sameOrigin && n.setRequestHeader(`X-NewRelic-ID`, e.loader_config.xpid);
        var r = o.generateTracePayload(this.parsedOrigin);
        if (r) {
            var i = !1;
            r.newrelicHeader && (n.setRequestHeader(`newrelic`, r.newrelicHeader),
            i = !0),
            r.traceContextParentHeader && (n.setRequestHeader(`traceparent`, r.traceContextParentHeader),
            r.traceContextStateHeader && n.setRequestHeader(`tracestate`, r.traceContextStateHeader),
            i = !0),
            i && (this.dt = r)
        }
    }
    function d(e, r) {
        var i = this.metrics
          , a = e[0]
          , o = this;
        if (i && a) {
            var s = Vh(a);
            s && (i.txSize = s)
        }
        this.startTime = n(),
        this.body = a,
        this.listener = function(e) {
            try {
                e.type === `abort` && !o.loadCaptureCalled && (o.params.aborted = !0),
                (e.type !== `load` || o.called === o.totalCbs && (o.onloadCalled || typeof r.onload != `function`) && typeof o.end == `function`) && o.end(r)
            } catch (e) {
                try {
                    t.emit(`internal-error`, [e])
                } catch {}
            }
        }
        ;
        for (var c = 0; c < ag; c++)
            r.addEventListener(ig[c], this.listener, P(!1))
    }
    function f(e, t, n) {
        this.cbTime += e,
        t ? this.onloadCalled = !0 : this.called += 1,
        this.called === this.totalCbs && (this.onloadCalled || typeof n.onload != `function`) && typeof this.end == `function` && this.end(n)
    }
    function p(e, t) {
        var n = `` + Bh(e) + !!t;
        !this.xhrGuids || this.xhrGuids[n] || (this.xhrGuids[n] = !0,
        this.totalCbs += 1)
    }
    function m(e, t) {
        var n = `` + Bh(e) + !!t;
        !this.xhrGuids || !this.xhrGuids[n] || (delete this.xhrGuids[n],
        --this.totalCbs)
    }
    function h() {
        this.endTime = n()
    }
    function g(e, n) {
        n instanceof sg && e[0] === `load` && t.emit(`xhr-load-added`, [e[1], e[2]], n)
    }
    function _(e, n) {
        n instanceof sg && e[0] === `load` && t.emit(`xhr-load-removed`, [e[1], e[2]], n)
    }
    function v(e, t, r) {
        t instanceof sg && (r === `onload` && (this.onload = !0),
        ((e[0] && e[0].type) === `load` || this.onload) && (this.xhrCbStart = n()))
    }
    function y(e, r) {
        this.xhrCbStart && t.emit(`xhr-cb-time`, [n() - this.xhrCbStart, this.onload, r], r)
    }
    function b(e) {
        var t = e[1] || {}, n;
        if (typeof e[0] == `string` ? (n = e[0],
        n.length === 0 && r && (n = `` + a.location.href)) : e[0] && e[0].url ? n = e[0].url : a?.URL && e[0] && e[0] instanceof URL ? n = e[0].href : typeof e[0].toString == `function` && (n = e[0].toString()),
        typeof n != `string` || n.length === 0)
            return;
        n && (this.parsedOrigin = om(n),
        this.sameOrigin = this.parsedOrigin.sameOrigin);
        var i = o.generateTracePayload(this.parsedOrigin);
        if (!i || !i.newrelicHeader && !i.traceContextParentHeader)
            return;
        if (e[0] && e[0].headers)
            l(e[0].headers, i) && (this.dt = i);
        else {
            var s = {};
            for (var c in t)
                s[c] = t[c];
            s.headers = new Headers(t.headers || {}),
            l(s.headers, i) && (this.dt = i),
            e.length > 1 ? e[1] = s : e.push(s)
        }
        function l(e, t) {
            var n = !1;
            return t.newrelicHeader && (e.set(`newrelic`, t.newrelicHeader),
            n = !0),
            t.traceContextParentHeader && (e.set(`traceparent`, t.traceContextParentHeader),
            t.traceContextStateHeader && e.set(`tracestate`, t.traceContextStateHeader),
            n = !0),
            n
        }
    }
    function x(e, t) {
        this.params = {},
        this.metrics = {},
        this.startTime = n(),
        this.dt = t;
        let[r,i={}] = e;
        dg(this, rg(r));
        let a = (`` + (r && r instanceof og && r.method || i.method || `GET`)).toUpperCase();
        this.params.method = a,
        this.body = i.body,
        this.txSize = Vh(i.body) || 0
    }
    function S(e, t) {
        if (this.endTime = n(),
        this.params ||= {},
        ye(this.params))
            return;
        this.params.status = t ? t.status : 0;
        let r;
        typeof this.rxSize == `string` && this.rxSize.length > 0 && (r = +this.rxSize);
        let i = {
            txSize: this.txSize,
            rxSize: r,
            duration: n() - this.startTime
        }
          , a = [this.params, i, this.startTime, this.endTime, `fetch`];
        this.targets.forEach(e => ee(a, this, e))
    }
    function C(e) {
        let t = this.params
          , r = this.metrics;
        if (this.ended)
            return;
        this.ended = !0;
        for (let t = 0; t < ag; t++)
            e.removeEventListener(ig[t], this.listener, !1);
        if (t.aborted || ye(t))
            return;
        r.duration = n() - this.startTime,
        !this.loadCaptureCalled && e.readyState === 4 ? w(this, e) : t.status ??= 0,
        r.cbTime = this.cbTime;
        let i = [t, r, this.startTime, this.endTime, `xhr`];
        this.targets.forEach(e => ee(i, this, e))
    }
    function ee(e, t, n) {
        i(`xhr`, [...e, n], t, A.ajax)
    }
    function w(e, n) {
        e.params.status = n.status;
        var r = ng(n, e.lastSize);
        if (r && (e.metrics.rxSize = r),
        e.sameOrigin && n.getAllResponseHeaders().indexOf(cg) >= 0) {
            var i = n.getResponseHeader(cg);
            i && (D(`sm`, [`Ajax/CrossApplicationTracing/Header/Seen`], void 0, A.metrics, t),
            e.params.cat = i.split(`, `).pop())
        }
        e.loadCaptureCalled = !0
    }
}
function dg(e, t) {
    var n = om(t)
      , r = e.params || e;
    r.hostname = n.hostname,
    r.port = n.port,
    r.protocol = n.protocol,
    r.host = n.hostname + `:` + n.port,
    r.pathname = n.pathname,
    e.parsedOrigin = n,
    e.sameOrigin = n.sameOrigin
}
var fg = {}
  , pg = [`pushState`, `replaceState`];
function mg(e) {
    let t = hg(e);
    return !r || fg[t.debugId]++ ? t : (fg[t.debugId] = 1,
    Im(t).inPlace(window.history, pg, `-`),
    t)
}
function hg(e) {
    return (e || E).get(`history`)
}
function gg(e) {
    $(Ue, function(t) {
        if (!(t && typeof t == `object` && t.name && t.start))
            return;
        let n = {
            n: t.name,
            s: t.start - d,
            e: (t.end || t.start) - d,
            o: t.origin || ``,
            t: `api`
        };
        if (n.s < 0 || n.e < 0 || n.e < n.s) {
            h(61, {
                start: n.s,
                end: n.e
            });
            return
        }
        D(`bstApi`, [n], void 0, A.sessionTrace, e.ee)
    }, e)
}
function _g(e) {
    $(Ge, function(t=Date.now()) {
        let n = t - d;
        n < 0 && h(62, t),
        D(zt, [Ge, {
            time: n
        }], void 0, A.metrics, e.ee),
        e.addToTrace({
            name: Ge,
            start: t,
            origin: `nr`
        }),
        D(Be + He, [n, Ge], void 0, A.genericEvents, e.ee)
    }, e)
}
var {BST_RESOURCE: vg, RESOURCE: yg, START: bg, END: xg, FEATURE_NAME: Sg, FN_END: Cg, FN_START: wg, PUSH_STATE: Tg} = Yp
  , Eg = class extends ah {
    static featureName = Sg;
    constructor(e) {
        if (super(e, Sg),
        gg(e),
        _g(e),
        !oi(e.init)) {
            this.deregisterDrain();
            return
        }
        let r = this.ee;
        mg(r),
        this.eventsEE = Gm(r),
        this.eventsEE.on(wg, function(e, t) {
            this.bstStart = n()
        }),
        this.eventsEE.on(Cg, function(e, t) {
            D(`bst`, [e[0], t, this.bstStart, n()], void 0, A.sessionTrace, r)
        }),
        r.on(Tg + bg, function(e) {
            this.time = n(),
            this.startPath = location.pathname + location.hash
        }),
        r.on(Tg + xg, function(e) {
            D(`bstHist`, [location.pathname + location.hash, this.startPath, this.time], void 0, A.sessionTrace, r)
        });
        let i;
        try {
            i = new PerformanceObserver(e => {
                D(vg, [e.getEntries()], void 0, A.sessionTrace, r)
            }
            ),
            i.observe({
                type: yg,
                buffered: !0
            })
        } catch {}
        this.importAggregator(e, () => t( () => import(`./aggregate-CANSWc36.js`), []), {
            resourceObserver: i
        })
    }
}
;
function Dg(e) {
    $(Xe, function() {
        D(Xe, [], void 0, A.sessionReplay, e.ee)
    }, e)
}
function Og(e) {
    $(Je, function() {
        D(Je, [], void 0, A.sessionReplay, e.ee)
    }, e)
}
var kg = class extends ah {
    static featureName = Qr;
    #e;
    recorder;
    constructor(e) {
        super(e, Qr),
        Dg(e),
        Og(e);
        let n;
        try {
            n = JSON.parse(localStorage.getItem(`${_t}_${vt}`))
        } catch {}
        Wp(e.init) && this.ee.on(Xe, () => this.#n()),
        this.#t(n) && this.importRecorder().then(e => {
            e.startRecording(ai.PRELOAD, n?.sessionReplayMode)
        }
        ),
        this.importAggregator(this.agentRef, () => t( () => import(`./aggregate-BQrqKM0C.js`), []), this),
        this.ee.on(`err`, e => {
            this.blocked || this.agentRef.runtime.isRecording && (this.errorNoticed = !0,
            D($r, [e], void 0, this.featureName, this.ee))
        }
        )
    }
    #t(e) {
        return e && (e.sessionReplayMode === M.FULL || e.sessionReplayMode === M.ERROR) ? !0 : Gp(this.agentRef.init)
    }
    importRecorder() {
        return this.recorder ? Promise.resolve(this.recorder) : (this.#e ??= t(async () => {
            let {Recorder: e} = await import(`./recorder-CScnMFNG.js`);
            return {
                Recorder: e
            }
        }
        , []).then( ({Recorder: e}) => (this.recorder = new e(this),
        this.recorder)).catch(e => {
            throw this.ee.emit(`internal-error`, [e]),
            this.blocked = !0,
            e
        }
        ),
        this.#e)
    }
    #n() {
        this.blocked || (this.featAggregate ? this.featAggregate.mode !== M.FULL && this.featAggregate.initializeRecording(M.FULL, !0, ai.API) : this.importRecorder().then( () => {
            this.recorder.startRecording(ai.API, M.FULL)
        }
        ))
    }
}
  , Ag = {}
  , jg = new Set;
function Mg(e) {
    if (!C().o.WS)
        return e;
    let t = e.get(`websockets`);
    if (Ag[t.debugId]++)
        return t;
    Ag[t.debugId] = 1,
    Ut( () => {
        let e = n();
        jg.forEach(n => {
            n.nrData.closedAt = e,
            n.nrData.closeCode = 1001,
            n.nrData.closeReason = `Page navigating away`,
            n.nrData.closeWasClean = !1,
            n.nrData.openedAt && (n.nrData.connectedDuration = e - n.nrData.openedAt),
            t.emit(`ws`, [n.nrData], n)
        }
        )
    }
    );
    class r extends WebSocket {
        static name = `WebSocket`;
        static toString() {
            return `function WebSocket() { [native code] }`
        }
        toString() {
            return `[object WebSocket]`
        }
        get[Symbol.toStringTag]() {
            return r.name
        }
        #e(e) {
            (e.__newrelic ??= {}).socketId = this.nrData.socketId,
            this.nrData.hasErrors ??= !0
        }
        constructor(...e) {
            super(...e),
            this.nrData = new Pg(e[0],e[1]),
            this.addEventListener(`open`, () => {
                this.nrData.openedAt = n(),
                [`protocol`, `extensions`, `binaryType`].forEach(e => {
                    this.nrData[e] = this[e]
                }
                ),
                jg.add(this)
            }
            ),
            this.addEventListener(`message`, e => {
                let {type: t, size: n} = Ng(e.data);
                this.nrData.messageOrigin ??= F(e.origin),
                this.nrData.messageCount++,
                this.nrData.messageBytes += n,
                this.nrData.messageBytesMin = Math.min(this.nrData.messageBytesMin || 1 / 0, n),
                this.nrData.messageBytesMax = Math.max(this.nrData.messageBytesMax, n),
                (this.nrData.messageTypes ?? ``).includes(t) || (this.nrData.messageTypes = this.nrData.messageTypes ? `${this.nrData.messageTypes},${t}` : t)
            }
            ),
            this.addEventListener(`close`, e => {
                this.nrData.closedAt = n(),
                this.nrData.closeCode = e.code,
                e.reason && (this.nrData.closeReason = e.reason),
                this.nrData.closeWasClean = e.wasClean,
                this.nrData.connectedDuration = this.nrData.closedAt - this.nrData.openedAt,
                jg.delete(this),
                t.emit(`ws`, [this.nrData], this)
            }
            )
        }
        addEventListener(e, t, ...n) {
            let r = this
              , i = typeof t == `function` ? function(...e) {
                try {
                    return t.apply(this, e)
                } catch (e) {
                    throw r.#e(e),
                    e
                }
            }
            : t?.handleEvent ? {
                handleEvent: function(...e) {
                    try {
                        return t.handleEvent.apply(t, e)
                    } catch (e) {
                        throw r.#e(e),
                        e
                    }
                }
            } : t;
            return super.addEventListener(e, i, ...n)
        }
        send(e) {
            if (this.readyState === WebSocket.OPEN) {
                let {type: t, size: n} = Ng(e);
                this.nrData.sendCount++,
                this.nrData.sendBytes += n,
                this.nrData.sendBytesMin = Math.min(this.nrData.sendBytesMin || 1 / 0, n),
                this.nrData.sendBytesMax = Math.max(this.nrData.sendBytesMax, n),
                (this.nrData.sendTypes ?? ``).includes(t) || (this.nrData.sendTypes = this.nrData.sendTypes ? `${this.nrData.sendTypes},${t}` : t)
            }
            try {
                return super.send(e)
            } catch (e) {
                throw this.#e(e),
                e
            }
        }
        close(...e) {
            try {
                super.close(...e)
            } catch (e) {
                throw this.#e(e),
                e
            }
        }
    }
    return a.WebSocket = r,
    t
}
function Ng(e) {
    return typeof e == `string` ? {
        type: `string`,
        size: new TextEncoder().encode(e).length
    } : e instanceof ArrayBuffer ? {
        type: `ArrayBuffer`,
        size: e.byteLength
    } : e instanceof Blob ? {
        type: `Blob`,
        size: e.size
    } : e instanceof DataView ? {
        type: `DataView`,
        size: e.byteLength
    } : ArrayBuffer.isView(e) ? {
        type: `TypedArray`,
        size: e.byteLength
    } : {
        type: `unknown`,
        size: 0
    }
}
var Pg = class {
    constructor(e, t) {
        this.timestamp = n(),
        this.currentUrl = F(window.location.href),
        this.socketId = oe(8),
        this.requestedUrl = F(e),
        this.requestedProtocols = Array.isArray(t) ? t.join(`,`) : t || ``,
        this.openedAt = void 0,
        this.protocol = void 0,
        this.extensions = void 0,
        this.binaryType = void 0,
        this.messageOrigin = void 0,
        this.messageCount = 0,
        this.messageBytes = 0,
        this.messageBytesMin = 0,
        this.messageBytesMax = 0,
        this.messageTypes = void 0,
        this.sendCount = 0,
        this.sendBytes = 0,
        this.sendBytesMin = 0,
        this.sendBytesMax = 0,
        this.sendTypes = void 0,
        this.closedAt = void 0,
        this.closeCode = void 0,
        this.closeReason = `unknown`,
        this.closeWasClean = void 0,
        this.connectedDuration = 0,
        this.hasErrors = void 0
    }
}
  , Fg = class extends ah {
    static featureName = ut;
    constructor(e) {
        super(e, ut);
        let n = e.init.feature_flags.includes(`websockets`)
          , i = !e.init.feature_flags.includes(`no_spv`)
          , o = [e.init.page_action.enabled, e.init.performance.capture_marks, e.init.performance.capture_measures, e.init.performance.resources.enabled, e.init.user_actions.enabled, n, i];
        Eh(e),
        Ah(e),
        _g(e),
        Fh(e),
        Oh(e),
        this.removeOnAbort = new AbortController,
        this.abortHandler = () => {
            this.removeOnAbort.abort(),
            this.abortHandler = void 0
        }
        ;
        let s;
        if (n && Mg(this.ee).on(`ws`, e => {
            D(`ws-complete`, [e], void 0, this.featureName, this.ee)
        }
        ),
        i && a.addEventListener(`securitypolicyviolation`, e => {
            D(`spv`, [e], void 0, A.genericEvents, this.ee)
        }
        , P(!1, this.removeOnAbort.signal)),
        r) {
            if ($h(this.ee, e),
            Wh(this.ee, e),
            s = mg(this.ee),
            e.init.user_actions.enabled) {
                dt.forEach(e => Bt(e, e => D(`ua`, [e], void 0, this.featureName, this.ee), !0)),
                ft.forEach(e => {
                    Bt(e, Si(e => {
                        D(`ua`, [e], void 0, this.featureName, this.ee)
                    }
                    , 500, {
                        leading: !0
                    }))
                }
                ),
                a.addEventListener(`error`, () => {
                    D(`uaErr`, [], void 0, A.genericEvents, this.ee)
                }
                , P(!1, this.removeOnAbort.signal)),
                this.ee.on(`open-xhr-start`, (e, n) => {
                    t(e[1]) || n.addEventListener(`readystatechange`, () => {
                        n.readyState === 2 && D(`uaXhr`, [], void 0, A.genericEvents, this.ee)
                    }
                    , P(void 0, this.removeOnAbort.signal))
                }
                ),
                this.ee.on(`fetch-start`, e => {
                    e.length >= 1 && !t(rg(e[0])) && D(`uaXhr`, [], void 0, A.genericEvents, this.ee)
                }
                );
                function t(t) {
                    let n = om(t);
                    return e.beacons.includes(n.hostname + `:` + n.port)
                }
                s.on(`pushState-end`, n),
                s.on(`replaceState-end`, n),
                window.addEventListener(`hashchange`, n, P(!0, this.removeOnAbort.signal)),
                window.addEventListener(`popstate`, n, P(!0, this.removeOnAbort.signal));
                function n() {
                    s.emit(`navChange`)
                }
            }
            e.init.performance.resources.enabled && a.PerformanceObserver?.supportedEntryTypes.includes(`resource`) && new PerformanceObserver(e => {
                e.getEntries().forEach(e => {
                    D(`browserPerformance.resource`, [e], void 0, this.featureName, this.ee)
                }
                )
            }
            ).observe({
                type: `resource`,
                buffered: !0
            })
        }
        o.some(e => e) ? this.importAggregator(e, () => t( () => import(`./aggregate-D5GDQkqD.js`), [])) : this.deregisterDrain()
    }
}
  , Ig = new Map;
function Lg(e, t, n, r, i=!0, a) {
    if (!(typeof t == `object` && t && typeof n == `string` && n && typeof t[n] == `function`))
        return h(29);
    let o = Rg(e)
      , s = Im(o, void 0, a)
      , c = new re(ue);
    c.level = r.level,
    c.customAttributes = r.customAttributes,
    c.autoCaptured = i;
    let l = t[n]?.[Mm] || t[n];
    return Ig.set(l, c),
    s.inPlace(t, [n], `wrap-logger-`, () => Ig.get(l), void 0, !0),
    o
}
function Rg(e) {
    return (e || E).get(`logger`)
}
function zg(e) {
    $(at, (t, n, {customAttributes: r={}, level: i=Kr.INFO}={}) => {
        Lg(e.ee, t, n, {
            customAttributes: r,
            level: i
        }, !1, e)
    }
    , e)
}
var Bg = class extends ah {
    static featureName = Jr;
    constructor(e) {
        super(e, Jr),
        wh(e),
        zg(e),
        Fh(e);
        let n = this.ee;
        [`log`, `error`, `warn`, `info`, `debug`, `trace`].forEach(t => {
            _(a.console[t]),
            Lg(n, a.console, t, {
                level: t === `log` ? `info` : t
            }, void 0, e)
        }
        ),
        this.ee.on(`wrap-logger-end`, function([e], t, r, i=[]) {
            let {level: a, customAttributes: o, autoCaptured: s} = this;
            i.forEach(t => {
                Xr(n, e, o, a, s, t)
            }
            )
        }),
        this.importAggregator(e, () => t( () => import(`./aggregate-1No51Wwz.js`), []))
    }
}
;
function Vg(e) {
    let t = e.ee.get(`tracer`);
    $(Ke, function(e) {
        return new r().get(typeof e == `object` ? e : {})
    }, e);
    function r() {}
    let i = r.prototype = {
        createTracer: function(r, i) {
            var a = {}
              , o = this
              , s = typeof i == `function`;
            return D(N, [`API/createTracer/called`], void 0, A.metrics, e.ee),
            function() {
                if (t.emit((s ? `` : `no-`) + `fn-start`, [n(), o, s], a),
                s)
                    try {
                        return i.apply(this, arguments)
                    } catch (e) {
                        let n = typeof e == `string` ? Error(e) : e;
                        throw t.emit(`fn-err`, [arguments, this, n], a),
                        n
                    } finally {
                        t.emit(`fn-end`, [n()], a)
                    }
            }
        }
    };
    [`actionText`, `setName`, `setAttribute`, `save`, `ignore`, `onEnd`, `getContext`, `end`, `get`].forEach(t => {
        $.apply(this, [t, function() {
            return D(Ve + t, [performance.now(), ...arguments], this, A.softNav, e.ee),
            this
        }
        , e, i])
    }
    ),
    $($e, function() {
        D(Ve + `routeName`, [performance.now(), ...arguments], void 0, A.softNav, e.ee)
    }, e)
}
var Hg = 1 / 10 * 1e3
  , Ug = class extends ah {
    static featureName = ym;
    constructor(e) {
        if (super(e, ym),
        Vg(e),
        !r || !C().o.MO)
            return;
        let i = mg(this.ee);
        try {
            this.removeOnAbort = new AbortController
        } catch {}
        gm.forEach(e => {
            Bt(e, e => {
                c(e)
            }
            , !0, this.removeOnAbort?.signal)
        }
        );
        let a = () => D(`newURL`, [n(), `` + window.location], void 0, this.featureName, this.ee);
        i.on(`pushState-end`, a),
        i.on(`replaceState-end`, a),
        Bt(_m, e => {
            c(e),
            D(`newURL`, [e.timeStamp, `` + window.location], void 0, this.featureName, this.ee)
        }
        , !0, this.removeOnAbort?.signal);
        let o = !1
          , s = new (C()).o.MO( (e, t) => {
            o || (o = !0,
            requestAnimationFrame( () => {
                D(`newDom`, [n()], void 0, this.featureName, this.ee),
                o = !1
            }
            ))
        }
        )
          , c = Si(e => {
            document.readyState !== `loading` && (D(`newUIEvent`, [e], void 0, this.featureName, this.ee),
            s.observe(document.body, {
                attributes: !0,
                childList: !0,
                subtree: !0,
                characterData: !0
            }))
        }
        , Hg, {
            leading: !0
        });
        this.abortHandler = l,
        this.importAggregator(e, () => t( () => import(`./aggregate-D86tVahU.js`), []), {
            domObserver: s
        });
        function l() {
            this.removeOnAbort?.abort(),
            s.disconnect(),
            this.abortHandler = void 0
        }
    }
}
  , Wg = class extends fh {
    constructor(e) {
        super({
            ...e,
            features: [lg, oh, ph, Eg, mh, Lh, Ug, kg, Fg, Bg],
            loaderType: `browser-agent`
        })
    }
}
;
export {Jp as a, vo as c, Gr as d, xr as f, hm as i, ki as l, eh as n, jo as o, ur as p, km as r, To as s, Wg as t, ci as u};
