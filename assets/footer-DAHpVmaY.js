import{r as c,j as t}from"./index-CYIMl1WQ.js";const _="_footer_dzdbx_3",j="_footerContent_dzdbx_17",k="_contactInfo_dzdbx_39",v="_emailLink_dzdbx_49",b="_footerNav_dzdbx_97",C="_socials_dzdbx_105",g="_topLink_dzdbx_135",L="_footerBottom_dzdbx_167",s={footer:_,footerContent:j,contactInfo:k,emailLink:v,footerNav:b,socials:C,topLink:g,footerBottom:L};/**
 * @license lucide-react v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=o=>o.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),w=o=>o.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,a,r)=>r?r.toUpperCase():a.toLowerCase()),h=o=>{const e=w(o);return e.charAt(0).toUpperCase()+e.slice(1)},m=(...o)=>o.filter((e,a,r)=>!!e&&e.trim()!==""&&r.indexOf(e)===a).join(" ").trim(),y=o=>{for(const e in o)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var z={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=c.forwardRef(({color:o="currentColor",size:e=24,strokeWidth:a=2,absoluteStrokeWidth:r,className:i="",children:n,iconNode:f,...d},x)=>c.createElement("svg",{ref:x,...z,width:e,height:e,stroke:o,strokeWidth:r?Number(a)*24/Number(e):a,className:m("lucide",i),...!n&&!y(d)&&{"aria-hidden":"true"},...d},[...f.map(([p,u])=>c.createElement(p,u)),...Array.isArray(n)?n:[n]]));/**
 * @license lucide-react v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=(o,e)=>{const a=c.forwardRef(({className:r,...i},n)=>c.createElement(A,{ref:n,iconNode:e,className:m(`lucide-${N(h(o))}`,`lucide-${o}`,r),...i}));return a.displayName=h(o),a};/**
 * @license lucide-react v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",key:"tonef"}],["path",{d:"M9 18c-4.51 2-5-2-7-2",key:"9comsn"}]],B=l("github",I);/**
 * @license lucide-react v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=[["path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",key:"c2jq9f"}],["rect",{width:"4",height:"12",x:"2",y:"9",key:"mk3on5"}],["circle",{cx:"4",cy:"4",r:"2",key:"bt5ra8"}]],$=l("linkedin",E);/**
 * @license lucide-react v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]],M=l("mail",R);function q({lenis:o}){const e=a=>{a.preventDefault(),o?.scrollTo(0,{duration:2})};return t.jsx("footer",{id:"contact",className:s.footer,children:t.jsxs("div",{className:"container",children:[t.jsxs("div",{className:s.footerContent,children:[t.jsxs("div",{className:s.contactInfo,children:[t.jsx("h3",{children:"Let's Connect"}),t.jsx("p",{children:"I'm currently seeking new opportunities. Feel free to reach out."}),t.jsx("a",{href:"mailto:challasaiteja26@gmail.com",className:s.emailLink,children:"challasaiteja26@gmail.com"})]}),t.jsxs("div",{className:s.footerNav,children:[t.jsxs("div",{className:s.socials,children:[t.jsx("a",{href:"#","aria-label":"GitHub",children:t.jsx(B,{})}),t.jsx("a",{href:"#","aria-label":"LinkedIn",children:t.jsx($,{})}),t.jsx("a",{href:"mailto:challasaiteja26@gmail.com","aria-label":"Email",children:t.jsx(M,{})})]}),t.jsx("button",{className:s.topLink,onClick:e,children:"Back to Top ↑"})]})]}),t.jsx("div",{className:s.footerBottom,children:t.jsxs("p",{children:["© ",new Date().getFullYear()," Saiteja Challa. All Rights Reserved."]})})]})})}export{q as default};
