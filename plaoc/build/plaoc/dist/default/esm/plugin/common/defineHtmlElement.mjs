const t=(t,e,n)=>{const s=new Set,o=[],r=[],c=[],a=new Map;let i=e;for(;;){for(const[t,e]of Object.entries(Object.getOwnPropertyDescriptors(i)))t.startsWith("_")||a.has(t)||a.set(t,e);if(i=Object.getPrototypeOf(e),i===Object.prototype)break}const p=(t,e)=>{t.startsWith("on")&&"function"==typeof e.get?t.substring(2).toLowerCase():"function"==typeof e.value?o.push(t):"value"in e?c.push(t):"set"in e&&(void 0===e.set?r.push(t):c.push(t))};for(const[f,l]of a)p(f,l);const u=Function("apis","evt_hubs","lifecycle",`return class HTML${t.tagName} extends HTMLElement {\n        constructor(){\n            super()\n            lifecycle.onCreate && lifecycle.onCreate(this)\n        }\n        disconnectedCallback() {\n          for (const evt of evt_hubs) {\n            evt.return();\n          }\n        }\n        ${o.map((t=>`${t}(...args) { return apis.${t}(...args) }`)).join("\n")}\n        ${r.map((t=>`get ${t}() { return apis.${t} }`)).join("\n")}\n        ${c.map((t=>`get ${t}() { return apis.${t} }\nset ${t}(v) { return apis.${t}(v) }`)).join("\n")}\n      }`)(e,s);return customElements.define(t.tag_name,u),u};export{t as defineHtmlElement};
