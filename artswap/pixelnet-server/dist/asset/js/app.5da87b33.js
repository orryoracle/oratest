(function(e){function t(t){for(var n,o,s=t[0],u=t[1],l=t[2],c=0,p=[];c<s.length;c++)o=s[c],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&p.push(a[o][0]),a[o]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(e[n]=u[n]);f&&f(t);while(p.length)p.shift()();return i.push.apply(i,l||[]),r()}function r(){for(var e,t=0;t<i.length;t++){for(var r=i[t],n=!0,o=1;o<r.length;o++){var u=r[o];0!==a[u]&&(n=!1)}n&&(i.splice(t--,1),e=s(s.s=r[0]))}return e}var n={},a={app:0},i=[];function o(e){return s.p+"asset/js/"+({about:"about"}[e]||e)+"."+{about:"df17d97b"}[e]+".js"}function s(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.e=function(e){var t=[],r=a[e];if(0!==r)if(r)t.push(r[2]);else{var n=new Promise((function(t,n){r=a[e]=[t,n]}));t.push(r[2]=n);var i,u=document.createElement("script");u.charset="utf-8",u.timeout=120,s.nc&&u.setAttribute("nonce",s.nc),u.src=o(e);var l=new Error;i=function(t){u.onerror=u.onload=null,clearTimeout(c);var r=a[e];if(0!==r){if(r){var n=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+n+": "+i+")",l.name="ChunkLoadError",l.type=n,l.request=i,r[1](l)}a[e]=void 0}};var c=setTimeout((function(){i({type:"timeout",target:u})}),12e4);u.onerror=u.onload=i,document.head.appendChild(u)}return Promise.all(t)},s.m=e,s.c=n,s.d=function(e,t,r){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(r,n,function(t){return e[t]}.bind(null,n));return r},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/",s.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var c=0;c<u.length;c++)t(u[c]);var f=l;i.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},2395:function(e,t,r){},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("router-view")],1)},i=[],o=(r("7c55"),r("2877")),s={},u=Object(o["a"])(s,a,i,!1,null,null,null),l=u.exports,c=(r("d3b7"),r("8c4f")),f=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"Home"},[r("div",{staticClass:"frame-wrapper"},[e._l(4,(function(t,n){return[r("frame",{key:n,attrs:{frameW:e.config.frameW,frameH:e.config.frameH,pixelW:e.config.pixelW,pixelH:e.config.pixelH,index:n,maxSize:e.config.maxSize}})]}))],2)])},p=[],d=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"PixelFrame"},[r("div",{staticClass:"frame",style:{width:e.frameW+"px",height:e.frameH+"px"},on:{click:e.selectFile,dragover:e.prepareDrop,drop:e.receiveDrop}},[r("form",{attrs:{action:"fileupload",method:"post",enctype:"multipart/form-data"}},[r("input",{ref:"fileInput",attrs:{type:"file",name:"filetoupload"},on:{change:e.fileInputChange}}),r("input",{attrs:{type:"submit"}})]),null!=e.previewDataUrl?r("div",{staticClass:"framePreview"},[r("div",{staticClass:"grid-overlay"},[e._l(e.pixelH,(function(t,n){return[r("div",{key:n,staticClass:"grid-row"},[e._l(e.pixelW,(function(e,t){return[r("div",{key:"r"+t,staticClass:"grid-cell"})]}))],2)]}))],2),r("img",{attrs:{src:e.previewDataUrl,alt:""}})]):e._e()])])},m=[],v={name:"PixelFrame",props:["frameW","frameH","pixelW","pixelH","index","maxSize"],data:function(){return{previewDataUrl:null}},methods:{getDataUrl:function(e){return new Promise((function(t){var r=new FileReader;r.onload=function(e){t(e.target.result)},r.readAsDataURL(e)}))},prepareDrop:function(e){e.preventDefault()},receiveDrop:function(e){var t;e.preventDefault(),e.dataTransfer.items.length>0?t=e.dataTransfer.items[0].getAsFile():e.dataTransfer.files.length>0&&(t=e.dataTransfer.files[0]),t&&this.processFile(t)},selectFile:function(){this.$refs.fileInput.click()},fileInputChange:function(e){var t=e.target.files[0];this.processFile(t)},rejectFile:function(e){alert(e)},validateFile:function(e){var t=[];return"image/gif"!=e.type&&t.push("Only gif is supported."),e.size>this.maxSize&&t.push("Max file size is: "+this.maxSize/1e3+"kb."),0==t.length?{result:!0}:{result:!1,reasons:t}},uploadFile:function(e){var t=this;return new Promise((function(r){var n="/upload",a=new XMLHttpRequest,i=new FormData;a.open("POST",n,!0),a.addEventListener("readystatechange",(function(e){4==a.readyState&&200==a.status?r(JSON.parse(e.target.responseText)):4==a.readyState&&200!=a.status&&console.log("error: ",e)})),i.append("file",e),i.append("index",t.index),a.send(i)}))},processFile:function(e){var t=this,r=this.validateFile(e);r.result?this.uploadFile(e).then((function(r){r.success?t.getDataUrl(e).then((function(e){t.previewDataUrl=e})):t.rejectFile(r.reasons)})):this.rejectFile(r.reasons)}},mounted:function(){}},h=v,g=(r("fcf6"),Object(o["a"])(h,d,m,!1,null,"222104ee",null)),b=g.exports,x={name:"Home",components:{Frame:b},data:function(){return{config:{frameW:200,frameH:200,pixelW:8,pixelH:8,maxSize:1e5}}},methods:{},mounted:function(){}},y=x,w=(r("a4a8"),Object(o["a"])(y,f,p,!1,null,"22eef2b8",null)),F=w.exports;n["a"].use(c["a"]);var j=[{path:"/",name:"home",component:F},{path:"/about",name:"about",component:function(){return r.e("about").then(r.bind(null,"f820"))}}],O=new c["a"]({mode:"history",base:"/",routes:j}),_=O;n["a"].config.productionTip=!1,new n["a"]({router:_,render:function(e){return e(l)}}).$mount("#app")},"7c55":function(e,t,r){"use strict";var n=r("2395"),a=r.n(n);a.a},a4a8:function(e,t,r){"use strict";var n=r("e9b1"),a=r.n(n);a.a},b519:function(e,t,r){},e9b1:function(e,t,r){},fcf6:function(e,t,r){"use strict";var n=r("b519"),a=r.n(n);a.a}});
//# sourceMappingURL=app.5da87b33.js.map