(function(){"use strict";var t={6888:function(t,n,r){var e=r(7195),i=function(){var t=this,n=t._self._c;return n("div",{staticClass:"cart-form",attrs:{id:"app"}},[n("div",{staticClass:"cart-form__inputs"},[n("div",{staticClass:"cart-form__col"},[n("input",{staticClass:"cart-form__input",attrs:{type:"text",placeholder:"Price"},domProps:{value:t.currentPrice},on:{input:function(n){return t.onInputChangeDebounced("currentPrice",n.target.value)}}}),n("div",{staticClass:"value-title"},[t._v("Price:")]),n("div",[t._v(t._s(t.currentPrice))])]),n("div",{staticClass:"cart-form__col"},[n("input",{staticClass:"cart-form__input",attrs:{type:"text",placeholder:"Quantity"},domProps:{value:t.currentQuantity},on:{input:function(n){return t.onInputChangeDebounced("currentQuantity",n.target.value)}}}),n("div",{staticClass:"value-title"},[t._v("Quantity:")]),n("div",[t._v(t._s(t.currentQuantity))])]),n("div",{staticClass:"cart-form__col"},[n("input",{staticClass:"cart-form__input",attrs:{type:"text",placeholder:"Amount"},domProps:{value:t.currentAmount},on:{input:function(n){return t.onInputChangeDebounced("currentAmount",n.target.value)}}}),n("div",{staticClass:"value-title"},[t._v("Amount:")]),n("div",[t._v(t._s(t.currentAmount))])]),n("div",{staticClass:"cart-form__col"},[n("button",{staticClass:"cart-form__btn",attrs:{disabled:t.formInProcess},on:{click:t.sendData}},[t._v(" Send ")]),n("div",{staticClass:"value-title"},[t._v("Saved data:")]),n("div",{staticClass:"cart-form__code"},[t._v(t._s(t.savedDataJSON))])])]),n("div",{staticClass:"cart-form__log"},[n("span",{staticClass:"cart-form__log-title"},[t._v("Logs")]),t.log.length?n("div",t._l(t.log,(function(r,e){return n("p",{key:e+r.message,class:r.status?r.status:""},[t._v(" "+t._s(r.message)+" ")])})),0):n("p",{staticClass:"cart-form__log-placeholder"},[t._v("Events logging")])])])},u=[];function a(t){let n;return function(...r){clearTimeout(n),n=setTimeout(t.bind(this,...r),300)}}function c(t){return new Promise(((n,r)=>{const e=!(t.amount%2),i={success:e,data:e?t:null};setTimeout((()=>{e?n(i):r(i)}),1e3)}))}function s(t,n){window.localStorage.setItem(t,n)}function o(t){return window.localStorage.getItem(t)}const l=["currentPrice","currentQuantity","currentAmount","currentNonce","price","quantity","amount","nonce","log","inputsMutationOrder"];var h={name:"App",data(){return{currentPrice:null,currentQuantity:null,currentAmount:null,currentNonce:0,price:null,quantity:null,amount:null,nonce:null,log:[],inputsMutationOrder:["currentPrice","currentQuantity","currentAmount"],formInProcess:!1}},computed:{earlierMutatedInput(){return this.inputsMutationOrder[2]},calculatingInput(){const t=this.inputsMutationOrder.filter((t=>null===this[t]));return 2===t.length?null:1===t.length?t[0]:this.earlierMutatedInput},savedDataJSON(){return JSON.stringify({nonce:this.nonce,price:this.price,quantity:this.quantity,amount:this.amount})},currentDataJSON(){return JSON.stringify({nonce:this.currentNonce,price:this.currentPrice,quantity:this.currentQuantity,amount:this.currentAmount})}},methods:{calcInputValue(){null!==this.calculatingInput&&this[`${this.calculatingInput}Calc`]()},currentPriceCalc(){""!==this.currentAmount&&""!==this.currentQuantity&&0!==+this.currentQuantity&&(this.currentPrice=this.currentAmount/this.currentQuantity)},currentQuantityCalc(){""!==this.currentAmount&&""!==this.currentPrice&&0!==+this.currentPrice&&(this.currentQuantity=this.currentAmount/this.currentPrice)},currentAmountCalc(){""!==this.currentPrice&&""!==this.currentQuantity&&(this.currentAmount=this.currentPrice*this.currentQuantity)},addLog(t,n){this.log.unshift({message:t,status:n})},sendData(){this.addLog(`Send form data. Payload: ${this.currentDataJSON} Current saved data: ${this.savedDataJSON}`),this.formInProcess=!0,c({nonce:this.currentNonce,price:this.currentPrice,quantity:this.currentQuantity,amount:this.currentAmount}).then((({data:t})=>{this.nonce=t.nonce,this.price=t.price,this.quantity=t.quantity,this.amount=t.amount,this.currentNonce++,this.addLog(`Data saved successfully. New data: ${this.savedDataJSON}`,"success")})).catch((()=>{this.addLog("Error. Try later...","error")})).finally((()=>{this.formInProcess=!1}))},updateMutationOrder(t){this.inputsMutationOrder=this.inputsMutationOrder.filter((n=>n!==t)),this.inputsMutationOrder.unshift(t)},initDataFromStore(){l.forEach((t=>{const n=o(t);null!==n&&(this[t]=JSON.parse(n))}))}},created(){this.onInputChangeDebounced=a(((t,n)=>{this[t]=n,this.updateMutationOrder(t),this.calcInputValue(),this.addLog(`Input ${t} was changed`)})),l.forEach((t=>{this.$watch((n=>n[t]),(n=>{s(t,JSON.stringify(n))}))})),this.initDataFromStore()}},d=h,f=r(1001),p=(0,f.Z)(d,i,u,!1,null,null,null),v=p.exports;e.ZP.config.productionTip=!1,new e.ZP({render:t=>t(v)}).$mount("#app")}},n={};function r(e){var i=n[e];if(void 0!==i)return i.exports;var u=n[e]={exports:{}};return t[e].call(u.exports,u,u.exports,r),u.exports}r.m=t,function(){var t=[];r.O=function(n,e,i,u){if(!e){var a=1/0;for(l=0;l<t.length;l++){e=t[l][0],i=t[l][1],u=t[l][2];for(var c=!0,s=0;s<e.length;s++)(!1&u||a>=u)&&Object.keys(r.O).every((function(t){return r.O[t](e[s])}))?e.splice(s--,1):(c=!1,u<a&&(a=u));if(c){t.splice(l--,1);var o=i();void 0!==o&&(n=o)}}return n}u=u||0;for(var l=t.length;l>0&&t[l-1][2]>u;l--)t[l]=t[l-1];t[l]=[e,i,u]}}(),function(){r.n=function(t){var n=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(n,{a:n}),n}}(),function(){r.d=function(t,n){for(var e in n)r.o(n,e)&&!r.o(t,e)&&Object.defineProperty(t,e,{enumerable:!0,get:n[e]})}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){r.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)}}(),function(){var t={143:0};r.O.j=function(n){return 0===t[n]};var n=function(n,e){var i,u,a=e[0],c=e[1],s=e[2],o=0;if(a.some((function(n){return 0!==t[n]}))){for(i in c)r.o(c,i)&&(r.m[i]=c[i]);if(s)var l=s(r)}for(n&&n(e);o<a.length;o++)u=a[o],r.o(t,u)&&t[u]&&t[u][0](),t[u]=0;return r.O(l)},e=self["webpackChunkch_test"]=self["webpackChunkch_test"]||[];e.forEach(n.bind(null,0)),e.push=n.bind(null,e.push.bind(e))}();var e=r.O(void 0,[998],(function(){return r(6888)}));e=r.O(e)})();
//# sourceMappingURL=app.cf317b1f.js.map