const __vite__fileDeps=["./pageIm-fkvRCGk7.js","./index-CUunZKC8.js","./index-jdz_mo9Z.css","./page-BA7ayRgp.js","./pagePassword-CgXKA-3J.js","./putPreloader-Ta328mJ6.js","./button-BNhNvqrV.js","./htmlToSpan-ZKZBBblk.js","./wrapEmojiText-DV832afX.js","./loginPage-CTx2RklH.js","./pageSignIn-CroIEZeN.js","./countryInputField-DT5292lS.js","./scrollable-B-onvy-4.js","./pageSignQR-Cm4CWvFV.js","./textToSvgURL-Cnw_Q8Rw.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{a as o,A as s,_ as r,S as m}from"./index-CUunZKC8.js";import{p as h}from"./putPreloader-Ta328mJ6.js";import{P as d}from"./page-BA7ayRgp.js";let i;const g=async()=>{const{dcId:e,token:u,tgAddr:n}=i;let a;try{o.managers.apiManager.setBaseDcId(e);const t=await o.managers.apiManager.invokeApi("auth.importWebTokenAuthorization",{api_id:s.id,api_hash:s.hash,web_auth_token:u},{dcId:e,ignoreErrors:!0});t._==="auth.authorization"&&(await o.managers.apiManager.setUser(t.user),a=r(()=>import("./pageIm-fkvRCGk7.js"),__vite__mapDeps([0,1,2,3]),import.meta.url))}catch(t){switch(t.type){case"SESSION_PASSWORD_NEEDED":{t.handled=!0,a=r(()=>import("./pagePassword-CgXKA-3J.js"),__vite__mapDeps([4,1,2,5,3,6,7,8,9]),import.meta.url);break}default:{console.error("authorization import error:",t);const p=m.authState._;p==="authStateSignIn"?a=r(()=>import("./pageSignIn-CroIEZeN.js"),__vite__mapDeps([10,1,2,5,3,11,6,8,12,13,14]),import.meta.url):p==="authStateSignQr"&&(a=r(()=>import("./pageSignQR-Cm4CWvFV.js").then(_=>_.a),__vite__mapDeps([13,1,2,3,6,5,14]),import.meta.url));break}}}location.hash=n?.trim()?"#?tgaddr="+encodeURIComponent(n):"",a&&a.then(t=>t.default.mount())},l=new d("page-signImport",!0,()=>{h(l.pageEl.firstElementChild,!0),g()},e=>{i=e,o.managers.appStateManager.pushToState("authState",{_:"authStateSignImport",data:i})});export{l as default};
//# sourceMappingURL=pageSignImport-Di4BGPFo.js.map
