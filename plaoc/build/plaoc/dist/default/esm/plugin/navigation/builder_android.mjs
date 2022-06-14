import{BfcsNavigator as r}from"./BfcsNavigator.mjs";import{navigator_ffi as o}from"./ffi_android.mjs";const t=()=>{const t=JSON.parse(o.init());return new r(t.info,t.parent,o)};export{t as default};
