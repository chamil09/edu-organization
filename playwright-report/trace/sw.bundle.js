var vn = Object.defineProperty;
var Sn = (U, a, l) =>
  a in U
    ? vn(U, a, { enumerable: !0, configurable: !0, writable: !0, value: l })
    : (U[a] = l);
var Y = (U, a, l) => (Sn(U, typeof a != 'symbol' ? a + '' : a, l), l);
class Rn {
  constructor() {
    Y(this, '_map');
    this._map = new Map();
  }
  set(a, l) {
    let g = this._map.get(a);
    g || ((g = []), this._map.set(a, g)), g.push(l);
  }
  get(a) {
    return this._map.get(a) || [];
  }
  has(a) {
    return this._map.has(a);
  }
  delete(a, l) {
    const g = this._map.get(a);
    g &&
      g.includes(l) &&
      this._map.set(
        a,
        g.filter((b) => l !== b)
      );
  }
  deleteAll(a) {
    this._map.delete(a);
  }
  hasValue(a, l) {
    const g = this._map.get(a);
    return g ? g.includes(l) : !1;
  }
  get size() {
    return this._map.size;
  }
  [Symbol.iterator]() {
    return this._map[Symbol.iterator]();
  }
  keys() {
    return this._map.keys();
  }
  values() {
    const a = [];
    for (const l of this.keys()) a.push(...this.get(l));
    return a;
  }
  clear() {
    this._map.clear();
  }
}
function An(U, a) {
  const l = new Array(a.length).fill(0);
  return new Array(a.length).fill(0).map((g, b) => (C, j) => {
    (l[b] = (C / j) * a[b] * 1e3),
      U(
        l.reduce((M, E) => M + E, 0),
        1e3
      );
  });
}
class Tn {
  constructor(a, l, g) {
    Y(this, '_snapshots');
    Y(this, '_index');
    Y(this, 'snapshotName');
    Y(this, '_resources');
    Y(this, '_snapshot');
    Y(this, '_callId');
    (this._resources = a),
      (this._snapshots = l),
      (this._index = g),
      (this._snapshot = l[g]),
      (this._callId = l[g].callId),
      (this.snapshotName = l[g].snapshotName);
  }
  snapshot() {
    return this._snapshots[this._index];
  }
  viewport() {
    return this._snapshots[this._index].viewport;
  }
  render() {
    const a = (C, j, M) => {
        if (typeof C == 'string') {
          const E = In(C);
          return M === 'STYLE' || M === 'style' ? Ln(E) : E;
        }
        if (!C._string)
          if (Array.isArray(C[0])) {
            const E = j - C[0][0];
            if (E >= 0 && E <= j) {
              const P = Cn(this._snapshots[E]),
                D = C[0][1];
              D >= 0 && D < P.length && (C._string = a(P[D], E, M));
            }
          } else if (typeof C[0] == 'string') {
            const E = [];
            E.push('<', C[0]);
            const P = C[0] === 'IFRAME' || C[0] === 'FRAME',
              D = C[0] === 'A';
            for (const [K, Z] of Object.entries(C[1] || {})) {
              const $ =
                P && K.toLowerCase() === 'src' ? '__playwright_src__' : K;
              let X = Z;
              (K.toLowerCase() === 'href' || K.toLowerCase() === 'src') &&
                (D ? (X = 'link://' + Z) : (X = $t(Z))),
                E.push(' ', $, '="', En(X), '"');
            }
            E.push('>');
            for (let K = 2; K < C.length; K++) E.push(a(C[K], j, C[0]));
            Un.has(C[0]) || E.push('</', C[0], '>'), (C._string = E.join(''));
          } else C._string = '';
        return C._string;
      },
      l = this._snapshot;
    let g = a(l.html, this._index, void 0);
    return g
      ? ((g =
          (l.doctype ? `<!DOCTYPE ${l.doctype}>` : '') +
          [
            '<style>*,*::before,*::after { visibility: hidden }</style>',
            `<style>*[__playwright_target__="${this.snapshotName}"] { outline: 2px solid #006ab1 !important; background-color: #6fa8dc7f !important; }</style>`,
            `<style>*[__playwright_target__="${this._callId}"] { outline: 2px solid #006ab1 !important; background-color: #6fa8dc7f !important; }</style>`,
            `<script>${zn()}<\/script>`,
          ].join('') +
          g),
        { html: g, pageId: l.pageId, frameId: l.frameId, index: this._index })
      : { html: '', pageId: l.pageId, frameId: l.frameId, index: this._index };
  }
  resourceByUrl(a) {
    const l = this._snapshot;
    let g;
    for (const b of this._resources) {
      if (
        typeof b._monotonicTime == 'number' &&
        b._monotonicTime >= l.timestamp
      )
        break;
      if (b._frameref === l.frameId && b.request.url === a) {
        g = b;
        break;
      }
    }
    if (!g)
      for (const b of this._resources) {
        if (
          typeof b._monotonicTime == 'number' &&
          b._monotonicTime >= l.timestamp
        )
          break;
        if (b.request.url === a) return b;
      }
    if (g) {
      for (const b of l.resourceOverrides)
        if (a === b.url && b.sha1) {
          g = {
            ...g,
            response: {
              ...g.response,
              content: { ...g.response.content, _sha1: b.sha1 },
            },
          };
          break;
        }
    }
    return g;
  }
}
const Un = new Set([
    'AREA',
    'BASE',
    'BR',
    'COL',
    'COMMAND',
    'EMBED',
    'HR',
    'IMG',
    'INPUT',
    'KEYGEN',
    'LINK',
    'MENUITEM',
    'META',
    'PARAM',
    'SOURCE',
    'TRACK',
    'WBR',
  ]),
  Ye = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
