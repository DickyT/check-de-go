var oe=Object.defineProperty,ie=Object.defineProperties;var re=Object.getOwnPropertyDescriptors;var Y=Object.getOwnPropertySymbols;var se=Object.prototype.hasOwnProperty,ce=Object.prototype.propertyIsEnumerable;var z=(o,i,s)=>i in o?oe(o,i,{enumerable:!0,configurable:!0,writable:!0,value:s}):o[i]=s,H=(o,i)=>{for(var s in i||(i={}))se.call(i,s)&&z(o,s,i[s]);if(Y)for(var s of Y(i))ce.call(i,s)&&z(o,s,i[s]);return o},M=(o,i)=>ie(o,re(i));import{d as ue,r as p,j as D,R as B,B as X,n as de,E as me,a as pe}from"./vendor.fe63c2a4.js";const he=function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))c(n);new MutationObserver(n=>{for(const t of n)if(t.type==="childList")for(const g of t.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&c(g)}).observe(document,{childList:!0,subtree:!0});function s(n){const t={};return n.integrity&&(t.integrity=n.integrity),n.referrerpolicy&&(t.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?t.credentials="include":n.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(n){if(n.ep)return;n.ep=!0;const t=s(n);fetch(n.href,t)}};he();function $(o,...i){return ue(o,i)}function ge(o,i){const[s,c]=p.exports.useState(o);return p.exports.useEffect(()=>{const n=setTimeout(()=>c(o),i||500);return()=>{clearTimeout(n)}},[o,i]),s}function fe(o){const i=p.exports.useRef();return p.exports.useEffect(()=>{i.current=o}),i.current}const L=[{name:"MICR",url:"https://raw.githubusercontent.com/garily/check-de-go/master/src/static/micrenc.ttf"},{name:"Spoqa Han Sans Neo Regular",url:"https://cdnjs.cloudflare.com/ajax/libs/spoqa-han-sans/3.2.1/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.ttf"},{name:"Spoqa Han Sans Neo Medium",url:"https://cdnjs.cloudflare.com/ajax/libs/spoqa-han-sans/3.2.1/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Medium.ttf"},{name:"Roboto Mono",url:"https://fonts.cdnfonts.com/s/16061/RobotoMono-Regular.woff"}].map(({name:o,url:i})=>new FontFace(o,`url('${i}')`)),G=900,Q=350;function J({ref:o,scale:i,previewMode:s}){const c=p.exports.useRef(null),n=p.exports.useCallback(x=>i*x,[i]),t=p.exports.useCallback(()=>c.current.getContext("2d"),[]),g=p.exports.useMemo(()=>()=>({canvas:c.current,context:t()}),[t]);p.exports.useImperativeHandle(o,g);const T=s?window.devicePixelRatio:1,h=n(G),k=h*T,N=n(Q),b=N*T,r=p.exports.useCallback(()=>{const x=t();x.setTransform(1,0,0,1,0,0),x.scale(T,T),x.clearRect(0,0,k,b),x.fillStyle="white",x.fillRect(0,0,h,N)},[b,k,t,T,h,N]);return{canvasRef:c,unit:n,getContext:t,width:h,height:N,canvasWidth:k,canvasHeight:b,resetCanvas:r}}function Z(o){return new Promise((i,s)=>{if(o==null){i(void 0);return}const c=new Image;c.crossOrigin="anonymous",c.onload=()=>i(c),c.onerror=()=>s(),c.src=o})}function ee(){return new Promise((o,i)=>{if(L.reduce((c,n)=>c+(n.status==="loaded"?1:0),0)<L.length){let c=0;L.forEach(n=>n.load().then(t=>{document.fonts.add(t),c+=1,c===L.length&&o()}).catch(()=>i()))}else o()})}const a=D.exports.jsx,u=D.exports.jsxs,U=D.exports.Fragment;var te=B.forwardRef(({previewMode:o=!1,scale:i=1,bg:s,logo:c,amount:n,issueDate:t,routingNumber:g,accountNumber:T,checkNumber:h,memo:k,senderAddress:N,receiverAddress:b,bankAddress:r,expireDays:x,className:q},_)=>{const I=$(Z,s),S=$(Z,c);$(ee);const{canvasRef:O,unit:e,getContext:w,width:m,height:E,canvasWidth:P,canvasHeight:y,resetCanvas:K}=J({ref:_,scale:i,previewMode:o}),A=p.exports.useMemo(()=>new X(n.length===0?0:n),[n]);return p.exports.useEffect(()=>{const l=w();if(K(),I){const d=m/I.width;l.drawImage(I,0,0,I.width,I.height,0,0,I.width*d,I.height*d)}if(((d,f,C,R,v)=>{l.beginPath(),l.moveTo(d+v,f),l.lineTo(d+C-v,f),l.quadraticCurveTo(d+C,f,d+C,f+v),l.lineTo(d+C,f+R-v),l.quadraticCurveTo(d+C,f+R,d+C-v,f+R),l.lineTo(d+v,f+R),l.quadraticCurveTo(d,f+R,d,f+R-v),l.lineTo(d,f+v),l.quadraticCurveTo(d,f,d+v,f),l.closePath(),l.fillStyle="rgba(255,255,255,0.6)",l.fill()})(e(10),e(10),m-e(20),E-e(20),e(15)),S){const d=e(200)/S.width;l.drawImage(S,0,0,S.width,S.height,m/2-S.width*d/2,e(25),S.width*d,S.height*d)}l.fillStyle="black",l.textBaseline="middle",l.textAlign="start",l.font=`${e(13)}px 'Spoqa Han Sans Neo Regular'`,l.fillText("PAY EXACTLY",e(30),e(125));const V=A.integerValue(X.ROUND_FLOOR),le=de.exports.toWords(V.toNumber()).replaceAll(",","").toUpperCase();l.font=`${e(15)}px 'Spoqa Han Sans Neo Medium'`;const ae=A.minus(V).multipliedBy("100").toFormat();l.fillText(`** ${le} AND ${ae}/100 US Dollars **`,e(130),e(125)),l.font=`${e(20)}px 'Roboto Mono'`,l.textAlign="end",l.fillText(`** $${A.toFormat()} **`,m-e(30),e(155)),l.font=`${e(13)}px 'Spoqa Han Sans Neo Medium'`,l.fillText(r.name,m-e(30),e(185)),l.font=`${e(13)}px 'Spoqa Han Sans Neo Regular'`,r.line1!=null&&l.fillText(r.line1,m-e(30),e(200)),r.line2!=null&&l.fillText(r.line2,m-e(30),e(215)),r.line3!=null&&l.fillText(r.line3,m-e(30),e(230)),l.textAlign="center",l.font=`${e(13)}px 'Spoqa Han Sans Neo Regular'`,l.fillText("TO THE",e(65),e(165)),l.fillText("ORDER OF",e(65),e(185)),l.textAlign="start",l.font=`${e(20)}px 'Spoqa Han Sans Neo Medium'`,l.fillText(b.name,e(130),e(175)),l.font=`${e(13)}px 'Spoqa Han Sans Neo Regular'`,b.line1!=null&&l.fillText(b.line1,e(130),e(200)),b.line2!=null&&l.fillText(b.line2,e(130),e(215)),b.line3!=null&&l.fillText(b.line3,e(130),e(230)),l.font=`${e(13)}px 'Spoqa Han Sans Neo Medium'`,l.fillText(N.name,e(30),e(30)),l.font=`${e(13)}px 'Spoqa Han Sans Neo Regular'`,N.line1!=null&&l.fillText(N.line1,e(30),e(50)),N.line2!=null&&l.fillText(N.line2,e(30),e(65)),N.line3!=null&&l.fillText(N.line3,e(30),e(80)),l.font=`${e(13)}px 'Spoqa Han Sans Neo Medium'`,k!=null&&l.fillText(k,e(50),E-e(75)),l.beginPath(),l.moveTo(m/3*2,E-e(70)),l.lineTo(m-e(30),E-e(70)),l.lineWidth=e(1),l.stroke(),l.font=`${e(13)}px 'Spoqa Han Sans Neo Medium'`,l.textAlign="end",l.fillText("DATE",m-e(125),e(30)),l.fillText("CHECK #",m-e(125),e(50)),l.font=`${e(13)}px 'Roboto Mono'`,l.textAlign="start",l.fillText(t,m-e(115),e(30)),l.fillText(h,m-e(115),e(50)),l.font=`${e(13)}px 'Spoqa Han Sans Neo Medium'`,l.textAlign="end",x!=null&&l.fillText(`VOID AFTER ${x} DAYS`,m-e(37),e(85)),((d,f,C,R,v)=>{l.beginPath(),l.moveTo(d+v,f),l.lineTo(d+C,f),l.quadraticCurveTo(d+C,f,d+C,f+v),l.lineTo(d+C,f+R-v),l.quadraticCurveTo(d+C,f+R,d+C-v,f+R),l.lineTo(d+v,f+R),l.quadraticCurveTo(d,f+R,d,f+R-v),l.lineTo(d,f),l.closePath(),l.fillStyle="rgba(255,255,255,0.5)",l.fill()})(e(10),E-e(50),m-e(20),e(50)-e(10),e(15)),l.font=`${e(35)}px MICR`,l.fillStyle="black",l.textAlign="center",l.textBaseline="ideographic",l.fillText(`C${h}C A${g}A ${T}C`,m/2,E-e(20))},[T,A,r,I,y,P,h,x,w,E,t,S,k,b.line1,b.line2,b.line3,b.name,g,N.line1,N.line2,N.line3,N.name,e,m,K]),a("canvas",{className:q,ref:O,width:P,height:y,style:{width:m,height:E}})});function W({name:o,className:i,value:s,onChange:c}){const n=p.exports.useCallback((t,g)=>c(M(H({},s),{[t]:g.target.value})),[c,s]);return u("div",{className:i,children:[a("label",{className:"form-label",children:o}),a("input",{type:"text",className:"form-control",placeholder:"Name",required:!0,value:s.name,onChange:t=>n("name",t)}),a("input",{type:"text",className:"form-control",placeholder:"Address line 1 (optional)",value:s.line1,onChange:t=>n("line1",t)}),a("input",{type:"text",className:"form-control",placeholder:"Address line 2 (optional)",value:s.line2,onChange:t=>n("line2",t)}),a("input",{type:"text",className:"form-control",placeholder:"Address line 3 (optional)",value:s.line3,onChange:t=>n("line3",t)})]})}function Ne({value:o,onChange:i}){const s=p.exports.useCallback((n,t)=>i(g=>M(H({},g),{[n]:t.target.value})),[i]),c=p.exports.useCallback((n,t)=>i(g=>M(H({},g),{[n]:t})),[i]);return p.exports.useEffect(()=>{o.routingNumber.length===9&&(async()=>{try{const t=await(await fetch(`https://www.routingnumbers.info/api/data.json?rn=${o.routingNumber}`)).json();if(t.message==="OK")i(g=>M(H({},g),{bankAddress:{name:t.customer_name,line1:t.address,line2:`${t.city}, ${t.state} ${t.zip}`,line3:""}}));else throw new Error("Routing number service not available")}catch{i(t=>M(H({},t),{bankAddress:{name:"",line1:"",line2:""}}))}})()},[o.routingNumber,i]),u("div",{className:"check-settings",children:[a("h6",{children:"Check Settings"}),u("div",{className:"row g-3",children:[u("div",{className:"col-3",children:[a("label",{htmlFor:"amount",className:"form-label",children:"Amount"}),u("div",{className:"input-group",children:[a("span",{className:"input-group-text",children:"$"}),a("input",{type:"text",className:"form-control",id:"amount",placeholder:"Check Amount",value:o.amount,onChange:n=>s("amount",n),required:!0})]})]}),u("div",{className:"col-3",children:[a("label",{htmlFor:"routing-num",className:"form-label",children:"Routing Number"}),a("input",{type:"text",className:"form-control",id:"routing-num",placeholder:"Routing Number",value:o.routingNumber,onChange:n=>s("routingNumber",n),required:!0})]}),u("div",{className:"col-3",children:[a("label",{htmlFor:"account-num",className:"form-label",children:"Account Number"}),a("input",{type:"text",className:"form-control",id:"account-num",placeholder:"Account Number",value:o.accountNumber,onChange:n=>s("accountNumber",n),required:!0})]}),u("div",{className:"col-3",children:[a("label",{htmlFor:"check-num",className:"form-label",children:"Check Number"}),a("input",{type:"text",className:"form-control",id:"check-num",placeholder:"Check Number",value:o.checkNumber,onChange:n=>s("checkNumber",n),required:!0})]}),u("div",{className:"col-3",children:[a("label",{htmlFor:"issue-date",className:"form-label",children:"Issue Date"}),a("input",{type:"text",className:"form-control",id:"issue-date",placeholder:"05/35/1989",value:o.issueDate,onChange:n=>s("issueDate",n),required:!0})]}),u("div",{className:"col-2",children:[a("label",{htmlFor:"void-after",className:"form-label",children:"Void after Days"}),a("input",{type:"number",className:"form-control",id:"void-after",value:o.expireDays,onChange:n=>s("expireDays",n),required:!0})]}),u("div",{className:"col-7",children:[a("label",{htmlFor:"check-memo",className:"form-label",children:"Memo"}),a("input",{type:"text",className:"form-control",id:"check-memo",placeholder:"Check Memo",value:o.memo,onChange:n=>s("memo",n)})]}),a(W,{className:"col-4 address-info",name:"Sender Info",value:o.senderAddress,onChange:n=>c("senderAddress",n)}),a(W,{className:"col-4 address-info",name:"Receiver Info",value:o.receiverAddress,onChange:n=>c("receiverAddress",n)}),a(W,{className:"col-4 address-info",name:"Bank Info",value:o.bankAddress,onChange:n=>c("bankAddress",n)}),u("div",{className:"col-12",children:[u("label",{htmlFor:"check-bg",className:"form-label",children:["Background Image"," ",a("small",{children:a("strong",{children:"(IMGUR URL ONLY)"})})]}),a("input",{type:"text",className:"form-control",id:"check-bg",placeholder:"Background Image URL",value:o.bg,onChange:n=>s("bg",n)})]}),u("div",{className:"col-12",children:[u("label",{htmlFor:"check-logo",className:"form-label",children:["Logo Image"," ",a("small",{children:a("strong",{children:"(IMGUR URL ONLY)"})})]}),a("input",{type:"text",className:"form-control",id:"check-logo",placeholder:"Logo Image URL",value:o.logo,onChange:n=>s("logo",n)})]})]})]})}var ne=B.forwardRef(({className:o,previewMode:i=!1,scale:s=1},c)=>{$(ee);const{canvasRef:n,unit:t,getContext:g,width:T,height:h,canvasWidth:k,canvasHeight:N,resetCanvas:b}=J({ref:c,scale:s,previewMode:i});return p.exports.useEffect(()=>{const r=g();b(),r.save(),r.rotate(.5*Math.PI),r.translate(t(0),-T),r.textBaseline="top",r.fillStyle="black",r.font=`${t(13)}px 'Spoqa Han Sans Neo Regular'`,r.textAlign="start",r.fillText("ENDORSE HERE",t(20),t(20)),r.font=`${t(20)}px 'Spoqa Han Sans Neo Regular'`,r.fillText("\u2715",t(20),t(70)),r.beginPath(),r.moveTo(t(20),t(90)),r.lineTo(h-t(20),t(90)),r.lineWidth=t(1.5),r.stroke(),r.beginPath(),r.moveTo(t(20),t(150)),r.lineTo(h-t(20),t(150)),r.lineWidth=t(1.5),r.stroke(),r.beginPath(),r.moveTo(t(20),t(210)),r.lineTo(h-t(20),t(210)),r.lineWidth=t(1.5),r.stroke(),r.font=`${t(13)}px 'Spoqa Han Sans Neo Medium'`,r.textAlign="center",r.fillText("DO NOT WRITE, STAMP, OR SIGN BELOW THIS LINE",h/2,t(220)),r.font=`${t(12)}px 'Spoqa Han Sans Neo Regular'`,r.fillText("** RESERVED FOR FINANCIAL INSTITUTION USE **",h/2,t(235)),r.beginPath(),r.moveTo(t(20),t(255)),r.lineTo(h-t(20),t(255)),r.lineWidth=t(1.5),r.stroke(),r.restore()},[b,g,T,h,t]),a("canvas",{className:o,ref:n,width:k,height:N,style:{width:T,height:h}})});const F=8,j=F*Q/G;function be({renderOptions:o}){const[i,s]=p.exports.useState(),c=fe(i),[n,t]=p.exports.useState(1),[g,T]=p.exports.useState("preview"),[h,k]=p.exports.useState({paperType:"Letter",dpi:"300",topMargin:"0.5",filename:"",cuttingHelper:!0}),N=p.exports.useRef(),b=p.exports.useRef(),r=p.exports.useCallback(x=>{const q=parseInt(h.dpi,10);t(F*q/G),T(x),s(H({},o))},[h.dpi,o]);return p.exports.useLayoutEffect(()=>{c!==i&&setTimeout(()=>{const x=N.current,q=b.current;if(x!=null&&q!=null){const{canvas:_}=x,{canvas:I}=q,S=8.5,O=11,e=(S-F)/2,w=parseFloat(h.topMargin),m=new me("p","in",[S,O]),E=y=>{m.addImage(y,"png",e,w,F,j),h.cuttingHelper&&(m.setLineDashPattern([.1],2),m.setLineWidth(.01),m.line(0,w,S,w),m.line(0,w+j,8.5,w+j),m.line(e,0,e,O),m.line(S-e,0,S-e,O))};E(_),m.addPage(),E(I);const P=h.filename.length>0?h.filename:`Check_de_Go_${new Date().getTime()}.pdf`;g==="preview"||g==="print"?(g==="print"&&m.autoPrint(),window.open(m.output("bloburl"),"_blank")):g==="download"&&m.save(P)}},250)},[g,i,c,h.cuttingHelper,h.filename,h.topMargin]),u("div",{className:"check-settings",children:[a("h6",{children:"PDF Print Settings"}),u("div",{className:"alert alert-info",role:"alert",children:["Any feedbacks regarding the printing process?"," ",a("a",{href:"https://github.com/DickyT/check-de-go/issues",target:"_blank",rel:"noreferrer",children:"Let us know"})]}),u("div",{className:"row g-3",children:[a(xe,{value:h,onChange:k}),a("hr",{}),u("div",{className:"col-12 print-actions",children:[a("button",{className:"btn btn-primary btn-lg",type:"button",onClick:()=>r("preview"),children:"Preview File"}),a("button",{className:"btn btn-primary btn-lg",type:"button",onClick:()=>r("print"),children:"Print File"}),a("button",{className:"btn btn-secondary btn-lg",type:"button",onClick:()=>r("download"),children:"Download File"})]})]}),i!=null&&u(U,{children:[a(te,H({ref:N,className:"invisible-check",previewMode:!1,scale:n},i)),a(ne,{ref:b,className:"invisible-check",previewMode:!1,scale:n})]})]})}function xe({value:o,onChange:i}){const s=p.exports.useCallback((n,t)=>i(M(H({},o),{[n]:t.target.value})),[i,o]),c=p.exports.useCallback((n,t)=>i(M(H({},o),{[n]:t})),[i,o]);return u(U,{children:[u("div",{className:"col-2",children:[a("label",{htmlFor:"print-paper-size",className:"form-label",children:"Paper Size"}),a("input",{type:"text",className:"form-control",id:"print-paper-size",placeholder:"Paper Size",value:o.paperType,onChange:n=>s("paperType",n),required:!0,disabled:!0})]}),u("div",{className:"col-2",children:[a("label",{htmlFor:"print-dpi",className:"form-label",children:"DPI"}),a("input",{type:"number",className:"form-control",id:"print-dpi",placeholder:"DPI",value:o.dpi,onChange:n=>s("dpi",n),step:100,min:100,max:3600})]}),u("div",{className:"col-2",children:[a("label",{htmlFor:"print-top-margin",className:"form-label",children:"Top Margin"}),a("input",{type:"number",className:"form-control",id:"print-top-margin",placeholder:"Top Margin",value:o.topMargin,onChange:n=>s("topMargin",n),step:.05,min:0,max:100})]}),u("div",{className:"col-4",children:[a("label",{htmlFor:"print-filename",className:"form-label",children:"PDF Filename"}),a("input",{type:"text",className:"form-control",id:"print-filename",placeholder:"Filename without extension",value:o.filename,onChange:n=>s("filename",n)})]}),u("div",{className:"col-2",children:[a("label",{htmlFor:"print-cutter-helper",className:"form-label",children:"Cutter Helper"}),u("select",{className:"form-control",id:"print-cutter-helper",value:String(o.cuttingHelper),onChange:n=>c("cuttingHelper",n.target.value==="true"),children:[a("option",{value:"true",children:"Yes"}),a("option",{value:"false",children:"No"})]})]})]})}function ve(){return u("div",{className:"check-settings",children:[a("h6",{children:"Back Side Settings"}),a("div",{className:"alert alert-warning",role:"alert",children:"No settings available yet"})]})}function Se(){const[o,i]=p.exports.useState({amount:"114514.19",issueDate:"07/01/2003",routingNumber:"026009632",accountNumber:"1145141919",checkNumber:"810",memo:"TESLA TO THE MOON \u{1F680} (SAMPLE CHECK DO NOT DEPOSIT)",senderAddress:{name:"TESLA INC.",line1:"TESLA HEADQUARTERS",line2:"3500 DEER CREEK RD",line3:"PALO ALTO, CA 94304"},receiverAddress:{name:"ELON MUSK",line1:"TESLA GIGA TEXAS",line2:"13101 HAROLD GREEN RD",line3:"AUSTIN, TX 78725"},bankAddress:{name:"",line1:"",line2:"",line3:""},expireDays:"180",logo:"https://i.imgur.com/vwqVHT3.png",bg:"https://i.imgur.com/PrAofVk.png"}),s=ge(o,500);return u(U,{children:[u("main",{children:[a("div",{className:"app-header text-center",children:u("div",{className:"home-logo",children:[a("i",{className:"fas fa-money-check-alt fa-5x"}),u("div",{className:"right-text",children:[a("span",{className:"title",children:"Check de Go v2"}),u("span",{className:"subtitle",children:["Yet another check generation tool",a("a",{href:"https://github.com/DickyT/check-de-go/",className:"github-badge",target:"_blank",rel:"noreferrer",children:a("img",{alt:"GitHub Repo stars",src:"https://img.shields.io/github/stars/DickyT/check-de-go?style=social"})})]})]})]})}),a("div",{className:"main-content",children:u(B.Suspense,{fallback:u("div",{className:"loading",children:[a("img",{src:"https://i.stack.imgur.com/kOnzy.gif",alt:""}),a("span",{className:"loading-text",children:"Reloading Data"})]}),children:[a("div",{className:"front-preview",children:a(te,H({className:"check-canvas",scale:.8,previewMode:!0},s))}),a("hr",{}),a(Ne,{value:o,onChange:i}),a("hr",{}),a(ne,{className:"check-back-canvas",scale:.8,previewMode:!0}),a("hr",{}),a(ve,{}),a("hr",{}),a(be,{renderOptions:o})]})})]}),a("footer",{className:"my-5 pt-5 text-muted text-center text-small",children:a("p",{className:"mb-1",children:"Check de Go is provided under GNU General Public License."})})]})}pe.createRoot(document.getElementById("root")).render(a(p.exports.StrictMode,{children:a(Se,{})}));
