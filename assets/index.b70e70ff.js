import{r as f,o as d,c as m,a as _,b as h,d as v,e as y}from"./vendor.2cafc8ac.js";const g=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}};g();var L=(i,n)=>{const s=i.__vccOpts||i;for(const[r,e]of n)s[r]=e;return s};const b={name:"App",components:{}};function E(i,n,s,r,e,t){const o=f("router-view");return d(),m(o)}var O=L(b,[["render",E]]);const P="modulepreload",l={},$="./",c=function(n,s){return!s||s.length===0?n():Promise.all(s.map(r=>{if(r=`${$}${r}`,r in l)return;l[r]=!0;const e=r.endsWith(".css"),t=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${t}`))return;const o=document.createElement("link");if(o.rel=e?"stylesheet":P,e||(o.as="script",o.crossOrigin=""),o.href=r,document.head.appendChild(o),e)return new Promise((u,p)=>{o.addEventListener("load",u),o.addEventListener("error",p)})})).then(()=>n())};var A=_({history:h(),routes:[{path:"/",component:()=>c(()=>import("./Home.a4fb61a0.js"),["assets/Home.a4fb61a0.js","assets/index.1e2c0e7a.js","assets/vendor.2cafc8ac.js"])},{path:"/login",component:()=>c(()=>import("./Login.1f3ba1b0.js"),["assets/Login.1f3ba1b0.js","assets/index.1e2c0e7a.js","assets/vendor.2cafc8ac.js","assets/Modal.db56e3c7.js"])},{path:"/dashboard",component:()=>c(()=>import("./Dashboard.0d1f99a7.js"),["assets/Dashboard.0d1f99a7.js","assets/index.1e2c0e7a.js","assets/vendor.2cafc8ac.js","assets/Modal.db56e3c7.js"])}]});const k=v(),a=y(O);a.use(k);a.use(A);a.mount("#app");export{L as _};