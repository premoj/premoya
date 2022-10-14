globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'http';
import { Server } from 'https';
import destr from 'destr';
import { defineEventHandler, handleCacheHeaders, createEvent, eventHandler, createError, createApp, createRouter, lazyEventHandler } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ohmyfetch';
import { createRouter as createRouter$1 } from 'radix3';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import { hash } from 'ohash';
import { parseURL, withQuery, withLeadingSlash, withoutTrailingSlash, joinURL } from 'ufo';
import { createStorage } from 'unstorage';
import { promises } from 'fs';
import { dirname, resolve } from 'pathe';
import { fileURLToPath } from 'url';

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"routes":{},"envPrefix":"NUXT_"},"public":{}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const getEnv = (key) => {
  const envKey = snakeCase(key).toUpperCase();
  return destr(process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]);
};
function isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject(obj[key])) {
      if (isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
overrideConfig(_runtimeConfig);
const config = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => config;
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const globalTiming = globalThis.__timing__ || {
  start: () => 0,
  end: () => 0,
  metrics: []
};
function timingMiddleware(_req, res, next) {
  const start = globalTiming.start();
  const _end = res.end;
  res.end = (data, encoding, callback) => {
    const metrics = [["Generate", globalTiming.end(start)], ...globalTiming.metrics];
    const serverTiming = metrics.map((m) => `-;dur=${m[1]};desc="${encodeURIComponent(m[0])}"`).join(", ");
    if (!res.headersSent) {
      res.setHeader("Server-Timing", serverTiming);
    }
    _end.call(res, data, encoding, callback);
  };
  next();
}

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

const useStorage = () => storage;

storage.mount('/assets', assets$1);

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  async function get(key, resolver) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl;
    const _resolve = async () => {
      if (!pending[key]) {
        entry.value = void 0;
        entry.integrity = void 0;
        entry.mtime = void 0;
        entry.expires = void 0;
        pending[key] = Promise.resolve(resolver());
      }
      entry.value = await pending[key];
      entry.mtime = Date.now();
      entry.integrity = integrity;
      delete pending[key];
      useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return Promise.resolve(entry);
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const key = (opts.getKey || getKey)(...args);
    const entry = await get(key, () => fn(...args));
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length ? hash(args, {}) : "";
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: (event) => {
      const url = event.req.originalUrl || event.req.url;
      const friendlyName = decodeURI(parseURL(url).pathname).replace(/[^a-zA-Z0-9]/g, "").substring(0, 16);
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    group: opts.group || "nitro/handlers",
    integrity: [
      opts.integrity,
      handler
    ]
  };
  const _cachedHandler = cachedFunction(async (incomingEvent) => {
    const reqProxy = cloneWithProxy(incomingEvent.req, { headers: {} });
    const resHeaders = {};
    const resProxy = cloneWithProxy(incomingEvent.res, {
      statusCode: 200,
      getHeader(name) {
        return resHeaders[name];
      },
      setHeader(name, value) {
        resHeaders[name] = value;
        return this;
      },
      getHeaderNames() {
        return Object.keys(resHeaders);
      },
      hasHeader(name) {
        return name in resHeaders;
      },
      removeHeader(name) {
        delete resHeaders[name];
      },
      getHeaders() {
        return resHeaders;
      }
    });
    const event = createEvent(reqProxy, resProxy);
    event.context = incomingEvent.context;
    const body = await handler(event);
    const headers = event.res.getHeaders();
    headers.Etag = `W/"${hash(body)}"`;
    headers["Last-Modified"] = new Date().toUTCString();
    const cacheControl = [];
    if (opts.swr) {
      if (opts.maxAge) {
        cacheControl.push(`s-maxage=${opts.maxAge}`);
      }
      if (opts.staleMaxAge) {
        cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
      } else {
        cacheControl.push("stale-while-revalidate");
      }
    } else if (opts.maxAge) {
      cacheControl.push(`max-age=${opts.maxAge}`);
    }
    if (cacheControl.length) {
      headers["Cache-Control"] = cacheControl.join(", ");
    }
    const cacheEntry = {
      code: event.res.statusCode,
      headers,
      body
    };
    return cacheEntry;
  }, _opts);
  return defineEventHandler(async (event) => {
    const response = await _cachedHandler(event);
    if (event.res.headersSent || event.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["Last-Modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.res.statusCode = response.code;
    for (const name in response.headers) {
      event.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const script = "const w=window,de=document.documentElement,knownColorSchemes=[\"dark\",\"light\"],preference=window.localStorage.getItem(\"nuxt-color-mode\")||\"system\";let value=preference===\"system\"?getColorScheme():preference;const forcedColorMode=de.getAttribute(\"data-color-mode-forced\");forcedColorMode&&(value=forcedColorMode),addColorScheme(value),w[\"__NUXT_COLOR_MODE__\"]={preference,value,getColorScheme,addColorScheme,removeColorScheme};function addColorScheme(e){const o=\"\"+e+\"-mode\",t=\"\";de.classList?de.classList.add(o):de.className+=\" \"+o,t&&de.setAttribute(\"data-\"+t,e)}function removeColorScheme(e){const o=\"\"+e+\"-mode\",t=\"\";de.classList?de.classList.remove(o):de.className=de.className.replace(new RegExp(o,\"g\"),\"\"),t&&de.removeAttribute(\"data-\"+t)}function prefersColorScheme(e){return w.matchMedia(\"(prefers-color-scheme\"+e+\")\")}function getColorScheme(){if(w.matchMedia&&prefersColorScheme(\"\").media!==\"not all\"){for(const e of knownColorSchemes)if(prefersColorScheme(\":\"+e).matches)return e}return\"light\"}\n";

const _b7SIeo1XtG = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const plugins = [
  _b7SIeo1XtG
];

function hasReqHeader(req, header, includes) {
  const value = req.headers[header];
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event.req, "accept", "application/json") || hasReqHeader(event.req, "user-agent", "curl/") || hasReqHeader(event.req, "user-agent", "httpie/") || event.req.url?.endsWith(".json") || event.req.url?.includes("/api/");
}
function normalizeError(error) {
  const cwd = process.cwd();
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Route Not Found" : "Internal Server Error");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.req.url,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  event.res.statusCode = errorObject.statusCode;
  event.res.statusMessage = errorObject.statusMessage;
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    event.res.setHeader("Content-Type", "application/json");
    event.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.req.url?.startsWith("/__nuxt_error");
  let html = !isErrorPage ? await $fetch(withQuery("/__nuxt_error", errorObject)).catch(() => null) : null;
  if (!html) {
    const { template } = await import('../error-500.mjs');
    html = template(errorObject);
  }
  event.res.setHeader("Content-Type", "text/html;charset=UTF-8");
  event.res.end(html);
});

const assets = {
  "/200.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"7b5-GYO3lA/pXCOjwTstcSwFjz7/TJE\"",
    "mtime": "2022-10-14T02:07:02.807Z",
    "size": 1973,
    "path": "../public/200.html"
  },
  "/404.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"7b5-GYO3lA/pXCOjwTstcSwFjz7/TJE\"",
    "mtime": "2022-10-14T02:07:02.808Z",
    "size": 1973,
    "path": "../public/404.html"
  },
  "/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"7b5-GYO3lA/pXCOjwTstcSwFjz7/TJE\"",
    "mtime": "2022-10-14T02:07:02.806Z",
    "size": 1973,
    "path": "../public/index.html"
  },
  "/_nuxt/1.b517c59a.jpg": {
    "type": "image/jpeg",
    "etag": "\"b4e11-hZ16HOpR97S7DJF3GF5WcJKUjHo\"",
    "mtime": "2022-10-14T02:07:02.537Z",
    "size": 740881,
    "path": "../public/_nuxt/1.b517c59a.jpg"
  },
  "/_nuxt/2.14a990b6.jpg": {
    "type": "image/jpeg",
    "etag": "\"100232-rWrnvgwjRQdkaLHYqWRwYtrZ6hA\"",
    "mtime": "2022-10-14T02:07:02.536Z",
    "size": 1049138,
    "path": "../public/_nuxt/2.14a990b6.jpg"
  },
  "/_nuxt/3.286bd6ef.jpg": {
    "type": "image/jpeg",
    "etag": "\"9e018-ckXlWznKsBlrMmNMwWtG7kleqWU\"",
    "mtime": "2022-10-14T02:07:02.534Z",
    "size": 647192,
    "path": "../public/_nuxt/3.286bd6ef.jpg"
  },
  "/_nuxt/4.195b4850.jpg": {
    "type": "image/jpeg",
    "etag": "\"c6fd4-cJw88SaQZB/BuZl+zJN7imv4YJM\"",
    "mtime": "2022-10-14T02:07:02.533Z",
    "size": 815060,
    "path": "../public/_nuxt/4.195b4850.jpg"
  },
  "/_nuxt/5.d75df8c9.jpg": {
    "type": "image/jpeg",
    "etag": "\"d7c3a-d6FXQoltIsjEz8O+fxzcH51VEvU\"",
    "mtime": "2022-10-14T02:07:02.532Z",
    "size": 883770,
    "path": "../public/_nuxt/5.d75df8c9.jpg"
  },
  "/_nuxt/6.bc92c0e5.jpg": {
    "type": "image/jpeg",
    "etag": "\"eb600-ArPqKmUJSpW6cHihLiIZGNMyMoI\"",
    "mtime": "2022-10-14T02:07:02.531Z",
    "size": 964096,
    "path": "../public/_nuxt/6.bc92c0e5.jpg"
  },
  "/_nuxt/7.5b81e214.jpg": {
    "type": "image/jpeg",
    "etag": "\"efc5c-x9qItOr4uNWaxFUFH4wH0VY5sSo\"",
    "mtime": "2022-10-14T02:07:02.530Z",
    "size": 982108,
    "path": "../public/_nuxt/7.5b81e214.jpg"
  },
  "/_nuxt/OpenSans.e3a5bdca.ttf": {
    "type": "font/ttf",
    "etag": "\"81250-jAProERZQVJh5EHiVUQdb1wf8do\"",
    "mtime": "2022-10-14T02:07:02.528Z",
    "size": 528976,
    "path": "../public/_nuxt/OpenSans.e3a5bdca.ttf"
  },
  "/_nuxt/auth.1f2cb8e1.js": {
    "type": "application/javascript",
    "etag": "\"1129-9Y3bdiy57QAj6+VyHuRUclYr1Vc\"",
    "mtime": "2022-10-14T02:07:02.527Z",
    "size": 4393,
    "path": "../public/_nuxt/auth.1f2cb8e1.js"
  },
  "/_nuxt/cz.d601fcc2.svg": {
    "type": "image/svg+xml",
    "etag": "\"e1-SwE19q7uo/XTz3WjiJKPLabUDf0\"",
    "mtime": "2022-10-14T02:07:02.527Z",
    "size": 225,
    "path": "../public/_nuxt/cz.d601fcc2.svg"
  },
  "/_nuxt/entry.8dc18463.js": {
    "type": "application/javascript",
    "etag": "\"1ccf6b-anrIBlNSUisislZTgSvj/SHy78A\"",
    "mtime": "2022-10-14T02:07:02.524Z",
    "size": 1888107,
    "path": "../public/_nuxt/entry.8dc18463.js"
  },
  "/_nuxt/entry.e94e4716.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"143f5-imoIEM0HSlFFtSAc1Ip4nUW5FyQ\"",
    "mtime": "2022-10-14T02:07:02.521Z",
    "size": 82933,
    "path": "../public/_nuxt/entry.e94e4716.css"
  },
  "/_nuxt/error-component.eb0c4ac5.js": {
    "type": "application/javascript",
    "etag": "\"46c-WqwcBjw1SXwXsZ17I+Thgxv4hFQ\"",
    "mtime": "2022-10-14T02:07:02.521Z",
    "size": 1132,
    "path": "../public/_nuxt/error-component.eb0c4ac5.js"
  },
  "/_nuxt/index.0ab9296d.js": {
    "type": "application/javascript",
    "etag": "\"29a-tz4MYcwTgVvO5zqYCIAp9BvQ5bc\"",
    "mtime": "2022-10-14T02:07:02.521Z",
    "size": 666,
    "path": "../public/_nuxt/index.0ab9296d.js"
  },
  "/_nuxt/index.16848390.js": {
    "type": "application/javascript",
    "etag": "\"1df-8hNn8Q+9239wgTNTDtY/a2urc50\"",
    "mtime": "2022-10-14T02:07:02.520Z",
    "size": 479,
    "path": "../public/_nuxt/index.16848390.js"
  },
  "/_nuxt/index.43932f8d.js": {
    "type": "application/javascript",
    "etag": "\"f14-DYPc2E3Py01dWTa57IiyIjzPcM0\"",
    "mtime": "2022-10-14T02:07:02.520Z",
    "size": 3860,
    "path": "../public/_nuxt/index.43932f8d.js"
  },
  "/_nuxt/index.60837484.js": {
    "type": "application/javascript",
    "etag": "\"c45-Q1pLFCPzpjoI+E93odTlPn4S1GI\"",
    "mtime": "2022-10-14T02:07:02.520Z",
    "size": 3141,
    "path": "../public/_nuxt/index.60837484.js"
  },
  "/_nuxt/index.7e4036e9.js": {
    "type": "application/javascript",
    "etag": "\"89-kJxnLdLrcCvNX4gYiPZPX+6OFXE\"",
    "mtime": "2022-10-14T02:07:02.519Z",
    "size": 137,
    "path": "../public/_nuxt/index.7e4036e9.js"
  },
  "/_nuxt/index.ac778c33.js": {
    "type": "application/javascript",
    "etag": "\"1d0-nB/y74GHFvzrCwTXvioUG6M5Wg4\"",
    "mtime": "2022-10-14T02:07:02.519Z",
    "size": 464,
    "path": "../public/_nuxt/index.ac778c33.js"
  },
  "/_nuxt/index.d482528c.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6f-yojrUiWpyStqmLzTsiG7ua6/V54\"",
    "mtime": "2022-10-14T02:07:02.519Z",
    "size": 111,
    "path": "../public/_nuxt/index.d482528c.css"
  },
  "/_nuxt/index.f4a03a04.js": {
    "type": "application/javascript",
    "etag": "\"219-hIFKdZ+FlKO7CrdAtEr5CWKyVqM\"",
    "mtime": "2022-10-14T02:07:02.519Z",
    "size": 537,
    "path": "../public/_nuxt/index.f4a03a04.js"
  },
  "/_nuxt/switch.472b4fef.js": {
    "type": "application/javascript",
    "etag": "\"afc-S7sG/mVqBWp1kPnxcCQ5lpXYpSk\"",
    "mtime": "2022-10-14T02:07:02.518Z",
    "size": 2812,
    "path": "../public/_nuxt/switch.472b4fef.js"
  },
  "/_nuxt/us.51a8613a.svg": {
    "type": "image/svg+xml",
    "etag": "\"217-aLLq1DcOere3DrbTWgnDHnPET9M\"",
    "mtime": "2022-10-14T02:07:02.518Z",
    "size": 535,
    "path": "../public/_nuxt/us.51a8613a.svg"
  },
  "/_nuxt/wave.c97a7378.svg": {
    "type": "image/svg+xml",
    "etag": "\"75f-Qz19aExIJd6ezlszC7Uj7k3IK4Y\"",
    "mtime": "2022-10-14T02:07:02.517Z",
    "size": 1887,
    "path": "../public/_nuxt/wave.c97a7378.svg"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = [];

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base of publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = ["HEAD", "GET"];
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler(async (event) => {
  if (event.req.method && !METHODS.includes(event.req.method)) {
    return;
  }
  let id = decodeURIComponent(withLeadingSlash(withoutTrailingSlash(parseURL(event.req.url).pathname)));
  let asset;
  const encodingHeader = String(event.req.headers["accept-encoding"] || "");
  const encodings = encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort().concat([""]);
  if (encodings.length > 1) {
    event.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.res.statusCode = 304;
    event.res.end("Not Modified (etag)");
    return;
  }
  const ifModifiedSinceH = event.req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime) {
    if (new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
      event.res.statusCode = 304;
      event.res.end("Not Modified (mtime)");
      return;
    }
  }
  if (asset.type) {
    event.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag) {
    event.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime) {
    event.res.setHeader("Last-Modified", asset.mtime);
  }
  if (asset.encoding) {
    event.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size) {
    event.res.setHeader("Content-Length", asset.size);
  }
  const contents = await readAsset(id);
  event.res.end(contents);
});

const _lazy_93ZG13 = () => import('../handlers/renderer.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_93ZG13, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_93ZG13, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  h3App.use(config.app.baseURL, timingMiddleware);
  const router = createRouter();
  const routerOptions = createRouter$1({ routes: config.nitro.routes });
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    const referenceRoute = h.route.replace(/:\w+|\*\*/g, "_");
    const routeOptions = routerOptions.lookup(referenceRoute) || {};
    if (routeOptions.swr) {
      handler = cachedEventHandler(handler, {
        group: "nitro/routes"
      });
    }
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(/\/+/g, "/");
      h3App.use(middlewareBase, handler);
    } else {
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const localCall = createCall(h3App.nodeHandler);
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({ fetch: localFetch, Headers, defaults: { baseURL: config.app.baseURL } });
  globalThis.$fetch = $fetch;
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, nitroApp.h3App.nodeHandler) : new Server$1(nitroApp.h3App.nodeHandler);
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const s = server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const i = s.address();
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${i.family === "IPv6" ? `[${i.address}]` : i.address}:${i.port}${baseURL}`;
  console.log(`Listening ${url}`);
});
{
  process.on("unhandledRejection", (err) => console.error("[nitro] [dev] [unhandledRejection] " + err));
  process.on("uncaughtException", (err) => console.error("[nitro] [dev] [uncaughtException] " + err));
}
const nodeServer = {};

export { useRuntimeConfig as a, nodeServer as n, useNitroApp as u };
//# sourceMappingURL=node-server.mjs.map
