console.log("worker import.meta.url: %s", import.meta.url);
console.log("global Apis: %o", Object.keys(globalThis));
console.log("Deno Apis: %o", Object.keys(Deno));
setInterval(()=>{
    console.log('[%s] worker time: %s', import.meta.url, new Date())
},1000);