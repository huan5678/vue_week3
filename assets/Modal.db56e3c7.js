import{u as c}from"./index.1e2c0e7a.js";import{_ as i}from"./index.b70e70ff.js";import{n as l,o as d,c as p,j as r,p as t,q as f,T as b}from"./vendor.2cafc8ac.js";const m={setup(){const a=c(),{handlerModalControl:o}=a;function s(e){if(e.path[0].nodeName==="svg"||e.path[0].nodeName==="path")return null;e.path[0].className.match("backdrop")&&o()}return{isOpenModal:l(()=>a.isOpenModal),handlerBackdropClick:s}}},u={class:"container"};function k(a,o,s,e,h,_){return d(),p(b,{to:"body"},[r("div",{class:t(["absolute top-0 left-0 right-0 bottom-0 w-full min-h-screen bg-stone-700 bg-opacity-50 backdrop-blur-[2px] backdrop",e.isOpenModal?"":"invisible -z-10"]),onClick:o[0]||(o[0]=(...n)=>e.handlerBackdropClick&&e.handlerBackdropClick(...n))},[r("div",u,[r("div",{class:t(["transition-all flex justify-center items-center backdrop",e.isOpenModal?"ease-[cubic-bezier(.51,.24,.32,1.3)] duration-300":"scale-0 opacity-0 ease-[cubic-bezier(.31,1.09,1,.99)] duration-75"])},[f(a.$slots,"default")],2)])],2)])}var B=i(m,[["render",k]]);export{B as M};