function En(U) {
  return U.replace(/[&<>"']/gu, (a) => Ye[a]);
}
function In(U) {
  return U.replace(/[&<]/gu, (a) => Ye[a]);
}
function Cn(U) {
  if (!U._nodes) {
    const a = [],
      l = (g) => {
        if (typeof g == 'string') a.push(g);
        else if (typeof g[0] == 'string') {
          for (let b = 2; b < g.length; b++) l(g[b]);
          a.push(g);
        }
      };
    l(U.html), (U._nodes = a);
  }
  return U._nodes;
}
function zn() {
  function U(a) {
    const l = [],
      g = [],
      b = (M) => {
        for (const E of M.querySelectorAll('[__playwright_scroll_top_]'))
          l.push(E);
        for (const E of M.querySelectorAll('[__playwright_scroll_left_]'))
          g.push(E);
        for (const E of M.querySelectorAll('[__playwright_value_]'))
          (E.value = E.getAttribute('__playwright_value_')),
            E.removeAttribute('__playwright_value_');
        for (const E of M.querySelectorAll('[__playwright_checked_]'))
          (E.checked = E.getAttribute('__playwright_checked_') === 'true'),
            E.removeAttribute('__playwright_checked_');
        for (const E of M.querySelectorAll('[__playwright_selected_]'))
          (E.selected = E.getAttribute('__playwright_selected_') === 'true'),
            E.removeAttribute('__playwright_selected_');
        for (const E of M.querySelectorAll('iframe, frame')) {
          const P = E.getAttribute('__playwright_src__');
          if (!P)
            E.setAttribute(
              'src',
              'data:text/html,<body style="background: #ddd"></body>'
            );
          else {
            const D = new URL(a(window.location.href));
            D.searchParams.delete('pointX'), D.searchParams.delete('pointY');
            const K = D.pathname.lastIndexOf('/snapshot/');
            K !== -1 && (D.pathname = D.pathname.substring(0, K + 1)),
              (D.pathname += P.substring(1)),
              E.setAttribute('src', D.toString());
          }
        }
        {
          const E = M.querySelector('body[__playwright_custom_elements__]');
          if (E && window.customElements) {
            const P = (
              E.getAttribute('__playwright_custom_elements__') || ''
            ).split(',');
            for (const D of P)
              window.customElements.define(D, class extends HTMLElement {});
          }
        }
        for (const E of M.querySelectorAll(
          'template[__playwright_shadow_root_]'
        )) {
          const P = E,
            D = P.parentElement.attachShadow({ mode: 'open' });
          D.appendChild(P.content), P.remove(), b(D);
        }
        if ('adoptedStyleSheets' in M) {
          const E = [...M.adoptedStyleSheets];
          for (const P of M.querySelectorAll(
            'template[__playwright_style_sheet_]'
          )) {
            const D = P,
              K = new CSSStyleSheet();
            K.replaceSync(D.getAttribute('__playwright_style_sheet_')),
              E.push(K);
          }
          M.adoptedStyleSheets = E;
        }
      },
      C = () => {
        window.removeEventListener('load', C);
        for (const D of l)
          (D.scrollTop = +D.getAttribute('__playwright_scroll_top_')),
            D.removeAttribute('__playwright_scroll_top_');
        for (const D of g)
          (D.scrollLeft = +D.getAttribute('__playwright_scroll_left_')),
            D.removeAttribute('__playwright_scroll_left_');
        const M = new URL(window.location.href).searchParams,
          E = M.get('pointX'),
          P = M.get('pointY');
        if (E) {
          const D = document.createElement('x-pw-pointer');
          (D.style.position = 'fixed'),
            (D.style.backgroundColor = '#f44336'),
            (D.style.width = '20px'),
            (D.style.height = '20px'),
            (D.style.borderRadius = '10px'),
            (D.style.margin = '-10px 0 0 -10px'),
            (D.style.zIndex = '2147483647'),
            (D.style.left = E + 'px'),
            (D.style.top = P + 'px'),
            document.documentElement.appendChild(D);
        }
        document.styleSheets[0].disabled = !0;
      },
      j = () => b(document);
    window.addEventListener('load', C),
      window.addEventListener('DOMContentLoaded', j);
  }
  return `
(${U.toString()})(${Gt.toString()})`;
}
const Je = [
    'about:',
    'blob:',
    'data:',
    'file:',
    'ftp:',
    'http:',
    'https:',
    'mailto:',
    'sftp:',
    'ws:',
    'wss:',
  ],
  Ze = 'http://playwright.bloburl/#';
function $t(U) {
  U.startsWith(Ze) && (U = U.substring(Ze.length));
  try {
    const a = new URL(U);
    if (a.protocol === 'javascript:' || a.protocol === 'vbscript:')
      return 'javascript:void(0)';
    if (!(a.protocol === 'blob:') && Je.includes(a.protocol)) return U;
    const g = 'pw-' + a.protocol.slice(0, a.protocol.length - 1);
    return (
      (a.protocol = 'https:'),
      (a.hostname = a.hostname ? `${g}--${a.hostname}` : g),
      a.toString()
    );
  } catch {
    return U;
  }
}
const Fn = /url\(['"]?([\w-]+:)\/\//gi;
function Ln(U) {
  return U.replace(Fn, (a, l) =>
    !(l === 'blob:') && Je.includes(l)
      ? a
      : a.replace(l + '//', `https://pw-${l.slice(0, -1)}--`)
  );
}
function Gt(U) {
  const a = new URL(U);
  return a.pathname.endsWith('/popout.html') ? a.searchParams.get('r') : U;
}
class Mn {
  constructor(a, l) {
    Y(this, '_snapshotStorage');
    Y(this, '_resourceLoader');
    Y(this, '_snapshotIds', new Map());
    (this._snapshotStorage = a), (this._resourceLoader = l);
  }
  serveSnapshot(a, l, g) {
    const b = this._snapshot(a.substring(9), l);
    if (!b) return new Response(null, { status: 404 });
    const C = b.render();
    return (
      this._snapshotIds.set(g, b),
      new Response(C.html, {
        status: 200,
        headers: { 'Content-Type': 'text/html' },
      })
    );
  }
  serveSnapshotInfo(a, l) {
    const g = this._snapshot(a.substring(13), l);
    return this._respondWithJson(
      g
        ? { viewport: g.viewport(), url: g.snapshot().frameUrl }
        : { error: 'No snapshot found' }
    );
  }
  _snapshot(a, l) {
    const g = l.get('name');
    return this._snapshotStorage.snapshotByName(a.slice(1), g);
  }
  _respondWithJson(a) {
    return new Response(JSON.stringify(a), {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=31536000',
        'Content-Type': 'application/json',
      },
    });
  }
  async serveResource(a, l) {
    let g;
    const b = this._snapshotIds.get(l);
    for (const Z of a)
      if (((g = b == null ? void 0 : b.resourceByUrl(Dn(Z))), g)) break;
    if (!g) return new Response(null, { status: 404 });
    const C = g.response.content._sha1,
      j = C ? (await this._resourceLoader(C)) || new Blob([]) : new Blob([]);
    let M = g.response.content.mimeType;
    /^text\/|^application\/(javascript|json)/.test(M) &&
      !M.includes('charset') &&
      (M = `${M}; charset=utf-8`);
    const P = new Headers();
    P.set('Content-Type', M);
    for (const { name: Z, value: $ } of g.response.headers) P.set(Z, $);
    P.delete('Content-Encoding'),
      P.delete('Access-Control-Allow-Origin'),
      P.set('Access-Control-Allow-Origin', '*'),
      P.delete('Content-Length'),
      P.set('Content-Length', String(j.size)),
      P.set('Cache-Control', 'public, max-age=31536000');
    const { status: D } = g.response,
      K = D === 101 || D === 204 || D === 205 || D === 304;
    return new Response(K ? null : j, {
      headers: P,
      status: g.response.status,
      statusText: g.response.statusText,
    });
  }
}
function Dn(U) {
  try {
    const a = new URL(U);
    return (a.hash = ''), a.toString();
  } catch {
    return U;
  }
}
function On(U) {
  const a = new Map(),
    { files: l, stacks: g } = U;
  for (const b of g) {
    const [C, j] = b;
    a.set(
      `call@${C}`,
      j.map((M) => ({
        file: l[M[0]],
        line: M[1],
        column: M[2],
        function: M[3],
      }))
    );
  }
  return a;
}
function Nn() {
  return {
    isPrimary: !1,
    traceUrl: '',
    startTime: Number.MAX_SAFE_INTEGER,
    endTime: 0,
    browserName: '',
    options: {
      deviceScaleFactor: 1,
      isMobile: !1,
      viewport: { width: 1280, height: 800 },
    },
    pages: [],
    resources: [],
    actions: [],
    events: [],
    initializers: {},
    hasSource: !1,
  };
}
class Wn {
  constructor() {
    Y(this, '_resources', []);
    Y(this, '_frameSnapshots', new Map());
  }
  addResource(a) {
    (a.request.url = $t(a.request.url)), this._resources.push(a);
  }
  addFrameSnapshot(a) {
    for (const b of a.resourceOverrides) b.url = $t(b.url);
    let l = this._frameSnapshots.get(a.frameId);
    l ||
      ((l = { raw: [], renderers: [] }),
      this._frameSnapshots.set(a.frameId, l),
      a.isMainFrame && this._frameSnapshots.set(a.pageId, l)),
      l.raw.push(a);
    const g = new Tn(this._resources, l.raw, l.raw.length - 1);
    return l.renderers.push(g), g;
  }
  snapshotByName(a, l) {
    const g = this._frameSnapshots.get(a);
    return g == null ? void 0 : g.renderers.find((b) => b.snapshotName === l);
  }
  snapshotsForTest() {
    return [...this._frameSnapshots.keys()];
  }
}
class Pn {
  constructor() {
    Y(this, 'contextEntries', []);
    Y(this, 'pageEntries', new Map());
    Y(this, '_snapshotStorage');
    Y(this, '_version');
    Y(this, '_backend');
  }
  async load(a, l) {
    this._backend = a;
    const g = [];
    let b = !1;
    for (const M of await this._backend.entryNames()) {
      const E = M.match(/(.+)\.trace/);
      E && g.push(E[1] || ''), M.includes('src@') && (b = !0);
    }
    if (!g.length) throw new Error('Cannot find .trace file');
    this._snapshotStorage = new Wn();
    const C = g.length * 3;
    let j = 0;
    for (const M of g) {
      const E = Nn(),
        P = new Map();
      (E.traceUrl = a.traceURL()), (E.hasSource = b);
      const D = (await this._backend.readText(M + '.trace')) || '';
      for (const $ of D.split(`
`))
        this.appendEvent(E, P, $);
      l(++j, C);
      const K = (await this._backend.readText(M + '.network')) || '';
      for (const $ of K.split(`
`))
        this.appendEvent(E, P, $);
      if (
        (l(++j, C),
        (E.actions = [...P.values()].sort(($, X) => $.startTime - X.startTime)),
        !a.isLive())
      ) {
        for (const $ of E.actions.slice().reverse())
          if (!$.endTime && !$.error)
            for (const X of E.actions)
              X.parentId === $.callId &&
                $.endTime < X.endTime &&
                ($.endTime = X.endTime);
      }
      const Z = await this._backend.readText(M + '.stacks');
      if (Z) {
        const $ = On(JSON.parse(Z));
        for (const X of E.actions) X.stack = X.stack || $.get(X.callId);
      }
      l(++j, C), this.contextEntries.push(E);
    }
  }
  async hasEntry(a) {
    return this._backend.hasEntry(a);
  }
  async resourceForSha1(a) {
    return this._backend.readBlob('resources/' + a);
  }
  storage() {
    return this._snapshotStorage;
  }
  _pageEntry(a, l) {
    let g = this.pageEntries.get(l);
    return (
      g ||
        ((g = { screencastFrames: [] }),
        this.pageEntries.set(l, g),
        a.pages.push(g)),
      g
    );
  }
  appendEvent(a, l, g) {
    if (!g) return;
    const b = this._modernize(JSON.parse(g));
    if (b) {
      switch (b.type) {
        case 'context-options': {
          (this._version = b.version),
            (a.isPrimary = !0),
            (a.browserName = b.browserName),
            (a.title = b.title),
            (a.platform = b.platform),
            (a.wallTime = b.wallTime),
            (a.sdkLanguage = b.sdkLanguage),
            (a.options = b.options),
            (a.testIdAttributeName = b.testIdAttributeName);
          break;
        }
        case 'screencast-frame': {
          this._pageEntry(a, b.pageId).screencastFrames.push(b);
          break;
        }
        case 'before': {
          l.set(b.callId, { ...b, type: 'action', endTime: 0, log: [] });
          break;
        }
        case 'input': {
          const C = l.get(b.callId);
          (C.inputSnapshot = b.inputSnapshot), (C.point = b.point);
          break;
        }
        case 'after': {
          const C = l.get(b.callId);
          (C.afterSnapshot = b.afterSnapshot),
            (C.endTime = b.endTime),
            (C.log = b.log),
            (C.result = b.result),
            (C.error = b.error),
            (C.attachments = b.attachments);
          break;
        }
        case 'action': {
          l.set(b.callId, b);
          break;
        }
        case 'event': {
          a.events.push(b);
          break;
        }
        case 'object': {
          a.initializers[b.guid] = b.initializer;
          break;
        }
        case 'resource-snapshot':
          this._snapshotStorage.addResource(b.snapshot),
            a.resources.push(b.snapshot);
          break;
        case 'frame-snapshot':
          this._snapshotStorage.addFrameSnapshot(b.snapshot);
          break;
      }
      (b.type === 'action' || b.type === 'before') &&
        (a.startTime = Math.min(a.startTime, b.startTime)),
        (b.type === 'action' || b.type === 'after') &&
          (a.endTime = Math.max(a.endTime, b.endTime)),
        b.type === 'event' &&
          ((a.startTime = Math.min(a.startTime, b.time)),
          (a.endTime = Math.max(a.endTime, b.time))),
        b.type === 'screencast-frame' &&
          ((a.startTime = Math.min(a.startTime, b.timestamp)),
          (a.endTime = Math.max(a.endTime, b.timestamp)));
    }
  }
  _modernize(a) {
    if (this._version === void 0) return a;
    const l = 4;
    for (let g = this._version; g < l; ++g)
      a = this[`_modernize_${g}_to_${g + 1}`].call(this, a);
    return a;
  }
  _modernize_0_to_1(a) {
    return (
      a.type === 'action' &&
        typeof a.metadata.error == 'string' &&
        (a.metadata.error = {
          error: { name: 'Error', message: a.metadata.error },
        }),
      a
    );
  }
  _modernize_1_to_2(a) {
    var l, g;
    return (
      a.type === 'frame-snapshot' &&
        a.snapshot.isMainFrame &&
        (a.snapshot.viewport = ((g =
          (l = this.contextEntries[0]) == null ? void 0 : l.options) == null
          ? void 0
          : g.viewport) || { width: 1280, height: 720 }),
      a
    );
  }
  _modernize_2_to_3(a) {
    if (a.type === 'resource-snapshot' && !a.snapshot.request) {
      const l = a.snapshot;
      a.snapshot = {
        _frameref: l.frameId,
        request: {
          url: l.url,
          method: l.method,
          headers: l.requestHeaders,
          postData: l.requestSha1 ? { _sha1: l.requestSha1 } : void 0,
        },
        response: {
          status: l.status,
          headers: l.responseHeaders,
          content: { mimeType: l.contentType, _sha1: l.responseSha1 },
        },
        _monotonicTime: l.timestamp,
      };
    }
    return a;
  }
  _modernize_3_to_4(a) {
    var g, b, C, j;
    if (a.type !== 'action' && a.type !== 'event') return a;
    const l = a.metadata;
    return l.internal || l.method.startsWith('tracing')
      ? null
      : a.type === 'event'
      ? l.method === '__create__' && l.type === 'ConsoleMessage'
        ? {
            type: 'object',
            class: l.type,
            guid: l.params.guid,
            initializer: l.params.initializer,
          }
        : {
            type: 'event',
            time: l.startTime,
            class: l.type,
            method: l.method,
            params: l.params,
            pageId: l.pageId,
          }
      : {
          type: 'action',
          callId: l.id,
          startTime: l.startTime,
          endTime: l.endTime,
          apiName: l.apiName || l.type + '.' + l.method,
          class: l.type,
          method: l.method,
          params: l.params,
          wallTime: l.wallTime || Date.now(),
          log: l.log,
          beforeSnapshot:
            (g = l.snapshots.find((M) => M.title === 'before')) == null
              ? void 0
              : g.snapshotName,
          inputSnapshot:
            (b = l.snapshots.find((M) => M.title === 'input')) == null
              ? void 0
              : b.snapshotName,
          afterSnapshot:
            (C = l.snapshots.find((M) => M.title === 'after')) == null
              ? void 0
              : C.snapshotName,
          error: (j = l.error) == null ? void 0 : j.error,
          result: l.result,
          point: l.point,
          pageId: l.pageId,
        };
  }
}
var Bn =
  typeof globalThis < 'u'
    ? globalThis
    : typeof window < 'u'
    ? window
    : typeof global < 'u'
    ? global
    : typeof self < 'u'
    ? self
    : {};
function Hn(U) {
  return U && U.__esModule && Object.prototype.hasOwnProperty.call(U, 'default')
    ? U.default
    : U;
}
var Kt = { exports: {} };
(function (U, a) {
  (function (l, g) {
    g(a);
  })(Bn, function (l) {
    const j = [
        0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383,
        32767, 65535,
      ],
      M = [
        96, 7, 256, 0, 8, 80, 0, 8, 16, 84, 8, 115, 82, 7, 31, 0, 8, 112, 0, 8,
        48, 0, 9, 192, 80, 7, 10, 0, 8, 96, 0, 8, 32, 0, 9, 160, 0, 8, 0, 0, 8,
        128, 0, 8, 64, 0, 9, 224, 80, 7, 6, 0, 8, 88, 0, 8, 24, 0, 9, 144, 83,
        7, 59, 0, 8, 120, 0, 8, 56, 0, 9, 208, 81, 7, 17, 0, 8, 104, 0, 8, 40,
        0, 9, 176, 0, 8, 8, 0, 8, 136, 0, 8, 72, 0, 9, 240, 80, 7, 4, 0, 8, 84,
        0, 8, 20, 85, 8, 227, 83, 7, 43, 0, 8, 116, 0, 8, 52, 0, 9, 200, 81, 7,
        13, 0, 8, 100, 0, 8, 36, 0, 9, 168, 0, 8, 4, 0, 8, 132, 0, 8, 68, 0, 9,
        232, 80, 7, 8, 0, 8, 92, 0, 8, 28, 0, 9, 152, 84, 7, 83, 0, 8, 124, 0,
        8, 60, 0, 9, 216, 82, 7, 23, 0, 8, 108, 0, 8, 44, 0, 9, 184, 0, 8, 12,
        0, 8, 140, 0, 8, 76, 0, 9, 248, 80, 7, 3, 0, 8, 82, 0, 8, 18, 85, 8,
        163, 83, 7, 35, 0, 8, 114, 0, 8, 50, 0, 9, 196, 81, 7, 11, 0, 8, 98, 0,
        8, 34, 0, 9, 164, 0, 8, 2, 0, 8, 130, 0, 8, 66, 0, 9, 228, 80, 7, 7, 0,
        8, 90, 0, 8, 26, 0, 9, 148, 84, 7, 67, 0, 8, 122, 0, 8, 58, 0, 9, 212,
        82, 7, 19, 0, 8, 106, 0, 8, 42, 0, 9, 180, 0, 8, 10, 0, 8, 138, 0, 8,
        74, 0, 9, 244, 80, 7, 5, 0, 8, 86, 0, 8, 22, 192, 8, 0, 83, 7, 51, 0, 8,
        118, 0, 8, 54, 0, 9, 204, 81, 7, 15, 0, 8, 102, 0, 8, 38, 0, 9, 172, 0,
        8, 6, 0, 8, 134, 0, 8, 70, 0, 9, 236, 80, 7, 9, 0, 8, 94, 0, 8, 30, 0,
        9, 156, 84, 7, 99, 0, 8, 126, 0, 8, 62, 0, 9, 220, 82, 7, 27, 0, 8, 110,
        0, 8, 46, 0, 9, 188, 0, 8, 14, 0, 8, 142, 0, 8, 78, 0, 9, 252, 96, 7,
        256, 0, 8, 81, 0, 8, 17, 85, 8, 131, 82, 7, 31, 0, 8, 113, 0, 8, 49, 0,
        9, 194, 80, 7, 10, 0, 8, 97, 0, 8, 33, 0, 9, 162, 0, 8, 1, 0, 8, 129, 0,
        8, 65, 0, 9, 226, 80, 7, 6, 0, 8, 89, 0, 8, 25, 0, 9, 146, 83, 7, 59, 0,
        8, 121, 0, 8, 57, 0, 9, 210, 81, 7, 17, 0, 8, 105, 0, 8, 41, 0, 9, 178,
        0, 8, 9, 0, 8, 137, 0, 8, 73, 0, 9, 242, 80, 7, 4, 0, 8, 85, 0, 8, 21,
        80, 8, 258, 83, 7, 43, 0, 8, 117, 0, 8, 53, 0, 9, 202, 81, 7, 13, 0, 8,
        101, 0, 8, 37, 0, 9, 170, 0, 8, 5, 0, 8, 133, 0, 8, 69, 0, 9, 234, 80,
        7, 8, 0, 8, 93, 0, 8, 29, 0, 9, 154, 84, 7, 83, 0, 8, 125, 0, 8, 61, 0,
        9, 218, 82, 7, 23, 0, 8, 109, 0, 8, 45, 0, 9, 186, 0, 8, 13, 0, 8, 141,
        0, 8, 77, 0, 9, 250, 80, 7, 3, 0, 8, 83, 0, 8, 19, 85, 8, 195, 83, 7,
        35, 0, 8, 115, 0, 8, 51, 0, 9, 198, 81, 7, 11, 0, 8, 99, 0, 8, 35, 0, 9,
        166, 0, 8, 3, 0, 8, 131, 0, 8, 67, 0, 9, 230, 80, 7, 7, 0, 8, 91, 0, 8,
        27, 0, 9, 150, 84, 7, 67, 0, 8, 123, 0, 8, 59, 0, 9, 214, 82, 7, 19, 0,
        8, 107, 0, 8, 43, 0, 9, 182, 0, 8, 11, 0, 8, 139, 0, 8, 75, 0, 9, 246,
        80, 7, 5, 0, 8, 87, 0, 8, 23, 192, 8, 0, 83, 7, 51, 0, 8, 119, 0, 8, 55,
        0, 9, 206, 81, 7, 15, 0, 8, 103, 0, 8, 39, 0, 9, 174, 0, 8, 7, 0, 8,
        135, 0, 8, 71, 0, 9, 238, 80, 7, 9, 0, 8, 95, 0, 8, 31, 0, 9, 158, 84,
        7, 99, 0, 8, 127, 0, 8, 63, 0, 9, 222, 82, 7, 27, 0, 8, 111, 0, 8, 47,
        0, 9, 190, 0, 8, 15, 0, 8, 143, 0, 8, 79, 0, 9, 254, 96, 7, 256, 0, 8,
        80, 0, 8, 16, 84, 8, 115, 82, 7, 31, 0, 8, 112, 0, 8, 48, 0, 9, 193, 80,
        7, 10, 0, 8, 96, 0, 8, 32, 0, 9, 161, 0, 8, 0, 0, 8, 128, 0, 8, 64, 0,
        9, 225, 80, 7, 6, 0, 8, 88, 0, 8, 24, 0, 9, 145, 83, 7, 59, 0, 8, 120,
        0, 8, 56, 0, 9, 209, 81, 7, 17, 0, 8, 104, 0, 8, 40, 0, 9, 177, 0, 8, 8,
        0, 8, 136, 0, 8, 72, 0, 9, 241, 80, 7, 4, 0, 8, 84, 0, 8, 20, 85, 8,
        227, 83, 7, 43, 0, 8, 116, 0, 8, 52, 0, 9, 201, 81, 7, 13, 0, 8, 100, 0,
        8, 36, 0, 9, 169, 0, 8, 4, 0, 8, 132, 0, 8, 68, 0, 9, 233, 80, 7, 8, 0,
        8, 92, 0, 8, 28, 0, 9, 153, 84, 7, 83, 0, 8, 124, 0, 8, 60, 0, 9, 217,
        82, 7, 23, 0, 8, 108, 0, 8, 44, 0, 9, 185, 0, 8, 12, 0, 8, 140, 0, 8,
        76, 0, 9, 249, 80, 7, 3, 0, 8, 82, 0, 8, 18, 85, 8, 163, 83, 7, 35, 0,
        8, 114, 0, 8, 50, 0, 9, 197, 81, 7, 11, 0, 8, 98, 0, 8, 34, 0, 9, 165,
        0, 8, 2, 0, 8, 130, 0, 8, 66, 0, 9, 229, 80, 7, 7, 0, 8, 90, 0, 8, 26,
        0, 9, 149, 84, 7, 67, 0, 8, 122, 0, 8, 58, 0, 9, 213, 82, 7, 19, 0, 8,
        106, 0, 8, 42, 0, 9, 181, 0, 8, 10, 0, 8, 138, 0, 8, 74, 0, 9, 245, 80,
        7, 5, 0, 8, 86, 0, 8, 22, 192, 8, 0, 83, 7, 51, 0, 8, 118, 0, 8, 54, 0,
        9, 205, 81, 7, 15, 0, 8, 102, 0, 8, 38, 0, 9, 173, 0, 8, 6, 0, 8, 134,
        0, 8, 70, 0, 9, 237, 80, 7, 9, 0, 8, 94, 0, 8, 30, 0, 9, 157, 84, 7, 99,
        0, 8, 126, 0, 8, 62, 0, 9, 221, 82, 7, 27, 0, 8, 110, 0, 8, 46, 0, 9,
        189, 0, 8, 14, 0, 8, 142, 0, 8, 78, 0, 9, 253, 96, 7, 256, 0, 8, 81, 0,
        8, 17, 85, 8, 131, 82, 7, 31, 0, 8, 113, 0, 8, 49, 0, 9, 195, 80, 7, 10,
        0, 8, 97, 0, 8, 33, 0, 9, 163, 0, 8, 1, 0, 8, 129, 0, 8, 65, 0, 9, 227,
        80, 7, 6, 0, 8, 89, 0, 8, 25, 0, 9, 147, 83, 7, 59, 0, 8, 121, 0, 8, 57,
        0, 9, 211, 81, 7, 17, 0, 8, 105, 0, 8, 41, 0, 9, 179, 0, 8, 9, 0, 8,
        137, 0, 8, 73, 0, 9, 243, 80, 7, 4, 0, 8, 85, 0, 8, 21, 80, 8, 258, 83,
        7, 43, 0, 8, 117, 0, 8, 53, 0, 9, 203, 81, 7, 13, 0, 8, 101, 0, 8, 37,
        0, 9, 171, 0, 8, 5, 0, 8, 133, 0, 8, 69, 0, 9, 235, 80, 7, 8, 0, 8, 93,
        0, 8, 29, 0, 9, 155, 84, 7, 83, 0, 8, 125, 0, 8, 61, 0, 9, 219, 82, 7,
        23, 0, 8, 109, 0, 8, 45, 0, 9, 187, 0, 8, 13, 0, 8, 141, 0, 8, 77, 0, 9,
        251, 80, 7, 3, 0, 8, 83, 0, 8, 19, 85, 8, 195, 83, 7, 35, 0, 8, 115, 0,
        8, 51, 0, 9, 199, 81, 7, 11, 0, 8, 99, 0, 8, 35, 0, 9, 167, 0, 8, 3, 0,
        8, 131, 0, 8, 67, 0, 9, 231, 80, 7, 7, 0, 8, 91, 0, 8, 27, 0, 9, 151,
        84, 7, 67, 0, 8, 123, 0, 8, 59, 0, 9, 215, 82, 7, 19, 0, 8, 107, 0, 8,
        43, 0, 9, 183, 0, 8, 11, 0, 8, 139, 0, 8, 75, 0, 9, 247, 80, 7, 5, 0, 8,
        87, 0, 8, 23, 192, 8, 0, 83, 7, 51, 0, 8, 119, 0, 8, 55, 0, 9, 207, 81,
        7, 15, 0, 8, 103, 0, 8, 39, 0, 9, 175, 0, 8, 7, 0, 8, 135, 0, 8, 71, 0,
        9, 239, 80, 7, 9, 0, 8, 95, 0, 8, 31, 0, 9, 159, 84, 7, 99, 0, 8, 127,
        0, 8, 63, 0, 9, 223, 82, 7, 27, 0, 8, 111, 0, 8, 47, 0, 9, 191, 0, 8,
        15, 0, 8, 143, 0, 8, 79, 0, 9, 255,
      ],
      E = [
        80, 5, 1, 87, 5, 257, 83, 5, 17, 91, 5, 4097, 81, 5, 5, 89, 5, 1025, 85,
        5, 65, 93, 5, 16385, 80, 5, 3, 88, 5, 513, 84, 5, 33, 92, 5, 8193, 82,
        5, 9, 90, 5, 2049, 86, 5, 129, 192, 5, 24577, 80, 5, 2, 87, 5, 385, 83,
        5, 25, 91, 5, 6145, 81, 5, 7, 89, 5, 1537, 85, 5, 97, 93, 5, 24577, 80,
        5, 4, 88, 5, 769, 84, 5, 49, 92, 5, 12289, 82, 5, 13, 90, 5, 3073, 86,
        5, 193, 192, 5, 24577,
      ],
      P = [
        3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59,
        67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0,
      ],
      D = [
        0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4,
        5, 5, 5, 5, 0, 112, 112,
      ],
      K = [
        1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385,
        513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577,
      ],
      Z = [
        0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10,
        10, 11, 11, 12, 12, 13, 13,
      ],
      $ = 15;
    function X() {
      let n, e, t, r, o, d;
      function u(x, m, S, z, B, N, s, p, i, c, h) {
        let w, R, v, y, f, k, F, I, T, A, L, W, V, O, q;
        (A = 0), (f = S);
        do t[x[m + A]]++, A++, f--;
        while (f !== 0);
        if (t[0] == S) return (s[0] = -1), (p[0] = 0), 0;
        for (I = p[0], k = 1; k <= $ && t[k] === 0; k++);
        for (F = k, I < k && (I = k), f = $; f !== 0 && t[f] === 0; f--);
        for (v = f, I > f && (I = f), p[0] = I, O = 1 << k; k < f; k++, O <<= 1)
          if ((O -= t[k]) < 0) return -3;
        if ((O -= t[f]) < 0) return -3;
        for (t[f] += O, d[1] = k = 0, A = 1, V = 2; --f != 0; )
          (d[V] = k += t[A]), V++, A++;
        (f = 0), (A = 0);
        do (k = x[m + A]) !== 0 && (h[d[k]++] = f), A++;
        while (++f < S);
        for (
          S = d[v], d[0] = f = 0, A = 0, y = -1, W = -I, o[0] = 0, L = 0, q = 0;
          F <= v;
          F++
        )
          for (w = t[F]; w-- != 0; ) {
            for (; F > W + I; ) {
              if (
                (y++,
                (W += I),
                (q = v - W),
                (q = q > I ? I : q),
                (R = 1 << (k = F - W)) > w + 1 &&
                  ((R -= w + 1), (V = F), k < q))
              )
                for (; ++k < q && !((R <<= 1) <= t[++V]); ) R -= t[V];
              if (((q = 1 << k), c[0] + q > 1440)) return -3;
              (o[y] = L = c[0]),
                (c[0] += q),
                y !== 0
                  ? ((d[y] = f),
                    (r[0] = k),
                    (r[1] = I),
                    (k = f >>> (W - I)),
                    (r[2] = L - o[y - 1] - k),
                    i.set(r, 3 * (o[y - 1] + k)))
                  : (s[0] = L);
            }
            for (
              r[1] = F - W,
                A >= S
                  ? (r[0] = 192)
                  : h[A] < z
                  ? ((r[0] = h[A] < 256 ? 0 : 96), (r[2] = h[A++]))
                  : ((r[0] = N[h[A] - z] + 16 + 64), (r[2] = B[h[A++] - z])),
                R = 1 << (F - W),
                k = f >>> W;
              k < q;
              k += R
            )
              i.set(r, 3 * (L + k));
            for (k = 1 << (F - 1); f & k; k >>>= 1) f ^= k;
            for (f ^= k, T = (1 << W) - 1; (f & T) != d[y]; )
              y--, (W -= I), (T = (1 << W) - 1);
          }
        return O !== 0 && v != 1 ? -5 : 0;
      }
      function _(x) {
        let m;
        for (
          n ||
            ((n = []),
            (e = []),
            (t = new Int32Array(16)),
            (r = []),
            (o = new Int32Array($)),
            (d = new Int32Array(16))),
            e.length < x && (e = []),
            m = 0;
          m < x;
          m++
        )
          e[m] = 0;
        for (m = 0; m < 16; m++) t[m] = 0;
        for (m = 0; m < 3; m++) r[m] = 0;
        o.set(t.subarray(0, $), 0), d.set(t.subarray(0, 16), 0);
      }
      (this.inflate_trees_bits = function (x, m, S, z, B) {
        let N;
        return (
          _(19),
          (n[0] = 0),
          (N = u(x, 0, 19, 19, null, null, S, m, z, n, e)),
          N == -3
            ? (B.msg = 'oversubscribed dynamic bit lengths tree')
            : (N != -5 && m[0] !== 0) ||
              ((B.msg = 'incomplete dynamic bit lengths tree'), (N = -3)),
          N
        );
      }),
        (this.inflate_trees_dynamic = function (x, m, S, z, B, N, s, p, i) {
          let c;
          return (
            _(288),
            (n[0] = 0),
            (c = u(S, 0, x, 257, P, D, N, z, p, n, e)),
            c != 0 || z[0] === 0
              ? (c == -3
                  ? (i.msg = 'oversubscribed literal/length tree')
                  : c != -4 &&
                    ((i.msg = 'incomplete literal/length tree'), (c = -3)),
                c)
              : (_(288),
                (c = u(S, x, m, 0, K, Z, s, B, p, n, e)),
                c != 0 || (B[0] === 0 && x > 257)
                  ? (c == -3
                      ? (i.msg = 'oversubscribed distance tree')
                      : c == -5
                      ? ((i.msg = 'incomplete distance tree'), (c = -3))
                      : c != -4 &&
                        ((i.msg = 'empty distance tree with lengths'),
                        (c = -3)),
                    c)
                  : 0)
          );
        });
    }
    X.inflate_trees_fixed = function (n, e, t, r) {
      return (n[0] = 9), (e[0] = 5), (t[0] = M), (r[0] = E), 0;
    };
    function kt() {
      const n = this;
      let e,
        t,
        r,
        o,
        d = 0,
        u = 0,
        _ = 0,
        x = 0,
        m = 0,
        S = 0,
        z = 0,
        B = 0,
        N = 0,
        s = 0;
      function p(i, c, h, w, R, v, y, f) {
        let k, F, I, T, A, L, W, V, O, q, dt, ut, H, wt, G, J;
        (W = f.next_in_index),
          (V = f.avail_in),
          (A = y.bitb),
          (L = y.bitk),
          (O = y.write),
          (q = O < y.read ? y.read - O - 1 : y.end - O),
          (dt = j[i]),
          (ut = j[c]);
        do {
          for (; L < 20; ) V--, (A |= (255 & f.read_byte(W++)) << L), (L += 8);
          if (
            ((k = A & dt),
            (F = h),
            (I = w),
            (J = 3 * (I + k)),
            (T = F[J]) !== 0)
          )
            for (;;) {
              if (((A >>= F[J + 1]), (L -= F[J + 1]), (16 & T) != 0)) {
                for (
                  T &= 15, H = F[J + 2] + (A & j[T]), A >>= T, L -= T;
                  L < 15;

                )
                  V--, (A |= (255 & f.read_byte(W++)) << L), (L += 8);
                for (k = A & ut, F = R, I = v, J = 3 * (I + k), T = F[J]; ; ) {
                  if (((A >>= F[J + 1]), (L -= F[J + 1]), (16 & T) != 0)) {
                    for (T &= 15; L < T; )
                      V--, (A |= (255 & f.read_byte(W++)) << L), (L += 8);
                    if (
                      ((wt = F[J + 2] + (A & j[T])),
                      (A >>= T),
                      (L -= T),
                      (q -= H),
                      O >= wt)
                    )
                      (G = O - wt),
                        O - G > 0 && 2 > O - G
                          ? ((y.window[O++] = y.window[G++]),
                            (y.window[O++] = y.window[G++]),
                            (H -= 2))
                          : (y.window.set(y.window.subarray(G, G + 2), O),
                            (O += 2),
                            (G += 2),
                            (H -= 2));
                    else {
                      G = O - wt;
                      do G += y.end;
                      while (G < 0);
                      if (((T = y.end - G), H > T)) {
                        if (((H -= T), O - G > 0 && T > O - G))
                          do y.window[O++] = y.window[G++];
                          while (--T != 0);
                        else
                          y.window.set(y.window.subarray(G, G + T), O),
                            (O += T),
                            (G += T),
                            (T = 0);
                        G = 0;
                      }
                    }
                    if (O - G > 0 && H > O - G)
                      do y.window[O++] = y.window[G++];
                      while (--H != 0);
                    else
                      y.window.set(y.window.subarray(G, G + H), O),
                        (O += H),
                        (G += H),
                        (H = 0);
                    break;
                  }
                  if (64 & T)
                    return (
                      (f.msg = 'invalid distance code'),
                      (H = f.avail_in - V),
                      (H = L >> 3 < H ? L >> 3 : H),
                      (V += H),
                      (W -= H),
                      (L -= H << 3),
                      (y.bitb = A),
                      (y.bitk = L),
                      (f.avail_in = V),
                      (f.total_in += W - f.next_in_index),
                      (f.next_in_index = W),
                      (y.write = O),
                      -3
                    );
                  (k += F[J + 2]),
                    (k += A & j[T]),
                    (J = 3 * (I + k)),
                    (T = F[J]);
                }
                break;
              }
              if (64 & T)
                return 32 & T
                  ? ((H = f.avail_in - V),
                    (H = L >> 3 < H ? L >> 3 : H),
                    (V += H),
                    (W -= H),
                    (L -= H << 3),
                    (y.bitb = A),
                    (y.bitk = L),
                    (f.avail_in = V),
                    (f.total_in += W - f.next_in_index),
                    (f.next_in_index = W),
                    (y.write = O),
                    1)
                  : ((f.msg = 'invalid literal/length code'),
                    (H = f.avail_in - V),
                    (H = L >> 3 < H ? L >> 3 : H),
                    (V += H),
                    (W -= H),
                    (L -= H << 3),
                    (y.bitb = A),
                    (y.bitk = L),
                    (f.avail_in = V),
                    (f.total_in += W - f.next_in_index),
                    (f.next_in_index = W),
                    (y.write = O),
                    -3);
              if (
                ((k += F[J + 2]),
                (k += A & j[T]),
                (J = 3 * (I + k)),
                (T = F[J]) === 0)
              ) {
                (A >>= F[J + 1]),
                  (L -= F[J + 1]),
                  (y.window[O++] = F[J + 2]),
                  q--;
                break;
              }
            }
          else
            (A >>= F[J + 1]), (L -= F[J + 1]), (y.window[O++] = F[J + 2]), q--;
        } while (q >= 258 && V >= 10);
        return (
          (H = f.avail_in - V),
          (H = L >> 3 < H ? L >> 3 : H),
          (V += H),
          (W -= H),
          (L -= H << 3),
          (y.bitb = A),
          (y.bitk = L),
          (f.avail_in = V),
          (f.total_in += W - f.next_in_index),
          (f.next_in_index = W),
          (y.write = O),
          0
        );
      }
      (n.init = function (i, c, h, w, R, v) {
        (e = 0),
          (z = i),
          (B = c),
          (r = h),
          (N = w),
          (o = R),
          (s = v),
          (t = null);
      }),
        (n.proc = function (i, c, h) {
          let w,
            R,
            v,
            y,
            f,
            k,
            F,
            I = 0,
            T = 0,
            A = 0;
          for (
            A = c.next_in_index,
              y = c.avail_in,
              I = i.bitb,
              T = i.bitk,
              f = i.write,
              k = f < i.read ? i.read - f - 1 : i.end - f;
            ;

          )
            switch (e) {
              case 0:
                if (
                  k >= 258 &&
                  y >= 10 &&
                  ((i.bitb = I),
                  (i.bitk = T),
                  (c.avail_in = y),
                  (c.total_in += A - c.next_in_index),
                  (c.next_in_index = A),
                  (i.write = f),
                  (h = p(z, B, r, N, o, s, i, c)),
                  (A = c.next_in_index),
                  (y = c.avail_in),
                  (I = i.bitb),
                  (T = i.bitk),
                  (f = i.write),
                  (k = f < i.read ? i.read - f - 1 : i.end - f),
                  h != 0)
                ) {
                  e = h == 1 ? 7 : 9;
                  break;
                }
                (_ = z), (t = r), (u = N), (e = 1);
              case 1:
                for (w = _; T < w; ) {
                  if (y === 0)
                    return (
                      (i.bitb = I),
                      (i.bitk = T),
                      (c.avail_in = y),
                      (c.total_in += A - c.next_in_index),
                      (c.next_in_index = A),
                      (i.write = f),
                      i.inflate_flush(c, h)
                    );
                  (h = 0), y--, (I |= (255 & c.read_byte(A++)) << T), (T += 8);
                }
                if (
                  ((R = 3 * (u + (I & j[w]))),
                  (I >>>= t[R + 1]),
                  (T -= t[R + 1]),
                  (v = t[R]),
                  v === 0)
                ) {
                  (x = t[R + 2]), (e = 6);
                  break;
                }
                if (16 & v) {
                  (m = 15 & v), (d = t[R + 2]), (e = 2);
                  break;
                }
                if (!(64 & v)) {
                  (_ = v), (u = R / 3 + t[R + 2]);
                  break;
                }
                if (32 & v) {
                  e = 7;
                  break;
                }
                return (
                  (e = 9),
                  (c.msg = 'invalid literal/length code'),
                  (h = -3),
                  (i.bitb = I),
                  (i.bitk = T),
                  (c.avail_in = y),
                  (c.total_in += A - c.next_in_index),
                  (c.next_in_index = A),
                  (i.write = f),
                  i.inflate_flush(c, h)
                );
              case 2:
                for (w = m; T < w; ) {
                  if (y === 0)
                    return (
                      (i.bitb = I),
                      (i.bitk = T),
                      (c.avail_in = y),
                      (c.total_in += A - c.next_in_index),
                      (c.next_in_index = A),
                      (i.write = f),
                      i.inflate_flush(c, h)
                    );
                  (h = 0), y--, (I |= (255 & c.read_byte(A++)) << T), (T += 8);
                }
                (d += I & j[w]),
                  (I >>= w),
                  (T -= w),
                  (_ = B),
                  (t = o),
                  (u = s),
                  (e = 3);
              case 3:
                for (w = _; T < w; ) {
                  if (y === 0)
                    return (
                      (i.bitb = I),
                      (i.bitk = T),
                      (c.avail_in = y),
                      (c.total_in += A - c.next_in_index),
                      (c.next_in_index = A),
                      (i.write = f),
                      i.inflate_flush(c, h)
                    );
                  (h = 0), y--, (I |= (255 & c.read_byte(A++)) << T), (T += 8);
                }
                if (
                  ((R = 3 * (u + (I & j[w]))),
                  (I >>= t[R + 1]),
                  (T -= t[R + 1]),
                  (v = t[R]),
                  (16 & v) != 0)
                ) {
                  (m = 15 & v), (S = t[R + 2]), (e = 4);
                  break;
                }
                if (!(64 & v)) {
                  (_ = v), (u = R / 3 + t[R + 2]);
                  break;
                }
                return (
                  (e = 9),
                  (c.msg = 'invalid distance code'),
                  (h = -3),
                  (i.bitb = I),
                  (i.bitk = T),
                  (c.avail_in = y),
                  (c.total_in += A - c.next_in_index),
                  (c.next_in_index = A),
                  (i.write = f),
                  i.inflate_flush(c, h)
                );
              case 4:
                for (w = m; T < w; ) {
                  if (y === 0)
                    return (
                      (i.bitb = I),
                      (i.bitk = T),
                      (c.avail_in = y),
                      (c.total_in += A - c.next_in_index),
                      (c.next_in_index = A),
                      (i.write = f),
                      i.inflate_flush(c, h)
                    );
                  (h = 0), y--, (I |= (255 & c.read_byte(A++)) << T), (T += 8);
                }
                (S += I & j[w]), (I >>= w), (T -= w), (e = 5);
              case 5:
                for (F = f - S; F < 0; ) F += i.end;
                for (; d !== 0; ) {
                  if (
                    k === 0 &&
                    (f == i.end &&
                      i.read !== 0 &&
                      ((f = 0), (k = f < i.read ? i.read - f - 1 : i.end - f)),
                    k === 0 &&
                      ((i.write = f),
                      (h = i.inflate_flush(c, h)),
                      (f = i.write),
                      (k = f < i.read ? i.read - f - 1 : i.end - f),
                      f == i.end &&
                        i.read !== 0 &&
                        ((f = 0),
                        (k = f < i.read ? i.read - f - 1 : i.end - f)),
                      k === 0))
                  )
                    return (
                      (i.bitb = I),
                      (i.bitk = T),
                      (c.avail_in = y),
                      (c.total_in += A - c.next_in_index),
                      (c.next_in_index = A),
                      (i.write = f),
                      i.inflate_flush(c, h)
                    );
                  (i.window[f++] = i.window[F++]),
                    k--,
                    F == i.end && (F = 0),
                    d--;
                }
                e = 0;
                break;
              case 6:
                if (
                  k === 0 &&
                  (f == i.end &&
                    i.read !== 0 &&
                    ((f = 0), (k = f < i.read ? i.read - f - 1 : i.end - f)),
                  k === 0 &&
                    ((i.write = f),
                    (h = i.inflate_flush(c, h)),
                    (f = i.write),
                    (k = f < i.read ? i.read - f - 1 : i.end - f),
                    f == i.end &&
                      i.read !== 0 &&
                      ((f = 0), (k = f < i.read ? i.read - f - 1 : i.end - f)),
                    k === 0))
                )
                  return (
                    (i.bitb = I),
                    (i.bitk = T),
                    (c.avail_in = y),
                    (c.total_in += A - c.next_in_index),
                    (c.next_in_index = A),
                    (i.write = f),
                    i.inflate_flush(c, h)
                  );
                (h = 0), (i.window[f++] = x), k--, (e = 0);
                break;
              case 7:
                if (
                  (T > 7 && ((T -= 8), y++, A--),
                  (i.write = f),
                  (h = i.inflate_flush(c, h)),
                  (f = i.write),
                  (k = f < i.read ? i.read - f - 1 : i.end - f),
                  i.read != i.write)
                )
                  return (
                    (i.bitb = I),
                    (i.bitk = T),
                    (c.avail_in = y),
                    (c.total_in += A - c.next_in_index),
                    (c.next_in_index = A),
                    (i.write = f),
                    i.inflate_flush(c, h)
                  );
                e = 8;
              case 8:
                return (
                  (h = 1),
                  (i.bitb = I),
                  (i.bitk = T),
                  (c.avail_in = y),
                  (c.total_in += A - c.next_in_index),
                  (c.next_in_index = A),
                  (i.write = f),
                  i.inflate_flush(c, h)
                );
              case 9:
                return (
                  (h = -3),
                  (i.bitb = I),
                  (i.bitk = T),
                  (c.avail_in = y),
                  (c.total_in += A - c.next_in_index),
                  (c.next_in_index = A),
                  (i.write = f),
                  i.inflate_flush(c, h)
                );
              default:
                return (
                  (h = -2),
                  (i.bitb = I),
                  (i.bitk = T),
                  (c.avail_in = y),
                  (c.total_in += A - c.next_in_index),
                  (c.next_in_index = A),
                  (i.write = f),
                  i.inflate_flush(c, h)
                );
            }
        }),
        (n.free = function () {});
    }
    const Zt = [
      16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
    ];
    function Xe(n, e) {
      const t = this;
      let r,
        o = 0,
        d = 0,
        u = 0,
        _ = 0;
      const x = [0],
        m = [0],
        S = new kt();
      let z = 0,
        B = new Int32Array(4320);
      const N = new X();
      (t.bitk = 0),
        (t.bitb = 0),
        (t.window = new Uint8Array(e)),
        (t.end = e),
        (t.read = 0),
        (t.write = 0),
        (t.reset = function (s, p) {
          p && (p[0] = 0),
            o == 6 && S.free(s),
            (o = 0),
            (t.bitk = 0),
            (t.bitb = 0),
            (t.read = t.write = 0);
        }),
        t.reset(n, null),
        (t.inflate_flush = function (s, p) {
          let i, c, h;
          return (
            (c = s.next_out_index),
            (h = t.read),
            (i = (h <= t.write ? t.write : t.end) - h),
            i > s.avail_out && (i = s.avail_out),
            i !== 0 && p == -5 && (p = 0),
            (s.avail_out -= i),
            (s.total_out += i),
            s.next_out.set(t.window.subarray(h, h + i), c),
            (c += i),
            (h += i),
            h == t.end &&
              ((h = 0),
              t.write == t.end && (t.write = 0),
              (i = t.write - h),
              i > s.avail_out && (i = s.avail_out),
              i !== 0 && p == -5 && (p = 0),
              (s.avail_out -= i),
              (s.total_out += i),
              s.next_out.set(t.window.subarray(h, h + i), c),
              (c += i),
              (h += i)),
            (s.next_out_index = c),
            (t.read = h),
            p
          );
        }),
        (t.proc = function (s, p) {
          let i, c, h, w, R, v, y, f;
          for (
            w = s.next_in_index,
              R = s.avail_in,
              c = t.bitb,
              h = t.bitk,
              v = t.write,
              y = v < t.read ? t.read - v - 1 : t.end - v;
            ;

          ) {
            let k, F, I, T, A, L, W, V;
            switch (o) {
              case 0:
                for (; h < 3; ) {
                  if (R === 0)
                    return (
                      (t.bitb = c),
                      (t.bitk = h),
                      (s.avail_in = R),
                      (s.total_in += w - s.next_in_index),
                      (s.next_in_index = w),
                      (t.write = v),
                      t.inflate_flush(s, p)
                    );
                  (p = 0), R--, (c |= (255 & s.read_byte(w++)) << h), (h += 8);
                }
                switch (((i = 7 & c), (z = 1 & i), i >>> 1)) {
                  case 0:
                    (c >>>= 3),
                      (h -= 3),
                      (i = 7 & h),
                      (c >>>= i),
                      (h -= i),
                      (o = 1);
                    break;
                  case 1:
                    (k = []),
                      (F = []),
                      (I = [[]]),
                      (T = [[]]),
                      X.inflate_trees_fixed(k, F, I, T),
                      S.init(k[0], F[0], I[0], 0, T[0], 0),
                      (c >>>= 3),
                      (h -= 3),
                      (o = 6);
                    break;
                  case 2:
                    (c >>>= 3), (h -= 3), (o = 3);
                    break;
                  case 3:
                    return (
                      (c >>>= 3),
                      (h -= 3),
                      (o = 9),
                      (s.msg = 'invalid block type'),
                      (p = -3),
                      (t.bitb = c),
                      (t.bitk = h),
                      (s.avail_in = R),
                      (s.total_in += w - s.next_in_index),
                      (s.next_in_index = w),
                      (t.write = v),
                      t.inflate_flush(s, p)
                    );
                }
                break;
              case 1:
                for (; h < 32; ) {
                  if (R === 0)
                    return (
                      (t.bitb = c),
                      (t.bitk = h),
                      (s.avail_in = R),
                      (s.total_in += w - s.next_in_index),
                      (s.next_in_index = w),
                      (t.write = v),
                      t.inflate_flush(s, p)
                    );
                  (p = 0), R--, (c |= (255 & s.read_byte(w++)) << h), (h += 8);
                }
                if (((~c >>> 16) & 65535) != (65535 & c))
                  return (
                    (o = 9),
                    (s.msg = 'invalid stored block lengths'),
                    (p = -3),
                    (t.bitb = c),
                    (t.bitk = h),
                    (s.avail_in = R),
                    (s.total_in += w - s.next_in_index),
                    (s.next_in_index = w),
                    (t.write = v),
                    t.inflate_flush(s, p)
                  );
                (d = 65535 & c),
                  (c = h = 0),
                  (o = d !== 0 ? 2 : z !== 0 ? 7 : 0);
                break;
              case 2:
                if (
                  R === 0 ||
                  (y === 0 &&
                    (v == t.end &&
                      t.read !== 0 &&
                      ((v = 0), (y = v < t.read ? t.read - v - 1 : t.end - v)),
                    y === 0 &&
                      ((t.write = v),
                      (p = t.inflate_flush(s, p)),
                      (v = t.write),
                      (y = v < t.read ? t.read - v - 1 : t.end - v),
                      v == t.end &&
                        t.read !== 0 &&
                        ((v = 0),
                        (y = v < t.read ? t.read - v - 1 : t.end - v)),
                      y === 0)))
                )
                  return (
                    (t.bitb = c),
                    (t.bitk = h),
                    (s.avail_in = R),
                    (s.total_in += w - s.next_in_index),
                    (s.next_in_index = w),
                    (t.write = v),
                    t.inflate_flush(s, p)
                  );
                if (
                  ((p = 0),
                  (i = d),
                  i > R && (i = R),
                  i > y && (i = y),
                  t.window.set(s.read_buf(w, i), v),
                  (w += i),
                  (R -= i),
                  (v += i),
                  (y -= i),
                  (d -= i) != 0)
                )
                  break;
                o = z !== 0 ? 7 : 0;
                break;
              case 3:
                for (; h < 14; ) {
                  if (R === 0)
                    return (
                      (t.bitb = c),
                      (t.bitk = h),
                      (s.avail_in = R),
                      (s.total_in += w - s.next_in_index),
                      (s.next_in_index = w),
                      (t.write = v),
                      t.inflate_flush(s, p)
                    );
                  (p = 0), R--, (c |= (255 & s.read_byte(w++)) << h), (h += 8);
                }
                if (
                  ((u = i = 16383 & c), (31 & i) > 29 || ((i >> 5) & 31) > 29)
                )
                  return (
                    (o = 9),
                    (s.msg = 'too many length or distance symbols'),
                    (p = -3),
                    (t.bitb = c),
                    (t.bitk = h),
                    (s.avail_in = R),
                    (s.total_in += w - s.next_in_index),
                    (s.next_in_index = w),
                    (t.write = v),
                    t.inflate_flush(s, p)
                  );
                if (
                  ((i = 258 + (31 & i) + ((i >> 5) & 31)), !r || r.length < i)
                )
                  r = [];
                else for (f = 0; f < i; f++) r[f] = 0;
                (c >>>= 14), (h -= 14), (_ = 0), (o = 4);
              case 4:
                for (; _ < 4 + (u >>> 10); ) {
                  for (; h < 3; ) {
                    if (R === 0)
                      return (
                        (t.bitb = c),
                        (t.bitk = h),
                        (s.avail_in = R),
                        (s.total_in += w - s.next_in_index),
                        (s.next_in_index = w),
                        (t.write = v),
                        t.inflate_flush(s, p)
                      );
                    (p = 0),
                      R--,
                      (c |= (255 & s.read_byte(w++)) << h),
                      (h += 8);
                  }
                  (r[Zt[_++]] = 7 & c), (c >>>= 3), (h -= 3);
                }
                for (; _ < 19; ) r[Zt[_++]] = 0;
                if (
                  ((x[0] = 7),
                  (i = N.inflate_trees_bits(r, x, m, B, s)),
                  i != 0)
                )
                  return (
                    (p = i) == -3 && ((r = null), (o = 9)),
                    (t.bitb = c),
                    (t.bitk = h),
                    (s.avail_in = R),
                    (s.total_in += w - s.next_in_index),
                    (s.next_in_index = w),
                    (t.write = v),
                    t.inflate_flush(s, p)
                  );
                (_ = 0), (o = 5);
              case 5:
                for (; (i = u), !(_ >= 258 + (31 & i) + ((i >> 5) & 31)); ) {
                  let O, q;
                  for (i = x[0]; h < i; ) {
                    if (R === 0)
                      return (
                        (t.bitb = c),
                        (t.bitk = h),
                        (s.avail_in = R),
                        (s.total_in += w - s.next_in_index),
                        (s.next_in_index = w),
                        (t.write = v),
                        t.inflate_flush(s, p)
                      );
                    (p = 0),
                      R--,
                      (c |= (255 & s.read_byte(w++)) << h),
                      (h += 8);
                  }
                  if (
                    ((i = B[3 * (m[0] + (c & j[i])) + 1]),
                    (q = B[3 * (m[0] + (c & j[i])) + 2]),
                    q < 16)
                  )
                    (c >>>= i), (h -= i), (r[_++] = q);
                  else {
                    for (
                      f = q == 18 ? 7 : q - 14, O = q == 18 ? 11 : 3;
                      h < i + f;

                    ) {
                      if (R === 0)
                        return (
                          (t.bitb = c),
                          (t.bitk = h),
                          (s.avail_in = R),
                          (s.total_in += w - s.next_in_index),
                          (s.next_in_index = w),
                          (t.write = v),
                          t.inflate_flush(s, p)
                        );
                      (p = 0),
                        R--,
                        (c |= (255 & s.read_byte(w++)) << h),
                        (h += 8);
                    }
                    if (
                      ((c >>>= i),
                      (h -= i),
                      (O += c & j[f]),
                      (c >>>= f),
                      (h -= f),
                      (f = _),
                      (i = u),
                      f + O > 258 + (31 & i) + ((i >> 5) & 31) ||
                        (q == 16 && f < 1))
                    )
                      return (
                        (r = null),
                        (o = 9),
                        (s.msg = 'invalid bit length repeat'),
                        (p = -3),
                        (t.bitb = c),
                        (t.bitk = h),
                        (s.avail_in = R),
                        (s.total_in += w - s.next_in_index),
                        (s.next_in_index = w),
                        (t.write = v),
                        t.inflate_flush(s, p)
                      );
                    q = q == 16 ? r[f - 1] : 0;
                    do r[f++] = q;
                    while (--O != 0);
                    _ = f;
                  }
                }
                if (
                  ((m[0] = -1),
                  (A = []),
                  (L = []),
                  (W = []),
                  (V = []),
                  (A[0] = 9),
                  (L[0] = 6),
                  (i = u),
                  (i = N.inflate_trees_dynamic(
                    257 + (31 & i),
                    1 + ((i >> 5) & 31),
                    r,
                    A,
                    L,
                    W,
                    V,
                    B,
                    s
                  )),
                  i != 0)
                )
                  return (
                    i == -3 && ((r = null), (o = 9)),
                    (p = i),
                    (t.bitb = c),
                    (t.bitk = h),
                    (s.avail_in = R),
                    (s.total_in += w - s.next_in_index),
                    (s.next_in_index = w),
                    (t.write = v),
                    t.inflate_flush(s, p)
                  );
                S.init(A[0], L[0], B, W[0], B, V[0]), (o = 6);
              case 6:
                if (
                  ((t.bitb = c),
                  (t.bitk = h),
                  (s.avail_in = R),
                  (s.total_in += w - s.next_in_index),
                  (s.next_in_index = w),
                  (t.write = v),
                  (p = S.proc(t, s, p)) != 1)
                )
                  return t.inflate_flush(s, p);
                if (
                  ((p = 0),
                  S.free(s),
                  (w = s.next_in_index),
                  (R = s.avail_in),
                  (c = t.bitb),
                  (h = t.bitk),
                  (v = t.write),
                  (y = v < t.read ? t.read - v - 1 : t.end - v),
                  z === 0)
                ) {
                  o = 0;
                  break;
                }
                o = 7;
              case 7:
                if (
                  ((t.write = v),
                  (p = t.inflate_flush(s, p)),
                  (v = t.write),
                  (y = v < t.read ? t.read - v - 1 : t.end - v),
                  t.read != t.write)
                )
                  return (
                    (t.bitb = c),
                    (t.bitk = h),
                    (s.avail_in = R),
                    (s.total_in += w - s.next_in_index),
                    (s.next_in_index = w),
                    (t.write = v),
                    t.inflate_flush(s, p)
                  );
                o = 8;
              case 8:
                return (
                  (p = 1),
                  (t.bitb = c),
                  (t.bitk = h),
                  (s.avail_in = R),
                  (s.total_in += w - s.next_in_index),
                  (s.next_in_index = w),
                  (t.write = v),
                  t.inflate_flush(s, p)
                );
              case 9:
                return (
                  (p = -3),
                  (t.bitb = c),
                  (t.bitk = h),
                  (s.avail_in = R),
                  (s.total_in += w - s.next_in_index),
                  (s.next_in_index = w),
                  (t.write = v),
                  t.inflate_flush(s, p)
                );
              default:
                return (
                  (p = -2),
                  (t.bitb = c),
                  (t.bitk = h),
                  (s.avail_in = R),
                  (s.total_in += w - s.next_in_index),
                  (s.next_in_index = w),
                  (t.write = v),
                  t.inflate_flush(s, p)
                );
            }
          }
        }),
        (t.free = function (s) {
          t.reset(s, null), (t.window = null), (B = null);
        }),
        (t.set_dictionary = function (s, p, i) {
          t.window.set(s.subarray(p, p + i), 0), (t.read = t.write = i);
        }),
        (t.sync_point = function () {
          return o == 1 ? 1 : 0;
        });
    }
    const at = 13,
      Qe = [0, 0, 255, 255];
    function tn() {
      const n = this;
      function e(t) {
        return t && t.istate
          ? ((t.total_in = t.total_out = 0),
            (t.msg = null),
            (t.istate.mode = 7),
            t.istate.blocks.reset(t, null),
            0)
          : -2;
      }
      (n.mode = 0),
        (n.method = 0),
        (n.was = [0]),
        (n.need = 0),
        (n.marker = 0),
        (n.wbits = 0),
        (n.inflateEnd = function (t) {
          return n.blocks && n.blocks.free(t), (n.blocks = null), 0;
        }),
        (n.inflateInit = function (t, r) {
          return (
            (t.msg = null),
            (n.blocks = null),
            r < 8 || r > 15
              ? (n.inflateEnd(t), -2)
              : ((n.wbits = r), (t.istate.blocks = new Xe(t, 1 << r)), e(t), 0)
          );
        }),
        (n.inflate = function (t, r) {
          let o, d;
          if (!t || !t.istate || !t.next_in) return -2;
          const u = t.istate;
          for (r = r == 4 ? -5 : 0, o = -5; ; )
            switch (u.mode) {
              case 0:
                if (t.avail_in === 0) return o;
                if (
                  ((o = r),
                  t.avail_in--,
                  t.total_in++,
                  (15 & (u.method = t.read_byte(t.next_in_index++))) != 8)
                ) {
                  (u.mode = at),
                    (t.msg = 'unknown compression method'),
                    (u.marker = 5);
                  break;
                }
                if (8 + (u.method >> 4) > u.wbits) {
                  (u.mode = at),
                    (t.msg = 'invalid window size'),
                    (u.marker = 5);
                  break;
                }
                u.mode = 1;
              case 1:
                if (t.avail_in === 0) return o;
                if (
                  ((o = r),
                  t.avail_in--,
                  t.total_in++,
                  (d = 255 & t.read_byte(t.next_in_index++)),
                  ((u.method << 8) + d) % 31 != 0)
                ) {
                  (u.mode = at),
                    (t.msg = 'incorrect header check'),
                    (u.marker = 5);
                  break;
                }
                if (!(32 & d)) {
                  u.mode = 7;
                  break;
                }
                u.mode = 2;
              case 2:
                if (t.avail_in === 0) return o;
                (o = r),
                  t.avail_in--,
                  t.total_in++,
                  (u.need =
                    ((255 & t.read_byte(t.next_in_index++)) << 24) &
                    4278190080),
                  (u.mode = 3);
              case 3:
                if (t.avail_in === 0) return o;
                (o = r),
                  t.avail_in--,
                  t.total_in++,
                  (u.need +=
                    ((255 & t.read_byte(t.next_in_index++)) << 16) & 16711680),
                  (u.mode = 4);
              case 4:
                if (t.avail_in === 0) return o;
                (o = r),
                  t.avail_in--,
                  t.total_in++,
                  (u.need +=
                    ((255 & t.read_byte(t.next_in_index++)) << 8) & 65280),
                  (u.mode = 5);
              case 5:
                return t.avail_in === 0
                  ? o
                  : ((o = r),
                    t.avail_in--,
                    t.total_in++,
                    (u.need += 255 & t.read_byte(t.next_in_index++)),
                    (u.mode = 6),
                    2);
              case 6:
                return (
                  (u.mode = at), (t.msg = 'need dictionary'), (u.marker = 0), -2
                );
              case 7:
                if (((o = u.blocks.proc(t, o)), o == -3)) {
                  (u.mode = at), (u.marker = 0);
                  break;
                }
                if ((o == 0 && (o = r), o != 1)) return o;
                (o = r), u.blocks.reset(t, u.was), (u.mode = 12);
              case 12:
                return 1;
              case at:
                return -3;
              default:
                return -2;
            }
        }),
        (n.inflateSetDictionary = function (t, r, o) {
          let d = 0,
            u = o;
          if (!t || !t.istate || t.istate.mode != 6) return -2;
          const _ = t.istate;
          return (
            u >= 1 << _.wbits && ((u = (1 << _.wbits) - 1), (d = o - u)),
            _.blocks.set_dictionary(r, d, u),
            (_.mode = 7),
            0
          );
        }),
        (n.inflateSync = function (t) {
          let r, o, d, u, _;
          if (!t || !t.istate) return -2;
          const x = t.istate;
          if (
            (x.mode != at && ((x.mode = at), (x.marker = 0)),
            (r = t.avail_in) === 0)
          )
            return -5;
          for (o = t.next_in_index, d = x.marker; r !== 0 && d < 4; )
            t.read_byte(o) == Qe[d]
              ? d++
              : (d = t.read_byte(o) !== 0 ? 0 : 4 - d),
              o++,
              r--;
          return (
            (t.total_in += o - t.next_in_index),
            (t.next_in_index = o),
            (t.avail_in = r),
            (x.marker = d),
            d != 4
              ? -3
              : ((u = t.total_in),
                (_ = t.total_out),
                e(t),
                (t.total_in = u),
                (t.total_out = _),
                (x.mode = 7),
                0)
          );
        }),
        (n.inflateSyncPoint = function (t) {
          return t && t.istate && t.istate.blocks
            ? t.istate.blocks.sync_point()
            : -2;
        });
    }
    function Yt() {}
    Yt.prototype = {
      inflateInit: function (n) {
        const e = this;
        return (e.istate = new tn()), n || (n = 15), e.istate.inflateInit(e, n);
      },
      inflate: function (n) {
        const e = this;
        return e.istate ? e.istate.inflate(e, n) : -2;
      },
      inflateEnd: function () {
        const n = this;
        if (!n.istate) return -2;
        const e = n.istate.inflateEnd(n);
        return (n.istate = null), e;
      },
      inflateSync: function () {
        const n = this;
        return n.istate ? n.istate.inflateSync(n) : -2;
      },
      inflateSetDictionary: function (n, e) {
        const t = this;
        return t.istate ? t.istate.inflateSetDictionary(t, n, e) : -2;
      },
      read_byte: function (n) {
        return this.next_in[n];
      },
      read_buf: function (n, e) {
        return this.next_in.subarray(n, n + e);
      },
    };
    const en = {
        chunkSize: 524288,
        maxWorkers:
          (typeof navigator < 'u' && navigator.hardwareConcurrency) || 2,
        terminateWorkerTimeout: 5e3,
        useWebWorkers: !0,
        workerScripts: void 0,
      },
      et = Object.assign({}, en);
    function Jt(n) {
      if (
        (n.baseURL !== void 0 && (et.baseURL = n.baseURL),
        n.chunkSize !== void 0 && (et.chunkSize = n.chunkSize),
        n.maxWorkers !== void 0 && (et.maxWorkers = n.maxWorkers),
        n.terminateWorkerTimeout !== void 0 &&
          (et.terminateWorkerTimeout = n.terminateWorkerTimeout),
        n.useWebWorkers !== void 0 && (et.useWebWorkers = n.useWebWorkers),
        n.Deflate !== void 0 && (et.Deflate = n.Deflate),
        n.Inflate !== void 0 && (et.Inflate = n.Inflate),
        n.workerScripts !== void 0)
      ) {
        if (n.workerScripts.deflate) {
          if (!Array.isArray(n.workerScripts.deflate))
            throw new Error('workerScripts.deflate must be an array');
          et.workerScripts || (et.workerScripts = {}),
            (et.workerScripts.deflate = n.workerScripts.deflate);
        }
        if (n.workerScripts.inflate) {
          if (!Array.isArray(n.workerScripts.inflate))
            throw new Error('workerScripts.inflate must be an array');
          et.workerScripts || (et.workerScripts = {}),
            (et.workerScripts.inflate = n.workerScripts.inflate);
        }
      }
    }
    const Xt = 'Abort error';
    function Et(n, e) {
      if (n && n.aborted) throw (e.flush(), new Error(Xt));
    }
    async function Qt(n, e) {
      return e.length && (await n.writeUint8Array(e)), e.length;
    }
    const te = 'HTTP error ',
      It = 'HTTP Range not supported',
      Ct = 'text/plain',
      zt = 'GET',
      nn = 'bytes';
    class ee {
      constructor() {
        this.size = 0;
      }
      init() {
        this.initialized = !0;
      }
    }
    class ot extends ee {}
    class gt extends ee {
      writeUint8Array(e) {
        this.size += e.length;
      }
    }
    class ne extends ot {
      constructor(e) {
        super(), (this.blob = e), (this.size = e.size);
      }
      async readUint8Array(e, t) {
        if (this.blob.arrayBuffer)
          return new Uint8Array(await this.blob.slice(e, e + t).arrayBuffer());
        {
          const r = new FileReader();
          return new Promise((o, d) => {
            (r.onload = (u) => o(new Uint8Array(u.target.result))),
              (r.onerror = () => d(r.error)),
              r.readAsArrayBuffer(this.blob.slice(e, e + t));
          });
        }
      }
    }
    class rn extends ot {
      constructor(e, t) {
        super(),
          (this.url = e),
          (this.preventHeadRequest = t.preventHeadRequest),
          (this.useRangeHeader = t.useRangeHeader),
          (this.forceRangeRequests = t.forceRangeRequests),
          (this.options = Object.assign({}, t)),
          delete this.options.preventHeadRequest,
          delete this.options.useRangeHeader,
          delete this.options.forceRangeRequests,
          delete this.options.useXHR;
      }
      async init() {
        super.init(), await re(this, Lt, ae);
      }
      async readUint8Array(e, t) {
        return ie(this, e, t, Lt, ae);
      }
    }
    class sn extends ot {
      constructor(e, t) {
        super(),
          (this.url = e),
          (this.preventHeadRequest = t.preventHeadRequest),
          (this.useRangeHeader = t.useRangeHeader),
          (this.forceRangeRequests = t.forceRangeRequests),
          (this.options = t);
      }
      async init() {
        super.init(), await re(this, Mt, oe);
      }
      async readUint8Array(e, t) {
        return ie(this, e, t, Mt, oe);
      }
    }
    async function re(n, e, t) {
      if (
        (function (r) {
          if (typeof document < 'u') {
            const o = document.createElement('a');
            return (
              (o.href = r), o.protocol == 'http:' || o.protocol == 'https:'
            );
          }
          return /^https?:\/\//i.test(r);
        })(n.url) &&
        (n.useRangeHeader || n.forceRangeRequests)
      ) {
        const r = await e(zt, n, se(n));
        if (!n.forceRangeRequests && r.headers.get('Accept-Ranges') != nn)
          throw new Error(It);
        {
          let o;
          const d = r.headers.get('Content-Range');
          if (d) {
            const u = d.trim().split(/\s*\/\s*/);
            if (u.length) {
              const _ = u[1];
              _ && _ != '*' && (o = Number(_));
            }
          }
          o === void 0 ? await le(n, e, t) : (n.size = o);
        }
      } else await le(n, e, t);
    }
    async function ie(n, e, t, r, o) {
      if (n.useRangeHeader || n.forceRangeRequests) {
        const d = await r(zt, n, se(n, e, t));
        if (d.status != 206) throw new Error(It);
        return new Uint8Array(await d.arrayBuffer());
      }
      return (
        n.data || (await o(n, n.options)),
        new Uint8Array(n.data.subarray(e, e + t))
      );
    }
    function se(n, e = 0, t = 1) {
      return Object.assign({}, Ft(n), {
        Range: 'bytes=' + e + '-' + (e + t - 1),
      });
    }
    function Ft(n) {
      let e = n.options.headers;
      if (e) return Symbol.iterator in e ? Object.fromEntries(e) : e;
    }
    async function ae(n) {
      await ce(n, Lt);
    }
    async function oe(n) {
      await ce(n, Mt);
    }
    async function ce(n, e) {
      const t = await e(zt, n, Ft(n));
      (n.data = new Uint8Array(await t.arrayBuffer())),
        n.size || (n.size = n.data.length);
    }
    async function le(n, e, t) {
      if (n.preventHeadRequest) await t(n, n.options);
      else {
        const r = (await e('HEAD', n, Ft(n))).headers.get('Content-Length');
        r ? (n.size = Number(r)) : await t(n, n.options);
      }
    }
    async function Lt(n, { options: e, url: t }, r) {
      const o = await fetch(t, Object.assign({}, e, { method: n, headers: r }));
      if (o.status < 400) return o;
      throw new Error(te + (o.statusText || o.status));
    }
    function Mt(n, { url: e }, t) {
      return new Promise((r, o) => {
        const d = new XMLHttpRequest();
        if (
          (d.addEventListener(
            'load',
            () => {
              if (d.status < 400) {
                const u = [];
                d
                  .getAllResponseHeaders()
                  .trim()
                  .split(/[\r\n]+/)
                  .forEach((_) => {
                    const x = _.trim().split(/\s*:\s*/);
                    (x[0] = x[0]
                      .trim()
                      .replace(/^[a-z]|-[a-z]/g, (m) => m.toUpperCase())),
                      u.push(x);
                  }),
                  r({
                    status: d.status,
                    arrayBuffer: () => d.response,
                    headers: new Map(u),
                  });
              } else o(new Error(te + (d.statusText || d.status)));
            },
            !1
          ),
          d.addEventListener('error', (u) => o(u.detail.error), !1),
          d.open(n, e),
          t)
        )
          for (const u of Object.entries(t)) d.setRequestHeader(u[0], u[1]);
        (d.responseType = 'arraybuffer'), d.send();
      });
    }
    class de extends ot {
      constructor(e, t = {}) {
        super(),
          (this.url = e),
          t.useXHR
            ? (this.reader = new sn(e, t))
            : (this.reader = new rn(e, t));
      }
      set size(e) {}
      get size() {
        return this.reader.size;
      }
      async init() {
        super.init(), await this.reader.init();
      }
      async readUint8Array(e, t) {
        return this.reader.readUint8Array(e, t);
      }
    }
    const vt = 4294967295,
      ue = 33639248,
      he = 101075792,
      fe = [];
    for (let n = 0; n < 256; n++) {
      let e = n;
      for (let t = 0; t < 8; t++)
        1 & e ? (e = (e >>> 1) ^ 3988292384) : (e >>>= 1);
      fe[n] = e;
    }
    class bt {
      constructor(e) {
        this.crc = e || -1;
      }
      append(e) {
        let t = 0 | this.crc;
        for (let r = 0, o = 0 | e.length; r < o; r++)
          t = (t >>> 8) ^ fe[255 & (t ^ e[r])];
        this.crc = t;
      }
      get() {
        return ~this.crc;
      }
    }
    const nt = {
        concat(n, e) {
          if (n.length === 0 || e.length === 0) return n.concat(e);
          const t = n[n.length - 1],
            r = nt.getPartial(t);
          return r === 32
            ? n.concat(e)
            : nt._shiftRight(e, r, 0 | t, n.slice(0, n.length - 1));
        },
        bitLength(n) {
          const e = n.length;
          if (e === 0) return 0;
          const t = n[e - 1];
          return 32 * (e - 1) + nt.getPartial(t);
        },
        clamp(n, e) {
          if (32 * n.length < e) return n;
          const t = (n = n.slice(0, Math.ceil(e / 32))).length;
          return (
            (e &= 31),
            t > 0 &&
              e &&
              (n[t - 1] = nt.partial(e, n[t - 1] & (2147483648 >> (e - 1)), 1)),
            n
          );
        },
        partial: (n, e, t) =>
          n === 32 ? e : (t ? 0 | e : e << (32 - n)) + 1099511627776 * n,
        getPartial: (n) => Math.round(n / 1099511627776) || 32,
        _shiftRight(n, e, t, r) {
          for (r === void 0 && (r = []); e >= 32; e -= 32) r.push(t), (t = 0);
          if (e === 0) return r.concat(n);
          for (let u = 0; u < n.length; u++)
            r.push(t | (n[u] >>> e)), (t = n[u] << (32 - e));
          const o = n.length ? n[n.length - 1] : 0,
            d = nt.getPartial(o);
          return (
            r.push(nt.partial((e + d) & 31, e + d > 32 ? t : r.pop(), 1)), r
          );
        },
      },
      pe = {
        bytes: {
          fromBits(n) {
            const e = nt.bitLength(n) / 8,
              t = new Uint8Array(e);
            let r;
            for (let o = 0; o < e; o++)
              !(3 & o) && (r = n[o / 4]), (t[o] = r >>> 24), (r <<= 8);
            return t;
          },
          toBits(n) {
            const e = [];
            let t,
              r = 0;
            for (t = 0; t < n.length; t++)
              (r = (r << 8) | n[t]), (3 & t) == 3 && (e.push(r), (r = 0));
            return 3 & t && e.push(nt.partial(8 * (3 & t), r)), e;
          },
        },
      },
      _e = {
        sha1: function (n) {
          n
            ? ((this._h = n._h.slice(0)),
              (this._buffer = n._buffer.slice(0)),
              (this._length = n._length))
            : this.reset();
        },
      };
    _e.sha1.prototype = {
      blockSize: 512,
      reset: function () {
        const n = this;
        return (
          (n._h = this._init.slice(0)), (n._buffer = []), (n._length = 0), n
        );
      },
      update: function (n) {
        const e = this;
        typeof n == 'string' && (n = pe.utf8String.toBits(n));
        const t = (e._buffer = nt.concat(e._buffer, n)),
          r = e._length,
          o = (e._length = r + nt.bitLength(n));
        if (o > 9007199254740991)
          throw new Error('Cannot hash more than 2^53 - 1 bits');
        const d = new Uint32Array(t);
        let u = 0;
        for (
          let _ = e.blockSize + r - ((e.blockSize + r) & (e.blockSize - 1));
          _ <= o;
          _ += e.blockSize
        )
          e._block(d.subarray(16 * u, 16 * (u + 1))), (u += 1);
        return t.splice(0, 16 * u), e;
      },
      finalize: function () {
        const n = this;
        let e = n._buffer;
        const t = n._h;
        e = nt.concat(e, [nt.partial(1, 1)]);
        for (let r = e.length + 2; 15 & r; r++) e.push(0);
        for (
          e.push(Math.floor(n._length / 4294967296)), e.push(0 | n._length);
          e.length;

        )
          n._block(e.splice(0, 16));
        return n.reset(), t;
      },
      _init: [1732584193, 4023233417, 2562383102, 271733878, 3285377520],
      _key: [1518500249, 1859775393, 2400959708, 3395469782],
      _f: function (n, e, t, r) {
        return n <= 19
          ? (e & t) | (~e & r)
          : n <= 39
          ? e ^ t ^ r
          : n <= 59
          ? (e & t) | (e & r) | (t & r)
          : n <= 79
          ? e ^ t ^ r
          : void 0;
      },
      _S: function (n, e) {
        return (e << n) | (e >>> (32 - n));
      },
      _block: function (n) {
        const e = this,
          t = e._h,
          r = Array(80);
        for (let m = 0; m < 16; m++) r[m] = n[m];
        let o = t[0],
          d = t[1],
          u = t[2],
          _ = t[3],
          x = t[4];
        for (let m = 0; m <= 79; m++) {
          m >= 16 &&
            (r[m] = e._S(1, r[m - 3] ^ r[m - 8] ^ r[m - 14] ^ r[m - 16]));
          const S =
            (e._S(5, o) +
              e._f(m, d, u, _) +
              x +
              r[m] +
              e._key[Math.floor(m / 20)]) |
            0;
          (x = _), (_ = u), (u = e._S(30, d)), (d = o), (o = S);
        }
        (t[0] = (t[0] + o) | 0),
          (t[1] = (t[1] + d) | 0),
          (t[2] = (t[2] + u) | 0),
          (t[3] = (t[3] + _) | 0),
          (t[4] = (t[4] + x) | 0);
      },
    };
    const an = {
        aes: class {
          constructor(n) {
            const e = this;
            (e._tables = [
              [[], [], [], [], []],
              [[], [], [], [], []],
            ]),
              e._tables[0][0][0] || e._precompute();
            const t = e._tables[0][4],
              r = e._tables[1],
              o = n.length;
            let d,
              u,
              _,
              x = 1;
            if (o !== 4 && o !== 6 && o !== 8)
              throw new Error('invalid aes key size');
            for (
              e._key = [(u = n.slice(0)), (_ = [])], d = o;
              d < 4 * o + 28;
              d++
            ) {
              let m = u[d - 1];
              (d % o == 0 || (o === 8 && d % o == 4)) &&
                ((m =
                  (t[m >>> 24] << 24) ^
                  (t[(m >> 16) & 255] << 16) ^
                  (t[(m >> 8) & 255] << 8) ^
                  t[255 & m]),
                d % o == 0 &&
                  ((m = (m << 8) ^ (m >>> 24) ^ (x << 24)),
                  (x = (x << 1) ^ (283 * (x >> 7))))),
                (u[d] = u[d - o] ^ m);
            }
            for (let m = 0; d; m++, d--) {
              const S = u[3 & m ? d : d - 4];
              _[m] =
                d <= 4 || m < 4
                  ? S
                  : r[0][t[S >>> 24]] ^
                    r[1][t[(S >> 16) & 255]] ^
                    r[2][t[(S >> 8) & 255]] ^
                    r[3][t[255 & S]];
            }
          }
          encrypt(n) {
            return this._crypt(n, 0);
          }
          decrypt(n) {
            return this._crypt(n, 1);
          }
          _precompute() {
            const n = this._tables[0],
              e = this._tables[1],
              t = n[4],
              r = e[4],
              o = [],
              d = [];
            let u, _, x, m;
            for (let S = 0; S < 256; S++)
              d[(o[S] = (S << 1) ^ (283 * (S >> 7))) ^ S] = S;
            for (let S = (u = 0); !t[S]; S ^= _ || 1, u = d[u] || 1) {
              let z = u ^ (u << 1) ^ (u << 2) ^ (u << 3) ^ (u << 4);
              (z = (z >> 8) ^ (255 & z) ^ 99),
                (t[S] = z),
                (r[z] = S),
                (m = o[(x = o[(_ = o[S])])]);
              let B = (16843009 * m) ^ (65537 * x) ^ (257 * _) ^ (16843008 * S),
                N = (257 * o[z]) ^ (16843008 * z);
              for (let s = 0; s < 4; s++)
                (n[s][S] = N = (N << 24) ^ (N >>> 8)),
                  (e[s][z] = B = (B << 24) ^ (B >>> 8));
            }
            for (let S = 0; S < 5; S++)
              (n[S] = n[S].slice(0)), (e[S] = e[S].slice(0));
          }
          _crypt(n, e) {
            if (n.length !== 4) throw new Error('invalid aes block size');
            const t = this._key[e],
              r = t.length / 4 - 2,
              o = [0, 0, 0, 0],
              d = this._tables[e],
              u = d[0],
              _ = d[1],
              x = d[2],
              m = d[3],
              S = d[4];
            let z,
              B,
              N,
              s = n[0] ^ t[0],
              p = n[e ? 3 : 1] ^ t[1],
              i = n[2] ^ t[2],
              c = n[e ? 1 : 3] ^ t[3],
              h = 4;
            for (let w = 0; w < r; w++)
              (z =
                u[s >>> 24] ^
                _[(p >> 16) & 255] ^
                x[(i >> 8) & 255] ^
                m[255 & c] ^
                t[h]),
                (B =
                  u[p >>> 24] ^
                  _[(i >> 16) & 255] ^
                  x[(c >> 8) & 255] ^
                  m[255 & s] ^
                  t[h + 1]),
                (N =
                  u[i >>> 24] ^
                  _[(c >> 16) & 255] ^
                  x[(s >> 8) & 255] ^
                  m[255 & p] ^
                  t[h + 2]),
                (c =
                  u[c >>> 24] ^
                  _[(s >> 16) & 255] ^
                  x[(p >> 8) & 255] ^
                  m[255 & i] ^
                  t[h + 3]),
                (h += 4),
                (s = z),
                (p = B),
                (i = N);
            for (let w = 0; w < 4; w++)
              (o[e ? 3 & -w : w] =
                (S[s >>> 24] << 24) ^
                (S[(p >> 16) & 255] << 16) ^
                (S[(i >> 8) & 255] << 8) ^
                S[255 & c] ^
                t[h++]),
                (z = s),
                (s = p),
                (p = i),
                (i = c),
                (c = z);
            return o;
          }
        },
      },
      on = {
        ctrGladman: class {
          constructor(n, e) {
            (this._prf = n), (this._initIv = e), (this._iv = e);
          }
          reset() {
            this._iv = this._initIv;
          }
          update(n) {
            return this.calculate(this._prf, n, this._iv);
          }
          incWord(n) {
            if (((n >> 24) & 255) == 255) {
              let e = (n >> 16) & 255,
                t = (n >> 8) & 255,
                r = 255 & n;
              e === 255
                ? ((e = 0),
                  t === 255 ? ((t = 0), r === 255 ? (r = 0) : ++r) : ++t)
                : ++e,
                (n = 0),
                (n += e << 16),
                (n += t << 8),
                (n += r);
            } else n += 1 << 24;
            return n;
          }
          incCounter(n) {
            (n[0] = this.incWord(n[0])) === 0 && (n[1] = this.incWord(n[1]));
          }
          calculate(n, e, t) {
            let r;
            if (!(r = e.length)) return [];
            const o = nt.bitLength(e);
            for (let d = 0; d < r; d += 4) {
              this.incCounter(t);
              const u = n.encrypt(t);
              (e[d] ^= u[0]),
                (e[d + 1] ^= u[1]),
                (e[d + 2] ^= u[2]),
                (e[d + 3] ^= u[3]);
            }
            return nt.clamp(e, o);
          }
        },
      },
      cn = {
        hmacSha1: class {
          constructor(n) {
            const e = this,
              t = (e._hash = _e.sha1),
              r = [[], []],
              o = t.prototype.blockSize / 32;
            (e._baseHash = [new t(), new t()]), n.length > o && (n = t.hash(n));
            for (let d = 0; d < o; d++)
              (r[0][d] = 909522486 ^ n[d]), (r[1][d] = 1549556828 ^ n[d]);
            e._baseHash[0].update(r[0]),
              e._baseHash[1].update(r[1]),
              (e._resultHash = new t(e._baseHash[0]));
          }
          reset() {
            const n = this;
            (n._resultHash = new n._hash(n._baseHash[0])), (n._updated = !1);
          }
          update(n) {
            (this._updated = !0), this._resultHash.update(n);
          }
          digest() {
            const n = this,
              e = n._resultHash.finalize(),
              t = new n._hash(n._baseHash[1]).update(e).finalize();
            return n.reset(), t;
          }
        },
      },
      Dt = 'Invalid pasword',
      ft = 16,
      we = { name: 'PBKDF2' },
      ln = Object.assign({ hash: { name: 'HMAC' } }, we),
      dn = Object.assign({ iterations: 1e3, hash: { name: 'SHA-1' } }, we),
      un = ['deriveBits'],
      yt = [8, 12, 16],
      xt = [16, 24, 32],
      ct = 10,
      me = [0, 0, 0, 0],
      st = pe.bytes,
      ge = an.aes,
      be = on.ctrGladman,
      ye = cn.hmacSha1;
    class hn {
      constructor(e, t, r) {
        Object.assign(this, {
          password: e,
          signed: t,
          strength: r - 1,
          pendingInput: new Uint8Array(0),
        });
      }
      async append(e) {
        const t = this;
        if (t.password) {
          const r = rt(e, 0, yt[t.strength] + 2);
          await (async function (o, d, u) {
            await ke(o, u, rt(d, 0, yt[o.strength]));
            const _ = rt(d, yt[o.strength]),
              x = o.keys.passwordVerification;
            if (x[0] != _[0] || x[1] != _[1]) throw new Error(Dt);
          })(t, r, t.password),
            (t.password = null),
            (t.aesCtrGladman = new be(new ge(t.keys.key), Array.from(me))),
            (t.hmac = new ye(t.keys.authentication)),
            (e = rt(e, yt[t.strength] + 2));
        }
        return xe(
          t,
          e,
          new Uint8Array(e.length - ct - ((e.length - ct) % ft)),
          0,
          ct,
          !0
        );
      }
      flush() {
        const e = this,
          t = e.pendingInput,
          r = rt(t, 0, t.length - ct),
          o = rt(t, t.length - ct);
        let d = new Uint8Array(0);
        if (r.length) {
          const _ = st.toBits(r);
          e.hmac.update(_);
          const x = e.aesCtrGladman.update(_);
          d = st.fromBits(x);
        }
        let u = !0;
        if (e.signed) {
          const _ = rt(st.fromBits(e.hmac.digest()), 0, ct);
          for (let x = 0; x < ct; x++) _[x] != o[x] && (u = !1);
        }
        return { valid: u, data: d };
      }
    }
    class fn {
      constructor(e, t) {
        Object.assign(this, {
          password: e,
          strength: t - 1,
          pendingInput: new Uint8Array(0),
        });
      }
      async append(e) {
        const t = this;
        let r = new Uint8Array(0);
        t.password &&
          ((r = await (async function (d, u) {
            const _ = crypto.getRandomValues(new Uint8Array(yt[d.strength]));
            return await ke(d, u, _), Ot(_, d.keys.passwordVerification);
          })(t, t.password)),
          (t.password = null),
          (t.aesCtrGladman = new be(new ge(t.keys.key), Array.from(me))),
          (t.hmac = new ye(t.keys.authentication)));
        const o = new Uint8Array(r.length + e.length - (e.length % ft));
        return o.set(r, 0), xe(t, e, o, r.length, 0);
      }
      flush() {
        const e = this;
        let t = new Uint8Array(0);
        if (e.pendingInput.length) {
          const o = e.aesCtrGladman.update(st.toBits(e.pendingInput));
          e.hmac.update(o), (t = st.fromBits(o));
        }
        const r = rt(st.fromBits(e.hmac.digest()), 0, ct);
        return { data: Ot(t, r), signature: r };
      }
    }
    function xe(n, e, t, r, o, d) {
      const u = e.length - o;
      let _;
      for (
        n.pendingInput.length &&
          ((e = Ot(n.pendingInput, e)),
          (t = (function (x, m) {
            if (m && m > x.length) {
              const S = x;
              (x = new Uint8Array(m)).set(S, 0);
            }
            return x;
          })(t, u - (u % ft)))),
          _ = 0;
        _ <= u - ft;
        _ += ft
      ) {
        const x = st.toBits(rt(e, _, _ + ft));
        d && n.hmac.update(x);
        const m = n.aesCtrGladman.update(x);
        d || n.hmac.update(m), t.set(st.fromBits(m), _ + r);
      }
      return (n.pendingInput = rt(e, _)), t;
    }
    async function ke(n, e, t) {
      const r = (function (_) {
          if (typeof TextEncoder > 'u') {
            _ = unescape(encodeURIComponent(_));
            const x = new Uint8Array(_.length);
            for (let m = 0; m < x.length; m++) x[m] = _.charCodeAt(m);
            return x;
          }
          return new TextEncoder().encode(_);
        })(e),
        o = await crypto.subtle.importKey('raw', r, ln, !1, un),
        d = await crypto.subtle.deriveBits(
          Object.assign({ salt: t }, dn),
          o,
          8 * (2 * xt[n.strength] + 2)
        ),
        u = new Uint8Array(d);
      n.keys = {
        key: st.toBits(rt(u, 0, xt[n.strength])),
        authentication: st.toBits(rt(u, xt[n.strength], 2 * xt[n.strength])),
        passwordVerification: rt(u, 2 * xt[n.strength]),
      };
    }
    function Ot(n, e) {
      let t = n;
      return (
        n.length + e.length &&
          ((t = new Uint8Array(n.length + e.length)),
          t.set(n, 0),
          t.set(e, n.length)),
        t
      );
    }
    function rt(n, e, t) {
      return n.subarray(e, t);
    }
    const St = 12;
    class pn {
      constructor(e, t) {
        Object.assign(this, { password: e, passwordVerification: t }),
          Re(this, e);
      }
      append(e) {
        const t = this;
        if (t.password) {
          const r = ve(t, e.subarray(0, St));
          if (((t.password = null), r[11] != t.passwordVerification))
            throw new Error(Dt);
          e = e.subarray(St);
        }
        return ve(t, e);
      }
      flush() {
        return { valid: !0, data: new Uint8Array(0) };
      }
    }
    class _n {
      constructor(e, t) {
        Object.assign(this, { password: e, passwordVerification: t }),
          Re(this, e);
      }
      append(e) {
        const t = this;
        let r, o;
        if (t.password) {
          t.password = null;
          const d = crypto.getRandomValues(new Uint8Array(St));
          (d[11] = t.passwordVerification),
            (r = new Uint8Array(e.length + d.length)),
            r.set(Se(t, d), 0),
            (o = St);
        } else (r = new Uint8Array(e.length)), (o = 0);
        return r.set(Se(t, e), o), r;
      }
      flush() {
        return { data: new Uint8Array(0) };
      }
    }
    function ve(n, e) {
      const t = new Uint8Array(e.length);
      for (let r = 0; r < e.length; r++) (t[r] = Ae(n) ^ e[r]), Nt(n, t[r]);
      return t;
    }
    function Se(n, e) {
      const t = new Uint8Array(e.length);
      for (let r = 0; r < e.length; r++) (t[r] = Ae(n) ^ e[r]), Nt(n, e[r]);
      return t;
    }
    function Re(n, e) {
      (n.keys = [305419896, 591751049, 878082192]),
        (n.crcKey0 = new bt(n.keys[0])),
        (n.crcKey2 = new bt(n.keys[2]));
      for (let t = 0; t < e.length; t++) Nt(n, e.charCodeAt(t));
    }
    function Nt(n, e) {
      n.crcKey0.append([e]),
        (n.keys[0] = ~n.crcKey0.get()),
        (n.keys[1] = Ue(n.keys[1] + Te(n.keys[0]))),
        (n.keys[1] = Ue(Math.imul(n.keys[1], 134775813) + 1)),
        n.crcKey2.append([n.keys[1] >>> 24]),
        (n.keys[2] = ~n.crcKey2.get());
    }
    function Ae(n) {
      const e = 2 | n.keys[2];
      return Te(Math.imul(e, 1 ^ e) >>> 8);
    }
    function Te(n) {
      return 255 & n;
    }
    function Ue(n) {
      return 4294967295 & n;
    }
    const Ee = 'inflate',
      Wt = 'Invalid signature';
    class wn {
      constructor(
        e,
        {
          signature: t,
          password: r,
          signed: o,
          compressed: d,
          zipCrypto: u,
          passwordVerification: _,
          encryptionStrength: x,
        },
        { chunkSize: m }
      ) {
        const S = !!r;
        Object.assign(this, {
          signature: t,
          encrypted: S,
          signed: o,
          compressed: d,
          inflate: d && new e({ chunkSize: m }),
          crc32: o && new bt(),
          zipCrypto: u,
          decrypt: S && u ? new pn(r, _) : new hn(r, o, x),
        });
      }
      async append(e) {
        const t = this;
        return (
          t.encrypted && e.length && (e = await t.decrypt.append(e)),
          t.compressed && e.length && (e = await t.inflate.append(e)),
          (!t.encrypted || t.zipCrypto) &&
            t.signed &&
            e.length &&
            t.crc32.append(e),
          e
        );
      }
      async flush() {
        const e = this;
        let t,
          r = new Uint8Array(0);
        if (e.encrypted) {
          const o = e.decrypt.flush();
          if (!o.valid) throw new Error(Wt);
          r = o.data;
        }
        if ((!e.encrypted || e.zipCrypto) && e.signed) {
          const o = new DataView(new Uint8Array(4).buffer);
          if (
            ((t = e.crc32.get()),
            o.setUint32(0, t),
            e.signature != o.getUint32(0, !1))
          )
            throw new Error(Wt);
        }
        return (
          e.compressed &&
            ((r = (await e.inflate.append(r)) || new Uint8Array(0)),
            await e.inflate.flush()),
          { data: r, signature: t }
        );
      }
    }
    class mn {
      constructor(
        e,
        {
          encrypted: t,
          signed: r,
          compressed: o,
          level: d,
          zipCrypto: u,
          password: _,
          passwordVerification: x,
          encryptionStrength: m,
        },
        { chunkSize: S }
      ) {
        Object.assign(this, {
          encrypted: t,
          signed: r,
          compressed: o,
          deflate: o && new e({ level: d || 5, chunkSize: S }),
          crc32: r && new bt(),
          zipCrypto: u,
          encrypt: t && u ? new _n(_, x) : new fn(_, m),
        });
      }
      async append(e) {
        const t = this;
        let r = e;
        return (
          t.compressed && e.length && (r = await t.deflate.append(e)),
          t.encrypted && r.length && (r = await t.encrypt.append(r)),
          (!t.encrypted || t.zipCrypto) &&
            t.signed &&
            e.length &&
            t.crc32.append(e),
          r
        );
      }
      async flush() {
        const e = this;
        let t,
          r = new Uint8Array(0);
        if (
          (e.compressed && (r = (await e.deflate.flush()) || new Uint8Array(0)),
          e.encrypted)
        ) {
          r = await e.encrypt.append(r);
          const o = e.encrypt.flush();
          t = o.signature;
          const d = new Uint8Array(r.length + o.data.length);
          d.set(r, 0), d.set(o.data, r.length), (r = d);
        }
        return (
          (e.encrypted && !e.zipCrypto) || !e.signed || (t = e.crc32.get()),
          { data: r, signature: t }
        );
      }
    }
    const Ie = 'init',
      Ce = 'append',
      Pt = 'flush',
      gn = 'message';
    let ze = !0;
    var Bt = (n, e, t, r, o, d, u) => (
      Object.assign(n, {
        busy: !0,
        codecConstructor: e,
        options: Object.assign({}, t),
        scripts: u,
        terminate() {
          n.worker && !n.busy && (n.worker.terminate(), (n.interface = null));
        },
        onTaskFinished() {
          (n.busy = !1), o(n);
        },
      }),
      d
        ? (function (_, x) {
            let m;
            const S = { type: 'module' };
            if (!_.interface) {
              if (ze)
                try {
                  _.worker = z({}, x.baseURL);
                } catch {
                  (ze = !1), (_.worker = z(S, x.baseURL));
                }
              else _.worker = z(S, x.baseURL);
              _.worker.addEventListener(gn, s, !1),
                (_.interface = {
                  append: (p) => B({ type: Ce, data: p }),
                  flush: () => B({ type: Pt }),
                });
            }
            return _.interface;
            function z(p, i) {
              let c;
              try {
                c = new URL(_.scripts[0], i);
              } catch {
                c = _.scripts[0];
              }
              return new Worker(c, p);
            }
            async function B(p) {
              if (!m) {
                const i = _.options,
                  c = _.scripts.slice(1);
                await N({
                  scripts: c,
                  type: Ie,
                  options: i,
                  config: { chunkSize: x.chunkSize },
                });
              }
              return N(p);
            }
            function N(p) {
              const i = _.worker,
                c = new Promise((h, w) => (m = { resolve: h, reject: w }));
              try {
                if (p.data)
                  try {
                    (p.data = p.data.buffer), i.postMessage(p, [p.data]);
                  } catch {
                    i.postMessage(p);
                  }
                else i.postMessage(p);
              } catch (h) {
                m.reject(h), (m = null), _.onTaskFinished();
              }
              return c;
            }
            function s(p) {
              const i = p.data;
              if (m) {
                const c = i.error,
                  h = i.type;
                if (c) {
                  const w = new Error(c.message);
                  (w.stack = c.stack),
                    m.reject(w),
                    (m = null),
                    _.onTaskFinished();
                } else if (h == Ie || h == Pt || h == Ce) {
                  const w = i.data;
                  h == Pt
                    ? (m.resolve({
                        data: new Uint8Array(w),
                        signature: i.signature,
                      }),
                      (m = null),
                      _.onTaskFinished())
                    : m.resolve(w && new Uint8Array(w));
                }
              }
            }
          })(n, r)
        : (function (_, x) {
            const m = (function (S, z, B) {
              return z.codecType.startsWith('deflate')
                ? new mn(S, z, B)
                : z.codecType.startsWith(Ee)
                ? new wn(S, z, B)
                : void 0;
            })(_.codecConstructor, _.options, x);
            return {
              async append(S) {
                try {
                  return await m.append(S);
                } catch (z) {
                  throw (_.onTaskFinished(), z);
                }
              },
              async flush() {
                try {
                  return await m.flush();
                } finally {
                  _.onTaskFinished();
                }
              },
            };
          })(n, r)
    );
    let ht = [],
      Ht = [];
    function Fe(n) {
      n.terminateTimeout &&
        (clearTimeout(n.terminateTimeout), (n.terminateTimeout = null));
    }
    const bn =
      '\0☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~⌂ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ '.split(
        ''
      );
    async function jt(n, e) {
      if (e && e.trim().toLowerCase() == 'cp437')
        return ((t) => {
          let r = '';
          for (let o = 0; o < t.length; o++) r += bn[t[o]];
          return r;
        })(n);
      if (typeof TextDecoder > 'u') {
        const t = new FileReader();
        return new Promise((r, o) => {
          (t.onload = (d) => r(d.target.result)),
            (t.onerror = () => o(t.error)),
            t.readAsText(new Blob([n]));
        });
      }
      return new TextDecoder(e).decode(n);
    }
    const yn = [
      'filename',
      'rawFilename',
      'directory',
      'encrypted',
      'compressedSize',
      'uncompressedSize',
      'lastModDate',
      'rawLastModDate',
      'comment',
      'rawComment',
      'signature',
      'extraField',
      'rawExtraField',
      'bitFlag',
      'extraFieldZip64',
      'extraFieldUnicodePath',
      'extraFieldUnicodeComment',
      'extraFieldAES',
      'filenameUTF8',
      'commentUTF8',
      'offset',
      'zip64',
      'compressionMethod',
      'extraFieldNTFS',
      'lastAccessDate',
      'creationDate',
      'extraFieldExtendedTimestamp',
      'version',
      'versionMadeBy',
      'msDosCompatible',
      'internalFileAttribute',
      'externalFileAttribute',
    ];
    class Le {
      constructor(e) {
        yn.forEach((t) => (this[t] = e[t]));
      }
    }
    const Rt = 'File format is not recognized',
      Me = 'End of central directory not found',
      De = 'End of Zip64 central directory not found',
      Oe = 'End of Zip64 central directory locator not found',
      Ne = 'Central directory header not found',
      We = 'Local file header not found',
      Pe = 'Zip64 extra field not found',
      Be = 'File contains encrypted entry',
      He = 'Encryption method not supported',
      qt = 'Compression method not supported',
      je = 'utf-8',
      qe = 'cp437',
      Ve = ['uncompressedSize', 'compressedSize', 'offset'];
    class xn {
      constructor(e, t, r) {
        Object.assign(this, { reader: e, config: t, options: r });
      }
      async getData(e, t, r = {}) {
        const o = this,
          {
            reader: d,
            offset: u,
            extraFieldAES: _,
            compressionMethod: x,
            config: m,
            bitFlag: S,
            signature: z,
            rawLastModDate: B,
            compressedSize: N,
          } = o,
          s = (o.localDirectory = {});
        d.initialized || (await d.init());
        let p = await lt(d, u, 30);
        const i = tt(p);
        let c = pt(o, r, 'password');
        if (((c = c && c.length && c), _ && _.originalCompressionMethod != 99))
          throw new Error(qt);
        if (x != 0 && x != 8) throw new Error(qt);
        if (Q(i, 0) != 67324752) throw new Error(We);
        $e(s, i, 4),
          (p = await lt(d, u, 30 + s.filenameLength + s.extraFieldLength)),
          (s.rawExtraField = p.subarray(30 + s.filenameLength)),
          await Ge(o, s, i, 4),
          (t.lastAccessDate = s.lastAccessDate),
          (t.creationDate = s.creationDate);
        const h = o.encrypted && s.encrypted,
          w = h && !_;
        if (h) {
          if (!w && _.strength === void 0) throw new Error(He);
          if (!c) throw new Error(Be);
        }
        const R = await (function (f, k, F) {
          const I =
              !(!k.compressed && !k.signed && !k.encrypted) &&
              (k.useWebWorkers ||
                (k.useWebWorkers === void 0 && F.useWebWorkers)),
            T = I && F.workerScripts ? F.workerScripts[k.codecType] : [];
          if (ht.length < F.maxWorkers) {
            const L = {};
            return ht.push(L), Bt(L, f, k, F, A, I, T);
          }
          {
            const L = ht.find((W) => !W.busy);
            return L
              ? (Fe(L), Bt(L, f, k, F, A, I, T))
              : new Promise((W) =>
                  Ht.push({
                    resolve: W,
                    codecConstructor: f,
                    options: k,
                    webWorker: I,
                    scripts: T,
                  })
                );
          }
          function A(L) {
            if (Ht.length) {
              const [
                {
                  resolve: W,
                  codecConstructor: V,
                  options: O,
                  webWorker: q,
                  scripts: dt,
                },
              ] = Ht.splice(0, 1);
              W(Bt(L, V, O, F, A, q, dt));
            } else
              L.worker
                ? (Fe(L),
                  Number.isFinite(F.terminateWorkerTimeout) &&
                    F.terminateWorkerTimeout >= 0 &&
                    (L.terminateTimeout = setTimeout(() => {
                      (ht = ht.filter((W) => W != L)), L.terminate();
                    }, F.terminateWorkerTimeout)))
                : (ht = ht.filter((W) => W != L));
          }
        })(
          m.Inflate,
          {
            codecType: Ee,
            password: c,
            zipCrypto: w,
            encryptionStrength: _ && _.strength,
            signed: pt(o, r, 'checkSignature'),
            passwordVerification:
              w && (S.dataDescriptor ? (B >>> 8) & 255 : (z >>> 24) & 255),
            signature: z,
            compressed: x != 0,
            encrypted: h,
            useWebWorkers: pt(o, r, 'useWebWorkers'),
          },
          m
        );
        e.initialized || (await e.init());
        const v = pt(o, r, 'signal'),
          y = u + 30 + s.filenameLength + s.extraFieldLength;
        return (
          await (async function (f, k, F, I, T, A, L) {
            const W = Math.max(A.chunkSize, 64);
            return (async function V(O = 0, q = 0) {
              const dt = L.signal;
              if (O < T) {
                Et(dt, f);
                const ut = await k.readUint8Array(O + I, Math.min(W, T - O)),
                  H = ut.length;
                Et(dt, f);
                const wt = await f.append(ut);
                if ((Et(dt, f), (q += await Qt(F, wt)), L.onprogress))
                  try {
                    L.onprogress(O + H, T);
                  } catch {}
                return V(O + W, q);
              }
              {
                const ut = await f.flush();
                return (
                  (q += await Qt(F, ut.data)),
                  { signature: ut.signature, length: q }
                );
              }
            })();
          })(R, d, e, y, N, m, { onprogress: r.onprogress, signal: v }),
          e.getData()
        );
      }
    }
    function $e(n, e, t) {
      const r = (n.rawBitFlag = it(e, t + 2)),
        o = (1 & r) == 1,
        d = Q(e, t + 6);
      Object.assign(n, {
        encrypted: o,
        version: it(e, t),
        bitFlag: {
          level: (6 & r) >> 1,
          dataDescriptor: (8 & r) == 8,
          languageEncodingFlag: (2048 & r) == 2048,
        },
        rawLastModDate: d,
        lastModDate: kn(d),
        filenameLength: it(e, t + 22),
        extraFieldLength: it(e, t + 24),
      });
    }
    async function Ge(n, e, t, r) {
      const o = e.rawExtraField,
        d = (e.extraField = new Map()),
        u = tt(new Uint8Array(o));
      let _ = 0;
      try {
        for (; _ < o.length; ) {
          const p = it(u, _),
            i = it(u, _ + 2);
          d.set(p, { type: p, data: o.slice(_ + 4, _ + 4 + i) }), (_ += 4 + i);
        }
      } catch {}
      const x = it(t, r + 4);
      (e.signature = Q(t, r + 10)),
        (e.uncompressedSize = Q(t, r + 18)),
        (e.compressedSize = Q(t, r + 14));
      const m = d.get(1);
      m &&
        ((function (p, i) {
          i.zip64 = !0;
          const c = tt(p.data);
          p.values = [];
          for (let w = 0; w < Math.floor(p.data.length / 8); w++)
            p.values.push(At(c, 0 + 8 * w));
          const h = Ve.filter((w) => i[w] == vt);
          for (let w = 0; w < h.length; w++) p[h[w]] = p.values[w];
          Ve.forEach((w) => {
            if (i[w] == vt) {
              if (p[w] === void 0) throw new Error(Pe);
              i[w] = p[w];
            }
          });
        })(m, e),
        (e.extraFieldZip64 = m));
      const S = d.get(28789);
      S &&
        (await Ke(S, 'filename', 'rawFilename', e, n),
        (e.extraFieldUnicodePath = S));
      const z = d.get(25461);
      z &&
        (await Ke(z, 'comment', 'rawComment', e, n),
        (e.extraFieldUnicodeComment = z));
      const B = d.get(39169);
      B
        ? ((function (p, i, c) {
            const h = tt(p.data);
            (p.vendorVersion = _t(h, 0)), (p.vendorId = _t(h, 2));
            const w = _t(h, 4);
            (p.strength = w),
              (p.originalCompressionMethod = c),
              (i.compressionMethod = p.compressionMethod = it(h, 5));
          })(B, e, x),
          (e.extraFieldAES = B))
        : (e.compressionMethod = x);
      const N = d.get(10);
      N &&
        ((function (p, i) {
          const c = tt(p.data);
          let h,
            w = 4;
          try {
            for (; w < p.data.length && !h; ) {
              const R = it(c, w),
                v = it(c, w + 2);
              R == 1 && (h = p.data.slice(w + 4, w + 4 + v)), (w += 4 + v);
            }
          } catch {}
          try {
            if (h && h.length == 24) {
              const R = tt(h),
                v = R.getBigUint64(0, !0),
                y = R.getBigUint64(8, !0),
                f = R.getBigUint64(16, !0);
              Object.assign(p, {
                rawLastModDate: v,
                rawLastAccessDate: y,
                rawCreationDate: f,
              });
              const k = Vt(v),
                F = Vt(y),
                I = { lastModDate: k, lastAccessDate: F, creationDate: Vt(f) };
              Object.assign(p, I), Object.assign(i, I);
            }
          } catch {}
        })(N, e),
        (e.extraFieldNTFS = N));
      const s = d.get(21589);
      s &&
        ((function (p, i) {
          const c = tt(p.data),
            h = _t(c, 0),
            w = [],
            R = [];
          (1 & h) == 1 && (w.push('lastModDate'), R.push('rawLastModDate')),
            (2 & h) == 2 &&
              (w.push('lastAccessDate'), R.push('rawLastAccessDate')),
            (4 & h) == 4 && (w.push('creationDate'), R.push('rawCreationDate'));
          let v = 1;
          w.forEach((y, f) => {
            if (p.data.length >= v + 4) {
              const k = Q(c, v);
              i[y] = p[y] = new Date(1e3 * k);
              const F = R[f];
              p[F] = k;
            }
            v += 4;
          });
        })(s, e),
        (e.extraFieldExtendedTimestamp = s));
    }
    async function Ke(n, e, t, r, o) {
      const d = tt(n.data);
      (n.version = _t(d, 0)), (n.signature = Q(d, 1));
      const u = new bt();
      u.append(o[t]);
      const _ = tt(new Uint8Array(4));
      _.setUint32(0, u.get(), !0),
        (n[e] = await jt(n.data.subarray(5))),
        (n.valid = !o.bitFlag.languageEncodingFlag && n.signature == Q(_, 0)),
        n.valid && ((r[e] = n[e]), (r[e + 'UTF8'] = !0));
    }
    function pt(n, e, t) {
      return e[t] === void 0 ? n.options[t] : e[t];
    }
    function kn(n) {
      const e = (4294901760 & n) >> 16,
        t = 65535 & n;
      try {
        return new Date(
          1980 + ((65024 & e) >> 9),
          ((480 & e) >> 5) - 1,
          31 & e,
          (63488 & t) >> 11,
          (2016 & t) >> 5,
          2 * (31 & t),
          0
        );
      } catch {}
    }
    function Vt(n) {
      return new Date(Number(n / BigInt(1e4) - BigInt(116444736e5)));
    }
    function _t(n, e) {
      return n.getUint8(e);
    }
    function it(n, e) {
      return n.getUint16(e, !0);
    }
    function Q(n, e) {
      return n.getUint32(e, !0);
    }
    function At(n, e) {
      return Number(n.getBigUint64(e, !0));
    }
    function tt(n) {
      return new DataView(n.buffer);
    }
    function lt(n, e, t) {
      return n.readUint8Array(e, t);
    }
    Jt({
      Inflate: function (n) {
        const e = new Yt(),
          t = n && n.chunkSize ? Math.floor(2 * n.chunkSize) : 131072,
          r = new Uint8Array(t);
        let o = !1;
        e.inflateInit(),
          (e.next_out = r),
          (this.append = function (d, u) {
            const _ = [];
            let x,
              m,
              S = 0,
              z = 0,
              B = 0;
            if (d.length !== 0) {
              (e.next_in_index = 0), (e.next_in = d), (e.avail_in = d.length);
              do {
                if (
                  ((e.next_out_index = 0),
                  (e.avail_out = t),
                  e.avail_in !== 0 || o || ((e.next_in_index = 0), (o = !0)),
                  (x = e.inflate(0)),
                  o && x === -5)
                ) {
                  if (e.avail_in !== 0) throw new Error('inflating: bad input');
                } else if (x !== 0 && x !== 1)
                  throw new Error('inflating: ' + e.msg);
                if ((o || x === 1) && e.avail_in === d.length)
                  throw new Error('inflating: bad input');
                e.next_out_index &&
                  (e.next_out_index === t
                    ? _.push(new Uint8Array(r))
                    : _.push(r.slice(0, e.next_out_index))),
                  (B += e.next_out_index),
                  u &&
                    e.next_in_index > 0 &&
                    e.next_in_index != S &&
                    (u(e.next_in_index), (S = e.next_in_index));
              } while (e.avail_in > 0 || e.avail_out === 0);
              return (
                _.length > 1
                  ? ((m = new Uint8Array(B)),
                    _.forEach(function (N) {
                      m.set(N, z), (z += N.length);
                    }))
                  : (m = _[0] || new Uint8Array(0)),
                m
              );
            }
          }),
          (this.flush = function () {
            e.inflateEnd();
          });
      },
    }),
      (l.BlobReader = ne),
      (l.BlobWriter = class extends gt {
        constructor(n) {
          super(), (this.contentType = n), (this.arrayBuffers = []);
        }
        async writeUint8Array(n) {
          super.writeUint8Array(n), this.arrayBuffers.push(n.buffer);
        }
        getData() {
          return (
            this.blob ||
              (this.blob = new Blob(this.arrayBuffers, {
                type: this.contentType,
              })),
            this.blob
          );
        }
      }),
      (l.Data64URIReader = class extends ot {
        constructor(n) {
          super(), (this.dataURI = n);
          let e = n.length;
          for (; n.charAt(e - 1) == '='; ) e--;
          (this.dataStart = n.indexOf(',') + 1),
            (this.size = Math.floor(0.75 * (e - this.dataStart)));
        }
        async readUint8Array(n, e) {
          const t = new Uint8Array(e),
            r = 4 * Math.floor(n / 3),
            o = atob(
              this.dataURI.substring(
                r + this.dataStart,
                4 * Math.ceil((n + e) / 3) + this.dataStart
              )
            ),
            d = n - 3 * Math.floor(r / 4);
          for (let u = d; u < d + e; u++) t[u - d] = o.charCodeAt(u);
          return t;
        }
      }),
      (l.Data64URIWriter = class extends gt {
        constructor(n) {
          super(),
            (this.data = 'data:' + (n || '') + ';base64,'),
            (this.pending = []);
        }
        async writeUint8Array(n) {
          super.writeUint8Array(n);
          let e = 0,
            t = this.pending;
          const r = this.pending.length;
          for (
            this.pending = '', e = 0;
            e < 3 * Math.floor((r + n.length) / 3) - r;
            e++
          )
            t += String.fromCharCode(n[e]);
          for (; e < n.length; e++) this.pending += String.fromCharCode(n[e]);
          t.length > 2 ? (this.data += btoa(t)) : (this.pending = t);
        }
        getData() {
          return this.data + btoa(this.pending);
        }
      }),
      (l.ERR_ABORT = Xt),
      (l.ERR_BAD_FORMAT = Rt),
      (l.ERR_CENTRAL_DIRECTORY_NOT_FOUND = Ne),
      (l.ERR_ENCRYPTED = Be),
      (l.ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND = Oe),
      (l.ERR_EOCDR_NOT_FOUND = Me),
      (l.ERR_EOCDR_ZIP64_NOT_FOUND = De),
      (l.ERR_EXTRAFIELD_ZIP64_NOT_FOUND = Pe),
      (l.ERR_HTTP_RANGE = It),
      (l.ERR_INVALID_PASSWORD = Dt),
      (l.ERR_INVALID_SIGNATURE = Wt),
      (l.ERR_LOCAL_FILE_HEADER_NOT_FOUND = We),
      (l.ERR_UNSUPPORTED_COMPRESSION = qt),
      (l.ERR_UNSUPPORTED_ENCRYPTION = He),
      (l.HttpRangeReader = class extends de {
        constructor(n, e = {}) {
          (e.useRangeHeader = !0), super(n, e);
        }
      }),
      (l.HttpReader = de),
      (l.Reader = ot),
      (l.TextReader = class extends ot {
        constructor(n) {
          super(), (this.blobReader = new ne(new Blob([n], { type: Ct })));
        }
        async init() {
          super.init(),
            this.blobReader.init(),
            (this.size = this.blobReader.size);
        }
        async readUint8Array(n, e) {
          return this.blobReader.readUint8Array(n, e);
        }
      }),
      (l.TextWriter = class extends gt {
        constructor(n) {
          super(),
            (this.encoding = n),
            (this.blob = new Blob([], { type: Ct }));
        }
        async writeUint8Array(n) {
          super.writeUint8Array(n),
            (this.blob = new Blob([this.blob, n.buffer], { type: Ct }));
        }
        getData() {
          if (this.blob.text) return this.blob.text();
          {
            const n = new FileReader();
            return new Promise((e, t) => {
              (n.onload = (r) => e(r.target.result)),
                (n.onerror = () => t(n.error)),
                n.readAsText(this.blob, this.encoding);
            });
          }
        }
      }),
      (l.Uint8ArrayReader = class extends ot {
        constructor(n) {
          super(), (this.array = n), (this.size = n.length);
        }
        async readUint8Array(n, e) {
          return this.array.slice(n, n + e);
        }
      }),
      (l.Uint8ArrayWriter = class extends gt {
        constructor() {
          super(), (this.array = new Uint8Array(0));
        }
        async writeUint8Array(n) {
          super.writeUint8Array(n);
          const e = this.array;
          (this.array = new Uint8Array(e.length + n.length)),
            this.array.set(e),
            this.array.set(n, e.length);
        }
        getData() {
          return this.array;
        }
      }),
      (l.Writer = gt),
      (l.ZipReader = class {
        constructor(n, e = {}) {
          Object.assign(this, { reader: n, options: e, config: et });
        }
        async getEntries(n = {}) {
          const e = this,
            t = e.reader;
          if ((t.initialized || (await t.init()), t.size < 22))
            throw new Error(Rt);
          const r = await (async function (N, s, p, i, c) {
            const h = new Uint8Array(4);
            (function (v, y, f) {
              v.setUint32(y, f, !0);
            })(tt(h), 0, s);
            const w = i + c;
            return (await R(i)) || (await R(Math.min(w, p)));
            async function R(v) {
              const y = p - v,
                f = await lt(N, y, v);
              for (let k = f.length - i; k >= 0; k--)
                if (
                  f[k] == h[0] &&
                  f[k + 1] == h[1] &&
                  f[k + 2] == h[2] &&
                  f[k + 3] == h[3]
                )
                  return { offset: y + k, buffer: f.slice(k, k + i).buffer };
            }
          })(t, 101010256, t.size, 22, 1048560);
          if (!r) throw new Error(Me);
          const o = tt(r);
          let d = Q(o, 12),
            u = Q(o, 16),
            _ = it(o, 8),
            x = 0;
          if (u == vt || d == vt || _ == 65535) {
            const N = tt(await lt(t, r.offset - 20, 20));
            if (Q(N, 0) != 117853008) throw new Error(De);
            u = At(N, 8);
            let s = await lt(t, u, 56),
              p = tt(s);
            const i = r.offset - 20 - 56;
            if (Q(p, 0) != he && u != i) {
              const c = u;
              (u = i), (x = u - c), (s = await lt(t, u, 56)), (p = tt(s));
            }
            if (Q(p, 0) != he) throw new Error(Oe);
            (_ = At(p, 32)), (d = At(p, 40)), (u -= d);
          }
          if (u < 0 || u >= t.size) throw new Error(Rt);
          let m = 0,
            S = await lt(t, u, d),
            z = tt(S);
          if (d) {
            const N = r.offset - d;
            if (Q(z, m) != ue && u != N) {
              const s = u;
              (u = N), (x = u - s), (S = await lt(t, u, d)), (z = tt(S));
            }
          }
          if (u < 0 || u >= t.size) throw new Error(Rt);
          const B = [];
          for (let N = 0; N < _; N++) {
            const s = new xn(t, e.config, e.options);
            if (Q(z, m) != ue) throw new Error(Ne);
            $e(s, z, m + 6);
            const p = !!s.bitFlag.languageEncodingFlag,
              i = m + 46,
              c = i + s.filenameLength,
              h = c + s.extraFieldLength,
              w = it(z, m + 4),
              R = (0 & w) == 0;
            Object.assign(s, {
              versionMadeBy: w,
              msDosCompatible: R,
              compressedSize: 0,
              uncompressedSize: 0,
              commentLength: it(z, m + 32),
              directory: R && (16 & _t(z, m + 38)) == 16,
              offset: Q(z, m + 42) + x,
              internalFileAttribute: Q(z, m + 34),
              externalFileAttribute: Q(z, m + 38),
              rawFilename: S.subarray(i, c),
              filenameUTF8: p,
              commentUTF8: p,
              rawExtraField: S.subarray(c, h),
            });
            const v = h + s.commentLength;
            s.rawComment = S.subarray(h, v);
            const y = pt(e, n, 'filenameEncoding'),
              f = pt(e, n, 'commentEncoding'),
              [k, F] = await Promise.all([
                jt(s.rawFilename, s.filenameUTF8 ? je : y || qe),
                jt(s.rawComment, s.commentUTF8 ? je : f || qe),
              ]);
            (s.filename = k),
              (s.comment = F),
              !s.directory && s.filename.endsWith('/') && (s.directory = !0),
              await Ge(s, s, z, m + 6);
            const I = new Le(s);
            if (
              ((I.getData = (T, A) => s.getData(T, I, A)),
              B.push(I),
              (m = v),
              n.onprogress)
            )
              try {
                n.onprogress(N + 1, _, new Le(s));
              } catch {}
          }
          return B;
        }
        async close() {}
      }),
      (l.configure = Jt),
      (l.getMimeType = function () {
        return 'application/octet-stream';
      }),
      Object.defineProperty(l, '__esModule', { value: !0 });
  });
})(Kt, Kt.exports);
var jn = Kt.exports;
const qn = Hn(jn),
  Tt = qn;
class Vn {
  constructor(a, l) {
    Y(this, '_zipReader');
    Y(this, '_entriesPromise');
    Y(this, '_traceURL');
    (this._traceURL = a),
      (this._zipReader = new Tt.ZipReader(
        new Tt.HttpReader(Gn(a), { mode: 'cors', preventHeadRequest: !0 }),
        { useWebWorkers: !1 }
      )),
      (this._entriesPromise = this._zipReader
        .getEntries({ onprogress: l })
        .then((g) => {
          const b = new Map();
          for (const C of g) b.set(C.filename, C);
          return b;
        }));
  }
  isLive() {
    return !1;
  }
  traceURL() {
    return this._traceURL;
  }
  async entryNames() {
    return [...(await this._entriesPromise).keys()];
  }
  async hasEntry(a) {
    return (await this._entriesPromise).has(a);
  }
  async readText(a) {
    var C;
    const g = (await this._entriesPromise).get(a);
    if (!g) return;
    const b = new Tt.TextWriter();
    return await ((C = g.getData) == null ? void 0 : C.call(g, b)), b.getData();
  }
  async readBlob(a) {
    const g = (await this._entriesPromise).get(a);
    if (!g) return;
    const b = new Tt.BlobWriter();
    return await g.getData(b), b.getData();
  }
}
class $n {
  constructor(a) {
    Y(this, '_entriesPromise');
    Y(this, '_traceURL');
    (this._traceURL = a),
      (this._entriesPromise = fetch('/trace/file?path=' + encodeURI(a)).then(
        async (l) => {
          const g = JSON.parse(await l.text()),
            b = new Map();
          for (const C of g.entries) b.set(C.name, C.path);
          return b;
        }
      ));
  }
  isLive() {
    return !0;
  }
  traceURL() {
    return this._traceURL;
  }
  async entryNames() {
    return [...(await this._entriesPromise).keys()];
  }
  async hasEntry(a) {
    return (await this._entriesPromise).has(a);
  }
  async readText(a) {
    const l = await this._readEntry(a);
    return l == null ? void 0 : l.text();
  }
  async readBlob(a) {
    const l = await this._readEntry(a);
    return l == null ? void 0 : l.blob();
  }
  async _readEntry(a) {
    const g = (await this._entriesPromise).get(a);
    if (g) return fetch('/trace/file?path=' + encodeURI(g));
  }
}
function Gn(U) {
  let a = U.startsWith('http') || U.startsWith('blob') ? U : `file?path=${U}`;
  return (
    a.startsWith('https://www.dropbox.com/') &&
      (a = 'https://dl.dropboxusercontent.com/' + a.substring(24)),
    a
  );
}
self.addEventListener('install', function (U) {
  self.skipWaiting();
});
self.addEventListener('activate', function (U) {
  U.waitUntil(self.clients.claim());
});
const Kn = new URL(self.registration.scope).pathname,
  mt = new Map(),
  Ut = new Rn();
async function Zn(U, a, l, g) {
  var j;
  Ut.set(l, U);
  const b = new Pn();
  try {
    const [M, E] = An(g, [0.5, 0.4, 0.1]),
      P = U.endsWith('json') ? new $n(U) : new Vn(U, M);
    await b.load(P, E);
  } catch (M) {
    throw (j = M == null ? void 0 : M.message) != null &&
      j.includes('Cannot find .trace file') &&
      (await b.hasEntry('index.html'))
      ? new Error(
          'Could not load trace. Did you upload a Playwright HTML report instead? Make sure to extract the archive first and then double-click the index.html file or put it on a web server.'
        )
      : a
      ? new Error(
          `Could not load trace from ${a}. Make sure to upload a valid Playwright trace.`
        )
      : new Error(
          `Could not load trace from ${U}. Make sure a valid Playwright Trace is accessible over this url.`
        );
  }
  const C = new Mn(b.storage(), (M) => b.resourceForSha1(M));
  return mt.set(U, { traceModel: b, snapshotServer: C }), b;
}
async function Yn(U) {
  const a = U.request,
    l = await self.clients.get(U.clientId),
    g = self.registration.scope.startsWith('https://');
  if (a.url.startsWith(self.registration.scope)) {
    const E = new URL(Gt(a.url)),
      P = E.pathname.substring(Kn.length - 1);
    if (P === '/ping') return await Jn(), new Response(null, { status: 200 });
    const D = E.searchParams.get('trace'),
      { snapshotServer: K } = mt.get(D) || {};
    if (P === '/contexts')
      try {
        const Z = await Zn(
          D,
          E.searchParams.get('traceFileName'),
          U.clientId,
          ($, X) => {
            l.postMessage({
              method: 'progress',
              params: { done: $, total: X },
            });
          }
        );
        return new Response(JSON.stringify(Z.contextEntries), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (Z) {
        return new Response(
          JSON.stringify({ error: Z == null ? void 0 : Z.message }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
    if (P.startsWith('/snapshotInfo/'))
      return K
        ? K.serveSnapshotInfo(P, E.searchParams)
        : new Response(null, { status: 404 });
    if (P.startsWith('/snapshot/')) {
      if (!K) return new Response(null, { status: 404 });
      const Z = K.serveSnapshot(P, E.searchParams, E.href);
      return (
        g &&
          Z.headers.set('Content-Security-Policy', 'upgrade-insecure-requests'),
        Z
      );
    }
    if (P.startsWith('/sha1/')) {
      const Z = Ut.get(U.clientId);
      for (const [$, { traceModel: X }] of mt) {
        if (D !== $ && !Z.includes($)) continue;
        const kt = await X.resourceForSha1(P.slice(6));
        if (kt) return new Response(kt, { status: 200 });
      }
      return new Response(null, { status: 404 });
    }
    return fetch(U.request);
  }
  const b = Gt(l.url),
    C = new URL(b).searchParams.get('trace'),
    { snapshotServer: j } = mt.get(C) || {};
  if (!j) return new Response(null, { status: 404 });
  const M = [a.url];
  return (
    g &&
      a.url.startsWith('https://') &&
      M.push(a.url.replace(/^https/, 'http')),
    j.serveResource(M, b)
  );
}
async function Jn() {
  const U = await self.clients.matchAll(),
    a = new Set();
  for (const [l, g] of Ut)
    U.find((b) => b.id === l) ? g.forEach((b) => a.add(b)) : Ut.deleteAll(l);
  for (const l of mt.keys()) a.has(l) || mt.delete(l);
}
self.addEventListener('fetch', function (U) {
  U.respondWith(Yn(U));
});
