/*! For license information please see main.477235d6.js.LICENSE.txt */
(()=>{var e={43:(e,t,n)=>{"use strict";e.exports=n(202)},153:(e,t,n)=>{"use strict";var r=n(43),i=Symbol.for("react.element"),o=Symbol.for("react.fragment"),a=Object.prototype.hasOwnProperty,s=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,n){var r,o={},c=null,d=null;for(r in void 0!==n&&(c=""+n),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(d=t.ref),t)a.call(t,r)&&!l.hasOwnProperty(r)&&(o[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===o[r]&&(o[r]=t[r]);return{$$typeof:i,type:e,key:c,ref:d,props:o,_owner:s.current}}t.Fragment=o,t.jsx=c,t.jsxs=c},202:(e,t)=>{"use strict";var n=Symbol.for("react.element"),r=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),o=Symbol.for("react.strict_mode"),a=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),l=Symbol.for("react.context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),u=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),h=Symbol.iterator;var f={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},m=Object.assign,g={};function x(e,t,n){this.props=e,this.context=t,this.refs=g,this.updater=n||f}function y(){}function v(e,t,n){this.props=e,this.context=t,this.refs=g,this.updater=n||f}x.prototype.isReactComponent={},x.prototype.setState=function(e,t){if("object"!==typeof e&&"function"!==typeof e&&null!=e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},x.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},y.prototype=x.prototype;var b=v.prototype=new y;b.constructor=v,m(b,x.prototype),b.isPureReactComponent=!0;var w=Array.isArray,k=Object.prototype.hasOwnProperty,j={current:null},S={key:!0,ref:!0,__self:!0,__source:!0};function C(e,t,r){var i,o={},a=null,s=null;if(null!=t)for(i in void 0!==t.ref&&(s=t.ref),void 0!==t.key&&(a=""+t.key),t)k.call(t,i)&&!S.hasOwnProperty(i)&&(o[i]=t[i]);var l=arguments.length-2;if(1===l)o.children=r;else if(1<l){for(var c=Array(l),d=0;d<l;d++)c[d]=arguments[d+2];o.children=c}if(e&&e.defaultProps)for(i in l=e.defaultProps)void 0===o[i]&&(o[i]=l[i]);return{$$typeof:n,type:e,key:a,ref:s,props:o,_owner:j.current}}function P(e){return"object"===typeof e&&null!==e&&e.$$typeof===n}var E=/\/+/g;function T(e,t){return"object"===typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(e){return t[e]})}(""+e.key):t.toString(36)}function z(e,t,i,o,a){var s=typeof e;"undefined"!==s&&"boolean"!==s||(e=null);var l=!1;if(null===e)l=!0;else switch(s){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case n:case r:l=!0}}if(l)return a=a(l=e),e=""===o?"."+T(l,0):o,w(a)?(i="",null!=e&&(i=e.replace(E,"$&/")+"/"),z(a,t,i,"",function(e){return e})):null!=a&&(P(a)&&(a=function(e,t){return{$$typeof:n,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(a,i+(!a.key||l&&l.key===a.key?"":(""+a.key).replace(E,"$&/")+"/")+e)),t.push(a)),1;if(l=0,o=""===o?".":o+":",w(e))for(var c=0;c<e.length;c++){var d=o+T(s=e[c],c);l+=z(s,t,i,d,a)}else if(d=function(e){return null===e||"object"!==typeof e?null:"function"===typeof(e=h&&e[h]||e["@@iterator"])?e:null}(e),"function"===typeof d)for(e=d.call(e),c=0;!(s=e.next()).done;)l+=z(s=s.value,t,i,d=o+T(s,c++),a);else if("object"===s)throw t=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return l}function A(e,t,n){if(null==e)return e;var r=[],i=0;return z(e,r,"","",function(e){return t.call(n,e,i++)}),r}function _(e){if(-1===e._status){var t=e._result;(t=t()).then(function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)},function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)}),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var M={current:null},$={transition:null},N={ReactCurrentDispatcher:M,ReactCurrentBatchConfig:$,ReactCurrentOwner:j};function R(){throw Error("act(...) is not supported in production builds of React.")}t.Children={map:A,forEach:function(e,t,n){A(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return A(e,function(){t++}),t},toArray:function(e){return A(e,function(e){return e})||[]},only:function(e){if(!P(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},t.Component=x,t.Fragment=i,t.Profiler=a,t.PureComponent=v,t.StrictMode=o,t.Suspense=d,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=N,t.act=R,t.cloneElement=function(e,t,r){if(null===e||void 0===e)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var i=m({},e.props),o=e.key,a=e.ref,s=e._owner;if(null!=t){if(void 0!==t.ref&&(a=t.ref,s=j.current),void 0!==t.key&&(o=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(c in t)k.call(t,c)&&!S.hasOwnProperty(c)&&(i[c]=void 0===t[c]&&void 0!==l?l[c]:t[c])}var c=arguments.length-2;if(1===c)i.children=r;else if(1<c){l=Array(c);for(var d=0;d<c;d++)l[d]=arguments[d+2];i.children=l}return{$$typeof:n,type:e.type,key:o,ref:a,props:i,_owner:s}},t.createContext=function(e){return(e={$$typeof:l,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null}).Provider={$$typeof:s,_context:e},e.Consumer=e},t.createElement=C,t.createFactory=function(e){var t=C.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:c,render:e}},t.isValidElement=P,t.lazy=function(e){return{$$typeof:p,_payload:{_status:-1,_result:e},_init:_}},t.memo=function(e,t){return{$$typeof:u,type:e,compare:void 0===t?null:t}},t.startTransition=function(e){var t=$.transition;$.transition={};try{e()}finally{$.transition=t}},t.unstable_act=R,t.useCallback=function(e,t){return M.current.useCallback(e,t)},t.useContext=function(e){return M.current.useContext(e)},t.useDebugValue=function(){},t.useDeferredValue=function(e){return M.current.useDeferredValue(e)},t.useEffect=function(e,t){return M.current.useEffect(e,t)},t.useId=function(){return M.current.useId()},t.useImperativeHandle=function(e,t,n){return M.current.useImperativeHandle(e,t,n)},t.useInsertionEffect=function(e,t){return M.current.useInsertionEffect(e,t)},t.useLayoutEffect=function(e,t){return M.current.useLayoutEffect(e,t)},t.useMemo=function(e,t){return M.current.useMemo(e,t)},t.useReducer=function(e,t,n){return M.current.useReducer(e,t,n)},t.useRef=function(e){return M.current.useRef(e)},t.useState=function(e){return M.current.useState(e)},t.useSyncExternalStore=function(e,t,n){return M.current.useSyncExternalStore(e,t,n)},t.useTransition=function(){return M.current.useTransition()},t.version="18.3.1"},234:(e,t)=>{"use strict";function n(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,i=e[r];if(!(0<o(i,t)))break e;e[r]=t,e[n]=i,n=r}}function r(e){return 0===e.length?null:e[0]}function i(e){if(0===e.length)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,i=e.length,a=i>>>1;r<a;){var s=2*(r+1)-1,l=e[s],c=s+1,d=e[c];if(0>o(l,n))c<i&&0>o(d,l)?(e[r]=d,e[c]=n,r=c):(e[r]=l,e[s]=n,r=s);else{if(!(c<i&&0>o(d,n)))break e;e[r]=d,e[c]=n,r=c}}}return t}function o(e,t){var n=e.sortIndex-t.sortIndex;return 0!==n?n:e.id-t.id}if("object"===typeof performance&&"function"===typeof performance.now){var a=performance;t.unstable_now=function(){return a.now()}}else{var s=Date,l=s.now();t.unstable_now=function(){return s.now()-l}}var c=[],d=[],u=1,p=null,h=3,f=!1,m=!1,g=!1,x="function"===typeof setTimeout?setTimeout:null,y="function"===typeof clearTimeout?clearTimeout:null,v="undefined"!==typeof setImmediate?setImmediate:null;function b(e){for(var t=r(d);null!==t;){if(null===t.callback)i(d);else{if(!(t.startTime<=e))break;i(d),t.sortIndex=t.expirationTime,n(c,t)}t=r(d)}}function w(e){if(g=!1,b(e),!m)if(null!==r(c))m=!0,$(k);else{var t=r(d);null!==t&&N(w,t.startTime-e)}}function k(e,n){m=!1,g&&(g=!1,y(P),P=-1),f=!0;var o=h;try{for(b(n),p=r(c);null!==p&&(!(p.expirationTime>n)||e&&!z());){var a=p.callback;if("function"===typeof a){p.callback=null,h=p.priorityLevel;var s=a(p.expirationTime<=n);n=t.unstable_now(),"function"===typeof s?p.callback=s:p===r(c)&&i(c),b(n)}else i(c);p=r(c)}if(null!==p)var l=!0;else{var u=r(d);null!==u&&N(w,u.startTime-n),l=!1}return l}finally{p=null,h=o,f=!1}}"undefined"!==typeof navigator&&void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling);var j,S=!1,C=null,P=-1,E=5,T=-1;function z(){return!(t.unstable_now()-T<E)}function A(){if(null!==C){var e=t.unstable_now();T=e;var n=!0;try{n=C(!0,e)}finally{n?j():(S=!1,C=null)}}else S=!1}if("function"===typeof v)j=function(){v(A)};else if("undefined"!==typeof MessageChannel){var _=new MessageChannel,M=_.port2;_.port1.onmessage=A,j=function(){M.postMessage(null)}}else j=function(){x(A,0)};function $(e){C=e,S||(S=!0,j())}function N(e,n){P=x(function(){e(t.unstable_now())},n)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(e){e.callback=null},t.unstable_continueExecution=function(){m||f||(m=!0,$(k))},t.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):E=0<e?Math.floor(1e3/e):5},t.unstable_getCurrentPriorityLevel=function(){return h},t.unstable_getFirstCallbackNode=function(){return r(c)},t.unstable_next=function(e){switch(h){case 1:case 2:case 3:var t=3;break;default:t=h}var n=h;h=t;try{return e()}finally{h=n}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=h;h=e;try{return t()}finally{h=n}},t.unstable_scheduleCallback=function(e,i,o){var a=t.unstable_now();switch("object"===typeof o&&null!==o?o="number"===typeof(o=o.delay)&&0<o?a+o:a:o=a,e){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return e={id:u++,callback:i,priorityLevel:e,startTime:o,expirationTime:s=o+s,sortIndex:-1},o>a?(e.sortIndex=o,n(d,e),null===r(c)&&e===r(d)&&(g?(y(P),P=-1):g=!0,N(w,o-a))):(e.sortIndex=s,n(c,e),m||f||(m=!0,$(k))),e},t.unstable_shouldYield=z,t.unstable_wrapCallback=function(e){var t=h;return function(){var n=h;h=t;try{return e.apply(this,arguments)}finally{h=n}}}},324:e=>{e.exports=function(e,t,n,r){var i=n?n.call(r,e,t):void 0;if(void 0!==i)return!!i;if(e===t)return!0;if("object"!==typeof e||!e||"object"!==typeof t||!t)return!1;var o=Object.keys(e),a=Object.keys(t);if(o.length!==a.length)return!1;for(var s=Object.prototype.hasOwnProperty.bind(t),l=0;l<o.length;l++){var c=o[l];if(!s(c))return!1;var d=e[c],u=t[c];if(!1===(i=n?n.call(r,d,u,c):void 0)||void 0===i&&d!==u)return!1}return!0}},391:(e,t,n)=>{"use strict";var r=n(950);t.createRoot=r.createRoot,t.hydrateRoot=r.hydrateRoot},579:(e,t,n)=>{"use strict";e.exports=n(153)},730:(e,t,n)=>{"use strict";var r=n(43),i=n(853);function o(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var a=new Set,s={};function l(e,t){c(e,t),c(e+"Capture",t)}function c(e,t){for(s[e]=t,e=0;e<t.length;e++)a.add(t[e])}var d=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),u=Object.prototype.hasOwnProperty,p=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,h={},f={};function m(e,t,n,r,i,o,a){this.acceptsBooleans=2===t||3===t||4===t,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=a}var g={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){g[e]=new m(e,0,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];g[t]=new m(t,1,!1,e[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){g[e]=new m(e,2,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){g[e]=new m(e,2,!1,e,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){g[e]=new m(e,3,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){g[e]=new m(e,3,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){g[e]=new m(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){g[e]=new m(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){g[e]=new m(e,5,!1,e.toLowerCase(),null,!1,!1)});var x=/[\-:]([a-z])/g;function y(e){return e[1].toUpperCase()}function v(e,t,n,r){var i=g.hasOwnProperty(t)?g[t]:null;(null!==i?0!==i.type:r||!(2<t.length)||"o"!==t[0]&&"O"!==t[0]||"n"!==t[1]&&"N"!==t[1])&&(function(e,t,n,r){if(null===t||"undefined"===typeof t||function(e,t,n,r){if(null!==n&&0===n.type)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return!r&&(null!==n?!n.acceptsBooleans:"data-"!==(e=e.toLowerCase().slice(0,5))&&"aria-"!==e);default:return!1}}(e,t,n,r))return!0;if(r)return!1;if(null!==n)switch(n.type){case 3:return!t;case 4:return!1===t;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}(t,n,i,r)&&(n=null),r||null===i?function(e){return!!u.call(f,e)||!u.call(h,e)&&(p.test(e)?f[e]=!0:(h[e]=!0,!1))}(t)&&(null===n?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=null===n?3!==i.type&&"":n:(t=i.attributeName,r=i.attributeNamespace,null===n?e.removeAttribute(t):(n=3===(i=i.type)||4===i&&!0===n?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(x,y);g[t]=new m(t,1,!1,e,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(x,y);g[t]=new m(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(x,y);g[t]=new m(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){g[e]=new m(e,1,!1,e.toLowerCase(),null,!1,!1)}),g.xlinkHref=new m("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){g[e]=new m(e,1,!1,e.toLowerCase(),null,!0,!0)});var b=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,w=Symbol.for("react.element"),k=Symbol.for("react.portal"),j=Symbol.for("react.fragment"),S=Symbol.for("react.strict_mode"),C=Symbol.for("react.profiler"),P=Symbol.for("react.provider"),E=Symbol.for("react.context"),T=Symbol.for("react.forward_ref"),z=Symbol.for("react.suspense"),A=Symbol.for("react.suspense_list"),_=Symbol.for("react.memo"),M=Symbol.for("react.lazy");Symbol.for("react.scope"),Symbol.for("react.debug_trace_mode");var $=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden"),Symbol.for("react.cache"),Symbol.for("react.tracing_marker");var N=Symbol.iterator;function R(e){return null===e||"object"!==typeof e?null:"function"===typeof(e=N&&e[N]||e["@@iterator"])?e:null}var L,D=Object.assign;function F(e){if(void 0===L)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);L=t&&t[1]||""}return"\n"+L+e}var O=!1;function I(e,t){if(!e||O)return"";O=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var r=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){r=c}e.call(t.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&"string"===typeof c.stack){for(var i=c.stack.split("\n"),o=r.stack.split("\n"),a=i.length-1,s=o.length-1;1<=a&&0<=s&&i[a]!==o[s];)s--;for(;1<=a&&0<=s;a--,s--)if(i[a]!==o[s]){if(1!==a||1!==s)do{if(a--,0>--s||i[a]!==o[s]){var l="\n"+i[a].replace(" at new "," at ");return e.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",e.displayName)),l}}while(1<=a&&0<=s);break}}}finally{O=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?F(e):""}function B(e){switch(e.tag){case 5:return F(e.type);case 16:return F("Lazy");case 13:return F("Suspense");case 19:return F("SuspenseList");case 0:case 2:case 15:return e=I(e.type,!1);case 11:return e=I(e.type.render,!1);case 1:return e=I(e.type,!0);default:return""}}function V(e){if(null==e)return null;if("function"===typeof e)return e.displayName||e.name||null;if("string"===typeof e)return e;switch(e){case j:return"Fragment";case k:return"Portal";case C:return"Profiler";case S:return"StrictMode";case z:return"Suspense";case A:return"SuspenseList"}if("object"===typeof e)switch(e.$$typeof){case E:return(e.displayName||"Context")+".Consumer";case P:return(e._context.displayName||"Context")+".Provider";case T:var t=e.render;return(e=e.displayName)||(e=""!==(e=t.displayName||t.name||"")?"ForwardRef("+e+")":"ForwardRef"),e;case _:return null!==(t=e.displayName||null)?t:V(e.type)||"Memo";case M:t=e._payload,e=e._init;try{return V(e(t))}catch(n){}}return null}function U(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=(e=t.render).displayName||e.name||"",t.displayName||(""!==e?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return V(t);case 8:return t===S?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if("function"===typeof t)return t.displayName||t.name||null;if("string"===typeof t)return t}return null}function H(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":case"object":return e;default:return""}}function W(e){var t=e.type;return(e=e.nodeName)&&"input"===e.toLowerCase()&&("checkbox"===t||"radio"===t)}function q(e){e._valueTracker||(e._valueTracker=function(e){var t=W(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&"undefined"!==typeof n&&"function"===typeof n.get&&"function"===typeof n.set){var i=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){r=""+e,o.call(this,e)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(e){r=""+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}(e))}function Y(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=W(e)?e.checked?"true":"false":e.value),(e=r)!==n&&(t.setValue(e),!0)}function G(e){if("undefined"===typeof(e=e||("undefined"!==typeof document?document:void 0)))return null;try{return e.activeElement||e.body}catch(t){return e.body}}function K(e,t){var n=t.checked;return D({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=n?n:e._wrapperState.initialChecked})}function Q(e,t){var n=null==t.defaultValue?"":t.defaultValue,r=null!=t.checked?t.checked:t.defaultChecked;n=H(null!=t.value?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:"checkbox"===t.type||"radio"===t.type?null!=t.checked:null!=t.value}}function X(e,t){null!=(t=t.checked)&&v(e,"checked",t,!1)}function Z(e,t){X(e,t);var n=H(t.value),r=t.type;if(null!=n)"number"===r?(0===n&&""===e.value||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if("submit"===r||"reset"===r)return void e.removeAttribute("value");t.hasOwnProperty("value")?ee(e,t.type,n):t.hasOwnProperty("defaultValue")&&ee(e,t.type,H(t.defaultValue)),null==t.checked&&null!=t.defaultChecked&&(e.defaultChecked=!!t.defaultChecked)}function J(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!("submit"!==r&&"reset"!==r||void 0!==t.value&&null!==t.value))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}""!==(n=e.name)&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,""!==n&&(e.name=n)}function ee(e,t,n){"number"===t&&G(e.ownerDocument)===e||(null==n?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var te=Array.isArray;function ne(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+H(n),t=null,i=0;i<e.length;i++){if(e[i].value===n)return e[i].selected=!0,void(r&&(e[i].defaultSelected=!0));null!==t||e[i].disabled||(t=e[i])}null!==t&&(t.selected=!0)}}function re(e,t){if(null!=t.dangerouslySetInnerHTML)throw Error(o(91));return D({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ie(e,t){var n=t.value;if(null==n){if(n=t.children,t=t.defaultValue,null!=n){if(null!=t)throw Error(o(92));if(te(n)){if(1<n.length)throw Error(o(93));n=n[0]}t=n}null==t&&(t=""),n=t}e._wrapperState={initialValue:H(n)}}function oe(e,t){var n=H(t.value),r=H(t.defaultValue);null!=n&&((n=""+n)!==e.value&&(e.value=n),null==t.defaultValue&&e.defaultValue!==n&&(e.defaultValue=n)),null!=r&&(e.defaultValue=""+r)}function ae(e){var t=e.textContent;t===e._wrapperState.initialValue&&""!==t&&null!==t&&(e.value=t)}function se(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function le(e,t){return null==e||"http://www.w3.org/1999/xhtml"===e?se(t):"http://www.w3.org/2000/svg"===e&&"foreignObject"===t?"http://www.w3.org/1999/xhtml":e}var ce,de,ue=(de=function(e,t){if("http://www.w3.org/2000/svg"!==e.namespaceURI||"innerHTML"in e)e.innerHTML=t;else{for((ce=ce||document.createElement("div")).innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=ce.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}},"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(e,t,n,r){MSApp.execUnsafeLocalFunction(function(){return de(e,t)})}:de);function pe(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&3===n.nodeType)return void(n.nodeValue=t)}e.textContent=t}var he={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},fe=["Webkit","ms","Moz","O"];function me(e,t,n){return null==t||"boolean"===typeof t||""===t?"":n||"number"!==typeof t||0===t||he.hasOwnProperty(e)&&he[e]?(""+t).trim():t+"px"}function ge(e,t){for(var n in e=e.style,t)if(t.hasOwnProperty(n)){var r=0===n.indexOf("--"),i=me(n,t[n],r);"float"===n&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}Object.keys(he).forEach(function(e){fe.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),he[t]=he[e]})});var xe=D({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ye(e,t){if(t){if(xe[e]&&(null!=t.children||null!=t.dangerouslySetInnerHTML))throw Error(o(137,e));if(null!=t.dangerouslySetInnerHTML){if(null!=t.children)throw Error(o(60));if("object"!==typeof t.dangerouslySetInnerHTML||!("__html"in t.dangerouslySetInnerHTML))throw Error(o(61))}if(null!=t.style&&"object"!==typeof t.style)throw Error(o(62))}}function ve(e,t){if(-1===e.indexOf("-"))return"string"===typeof t.is;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var be=null;function we(e){return(e=e.target||e.srcElement||window).correspondingUseElement&&(e=e.correspondingUseElement),3===e.nodeType?e.parentNode:e}var ke=null,je=null,Se=null;function Ce(e){if(e=vi(e)){if("function"!==typeof ke)throw Error(o(280));var t=e.stateNode;t&&(t=wi(t),ke(e.stateNode,e.type,t))}}function Pe(e){je?Se?Se.push(e):Se=[e]:je=e}function Ee(){if(je){var e=je,t=Se;if(Se=je=null,Ce(e),t)for(e=0;e<t.length;e++)Ce(t[e])}}function Te(e,t){return e(t)}function ze(){}var Ae=!1;function _e(e,t,n){if(Ae)return e(t,n);Ae=!0;try{return Te(e,t,n)}finally{Ae=!1,(null!==je||null!==Se)&&(ze(),Ee())}}function Me(e,t){var n=e.stateNode;if(null===n)return null;var r=wi(n);if(null===r)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(r=!("button"===(e=e.type)||"input"===e||"select"===e||"textarea"===e)),e=!r;break e;default:e=!1}if(e)return null;if(n&&"function"!==typeof n)throw Error(o(231,t,typeof n));return n}var $e=!1;if(d)try{var Ne={};Object.defineProperty(Ne,"passive",{get:function(){$e=!0}}),window.addEventListener("test",Ne,Ne),window.removeEventListener("test",Ne,Ne)}catch(de){$e=!1}function Re(e,t,n,r,i,o,a,s,l){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(d){this.onError(d)}}var Le=!1,De=null,Fe=!1,Oe=null,Ie={onError:function(e){Le=!0,De=e}};function Be(e,t,n,r,i,o,a,s,l){Le=!1,De=null,Re.apply(Ie,arguments)}function Ve(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do{0!==(4098&(t=e).flags)&&(n=t.return),e=t.return}while(e)}return 3===t.tag?n:null}function Ue(e){if(13===e.tag){var t=e.memoizedState;if(null===t&&(null!==(e=e.alternate)&&(t=e.memoizedState)),null!==t)return t.dehydrated}return null}function He(e){if(Ve(e)!==e)throw Error(o(188))}function We(e){return null!==(e=function(e){var t=e.alternate;if(!t){if(null===(t=Ve(e)))throw Error(o(188));return t!==e?null:e}for(var n=e,r=t;;){var i=n.return;if(null===i)break;var a=i.alternate;if(null===a){if(null!==(r=i.return)){n=r;continue}break}if(i.child===a.child){for(a=i.child;a;){if(a===n)return He(i),e;if(a===r)return He(i),t;a=a.sibling}throw Error(o(188))}if(n.return!==r.return)n=i,r=a;else{for(var s=!1,l=i.child;l;){if(l===n){s=!0,n=i,r=a;break}if(l===r){s=!0,r=i,n=a;break}l=l.sibling}if(!s){for(l=a.child;l;){if(l===n){s=!0,n=a,r=i;break}if(l===r){s=!0,r=a,n=i;break}l=l.sibling}if(!s)throw Error(o(189))}}if(n.alternate!==r)throw Error(o(190))}if(3!==n.tag)throw Error(o(188));return n.stateNode.current===n?e:t}(e))?qe(e):null}function qe(e){if(5===e.tag||6===e.tag)return e;for(e=e.child;null!==e;){var t=qe(e);if(null!==t)return t;e=e.sibling}return null}var Ye=i.unstable_scheduleCallback,Ge=i.unstable_cancelCallback,Ke=i.unstable_shouldYield,Qe=i.unstable_requestPaint,Xe=i.unstable_now,Ze=i.unstable_getCurrentPriorityLevel,Je=i.unstable_ImmediatePriority,et=i.unstable_UserBlockingPriority,tt=i.unstable_NormalPriority,nt=i.unstable_LowPriority,rt=i.unstable_IdlePriority,it=null,ot=null;var at=Math.clz32?Math.clz32:function(e){return e>>>=0,0===e?32:31-(st(e)/lt|0)|0},st=Math.log,lt=Math.LN2;var ct=64,dt=4194304;function ut(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return 4194240&e;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return 130023424&e;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function pt(e,t){var n=e.pendingLanes;if(0===n)return 0;var r=0,i=e.suspendedLanes,o=e.pingedLanes,a=268435455&n;if(0!==a){var s=a&~i;0!==s?r=ut(s):0!==(o&=a)&&(r=ut(o))}else 0!==(a=n&~i)?r=ut(a):0!==o&&(r=ut(o));if(0===r)return 0;if(0!==t&&t!==r&&0===(t&i)&&((i=r&-r)>=(o=t&-t)||16===i&&0!==(4194240&o)))return t;if(0!==(4&r)&&(r|=16&n),0!==(t=e.entangledLanes))for(e=e.entanglements,t&=r;0<t;)i=1<<(n=31-at(t)),r|=e[n],t&=~i;return r}function ht(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;default:return-1}}function ft(e){return 0!==(e=-1073741825&e.pendingLanes)?e:1073741824&e?1073741824:0}function mt(){var e=ct;return 0===(4194240&(ct<<=1))&&(ct=64),e}function gt(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function xt(e,t,n){e.pendingLanes|=t,536870912!==t&&(e.suspendedLanes=0,e.pingedLanes=0),(e=e.eventTimes)[t=31-at(t)]=n}function yt(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-at(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}var vt=0;function bt(e){return 1<(e&=-e)?4<e?0!==(268435455&e)?16:536870912:4:1}var wt,kt,jt,St,Ct,Pt=!1,Et=[],Tt=null,zt=null,At=null,_t=new Map,Mt=new Map,$t=[],Nt="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Rt(e,t){switch(e){case"focusin":case"focusout":Tt=null;break;case"dragenter":case"dragleave":zt=null;break;case"mouseover":case"mouseout":At=null;break;case"pointerover":case"pointerout":_t.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Mt.delete(t.pointerId)}}function Lt(e,t,n,r,i,o){return null===e||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[i]},null!==t&&(null!==(t=vi(t))&&kt(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,null!==i&&-1===t.indexOf(i)&&t.push(i),e)}function Dt(e){var t=yi(e.target);if(null!==t){var n=Ve(t);if(null!==n)if(13===(t=n.tag)){if(null!==(t=Ue(n)))return e.blockedOn=t,void Ct(e.priority,function(){jt(n)})}else if(3===t&&n.stateNode.current.memoizedState.isDehydrated)return void(e.blockedOn=3===n.tag?n.stateNode.containerInfo:null)}e.blockedOn=null}function Ft(e){if(null!==e.blockedOn)return!1;for(var t=e.targetContainers;0<t.length;){var n=Kt(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(null!==n)return null!==(t=vi(n))&&kt(t),e.blockedOn=n,!1;var r=new(n=e.nativeEvent).constructor(n.type,n);be=r,n.target.dispatchEvent(r),be=null,t.shift()}return!0}function Ot(e,t,n){Ft(e)&&n.delete(t)}function It(){Pt=!1,null!==Tt&&Ft(Tt)&&(Tt=null),null!==zt&&Ft(zt)&&(zt=null),null!==At&&Ft(At)&&(At=null),_t.forEach(Ot),Mt.forEach(Ot)}function Bt(e,t){e.blockedOn===t&&(e.blockedOn=null,Pt||(Pt=!0,i.unstable_scheduleCallback(i.unstable_NormalPriority,It)))}function Vt(e){function t(t){return Bt(t,e)}if(0<Et.length){Bt(Et[0],e);for(var n=1;n<Et.length;n++){var r=Et[n];r.blockedOn===e&&(r.blockedOn=null)}}for(null!==Tt&&Bt(Tt,e),null!==zt&&Bt(zt,e),null!==At&&Bt(At,e),_t.forEach(t),Mt.forEach(t),n=0;n<$t.length;n++)(r=$t[n]).blockedOn===e&&(r.blockedOn=null);for(;0<$t.length&&null===(n=$t[0]).blockedOn;)Dt(n),null===n.blockedOn&&$t.shift()}var Ut=b.ReactCurrentBatchConfig,Ht=!0;function Wt(e,t,n,r){var i=vt,o=Ut.transition;Ut.transition=null;try{vt=1,Yt(e,t,n,r)}finally{vt=i,Ut.transition=o}}function qt(e,t,n,r){var i=vt,o=Ut.transition;Ut.transition=null;try{vt=4,Yt(e,t,n,r)}finally{vt=i,Ut.transition=o}}function Yt(e,t,n,r){if(Ht){var i=Kt(e,t,n,r);if(null===i)Hr(e,t,r,Gt,n),Rt(e,r);else if(function(e,t,n,r,i){switch(t){case"focusin":return Tt=Lt(Tt,e,t,n,r,i),!0;case"dragenter":return zt=Lt(zt,e,t,n,r,i),!0;case"mouseover":return At=Lt(At,e,t,n,r,i),!0;case"pointerover":var o=i.pointerId;return _t.set(o,Lt(_t.get(o)||null,e,t,n,r,i)),!0;case"gotpointercapture":return o=i.pointerId,Mt.set(o,Lt(Mt.get(o)||null,e,t,n,r,i)),!0}return!1}(i,e,t,n,r))r.stopPropagation();else if(Rt(e,r),4&t&&-1<Nt.indexOf(e)){for(;null!==i;){var o=vi(i);if(null!==o&&wt(o),null===(o=Kt(e,t,n,r))&&Hr(e,t,r,Gt,n),o===i)break;i=o}null!==i&&r.stopPropagation()}else Hr(e,t,r,null,n)}}var Gt=null;function Kt(e,t,n,r){if(Gt=null,null!==(e=yi(e=we(r))))if(null===(t=Ve(e)))e=null;else if(13===(n=t.tag)){if(null!==(e=Ue(t)))return e;e=null}else if(3===n){if(t.stateNode.current.memoizedState.isDehydrated)return 3===t.tag?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Gt=e,null}function Qt(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Ze()){case Je:return 1;case et:return 4;case tt:case nt:return 16;case rt:return 536870912;default:return 16}default:return 16}}var Xt=null,Zt=null,Jt=null;function en(){if(Jt)return Jt;var e,t,n=Zt,r=n.length,i="value"in Xt?Xt.value:Xt.textContent,o=i.length;for(e=0;e<r&&n[e]===i[e];e++);var a=r-e;for(t=1;t<=a&&n[r-t]===i[o-t];t++);return Jt=i.slice(e,1<t?1-t:void 0)}function tn(e){var t=e.keyCode;return"charCode"in e?0===(e=e.charCode)&&13===t&&(e=13):e=t,10===e&&(e=13),32<=e||13===e?e:0}function nn(){return!0}function rn(){return!1}function on(e){function t(t,n,r,i,o){for(var a in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=o,this.currentTarget=null,e)e.hasOwnProperty(a)&&(t=e[a],this[a]=t?t(i):i[a]);return this.isDefaultPrevented=(null!=i.defaultPrevented?i.defaultPrevented:!1===i.returnValue)?nn:rn,this.isPropagationStopped=rn,this}return D(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():"unknown"!==typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=nn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():"unknown"!==typeof e.cancelBubble&&(e.cancelBubble=!0),this.isPropagationStopped=nn)},persist:function(){},isPersistent:nn}),t}var an,sn,ln,cn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},dn=on(cn),un=D({},cn,{view:0,detail:0}),pn=on(un),hn=D({},un,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Cn,button:0,buttons:0,relatedTarget:function(e){return void 0===e.relatedTarget?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==ln&&(ln&&"mousemove"===e.type?(an=e.screenX-ln.screenX,sn=e.screenY-ln.screenY):sn=an=0,ln=e),an)},movementY:function(e){return"movementY"in e?e.movementY:sn}}),fn=on(hn),mn=on(D({},hn,{dataTransfer:0})),gn=on(D({},un,{relatedTarget:0})),xn=on(D({},cn,{animationName:0,elapsedTime:0,pseudoElement:0})),yn=D({},cn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),vn=on(yn),bn=on(D({},cn,{data:0})),wn={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},kn={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},jn={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Sn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):!!(e=jn[e])&&!!t[e]}function Cn(){return Sn}var Pn=D({},un,{key:function(e){if(e.key){var t=wn[e.key]||e.key;if("Unidentified"!==t)return t}return"keypress"===e.type?13===(e=tn(e))?"Enter":String.fromCharCode(e):"keydown"===e.type||"keyup"===e.type?kn[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Cn,charCode:function(e){return"keypress"===e.type?tn(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?tn(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}}),En=on(Pn),Tn=on(D({},hn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),zn=on(D({},un,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Cn})),An=on(D({},cn,{propertyName:0,elapsedTime:0,pseudoElement:0})),_n=D({},hn,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Mn=on(_n),$n=[9,13,27,32],Nn=d&&"CompositionEvent"in window,Rn=null;d&&"documentMode"in document&&(Rn=document.documentMode);var Ln=d&&"TextEvent"in window&&!Rn,Dn=d&&(!Nn||Rn&&8<Rn&&11>=Rn),Fn=String.fromCharCode(32),On=!1;function In(e,t){switch(e){case"keyup":return-1!==$n.indexOf(t.keyCode);case"keydown":return 229!==t.keyCode;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Bn(e){return"object"===typeof(e=e.detail)&&"data"in e?e.data:null}var Vn=!1;var Un={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Hn(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return"input"===t?!!Un[e.type]:"textarea"===t}function Wn(e,t,n,r){Pe(r),0<(t=qr(t,"onChange")).length&&(n=new dn("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var qn=null,Yn=null;function Gn(e){Fr(e,0)}function Kn(e){if(Y(bi(e)))return e}function Qn(e,t){if("change"===e)return t}var Xn=!1;if(d){var Zn;if(d){var Jn="oninput"in document;if(!Jn){var er=document.createElement("div");er.setAttribute("oninput","return;"),Jn="function"===typeof er.oninput}Zn=Jn}else Zn=!1;Xn=Zn&&(!document.documentMode||9<document.documentMode)}function tr(){qn&&(qn.detachEvent("onpropertychange",nr),Yn=qn=null)}function nr(e){if("value"===e.propertyName&&Kn(Yn)){var t=[];Wn(t,Yn,e,we(e)),_e(Gn,t)}}function rr(e,t,n){"focusin"===e?(tr(),Yn=n,(qn=t).attachEvent("onpropertychange",nr)):"focusout"===e&&tr()}function ir(e){if("selectionchange"===e||"keyup"===e||"keydown"===e)return Kn(Yn)}function or(e,t){if("click"===e)return Kn(t)}function ar(e,t){if("input"===e||"change"===e)return Kn(t)}var sr="function"===typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e===1/t)||e!==e&&t!==t};function lr(e,t){if(sr(e,t))return!0;if("object"!==typeof e||null===e||"object"!==typeof t||null===t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!u.call(t,i)||!sr(e[i],t[i]))return!1}return!0}function cr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function dr(e,t){var n,r=cr(e);for(e=0;r;){if(3===r.nodeType){if(n=e+r.textContent.length,e<=t&&n>=t)return{node:r,offset:t-e};e=n}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=cr(r)}}function ur(e,t){return!(!e||!t)&&(e===t||(!e||3!==e.nodeType)&&(t&&3===t.nodeType?ur(e,t.parentNode):"contains"in e?e.contains(t):!!e.compareDocumentPosition&&!!(16&e.compareDocumentPosition(t))))}function pr(){for(var e=window,t=G();t instanceof e.HTMLIFrameElement;){try{var n="string"===typeof t.contentWindow.location.href}catch(r){n=!1}if(!n)break;t=G((e=t.contentWindow).document)}return t}function hr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&("input"===t&&("text"===e.type||"search"===e.type||"tel"===e.type||"url"===e.type||"password"===e.type)||"textarea"===t||"true"===e.contentEditable)}function fr(e){var t=pr(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&ur(n.ownerDocument.documentElement,n)){if(null!==r&&hr(n))if(t=r.start,void 0===(e=r.end)&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if((e=(t=n.ownerDocument||document)&&t.defaultView||window).getSelection){e=e.getSelection();var i=n.textContent.length,o=Math.min(r.start,i);r=void 0===r.end?o:Math.min(r.end,i),!e.extend&&o>r&&(i=r,r=o,o=i),i=dr(n,o);var a=dr(n,r);i&&a&&(1!==e.rangeCount||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==a.node||e.focusOffset!==a.offset)&&((t=t.createRange()).setStart(i.node,i.offset),e.removeAllRanges(),o>r?(e.addRange(t),e.extend(a.node,a.offset)):(t.setEnd(a.node,a.offset),e.addRange(t)))}for(t=[],e=n;e=e.parentNode;)1===e.nodeType&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for("function"===typeof n.focus&&n.focus(),n=0;n<t.length;n++)(e=t[n]).element.scrollLeft=e.left,e.element.scrollTop=e.top}}var mr=d&&"documentMode"in document&&11>=document.documentMode,gr=null,xr=null,yr=null,vr=!1;function br(e,t,n){var r=n.window===n?n.document:9===n.nodeType?n:n.ownerDocument;vr||null==gr||gr!==G(r)||("selectionStart"in(r=gr)&&hr(r)?r={start:r.selectionStart,end:r.selectionEnd}:r={anchorNode:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection()).anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset},yr&&lr(yr,r)||(yr=r,0<(r=qr(xr,"onSelect")).length&&(t=new dn("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=gr)))}function wr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var kr={animationend:wr("Animation","AnimationEnd"),animationiteration:wr("Animation","AnimationIteration"),animationstart:wr("Animation","AnimationStart"),transitionend:wr("Transition","TransitionEnd")},jr={},Sr={};function Cr(e){if(jr[e])return jr[e];if(!kr[e])return e;var t,n=kr[e];for(t in n)if(n.hasOwnProperty(t)&&t in Sr)return jr[e]=n[t];return e}d&&(Sr=document.createElement("div").style,"AnimationEvent"in window||(delete kr.animationend.animation,delete kr.animationiteration.animation,delete kr.animationstart.animation),"TransitionEvent"in window||delete kr.transitionend.transition);var Pr=Cr("animationend"),Er=Cr("animationiteration"),Tr=Cr("animationstart"),zr=Cr("transitionend"),Ar=new Map,_r="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Mr(e,t){Ar.set(e,t),l(t,[e])}for(var $r=0;$r<_r.length;$r++){var Nr=_r[$r];Mr(Nr.toLowerCase(),"on"+(Nr[0].toUpperCase()+Nr.slice(1)))}Mr(Pr,"onAnimationEnd"),Mr(Er,"onAnimationIteration"),Mr(Tr,"onAnimationStart"),Mr("dblclick","onDoubleClick"),Mr("focusin","onFocus"),Mr("focusout","onBlur"),Mr(zr,"onTransitionEnd"),c("onMouseEnter",["mouseout","mouseover"]),c("onMouseLeave",["mouseout","mouseover"]),c("onPointerEnter",["pointerout","pointerover"]),c("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Rr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Lr=new Set("cancel close invalid load scroll toggle".split(" ").concat(Rr));function Dr(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,function(e,t,n,r,i,a,s,l,c){if(Be.apply(this,arguments),Le){if(!Le)throw Error(o(198));var d=De;Le=!1,De=null,Fe||(Fe=!0,Oe=d)}}(r,t,void 0,e),e.currentTarget=null}function Fr(e,t){t=0!==(4&t);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var a=r.length-1;0<=a;a--){var s=r[a],l=s.instance,c=s.currentTarget;if(s=s.listener,l!==o&&i.isPropagationStopped())break e;Dr(i,s,c),o=l}else for(a=0;a<r.length;a++){if(l=(s=r[a]).instance,c=s.currentTarget,s=s.listener,l!==o&&i.isPropagationStopped())break e;Dr(i,s,c),o=l}}}if(Fe)throw e=Oe,Fe=!1,Oe=null,e}function Or(e,t){var n=t[mi];void 0===n&&(n=t[mi]=new Set);var r=e+"__bubble";n.has(r)||(Ur(t,e,2,!1),n.add(r))}function Ir(e,t,n){var r=0;t&&(r|=4),Ur(n,e,r,t)}var Br="_reactListening"+Math.random().toString(36).slice(2);function Vr(e){if(!e[Br]){e[Br]=!0,a.forEach(function(t){"selectionchange"!==t&&(Lr.has(t)||Ir(t,!1,e),Ir(t,!0,e))});var t=9===e.nodeType?e:e.ownerDocument;null===t||t[Br]||(t[Br]=!0,Ir("selectionchange",!1,t))}}function Ur(e,t,n,r){switch(Qt(t)){case 1:var i=Wt;break;case 4:i=qt;break;default:i=Yt}n=i.bind(null,t,n,e),i=void 0,!$e||"touchstart"!==t&&"touchmove"!==t&&"wheel"!==t||(i=!0),r?void 0!==i?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):void 0!==i?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function Hr(e,t,n,r,i){var o=r;if(0===(1&t)&&0===(2&t)&&null!==r)e:for(;;){if(null===r)return;var a=r.tag;if(3===a||4===a){var s=r.stateNode.containerInfo;if(s===i||8===s.nodeType&&s.parentNode===i)break;if(4===a)for(a=r.return;null!==a;){var l=a.tag;if((3===l||4===l)&&((l=a.stateNode.containerInfo)===i||8===l.nodeType&&l.parentNode===i))return;a=a.return}for(;null!==s;){if(null===(a=yi(s)))return;if(5===(l=a.tag)||6===l){r=o=a;continue e}s=s.parentNode}}r=r.return}_e(function(){var r=o,i=we(n),a=[];e:{var s=Ar.get(e);if(void 0!==s){var l=dn,c=e;switch(e){case"keypress":if(0===tn(n))break e;case"keydown":case"keyup":l=En;break;case"focusin":c="focus",l=gn;break;case"focusout":c="blur",l=gn;break;case"beforeblur":case"afterblur":l=gn;break;case"click":if(2===n.button)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":l=fn;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":l=mn;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":l=zn;break;case Pr:case Er:case Tr:l=xn;break;case zr:l=An;break;case"scroll":l=pn;break;case"wheel":l=Mn;break;case"copy":case"cut":case"paste":l=vn;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":l=Tn}var d=0!==(4&t),u=!d&&"scroll"===e,p=d?null!==s?s+"Capture":null:s;d=[];for(var h,f=r;null!==f;){var m=(h=f).stateNode;if(5===h.tag&&null!==m&&(h=m,null!==p&&(null!=(m=Me(f,p))&&d.push(Wr(f,m,h)))),u)break;f=f.return}0<d.length&&(s=new l(s,c,null,n,i),a.push({event:s,listeners:d}))}}if(0===(7&t)){if(l="mouseout"===e||"pointerout"===e,(!(s="mouseover"===e||"pointerover"===e)||n===be||!(c=n.relatedTarget||n.fromElement)||!yi(c)&&!c[fi])&&(l||s)&&(s=i.window===i?i:(s=i.ownerDocument)?s.defaultView||s.parentWindow:window,l?(l=r,null!==(c=(c=n.relatedTarget||n.toElement)?yi(c):null)&&(c!==(u=Ve(c))||5!==c.tag&&6!==c.tag)&&(c=null)):(l=null,c=r),l!==c)){if(d=fn,m="onMouseLeave",p="onMouseEnter",f="mouse","pointerout"!==e&&"pointerover"!==e||(d=Tn,m="onPointerLeave",p="onPointerEnter",f="pointer"),u=null==l?s:bi(l),h=null==c?s:bi(c),(s=new d(m,f+"leave",l,n,i)).target=u,s.relatedTarget=h,m=null,yi(i)===r&&((d=new d(p,f+"enter",c,n,i)).target=h,d.relatedTarget=u,m=d),u=m,l&&c)e:{for(p=c,f=0,h=d=l;h;h=Yr(h))f++;for(h=0,m=p;m;m=Yr(m))h++;for(;0<f-h;)d=Yr(d),f--;for(;0<h-f;)p=Yr(p),h--;for(;f--;){if(d===p||null!==p&&d===p.alternate)break e;d=Yr(d),p=Yr(p)}d=null}else d=null;null!==l&&Gr(a,s,l,d,!1),null!==c&&null!==u&&Gr(a,u,c,d,!0)}if("select"===(l=(s=r?bi(r):window).nodeName&&s.nodeName.toLowerCase())||"input"===l&&"file"===s.type)var g=Qn;else if(Hn(s))if(Xn)g=ar;else{g=ir;var x=rr}else(l=s.nodeName)&&"input"===l.toLowerCase()&&("checkbox"===s.type||"radio"===s.type)&&(g=or);switch(g&&(g=g(e,r))?Wn(a,g,n,i):(x&&x(e,s,r),"focusout"===e&&(x=s._wrapperState)&&x.controlled&&"number"===s.type&&ee(s,"number",s.value)),x=r?bi(r):window,e){case"focusin":(Hn(x)||"true"===x.contentEditable)&&(gr=x,xr=r,yr=null);break;case"focusout":yr=xr=gr=null;break;case"mousedown":vr=!0;break;case"contextmenu":case"mouseup":case"dragend":vr=!1,br(a,n,i);break;case"selectionchange":if(mr)break;case"keydown":case"keyup":br(a,n,i)}var y;if(Nn)e:{switch(e){case"compositionstart":var v="onCompositionStart";break e;case"compositionend":v="onCompositionEnd";break e;case"compositionupdate":v="onCompositionUpdate";break e}v=void 0}else Vn?In(e,n)&&(v="onCompositionEnd"):"keydown"===e&&229===n.keyCode&&(v="onCompositionStart");v&&(Dn&&"ko"!==n.locale&&(Vn||"onCompositionStart"!==v?"onCompositionEnd"===v&&Vn&&(y=en()):(Zt="value"in(Xt=i)?Xt.value:Xt.textContent,Vn=!0)),0<(x=qr(r,v)).length&&(v=new bn(v,e,null,n,i),a.push({event:v,listeners:x}),y?v.data=y:null!==(y=Bn(n))&&(v.data=y))),(y=Ln?function(e,t){switch(e){case"compositionend":return Bn(t);case"keypress":return 32!==t.which?null:(On=!0,Fn);case"textInput":return(e=t.data)===Fn&&On?null:e;default:return null}}(e,n):function(e,t){if(Vn)return"compositionend"===e||!Nn&&In(e,t)?(e=en(),Jt=Zt=Xt=null,Vn=!1,e):null;switch(e){case"paste":default:return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Dn&&"ko"!==t.locale?null:t.data}}(e,n))&&(0<(r=qr(r,"onBeforeInput")).length&&(i=new bn("onBeforeInput","beforeinput",null,n,i),a.push({event:i,listeners:r}),i.data=y))}Fr(a,t)})}function Wr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function qr(e,t){for(var n=t+"Capture",r=[];null!==e;){var i=e,o=i.stateNode;5===i.tag&&null!==o&&(i=o,null!=(o=Me(e,n))&&r.unshift(Wr(e,o,i)),null!=(o=Me(e,t))&&r.push(Wr(e,o,i))),e=e.return}return r}function Yr(e){if(null===e)return null;do{e=e.return}while(e&&5!==e.tag);return e||null}function Gr(e,t,n,r,i){for(var o=t._reactName,a=[];null!==n&&n!==r;){var s=n,l=s.alternate,c=s.stateNode;if(null!==l&&l===r)break;5===s.tag&&null!==c&&(s=c,i?null!=(l=Me(n,o))&&a.unshift(Wr(n,l,s)):i||null!=(l=Me(n,o))&&a.push(Wr(n,l,s))),n=n.return}0!==a.length&&e.push({event:t,listeners:a})}var Kr=/\r\n?/g,Qr=/\u0000|\uFFFD/g;function Xr(e){return("string"===typeof e?e:""+e).replace(Kr,"\n").replace(Qr,"")}function Zr(e,t,n){if(t=Xr(t),Xr(e)!==t&&n)throw Error(o(425))}function Jr(){}var ei=null,ti=null;function ni(e,t){return"textarea"===e||"noscript"===e||"string"===typeof t.children||"number"===typeof t.children||"object"===typeof t.dangerouslySetInnerHTML&&null!==t.dangerouslySetInnerHTML&&null!=t.dangerouslySetInnerHTML.__html}var ri="function"===typeof setTimeout?setTimeout:void 0,ii="function"===typeof clearTimeout?clearTimeout:void 0,oi="function"===typeof Promise?Promise:void 0,ai="function"===typeof queueMicrotask?queueMicrotask:"undefined"!==typeof oi?function(e){return oi.resolve(null).then(e).catch(si)}:ri;function si(e){setTimeout(function(){throw e})}function li(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&8===i.nodeType)if("/$"===(n=i.data)){if(0===r)return e.removeChild(i),void Vt(t);r--}else"$"!==n&&"$?"!==n&&"$!"!==n||r++;n=i}while(n);Vt(t)}function ci(e){for(;null!=e;e=e.nextSibling){var t=e.nodeType;if(1===t||3===t)break;if(8===t){if("$"===(t=e.data)||"$!"===t||"$?"===t)break;if("/$"===t)return null}}return e}function di(e){e=e.previousSibling;for(var t=0;e;){if(8===e.nodeType){var n=e.data;if("$"===n||"$!"===n||"$?"===n){if(0===t)return e;t--}else"/$"===n&&t++}e=e.previousSibling}return null}var ui=Math.random().toString(36).slice(2),pi="__reactFiber$"+ui,hi="__reactProps$"+ui,fi="__reactContainer$"+ui,mi="__reactEvents$"+ui,gi="__reactListeners$"+ui,xi="__reactHandles$"+ui;function yi(e){var t=e[pi];if(t)return t;for(var n=e.parentNode;n;){if(t=n[fi]||n[pi]){if(n=t.alternate,null!==t.child||null!==n&&null!==n.child)for(e=di(e);null!==e;){if(n=e[pi])return n;e=di(e)}return t}n=(e=n).parentNode}return null}function vi(e){return!(e=e[pi]||e[fi])||5!==e.tag&&6!==e.tag&&13!==e.tag&&3!==e.tag?null:e}function bi(e){if(5===e.tag||6===e.tag)return e.stateNode;throw Error(o(33))}function wi(e){return e[hi]||null}var ki=[],ji=-1;function Si(e){return{current:e}}function Ci(e){0>ji||(e.current=ki[ji],ki[ji]=null,ji--)}function Pi(e,t){ji++,ki[ji]=e.current,e.current=t}var Ei={},Ti=Si(Ei),zi=Si(!1),Ai=Ei;function _i(e,t){var n=e.type.contextTypes;if(!n)return Ei;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i,o={};for(i in n)o[i]=t[i];return r&&((e=e.stateNode).__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function Mi(e){return null!==(e=e.childContextTypes)&&void 0!==e}function $i(){Ci(zi),Ci(Ti)}function Ni(e,t,n){if(Ti.current!==Ei)throw Error(o(168));Pi(Ti,t),Pi(zi,n)}function Ri(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,"function"!==typeof r.getChildContext)return n;for(var i in r=r.getChildContext())if(!(i in t))throw Error(o(108,U(e)||"Unknown",i));return D({},n,r)}function Li(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Ei,Ai=Ti.current,Pi(Ti,e),Pi(zi,zi.current),!0}function Di(e,t,n){var r=e.stateNode;if(!r)throw Error(o(169));n?(e=Ri(e,t,Ai),r.__reactInternalMemoizedMergedChildContext=e,Ci(zi),Ci(Ti),Pi(Ti,e)):Ci(zi),Pi(zi,n)}var Fi=null,Oi=!1,Ii=!1;function Bi(e){null===Fi?Fi=[e]:Fi.push(e)}function Vi(){if(!Ii&&null!==Fi){Ii=!0;var e=0,t=vt;try{var n=Fi;for(vt=1;e<n.length;e++){var r=n[e];do{r=r(!0)}while(null!==r)}Fi=null,Oi=!1}catch(i){throw null!==Fi&&(Fi=Fi.slice(e+1)),Ye(Je,Vi),i}finally{vt=t,Ii=!1}}return null}var Ui=[],Hi=0,Wi=null,qi=0,Yi=[],Gi=0,Ki=null,Qi=1,Xi="";function Zi(e,t){Ui[Hi++]=qi,Ui[Hi++]=Wi,Wi=e,qi=t}function Ji(e,t,n){Yi[Gi++]=Qi,Yi[Gi++]=Xi,Yi[Gi++]=Ki,Ki=e;var r=Qi;e=Xi;var i=32-at(r)-1;r&=~(1<<i),n+=1;var o=32-at(t)+i;if(30<o){var a=i-i%5;o=(r&(1<<a)-1).toString(32),r>>=a,i-=a,Qi=1<<32-at(t)+i|n<<i|r,Xi=o+e}else Qi=1<<o|n<<i|r,Xi=e}function eo(e){null!==e.return&&(Zi(e,1),Ji(e,1,0))}function to(e){for(;e===Wi;)Wi=Ui[--Hi],Ui[Hi]=null,qi=Ui[--Hi],Ui[Hi]=null;for(;e===Ki;)Ki=Yi[--Gi],Yi[Gi]=null,Xi=Yi[--Gi],Yi[Gi]=null,Qi=Yi[--Gi],Yi[Gi]=null}var no=null,ro=null,io=!1,oo=null;function ao(e,t){var n=_c(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,null===(t=e.deletions)?(e.deletions=[n],e.flags|=16):t.push(n)}function so(e,t){switch(e.tag){case 5:var n=e.type;return null!==(t=1!==t.nodeType||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t)&&(e.stateNode=t,no=e,ro=ci(t.firstChild),!0);case 6:return null!==(t=""===e.pendingProps||3!==t.nodeType?null:t)&&(e.stateNode=t,no=e,ro=null,!0);case 13:return null!==(t=8!==t.nodeType?null:t)&&(n=null!==Ki?{id:Qi,overflow:Xi}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},(n=_c(18,null,null,0)).stateNode=t,n.return=e,e.child=n,no=e,ro=null,!0);default:return!1}}function lo(e){return 0!==(1&e.mode)&&0===(128&e.flags)}function co(e){if(io){var t=ro;if(t){var n=t;if(!so(e,t)){if(lo(e))throw Error(o(418));t=ci(n.nextSibling);var r=no;t&&so(e,t)?ao(r,n):(e.flags=-4097&e.flags|2,io=!1,no=e)}}else{if(lo(e))throw Error(o(418));e.flags=-4097&e.flags|2,io=!1,no=e}}}function uo(e){for(e=e.return;null!==e&&5!==e.tag&&3!==e.tag&&13!==e.tag;)e=e.return;no=e}function po(e){if(e!==no)return!1;if(!io)return uo(e),io=!0,!1;var t;if((t=3!==e.tag)&&!(t=5!==e.tag)&&(t="head"!==(t=e.type)&&"body"!==t&&!ni(e.type,e.memoizedProps)),t&&(t=ro)){if(lo(e))throw ho(),Error(o(418));for(;t;)ao(e,t),t=ci(t.nextSibling)}if(uo(e),13===e.tag){if(!(e=null!==(e=e.memoizedState)?e.dehydrated:null))throw Error(o(317));e:{for(e=e.nextSibling,t=0;e;){if(8===e.nodeType){var n=e.data;if("/$"===n){if(0===t){ro=ci(e.nextSibling);break e}t--}else"$"!==n&&"$!"!==n&&"$?"!==n||t++}e=e.nextSibling}ro=null}}else ro=no?ci(e.stateNode.nextSibling):null;return!0}function ho(){for(var e=ro;e;)e=ci(e.nextSibling)}function fo(){ro=no=null,io=!1}function mo(e){null===oo?oo=[e]:oo.push(e)}var go=b.ReactCurrentBatchConfig;function xo(e,t,n){if(null!==(e=n.ref)&&"function"!==typeof e&&"object"!==typeof e){if(n._owner){if(n=n._owner){if(1!==n.tag)throw Error(o(309));var r=n.stateNode}if(!r)throw Error(o(147,e));var i=r,a=""+e;return null!==t&&null!==t.ref&&"function"===typeof t.ref&&t.ref._stringRef===a?t.ref:(t=function(e){var t=i.refs;null===e?delete t[a]:t[a]=e},t._stringRef=a,t)}if("string"!==typeof e)throw Error(o(284));if(!n._owner)throw Error(o(290,e))}return e}function yo(e,t){throw e=Object.prototype.toString.call(t),Error(o(31,"[object Object]"===e?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function vo(e){return(0,e._init)(e._payload)}function bo(e){function t(t,n){if(e){var r=t.deletions;null===r?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;null!==r;)t(n,r),r=r.sibling;return null}function r(e,t){for(e=new Map;null!==t;)null!==t.key?e.set(t.key,t):e.set(t.index,t),t=t.sibling;return e}function i(e,t){return(e=$c(e,t)).index=0,e.sibling=null,e}function a(t,n,r){return t.index=r,e?null!==(r=t.alternate)?(r=r.index)<n?(t.flags|=2,n):r:(t.flags|=2,n):(t.flags|=1048576,n)}function s(t){return e&&null===t.alternate&&(t.flags|=2),t}function l(e,t,n,r){return null===t||6!==t.tag?((t=Dc(n,e.mode,r)).return=e,t):((t=i(t,n)).return=e,t)}function c(e,t,n,r){var o=n.type;return o===j?u(e,t,n.props.children,r,n.key):null!==t&&(t.elementType===o||"object"===typeof o&&null!==o&&o.$$typeof===M&&vo(o)===t.type)?((r=i(t,n.props)).ref=xo(e,t,n),r.return=e,r):((r=Nc(n.type,n.key,n.props,null,e.mode,r)).ref=xo(e,t,n),r.return=e,r)}function d(e,t,n,r){return null===t||4!==t.tag||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?((t=Fc(n,e.mode,r)).return=e,t):((t=i(t,n.children||[])).return=e,t)}function u(e,t,n,r,o){return null===t||7!==t.tag?((t=Rc(n,e.mode,r,o)).return=e,t):((t=i(t,n)).return=e,t)}function p(e,t,n){if("string"===typeof t&&""!==t||"number"===typeof t)return(t=Dc(""+t,e.mode,n)).return=e,t;if("object"===typeof t&&null!==t){switch(t.$$typeof){case w:return(n=Nc(t.type,t.key,t.props,null,e.mode,n)).ref=xo(e,null,t),n.return=e,n;case k:return(t=Fc(t,e.mode,n)).return=e,t;case M:return p(e,(0,t._init)(t._payload),n)}if(te(t)||R(t))return(t=Rc(t,e.mode,n,null)).return=e,t;yo(e,t)}return null}function h(e,t,n,r){var i=null!==t?t.key:null;if("string"===typeof n&&""!==n||"number"===typeof n)return null!==i?null:l(e,t,""+n,r);if("object"===typeof n&&null!==n){switch(n.$$typeof){case w:return n.key===i?c(e,t,n,r):null;case k:return n.key===i?d(e,t,n,r):null;case M:return h(e,t,(i=n._init)(n._payload),r)}if(te(n)||R(n))return null!==i?null:u(e,t,n,r,null);yo(e,n)}return null}function f(e,t,n,r,i){if("string"===typeof r&&""!==r||"number"===typeof r)return l(t,e=e.get(n)||null,""+r,i);if("object"===typeof r&&null!==r){switch(r.$$typeof){case w:return c(t,e=e.get(null===r.key?n:r.key)||null,r,i);case k:return d(t,e=e.get(null===r.key?n:r.key)||null,r,i);case M:return f(e,t,n,(0,r._init)(r._payload),i)}if(te(r)||R(r))return u(t,e=e.get(n)||null,r,i,null);yo(t,r)}return null}function m(i,o,s,l){for(var c=null,d=null,u=o,m=o=0,g=null;null!==u&&m<s.length;m++){u.index>m?(g=u,u=null):g=u.sibling;var x=h(i,u,s[m],l);if(null===x){null===u&&(u=g);break}e&&u&&null===x.alternate&&t(i,u),o=a(x,o,m),null===d?c=x:d.sibling=x,d=x,u=g}if(m===s.length)return n(i,u),io&&Zi(i,m),c;if(null===u){for(;m<s.length;m++)null!==(u=p(i,s[m],l))&&(o=a(u,o,m),null===d?c=u:d.sibling=u,d=u);return io&&Zi(i,m),c}for(u=r(i,u);m<s.length;m++)null!==(g=f(u,i,m,s[m],l))&&(e&&null!==g.alternate&&u.delete(null===g.key?m:g.key),o=a(g,o,m),null===d?c=g:d.sibling=g,d=g);return e&&u.forEach(function(e){return t(i,e)}),io&&Zi(i,m),c}function g(i,s,l,c){var d=R(l);if("function"!==typeof d)throw Error(o(150));if(null==(l=d.call(l)))throw Error(o(151));for(var u=d=null,m=s,g=s=0,x=null,y=l.next();null!==m&&!y.done;g++,y=l.next()){m.index>g?(x=m,m=null):x=m.sibling;var v=h(i,m,y.value,c);if(null===v){null===m&&(m=x);break}e&&m&&null===v.alternate&&t(i,m),s=a(v,s,g),null===u?d=v:u.sibling=v,u=v,m=x}if(y.done)return n(i,m),io&&Zi(i,g),d;if(null===m){for(;!y.done;g++,y=l.next())null!==(y=p(i,y.value,c))&&(s=a(y,s,g),null===u?d=y:u.sibling=y,u=y);return io&&Zi(i,g),d}for(m=r(i,m);!y.done;g++,y=l.next())null!==(y=f(m,i,g,y.value,c))&&(e&&null!==y.alternate&&m.delete(null===y.key?g:y.key),s=a(y,s,g),null===u?d=y:u.sibling=y,u=y);return e&&m.forEach(function(e){return t(i,e)}),io&&Zi(i,g),d}return function e(r,o,a,l){if("object"===typeof a&&null!==a&&a.type===j&&null===a.key&&(a=a.props.children),"object"===typeof a&&null!==a){switch(a.$$typeof){case w:e:{for(var c=a.key,d=o;null!==d;){if(d.key===c){if((c=a.type)===j){if(7===d.tag){n(r,d.sibling),(o=i(d,a.props.children)).return=r,r=o;break e}}else if(d.elementType===c||"object"===typeof c&&null!==c&&c.$$typeof===M&&vo(c)===d.type){n(r,d.sibling),(o=i(d,a.props)).ref=xo(r,d,a),o.return=r,r=o;break e}n(r,d);break}t(r,d),d=d.sibling}a.type===j?((o=Rc(a.props.children,r.mode,l,a.key)).return=r,r=o):((l=Nc(a.type,a.key,a.props,null,r.mode,l)).ref=xo(r,o,a),l.return=r,r=l)}return s(r);case k:e:{for(d=a.key;null!==o;){if(o.key===d){if(4===o.tag&&o.stateNode.containerInfo===a.containerInfo&&o.stateNode.implementation===a.implementation){n(r,o.sibling),(o=i(o,a.children||[])).return=r,r=o;break e}n(r,o);break}t(r,o),o=o.sibling}(o=Fc(a,r.mode,l)).return=r,r=o}return s(r);case M:return e(r,o,(d=a._init)(a._payload),l)}if(te(a))return m(r,o,a,l);if(R(a))return g(r,o,a,l);yo(r,a)}return"string"===typeof a&&""!==a||"number"===typeof a?(a=""+a,null!==o&&6===o.tag?(n(r,o.sibling),(o=i(o,a)).return=r,r=o):(n(r,o),(o=Dc(a,r.mode,l)).return=r,r=o),s(r)):n(r,o)}}var wo=bo(!0),ko=bo(!1),jo=Si(null),So=null,Co=null,Po=null;function Eo(){Po=Co=So=null}function To(e){var t=jo.current;Ci(jo),e._currentValue=t}function zo(e,t,n){for(;null!==e;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,null!==r&&(r.childLanes|=t)):null!==r&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Ao(e,t){So=e,Po=Co=null,null!==(e=e.dependencies)&&null!==e.firstContext&&(0!==(e.lanes&t)&&(vs=!0),e.firstContext=null)}function _o(e){var t=e._currentValue;if(Po!==e)if(e={context:e,memoizedValue:t,next:null},null===Co){if(null===So)throw Error(o(308));Co=e,So.dependencies={lanes:0,firstContext:e}}else Co=Co.next=e;return t}var Mo=null;function $o(e){null===Mo?Mo=[e]:Mo.push(e)}function No(e,t,n,r){var i=t.interleaved;return null===i?(n.next=n,$o(t)):(n.next=i.next,i.next=n),t.interleaved=n,Ro(e,r)}function Ro(e,t){e.lanes|=t;var n=e.alternate;for(null!==n&&(n.lanes|=t),n=e,e=e.return;null!==e;)e.childLanes|=t,null!==(n=e.alternate)&&(n.childLanes|=t),n=e,e=e.return;return 3===n.tag?n.stateNode:null}var Lo=!1;function Do(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Fo(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Oo(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Io(e,t,n){var r=e.updateQueue;if(null===r)return null;if(r=r.shared,0!==(2&Tl)){var i=r.pending;return null===i?t.next=t:(t.next=i.next,i.next=t),r.pending=t,Ro(e,n)}return null===(i=r.interleaved)?(t.next=t,$o(r)):(t.next=i.next,i.next=t),r.interleaved=t,Ro(e,n)}function Bo(e,t,n){if(null!==(t=t.updateQueue)&&(t=t.shared,0!==(4194240&n))){var r=t.lanes;n|=r&=e.pendingLanes,t.lanes=n,yt(e,n)}}function Vo(e,t){var n=e.updateQueue,r=e.alternate;if(null!==r&&n===(r=r.updateQueue)){var i=null,o=null;if(null!==(n=n.firstBaseUpdate)){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};null===o?i=o=a:o=o.next=a,n=n.next}while(null!==n);null===o?i=o=t:o=o.next=t}else i=o=t;return n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:o,shared:r.shared,effects:r.effects},void(e.updateQueue=n)}null===(e=n.lastBaseUpdate)?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Uo(e,t,n,r){var i=e.updateQueue;Lo=!1;var o=i.firstBaseUpdate,a=i.lastBaseUpdate,s=i.shared.pending;if(null!==s){i.shared.pending=null;var l=s,c=l.next;l.next=null,null===a?o=c:a.next=c,a=l;var d=e.alternate;null!==d&&((s=(d=d.updateQueue).lastBaseUpdate)!==a&&(null===s?d.firstBaseUpdate=c:s.next=c,d.lastBaseUpdate=l))}if(null!==o){var u=i.baseState;for(a=0,d=c=l=null,s=o;;){var p=s.lane,h=s.eventTime;if((r&p)===p){null!==d&&(d=d.next={eventTime:h,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var f=e,m=s;switch(p=t,h=n,m.tag){case 1:if("function"===typeof(f=m.payload)){u=f.call(h,u,p);break e}u=f;break e;case 3:f.flags=-65537&f.flags|128;case 0:if(null===(p="function"===typeof(f=m.payload)?f.call(h,u,p):f)||void 0===p)break e;u=D({},u,p);break e;case 2:Lo=!0}}null!==s.callback&&0!==s.lane&&(e.flags|=64,null===(p=i.effects)?i.effects=[s]:p.push(s))}else h={eventTime:h,lane:p,tag:s.tag,payload:s.payload,callback:s.callback,next:null},null===d?(c=d=h,l=u):d=d.next=h,a|=p;if(null===(s=s.next)){if(null===(s=i.shared.pending))break;s=(p=s).next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}if(null===d&&(l=u),i.baseState=l,i.firstBaseUpdate=c,i.lastBaseUpdate=d,null!==(t=i.shared.interleaved)){i=t;do{a|=i.lane,i=i.next}while(i!==t)}else null===o&&(i.shared.lanes=0);Ll|=a,e.lanes=a,e.memoizedState=u}}function Ho(e,t,n){if(e=t.effects,t.effects=null,null!==e)for(t=0;t<e.length;t++){var r=e[t],i=r.callback;if(null!==i){if(r.callback=null,r=n,"function"!==typeof i)throw Error(o(191,i));i.call(r)}}}var Wo={},qo=Si(Wo),Yo=Si(Wo),Go=Si(Wo);function Ko(e){if(e===Wo)throw Error(o(174));return e}function Qo(e,t){switch(Pi(Go,t),Pi(Yo,e),Pi(qo,Wo),e=t.nodeType){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:le(null,"");break;default:t=le(t=(e=8===e?t.parentNode:t).namespaceURI||null,e=e.tagName)}Ci(qo),Pi(qo,t)}function Xo(){Ci(qo),Ci(Yo),Ci(Go)}function Zo(e){Ko(Go.current);var t=Ko(qo.current),n=le(t,e.type);t!==n&&(Pi(Yo,e),Pi(qo,n))}function Jo(e){Yo.current===e&&(Ci(qo),Ci(Yo))}var ea=Si(0);function ta(e){for(var t=e;null!==t;){if(13===t.tag){var n=t.memoizedState;if(null!==n&&(null===(n=n.dehydrated)||"$?"===n.data||"$!"===n.data))return t}else if(19===t.tag&&void 0!==t.memoizedProps.revealOrder){if(0!==(128&t.flags))return t}else if(null!==t.child){t.child.return=t,t=t.child;continue}if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var na=[];function ra(){for(var e=0;e<na.length;e++)na[e]._workInProgressVersionPrimary=null;na.length=0}var ia=b.ReactCurrentDispatcher,oa=b.ReactCurrentBatchConfig,aa=0,sa=null,la=null,ca=null,da=!1,ua=!1,pa=0,ha=0;function fa(){throw Error(o(321))}function ma(e,t){if(null===t)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!sr(e[n],t[n]))return!1;return!0}function ga(e,t,n,r,i,a){if(aa=a,sa=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,ia.current=null===e||null===e.memoizedState?Ja:es,e=n(r,i),ua){a=0;do{if(ua=!1,pa=0,25<=a)throw Error(o(301));a+=1,ca=la=null,t.updateQueue=null,ia.current=ts,e=n(r,i)}while(ua)}if(ia.current=Za,t=null!==la&&null!==la.next,aa=0,ca=la=sa=null,da=!1,t)throw Error(o(300));return e}function xa(){var e=0!==pa;return pa=0,e}function ya(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return null===ca?sa.memoizedState=ca=e:ca=ca.next=e,ca}function va(){if(null===la){var e=sa.alternate;e=null!==e?e.memoizedState:null}else e=la.next;var t=null===ca?sa.memoizedState:ca.next;if(null!==t)ca=t,la=e;else{if(null===e)throw Error(o(310));e={memoizedState:(la=e).memoizedState,baseState:la.baseState,baseQueue:la.baseQueue,queue:la.queue,next:null},null===ca?sa.memoizedState=ca=e:ca=ca.next=e}return ca}function ba(e,t){return"function"===typeof t?t(e):t}function wa(e){var t=va(),n=t.queue;if(null===n)throw Error(o(311));n.lastRenderedReducer=e;var r=la,i=r.baseQueue,a=n.pending;if(null!==a){if(null!==i){var s=i.next;i.next=a.next,a.next=s}r.baseQueue=i=a,n.pending=null}if(null!==i){a=i.next,r=r.baseState;var l=s=null,c=null,d=a;do{var u=d.lane;if((aa&u)===u)null!==c&&(c=c.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),r=d.hasEagerState?d.eagerState:e(r,d.action);else{var p={lane:u,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};null===c?(l=c=p,s=r):c=c.next=p,sa.lanes|=u,Ll|=u}d=d.next}while(null!==d&&d!==a);null===c?s=r:c.next=l,sr(r,t.memoizedState)||(vs=!0),t.memoizedState=r,t.baseState=s,t.baseQueue=c,n.lastRenderedState=r}if(null!==(e=n.interleaved)){i=e;do{a=i.lane,sa.lanes|=a,Ll|=a,i=i.next}while(i!==e)}else null===i&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function ka(e){var t=va(),n=t.queue;if(null===n)throw Error(o(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,a=t.memoizedState;if(null!==i){n.pending=null;var s=i=i.next;do{a=e(a,s.action),s=s.next}while(s!==i);sr(a,t.memoizedState)||(vs=!0),t.memoizedState=a,null===t.baseQueue&&(t.baseState=a),n.lastRenderedState=a}return[a,r]}function ja(){}function Sa(e,t){var n=sa,r=va(),i=t(),a=!sr(r.memoizedState,i);if(a&&(r.memoizedState=i,vs=!0),r=r.queue,La(Ea.bind(null,n,r,e),[e]),r.getSnapshot!==t||a||null!==ca&&1&ca.memoizedState.tag){if(n.flags|=2048,_a(9,Pa.bind(null,n,r,i,t),void 0,null),null===zl)throw Error(o(349));0!==(30&aa)||Ca(n,t,i)}return i}function Ca(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},null===(t=sa.updateQueue)?(t={lastEffect:null,stores:null},sa.updateQueue=t,t.stores=[e]):null===(n=t.stores)?t.stores=[e]:n.push(e)}function Pa(e,t,n,r){t.value=n,t.getSnapshot=r,Ta(t)&&za(e)}function Ea(e,t,n){return n(function(){Ta(t)&&za(e)})}function Ta(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!sr(e,n)}catch(r){return!0}}function za(e){var t=Ro(e,1);null!==t&&nc(t,e,1,-1)}function Aa(e){var t=ya();return"function"===typeof e&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ba,lastRenderedState:e},t.queue=e,e=e.dispatch=Ga.bind(null,sa,e),[t.memoizedState,e]}function _a(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},null===(t=sa.updateQueue)?(t={lastEffect:null,stores:null},sa.updateQueue=t,t.lastEffect=e.next=e):null===(n=t.lastEffect)?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function Ma(){return va().memoizedState}function $a(e,t,n,r){var i=ya();sa.flags|=e,i.memoizedState=_a(1|t,n,void 0,void 0===r?null:r)}function Na(e,t,n,r){var i=va();r=void 0===r?null:r;var o=void 0;if(null!==la){var a=la.memoizedState;if(o=a.destroy,null!==r&&ma(r,a.deps))return void(i.memoizedState=_a(t,n,o,r))}sa.flags|=e,i.memoizedState=_a(1|t,n,o,r)}function Ra(e,t){return $a(8390656,8,e,t)}function La(e,t){return Na(2048,8,e,t)}function Da(e,t){return Na(4,2,e,t)}function Fa(e,t){return Na(4,4,e,t)}function Oa(e,t){return"function"===typeof t?(e=e(),t(e),function(){t(null)}):null!==t&&void 0!==t?(e=e(),t.current=e,function(){t.current=null}):void 0}function Ia(e,t,n){return n=null!==n&&void 0!==n?n.concat([e]):null,Na(4,4,Oa.bind(null,t,e),n)}function Ba(){}function Va(e,t){var n=va();t=void 0===t?null:t;var r=n.memoizedState;return null!==r&&null!==t&&ma(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Ua(e,t){var n=va();t=void 0===t?null:t;var r=n.memoizedState;return null!==r&&null!==t&&ma(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Ha(e,t,n){return 0===(21&aa)?(e.baseState&&(e.baseState=!1,vs=!0),e.memoizedState=n):(sr(n,t)||(n=mt(),sa.lanes|=n,Ll|=n,e.baseState=!0),t)}function Wa(e,t){var n=vt;vt=0!==n&&4>n?n:4,e(!0);var r=oa.transition;oa.transition={};try{e(!1),t()}finally{vt=n,oa.transition=r}}function qa(){return va().memoizedState}function Ya(e,t,n){var r=tc(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Ka(e))Qa(t,n);else if(null!==(n=No(e,t,n,r))){nc(n,e,r,ec()),Xa(n,t,r)}}function Ga(e,t,n){var r=tc(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Ka(e))Qa(t,i);else{var o=e.alternate;if(0===e.lanes&&(null===o||0===o.lanes)&&null!==(o=t.lastRenderedReducer))try{var a=t.lastRenderedState,s=o(a,n);if(i.hasEagerState=!0,i.eagerState=s,sr(s,a)){var l=t.interleaved;return null===l?(i.next=i,$o(t)):(i.next=l.next,l.next=i),void(t.interleaved=i)}}catch(c){}null!==(n=No(e,t,i,r))&&(nc(n,e,r,i=ec()),Xa(n,t,r))}}function Ka(e){var t=e.alternate;return e===sa||null!==t&&t===sa}function Qa(e,t){ua=da=!0;var n=e.pending;null===n?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Xa(e,t,n){if(0!==(4194240&n)){var r=t.lanes;n|=r&=e.pendingLanes,t.lanes=n,yt(e,n)}}var Za={readContext:_o,useCallback:fa,useContext:fa,useEffect:fa,useImperativeHandle:fa,useInsertionEffect:fa,useLayoutEffect:fa,useMemo:fa,useReducer:fa,useRef:fa,useState:fa,useDebugValue:fa,useDeferredValue:fa,useTransition:fa,useMutableSource:fa,useSyncExternalStore:fa,useId:fa,unstable_isNewReconciler:!1},Ja={readContext:_o,useCallback:function(e,t){return ya().memoizedState=[e,void 0===t?null:t],e},useContext:_o,useEffect:Ra,useImperativeHandle:function(e,t,n){return n=null!==n&&void 0!==n?n.concat([e]):null,$a(4194308,4,Oa.bind(null,t,e),n)},useLayoutEffect:function(e,t){return $a(4194308,4,e,t)},useInsertionEffect:function(e,t){return $a(4,2,e,t)},useMemo:function(e,t){var n=ya();return t=void 0===t?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=ya();return t=void 0!==n?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Ya.bind(null,sa,e),[r.memoizedState,e]},useRef:function(e){return e={current:e},ya().memoizedState=e},useState:Aa,useDebugValue:Ba,useDeferredValue:function(e){return ya().memoizedState=e},useTransition:function(){var e=Aa(!1),t=e[0];return e=Wa.bind(null,e[1]),ya().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=sa,i=ya();if(io){if(void 0===n)throw Error(o(407));n=n()}else{if(n=t(),null===zl)throw Error(o(349));0!==(30&aa)||Ca(r,t,n)}i.memoizedState=n;var a={value:n,getSnapshot:t};return i.queue=a,Ra(Ea.bind(null,r,a,e),[e]),r.flags|=2048,_a(9,Pa.bind(null,r,a,n,t),void 0,null),n},useId:function(){var e=ya(),t=zl.identifierPrefix;if(io){var n=Xi;t=":"+t+"R"+(n=(Qi&~(1<<32-at(Qi)-1)).toString(32)+n),0<(n=pa++)&&(t+="H"+n.toString(32)),t+=":"}else t=":"+t+"r"+(n=ha++).toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},es={readContext:_o,useCallback:Va,useContext:_o,useEffect:La,useImperativeHandle:Ia,useInsertionEffect:Da,useLayoutEffect:Fa,useMemo:Ua,useReducer:wa,useRef:Ma,useState:function(){return wa(ba)},useDebugValue:Ba,useDeferredValue:function(e){return Ha(va(),la.memoizedState,e)},useTransition:function(){return[wa(ba)[0],va().memoizedState]},useMutableSource:ja,useSyncExternalStore:Sa,useId:qa,unstable_isNewReconciler:!1},ts={readContext:_o,useCallback:Va,useContext:_o,useEffect:La,useImperativeHandle:Ia,useInsertionEffect:Da,useLayoutEffect:Fa,useMemo:Ua,useReducer:ka,useRef:Ma,useState:function(){return ka(ba)},useDebugValue:Ba,useDeferredValue:function(e){var t=va();return null===la?t.memoizedState=e:Ha(t,la.memoizedState,e)},useTransition:function(){return[ka(ba)[0],va().memoizedState]},useMutableSource:ja,useSyncExternalStore:Sa,useId:qa,unstable_isNewReconciler:!1};function ns(e,t){if(e&&e.defaultProps){for(var n in t=D({},t),e=e.defaultProps)void 0===t[n]&&(t[n]=e[n]);return t}return t}function rs(e,t,n,r){n=null===(n=n(r,t=e.memoizedState))||void 0===n?t:D({},t,n),e.memoizedState=n,0===e.lanes&&(e.updateQueue.baseState=n)}var is={isMounted:function(e){return!!(e=e._reactInternals)&&Ve(e)===e},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=ec(),i=tc(e),o=Oo(r,i);o.payload=t,void 0!==n&&null!==n&&(o.callback=n),null!==(t=Io(e,o,i))&&(nc(t,e,i,r),Bo(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=ec(),i=tc(e),o=Oo(r,i);o.tag=1,o.payload=t,void 0!==n&&null!==n&&(o.callback=n),null!==(t=Io(e,o,i))&&(nc(t,e,i,r),Bo(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=ec(),r=tc(e),i=Oo(n,r);i.tag=2,void 0!==t&&null!==t&&(i.callback=t),null!==(t=Io(e,i,r))&&(nc(t,e,r,n),Bo(t,e,r))}};function os(e,t,n,r,i,o,a){return"function"===typeof(e=e.stateNode).shouldComponentUpdate?e.shouldComponentUpdate(r,o,a):!t.prototype||!t.prototype.isPureReactComponent||(!lr(n,r)||!lr(i,o))}function as(e,t,n){var r=!1,i=Ei,o=t.contextType;return"object"===typeof o&&null!==o?o=_o(o):(i=Mi(t)?Ai:Ti.current,o=(r=null!==(r=t.contextTypes)&&void 0!==r)?_i(e,i):Ei),t=new t(n,o),e.memoizedState=null!==t.state&&void 0!==t.state?t.state:null,t.updater=is,e.stateNode=t,t._reactInternals=e,r&&((e=e.stateNode).__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=o),t}function ss(e,t,n,r){e=t.state,"function"===typeof t.componentWillReceiveProps&&t.componentWillReceiveProps(n,r),"function"===typeof t.UNSAFE_componentWillReceiveProps&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&is.enqueueReplaceState(t,t.state,null)}function ls(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},Do(e);var o=t.contextType;"object"===typeof o&&null!==o?i.context=_o(o):(o=Mi(t)?Ai:Ti.current,i.context=_i(e,o)),i.state=e.memoizedState,"function"===typeof(o=t.getDerivedStateFromProps)&&(rs(e,t,o,n),i.state=e.memoizedState),"function"===typeof t.getDerivedStateFromProps||"function"===typeof i.getSnapshotBeforeUpdate||"function"!==typeof i.UNSAFE_componentWillMount&&"function"!==typeof i.componentWillMount||(t=i.state,"function"===typeof i.componentWillMount&&i.componentWillMount(),"function"===typeof i.UNSAFE_componentWillMount&&i.UNSAFE_componentWillMount(),t!==i.state&&is.enqueueReplaceState(i,i.state,null),Uo(e,n,i,r),i.state=e.memoizedState),"function"===typeof i.componentDidMount&&(e.flags|=4194308)}function cs(e,t){try{var n="",r=t;do{n+=B(r),r=r.return}while(r);var i=n}catch(o){i="\nError generating stack: "+o.message+"\n"+o.stack}return{value:e,source:t,stack:i,digest:null}}function ds(e,t,n){return{value:e,source:null,stack:null!=n?n:null,digest:null!=t?t:null}}function us(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var ps="function"===typeof WeakMap?WeakMap:Map;function hs(e,t,n){(n=Oo(-1,n)).tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Hl||(Hl=!0,Wl=r),us(0,t)},n}function fs(e,t,n){(n=Oo(-1,n)).tag=3;var r=e.type.getDerivedStateFromError;if("function"===typeof r){var i=t.value;n.payload=function(){return r(i)},n.callback=function(){us(0,t)}}var o=e.stateNode;return null!==o&&"function"===typeof o.componentDidCatch&&(n.callback=function(){us(0,t),"function"!==typeof r&&(null===ql?ql=new Set([this]):ql.add(this));var e=t.stack;this.componentDidCatch(t.value,{componentStack:null!==e?e:""})}),n}function ms(e,t,n){var r=e.pingCache;if(null===r){r=e.pingCache=new ps;var i=new Set;r.set(t,i)}else void 0===(i=r.get(t))&&(i=new Set,r.set(t,i));i.has(n)||(i.add(n),e=Cc.bind(null,e,t,n),t.then(e,e))}function gs(e){do{var t;if((t=13===e.tag)&&(t=null===(t=e.memoizedState)||null!==t.dehydrated),t)return e;e=e.return}while(null!==e);return null}function xs(e,t,n,r,i){return 0===(1&e.mode)?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,1===n.tag&&(null===n.alternate?n.tag=17:((t=Oo(-1,1)).tag=2,Io(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=i,e)}var ys=b.ReactCurrentOwner,vs=!1;function bs(e,t,n,r){t.child=null===e?ko(t,null,n,r):wo(t,e.child,n,r)}function ws(e,t,n,r,i){n=n.render;var o=t.ref;return Ao(t,i),r=ga(e,t,n,r,o,i),n=xa(),null===e||vs?(io&&n&&eo(t),t.flags|=1,bs(e,t,r,i),t.child):(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Hs(e,t,i))}function ks(e,t,n,r,i){if(null===e){var o=n.type;return"function"!==typeof o||Mc(o)||void 0!==o.defaultProps||null!==n.compare||void 0!==n.defaultProps?((e=Nc(n.type,null,r,t,t.mode,i)).ref=t.ref,e.return=t,t.child=e):(t.tag=15,t.type=o,js(e,t,o,r,i))}if(o=e.child,0===(e.lanes&i)){var a=o.memoizedProps;if((n=null!==(n=n.compare)?n:lr)(a,r)&&e.ref===t.ref)return Hs(e,t,i)}return t.flags|=1,(e=$c(o,r)).ref=t.ref,e.return=t,t.child=e}function js(e,t,n,r,i){if(null!==e){var o=e.memoizedProps;if(lr(o,r)&&e.ref===t.ref){if(vs=!1,t.pendingProps=r=o,0===(e.lanes&i))return t.lanes=e.lanes,Hs(e,t,i);0!==(131072&e.flags)&&(vs=!0)}}return Ps(e,t,n,r,i)}function Ss(e,t,n){var r=t.pendingProps,i=r.children,o=null!==e?e.memoizedState:null;if("hidden"===r.mode)if(0===(1&t.mode))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Pi($l,Ml),Ml|=n;else{if(0===(1073741824&n))return e=null!==o?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Pi($l,Ml),Ml|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=null!==o?o.baseLanes:n,Pi($l,Ml),Ml|=r}else null!==o?(r=o.baseLanes|n,t.memoizedState=null):r=n,Pi($l,Ml),Ml|=r;return bs(e,t,i,n),t.child}function Cs(e,t){var n=t.ref;(null===e&&null!==n||null!==e&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Ps(e,t,n,r,i){var o=Mi(n)?Ai:Ti.current;return o=_i(t,o),Ao(t,i),n=ga(e,t,n,r,o,i),r=xa(),null===e||vs?(io&&r&&eo(t),t.flags|=1,bs(e,t,n,i),t.child):(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Hs(e,t,i))}function Es(e,t,n,r,i){if(Mi(n)){var o=!0;Li(t)}else o=!1;if(Ao(t,i),null===t.stateNode)Us(e,t),as(t,n,r),ls(t,n,r,i),r=!0;else if(null===e){var a=t.stateNode,s=t.memoizedProps;a.props=s;var l=a.context,c=n.contextType;"object"===typeof c&&null!==c?c=_o(c):c=_i(t,c=Mi(n)?Ai:Ti.current);var d=n.getDerivedStateFromProps,u="function"===typeof d||"function"===typeof a.getSnapshotBeforeUpdate;u||"function"!==typeof a.UNSAFE_componentWillReceiveProps&&"function"!==typeof a.componentWillReceiveProps||(s!==r||l!==c)&&ss(t,a,r,c),Lo=!1;var p=t.memoizedState;a.state=p,Uo(t,r,a,i),l=t.memoizedState,s!==r||p!==l||zi.current||Lo?("function"===typeof d&&(rs(t,n,d,r),l=t.memoizedState),(s=Lo||os(t,n,s,r,p,l,c))?(u||"function"!==typeof a.UNSAFE_componentWillMount&&"function"!==typeof a.componentWillMount||("function"===typeof a.componentWillMount&&a.componentWillMount(),"function"===typeof a.UNSAFE_componentWillMount&&a.UNSAFE_componentWillMount()),"function"===typeof a.componentDidMount&&(t.flags|=4194308)):("function"===typeof a.componentDidMount&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=c,r=s):("function"===typeof a.componentDidMount&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Fo(e,t),s=t.memoizedProps,c=t.type===t.elementType?s:ns(t.type,s),a.props=c,u=t.pendingProps,p=a.context,"object"===typeof(l=n.contextType)&&null!==l?l=_o(l):l=_i(t,l=Mi(n)?Ai:Ti.current);var h=n.getDerivedStateFromProps;(d="function"===typeof h||"function"===typeof a.getSnapshotBeforeUpdate)||"function"!==typeof a.UNSAFE_componentWillReceiveProps&&"function"!==typeof a.componentWillReceiveProps||(s!==u||p!==l)&&ss(t,a,r,l),Lo=!1,p=t.memoizedState,a.state=p,Uo(t,r,a,i);var f=t.memoizedState;s!==u||p!==f||zi.current||Lo?("function"===typeof h&&(rs(t,n,h,r),f=t.memoizedState),(c=Lo||os(t,n,c,r,p,f,l)||!1)?(d||"function"!==typeof a.UNSAFE_componentWillUpdate&&"function"!==typeof a.componentWillUpdate||("function"===typeof a.componentWillUpdate&&a.componentWillUpdate(r,f,l),"function"===typeof a.UNSAFE_componentWillUpdate&&a.UNSAFE_componentWillUpdate(r,f,l)),"function"===typeof a.componentDidUpdate&&(t.flags|=4),"function"===typeof a.getSnapshotBeforeUpdate&&(t.flags|=1024)):("function"!==typeof a.componentDidUpdate||s===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),"function"!==typeof a.getSnapshotBeforeUpdate||s===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=f),a.props=r,a.state=f,a.context=l,r=c):("function"!==typeof a.componentDidUpdate||s===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),"function"!==typeof a.getSnapshotBeforeUpdate||s===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),r=!1)}return Ts(e,t,n,r,o,i)}function Ts(e,t,n,r,i,o){Cs(e,t);var a=0!==(128&t.flags);if(!r&&!a)return i&&Di(t,n,!1),Hs(e,t,o);r=t.stateNode,ys.current=t;var s=a&&"function"!==typeof n.getDerivedStateFromError?null:r.render();return t.flags|=1,null!==e&&a?(t.child=wo(t,e.child,null,o),t.child=wo(t,null,s,o)):bs(e,t,s,o),t.memoizedState=r.state,i&&Di(t,n,!0),t.child}function zs(e){var t=e.stateNode;t.pendingContext?Ni(0,t.pendingContext,t.pendingContext!==t.context):t.context&&Ni(0,t.context,!1),Qo(e,t.containerInfo)}function As(e,t,n,r,i){return fo(),mo(i),t.flags|=256,bs(e,t,n,r),t.child}var _s,Ms,$s,Ns,Rs={dehydrated:null,treeContext:null,retryLane:0};function Ls(e){return{baseLanes:e,cachePool:null,transitions:null}}function Ds(e,t,n){var r,i=t.pendingProps,a=ea.current,s=!1,l=0!==(128&t.flags);if((r=l)||(r=(null===e||null!==e.memoizedState)&&0!==(2&a)),r?(s=!0,t.flags&=-129):null!==e&&null===e.memoizedState||(a|=1),Pi(ea,1&a),null===e)return co(t),null!==(e=t.memoizedState)&&null!==(e=e.dehydrated)?(0===(1&t.mode)?t.lanes=1:"$!"===e.data?t.lanes=8:t.lanes=1073741824,null):(l=i.children,e=i.fallback,s?(i=t.mode,s=t.child,l={mode:"hidden",children:l},0===(1&i)&&null!==s?(s.childLanes=0,s.pendingProps=l):s=Lc(l,i,0,null),e=Rc(e,i,n,null),s.return=t,e.return=t,s.sibling=e,t.child=s,t.child.memoizedState=Ls(n),t.memoizedState=Rs,e):Fs(t,l));if(null!==(a=e.memoizedState)&&null!==(r=a.dehydrated))return function(e,t,n,r,i,a,s){if(n)return 256&t.flags?(t.flags&=-257,Os(e,t,s,r=ds(Error(o(422))))):null!==t.memoizedState?(t.child=e.child,t.flags|=128,null):(a=r.fallback,i=t.mode,r=Lc({mode:"visible",children:r.children},i,0,null),(a=Rc(a,i,s,null)).flags|=2,r.return=t,a.return=t,r.sibling=a,t.child=r,0!==(1&t.mode)&&wo(t,e.child,null,s),t.child.memoizedState=Ls(s),t.memoizedState=Rs,a);if(0===(1&t.mode))return Os(e,t,s,null);if("$!"===i.data){if(r=i.nextSibling&&i.nextSibling.dataset)var l=r.dgst;return r=l,Os(e,t,s,r=ds(a=Error(o(419)),r,void 0))}if(l=0!==(s&e.childLanes),vs||l){if(null!==(r=zl)){switch(s&-s){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}0!==(i=0!==(i&(r.suspendedLanes|s))?0:i)&&i!==a.retryLane&&(a.retryLane=i,Ro(e,i),nc(r,e,i,-1))}return mc(),Os(e,t,s,r=ds(Error(o(421))))}return"$?"===i.data?(t.flags|=128,t.child=e.child,t=Ec.bind(null,e),i._reactRetry=t,null):(e=a.treeContext,ro=ci(i.nextSibling),no=t,io=!0,oo=null,null!==e&&(Yi[Gi++]=Qi,Yi[Gi++]=Xi,Yi[Gi++]=Ki,Qi=e.id,Xi=e.overflow,Ki=t),t=Fs(t,r.children),t.flags|=4096,t)}(e,t,l,i,r,a,n);if(s){s=i.fallback,l=t.mode,r=(a=e.child).sibling;var c={mode:"hidden",children:i.children};return 0===(1&l)&&t.child!==a?((i=t.child).childLanes=0,i.pendingProps=c,t.deletions=null):(i=$c(a,c)).subtreeFlags=14680064&a.subtreeFlags,null!==r?s=$c(r,s):(s=Rc(s,l,n,null)).flags|=2,s.return=t,i.return=t,i.sibling=s,t.child=i,i=s,s=t.child,l=null===(l=e.child.memoizedState)?Ls(n):{baseLanes:l.baseLanes|n,cachePool:null,transitions:l.transitions},s.memoizedState=l,s.childLanes=e.childLanes&~n,t.memoizedState=Rs,i}return e=(s=e.child).sibling,i=$c(s,{mode:"visible",children:i.children}),0===(1&t.mode)&&(i.lanes=n),i.return=t,i.sibling=null,null!==e&&(null===(n=t.deletions)?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=i,t.memoizedState=null,i}function Fs(e,t){return(t=Lc({mode:"visible",children:t},e.mode,0,null)).return=e,e.child=t}function Os(e,t,n,r){return null!==r&&mo(r),wo(t,e.child,null,n),(e=Fs(t,t.pendingProps.children)).flags|=2,t.memoizedState=null,e}function Is(e,t,n){e.lanes|=t;var r=e.alternate;null!==r&&(r.lanes|=t),zo(e.return,t,n)}function Bs(e,t,n,r,i){var o=e.memoizedState;null===o?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i)}function Vs(e,t,n){var r=t.pendingProps,i=r.revealOrder,o=r.tail;if(bs(e,t,r.children,n),0!==(2&(r=ea.current)))r=1&r|2,t.flags|=128;else{if(null!==e&&0!==(128&e.flags))e:for(e=t.child;null!==e;){if(13===e.tag)null!==e.memoizedState&&Is(e,n,t);else if(19===e.tag)Is(e,n,t);else if(null!==e.child){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;null===e.sibling;){if(null===e.return||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(Pi(ea,r),0===(1&t.mode))t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;null!==n;)null!==(e=n.alternate)&&null===ta(e)&&(i=n),n=n.sibling;null===(n=i)?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Bs(t,!1,i,n,o);break;case"backwards":for(n=null,i=t.child,t.child=null;null!==i;){if(null!==(e=i.alternate)&&null===ta(e)){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Bs(t,!0,n,null,o);break;case"together":Bs(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Us(e,t){0===(1&t.mode)&&null!==e&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Hs(e,t,n){if(null!==e&&(t.dependencies=e.dependencies),Ll|=t.lanes,0===(n&t.childLanes))return null;if(null!==e&&t.child!==e.child)throw Error(o(153));if(null!==t.child){for(n=$c(e=t.child,e.pendingProps),t.child=n,n.return=t;null!==e.sibling;)e=e.sibling,(n=n.sibling=$c(e,e.pendingProps)).return=t;n.sibling=null}return t.child}function Ws(e,t){if(!io)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;null!==t;)null!==t.alternate&&(n=t),t=t.sibling;null===n?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;null!==n;)null!==n.alternate&&(r=n),n=n.sibling;null===r?t||null===e.tail?e.tail=null:e.tail.sibling=null:r.sibling=null}}function qs(e){var t=null!==e.alternate&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;null!==i;)n|=i.lanes|i.childLanes,r|=14680064&i.subtreeFlags,r|=14680064&i.flags,i.return=e,i=i.sibling;else for(i=e.child;null!==i;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Ys(e,t,n){var r=t.pendingProps;switch(to(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return qs(t),null;case 1:case 17:return Mi(t.type)&&$i(),qs(t),null;case 3:return r=t.stateNode,Xo(),Ci(zi),Ci(Ti),ra(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),null!==e&&null!==e.child||(po(t)?t.flags|=4:null===e||e.memoizedState.isDehydrated&&0===(256&t.flags)||(t.flags|=1024,null!==oo&&(ac(oo),oo=null))),Ms(e,t),qs(t),null;case 5:Jo(t);var i=Ko(Go.current);if(n=t.type,null!==e&&null!=t.stateNode)$s(e,t,n,r,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(null===t.stateNode)throw Error(o(166));return qs(t),null}if(e=Ko(qo.current),po(t)){r=t.stateNode,n=t.type;var a=t.memoizedProps;switch(r[pi]=t,r[hi]=a,e=0!==(1&t.mode),n){case"dialog":Or("cancel",r),Or("close",r);break;case"iframe":case"object":case"embed":Or("load",r);break;case"video":case"audio":for(i=0;i<Rr.length;i++)Or(Rr[i],r);break;case"source":Or("error",r);break;case"img":case"image":case"link":Or("error",r),Or("load",r);break;case"details":Or("toggle",r);break;case"input":Q(r,a),Or("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!a.multiple},Or("invalid",r);break;case"textarea":ie(r,a),Or("invalid",r)}for(var l in ye(n,a),i=null,a)if(a.hasOwnProperty(l)){var c=a[l];"children"===l?"string"===typeof c?r.textContent!==c&&(!0!==a.suppressHydrationWarning&&Zr(r.textContent,c,e),i=["children",c]):"number"===typeof c&&r.textContent!==""+c&&(!0!==a.suppressHydrationWarning&&Zr(r.textContent,c,e),i=["children",""+c]):s.hasOwnProperty(l)&&null!=c&&"onScroll"===l&&Or("scroll",r)}switch(n){case"input":q(r),J(r,a,!0);break;case"textarea":q(r),ae(r);break;case"select":case"option":break;default:"function"===typeof a.onClick&&(r.onclick=Jr)}r=i,t.updateQueue=r,null!==r&&(t.flags|=4)}else{l=9===i.nodeType?i:i.ownerDocument,"http://www.w3.org/1999/xhtml"===e&&(e=se(n)),"http://www.w3.org/1999/xhtml"===e?"script"===n?((e=l.createElement("div")).innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):"string"===typeof r.is?e=l.createElement(n,{is:r.is}):(e=l.createElement(n),"select"===n&&(l=e,r.multiple?l.multiple=!0:r.size&&(l.size=r.size))):e=l.createElementNS(e,n),e[pi]=t,e[hi]=r,_s(e,t,!1,!1),t.stateNode=e;e:{switch(l=ve(n,r),n){case"dialog":Or("cancel",e),Or("close",e),i=r;break;case"iframe":case"object":case"embed":Or("load",e),i=r;break;case"video":case"audio":for(i=0;i<Rr.length;i++)Or(Rr[i],e);i=r;break;case"source":Or("error",e),i=r;break;case"img":case"image":case"link":Or("error",e),Or("load",e),i=r;break;case"details":Or("toggle",e),i=r;break;case"input":Q(e,r),i=K(e,r),Or("invalid",e);break;case"option":default:i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=D({},r,{value:void 0}),Or("invalid",e);break;case"textarea":ie(e,r),i=re(e,r),Or("invalid",e)}for(a in ye(n,i),c=i)if(c.hasOwnProperty(a)){var d=c[a];"style"===a?ge(e,d):"dangerouslySetInnerHTML"===a?null!=(d=d?d.__html:void 0)&&ue(e,d):"children"===a?"string"===typeof d?("textarea"!==n||""!==d)&&pe(e,d):"number"===typeof d&&pe(e,""+d):"suppressContentEditableWarning"!==a&&"suppressHydrationWarning"!==a&&"autoFocus"!==a&&(s.hasOwnProperty(a)?null!=d&&"onScroll"===a&&Or("scroll",e):null!=d&&v(e,a,d,l))}switch(n){case"input":q(e),J(e,r,!1);break;case"textarea":q(e),ae(e);break;case"option":null!=r.value&&e.setAttribute("value",""+H(r.value));break;case"select":e.multiple=!!r.multiple,null!=(a=r.value)?ne(e,!!r.multiple,a,!1):null!=r.defaultValue&&ne(e,!!r.multiple,r.defaultValue,!0);break;default:"function"===typeof i.onClick&&(e.onclick=Jr)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}null!==t.ref&&(t.flags|=512,t.flags|=2097152)}return qs(t),null;case 6:if(e&&null!=t.stateNode)Ns(e,t,e.memoizedProps,r);else{if("string"!==typeof r&&null===t.stateNode)throw Error(o(166));if(n=Ko(Go.current),Ko(qo.current),po(t)){if(r=t.stateNode,n=t.memoizedProps,r[pi]=t,(a=r.nodeValue!==n)&&null!==(e=no))switch(e.tag){case 3:Zr(r.nodeValue,n,0!==(1&e.mode));break;case 5:!0!==e.memoizedProps.suppressHydrationWarning&&Zr(r.nodeValue,n,0!==(1&e.mode))}a&&(t.flags|=4)}else(r=(9===n.nodeType?n:n.ownerDocument).createTextNode(r))[pi]=t,t.stateNode=r}return qs(t),null;case 13:if(Ci(ea),r=t.memoizedState,null===e||null!==e.memoizedState&&null!==e.memoizedState.dehydrated){if(io&&null!==ro&&0!==(1&t.mode)&&0===(128&t.flags))ho(),fo(),t.flags|=98560,a=!1;else if(a=po(t),null!==r&&null!==r.dehydrated){if(null===e){if(!a)throw Error(o(318));if(!(a=null!==(a=t.memoizedState)?a.dehydrated:null))throw Error(o(317));a[pi]=t}else fo(),0===(128&t.flags)&&(t.memoizedState=null),t.flags|=4;qs(t),a=!1}else null!==oo&&(ac(oo),oo=null),a=!0;if(!a)return 65536&t.flags?t:null}return 0!==(128&t.flags)?(t.lanes=n,t):((r=null!==r)!==(null!==e&&null!==e.memoizedState)&&r&&(t.child.flags|=8192,0!==(1&t.mode)&&(null===e||0!==(1&ea.current)?0===Nl&&(Nl=3):mc())),null!==t.updateQueue&&(t.flags|=4),qs(t),null);case 4:return Xo(),Ms(e,t),null===e&&Vr(t.stateNode.containerInfo),qs(t),null;case 10:return To(t.type._context),qs(t),null;case 19:if(Ci(ea),null===(a=t.memoizedState))return qs(t),null;if(r=0!==(128&t.flags),null===(l=a.rendering))if(r)Ws(a,!1);else{if(0!==Nl||null!==e&&0!==(128&e.flags))for(e=t.child;null!==e;){if(null!==(l=ta(e))){for(t.flags|=128,Ws(a,!1),null!==(r=l.updateQueue)&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;null!==n;)e=r,(a=n).flags&=14680066,null===(l=a.alternate)?(a.childLanes=0,a.lanes=e,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=l.childLanes,a.lanes=l.lanes,a.child=l.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=l.memoizedProps,a.memoizedState=l.memoizedState,a.updateQueue=l.updateQueue,a.type=l.type,e=l.dependencies,a.dependencies=null===e?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return Pi(ea,1&ea.current|2),t.child}e=e.sibling}null!==a.tail&&Xe()>Vl&&(t.flags|=128,r=!0,Ws(a,!1),t.lanes=4194304)}else{if(!r)if(null!==(e=ta(l))){if(t.flags|=128,r=!0,null!==(n=e.updateQueue)&&(t.updateQueue=n,t.flags|=4),Ws(a,!0),null===a.tail&&"hidden"===a.tailMode&&!l.alternate&&!io)return qs(t),null}else 2*Xe()-a.renderingStartTime>Vl&&1073741824!==n&&(t.flags|=128,r=!0,Ws(a,!1),t.lanes=4194304);a.isBackwards?(l.sibling=t.child,t.child=l):(null!==(n=a.last)?n.sibling=l:t.child=l,a.last=l)}return null!==a.tail?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=Xe(),t.sibling=null,n=ea.current,Pi(ea,r?1&n|2:1&n),t):(qs(t),null);case 22:case 23:return uc(),r=null!==t.memoizedState,null!==e&&null!==e.memoizedState!==r&&(t.flags|=8192),r&&0!==(1&t.mode)?0!==(1073741824&Ml)&&(qs(t),6&t.subtreeFlags&&(t.flags|=8192)):qs(t),null;case 24:case 25:return null}throw Error(o(156,t.tag))}function Gs(e,t){switch(to(t),t.tag){case 1:return Mi(t.type)&&$i(),65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 3:return Xo(),Ci(zi),Ci(Ti),ra(),0!==(65536&(e=t.flags))&&0===(128&e)?(t.flags=-65537&e|128,t):null;case 5:return Jo(t),null;case 13:if(Ci(ea),null!==(e=t.memoizedState)&&null!==e.dehydrated){if(null===t.alternate)throw Error(o(340));fo()}return 65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 19:return Ci(ea),null;case 4:return Xo(),null;case 10:return To(t.type._context),null;case 22:case 23:return uc(),null;default:return null}}_s=function(e,t){for(var n=t.child;null!==n;){if(5===n.tag||6===n.tag)e.appendChild(n.stateNode);else if(4!==n.tag&&null!==n.child){n.child.return=n,n=n.child;continue}if(n===t)break;for(;null===n.sibling;){if(null===n.return||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},Ms=function(){},$s=function(e,t,n,r){var i=e.memoizedProps;if(i!==r){e=t.stateNode,Ko(qo.current);var o,a=null;switch(n){case"input":i=K(e,i),r=K(e,r),a=[];break;case"select":i=D({},i,{value:void 0}),r=D({},r,{value:void 0}),a=[];break;case"textarea":i=re(e,i),r=re(e,r),a=[];break;default:"function"!==typeof i.onClick&&"function"===typeof r.onClick&&(e.onclick=Jr)}for(d in ye(n,r),n=null,i)if(!r.hasOwnProperty(d)&&i.hasOwnProperty(d)&&null!=i[d])if("style"===d){var l=i[d];for(o in l)l.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else"dangerouslySetInnerHTML"!==d&&"children"!==d&&"suppressContentEditableWarning"!==d&&"suppressHydrationWarning"!==d&&"autoFocus"!==d&&(s.hasOwnProperty(d)?a||(a=[]):(a=a||[]).push(d,null));for(d in r){var c=r[d];if(l=null!=i?i[d]:void 0,r.hasOwnProperty(d)&&c!==l&&(null!=c||null!=l))if("style"===d)if(l){for(o in l)!l.hasOwnProperty(o)||c&&c.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in c)c.hasOwnProperty(o)&&l[o]!==c[o]&&(n||(n={}),n[o]=c[o])}else n||(a||(a=[]),a.push(d,n)),n=c;else"dangerouslySetInnerHTML"===d?(c=c?c.__html:void 0,l=l?l.__html:void 0,null!=c&&l!==c&&(a=a||[]).push(d,c)):"children"===d?"string"!==typeof c&&"number"!==typeof c||(a=a||[]).push(d,""+c):"suppressContentEditableWarning"!==d&&"suppressHydrationWarning"!==d&&(s.hasOwnProperty(d)?(null!=c&&"onScroll"===d&&Or("scroll",e),a||l===c||(a=[])):(a=a||[]).push(d,c))}n&&(a=a||[]).push("style",n);var d=a;(t.updateQueue=d)&&(t.flags|=4)}},Ns=function(e,t,n,r){n!==r&&(t.flags|=4)};var Ks=!1,Qs=!1,Xs="function"===typeof WeakSet?WeakSet:Set,Zs=null;function Js(e,t){var n=e.ref;if(null!==n)if("function"===typeof n)try{n(null)}catch(r){Sc(e,t,r)}else n.current=null}function el(e,t,n){try{n()}catch(r){Sc(e,t,r)}}var tl=!1;function nl(e,t,n){var r=t.updateQueue;if(null!==(r=null!==r?r.lastEffect:null)){var i=r=r.next;do{if((i.tag&e)===e){var o=i.destroy;i.destroy=void 0,void 0!==o&&el(t,n,o)}i=i.next}while(i!==r)}}function rl(e,t){if(null!==(t=null!==(t=t.updateQueue)?t.lastEffect:null)){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function il(e){var t=e.ref;if(null!==t){var n=e.stateNode;e.tag,e=n,"function"===typeof t?t(e):t.current=e}}function ol(e){var t=e.alternate;null!==t&&(e.alternate=null,ol(t)),e.child=null,e.deletions=null,e.sibling=null,5===e.tag&&(null!==(t=e.stateNode)&&(delete t[pi],delete t[hi],delete t[mi],delete t[gi],delete t[xi])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function al(e){return 5===e.tag||3===e.tag||4===e.tag}function sl(e){e:for(;;){for(;null===e.sibling;){if(null===e.return||al(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;5!==e.tag&&6!==e.tag&&18!==e.tag;){if(2&e.flags)continue e;if(null===e.child||4===e.tag)continue e;e.child.return=e,e=e.child}if(!(2&e.flags))return e.stateNode}}function ll(e,t,n){var r=e.tag;if(5===r||6===r)e=e.stateNode,t?8===n.nodeType?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(8===n.nodeType?(t=n.parentNode).insertBefore(e,n):(t=n).appendChild(e),null!==(n=n._reactRootContainer)&&void 0!==n||null!==t.onclick||(t.onclick=Jr));else if(4!==r&&null!==(e=e.child))for(ll(e,t,n),e=e.sibling;null!==e;)ll(e,t,n),e=e.sibling}function cl(e,t,n){var r=e.tag;if(5===r||6===r)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(4!==r&&null!==(e=e.child))for(cl(e,t,n),e=e.sibling;null!==e;)cl(e,t,n),e=e.sibling}var dl=null,ul=!1;function pl(e,t,n){for(n=n.child;null!==n;)hl(e,t,n),n=n.sibling}function hl(e,t,n){if(ot&&"function"===typeof ot.onCommitFiberUnmount)try{ot.onCommitFiberUnmount(it,n)}catch(s){}switch(n.tag){case 5:Qs||Js(n,t);case 6:var r=dl,i=ul;dl=null,pl(e,t,n),ul=i,null!==(dl=r)&&(ul?(e=dl,n=n.stateNode,8===e.nodeType?e.parentNode.removeChild(n):e.removeChild(n)):dl.removeChild(n.stateNode));break;case 18:null!==dl&&(ul?(e=dl,n=n.stateNode,8===e.nodeType?li(e.parentNode,n):1===e.nodeType&&li(e,n),Vt(e)):li(dl,n.stateNode));break;case 4:r=dl,i=ul,dl=n.stateNode.containerInfo,ul=!0,pl(e,t,n),dl=r,ul=i;break;case 0:case 11:case 14:case 15:if(!Qs&&(null!==(r=n.updateQueue)&&null!==(r=r.lastEffect))){i=r=r.next;do{var o=i,a=o.destroy;o=o.tag,void 0!==a&&(0!==(2&o)||0!==(4&o))&&el(n,t,a),i=i.next}while(i!==r)}pl(e,t,n);break;case 1:if(!Qs&&(Js(n,t),"function"===typeof(r=n.stateNode).componentWillUnmount))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(s){Sc(n,t,s)}pl(e,t,n);break;case 21:pl(e,t,n);break;case 22:1&n.mode?(Qs=(r=Qs)||null!==n.memoizedState,pl(e,t,n),Qs=r):pl(e,t,n);break;default:pl(e,t,n)}}function fl(e){var t=e.updateQueue;if(null!==t){e.updateQueue=null;var n=e.stateNode;null===n&&(n=e.stateNode=new Xs),t.forEach(function(t){var r=Tc.bind(null,e,t);n.has(t)||(n.add(t),t.then(r,r))})}}function ml(e,t){var n=t.deletions;if(null!==n)for(var r=0;r<n.length;r++){var i=n[r];try{var a=e,s=t,l=s;e:for(;null!==l;){switch(l.tag){case 5:dl=l.stateNode,ul=!1;break e;case 3:case 4:dl=l.stateNode.containerInfo,ul=!0;break e}l=l.return}if(null===dl)throw Error(o(160));hl(a,s,i),dl=null,ul=!1;var c=i.alternate;null!==c&&(c.return=null),i.return=null}catch(d){Sc(i,t,d)}}if(12854&t.subtreeFlags)for(t=t.child;null!==t;)gl(t,e),t=t.sibling}function gl(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(ml(t,e),xl(e),4&r){try{nl(3,e,e.return),rl(3,e)}catch(g){Sc(e,e.return,g)}try{nl(5,e,e.return)}catch(g){Sc(e,e.return,g)}}break;case 1:ml(t,e),xl(e),512&r&&null!==n&&Js(n,n.return);break;case 5:if(ml(t,e),xl(e),512&r&&null!==n&&Js(n,n.return),32&e.flags){var i=e.stateNode;try{pe(i,"")}catch(g){Sc(e,e.return,g)}}if(4&r&&null!=(i=e.stateNode)){var a=e.memoizedProps,s=null!==n?n.memoizedProps:a,l=e.type,c=e.updateQueue;if(e.updateQueue=null,null!==c)try{"input"===l&&"radio"===a.type&&null!=a.name&&X(i,a),ve(l,s);var d=ve(l,a);for(s=0;s<c.length;s+=2){var u=c[s],p=c[s+1];"style"===u?ge(i,p):"dangerouslySetInnerHTML"===u?ue(i,p):"children"===u?pe(i,p):v(i,u,p,d)}switch(l){case"input":Z(i,a);break;case"textarea":oe(i,a);break;case"select":var h=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!a.multiple;var f=a.value;null!=f?ne(i,!!a.multiple,f,!1):h!==!!a.multiple&&(null!=a.defaultValue?ne(i,!!a.multiple,a.defaultValue,!0):ne(i,!!a.multiple,a.multiple?[]:"",!1))}i[hi]=a}catch(g){Sc(e,e.return,g)}}break;case 6:if(ml(t,e),xl(e),4&r){if(null===e.stateNode)throw Error(o(162));i=e.stateNode,a=e.memoizedProps;try{i.nodeValue=a}catch(g){Sc(e,e.return,g)}}break;case 3:if(ml(t,e),xl(e),4&r&&null!==n&&n.memoizedState.isDehydrated)try{Vt(t.containerInfo)}catch(g){Sc(e,e.return,g)}break;case 4:default:ml(t,e),xl(e);break;case 13:ml(t,e),xl(e),8192&(i=e.child).flags&&(a=null!==i.memoizedState,i.stateNode.isHidden=a,!a||null!==i.alternate&&null!==i.alternate.memoizedState||(Bl=Xe())),4&r&&fl(e);break;case 22:if(u=null!==n&&null!==n.memoizedState,1&e.mode?(Qs=(d=Qs)||u,ml(t,e),Qs=d):ml(t,e),xl(e),8192&r){if(d=null!==e.memoizedState,(e.stateNode.isHidden=d)&&!u&&0!==(1&e.mode))for(Zs=e,u=e.child;null!==u;){for(p=Zs=u;null!==Zs;){switch(f=(h=Zs).child,h.tag){case 0:case 11:case 14:case 15:nl(4,h,h.return);break;case 1:Js(h,h.return);var m=h.stateNode;if("function"===typeof m.componentWillUnmount){r=h,n=h.return;try{t=r,m.props=t.memoizedProps,m.state=t.memoizedState,m.componentWillUnmount()}catch(g){Sc(r,n,g)}}break;case 5:Js(h,h.return);break;case 22:if(null!==h.memoizedState){wl(p);continue}}null!==f?(f.return=h,Zs=f):wl(p)}u=u.sibling}e:for(u=null,p=e;;){if(5===p.tag){if(null===u){u=p;try{i=p.stateNode,d?"function"===typeof(a=i.style).setProperty?a.setProperty("display","none","important"):a.display="none":(l=p.stateNode,s=void 0!==(c=p.memoizedProps.style)&&null!==c&&c.hasOwnProperty("display")?c.display:null,l.style.display=me("display",s))}catch(g){Sc(e,e.return,g)}}}else if(6===p.tag){if(null===u)try{p.stateNode.nodeValue=d?"":p.memoizedProps}catch(g){Sc(e,e.return,g)}}else if((22!==p.tag&&23!==p.tag||null===p.memoizedState||p===e)&&null!==p.child){p.child.return=p,p=p.child;continue}if(p===e)break e;for(;null===p.sibling;){if(null===p.return||p.return===e)break e;u===p&&(u=null),p=p.return}u===p&&(u=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:ml(t,e),xl(e),4&r&&fl(e);case 21:}}function xl(e){var t=e.flags;if(2&t){try{e:{for(var n=e.return;null!==n;){if(al(n)){var r=n;break e}n=n.return}throw Error(o(160))}switch(r.tag){case 5:var i=r.stateNode;32&r.flags&&(pe(i,""),r.flags&=-33),cl(e,sl(e),i);break;case 3:case 4:var a=r.stateNode.containerInfo;ll(e,sl(e),a);break;default:throw Error(o(161))}}catch(s){Sc(e,e.return,s)}e.flags&=-3}4096&t&&(e.flags&=-4097)}function yl(e,t,n){Zs=e,vl(e,t,n)}function vl(e,t,n){for(var r=0!==(1&e.mode);null!==Zs;){var i=Zs,o=i.child;if(22===i.tag&&r){var a=null!==i.memoizedState||Ks;if(!a){var s=i.alternate,l=null!==s&&null!==s.memoizedState||Qs;s=Ks;var c=Qs;if(Ks=a,(Qs=l)&&!c)for(Zs=i;null!==Zs;)l=(a=Zs).child,22===a.tag&&null!==a.memoizedState?kl(i):null!==l?(l.return=a,Zs=l):kl(i);for(;null!==o;)Zs=o,vl(o,t,n),o=o.sibling;Zs=i,Ks=s,Qs=c}bl(e)}else 0!==(8772&i.subtreeFlags)&&null!==o?(o.return=i,Zs=o):bl(e)}}function bl(e){for(;null!==Zs;){var t=Zs;if(0!==(8772&t.flags)){var n=t.alternate;try{if(0!==(8772&t.flags))switch(t.tag){case 0:case 11:case 15:Qs||rl(5,t);break;case 1:var r=t.stateNode;if(4&t.flags&&!Qs)if(null===n)r.componentDidMount();else{var i=t.elementType===t.type?n.memoizedProps:ns(t.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var a=t.updateQueue;null!==a&&Ho(t,a,r);break;case 3:var s=t.updateQueue;if(null!==s){if(n=null,null!==t.child)switch(t.child.tag){case 5:case 1:n=t.child.stateNode}Ho(t,s,n)}break;case 5:var l=t.stateNode;if(null===n&&4&t.flags){n=l;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:case 4:case 12:case 19:case 17:case 21:case 22:case 23:case 25:break;case 13:if(null===t.memoizedState){var d=t.alternate;if(null!==d){var u=d.memoizedState;if(null!==u){var p=u.dehydrated;null!==p&&Vt(p)}}}break;default:throw Error(o(163))}Qs||512&t.flags&&il(t)}catch(h){Sc(t,t.return,h)}}if(t===e){Zs=null;break}if(null!==(n=t.sibling)){n.return=t.return,Zs=n;break}Zs=t.return}}function wl(e){for(;null!==Zs;){var t=Zs;if(t===e){Zs=null;break}var n=t.sibling;if(null!==n){n.return=t.return,Zs=n;break}Zs=t.return}}function kl(e){for(;null!==Zs;){var t=Zs;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{rl(4,t)}catch(l){Sc(t,n,l)}break;case 1:var r=t.stateNode;if("function"===typeof r.componentDidMount){var i=t.return;try{r.componentDidMount()}catch(l){Sc(t,i,l)}}var o=t.return;try{il(t)}catch(l){Sc(t,o,l)}break;case 5:var a=t.return;try{il(t)}catch(l){Sc(t,a,l)}}}catch(l){Sc(t,t.return,l)}if(t===e){Zs=null;break}var s=t.sibling;if(null!==s){s.return=t.return,Zs=s;break}Zs=t.return}}var jl,Sl=Math.ceil,Cl=b.ReactCurrentDispatcher,Pl=b.ReactCurrentOwner,El=b.ReactCurrentBatchConfig,Tl=0,zl=null,Al=null,_l=0,Ml=0,$l=Si(0),Nl=0,Rl=null,Ll=0,Dl=0,Fl=0,Ol=null,Il=null,Bl=0,Vl=1/0,Ul=null,Hl=!1,Wl=null,ql=null,Yl=!1,Gl=null,Kl=0,Ql=0,Xl=null,Zl=-1,Jl=0;function ec(){return 0!==(6&Tl)?Xe():-1!==Zl?Zl:Zl=Xe()}function tc(e){return 0===(1&e.mode)?1:0!==(2&Tl)&&0!==_l?_l&-_l:null!==go.transition?(0===Jl&&(Jl=mt()),Jl):0!==(e=vt)?e:e=void 0===(e=window.event)?16:Qt(e.type)}function nc(e,t,n,r){if(50<Ql)throw Ql=0,Xl=null,Error(o(185));xt(e,n,r),0!==(2&Tl)&&e===zl||(e===zl&&(0===(2&Tl)&&(Dl|=n),4===Nl&&sc(e,_l)),rc(e,r),1===n&&0===Tl&&0===(1&t.mode)&&(Vl=Xe()+500,Oi&&Vi()))}function rc(e,t){var n=e.callbackNode;!function(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,o=e.pendingLanes;0<o;){var a=31-at(o),s=1<<a,l=i[a];-1===l?0!==(s&n)&&0===(s&r)||(i[a]=ht(s,t)):l<=t&&(e.expiredLanes|=s),o&=~s}}(e,t);var r=pt(e,e===zl?_l:0);if(0===r)null!==n&&Ge(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(null!=n&&Ge(n),1===t)0===e.tag?function(e){Oi=!0,Bi(e)}(lc.bind(null,e)):Bi(lc.bind(null,e)),ai(function(){0===(6&Tl)&&Vi()}),n=null;else{switch(bt(r)){case 1:n=Je;break;case 4:n=et;break;case 16:default:n=tt;break;case 536870912:n=rt}n=zc(n,ic.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function ic(e,t){if(Zl=-1,Jl=0,0!==(6&Tl))throw Error(o(327));var n=e.callbackNode;if(kc()&&e.callbackNode!==n)return null;var r=pt(e,e===zl?_l:0);if(0===r)return null;if(0!==(30&r)||0!==(r&e.expiredLanes)||t)t=gc(e,r);else{t=r;var i=Tl;Tl|=2;var a=fc();for(zl===e&&_l===t||(Ul=null,Vl=Xe()+500,pc(e,t));;)try{yc();break}catch(l){hc(e,l)}Eo(),Cl.current=a,Tl=i,null!==Al?t=0:(zl=null,_l=0,t=Nl)}if(0!==t){if(2===t&&(0!==(i=ft(e))&&(r=i,t=oc(e,i))),1===t)throw n=Rl,pc(e,0),sc(e,r),rc(e,Xe()),n;if(6===t)sc(e,r);else{if(i=e.current.alternate,0===(30&r)&&!function(e){for(var t=e;;){if(16384&t.flags){var n=t.updateQueue;if(null!==n&&null!==(n=n.stores))for(var r=0;r<n.length;r++){var i=n[r],o=i.getSnapshot;i=i.value;try{if(!sr(o(),i))return!1}catch(s){return!1}}}if(n=t.child,16384&t.subtreeFlags&&null!==n)n.return=t,t=n;else{if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}(i)&&(2===(t=gc(e,r))&&(0!==(a=ft(e))&&(r=a,t=oc(e,a))),1===t))throw n=Rl,pc(e,0),sc(e,r),rc(e,Xe()),n;switch(e.finishedWork=i,e.finishedLanes=r,t){case 0:case 1:throw Error(o(345));case 2:case 5:wc(e,Il,Ul);break;case 3:if(sc(e,r),(130023424&r)===r&&10<(t=Bl+500-Xe())){if(0!==pt(e,0))break;if(((i=e.suspendedLanes)&r)!==r){ec(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=ri(wc.bind(null,e,Il,Ul),t);break}wc(e,Il,Ul);break;case 4:if(sc(e,r),(4194240&r)===r)break;for(t=e.eventTimes,i=-1;0<r;){var s=31-at(r);a=1<<s,(s=t[s])>i&&(i=s),r&=~a}if(r=i,10<(r=(120>(r=Xe()-r)?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Sl(r/1960))-r)){e.timeoutHandle=ri(wc.bind(null,e,Il,Ul),r);break}wc(e,Il,Ul);break;default:throw Error(o(329))}}}return rc(e,Xe()),e.callbackNode===n?ic.bind(null,e):null}function oc(e,t){var n=Ol;return e.current.memoizedState.isDehydrated&&(pc(e,t).flags|=256),2!==(e=gc(e,t))&&(t=Il,Il=n,null!==t&&ac(t)),e}function ac(e){null===Il?Il=e:Il.push.apply(Il,e)}function sc(e,t){for(t&=~Fl,t&=~Dl,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-at(t),r=1<<n;e[n]=-1,t&=~r}}function lc(e){if(0!==(6&Tl))throw Error(o(327));kc();var t=pt(e,0);if(0===(1&t))return rc(e,Xe()),null;var n=gc(e,t);if(0!==e.tag&&2===n){var r=ft(e);0!==r&&(t=r,n=oc(e,r))}if(1===n)throw n=Rl,pc(e,0),sc(e,t),rc(e,Xe()),n;if(6===n)throw Error(o(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,wc(e,Il,Ul),rc(e,Xe()),null}function cc(e,t){var n=Tl;Tl|=1;try{return e(t)}finally{0===(Tl=n)&&(Vl=Xe()+500,Oi&&Vi())}}function dc(e){null!==Gl&&0===Gl.tag&&0===(6&Tl)&&kc();var t=Tl;Tl|=1;var n=El.transition,r=vt;try{if(El.transition=null,vt=1,e)return e()}finally{vt=r,El.transition=n,0===(6&(Tl=t))&&Vi()}}function uc(){Ml=$l.current,Ci($l)}function pc(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(-1!==n&&(e.timeoutHandle=-1,ii(n)),null!==Al)for(n=Al.return;null!==n;){var r=n;switch(to(r),r.tag){case 1:null!==(r=r.type.childContextTypes)&&void 0!==r&&$i();break;case 3:Xo(),Ci(zi),Ci(Ti),ra();break;case 5:Jo(r);break;case 4:Xo();break;case 13:case 19:Ci(ea);break;case 10:To(r.type._context);break;case 22:case 23:uc()}n=n.return}if(zl=e,Al=e=$c(e.current,null),_l=Ml=t,Nl=0,Rl=null,Fl=Dl=Ll=0,Il=Ol=null,null!==Mo){for(t=0;t<Mo.length;t++)if(null!==(r=(n=Mo[t]).interleaved)){n.interleaved=null;var i=r.next,o=n.pending;if(null!==o){var a=o.next;o.next=i,r.next=a}n.pending=r}Mo=null}return e}function hc(e,t){for(;;){var n=Al;try{if(Eo(),ia.current=Za,da){for(var r=sa.memoizedState;null!==r;){var i=r.queue;null!==i&&(i.pending=null),r=r.next}da=!1}if(aa=0,ca=la=sa=null,ua=!1,pa=0,Pl.current=null,null===n||null===n.return){Nl=1,Rl=t,Al=null;break}e:{var a=e,s=n.return,l=n,c=t;if(t=_l,l.flags|=32768,null!==c&&"object"===typeof c&&"function"===typeof c.then){var d=c,u=l,p=u.tag;if(0===(1&u.mode)&&(0===p||11===p||15===p)){var h=u.alternate;h?(u.updateQueue=h.updateQueue,u.memoizedState=h.memoizedState,u.lanes=h.lanes):(u.updateQueue=null,u.memoizedState=null)}var f=gs(s);if(null!==f){f.flags&=-257,xs(f,s,l,0,t),1&f.mode&&ms(a,d,t),c=d;var m=(t=f).updateQueue;if(null===m){var g=new Set;g.add(c),t.updateQueue=g}else m.add(c);break e}if(0===(1&t)){ms(a,d,t),mc();break e}c=Error(o(426))}else if(io&&1&l.mode){var x=gs(s);if(null!==x){0===(65536&x.flags)&&(x.flags|=256),xs(x,s,l,0,t),mo(cs(c,l));break e}}a=c=cs(c,l),4!==Nl&&(Nl=2),null===Ol?Ol=[a]:Ol.push(a),a=s;do{switch(a.tag){case 3:a.flags|=65536,t&=-t,a.lanes|=t,Vo(a,hs(0,c,t));break e;case 1:l=c;var y=a.type,v=a.stateNode;if(0===(128&a.flags)&&("function"===typeof y.getDerivedStateFromError||null!==v&&"function"===typeof v.componentDidCatch&&(null===ql||!ql.has(v)))){a.flags|=65536,t&=-t,a.lanes|=t,Vo(a,fs(a,l,t));break e}}a=a.return}while(null!==a)}bc(n)}catch(b){t=b,Al===n&&null!==n&&(Al=n=n.return);continue}break}}function fc(){var e=Cl.current;return Cl.current=Za,null===e?Za:e}function mc(){0!==Nl&&3!==Nl&&2!==Nl||(Nl=4),null===zl||0===(268435455&Ll)&&0===(268435455&Dl)||sc(zl,_l)}function gc(e,t){var n=Tl;Tl|=2;var r=fc();for(zl===e&&_l===t||(Ul=null,pc(e,t));;)try{xc();break}catch(i){hc(e,i)}if(Eo(),Tl=n,Cl.current=r,null!==Al)throw Error(o(261));return zl=null,_l=0,Nl}function xc(){for(;null!==Al;)vc(Al)}function yc(){for(;null!==Al&&!Ke();)vc(Al)}function vc(e){var t=jl(e.alternate,e,Ml);e.memoizedProps=e.pendingProps,null===t?bc(e):Al=t,Pl.current=null}function bc(e){var t=e;do{var n=t.alternate;if(e=t.return,0===(32768&t.flags)){if(null!==(n=Ys(n,t,Ml)))return void(Al=n)}else{if(null!==(n=Gs(n,t)))return n.flags&=32767,void(Al=n);if(null===e)return Nl=6,void(Al=null);e.flags|=32768,e.subtreeFlags=0,e.deletions=null}if(null!==(t=t.sibling))return void(Al=t);Al=t=e}while(null!==t);0===Nl&&(Nl=5)}function wc(e,t,n){var r=vt,i=El.transition;try{El.transition=null,vt=1,function(e,t,n,r){do{kc()}while(null!==Gl);if(0!==(6&Tl))throw Error(o(327));n=e.finishedWork;var i=e.finishedLanes;if(null===n)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(o(177));e.callbackNode=null,e.callbackPriority=0;var a=n.lanes|n.childLanes;if(function(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-at(n),o=1<<i;t[i]=0,r[i]=-1,e[i]=-1,n&=~o}}(e,a),e===zl&&(Al=zl=null,_l=0),0===(2064&n.subtreeFlags)&&0===(2064&n.flags)||Yl||(Yl=!0,zc(tt,function(){return kc(),null})),a=0!==(15990&n.flags),0!==(15990&n.subtreeFlags)||a){a=El.transition,El.transition=null;var s=vt;vt=1;var l=Tl;Tl|=4,Pl.current=null,function(e,t){if(ei=Ht,hr(e=pr())){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{var r=(n=(n=e.ownerDocument)&&n.defaultView||window).getSelection&&n.getSelection();if(r&&0!==r.rangeCount){n=r.anchorNode;var i=r.anchorOffset,a=r.focusNode;r=r.focusOffset;try{n.nodeType,a.nodeType}catch(w){n=null;break e}var s=0,l=-1,c=-1,d=0,u=0,p=e,h=null;t:for(;;){for(var f;p!==n||0!==i&&3!==p.nodeType||(l=s+i),p!==a||0!==r&&3!==p.nodeType||(c=s+r),3===p.nodeType&&(s+=p.nodeValue.length),null!==(f=p.firstChild);)h=p,p=f;for(;;){if(p===e)break t;if(h===n&&++d===i&&(l=s),h===a&&++u===r&&(c=s),null!==(f=p.nextSibling))break;h=(p=h).parentNode}p=f}n=-1===l||-1===c?null:{start:l,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(ti={focusedElem:e,selectionRange:n},Ht=!1,Zs=t;null!==Zs;)if(e=(t=Zs).child,0!==(1028&t.subtreeFlags)&&null!==e)e.return=t,Zs=e;else for(;null!==Zs;){t=Zs;try{var m=t.alternate;if(0!==(1024&t.flags))switch(t.tag){case 0:case 11:case 15:case 5:case 6:case 4:case 17:break;case 1:if(null!==m){var g=m.memoizedProps,x=m.memoizedState,y=t.stateNode,v=y.getSnapshotBeforeUpdate(t.elementType===t.type?g:ns(t.type,g),x);y.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var b=t.stateNode.containerInfo;1===b.nodeType?b.textContent="":9===b.nodeType&&b.documentElement&&b.removeChild(b.documentElement);break;default:throw Error(o(163))}}catch(w){Sc(t,t.return,w)}if(null!==(e=t.sibling)){e.return=t.return,Zs=e;break}Zs=t.return}m=tl,tl=!1}(e,n),gl(n,e),fr(ti),Ht=!!ei,ti=ei=null,e.current=n,yl(n,e,i),Qe(),Tl=l,vt=s,El.transition=a}else e.current=n;if(Yl&&(Yl=!1,Gl=e,Kl=i),a=e.pendingLanes,0===a&&(ql=null),function(e){if(ot&&"function"===typeof ot.onCommitFiberRoot)try{ot.onCommitFiberRoot(it,e,void 0,128===(128&e.current.flags))}catch(t){}}(n.stateNode),rc(e,Xe()),null!==t)for(r=e.onRecoverableError,n=0;n<t.length;n++)i=t[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(Hl)throw Hl=!1,e=Wl,Wl=null,e;0!==(1&Kl)&&0!==e.tag&&kc(),a=e.pendingLanes,0!==(1&a)?e===Xl?Ql++:(Ql=0,Xl=e):Ql=0,Vi()}(e,t,n,r)}finally{El.transition=i,vt=r}return null}function kc(){if(null!==Gl){var e=bt(Kl),t=El.transition,n=vt;try{if(El.transition=null,vt=16>e?16:e,null===Gl)var r=!1;else{if(e=Gl,Gl=null,Kl=0,0!==(6&Tl))throw Error(o(331));var i=Tl;for(Tl|=4,Zs=e.current;null!==Zs;){var a=Zs,s=a.child;if(0!==(16&Zs.flags)){var l=a.deletions;if(null!==l){for(var c=0;c<l.length;c++){var d=l[c];for(Zs=d;null!==Zs;){var u=Zs;switch(u.tag){case 0:case 11:case 15:nl(8,u,a)}var p=u.child;if(null!==p)p.return=u,Zs=p;else for(;null!==Zs;){var h=(u=Zs).sibling,f=u.return;if(ol(u),u===d){Zs=null;break}if(null!==h){h.return=f,Zs=h;break}Zs=f}}}var m=a.alternate;if(null!==m){var g=m.child;if(null!==g){m.child=null;do{var x=g.sibling;g.sibling=null,g=x}while(null!==g)}}Zs=a}}if(0!==(2064&a.subtreeFlags)&&null!==s)s.return=a,Zs=s;else e:for(;null!==Zs;){if(0!==(2048&(a=Zs).flags))switch(a.tag){case 0:case 11:case 15:nl(9,a,a.return)}var y=a.sibling;if(null!==y){y.return=a.return,Zs=y;break e}Zs=a.return}}var v=e.current;for(Zs=v;null!==Zs;){var b=(s=Zs).child;if(0!==(2064&s.subtreeFlags)&&null!==b)b.return=s,Zs=b;else e:for(s=v;null!==Zs;){if(0!==(2048&(l=Zs).flags))try{switch(l.tag){case 0:case 11:case 15:rl(9,l)}}catch(k){Sc(l,l.return,k)}if(l===s){Zs=null;break e}var w=l.sibling;if(null!==w){w.return=l.return,Zs=w;break e}Zs=l.return}}if(Tl=i,Vi(),ot&&"function"===typeof ot.onPostCommitFiberRoot)try{ot.onPostCommitFiberRoot(it,e)}catch(k){}r=!0}return r}finally{vt=n,El.transition=t}}return!1}function jc(e,t,n){e=Io(e,t=hs(0,t=cs(n,t),1),1),t=ec(),null!==e&&(xt(e,1,t),rc(e,t))}function Sc(e,t,n){if(3===e.tag)jc(e,e,n);else for(;null!==t;){if(3===t.tag){jc(t,e,n);break}if(1===t.tag){var r=t.stateNode;if("function"===typeof t.type.getDerivedStateFromError||"function"===typeof r.componentDidCatch&&(null===ql||!ql.has(r))){t=Io(t,e=fs(t,e=cs(n,e),1),1),e=ec(),null!==t&&(xt(t,1,e),rc(t,e));break}}t=t.return}}function Cc(e,t,n){var r=e.pingCache;null!==r&&r.delete(t),t=ec(),e.pingedLanes|=e.suspendedLanes&n,zl===e&&(_l&n)===n&&(4===Nl||3===Nl&&(130023424&_l)===_l&&500>Xe()-Bl?pc(e,0):Fl|=n),rc(e,t)}function Pc(e,t){0===t&&(0===(1&e.mode)?t=1:(t=dt,0===(130023424&(dt<<=1))&&(dt=4194304)));var n=ec();null!==(e=Ro(e,t))&&(xt(e,t,n),rc(e,n))}function Ec(e){var t=e.memoizedState,n=0;null!==t&&(n=t.retryLane),Pc(e,n)}function Tc(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;null!==i&&(n=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(o(314))}null!==r&&r.delete(t),Pc(e,n)}function zc(e,t){return Ye(e,t)}function Ac(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function _c(e,t,n,r){return new Ac(e,t,n,r)}function Mc(e){return!(!(e=e.prototype)||!e.isReactComponent)}function $c(e,t){var n=e.alternate;return null===n?((n=_c(e.tag,t,e.key,e.mode)).elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=14680064&e.flags,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Nc(e,t,n,r,i,a){var s=2;if(r=e,"function"===typeof e)Mc(e)&&(s=1);else if("string"===typeof e)s=5;else e:switch(e){case j:return Rc(n.children,i,a,t);case S:s=8,i|=8;break;case C:return(e=_c(12,n,t,2|i)).elementType=C,e.lanes=a,e;case z:return(e=_c(13,n,t,i)).elementType=z,e.lanes=a,e;case A:return(e=_c(19,n,t,i)).elementType=A,e.lanes=a,e;case $:return Lc(n,i,a,t);default:if("object"===typeof e&&null!==e)switch(e.$$typeof){case P:s=10;break e;case E:s=9;break e;case T:s=11;break e;case _:s=14;break e;case M:s=16,r=null;break e}throw Error(o(130,null==e?e:typeof e,""))}return(t=_c(s,n,t,i)).elementType=e,t.type=r,t.lanes=a,t}function Rc(e,t,n,r){return(e=_c(7,e,r,t)).lanes=n,e}function Lc(e,t,n,r){return(e=_c(22,e,r,t)).elementType=$,e.lanes=n,e.stateNode={isHidden:!1},e}function Dc(e,t,n){return(e=_c(6,e,null,t)).lanes=n,e}function Fc(e,t,n){return(t=_c(4,null!==e.children?e.children:[],e.key,t)).lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Oc(e,t,n,r,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=gt(0),this.expirationTimes=gt(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=gt(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Ic(e,t,n,r,i,o,a,s,l){return e=new Oc(e,t,n,s,l),1===t?(t=1,!0===o&&(t|=8)):t=0,o=_c(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Do(o),e}function Bc(e){if(!e)return Ei;e:{if(Ve(e=e._reactInternals)!==e||1!==e.tag)throw Error(o(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Mi(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(null!==t);throw Error(o(171))}if(1===e.tag){var n=e.type;if(Mi(n))return Ri(e,n,t)}return t}function Vc(e,t,n,r,i,o,a,s,l){return(e=Ic(n,r,!0,e,0,o,0,s,l)).context=Bc(null),n=e.current,(o=Oo(r=ec(),i=tc(n))).callback=void 0!==t&&null!==t?t:null,Io(n,o,i),e.current.lanes=i,xt(e,i,r),rc(e,r),e}function Uc(e,t,n,r){var i=t.current,o=ec(),a=tc(i);return n=Bc(n),null===t.context?t.context=n:t.pendingContext=n,(t=Oo(o,a)).payload={element:e},null!==(r=void 0===r?null:r)&&(t.callback=r),null!==(e=Io(i,t,a))&&(nc(e,i,a,o),Bo(e,i,a)),a}function Hc(e){return(e=e.current).child?(e.child.tag,e.child.stateNode):null}function Wc(e,t){if(null!==(e=e.memoizedState)&&null!==e.dehydrated){var n=e.retryLane;e.retryLane=0!==n&&n<t?n:t}}function qc(e,t){Wc(e,t),(e=e.alternate)&&Wc(e,t)}jl=function(e,t,n){if(null!==e)if(e.memoizedProps!==t.pendingProps||zi.current)vs=!0;else{if(0===(e.lanes&n)&&0===(128&t.flags))return vs=!1,function(e,t,n){switch(t.tag){case 3:zs(t),fo();break;case 5:Zo(t);break;case 1:Mi(t.type)&&Li(t);break;case 4:Qo(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,i=t.memoizedProps.value;Pi(jo,r._currentValue),r._currentValue=i;break;case 13:if(null!==(r=t.memoizedState))return null!==r.dehydrated?(Pi(ea,1&ea.current),t.flags|=128,null):0!==(n&t.child.childLanes)?Ds(e,t,n):(Pi(ea,1&ea.current),null!==(e=Hs(e,t,n))?e.sibling:null);Pi(ea,1&ea.current);break;case 19:if(r=0!==(n&t.childLanes),0!==(128&e.flags)){if(r)return Vs(e,t,n);t.flags|=128}if(null!==(i=t.memoizedState)&&(i.rendering=null,i.tail=null,i.lastEffect=null),Pi(ea,ea.current),r)break;return null;case 22:case 23:return t.lanes=0,Ss(e,t,n)}return Hs(e,t,n)}(e,t,n);vs=0!==(131072&e.flags)}else vs=!1,io&&0!==(1048576&t.flags)&&Ji(t,qi,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Us(e,t),e=t.pendingProps;var i=_i(t,Ti.current);Ao(t,n),i=ga(null,t,r,e,i,n);var a=xa();return t.flags|=1,"object"===typeof i&&null!==i&&"function"===typeof i.render&&void 0===i.$$typeof?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Mi(r)?(a=!0,Li(t)):a=!1,t.memoizedState=null!==i.state&&void 0!==i.state?i.state:null,Do(t),i.updater=is,t.stateNode=i,i._reactInternals=t,ls(t,r,e,n),t=Ts(null,t,r,!0,a,n)):(t.tag=0,io&&a&&eo(t),bs(null,t,i,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Us(e,t),e=t.pendingProps,r=(i=r._init)(r._payload),t.type=r,i=t.tag=function(e){if("function"===typeof e)return Mc(e)?1:0;if(void 0!==e&&null!==e){if((e=e.$$typeof)===T)return 11;if(e===_)return 14}return 2}(r),e=ns(r,e),i){case 0:t=Ps(null,t,r,e,n);break e;case 1:t=Es(null,t,r,e,n);break e;case 11:t=ws(null,t,r,e,n);break e;case 14:t=ks(null,t,r,ns(r.type,e),n);break e}throw Error(o(306,r,""))}return t;case 0:return r=t.type,i=t.pendingProps,Ps(e,t,r,i=t.elementType===r?i:ns(r,i),n);case 1:return r=t.type,i=t.pendingProps,Es(e,t,r,i=t.elementType===r?i:ns(r,i),n);case 3:e:{if(zs(t),null===e)throw Error(o(387));r=t.pendingProps,i=(a=t.memoizedState).element,Fo(e,t),Uo(t,r,null,n);var s=t.memoizedState;if(r=s.element,a.isDehydrated){if(a={element:r,isDehydrated:!1,cache:s.cache,pendingSuspenseBoundaries:s.pendingSuspenseBoundaries,transitions:s.transitions},t.updateQueue.baseState=a,t.memoizedState=a,256&t.flags){t=As(e,t,r,n,i=cs(Error(o(423)),t));break e}if(r!==i){t=As(e,t,r,n,i=cs(Error(o(424)),t));break e}for(ro=ci(t.stateNode.containerInfo.firstChild),no=t,io=!0,oo=null,n=ko(t,null,r,n),t.child=n;n;)n.flags=-3&n.flags|4096,n=n.sibling}else{if(fo(),r===i){t=Hs(e,t,n);break e}bs(e,t,r,n)}t=t.child}return t;case 5:return Zo(t),null===e&&co(t),r=t.type,i=t.pendingProps,a=null!==e?e.memoizedProps:null,s=i.children,ni(r,i)?s=null:null!==a&&ni(r,a)&&(t.flags|=32),Cs(e,t),bs(e,t,s,n),t.child;case 6:return null===e&&co(t),null;case 13:return Ds(e,t,n);case 4:return Qo(t,t.stateNode.containerInfo),r=t.pendingProps,null===e?t.child=wo(t,null,r,n):bs(e,t,r,n),t.child;case 11:return r=t.type,i=t.pendingProps,ws(e,t,r,i=t.elementType===r?i:ns(r,i),n);case 7:return bs(e,t,t.pendingProps,n),t.child;case 8:case 12:return bs(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,i=t.pendingProps,a=t.memoizedProps,s=i.value,Pi(jo,r._currentValue),r._currentValue=s,null!==a)if(sr(a.value,s)){if(a.children===i.children&&!zi.current){t=Hs(e,t,n);break e}}else for(null!==(a=t.child)&&(a.return=t);null!==a;){var l=a.dependencies;if(null!==l){s=a.child;for(var c=l.firstContext;null!==c;){if(c.context===r){if(1===a.tag){(c=Oo(-1,n&-n)).tag=2;var d=a.updateQueue;if(null!==d){var u=(d=d.shared).pending;null===u?c.next=c:(c.next=u.next,u.next=c),d.pending=c}}a.lanes|=n,null!==(c=a.alternate)&&(c.lanes|=n),zo(a.return,n,t),l.lanes|=n;break}c=c.next}}else if(10===a.tag)s=a.type===t.type?null:a.child;else if(18===a.tag){if(null===(s=a.return))throw Error(o(341));s.lanes|=n,null!==(l=s.alternate)&&(l.lanes|=n),zo(s,n,t),s=a.sibling}else s=a.child;if(null!==s)s.return=a;else for(s=a;null!==s;){if(s===t){s=null;break}if(null!==(a=s.sibling)){a.return=s.return,s=a;break}s=s.return}a=s}bs(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,r=t.pendingProps.children,Ao(t,n),r=r(i=_o(i)),t.flags|=1,bs(e,t,r,n),t.child;case 14:return i=ns(r=t.type,t.pendingProps),ks(e,t,r,i=ns(r.type,i),n);case 15:return js(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:ns(r,i),Us(e,t),t.tag=1,Mi(r)?(e=!0,Li(t)):e=!1,Ao(t,n),as(t,r,i),ls(t,r,i,n),Ts(null,t,r,!0,e,n);case 19:return Vs(e,t,n);case 22:return Ss(e,t,n)}throw Error(o(156,t.tag))};var Yc="function"===typeof reportError?reportError:function(e){console.error(e)};function Gc(e){this._internalRoot=e}function Kc(e){this._internalRoot=e}function Qc(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType)}function Xc(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType&&(8!==e.nodeType||" react-mount-point-unstable "!==e.nodeValue))}function Zc(){}function Jc(e,t,n,r,i){var o=n._reactRootContainer;if(o){var a=o;if("function"===typeof i){var s=i;i=function(){var e=Hc(a);s.call(e)}}Uc(t,a,e,i)}else a=function(e,t,n,r,i){if(i){if("function"===typeof r){var o=r;r=function(){var e=Hc(a);o.call(e)}}var a=Vc(t,r,e,0,null,!1,0,"",Zc);return e._reactRootContainer=a,e[fi]=a.current,Vr(8===e.nodeType?e.parentNode:e),dc(),a}for(;i=e.lastChild;)e.removeChild(i);if("function"===typeof r){var s=r;r=function(){var e=Hc(l);s.call(e)}}var l=Ic(e,0,!1,null,0,!1,0,"",Zc);return e._reactRootContainer=l,e[fi]=l.current,Vr(8===e.nodeType?e.parentNode:e),dc(function(){Uc(t,l,n,r)}),l}(n,t,e,i,r);return Hc(a)}Kc.prototype.render=Gc.prototype.render=function(e){var t=this._internalRoot;if(null===t)throw Error(o(409));Uc(e,t,null,null)},Kc.prototype.unmount=Gc.prototype.unmount=function(){var e=this._internalRoot;if(null!==e){this._internalRoot=null;var t=e.containerInfo;dc(function(){Uc(null,e,null,null)}),t[fi]=null}},Kc.prototype.unstable_scheduleHydration=function(e){if(e){var t=St();e={blockedOn:null,target:e,priority:t};for(var n=0;n<$t.length&&0!==t&&t<$t[n].priority;n++);$t.splice(n,0,e),0===n&&Dt(e)}},wt=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=ut(t.pendingLanes);0!==n&&(yt(t,1|n),rc(t,Xe()),0===(6&Tl)&&(Vl=Xe()+500,Vi()))}break;case 13:dc(function(){var t=Ro(e,1);if(null!==t){var n=ec();nc(t,e,1,n)}}),qc(e,1)}},kt=function(e){if(13===e.tag){var t=Ro(e,134217728);if(null!==t)nc(t,e,134217728,ec());qc(e,134217728)}},jt=function(e){if(13===e.tag){var t=tc(e),n=Ro(e,t);if(null!==n)nc(n,e,t,ec());qc(e,t)}},St=function(){return vt},Ct=function(e,t){var n=vt;try{return vt=e,t()}finally{vt=n}},ke=function(e,t,n){switch(t){case"input":if(Z(e,n),t=n.name,"radio"===n.type&&null!=t){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=wi(r);if(!i)throw Error(o(90));Y(r),Z(r,i)}}}break;case"textarea":oe(e,n);break;case"select":null!=(t=n.value)&&ne(e,!!n.multiple,t,!1)}},Te=cc,ze=dc;var ed={usingClientEntryPoint:!1,Events:[vi,bi,wi,Pe,Ee,cc]},td={findFiberByHostInstance:yi,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},nd={bundleType:td.bundleType,version:td.version,rendererPackageName:td.rendererPackageName,rendererConfig:td.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:b.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return null===(e=We(e))?null:e.stateNode},findFiberByHostInstance:td.findFiberByHostInstance||function(){return null},findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var rd=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!rd.isDisabled&&rd.supportsFiber)try{it=rd.inject(nd),ot=rd}catch(de){}}t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ed,t.createPortal=function(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!Qc(t))throw Error(o(200));return function(e,t,n){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:k,key:null==r?null:""+r,children:e,containerInfo:t,implementation:n}}(e,t,null,n)},t.createRoot=function(e,t){if(!Qc(e))throw Error(o(299));var n=!1,r="",i=Yc;return null!==t&&void 0!==t&&(!0===t.unstable_strictMode&&(n=!0),void 0!==t.identifierPrefix&&(r=t.identifierPrefix),void 0!==t.onRecoverableError&&(i=t.onRecoverableError)),t=Ic(e,1,!1,null,0,n,0,r,i),e[fi]=t.current,Vr(8===e.nodeType?e.parentNode:e),new Gc(t)},t.findDOMNode=function(e){if(null==e)return null;if(1===e.nodeType)return e;var t=e._reactInternals;if(void 0===t){if("function"===typeof e.render)throw Error(o(188));throw e=Object.keys(e).join(","),Error(o(268,e))}return e=null===(e=We(t))?null:e.stateNode},t.flushSync=function(e){return dc(e)},t.hydrate=function(e,t,n){if(!Xc(t))throw Error(o(200));return Jc(null,e,t,!0,n)},t.hydrateRoot=function(e,t,n){if(!Qc(e))throw Error(o(405));var r=null!=n&&n.hydratedSources||null,i=!1,a="",s=Yc;if(null!==n&&void 0!==n&&(!0===n.unstable_strictMode&&(i=!0),void 0!==n.identifierPrefix&&(a=n.identifierPrefix),void 0!==n.onRecoverableError&&(s=n.onRecoverableError)),t=Vc(t,null,e,1,null!=n?n:null,i,0,a,s),e[fi]=t.current,Vr(e),r)for(e=0;e<r.length;e++)i=(i=(n=r[e])._getVersion)(n._source),null==t.mutableSourceEagerHydrationData?t.mutableSourceEagerHydrationData=[n,i]:t.mutableSourceEagerHydrationData.push(n,i);return new Kc(t)},t.render=function(e,t,n){if(!Xc(t))throw Error(o(200));return Jc(null,e,t,!1,n)},t.unmountComponentAtNode=function(e){if(!Xc(e))throw Error(o(40));return!!e._reactRootContainer&&(dc(function(){Jc(null,null,e,!1,function(){e._reactRootContainer=null,e[fi]=null})}),!0)},t.unstable_batchedUpdates=cc,t.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Xc(n))throw Error(o(200));if(null==e||void 0===e._reactInternals)throw Error(o(38));return Jc(e,t,n,!1,r)},t.version="18.3.1-next-f1338f8080-20240426"},853:(e,t,n)=>{"use strict";e.exports=n(234)},950:(e,t,n)=>{"use strict";!function e(){if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(t){console.error(t)}}(),e.exports=n(730)}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},(()=>{var e,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;n.t=function(r,i){if(1&i&&(r=this(r)),8&i)return r;if("object"===typeof r&&r){if(4&i&&r.__esModule)return r;if(16&i&&"function"===typeof r.then)return r}var o=Object.create(null);n.r(o);var a={};e=e||[null,t({}),t([]),t(t)];for(var s=2&i&&r;("object"==typeof s||"function"==typeof s)&&!~e.indexOf(s);s=t(s))Object.getOwnPropertyNames(s).forEach(e=>a[e]=()=>r[e]);return a.default=()=>r,n.d(o,a),o}})(),n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.nc=void 0,(()=>{"use strict";var e,t=n(43),r=n.t(t,2),i=n(391);function o(){return o=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o.apply(this,arguments)}!function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"}(e||(e={}));const a="popstate";function s(e,t){if(!1===e||null===e||"undefined"===typeof e)throw new Error(t)}function l(e,t){if(!e){"undefined"!==typeof console&&console.warn(t);try{throw new Error(t)}catch(n){}}}function c(e,t){return{usr:e.state,key:e.key,idx:t}}function d(e,t,n,r){return void 0===n&&(n=null),o({pathname:"string"===typeof e?e:e.pathname,search:"",hash:""},"string"===typeof t?p(t):t,{state:n,key:t&&t.key||r||Math.random().toString(36).substr(2,8)})}function u(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&"?"!==n&&(t+="?"===n.charAt(0)?n:"?"+n),r&&"#"!==r&&(t+="#"===r.charAt(0)?r:"#"+r),t}function p(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function h(t,n,r,i){void 0===i&&(i={});let{window:l=document.defaultView,v5Compat:p=!1}=i,h=l.history,f=e.Pop,m=null,g=x();function x(){return(h.state||{idx:null}).idx}function y(){f=e.Pop;let t=x(),n=null==t?null:t-g;g=t,m&&m({action:f,location:b.location,delta:n})}function v(e){let t="null"!==l.location.origin?l.location.origin:l.location.href,n="string"===typeof e?e:u(e);return n=n.replace(/ $/,"%20"),s(t,"No window.location.(origin|href) available to create URL for href: "+n),new URL(n,t)}null==g&&(g=0,h.replaceState(o({},h.state,{idx:g}),""));let b={get action(){return f},get location(){return t(l,h)},listen(e){if(m)throw new Error("A history only accepts one active listener");return l.addEventListener(a,y),m=e,()=>{l.removeEventListener(a,y),m=null}},createHref:e=>n(l,e),createURL:v,encodeLocation(e){let t=v(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:function(t,n){f=e.Push;let i=d(b.location,t,n);r&&r(i,t),g=x()+1;let o=c(i,g),a=b.createHref(i);try{h.pushState(o,"",a)}catch(s){if(s instanceof DOMException&&"DataCloneError"===s.name)throw s;l.location.assign(a)}p&&m&&m({action:f,location:b.location,delta:1})},replace:function(t,n){f=e.Replace;let i=d(b.location,t,n);r&&r(i,t),g=x();let o=c(i,g),a=b.createHref(i);h.replaceState(o,"",a),p&&m&&m({action:f,location:b.location,delta:0})},go:e=>h.go(e)};return b}var f;!function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"}(f||(f={}));new Set(["lazy","caseSensitive","path","id","index","children"]);function m(e,t,n){return void 0===n&&(n="/"),g(e,t,n,!1)}function g(e,t,n,r){let i=A(("string"===typeof t?p(t):t).pathname||"/",n);if(null==i)return null;let o=x(e);!function(e){e.sort((e,t)=>e.score!==t.score?t.score-e.score:function(e,t){let n=e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n]);return n?e[e.length-1]-t[t.length-1]:0}(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)))}(o);let a=null;for(let s=0;null==a&&s<o.length;++s){let e=z(i);a=E(o[s],e,r)}return a}function x(e,t,n,r){void 0===t&&(t=[]),void 0===n&&(n=[]),void 0===r&&(r="");let i=(e,i,o)=>{let a={relativePath:void 0===o?e.path||"":o,caseSensitive:!0===e.caseSensitive,childrenIndex:i,route:e};a.relativePath.startsWith("/")&&(s(a.relativePath.startsWith(r),'Absolute route path "'+a.relativePath+'" nested under path "'+r+'" is not valid. An absolute child route path must start with the combined path of all its parent routes.'),a.relativePath=a.relativePath.slice(r.length));let l=R([r,a.relativePath]),c=n.concat(a);e.children&&e.children.length>0&&(s(!0!==e.index,'Index routes must not have child routes. Please remove all child routes from route path "'+l+'".'),x(e.children,t,c,l)),(null!=e.path||e.index)&&t.push({path:l,score:P(l,e.index),routesMeta:c})};return e.forEach((e,t)=>{var n;if(""!==e.path&&null!=(n=e.path)&&n.includes("?"))for(let r of y(e.path))i(e,t,r);else i(e,t)}),t}function y(e){let t=e.split("/");if(0===t.length)return[];let[n,...r]=t,i=n.endsWith("?"),o=n.replace(/\?$/,"");if(0===r.length)return i?[o,""]:[o];let a=y(r.join("/")),s=[];return s.push(...a.map(e=>""===e?o:[o,e].join("/"))),i&&s.push(...a),s.map(t=>e.startsWith("/")&&""===t?"/":t)}const v=/^:[\w-]+$/,b=3,w=2,k=1,j=10,S=-2,C=e=>"*"===e;function P(e,t){let n=e.split("/"),r=n.length;return n.some(C)&&(r+=S),t&&(r+=w),n.filter(e=>!C(e)).reduce((e,t)=>e+(v.test(t)?b:""===t?k:j),r)}function E(e,t,n){void 0===n&&(n=!1);let{routesMeta:r}=e,i={},o="/",a=[];for(let s=0;s<r.length;++s){let e=r[s],l=s===r.length-1,c="/"===o?t:t.slice(o.length)||"/",d=T({path:e.relativePath,caseSensitive:e.caseSensitive,end:l},c),u=e.route;if(!d&&l&&n&&!r[r.length-1].route.index&&(d=T({path:e.relativePath,caseSensitive:e.caseSensitive,end:!1},c)),!d)return null;Object.assign(i,d.params),a.push({params:i,pathname:R([o,d.pathname]),pathnameBase:L(R([o,d.pathnameBase])),route:u}),"/"!==d.pathnameBase&&(o=R([o,d.pathnameBase]))}return a}function T(e,t){"string"===typeof e&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=function(e,t,n){void 0===t&&(t=!1);void 0===n&&(n=!0);l("*"===e||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were "'+e.replace(/\*$/,"/*")+'" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "'+e.replace(/\*$/,"/*")+'".');let r=[],i="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(e,t,n)=>(r.push({paramName:t,isOptional:null!=n}),n?"/?([^\\/]+)?":"/([^\\/]+)"));e.endsWith("*")?(r.push({paramName:"*"}),i+="*"===e||"/*"===e?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?i+="\\/*$":""!==e&&"/"!==e&&(i+="(?:(?=\\/|$))");let o=new RegExp(i,t?void 0:"i");return[o,r]}(e.path,e.caseSensitive,e.end),i=t.match(n);if(!i)return null;let o=i[0],a=o.replace(/(.)\/+$/,"$1"),s=i.slice(1),c=r.reduce((e,t,n)=>{let{paramName:r,isOptional:i}=t;if("*"===r){let e=s[n]||"";a=o.slice(0,o.length-e.length).replace(/(.)\/+$/,"$1")}const l=s[n];return e[r]=i&&!l?void 0:(l||"").replace(/%2F/g,"/"),e},{});return{params:c,pathname:o,pathnameBase:a,pattern:e}}function z(e){try{return e.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(t){return l(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent encoding ('+t+")."),e}}function A(e,t){if("/"===t)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&"/"!==r?null:e.slice(n)||"/"}function _(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified `to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the `to."+n+'` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.'}function M(e){return e.filter((e,t)=>0===t||e.route.path&&e.route.path.length>0)}function $(e,t){let n=M(e);return t?n.map((e,t)=>t===n.length-1?e.pathname:e.pathnameBase):n.map(e=>e.pathnameBase)}function N(e,t,n,r){let i;void 0===r&&(r=!1),"string"===typeof e?i=p(e):(i=o({},e),s(!i.pathname||!i.pathname.includes("?"),_("?","pathname","search",i)),s(!i.pathname||!i.pathname.includes("#"),_("#","pathname","hash",i)),s(!i.search||!i.search.includes("#"),_("#","search","hash",i)));let a,l=""===e||""===i.pathname,c=l?"/":i.pathname;if(null==c)a=n;else{let e=t.length-1;if(!r&&c.startsWith("..")){let t=c.split("/");for(;".."===t[0];)t.shift(),e-=1;i.pathname=t.join("/")}a=e>=0?t[e]:"/"}let d=function(e,t){void 0===t&&(t="/");let{pathname:n,search:r="",hash:i=""}="string"===typeof e?p(e):e,o=n?n.startsWith("/")?n:function(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(e=>{".."===e?n.length>1&&n.pop():"."!==e&&n.push(e)}),n.length>1?n.join("/"):"/"}(n,t):t;return{pathname:o,search:D(r),hash:F(i)}}(i,a),u=c&&"/"!==c&&c.endsWith("/"),h=(l||"."===c)&&n.endsWith("/");return d.pathname.endsWith("/")||!u&&!h||(d.pathname+="/"),d}const R=e=>e.join("/").replace(/\/\/+/g,"/"),L=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),D=e=>e&&"?"!==e?e.startsWith("?")?e:"?"+e:"",F=e=>e&&"#"!==e?e.startsWith("#")?e:"#"+e:"";Error;function O(e){return null!=e&&"number"===typeof e.status&&"string"===typeof e.statusText&&"boolean"===typeof e.internal&&"data"in e}const I=["post","put","patch","delete"],B=(new Set(I),["get",...I]);new Set(B),new Set([301,302,303,307,308]),new Set([307,308]);Symbol("deferred");function V(){return V=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},V.apply(this,arguments)}const U=t.createContext(null);const H=t.createContext(null);const W=t.createContext(null);const q=t.createContext(null);const Y=t.createContext({outlet:null,matches:[],isDataRoute:!1});const G=t.createContext(null);function K(){return null!=t.useContext(q)}function Q(){return K()||s(!1),t.useContext(q).location}function X(e){t.useContext(W).static||t.useLayoutEffect(e)}function Z(){let{isDataRoute:e}=t.useContext(Y);return e?function(){let{router:e}=le(ae.UseNavigateStable),n=de(se.UseNavigateStable),r=t.useRef(!1);X(()=>{r.current=!0});let i=t.useCallback(function(t,i){void 0===i&&(i={}),r.current&&("number"===typeof t?e.navigate(t):e.navigate(t,V({fromRouteId:n},i)))},[e,n]);return i}():function(){K()||s(!1);let e=t.useContext(U),{basename:n,future:r,navigator:i}=t.useContext(W),{matches:o}=t.useContext(Y),{pathname:a}=Q(),l=JSON.stringify($(o,r.v7_relativeSplatPath)),c=t.useRef(!1);return X(()=>{c.current=!0}),t.useCallback(function(t,r){if(void 0===r&&(r={}),!c.current)return;if("number"===typeof t)return void i.go(t);let o=N(t,JSON.parse(l),a,"path"===r.relative);null==e&&"/"!==n&&(o.pathname="/"===o.pathname?n:R([n,o.pathname])),(r.replace?i.replace:i.push)(o,r.state,r)},[n,i,l,a,e])}()}function J(e,n){let{relative:r}=void 0===n?{}:n,{future:i}=t.useContext(W),{matches:o}=t.useContext(Y),{pathname:a}=Q(),s=JSON.stringify($(o,i.v7_relativeSplatPath));return t.useMemo(()=>N(e,JSON.parse(s),a,"path"===r),[e,s,a,r])}function ee(n,r,i,o){K()||s(!1);let{navigator:a}=t.useContext(W),{matches:l}=t.useContext(Y),c=l[l.length-1],d=c?c.params:{},u=(c&&c.pathname,c?c.pathnameBase:"/");c&&c.route;let h,f=Q();if(r){var g;let e="string"===typeof r?p(r):r;"/"===u||(null==(g=e.pathname)?void 0:g.startsWith(u))||s(!1),h=e}else h=f;let x=h.pathname||"/",y=x;if("/"!==u){let e=u.replace(/^\//,"").split("/");y="/"+x.replace(/^\//,"").split("/").slice(e.length).join("/")}let v=m(n,{pathname:y});let b=oe(v&&v.map(e=>Object.assign({},e,{params:Object.assign({},d,e.params),pathname:R([u,a.encodeLocation?a.encodeLocation(e.pathname).pathname:e.pathname]),pathnameBase:"/"===e.pathnameBase?u:R([u,a.encodeLocation?a.encodeLocation(e.pathnameBase).pathname:e.pathnameBase])})),l,i,o);return r&&b?t.createElement(q.Provider,{value:{location:V({pathname:"/",search:"",hash:"",state:null,key:"default"},h),navigationType:e.Pop}},b):b}function te(){let e=function(){var e;let n=t.useContext(G),r=ce(se.UseRouteError),i=de(se.UseRouteError);if(void 0!==n)return n;return null==(e=r.errors)?void 0:e[i]}(),n=O(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,i="rgba(200,200,200, 0.5)",o={padding:"0.5rem",backgroundColor:i};return t.createElement(t.Fragment,null,t.createElement("h2",null,"Unexpected Application Error!"),t.createElement("h3",{style:{fontStyle:"italic"}},n),r?t.createElement("pre",{style:o},r):null,null)}const ne=t.createElement(te,null);class re extends t.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||"idle"!==t.revalidation&&"idle"===e.revalidation?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:void 0!==e.error?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return void 0!==this.state.error?t.createElement(Y.Provider,{value:this.props.routeContext},t.createElement(G.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function ie(e){let{routeContext:n,match:r,children:i}=e,o=t.useContext(U);return o&&o.static&&o.staticContext&&(r.route.errorElement||r.route.ErrorBoundary)&&(o.staticContext._deepestRenderedBoundaryId=r.route.id),t.createElement(Y.Provider,{value:n},i)}function oe(e,n,r,i){var o;if(void 0===n&&(n=[]),void 0===r&&(r=null),void 0===i&&(i=null),null==e){var a;if(!r)return null;if(r.errors)e=r.matches;else{if(!(null!=(a=i)&&a.v7_partialHydration&&0===n.length&&!r.initialized&&r.matches.length>0))return null;e=r.matches}}let l=e,c=null==(o=r)?void 0:o.errors;if(null!=c){let e=l.findIndex(e=>e.route.id&&void 0!==(null==c?void 0:c[e.route.id]));e>=0||s(!1),l=l.slice(0,Math.min(l.length,e+1))}let d=!1,u=-1;if(r&&i&&i.v7_partialHydration)for(let t=0;t<l.length;t++){let e=l[t];if((e.route.HydrateFallback||e.route.hydrateFallbackElement)&&(u=t),e.route.id){let{loaderData:t,errors:n}=r,i=e.route.loader&&void 0===t[e.route.id]&&(!n||void 0===n[e.route.id]);if(e.route.lazy||i){d=!0,l=u>=0?l.slice(0,u+1):[l[0]];break}}}return l.reduceRight((e,i,o)=>{let a,s=!1,p=null,h=null;var f;r&&(a=c&&i.route.id?c[i.route.id]:void 0,p=i.route.errorElement||ne,d&&(u<0&&0===o?(f="route-fallback",!1||ue[f]||(ue[f]=!0),s=!0,h=null):u===o&&(s=!0,h=i.route.hydrateFallbackElement||null)));let m=n.concat(l.slice(0,o+1)),g=()=>{let n;return n=a?p:s?h:i.route.Component?t.createElement(i.route.Component,null):i.route.element?i.route.element:e,t.createElement(ie,{match:i,routeContext:{outlet:e,matches:m,isDataRoute:null!=r},children:n})};return r&&(i.route.ErrorBoundary||i.route.errorElement||0===o)?t.createElement(re,{location:r.location,revalidation:r.revalidation,component:p,error:a,children:g(),routeContext:{outlet:null,matches:m,isDataRoute:!0}}):g()},null)}var ae=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(ae||{}),se=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(se||{});function le(e){let n=t.useContext(U);return n||s(!1),n}function ce(e){let n=t.useContext(H);return n||s(!1),n}function de(e){let n=function(){let e=t.useContext(Y);return e||s(!1),e}(),r=n.matches[n.matches.length-1];return r.route.id||s(!1),r.route.id}const ue={};function pe(e,t){null==e||e.v7_startTransition,void 0===(null==e?void 0:e.v7_relativeSplatPath)&&(!t||t.v7_relativeSplatPath),t&&(t.v7_fetcherPersist,t.v7_normalizeFormMethod,t.v7_partialHydration,t.v7_skipActionErrorRevalidation)}r.startTransition;function he(e){s(!1)}function fe(n){let{basename:r="/",children:i=null,location:o,navigationType:a=e.Pop,navigator:l,static:c=!1,future:d}=n;K()&&s(!1);let u=r.replace(/^\/*/,"/"),h=t.useMemo(()=>({basename:u,navigator:l,static:c,future:V({v7_relativeSplatPath:!1},d)}),[u,d,l,c]);"string"===typeof o&&(o=p(o));let{pathname:f="/",search:m="",hash:g="",state:x=null,key:y="default"}=o,v=t.useMemo(()=>{let e=A(f,u);return null==e?null:{location:{pathname:e,search:m,hash:g,state:x,key:y},navigationType:a}},[u,f,m,g,x,y,a]);return null==v?null:t.createElement(W.Provider,{value:h},t.createElement(q.Provider,{children:i,value:v}))}function me(e){let{children:t,location:n}=e;return ee(ge(t),n)}new Promise(()=>{});t.Component;function ge(e,n){void 0===n&&(n=[]);let r=[];return t.Children.forEach(e,(e,i)=>{if(!t.isValidElement(e))return;let o=[...n,i];if(e.type===t.Fragment)return void r.push.apply(r,ge(e.props.children,o));e.type!==he&&s(!1),e.props.index&&e.props.children&&s(!1);let a={id:e.props.id||o.join("-"),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,loader:e.props.loader,action:e.props.action,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:null!=e.props.ErrorBoundary||null!=e.props.errorElement,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(a.children=ge(e.props.children,o)),r.push(a)}),r}var xe=n(950),ye=n.t(xe,2);function ve(){return ve=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},ve.apply(this,arguments)}function be(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);const we=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],ke=["aria-current","caseSensitive","className","end","style","to","viewTransition","children"];try{window.__reactRouterVersion="6"}catch(uS){}const je=t.createContext({isTransitioning:!1});new Map;const Se=r.startTransition;ye.flushSync,r.useId;function Ce(e){let{basename:n,children:r,future:i,window:o}=e,a=t.useRef();var s;null==a.current&&(a.current=(void 0===(s={window:o,v5Compat:!0})&&(s={}),h(function(e,t){let{pathname:n,search:r,hash:i}=e.location;return d("",{pathname:n,search:r,hash:i},t.state&&t.state.usr||null,t.state&&t.state.key||"default")},function(e,t){return"string"===typeof t?t:u(t)},null,s)));let l=a.current,[c,p]=t.useState({action:l.action,location:l.location}),{v7_startTransition:f}=i||{},m=t.useCallback(e=>{f&&Se?Se(()=>p(e)):p(e)},[p,f]);return t.useLayoutEffect(()=>l.listen(m),[l,m]),t.useEffect(()=>pe(i),[i]),t.createElement(fe,{basename:n,children:r,location:c.location,navigationType:c.action,navigator:l,future:i})}const Pe="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement,Ee=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Te=t.forwardRef(function(e,n){let r,{onClick:i,relative:o,reloadDocument:a,replace:l,state:c,target:d,to:p,preventScrollReset:h,viewTransition:f}=e,m=be(e,we),{basename:g}=t.useContext(W),x=!1;if("string"===typeof p&&Ee.test(p)&&(r=p,Pe))try{let e=new URL(window.location.href),t=p.startsWith("//")?new URL(e.protocol+p):new URL(p),n=A(t.pathname,g);t.origin===e.origin&&null!=n?p=n+t.search+t.hash:x=!0}catch(uS){}let y=function(e,n){let{relative:r}=void 0===n?{}:n;K()||s(!1);let{basename:i,navigator:o}=t.useContext(W),{hash:a,pathname:l,search:c}=J(e,{relative:r}),d=l;return"/"!==i&&(d="/"===l?i:R([i,l])),o.createHref({pathname:d,search:c,hash:a})}(p,{relative:o}),v=function(e,n){let{target:r,replace:i,state:o,preventScrollReset:a,relative:s,viewTransition:l}=void 0===n?{}:n,c=Z(),d=Q(),p=J(e,{relative:s});return t.useCallback(t=>{if(function(e,t){return 0===e.button&&(!t||"_self"===t)&&!function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}(e)}(t,r)){t.preventDefault();let n=void 0!==i?i:u(d)===u(p);c(e,{replace:n,state:o,preventScrollReset:a,relative:s,viewTransition:l})}},[d,c,p,i,o,r,e,a,s,l])}(p,{replace:l,state:c,target:d,preventScrollReset:h,relative:o,viewTransition:f});return t.createElement("a",ve({},m,{href:r||y,onClick:x||a?i:function(e){i&&i(e),e.defaultPrevented||v(e)},ref:n,target:d}))});const ze=t.forwardRef(function(e,n){let{"aria-current":r="page",caseSensitive:i=!1,className:o="",end:a=!1,style:l,to:c,viewTransition:d,children:u}=e,p=be(e,ke),h=J(c,{relative:p.relative}),f=Q(),m=t.useContext(H),{navigator:g,basename:x}=t.useContext(W),y=null!=m&&function(e,n){void 0===n&&(n={});let r=t.useContext(je);null==r&&s(!1);let{basename:i}=Me(Ae.useViewTransitionState),o=J(e,{relative:n.relative});if(!r.isTransitioning)return!1;let a=A(r.currentLocation.pathname,i)||r.currentLocation.pathname,l=A(r.nextLocation.pathname,i)||r.nextLocation.pathname;return null!=T(o.pathname,l)||null!=T(o.pathname,a)}(h)&&!0===d,v=g.encodeLocation?g.encodeLocation(h).pathname:h.pathname,b=f.pathname,w=m&&m.navigation&&m.navigation.location?m.navigation.location.pathname:null;i||(b=b.toLowerCase(),w=w?w.toLowerCase():null,v=v.toLowerCase()),w&&x&&(w=A(w,x)||w);const k="/"!==v&&v.endsWith("/")?v.length-1:v.length;let j,S=b===v||!a&&b.startsWith(v)&&"/"===b.charAt(k),C=null!=w&&(w===v||!a&&w.startsWith(v)&&"/"===w.charAt(v.length)),P={isActive:S,isPending:C,isTransitioning:y},E=S?r:void 0;j="function"===typeof o?o(P):[o,S?"active":null,C?"pending":null,y?"transitioning":null].filter(Boolean).join(" ");let z="function"===typeof l?l(P):l;return t.createElement(Te,ve({},p,{"aria-current":E,className:j,ref:n,style:z,to:c,viewTransition:d}),"function"===typeof u?u(P):u)});var Ae,_e;function Me(e){let n=t.useContext(U);return n||s(!1),n}(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(Ae||(Ae={})),function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"}(_e||(_e={}));function $e(e){var t,n,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=$e(e[t]))&&(r&&(r+=" "),r+=n);else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}const Ne=function(){for(var e,t,n=0,r="";n<arguments.length;)(e=arguments[n++])&&(t=$e(e))&&(r&&(r+=" "),r+=t);return r},Re=e=>"number"==typeof e&&!isNaN(e),Le=e=>"string"==typeof e,De=e=>"function"==typeof e,Fe=e=>Le(e)||De(e)?e:null,Oe=e=>(0,t.isValidElement)(e)||Le(e)||De(e)||Re(e);function Ie(e){let{enter:n,exit:r,appendPosition:i=!1,collapse:o=!0,collapseDuration:a=300}=e;return function(e){let{children:s,position:l,preventExitTransition:c,done:d,nodeRef:u,isIn:p}=e;const h=i?`${n}--${l}`:n,f=i?`${r}--${l}`:r,m=(0,t.useRef)(0);return(0,t.useLayoutEffect)(()=>{const e=u.current,t=h.split(" "),n=r=>{r.target===u.current&&(e.dispatchEvent(new Event("d")),e.removeEventListener("animationend",n),e.removeEventListener("animationcancel",n),0===m.current&&"animationcancel"!==r.type&&e.classList.remove(...t))};e.classList.add(...t),e.addEventListener("animationend",n),e.addEventListener("animationcancel",n)},[]),(0,t.useEffect)(()=>{const e=u.current,t=()=>{e.removeEventListener("animationend",t),o?function(e,t,n){void 0===n&&(n=300);const{scrollHeight:r,style:i}=e;requestAnimationFrame(()=>{i.minHeight="initial",i.height=r+"px",i.transition=`all ${n}ms`,requestAnimationFrame(()=>{i.height="0",i.padding="0",i.margin="0",setTimeout(t,n)})})}(e,d,a):d()};p||(c?t():(m.current=1,e.className+=` ${f}`,e.addEventListener("animationend",t)))},[p]),t.createElement(t.Fragment,null,s)}}function Be(e,t){return null!=e?{content:e.content,containerId:e.props.containerId,id:e.props.toastId,theme:e.props.theme,type:e.props.type,data:e.props.data||{},isLoading:e.props.isLoading,icon:e.props.icon,status:t}:{}}const Ve={list:new Map,emitQueue:new Map,on(e,t){return this.list.has(e)||this.list.set(e,[]),this.list.get(e).push(t),this},off(e,t){if(t){const n=this.list.get(e).filter(e=>e!==t);return this.list.set(e,n),this}return this.list.delete(e),this},cancelEmit(e){const t=this.emitQueue.get(e);return t&&(t.forEach(clearTimeout),this.emitQueue.delete(e)),this},emit(e){this.list.has(e)&&this.list.get(e).forEach(t=>{const n=setTimeout(()=>{t(...[].slice.call(arguments,1))},0);this.emitQueue.has(e)||this.emitQueue.set(e,[]),this.emitQueue.get(e).push(n)})}},Ue=e=>{let{theme:n,type:r,...i}=e;return t.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:"colored"===n?"currentColor":`var(--toastify-icon-color-${r})`,...i})},He={info:function(e){return t.createElement(Ue,{...e},t.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))},warning:function(e){return t.createElement(Ue,{...e},t.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))},success:function(e){return t.createElement(Ue,{...e},t.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))},error:function(e){return t.createElement(Ue,{...e},t.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))},spinner:function(){return t.createElement("div",{className:"Toastify__spinner"})}};function We(e){const[,n]=(0,t.useReducer)(e=>e+1,0),[r,i]=(0,t.useState)([]),o=(0,t.useRef)(null),a=(0,t.useRef)(new Map).current,s=e=>-1!==r.indexOf(e),l=(0,t.useRef)({toastKey:1,displayedToast:0,count:0,queue:[],props:e,containerId:null,isToastActive:s,getToast:e=>a.get(e)}).current;function c(e){let{containerId:t}=e;const{limit:n}=l.props;!n||t&&l.containerId!==t||(l.count-=l.queue.length,l.queue=[])}function d(e){i(t=>null==e?[]:t.filter(t=>t!==e))}function u(){const{toastContent:e,toastProps:t,staleId:n}=l.queue.shift();h(e,t,n)}function p(e,r){let{delay:i,staleId:s,...c}=r;if(!Oe(e)||function(e){return!o.current||l.props.enableMultiContainer&&e.containerId!==l.props.containerId||a.has(e.toastId)&&null==e.updateId}(c))return;const{toastId:p,updateId:f,data:m}=c,{props:g}=l,x=()=>d(p),y=null==f;y&&l.count++;const v={...g,style:g.toastStyle,key:l.toastKey++,...Object.fromEntries(Object.entries(c).filter(e=>{let[t,n]=e;return null!=n})),toastId:p,updateId:f,data:m,closeToast:x,isIn:!1,className:Fe(c.className||g.toastClassName),bodyClassName:Fe(c.bodyClassName||g.bodyClassName),progressClassName:Fe(c.progressClassName||g.progressClassName),autoClose:!c.isLoading&&(b=c.autoClose,w=g.autoClose,!1===b||Re(b)&&b>0?b:w),deleteToast(){const e=Be(a.get(p),"removed");a.delete(p),Ve.emit(4,e);const t=l.queue.length;if(l.count=null==p?l.count-l.displayedToast:l.count-1,l.count<0&&(l.count=0),t>0){const e=null==p?l.props.limit:1;if(1===t||1===e)l.displayedToast++,u();else{const n=e>t?t:e;l.displayedToast=n;for(let e=0;e<n;e++)u()}}else n()}};var b,w;v.iconOut=function(e){let{theme:n,type:r,isLoading:i,icon:o}=e,a=null;const s={theme:n,type:r};return!1===o||(De(o)?a=o(s):(0,t.isValidElement)(o)?a=(0,t.cloneElement)(o,s):Le(o)||Re(o)?a=o:i?a=He.spinner():(e=>e in He)(r)&&(a=He[r](s))),a}(v),De(c.onOpen)&&(v.onOpen=c.onOpen),De(c.onClose)&&(v.onClose=c.onClose),v.closeButton=g.closeButton,!1===c.closeButton||Oe(c.closeButton)?v.closeButton=c.closeButton:!0===c.closeButton&&(v.closeButton=!Oe(g.closeButton)||g.closeButton);let k=e;(0,t.isValidElement)(e)&&!Le(e.type)?k=(0,t.cloneElement)(e,{closeToast:x,toastProps:v,data:m}):De(e)&&(k=e({closeToast:x,toastProps:v,data:m})),g.limit&&g.limit>0&&l.count>g.limit&&y?l.queue.push({toastContent:k,toastProps:v,staleId:s}):Re(i)?setTimeout(()=>{h(k,v,s)},i):h(k,v,s)}function h(e,t,n){const{toastId:r}=t;n&&a.delete(n);const o={content:e,props:t};a.set(r,o),i(e=>[...e,r].filter(e=>e!==n)),Ve.emit(4,Be(o,null==o.props.updateId?"added":"updated"))}return(0,t.useEffect)(()=>(l.containerId=e.containerId,Ve.cancelEmit(3).on(0,p).on(1,e=>o.current&&d(e)).on(5,c).emit(2,l),()=>{a.clear(),Ve.emit(3,l)}),[]),(0,t.useEffect)(()=>{l.props=e,l.isToastActive=s,l.displayedToast=r.length}),{getToastToRender:function(t){const n=new Map,r=Array.from(a.values());return e.newestOnTop&&r.reverse(),r.forEach(e=>{const{position:t}=e.props;n.has(t)||n.set(t,[]),n.get(t).push(e)}),Array.from(n,e=>t(e[0],e[1]))},containerRef:o,isToastActive:s}}function qe(e){return e.targetTouches&&e.targetTouches.length>=1?e.targetTouches[0].clientX:e.clientX}function Ye(e){return e.targetTouches&&e.targetTouches.length>=1?e.targetTouches[0].clientY:e.clientY}function Ge(e){const[n,r]=(0,t.useState)(!1),[i,o]=(0,t.useState)(!1),a=(0,t.useRef)(null),s=(0,t.useRef)({start:0,x:0,y:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,boundingRect:null,didMove:!1}).current,l=(0,t.useRef)(e),{autoClose:c,pauseOnHover:d,closeToast:u,onClick:p,closeOnClick:h}=e;function f(t){if(e.draggable){"touchstart"===t.nativeEvent.type&&t.nativeEvent.preventDefault(),s.didMove=!1,document.addEventListener("mousemove",y),document.addEventListener("mouseup",v),document.addEventListener("touchmove",y),document.addEventListener("touchend",v);const n=a.current;s.canCloseOnClick=!0,s.canDrag=!0,s.boundingRect=n.getBoundingClientRect(),n.style.transition="",s.x=qe(t.nativeEvent),s.y=Ye(t.nativeEvent),"x"===e.draggableDirection?(s.start=s.x,s.removalDistance=n.offsetWidth*(e.draggablePercent/100)):(s.start=s.y,s.removalDistance=n.offsetHeight*(80===e.draggablePercent?1.5*e.draggablePercent:e.draggablePercent/100))}}function m(t){if(s.boundingRect){const{top:n,bottom:r,left:i,right:o}=s.boundingRect;"touchend"!==t.nativeEvent.type&&e.pauseOnHover&&s.x>=i&&s.x<=o&&s.y>=n&&s.y<=r?x():g()}}function g(){r(!0)}function x(){r(!1)}function y(t){const r=a.current;s.canDrag&&r&&(s.didMove=!0,n&&x(),s.x=qe(t),s.y=Ye(t),s.delta="x"===e.draggableDirection?s.x-s.start:s.y-s.start,s.start!==s.x&&(s.canCloseOnClick=!1),r.style.transform=`translate${e.draggableDirection}(${s.delta}px)`,r.style.opacity=""+(1-Math.abs(s.delta/s.removalDistance)))}function v(){document.removeEventListener("mousemove",y),document.removeEventListener("mouseup",v),document.removeEventListener("touchmove",y),document.removeEventListener("touchend",v);const t=a.current;if(s.canDrag&&s.didMove&&t){if(s.canDrag=!1,Math.abs(s.delta)>s.removalDistance)return o(!0),void e.closeToast();t.style.transition="transform 0.2s, opacity 0.2s",t.style.transform=`translate${e.draggableDirection}(0)`,t.style.opacity="1"}}(0,t.useEffect)(()=>{l.current=e}),(0,t.useEffect)(()=>(a.current&&a.current.addEventListener("d",g,{once:!0}),De(e.onOpen)&&e.onOpen((0,t.isValidElement)(e.children)&&e.children.props),()=>{const e=l.current;De(e.onClose)&&e.onClose((0,t.isValidElement)(e.children)&&e.children.props)}),[]),(0,t.useEffect)(()=>(e.pauseOnFocusLoss&&(document.hasFocus()||x(),window.addEventListener("focus",g),window.addEventListener("blur",x)),()=>{e.pauseOnFocusLoss&&(window.removeEventListener("focus",g),window.removeEventListener("blur",x))}),[e.pauseOnFocusLoss]);const b={onMouseDown:f,onTouchStart:f,onMouseUp:m,onTouchEnd:m};return c&&d&&(b.onMouseEnter=x,b.onMouseLeave=g),h&&(b.onClick=e=>{p&&p(e),s.canCloseOnClick&&u()}),{playToast:g,pauseToast:x,isRunning:n,preventExitTransition:i,toastRef:a,eventHandlers:b}}function Ke(e){let{closeToast:n,theme:r,ariaLabel:i="close"}=e;return t.createElement("button",{className:`Toastify__close-button Toastify__close-button--${r}`,type:"button",onClick:e=>{e.stopPropagation(),n(e)},"aria-label":i},t.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},t.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))}function Qe(e){let{delay:n,isRunning:r,closeToast:i,type:o="default",hide:a,className:s,style:l,controlledProgress:c,progress:d,rtl:u,isIn:p,theme:h}=e;const f=a||c&&0===d,m={...l,animationDuration:`${n}ms`,animationPlayState:r?"running":"paused",opacity:f?0:1};c&&(m.transform=`scaleX(${d})`);const g=Ne("Toastify__progress-bar",c?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${h}`,`Toastify__progress-bar--${o}`,{"Toastify__progress-bar--rtl":u}),x=De(s)?s({rtl:u,type:o,defaultClassName:g}):Ne(g,s);return t.createElement("div",{role:"progressbar","aria-hidden":f?"true":"false","aria-label":"notification timer",className:x,style:m,[c&&d>=1?"onTransitionEnd":"onAnimationEnd"]:c&&d<1?null:()=>{p&&i()}})}const Xe=e=>{const{isRunning:n,preventExitTransition:r,toastRef:i,eventHandlers:o}=Ge(e),{closeButton:a,children:s,autoClose:l,onClick:c,type:d,hideProgressBar:u,closeToast:p,transition:h,position:f,className:m,style:g,bodyClassName:x,bodyStyle:y,progressClassName:v,progressStyle:b,updateId:w,role:k,progress:j,rtl:S,toastId:C,deleteToast:P,isIn:E,isLoading:T,iconOut:z,closeOnClick:A,theme:_}=e,M=Ne("Toastify__toast",`Toastify__toast-theme--${_}`,`Toastify__toast--${d}`,{"Toastify__toast--rtl":S},{"Toastify__toast--close-on-click":A}),$=De(m)?m({rtl:S,position:f,type:d,defaultClassName:M}):Ne(M,m),N=!!j||!l,R={closeToast:p,type:d,theme:_};let L=null;return!1===a||(L=De(a)?a(R):(0,t.isValidElement)(a)?(0,t.cloneElement)(a,R):Ke(R)),t.createElement(h,{isIn:E,done:P,position:f,preventExitTransition:r,nodeRef:i},t.createElement("div",{id:C,onClick:c,className:$,...o,style:g,ref:i},t.createElement("div",{...E&&{role:k},className:De(x)?x({type:d}):Ne("Toastify__toast-body",x),style:y},null!=z&&t.createElement("div",{className:Ne("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!T})},z),t.createElement("div",null,s)),L,t.createElement(Qe,{...w&&!N?{key:`pb-${w}`}:{},rtl:S,theme:_,delay:l,isRunning:n,isIn:E,closeToast:p,hide:u,type:d,style:b,className:v,controlledProgress:N,progress:j||0})))},Ze=function(e,t){return void 0===t&&(t=!1),{enter:`Toastify--animate Toastify__${e}-enter`,exit:`Toastify--animate Toastify__${e}-exit`,appendPosition:t}},Je=Ie(Ze("bounce",!0)),et=(Ie(Ze("slide",!0)),Ie(Ze("zoom")),Ie(Ze("flip")),(0,t.forwardRef)((e,n)=>{const{getToastToRender:r,containerRef:i,isToastActive:o}=We(e),{className:a,style:s,rtl:l,containerId:c}=e;function d(e){const t=Ne("Toastify__toast-container",`Toastify__toast-container--${e}`,{"Toastify__toast-container--rtl":l});return De(a)?a({position:e,rtl:l,defaultClassName:t}):Ne(t,Fe(a))}return(0,t.useEffect)(()=>{n&&(n.current=i.current)},[]),t.createElement("div",{ref:i,className:"Toastify",id:c},r((e,n)=>{const r=n.length?{...s}:{...s,pointerEvents:"none"};return t.createElement("div",{className:d(e),style:r,key:`container-${e}`},n.map((e,r)=>{let{content:i,props:a}=e;return t.createElement(Xe,{...a,isIn:o(a.toastId),style:{...a.style,"--nth":r+1,"--len":n.length},key:`toast-${a.key}`},i)}))}))}));et.displayName="ToastContainer",et.defaultProps={position:"top-right",transition:Je,autoClose:5e3,closeButton:Ke,pauseOnHover:!0,pauseOnFocusLoss:!0,closeOnClick:!0,draggable:!0,draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light"};let tt,nt=new Map,rt=[],it=1;function ot(){return""+it++}function at(e){return e&&(Le(e.toastId)||Re(e.toastId))?e.toastId:ot()}function st(e,t){return nt.size>0?Ve.emit(0,e,t):rt.push({content:e,options:t}),t.toastId}function lt(e,t){return{...t,type:t&&t.type||e,toastId:at(t)}}function ct(e){return(t,n)=>st(t,lt(e,n))}function dt(e,t){return st(e,lt("default",t))}dt.loading=(e,t)=>st(e,lt("default",{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...t})),dt.promise=function(e,t,n){let r,{pending:i,error:o,success:a}=t;i&&(r=Le(i)?dt.loading(i,n):dt.loading(i.render,{...n,...i}));const s={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null},l=(e,t,i)=>{if(null==t)return void dt.dismiss(r);const o={type:e,...s,...n,data:i},a=Le(t)?{render:t}:t;return r?dt.update(r,{...o,...a}):dt(a.render,{...o,...a}),i},c=De(e)?e():e;return c.then(e=>l("success",a,e)).catch(e=>l("error",o,e)),c},dt.success=ct("success"),dt.info=ct("info"),dt.error=ct("error"),dt.warning=ct("warning"),dt.warn=dt.warning,dt.dark=(e,t)=>st(e,lt("default",{theme:"dark",...t})),dt.dismiss=e=>{nt.size>0?Ve.emit(1,e):rt=rt.filter(t=>null!=e&&t.options.toastId!==e)},dt.clearWaitingQueue=function(e){return void 0===e&&(e={}),Ve.emit(5,e)},dt.isActive=e=>{let t=!1;return nt.forEach(n=>{n.isToastActive&&n.isToastActive(e)&&(t=!0)}),t},dt.update=function(e,t){void 0===t&&(t={}),setTimeout(()=>{const n=function(e,t){let{containerId:n}=t;const r=nt.get(n||tt);return r&&r.getToast(e)}(e,t);if(n){const{props:r,content:i}=n,o={delay:100,...r,...t,toastId:t.toastId||e,updateId:ot()};o.toastId!==e&&(o.staleId=e);const a=o.render||i;delete o.render,st(a,o)}},0)},dt.done=e=>{dt.update(e,{progress:1})},dt.onChange=e=>(Ve.on(4,e),()=>{Ve.off(4,e)}),dt.POSITION={TOP_LEFT:"top-left",TOP_RIGHT:"top-right",TOP_CENTER:"top-center",BOTTOM_LEFT:"bottom-left",BOTTOM_RIGHT:"bottom-right",BOTTOM_CENTER:"bottom-center"},dt.TYPE={INFO:"info",SUCCESS:"success",WARNING:"warning",ERROR:"error",DEFAULT:"default"},Ve.on(2,e=>{tt=e.containerId||e,nt.set(tt,e),rt.forEach(e=>{Ve.emit(0,e.content,e.options)}),rt=[]}).on(3,e=>{nt.delete(e.containerId||e),0===nt.size&&Ve.off(0).off(1).off(5)});var ut=function(){return ut=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},ut.apply(this,arguments)};Object.create;function pt(e,t,n){if(n||2===arguments.length)for(var r,i=0,o=t.length;i<o;i++)!r&&i in t||(r||(r=Array.prototype.slice.call(t,0,i)),r[i]=t[i]);return e.concat(r||Array.prototype.slice.call(t))}Object.create;"function"===typeof SuppressedError&&SuppressedError;var ht=n(324),ft=n.n(ht),mt="-ms-",gt="-moz-",xt="-webkit-",yt="comm",vt="rule",bt="decl",wt="@keyframes",kt=Math.abs,jt=String.fromCharCode,St=Object.assign;function Ct(e){return e.trim()}function Pt(e,t){return(e=t.exec(e))?e[0]:e}function Et(e,t,n){return e.replace(t,n)}function Tt(e,t,n){return e.indexOf(t,n)}function zt(e,t){return 0|e.charCodeAt(t)}function At(e,t,n){return e.slice(t,n)}function _t(e){return e.length}function Mt(e){return e.length}function $t(e,t){return t.push(e),e}function Nt(e,t){return e.filter(function(e){return!Pt(e,t)})}var Rt=1,Lt=1,Dt=0,Ft=0,Ot=0,It="";function Bt(e,t,n,r,i,o,a,s){return{value:e,root:t,parent:n,type:r,props:i,children:o,line:Rt,column:Lt,length:a,return:"",siblings:s}}function Vt(e,t){return St(Bt("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function Ut(e){for(;e.root;)e=Vt(e.root,{children:[e]});$t(e,e.siblings)}function Ht(){return Ot=Ft>0?zt(It,--Ft):0,Lt--,10===Ot&&(Lt=1,Rt--),Ot}function Wt(){return Ot=Ft<Dt?zt(It,Ft++):0,Lt++,10===Ot&&(Lt=1,Rt++),Ot}function qt(){return zt(It,Ft)}function Yt(){return Ft}function Gt(e,t){return At(It,e,t)}function Kt(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Qt(e){return Rt=Lt=1,Dt=_t(It=e),Ft=0,[]}function Xt(e){return It="",e}function Zt(e){return Ct(Gt(Ft-1,tn(91===e?e+2:40===e?e+1:e)))}function Jt(e){for(;(Ot=qt())&&Ot<33;)Wt();return Kt(e)>2||Kt(Ot)>3?"":" "}function en(e,t){for(;--t&&Wt()&&!(Ot<48||Ot>102||Ot>57&&Ot<65||Ot>70&&Ot<97););return Gt(e,Yt()+(t<6&&32==qt()&&32==Wt()))}function tn(e){for(;Wt();)switch(Ot){case e:return Ft;case 34:case 39:34!==e&&39!==e&&tn(Ot);break;case 40:41===e&&tn(e);break;case 92:Wt()}return Ft}function nn(e,t){for(;Wt()&&e+Ot!==57&&(e+Ot!==84||47!==qt()););return"/*"+Gt(t,Ft-1)+"*"+jt(47===e?e:Wt())}function rn(e){for(;!Kt(qt());)Wt();return Gt(e,Ft)}function on(e,t){for(var n="",r=0;r<e.length;r++)n+=t(e[r],r,e,t)||"";return n}function an(e,t,n,r){switch(e.type){case"@layer":if(e.children.length)break;case"@import":case bt:return e.return=e.return||e.value;case yt:return"";case wt:return e.return=e.value+"{"+on(e.children,r)+"}";case vt:if(!_t(e.value=e.props.join(",")))return""}return _t(n=on(e.children,r))?e.return=e.value+"{"+n+"}":""}function sn(e,t,n){switch(function(e,t){return 45^zt(e,0)?(((t<<2^zt(e,0))<<2^zt(e,1))<<2^zt(e,2))<<2^zt(e,3):0}(e,t)){case 5103:return xt+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return xt+e+e;case 4789:return gt+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return xt+e+gt+e+mt+e+e;case 5936:switch(zt(e,t+11)){case 114:return xt+e+mt+Et(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return xt+e+mt+Et(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return xt+e+mt+Et(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return xt+e+mt+e+e;case 6165:return xt+e+mt+"flex-"+e+e;case 5187:return xt+e+Et(e,/(\w+).+(:[^]+)/,xt+"box-$1$2"+mt+"flex-$1$2")+e;case 5443:return xt+e+mt+"flex-item-"+Et(e,/flex-|-self/g,"")+(Pt(e,/flex-|baseline/)?"":mt+"grid-row-"+Et(e,/flex-|-self/g,""))+e;case 4675:return xt+e+mt+"flex-line-pack"+Et(e,/align-content|flex-|-self/g,"")+e;case 5548:return xt+e+mt+Et(e,"shrink","negative")+e;case 5292:return xt+e+mt+Et(e,"basis","preferred-size")+e;case 6060:return xt+"box-"+Et(e,"-grow","")+xt+e+mt+Et(e,"grow","positive")+e;case 4554:return xt+Et(e,/([^-])(transform)/g,"$1"+xt+"$2")+e;case 6187:return Et(Et(Et(e,/(zoom-|grab)/,xt+"$1"),/(image-set)/,xt+"$1"),e,"")+e;case 5495:case 3959:return Et(e,/(image-set\([^]*)/,xt+"$1$`$1");case 4968:return Et(Et(e,/(.+:)(flex-)?(.*)/,xt+"box-pack:$3"+mt+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+xt+e+e;case 4200:if(!Pt(e,/flex-|baseline/))return mt+"grid-column-align"+At(e,t)+e;break;case 2592:case 3360:return mt+Et(e,"template-","")+e;case 4384:case 3616:return n&&n.some(function(e,n){return t=n,Pt(e.props,/grid-\w+-end/)})?~Tt(e+(n=n[t].value),"span",0)?e:mt+Et(e,"-start","")+e+mt+"grid-row-span:"+(~Tt(n,"span",0)?Pt(n,/\d+/):+Pt(n,/\d+/)-+Pt(e,/\d+/))+";":mt+Et(e,"-start","")+e;case 4896:case 4128:return n&&n.some(function(e){return Pt(e.props,/grid-\w+-start/)})?e:mt+Et(Et(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return Et(e,/(.+)-inline(.+)/,xt+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(_t(e)-1-t>6)switch(zt(e,t+1)){case 109:if(45!==zt(e,t+4))break;case 102:return Et(e,/(.+:)(.+)-([^]+)/,"$1"+xt+"$2-$3$1"+gt+(108==zt(e,t+3)?"$3":"$2-$3"))+e;case 115:return~Tt(e,"stretch",0)?sn(Et(e,"stretch","fill-available"),t,n)+e:e}break;case 5152:case 5920:return Et(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(t,n,r,i,o,a,s){return mt+n+":"+r+s+(i?mt+n+"-span:"+(o?a:+a-+r)+s:"")+e});case 4949:if(121===zt(e,t+6))return Et(e,":",":"+xt)+e;break;case 6444:switch(zt(e,45===zt(e,14)?18:11)){case 120:return Et(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+xt+(45===zt(e,14)?"inline-":"")+"box$3$1"+xt+"$2$3$1"+mt+"$2box$3")+e;case 100:return Et(e,":",":"+mt)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return Et(e,"scroll-","scroll-snap-")+e}return e}function ln(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case bt:return void(e.return=sn(e.value,e.length,n));case wt:return on([Vt(e,{value:Et(e.value,"@","@"+xt)})],r);case vt:if(e.length)return function(e,t){return e.map(t).join("")}(n=e.props,function(t){switch(Pt(t,r=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":Ut(Vt(e,{props:[Et(t,/:(read-\w+)/,":-moz-$1")]})),Ut(Vt(e,{props:[t]})),St(e,{props:Nt(n,r)});break;case"::placeholder":Ut(Vt(e,{props:[Et(t,/:(plac\w+)/,":"+xt+"input-$1")]})),Ut(Vt(e,{props:[Et(t,/:(plac\w+)/,":-moz-$1")]})),Ut(Vt(e,{props:[Et(t,/:(plac\w+)/,mt+"input-$1")]})),Ut(Vt(e,{props:[t]})),St(e,{props:Nt(n,r)})}return""})}}function cn(e){return Xt(dn("",null,null,null,[""],e=Qt(e),0,[0],e))}function dn(e,t,n,r,i,o,a,s,l){for(var c=0,d=0,u=a,p=0,h=0,f=0,m=1,g=1,x=1,y=0,v="",b=i,w=o,k=r,j=v;g;)switch(f=y,y=Wt()){case 40:if(108!=f&&58==zt(j,u-1)){-1!=Tt(j+=Et(Zt(y),"&","&\f"),"&\f",kt(c?s[c-1]:0))&&(x=-1);break}case 34:case 39:case 91:j+=Zt(y);break;case 9:case 10:case 13:case 32:j+=Jt(f);break;case 92:j+=en(Yt()-1,7);continue;case 47:switch(qt()){case 42:case 47:$t(pn(nn(Wt(),Yt()),t,n,l),l);break;default:j+="/"}break;case 123*m:s[c++]=_t(j)*x;case 125*m:case 59:case 0:switch(y){case 0:case 125:g=0;case 59+d:-1==x&&(j=Et(j,/\f/g,"")),h>0&&_t(j)-u&&$t(h>32?hn(j+";",r,n,u-1,l):hn(Et(j," ","")+";",r,n,u-2,l),l);break;case 59:j+=";";default:if($t(k=un(j,t,n,c,d,i,s,v,b=[],w=[],u,o),o),123===y)if(0===d)dn(j,t,k,k,b,o,u,s,w);else switch(99===p&&110===zt(j,3)?100:p){case 100:case 108:case 109:case 115:dn(e,k,k,r&&$t(un(e,k,k,0,0,i,s,v,i,b=[],u,w),w),i,w,u,s,r?b:w);break;default:dn(j,k,k,k,[""],w,0,s,w)}}c=d=h=0,m=x=1,v=j="",u=a;break;case 58:u=1+_t(j),h=f;default:if(m<1)if(123==y)--m;else if(125==y&&0==m++&&125==Ht())continue;switch(j+=jt(y),y*m){case 38:x=d>0?1:(j+="\f",-1);break;case 44:s[c++]=(_t(j)-1)*x,x=1;break;case 64:45===qt()&&(j+=Zt(Wt())),p=qt(),d=u=_t(v=j+=rn(Yt())),y++;break;case 45:45===f&&2==_t(j)&&(m=0)}}return o}function un(e,t,n,r,i,o,a,s,l,c,d,u){for(var p=i-1,h=0===i?o:[""],f=Mt(h),m=0,g=0,x=0;m<r;++m)for(var y=0,v=At(e,p+1,p=kt(g=a[m])),b=e;y<f;++y)(b=Ct(g>0?h[y]+" "+v:Et(v,/&\f/g,h[y])))&&(l[x++]=b);return Bt(e,t,n,0===i?vt:s,l,c,d,u)}function pn(e,t,n,r){return Bt(e,t,n,yt,jt(Ot),At(e,2,-2),0,r)}function hn(e,t,n,r,i){return Bt(e,t,n,bt,At(e,0,r),At(e,r+1,-1),r,i)}var fn={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},mn="undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/Monexa",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}&&({NODE_ENV:"production",PUBLIC_URL:"/Monexa",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_ATTR||{NODE_ENV:"production",PUBLIC_URL:"/Monexa",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_ATTR)||"data-styled",gn="active",xn="data-styled-version",yn="6.1.19",vn="/*!sc*/\n",bn="undefined"!=typeof window&&"undefined"!=typeof document,wn=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/Monexa",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/Monexa",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY&&""!=={NODE_ENV:"production",PUBLIC_URL:"/Monexa",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY?"false"!=={NODE_ENV:"production",PUBLIC_URL:"/Monexa",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY&&{NODE_ENV:"production",PUBLIC_URL:"/Monexa",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/Monexa",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/Monexa",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY&&""!=={NODE_ENV:"production",PUBLIC_URL:"/Monexa",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY&&("false"!=={NODE_ENV:"production",PUBLIC_URL:"/Monexa",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY&&{NODE_ENV:"production",PUBLIC_URL:"/Monexa",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY)),kn={},jn=(new Set,Object.freeze([])),Sn=Object.freeze({});function Cn(e,t,n){return void 0===n&&(n=Sn),e.theme!==n.theme&&e.theme||t||n.theme}var Pn=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),En=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Tn=/(^-|-$)/g;function zn(e){return e.replace(En,"-").replace(Tn,"")}var An=/(a)(d)/gi,_n=function(e){return String.fromCharCode(e+(e>25?39:97))};function Mn(e){var t,n="";for(t=Math.abs(e);t>52;t=t/52|0)n=_n(t%52)+n;return(_n(t%52)+n).replace(An,"$1-$2")}var $n,Nn=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},Rn=function(e){return Nn(5381,e)};function Ln(e){return Mn(Rn(e)>>>0)}function Dn(e){return e.displayName||e.name||"Component"}function Fn(e){return"string"==typeof e&&!0}var On="function"==typeof Symbol&&Symbol.for,In=On?Symbol.for("react.memo"):60115,Bn=On?Symbol.for("react.forward_ref"):60112,Vn={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},Un={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},Hn={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Wn=(($n={})[Bn]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},$n[In]=Hn,$n);function qn(e){return("type"in(t=e)&&t.type.$$typeof)===In?Hn:"$$typeof"in e?Wn[e.$$typeof]:Vn;var t}var Yn=Object.defineProperty,Gn=Object.getOwnPropertyNames,Kn=Object.getOwnPropertySymbols,Qn=Object.getOwnPropertyDescriptor,Xn=Object.getPrototypeOf,Zn=Object.prototype;function Jn(e,t,n){if("string"!=typeof t){if(Zn){var r=Xn(t);r&&r!==Zn&&Jn(e,r,n)}var i=Gn(t);Kn&&(i=i.concat(Kn(t)));for(var o=qn(e),a=qn(t),s=0;s<i.length;++s){var l=i[s];if(!(l in Un||n&&n[l]||a&&l in a||o&&l in o)){var c=Qn(t,l);try{Yn(e,l,c)}catch(e){}}}}return e}function er(e){return"function"==typeof e}function tr(e){return"object"==typeof e&&"styledComponentId"in e}function nr(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function rr(e,t){if(0===e.length)return"";for(var n=e[0],r=1;r<e.length;r++)n+=t?t+e[r]:e[r];return n}function ir(e){return null!==e&&"object"==typeof e&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function or(e,t,n){if(void 0===n&&(n=!1),!n&&!ir(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var r=0;r<t.length;r++)e[r]=or(e[r],t[r]);else if(ir(t))for(var r in t)e[r]=or(e[r],t[r]);return e}function ar(e,t){Object.defineProperty(e,"toString",{value:t})}function sr(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var lr=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e}return e.prototype.indexOfGroup=function(e){for(var t=0,n=0;n<e;n++)t+=this.groupSizes[n];return t},e.prototype.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var n=this.groupSizes,r=n.length,i=r;e>=i;)if((i<<=1)<0)throw sr(16,"".concat(e));this.groupSizes=new Uint32Array(i),this.groupSizes.set(n),this.length=i;for(var o=r;o<i;o++)this.groupSizes[o]=0}for(var a=this.indexOfGroup(e+1),s=(o=0,t.length);o<s;o++)this.tag.insertRule(a,t[o])&&(this.groupSizes[e]++,a++)},e.prototype.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(var i=n;i<r;i++)this.tag.deleteRule(n)}},e.prototype.getGroup=function(e){var t="";if(e>=this.length||0===this.groupSizes[e])return t;for(var n=this.groupSizes[e],r=this.indexOfGroup(e),i=r+n,o=r;o<i;o++)t+="".concat(this.tag.getRule(o)).concat(vn);return t},e}(),cr=new Map,dr=new Map,ur=1,pr=function(e){if(cr.has(e))return cr.get(e);for(;dr.has(ur);)ur++;var t=ur++;return cr.set(e,t),dr.set(t,e),t},hr=function(e,t){ur=t+1,cr.set(e,t),dr.set(t,e)},fr="style[".concat(mn,"][").concat(xn,'="').concat(yn,'"]'),mr=new RegExp("^".concat(mn,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),gr=function(e,t,n){for(var r,i=n.split(","),o=0,a=i.length;o<a;o++)(r=i[o])&&e.registerName(t,r)},xr=function(e,t){for(var n,r=(null!==(n=t.textContent)&&void 0!==n?n:"").split(vn),i=[],o=0,a=r.length;o<a;o++){var s=r[o].trim();if(s){var l=s.match(mr);if(l){var c=0|parseInt(l[1],10),d=l[2];0!==c&&(hr(d,c),gr(e,d,l[3]),e.getTag().insertRules(c,i)),i.length=0}else i.push(s)}}},yr=function(e){for(var t=document.querySelectorAll(fr),n=0,r=t.length;n<r;n++){var i=t[n];i&&i.getAttribute(mn)!==gn&&(xr(e,i),i.parentNode&&i.parentNode.removeChild(i))}};function vr(){return n.nc}var br=function(e){var t=document.head,n=e||t,r=document.createElement("style"),i=function(e){var t=Array.from(e.querySelectorAll("style[".concat(mn,"]")));return t[t.length-1]}(n),o=void 0!==i?i.nextSibling:null;r.setAttribute(mn,gn),r.setAttribute(xn,yn);var a=vr();return a&&r.setAttribute("nonce",a),n.insertBefore(r,o),r},wr=function(){function e(e){this.element=br(e),this.element.appendChild(document.createTextNode("")),this.sheet=function(e){if(e.sheet)return e.sheet;for(var t=document.styleSheets,n=0,r=t.length;n<r;n++){var i=t[n];if(i.ownerNode===e)return i}throw sr(17)}(this.element),this.length=0}return e.prototype.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch(e){return!1}},e.prototype.deleteRule=function(e){this.sheet.deleteRule(e),this.length--},e.prototype.getRule=function(e){var t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:""},e}(),kr=function(){function e(e){this.element=br(e),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(e,t){if(e<=this.length&&e>=0){var n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--},e.prototype.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),jr=function(){function e(e){this.rules=[],this.length=0}return e.prototype.insertRule=function(e,t){return e<=this.length&&(this.rules.splice(e,0,t),this.length++,!0)},e.prototype.deleteRule=function(e){this.rules.splice(e,1),this.length--},e.prototype.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),Sr=bn,Cr={isServer:!bn,useCSSOMInjection:!wn},Pr=function(){function e(e,t,n){void 0===e&&(e=Sn),void 0===t&&(t={});var r=this;this.options=ut(ut({},Cr),e),this.gs=t,this.names=new Map(n),this.server=!!e.isServer,!this.server&&bn&&Sr&&(Sr=!1,yr(this)),ar(this,function(){return function(e){for(var t=e.getTag(),n=t.length,r="",i=function(n){var i=function(e){return dr.get(e)}(n);if(void 0===i)return"continue";var o=e.names.get(i),a=t.getGroup(n);if(void 0===o||!o.size||0===a.length)return"continue";var s="".concat(mn,".g").concat(n,'[id="').concat(i,'"]'),l="";void 0!==o&&o.forEach(function(e){e.length>0&&(l+="".concat(e,","))}),r+="".concat(a).concat(s,'{content:"').concat(l,'"}').concat(vn)},o=0;o<n;o++)i(o);return r}(r)})}return e.registerId=function(e){return pr(e)},e.prototype.rehydrate=function(){!this.server&&bn&&yr(this)},e.prototype.reconstructWithOptions=function(t,n){return void 0===n&&(n=!0),new e(ut(ut({},this.options),t),this.gs,n&&this.names||void 0)},e.prototype.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(e=function(e){var t=e.useCSSOMInjection,n=e.target;return e.isServer?new jr(n):t?new wr(n):new kr(n)}(this.options),new lr(e)));var e},e.prototype.hasNameForId=function(e,t){return this.names.has(e)&&this.names.get(e).has(t)},e.prototype.registerName=function(e,t){if(pr(e),this.names.has(e))this.names.get(e).add(t);else{var n=new Set;n.add(t),this.names.set(e,n)}},e.prototype.insertRules=function(e,t,n){this.registerName(e,t),this.getTag().insertRules(pr(e),n)},e.prototype.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear()},e.prototype.clearRules=function(e){this.getTag().clearGroup(pr(e)),this.clearNames(e)},e.prototype.clearTag=function(){this.tag=void 0},e}(),Er=/&/g,Tr=/^\s*\/\/.*$/gm;function zr(e,t){return e.map(function(e){return"rule"===e.type&&(e.value="".concat(t," ").concat(e.value),e.value=e.value.replaceAll(",",",".concat(t," ")),e.props=e.props.map(function(e){return"".concat(t," ").concat(e)})),Array.isArray(e.children)&&"@keyframes"!==e.type&&(e.children=zr(e.children,t)),e})}function Ar(e){var t,n,r,i=void 0===e?Sn:e,o=i.options,a=void 0===o?Sn:o,s=i.plugins,l=void 0===s?jn:s,c=function(e,r,i){return i.startsWith(n)&&i.endsWith(n)&&i.replaceAll(n,"").length>0?".".concat(t):e},d=l.slice();d.push(function(e){e.type===vt&&e.value.includes("&")&&(e.props[0]=e.props[0].replace(Er,n).replace(r,c))}),a.prefix&&d.push(ln),d.push(an);var u=function(e,i,o,s){void 0===i&&(i=""),void 0===o&&(o=""),void 0===s&&(s="&"),t=s,n=i,r=new RegExp("\\".concat(n,"\\b"),"g");var l=e.replace(Tr,""),c=cn(o||i?"".concat(o," ").concat(i," { ").concat(l," }"):l);a.namespace&&(c=zr(c,a.namespace));var u,p=[];return on(c,function(e){var t=Mt(e);return function(n,r,i,o){for(var a="",s=0;s<t;s++)a+=e[s](n,r,i,o)||"";return a}}(d.concat((u=function(e){return p.push(e)},function(e){e.root||(e=e.return)&&u(e)})))),p};return u.hash=l.length?l.reduce(function(e,t){return t.name||sr(15),Nn(e,t.name)},5381).toString():"",u}var _r=new Pr,Mr=Ar(),$r=t.createContext({shouldForwardProp:void 0,styleSheet:_r,stylis:Mr}),Nr=($r.Consumer,t.createContext(void 0));function Rr(){return(0,t.useContext)($r)}function Lr(e){var n=(0,t.useState)(e.stylisPlugins),r=n[0],i=n[1],o=Rr().styleSheet,a=(0,t.useMemo)(function(){var t=o;return e.sheet?t=e.sheet:e.target&&(t=t.reconstructWithOptions({target:e.target},!1)),e.disableCSSOMInjection&&(t=t.reconstructWithOptions({useCSSOMInjection:!1})),t},[e.disableCSSOMInjection,e.sheet,e.target,o]),s=(0,t.useMemo)(function(){return Ar({options:{namespace:e.namespace,prefix:e.enableVendorPrefixes},plugins:r})},[e.enableVendorPrefixes,e.namespace,r]);(0,t.useEffect)(function(){ft()(r,e.stylisPlugins)||i(e.stylisPlugins)},[e.stylisPlugins]);var l=(0,t.useMemo)(function(){return{shouldForwardProp:e.shouldForwardProp,styleSheet:a,stylis:s}},[e.shouldForwardProp,a,s]);return t.createElement($r.Provider,{value:l},t.createElement(Nr.Provider,{value:s},e.children))}var Dr=function(){function e(e,t){var n=this;this.inject=function(e,t){void 0===t&&(t=Mr);var r=n.name+t.hash;e.hasNameForId(n.id,r)||e.insertRules(n.id,r,t(n.rules,r,"@keyframes"))},this.name=e,this.id="sc-keyframes-".concat(e),this.rules=t,ar(this,function(){throw sr(12,String(n.name))})}return e.prototype.getName=function(e){return void 0===e&&(e=Mr),this.name+e.hash},e}(),Fr=function(e){return e>="A"&&e<="Z"};function Or(e){for(var t="",n=0;n<e.length;n++){var r=e[n];if(1===n&&"-"===r&&"-"===e[0])return e;Fr(r)?t+="-"+r.toLowerCase():t+=r}return t.startsWith("ms-")?"-"+t:t}var Ir=function(e){return null==e||!1===e||""===e},Br=function(e){var t,n,r=[];for(var i in e){var o=e[i];e.hasOwnProperty(i)&&!Ir(o)&&(Array.isArray(o)&&o.isCss||er(o)?r.push("".concat(Or(i),":"),o,";"):ir(o)?r.push.apply(r,pt(pt(["".concat(i," {")],Br(o),!1),["}"],!1)):r.push("".concat(Or(i),": ").concat((t=i,null==(n=o)||"boolean"==typeof n||""===n?"":"number"!=typeof n||0===n||t in fn||t.startsWith("--")?String(n).trim():"".concat(n,"px")),";")))}return r};function Vr(e,t,n,r){return Ir(e)?[]:tr(e)?[".".concat(e.styledComponentId)]:er(e)?!er(i=e)||i.prototype&&i.prototype.isReactComponent||!t?[e]:Vr(e(t),t,n,r):e instanceof Dr?n?(e.inject(n,r),[e.getName(r)]):[e]:ir(e)?Br(e):Array.isArray(e)?Array.prototype.concat.apply(jn,e.map(function(e){return Vr(e,t,n,r)})):[e.toString()];var i}function Ur(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(er(n)&&!tr(n))return!1}return!0}var Hr=Rn(yn),Wr=function(){function e(e,t,n){this.rules=e,this.staticRulesId="",this.isStatic=(void 0===n||n.isStatic)&&Ur(e),this.componentId=t,this.baseHash=Nn(Hr,t),this.baseStyle=n,Pr.registerId(t)}return e.prototype.generateAndInjectStyles=function(e,t,n){var r=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n):"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&t.hasNameForId(this.componentId,this.staticRulesId))r=nr(r,this.staticRulesId);else{var i=rr(Vr(this.rules,e,t,n)),o=Mn(Nn(this.baseHash,i)>>>0);if(!t.hasNameForId(this.componentId,o)){var a=n(i,".".concat(o),void 0,this.componentId);t.insertRules(this.componentId,o,a)}r=nr(r,o),this.staticRulesId=o}else{for(var s=Nn(this.baseHash,n.hash),l="",c=0;c<this.rules.length;c++){var d=this.rules[c];if("string"==typeof d)l+=d;else if(d){var u=rr(Vr(d,e,t,n));s=Nn(s,u+c),l+=u}}if(l){var p=Mn(s>>>0);t.hasNameForId(this.componentId,p)||t.insertRules(this.componentId,p,n(l,".".concat(p),void 0,this.componentId)),r=nr(r,p)}}return r},e}(),qr=t.createContext(void 0);qr.Consumer;var Yr={};new Set;function Gr(e,n,r){var i=tr(e),o=e,a=!Fn(e),s=n.attrs,l=void 0===s?jn:s,c=n.componentId,d=void 0===c?function(e,t){var n="string"!=typeof e?"sc":zn(e);Yr[n]=(Yr[n]||0)+1;var r="".concat(n,"-").concat(Ln(yn+n+Yr[n]));return t?"".concat(t,"-").concat(r):r}(n.displayName,n.parentComponentId):c,u=n.displayName,p=void 0===u?function(e){return Fn(e)?"styled.".concat(e):"Styled(".concat(Dn(e),")")}(e):u,h=n.displayName&&n.componentId?"".concat(zn(n.displayName),"-").concat(n.componentId):n.componentId||d,f=i&&o.attrs?o.attrs.concat(l).filter(Boolean):l,m=n.shouldForwardProp;if(i&&o.shouldForwardProp){var g=o.shouldForwardProp;if(n.shouldForwardProp){var x=n.shouldForwardProp;m=function(e,t){return g(e,t)&&x(e,t)}}else m=g}var y=new Wr(r,h,i?o.componentStyle:void 0);function v(e,n){return function(e,n,r){var i=e.attrs,o=e.componentStyle,a=e.defaultProps,s=e.foldedComponentIds,l=e.styledComponentId,c=e.target,d=t.useContext(qr),u=Rr(),p=e.shouldForwardProp||u.shouldForwardProp,h=Cn(n,d,a)||Sn,f=function(e,t,n){for(var r,i=ut(ut({},t),{className:void 0,theme:n}),o=0;o<e.length;o+=1){var a=er(r=e[o])?r(i):r;for(var s in a)i[s]="className"===s?nr(i[s],a[s]):"style"===s?ut(ut({},i[s]),a[s]):a[s]}return t.className&&(i.className=nr(i.className,t.className)),i}(i,n,h),m=f.as||c,g={};for(var x in f)void 0===f[x]||"$"===x[0]||"as"===x||"theme"===x&&f.theme===h||("forwardedAs"===x?g.as=f.forwardedAs:p&&!p(x,m)||(g[x]=f[x]));var y=function(e,t){var n=Rr();return e.generateAndInjectStyles(t,n.styleSheet,n.stylis)}(o,f),v=nr(s,l);return y&&(v+=" "+y),f.className&&(v+=" "+f.className),g[Fn(m)&&!Pn.has(m)?"class":"className"]=v,r&&(g.ref=r),(0,t.createElement)(m,g)}(b,e,n)}v.displayName=p;var b=t.forwardRef(v);return b.attrs=f,b.componentStyle=y,b.displayName=p,b.shouldForwardProp=m,b.foldedComponentIds=i?nr(o.foldedComponentIds,o.styledComponentId):"",b.styledComponentId=h,b.target=i?o.target:e,Object.defineProperty(b,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(e){this._foldedDefaultProps=i?function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];for(var r=0,i=t;r<i.length;r++)or(e,i[r],!0);return e}({},o.defaultProps,e):e}}),ar(b,function(){return".".concat(b.styledComponentId)}),a&&Jn(b,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),b}function Kr(e,t){for(var n=[e[0]],r=0,i=t.length;r<i;r+=1)n.push(t[r],e[r+1]);return n}var Qr=function(e){return Object.assign(e,{isCss:!0})};function Xr(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];if(er(e)||ir(e))return Qr(Vr(Kr(jn,pt([e],t,!0))));var r=e;return 0===t.length&&1===r.length&&"string"==typeof r[0]?Vr(r):Qr(Vr(Kr(r,t)))}function Zr(e,t,n){if(void 0===n&&(n=Sn),!t)throw sr(1,t);var r=function(r){for(var i=[],o=1;o<arguments.length;o++)i[o-1]=arguments[o];return e(t,n,Xr.apply(void 0,pt([r],i,!1)))};return r.attrs=function(r){return Zr(e,t,ut(ut({},n),{attrs:Array.prototype.concat(n.attrs,r).filter(Boolean)}))},r.withConfig=function(r){return Zr(e,t,ut(ut({},n),r))},r}var Jr=function(e){return Zr(Gr,e)},ei=Jr;Pn.forEach(function(e){ei[e]=Jr(e)});var ti=function(){function e(e,t){this.rules=e,this.componentId=t,this.isStatic=Ur(e),Pr.registerId(this.componentId+1)}return e.prototype.createStyles=function(e,t,n,r){var i=r(rr(Vr(this.rules,t,n,r)),""),o=this.componentId+e;n.insertRules(o,o,i)},e.prototype.removeStyles=function(e,t){t.clearRules(this.componentId+e)},e.prototype.renderStyles=function(e,t,n,r){e>2&&Pr.registerId(this.componentId+e),this.removeStyles(e,n),this.createStyles(e,t,n,r)},e}();(function(){function e(){var e=this;this._emitSheetCSS=function(){var t=e.instance.toString();if(!t)return"";var n=vr(),r=rr([n&&'nonce="'.concat(n,'"'),"".concat(mn,'="true"'),"".concat(xn,'="').concat(yn,'"')].filter(Boolean)," ");return"<style ".concat(r,">").concat(t,"</style>")},this.getStyleTags=function(){if(e.sealed)throw sr(2);return e._emitSheetCSS()},this.getStyleElement=function(){var n;if(e.sealed)throw sr(2);var r=e.instance.toString();if(!r)return[];var i=((n={})[mn]="",n[xn]=yn,n.dangerouslySetInnerHTML={__html:r},n),o=vr();return o&&(i.nonce=o),[t.createElement("style",ut({},i,{key:"sc-0-0"}))]},this.seal=function(){e.sealed=!0},this.instance=new Pr({isServer:!0}),this.sealed=!1}e.prototype.collectStyles=function(e){if(this.sealed)throw sr(2);return t.createElement(Lr,{sheet:this.instance},e)},e.prototype.interleaveWithNodeStream=function(e){throw sr(3)}})(),"__sc-".concat(mn,"__");const ni="http://localhost:5000/api";const ri=new class{constructor(){this.token=localStorage.getItem("monexa_token")}setToken(e){this.token=e,e?localStorage.setItem("monexa_token",e):localStorage.removeItem("monexa_token")}getHeaders(){const e={"Content-Type":"application/json"};return this.token&&(e.Authorization=`Bearer ${this.token}`),e}async request(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n=`${ni}${e}`,r={headers:this.getHeaders(),...t};try{const e=await fetch(n,r),t=await e.json();if(!e.ok){if(401===e.status&&t.requires2FA)return t;throw new Error(t.error||`HTTP error! status: ${e.status}`)}return t}catch(i){throw console.error("API Request failed:",i),i}}async get(e){return this.request(e,{method:"GET"})}async post(e,t){return this.request(e,{method:"POST",body:JSON.stringify(t)})}async postFormData(e,t){try{console.log("API postFormData called with endpoint:",e),console.log("Token available:",!!this.token);const n=await fetch(`${ni}${e}`,{method:"POST",headers:{...this.token&&{Authorization:`Bearer ${this.token}`}},body:t});if(console.log("Upload response status:",n.status,n.statusText),!n.ok){const e=await n.json().catch(()=>({error:"Upload failed"}));throw console.error("Upload failed with error:",e),new Error(e.error||`HTTP error! status: ${n.status}`)}const r=await n.json();return console.log("Upload successful:",r),r}catch(n){throw console.error("FormData request failed:",n),n}}async put(e,t){return this.request(e,{method:"PUT",body:JSON.stringify(t)})}async delete(e){return this.request(e,{method:"DELETE"})}async upload(e,t){const n=`${ni}${e}`,r={method:"POST",headers:{Authorization:this.token?`Bearer ${this.token}`:""},body:t};try{const e=await fetch(n,r),t=await e.json();if(!e.ok)throw new Error(t.error||`HTTP error! status: ${e.status}`);return t}catch(i){throw console.error("Upload failed:",i),i}}async login(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;const r={email:e,password:t};n&&(r.twoFactorToken=n);const i=await this.post("/auth/login",r);return i.success&&i.token&&this.setToken(i.token),i}async signup(e){const t=await this.post("/auth/signup",e);return t.success&&t.token&&this.setToken(t.token),t}async logout(){try{await this.post("/auth/logout")}catch(e){console.error("Logout API call failed:",e)}finally{this.setToken(null)}}async getCurrentUser(){return this.get("/auth/me")}async refreshSession(){return this.post("/auth/refresh")}async updateProfile(e){return this.put("/users/profile",e)}async verifyPassword(e){return this.post("/users/verify-password",{password:e})}async changePassword(e,t){return this.put("/users/password",{currentPassword:e,newPassword:t})}async getUserSettings(){return this.get("/users/settings")}async updateUserSettings(e){return this.put("/users/settings",e)}async getCards(){return this.get("/cards")}async addCard(e){return this.post("/cards",e)}async updateCard(e,t){return this.put(`/cards/${e}`,t)}async deleteCard(e){return this.delete(`/cards/${e}`)}async setDefaultCard(e){return this.put(`/cards/${e}/default`)}async getTransactions(){const e=new URLSearchParams(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).toString();return this.get("/transactions"+(e?`?${e}`:""))}async getTransaction(e){return this.get(`/transactions/${e}`)}async createTransaction(e){return this.post("/transactions",e)}async updateTransaction(e,t){return this.put(`/transactions/${e}`,t)}async deleteTransaction(e){return this.delete(`/transactions/${e}`)}async getTransactionStats(){const e=new URLSearchParams(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).toString();return this.get("/transactions/stats/summary"+(e?`?${e}`:""))}async getBeneficiaries(){return this.get("/beneficiaries")}async createBeneficiary(e){return this.post("/beneficiaries",e)}async getBeneficiary(e){return this.get(`/beneficiaries/${e}`)}async addBeneficiary(e){return this.post("/beneficiaries",e)}async updateBeneficiary(e,t){return this.put(`/beneficiaries/${e}`,t)}async deleteBeneficiary(e){return this.delete(`/beneficiaries/${e}`)}async searchBeneficiaries(e){return this.get(`/beneficiaries/search/${encodeURIComponent(e)}`)}async getDocuments(){const e=new URLSearchParams(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).toString();return this.get("/documents"+(e?`?${e}`:""))}async getDocument(e){return this.get(`/documents/${e}`)}async uploadDocument(e){return this.postFormData("/documents/upload",e)}async uploadMultipleDocuments(e){return this.postFormData("/documents/upload-multiple",e)}async updateDocument(e,t){return this.put(`/documents/${e}`,t)}async deleteDocument(e){return this.delete(`/documents/${e}`)}async downloadDocument(e){const t=`${ni}/documents/${e}/download`,n=await fetch(t,{headers:{Authorization:this.token?`Bearer ${this.token}`:""}});if(!n.ok)throw new Error("Download failed");return n.blob()}async getDocumentCategories(){return this.get("/documents/categories/list")}async getApplications(){const e=new URLSearchParams(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).toString();return this.get("/applications"+(e?`?${e}`:""))}async getApplication(e){return this.get(`/applications/${e}`)}async createApplication(e){return this.post("/applications",e)}async updateApplication(e,t){return this.put(`/applications/${e}`,t)}async deleteApplication(e){return this.delete(`/applications/${e}`)}async getApplicationStats(){return this.get("/applications/stats/summary")}async getApplicationTypes(){return this.get("/applications/types/list")}async getNotifications(){const e=new URLSearchParams(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).toString();return this.get("/notifications"+(e?`?${e}`:""))}async getNotification(e){return this.get(`/notifications/${e}`)}async markNotificationAsRead(e){return this.put(`/notifications/${e}/read`)}async markNotificationAsUnread(e){return this.put(`/notifications/${e}/unread`)}async markAllNotificationsAsRead(){return this.put("/notifications/read-all")}async deleteNotification(e){return this.delete(`/notifications/${e}`)}async deleteAllReadNotifications(){return this.delete("/notifications/read-all")}async getNotificationStats(){return this.get("/notifications/stats/summary")}async requestExport(e,t){return this.post("/exports/request",{type:e,format:t})}async getExportStatus(e){return this.get(`/exports/status/${e}`)}async getExportHistory(){return this.get("/exports/history")}async downloadExport(e){const t=`${ni}/exports/download/${e}`,n=await fetch(t,{headers:{Authorization:this.token?`Bearer ${this.token}`:""}});if(!n.ok)throw new Error("Download failed");return n.blob()}async getGoals(){return this.get("/goals")}async createGoal(e){return this.post("/goals",e)}async updateGoalProgress(e,t){return this.put(`/goals/${e}/progress`,{amount:t})}async deleteGoal(e){return this.delete(`/goals/${e}`)}async generate2FASecret(){return this.post("/security/2fa/generate")}async enable2FA(e){return this.post("/security/2fa/enable",{token:e})}async disable2FA(e){return this.post("/security/2fa/disable",{token:e})}async verify2FAToken(e){return this.post("/security/2fa/verify",{token:e})}async getSecurityLogs(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:50;return this.get(`/security/logs?limit=${e}`)}async getLoginHistory(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:50;return this.get(`/security/login-history?limit=${e}`)}async getSecuritySettings(){return this.get("/security/settings")}async updateSecuritySettings(e){return this.put("/security/settings",e)}async validatePassword(e){return this.post("/security/validate-password",{password:e})}async getSessionInfo(){return this.get("/security/session")}async getAllSessions(){return this.get("/security/sessions")}async revokeSession(e){return this.post("/security/revoke-session",{sessionId:e})}async revokeOtherSessions(){return this.post("/security/revoke-other-sessions")}async getSecuritySummary(){return this.get("/security/summary")}async exportData(e){return this.post("/users/export-data",{password:e})}async deleteAccount(){return this.delete("/users/account")}async healthCheck(){return this.get("/health")}},ii=ri;var oi=n(579);const ai=(0,t.createContext)(),si=()=>{const e=(0,t.useContext)(ai);if(!e)throw new Error("useAuth must be used within an AuthProvider");return e},li=e=>{let{children:n}=e;const[r,i]=(0,t.useState)(null),[o,a]=(0,t.useState)(!0),[s,l]=(0,t.useState)(!1),[c,d]=(0,t.useState)(null),[u,p]=(0,t.useState)(Date.now()),[h,f]=(0,t.useState)(2),[m,g]=(0,t.useState)(!1),[x,y]=(0,t.useState)(null),v=()=>{const e=Date.now();p(e)};(0,t.useEffect)(()=>{const e=setInterval(()=>{const e=Date.now();r&&e-u>60*h*1e3&&!m&&w()},h<=5?5e3:1e4);return()=>clearInterval(e)},[r,u,h,m]),(0,t.useEffect)(()=>{if(!r)return;const e=["mousedown","mousemove","keypress","scroll","touchstart","click"],t=()=>{v()};return e.forEach(e=>{document.addEventListener(e,t,!0)}),()=>{e.forEach(e=>{document.removeEventListener(e,t,!0)})}},[r]),(0,t.useEffect)(()=>{r&&b()},[r]),(0,t.useEffect)(()=>{const e=e=>{const t=parseInt(e.detail);t&&t!==h&&(f(t),v())};return window.addEventListener("sessionTimeoutChanged",e),()=>window.removeEventListener("sessionTimeoutChanged",e)},[h,v]);const b=async()=>{try{var e;const t=await ii.getUserSettings();if(t.success&&null!==(e=t.settings)&&void 0!==e&&e.session_timeout){const e=parseInt(t.settings.session_timeout);f(e),v()}}catch(t){console.error("Failed to load session timeout setting:",t)}},w=()=>{if(r){y(window.location.pathname),g(!0);const e={...r};i(null),sessionStorage.setItem("lockedSession",JSON.stringify({user:e,location:window.location.pathname,timestamp:Date.now()})),dt.warning("Session timed out due to inactivity. Please log in again.",{position:"top-center",autoClose:!1,closeOnClick:!1,draggable:!1})}};(0,t.useEffect)(()=>{const e=sessionStorage.getItem("lockedSession");if(e)try{const t=JSON.parse(e),n=Date.now()-t.timestamp;n<864e5?(g(!0),y(t.location)):sessionStorage.removeItem("lockedSession")}catch(t){console.error("Failed to parse locked session:",t),sessionStorage.removeItem("lockedSession")}},[]),(0,t.useEffect)(()=>{(async()=>{const e=localStorage.getItem("monexa_token");if(e)try{ii.setToken(e);const t=await ii.getCurrentUser();t.success?(i(t.user),v()):ii.setToken(null)}catch(t){console.error("Failed to initialize auth:",t),ii.setToken(null)}a(!1)})()},[]);const k=async()=>{try{await ii.logout()}catch(e){console.error("Logout error:",e)}finally{i(null)}},j={user:r,login:async function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;try{const r=await ii.login(e,t,n);return r.success?(i(r.user),{success:!0}):r.requires2FA?{success:!1,requires2FA:!0,error:r.error||"2FA required"}:{success:!1,error:r.error||"Login failed"}}catch(r){return console.error("Login error:",r),{success:!1,error:r.message||"Login failed"}}},signup:async e=>{try{const t=await ii.signup(e);return t.success?(i(t.user),{success:!0}):{success:!1,error:t.error||"Signup failed"}}catch(t){return console.error("Signup error:",t),{success:!1,error:t.message||"Signup failed"}}},updateProfile:async e=>{try{const t=await ii.updateProfile(e);return t.success?(i(t.user),{success:!0}):{success:!1,error:t.error||"Profile update failed"}}catch(t){return console.error("Profile update error:",t),{success:!1,error:t.message||"Profile update failed"}}},logout:k,refreshSession:async()=>{try{const e=await ii.refreshSession();if(e.success)return i(e.user),!0}catch(e){console.error("Session refresh error:",e),k()}return!1},isLoading:o,isAuthenticated:!!r,requires2FA:s,tempCredentials:c,lastLocation:x,isSessionLocked:m,sessionTimeout:h,updateActivity:v,lockSession:w,unlockSession:async function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;try{const r=await ii.login(e,t,n);return r.success?(i(r.user),g(!1),y(null),l(!1),d(null),sessionStorage.removeItem("lockedSession"),v(),dt.success("Session restored successfully!",{position:"bottom-right",autoClose:3e3}),{success:!0}):r.requires2FA?(l(!0),d({email:e,password:t}),{success:!1,requires2FA:!0}):{success:!1,error:r.error}}catch(r){return{success:!1,error:"Failed to restore session"}}},complete2FALogin:async e=>{if(!c)return{success:!1,error:"No temporary credentials found"};try{const t=await ii.login(c.email,c.password,e);return t.success?(i(t.user),g(!1),y(null),l(!1),d(null),sessionStorage.removeItem("lockedSession"),v(),dt.success("Session restored successfully!",{position:"bottom-right",autoClose:3e3}),{success:!0}):{success:!1,error:t.error}}catch(t){return{success:!1,error:"Failed to complete 2FA verification"}}}};return(0,oi.jsx)(ai.Provider,{value:j,children:n})},ci={inter:{name:"Inter",family:"'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",category:"Professional",description:"Clean and modern"},roboto:{name:"Roboto",family:"'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",category:"Professional",description:"Google's trusted font"},openSans:{name:"Open Sans",family:"'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",category:"Professional",description:"Highly legible and clean"},sourceSans:{name:"Source Sans Pro",family:"'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",category:"Professional",description:"Clean and corporate"},nunito:{name:"Nunito",family:"'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",category:"Fun",description:"Rounded and friendly"},comfortaa:{name:"Comfortaa",family:"'Comfortaa', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",category:"Fun",description:"Bubble-like and playful"},quicksand:{name:"Quicksand",family:"'Quicksand', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",category:"Fun",description:"Smooth and curvy"},fredoka:{name:"Fredoka",family:"'Fredoka', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",category:"Fun",description:"Bouncy and cheerful"}},di=e=>{const t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?`${parseInt(t[1],16)}, ${parseInt(t[2],16)}, ${parseInt(t[3],16)}`:"255, 255, 255"},ui={default:{name:"Default",colors:["#1a1a1a","#333333","#4a4a4a","#666666"],gradient:"linear-gradient(135deg, #1a1a1a, #333333, #4a4a4a, #666666)",description:"Neutral and balanced",light:{primary:"#ffffff",secondary:"#fafbfc",tertiary:"#f8fafc",background:"#ffffff",textPrimary:"#0f172a",textSecondary:"#475569",textTertiary:"#64748b",borderPrimary:"#e2e8f0",borderSecondary:"#f1f5f9",card:"#ffffff",cardHover:"#fafbfc",input:"#ffffff",inputBorder:"#d1d5db",buttonPrimary:"#1a1a1a",buttonSecondary:"#f3f4f6",buttonText:"#ffffff",buttonTextSecondary:"#374151",accent:"#1a1a1a",accentHover:"#333333"},dark:{primary:"#0f172a",secondary:"#1e293b",tertiary:"#334155",background:"#0f172a",textPrimary:"#f8fafc",textSecondary:"#cbd5e1",textTertiary:"#94a3b8",borderPrimary:"#334155",borderSecondary:"#475569",card:"#1e293b",cardHover:"#334155",input:"#334155",inputBorder:"#475569",buttonPrimary:"#1a1a1a",buttonSecondary:"#334155",buttonText:"#ffffff",buttonTextSecondary:"#f8fafc",accent:"#1a1a1a",accentHover:"#333333"}},blue:{name:"Ocean Blue",colors:["#3b82f6","#1d4ed8","#60a5fa","#1e40af"],gradient:"linear-gradient(135deg, #3b82f6, #1d4ed8, #60a5fa, #1e40af)",description:"Professional and calming",light:{primary:"#ffffff",secondary:"#f8fafc",tertiary:"#f1f5f9",background:"#f0f8ff",textPrimary:"#0f172a",textSecondary:"#475569",textTertiary:"#64748b",borderPrimary:"#e2e8f0",borderSecondary:"#f1f5f9",card:"#ffffff",cardHover:"#f8fafc",input:"#ffffff",inputBorder:"#d1d5db",buttonPrimary:"#3b82f6",buttonSecondary:"#f3f4f6",buttonText:"#ffffff",buttonTextSecondary:"#374151",accent:"#3b82f6",accentHover:"#1d4ed8"},dark:{primary:"#0f172a",secondary:"#1e293b",tertiary:"#334155",background:"#0a1a2e",textPrimary:"#f8fafc",textSecondary:"#cbd5e1",textTertiary:"#94a3b8",borderPrimary:"#334155",borderSecondary:"#475569",card:"#1e293b",cardHover:"#334155",input:"#334155",inputBorder:"#475569",buttonPrimary:"#3b82f6",buttonSecondary:"#334155",buttonText:"#ffffff",buttonTextSecondary:"#f8fafc",accent:"#3b82f6",accentHover:"#1d4ed8"}},green:{name:"Emerald Green",colors:["#10b981","#059669","#34d399","#047857"],gradient:"linear-gradient(135deg, #10b981, #059669, #34d399, #047857)",description:"Fresh and natural",light:{primary:"#ffffff",secondary:"#f0fdf4",tertiary:"#ecfdf5",background:"#f0fdf4",textPrimary:"#0f172a",textSecondary:"#475569",textTertiary:"#64748b",borderPrimary:"#d1fae5",borderSecondary:"#ecfdf5",card:"#ffffff",cardHover:"#f0fdf4",input:"#ffffff",inputBorder:"#d1fae5",buttonPrimary:"#10b981",buttonSecondary:"#f3f4f6",buttonText:"#ffffff",buttonTextSecondary:"#374151",accent:"#10b981",accentHover:"#059669"},dark:{primary:"#0f172a",secondary:"#1e293b",tertiary:"#334155",background:"#0a1f0a",textPrimary:"#f8fafc",textSecondary:"#cbd5e1",textTertiary:"#94a3b8",borderPrimary:"#334155",borderSecondary:"#475569",card:"#1e293b",cardHover:"#334155",input:"#334155",inputBorder:"#475569",buttonPrimary:"#10b981",buttonSecondary:"#334155",buttonText:"#ffffff",buttonTextSecondary:"#f8fafc",accent:"#10b981",accentHover:"#059669"}},orange:{name:"Sunset Orange",colors:["#f97316","#ea580c","#fb923c","#c2410c"],gradient:"linear-gradient(135deg, #f97316, #ea580c, #fb923c, #c2410c)",description:"Warm and energetic",light:{primary:"#ffffff",secondary:"#fff7ed",tertiary:"#ffedd5",background:"#fff7ed",textPrimary:"#0f172a",textSecondary:"#475569",textTertiary:"#64748b",borderPrimary:"#fed7aa",borderSecondary:"#ffedd5",card:"#ffffff",cardHover:"#fff7ed",input:"#ffffff",inputBorder:"#fed7aa",buttonPrimary:"#f97316",buttonSecondary:"#f3f4f6",buttonText:"#ffffff",buttonTextSecondary:"#374151",accent:"#f97316",accentHover:"#ea580c"},dark:{primary:"#0f172a",secondary:"#1e293b",tertiary:"#334155",background:"#1a0f0a",textPrimary:"#f8fafc",textSecondary:"#cbd5e1",textTertiary:"#94a3b8",borderPrimary:"#334155",borderSecondary:"#475569",card:"#1e293b",cardHover:"#334155",input:"#334155",inputBorder:"#475569",buttonPrimary:"#f97316",buttonSecondary:"#334155",buttonText:"#ffffff",buttonTextSecondary:"#f8fafc",accent:"#f97316",accentHover:"#ea580c"}},teal:{name:"Ocean Teal",colors:["#06b6d4","#0891b2","#22d3ee","#0e7490"],gradient:"linear-gradient(135deg, #06b6d4, #0891b2, #22d3ee, #0e7490)",description:"Modern and refreshing",light:{primary:"#ffffff",secondary:"#f0fdfa",tertiary:"#ccfbf1",background:"#f0fdfa",textPrimary:"#0f172a",textSecondary:"#475569",textTertiary:"#64748b",borderPrimary:"#99f6e4",borderSecondary:"#ccfbf1",card:"#ffffff",cardHover:"#f0fdfa",input:"#ffffff",inputBorder:"#99f6e4",buttonPrimary:"#06b6d4",buttonSecondary:"#f3f4f6",buttonText:"#ffffff",buttonTextSecondary:"#374151",accent:"#06b6d4",accentHover:"#0891b2"},dark:{primary:"#0f172a",secondary:"#1e293b",tertiary:"#334155",background:"#0a1f1a",textPrimary:"#f8fafc",textSecondary:"#cbd5e1",textTertiary:"#94a3b8",borderPrimary:"#334155",borderSecondary:"#475569",card:"#1e293b",cardHover:"#334155",input:"#334155",inputBorder:"#475569",buttonPrimary:"#06b6d4",buttonSecondary:"#334155",buttonText:"#ffffff",buttonTextSecondary:"#f8fafc",accent:"#06b6d4",accentHover:"#0891b2"}},rose:{name:"Rose Pink",colors:["#f43f5e","#e11d48","#fb7185","#be123c"],gradient:"linear-gradient(135deg, #f43f5e, #e11d48, #fb7185, #be123c)",description:"Elegant and vibrant",light:{primary:"#ffffff",secondary:"#fff1f2",tertiary:"#ffe4e6",background:"#fff1f2",textPrimary:"#0f172a",textSecondary:"#475569",textTertiary:"#64748b",borderPrimary:"#fecdd3",borderSecondary:"#ffe4e6",card:"#ffffff",cardHover:"#fff1f2",input:"#ffffff",inputBorder:"#fecdd3",buttonPrimary:"#f43f5e",buttonSecondary:"#f3f4f6",buttonText:"#ffffff",buttonTextSecondary:"#374151",accent:"#f43f5e",accentHover:"#e11d48"},dark:{primary:"#0f172a",secondary:"#1e293b",tertiary:"#334155",background:"#1a0f0f",textPrimary:"#f8fafc",textSecondary:"#cbd5e1",textTertiary:"#94a3b8",borderPrimary:"#334155",borderSecondary:"#475569",card:"#1e293b",cardHover:"#334155",input:"#334155",inputBorder:"#475569",buttonPrimary:"#f43f5e",buttonSecondary:"#334155",buttonText:"#ffffff",buttonTextSecondary:"#f8fafc",accent:"#f43f5e",accentHover:"#e11d48"}},amber:{name:"Golden Amber",colors:["#f59e0b","#d97706","#fbbf24","#b45309"],gradient:"linear-gradient(135deg, #f59e0b, #d97706, #fbbf24, #b45309)",description:"Rich and luxurious",light:{primary:"#ffffff",secondary:"#fffbeb",tertiary:"#fef3c7",background:"#fffbeb",textPrimary:"#0f172a",textSecondary:"#475569",textTertiary:"#64748b",borderPrimary:"#fde68a",borderSecondary:"#fef3c7",card:"#ffffff",cardHover:"#fffbeb",input:"#ffffff",inputBorder:"#fde68a",buttonPrimary:"#f59e0b",buttonSecondary:"#f3f4f6",buttonText:"#ffffff",buttonTextSecondary:"#374151",accent:"#f59e0b",accentHover:"#d97706"},dark:{primary:"#0f172a",secondary:"#1e293b",tertiary:"#334155",background:"#1a150a",textPrimary:"#f8fafc",textSecondary:"#cbd5e1",textTertiary:"#94a3b8",borderPrimary:"#334155",borderSecondary:"#475569",card:"#1e293b",cardHover:"#334155",input:"#334155",inputBorder:"#475569",buttonPrimary:"#f59e0b",buttonSecondary:"#334155",buttonText:"#ffffff",buttonTextSecondary:"#f8fafc",accent:"#f59e0b",accentHover:"#d97706"}}},pi=(function(e){for(var n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];var i=Xr.apply(void 0,pt([e],n,!1)),o="sc-global-".concat(Ln(JSON.stringify(i))),a=new ti(i,o),s=function(e){var n=Rr(),r=t.useContext(qr),i=t.useRef(n.styleSheet.allocateGSInstance(o)).current;return n.styleSheet.server&&l(i,e,n.styleSheet,r,n.stylis),t.useLayoutEffect(function(){if(!n.styleSheet.server)return l(i,e,n.styleSheet,r,n.stylis),function(){return a.removeStyles(i,n.styleSheet)}},[i,e,n.styleSheet,r,n.stylis]),null};function l(e,t,n,r,i){if(a.isStatic)a.renderStyles(e,kn,n,i);else{var o=ut(ut({},t),{theme:Cn(t,r,s.defaultProps)});a.renderStyles(e,o,n,i)}}return t.memo(s)})`
  * {
    transition: background-color ${e=>e.theme.transitions.medium}, 
                color ${e=>e.theme.transitions.medium}, 
                border-color ${e=>e.theme.transitions.medium},
                box-shadow ${e=>e.theme.transitions.medium};
  }
  
  body {
    background-color: ${e=>e.theme.colors.background||e.theme.colors.primary};
    color: ${e=>e.theme.colors.textPrimary};
    transition: background-color ${e=>e.theme.transitions.slow}, 
                color ${e=>e.theme.transitions.slow};
    font-family: ${e=>e.fontFamily};
  }
  
  /* Glassmorphism specific styles */
  .glassmorphism-card {
    background: ${e=>"glassmorphism"===e.theme.name?e.theme.colors.card:"transparent"};
    backdrop-filter: ${e=>"glassmorphism"===e.theme.name?"blur(20px) saturate(180%)":"none"};
    border: ${e=>"glassmorphism"===e.theme.name?e.theme.colors.glassBorder:"none"};
    box-shadow: ${e=>"glassmorphism"===e.theme.name?e.theme.colors.glassShadow:"none"};
  }
  
  .glassmorphism-frost {
    background: ${e=>"glassmorphism"===e.theme.name?e.theme.colors.card:"transparent"};
    backdrop-filter: ${e=>"glassmorphism"===e.theme.name?"blur(10px) saturate(150%)":"none"};
    border: ${e=>"glassmorphism"===e.theme.name?e.theme.colors.frostBorder:"none"};
    box-shadow: ${e=>"glassmorphism"===e.theme.name?e.theme.colors.frostShadow:"none"};
  }
  
  /* Smooth theme transition overlay */
  .theme-transition-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${e=>"dark"===e.theme.name?"#0f172a":"glassmorphism"===e.theme.name?'url("/images/morphism.png") center/cover no-repeat fixed':"#ffffff"};
    z-index: 9999;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .theme-transition-overlay.active {
    opacity: 1;
  }
`,hi=(0,t.createContext)(),fi=()=>{const e=(0,t.useContext)(hi);if(!e)throw new Error("useTheme must be used within a ThemeProvider");return e},mi=e=>{let{children:n}=e;const[r,i]=(0,t.useState)("light"),[o,a]=(0,t.useState)("inter"),[s,l]=(0,t.useState)("default"),[c,d]=(0,t.useState)(!1);(0,t.useEffect)(()=>{const e=localStorage.getItem("monexa-theme")||"light",t=localStorage.getItem("monexa-font")||"inter",n=localStorage.getItem("monexa-accent")||"default";i(e),a(t),l(n)},[]),(0,t.useEffect)(()=>{localStorage.setItem("monexa-theme",r)},[r]),(0,t.useEffect)(()=>{localStorage.setItem("monexa-font",o)},[o]),(0,t.useEffect)(()=>{localStorage.setItem("monexa-accent",s)},[s]);const u=ui[s],p="dark"===r?{name:"dark",colors:{...u.dark,success:"#10b981",warning:"#f59e0b",error:"#ef4444",info:"#3b82f6",shadow:"rgba(0, 0, 0, 0.3)",shadowHover:"rgba(0, 0, 0, 0.5)",inputFocus:"#475569"},shadows:{small:"0 2px 8px rgba(0, 0, 0, 0.3)",medium:"0 8px 32px rgba(0, 0, 0, 0.3)",large:"0 20px 60px rgba(0, 0, 0, 0.4)"},transitions:{fast:"0.2s ease",medium:"0.3s ease",slow:"0.5s ease"}}:"glassmorphism"===r?(e=>{const t=e.colors[0],n=e.colors[1];return{name:"glassmorphism",colors:{primary:"rgba(255, 255, 255, 0.1)",secondary:"rgba(240, 248, 255, 0.15)",tertiary:"rgba(230, 240, 250, 0.2)",background:'url("/images/morphism.png") center/cover no-repeat fixed',textPrimary:"#1a237e",textSecondary:"#283593",textTertiary:"#3949ab",borderPrimary:`rgba(${di(t)}, 0.3)`,borderSecondary:`rgba(${di(t)}, 0.2)`,card:"rgba(255, 255, 255, 0.25)",cardHover:"rgba(255, 255, 255, 0.35)",input:"rgba(255, 255, 255, 0.2)",inputBorder:`rgba(${di(t)}, 0.4)`,inputFocus:"rgba(255, 255, 255, 0.3)",inputFocusBorder:t,buttonPrimary:t,buttonSecondary:"rgba(255, 255, 255, 0.2)",buttonText:"#ffffff",buttonTextSecondary:"#1a237e",accent:t,accentHover:n,success:"#4caf50",warning:"#ff9800",error:"#f44336",info:"#2196f3",shadow:"rgba(31, 38, 135, 0.15)",shadowHover:"rgba(31, 38, 135, 0.25)",glassEffect:"backdrop-filter: blur(20px) saturate(180%);",glassBorder:"1px solid rgba(255, 255, 255, 0.3)",glassShadow:`0 8px 32px rgba(${di(t)}, 0.2)`,frostEffect:"backdrop-filter: blur(10px) saturate(150%);",frostBorder:"1px solid rgba(255, 255, 255, 0.2)",frostShadow:`0 4px 16px rgba(${di(t)}, 0.15)`},shadows:{small:`0 4px 16px rgba(${di(t)}, 0.15)`,medium:`0 8px 32px rgba(${di(t)}, 0.2)`,large:`0 20px 60px rgba(${di(t)}, 0.25)`},transitions:{fast:"0.2s ease",medium:"0.3s ease",slow:"0.5s ease"}}})(u):(e=>({name:"light",colors:{...e.light,success:"#059669",warning:"#d97706",error:"#dc2626",info:"#2563eb",shadow:"rgba(0, 0, 0, 0.04)",shadowHover:"rgba(0, 0, 0, 0.08)",inputFocus:"#ffffff"},shadows:{small:"0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)",medium:"0 4px 16px rgba(0, 0, 0, 0.04), 0 2px 8px rgba(0, 0, 0, 0.02)",large:"0 10px 40px rgba(0, 0, 0, 0.06), 0 4px 16px rgba(0, 0, 0, 0.03)"},transitions:{fast:"0.2s ease",medium:"0.3s ease",slow:"0.5s ease"}}))(u);const h=ci[o];return(0,oi.jsxs)(hi.Provider,{value:{theme:p,themeName:r,selectedFont:o,currentFont:h,setSelectedFont:a,selectedAccent:s,currentAccent:u,setSelectedAccent:l,toggleTheme:async()=>{d(!0);const e=document.createElement("div");e.className="theme-transition-overlay",document.body.appendChild(e),setTimeout(()=>{e.classList.add("active")},10),setTimeout(()=>{i(e=>"light"===e?"dark":"dark"===e?"glassmorphism":"light"),setTimeout(()=>{e.classList.remove("active"),setTimeout(()=>{document.body.removeChild(e),d(!1)},300)},100)},150)},isTransitioning:c},children:[(0,oi.jsx)(pi,{theme:p,fontFamily:h.family}),n]})},gi=(0,t.createContext)({transformPagePoint:e=>e,isStatic:!1,reducedMotion:"never"}),xi=(0,t.createContext)({}),yi=(0,t.createContext)(null),vi="undefined"!==typeof document,bi=vi?t.useLayoutEffect:t.useEffect,wi=(0,t.createContext)({strict:!1}),ki=e=>e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),ji="data-"+ki("framerAppearId");function Si(e){return e&&"object"===typeof e&&Object.prototype.hasOwnProperty.call(e,"current")}function Ci(e){return"string"===typeof e||Array.isArray(e)}function Pi(e){return null!==e&&"object"===typeof e&&"function"===typeof e.start}const Ei=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],Ti=["initial",...Ei];function zi(e){return Pi(e.animate)||Ti.some(t=>Ci(e[t]))}function Ai(e){return Boolean(zi(e)||e.variants)}function _i(e){const{initial:n,animate:r}=function(e,t){if(zi(e)){const{initial:t,animate:n}=e;return{initial:!1===t||Ci(t)?t:void 0,animate:Ci(n)?n:void 0}}return!1!==e.inherit?t:{}}(e,(0,t.useContext)(xi));return(0,t.useMemo)(()=>({initial:n,animate:r}),[Mi(n),Mi(r)])}function Mi(e){return Array.isArray(e)?e.join(" "):e}const $i={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]},Ni={};for(const n in $i)Ni[n]={isEnabled:e=>$i[n].some(t=>!!e[t])};const Ri=(0,t.createContext)({}),Li=(0,t.createContext)({}),Di=Symbol.for("motionComponentSymbol");function Fi(e){let{preloadedFeatures:n,createVisualElement:r,useRender:i,useVisualState:o,Component:a}=e;n&&function(e){for(const t in e)Ni[t]={...Ni[t],...e[t]}}(n);const s=(0,t.forwardRef)(function(e,s){let l;const c={...(0,t.useContext)(gi),...e,layoutId:Oi(e)},{isStatic:d}=c,u=_i(e),p=o(e,d);if(!d&&vi){u.visualElement=function(e,n,r,i){const{visualElement:o}=(0,t.useContext)(xi),a=(0,t.useContext)(wi),s=(0,t.useContext)(yi),l=(0,t.useContext)(gi).reducedMotion,c=(0,t.useRef)();i=i||a.renderer,!c.current&&i&&(c.current=i(e,{visualState:n,parent:o,props:r,presenceContext:s,blockInitialAnimation:!!s&&!1===s.initial,reducedMotionConfig:l}));const d=c.current;(0,t.useInsertionEffect)(()=>{d&&d.update(r,s)});const u=(0,t.useRef)(Boolean(r[ji]&&!window.HandoffComplete));return bi(()=>{d&&(d.render(),u.current&&d.animationState&&d.animationState.animateChanges())}),(0,t.useEffect)(()=>{d&&(d.updateFeatures(),!u.current&&d.animationState&&d.animationState.animateChanges(),u.current&&(u.current=!1,window.HandoffComplete=!0))}),d}(a,p,c,r);const e=(0,t.useContext)(Li),i=(0,t.useContext)(wi).strict;u.visualElement&&(l=u.visualElement.loadFeatures(c,i,n,e))}return t.createElement(xi.Provider,{value:u},l&&u.visualElement?t.createElement(l,{visualElement:u.visualElement,...c}):null,i(a,e,function(e,n,r){return(0,t.useCallback)(t=>{t&&e.mount&&e.mount(t),n&&(t?n.mount(t):n.unmount()),r&&("function"===typeof r?r(t):Si(r)&&(r.current=t))},[n])}(p,u.visualElement,s),p,d,u.visualElement))});return s[Di]=a,s}function Oi(e){let{layoutId:n}=e;const r=(0,t.useContext)(Ri).id;return r&&void 0!==n?r+"-"+n:n}function Ii(e){function t(t){return Fi(e(t,arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}))}if("undefined"===typeof Proxy)return t;const n=new Map;return new Proxy(t,{get:(e,r)=>(n.has(r)||n.set(r,t(r)),n.get(r))})}const Bi=["animate","circle","defs","desc","ellipse","g","image","line","filter","marker","mask","metadata","path","pattern","polygon","polyline","rect","stop","switch","symbol","svg","text","tspan","use","view"];function Vi(e){return"string"===typeof e&&!e.includes("-")&&!!(Bi.indexOf(e)>-1||/[A-Z]/.test(e))}const Ui={};const Hi=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],Wi=new Set(Hi);function qi(e,t){let{layout:n,layoutId:r}=t;return Wi.has(e)||e.startsWith("origin")||(n||void 0!==r)&&(!!Ui[e]||"opacity"===e)}const Yi=e=>Boolean(e&&e.getVelocity),Gi={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},Ki=Hi.length;const Qi=e=>t=>"string"===typeof t&&t.startsWith(e),Xi=Qi("--"),Zi=Qi("var(--"),Ji=(e,t)=>t&&"number"===typeof e?t.transform(e):e,eo=(e,t,n)=>Math.min(Math.max(n,e),t),to={test:e=>"number"===typeof e,parse:parseFloat,transform:e=>e},no={...to,transform:e=>eo(0,1,e)},ro={...to,default:1},io=e=>Math.round(1e5*e)/1e5,oo=/(-)?([\d]*\.?[\d])+/g,ao=/(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))/gi,so=/^(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))$/i;function lo(e){return"string"===typeof e}const co=e=>({test:t=>lo(t)&&t.endsWith(e)&&1===t.split(" ").length,parse:parseFloat,transform:t=>`${t}${e}`}),uo=co("deg"),po=co("%"),ho=co("px"),fo=co("vh"),mo=co("vw"),go={...po,parse:e=>po.parse(e)/100,transform:e=>po.transform(100*e)},xo={...to,transform:Math.round},yo={borderWidth:ho,borderTopWidth:ho,borderRightWidth:ho,borderBottomWidth:ho,borderLeftWidth:ho,borderRadius:ho,radius:ho,borderTopLeftRadius:ho,borderTopRightRadius:ho,borderBottomRightRadius:ho,borderBottomLeftRadius:ho,width:ho,maxWidth:ho,height:ho,maxHeight:ho,size:ho,top:ho,right:ho,bottom:ho,left:ho,padding:ho,paddingTop:ho,paddingRight:ho,paddingBottom:ho,paddingLeft:ho,margin:ho,marginTop:ho,marginRight:ho,marginBottom:ho,marginLeft:ho,rotate:uo,rotateX:uo,rotateY:uo,rotateZ:uo,scale:ro,scaleX:ro,scaleY:ro,scaleZ:ro,skew:uo,skewX:uo,skewY:uo,distance:ho,translateX:ho,translateY:ho,translateZ:ho,x:ho,y:ho,z:ho,perspective:ho,transformPerspective:ho,opacity:no,originX:go,originY:go,originZ:ho,zIndex:xo,fillOpacity:no,strokeOpacity:no,numOctaves:xo};function vo(e,t,n,r){const{style:i,vars:o,transform:a,transformOrigin:s}=e;let l=!1,c=!1,d=!0;for(const u in t){const e=t[u];if(Xi(u)){o[u]=e;continue}const n=yo[u],r=Ji(e,n);if(Wi.has(u)){if(l=!0,a[u]=r,!d)continue;e!==(n.default||0)&&(d=!1)}else u.startsWith("origin")?(c=!0,s[u]=r):i[u]=r}if(t.transform||(l||r?i.transform=function(e,t,n,r){let{enableHardwareAcceleration:i=!0,allowTransformNone:o=!0}=t,a="";for(let s=0;s<Ki;s++){const t=Hi[s];void 0!==e[t]&&(a+=`${Gi[t]||t}(${e[t]}) `)}return i&&!e.z&&(a+="translateZ(0)"),a=a.trim(),r?a=r(e,n?"":a):o&&n&&(a="none"),a}(e.transform,n,d,r):i.transform&&(i.transform="none")),c){const{originX:e="50%",originY:t="50%",originZ:n=0}=s;i.transformOrigin=`${e} ${t} ${n}`}}const bo=()=>({style:{},transform:{},transformOrigin:{},vars:{}});function wo(e,t,n){for(const r in t)Yi(t[r])||qi(r,n)||(e[r]=t[r])}function ko(e,n,r){const i={};return wo(i,e.style||{},e),Object.assign(i,function(e,n,r){let{transformTemplate:i}=e;return(0,t.useMemo)(()=>{const e={style:{},transform:{},transformOrigin:{},vars:{}};return vo(e,n,{enableHardwareAcceleration:!r},i),Object.assign({},e.vars,e.style)},[n])}(e,n,r)),e.transformValues?e.transformValues(i):i}function jo(e,t,n){const r={},i=ko(e,t,n);return e.drag&&!1!==e.dragListener&&(r.draggable=!1,i.userSelect=i.WebkitUserSelect=i.WebkitTouchCallout="none",i.touchAction=!0===e.drag?"none":"pan-"+("x"===e.drag?"y":"x")),void 0===e.tabIndex&&(e.onTap||e.onTapStart||e.whileTap)&&(r.tabIndex=0),r.style=i,r}const So=new Set(["animate","exit","variants","initial","style","values","variants","transition","transformTemplate","transformValues","custom","inherit","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","_dragX","_dragY","onHoverStart","onHoverEnd","onViewportEnter","onViewportLeave","globalTapTarget","ignoreStrict","viewport"]);function Co(e){return e.startsWith("while")||e.startsWith("drag")&&"draggable"!==e||e.startsWith("layout")||e.startsWith("onTap")||e.startsWith("onPan")||e.startsWith("onLayout")||So.has(e)}let Po=e=>!Co(e);try{(Eo=require("@emotion/is-prop-valid").default)&&(Po=e=>e.startsWith("on")?!Co(e):Eo(e))}catch(pS){}var Eo;function To(e,t,n){return"string"===typeof e?e:ho.transform(t+n*e)}const zo={offset:"stroke-dashoffset",array:"stroke-dasharray"},Ao={offset:"strokeDashoffset",array:"strokeDasharray"};function _o(e,t,n,r,i){let{attrX:o,attrY:a,attrScale:s,originX:l,originY:c,pathLength:d,pathSpacing:u=1,pathOffset:p=0,...h}=t;if(vo(e,h,n,i),r)return void(e.style.viewBox&&(e.attrs.viewBox=e.style.viewBox));e.attrs=e.style,e.style={};const{attrs:f,style:m,dimensions:g}=e;f.transform&&(g&&(m.transform=f.transform),delete f.transform),g&&(void 0!==l||void 0!==c||m.transform)&&(m.transformOrigin=function(e,t,n){return`${To(t,e.x,e.width)} ${To(n,e.y,e.height)}`}(g,void 0!==l?l:.5,void 0!==c?c:.5)),void 0!==o&&(f.x=o),void 0!==a&&(f.y=a),void 0!==s&&(f.scale=s),void 0!==d&&function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,i=!(arguments.length>4&&void 0!==arguments[4])||arguments[4];e.pathLength=1;const o=i?zo:Ao;e[o.offset]=ho.transform(-r);const a=ho.transform(t),s=ho.transform(n);e[o.array]=`${a} ${s}`}(f,d,u,p,!1)}const Mo=()=>({style:{},transform:{},transformOrigin:{},vars:{},attrs:{}}),$o=e=>"string"===typeof e&&"svg"===e.toLowerCase();function No(e,n,r,i){const o=(0,t.useMemo)(()=>{const t={style:{},transform:{},transformOrigin:{},vars:{},attrs:{}};return _o(t,n,{enableHardwareAcceleration:!1},$o(i),e.transformTemplate),{...t.attrs,style:{...t.style}}},[n]);if(e.style){const t={};wo(t,e.style,e),o.style={...t,...o.style}}return o}function Ro(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return(n,r,i,o,a)=>{let{latestValues:s}=o;const l=(Vi(n)?No:jo)(r,s,a,n),c=function(e,t,n){const r={};for(const i in e)"values"===i&&"object"===typeof e.values||(Po(i)||!0===n&&Co(i)||!t&&!Co(i)||e.draggable&&i.startsWith("onDrag"))&&(r[i]=e[i]);return r}(r,"string"===typeof n,e),d={...c,...l,ref:i},{children:u}=r,p=(0,t.useMemo)(()=>Yi(u)?u.get():u,[u]);return(0,t.createElement)(n,{...d,children:p})}}function Lo(e,t,n,r){let{style:i,vars:o}=t;Object.assign(e.style,i,r&&r.getProjectionStyles(n));for(const a in o)e.style.setProperty(a,o[a])}const Do=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]);function Fo(e,t,n,r){Lo(e,t,void 0,r);for(const i in t.attrs)e.setAttribute(Do.has(i)?i:ki(i),t.attrs[i])}function Oo(e,t){const{style:n}=e,r={};for(const i in n)(Yi(n[i])||t.style&&Yi(t.style[i])||qi(i,e))&&(r[i]=n[i]);return r}function Io(e,t){const n=Oo(e,t);for(const r in e)if(Yi(e[r])||Yi(t[r])){n[-1!==Hi.indexOf(r)?"attr"+r.charAt(0).toUpperCase()+r.substring(1):r]=e[r]}return n}function Bo(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{};return"function"===typeof t&&(t=t(void 0!==n?n:e.custom,r,i)),"string"===typeof t&&(t=e.variants&&e.variants[t]),"function"===typeof t&&(t=t(void 0!==n?n:e.custom,r,i)),t}function Vo(e){const n=(0,t.useRef)(null);return null===n.current&&(n.current=e()),n.current}const Uo=e=>Array.isArray(e),Ho=e=>Uo(e)?e[e.length-1]||0:e;function Wo(e){const t=Yi(e)?e.get():e;return(e=>Boolean(e&&"object"===typeof e&&e.mix&&e.toValue))(t)?t.toValue():t}const qo=e=>(n,r)=>{const i=(0,t.useContext)(xi),o=(0,t.useContext)(yi),a=()=>function(e,t,n,r){let{scrapeMotionValuesFromProps:i,createRenderState:o,onMount:a}=e;const s={latestValues:Yo(t,n,r,i),renderState:o()};return a&&(s.mount=e=>a(t,e,s)),s}(e,n,i,o);return r?a():Vo(a)};function Yo(e,t,n,r){const i={},o=r(e,{});for(const p in o)i[p]=Wo(o[p]);let{initial:a,animate:s}=e;const l=zi(e),c=Ai(e);t&&c&&!l&&!1!==e.inherit&&(void 0===a&&(a=t.initial),void 0===s&&(s=t.animate));let d=!!n&&!1===n.initial;d=d||!1===a;const u=d?s:a;if(u&&"boolean"!==typeof u&&!Pi(u)){(Array.isArray(u)?u:[u]).forEach(t=>{const n=Bo(e,t);if(!n)return;const{transitionEnd:r,transition:o,...a}=n;for(const e in a){let t=a[e];if(Array.isArray(t)){t=t[d?t.length-1:0]}null!==t&&(i[e]=t)}for(const e in r)i[e]=r[e]})}return i}const Go=e=>e;class Ko{constructor(){this.order=[],this.scheduled=new Set}add(e){if(!this.scheduled.has(e))return this.scheduled.add(e),this.order.push(e),!0}remove(e){const t=this.order.indexOf(e);-1!==t&&(this.order.splice(t,1),this.scheduled.delete(e))}clear(){this.order.length=0,this.scheduled.clear()}}const Qo=["prepare","read","update","preRender","render","postRender"];const{schedule:Xo,cancel:Zo,state:Jo,steps:ea}=function(e,t){let n=!1,r=!0;const i={delta:0,timestamp:0,isProcessing:!1},o=Qo.reduce((e,t)=>(e[t]=function(e){let t=new Ko,n=new Ko,r=0,i=!1,o=!1;const a=new WeakSet,s={schedule:function(e){const o=arguments.length>2&&void 0!==arguments[2]&&arguments[2]&&i,s=o?t:n;return arguments.length>1&&void 0!==arguments[1]&&arguments[1]&&a.add(e),s.add(e)&&o&&i&&(r=t.order.length),e},cancel:e=>{n.remove(e),a.delete(e)},process:l=>{if(i)o=!0;else{if(i=!0,[t,n]=[n,t],n.clear(),r=t.order.length,r)for(let n=0;n<r;n++){const r=t.order[n];r(l),a.has(r)&&(s.schedule(r),e())}i=!1,o&&(o=!1,s.process(l))}}};return s}(()=>n=!0),e),{}),a=e=>o[e].process(i),s=()=>{const o=performance.now();n=!1,i.delta=r?1e3/60:Math.max(Math.min(o-i.timestamp,40),1),i.timestamp=o,i.isProcessing=!0,Qo.forEach(a),i.isProcessing=!1,n&&t&&(r=!1,e(s))},l=Qo.reduce((t,a)=>{const l=o[a];return t[a]=function(t){let o=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return n||(n=!0,r=!0,i.isProcessing||e(s)),l.schedule(t,o,a)},t},{});return{schedule:l,cancel:e=>Qo.forEach(t=>o[t].cancel(e)),state:i,steps:o}}("undefined"!==typeof requestAnimationFrame?requestAnimationFrame:Go,!0),ta={useVisualState:qo({scrapeMotionValuesFromProps:Io,createRenderState:Mo,onMount:(e,t,n)=>{let{renderState:r,latestValues:i}=n;Xo.read(()=>{try{r.dimensions="function"===typeof t.getBBox?t.getBBox():t.getBoundingClientRect()}catch(uS){r.dimensions={x:0,y:0,width:0,height:0}}}),Xo.render(()=>{_o(r,i,{enableHardwareAcceleration:!1},$o(t.tagName),e.transformTemplate),Fo(t,r)})}})},na={useVisualState:qo({scrapeMotionValuesFromProps:Oo,createRenderState:bo})};function ra(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{passive:!0};return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n)}const ia=e=>"mouse"===e.pointerType?"number"!==typeof e.button||e.button<=0:!1!==e.isPrimary;function oa(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"page";return{point:{x:e[t+"X"],y:e[t+"Y"]}}}function aa(e,t,n,r){return ra(e,t,(e=>t=>ia(t)&&e(t,oa(t)))(n),r)}const sa=(e,t)=>n=>t(e(n)),la=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.reduce(sa)};function ca(e){let t=null;return()=>{const n=()=>{t=null};return null===t&&(t=e,n)}}const da=ca("dragHorizontal"),ua=ca("dragVertical");function pa(e){let t=!1;if("y"===e)t=ua();else if("x"===e)t=da();else{const e=da(),n=ua();e&&n?t=()=>{e(),n()}:(e&&e(),n&&n())}return t}function ha(){const e=pa(!0);return!e||(e(),!1)}class fa{constructor(e){this.isMounted=!1,this.node=e}update(){}}function ma(e,t){const n="pointer"+(t?"enter":"leave"),r="onHover"+(t?"Start":"End");return aa(e.current,n,(n,i)=>{if("touch"===n.pointerType||ha())return;const o=e.getProps();e.animationState&&o.whileHover&&e.animationState.setActive("whileHover",t),o[r]&&Xo.update(()=>o[r](n,i))},{passive:!e.getProps()[r]})}const ga=(e,t)=>!!t&&(e===t||ga(e,t.parentElement));function xa(e,t){if(!t)return;const n=new PointerEvent("pointer"+e);t(n,oa(n))}const ya=new WeakMap,va=new WeakMap,ba=e=>{const t=ya.get(e.target);t&&t(e)},wa=e=>{e.forEach(ba)};function ka(e,t,n){const r=function(e){let{root:t,...n}=e;const r=t||document;va.has(r)||va.set(r,{});const i=va.get(r),o=JSON.stringify(n);return i[o]||(i[o]=new IntersectionObserver(wa,{root:t,...n})),i[o]}(t);return ya.set(e,n),r.observe(e),()=>{ya.delete(e),r.unobserve(e)}}const ja={some:0,all:1};const Sa={inView:{Feature:class extends fa{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){this.unmount();const{viewport:e={}}=this.node.getProps(),{root:t,margin:n,amount:r="some",once:i}=e,o={root:t?t.current:void 0,rootMargin:n,threshold:"number"===typeof r?r:ja[r]};return ka(this.node.current,o,e=>{const{isIntersecting:t}=e;if(this.isInView===t)return;if(this.isInView=t,i&&!t&&this.hasEnteredView)return;t&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive("whileInView",t);const{onViewportEnter:n,onViewportLeave:r}=this.node.getProps(),o=t?n:r;o&&o(e)})}mount(){this.startObserver()}update(){if("undefined"===typeof IntersectionObserver)return;const{props:e,prevProps:t}=this.node,n=["amount","margin","root"].some(function(e){let{viewport:t={}}=e,{viewport:n={}}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e=>t[e]!==n[e]}(e,t));n&&this.startObserver()}unmount(){}}},tap:{Feature:class extends fa{constructor(){super(...arguments),this.removeStartListeners=Go,this.removeEndListeners=Go,this.removeAccessibleListeners=Go,this.startPointerPress=(e,t)=>{if(this.isPressing)return;this.removeEndListeners();const n=this.node.getProps(),r=aa(window,"pointerup",(e,t)=>{if(!this.checkPressEnd())return;const{onTap:n,onTapCancel:r,globalTapTarget:i}=this.node.getProps();Xo.update(()=>{i||ga(this.node.current,e.target)?n&&n(e,t):r&&r(e,t)})},{passive:!(n.onTap||n.onPointerUp)}),i=aa(window,"pointercancel",(e,t)=>this.cancelPress(e,t),{passive:!(n.onTapCancel||n.onPointerCancel)});this.removeEndListeners=la(r,i),this.startPress(e,t)},this.startAccessiblePress=()=>{const e=ra(this.node.current,"keydown",e=>{if("Enter"!==e.key||this.isPressing)return;this.removeEndListeners(),this.removeEndListeners=ra(this.node.current,"keyup",e=>{"Enter"===e.key&&this.checkPressEnd()&&xa("up",(e,t)=>{const{onTap:n}=this.node.getProps();n&&Xo.update(()=>n(e,t))})}),xa("down",(e,t)=>{this.startPress(e,t)})}),t=ra(this.node.current,"blur",()=>{this.isPressing&&xa("cancel",(e,t)=>this.cancelPress(e,t))});this.removeAccessibleListeners=la(e,t)}}startPress(e,t){this.isPressing=!0;const{onTapStart:n,whileTap:r}=this.node.getProps();r&&this.node.animationState&&this.node.animationState.setActive("whileTap",!0),n&&Xo.update(()=>n(e,t))}checkPressEnd(){this.removeEndListeners(),this.isPressing=!1;return this.node.getProps().whileTap&&this.node.animationState&&this.node.animationState.setActive("whileTap",!1),!ha()}cancelPress(e,t){if(!this.checkPressEnd())return;const{onTapCancel:n}=this.node.getProps();n&&Xo.update(()=>n(e,t))}mount(){const e=this.node.getProps(),t=aa(e.globalTapTarget?window:this.node.current,"pointerdown",this.startPointerPress,{passive:!(e.onTapStart||e.onPointerStart)}),n=ra(this.node.current,"focus",this.startAccessiblePress);this.removeStartListeners=la(t,n)}unmount(){this.removeStartListeners(),this.removeEndListeners(),this.removeAccessibleListeners()}}},focus:{Feature:class extends fa{constructor(){super(...arguments),this.isActive=!1}onFocus(){let e=!1;try{e=this.node.current.matches(":focus-visible")}catch(uS){e=!0}e&&this.node.animationState&&(this.node.animationState.setActive("whileFocus",!0),this.isActive=!0)}onBlur(){this.isActive&&this.node.animationState&&(this.node.animationState.setActive("whileFocus",!1),this.isActive=!1)}mount(){this.unmount=la(ra(this.node.current,"focus",()=>this.onFocus()),ra(this.node.current,"blur",()=>this.onBlur()))}unmount(){}}},hover:{Feature:class extends fa{mount(){this.unmount=la(ma(this.node,!0),ma(this.node,!1))}unmount(){}}}};function Ca(e,t){if(!Array.isArray(t))return!1;const n=t.length;if(n!==e.length)return!1;for(let r=0;r<n;r++)if(t[r]!==e[r])return!1;return!0}function Pa(e,t,n){const r=e.getProps();return Bo(r,t,void 0!==n?n:r.custom,function(e){const t={};return e.values.forEach((e,n)=>t[n]=e.get()),t}(e),function(e){const t={};return e.values.forEach((e,n)=>t[n]=e.getVelocity()),t}(e))}let Ea=Go,Ta=Go;const za=e=>1e3*e,Aa=e=>e/1e3,_a=!1,Ma=e=>Array.isArray(e)&&"number"===typeof e[0];function $a(e){return Boolean(!e||"string"===typeof e&&Ra[e]||Ma(e)||Array.isArray(e)&&e.every($a))}const Na=e=>{let[t,n,r,i]=e;return`cubic-bezier(${t}, ${n}, ${r}, ${i})`},Ra={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:Na([0,.65,.55,1]),circOut:Na([.55,0,1,.45]),backIn:Na([.31,.01,.66,-.59]),backOut:Na([.33,1.53,.69,.99])};function La(e){if(e)return Ma(e)?Na(e):Array.isArray(e)?e.map(La):Ra[e]}const Da=(e,t,n)=>(((1-3*n+3*t)*e+(3*n-6*t))*e+3*t)*e;function Fa(e,t,n,r){if(e===t&&n===r)return Go;const i=t=>function(e,t,n,r,i){let o,a,s=0;do{a=t+(n-t)/2,o=Da(a,r,i)-e,o>0?n=a:t=a}while(Math.abs(o)>1e-7&&++s<12);return a}(t,0,1,e,n);return e=>0===e||1===e?e:Da(i(e),t,r)}const Oa=Fa(.42,0,1,1),Ia=Fa(0,0,.58,1),Ba=Fa(.42,0,.58,1),Va=e=>t=>t<=.5?e(2*t)/2:(2-e(2*(1-t)))/2,Ua=e=>t=>1-e(1-t),Ha=e=>1-Math.sin(Math.acos(e)),Wa=Ua(Ha),qa=Va(Ha),Ya=Fa(.33,1.53,.69,.99),Ga=Ua(Ya),Ka=Va(Ga),Qa={linear:Go,easeIn:Oa,easeInOut:Ba,easeOut:Ia,circIn:Ha,circInOut:qa,circOut:Wa,backIn:Ga,backInOut:Ka,backOut:Ya,anticipate:e=>(e*=2)<1?.5*Ga(e):.5*(2-Math.pow(2,-10*(e-1)))},Xa=e=>{if(Array.isArray(e)){Ta(4===e.length,"Cubic bezier arrays must contain four numerical values.");const[t,n,r,i]=e;return Fa(t,n,r,i)}return"string"===typeof e?(Ta(void 0!==Qa[e],`Invalid easing type '${e}'`),Qa[e]):e},Za=(e,t)=>n=>Boolean(lo(n)&&so.test(n)&&n.startsWith(e)||t&&Object.prototype.hasOwnProperty.call(n,t)),Ja=(e,t,n)=>r=>{if(!lo(r))return r;const[i,o,a,s]=r.match(oo);return{[e]:parseFloat(i),[t]:parseFloat(o),[n]:parseFloat(a),alpha:void 0!==s?parseFloat(s):1}},es={...to,transform:e=>Math.round((e=>eo(0,255,e))(e))},ts={test:Za("rgb","red"),parse:Ja("red","green","blue"),transform:e=>{let{red:t,green:n,blue:r,alpha:i=1}=e;return"rgba("+es.transform(t)+", "+es.transform(n)+", "+es.transform(r)+", "+io(no.transform(i))+")"}};const ns={test:Za("#"),parse:function(e){let t="",n="",r="",i="";return e.length>5?(t=e.substring(1,3),n=e.substring(3,5),r=e.substring(5,7),i=e.substring(7,9)):(t=e.substring(1,2),n=e.substring(2,3),r=e.substring(3,4),i=e.substring(4,5),t+=t,n+=n,r+=r,i+=i),{red:parseInt(t,16),green:parseInt(n,16),blue:parseInt(r,16),alpha:i?parseInt(i,16)/255:1}},transform:ts.transform},rs={test:Za("hsl","hue"),parse:Ja("hue","saturation","lightness"),transform:e=>{let{hue:t,saturation:n,lightness:r,alpha:i=1}=e;return"hsla("+Math.round(t)+", "+po.transform(io(n))+", "+po.transform(io(r))+", "+io(no.transform(i))+")"}},is={test:e=>ts.test(e)||ns.test(e)||rs.test(e),parse:e=>ts.test(e)?ts.parse(e):rs.test(e)?rs.parse(e):ns.parse(e),transform:e=>lo(e)?e:e.hasOwnProperty("red")?ts.transform(e):rs.transform(e)},os=(e,t,n)=>-n*e+n*t+e;function as(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+6*(t-e)*n:n<.5?t:n<2/3?e+(t-e)*(2/3-n)*6:e}const ss=(e,t,n)=>{const r=e*e;return Math.sqrt(Math.max(0,n*(t*t-r)+r))},ls=[ns,ts,rs];function cs(e){const t=(e=>ls.find(t=>t.test(e)))(e);Ta(Boolean(t),`'${e}' is not an animatable color. Use the equivalent color code instead.`);let n=t.parse(e);return t===rs&&(n=function(e){let{hue:t,saturation:n,lightness:r,alpha:i}=e;t/=360,n/=100,r/=100;let o=0,a=0,s=0;if(n){const e=r<.5?r*(1+n):r+n-r*n,i=2*r-e;o=as(i,e,t+1/3),a=as(i,e,t),s=as(i,e,t-1/3)}else o=a=s=r;return{red:Math.round(255*o),green:Math.round(255*a),blue:Math.round(255*s),alpha:i}}(n)),n}const ds=(e,t)=>{const n=cs(e),r=cs(t),i={...n};return e=>(i.red=ss(n.red,r.red,e),i.green=ss(n.green,r.green,e),i.blue=ss(n.blue,r.blue,e),i.alpha=os(n.alpha,r.alpha,e),ts.transform(i))};const us={regex:/var\s*\(\s*--[\w-]+(\s*,\s*(?:(?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)+)?\s*\)/g,countKey:"Vars",token:"${v}",parse:Go},ps={regex:ao,countKey:"Colors",token:"${c}",parse:is.parse},hs={regex:oo,countKey:"Numbers",token:"${n}",parse:to.parse};function fs(e,t){let{regex:n,countKey:r,token:i,parse:o}=t;const a=e.tokenised.match(n);a&&(e["num"+r]=a.length,e.tokenised=e.tokenised.replace(n,i),e.values.push(...a.map(o)))}function ms(e){const t=e.toString(),n={value:t,tokenised:t,values:[],numVars:0,numColors:0,numNumbers:0};return n.value.includes("var(--")&&fs(n,us),fs(n,ps),fs(n,hs),n}function gs(e){return ms(e).values}function xs(e){const{values:t,numColors:n,numVars:r,tokenised:i}=ms(e),o=t.length;return e=>{let t=i;for(let i=0;i<o;i++)t=i<r?t.replace(us.token,e[i]):i<r+n?t.replace(ps.token,is.transform(e[i])):t.replace(hs.token,io(e[i]));return t}}const ys=e=>"number"===typeof e?0:e;const vs={test:function(e){var t,n;return isNaN(e)&&lo(e)&&((null===(t=e.match(oo))||void 0===t?void 0:t.length)||0)+((null===(n=e.match(ao))||void 0===n?void 0:n.length)||0)>0},parse:gs,createTransformer:xs,getAnimatableNone:function(e){const t=gs(e);return xs(e)(t.map(ys))}},bs=(e,t)=>n=>`${n>0?t:e}`;function ws(e,t){return"number"===typeof e?n=>os(e,t,n):is.test(e)?ds(e,t):e.startsWith("var(")?bs(e,t):Ss(e,t)}const ks=(e,t)=>{const n=[...e],r=n.length,i=e.map((e,n)=>ws(e,t[n]));return e=>{for(let t=0;t<r;t++)n[t]=i[t](e);return n}},js=(e,t)=>{const n={...e,...t},r={};for(const i in n)void 0!==e[i]&&void 0!==t[i]&&(r[i]=ws(e[i],t[i]));return e=>{for(const t in r)n[t]=r[t](e);return n}},Ss=(e,t)=>{const n=vs.createTransformer(t),r=ms(e),i=ms(t);return r.numVars===i.numVars&&r.numColors===i.numColors&&r.numNumbers>=i.numNumbers?la(ks(r.values,i.values),n):(Ea(!0,`Complex values '${e}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`),bs(e,t))},Cs=(e,t,n)=>{const r=t-e;return 0===r?1:(n-e)/r},Ps=(e,t)=>n=>os(e,t,n);function Es(e,t,n){const r=[],i=n||function(e){return"number"===typeof e?Ps:"string"===typeof e?is.test(e)?ds:Ss:Array.isArray(e)?ks:"object"===typeof e?js:Ps}(e[0]),o=e.length-1;for(let a=0;a<o;a++){let n=i(e[a],e[a+1]);if(t){const e=Array.isArray(t)?t[a]||Go:t;n=la(e,n)}r.push(n)}return r}function Ts(e,t){let{clamp:n=!0,ease:r,mixer:i}=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const o=e.length;if(Ta(o===t.length,"Both input and output ranges must be the same length"),1===o)return()=>t[0];e[0]>e[o-1]&&(e=[...e].reverse(),t=[...t].reverse());const a=Es(t,r,i),s=a.length,l=t=>{let n=0;if(s>1)for(;n<e.length-2&&!(t<e[n+1]);n++);const r=Cs(e[n],e[n+1],t);return a[n](r)};return n?t=>l(eo(e[0],e[o-1],t)):l}function zs(e){const t=[0];return function(e,t){const n=e[e.length-1];for(let r=1;r<=t;r++){const i=Cs(0,t,r);e.push(os(n,1,i))}}(t,e.length-1),t}function As(e){let{duration:t=300,keyframes:n,times:r,ease:i="easeInOut"}=e;const o=(e=>Array.isArray(e)&&"number"!==typeof e[0])(i)?i.map(Xa):Xa(i),a={done:!1,value:n[0]},s=function(e,t){return e.map(e=>e*t)}(r&&r.length===n.length?r:zs(n),t),l=Ts(s,n,{ease:Array.isArray(o)?o:(c=n,d=o,c.map(()=>d||Ba).splice(0,c.length-1))});var c,d;return{calculatedDuration:t,next:e=>(a.value=l(e),a.done=e>=t,a)}}function _s(e,t){return t?e*(1e3/t):0}function Ms(e,t,n){const r=Math.max(t-5,0);return _s(n-e(r),t-r)}const $s=.001;function Ns(e){let t,n,{duration:r=800,bounce:i=.25,velocity:o=0,mass:a=1}=e;Ea(r<=za(10),"Spring duration must be 10 seconds or less");let s=1-i;s=eo(.05,1,s),r=eo(.01,10,Aa(r)),s<1?(t=e=>{const t=e*s,n=t*r,i=t-o,a=Ls(e,s),l=Math.exp(-n);return $s-i/a*l},n=e=>{const n=e*s*r,i=n*o+o,a=Math.pow(s,2)*Math.pow(e,2)*r,l=Math.exp(-n),c=Ls(Math.pow(e,2),s);return(-t(e)+$s>0?-1:1)*((i-a)*l)/c}):(t=e=>Math.exp(-e*r)*((e-o)*r+1)-.001,n=e=>Math.exp(-e*r)*(r*r*(o-e)));const l=function(e,t,n){let r=n;for(let i=1;i<Rs;i++)r-=e(r)/t(r);return r}(t,n,5/r);if(r=za(r),isNaN(l))return{stiffness:100,damping:10,duration:r};{const e=Math.pow(l,2)*a;return{stiffness:e,damping:2*s*Math.sqrt(a*e),duration:r}}}const Rs=12;function Ls(e,t){return e*Math.sqrt(1-t*t)}const Ds=["duration","bounce"],Fs=["stiffness","damping","mass"];function Os(e,t){return t.some(t=>void 0!==e[t])}function Is(e){let{keyframes:t,restDelta:n,restSpeed:r,...i}=e;const o=t[0],a=t[t.length-1],s={done:!1,value:o},{stiffness:l,damping:c,mass:d,duration:u,velocity:p,isResolvedFromDuration:h}=function(e){let t={velocity:0,stiffness:100,damping:10,mass:1,isResolvedFromDuration:!1,...e};if(!Os(e,Fs)&&Os(e,Ds)){const n=Ns(e);t={...t,...n,mass:1},t.isResolvedFromDuration=!0}return t}({...i,velocity:-Aa(i.velocity||0)}),f=p||0,m=c/(2*Math.sqrt(l*d)),g=a-o,x=Aa(Math.sqrt(l/d)),y=Math.abs(g)<5;let v;if(r||(r=y?.01:2),n||(n=y?.005:.5),m<1){const e=Ls(x,m);v=t=>{const n=Math.exp(-m*x*t);return a-n*((f+m*x*g)/e*Math.sin(e*t)+g*Math.cos(e*t))}}else if(1===m)v=e=>a-Math.exp(-x*e)*(g+(f+x*g)*e);else{const e=x*Math.sqrt(m*m-1);v=t=>{const n=Math.exp(-m*x*t),r=Math.min(e*t,300);return a-n*((f+m*x*g)*Math.sinh(r)+e*g*Math.cosh(r))/e}}return{calculatedDuration:h&&u||null,next:e=>{const t=v(e);if(h)s.done=e>=u;else{let i=f;0!==e&&(i=m<1?Ms(v,e,t):0);const o=Math.abs(i)<=r,l=Math.abs(a-t)<=n;s.done=o&&l}return s.value=s.done?a:t,s}}}function Bs(e){let{keyframes:t,velocity:n=0,power:r=.8,timeConstant:i=325,bounceDamping:o=10,bounceStiffness:a=500,modifyTarget:s,min:l,max:c,restDelta:d=.5,restSpeed:u}=e;const p=t[0],h={done:!1,value:p},f=e=>void 0===l?c:void 0===c||Math.abs(l-e)<Math.abs(c-e)?l:c;let m=r*n;const g=p+m,x=void 0===s?g:s(g);x!==g&&(m=x-p);const y=e=>-m*Math.exp(-e/i),v=e=>x+y(e),b=e=>{const t=y(e),n=v(e);h.done=Math.abs(t)<=d,h.value=h.done?x:n};let w,k;const j=e=>{(e=>void 0!==l&&e<l||void 0!==c&&e>c)(h.value)&&(w=e,k=Is({keyframes:[h.value,f(h.value)],velocity:Ms(v,e,h.value),damping:o,stiffness:a,restDelta:d,restSpeed:u}))};return j(0),{calculatedDuration:null,next:e=>{let t=!1;return k||void 0!==w||(t=!0,b(e),j(e)),void 0!==w&&e>w?k.next(e-w):(!t&&b(e),h)}}}const Vs=e=>{const t=t=>{let{timestamp:n}=t;return e(n)};return{start:()=>Xo.update(t,!0),stop:()=>Zo(t),now:()=>Jo.isProcessing?Jo.timestamp:performance.now()}};function Us(e){let t=0;let n=e.next(t);for(;!n.done&&t<2e4;)t+=50,n=e.next(t);return t>=2e4?1/0:t}const Hs={decay:Bs,inertia:Bs,tween:As,keyframes:As,spring:Is};function Ws(e){let t,n,{autoplay:r=!0,delay:i=0,driver:o=Vs,keyframes:a,type:s="keyframes",repeat:l=0,repeatDelay:c=0,repeatType:d="loop",onPlay:u,onStop:p,onComplete:h,onUpdate:f,...m}=e,g=1,x=!1;const y=()=>{n=new Promise(e=>{t=e})};let v;y();const b=Hs[s]||As;let w;b!==As&&"number"!==typeof a[0]&&(w=Ts([0,100],a,{clamp:!1}),a=[0,100]);const k=b({...m,keyframes:a});let j;"mirror"===d&&(j=b({...m,keyframes:[...a].reverse(),velocity:-(m.velocity||0)}));let S="idle",C=null,P=null,E=null;null===k.calculatedDuration&&l&&(k.calculatedDuration=Us(k));const{calculatedDuration:T}=k;let z=1/0,A=1/0;null!==T&&(z=T+c,A=z*(l+1)-c);let _=0;const M=e=>{if(null===P)return;g>0&&(P=Math.min(P,e)),g<0&&(P=Math.min(e-A/g,P)),_=null!==C?C:Math.round(e-P)*g;const t=_-i*(g>=0?1:-1),n=g>=0?t<0:t>A;_=Math.max(t,0),"finished"===S&&null===C&&(_=A);let r=_,o=k;if(l){const e=Math.min(_,A)/z;let t=Math.floor(e),n=e%1;!n&&e>=1&&(n=1),1===n&&t--,t=Math.min(t,l+1);Boolean(t%2)&&("reverse"===d?(n=1-n,c&&(n-=c/z)):"mirror"===d&&(o=j)),r=eo(0,1,n)*z}const s=n?{done:!1,value:a[0]}:o.next(r);w&&(s.value=w(s.value));let{done:u}=s;n||null===T||(u=g>=0?_>=A:_<=0);const p=null===C&&("finished"===S||"running"===S&&u);return f&&f(s.value),p&&R(),s},$=()=>{v&&v.stop(),v=void 0},N=()=>{S="idle",$(),t(),y(),P=E=null},R=()=>{S="finished",h&&h(),$(),t()},L=()=>{if(x)return;v||(v=o(M));const e=v.now();u&&u(),null!==C?P=e-C:P&&"finished"!==S||(P=e),"finished"===S&&y(),E=P,C=null,S="running",v.start()};r&&L();const D={then:(e,t)=>n.then(e,t),get time(){return Aa(_)},set time(e){e=za(e),_=e,null===C&&v&&0!==g?P=v.now()-e/g:C=e},get duration(){const e=null===k.calculatedDuration?Us(k):k.calculatedDuration;return Aa(e)},get speed(){return g},set speed(e){e!==g&&v&&(g=e,D.time=Aa(_))},get state(){return S},play:L,pause:()=>{S="paused",C=_},stop:()=>{x=!0,"idle"!==S&&(S="idle",p&&p(),N())},cancel:()=>{null!==E&&M(E),N()},complete:()=>{S="finished"},sample:e=>(P=0,M(e))};return D}const qs=function(e){let t;return()=>(void 0===t&&(t=e()),t)}(()=>Object.hasOwnProperty.call(Element.prototype,"animate")),Ys=new Set(["opacity","clipPath","filter","transform","backgroundColor"]);function Gs(e,t,n){let{onUpdate:r,onComplete:i,...o}=n;if(!(qs()&&Ys.has(t)&&!o.repeatDelay&&"mirror"!==o.repeatType&&0!==o.damping&&"inertia"!==o.type))return!1;let a,s,l=!1,c=!1;const d=()=>{s=new Promise(e=>{a=e})};d();let{keyframes:u,duration:p=300,ease:h,times:f}=o;if(((e,t)=>"spring"===t.type||"backgroundColor"===e||!$a(t.ease))(t,o)){const e=Ws({...o,repeat:0,delay:0});let t={done:!1,value:u[0]};const n=[];let r=0;for(;!t.done&&r<2e4;)t=e.sample(r),n.push(t.value),r+=10;f=void 0,u=n,p=r-10,h="linear"}const m=function(e,t,n){let{delay:r=0,duration:i,repeat:o=0,repeatType:a="loop",ease:s,times:l}=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};const c={[t]:n};l&&(c.offset=l);const d=La(s);return Array.isArray(d)&&(c.easing=d),e.animate(c,{delay:r,duration:i,easing:Array.isArray(d)?"linear":d,fill:"both",iterations:o+1,direction:"reverse"===a?"alternate":"normal"})}(e.owner.current,t,u,{...o,duration:p,ease:h,times:f}),g=()=>{c=!1,m.cancel()},x=()=>{c=!0,Xo.update(g),a(),d()};m.onfinish=()=>{c||(e.set(function(e,t){let{repeat:n,repeatType:r="loop"}=t;return e[n&&"loop"!==r&&n%2===1?0:e.length-1]}(u,o)),i&&i(),x())};return{then:(e,t)=>s.then(e,t),attachTimeline:e=>(m.timeline=e,m.onfinish=null,Go),get time(){return Aa(m.currentTime||0)},set time(e){m.currentTime=za(e)},get speed(){return m.playbackRate},set speed(e){m.playbackRate=e},get duration(){return Aa(p)},play:()=>{l||(m.play(),Zo(g))},pause:()=>m.pause(),stop:()=>{if(l=!0,"idle"===m.playState)return;const{currentTime:t}=m;if(t){const n=Ws({...o,autoplay:!1});e.setWithVelocity(n.sample(t-10).value,n.sample(t).value,10)}x()},complete:()=>{c||m.finish()},cancel:x}}const Ks={type:"spring",stiffness:500,damping:25,restSpeed:10},Qs={type:"keyframes",duration:.8},Xs={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},Zs=(e,t)=>{let{keyframes:n}=t;return n.length>2?Qs:Wi.has(e)?e.startsWith("scale")?{type:"spring",stiffness:550,damping:0===n[1]?2*Math.sqrt(550):30,restSpeed:10}:Ks:Xs},Js=(e,t)=>"zIndex"!==e&&(!("number"!==typeof t&&!Array.isArray(t))||!("string"!==typeof t||!vs.test(t)&&"0"!==t||t.startsWith("url("))),el=new Set(["brightness","contrast","saturate","opacity"]);function tl(e){const[t,n]=e.slice(0,-1).split("(");if("drop-shadow"===t)return e;const[r]=n.match(oo)||[];if(!r)return e;const i=n.replace(r,"");let o=el.has(t)?1:0;return r!==n&&(o*=100),t+"("+o+i+")"}const nl=/([a-z-]*)\(.*?\)/g,rl={...vs,getAnimatableNone:e=>{const t=e.match(nl);return t?t.map(tl).join(" "):e}},il={...yo,color:is,backgroundColor:is,outlineColor:is,fill:is,stroke:is,borderColor:is,borderTopColor:is,borderRightColor:is,borderBottomColor:is,borderLeftColor:is,filter:rl,WebkitFilter:rl},ol=e=>il[e];function al(e,t){let n=ol(e);return n!==rl&&(n=vs),n.getAnimatableNone?n.getAnimatableNone(t):void 0}const sl=e=>/^0[^.\s]+$/.test(e);function ll(e){return"number"===typeof e?0===e:null!==e?"none"===e||"0"===e||sl(e):void 0}function cl(e,t){return e[t]||e.default||e}const dl=!1,ul=function(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};return i=>{const o=cl(r,e)||{},a=o.delay||r.delay||0;let{elapsed:s=0}=r;s-=za(a);const l=function(e,t,n,r){const i=Js(t,n);let o;o=Array.isArray(n)?[...n]:[null,n];const a=void 0!==r.from?r.from:e.get();let s;const l=[];for(let c=0;c<o.length;c++)null===o[c]&&(o[c]=0===c?a:o[c-1]),ll(o[c])&&l.push(c),"string"===typeof o[c]&&"none"!==o[c]&&"0"!==o[c]&&(s=o[c]);if(i&&l.length&&s)for(let c=0;c<l.length;c++)o[l[c]]=al(t,s);return o}(t,e,n,o),c=l[0],d=l[l.length-1],u=Js(e,c),p=Js(e,d);Ea(u===p,`You are trying to animate ${e} from "${c}" to "${d}". ${c} is not an animatable value - to enable this animation set ${c} to a value animatable to ${d} via the \`style\` property.`);let h={keyframes:l,velocity:t.getVelocity(),ease:"easeOut",...o,delay:-s,onUpdate:e=>{t.set(e),o.onUpdate&&o.onUpdate(e)},onComplete:()=>{i(),o.onComplete&&o.onComplete()}};if(function(e){let{when:t,delay:n,delayChildren:r,staggerChildren:i,staggerDirection:o,repeat:a,repeatType:s,repeatDelay:l,from:c,elapsed:d,...u}=e;return!!Object.keys(u).length}(o)||(h={...h,...Zs(e,h)}),h.duration&&(h.duration=za(h.duration)),h.repeatDelay&&(h.repeatDelay=za(h.repeatDelay)),!u||!p||_a||!1===o.type||dl)return function(e){let{keyframes:t,delay:n,onUpdate:r,onComplete:i}=e;const o=()=>(r&&r(t[t.length-1]),i&&i(),{time:0,speed:1,duration:0,play:Go,pause:Go,stop:Go,then:e=>(e(),Promise.resolve()),cancel:Go,complete:Go});return n?Ws({keyframes:[0,1],duration:0,delay:n,onComplete:o}):o()}(_a?{...h,delay:0}:h);if(!r.isHandoff&&t.owner&&t.owner.current instanceof HTMLElement&&!t.owner.getProps().onUpdate){const n=Gs(t,e,h);if(n)return n}return Ws(h)}};function pl(e){return Boolean(Yi(e)&&e.add)}const hl=e=>/^\-?\d*\.?\d+$/.test(e);function fl(e,t){-1===e.indexOf(t)&&e.push(t)}function ml(e,t){const n=e.indexOf(t);n>-1&&e.splice(n,1)}class gl{constructor(){this.subscriptions=[]}add(e){return fl(this.subscriptions,e),()=>ml(this.subscriptions,e)}notify(e,t,n){const r=this.subscriptions.length;if(r)if(1===r)this.subscriptions[0](e,t,n);else for(let i=0;i<r;i++){const r=this.subscriptions[i];r&&r(e,t,n)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}const xl={current:void 0};class yl{constructor(e){var t=this;let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};var r;this.version="10.18.0",this.timeDelta=0,this.lastUpdated=0,this.canTrackVelocity=!1,this.events={},this.updateAndNotify=function(e){let n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];t.prev=t.current,t.current=e;const{delta:r,timestamp:i}=Jo;t.lastUpdated!==i&&(t.timeDelta=r,t.lastUpdated=i,Xo.postRender(t.scheduleVelocityCheck)),t.prev!==t.current&&t.events.change&&t.events.change.notify(t.current),t.events.velocityChange&&t.events.velocityChange.notify(t.getVelocity()),n&&t.events.renderRequest&&t.events.renderRequest.notify(t.current)},this.scheduleVelocityCheck=()=>Xo.postRender(this.velocityCheck),this.velocityCheck=e=>{let{timestamp:t}=e;t!==this.lastUpdated&&(this.prev=this.current,this.events.velocityChange&&this.events.velocityChange.notify(this.getVelocity()))},this.hasAnimated=!1,this.prev=this.current=e,this.canTrackVelocity=(r=this.current,!isNaN(parseFloat(r))),this.owner=n.owner}onChange(e){return this.on("change",e)}on(e,t){this.events[e]||(this.events[e]=new gl);const n=this.events[e].add(t);return"change"===e?()=>{n(),Xo.read(()=>{this.events.change.getSize()||this.stop()})}:n}clearListeners(){for(const e in this.events)this.events[e].clear()}attach(e,t){this.passiveEffect=e,this.stopPassiveEffect=t}set(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];t&&this.passiveEffect?this.passiveEffect(e,this.updateAndNotify):this.updateAndNotify(e,t)}setWithVelocity(e,t,n){this.set(t),this.prev=e,this.timeDelta=n}jump(e){this.updateAndNotify(e),this.prev=e,this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}get(){return xl.current&&xl.current.push(this),this.current}getPrevious(){return this.prev}getVelocity(){return this.canTrackVelocity?_s(parseFloat(this.current)-parseFloat(this.prev),this.timeDelta):0}start(e){return this.stop(),new Promise(t=>{this.hasAnimated=!0,this.animation=e(t),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function vl(e,t){return new yl(e,t)}const bl=e=>t=>t.test(e),wl=[to,ho,po,uo,mo,fo,{test:e=>"auto"===e,parse:e=>e}],kl=e=>wl.find(bl(e)),jl=[...wl,is,vs],Sl=e=>jl.find(bl(e));function Cl(e,t,n){e.hasValue(t)?e.getValue(t).set(n):e.addValue(t,vl(n))}function Pl(e,t){const n=Pa(e,t);let{transitionEnd:r={},transition:i={},...o}=n?e.makeTargetAnimatable(n,!1):{};o={...o,...r};for(const a in o){Cl(e,a,Ho(o[a]))}}function El(e,t){if(!t)return;return(t[e]||t.default||t).from}function Tl(e,t){let{protectedKeys:n,needsAnimating:r}=e;const i=n.hasOwnProperty(t)&&!0!==r[t];return r[t]=!1,i}function zl(e,t){const n=e.get();if(!Array.isArray(t))return n!==t;for(let r=0;r<t.length;r++)if(t[r]!==n)return!0}function Al(e,t){let{delay:n=0,transitionOverride:r,type:i}=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},{transition:o=e.getDefaultTransition(),transitionEnd:a,...s}=e.makeTargetAnimatable(t);const l=e.getValue("willChange");r&&(o=r);const c=[],d=i&&e.animationState&&e.animationState.getState()[i];for(const u in s){const t=e.getValue(u),r=s[u];if(!t||void 0===r||d&&Tl(d,u))continue;const i={delay:n,elapsed:0,...cl(o||{},u)};if(window.HandoffAppearAnimations){const n=e.getProps()[ji];if(n){const e=window.HandoffAppearAnimations(n,u,t,Xo);null!==e&&(i.elapsed=e,i.isHandoff=!0)}}let a=!i.isHandoff&&!zl(t,r);if("spring"===i.type&&(t.getVelocity()||i.velocity)&&(a=!1),t.animation&&(a=!1),a)continue;t.start(ul(u,t,r,e.shouldReduceMotion&&Wi.has(u)?{type:!1}:i));const p=t.animation;pl(l)&&(l.add(u),p.then(()=>l.remove(u))),c.push(p)}return a&&Promise.all(c).then(()=>{a&&Pl(e,a)}),c}function _l(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const r=Pa(e,t,n.custom);let{transition:i=e.getDefaultTransition()||{}}=r||{};n.transitionOverride&&(i=n.transitionOverride);const o=r?()=>Promise.all(Al(e,r,n)):()=>Promise.resolve(),a=e.variantChildren&&e.variantChildren.size?function(){let r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;const{delayChildren:o=0,staggerChildren:a,staggerDirection:s}=i;return function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,o=arguments.length>5?arguments[5]:void 0;const a=[],s=(e.variantChildren.size-1)*r,l=1===i?function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:0)*r}:function(){return s-(arguments.length>0&&void 0!==arguments[0]?arguments[0]:0)*r};return Array.from(e.variantChildren).sort(Ml).forEach((e,r)=>{e.notify("AnimationStart",t),a.push(_l(e,t,{...o,delay:n+l(r)}).then(()=>e.notify("AnimationComplete",t)))}),Promise.all(a)}(e,t,o+r,a,s,n)}:()=>Promise.resolve(),{when:s}=i;if(s){const[e,t]="beforeChildren"===s?[o,a]:[a,o];return e().then(()=>t())}return Promise.all([o(),a(n.delay)])}function Ml(e,t){return e.sortNodePosition(t)}const $l=[...Ei].reverse(),Nl=Ei.length;function Rl(e){return t=>Promise.all(t.map(t=>{let{animation:n,options:r}=t;return function(e,t){let n,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(e.notify("AnimationStart",t),Array.isArray(t)){const i=t.map(t=>_l(e,t,r));n=Promise.all(i)}else if("string"===typeof t)n=_l(e,t,r);else{const i="function"===typeof t?Pa(e,t,r.custom):t;n=Promise.all(Al(e,i,r))}return n.then(()=>e.notify("AnimationComplete",t))}(e,n,r)}))}function Ll(e){let t=Rl(e);const n={animate:Fl(!0),whileInView:Fl(),whileHover:Fl(),whileTap:Fl(),whileDrag:Fl(),whileFocus:Fl(),exit:Fl()};let r=!0;const i=(t,n)=>{const r=Pa(e,n);if(r){const{transition:e,transitionEnd:n,...i}=r;t={...t,...i,...n}}return t};function o(o,a){const s=e.getProps(),l=e.getVariantContext(!0)||{},c=[],d=new Set;let u={},p=1/0;for(let t=0;t<Nl;t++){const h=$l[t],f=n[h],m=void 0!==s[h]?s[h]:l[h],g=Ci(m),x=h===a?f.isActive:null;!1===x&&(p=t);let y=m===l[h]&&m!==s[h]&&g;if(y&&r&&e.manuallyAnimateOnMount&&(y=!1),f.protectedKeys={...u},!f.isActive&&null===x||!m&&!f.prevProp||Pi(m)||"boolean"===typeof m)continue;let v=Dl(f.prevProp,m)||h===a&&f.isActive&&!y&&g||t>p&&g,b=!1;const w=Array.isArray(m)?m:[m];let k=w.reduce(i,{});!1===x&&(k={});const{prevResolvedValues:j={}}=f,S={...j,...k},C=e=>{v=!0,d.has(e)&&(b=!0,d.delete(e)),f.needsAnimating[e]=!0};for(const e in S){const t=k[e],n=j[e];if(u.hasOwnProperty(e))continue;let r=!1;r=Uo(t)&&Uo(n)?!Ca(t,n):t!==n,r?void 0!==t?C(e):d.add(e):void 0!==t&&d.has(e)?C(e):f.protectedKeys[e]=!0}f.prevProp=m,f.prevResolvedValues=k,f.isActive&&(u={...u,...k}),r&&e.blockInitialAnimation&&(v=!1),!v||y&&!b||c.push(...w.map(e=>({animation:e,options:{type:h,...o}})))}if(d.size){const t={};d.forEach(n=>{const r=e.getBaseTarget(n);void 0!==r&&(t[n]=r)}),c.push({animation:t})}let h=Boolean(c.length);return!r||!1!==s.initial&&s.initial!==s.animate||e.manuallyAnimateOnMount||(h=!1),r=!1,h?t(c):Promise.resolve()}return{animateChanges:o,setActive:function(t,r,i){var a;if(n[t].isActive===r)return Promise.resolve();null===(a=e.variantChildren)||void 0===a||a.forEach(e=>{var n;return null===(n=e.animationState)||void 0===n?void 0:n.setActive(t,r)}),n[t].isActive=r;const s=o(i,t);for(const e in n)n[e].protectedKeys={};return s},setAnimateFunction:function(n){t=n(e)},getState:()=>n}}function Dl(e,t){return"string"===typeof t?t!==e:!!Array.isArray(t)&&!Ca(t,e)}function Fl(){return{isActive:arguments.length>0&&void 0!==arguments[0]&&arguments[0],protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}let Ol=0;const Il={animation:{Feature:class extends fa{constructor(e){super(e),e.animationState||(e.animationState=Ll(e))}updateAnimationControlsSubscription(){const{animate:e}=this.node.getProps();this.unmount(),Pi(e)&&(this.unmount=e.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){const{animate:e}=this.node.getProps(),{animate:t}=this.node.prevProps||{};e!==t&&this.updateAnimationControlsSubscription()}unmount(){}}},exit:{Feature:class extends fa{constructor(){super(...arguments),this.id=Ol++}update(){if(!this.node.presenceContext)return;const{isPresent:e,onExitComplete:t,custom:n}=this.node.presenceContext,{isPresent:r}=this.node.prevPresenceContext||{};if(!this.node.animationState||e===r)return;const i=this.node.animationState.setActive("exit",!e,{custom:null!==n&&void 0!==n?n:this.node.getProps().custom});t&&!e&&i.then(()=>t(this.id))}mount(){const{register:e}=this.node.presenceContext||{};e&&(this.unmount=e(this.id))}unmount(){}}}},Bl=(e,t)=>Math.abs(e-t);class Vl{constructor(e,t){let{transformPagePoint:n,contextWindow:r,dragSnapToOrigin:i=!1}=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.updatePoint=()=>{if(!this.lastMoveEvent||!this.lastMoveEventInfo)return;const e=Wl(this.lastMoveEventInfo,this.history),t=null!==this.startEvent,n=function(e,t){const n=Bl(e.x,t.x),r=Bl(e.y,t.y);return Math.sqrt(n**2+r**2)}(e.offset,{x:0,y:0})>=3;if(!t&&!n)return;const{point:r}=e,{timestamp:i}=Jo;this.history.push({...r,timestamp:i});const{onStart:o,onMove:a}=this.handlers;t||(o&&o(this.lastMoveEvent,e),this.startEvent=this.lastMoveEvent),a&&a(this.lastMoveEvent,e)},this.handlePointerMove=(e,t)=>{this.lastMoveEvent=e,this.lastMoveEventInfo=Ul(t,this.transformPagePoint),Xo.update(this.updatePoint,!0)},this.handlePointerUp=(e,t)=>{this.end();const{onEnd:n,onSessionEnd:r,resumeAnimation:i}=this.handlers;if(this.dragSnapToOrigin&&i&&i(),!this.lastMoveEvent||!this.lastMoveEventInfo)return;const o=Wl("pointercancel"===e.type?this.lastMoveEventInfo:Ul(t,this.transformPagePoint),this.history);this.startEvent&&n&&n(e,o),r&&r(e,o)},!ia(e))return;this.dragSnapToOrigin=i,this.handlers=t,this.transformPagePoint=n,this.contextWindow=r||window;const o=Ul(oa(e),this.transformPagePoint),{point:a}=o,{timestamp:s}=Jo;this.history=[{...a,timestamp:s}];const{onSessionStart:l}=t;l&&l(e,Wl(o,this.history)),this.removeListeners=la(aa(this.contextWindow,"pointermove",this.handlePointerMove),aa(this.contextWindow,"pointerup",this.handlePointerUp),aa(this.contextWindow,"pointercancel",this.handlePointerUp))}updateHandlers(e){this.handlers=e}end(){this.removeListeners&&this.removeListeners(),Zo(this.updatePoint)}}function Ul(e,t){return t?{point:t(e.point)}:e}function Hl(e,t){return{x:e.x-t.x,y:e.y-t.y}}function Wl(e,t){let{point:n}=e;return{point:n,delta:Hl(n,Yl(t)),offset:Hl(n,ql(t)),velocity:Gl(t,.1)}}function ql(e){return e[0]}function Yl(e){return e[e.length-1]}function Gl(e,t){if(e.length<2)return{x:0,y:0};let n=e.length-1,r=null;const i=Yl(e);for(;n>=0&&(r=e[n],!(i.timestamp-r.timestamp>za(t)));)n--;if(!r)return{x:0,y:0};const o=Aa(i.timestamp-r.timestamp);if(0===o)return{x:0,y:0};const a={x:(i.x-r.x)/o,y:(i.y-r.y)/o};return a.x===1/0&&(a.x=0),a.y===1/0&&(a.y=0),a}function Kl(e){return e.max-e.min}function Ql(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:.01;return Math.abs(e-t)<=n}function Xl(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:.5;e.origin=r,e.originPoint=os(t.min,t.max,e.origin),e.scale=Kl(n)/Kl(t),(Ql(e.scale,1,1e-4)||isNaN(e.scale))&&(e.scale=1),e.translate=os(n.min,n.max,e.origin)-e.originPoint,(Ql(e.translate)||isNaN(e.translate))&&(e.translate=0)}function Zl(e,t,n,r){Xl(e.x,t.x,n.x,r?r.originX:void 0),Xl(e.y,t.y,n.y,r?r.originY:void 0)}function Jl(e,t,n){e.min=n.min+t.min,e.max=e.min+Kl(t)}function ec(e,t,n){e.min=t.min-n.min,e.max=e.min+Kl(t)}function tc(e,t,n){ec(e.x,t.x,n.x),ec(e.y,t.y,n.y)}function nc(e,t,n){return{min:void 0!==t?e.min+t:void 0,max:void 0!==n?e.max+n-(e.max-e.min):void 0}}function rc(e,t){let n=t.min-e.min,r=t.max-e.max;return t.max-t.min<e.max-e.min&&([n,r]=[r,n]),{min:n,max:r}}const ic=.35;function oc(e,t,n){return{min:ac(e,t),max:ac(e,n)}}function ac(e,t){return"number"===typeof e?e:e[t]||0}const sc=()=>({x:{min:0,max:0},y:{min:0,max:0}});function lc(e){return[e("x"),e("y")]}function cc(e){let{top:t,left:n,right:r,bottom:i}=e;return{x:{min:n,max:r},y:{min:t,max:i}}}function dc(e){return void 0===e||1===e}function uc(e){let{scale:t,scaleX:n,scaleY:r}=e;return!dc(t)||!dc(n)||!dc(r)}function pc(e){return uc(e)||hc(e)||e.z||e.rotate||e.rotateX||e.rotateY}function hc(e){return fc(e.x)||fc(e.y)}function fc(e){return e&&"0%"!==e}function mc(e,t,n){return n+t*(e-n)}function gc(e,t,n,r,i){return void 0!==i&&(e=mc(e,i,r)),mc(e,n,r)+t}function xc(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,r=arguments.length>3?arguments[3]:void 0,i=arguments.length>4?arguments[4]:void 0;e.min=gc(e.min,t,n,r,i),e.max=gc(e.max,t,n,r,i)}function yc(e,t){let{x:n,y:r}=t;xc(e.x,n.translate,n.scale,n.originPoint),xc(e.y,r.translate,r.scale,r.originPoint)}function vc(e){return Number.isInteger(e)||e>1.0000000000001||e<.999999999999?e:1}function bc(e,t){e.min=e.min+t,e.max=e.max+t}function wc(e,t,n){let[r,i,o]=n;const a=void 0!==t[o]?t[o]:.5,s=os(e.min,e.max,a);xc(e,t[r],t[i],s,t.scale)}const kc=["x","scaleX","originX"],jc=["y","scaleY","originY"];function Sc(e,t){wc(e.x,t,kc),wc(e.y,t,jc)}function Cc(e,t){return cc(function(e,t){if(!t)return e;const n=t({x:e.left,y:e.top}),r=t({x:e.right,y:e.bottom});return{top:n.y,left:n.x,bottom:r.y,right:r.x}}(e.getBoundingClientRect(),t))}const Pc=e=>{let{current:t}=e;return t?t.ownerDocument.defaultView:null},Ec=new WeakMap;class Tc{constructor(e){this.openGlobalLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic={x:{min:0,max:0},y:{min:0,max:0}},this.visualElement=e}start(e){let{snapToCursor:t=!1}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const{presenceContext:n}=this.visualElement;if(n&&!1===n.isPresent)return;const{dragSnapToOrigin:r}=this.getProps();this.panSession=new Vl(e,{onSessionStart:e=>{const{dragSnapToOrigin:n}=this.getProps();n?this.pauseAnimation():this.stopAnimation(),t&&this.snapToCursor(oa(e,"page").point)},onStart:(e,t)=>{const{drag:n,dragPropagation:r,onDragStart:i}=this.getProps();if(n&&!r&&(this.openGlobalLock&&this.openGlobalLock(),this.openGlobalLock=pa(n),!this.openGlobalLock))return;this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),lc(e=>{let t=this.getAxisMotionValue(e).get()||0;if(po.test(t)){const{projection:n}=this.visualElement;if(n&&n.layout){const r=n.layout.layoutBox[e];if(r){t=Kl(r)*(parseFloat(t)/100)}}}this.originPoint[e]=t}),i&&Xo.update(()=>i(e,t),!1,!0);const{animationState:o}=this.visualElement;o&&o.setActive("whileDrag",!0)},onMove:(e,t)=>{const{dragPropagation:n,dragDirectionLock:r,onDirectionLock:i,onDrag:o}=this.getProps();if(!n&&!this.openGlobalLock)return;const{offset:a}=t;if(r&&null===this.currentDirection)return this.currentDirection=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,n=null;Math.abs(e.y)>t?n="y":Math.abs(e.x)>t&&(n="x");return n}(a),void(null!==this.currentDirection&&i&&i(this.currentDirection));this.updateAxis("x",t.point,a),this.updateAxis("y",t.point,a),this.visualElement.render(),o&&o(e,t)},onSessionEnd:(e,t)=>this.stop(e,t),resumeAnimation:()=>lc(e=>{var t;return"paused"===this.getAnimationState(e)&&(null===(t=this.getAxisMotionValue(e).animation)||void 0===t?void 0:t.play())})},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:r,contextWindow:Pc(this.visualElement)})}stop(e,t){const n=this.isDragging;if(this.cancel(),!n)return;const{velocity:r}=t;this.startAnimation(r);const{onDragEnd:i}=this.getProps();i&&Xo.update(()=>i(e,t))}cancel(){this.isDragging=!1;const{projection:e,animationState:t}=this.visualElement;e&&(e.isAnimationBlocked=!1),this.panSession&&this.panSession.end(),this.panSession=void 0;const{dragPropagation:n}=this.getProps();!n&&this.openGlobalLock&&(this.openGlobalLock(),this.openGlobalLock=null),t&&t.setActive("whileDrag",!1)}updateAxis(e,t,n){const{drag:r}=this.getProps();if(!n||!zc(e,r,this.currentDirection))return;const i=this.getAxisMotionValue(e);let o=this.originPoint[e]+n[e];this.constraints&&this.constraints[e]&&(o=function(e,t,n){let{min:r,max:i}=t;return void 0!==r&&e<r?e=n?os(r,e,n.min):Math.max(e,r):void 0!==i&&e>i&&(e=n?os(i,e,n.max):Math.min(e,i)),e}(o,this.constraints[e],this.elastic[e])),i.set(o)}resolveConstraints(){var e;const{dragConstraints:t,dragElastic:n}=this.getProps(),r=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):null===(e=this.visualElement.projection)||void 0===e?void 0:e.layout,i=this.constraints;t&&Si(t)?this.constraints||(this.constraints=this.resolveRefConstraints()):this.constraints=!(!t||!r)&&function(e,t){let{top:n,left:r,bottom:i,right:o}=t;return{x:nc(e.x,r,o),y:nc(e.y,n,i)}}(r.layoutBox,t),this.elastic=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ic;return!1===e?e=0:!0===e&&(e=ic),{x:oc(e,"left","right"),y:oc(e,"top","bottom")}}(n),i!==this.constraints&&r&&this.constraints&&!this.hasMutatedConstraints&&lc(e=>{this.getAxisMotionValue(e)&&(this.constraints[e]=function(e,t){const n={};return void 0!==t.min&&(n.min=t.min-e.min),void 0!==t.max&&(n.max=t.max-e.min),n}(r.layoutBox[e],this.constraints[e]))})}resolveRefConstraints(){const{dragConstraints:e,onMeasureDragConstraints:t}=this.getProps();if(!e||!Si(e))return!1;const n=e.current;Ta(null!==n,"If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.");const{projection:r}=this.visualElement;if(!r||!r.layout)return!1;const i=function(e,t,n){const r=Cc(e,n),{scroll:i}=t;return i&&(bc(r.x,i.offset.x),bc(r.y,i.offset.y)),r}(n,r.root,this.visualElement.getTransformPagePoint());let o=function(e,t){return{x:rc(e.x,t.x),y:rc(e.y,t.y)}}(r.layout.layoutBox,i);if(t){const e=t(function(e){let{x:t,y:n}=e;return{top:n.min,right:t.max,bottom:n.max,left:t.min}}(o));this.hasMutatedConstraints=!!e,e&&(o=cc(e))}return o}startAnimation(e){const{drag:t,dragMomentum:n,dragElastic:r,dragTransition:i,dragSnapToOrigin:o,onDragTransitionEnd:a}=this.getProps(),s=this.constraints||{},l=lc(a=>{if(!zc(a,t,this.currentDirection))return;let l=s&&s[a]||{};o&&(l={min:0,max:0});const c=r?200:1e6,d=r?40:1e7,u={type:"inertia",velocity:n?e[a]:0,bounceStiffness:c,bounceDamping:d,timeConstant:750,restDelta:1,restSpeed:10,...i,...l};return this.startAxisValueAnimation(a,u)});return Promise.all(l).then(a)}startAxisValueAnimation(e,t){const n=this.getAxisMotionValue(e);return n.start(ul(e,n,0,t))}stopAnimation(){lc(e=>this.getAxisMotionValue(e).stop())}pauseAnimation(){lc(e=>{var t;return null===(t=this.getAxisMotionValue(e).animation)||void 0===t?void 0:t.pause()})}getAnimationState(e){var t;return null===(t=this.getAxisMotionValue(e).animation)||void 0===t?void 0:t.state}getAxisMotionValue(e){const t="_drag"+e.toUpperCase(),n=this.visualElement.getProps(),r=n[t];return r||this.visualElement.getValue(e,(n.initial?n.initial[e]:void 0)||0)}snapToCursor(e){lc(t=>{const{drag:n}=this.getProps();if(!zc(t,n,this.currentDirection))return;const{projection:r}=this.visualElement,i=this.getAxisMotionValue(t);if(r&&r.layout){const{min:n,max:o}=r.layout.layoutBox[t];i.set(e[t]-os(n,o,.5))}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;const{drag:e,dragConstraints:t}=this.getProps(),{projection:n}=this.visualElement;if(!Si(t)||!n||!this.constraints)return;this.stopAnimation();const r={x:0,y:0};lc(e=>{const t=this.getAxisMotionValue(e);if(t){const n=t.get();r[e]=function(e,t){let n=.5;const r=Kl(e),i=Kl(t);return i>r?n=Cs(t.min,t.max-r,e.min):r>i&&(n=Cs(e.min,e.max-i,t.min)),eo(0,1,n)}({min:n,max:n},this.constraints[e])}});const{transformTemplate:i}=this.visualElement.getProps();this.visualElement.current.style.transform=i?i({},""):"none",n.root&&n.root.updateScroll(),n.updateLayout(),this.resolveConstraints(),lc(t=>{if(!zc(t,e,null))return;const n=this.getAxisMotionValue(t),{min:i,max:o}=this.constraints[t];n.set(os(i,o,r[t]))})}addListeners(){if(!this.visualElement.current)return;Ec.set(this.visualElement,this);const e=aa(this.visualElement.current,"pointerdown",e=>{const{drag:t,dragListener:n=!0}=this.getProps();t&&n&&this.start(e)}),t=()=>{const{dragConstraints:e}=this.getProps();Si(e)&&(this.constraints=this.resolveRefConstraints())},{projection:n}=this.visualElement,r=n.addEventListener("measure",t);n&&!n.layout&&(n.root&&n.root.updateScroll(),n.updateLayout()),t();const i=ra(window,"resize",()=>this.scalePositionWithinConstraints()),o=n.addEventListener("didUpdate",e=>{let{delta:t,hasLayoutChanged:n}=e;this.isDragging&&n&&(lc(e=>{const n=this.getAxisMotionValue(e);n&&(this.originPoint[e]+=t[e].translate,n.set(n.get()+t[e].translate))}),this.visualElement.render())});return()=>{i(),e(),r(),o&&o()}}getProps(){const e=this.visualElement.getProps(),{drag:t=!1,dragDirectionLock:n=!1,dragPropagation:r=!1,dragConstraints:i=!1,dragElastic:o=ic,dragMomentum:a=!0}=e;return{...e,drag:t,dragDirectionLock:n,dragPropagation:r,dragConstraints:i,dragElastic:o,dragMomentum:a}}}function zc(e,t,n){return(!0===t||t===e)&&(null===n||n===e)}const Ac=e=>(t,n)=>{e&&Xo.update(()=>e(t,n))};const _c={hasAnimatedSinceResize:!0,hasEverUpdated:!1};function Mc(e,t){return t.max===t.min?0:e/(t.max-t.min)*100}const $c={correct:(e,t)=>{if(!t.target)return e;if("string"===typeof e){if(!ho.test(e))return e;e=parseFloat(e)}return`${Mc(e,t.target.x)}% ${Mc(e,t.target.y)}%`}},Nc={correct:(e,t)=>{let{treeScale:n,projectionDelta:r}=t;const i=e,o=vs.parse(e);if(o.length>5)return i;const a=vs.createTransformer(e),s="number"!==typeof o[0]?1:0,l=r.x.scale*n.x,c=r.y.scale*n.y;o[0+s]/=l,o[1+s]/=c;const d=os(l,c,.5);return"number"===typeof o[2+s]&&(o[2+s]/=d),"number"===typeof o[3+s]&&(o[3+s]/=d),a(o)}};class Rc extends t.Component{componentDidMount(){const{visualElement:e,layoutGroup:t,switchLayoutGroup:n,layoutId:r}=this.props,{projection:i}=e;var o;o=Dc,Object.assign(Ui,o),i&&(t.group&&t.group.add(i),n&&n.register&&r&&n.register(i),i.root.didUpdate(),i.addEventListener("animationComplete",()=>{this.safeToRemove()}),i.setOptions({...i.options,onExitComplete:()=>this.safeToRemove()})),_c.hasEverUpdated=!0}getSnapshotBeforeUpdate(e){const{layoutDependency:t,visualElement:n,drag:r,isPresent:i}=this.props,o=n.projection;return o?(o.isPresent=i,r||e.layoutDependency!==t||void 0===t?o.willUpdate():this.safeToRemove(),e.isPresent!==i&&(i?o.promote():o.relegate()||Xo.postRender(()=>{const e=o.getStack();e&&e.members.length||this.safeToRemove()})),null):null}componentDidUpdate(){const{projection:e}=this.props.visualElement;e&&(e.root.didUpdate(),queueMicrotask(()=>{!e.currentAnimation&&e.isLead()&&this.safeToRemove()}))}componentWillUnmount(){const{visualElement:e,layoutGroup:t,switchLayoutGroup:n}=this.props,{projection:r}=e;r&&(r.scheduleCheckAfterUnmount(),t&&t.group&&t.group.remove(r),n&&n.deregister&&n.deregister(r))}safeToRemove(){const{safeToRemove:e}=this.props;e&&e()}render(){return null}}function Lc(e){const[n,r]=function(){const e=(0,t.useContext)(yi);if(null===e)return[!0,null];const{isPresent:n,onExitComplete:r,register:i}=e,o=(0,t.useId)();return(0,t.useEffect)(()=>i(o),[]),!n&&r?[!1,()=>r&&r(o)]:[!0]}(),i=(0,t.useContext)(Ri);return t.createElement(Rc,{...e,layoutGroup:i,switchLayoutGroup:(0,t.useContext)(Li),isPresent:n,safeToRemove:r})}const Dc={borderRadius:{...$c,applyTo:["borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"]},borderTopLeftRadius:$c,borderTopRightRadius:$c,borderBottomLeftRadius:$c,borderBottomRightRadius:$c,boxShadow:Nc},Fc=["TopLeft","TopRight","BottomLeft","BottomRight"],Oc=Fc.length,Ic=e=>"string"===typeof e?parseFloat(e):e,Bc=e=>"number"===typeof e||ho.test(e);function Vc(e,t){return void 0!==e[t]?e[t]:e.borderRadius}const Uc=Wc(0,.5,Wa),Hc=Wc(.5,.95,Go);function Wc(e,t,n){return r=>r<e?0:r>t?1:n(Cs(e,t,r))}function qc(e,t){e.min=t.min,e.max=t.max}function Yc(e,t){qc(e.x,t.x),qc(e.y,t.y)}function Gc(e,t,n,r,i){return e=mc(e-=t,1/n,r),void 0!==i&&(e=mc(e,1/i,r)),e}function Kc(e,t,n,r,i){let[o,a,s]=n;!function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:.5,i=arguments.length>4?arguments[4]:void 0,o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:e,a=arguments.length>6&&void 0!==arguments[6]?arguments[6]:e;po.test(t)&&(t=parseFloat(t),t=os(a.min,a.max,t/100)-a.min);if("number"!==typeof t)return;let s=os(o.min,o.max,r);e===o&&(s-=t),e.min=Gc(e.min,t,n,s,i),e.max=Gc(e.max,t,n,s,i)}(e,t[o],t[a],t[s],t.scale,r,i)}const Qc=["x","scaleX","originX"],Xc=["y","scaleY","originY"];function Zc(e,t,n,r){Kc(e.x,t,Qc,n?n.x:void 0,r?r.x:void 0),Kc(e.y,t,Xc,n?n.y:void 0,r?r.y:void 0)}function Jc(e){return 0===e.translate&&1===e.scale}function ed(e){return Jc(e.x)&&Jc(e.y)}function td(e,t){return Math.round(e.x.min)===Math.round(t.x.min)&&Math.round(e.x.max)===Math.round(t.x.max)&&Math.round(e.y.min)===Math.round(t.y.min)&&Math.round(e.y.max)===Math.round(t.y.max)}function nd(e){return Kl(e.x)/Kl(e.y)}class rd{constructor(){this.members=[]}add(e){fl(this.members,e),e.scheduleRender()}remove(e){if(ml(this.members,e),e===this.prevLead&&(this.prevLead=void 0),e===this.lead){const e=this.members[this.members.length-1];e&&this.promote(e)}}relegate(e){const t=this.members.findIndex(t=>e===t);if(0===t)return!1;let n;for(let r=t;r>=0;r--){const e=this.members[r];if(!1!==e.isPresent){n=e;break}}return!!n&&(this.promote(n),!0)}promote(e,t){const n=this.lead;if(e!==n&&(this.prevLead=n,this.lead=e,e.show(),n)){n.instance&&n.scheduleRender(),e.scheduleRender(),e.resumeFrom=n,t&&(e.resumeFrom.preserveOpacity=!0),n.snapshot&&(e.snapshot=n.snapshot,e.snapshot.latestValues=n.animationValues||n.latestValues),e.root&&e.root.isUpdating&&(e.isLayoutDirty=!0);const{crossfade:r}=e.options;!1===r&&n.hide()}}exitAnimationComplete(){this.members.forEach(e=>{const{options:t,resumingFrom:n}=e;t.onExitComplete&&t.onExitComplete(),n&&n.options.onExitComplete&&n.options.onExitComplete()})}scheduleRender(){this.members.forEach(e=>{e.instance&&e.scheduleRender(!1)})}removeLeadSnapshot(){this.lead&&this.lead.snapshot&&(this.lead.snapshot=void 0)}}function id(e,t,n){let r="";const i=e.x.translate/t.x,o=e.y.translate/t.y;if((i||o)&&(r=`translate3d(${i}px, ${o}px, 0) `),1===t.x&&1===t.y||(r+=`scale(${1/t.x}, ${1/t.y}) `),n){const{rotate:e,rotateX:t,rotateY:i}=n;e&&(r+=`rotate(${e}deg) `),t&&(r+=`rotateX(${t}deg) `),i&&(r+=`rotateY(${i}deg) `)}const a=e.x.scale*t.x,s=e.y.scale*t.y;return 1===a&&1===s||(r+=`scale(${a}, ${s})`),r||"none"}const od=(e,t)=>e.depth-t.depth;class ad{constructor(){this.children=[],this.isDirty=!1}add(e){fl(this.children,e),this.isDirty=!0}remove(e){ml(this.children,e),this.isDirty=!0}forEach(e){this.isDirty&&this.children.sort(od),this.isDirty=!1,this.children.forEach(e)}}const sd=["","X","Y","Z"],ld={visibility:"hidden"};let cd=0;const dd={type:"projectionFrame",totalNodes:0,resolvedTargetDeltas:0,recalculatedProjection:0};function ud(e){let{attachResizeListener:t,defaultParent:n,measureScroll:r,checkIsScrollRoot:i,resetTransform:o}=e;return class{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null===n||void 0===n?void 0:n();this.id=cd++,this.animationId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.updateScheduled=!1,this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,dd.totalNodes=dd.resolvedTargetDeltas=dd.recalculatedProjection=0,this.nodes.forEach(fd),this.nodes.forEach(wd),this.nodes.forEach(kd),this.nodes.forEach(md),function(e){window.MotionDebug&&window.MotionDebug.record(e)}(dd)},this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=e,this.root=t?t.root||t:this,this.path=t?[...t.path,t]:[],this.parent=t,this.depth=t?t.depth+1:0;for(let n=0;n<this.path.length;n++)this.path[n].shouldResetTransform=!0;this.root===this&&(this.nodes=new ad)}addEventListener(e,t){return this.eventHandlers.has(e)||this.eventHandlers.set(e,new gl),this.eventHandlers.get(e).add(t)}notifyListeners(e){const t=this.eventHandlers.get(e);for(var n=arguments.length,r=new Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];t&&t.notify(...r)}hasListeners(e){return this.eventHandlers.has(e)}mount(e){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.root.hasTreeAnimated;if(this.instance)return;var r;this.isSVG=(r=e)instanceof SVGElement&&"svg"!==r.tagName,this.instance=e;const{layoutId:i,layout:o,visualElement:a}=this.options;if(a&&!a.current&&a.mount(e),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),n&&(o||i)&&(this.isLayoutDirty=!0),t){let n;const r=()=>this.root.updateBlockedByResize=!1;t(e,()=>{this.root.updateBlockedByResize=!0,n&&n(),n=function(e,t){const n=performance.now(),r=i=>{let{timestamp:o}=i;const a=o-n;a>=t&&(Zo(r),e(a-t))};return Xo.read(r,!0),()=>Zo(r)}(r,250),_c.hasAnimatedSinceResize&&(_c.hasAnimatedSinceResize=!1,this.nodes.forEach(bd))})}i&&this.root.registerSharedNode(i,this),!1!==this.options.animate&&a&&(i||o)&&this.addEventListener("didUpdate",e=>{let{delta:t,hasLayoutChanged:n,hasRelativeTargetChanged:r,layout:i}=e;if(this.isTreeAnimationBlocked())return this.target=void 0,void(this.relativeTarget=void 0);const o=this.options.transition||a.getDefaultTransition()||Td,{onLayoutAnimationStart:s,onLayoutAnimationComplete:l}=a.getProps(),c=!this.targetLayout||!td(this.targetLayout,i)||r,d=!n&&r;if(this.options.layoutRoot||this.resumeFrom&&this.resumeFrom.instance||d||n&&(c||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0),this.setAnimationOrigin(t,d);const e={...cl(o,"layout"),onPlay:s,onComplete:l};(a.shouldReduceMotion||this.options.layoutRoot)&&(e.delay=0,e.type=!1),this.startAnimation(e)}else n||bd(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=i})}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);const e=this.getStack();e&&e.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,Zo(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}startUpdate(){this.isUpdateBlocked()||(this.isUpdating=!0,this.nodes&&this.nodes.forEach(jd),this.animationId++)}getTransformTemplate(){const{visualElement:e}=this.options;return e&&e.getProps().transformTemplate}willUpdate(){let e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked())return void(this.options.onExitComplete&&this.options.onExitComplete());if(!this.root.isUpdating&&this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let i=0;i<this.path.length;i++){const e=this.path[i];e.shouldResetTransform=!0,e.updateScroll("snapshot"),e.options.layoutRoot&&e.willUpdate(!1)}const{layoutId:t,layout:n}=this.options;if(void 0===t&&!n)return;const r=this.getTransformTemplate();this.prevTransformTemplateValue=r?r(this.latestValues,""):void 0,this.updateSnapshot(),e&&this.notifyListeners("willUpdate")}update(){this.updateScheduled=!1;if(this.isUpdateBlocked())return this.unblockUpdate(),this.clearAllSnapshots(),void this.nodes.forEach(xd);this.isUpdating||this.nodes.forEach(yd),this.isUpdating=!1,this.nodes.forEach(vd),this.nodes.forEach(pd),this.nodes.forEach(hd),this.clearAllSnapshots();const e=performance.now();Jo.delta=eo(0,1e3/60,e-Jo.timestamp),Jo.timestamp=e,Jo.isProcessing=!0,ea.update.process(Jo),ea.preRender.process(Jo),ea.render.process(Jo),Jo.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,queueMicrotask(()=>this.update()))}clearAllSnapshots(){this.nodes.forEach(gd),this.sharedNodes.forEach(Sd)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,Xo.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){Xo.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){!this.snapshot&&this.instance&&(this.snapshot=this.measure())}updateLayout(){if(!this.instance)return;if(this.updateScroll(),(!this.options.alwaysMeasureLayout||!this.isLead())&&!this.isLayoutDirty)return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let n=0;n<this.path.length;n++){this.path[n].updateScroll()}const e=this.layout;this.layout=this.measure(!1),this.layoutCorrected={x:{min:0,max:0},y:{min:0,max:0}},this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners("measure",this.layout.layoutBox);const{visualElement:t}=this.options;t&&t.notify("LayoutMeasure",this.layout.layoutBox,e?e.layoutBox:void 0)}updateScroll(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"measure",t=Boolean(this.options.layoutScroll&&this.instance);this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===e&&(t=!1),t&&(this.scroll={animationId:this.root.animationId,phase:e,isRoot:i(this.instance),offset:r(this.instance)})}resetTransform(){if(!o)return;const e=this.isLayoutDirty||this.shouldResetTransform,t=this.projectionDelta&&!ed(this.projectionDelta),n=this.getTransformTemplate(),r=n?n(this.latestValues,""):void 0,i=r!==this.prevTransformTemplateValue;e&&(t||pc(this.latestValues)||i)&&(o(this.instance,r),this.shouldResetTransform=!1,this.scheduleRender())}measure(){let e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];const t=this.measurePageBox();let n=this.removeElementScroll(t);var r;return e&&(n=this.removeTransform(n)),_d((r=n).x),_d(r.y),{animationId:this.root.animationId,measuredBox:t,layoutBox:n,latestValues:{},source:this.id}}measurePageBox(){const{visualElement:e}=this.options;if(!e)return{x:{min:0,max:0},y:{min:0,max:0}};const t=e.measureViewportBox(),{scroll:n}=this.root;return n&&(bc(t.x,n.offset.x),bc(t.y,n.offset.y)),t}removeElementScroll(e){const t={x:{min:0,max:0},y:{min:0,max:0}};Yc(t,e);for(let n=0;n<this.path.length;n++){const r=this.path[n],{scroll:i,options:o}=r;if(r!==this.root&&i&&o.layoutScroll){if(i.isRoot){Yc(t,e);const{scroll:n}=this.root;n&&(bc(t.x,-n.offset.x),bc(t.y,-n.offset.y))}bc(t.x,i.offset.x),bc(t.y,i.offset.y)}}return t}applyTransform(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];const n={x:{min:0,max:0},y:{min:0,max:0}};Yc(n,e);for(let r=0;r<this.path.length;r++){const e=this.path[r];!t&&e.options.layoutScroll&&e.scroll&&e!==e.root&&Sc(n,{x:-e.scroll.offset.x,y:-e.scroll.offset.y}),pc(e.latestValues)&&Sc(n,e.latestValues)}return pc(this.latestValues)&&Sc(n,this.latestValues),n}removeTransform(e){const t={x:{min:0,max:0},y:{min:0,max:0}};Yc(t,e);for(let n=0;n<this.path.length;n++){const e=this.path[n];if(!e.instance)continue;if(!pc(e.latestValues))continue;uc(e.latestValues)&&e.updateSnapshot();const r=sc();Yc(r,e.measurePageBox()),Zc(t,e.latestValues,e.snapshot?e.snapshot.layoutBox:void 0,r)}return pc(this.latestValues)&&Zc(t,this.latestValues),t}setTargetDelta(e){this.targetDelta=e,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(e){this.options={...this.options,...e,crossfade:void 0===e.crossfade||e.crossfade}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==Jo.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];var t;const n=this.getLead();this.isProjectionDirty||(this.isProjectionDirty=n.isProjectionDirty),this.isTransformDirty||(this.isTransformDirty=n.isTransformDirty),this.isSharedProjectionDirty||(this.isSharedProjectionDirty=n.isSharedProjectionDirty);const r=Boolean(this.resumingFrom)||this!==n;if(!(e||r&&this.isSharedProjectionDirty||this.isProjectionDirty||(null===(t=this.parent)||void 0===t?void 0:t.isProjectionDirty)||this.attemptToResolveRelativeTarget))return;const{layout:i,layoutId:o}=this.options;if(this.layout&&(i||o)){if(this.resolvedRelativeTargetAt=Jo.timestamp,!this.targetDelta&&!this.relativeTarget){const e=this.getClosestProjectingParent();e&&e.layout&&1!==this.animationProgress?(this.relativeParent=e,this.forceRelativeParentToResolveTarget(),this.relativeTarget={x:{min:0,max:0},y:{min:0,max:0}},this.relativeTargetOrigin={x:{min:0,max:0},y:{min:0,max:0}},tc(this.relativeTargetOrigin,this.layout.layoutBox,e.layout.layoutBox),Yc(this.relativeTarget,this.relativeTargetOrigin)):this.relativeParent=this.relativeTarget=void 0}if(this.relativeTarget||this.targetDelta){var a,s,l;if(this.target||(this.target={x:{min:0,max:0},y:{min:0,max:0}},this.targetWithTransforms={x:{min:0,max:0},y:{min:0,max:0}}),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target?(this.forceRelativeParentToResolveTarget(),a=this.target,s=this.relativeTarget,l=this.relativeParent.target,Jl(a.x,s.x,l.x),Jl(a.y,s.y,l.y)):this.targetDelta?(Boolean(this.resumingFrom)?this.target=this.applyTransform(this.layout.layoutBox):Yc(this.target,this.layout.layoutBox),yc(this.target,this.targetDelta)):Yc(this.target,this.layout.layoutBox),this.attemptToResolveRelativeTarget){this.attemptToResolveRelativeTarget=!1;const e=this.getClosestProjectingParent();e&&Boolean(e.resumingFrom)===Boolean(this.resumingFrom)&&!e.options.layoutScroll&&e.target&&1!==this.animationProgress?(this.relativeParent=e,this.forceRelativeParentToResolveTarget(),this.relativeTarget={x:{min:0,max:0},y:{min:0,max:0}},this.relativeTargetOrigin={x:{min:0,max:0},y:{min:0,max:0}},tc(this.relativeTargetOrigin,this.target,e.target),Yc(this.relativeTarget,this.relativeTargetOrigin)):this.relativeParent=this.relativeTarget=void 0}dd.resolvedTargetDeltas++}}}getClosestProjectingParent(){if(this.parent&&!uc(this.parent.latestValues)&&!hc(this.parent.latestValues))return this.parent.isProjecting()?this.parent:this.parent.getClosestProjectingParent()}isProjecting(){return Boolean((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}calcProjection(){var e;const t=this.getLead(),n=Boolean(this.resumingFrom)||this!==t;let r=!0;if((this.isProjectionDirty||(null===(e=this.parent)||void 0===e?void 0:e.isProjectionDirty))&&(r=!1),n&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(r=!1),this.resolvedRelativeTargetAt===Jo.timestamp&&(r=!1),r)return;const{layout:i,layoutId:o}=this.options;if(this.isTreeAnimating=Boolean(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!i&&!o)return;Yc(this.layoutCorrected,this.layout.layoutBox);const a=this.treeScale.x,s=this.treeScale.y;!function(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];const i=n.length;if(!i)return;let o,a;t.x=t.y=1;for(let s=0;s<i;s++){o=n[s],a=o.projectionDelta;const i=o.instance;i&&i.style&&"contents"===i.style.display||(r&&o.options.layoutScroll&&o.scroll&&o!==o.root&&Sc(e,{x:-o.scroll.offset.x,y:-o.scroll.offset.y}),a&&(t.x*=a.x.scale,t.y*=a.y.scale,yc(e,a)),r&&pc(o.latestValues)&&Sc(e,o.latestValues))}t.x=vc(t.x),t.y=vc(t.y)}(this.layoutCorrected,this.treeScale,this.path,n),!t.layout||t.target||1===this.treeScale.x&&1===this.treeScale.y||(t.target=t.layout.layoutBox);const{target:l}=t;if(!l)return void(this.projectionTransform&&(this.projectionDelta={x:{translate:0,scale:1,origin:0,originPoint:0},y:{translate:0,scale:1,origin:0,originPoint:0}},this.projectionTransform="none",this.scheduleRender()));this.projectionDelta||(this.projectionDelta={x:{translate:0,scale:1,origin:0,originPoint:0},y:{translate:0,scale:1,origin:0,originPoint:0}},this.projectionDeltaWithTransform={x:{translate:0,scale:1,origin:0,originPoint:0},y:{translate:0,scale:1,origin:0,originPoint:0}});const c=this.projectionTransform;Zl(this.projectionDelta,this.layoutCorrected,l,this.latestValues),this.projectionTransform=id(this.projectionDelta,this.treeScale),this.projectionTransform===c&&this.treeScale.x===a&&this.treeScale.y===s||(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners("projectionUpdate",l)),dd.recalculatedProjection++}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(){let e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];if(this.options.scheduleRender&&this.options.scheduleRender(),e){const e=this.getStack();e&&e.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}setAnimationOrigin(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];const n=this.snapshot,r=n?n.latestValues:{},i={...this.latestValues},o={x:{translate:0,scale:1,origin:0,originPoint:0},y:{translate:0,scale:1,origin:0,originPoint:0}};this.relativeParent&&this.relativeParent.options.layoutRoot||(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!t;const a={x:{min:0,max:0},y:{min:0,max:0}},s=(n?n.source:void 0)!==(this.layout?this.layout.source:void 0),l=this.getStack(),c=!l||l.members.length<=1,d=Boolean(s&&!c&&!0===this.options.crossfade&&!this.path.some(Ed));let u;this.animationProgress=0,this.mixTargetDelta=t=>{const n=t/1e3;Cd(o.x,e.x,n),Cd(o.y,e.y,n),this.setTargetDelta(o),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout&&(tc(a,this.layout.layoutBox,this.relativeParent.layout.layoutBox),function(e,t,n,r){Pd(e.x,t.x,n.x,r),Pd(e.y,t.y,n.y,r)}(this.relativeTarget,this.relativeTargetOrigin,a,n),u&&function(e,t){return e.x.min===t.x.min&&e.x.max===t.x.max&&e.y.min===t.y.min&&e.y.max===t.y.max}(this.relativeTarget,u)&&(this.isProjectionDirty=!1),u||(u={x:{min:0,max:0},y:{min:0,max:0}}),Yc(u,this.relativeTarget)),s&&(this.animationValues=i,function(e,t,n,r,i,o){i?(e.opacity=os(0,void 0!==n.opacity?n.opacity:1,Uc(r)),e.opacityExit=os(void 0!==t.opacity?t.opacity:1,0,Hc(r))):o&&(e.opacity=os(void 0!==t.opacity?t.opacity:1,void 0!==n.opacity?n.opacity:1,r));for(let a=0;a<Oc;a++){const i=`border${Fc[a]}Radius`;let o=Vc(t,i),s=Vc(n,i);void 0===o&&void 0===s||(o||(o=0),s||(s=0),0===o||0===s||Bc(o)===Bc(s)?(e[i]=Math.max(os(Ic(o),Ic(s),r),0),(po.test(s)||po.test(o))&&(e[i]+="%")):e[i]=s)}(t.rotate||n.rotate)&&(e.rotate=os(t.rotate||0,n.rotate||0,r))}(i,r,this.latestValues,n,d,c)),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=n},this.mixTargetDelta(this.options.layoutRoot?1e3:0)}startAnimation(e){this.notifyListeners("animationStart"),this.currentAnimation&&this.currentAnimation.stop(),this.resumingFrom&&this.resumingFrom.currentAnimation&&this.resumingFrom.currentAnimation.stop(),this.pendingAnimation&&(Zo(this.pendingAnimation),this.pendingAnimation=void 0),this.pendingAnimation=Xo.update(()=>{_c.hasAnimatedSinceResize=!0,this.currentAnimation=function(e,t,n){const r=Yi(e)?e:vl(e);return r.start(ul("",r,t,n)),r.animation}(0,1e3,{...e,onUpdate:t=>{this.mixTargetDelta(t),e.onUpdate&&e.onUpdate(t)},onComplete:()=>{e.onComplete&&e.onComplete(),this.completeAnimation()}}),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);const e=this.getStack();e&&e.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners("animationComplete")}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(1e3),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){const e=this.getLead();let{targetWithTransforms:t,target:n,layout:r,latestValues:i}=e;if(t&&n&&r){if(this!==e&&this.layout&&r&&Md(this.options.animationType,this.layout.layoutBox,r.layoutBox)){n=this.target||{x:{min:0,max:0},y:{min:0,max:0}};const t=Kl(this.layout.layoutBox.x);n.x.min=e.target.x.min,n.x.max=n.x.min+t;const r=Kl(this.layout.layoutBox.y);n.y.min=e.target.y.min,n.y.max=n.y.min+r}Yc(t,n),Sc(t,i),Zl(this.projectionDeltaWithTransform,this.layoutCorrected,t,i)}}registerSharedNode(e,t){this.sharedNodes.has(e)||this.sharedNodes.set(e,new rd);this.sharedNodes.get(e).add(t);const n=t.options.initialPromotionConfig;t.promote({transition:n?n.transition:void 0,preserveFollowOpacity:n&&n.shouldPreserveFollowOpacity?n.shouldPreserveFollowOpacity(t):void 0})}isLead(){const e=this.getStack();return!e||e.lead===this}getLead(){var e;const{layoutId:t}=this.options;return t&&(null===(e=this.getStack())||void 0===e?void 0:e.lead)||this}getPrevLead(){var e;const{layoutId:t}=this.options;return t?null===(e=this.getStack())||void 0===e?void 0:e.prevLead:void 0}getStack(){const{layoutId:e}=this.options;if(e)return this.root.sharedNodes.get(e)}promote(){let{needsReset:e,transition:t,preserveFollowOpacity:n}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const r=this.getStack();r&&r.promote(this,n),e&&(this.projectionDelta=void 0,this.needsReset=!0),t&&this.setOptions({transition:t})}relegate(){const e=this.getStack();return!!e&&e.relegate(this)}resetRotation(){const{visualElement:e}=this.options;if(!e)return;let t=!1;const{latestValues:n}=e;if((n.rotate||n.rotateX||n.rotateY||n.rotateZ)&&(t=!0),!t)return;const r={};for(let i=0;i<sd.length;i++){const t="rotate"+sd[i];n[t]&&(r[t]=n[t],e.setStaticValue(t,0))}e.render();for(const i in r)e.setStaticValue(i,r[i]);e.scheduleRender()}getProjectionStyles(e){var t,n;if(!this.instance||this.isSVG)return;if(!this.isVisible)return ld;const r={visibility:""},i=this.getTransformTemplate();if(this.needsReset)return this.needsReset=!1,r.opacity="",r.pointerEvents=Wo(null===e||void 0===e?void 0:e.pointerEvents)||"",r.transform=i?i(this.latestValues,""):"none",r;const o=this.getLead();if(!this.projectionDelta||!this.layout||!o.target){const t={};return this.options.layoutId&&(t.opacity=void 0!==this.latestValues.opacity?this.latestValues.opacity:1,t.pointerEvents=Wo(null===e||void 0===e?void 0:e.pointerEvents)||""),this.hasProjected&&!pc(this.latestValues)&&(t.transform=i?i({},""):"none",this.hasProjected=!1),t}const a=o.animationValues||o.latestValues;this.applyTransformsToTarget(),r.transform=id(this.projectionDeltaWithTransform,this.treeScale,a),i&&(r.transform=i(a,r.transform));const{x:s,y:l}=this.projectionDelta;r.transformOrigin=`${100*s.origin}% ${100*l.origin}% 0`,o.animationValues?r.opacity=o===this?null!==(n=null!==(t=a.opacity)&&void 0!==t?t:this.latestValues.opacity)&&void 0!==n?n:1:this.preserveOpacity?this.latestValues.opacity:a.opacityExit:r.opacity=o===this?void 0!==a.opacity?a.opacity:"":void 0!==a.opacityExit?a.opacityExit:0;for(const c in Ui){if(void 0===a[c])continue;const{correct:e,applyTo:t}=Ui[c],n="none"===r.transform?a[c]:e(a[c],o);if(t){const e=t.length;for(let i=0;i<e;i++)r[t[i]]=n}else r[c]=n}return this.options.layoutId&&(r.pointerEvents=o===this?Wo(null===e||void 0===e?void 0:e.pointerEvents)||"":"none"),r}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}resetTree(){this.root.nodes.forEach(e=>{var t;return null===(t=e.currentAnimation)||void 0===t?void 0:t.stop()}),this.root.nodes.forEach(xd),this.root.sharedNodes.clear()}}}function pd(e){e.updateLayout()}function hd(e){var t;const n=(null===(t=e.resumeFrom)||void 0===t?void 0:t.snapshot)||e.snapshot;if(e.isLead()&&e.layout&&n&&e.hasListeners("didUpdate")){const{layoutBox:t,measuredBox:r}=e.layout,{animationType:i}=e.options,o=n.source!==e.layout.source;"size"===i?lc(e=>{const r=o?n.measuredBox[e]:n.layoutBox[e],i=Kl(r);r.min=t[e].min,r.max=r.min+i}):Md(i,n.layoutBox,t)&&lc(r=>{const i=o?n.measuredBox[r]:n.layoutBox[r],a=Kl(t[r]);i.max=i.min+a,e.relativeTarget&&!e.currentAnimation&&(e.isProjectionDirty=!0,e.relativeTarget[r].max=e.relativeTarget[r].min+a)});const a={x:{translate:0,scale:1,origin:0,originPoint:0},y:{translate:0,scale:1,origin:0,originPoint:0}};Zl(a,t,n.layoutBox);const s={x:{translate:0,scale:1,origin:0,originPoint:0},y:{translate:0,scale:1,origin:0,originPoint:0}};o?Zl(s,e.applyTransform(r,!0),n.measuredBox):Zl(s,t,n.layoutBox);const l=!ed(a);let c=!1;if(!e.resumeFrom){const r=e.getClosestProjectingParent();if(r&&!r.resumeFrom){const{snapshot:i,layout:o}=r;if(i&&o){const a={x:{min:0,max:0},y:{min:0,max:0}};tc(a,n.layoutBox,i.layoutBox);const s={x:{min:0,max:0},y:{min:0,max:0}};tc(s,t,o.layoutBox),td(a,s)||(c=!0),r.options.layoutRoot&&(e.relativeTarget=s,e.relativeTargetOrigin=a,e.relativeParent=r)}}}e.notifyListeners("didUpdate",{layout:t,snapshot:n,delta:s,layoutDelta:a,hasLayoutChanged:l,hasRelativeTargetChanged:c})}else if(e.isLead()){const{onExitComplete:t}=e.options;t&&t()}e.options.transition=void 0}function fd(e){dd.totalNodes++,e.parent&&(e.isProjecting()||(e.isProjectionDirty=e.parent.isProjectionDirty),e.isSharedProjectionDirty||(e.isSharedProjectionDirty=Boolean(e.isProjectionDirty||e.parent.isProjectionDirty||e.parent.isSharedProjectionDirty)),e.isTransformDirty||(e.isTransformDirty=e.parent.isTransformDirty))}function md(e){e.isProjectionDirty=e.isSharedProjectionDirty=e.isTransformDirty=!1}function gd(e){e.clearSnapshot()}function xd(e){e.clearMeasurements()}function yd(e){e.isLayoutDirty=!1}function vd(e){const{visualElement:t}=e.options;t&&t.getProps().onBeforeLayoutMeasure&&t.notify("BeforeLayoutMeasure"),e.resetTransform()}function bd(e){e.finishAnimation(),e.targetDelta=e.relativeTarget=e.target=void 0,e.isProjectionDirty=!0}function wd(e){e.resolveTargetDelta()}function kd(e){e.calcProjection()}function jd(e){e.resetRotation()}function Sd(e){e.removeLeadSnapshot()}function Cd(e,t,n){e.translate=os(t.translate,0,n),e.scale=os(t.scale,1,n),e.origin=t.origin,e.originPoint=t.originPoint}function Pd(e,t,n,r){e.min=os(t.min,n.min,r),e.max=os(t.max,n.max,r)}function Ed(e){return e.animationValues&&void 0!==e.animationValues.opacityExit}const Td={duration:.45,ease:[.4,0,.1,1]},zd=e=>"undefined"!==typeof navigator&&navigator.userAgent.toLowerCase().includes(e),Ad=zd("applewebkit/")&&!zd("chrome/")?Math.round:Go;function _d(e){e.min=Ad(e.min),e.max=Ad(e.max)}function Md(e,t,n){return"position"===e||"preserve-aspect"===e&&!Ql(nd(t),nd(n),.2)}const $d=ud({attachResizeListener:(e,t)=>ra(e,"resize",t),measureScroll:()=>({x:document.documentElement.scrollLeft||document.body.scrollLeft,y:document.documentElement.scrollTop||document.body.scrollTop}),checkIsScrollRoot:()=>!0}),Nd={current:void 0},Rd=ud({measureScroll:e=>({x:e.scrollLeft,y:e.scrollTop}),defaultParent:()=>{if(!Nd.current){const e=new $d({});e.mount(window),e.setOptions({layoutScroll:!0}),Nd.current=e}return Nd.current},resetTransform:(e,t)=>{e.style.transform=void 0!==t?t:"none"},checkIsScrollRoot:e=>Boolean("fixed"===window.getComputedStyle(e).position)}),Ld={pan:{Feature:class extends fa{constructor(){super(...arguments),this.removePointerDownListener=Go}onPointerDown(e){this.session=new Vl(e,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:Pc(this.node)})}createPanHandlers(){const{onPanSessionStart:e,onPanStart:t,onPan:n,onPanEnd:r}=this.node.getProps();return{onSessionStart:Ac(e),onStart:Ac(t),onMove:n,onEnd:(e,t)=>{delete this.session,r&&Xo.update(()=>r(e,t))}}}mount(){this.removePointerDownListener=aa(this.node.current,"pointerdown",e=>this.onPointerDown(e))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}}},drag:{Feature:class extends fa{constructor(e){super(e),this.removeGroupControls=Go,this.removeListeners=Go,this.controls=new Tc(e)}mount(){const{dragControls:e}=this.node.getProps();e&&(this.removeGroupControls=e.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||Go}unmount(){this.removeGroupControls(),this.removeListeners()}},ProjectionNode:Rd,MeasureLayout:Lc}},Dd=/var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;function Fd(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;Ta(n<=4,`Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`);const[r,i]=function(e){const t=Dd.exec(e);if(!t)return[,];const[,n,r]=t;return[n,r]}(e);if(!r)return;const o=window.getComputedStyle(t).getPropertyValue(r);if(o){const e=o.trim();return hl(e)?parseFloat(e):e}return Zi(i)?Fd(i,t,n+1):i}const Od=new Set(["width","height","top","left","right","bottom","x","y","translateX","translateY"]),Id=e=>Od.has(e),Bd=e=>e===to||e===ho,Vd=(e,t)=>parseFloat(e.split(", ")[t]),Ud=(e,t)=>(n,r)=>{let{transform:i}=r;if("none"===i||!i)return 0;const o=i.match(/^matrix3d\((.+)\)$/);if(o)return Vd(o[1],t);{const t=i.match(/^matrix\((.+)\)$/);return t?Vd(t[1],e):0}},Hd=new Set(["x","y","z"]),Wd=Hi.filter(e=>!Hd.has(e));const qd={width:(e,t)=>{let{x:n}=e,{paddingLeft:r="0",paddingRight:i="0"}=t;return n.max-n.min-parseFloat(r)-parseFloat(i)},height:(e,t)=>{let{y:n}=e,{paddingTop:r="0",paddingBottom:i="0"}=t;return n.max-n.min-parseFloat(r)-parseFloat(i)},top:(e,t)=>{let{top:n}=t;return parseFloat(n)},left:(e,t)=>{let{left:n}=t;return parseFloat(n)},bottom:(e,t)=>{let{y:n}=e,{top:r}=t;return parseFloat(r)+(n.max-n.min)},right:(e,t)=>{let{x:n}=e,{left:r}=t;return parseFloat(r)+(n.max-n.min)},x:Ud(4,13),y:Ud(5,14)};qd.translateX=qd.x,qd.translateY=qd.y;const Yd=function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};t={...t},r={...r};const i=Object.keys(t).filter(Id);let o=[],a=!1;const s=[];if(i.forEach(i=>{const l=e.getValue(i);if(!e.hasValue(i))return;let c=n[i],d=kl(c);const u=t[i];let p;if(Uo(u)){const e=u.length,t=null===u[0]?1:0;c=u[t],d=kl(c);for(let n=t;n<e&&null!==u[n];n++)p?Ta(kl(u[n])===p,"All keyframes must be of the same type"):(p=kl(u[n]),Ta(p===d||Bd(d)&&Bd(p),"Keyframes must be of the same dimension as the current value"))}else p=kl(u);if(d!==p)if(Bd(d)&&Bd(p)){const e=l.get();"string"===typeof e&&l.set(parseFloat(e)),"string"===typeof u?t[i]=parseFloat(u):Array.isArray(u)&&p===ho&&(t[i]=u.map(parseFloat))}else(null===d||void 0===d?void 0:d.transform)&&(null===p||void 0===p?void 0:p.transform)&&(0===c||0===u)?0===c?l.set(p.transform(c)):t[i]=d.transform(u):(a||(o=function(e){const t=[];return Wd.forEach(n=>{const r=e.getValue(n);void 0!==r&&(t.push([n,r.get()]),r.set(n.startsWith("scale")?1:0))}),t.length&&e.render(),t}(e),a=!0),s.push(i),r[i]=void 0!==r[i]?r[i]:t[i],l.jump(u))}),s.length){const n=s.indexOf("height")>=0?window.pageYOffset:null,i=((e,t,n)=>{const r=t.measureViewportBox(),i=t.current,o=getComputedStyle(i),{display:a}=o,s={};"none"===a&&t.setStaticValue("display",e.display||"block"),n.forEach(e=>{s[e]=qd[e](r,o)}),t.render();const l=t.measureViewportBox();return n.forEach(n=>{const r=t.getValue(n);r&&r.jump(s[n]),e[n]=qd[n](l,o)}),e})(t,e,s);return o.length&&o.forEach(t=>{let[n,r]=t;e.getValue(n).set(r)}),e.render(),vi&&null!==n&&window.scrollTo({top:n}),{target:i,transitionEnd:r}}return{target:t,transitionEnd:r}};function Gd(e,t,n,r){return(e=>Object.keys(e).some(Id))(t)?Yd(e,t,n,r):{target:t,transitionEnd:r}}const Kd=(e,t,n,r)=>{const i=function(e,t,n){let{...r}=t;const i=e.current;if(!(i instanceof Element))return{target:r,transitionEnd:n};n&&(n={...n}),e.values.forEach(e=>{const t=e.get();if(!Zi(t))return;const n=Fd(t,i);n&&e.set(n)});for(const o in r){const e=r[o];if(!Zi(e))continue;const t=Fd(e,i);t&&(r[o]=t,n||(n={}),void 0===n[o]&&(n[o]=e))}return{target:r,transitionEnd:n}}(e,t,r);return Gd(e,t=i.target,n,r=i.transitionEnd)},Qd={current:null},Xd={current:!1};const Zd=new WeakMap,Jd=Object.keys(Ni),eu=Jd.length,tu=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"],nu=Ti.length;class ru{constructor(e){let{parent:t,props:n,presenceContext:r,reducedMotionConfig:i,visualState:o}=e,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.values=new Map,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.scheduleRender=()=>Xo.render(this.render,!1,!0);const{latestValues:s,renderState:l}=o;this.latestValues=s,this.baseTarget={...s},this.initialValues=n.initial?{...s}:{},this.renderState=l,this.parent=t,this.props=n,this.presenceContext=r,this.depth=t?t.depth+1:0,this.reducedMotionConfig=i,this.options=a,this.isControllingVariants=zi(n),this.isVariantNode=Ai(n),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=Boolean(t&&t.current);const{willChange:c,...d}=this.scrapeMotionValuesFromProps(n,{});for(const u in d){const e=d[u];void 0!==s[u]&&Yi(e)&&(e.set(s[u],!1),pl(c)&&c.add(u))}}scrapeMotionValuesFromProps(e,t){return{}}mount(e){this.current=e,Zd.set(e,this),this.projection&&!this.projection.instance&&this.projection.mount(e),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((e,t)=>this.bindToMotionValue(t,e)),Xd.current||function(){if(Xd.current=!0,vi)if(window.matchMedia){const e=window.matchMedia("(prefers-reduced-motion)"),t=()=>Qd.current=e.matches;e.addListener(t),t()}else Qd.current=!1}(),this.shouldReduceMotion="never"!==this.reducedMotionConfig&&("always"===this.reducedMotionConfig||Qd.current),this.parent&&this.parent.children.add(this),this.update(this.props,this.presenceContext)}unmount(){Zd.delete(this.current),this.projection&&this.projection.unmount(),Zo(this.notifyUpdate),Zo(this.render),this.valueSubscriptions.forEach(e=>e()),this.removeFromVariantTree&&this.removeFromVariantTree(),this.parent&&this.parent.children.delete(this);for(const e in this.events)this.events[e].clear();for(const e in this.features)this.features[e].unmount();this.current=null}bindToMotionValue(e,t){const n=Wi.has(e),r=t.on("change",t=>{this.latestValues[e]=t,this.props.onUpdate&&Xo.update(this.notifyUpdate,!1,!0),n&&this.projection&&(this.projection.isTransformDirty=!0)}),i=t.on("renderRequest",this.scheduleRender);this.valueSubscriptions.set(e,()=>{r(),i()})}sortNodePosition(e){return this.current&&this.sortInstanceNodePosition&&this.type===e.type?this.sortInstanceNodePosition(this.current,e.current):0}loadFeatures(e,t,n,r){let i,o,{children:a,...s}=e;for(let l=0;l<eu;l++){const e=Jd[l],{isEnabled:t,Feature:n,ProjectionNode:r,MeasureLayout:a}=Ni[e];r&&(i=r),t(s)&&(!this.features[e]&&n&&(this.features[e]=new n(this)),a&&(o=a))}if(("html"===this.type||"svg"===this.type)&&!this.projection&&i){this.projection=new i(this.latestValues,this.parent&&this.parent.projection);const{layoutId:e,layout:t,drag:n,dragConstraints:o,layoutScroll:a,layoutRoot:l}=s;this.projection.setOptions({layoutId:e,layout:t,alwaysMeasureLayout:Boolean(n)||o&&Si(o),visualElement:this,scheduleRender:()=>this.scheduleRender(),animationType:"string"===typeof t?t:"both",initialPromotionConfig:r,layoutScroll:a,layoutRoot:l})}return o}updateFeatures(){for(const e in this.features){const t=this.features[e];t.isMounted?t.update():(t.mount(),t.isMounted=!0)}}triggerBuild(){this.build(this.renderState,this.latestValues,this.options,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):{x:{min:0,max:0},y:{min:0,max:0}}}getStaticValue(e){return this.latestValues[e]}setStaticValue(e,t){this.latestValues[e]=t}makeTargetAnimatable(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return this.makeTargetAnimatableFromInstance(e,this.props,t)}update(e,t){(e.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=e,this.prevPresenceContext=this.presenceContext,this.presenceContext=t;for(let n=0;n<tu.length;n++){const t=tu[n];this.propEventSubscriptions[t]&&(this.propEventSubscriptions[t](),delete this.propEventSubscriptions[t]);const r=e["on"+t];r&&(this.propEventSubscriptions[t]=this.on(t,r))}this.prevMotionValues=function(e,t,n){const{willChange:r}=t;for(const i in t){const o=t[i],a=n[i];if(Yi(o))e.addValue(i,o),pl(r)&&r.add(i);else if(Yi(a))e.addValue(i,vl(o,{owner:e})),pl(r)&&r.remove(i);else if(a!==o)if(e.hasValue(i)){const t=e.getValue(i);!t.hasAnimated&&t.set(o)}else{const t=e.getStaticValue(i);e.addValue(i,vl(void 0!==t?t:o,{owner:e}))}}for(const i in n)void 0===t[i]&&e.removeValue(i);return t}(this,this.scrapeMotionValuesFromProps(e,this.prevProps),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue()}getProps(){return this.props}getVariant(e){return this.props.variants?this.props.variants[e]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}getVariantContext(){if(arguments.length>0&&void 0!==arguments[0]&&arguments[0])return this.parent?this.parent.getVariantContext():void 0;if(!this.isControllingVariants){const e=this.parent&&this.parent.getVariantContext()||{};return void 0!==this.props.initial&&(e.initial=this.props.initial),e}const e={};for(let t=0;t<nu;t++){const n=Ti[t],r=this.props[n];(Ci(r)||!1===r)&&(e[n]=r)}return e}addVariantChild(e){const t=this.getClosestVariantNode();if(t)return t.variantChildren&&t.variantChildren.add(e),()=>t.variantChildren.delete(e)}addValue(e,t){t!==this.values.get(e)&&(this.removeValue(e),this.bindToMotionValue(e,t)),this.values.set(e,t),this.latestValues[e]=t.get()}removeValue(e){this.values.delete(e);const t=this.valueSubscriptions.get(e);t&&(t(),this.valueSubscriptions.delete(e)),delete this.latestValues[e],this.removeValueFromRenderState(e,this.renderState)}hasValue(e){return this.values.has(e)}getValue(e,t){if(this.props.values&&this.props.values[e])return this.props.values[e];let n=this.values.get(e);return void 0===n&&void 0!==t&&(n=vl(t,{owner:this}),this.addValue(e,n)),n}readValue(e){var t;return void 0===this.latestValues[e]&&this.current?null!==(t=this.getBaseTargetFromProps(this.props,e))&&void 0!==t?t:this.readValueFromInstance(this.current,e,this.options):this.latestValues[e]}setBaseTarget(e,t){this.baseTarget[e]=t}getBaseTarget(e){var t;const{initial:n}=this.props,r="string"===typeof n||"object"===typeof n?null===(t=Bo(this.props,n))||void 0===t?void 0:t[e]:void 0;if(n&&void 0!==r)return r;const i=this.getBaseTargetFromProps(this.props,e);return void 0===i||Yi(i)?void 0!==this.initialValues[e]&&void 0===r?void 0:this.baseTarget[e]:i}on(e,t){return this.events[e]||(this.events[e]=new gl),this.events[e].add(t)}notify(e){if(this.events[e]){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];this.events[e].notify(...n)}}}class iu extends ru{sortInstanceNodePosition(e,t){return 2&e.compareDocumentPosition(t)?1:-1}getBaseTargetFromProps(e,t){return e.style?e.style[t]:void 0}removeValueFromRenderState(e,t){let{vars:n,style:r}=t;delete n[e],delete r[e]}makeTargetAnimatableFromInstance(e,t,n){let{transition:r,transitionEnd:i,...o}=e,{transformValues:a}=t,s=function(e,t,n){const r={};for(const i in e){const e=El(i,t);if(void 0!==e)r[i]=e;else{const e=n.getValue(i);e&&(r[i]=e.get())}}return r}(o,r||{},this);if(a&&(i&&(i=a(i)),o&&(o=a(o)),s&&(s=a(s))),n){!function(e,t,n){var r,i;const o=Object.keys(t).filter(t=>!e.hasValue(t)),a=o.length;if(a)for(let s=0;s<a;s++){const a=o[s],l=t[a];let c=null;Array.isArray(l)&&(c=l[0]),null===c&&(c=null!==(i=null!==(r=n[a])&&void 0!==r?r:e.readValue(a))&&void 0!==i?i:t[a]),void 0!==c&&null!==c&&("string"===typeof c&&(hl(c)||sl(c))?c=parseFloat(c):!Sl(c)&&vs.test(l)&&(c=al(a,l)),e.addValue(a,vl(c,{owner:e})),void 0===n[a]&&(n[a]=c),null!==c&&e.setBaseTarget(a,c))}}(this,o,s);const e=Kd(this,o,s,i);i=e.transitionEnd,o=e.target}return{transition:r,transitionEnd:i,...o}}}class ou extends iu{constructor(){super(...arguments),this.type="html"}readValueFromInstance(e,t){if(Wi.has(t)){const e=ol(t);return e&&e.default||0}{const r=(n=e,window.getComputedStyle(n)),i=(Xi(t)?r.getPropertyValue(t):r[t])||0;return"string"===typeof i?i.trim():i}var n}measureInstanceViewportBox(e,t){let{transformPagePoint:n}=t;return Cc(e,n)}build(e,t,n,r){vo(e,t,n,r.transformTemplate)}scrapeMotionValuesFromProps(e,t){return Oo(e,t)}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);const{children:e}=this.props;Yi(e)&&(this.childSubscription=e.on("change",e=>{this.current&&(this.current.textContent=`${e}`)}))}renderInstance(e,t,n,r){Lo(e,t,n,r)}}class au extends iu{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1}getBaseTargetFromProps(e,t){return e[t]}readValueFromInstance(e,t){if(Wi.has(t)){const e=ol(t);return e&&e.default||0}return t=Do.has(t)?t:ki(t),e.getAttribute(t)}measureInstanceViewportBox(){return{x:{min:0,max:0},y:{min:0,max:0}}}scrapeMotionValuesFromProps(e,t){return Io(e,t)}build(e,t,n,r){_o(e,t,n,this.isSVGTag,r.transformTemplate)}renderInstance(e,t,n,r){Fo(e,t,0,r)}mount(e){this.isSVGTag=$o(e.tagName),super.mount(e)}}const su=(e,t)=>Vi(e)?new au(t,{enableHardwareAcceleration:!1}):new ou(t,{enableHardwareAcceleration:!0}),lu={...Il,...Sa,...Ld,...{layout:{ProjectionNode:Rd,MeasureLayout:Lc}}},cu=Ii((e,t)=>function(e,t,n,r){let{forwardMotionProps:i=!1}=t;return{...Vi(e)?ta:na,preloadedFeatures:n,useRender:Ro(i),createVisualElement:r,Component:e}}(e,t,lu,su));var du={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const uu=(e,n)=>{const r=(0,t.forwardRef)((r,i)=>{let{color:o="currentColor",size:a=24,strokeWidth:s=2,absoluteStrokeWidth:l,children:c,...d}=r;return(0,t.createElement)("svg",{ref:i,...du,width:a,height:a,stroke:o,strokeWidth:l?24*Number(s)/Number(a):s,className:`lucide lucide-${u=e,u.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,...d},[...n.map(e=>{let[n,r]=e;return(0,t.createElement)(n,r)}),...(Array.isArray(c)?c:[c])||[]]);var u});return r.displayName=`${e}`,r},pu=uu("Shield",[["path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10",key:"1irkt0"}]]),hu=uu("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]),fu=uu("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]),mu=uu("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]),gu=uu("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]),xu=uu("EyeOff",[["path",{d:"M9.88 9.88a3 3 0 1 0 4.24 4.24",key:"1jxqfv"}],["path",{d:"M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68",key:"9wicm4"}],["path",{d:"M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61",key:"1jreej"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]),yu=uu("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]),vu=ei.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`,bu=ei.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.03) 0%, transparent 50%);
  backdrop-filter: blur(100px);
`,wu=ei.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
`,ku=ei(cu.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  padding: 48px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  width: 100%;
  max-width: ${e=>e.$isWide?"520px":"420px"};
  position: relative;
  z-index: 10;
`,ju=ei.div`
  text-align: center;
  margin-bottom: 40px;
`,Su=ei.div`
  font-size: 48px;
  font-weight: 800;
  background: linear-gradient(135deg, #1a1a1a 0%, #333333 50%, #000000 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
  letter-spacing: -1px;
`,Cu=ei.p`
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
  margin: 0;
`,Pu=ei(cu.div)`
  position: absolute;
  width: ${e=>e.size||"20px"};
  height: ${e=>e.size||"20px"};
  border-radius: 50%;
  background: ${e=>e.color||"rgba(59, 130, 246, 0.6)"};
  filter: blur(${e=>e.blur||"2px"});
  z-index: 1;
`,Eu=e=>{let{children:t,title:n,subtitle:r,isWide:i=!1}=e;return(0,oi.jsxs)(vu,{children:[(0,oi.jsx)(bu,{}),(0,oi.jsx)(wu,{}),(0,oi.jsx)(Pu,{size:"60px",color:"rgba(59, 130, 246, 0.4)",blur:"4px",style:{top:"15%",left:"10%"},animate:{y:[0,-20,0],x:[0,10,0],scale:[1,1.1,1]},transition:{duration:8,repeat:1/0,ease:"easeInOut"}}),(0,oi.jsx)(Pu,{size:"40px",color:"rgba(168, 85, 247, 0.3)",blur:"3px",style:{top:"60%",right:"15%"},animate:{y:[0,15,0],x:[0,-15,0],scale:[1,.9,1]},transition:{duration:10,repeat:1/0,ease:"easeInOut",delay:2}}),(0,oi.jsx)(Pu,{size:"80px",color:"rgba(34, 197, 94, 0.2)",blur:"5px",style:{bottom:"20%",left:"20%"},animate:{y:[0,-25,0],x:[0,20,0],scale:[1,1.2,1]},transition:{duration:12,repeat:1/0,ease:"easeInOut",delay:4}}),(0,oi.jsxs)(ku,{$isWide:i,initial:{opacity:0,y:20,scale:.95},animate:{opacity:1,y:0,scale:1},transition:{duration:.6,ease:[.25,.46,.45,.94]},children:[(0,oi.jsxs)(ju,{children:[(0,oi.jsx)(Su,{children:"Monexa"}),(0,oi.jsx)(Cu,{children:"Music Studio Management Platform"})]}),t]})]})},Tu=ei.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`,zu=ei.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Au=ei.label`
  font-weight: 600;
  color: #1e293b;
  font-size: 14px;
`,_u=ei.div`
  position: relative;
  display: flex;
  align-items: center;
`,Mu=ei.input`
  width: 100%;
  padding: 16px 16px 16px 48px;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  color: #1e293b;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: #1a1a1a;
    box-shadow: 0 0 0 4px rgba(26, 26, 26, 0.1);
    background: rgba(255, 255, 255, 1);
  }

  &:invalid {
    border-color: #ef4444;
  }
`,$u=ei.div`
  position: absolute;
  left: 16px;
  color: #94a3b8;
  z-index: 2;
  display: flex;
  align-items: center;
`,Nu=ei.button`
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;
  transition: all 0.2s ease;
  z-index: 2;

  &:hover {
    color: #1a1a1a;
    background: rgba(0, 0, 0, 0.05);
  }
`,Ru=ei(cu.button)`
  background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
  color: white;
  border: none;
  padding: 16px 24px;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`,Lu=ei.div`
  display: flex;
  align-items: center;
  margin: 8px 0;
`,Du=ei.div`
  flex: 1;
  height: 1px;
  background: #e2e8f0;
`,Fu=ei.span`
  padding: 0 16px;
  color: #64748b;
  font-size: 14px;
  font-weight: 500;
`,Ou=ei.div`
  text-align: center;
  margin-top: 8px;
`,Iu=ei.p`
  color: #64748b;
  font-size: 14px;
  margin: 0;
`,Bu=ei.button`
  background: none;
  border: none;
  color: #1a1a1a;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
  transition: all 0.2s ease;

  &:hover {
    color: #333333;
  }
`,Vu=ei.div`
  color: #ef4444;
  font-size: 14px;
  margin-top: -8px;
  margin-bottom: 8px;
  padding: 8px 12px;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 8px;
  border-left: 3px solid #ef4444;
`,Uu=ei.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  text-align: center;
`,Hu=ei.h2`
  color: #1e293b;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
`,Wu=ei.p`
  color: #64748b;
  font-size: 16px;
  margin: 0;
  line-height: 1.5;
`,qu=ei.input`
  width: 100%;
  padding: 16px;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  font-size: 18px;
  text-align: center;
  letter-spacing: 4px;
  font-weight: 600;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  color: #1e293b;

  &::placeholder {
    color: #94a3b8;
    letter-spacing: 2px;
  }

  &:focus {
    outline: none;
    border-color: #1a1a1a;
    box-shadow: 0 0 0 4px rgba(26, 26, 26, 0.1);
    background: rgba(255, 255, 255, 1);
  }
`,Yu=ei(cu.button)`
  background: none;
  border: 2px solid #e2e8f0;
  color: #64748b;
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #1a1a1a;
    color: #1a1a1a;
  }
`,Gu=e=>{let{onSwitchToSignup:n}=e;const[r,i]=(0,t.useState)({email:"",password:""}),[o,a]=(0,t.useState)(""),[s,l]=(0,t.useState)(!1),[c,d]=(0,t.useState)({}),[u,p]=(0,t.useState)(!1),[h,f]=(0,t.useState)(!1),[m,g]=(0,t.useState)(null),{login:x}=si(),y=e=>{const{name:t,value:n}=e.target;i(e=>({...e,[t]:n})),c[t]&&d(e=>({...e,[t]:""}))},v=e=>{const t=e.target.value.replace(/\D/g,"").slice(0,6);a(t)},b=async e=>{if(e.preventDefault(),o&&6===o.length?(d(e=>({...e,twoFactor:""})),1):(d(e=>({...e,twoFactor:"Please enter a valid 6-digit code"})),0)){p(!0);try{const e=await x(m.email,m.password,o);e.success?dt.success("Welcome back to Monexa!",{position:"bottom-right",autoClose:3e3}):(dt.error(e.error||"Invalid 2FA code. Please try again.",{position:"bottom-right",autoClose:4e3}),a(""))}catch(t){dt.error("An unexpected error occurred. Please try again.",{position:"bottom-right",autoClose:4e3})}finally{p(!1)}}},w=()=>{f(!1),a(""),g(null),d({})};return h?(0,oi.jsx)(Eu,{children:(0,oi.jsxs)(Uu,{children:[(0,oi.jsxs)("div",{children:[(0,oi.jsx)(Hu,{children:"Two-Factor Authentication"}),(0,oi.jsx)(Wu,{children:"Enter the 6-digit code from your authenticator app"})]}),(0,oi.jsxs)(Tu,{onSubmit:b,children:[(0,oi.jsxs)(zu,{children:[(0,oi.jsxs)(_u,{children:[(0,oi.jsx)($u,{children:(0,oi.jsx)(pu,{size:20})}),(0,oi.jsx)(qu,{type:"text",placeholder:"000000",value:o,onChange:v,maxLength:6,autoFocus:!0,autoComplete:"off"})]}),c.twoFactor&&(0,oi.jsx)(Vu,{children:c.twoFactor})]}),(0,oi.jsxs)(Ru,{type:"submit",disabled:u,whileHover:{scale:1.02},whileTap:{scale:.98},children:[u?"Verifying...":"Verify & Sign In",!u&&(0,oi.jsx)(hu,{size:20})]}),(0,oi.jsxs)(Yu,{type:"button",onClick:w,whileHover:{scale:1.02},whileTap:{scale:.98},children:[(0,oi.jsx)(fu,{size:16}),"Back to Login"]})]})]})}):(0,oi.jsx)(Eu,{children:(0,oi.jsxs)(Tu,{onSubmit:async e=>{if(e.preventDefault(),(()=>{const e={};return r.email?/\S+@\S+\.\S+/.test(r.email)||(e.email="Please enter a valid email"):e.email="Email is required",r.password?r.password.length<6&&(e.password="Password must be at least 6 characters"):e.password="Password is required",d(e),0===Object.keys(e).length})()){p(!0);try{const e=await x(r.email,r.password);e.success?dt.success("Welcome back to Monexa!",{position:"bottom-right",autoClose:3e3}):e.requires2FA?(g({email:r.email,password:r.password}),f(!0),dt.info("Please enter your 2FA code",{position:"bottom-right",autoClose:4e3})):dt.error(e.error||"Login failed. Please try again.",{position:"bottom-right",autoClose:4e3})}catch(t){dt.error("An unexpected error occurred. Please try again.",{position:"bottom-right",autoClose:4e3})}finally{p(!1)}}},children:[(0,oi.jsxs)(zu,{children:[(0,oi.jsx)(Au,{children:"Email Address"}),(0,oi.jsxs)(_u,{children:[(0,oi.jsx)($u,{children:(0,oi.jsx)(mu,{size:20})}),(0,oi.jsx)(Mu,{type:"email",name:"email",placeholder:"Enter your email",value:r.email,onChange:y,required:!0,autoComplete:"off"})]}),c.email&&(0,oi.jsx)(Vu,{children:c.email})]}),(0,oi.jsxs)(zu,{children:[(0,oi.jsx)(Au,{children:"Password"}),(0,oi.jsxs)(_u,{children:[(0,oi.jsx)($u,{children:(0,oi.jsx)(gu,{size:20})}),(0,oi.jsx)(Mu,{type:s?"text":"password",name:"password",placeholder:"Enter your password",value:r.password,onChange:y,required:!0,autoComplete:"off"}),(0,oi.jsx)(Nu,{type:"button",onClick:()=>l(!s),children:s?(0,oi.jsx)(xu,{size:20}):(0,oi.jsx)(yu,{size:20})})]}),c.password&&(0,oi.jsx)(Vu,{children:c.password})]}),(0,oi.jsxs)(Ru,{type:"submit",disabled:u,whileHover:{scale:1.02},whileTap:{scale:.98},children:[u?"Signing In...":"Sign In",!u&&(0,oi.jsx)(hu,{size:20})]}),(0,oi.jsxs)(Lu,{children:[(0,oi.jsx)(Du,{}),(0,oi.jsx)(Fu,{children:"or"}),(0,oi.jsx)(Du,{})]}),(0,oi.jsx)(Ou,{children:(0,oi.jsxs)(Iu,{children:["Don't have an account?"," ",(0,oi.jsx)(Bu,{type:"button",onClick:n,children:"Create Account"})]})})]})})},Ku=uu("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]),Qu=uu("Briefcase",[["rect",{width:"20",height:"14",x:"2",y:"7",rx:"2",ry:"2",key:"eto64e"}],["path",{d:"M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"zwj3tp"}]]),Xu=ei.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`,Zu=ei.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Ju=ei.label`
  font-weight: 600;
  color: #1e293b;
  font-size: 14px;
`,ep=ei.div`
  position: relative;
  display: flex;
  align-items: center;
`,tp=ei.input`
  width: 100%;
  padding: 14px 14px 14px 44px;
  border: 2px solid #e2e8f0;
  border-radius: 14px;
  font-size: 15px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  color: #1e293b;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: #1a1a1a;
    box-shadow: 0 0 0 4px rgba(26, 26, 26, 0.1);
    background: rgba(255, 255, 255, 1);
  }

  &:invalid {
    border-color: #ef4444;
  }
`,np=ei.select`
  width: 100%;
  padding: 14px 14px 14px 44px;
  border: 2px solid #e2e8f0;
  border-radius: 14px;
  font-size: 15px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  color: #1e293b;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #1a1a1a;
    box-shadow: 0 0 0 4px rgba(26, 26, 26, 0.1);
    background: rgba(255, 255, 255, 1);
  }
`,rp=ei.div`
  position: absolute;
  left: 14px;
  color: #94a3b8;
  z-index: 2;
  display: flex;
  align-items: center;
`,ip=ei.button`
  position: absolute;
  right: 14px;
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;
  transition: all 0.2s ease;
  z-index: 2;

  &:hover {
    color: #1a1a1a;
    background: rgba(0, 0, 0, 0.05);
  }
`,op=ei(cu.button)`
  background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
  color: white;
  border: none;
  padding: 16px 24px;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`,ap=ei.div`
  display: flex;
  align-items: center;
  margin: 8px 0;
`,sp=ei.div`
  flex: 1;
  height: 1px;
  background: #e2e8f0;
`,lp=ei.span`
  padding: 0 16px;
  color: #64748b;
  font-size: 14px;
  font-weight: 500;
`,cp=ei.div`
  text-align: center;
  margin-top: 8px;
`,dp=ei.p`
  color: #64748b;
  font-size: 14px;
  margin: 0;
`,up=ei.button`
  background: none;
  border: none;
  color: #1a1a1a;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
  transition: all 0.2s ease;

  &:hover {
    color: #333333;
  }
`,pp=ei.div`
  color: #ef4444;
  font-size: 13px;
  margin-top: -4px;
  margin-bottom: 4px;
  padding: 6px 10px;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 6px;
  border-left: 3px solid #ef4444;
`,hp=ei.div`
  margin-top: 8px;
  font-size: 12px;
`,fp=ei.div`
  width: 100%;
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
  margin-bottom: 4px;
  overflow: hidden;
`,mp=ei.div`
  height: 100%;
  transition: all 0.3s ease;
  background: ${e=>"weak"===e.$strength?"#ef4444":"medium"===e.$strength?"#f59e0b":"strong"===e.$strength?"#10b981":"#e2e8f0"};
  width: ${e=>"weak"===e.$strength?"33%":"medium"===e.$strength?"66%":"strong"===e.$strength?"100%":"0%"};
`,gp=ei.span`
  color: ${e=>"weak"===e.$strength?"#ef4444":"medium"===e.$strength?"#f59e0b":"strong"===e.$strength?"#10b981":"#64748b"};
  font-weight: 500;
`,xp=["Music Producer","Beat Maker","Sound Engineer","Artist","DJ","Composer","Studio Manager","Other"],yp=e=>{let{onSwitchToLogin:n}=e;const[r,i]=(0,t.useState)({name:"",email:"",password:"",confirmPassword:"",role:""}),[o,a]=(0,t.useState)(!1),[s,l]=(0,t.useState)(!1),[c,d]=(0,t.useState)({}),[u,p]=(0,t.useState)(!1),{signup:h}=si(),f=e=>{const{name:t,value:n}=e.target;i(e=>({...e,[t]:n})),c[t]&&d(e=>({...e,[t]:""}))},m=(g=r.password).length<6?"weak":g.length<8?"medium":g.length>=8&&/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(g)?"strong":"medium";var g;return(0,oi.jsx)(Eu,{isWide:!0,children:(0,oi.jsxs)(Xu,{onSubmit:async e=>{if(e.preventDefault(),(()=>{const e={};return r.name.trim()?r.name.trim().length<2&&(e.name="Name must be at least 2 characters"):e.name="Full name is required",r.email?/\S+@\S+\.\S+/.test(r.email)||(e.email="Please enter a valid email"):e.email="Email is required",r.password?r.password.length<6&&(e.password="Password must be at least 6 characters"):e.password="Password is required",r.confirmPassword?r.password!==r.confirmPassword&&(e.confirmPassword="Passwords do not match"):e.confirmPassword="Please confirm your password",r.role||(e.role="Please select your role"),d(e),0===Object.keys(e).length})()){p(!0);try{const e=await h(r);e.success?dt.success("Welcome to Monexa! Your account has been created.",{position:"bottom-right",autoClose:4e3}):dt.error(e.error||"Signup failed. Please try again.",{position:"bottom-right",autoClose:4e3})}catch(t){dt.error("An unexpected error occurred. Please try again.",{position:"bottom-right",autoClose:4e3})}finally{p(!1)}}},children:[(0,oi.jsxs)(Zu,{children:[(0,oi.jsx)(Ju,{children:"Full Name"}),(0,oi.jsxs)(ep,{children:[(0,oi.jsx)(rp,{children:(0,oi.jsx)(Ku,{size:18})}),(0,oi.jsx)(tp,{type:"text",name:"name",placeholder:"Enter your full name",value:r.name,onChange:f,required:!0})]}),c.name&&(0,oi.jsx)(pp,{children:c.name})]}),(0,oi.jsxs)(Zu,{children:[(0,oi.jsx)(Ju,{children:"Email Address"}),(0,oi.jsxs)(ep,{children:[(0,oi.jsx)(rp,{children:(0,oi.jsx)(mu,{size:18})}),(0,oi.jsx)(tp,{type:"email",name:"email",placeholder:"Enter your email address",value:r.email,onChange:f,required:!0})]}),c.email&&(0,oi.jsx)(pp,{children:c.email})]}),(0,oi.jsxs)(Zu,{children:[(0,oi.jsx)(Ju,{children:"Role"}),(0,oi.jsxs)(ep,{children:[(0,oi.jsx)(rp,{children:(0,oi.jsx)(Qu,{size:18})}),(0,oi.jsxs)(np,{name:"role",value:r.role,onChange:f,required:!0,children:[(0,oi.jsx)("option",{value:"",children:"Select your role"}),xp.map(e=>(0,oi.jsx)("option",{value:e,children:e},e))]})]}),c.role&&(0,oi.jsx)(pp,{children:c.role})]}),(0,oi.jsxs)(Zu,{children:[(0,oi.jsx)(Ju,{children:"Password"}),(0,oi.jsxs)(ep,{children:[(0,oi.jsx)(rp,{children:(0,oi.jsx)(gu,{size:18})}),(0,oi.jsx)(tp,{type:o?"text":"password",name:"password",placeholder:"Create a password",value:r.password,onChange:f,required:!0}),(0,oi.jsx)(ip,{type:"button",onClick:()=>a(!o),children:o?(0,oi.jsx)(xu,{size:18}):(0,oi.jsx)(yu,{size:18})})]}),r.password&&(0,oi.jsxs)(hp,{children:[(0,oi.jsx)(fp,{children:(0,oi.jsx)(mp,{$strength:m})}),(0,oi.jsxs)(gp,{$strength:m,children:["Password strength: ",m]})]}),c.password&&(0,oi.jsx)(pp,{children:c.password})]}),(0,oi.jsxs)(Zu,{children:[(0,oi.jsx)(Ju,{children:"Confirm Password"}),(0,oi.jsxs)(ep,{children:[(0,oi.jsx)(rp,{children:(0,oi.jsx)(gu,{size:18})}),(0,oi.jsx)(tp,{type:s?"text":"password",name:"confirmPassword",placeholder:"Confirm your password",value:r.confirmPassword,onChange:f,required:!0}),(0,oi.jsx)(ip,{type:"button",onClick:()=>l(!s),children:s?(0,oi.jsx)(xu,{size:18}):(0,oi.jsx)(yu,{size:18})})]}),c.confirmPassword&&(0,oi.jsx)(pp,{children:c.confirmPassword})]}),(0,oi.jsxs)(op,{type:"submit",disabled:u,whileHover:{scale:1.02},whileTap:{scale:.98},children:[u?"Creating Account...":"Create Account",!u&&(0,oi.jsx)(hu,{size:18})]}),(0,oi.jsxs)(ap,{children:[(0,oi.jsx)(sp,{}),(0,oi.jsx)(lp,{children:"or"}),(0,oi.jsx)(sp,{})]}),(0,oi.jsx)(cp,{children:(0,oi.jsxs)(dp,{children:["Already have an account?"," ",(0,oi.jsx)(up,{type:"button",onClick:n,children:"Sign In"})]})})]})})},vp=()=>{const[e,n]=(0,t.useState)(!1);return e?(0,oi.jsx)(Gu,{onSwitchToSignup:()=>n(!1)}):(0,oi.jsx)(yp,{onSwitchToLogin:()=>n(!0)})},bp=uu("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]),wp=ei(cu.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
`,kp=ei(cu.div)`
  background: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(255, 255, 255, 0.25)":"white"}};
  backdrop-filter: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"blur(20px) saturate(180%)":"none"}};
  border: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"1px solid rgba(255, 255, 255, 0.3)":"none"}};
  border-radius: 20px;
  padding: 40px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  box-shadow: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"0 8px 32px rgba(31, 38, 135, 0.37)":"0 20px 60px rgba(0, 0, 0, 0.3)"}};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"#4caf50":"#ef4444"}}, ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"#66bb6a":"#f59e0b"}});
  }
`,jp=ei.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ef4444, #f59e0b);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  color: white;
  font-size: 32px;
  box-shadow: 0 8px 24px rgba(239, 68, 68, 0.3);
`,Sp=ei.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"#1a237e":"#1e293b"}};
  margin: 0 0 8px 0;
`,Cp=ei.p`
  font-size: 14px;
  color: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"#283593":"#64748b"}};
  margin: 0 0 32px 0;
  line-height: 1.5;
`,Pp=ei.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,Ep=ei.div`
  position: relative;
`,Tp=ei.input`
  width: 100%;
  padding: 14px 18px;
  border: 2px solid ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(156, 204, 101, 0.4)":"#e2e8f0"}};
  border-radius: 10px;
  font-size: 14px;
  color: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"#1a237e":"#1e293b"}};
  background: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(255, 255, 255, 0.2)":"white"}};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"#4caf50":"#1a1a1a"}};
    box-shadow: 0 0 0 3px ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(76, 175, 80, 0.1)":"rgba(26, 26, 26, 0.1)"}};
    background: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(255, 255, 255, 0.3)":"white"}};
  }

  &.error {
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }
`,zp=ei.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #64748b;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: #1e293b;
    background: #f1f5f9;
  }
`,Ap=ei(cu.button)`
  background: linear-gradient(135deg, #1a1a1a, #333333);
  color: white;
  border: none;
  padding: 14px 24px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  font-size: 14px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`,_p=ei.div`
  background: #fef3c7;
  border: 1px solid #f59e0b;
  border-radius: 10px;
  padding: 16px;
  margin-top: 24px;
  text-align: left;
`,Mp=ei.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`,$p=ei.div`
  font-weight: 600;
  color: #92400e;
  font-size: 14px;
`,Np=ei.div`
  font-size: 12px;
  color: #92400e;
  line-height: 1.4;
`,Rp=()=>{const{theme:e}=fi(),{isSessionLocked:n,unlockSession:r,complete2FALogin:i,requires2FA:o,tempCredentials:a}=si(),[s,l]=(0,t.useState)(""),[c,d]=(0,t.useState)(""),[u,p]=(0,t.useState)(""),[h,f]=(0,t.useState)(!1),[m,g]=(0,t.useState)(!1),[x,y]=(0,t.useState)("");return n?(0,oi.jsx)(wp,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:(0,oi.jsxs)(kp,{theme:e,initial:{scale:.9,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.9,opacity:0},children:[(0,oi.jsx)(jp,{children:(0,oi.jsx)(gu,{size:32})}),(0,oi.jsx)(Sp,{children:"Session Locked"}),(0,oi.jsx)(Cp,{children:"Your session has been locked due to inactivity. Please enter your credentials to continue where you left off."}),(0,oi.jsxs)(Pp,{onSubmit:async e=>{e.preventDefault(),g(!0),y("");try{if(o){const e=await i(u);e.success?dt.success("Session restored successfully!"):y(e.error||"Invalid 2FA token")}else{const e=await r(s,c,u);e.success?dt.success("Session restored successfully!"):e.requires2FA||y(e.error||"Invalid credentials")}}catch(x){y("An error occurred while restoring session")}finally{g(!1)}},children:[o?(0,oi.jsx)(Ep,{children:(0,oi.jsx)(Tp,{type:"text",placeholder:"Enter 2FA code",value:u,onChange:e=>p(e.target.value),required:!0,className:x?"error":"",maxLength:6,autoComplete:"off"})}):(0,oi.jsxs)(oi.Fragment,{children:[(0,oi.jsx)(Ep,{children:(0,oi.jsx)(Tp,{type:"email",placeholder:"Email address",value:s,onChange:e=>l(e.target.value),required:!0,className:x?"error":"",autoComplete:"off"})}),(0,oi.jsxs)(Ep,{children:[(0,oi.jsx)(Tp,{type:h?"text":"password",placeholder:"Password",value:c,onChange:e=>d(e.target.value),required:!0,className:x?"error":"",autoComplete:"off"}),(0,oi.jsx)(zp,{type:"button",onClick:()=>f(!h),children:h?(0,oi.jsx)(xu,{size:16}):(0,oi.jsx)(yu,{size:16})})]})]}),x&&(0,oi.jsx)("div",{style:{color:"#ef4444",fontSize:"14px",textAlign:"left"},children:x}),(0,oi.jsxs)(Ap,{type:"submit",disabled:m,whileHover:{scale:1.02},whileTap:{scale:.98},children:[(0,oi.jsx)(pu,{size:16}),m?"Restoring Session...":"Unlock Session"]})]}),(0,oi.jsxs)(_p,{children:[(0,oi.jsxs)(Mp,{children:[(0,oi.jsx)(bp,{size:16,color:"#f59e0b"}),(0,oi.jsx)($p,{children:"Security Notice"})]}),(0,oi.jsx)(Np,{children:"Your session was automatically locked for security. This helps protect your account from unauthorized access."})]})]})}):null};function Lp(){const e=(0,t.useRef)(!1);return bi(()=>(e.current=!0,()=>{e.current=!1}),[]),e}class Dp extends t.Component{getSnapshotBeforeUpdate(e){const t=this.props.childRef.current;if(t&&e.isPresent&&!this.props.isPresent){const e=this.props.sizeRef.current;e.height=t.offsetHeight||0,e.width=t.offsetWidth||0,e.top=t.offsetTop,e.left=t.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}}function Fp(e){let{children:n,isPresent:r}=e;const i=(0,t.useId)(),o=(0,t.useRef)(null),a=(0,t.useRef)({width:0,height:0,top:0,left:0});return(0,t.useInsertionEffect)(()=>{const{width:e,height:t,top:n,left:s}=a.current;if(r||!o.current||!e||!t)return;o.current.dataset.motionPopId=i;const l=document.createElement("style");return document.head.appendChild(l),l.sheet&&l.sheet.insertRule(`\n          [data-motion-pop-id="${i}"] {\n            position: absolute !important;\n            width: ${e}px !important;\n            height: ${t}px !important;\n            top: ${n}px !important;\n            left: ${s}px !important;\n          }\n        `),()=>{document.head.removeChild(l)}},[r]),t.createElement(Dp,{isPresent:r,childRef:o,sizeRef:a},t.cloneElement(n,{ref:o}))}const Op=e=>{let{children:n,initial:r,isPresent:i,onExitComplete:o,custom:a,presenceAffectsLayout:s,mode:l}=e;const c=Vo(Ip),d=(0,t.useId)(),u=(0,t.useMemo)(()=>({id:d,initial:r,isPresent:i,custom:a,onExitComplete:e=>{c.set(e,!0);for(const t of c.values())if(!t)return;o&&o()},register:e=>(c.set(e,!1),()=>c.delete(e))}),s?void 0:[i]);return(0,t.useMemo)(()=>{c.forEach((e,t)=>c.set(t,!1))},[i]),t.useEffect(()=>{!i&&!c.size&&o&&o()},[i]),"popLayout"===l&&(n=t.createElement(Fp,{isPresent:i},n)),t.createElement(yi.Provider,{value:u},n)};function Ip(){return new Map}const Bp=e=>e.key||"";const Vp=e=>{let{children:n,custom:r,initial:i=!0,onExitComplete:o,exitBeforeEnter:a,presenceAffectsLayout:s=!0,mode:l="sync"}=e;Ta(!a,"Replace exitBeforeEnter with mode='wait'");const c=(0,t.useContext)(Ri).forceRender||function(){const e=Lp(),[n,r]=(0,t.useState)(0),i=(0,t.useCallback)(()=>{e.current&&r(n+1)},[n]);return[(0,t.useCallback)(()=>Xo.postRender(i),[i]),n]}()[0],d=Lp(),u=function(e){const n=[];return t.Children.forEach(e,e=>{(0,t.isValidElement)(e)&&n.push(e)}),n}(n);let p=u;const h=(0,t.useRef)(new Map).current,f=(0,t.useRef)(p),m=(0,t.useRef)(new Map).current,g=(0,t.useRef)(!0);var x;if(bi(()=>{g.current=!1,function(e,t){e.forEach(e=>{const n=Bp(e);t.set(n,e)})}(u,m),f.current=p}),x=()=>{g.current=!0,m.clear(),h.clear()},(0,t.useEffect)(()=>()=>x(),[]),g.current)return t.createElement(t.Fragment,null,p.map(e=>t.createElement(Op,{key:Bp(e),isPresent:!0,initial:!!i&&void 0,presenceAffectsLayout:s,mode:l},e)));p=[...p];const y=f.current.map(Bp),v=u.map(Bp),b=y.length;for(let t=0;t<b;t++){const e=y[t];-1!==v.indexOf(e)||h.has(e)||h.set(e,void 0)}return"wait"===l&&h.size&&(p=[]),h.forEach((e,n)=>{if(-1!==v.indexOf(n))return;const i=m.get(n);if(!i)return;const a=y.indexOf(n);let g=e;if(!g){const e=()=>{h.delete(n);const e=Array.from(m.keys()).filter(e=>!v.includes(e));if(e.forEach(e=>m.delete(e)),f.current=u.filter(t=>{const r=Bp(t);return r===n||e.includes(r)}),!h.size){if(!1===d.current)return;c(),o&&o()}};g=t.createElement(Op,{key:Bp(i),isPresent:!1,onExitComplete:e,custom:r,presenceAffectsLayout:s,mode:l},i),h.set(n,g)}p.splice(a,0,g)}),p=p.map(e=>{const n=e.key;return h.has(n)?e:t.createElement(Op,{key:Bp(e),isPresent:!0,presenceAffectsLayout:s,mode:l},e)}),t.createElement(t.Fragment,null,h.size?p:p.map(e=>(0,t.cloneElement)(e)))},Up=uu("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),Hp=ei(cu.div)`
  position: fixed;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  border: 1px solid #f59e0b;
  border-radius: 12px;
  padding: 16px;
  max-width: 300px;
  z-index: 1000;
  box-shadow: 0 8px 24px rgba(245, 158, 11, 0.2);
`,Wp=ei.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`,qp=ei.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #92400e;
  font-size: 14px;
`,Yp=ei.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #92400e;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(146, 64, 14, 0.1);
  }
`,Gp=ei.div`
  font-size: 13px;
  color: #92400e;
  line-height: 1.4;
  margin-bottom: 12px;
`,Kp=ei.div`
  width: 100%;
  height: 4px;
  background: rgba(146, 64, 14, 0.2);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 12px;
`,Qp=ei(cu.div)`
  height: 100%;
  background: linear-gradient(90deg, #f59e0b, #d97706);
  border-radius: 2px;
`,Xp=ei.div`
  font-size: 12px;
  color: #92400e;
  font-weight: 500;
  text-align: center;
`,Zp=ei(cu.button)`
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
  }
`,Jp=()=>{const{lastActivity:e,sessionTimeout:n,updateActivity:r}=si(),[i,o]=(0,t.useState)(!1),[a,s]=(0,t.useState)(0),[l,c]=(0,t.useState)(!1);(0,t.useEffect)(()=>{const t=setInterval(()=>{const t=Date.now(),r=60*n*1e3,i=r-(t-e);i<=Math.min(3e4,.1*r)&&i>0&&!l?(o(!0),s(Math.ceil(i/1e3))):o(!1)},1e3);return()=>clearInterval(t)},[e,n,l]),(0,t.useEffect)(()=>{if(i){const e=setInterval(()=>{s(e=>e<=1?(o(!1),0):e-1)},1e3);return()=>clearInterval(e)}},[i]);const d=i?a/(60*n)*100:0;return(0,oi.jsx)(Vp,{children:i&&(0,oi.jsxs)(Hp,{initial:{opacity:0,x:300,scale:.9},animate:{opacity:1,x:0,scale:1},exit:{opacity:0,x:300,scale:.9},transition:{duration:.3,ease:"easeOut"},children:[(0,oi.jsxs)(Wp,{children:[(0,oi.jsxs)(qp,{children:[(0,oi.jsx)(bp,{size:16}),"Session Timeout Warning"]}),(0,oi.jsx)(Yp,{onClick:()=>{o(!1),c(!0),setTimeout(()=>{c(!1)},3e4)},children:(0,oi.jsx)(Up,{size:16})})]}),(0,oi.jsx)(Gp,{children:'Your session will expire soon due to inactivity. Click "Extend Session" to continue working.'}),(0,oi.jsx)(Kp,{children:(0,oi.jsx)(Qp,{initial:{width:"100%"},animate:{width:`${d}%`},transition:{duration:1,ease:"linear"}})}),(0,oi.jsxs)(Xp,{children:["Time remaining: ",(u=a,`${Math.floor(u/60)}:${(u%60).toString().padStart(2,"0")}`)]}),(0,oi.jsx)(Zp,{onClick:()=>{r(),o(!1),c(!0),setTimeout(()=>{c(!1)},3e4)},whileHover:{scale:1.02},whileTap:{scale:.98},children:"Extend Session"})]})});var u},eh=uu("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]),th=uu("CreditCard",[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]]),nh=uu("History",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]]),rh=uu("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]),ih=uu("FileText",[["path",{d:"M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z",key:"1nnpy2"}],["polyline",{points:"14 2 14 8 20 8",key:"1ew0cm"}],["line",{x1:"16",x2:"8",y1:"13",y2:"13",key:"14keom"}],["line",{x1:"16",x2:"8",y1:"17",y2:"17",key:"17nazh"}],["line",{x1:"10",x2:"8",y1:"9",y2:"9",key:"1a5vjj"}]]),oh=uu("FileCheck",[["path",{d:"M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z",key:"1nnpy2"}],["polyline",{points:"14 2 14 8 20 8",key:"1ew0cm"}],["path",{d:"m9 15 2 2 4-4",key:"1grp1n"}]]),ah=uu("ExternalLink",[["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}],["polyline",{points:"15 3 21 3 21 9",key:"mznyad"}],["line",{x1:"10",x2:"21",y1:"14",y2:"3",key:"18c3s4"}]]),sh=ei(cu.div)`
  width: 280px;
  background: ${e=>e.theme.colors.background||e.theme.colors.card};
  color: ${e=>e.theme.colors.textPrimary};
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  box-shadow: ${e=>e.theme.shadows.medium};
  border-radius: 0 24px 24px 0;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  ${e=>"glassmorphism"===e.theme.name&&"\n    background: rgba(255, 255, 255, 0.25);\n    backdrop-filter: blur(20px) saturate(180%);\n    border: 1px solid rgba(255, 255, 255, 0.3);\n    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);\n  "}
`,lh=ei.div`
  padding: 0 24px 32px 24px;
  border-bottom: 1px solid ${e=>e.theme.colors.borderPrimary};
  margin-bottom: 24px;
`,ch=ei.h2`
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, ${e=>e.theme.colors.accent} 0%, ${e=>e.theme.colors.accentHover} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
`,dh=ei.p`
  font-size: 12px;
  color: ${e=>e.theme.colors.textSecondary};
  margin: 4px 0 0 0;
  font-weight: 400;
`,uh=ei.div`
  padding: 0 16px;
  margin-bottom: 32px;
`,ph=ei.h3`
  font-size: 12px;
  font-weight: 600;
  color: ${e=>e.theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 16px 8px;
`,hh=ei(ze)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  margin-bottom: 4px;
  border-radius: 12px;
  color: ${e=>e.theme.colors.textSecondary};
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background: ${e=>e.theme.colors.tertiary};
    color: ${e=>e.theme.colors.textPrimary};
    transform: translateX(4px);
  }

  &.active {
    background: ${e=>e.theme.colors.tertiary};
    color: ${e=>e.theme.colors.textPrimary};
    border-left: 3px solid ${e=>e.theme.colors.accent};
    padding-left: 13px;
  }

  svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
`,fh=ei.a`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  margin-bottom: 4px;
  border-radius: 12px;
  color: ${e=>e.theme.colors.textSecondary};
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background: ${e=>e.theme.colors.tertiary};
    color: ${e=>e.theme.colors.textPrimary};
    transform: translateX(4px);
  }

  svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
`,mh=[{path:"/dashboard",label:"Dashboard",icon:eh},{path:"/profile",label:"Producer Profile",icon:Ku},{path:"/my-account",label:"Finances",icon:th},{path:"/payment-history",label:"Sales History",icon:nh},{path:"/beneficiaries",label:"Clients",icon:rh},{path:"/documents",label:"Beat Library",icon:ih},{path:"/applications",label:"Analytics",icon:oh}],gh=[{href:"#",label:"Spotify",icon:ah},{href:"#",label:"SoundCloud",icon:ah},{href:"#",label:"YouTube",icon:ah}];const xh=function(){var e;const{user:t}=si(),{theme:n}=fi(),r=(null===t||void 0===t||null===(e=t.name)||void 0===e?void 0:e.split(" ")[0])||"User";return(0,oi.jsxs)(sh,{theme:n,initial:{x:-280},animate:{x:0},transition:{duration:.3,ease:"easeOut"},children:[(0,oi.jsxs)(lh,{theme:n,children:[(0,oi.jsx)(ch,{theme:n,children:"Monexa"}),(0,oi.jsxs)(dh,{theme:n,children:[r,"'s Music Studio"]})]}),(0,oi.jsxs)(uh,{children:[(0,oi.jsx)(ph,{theme:n,children:"Studio Menu"}),mh.map(e=>(0,oi.jsxs)(hh,{to:e.path,theme:n,className:e=>{let{isActive:t}=e;return t?"active":""},children:[(0,oi.jsx)(e.icon,{}),e.label]},e.path))]}),(0,oi.jsxs)(uh,{children:[(0,oi.jsx)(ph,{theme:n,children:"Music Platforms"}),gh.map(e=>(0,oi.jsxs)(fh,{href:e.href,theme:n,children:[(0,oi.jsx)(e.icon,{}),e.label]},e.label))]})]})},yh=uu("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]),vh=uu("Bell",[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",key:"1qo2s2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}]]),bh=uu("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]),wh=uu("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]),kh=uu("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]),jh=ei.div`
  background: ${e=>e.theme.colors.background||e.theme.colors.card};
  border-bottom: 1px solid ${e=>e.theme.colors.borderPrimary};
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${e=>e.theme.shadows.small};
  ${e=>"glassmorphism"===e.theme.name&&"\n    background: rgba(255, 255, 255, 0.25);\n    backdrop-filter: blur(20px) saturate(180%);\n    border-bottom: 1px solid rgba(255, 255, 255, 0.3);\n    box-shadow: 0 4px 16px rgba(31, 38, 135, 0.25);\n  "}
`,Sh=ei.div`
  display: flex;
  align-items: center;
`,Ch=ei.h1`
         font-size: 24px;
         font-weight: 700;
         color: ${e=>e.theme.colors.textPrimary};
         margin: 0;
       `,Ph=ei.p`
         font-size: 12px;
         color: ${e=>e.theme.colors.textSecondary};
         margin: 0;
         font-weight: 400;
       `,Eh=ei.div`
  position: relative;
  margin-left: 48px;
`,Th=ei.input`
  width: 400px;
  padding: 12px 16px 12px 48px;
  border: 1px solid ${e=>e.theme.colors.inputBorder};
  border-radius: 12px;
  background: ${e=>e.theme.colors.input};
  font-size: 14px;
  color: ${e=>e.theme.colors.textPrimary};
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: ${e=>e.theme.colors.textTertiary};
  }

  &:focus {
    border-color: ${e=>e.theme.colors.inputFocusBorder};
    background: ${e=>e.theme.colors.inputFocus};
    box-shadow: 0 0 0 3px ${e=>e.theme.colors.inputFocusBorder}20;
  }
`,zh=ei(yh)`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: ${e=>e.theme.colors.textTertiary};
  width: 20px;
  height: 20px;
`,Ah=ei.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,_h=ei(cu.button)`
  background: none;
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  color: ${e=>e.theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.2s ease;

  &:hover {
    background: ${e=>e.theme.colors.tertiary};
    color: ${e=>e.theme.colors.textPrimary};
  }
`,Mh=ei.span`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 8px;
  height: 8px;
  background: #ef4444;
  border-radius: 50%;
  border: 2px solid #ffffff;
`,$h=ei.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background: #f1f5f9;
  }
`,Nh=ei(cu.div)`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  border: 1px solid #e2e8f0;
  padding: 8px;
  min-width: 200px;
  z-index: 1000;
`,Rh=ei.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 500;
  color: #1e293b;

  &:hover {
    background: #f1f5f9;
    color: #1a1a1a;
  }

  &.danger {
    color: #ef4444;
    
    &:hover {
      background: #fef2f2;
      color: #dc2626;
    }
  }
`,Lh=ei.div`
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 8px;
`,Dh=ei.div`
  font-weight: 600;
  color: #1e293b;
  font-size: 14px;
  margin-bottom: 2px;
`,Fh=ei.div`
  font-size: 12px;
  color: #64748b;
`,Oh=ei.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 16px;
`,Ih=ei.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`,Bh=ei.span`
  font-weight: 600;
  color: #1e293b;
  font-size: 14px;
`,Vh=ei.span`
  font-size: 12px;
  color: #64748b;
`;const Uh=function(){var e;const n=Z(),{user:r,logout:i}=si(),{theme:o}=fi(),[a,s]=(0,t.useState)(!1),l=(0,t.useRef)(null);return(0,t.useEffect)(()=>{const e=e=>{l.current&&!l.current.contains(e.target)&&s(!1)};return document.addEventListener("mousedown",e),()=>{document.removeEventListener("mousedown",e)}},[]),(0,oi.jsxs)(jh,{theme:o,children:[(0,oi.jsxs)(Sh,{children:[(0,oi.jsx)(Ch,{theme:o,children:"Monexa"}),(0,oi.jsxs)(Ph,{theme:o,children:[(null===r||void 0===r?void 0:r.name)||"User","'s Music Studio"]}),(0,oi.jsxs)(Eh,{children:[(0,oi.jsx)(zh,{theme:o}),(0,oi.jsx)(Th,{theme:o,placeholder:"Search beats, clients, sales..."})]})]}),(0,oi.jsxs)(Ah,{children:[(0,oi.jsxs)(_h,{theme:o,onClick:()=>n("/notifications"),whileHover:{scale:1.05},whileTap:{scale:.95},children:[(0,oi.jsx)(vh,{size:20}),(0,oi.jsx)(Mh,{})]}),(0,oi.jsx)(_h,{theme:o,onClick:()=>n("/settings"),whileHover:{scale:1.05},whileTap:{scale:.95},children:(0,oi.jsx)(bh,{size:20})}),(0,oi.jsxs)($h,{ref:l,onClick:()=>s(!a),children:[(0,oi.jsx)(Oh,{children:(null===r||void 0===r?void 0:r.avatar)||(null===r||void 0===r||null===(e=r.name)||void 0===e?void 0:e.split(" ").map(e=>e[0]).join("").toUpperCase())||"U"}),(0,oi.jsxs)(Ih,{children:[(0,oi.jsx)(Bh,{children:(null===r||void 0===r?void 0:r.name)||"User"}),(0,oi.jsx)(Vh,{children:(null===r||void 0===r?void 0:r.role)||"Music Producer"})]}),(0,oi.jsx)(wh,{size:16,color:"#64748b"}),a&&(0,oi.jsxs)(Nh,{initial:{opacity:0,y:-10,scale:.95},animate:{opacity:1,y:0,scale:1},transition:{duration:.2},children:[(0,oi.jsxs)(Lh,{children:[(0,oi.jsx)(Dh,{children:(null===r||void 0===r?void 0:r.name)||"User"}),(0,oi.jsx)(Fh,{children:(null===r||void 0===r?void 0:r.email)||"user@monexa.com"})]}),(0,oi.jsxs)(Rh,{onClick:()=>{n("/profile"),s(!1)},children:[(0,oi.jsx)(Ku,{size:16}),"View Profile"]}),(0,oi.jsxs)(Rh,{onClick:()=>{n("/settings"),s(!1)},children:[(0,oi.jsx)(bh,{size:16}),"Settings"]}),(0,oi.jsxs)(Rh,{className:"danger",onClick:()=>{i(),s(!1),dt.success("Logged out successfully",{position:"bottom-right",autoClose:2e3})},children:[(0,oi.jsx)(kh,{size:16}),"Sign Out"]})]})]})]})]})},Hh=uu("Printer",[["polyline",{points:"6 9 6 2 18 2 18 9",key:"1306q4"}],["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["rect",{width:"12",height:"8",x:"6",y:"14",key:"5ipwut"}]]),Wh=uu("DollarSign",[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]]),qh=uu("Euro",[["path",{d:"M4 10h12",key:"1y6xl8"}],["path",{d:"M4 14h9",key:"1loblj"}],["path",{d:"M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2",key:"1j6lzo"}]]),Yh=uu("PoundSterling",[["path",{d:"M18 7c0-5.333-8-5.333-8 0",key:"1prm2n"}],["path",{d:"M10 7v14",key:"18tmcs"}],["path",{d:"M6 21h12",key:"4dkmi1"}],["path",{d:"M6 13h10",key:"ybwr4a"}]]),Gh=uu("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]),Kh=uu("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]),Qh=ei.div`
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 24px;
  height: 100%;
  padding: 16px;
  max-width: 1400px;
  margin: 0 auto;
`,Xh=ei.div`
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 24px;
`,Zh=ei.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`,Jh=ei.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`,ef=ei(cu.div)`
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
  border-radius: 18px;
  padding: 36px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  min-height: 200px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%);
    border-radius: 50%;
    transform: translate(80px, -80px);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    transform: translate(-50px, 50px);
  }

  /* Floating particles */
  &::before {
    content: '';
    position: absolute;
    top: 20%;
    left: 10%;
    width: 4px;
    height: 4px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    animation: float 6s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: 60%;
    right: 15%;
    width: 6px;
    height: 6px;
    background: rgba(59, 130, 246, 0.8);
    border-radius: 50%;
    animation: float 8s ease-in-out infinite reverse;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
`,tf=ei.div`
  position: absolute;
  top: ${e=>e.top||"50%"};
  left: ${e=>e.left||"50%"};
  width: ${e=>e.size||"4px"};
  height: ${e=>e.size||"4px"};
  background: ${e=>e.color||"rgba(255, 255, 255, 0.6)"};
  border-radius: 50%;
  animation: float ${e=>e.duration||"6s"} ease-in-out infinite;
  animation-delay: ${e=>e.delay||"0s"};
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
`,nf=ei.div`
  flex: 1;
`,rf=ei.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 10px 0;
  color: #ffffff;
  line-height: 1.2;
  letter-spacing: -0.3px;
`,of=ei.p`
  font-size: 16px;
  color: #cbd5e1;
  margin: 0 0 24px 0;
  font-weight: 400;
  line-height: 1.5;
`,af=ei.div`
  display: flex;
  gap: 24px;
  margin-top: 16px;
`,sf=ei.div`
  text-align: center;
`,lf=ei.div`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 4px;
`,cf=ei.div`
  font-size: 12px;
  color: #cbd5e1;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,df=ei.button`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);

  &:hover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%);
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
  }

  &:active {
    transform: translateY(-1px);
  }
`,uf=ei.div`
  width: 160px;
  height: 200px;
  position: relative;
  margin-left: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%);
    border-radius: 20px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }
`,pf=ei(Hh)`
  position: absolute;
  top: 16px;
  right: 16px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: white;
    transform: scale(1.1);
  }
`,hf=ei(cu.div)`
  background: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(255, 255, 255, 0.25)":"white"}};
  backdrop-filter: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"blur(20px) saturate(180%)":"none"}};
  border: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"1px solid rgba(255, 255, 255, 0.3)":"1px solid #e2e8f0"}};
  border-radius: 16px;
  padding: 24px;
  box-shadow: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"0 8px 32px rgba(31, 38, 135, 0.37)":"0 4px 12px rgba(0, 0, 0, 0.05)"}};
  transition: all 0.2s ease;

  &:hover {
    box-shadow: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"0 12px 40px rgba(31, 38, 135, 0.45)":"0 8px 20px rgba(0, 0, 0, 0.08)"}};
    transform: translateY(-2px);
    background: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(255, 255, 255, 0.35)":"white"}};
  }
`,ff=ei.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,mf=ei.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
`,gf=ei.button`
  background: none;
  border: none;
  color: #3b82f6;
  font-weight: 500;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s ease;

  &:hover {
    color: #1d4ed8;
  }
`,xf=ei.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
`,yf=ei.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,vf=ei.span`
  font-size: 11px;
  color: #64748b;
  font-weight: 500;
`,bf=ei.span`
  font-size: 13px;
  color: #1e293b;
  font-weight: 600;
`,wf=ei.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  margin-bottom: 12px;
`,kf=ei.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,jf=ei.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 10px;
  background: #f8fafc;
`,Sf=ei.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${e=>"male"===e.gender?"linear-gradient(135deg, #3b82f6, #1d4ed8)":"linear-gradient(135deg, #ec4899, #be185d)"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
`,Cf=ei.div`
  flex: 1;
`,Pf=ei.div`
  font-weight: 600;
  color: #1e293b;
  font-size: 13px;
`,Ef=ei.div`
  font-size: 11px;
  color: #64748b;
`,Tf=ei.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,zf=ei.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`,Af=ei.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`,_f=ei.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`,Mf=ei.div`
  flex: 1;
`,$f=ei.div`
  font-size: 11px;
  color: #64748b;
  font-weight: 500;
`,Nf=ei.div`
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`,Rf=ei.div`
  width: 100%;
`,Lf=ei.div`
  display: grid;
  grid-template-columns: ${e=>e.columns||"50px 1fr 1fr 1fr 100px"};
  gap: 12px;
  padding: 12px 0;
  border-bottom: 2px solid #e2e8f0;
  font-weight: 600;
  color: #64748b;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: #f8fafc;
  border-radius: 8px 8px 0 0;
  margin: 0 -24px;
  padding: 12px 24px;
`,Df=ei.div`
  display: grid;
  grid-template-columns: ${e=>e.columns||"50px 1fr 1fr 1fr 100px"};
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f1f5f9;
  align-items: center;
  font-size: 13px;
  color: #1e293b;
  transition: background-color 0.2s ease;

  &:hover {
    background: #f8fafc;
    border-radius: 8px;
  }

  &:last-child {
    border-bottom: none;
  }
`,Ff=ei.div`
  font-weight: ${e=>e.bold?"600":"400"};
`,Of=ei.button`
  background: none;
  border: none;
  color: #3b82f6;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
    color: #1d4ed8;
  }
`,If=ei.button`
  background: #3b82f6;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: #1d4ed8;
    transform: translateY(-1px);
  }
`,Bf=ei.div`
  text-align: center;
  font-size: 12px;
  color: #64748b;
  margin-top: auto;
  padding: 16px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  font-weight: 500;
`,Vf=[{id:1,date:"Dec 15, 2024",beat:"Midnight Vibes",client:"Artist XYZ",amount:"$150"},{id:2,date:"Dec 12, 2024",beat:"Summer Heat",client:"Producer ABC",amount:"$200"},{id:3,date:"Dec 10, 2024",beat:"Urban Flow",client:"Rapper DEF",amount:"$180"},{id:4,date:"Dec 08, 2024",beat:"Chill Mode",client:"Singer GHI",amount:"$120"},{id:5,date:"Dec 05, 2024",beat:"Bass Drop",client:"Artist JKL",amount:"$250"}],Uf=[{id:1,title:"Midnight Vibes",date:"Dec 15, 2024",genre:"Hip-Hop",status:"Sold"},{id:2,title:"Summer Heat",date:"Dec 12, 2024",genre:"Trap",status:"Sold"},{id:3,title:"Urban Flow",date:"Dec 10, 2024",genre:"R&B",status:"Sold"},{id:4,title:"Chill Mode",date:"Dec 08, 2024",genre:"Lo-Fi",status:"Sold"},{id:5,title:"Bass Drop",date:"Dec 05, 2024",genre:"EDM",status:"Sold"},{id:6,title:"Neon Dreams",date:"Dec 01, 2024",genre:"Synthwave",status:"Available"},{id:7,title:"Street Beat",date:"Nov 28, 2024",genre:"Hip-Hop",status:"Available"},{id:8,title:"Ocean Waves",date:"Nov 25, 2024",genre:"Ambient",status:"Available"}],Hf=()=>{dt.success("Beat uploaded successfully!",{position:"bottom-right",autoClose:3e3})},Wf=()=>{dt.success("Beat downloaded successfully!",{position:"bottom-right",autoClose:3e3})};const qf=function(){var e;const{theme:t}=fi(),{user:n}=si(),r=(null===n||void 0===n||null===(e=n.name)||void 0===e?void 0:e.split(" ")[0])||"User";return(0,oi.jsxs)(Qh,{children:[(0,oi.jsxs)(Xh,{children:[(0,oi.jsxs)(ef,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:[(0,oi.jsx)(tf,{size:"3px",color:"rgba(255, 255, 255, 0.4)",top:"15%",left:"20%",duration:"7s",delay:"1s"}),(0,oi.jsx)(tf,{size:"5px",color:"rgba(59, 130, 246, 0.6)",top:"70%",left:"80%",duration:"9s",delay:"2s"}),(0,oi.jsx)(tf,{size:"2px",color:"rgba(255, 255, 255, 0.3)",top:"40%",left:"85%",duration:"5s",delay:"0.5s"}),(0,oi.jsxs)(nf,{children:[(0,oi.jsxs)(rf,{children:["Welcome back, ",r,"!"]}),(0,oi.jsx)(of,{children:"Your music empire dashboard - track sales, manage beats, and monitor your success"}),(0,oi.jsxs)(af,{children:[(0,oi.jsxs)(sf,{children:[(0,oi.jsx)(lf,{children:"47"}),(0,oi.jsx)(cf,{children:"Beats Sold"})]}),(0,oi.jsxs)(sf,{children:[(0,oi.jsx)(lf,{children:"$8,420"}),(0,oi.jsx)(cf,{children:"Total Revenue"})]}),(0,oi.jsxs)(sf,{children:[(0,oi.jsx)(lf,{children:"12"}),(0,oi.jsx)(cf,{children:"Available"})]})]}),(0,oi.jsx)(df,{children:"View Analytics"})]}),(0,oi.jsx)(uf,{children:(0,oi.jsx)("img",{src:"/images/young-man-headphones.png.png",alt:"Young man with headphones",style:{width:"100%",height:"100%",objectFit:"contain",filter:"drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))"}})}),(0,oi.jsx)(pf,{size:16})]}),(0,oi.jsxs)(Jh,{children:[(0,oi.jsxs)(hf,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.1},children:[(0,oi.jsx)(ff,{children:(0,oi.jsx)(mf,{children:"\ud83c\udfb5 Producer Profile"})}),(0,oi.jsx)(wf,{children:"\ud83c\udfa7"}),(0,oi.jsxs)(xf,{children:[(0,oi.jsxs)(yf,{children:[(0,oi.jsx)(vf,{children:"Producer Name"}),(0,oi.jsx)(bf,{children:(null===n||void 0===n?void 0:n.name)||"User"})]}),(0,oi.jsxs)(yf,{children:[(0,oi.jsx)(vf,{children:"Studio Since"}),(0,oi.jsx)(bf,{children:"January 2020"})]}),(0,oi.jsxs)(yf,{children:[(0,oi.jsx)(vf,{children:"Specialty"}),(0,oi.jsx)(bf,{children:(null===n||void 0===n?void 0:n.role)||"Music Producer"})]}),(0,oi.jsxs)(yf,{children:[(0,oi.jsx)(vf,{children:"Location"}),(0,oi.jsx)(bf,{children:"Nairobi, Kenya"})]})]})]}),(0,oi.jsxs)(hf,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.2},children:[(0,oi.jsx)(ff,{children:(0,oi.jsx)(mf,{children:"\ud83c\udfaf Top Clients"})}),(0,oi.jsxs)(kf,{children:[(0,oi.jsxs)(jf,{children:[(0,oi.jsx)(Sf,{gender:"male",children:"\ud83c\udfa4"}),(0,oi.jsxs)(Cf,{children:[(0,oi.jsx)(Pf,{children:"Artist XYZ"}),(0,oi.jsx)(Ef,{children:"5 beats \u2022 $750 total"})]})]}),(0,oi.jsxs)(jf,{children:[(0,oi.jsx)(Sf,{gender:"female",children:"\ud83c\udfb9"}),(0,oi.jsxs)(Cf,{children:[(0,oi.jsx)(Pf,{children:"Producer ABC"}),(0,oi.jsx)(Ef,{children:"3 beats \u2022 $600 total"})]})]})]})]})]}),(0,oi.jsxs)(hf,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.3},children:[(0,oi.jsxs)(ff,{children:[(0,oi.jsx)(mf,{children:"\ud83d\udcb0 Recent Sales"}),(0,oi.jsx)(gf,{children:"View All"})]}),(0,oi.jsxs)(Rf,{children:[(0,oi.jsxs)(Lf,{children:[(0,oi.jsx)("div",{children:"#"}),(0,oi.jsx)("div",{children:"Date"}),(0,oi.jsx)("div",{children:"Beat"}),(0,oi.jsx)("div",{children:"Client"}),(0,oi.jsx)("div",{children:"Amount"})]}),Vf.map(e=>(0,oi.jsxs)(Df,{children:[(0,oi.jsx)(Ff,{children:e.id}),(0,oi.jsx)(Ff,{children:e.date}),(0,oi.jsx)(Ff,{children:e.beat}),(0,oi.jsx)(Ff,{children:e.client}),(0,oi.jsx)(Ff,{bold:!0,children:e.amount})]},e.id))]})]}),(0,oi.jsxs)(Bf,{children:["Last updated: December 15, 2024 \u2022 Monexa - ",(null===n||void 0===n?void 0:n.name)||"User","'s Music Studio"]})]}),(0,oi.jsxs)(Zh,{children:[(0,oi.jsxs)(hf,{initial:{opacity:0,x:20},animate:{opacity:1,x:0},transition:{duration:.5,delay:.4},children:[(0,oi.jsx)(zf,{children:"\ud83d\udcb0 Account Balance"}),(0,oi.jsxs)(Tf,{children:[(0,oi.jsxs)(Af,{children:[(0,oi.jsx)(_f,{children:(0,oi.jsx)(Wh,{size:16})}),(0,oi.jsxs)(Mf,{children:[(0,oi.jsx)($f,{children:"Dollar"}),(0,oi.jsx)(Nf,{children:"$20,000.00"})]})]}),(0,oi.jsxs)(Af,{children:[(0,oi.jsx)(_f,{children:(0,oi.jsx)(qh,{size:16})}),(0,oi.jsxs)(Mf,{children:[(0,oi.jsx)($f,{children:"Euro"}),(0,oi.jsx)(Nf,{children:"\u20ac 20,000.00"})]})]}),(0,oi.jsxs)(Af,{children:[(0,oi.jsx)(_f,{children:(0,oi.jsx)(Yh,{size:16})}),(0,oi.jsxs)(Mf,{children:[(0,oi.jsx)($f,{children:"Pound"}),(0,oi.jsx)(Nf,{children:"\xa3 20,000.00"})]})]})]})]}),(0,oi.jsxs)(hf,{initial:{opacity:0,x:20},animate:{opacity:1,x:0},transition:{duration:.5,delay:.5},children:[(0,oi.jsxs)(ff,{children:[(0,oi.jsx)(mf,{children:"\ud83c\udfb5 Beat Library"}),(0,oi.jsxs)(If,{onClick:Hf,children:[(0,oi.jsx)(Gh,{size:14}),"Upload Beat"]})]}),(0,oi.jsxs)(Rf,{children:[(0,oi.jsxs)(Lf,{columns:"50px 1fr 1fr 1fr 80px",children:[(0,oi.jsx)("div",{children:"#"}),(0,oi.jsx)("div",{children:"Title"}),(0,oi.jsx)("div",{children:"Genre"}),(0,oi.jsx)("div",{children:"Status"}),(0,oi.jsx)("div",{children:"Action"})]}),Uf.map(e=>(0,oi.jsxs)(Df,{columns:"50px 1fr 1fr 1fr 80px",children:[(0,oi.jsx)(Ff,{children:e.id}),(0,oi.jsx)(Ff,{children:e.title}),(0,oi.jsx)(Ff,{children:e.genre}),(0,oi.jsx)(Ff,{children:(0,oi.jsx)("span",{style:{color:"Sold"===e.status?"#10b981":"#3b82f6",fontWeight:"600",fontSize:"11px",padding:"2px 8px",borderRadius:"12px",background:"Sold"===e.status?"#d1fae5":"#dbeafe"},children:e.status})}),(0,oi.jsx)(Ff,{children:(0,oi.jsx)(Of,{onClick:Wf,children:(0,oi.jsx)(Kh,{size:14})})})]},e.id))]})]})]})]})},Yf=uu("PenSquare",[["path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1qinfi"}],["path",{d:"M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z",key:"w2jsv5"}]]),Gf=uu("Key",[["circle",{cx:"7.5",cy:"15.5",r:"5.5",key:"yqb3hr"}],["path",{d:"m21 2-9.6 9.6",key:"1j0ho8"}],["path",{d:"m15.5 7.5 3 3L22 7l-3-3",key:"1rn1fs"}]]),Kf=uu("Save",[["path",{d:"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z",key:"1owoqh"}],["polyline",{points:"17 21 17 13 7 13 7 21",key:"1md35c"}],["polyline",{points:"7 3 7 8 15 8",key:"8nz8an"}]]),Qf=ei(cu.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`,Xf=ei(cu.div)`
  background: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(255, 255, 255, 0.25)":e.theme.colors.card}};
  backdrop-filter: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"blur(20px) saturate(180%)":"none"}};
  border: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"1px solid rgba(255, 255, 255, 0.3)":"none"}};
  border-radius: 20px;
  padding: 32px;
  max-width: 400px;
  width: 100%;
  box-shadow: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"0 8px 32px rgba(31, 38, 135, 0.37)":e.theme.shadows.large}};
  position: relative;
`,Zf=ei.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${e=>e.theme.colors.borderPrimary};
`,Jf=ei.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
`,em=ei.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"#1a237e":e.theme.colors.textPrimary}};
  margin: 0;
`,tm=ei.p`
  font-size: 14px;
  color: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"#283593":e.theme.colors.textSecondary}};
  margin: 0;
  line-height: 1.5;
`,nm=ei.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: ${e=>e.theme.colors.textSecondary};
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${e=>e.theme.colors.tertiary};
    color: ${e=>e.theme.colors.textPrimary};
  }
`,rm=ei.div`
  position: relative;
  margin-bottom: 24px;
`,im=ei.input`
  width: 100%;
  padding: 14px 18px;
  padding-right: 45px;
  border: 2px solid ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(156, 204, 101, 0.4)":e.theme.colors.inputBorder}};
  border-radius: 10px;
  font-size: 14px;
  color: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"#1a237e":e.theme.colors.textPrimary}};
  background: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(255, 255, 255, 0.2)":e.theme.colors.input}};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"#4caf50":"#1a1a1a"}};
    box-shadow: 0 0 0 3px ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(76, 175, 80, 0.1)":"rgba(26, 26, 26, 0.1)"}};
    background: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(255, 255, 255, 0.3)":e.theme.colors.input}};
  }

  &::placeholder {
    color: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"#3949ab":"#94a3b8"}};
  }

  &.error {
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }
`,om=ei.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: #1e293b;
    background: #f1f5f9;
  }
`,am=ei.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,sm=ei(cu.button)`
  background: linear-gradient(135deg, #1a1a1a, #333333);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  font-size: 14px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    background: #cbd5e1;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  &.secondary {
    background: #f1f5f9;
    color: #64748b;

    &:hover {
      background: #e2e8f0;
      color: #1e293b;
    }
  }
`,lm=ei.div`
  color: #ef4444;
  font-size: 12px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
`,cm=e=>{let{isOpen:n,onClose:r,onVerify:i,title:o="Verify Password",description:a="Enter your current password to continue",loading:s=!1,error:l=null}=e;const[c,d]=(0,t.useState)(""),[u,p]=(0,t.useState)(!1),{theme:h}=fi(),f=()=>{d(""),p(!1),r()};return(0,oi.jsx)(Vp,{children:n&&(0,oi.jsx)(Qf,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:f,children:(0,oi.jsxs)(Xf,{theme:h,initial:{scale:.9,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.9,opacity:0},onClick:e=>e.stopPropagation(),children:[(0,oi.jsx)(nm,{theme:h,onClick:f,children:(0,oi.jsx)(Up,{size:20})}),(0,oi.jsxs)(Zf,{theme:h,children:[(0,oi.jsx)(Jf,{children:(0,oi.jsx)(gu,{size:20})}),(0,oi.jsxs)("div",{children:[(0,oi.jsx)(em,{theme:h,children:o}),(0,oi.jsx)(tm,{theme:h,children:a})]})]}),(0,oi.jsxs)("form",{onSubmit:e=>{e.preventDefault(),c.trim()&&i(c)},children:[(0,oi.jsxs)(rm,{children:[(0,oi.jsx)(im,{theme:h,type:u?"text":"password",value:c,onChange:e=>d(e.target.value),placeholder:"Enter your current password",className:l?"error":"",disabled:s,autoFocus:!0}),(0,oi.jsx)(om,{type:"button",onClick:()=>p(!u),disabled:s,children:u?(0,oi.jsx)(xu,{size:16}):(0,oi.jsx)(yu,{size:16})})]}),l&&(0,oi.jsxs)(lm,{children:[(0,oi.jsx)(Up,{size:12}),l]}),(0,oi.jsxs)(am,{children:[(0,oi.jsx)(sm,{type:"button",className:"secondary",onClick:f,disabled:s,whileHover:{scale:1.02},whileTap:{scale:.98},children:"Cancel"}),(0,oi.jsx)(sm,{type:"submit",disabled:!c.trim()||s,whileHover:{scale:1.02},whileTap:{scale:.98},children:s?"Verifying...":"Verify"})]})]})]})})})},dm=uu("AlertCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]),um=uu("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]),pm=ei(cu.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`,hm=ei(cu.div)`
  background: white;
  border-radius: 20px;
  padding: 32px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
`,fm=ei.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
`,mm=ei.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
`,gm=ei.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
`,xm=ei.p`
  font-size: 14px;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
`,ym=ei.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
    color: #1e293b;
  }
`,vm=ei.div`
  margin-bottom: 20px;
`,bm=ei.label`
  display: block;
  font-weight: 600;
  color: #1e293b;
  font-size: 14px;
  margin-bottom: 8px;
`,wm=ei.div`
  position: relative;
`,km=ei.input`
  width: 100%;
  padding: 14px 18px;
  padding-right: 45px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 14px;
  color: #1e293b;
  background: white;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #1a1a1a;
    box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }

  &.error {
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }

  &.success {
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
`,jm=ei.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: #1e293b;
    background: #f1f5f9;
  }
`,Sm=ei.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`,Cm=ei(cu.button)`
  background: linear-gradient(135deg, #1a1a1a, #333333);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  font-size: 14px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    background: #cbd5e1;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  &.secondary {
    background: #f1f5f9;
    color: #64748b;

    &:hover {
      background: #e2e8f0;
      color: #1e293b;
    }
  }
`,Pm=ei.div`
  color: #ef4444;
  font-size: 12px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
`,Em=ei.div`
  margin-top: 12px;
  font-size: 12px;
  color: #64748b;
`,Tm=ei.div`
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
  margin-top: 4px;
  overflow: hidden;
`,zm=ei.div`
  height: 100%;
  background: ${e=>"weak"===e.strength?"#ef4444":"medium"===e.strength?"#f59e0b":"strong"===e.strength?"#10b981":"#e2e8f0"};
  width: ${e=>"weak"===e.strength?"33%":"medium"===e.strength?"66%":"strong"===e.strength?"100%":"0%"};
  transition: all 0.3s ease;
`,Am=ei.div`
  margin-top: 12px;
  font-size: 12px;
  color: #64748b;
`,_m=ei.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
  color: ${e=>e.met?"#10b981":"#64748b"};
`,Mm=ei.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
`,$m=ei.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: ${e=>e.active?"#1a1a1a":"#64748b"};
`,Nm=ei.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${e=>e.active?"#1a1a1a":"#cbd5e1"};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
`,Rm=e=>{let{isOpen:n,onClose:r,onPasswordChange:i,loading:o=!1,error:a=null}=e;const[s,l]=(0,t.useState)(!1),[c,d]=(0,t.useState)(null),[u,p]=(0,t.useState)(1),[h,f]=(0,t.useState)(""),[m,g]=(0,t.useState)(""),[x,y]=(0,t.useState)(""),[v,b]=(0,t.useState)({current:!1,new:!1,confirm:!1}),[w,k]=(0,t.useState)({score:0,strength:"weak",requirements:{length:!1,uppercase:!1,lowercase:!1,number:!1,special:!1}});(0,t.useEffect)(()=>{m&&(e=>{const t={length:e.length>=8,uppercase:/[A-Z]/.test(e),lowercase:/[a-z]/.test(e),number:/\d/.test(e),special:/[!@#$%^&*(),.?":{}|<>]/.test(e)},n=Object.values(t).filter(Boolean).length;let r="weak";n>=4?r="strong":n>=3&&(r="medium"),k({score:n,strength:r,requirements:t})})(m)},[m]);const j=()=>{p(1),f(""),g(""),y(""),b({current:!1,new:!1,confirm:!1}),r()},S=e=>{b(t=>({...t,[e]:!t[e]}))};return(0,oi.jsx)(Vp,{children:n&&(0,oi.jsx)(pm,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:j,children:(0,oi.jsxs)(hm,{initial:{scale:.9,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.9,opacity:0},onClick:e=>e.stopPropagation(),children:[(0,oi.jsx)(ym,{onClick:j,children:(0,oi.jsx)(Up,{size:20})}),(0,oi.jsxs)(fm,{children:[(0,oi.jsx)(mm,{children:(0,oi.jsx)(Gf,{size:20})}),(0,oi.jsxs)("div",{children:[(0,oi.jsx)(gm,{children:"Change Password"}),(0,oi.jsx)(xm,{children:1===u?"First, verify your current password":"Enter your new password"})]})]}),(0,oi.jsxs)(Mm,{children:[(0,oi.jsxs)($m,{active:1===u,children:[(0,oi.jsx)(Nm,{active:1===u,children:"1"}),"Verify Current"]}),(0,oi.jsxs)($m,{active:2===u,children:[(0,oi.jsx)(Nm,{active:2===u,children:"2"}),"New Password"]})]}),1===u?(0,oi.jsxs)("form",{onSubmit:e=>{e.preventDefault(),(async()=>{if(h.trim()){l(!0),d(null);try{const e=await fetch("http://localhost:5000/api/users/verify-password",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("monexa_token")}`},body:JSON.stringify({password:h})}),t=await e.json();t.success?(p(2),d(null)):(d(t.error||"Current password is incorrect"),f(""))}catch(a){console.error("Password verification error:",a),d("An error occurred while verifying password"),f("")}finally{l(!1)}}})()},children:[(0,oi.jsxs)(vm,{children:[(0,oi.jsx)(bm,{children:"Current Password"}),(0,oi.jsxs)(wm,{children:[(0,oi.jsx)(km,{type:v.current?"text":"password",value:h,onChange:e=>f(e.target.value),placeholder:"Enter your current password",disabled:s,autoFocus:!0}),(0,oi.jsx)(jm,{type:"button",onClick:()=>S("current"),disabled:s,children:v.current?(0,oi.jsx)(xu,{size:16}):(0,oi.jsx)(yu,{size:16})})]}),c&&(0,oi.jsxs)(Pm,{children:[(0,oi.jsx)(dm,{size:12}),c]})]}),(0,oi.jsxs)(Sm,{children:[(0,oi.jsx)(Cm,{type:"button",className:"secondary",onClick:j,disabled:s,whileHover:{scale:1.02},whileTap:{scale:.98},children:"Cancel"}),(0,oi.jsx)(Cm,{type:"submit",disabled:!h.trim()||s,whileHover:{scale:1.02},whileTap:{scale:.98},children:s?"Verifying...":"Verify & Continue"})]})]}):(0,oi.jsxs)("form",{onSubmit:e=>{e.preventDefault(),m.trim()&&x.trim()&&m===x&&(w.score<3||i(h,m))},children:[(0,oi.jsxs)(vm,{children:[(0,oi.jsx)(bm,{children:"New Password"}),(0,oi.jsxs)(wm,{children:[(0,oi.jsx)(km,{type:v.new?"text":"password",value:m,onChange:e=>g(e.target.value),placeholder:"Enter new password",className:m?w.score>=3?"success":"error":"",disabled:o,autoFocus:!0}),(0,oi.jsx)(jm,{type:"button",onClick:()=>S("new"),disabled:o,children:v.new?(0,oi.jsx)(xu,{size:16}):(0,oi.jsx)(yu,{size:16})})]}),m&&(0,oi.jsxs)(oi.Fragment,{children:[(0,oi.jsxs)(Em,{children:["Password Strength: ",w.strength.charAt(0).toUpperCase()+w.strength.slice(1),(0,oi.jsx)(Tm,{children:(0,oi.jsx)(zm,{strength:w.strength})})]}),(0,oi.jsxs)(Am,{children:[(0,oi.jsxs)(_m,{met:w.requirements.length,children:[w.requirements.length?(0,oi.jsx)(um,{size:12}):(0,oi.jsx)(dm,{size:12}),"At least 8 characters"]}),(0,oi.jsxs)(_m,{met:w.requirements.uppercase,children:[w.requirements.uppercase?(0,oi.jsx)(um,{size:12}):(0,oi.jsx)(dm,{size:12}),"One uppercase letter"]}),(0,oi.jsxs)(_m,{met:w.requirements.lowercase,children:[w.requirements.lowercase?(0,oi.jsx)(um,{size:12}):(0,oi.jsx)(dm,{size:12}),"One lowercase letter"]}),(0,oi.jsxs)(_m,{met:w.requirements.number,children:[w.requirements.number?(0,oi.jsx)(um,{size:12}):(0,oi.jsx)(dm,{size:12}),"One number"]}),(0,oi.jsxs)(_m,{met:w.requirements.special,children:[w.requirements.special?(0,oi.jsx)(um,{size:12}):(0,oi.jsx)(dm,{size:12}),"One special character"]})]})]})]}),(0,oi.jsxs)(vm,{children:[(0,oi.jsx)(bm,{children:"Confirm New Password"}),(0,oi.jsxs)(wm,{children:[(0,oi.jsx)(km,{type:v.confirm?"text":"password",value:x,onChange:e=>y(e.target.value),placeholder:"Confirm new password",className:x?m===x?"success":"error":"",disabled:o}),(0,oi.jsx)(jm,{type:"button",onClick:()=>S("confirm"),disabled:o,children:v.confirm?(0,oi.jsx)(xu,{size:16}):(0,oi.jsx)(yu,{size:16})})]})]}),a&&(0,oi.jsxs)(Pm,{children:[(0,oi.jsx)(dm,{size:12}),a]}),(0,oi.jsxs)(Sm,{children:[(0,oi.jsx)(Cm,{type:"button",className:"secondary",onClick:()=>p(1),disabled:o,whileHover:{scale:1.02},whileTap:{scale:.98},children:"Back"}),(0,oi.jsx)(Cm,{type:"submit",disabled:!m.trim()||!x.trim()||m!==x||w.score<3||o,whileHover:{scale:1.02},whileTap:{scale:.98},children:o?"Changing Password...":"Change Password"})]})]})]})})})},Lm=ei.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`,Dm=ei.div`
  margin-bottom: 32px;
`,Fm=ei.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
`,Om=ei.p`
  color: #64748b;
  font-size: 16px;
`,Im=ei(cu.div)`
  background: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(255, 255, 255, 0.25)":"white"}};
  backdrop-filter: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"blur(20px) saturate(180%)":"none"}};
  border: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"1px solid rgba(255, 255, 255, 0.3)":"1px solid #e2e8f0"}};
  border-radius: 16px;
  padding: 32px;
  box-shadow: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"0 8px 32px rgba(31, 38, 135, 0.37)":"0 4px 20px rgba(0, 0, 0, 0.08)"}};
`,Bm=ei.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 32px;
`,Vm=ei.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1a1a1a, #333333);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 32px;
  font-weight: 600;
`,Um=ei.div`
  flex: 1;
`,Hm=ei.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"#1a237e":"#1e293b"}};
  margin-bottom: 4px;
`,Wm=ei.p`
  color: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"#283593":"#64748b"}};
  font-size: 16px;
  margin-bottom: 8px;
`,qm=ei.button`
  background: linear-gradient(135deg, #1a1a1a, #333333);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
`,Ym=ei.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
`,Gm=ei.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Km=ei.label`
  font-weight: 600;
  color: #1e293b;
  font-size: 14px;
`,Qm=ei.input`
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #1a1a1a;
    box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
  }
`,Xm=ei.textarea`
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #1a1a1a;
    box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
  }
`,Zm=ei.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,Jm=ei.button`
  background: linear-gradient(135deg, #1a1a1a, #333333);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
`,eg=ei.button`
  background: #f1f5f9;
  color: #64748b;
  border: 2px solid #e2e8f0;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: #e2e8f0;
    color: #1e293b;
  }
`,tg=()=>{var e;const{user:n,updateProfile:r}=si(),{theme:i}=fi(),[o,a]=(0,t.useState)(!1),[s,l]=(0,t.useState)({name:"",email:"",phone:"",location:"",specialty:"",experience:"",bio:""}),[c,d]=(0,t.useState)(!1),[u,p]=(0,t.useState)(!1),[h,f]=(0,t.useState)(!1),[m,g]=(0,t.useState)(null);(0,t.useEffect)(()=>{n&&l({name:n.name||"",email:n.email||"",phone:n.phone||"",location:n.location||"",specialty:n.role||"Music Producer",experience:n.experience||"",bio:n.bio||`Professional ${n.role||"music producer"} passionate about creating amazing music.`})},[n]);const x=e=>{l({...s,[e.target.name]:e.target.value})};return(0,oi.jsxs)(Lm,{children:[(0,oi.jsxs)(Dm,{children:[(0,oi.jsxs)(Fm,{children:[(0,oi.jsx)(Ku,{size:28}),"Producer Profile"]}),(0,oi.jsx)(Om,{children:"Manage your professional information and studio details"})]}),(0,oi.jsxs)(Im,{theme:i,initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6},children:[(0,oi.jsxs)(Bm,{children:[(0,oi.jsx)(Vm,{children:(null===n||void 0===n?void 0:n.avatar)||(null===n||void 0===n||null===(e=n.name)||void 0===e?void 0:e.split(" ").map(e=>e[0]).join("").toUpperCase())||"U"}),(0,oi.jsxs)(Um,{children:[(0,oi.jsx)(Hm,{theme:i,children:s.name||(null===n||void 0===n?void 0:n.name)||"User"}),(0,oi.jsx)(Wm,{theme:i,children:s.specialty||(null===n||void 0===n?void 0:n.role)||"Music Producer"})]}),!o&&(0,oi.jsxs)(oi.Fragment,{children:[(0,oi.jsxs)(qm,{onClick:()=>{a(!0)},children:[(0,oi.jsx)(Yf,{size:16}),"Edit Profile"]}),(0,oi.jsxs)(qm,{onClick:()=>p(!0),style:{marginLeft:"12px",background:"linear-gradient(135deg, #ef4444, #dc2626)"},children:[(0,oi.jsx)(Gf,{size:16}),"Change Password"]})]})]}),(0,oi.jsxs)(Ym,{children:[(0,oi.jsxs)(Gm,{children:[(0,oi.jsx)(Km,{children:"Full Name"}),(0,oi.jsx)(Qm,{name:"name",value:s.name,onChange:x,disabled:!o})]}),(0,oi.jsxs)(Gm,{children:[(0,oi.jsx)(Km,{children:"Email"}),(0,oi.jsx)(Qm,{name:"email",value:s.email,onChange:x,disabled:!o})]}),(0,oi.jsxs)(Gm,{children:[(0,oi.jsx)(Km,{children:"Phone"}),(0,oi.jsx)(Qm,{name:"phone",value:s.phone,onChange:x,disabled:!o})]}),(0,oi.jsxs)(Gm,{children:[(0,oi.jsx)(Km,{children:"Location"}),(0,oi.jsx)(Qm,{name:"location",value:s.location,onChange:x,disabled:!o})]}),(0,oi.jsxs)(Gm,{children:[(0,oi.jsx)(Km,{children:"Specialty"}),(0,oi.jsx)(Qm,{name:"specialty",value:s.specialty,onChange:x,disabled:!o})]}),(0,oi.jsxs)(Gm,{children:[(0,oi.jsx)(Km,{children:"Experience"}),(0,oi.jsx)(Qm,{name:"experience",value:s.experience,onChange:x,disabled:!o})]})]}),(0,oi.jsxs)(Gm,{children:[(0,oi.jsx)(Km,{children:"Bio"}),(0,oi.jsx)(Xm,{name:"bio",value:s.bio,onChange:x,disabled:!o})]}),o&&(0,oi.jsxs)(Zm,{children:[(0,oi.jsxs)(eg,{onClick:()=>{a(!1)},children:[(0,oi.jsx)(Up,{size:16}),"Cancel"]}),(0,oi.jsxs)(Jm,{onClick:()=>{g(null),d(!0)},children:[(0,oi.jsx)(Kf,{size:16}),"Save Changes"]})]})]}),(0,oi.jsx)(cm,{isOpen:c,onClose:()=>d(!1),onVerify:async e=>{f(!0),g(null);try{const t={...s,currentPassword:e},n=await r(t);n.success?(d(!1),f(!1),a(!1),dt.success("Profile updated successfully!",{position:"bottom-right",autoClose:3e3})):(g(n.error||"Failed to update profile"),f(!1))}catch(t){g("An error occurred while updating profile"),f(!1)}},title:"Verify Password",description:"Enter your current password to save profile changes",loading:h,error:m}),(0,oi.jsx)(Rm,{isOpen:u,onClose:()=>p(!1),onPasswordChange:async(e,t)=>{f(!0),g(null);try{const n=await fetch("http://localhost:5000/api/users/password",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("monexa_token")}`},body:JSON.stringify({currentPassword:e,newPassword:t})}),r=await n.json();r.success?(p(!1),f(!1),dt.success("Password changed successfully! Please log in again with your new password.",{position:"bottom-right",autoClose:5e3}),setTimeout(()=>{},2e3)):(g(r.error||"Failed to change password"),f(!1))}catch(n){console.error("Password change error:",n),g("An error occurred while changing password"),f(!1)}},loading:h,error:m})]})},ng=uu("Target",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]]),rg=uu("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]),ig=uu("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]),og=ei(cu.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`,ag=ei(cu.div)`
  background: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(255, 255, 255, 0.25)":"white"}};
  backdrop-filter: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"blur(20px) saturate(180%)":"none"}};
  border: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"1px solid rgba(255, 255, 255, 0.3)":"none"}};
  border-radius: 16px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"0 8px 32px rgba(31, 38, 135, 0.37)":"none"}};
`,sg=ei.div`
  padding: 24px 24px 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 24px;
`,lg=ei.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"#1a237e":"#1f2937"}};
  display: flex;
  align-items: center;
  gap: 8px;
`,cg=ei.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
  }
`,dg=ei.div`
  padding: 0 24px 24px 24px;
`,ug=ei.div`
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 24px;
`,pg=ei.button`
  padding: 12px 24px;
  border: none;
  background: none;
  font-weight: 500;
  color: ${e=>e.active?"#3b82f6":"#6b7280"};
  border-bottom: 2px solid ${e=>e.active?"#3b82f6":"transparent"};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #3b82f6;
  }
`,hg=ei.div`
  display: grid;
  gap: 16px;
`,fg=ei.div`
  border: 1px solid ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(156, 204, 101, 0.3)":"#e5e7eb"}};
  border-radius: 12px;
  padding: 20px;
  background: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(255, 255, 255, 0.25)":"#f8fafc"}};
  backdrop-filter: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"blur(10px) saturate(150%)":"none"}};
  transition: all 0.2s;

  &:hover {
    border-color: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"#4caf50":"#3b82f6"}};
    box-shadow: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"0 4px 16px rgba(31, 38, 135, 0.25)":"0 4px 12px rgba(59, 130, 246, 0.1)"}};
    background: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(255, 255, 255, 0.35)":"#f8fafc"}};
  }
`,mg=ei.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,gg=ei.div`
  flex: 1;
`,xg=ei.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"#1a237e":"#1f2937"}};
  margin-bottom: 4px;
`,yg=ei.p`
  color: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"#283593":"#6b7280"}};
  font-size: 0.9rem;
  margin-bottom: 8px;
`,vg=ei.div`
  display: flex;
  gap: 16px;
  font-size: 0.85rem;
  color: #6b7280;
`,bg=ei.div`
  display: flex;
  gap: 8px;
`,wg=ei.button`
  padding: 6px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &.delete {
    background: #fef2f2;
    color: #dc2626;

    &:hover {
      background: #fee2e2;
    }
  }

  &.progress {
    background: #f0f9ff;
    color: #3b82f6;

    &:hover {
      background: #e0f2fe;
    }
  }
`,kg=ei.div`
  background: #e5e7eb;
  border-radius: 8px;
  height: 8px;
  margin: 12px 0;
  overflow: hidden;
`,jg=ei.div`
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
  height: 100%;
  width: ${e=>Math.min(e.percentage,100)}%;
  transition: width 0.3s ease;
`,Sg=ei.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #374151;
  font-weight: 500;
`,Cg=ei.form`
  display: grid;
  gap: 20px;
`,Pg=ei.div`
  display: grid;
  gap: 8px;
`,Eg=ei.label`
  font-weight: 500;
  color: #374151;
`,Tg=ei.input`
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`,zg=ei.textarea`
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`,Ag=ei.select`
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`,_g=ei.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`,Mg=ei.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  &.primary {
    background: #3b82f6;
    color: white;

    &:hover {
      background: #2563eb;
    }

    &:disabled {
      background: #9ca3af;
      cursor: not-allowed;
    }
  }

  &.secondary {
    background: #f3f4f6;
    color: #374151;

    &:hover {
      background: #e5e7eb;
    }
  }
`,$g=ei.div`
  text-align: center;
  padding: 48px 24px;
  color: #6b7280;
`,Ng=ei.div`
  width: 64px;
  height: 64px;
  background: #f3f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px auto;
`,Rg=e=>{let{isOpen:n,onClose:r}=e;const{theme:i}=fi(),[o,a]=(0,t.useState)("view"),[s,l]=(0,t.useState)([]),[c,d]=(0,t.useState)(!1),[u,p]=(0,t.useState)({title:"",description:"",target_amount:"",target_date:"",category:"general"});(0,t.useEffect)(()=>{n&&h()},[n]);const h=async()=>{try{d(!0);const e=await ii.getGoals();e.success&&l(e.goals)}catch(e){console.error("Failed to load goals:",e),dt.error("Failed to load goals")}finally{d(!1)}},f=e=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(e);return(0,oi.jsx)(Vp,{children:n&&(0,oi.jsx)(og,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:r,children:(0,oi.jsxs)(ag,{theme:i,initial:{scale:.9,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.9,opacity:0},onClick:e=>e.stopPropagation(),children:[(0,oi.jsxs)(sg,{children:[(0,oi.jsxs)(lg,{children:[(0,oi.jsx)(ng,{size:24}),"Financial Goals"]}),(0,oi.jsx)(cg,{onClick:r,children:(0,oi.jsx)(Up,{size:20})})]}),(0,oi.jsxs)(dg,{children:[(0,oi.jsxs)(ug,{children:[(0,oi.jsx)(pg,{active:"view"===o,onClick:()=>a("view"),children:"My Goals"}),(0,oi.jsx)(pg,{active:"create"===o,onClick:()=>a("create"),children:"Create Goal"})]}),"view"===o&&(0,oi.jsx)(oi.Fragment,{children:c?(0,oi.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading goals..."}):s.length>0?(0,oi.jsx)(hg,{children:s.map(e=>{return(0,oi.jsxs)(fg,{children:[(0,oi.jsxs)(mg,{children:[(0,oi.jsxs)(gg,{children:[(0,oi.jsx)(xg,{children:e.title}),e.description&&(0,oi.jsx)(yg,{children:e.description}),(0,oi.jsxs)(vg,{children:[(0,oi.jsxs)("span",{children:["Target: ",(r=e.target_date,new Date(r).toLocaleDateString())]}),(0,oi.jsxs)("span",{children:["Category: ",e.category]}),(0,oi.jsxs)("span",{children:["Status: ",e.status]})]})]}),(0,oi.jsxs)(bg,{children:[(0,oi.jsx)(wg,{className:"progress",onClick:()=>(async e=>{const t=prompt("Enter amount to add to goal progress:");if(!(!t||isNaN(t)||parseFloat(t)<=0))try{(await ii.updateGoalProgress(e,parseFloat(t))).success&&(dt.success("Goal progress updated!"),h())}catch(n){console.error("Failed to update goal progress:",n),dt.error("Failed to update goal progress")}})(e.id),title:"Add Progress",children:(0,oi.jsx)(rg,{size:16})}),(0,oi.jsx)(wg,{className:"delete",onClick:()=>(async e=>{if(window.confirm("Are you sure you want to delete this goal?"))try{(await ii.deleteGoal(e)).success&&(dt.success("Goal deleted successfully!"),h())}catch(t){console.error("Failed to delete goal:",t),dt.error("Failed to delete goal")}})(e.id),title:"Delete Goal",children:(0,oi.jsx)(ig,{size:16})})]})]}),(0,oi.jsx)(kg,{children:(0,oi.jsx)(jg,{percentage:(t=e.current_amount,n=e.target_amount,t/n*100)})}),(0,oi.jsxs)(Sg,{children:[(0,oi.jsxs)("span",{children:[f(e.current_amount)," saved"]}),(0,oi.jsxs)("span",{children:[f(e.target_amount)," target"]})]})]},e.id);var t,n,r})}):(0,oi.jsxs)($g,{children:[(0,oi.jsx)(Ng,{children:(0,oi.jsx)(ng,{size:32,color:"#9ca3af"})}),(0,oi.jsx)("h3",{children:"No goals yet"}),(0,oi.jsx)("p",{children:"Create your first financial goal to start tracking your progress!"})]})}),"create"===o&&(0,oi.jsxs)(Cg,{onSubmit:async e=>{e.preventDefault();try{d(!0);(await ii.createGoal(u)).success&&(dt.success("Goal created successfully!"),p({title:"",description:"",target_amount:"",target_date:"",category:"general"}),a("view"),h())}catch(t){console.error("Failed to create goal:",t),dt.error("Failed to create goal")}finally{d(!1)}},children:[(0,oi.jsxs)(Pg,{children:[(0,oi.jsx)(Eg,{children:"Goal Title *"}),(0,oi.jsx)(Tg,{type:"text",value:u.title,onChange:e=>p({...u,title:e.target.value}),placeholder:"e.g., Emergency Fund, Vacation, New Car",required:!0})]}),(0,oi.jsxs)(Pg,{children:[(0,oi.jsx)(Eg,{children:"Description"}),(0,oi.jsx)(zg,{value:u.description,onChange:e=>p({...u,description:e.target.value}),placeholder:"Optional description of your goal..."})]}),(0,oi.jsxs)(Pg,{children:[(0,oi.jsx)(Eg,{children:"Target Amount *"}),(0,oi.jsx)(Tg,{type:"number",min:"0.01",step:"0.01",value:u.target_amount,onChange:e=>p({...u,target_amount:e.target.value}),placeholder:"0.00",required:!0})]}),(0,oi.jsxs)(Pg,{children:[(0,oi.jsx)(Eg,{children:"Target Date *"}),(0,oi.jsx)(Tg,{type:"date",value:u.target_date,onChange:e=>p({...u,target_date:e.target.value}),min:(new Date).toISOString().split("T")[0],required:!0})]}),(0,oi.jsxs)(Pg,{children:[(0,oi.jsx)(Eg,{children:"Category"}),(0,oi.jsxs)(Ag,{value:u.category,onChange:e=>p({...u,category:e.target.value}),children:[(0,oi.jsx)("option",{value:"general",children:"General"}),(0,oi.jsx)("option",{value:"emergency",children:"Emergency Fund"}),(0,oi.jsx)("option",{value:"vacation",children:"Vacation"}),(0,oi.jsx)("option",{value:"house",children:"House/Property"}),(0,oi.jsx)("option",{value:"car",children:"Car/Vehicle"}),(0,oi.jsx)("option",{value:"education",children:"Education"}),(0,oi.jsx)("option",{value:"retirement",children:"Retirement"}),(0,oi.jsx)("option",{value:"health",children:"Health"}),(0,oi.jsx)("option",{value:"business",children:"Business"})]})]}),(0,oi.jsxs)(_g,{children:[(0,oi.jsx)(Mg,{type:"button",className:"secondary",onClick:()=>a("view"),children:"Cancel"}),(0,oi.jsx)(Mg,{type:"submit",className:"primary",disabled:c,children:c?"Creating...":"Create Goal"})]})]})]})]})})})},Lg=uu("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]),Dg=uu("Minus",[["path",{d:"M5 12h14",key:"1ays0h"}]]),Fg=uu("Wallet",[["path",{d:"M21 12V7H5a2 2 0 0 1 0-4h14v4",key:"195gfw"}],["path",{d:"M3 5v14a2 2 0 0 0 2 2h16v-5",key:"195n9w"}],["path",{d:"M18 12a2 2 0 0 0 0 4h4v-4Z",key:"vllfpd"}]]),Og=uu("HelpCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]]),Ig=uu("Zap",[["polygon",{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2",key:"45s27k"}]]),Bg=uu("CheckCircle",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]),Vg=uu("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]),Ug=uu("Calendar",[["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",ry:"2",key:"eu3xkr"}],["line",{x1:"16",x2:"16",y1:"2",y2:"6",key:"m3sa8f"}],["line",{x1:"8",x2:"8",y1:"2",y2:"6",key:"18kwsl"}],["line",{x1:"3",x2:"21",y1:"10",y2:"10",key:"xt86sb"}]]),Hg=ei.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
`,Wg=ei.div`
  margin-bottom: 32px;
`,qg=ei.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
`,Yg=ei.p`
  color: #64748b;
  font-size: 16px;
`,Gg=ei.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
`,Kg=(ei.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
`,ei.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
`,ei(cu.div)`
  background: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(255, 255, 255, 0.25)":"white"}};
  backdrop-filter: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"blur(20px) saturate(180%)":"none"}};
  border: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"1px solid rgba(255, 255, 255, 0.3)":"1px solid #e2e8f0"}};
  border-radius: 20px;
  padding: 28px;
  box-shadow: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"0 8px 32px rgba(31, 38, 135, 0.37)":"0 6px 24px rgba(0, 0, 0, 0.08)"}};
  min-height: 280px;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"0 12px 40px rgba(31, 38, 135, 0.45)":"0 8px 32px rgba(0, 0, 0, 0.12)"}};
    transform: translateY(-2px);
    background: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(255, 255, 255, 0.35)":"white"}};
  }
`),Qg=ei.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"#1a237e":"#1e293b"}};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`,Xg=ei(cu.div)`
  background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
  border-radius: 24px;
  padding: 40px;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  min-height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`,Zg=ei.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`,Jg=ei.h3`
  font-size: 18px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  gap: 8px;
`,ex=ei.div`
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
`,tx=ei.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 24px;
`,nx=ei.div`
  display: flex;
  gap: 12px;
`,rx=ei(cu.button)`
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 10px 16px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  backdrop-filter: blur(10px);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-1px);
  }

  &.primary {
    background: linear-gradient(135deg, #10b981, #059669);
    border: none;

    &:hover {
      background: linear-gradient(135deg, #059669, #047857);
    }
  }
`,ix=ei.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
`,ox=ei(cu.div)`
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 2px solid #e2e8f0;
  border-radius: 20px;
  padding: 32px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 200px;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    border-color: #1a1a1a;
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
  }

  &.active {
    border-color: #1a1a1a;
    background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
    color: white;
  }

  &.visa {
    background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
    color: white;
    border-color: #1a1a1a;
  }

  &.mastercard {
    background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
    color: white;
    border-color: #ff6b35;
  }
`,ax=ei.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,sx=ei.div`
  font-weight: 700;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
`,lx=ei.div`
  font-family: 'Courier New', monospace;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 3px;
  margin-bottom: 16px;
  text-align: center;
`,cx=ei.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  opacity: 0.9;
  margin-top: auto;
`,dx=ei(cu.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(8px);
`,ux=ei(cu.div)`
  background: white;
  border-radius: 20px;
  padding: 32px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`,px=ei.h3`
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`,hx=ei.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 16px;
  margin-bottom: 16px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #1a1a1a;
    box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
  }
`,fx=ei.div`
  display: flex;
  gap: 12px;
`,mx=ei(cu.button)`
  flex: 1;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;

  &.primary {
    background: linear-gradient(135deg, #1a1a1a, #333333);
    color: white;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }
  }

  &.secondary {
    background: #f1f5f9;
    color: #64748b;
    border: 2px solid #e2e8f0;

    &:hover {
      background: #e2e8f0;
      color: #1e293b;
    }
  }
`,gx=ei.div`
  margin-top: 24px;
`,xx=ei.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,yx=ei(cu.button)`
  background: none;
  border: none;
  color: #1a1a1a;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
  }
`,vx=ei.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,bx=ei(cu.div)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: #f1f5f9;
    transform: translateX(4px);
  }
`,wx=ei.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: ${e=>"deposit"===e.type?"linear-gradient(135deg, #10b981, #059669)":"withdrawal"===e.type?"linear-gradient(135deg, #ef4444, #dc2626)":"payment"===e.type?"linear-gradient(135deg, #3b82f6, #1d4ed8)":"linear-gradient(135deg, #1a1a1a, #333333)"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
`,kx=ei.div`
  flex: 1;
`,jx=ei.div`
  font-weight: 600;
  color: #1e293b;
  font-size: 14px;
  margin-bottom: 4px;
`,Sx=ei.div`
  font-size: 12px;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 4px;
`,Cx=ei.div`
  font-weight: 700;
  color: ${e=>"deposit"===e.type?"#10b981":"withdrawal"===e.type?"#ef4444":"payment"===e.type?"#3b82f6":"#1e293b"};
  font-size: 16px;
`,Px=ei.div`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${e=>"completed"===e.status?"#dcfce7":"pending"===e.status?"#fef3c7":"failed"===e.status?"#fee2e2":"#f1f5f9"};
  color: ${e=>"completed"===e.status?"#166534":"pending"===e.status?"#92400e":"failed"===e.status?"#991b1b":"#64748b"};
`,Ex=ei.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  margin-bottom: 32px;
`,Tx=ei(cu.button)`
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 2px solid #e2e8f0;
  border-radius: 18px;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 600;
  color: #1e293b;
  font-size: 14px;

  &:hover {
    border-color: #1a1a1a;
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }

  .icon {
    width: 40px;
    height: 40px;
    border-radius: 14px;
    background: linear-gradient(135deg, #1a1a1a, #333333);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
`,zx={balance:25450.75,currency:"USD",lastUpdated:"2024-12-15"},Ax=()=>{const e=Z(),{user:n}=si(),{theme:r}=fi(),[i,o]=(0,t.useState)([]),[a,s]=(0,t.useState)([]),[l,c]=(0,t.useState)(!0),[d,u]=(0,t.useState)(!1),[p,h]=(0,t.useState)(""),[f,m]=(0,t.useState)(""),[g,x]=(0,t.useState)({}),[y,v]=(0,t.useState)(!1),[b,w]=(0,t.useState)(null);(0,t.useEffect)(()=>{k()},[]);const k=async()=>{try{c(!0);const[e,t]=await Promise.all([ii.getCards(),ii.getTransactions({limit:5})]);e.success&&o(e.cards),t.success&&s(t.transactions)}catch(e){console.error("Failed to load data:",e),dt.error("Failed to load account data")}finally{c(!1)}},j=e=>{switch(e){case"deposit":return(0,oi.jsx)(Lg,{size:16});case"withdrawal":return(0,oi.jsx)(Dg,{size:16});case"payment":return(0,oi.jsx)(th,{size:16});default:return(0,oi.jsx)(Wh,{size:16})}};return(0,oi.jsxs)(Hg,{children:[(0,oi.jsxs)(Wg,{children:[(0,oi.jsxs)(qg,{children:[(0,oi.jsx)(Fg,{size:28}),"Finances"]}),(0,oi.jsx)(Yg,{children:"Manage your wallet, cards, and financial transactions"})]}),(0,oi.jsx)(Ex,{children:[{title:"Add Card",icon:(0,oi.jsx)(th,{size:20}),action:"addCard"},{title:"Set Goal",icon:(0,oi.jsx)(ng,{size:20}),action:"setGoal"},{title:"Export Data",icon:(0,oi.jsx)(Kh,{size:20}),action:"exportData"},{title:"Notifications",icon:(0,oi.jsx)(vh,{size:20}),action:"notifications"},{title:"Settings",icon:(0,oi.jsx)(bh,{size:20}),action:"settings"},{title:"Help",icon:(0,oi.jsx)(Og,{size:20}),action:"help"}].map(t=>(0,oi.jsxs)(Tx,{onClick:()=>(t=>{switch(t){case"addCard":e("/cards"),dt.success("Redirecting to card management...",{position:"bottom-right",autoClose:2e3});break;case"setGoal":console.log("Opening Goals Modal..."),v(!0);break;case"exportData":dt.success("Financial data exported successfully!",{position:"bottom-right",autoClose:3e3});break;case"notifications":e("/notifications"),dt.success("Redirecting to notifications...",{position:"bottom-right",autoClose:2e3});break;case"settings":e("/settings"),dt.success("Redirecting to settings...",{position:"bottom-right",autoClose:2e3});break;case"help":dt.info("Help and support coming soon!",{position:"bottom-right",autoClose:3e3})}})(t.action),whileHover:{scale:1.02},whileTap:{scale:.98},children:[(0,oi.jsx)("div",{className:"icon",children:t.icon}),t.title]},t.action))}),(0,oi.jsxs)(Gg,{children:[(0,oi.jsxs)(Xg,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6},children:[(0,oi.jsxs)(Zg,{children:[(0,oi.jsxs)(Jg,{children:[(0,oi.jsx)(Fg,{size:24}),"Digital Wallet"]}),(0,oi.jsx)(pu,{size:24,color:"rgba(255, 255, 255, 0.7)"})]}),(0,oi.jsxs)(ex,{children:[(0,oi.jsx)(Wh,{size:36}),"$",zx.balance.toLocaleString()]}),(0,oi.jsxs)(tx,{children:["Last updated: ",zx.lastUpdated]}),(0,oi.jsxs)(nx,{children:[(0,oi.jsxs)(rx,{onClick:()=>{dt.info("Deposit functionality coming soon - will integrate with payment gateway!",{position:"bottom-right",autoClose:3e3})},whileHover:{scale:1.02},whileTap:{scale:.98},className:"primary",children:[(0,oi.jsx)(Lg,{size:18}),"Deposit"]}),(0,oi.jsxs)(rx,{onClick:()=>{dt.info("Withdraw functionality coming soon - will integrate with bank APIs!",{position:"bottom-right",autoClose:3e3})},whileHover:{scale:1.02},whileTap:{scale:.98},children:[(0,oi.jsx)(Dg,{size:18}),"Withdraw"]}),(0,oi.jsxs)(rx,{onClick:()=>{e("/beneficiaries"),dt.success("Redirecting to beneficiaries for payments...",{position:"bottom-right",autoClose:2e3})},whileHover:{scale:1.02},whileTap:{scale:.98},children:[(0,oi.jsx)(Ig,{size:18}),"Pay"]})]})]}),(0,oi.jsxs)(Kg,{theme:r,initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.1},children:[(0,oi.jsxs)(Qg,{theme:r,children:[(0,oi.jsx)(th,{size:22}),"Payment Cards"]}),(0,oi.jsxs)(ix,{style:{flex:1},children:[i.slice(0,2).map(e=>(0,oi.jsxs)(ox,{onClick:()=>(e=>{w(e),h("view"),u(!0)})(e),whileHover:{scale:1.02},whileTap:{scale:.98},className:`${e.isDefault?"active":""} ${e.type.toLowerCase()}`,children:[(0,oi.jsxs)(ax,{children:[(0,oi.jsxs)(sx,{children:[(0,oi.jsx)(th,{size:20}),e.type,e.isDefault&&(0,oi.jsx)(Bg,{size:16})]}),(0,oi.jsx)(gu,{size:18})]}),(0,oi.jsx)(lx,{children:g[e.id]?e.number:"**** **** **** ****"}),(0,oi.jsxs)(cx,{children:[(0,oi.jsxs)("div",{children:[(0,oi.jsx)("div",{style:{fontSize:"12px",opacity:.8,marginBottom:"4px"},children:"Card Holder"}),(0,oi.jsx)("div",{style:{fontWeight:"600"},children:e.holder})]}),(0,oi.jsxs)("div",{children:[(0,oi.jsx)("div",{style:{fontSize:"12px",opacity:.8,marginBottom:"4px"},children:"Expires"}),(0,oi.jsx)("div",{style:{fontWeight:"600"},children:g[e.id]?e.expiry:"**/**"})]}),(0,oi.jsxs)("div",{children:[(0,oi.jsx)("div",{style:{fontSize:"12px",opacity:.8,marginBottom:"4px"},children:"CVV"}),(0,oi.jsx)("div",{style:{fontWeight:"600"},children:e.cvv})]})]})]},e.id)),i.length>2&&(0,oi.jsxs)(yx,{onClick:()=>e("/cards"),whileHover:{scale:1.02},whileTap:{scale:.98},style:{marginTop:"16px",padding:"12px 20px",background:"linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",border:"2px solid #e2e8f0",borderRadius:"12px",width:"100%",justifyContent:"center"},children:["View All Cards (",i.length,")",(0,oi.jsx)(Vg,{size:16})]})]})]})]}),(0,oi.jsx)(Kg,{theme:r,initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.2},style:{minHeight:"auto"},children:(0,oi.jsxs)(gx,{children:[(0,oi.jsxs)(xx,{children:[(0,oi.jsxs)(Qg,{theme:r,children:[(0,oi.jsx)(rg,{size:22}),"Recent Transactions"]}),(0,oi.jsxs)(yx,{onClick:()=>{dt.info("Redirecting to full transaction history...",{position:"bottom-right",autoClose:2e3}),e("/transaction-history")},whileHover:{scale:1.02},whileTap:{scale:.98},children:["View All",(0,oi.jsx)(Vg,{size:16})]})]}),(0,oi.jsx)(vx,{children:a.map(e=>(0,oi.jsxs)(bx,{whileHover:{x:4},transition:{duration:.2},children:[(0,oi.jsx)(wx,{type:e.type,children:j(e.type)}),(0,oi.jsxs)(kx,{children:[(0,oi.jsx)(jx,{children:e.title}),(0,oi.jsxs)(Sx,{children:[(0,oi.jsx)(Ug,{size:12}),e.date," at ",e.time]})]}),(0,oi.jsxs)("div",{style:{textAlign:"right"},children:[(0,oi.jsx)(Cx,{type:e.type,children:e.amount}),(0,oi.jsx)(Px,{status:e.status,children:e.status})]})]},e.id))})]})}),(0,oi.jsx)(Vp,{children:d&&(0,oi.jsx)(dx,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:(0,oi.jsxs)(ux,{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.8,opacity:0},children:[(0,oi.jsxs)(px,{children:[(0,oi.jsx)(gu,{size:20}),"view"===p?"View Card Details":"deposit"===p?"Deposit Funds":"withdraw"===p?"Withdraw Funds":"Make Payment"]}),(0,oi.jsx)("div",{style:{marginBottom:"16px",color:"#64748b",fontSize:"14px"},children:"Enter your 4-digit PIN to continue"}),(0,oi.jsx)(hx,{type:"password",placeholder:"Enter PIN",value:f,onChange:e=>m(e.target.value),maxLength:4,style:{textAlign:"center",letterSpacing:"8px",fontSize:"18px"}}),(0,oi.jsxs)(fx,{children:[(0,oi.jsx)(mx,{className:"secondary",onClick:()=>{u(!1),m("")},whileHover:{scale:1.02},whileTap:{scale:.98},children:"Cancel"}),(0,oi.jsx)(mx,{className:"primary",onClick:()=>{"1234"===f?("view"===p?(x(e=>({...e,[b.id]:!0})),dt.success("Card details revealed!",{position:"bottom-right",autoClose:2e3})):dt.success(`${p.charAt(0).toUpperCase()+p.slice(1)} initiated successfully!`,{position:"bottom-right",autoClose:3e3}),u(!1),m("")):dt.error("Incorrect PIN!",{position:"bottom-right",autoClose:3e3})},whileHover:{scale:1.02},whileTap:{scale:.98},children:"Continue"})]})]})})}),(0,oi.jsx)(Rg,{isOpen:y,onClose:()=>v(!1)})]})},_x=uu("Filter",[["polygon",{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3",key:"1yg77f"}]]),Mx=ei.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`,$x=ei.div`
  margin-bottom: 32px;
`,Nx=ei.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
`,Rx=ei.p`
  color: #64748b;
  font-size: 16px;
`,Lx=ei.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 24px;
`,Dx=ei.input`
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  min-width: 300px;
  background: white;
  color: #1e293b;
  transition: all 0.2s ease;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: #1a1a1a;
    box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
  }
`,Fx=ei.button`
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  padding: 12px 16px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  color: #64748b;

  &:hover {
    background: #f1f5f9;
    border-color: #1a1a1a;
    color: #1e293b;
  }
`,Ox=ei(cu.button)`
  background: linear-gradient(135deg, #1a1a1a, #333333);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
`,Ix=ei(cu.div)`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  overflow: hidden;
`,Bx=ei.div`
  width: 100%;
`,Vx=ei.div`
  display: grid;
  grid-template-columns: 60px 2fr 1fr 1fr 1fr 100px;
  gap: 16px;
  padding: 20px 24px;
  background: #f8fafc;
  border-bottom: 2px solid #e2e8f0;
  font-weight: 600;
  color: #64748b;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,Ux=ei(cu.div)`
  display: grid;
  grid-template-columns: 60px 2fr 1fr 1fr 1fr 100px;
  gap: 16px;
  padding: 16px 24px;
  align-items: center;
  border-bottom: 1px solid #f1f5f9;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: #f8fafc;
  }

  &:last-child {
    border-bottom: none;
  }
`,Hx=ei.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,Wx=ei.div`
  font-weight: 600;
  color: #1e293b;
  font-size: 14px;
`,qx=ei.div`
  font-size: 12px;
  color: #64748b;
`,Yx=ei.div`
  font-weight: 600;
  color: #1e293b;
  font-size: 14px;
`,Gx=ei.div`
  color: #64748b;
  font-size: 14px;
`,Kx=ei.div`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${e=>"Completed"===e.status?"#d1fae5":"Pending"===e.status?"#fef3c7":"#fee2e2"};
  color: ${e=>"Completed"===e.status?"#065f46":"Pending"===e.status?"#92400e":"#991b1b"};
  text-align: center;
`,Qx=ei.div`
  display: flex;
  gap: 8px;
  align-items: center;
`,Xx=ei.button`
  background: none;
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f1f5f9;
    color: #1a1a1a;
    transform: scale(1.1);
  }
`,Zx=[{id:1,title:"Midnight Vibes",client:"Artist XYZ",amount:"$150",date:"Dec 15, 2024",status:"Completed"},{id:2,title:"Summer Heat",client:"Producer ABC",amount:"$200",date:"Dec 12, 2024",status:"Completed"},{id:3,title:"Urban Flow",client:"Rapper DEF",amount:"$180",date:"Dec 10, 2024",status:"Pending"},{id:4,title:"Chill Mode",client:"Singer GHI",amount:"$120",date:"Dec 08, 2024",status:"Completed"},{id:5,title:"Bass Drop",client:"Artist JKL",amount:"$250",date:"Dec 05, 2024",status:"Completed"},{id:6,title:"Neon Dreams",client:"Producer MNO",amount:"$175",date:"Dec 01, 2024",status:"Failed"},{id:7,title:"Street Beat",client:"Rapper PQR",amount:"$160",date:"Nov 28, 2024",status:"Completed"},{id:8,title:"Ocean Waves",client:"Artist STU",amount:"$140",date:"Nov 25, 2024",status:"Completed"}],Jx=()=>{const[e,n]=(0,t.useState)(""),r=Zx.filter(t=>t.title.toLowerCase().includes(e.toLowerCase())||t.client.toLowerCase().includes(e.toLowerCase()));return(0,oi.jsxs)(Mx,{children:[(0,oi.jsxs)($x,{children:[(0,oi.jsxs)(Nx,{children:[(0,oi.jsx)(nh,{size:28}),"Sales History"]}),(0,oi.jsx)(Rx,{children:"Track all your beat sales and payment transactions"})]}),(0,oi.jsxs)(Lx,{children:[(0,oi.jsx)(Dx,{placeholder:"Search by beat title or client...",value:e,onChange:e=>n(e.target.value)}),(0,oi.jsxs)(Fx,{children:[(0,oi.jsx)(_x,{size:16}),"Filter"]}),(0,oi.jsxs)(Ox,{onClick:()=>{dt.success("Payment history exported successfully!",{position:"bottom-right",autoClose:3e3})},whileHover:{scale:1.02},whileTap:{scale:.98},children:[(0,oi.jsx)(Kh,{size:16}),"Export"]})]}),(0,oi.jsx)(Ix,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6},children:(0,oi.jsxs)(Bx,{children:[(0,oi.jsxs)(Vx,{children:[(0,oi.jsx)("div",{children:"#"}),(0,oi.jsx)("div",{children:"Transaction"}),(0,oi.jsx)("div",{children:"Amount"}),(0,oi.jsx)("div",{children:"Date"}),(0,oi.jsx)("div",{children:"Status"}),(0,oi.jsx)("div",{children:"Actions"})]}),r.map((e,t)=>(0,oi.jsxs)(Ux,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{duration:.4,delay:.05*t},children:[(0,oi.jsx)("div",{children:e.id}),(0,oi.jsxs)(Hx,{children:[(0,oi.jsx)(Wx,{children:e.title}),(0,oi.jsx)(qx,{children:e.client})]}),(0,oi.jsx)(Yx,{children:e.amount}),(0,oi.jsx)(Gx,{children:e.date}),(0,oi.jsx)(Kx,{status:e.status,children:e.status}),(0,oi.jsxs)(Qx,{children:[(0,oi.jsx)(Xx,{onClick:()=>{return t=e.id,void dt.info(`Viewing transaction ${t}...`,{position:"bottom-right",autoClose:2e3});var t},children:(0,oi.jsx)(yu,{size:16})}),(0,oi.jsx)(Xx,{onClick:()=>{return t=e.id,void dt.success(`Downloading receipt for transaction ${t}...`,{position:"bottom-right",autoClose:3e3});var t},children:(0,oi.jsx)(Kh,{size:16})})]})]},e.id))]})})]})},ey=uu("XCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]),ty=uu("ChevronUp",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]),ny=uu("MoreVertical",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"12",cy:"5",r:"1",key:"gxeob9"}],["circle",{cx:"12",cy:"19",r:"1",key:"lyex9k"}]]),ry=ei.div`
  width: 100%;
  margin: 0;
  padding: 0;
`,iy=ei.div`
  margin-bottom: 32px;
  padding: 24px 24px 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,oy=ei.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,ay=ei(cu.button)`
  background: none;
  border: none;
  color: #1a1a1a;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
  }
`,sy=ei.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
`,ly=ei.p`
  color: #64748b;
  font-size: 16px;
  margin: 0;
`,cy=ei.div`
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 0 24px 24px 24px;
`,dy=ei.div`
  position: relative;
  flex: 1;
  max-width: 400px;
`,uy=ei.input`
  width: 100%;
  padding: 12px 16px 12px 44px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #1a1a1a;
    box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
  }
`,py=ei.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
`,hy=ei(cu.button)`
  background: white;
  border: 2px solid #e2e8f0;
  color: #64748b;
  padding: 12px 16px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    border-color: #1a1a1a;
    color: #1a1a1a;
  }

  &.active {
    background: #1a1a1a;
    color: white;
    border-color: #1a1a1a;
  }
`,fy=ei(cu.button)`
  background: linear-gradient(135deg, #1a1a1a, #333333);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
`,my=ei(cu.div)`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  z-index: 100;
  min-width: 200px;
  margin-top: 8px;
`,gy=ei.div`
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`,xy=ei.div`
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
  font-size: 14px;
`,yy=ei.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,vy=ei.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #64748b;
  transition: all 0.2s ease;

  &:hover {
    color: #1a1a1a;
  }

  input[type="checkbox"] {
    accent-color: #1a1a1a;
  }
`,by=ei.div`
  display: flex;
  gap: 8px;
  align-items: center;
`,wy=ei.input`
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 12px;
  flex: 1;

  &:focus {
    outline: none;
    border-color: #1a1a1a;
  }
`,ky=ei.div`
  background: white;
  border-radius: 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  overflow: hidden;
  width: 100%;
  height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
`,jy=ei.div`
  display: grid;
  grid-template-columns: 60px 1fr 120px 120px 120px 120px 100px;
  gap: 24px;
  padding: 20px 40px;
  background: #f8fafc;
  border-bottom: 2px solid #e2e8f0;
  font-weight: 600;
  color: #64748b;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: sticky;
  top: 0;
  z-index: 10;
  flex-shrink: 0;
`,Sy=ei.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
`,Cy=ei(cu.div)`
  display: grid;
  grid-template-columns: 60px 1fr 120px 120px 120px 120px 100px;
  gap: 24px;
  padding: 16px 40px;
  align-items: center;
  border-bottom: 1px solid #f1f5f9;
  transition: all 0.2s ease;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    background: #f8fafc;
  }

  &:last-child {
    border-bottom: none;
  }
`,Py=ei.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: ${e=>"deposit"===e.type?"linear-gradient(135deg, #10b981, #059669)":"withdrawal"===e.type?"linear-gradient(135deg, #ef4444, #dc2626)":"payment"===e.type?"linear-gradient(135deg, #3b82f6, #1d4ed8)":"linear-gradient(135deg, #1a1a1a, #333333)"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
`,Ey=ei.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,Ty=ei.div`
  font-weight: 600;
  color: #1e293b;
  font-size: 14px;
`,zy=ei.div`
  font-size: 12px;
  color: #64748b;
  font-family: 'Courier New', monospace;
`,Ay=ei.div`
  font-size: 14px;
  color: #1e293b;
  font-weight: 500;
`,_y=ei.div`
  font-size: 12px;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 4px;
`,My=ei.div`
  font-weight: 700;
  color: ${e=>"deposit"===e.type?"#10b981":"withdrawal"===e.type?"#ef4444":"payment"===e.type?"#3b82f6":"#1e293b"};
  font-size: 16px;
`,$y=ei.div`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 4px;
  background: ${e=>"completed"===e.status?"#dcfce7":"pending"===e.status?"#fef3c7":"failed"===e.status?"#fee2e2":"#f1f5f9"};
  color: ${e=>"completed"===e.status?"#166534":"pending"===e.status?"#92400e":"failed"===e.status?"#991b1b":"#64748b"};
`,Ny=ei(cu.button)`
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
    color: #1a1a1a;
  }
`,Ry=[{id:1,title:"Beat Sale - Midnight Vibes",amount:"+$150.00",type:"deposit",date:"Dec 15, 2024",time:"14:30",status:"completed",reference:"TXN-001",description:"Sold to Client: John Doe"},{id:2,title:"Studio Equipment Purchase",amount:"-$200.00",type:"withdrawal",date:"Dec 12, 2024",time:"09:15",status:"completed",reference:"TXN-002",description:"Audio Interface - Focusrite"},{id:3,title:"Beat Sale - Summer Heat",amount:"+$200.00",type:"deposit",date:"Dec 10, 2024",time:"16:45",status:"completed",reference:"TXN-003",description:"Sold to Client: Sarah Wilson"},{id:4,title:"Software License Renewal",amount:"-$80.00",type:"payment",date:"Dec 08, 2024",time:"11:20",status:"pending",reference:"TXN-004",description:"FL Studio Annual License"},{id:5,title:"Beat Sale - Urban Flow",amount:"+$180.00",type:"deposit",date:"Dec 05, 2024",time:"13:10",status:"completed",reference:"TXN-005",description:"Sold to Client: Mike Johnson"},{id:6,title:"Microphone Purchase",amount:"-$350.00",type:"withdrawal",date:"Dec 03, 2024",time:"10:30",status:"completed",reference:"TXN-006",description:"Shure SM7B Microphone"},{id:7,title:"Beat Sale - Night Rider",amount:"+$120.00",type:"deposit",date:"Dec 01, 2024",time:"15:20",status:"completed",reference:"TXN-007",description:"Sold to Client: Alex Brown"},{id:8,title:"Website Hosting",amount:"-$45.00",type:"payment",date:"Nov 28, 2024",time:"08:45",status:"completed",reference:"TXN-008",description:"Monthly hosting fee"},{id:9,title:"Beat Sale - Golden Hour",amount:"+$250.00",type:"deposit",date:"Nov 25, 2024",time:"17:30",status:"completed",reference:"TXN-009",description:"Sold to Client: David Lee"},{id:10,title:"Studio Rent Payment",amount:"-$500.00",type:"withdrawal",date:"Nov 20, 2024",time:"12:00",status:"completed",reference:"TXN-010",description:"Monthly studio rent"}],Ly=()=>{const e=Z(),[n,r]=(0,t.useState)(""),[i,o]=(0,t.useState)(!1),[a,s]=(0,t.useState)(["deposit","withdrawal","payment"]),[l,c]=(0,t.useState)(["completed","pending","failed"]),[d,u]=(0,t.useState)(""),[p,h]=(0,t.useState)(""),f=e=>{switch(e){case"deposit":return(0,oi.jsx)(Lg,{size:16});case"withdrawal":return(0,oi.jsx)(Dg,{size:16});case"payment":return(0,oi.jsx)(th,{size:16});default:return(0,oi.jsx)(Wh,{size:16})}},m=e=>{switch(e){case"completed":return(0,oi.jsx)(Bg,{size:12});case"pending":return(0,oi.jsx)(bp,{size:12});case"failed":return(0,oi.jsx)(ey,{size:12});default:return(0,oi.jsx)(dm,{size:12})}},g=Ry.filter(e=>{const t=e.title.toLowerCase().includes(n.toLowerCase())||e.reference.toLowerCase().includes(n.toLowerCase()),r=a.includes(e.type),i=l.includes(e.status);return t&&r&&i});return(0,oi.jsxs)(ry,{children:[(0,oi.jsx)(iy,{children:(0,oi.jsxs)(oy,{children:[(0,oi.jsxs)(ay,{onClick:()=>{dt.info("Returning to Finances...",{position:"bottom-right",autoClose:2e3}),e("/my-account")},whileHover:{scale:1.02},whileTap:{scale:.98},children:[(0,oi.jsx)(fu,{size:20}),"Back to Finances"]}),(0,oi.jsxs)("div",{children:[(0,oi.jsx)(sy,{children:"Transaction History"}),(0,oi.jsx)(ly,{children:"Complete financial activity and transaction records"})]})]})}),(0,oi.jsxs)(cy,{children:[(0,oi.jsxs)(dy,{children:[(0,oi.jsx)(py,{children:(0,oi.jsx)(yh,{size:16})}),(0,oi.jsx)(uy,{type:"text",placeholder:"Search transactions...",value:n,onChange:e=>r(e.target.value)})]}),(0,oi.jsxs)("div",{style:{position:"relative"},children:[(0,oi.jsxs)(hy,{onClick:()=>o(!i),className:i?"active":"",whileHover:{scale:1.02},whileTap:{scale:.98},children:[(0,oi.jsx)(_x,{size:16}),"Filters",i?(0,oi.jsx)(ty,{size:16}):(0,oi.jsx)(wh,{size:16})]}),i&&(0,oi.jsxs)(my,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},children:[(0,oi.jsxs)(gy,{children:[(0,oi.jsx)(xy,{children:"Transaction Type"}),(0,oi.jsx)(yy,{children:["deposit","withdrawal","payment"].map(e=>(0,oi.jsxs)(vy,{children:[(0,oi.jsx)("input",{type:"checkbox",checked:a.includes(e),onChange:()=>(e=>{s(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])})(e)}),e.charAt(0).toUpperCase()+e.slice(1)]},e))})]}),(0,oi.jsxs)(gy,{children:[(0,oi.jsx)(xy,{children:"Status"}),(0,oi.jsx)(yy,{children:["completed","pending","failed"].map(e=>(0,oi.jsxs)(vy,{children:[(0,oi.jsx)("input",{type:"checkbox",checked:l.includes(e),onChange:()=>(e=>{c(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])})(e)}),e.charAt(0).toUpperCase()+e.slice(1)]},e))})]}),(0,oi.jsxs)(gy,{children:[(0,oi.jsx)(xy,{children:"Date Range"}),(0,oi.jsxs)(by,{children:[(0,oi.jsx)(wy,{type:"date",value:d,onChange:e=>u(e.target.value),placeholder:"Start date"}),(0,oi.jsx)("span",{style:{color:"#64748b"},children:"to"}),(0,oi.jsx)(wy,{type:"date",value:p,onChange:e=>h(e.target.value),placeholder:"End date"})]})]})]})]}),(0,oi.jsxs)(fy,{onClick:()=>{dt.success("Transaction history exported successfully!",{position:"bottom-right",autoClose:3e3})},whileHover:{scale:1.02},whileTap:{scale:.98},children:[(0,oi.jsx)(Kh,{size:16}),"Export"]})]}),(0,oi.jsxs)(ky,{children:[(0,oi.jsxs)(jy,{children:[(0,oi.jsx)("div",{children:"Type"}),(0,oi.jsx)("div",{children:"Transaction"}),(0,oi.jsx)("div",{children:"Date"}),(0,oi.jsx)("div",{children:"Time"}),(0,oi.jsx)("div",{children:"Amount"}),(0,oi.jsx)("div",{children:"Status"}),(0,oi.jsx)("div",{children:"Actions"})]}),(0,oi.jsx)(Sy,{children:g.map(e=>(0,oi.jsxs)(Cy,{whileHover:{x:4},transition:{duration:.2},children:[(0,oi.jsx)(Py,{type:e.type,children:f(e.type)}),(0,oi.jsxs)(Ey,{children:[(0,oi.jsx)(Ty,{children:e.title}),(0,oi.jsx)(zy,{children:e.reference})]}),(0,oi.jsx)(Ay,{children:e.date}),(0,oi.jsxs)(_y,{children:[(0,oi.jsx)(bp,{size:12}),e.time]}),(0,oi.jsx)(My,{type:e.type,children:e.amount}),(0,oi.jsxs)($y,{status:e.status,children:[m(e.status),e.status]}),(0,oi.jsx)(Ny,{whileHover:{scale:1.1},whileTap:{scale:.9},children:(0,oi.jsx)(ny,{size:16})})]},e.id))})]})]})},Dy=ei(cu.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`,Fy=ei(cu.div)`
  background: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(255, 255, 255, 0.25)":"white"}};
  backdrop-filter: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"blur(20px) saturate(180%)":"none"}};
  border: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"1px solid rgba(255, 255, 255, 0.3)":"none"}};
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"0 8px 32px rgba(31, 38, 135, 0.37)":"none"}};
`,Oy=ei.div`
  padding: 24px 24px 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 24px;
`,Iy=ei.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"#1a237e":"#1f2937"}};
  display: flex;
  align-items: center;
  gap: 8px;
`,By=ei.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
  }
`,Vy=ei.div`
  padding: 0 24px 24px 24px;
`,Uy=ei.form`
  display: grid;
  gap: 20px;
`,Hy=ei.div`
  display: grid;
  gap: 8px;
`,Wy=ei.label`
  font-weight: 500;
  color: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"#283593":"#374151"}};
`,qy=ei.input`
  padding: 12px;
  border: 1px solid ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(156, 204, 101, 0.4)":"#d1d5db"}};
  border-radius: 8px;
  font-size: 1rem;
  background: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(255, 255, 255, 0.2)":"white"}};
  color: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"#1a237e":"inherit"}};
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"#4caf50":"#3b82f6"}};
    box-shadow: 0 0 0 3px ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(76, 175, 80, 0.1)":"rgba(59, 130, 246, 0.1)"}};
    background: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(255, 255, 255, 0.3)":"white"}};
  }

  &::placeholder {
    color: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"#3949ab":"#9ca3af"}};
  }
`,Yy=ei.select`
  padding: 12px;
  border: 1px solid ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(156, 204, 101, 0.4)":"#d1d5db"}};
  border-radius: 8px;
  font-size: 1rem;
  background: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(255, 255, 255, 0.2)":"white"}};
  color: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"#1a237e":"inherit"}};
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"#4caf50":"#3b82f6"}};
    box-shadow: 0 0 0 3px ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(76, 175, 80, 0.1)":"rgba(59, 130, 246, 0.1)"}};
    background: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(255, 255, 255, 0.3)":"white"}};
  }
`,Gy=ei.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
`,Ky=ei.div`
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 12px;
  padding: 20px;
  color: white;
  margin-bottom: 20px;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`,Qy=ei.div`
  font-family: 'Courier New', monospace;
  font-size: 1.1rem;
  letter-spacing: 2px;
  margin: 16px 0;
`,Xy=ei.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`,Zy=ei.div`
  font-size: 0.9rem;
  opacity: 0.9;
`,Jy=ei.div`
  font-size: 0.9rem;
  opacity: 0.9;
`,ev=ei.div`
  font-size: 0.8rem;
  opacity: 0.8;
  text-transform: uppercase;
`,tv=ei.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`,nv=ei.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  &.primary {
    background: #3b82f6;
    color: white;

    &:hover {
      background: #2563eb;
    }

    &:disabled {
      background: #9ca3af;
      cursor: not-allowed;
    }
  }

  &.secondary {
    background: #f3f4f6;
    color: #374151;

    &:hover {
      background: #e5e7eb;
    }
  }
`,rv=e=>{let{isOpen:n,onClose:r,onCardAdded:i}=e;const{theme:o}=fi(),[a,s]=(0,t.useState)(!1),[l,c]=(0,t.useState)({type:"visa",number:"",holder_name:"",expiry:"",cvv:"",nickname:""}),d=(e,t)=>{let n=t;if("number"===e){if(n=(e=>{const t=e.replace(/\s+/g,"").replace(/[^0-9]/gi,""),n=t.match(/\d{4,16}/g),r=n&&n[0]||"",i=[];for(let o=0,a=r.length;o<a;o+=4)i.push(r.substring(o,o+4));return i.length?i.join(" "):t})(t),n.replace(/\s/g,"").length>16)return}else if("expiry"===e){if(n=(e=>{const t=e.replace(/\s+/g,"").replace(/[^0-9]/gi,"");return t.length>=2?t.substring(0,2)+"/"+t.substring(2,4):t})(t),n.length>5)return}else if("cvv"===e&&(n=t.replace(/[^0-9]/g,""),n.length>4))return;c(t=>({...t,[e]:n}))};return(0,oi.jsx)(Vp,{children:n&&(0,oi.jsx)(Dy,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:r,children:(0,oi.jsxs)(Fy,{theme:o,initial:{scale:.9,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.9,opacity:0},onClick:e=>e.stopPropagation(),children:[(0,oi.jsxs)(Oy,{children:[(0,oi.jsxs)(Iy,{children:[(0,oi.jsx)(th,{size:24}),"Add New Card"]}),(0,oi.jsx)(By,{onClick:r,children:(0,oi.jsx)(Up,{size:20})})]}),(0,oi.jsxs)(Vy,{children:[(0,oi.jsxs)(Ky,{children:[(0,oi.jsxs)("div",{children:[(0,oi.jsx)(ev,{children:(()=>{const e=l.number.replace(/\s/g,"");return e.startsWith("4")?"visa":e.startsWith("5")||e.startsWith("2")?"mastercard":l.type})()}),(0,oi.jsx)(Qy,{children:l.number||"\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022"})]}),(0,oi.jsxs)(Xy,{children:[(0,oi.jsx)(Zy,{children:l.holder_name||"CARD HOLDER"}),(0,oi.jsx)(Jy,{children:l.expiry||"MM/YY"})]})]}),(0,oi.jsxs)(Uy,{onSubmit:async e=>{if(e.preventDefault(),l.number&&l.holder_name&&l.expiry&&l.cvv)if(l.number.replace(/\s/g,"").length<16)dt.error("Please enter a valid 16-digit card number");else if(5===l.expiry.length)if(l.cvv.length<3)dt.error("Please enter a valid CVV");else try{s(!0);const[e,t]=l.expiry.split("/"),n={type:l.type.charAt(0).toUpperCase()+l.type.slice(1),number:l.number.replace(/\s/g,""),holder_name:l.holder_name,expiry_month:parseInt(e,10),expiry_year:parseInt("20"+t,10),cvv:l.cvv,is_default:!1};(await ii.addCard(n)).success&&(dt.success("Card added successfully!"),c({type:"visa",number:"",holder_name:"",expiry:"",cvv:"",nickname:""}),i&&i(),r())}catch(t){console.error("Failed to add card:",t),dt.error("Failed to add card. Please try again.")}finally{s(!1)}else dt.error("Please enter a valid expiry date (MM/YY)");else dt.error("Please fill in all required fields")},children:[(0,oi.jsxs)(Hy,{children:[(0,oi.jsx)(Wy,{children:"Card Type *"}),(0,oi.jsxs)(Yy,{value:l.type,onChange:e=>c({...l,type:e.target.value}),children:[(0,oi.jsx)("option",{value:"visa",children:"Visa"}),(0,oi.jsx)("option",{value:"mastercard",children:"Mastercard"}),(0,oi.jsx)("option",{value:"american_express",children:"American Express"}),(0,oi.jsx)("option",{value:"discover",children:"Discover"})]})]}),(0,oi.jsxs)(Hy,{children:[(0,oi.jsx)(Wy,{children:"Card Number *"}),(0,oi.jsx)(qy,{type:"text",value:l.number,onChange:e=>d("number",e.target.value),placeholder:"1234 5678 9012 3456",required:!0})]}),(0,oi.jsxs)(Hy,{children:[(0,oi.jsx)(Wy,{children:"Card Holder Name *"}),(0,oi.jsx)(qy,{type:"text",value:l.holder_name,onChange:e=>c({...l,holder_name:e.target.value.toUpperCase()}),placeholder:"JOHN DOE",required:!0})]}),(0,oi.jsxs)(Gy,{children:[(0,oi.jsxs)(Hy,{children:[(0,oi.jsx)(Wy,{children:"Expiry Date *"}),(0,oi.jsx)(qy,{type:"text",value:l.expiry,onChange:e=>d("expiry",e.target.value),placeholder:"MM/YY",required:!0})]}),(0,oi.jsxs)(Hy,{children:[(0,oi.jsx)(Wy,{children:"CVV *"}),(0,oi.jsx)(qy,{type:"text",value:l.cvv,onChange:e=>d("cvv",e.target.value),placeholder:"123",required:!0})]})]}),(0,oi.jsxs)(Hy,{children:[(0,oi.jsx)(Wy,{children:"Nickname (Optional)"}),(0,oi.jsx)(qy,{type:"text",value:l.nickname,onChange:e=>c({...l,nickname:e.target.value}),placeholder:"e.g., Personal Card, Business Card"})]}),(0,oi.jsxs)(tv,{children:[(0,oi.jsx)(nv,{type:"button",className:"secondary",onClick:r,children:"Cancel"}),(0,oi.jsx)(nv,{type:"submit",className:"primary",disabled:a,children:a?"Adding...":"Add Card"})]})]})]})]})})})},iv=ei.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
`,ov=ei.div`
  margin-bottom: 32px;
`,av=ei.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
`,sv=ei.p`
  color: #64748b;
  font-size: 16px;
`,lv=ei(cu.button)`
  background: none;
  border: none;
  color: #1a1a1a;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
  margin-bottom: 16px;

  &:hover {
    background: #f1f5f9;
  }
`,cv=ei.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  align-items: center;
`,dv=ei.input`
  flex: 1;
  max-width: 300px;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #1a1a1a;
    box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
  }
`,uv=ei(cu.button)`
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 2px solid #e2e8f0;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    border-color: #1a1a1a;
    color: #1a1a1a;
  }
`,pv=ei(cu.button)`
  background: linear-gradient(135deg, #1a1a1a, #333333);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
`,hv=ei.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,fv=ei(cu.div)`
  background: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(255, 255, 255, 0.25)":"linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)"}};
  backdrop-filter: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"blur(20px) saturate(180%)":"none"}};
  border: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"2px solid rgba(255, 255, 255, 0.3)":"2px solid #e2e8f0"}};
  border-radius: 20px;
  padding: 28px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"0 8px 32px rgba(31, 38, 135, 0.37)":"none"}};

  &:hover {
    border-color: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"#4caf50":"#1a1a1a"}};
    transform: translateY(-3px);
    box-shadow: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"0 12px 40px rgba(31, 38, 135, 0.45)":"0 12px 35px rgba(0, 0, 0, 0.15)"}};
    background: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(255, 255, 255, 0.35)":"linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)"}};
  }

  &.active {
    border-color: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"#4caf50":"#1a1a1a"}};
    background: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(255, 255, 255, 0.4)":"linear-gradient(135deg, #1a1a1a 0%, #333333 100%)"}};
    color: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"#1a237e":"white"}};
  }

  &.visa {
    background: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(255, 255, 255, 0.4)":"linear-gradient(135deg, #1a1a1a 0%, #333333 100%)"}};
    color: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"#1a237e":"white"}};
    border-color: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"#4caf50":"#1a1a1a"}};
  }

  &.mastercard {
    background: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(255, 255, 255, 0.4)":"linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)"}};
    color: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"#1a237e":"white"}};
    border-color: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"#4caf50":"#ff6b35"}};
  }
`,mv=ei.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,gv=ei.div`
  font-weight: 700;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
`,xv=ei.div`
  display: flex;
  gap: 8px;
`,yv=ei(cu.button)`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`,vv=ei.div`
  font-family: 'Courier New', monospace;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 3px;
  margin-bottom: 12px;
  text-align: center;
`,bv=ei.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  opacity: 0.9;
  margin-top: auto;
`,wv=ei.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,kv=ei.div`
  font-size: 12px;
  opacity: 0.8;
  margin-bottom: 2px;
`,jv=ei.div`
  font-weight: 600;
`,Sv=ei.div`
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: absolute;
  top: 16px;
  right: 16px;
`,Cv=()=>{const{theme:e}=fi(),n=Z(),{user:r}=si(),[i,o]=(0,t.useState)([]),[a,s]=(0,t.useState)(!0),[l,c]=(0,t.useState)(""),[d,u]=(0,t.useState)({}),[p,h]=(0,t.useState)("all"),[f,m]=(0,t.useState)(!1);(0,t.useEffect)(()=>{g()},[]);const g=async()=>{try{s(!0);const e=await ii.getCards();e.success&&o(e.cards)}catch(e){console.error("Failed to load cards:",e),dt.error("Failed to load cards")}finally{s(!1)}},x=i.filter(e=>{const t=e.type.toLowerCase().includes(l.toLowerCase())||e.holder.toLowerCase().includes(l.toLowerCase()),n="all"===p||e.type.toLowerCase()===p.toLowerCase();return t&&n});return(0,oi.jsxs)(iv,{children:[(0,oi.jsxs)(lv,{onClick:()=>n("/my-account"),whileHover:{scale:1.02},whileTap:{scale:.98},children:[(0,oi.jsx)(fu,{size:20}),"Back to Finances"]}),(0,oi.jsxs)(ov,{children:[(0,oi.jsxs)(av,{children:[(0,oi.jsx)(th,{size:28}),"Payment Cards"]}),(0,oi.jsx)(sv,{children:"Manage all your payment cards and their details"})]}),(0,oi.jsxs)(cv,{children:[(0,oi.jsx)(dv,{type:"text",placeholder:"Search cards by type or holder...",value:l,onChange:e=>c(e.target.value)}),(0,oi.jsxs)(uv,{onClick:()=>h("all"===p?"visa":"visa"===p?"mastercard":"all"),whileHover:{scale:1.02},whileTap:{scale:.98},children:[(0,oi.jsx)(_x,{size:16}),"all"===p?"All Cards":"visa"===p?"Visa Only":"Mastercard Only"]}),(0,oi.jsxs)(pv,{onClick:()=>{m(!0)},whileHover:{scale:1.02},whileTap:{scale:.98},children:[(0,oi.jsx)(Lg,{size:16}),"Add Card"]})]}),(0,oi.jsx)(hv,{children:x.map(e=>(0,oi.jsxs)(fv,{onClick:()=>(e=>{u(t=>({...t,[e.id]:!t[e.id]})),dt.success(d[e.id]?"Card details hidden!":"Card details revealed!",{position:"bottom-right",autoClose:2e3})})(e),whileHover:{scale:1.02},whileTap:{scale:.98},className:`${e.isDefault?"active":""} ${e.type.toLowerCase()}`,children:[e.isDefault&&(0,oi.jsx)(Sv,{children:"Default"}),(0,oi.jsxs)(mv,{children:[(0,oi.jsxs)(gv,{children:[(0,oi.jsx)(th,{size:20}),e.type,e.isDefault&&(0,oi.jsx)(Bg,{size:16})]}),(0,oi.jsxs)(xv,{children:[(0,oi.jsx)(yv,{onClick:t=>{t.stopPropagation(),(e=>{dt.info(`Edit ${e.type} card functionality coming soon!`,{position:"bottom-right",autoClose:3e3})})(e)},whileHover:{scale:1.1},whileTap:{scale:.9},children:(0,oi.jsx)(Yf,{size:14})}),(0,oi.jsx)(yv,{onClick:t=>{t.stopPropagation(),(async e=>{try{(await ii.deleteCard(e.id)).success&&(dt.success("Card deleted successfully!"),g())}catch(t){console.error("Failed to delete card:",t),dt.error("Failed to delete card")}})(e)},whileHover:{scale:1.1},whileTap:{scale:.9},children:(0,oi.jsx)(ig,{size:14})})]})]}),(0,oi.jsx)(vv,{children:d[e.id]?e.number:"**** **** **** ****"}),(0,oi.jsxs)(bv,{children:[(0,oi.jsxs)(wv,{children:[(0,oi.jsxs)("div",{children:[(0,oi.jsx)(kv,{children:"Card Holder"}),(0,oi.jsx)(jv,{children:e.holder})]}),(0,oi.jsxs)("div",{children:[(0,oi.jsx)(kv,{children:"Expires"}),(0,oi.jsx)(jv,{children:d[e.id]?e.expiry:"**/**"})]})]}),(0,oi.jsxs)(wv,{children:[(0,oi.jsxs)("div",{children:[(0,oi.jsx)(kv,{children:"CVV"}),(0,oi.jsx)(jv,{children:e.cvv})]}),(0,oi.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"4px",marginTop:"4px"},children:[d[e.id]?(0,oi.jsx)(xu,{size:12}):(0,oi.jsx)(yu,{size:12}),(0,oi.jsxs)("span",{style:{fontSize:"10px",opacity:.8},children:[d[e.id]?"Hide":"Show"," Details"]})]})]})]})]},e.id))}),0===x.length&&(0,oi.jsx)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#64748b",fontSize:"16px"},children:"No cards found matching your search criteria."}),(0,oi.jsx)(rv,{isOpen:f,onClose:()=>m(!1),onCardAdded:()=>{g()}})]})},Pv=uu("MessageCircle",[["path",{d:"m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z",key:"v2veuj"}]]),Ev=uu("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]]),Tv=uu("Music",[["path",{d:"M9 18V5l12-2v13",key:"1jmyc2"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["circle",{cx:"18",cy:"16",r:"3",key:"1hluhg"}]]),zv=ei.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
  background-color: ${e=>{var t,n;return(null===(t=e.theme)||void 0===t||null===(n=t.colors)||void 0===n?void 0:n.primary)||"transparent"}};
  color: ${e=>{var t,n;return(null===(t=e.theme)||void 0===t||null===(n=t.colors)||void 0===n?void 0:n.textPrimary)||"#1e293b"}};
`,Av=ei.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
`,_v=ei(cu.button)`
  background: none;
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #64748b;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
    color: #1e293b;
  }
`,Mv=ei.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`,$v=ei.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`,Nv=ei.button`
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  color: #64748b;
  font-size: 14px;

  &:hover {
    background: #f1f5f9;
    border-color: #1a1a1a;
    color: #1e293b;
  }

  &.active {
    background: #1a1a1a;
    border-color: #1a1a1a;
    color: white;
  }
`,Rv=ei(cu.button)`
  background: linear-gradient(135deg, #1a1a1a, #333333);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  font-size: 14px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`,Lv=ei.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,Dv=ei(cu.div)`
  background: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(255, 255, 255, 0.4)":"white"}};
  backdrop-filter: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"blur(25px) saturate(200%)":"none"}};
  border: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"1px solid rgba(255, 255, 255, 0.5)":"1px solid #e2e8f0"}};
  border-radius: 12px;
  padding: 16px;
  box-shadow: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"0 10px 40px rgba(31, 38, 135, 0.45)":"0 2px 8px rgba(0, 0, 0, 0.06)"}};
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    box-shadow: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"0 15px 50px rgba(31, 38, 135, 0.55)":"0 4px 16px rgba(0, 0, 0, 0.1)"}};
    transform: translateY(-2px);
    background: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(255, 255, 255, 0.5)":"white"}};
  }

  &.unread {
    border-left: 4px solid ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"#4caf50":"#1a1a1a"}};
    background: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(255, 255, 255, 0.45)":"#fefefe"}};
    box-shadow: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"0 12px 45px rgba(31, 38, 135, 0.5)":"0 2px 8px rgba(0, 0, 0, 0.06)"}};
  }

  &.read {
    opacity: 0.7;
    background: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(255, 255, 255, 0.25)":"white"}};
  }
`,Fv=ei.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 12px;
`,Ov=ei.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: white;
  font-size: 18px;

  &.sale {
    background: linear-gradient(135deg, #10b981, #059669);
  }

  &.message {
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  }

  &.system {
    background: linear-gradient(135deg, #f59e0b, #d97706);
  }

  &.payment {
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  }

  &.download {
    background: linear-gradient(135deg, #06b6d4, #0891b2);
  }

  &.review {
    background: linear-gradient(135deg, #f97316, #ea580c);
  }
`,Iv=ei.div`
  flex: 1;
`,Bv=ei.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"#1a237e":"#1e293b"}};
  margin: 0 0 4px 0;
`,Vv=ei.p`
  font-size: 14px;
  color: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"#283593":"#64748b"}};
  margin: 0 0 8px 0;
  line-height: 1.5;
`,Uv=ei.span`
  font-size: 12px;
  color: #94a3b8;
`,Hv=ei.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`,Wv=ei.button`
  background: none;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 4px;

  &.primary {
    background: #1a1a1a;
    color: white;

    &:hover {
      background: #333333;
    }
  }

  &.secondary {
    background: #f1f5f9;
    color: #64748b;

    &:hover {
      background: #e2e8f0;
      color: #1e293b;
    }
  }

  &.danger {
    background: #fef2f2;
    color: #ef4444;

    &:hover {
      background: #fee2e2;
    }
  }
`,qv=ei.div`
  text-align: center;
  padding: 60px 20px;
  color: #64748b;
`,Yv=ei.div`
  font-size: 48px;
  margin-bottom: 16px;
`,Gv=ei.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
`,Kv=ei.p`
  font-size: 14px;
  color: #64748b;
`,Qv=[{id:1,type:"sale",title:"New Beat Sale!",message:'Your beat "Midnight Vibes" was purchased by Artist XYZ for $150',time:"2 minutes ago",read:!1,icon:(0,oi.jsx)(Wh,{size:20})},{id:2,type:"message",title:"Client Message",message:"Producer ABC sent you a message about custom beat requirements",time:"15 minutes ago",read:!1,icon:(0,oi.jsx)(Pv,{size:20})},{id:3,type:"payment",title:"Payment Received",message:"Payment of $450 received for 3 beats sold to Rapper DEF",time:"1 hour ago",read:!1,icon:(0,oi.jsx)(Wh,{size:20})},{id:4,type:"download",title:"Beat Downloaded",message:'Your beat "Summer Heat" was downloaded by Singer GHI',time:"2 hours ago",read:!0,icon:(0,oi.jsx)(Kh,{size:20})},{id:5,type:"review",title:"New Review",message:'You received a 5-star review from Artist JKL for "Urban Flow"',time:"3 hours ago",read:!0,icon:(0,oi.jsx)(Ev,{size:20})},{id:6,type:"system",title:"System Update",message:"New features available: Advanced analytics and client management tools",time:"5 hours ago",read:!0,icon:(0,oi.jsx)(dm,{size:20})},{id:7,type:"sale",title:"Bundle Sale!",message:'Producer MNO purchased your "Hip Hop Essentials" bundle for $300',time:"1 day ago",read:!0,icon:(0,oi.jsx)(Tv,{size:20})},{id:8,type:"message",title:"Collaboration Request",message:"Beatmaker PQR wants to collaborate on a new project",time:"1 day ago",read:!0,icon:(0,oi.jsx)(Pv,{size:20})}],Xv=()=>{const{theme:e}=fi(),n=Z(),[r,i]=(0,t.useState)("all"),[o,a]=(0,t.useState)(Qv),s=e=>{i(e)},l=o.filter(e=>"all"===r||("unread"===r?!e.read:"sales"===r?"sale"===e.type:"messages"===r?"message"===e.type:"payments"!==r||"payment"===e.type)),c=o.filter(e=>!e.read).length;return(0,oi.jsxs)(zv,{theme:e,children:[(0,oi.jsxs)(Av,{children:[(0,oi.jsxs)(_v,{onClick:()=>n(-1),whileHover:{scale:1.02},whileTap:{scale:.98},children:[(0,oi.jsx)(fu,{size:20}),"Back"]}),(0,oi.jsxs)(Mv,{children:[(0,oi.jsx)(vh,{size:28}),"Notifications",c>0&&(0,oi.jsx)("span",{style:{background:"#ef4444",color:"white",borderRadius:"50%",width:"20px",height:"20px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",marginLeft:"8px"},children:c})]})]}),(0,oi.jsxs)($v,{children:[(0,oi.jsx)(Nv,{className:"all"===r?"active":"",onClick:()=>s("all"),children:"All"}),(0,oi.jsxs)(Nv,{className:"unread"===r?"active":"",onClick:()=>s("unread"),children:["Unread (",c,")"]}),(0,oi.jsx)(Nv,{className:"sales"===r?"active":"",onClick:()=>s("sales"),children:"Sales"}),(0,oi.jsx)(Nv,{className:"messages"===r?"active":"",onClick:()=>s("messages"),children:"Messages"}),(0,oi.jsx)(Nv,{className:"payments"===r?"active":"",onClick:()=>s("payments"),children:"Payments"}),(0,oi.jsxs)(Rv,{onClick:()=>{a(e=>e.map(e=>({...e,read:!0}))),dt.success("All notifications marked as read",{position:"bottom-right",autoClose:2e3})},whileHover:{scale:1.02},whileTap:{scale:.98},children:[(0,oi.jsx)(um,{size:16}),"Mark All Read"]})]}),(0,oi.jsx)(Lv,{children:l.length>0?l.map((t,n)=>(0,oi.jsxs)(Dv,{theme:e,className:t.read?"read":"unread",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3,delay:.1*n},children:[(0,oi.jsxs)(Fv,{children:[(0,oi.jsx)(Ov,{className:t.type,children:t.icon}),(0,oi.jsxs)(Iv,{children:[(0,oi.jsx)(Bv,{theme:e,children:t.title}),(0,oi.jsx)(Vv,{theme:e,children:t.message}),(0,oi.jsx)(Uv,{children:t.time})]})]}),(0,oi.jsxs)(Hv,{children:[!t.read&&(0,oi.jsxs)(Wv,{className:"primary",onClick:()=>(e=>{a(t=>t.map(t=>t.id===e?{...t,read:!0}:t)),dt.success("Marked as read",{position:"bottom-right",autoClose:2e3})})(t.id),children:[(0,oi.jsx)(um,{size:14}),"Mark Read"]}),(0,oi.jsx)(Wv,{className:"secondary",onClick:()=>dt.info("Action coming soon!"),children:"View Details"}),(0,oi.jsxs)(Wv,{className:"danger",onClick:()=>(e=>{a(t=>t.filter(t=>t.id!==e)),dt.error("Notification deleted",{position:"bottom-right",autoClose:2e3})})(t.id),children:[(0,oi.jsx)(ig,{size:14}),"Delete"]})]})]},t.id)):(0,oi.jsxs)(qv,{children:[(0,oi.jsx)(Yv,{children:"\ud83d\udd14"}),(0,oi.jsx)(Gv,{children:"No notifications"}),(0,oi.jsx)(Kv,{children:"all"===r?"You're all caught up! No notifications at the moment.":`No ${r} notifications found.`})]})})]})},Zv=uu("Monitor",[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]]),Jv=uu("Palette",[["circle",{cx:"13.5",cy:"6.5",r:".5",key:"1xcu5"}],["circle",{cx:"17.5",cy:"10.5",r:".5",key:"736e4u"}],["circle",{cx:"8.5",cy:"7.5",r:".5",key:"clrty"}],["circle",{cx:"6.5",cy:"12.5",r:".5",key:"1s4xz9"}],["path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",key:"12rzf8"}]]),eb=uu("Globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]),tb=uu("AlertTriangle",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z",key:"c3ski4"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]),nb=uu("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]),rb=uu("Smartphone",[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]]),ib=ei(cu.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`,ob=ei(cu.div)`
  background: white;
  border-radius: 20px;
  padding: 32px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
`,ab=ei.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
`,sb=ei.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
`,lb=ei.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
`,cb=ei.p`
  font-size: 14px;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
`,db=ei.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
    color: #1e293b;
  }
`,ub=ei.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
`,pb=ei.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: ${e=>e.active?"#3b82f6":"#64748b"};
`,hb=ei.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${e=>e.active?"#3b82f6":"#cbd5e1"};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
`,fb=ei.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin: 24px 0;
  padding: 24px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
`,mb=ei.img`
  width: 200px;
  height: 200px;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
`,gb=ei.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: #f1f5f9;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: #1e293b;
  letter-spacing: 1px;
`,xb=ei.button`
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: #3b82f6;
    background: #eff6ff;
  }
`,yb=ei.div`
  margin-bottom: 20px;
`,vb=ei.label`
  display: block;
  font-weight: 600;
  color: #1e293b;
  font-size: 14px;
  margin-bottom: 8px;
`,bb=ei.input`
  width: 100%;
  padding: 14px 18px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 14px;
  color: #1e293b;
  background: white;
  transition: all 0.2s ease;
  text-align: center;
  letter-spacing: 2px;
  font-family: 'Courier New', monospace;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
    letter-spacing: normal;
  }
`,wb=ei.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`,kb=ei(cu.button)`
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  font-size: 14px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  &:disabled {
    background: #cbd5e1;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  &.secondary {
    background: #f1f5f9;
    color: #64748b;

    &:hover {
      background: #e2e8f0;
      color: #1e293b;
    }
  }

  &.danger {
    background: #ef4444;
    color: white;

    &:hover {
      background: #dc2626;
    }
  }
`,jb=ei.div`
  color: #ef4444;
  font-size: 12px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
`,Sb=ei.div`
  color: #10b981;
  font-size: 12px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
`,Cb=ei.div`
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
`,Pb=ei.div`
  font-weight: 600;
  color: #1e40af;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`,Eb=ei.div`
  color: #1e40af;
  font-size: 14px;
  line-height: 1.5;
`,Tb=e=>{let{isOpen:n,onClose:r,current2FAStatus:i=!1,onStatusChange:o}=e;const[a,s]=(0,t.useState)(1),[l,c]=(0,t.useState)(!1),[d,u]=(0,t.useState)(null),[p,h]=(0,t.useState)(null),[f,m]=(0,t.useState)(null),[g,x]=(0,t.useState)(null),[y,v]=(0,t.useState)(""),[b,w]=(0,t.useState)(!1);(0,t.useEffect)(()=>{n&&!i&&k()},[n,i]);const k=async()=>{c(!0),u(null);try{const e=await ii.generate2FASecret();e.success?(m(e.qrCode),x(e.secret),s(1)):u(e.error||"Failed to generate 2FA secret")}catch(d){u("Failed to generate 2FA secret")}finally{c(!1)}},j=async()=>{if(y.trim()){c(!0),u(null);try{const e=await ii.enable2FA(y);e.success?(h("Two-factor authentication enabled successfully!"),s(3),o&&o(!0)):(u(e.error||"Failed to enable 2FA"),v(""))}catch(d){u("Failed to enable 2FA"),v("")}finally{c(!1)}}},S=async()=>{if(y.trim()){w(!0),u(null);try{const e=await ii.disable2FA(y);e.success?(h("Two-factor authentication disabled successfully!"),o&&o(!1),setTimeout(()=>{r()},2e3)):(u(e.error||"Failed to disable 2FA"),v(""))}catch(d){u("Failed to disable 2FA"),v("")}finally{w(!1)}}},C=()=>{s(1),v(""),u(null),h(null),m(null),x(null),r()};return(0,oi.jsx)(Vp,{children:n&&(0,oi.jsx)(ib,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:C,children:(0,oi.jsxs)(ob,{initial:{scale:.9,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.9,opacity:0},onClick:e=>e.stopPropagation(),children:[(0,oi.jsx)(db,{onClick:C,children:(0,oi.jsx)(Up,{size:20})}),(0,oi.jsxs)(ab,{children:[(0,oi.jsx)(sb,{children:(0,oi.jsx)(rb,{size:20})}),(0,oi.jsxs)("div",{children:[(0,oi.jsx)(lb,{children:i?"Disable Two-Factor Authentication":"Set Up Two-Factor Authentication"}),(0,oi.jsx)(cb,{children:i?"Remove the extra security layer from your account":"Add an extra layer of security to your account"})]})]}),i?(0,oi.jsxs)(oi.Fragment,{children:[(0,oi.jsxs)(Cb,{children:[(0,oi.jsxs)(Pb,{children:[(0,oi.jsx)(dm,{size:16}),"Disable 2FA"]}),(0,oi.jsx)(Eb,{children:"Disabling two-factor authentication will reduce the security of your account. Make sure this is what you want to do."})]}),(0,oi.jsxs)("div",{children:[(0,oi.jsx)("h4",{style:{marginBottom:"16px",color:"#1e293b"},children:"Enter Verification Code"}),(0,oi.jsx)("p",{style:{color:"#64748b",marginBottom:"16px"},children:"To disable 2FA, enter the current verification code from your authenticator app:"}),(0,oi.jsxs)(yb,{children:[(0,oi.jsx)(vb,{children:"Verification Code"}),(0,oi.jsx)(bb,{type:"text",value:y,onChange:e=>v(e.target.value.replace(/\D/g,"").slice(0,6)),placeholder:"000000",maxLength:6,autoFocus:!0})]}),d&&(0,oi.jsxs)(jb,{children:[(0,oi.jsx)(dm,{size:12}),d]}),p&&(0,oi.jsxs)(Sb,{children:[(0,oi.jsx)(um,{size:12}),p]}),(0,oi.jsxs)(wb,{children:[(0,oi.jsx)(kb,{className:"secondary",onClick:C,whileHover:{scale:1.02},whileTap:{scale:.98},children:"Cancel"}),(0,oi.jsx)(kb,{className:"danger",onClick:S,disabled:!y.trim()||6!==y.length||b,whileHover:{scale:1.02},whileTap:{scale:.98},children:b?"Disabling...":"Disable 2FA"})]})]})]}):(0,oi.jsxs)(oi.Fragment,{children:[1===a&&(0,oi.jsxs)(oi.Fragment,{children:[(0,oi.jsxs)(Cb,{children:[(0,oi.jsxs)(Pb,{children:[(0,oi.jsx)(pu,{size:16}),"Enhanced Security"]}),(0,oi.jsx)(Eb,{children:"Two-factor authentication adds an extra layer of security to your account. You'll need to enter a code from your authenticator app in addition to your password."})]}),(0,oi.jsxs)(ub,{children:[(0,oi.jsxs)(pb,{active:1===a,children:[(0,oi.jsx)(hb,{active:1===a,children:"1"}),"Setup"]}),(0,oi.jsxs)(pb,{active:2===a,children:[(0,oi.jsx)(hb,{active:2===a,children:"2"}),"Verify"]}),(0,oi.jsxs)(pb,{active:3===a,children:[(0,oi.jsx)(hb,{active:3===a,children:"3"}),"Complete"]})]}),(0,oi.jsxs)("div",{children:[(0,oi.jsx)("h4",{style:{marginBottom:"16px",color:"#1e293b"},children:"Step 1: Scan QR Code"}),(0,oi.jsx)("p",{style:{color:"#64748b",marginBottom:"16px"},children:"Open your authenticator app (Google Authenticator, Authy, etc.) and scan this QR code:"}),f&&(0,oi.jsxs)(fb,{children:[(0,oi.jsx)(mb,{src:f,alt:"2FA QR Code"}),(0,oi.jsxs)("div",{style:{textAlign:"center"},children:[(0,oi.jsx)("p",{style:{color:"#64748b",marginBottom:"8px"},children:"Or enter this code manually:"}),(0,oi.jsxs)(gb,{children:[(0,oi.jsx)("span",{children:g}),(0,oi.jsx)(xb,{onClick:()=>{return e=g,navigator.clipboard.writeText(e),void dt.success("Copied to clipboard!");var e},children:(0,oi.jsx)(nb,{size:16})})]})]})]}),(0,oi.jsxs)(wb,{children:[(0,oi.jsx)(kb,{className:"secondary",onClick:C,whileHover:{scale:1.02},whileTap:{scale:.98},children:"Cancel"}),(0,oi.jsx)(kb,{onClick:()=>s(2),disabled:!f,whileHover:{scale:1.02},whileTap:{scale:.98},children:"Next: Verify Code"})]})]})]}),2===a&&(0,oi.jsxs)(oi.Fragment,{children:[(0,oi.jsxs)(ub,{children:[(0,oi.jsxs)(pb,{active:!1,children:[(0,oi.jsx)(hb,{active:!1,children:"1"}),"Setup"]}),(0,oi.jsxs)(pb,{active:2===a,children:[(0,oi.jsx)(hb,{active:2===a,children:"2"}),"Verify"]}),(0,oi.jsxs)(pb,{active:!1,children:[(0,oi.jsx)(hb,{active:!1,children:"3"}),"Complete"]})]}),(0,oi.jsxs)("div",{children:[(0,oi.jsx)("h4",{style:{marginBottom:"16px",color:"#1e293b"},children:"Step 2: Verify Code"}),(0,oi.jsx)("p",{style:{color:"#64748b",marginBottom:"16px"},children:"Enter the 6-digit code from your authenticator app to complete setup:"}),(0,oi.jsxs)(yb,{children:[(0,oi.jsx)(vb,{children:"Verification Code"}),(0,oi.jsx)(bb,{type:"text",value:y,onChange:e=>v(e.target.value.replace(/\D/g,"").slice(0,6)),placeholder:"000000",maxLength:6,autoFocus:!0})]}),d&&(0,oi.jsxs)(jb,{children:[(0,oi.jsx)(dm,{size:12}),d]}),(0,oi.jsxs)(wb,{children:[(0,oi.jsx)(kb,{className:"secondary",onClick:()=>s(1),whileHover:{scale:1.02},whileTap:{scale:.98},children:"Back"}),(0,oi.jsx)(kb,{onClick:j,disabled:!y.trim()||6!==y.length||l,whileHover:{scale:1.02},whileTap:{scale:.98},children:l?"Enabling...":"Enable 2FA"})]})]})]}),3===a&&(0,oi.jsxs)(oi.Fragment,{children:[(0,oi.jsxs)(ub,{children:[(0,oi.jsxs)(pb,{active:!1,children:[(0,oi.jsx)(hb,{active:!1,children:"1"}),"Setup"]}),(0,oi.jsxs)(pb,{active:!1,children:[(0,oi.jsx)(hb,{active:!1,children:"2"}),"Verify"]}),(0,oi.jsxs)(pb,{active:3===a,children:[(0,oi.jsx)(hb,{active:3===a,children:"3"}),"Complete"]})]}),(0,oi.jsxs)("div",{style:{textAlign:"center",padding:"32px 0"},children:[(0,oi.jsx)("div",{style:{width:"80px",height:"80px",borderRadius:"50%",background:"#10b981",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px",color:"white",fontSize:"32px"},children:(0,oi.jsx)(um,{size:40})}),(0,oi.jsx)("h3",{style:{color:"#1e293b",marginBottom:"12px"},children:"Setup Complete!"}),(0,oi.jsx)("p",{style:{color:"#64748b",marginBottom:"24px"},children:"Two-factor authentication is now enabled for your account. You'll need to enter a verification code when logging in."}),(0,oi.jsxs)(Cb,{children:[(0,oi.jsxs)(Pb,{children:[(0,oi.jsx)(dm,{size:16}),"Important"]}),(0,oi.jsx)(Eb,{children:"Keep your authenticator app secure and don't share your backup codes. If you lose access to your authenticator app, you may need to contact support."})]}),(0,oi.jsx)(wb,{style:{justifyContent:"center",marginTop:"24px"},children:(0,oi.jsx)(kb,{onClick:C,whileHover:{scale:1.02},whileTap:{scale:.98},children:"Done"})})]})]})]})]})})})},zb=ei.div`
  max-width: 1800px;
  margin: 0 auto;
  padding: 32px;
  background-color: ${e=>e.theme.colors.primary};
  color: ${e=>e.theme.colors.textPrimary};
`,Ab=ei.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
`,_b=ei(cu.button)`
  background: none;
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${e=>e.theme.colors.textSecondary};
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background: ${e=>e.theme.colors.tertiary};
    color: ${e=>e.theme.colors.textPrimary};
  }
`,Mb=ei.h1`
  font-size: 28px;
  font-weight: 700;
  color: ${e=>e.theme.colors.textPrimary};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`,$b=ei.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  
  @media (max-width: 1600px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`,Nb=ei(cu.div)`
  background: ${e=>e.theme.colors.card};
  border-radius: 20px;
  padding: 40px;
  box-shadow: ${e=>e.theme.shadows.medium};
  border: 1px solid ${e=>e.theme.colors.borderSecondary};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-height: 500px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, ${e=>e.theme.colors.accent}, ${e=>e.theme.colors.accentHover});
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
    border-color: #e2e8f0;
    
    &::before {
      opacity: 1;
    }
  }

  &.featured {
    background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
    border: 2px solid #e2e8f0;
    
    &::before {
      opacity: 1;
      background: linear-gradient(135deg, #1a1a1a, #333333, #1a1a1a);
      background-size: 200% 100%;
      animation: shimmer 2s infinite;
    }
  }
  
  ${e=>"glassmorphism"===e.theme.name&&"\n    background: rgba(255, 255, 255, 0.25);\n    backdrop-filter: blur(20px) saturate(180%);\n    border: 1px solid rgba(255, 255, 255, 0.3);\n    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);\n    \n    &:hover {\n      background: rgba(255, 255, 255, 0.35);\n      box-shadow: 0 12px 40px rgba(31, 38, 135, 0.45);\n      transform: translateY(-4px);\n    }\n    \n    &::before {\n      background: linear-gradient(135deg, #4caf50, #66bb6a);\n    }\n  "}
`,Rb=ei.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
`,Lb=ei.div`
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: linear-gradient(135deg, #1a1a1a, #333333);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover::after {
    transform: translateX(100%);
  }
`,Db=ei.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
`,Fb=ei.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid #f1f5f9;
  gap: 24px;

  &:last-child {
    border-bottom: none;
  }
`,Ob=ei.div`
  flex: 1;
`,Ib=ei.div`
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 6px;
  font-size: 15px;
`,Bb=ei.div`
  font-size: 13px;
  color: #64748b;
  line-height: 1.4;
`,Vb=ei.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  cursor: pointer;
`,Ub=ei.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background: #1a1a1a;
  }

  &:checked + span:before {
    transform: translateX(26px);
  }
`,Hb=ei.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #cbd5e1;
  transition: 0.3s;
  border-radius: 24px;

  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background: white;
    transition: 0.3s;
    border-radius: 50%;
  }
`,Wb=ei.input`
  min-width: 280px;
  padding: 14px 18px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 14px;
  color: #1e293b;
  background: white;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #1a1a1a;
    box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }

  &.error {
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }

  &.success {
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
`,qb=ei.select`
  min-width: 280px;
  padding: 14px 18px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 14px;
  color: #1e293b;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #1a1a1a;
    box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
  }
`,Yb=ei(cu.button)`
  background: linear-gradient(135deg, #1a1a1a, #333333);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  font-size: 14px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &.secondary {
    background: #f1f5f9;
    color: #64748b;

    &:hover {
      background: #e2e8f0;
      color: #1e293b;
    }
  }

  &.danger {
    background: #ef4444;
    color: white;

    &:hover {
      background: #dc2626;
    }
  }
`,Gb=ei.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`,Kb=ei.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  border: 3px solid transparent;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &.active {
    transform: scale(1.15);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 50%;
    background: linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }
`,Qb=ei.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 16px;
`,Xb=ei.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
  padding: 24px;
  background: ${e=>{var t,n;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"rgba(255, 255, 255, 0.4)":"dark"===(null===(n=e.theme)||void 0===n?void 0:n.name)?"linear-gradient(135deg, #1e293b 0%, #334155 100%)":"linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)"}};
  backdrop-filter: ${e=>{var t;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"blur(20px) saturate(180%)":"none"}};
  border-radius: 16px;
  border: ${e=>{var t,n,r,i;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?(null===(r=e.theme)||void 0===r||null===(i=r.colors)||void 0===i?void 0:i.borderPrimary)||"1px solid rgba(255, 255, 255, 0.5)":"dark"===(null===(n=e.theme)||void 0===n?void 0:n.name)?"1px solid #475569":"1px solid #e2e8f0"}};
  position: relative;
  overflow: hidden;
  box-shadow: ${e=>{var t,n,r,i;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?(null===(r=e.theme)||void 0===r||null===(i=r.shadows)||void 0===i?void 0:i.medium)||"0 8px 32px rgba(31, 38, 135, 0.4)":"dark"===(null===(n=e.theme)||void 0===n?void 0:n.name)?"0 8px 32px rgba(0, 0, 0, 0.3)":"0 4px 16px rgba(0, 0, 0, 0.04)"}};

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: ${e=>{var t,n;if("glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)){var r,i;const t=e=>{const t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?`${parseInt(t[1],16)}, ${parseInt(t[2],16)}, ${parseInt(t[3],16)}`:"76, 175, 80"};return`radial-gradient(circle, rgba(${t((null===(r=e.theme)||void 0===r||null===(i=r.colors)||void 0===i?void 0:i.accent)||"#4caf50")}, 0.1) 0%, transparent 70%)`}return"dark"===(null===(n=e.theme)||void 0===n?void 0:n.name)?"radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)":"radial-gradient(circle, rgba(26,26,26,0.03) 0%, transparent 70%)"}};
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(180deg); }
  }
`,Zb=ei.div`
  width: 72px;
  height: 72px;
  border-radius: 20px;
  background: ${e=>{var t,n;if("glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)){var r,i,o,a;return`linear-gradient(135deg, ${(null===(r=e.theme)||void 0===r||null===(i=r.colors)||void 0===i?void 0:i.accent)||"#4caf50"}, ${(null===(o=e.theme)||void 0===o||null===(a=o.colors)||void 0===a?void 0:a.accentHover)||"#2e7d32"})`}return"dark"===(null===(n=e.theme)||void 0===n?void 0:n.name)?"linear-gradient(135deg, #475569, #64748b)":"linear-gradient(135deg, #1a1a1a, #333333)"}};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 28px;
  position: relative;
  box-shadow: ${e=>{var t,n,r,i;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?(null===(r=e.theme)||void 0===r||null===(i=r.shadows)||void 0===i?void 0:i.small)||"0 8px 24px rgba(76, 175, 80, 0.3)":"dark"===(null===(n=e.theme)||void 0===n?void 0:n.name)?"0 8px 24px rgba(0, 0, 0, 0.4)":"0 8px 24px rgba(26, 26, 26, 0.2)"}};

  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 22px;
    background: ${e=>{var t,n;if("glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)){var r,i,o,a;const t=(null===(r=e.theme)||void 0===r||null===(i=r.colors)||void 0===i?void 0:i.accent)||"#4caf50";return`linear-gradient(45deg, ${t}, ${(null===(o=e.theme)||void 0===o||null===(a=o.colors)||void 0===a?void 0:a.accentHover)||"#2e7d32"}, ${t})`}return"dark"===(null===(n=e.theme)||void 0===n?void 0:n.name)?"linear-gradient(45deg, #475569, #64748b, #475569)":"linear-gradient(45deg, #1a1a1a, #333333, #1a1a1a)"}};
    background-size: 200% 200%;
    animation: borderGlow 3s ease-in-out infinite;
    z-index: -1;
  }

  @keyframes borderGlow {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
`,Jb=ei.div`
  flex: 1;
`,ew=ei.div`
  font-weight: 600;
  color: ${e=>{var t,n;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"#1a237e":"dark"===(null===(n=e.theme)||void 0===n?void 0:n.name)?"#f8fafc":"#1e293b"}};
  font-size: 16px;
  margin-bottom: 4px;
`,tw=ei.div`
  color: ${e=>{var t,n;return"glassmorphism"===(null===(t=e.theme)||void 0===t?void 0:t.name)?"#283593":"dark"===(null===(n=e.theme)||void 0===n?void 0:n.name)?"#cbd5e1":"#64748b"}};
  font-size: 14px;
`,nw=ei(cu.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`,rw=ei(cu.div)`
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`,iw=ei.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  color: #64748b;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
    color: #1e293b;
  }
`,ow=ei.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
  padding-right: 40px;
`,aw=ei.div`
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: linear-gradient(135deg, #1a1a1a, #333333);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
`,sw=ei.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${e=>e.theme.colors.textPrimary};
  margin: 0 0 8px 0;
`,lw=ei.p`
  font-size: 14px;
  color: ${e=>e.theme.colors.textSecondary};
  margin: 0;
  line-height: 1.5;
`,cw=e=>{let{isOpen:t,onClose:n,onConfirm:r,loading:i,error:o,theme:a}=e;return t?(0,oi.jsx)(nw,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:n,children:(0,oi.jsxs)(rw,{theme:a,initial:{scale:.9,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.9,opacity:0},onClick:e=>e.stopPropagation(),children:[(0,oi.jsxs)(ow,{theme:a,children:[(0,oi.jsx)(aw,{theme:a,style:{backgroundColor:"#fee2e2"},children:(0,oi.jsx)(tb,{size:24,color:"#dc2626"})}),(0,oi.jsxs)("div",{children:[(0,oi.jsx)(sw,{theme:a,children:"Final Confirmation"}),(0,oi.jsx)(lw,{theme:a,children:"This action cannot be undone. All your data will be permanently deleted."})]})]}),(0,oi.jsxs)("div",{style:{padding:"24px"},children:[(0,oi.jsxs)("div",{style:{backgroundColor:"#fef2f2",border:"1px solid #fecaca",borderRadius:"12px",padding:"16px",marginBottom:"24px"},children:[(0,oi.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"12px"},children:[(0,oi.jsx)(tb,{size:16,color:"#dc2626"}),(0,oi.jsx)("div",{style:{fontWeight:"600",color:"#991b1b"},children:"Warning: Permanent Deletion"})]}),(0,oi.jsxs)("div",{style:{fontSize:"14px",color:"#991b1b",lineHeight:"1.5"},children:[(0,oi.jsx)("strong",{children:"This will permanently delete:"}),(0,oi.jsxs)("ul",{style:{margin:"8px 0 0 20px",padding:0},children:[(0,oi.jsx)("li",{children:"Your account and profile information"}),(0,oi.jsx)("li",{children:"All your settings and preferences"}),(0,oi.jsx)("li",{children:"Your transaction history"}),(0,oi.jsx)("li",{children:"All your sessions and login data"}),(0,oi.jsx)("li",{children:"Any saved payment methods"}),(0,oi.jsx)("li",{children:"All associated data and records"})]})]})]}),o&&(0,oi.jsx)("div",{style:{backgroundColor:"#fef2f2",border:"1px solid #fecaca",borderRadius:"8px",padding:"12px",marginBottom:"16px",color:"#dc2626",fontSize:"14px"},children:o}),(0,oi.jsxs)(Gb,{children:[(0,oi.jsx)(Yb,{className:"secondary",onClick:n,disabled:i,whileHover:{scale:1.02},whileTap:{scale:.98},children:"Cancel"}),(0,oi.jsx)(Yb,{className:"danger",onClick:r,disabled:i,whileHover:{scale:1.02},whileTap:{scale:.98},children:i?"Deleting Account...":"Yes, Delete My Account"})]})]})]})}):null},dw=e=>{let{isOpen:n,onClose:r,theme:i}=e;const[o,a]=(0,t.useState)([]),[s,l]=(0,t.useState)(!1),[c,d]=(0,t.useState)(!1),[u,p]=(0,t.useState)(null);(0,t.useEffect)(()=>{n&&h()},[n]);const h=async()=>{l(!0);try{const e=await ii.getAllSessions();if(e.success){const t=(e.sessions||[]).filter(e=>e&&e.id&&e.createdAt);a(t)}else console.error("Failed to load sessions:",e.error),a([])}catch(e){console.error("Failed to load sessions:",e),a([]),e.message&&!e.message.includes("No active sessions")&&dt.error("Failed to load session information")}finally{l(!1)}},f=e=>new Date(e).toLocaleString(),m=e=>{if(!e||"string"!==typeof e)return"Unknown Device";const t=e.toLowerCase();return t.includes("mobile")?"Mobile Device":t.includes("tablet")?"Tablet":t.includes("windows")?"Windows PC":t.includes("mac")?"Mac":t.includes("linux")?"Linux PC":t.includes("android")?"Android Device":t.includes("iphone")||t.includes("ipad")?"iOS Device":"Unknown Device"};return n?(0,oi.jsx)(nw,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:r,children:(0,oi.jsxs)(rw,{initial:{scale:.9,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.9,opacity:0},onClick:e=>e.stopPropagation(),children:[(0,oi.jsx)(iw,{onClick:r,children:(0,oi.jsx)(Up,{size:20})}),(0,oi.jsxs)(ow,{children:[(0,oi.jsx)(aw,{children:(0,oi.jsx)(Zv,{size:20})}),(0,oi.jsxs)("div",{children:[(0,oi.jsx)(sw,{theme:i,children:"Session Management"}),(0,oi.jsx)(lw,{theme:i,children:"Manage your logged-in devices and sessions"})]})]}),s?(0,oi.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:(0,oi.jsx)("div",{style:{fontSize:"16px",color:"#64748b"},children:"Loading sessions..."})}):(0,oi.jsxs)("div",{children:[(0,oi.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,oi.jsxs)("h4",{style:{marginBottom:"16px",color:"#1e293b"},children:["Active Sessions (",o.length,")"]}),0===o.length?(0,oi.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#64748b",fontSize:"14px"},children:"No active sessions found"}):o.map((e,t)=>(0,oi.jsx)("div",{style:{padding:"16px",border:e.isCurrent?"2px solid #10b981":"2px solid #e2e8f0",borderRadius:"12px",backgroundColor:e.isCurrent?"#f0fdf4":"#ffffff",marginBottom:"12px",position:"relative"},children:(0,oi.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"},children:[(0,oi.jsxs)("div",{style:{flex:1},children:[(0,oi.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"},children:[(0,oi.jsx)("div",{style:{fontWeight:"600",color:"#1e293b"},children:e.userAgent?m(e.userAgent):"Unknown Device"}),e.isCurrent&&(0,oi.jsx)("div",{style:{padding:"4px 8px",backgroundColor:"#10b981",color:"white",borderRadius:"6px",fontSize:"12px",fontWeight:"600"},children:"Current"})]}),(0,oi.jsxs)("div",{style:{fontSize:"14px",color:"#64748b",marginBottom:"4px"},children:["IP: ",e.ipAddress||"Unknown"]}),(0,oi.jsxs)("div",{style:{fontSize:"14px",color:"#64748b",marginBottom:"4px"},children:["Logged in: ",f(e.createdAt)]}),(0,oi.jsxs)("div",{style:{fontSize:"14px",color:"#64748b"},children:["Expires: ",f(e.expiresAt)]})]}),!e.isCurrent&&(0,oi.jsx)(Yb,{className:"danger",onClick:()=>(async e=>{p(e);try{const t=await ii.revokeSession(e);t.success?(dt.success("Session revoked successfully!",{position:"bottom-right",autoClose:3e3}),await h()):dt.error(t.error||"Failed to revoke session")}catch(t){console.error("Failed to revoke session:",t),dt.error("Failed to revoke session")}finally{p(null)}})(e.id),disabled:u===e.id,style:{padding:"8px 12px",fontSize:"12px",minWidth:"auto"},whileHover:{scale:1.02},whileTap:{scale:.98},children:u===e.id?"Revoking...":"Logout"})]})},e.id))]}),(0,oi.jsxs)("div",{style:{padding:"16px",backgroundColor:"#fef3c7",border:"1px solid #f59e0b",borderRadius:"12px",marginBottom:"24px"},children:[(0,oi.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"},children:[(0,oi.jsx)(pu,{size:16,color:"#f59e0b"}),(0,oi.jsx)("div",{style:{fontWeight:"600",color:"#92400e"},children:"Security Notice"})]}),(0,oi.jsx)("div",{style:{fontSize:"14px",color:"#92400e",lineHeight:"1.5"},children:"If you suspect unauthorized access to your account, you can force logout from all other devices. This will keep you logged in on this device but log out all other sessions."})]}),(0,oi.jsxs)(Gb,{children:[(0,oi.jsx)(Yb,{className:"secondary",onClick:r,whileHover:{scale:1.02},whileTap:{scale:.98},children:"Cancel"}),(0,oi.jsx)(Yb,{className:"danger",onClick:async()=>{d(!0);try{const e=await ii.revokeOtherSessions();e.success?(dt.success("All other sessions revoked successfully!",{position:"bottom-right",autoClose:3e3}),await h()):dt.error(e.error||"Failed to revoke sessions")}catch(e){console.error("Failed to revoke sessions:",e),dt.error("Failed to revoke other sessions")}finally{d(!1)}},disabled:c,whileHover:{scale:1.02},whileTap:{scale:.98},children:c?"Revoking...":"Force Logout Other Devices"})]})]})]})}):null},uw=()=>{var e;const n=Z(),{user:r,updateProfile:i}=si(),{theme:o,themeName:a,toggleTheme:s,selectedFont:l,setSelectedFont:c,selectedAccent:d,setSelectedAccent:u}=fi(),[p,h]=(0,t.useState)({firstName:"",lastName:"",email:"",phone:"",bio:"",emailNotifications:!0,pushNotifications:!0,salesNotifications:!0,messageNotifications:!0,systemNotifications:!1,defaultCurrency:"USD",autoWithdraw:!1,paymentReminders:!0,twoFactorAuth:!1,loginAlerts:!0,sessionTimeout:"30",theme:"light",accentColor:"#1a1a1a",compactMode:!1,profileVisibility:"public",showOnlineStatus:!0,allowMessages:!0}),[f,m]=(0,t.useState)(!1),[g,x]=(0,t.useState)(!1),[y,v]=(0,t.useState)(!1),[b,w]=(0,t.useState)(!1),[k,j]=(0,t.useState)(!1),[S,C]=(0,t.useState)(!1),[P,E]=(0,t.useState)(!1),[T,z]=(0,t.useState)(!1),[A,_]=(0,t.useState)(null);(0,t.useEffect)(()=>{M()},[r]);const M=async()=>{if(r)try{const e=r.name?r.name.split(" "):["",""],t=await ii.getUserSettings(),n=t.success?t.settings:{};h(t=>{var i,o,a,s,l,c,d,u,p,h,f,m,g,x,y,v,b;return{...t,firstName:e[0]||"",lastName:e.slice(1).join(" ")||"",email:r.email||"",phone:r.phone||"",bio:r.bio||`Professional ${r.role||"music producer"} passionate about creating amazing music.`,emailNotifications:null!==(i=n.email_notifications)&&void 0!==i?i:t.emailNotifications,pushNotifications:null!==(o=n.push_notifications)&&void 0!==o?o:t.pushNotifications,salesNotifications:null!==(a=n.sales_notifications)&&void 0!==a?a:t.salesNotifications,messageNotifications:null!==(s=n.message_notifications)&&void 0!==s?s:t.messageNotifications,systemNotifications:null!==(l=n.system_notifications)&&void 0!==l?l:t.systemNotifications,defaultCurrency:null!==(c=n.default_currency)&&void 0!==c?c:t.defaultCurrency,autoWithdraw:null!==(d=n.auto_withdraw)&&void 0!==d?d:t.autoWithdraw,paymentReminders:null!==(u=n.payment_reminders)&&void 0!==u?u:t.paymentReminders,twoFactorAuth:null!==(p=n.two_factor_auth)&&void 0!==p?p:t.twoFactorAuth,loginAlerts:null!==(h=n.login_alerts)&&void 0!==h?h:t.loginAlerts,sessionTimeout:null!==(f=n.session_timeout)&&void 0!==f?f:t.sessionTimeout,theme:null!==(m=n.theme)&&void 0!==m?m:t.theme,accentColor:null!==(g=n.accent_color)&&void 0!==g?g:t.accentColor,compactMode:null!==(x=n.compact_mode)&&void 0!==x?x:t.compactMode,profileVisibility:null!==(y=n.profile_visibility)&&void 0!==y?y:t.profileVisibility,showOnlineStatus:null!==(v=n.show_online_status)&&void 0!==v?v:t.showOnlineStatus,allowMessages:null!==(b=n.allow_messages)&&void 0!==b?b:t.allowMessages}})}catch(e){console.error("Failed to load user settings:",e)}},$=async(e,t)=>{h(n=>({...n,[e]:t}));try{const n={};if(n[{emailNotifications:"email_notifications",pushNotifications:"push_notifications",salesNotifications:"sales_notifications",messageNotifications:"message_notifications",systemNotifications:"system_notifications",defaultCurrency:"default_currency",autoWithdraw:"auto_withdraw",paymentReminders:"payment_reminders",twoFactorAuth:"two_factor_auth",loginAlerts:"login_alerts",sessionTimeout:"session_timeout",theme:"theme",accentColor:"accent_color",compactMode:"compact_mode",profileVisibility:"profile_visibility",showOnlineStatus:"show_online_status",allowMessages:"allow_messages"}[e]||e]=t,await ii.updateUserSettings(n),"sessionTimeout"===e){const e=new CustomEvent("sessionTimeoutChanged",{detail:t});window.dispatchEvent(e),dt.success(`Session timeout updated to ${t} minutes`,{position:"bottom-right",autoClose:3e3})}else dt.success("Setting updated",{position:"bottom-right",autoClose:2e3})}catch(n){console.error("Failed to update setting:",n),dt.error("Failed to update setting")}};return(0,oi.jsxs)(zb,{theme:o,children:[(0,oi.jsxs)(Ab,{children:[(0,oi.jsxs)(_b,{theme:o,onClick:()=>n(-1),whileHover:{scale:1.02},whileTap:{scale:.98},children:[(0,oi.jsx)(fu,{size:20}),"Back"]}),(0,oi.jsxs)(Mb,{theme:o,children:[(0,oi.jsx)(bh,{size:28}),"Settings"]})]}),(0,oi.jsx)("style",{children:"\n  @keyframes shimmer {\n    0% { background-position: -200% 0; }\n    100% { background-position: 200% 0; }\n  }\n"}),(0,oi.jsxs)($b,{children:[(0,oi.jsxs)(Nb,{initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.5},theme:o,children:[(0,oi.jsxs)(Rb,{children:[(0,oi.jsx)(Lb,{children:(0,oi.jsx)(Ku,{size:24})}),(0,oi.jsx)(Db,{children:"Profile & Identity"})]}),(0,oi.jsxs)(Xb,{theme:o,children:[(0,oi.jsx)(Zb,{theme:o,children:(null===r||void 0===r?void 0:r.avatar)||(null===r||void 0===r||null===(e=r.name)||void 0===e?void 0:e.split(" ").map(e=>e[0]).join("").toUpperCase())||"U"}),(0,oi.jsxs)(Jb,{children:[(0,oi.jsx)(ew,{theme:o,children:(null===r||void 0===r?void 0:r.name)||"User"}),(0,oi.jsx)(tw,{theme:o,children:(null===r||void 0===r?void 0:r.email)||"user@email.com"})]})]}),(0,oi.jsxs)(Fb,{children:[(0,oi.jsx)(Ob,{children:(0,oi.jsx)(Ib,{children:"First Name"})}),(0,oi.jsx)(Wb,{value:p.firstName,onChange:e=>$("firstName",e.target.value),placeholder:"Enter first name"})]}),(0,oi.jsxs)(Fb,{children:[(0,oi.jsx)(Ob,{children:(0,oi.jsx)(Ib,{children:"Last Name"})}),(0,oi.jsx)(Wb,{value:p.lastName,onChange:e=>$("lastName",e.target.value),placeholder:"Enter last name"})]}),(0,oi.jsxs)(Fb,{children:[(0,oi.jsx)(Ob,{children:(0,oi.jsx)(Ib,{children:"Email"})}),(0,oi.jsx)(Wb,{type:"email",value:p.email,onChange:e=>$("email",e.target.value),placeholder:"Enter email"})]}),(0,oi.jsxs)(Fb,{children:[(0,oi.jsx)(Ob,{children:(0,oi.jsx)(Ib,{children:"Phone"})}),(0,oi.jsx)(Wb,{value:p.phone,onChange:e=>$("phone",e.target.value),placeholder:"Enter phone number"})]}),(0,oi.jsx)(Gb,{children:(0,oi.jsxs)(Yb,{onClick:()=>{_(null),m(!0)},whileHover:{scale:1.02},whileTap:{scale:.98},children:[(0,oi.jsx)(Kf,{size:16}),"Save Changes"]})})]}),(0,oi.jsxs)(Nb,{theme:o,initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.5,delay:.1},children:[(0,oi.jsxs)(Rb,{children:[(0,oi.jsx)(Lb,{children:(0,oi.jsx)(Gf,{size:20})}),(0,oi.jsx)(Db,{children:"Password Management"})]}),(0,oi.jsxs)(Fb,{children:[(0,oi.jsxs)(Ob,{children:[(0,oi.jsx)(Ib,{children:"Change Password"}),(0,oi.jsx)(Bb,{children:"Update your password securely with current password verification"})]}),(0,oi.jsxs)(Yb,{onClick:()=>x(!0),whileHover:{scale:1.02},whileTap:{scale:.98},children:[(0,oi.jsx)(Gf,{size:16}),"Change Password"]})]}),(0,oi.jsxs)(Fb,{children:[(0,oi.jsxs)(Ob,{children:[(0,oi.jsx)(Ib,{children:"Password Security"}),(0,oi.jsx)(Bb,{children:"Your password must meet security requirements"})]}),(0,oi.jsxs)("div",{style:{fontSize:"12px",color:"#64748b"},children:["\u2022 At least 8 characters",(0,oi.jsx)("br",{}),"\u2022 One uppercase letter",(0,oi.jsx)("br",{}),"\u2022 One lowercase letter",(0,oi.jsx)("br",{}),"\u2022 One number",(0,oi.jsx)("br",{}),"\u2022 One special character"]})]})]}),(0,oi.jsxs)(Nb,{theme:o,initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.5,delay:.2},children:[(0,oi.jsxs)(Rb,{children:[(0,oi.jsx)(Lb,{children:(0,oi.jsx)(pu,{size:20})}),(0,oi.jsx)(Db,{children:"Security"})]}),(0,oi.jsxs)(Fb,{children:[(0,oi.jsxs)(Ob,{children:[(0,oi.jsx)(Ib,{children:"Two-Factor Authentication"}),(0,oi.jsx)(Bb,{children:"Add an extra layer of security with authenticator app"})]}),(0,oi.jsxs)(Yb,{onClick:()=>v(!0),whileHover:{scale:1.02},whileTap:{scale:.98},children:[(0,oi.jsx)(pu,{size:16}),p.twoFactorAuth?"Manage 2FA":"Enable 2FA"]})]}),(0,oi.jsxs)(Fb,{children:[(0,oi.jsxs)(Ob,{children:[(0,oi.jsx)(Ib,{children:"Login Alerts"}),(0,oi.jsx)(Bb,{children:"Get notified of new login attempts"})]}),(0,oi.jsxs)(Vb,{children:[(0,oi.jsx)(Ub,{type:"checkbox",checked:p.loginAlerts,onChange:e=>$("loginAlerts",e.target.checked)}),(0,oi.jsx)(Hb,{})]})]}),(0,oi.jsxs)(Fb,{children:[(0,oi.jsxs)(Ob,{children:[(0,oi.jsx)(Ib,{children:"Session Timeout"}),(0,oi.jsx)(Bb,{children:"Auto-logout after inactivity"})]}),(0,oi.jsxs)(qb,{value:p.sessionTimeout,onChange:e=>$("sessionTimeout",e.target.value),children:[(0,oi.jsx)("option",{value:"2",children:"2 minutes"}),(0,oi.jsx)("option",{value:"15",children:"15 minutes"}),(0,oi.jsx)("option",{value:"30",children:"30 minutes"}),(0,oi.jsx)("option",{value:"60",children:"1 hour"}),(0,oi.jsx)("option",{value:"120",children:"2 hours"})]})]}),(0,oi.jsxs)(Fb,{children:[(0,oi.jsxs)(Ob,{children:[(0,oi.jsx)(Ib,{children:"Active Sessions"}),(0,oi.jsx)(Bb,{children:"Manage your logged-in devices"})]}),(0,oi.jsxs)(Yb,{onClick:()=>w(!0),whileHover:{scale:1.02},whileTap:{scale:.98},children:[(0,oi.jsx)(Zv,{size:16}),"Manage Sessions"]})]})]}),(0,oi.jsxs)(Nb,{theme:o,initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.5,delay:.3},children:[(0,oi.jsxs)(Rb,{children:[(0,oi.jsx)(Lb,{children:(0,oi.jsx)(th,{size:20})}),(0,oi.jsx)(Db,{children:"Payment Settings"})]}),(0,oi.jsxs)(Fb,{children:[(0,oi.jsxs)(Ob,{children:[(0,oi.jsx)(Ib,{children:"Default Currency"}),(0,oi.jsx)(Bb,{children:"Choose your preferred currency"})]}),(0,oi.jsxs)(qb,{value:p.defaultCurrency,onChange:e=>$("defaultCurrency",e.target.value),children:[(0,oi.jsx)("option",{value:"USD",children:"USD ($)"}),(0,oi.jsx)("option",{value:"EUR",children:"EUR (\u20ac)"}),(0,oi.jsx)("option",{value:"GBP",children:"GBP (\xa3)"}),(0,oi.jsx)("option",{value:"KES",children:"KES (KSh)"})]})]}),(0,oi.jsxs)(Fb,{children:[(0,oi.jsxs)(Ob,{children:[(0,oi.jsx)(Ib,{children:"Auto Withdraw"}),(0,oi.jsx)(Bb,{children:"Automatically withdraw earnings"})]}),(0,oi.jsxs)(Vb,{children:[(0,oi.jsx)(Ub,{type:"checkbox",checked:p.autoWithdraw,onChange:e=>$("autoWithdraw",e.target.checked)}),(0,oi.jsx)(Hb,{})]})]}),(0,oi.jsxs)(Fb,{children:[(0,oi.jsxs)(Ob,{children:[(0,oi.jsx)(Ib,{children:"Payment Reminders"}),(0,oi.jsx)(Bb,{children:"Send payment reminders to clients"})]}),(0,oi.jsxs)(Vb,{children:[(0,oi.jsx)(Ub,{type:"checkbox",checked:p.paymentReminders,onChange:e=>$("paymentReminders",e.target.checked)}),(0,oi.jsx)(Hb,{})]})]})]}),(0,oi.jsxs)(Nb,{theme:o,initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.5,delay:.4},children:[(0,oi.jsxs)(Rb,{children:[(0,oi.jsx)(Lb,{children:(0,oi.jsx)(vh,{size:20})}),(0,oi.jsx)(Db,{children:"Notifications"})]}),(0,oi.jsxs)(Fb,{children:[(0,oi.jsxs)(Ob,{children:[(0,oi.jsx)(Ib,{children:"Email Notifications"}),(0,oi.jsx)(Bb,{children:"Receive notifications via email"})]}),(0,oi.jsxs)(Vb,{children:[(0,oi.jsx)(Ub,{type:"checkbox",checked:p.emailNotifications,onChange:e=>$("emailNotifications",e.target.checked)}),(0,oi.jsx)(Hb,{})]})]}),(0,oi.jsxs)(Fb,{children:[(0,oi.jsxs)(Ob,{children:[(0,oi.jsx)(Ib,{children:"Push Notifications"}),(0,oi.jsx)(Bb,{children:"Receive push notifications"})]}),(0,oi.jsxs)(Vb,{children:[(0,oi.jsx)(Ub,{type:"checkbox",checked:p.pushNotifications,onChange:e=>$("pushNotifications",e.target.checked)}),(0,oi.jsx)(Hb,{})]})]}),(0,oi.jsxs)(Fb,{children:[(0,oi.jsxs)(Ob,{children:[(0,oi.jsx)(Ib,{children:"Sales Notifications"}),(0,oi.jsx)(Bb,{children:"Notify when beats are sold"})]}),(0,oi.jsxs)(Vb,{children:[(0,oi.jsx)(Ub,{type:"checkbox",checked:p.salesNotifications,onChange:e=>$("salesNotifications",e.target.checked)}),(0,oi.jsx)(Hb,{})]})]}),(0,oi.jsxs)(Fb,{children:[(0,oi.jsxs)(Ob,{children:[(0,oi.jsx)(Ib,{children:"Message Notifications"}),(0,oi.jsx)(Bb,{children:"Notify when receiving messages"})]}),(0,oi.jsxs)(Vb,{children:[(0,oi.jsx)(Ub,{type:"checkbox",checked:p.messageNotifications,onChange:e=>$("messageNotifications",e.target.checked)}),(0,oi.jsx)(Hb,{})]})]})]}),(0,oi.jsxs)(Nb,{theme:o,initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.5,delay:.5},children:[(0,oi.jsxs)(Rb,{children:[(0,oi.jsx)(Lb,{children:(0,oi.jsx)(Jv,{size:20})}),(0,oi.jsx)(Db,{children:"Appearance"})]}),(0,oi.jsxs)(Fb,{children:[(0,oi.jsxs)(Ob,{children:[(0,oi.jsx)(Ib,{children:"Theme"}),(0,oi.jsx)(Bb,{children:"Choose your preferred theme"})]}),(0,oi.jsxs)(qb,{value:a,onChange:e=>{const t=e.target.value;("dark"===t&&"dark"!==a||"light"===t&&"light"!==a||"glassmorphism"===t&&"glassmorphism"!==a)&&s()},children:[(0,oi.jsx)("option",{value:"light",children:"Light"}),(0,oi.jsx)("option",{value:"dark",children:"Dark"}),(0,oi.jsx)("option",{value:"glassmorphism",children:"Glassmorphism"})]})]}),(0,oi.jsxs)(Fb,{children:[(0,oi.jsxs)(Ob,{children:[(0,oi.jsx)(Ib,{children:"Accent Theme"}),(0,oi.jsxs)(Bb,{children:["Choose your color theme","default"===d&&(0,oi.jsx)("span",{style:{color:o.colors.textTertiary,fontSize:"11px",display:"block",marginTop:"2px"},children:"\u2022 Currently using default neutral theme"})]})]}),(0,oi.jsx)(Qb,{children:Object.entries(ui).filter(e=>{let[t]=e;return"default"!==t}).map(e=>{let[t,n]=e;return(0,oi.jsxs)("div",{style:{textAlign:"center"},children:[(0,oi.jsx)(Kb,{style:{background:n.gradient,border:d===t?`3px solid ${o.colors.textPrimary}`:"3px solid transparent"},className:d===t?"active":"",onClick:()=>{u(d===t?"default":t)},title:`${n.name} - ${n.description}${d===t?" (Click again to reset to default)":""}`}),(0,oi.jsx)("div",{style:{fontSize:"11px",marginTop:"6px",color:o.colors.textSecondary,fontWeight:d===t?"600":"400",transition:"all 0.2s ease"},children:n.name})]},t)})})]}),(0,oi.jsxs)(Fb,{children:[(0,oi.jsxs)(Ob,{children:[(0,oi.jsx)(Ib,{children:"Font Family"}),(0,oi.jsx)(Bb,{children:"Choose your preferred font style"})]}),(0,oi.jsxs)("div",{style:{width:"100%"},children:[(0,oi.jsxs)(qb,{value:l,onChange:e=>c(e.target.value),style:{marginBottom:"12px"},children:[(0,oi.jsx)("optgroup",{label:"Professional Fonts",children:Object.entries(ci).filter(e=>{let[t,n]=e;return"Professional"===n.category}).map(e=>{let[t,n]=e;return(0,oi.jsxs)("option",{value:t,children:[n.name," - ",n.description]},t)})}),(0,oi.jsx)("optgroup",{label:"Fun & Curvy Fonts",children:Object.entries(ci).filter(e=>{let[t,n]=e;return"Fun"===n.category}).map(e=>{let[t,n]=e;return(0,oi.jsxs)("option",{value:t,children:[n.name," - ",n.description]},t)})})]}),(0,oi.jsxs)("div",{style:{padding:"16px",border:`1px solid ${o.colors.borderPrimary}`,borderRadius:"12px",backgroundColor:o.colors.secondary,fontSize:"14px",lineHeight:"1.6"},children:[(0,oi.jsx)("div",{style:{fontFamily:ci[l].family,fontWeight:"600",fontSize:"16px",marginBottom:"8px",color:o.colors.textPrimary},children:"Sample Heading"}),(0,oi.jsxs)("div",{style:{fontFamily:ci[l].family,color:o.colors.textSecondary,marginBottom:"8px"},children:["This is how your text will look with ",ci[l].name,". ",ci[l].description,"."]}),(0,oi.jsxs)("div",{style:{fontFamily:ci[l].family,fontSize:"12px",color:o.colors.textTertiary,padding:"8px",backgroundColor:o.colors.tertiary,borderRadius:"6px",border:`1px solid ${o.colors.borderSecondary}`},children:[(0,oi.jsx)("strong",{children:"Category:"})," ",ci[l].category]})]})]})]})]}),(0,oi.jsxs)(Nb,{theme:o,initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.5,delay:.6},children:[(0,oi.jsxs)(Rb,{children:[(0,oi.jsx)(Lb,{children:(0,oi.jsx)(eb,{size:20})}),(0,oi.jsx)(Db,{children:"Privacy & Data"})]}),(0,oi.jsxs)(Fb,{children:[(0,oi.jsxs)(Ob,{children:[(0,oi.jsx)(Ib,{children:"Profile Visibility"}),(0,oi.jsx)(Bb,{children:"Control who can see your profile"})]}),(0,oi.jsxs)(qb,{value:p.profileVisibility,onChange:e=>$("profileVisibility",e.target.value),children:[(0,oi.jsx)("option",{value:"public",children:"Public"}),(0,oi.jsx)("option",{value:"private",children:"Private"}),(0,oi.jsx)("option",{value:"clients",children:"Clients Only"})]})]}),(0,oi.jsxs)(Fb,{children:[(0,oi.jsxs)(Ob,{children:[(0,oi.jsx)(Ib,{children:"Show Online Status"}),(0,oi.jsx)(Bb,{children:"Let others see when you're online"})]}),(0,oi.jsxs)(Vb,{children:[(0,oi.jsx)(Ub,{type:"checkbox",checked:p.showOnlineStatus,onChange:e=>$("showOnlineStatus",e.target.checked)}),(0,oi.jsx)(Hb,{})]})]}),(0,oi.jsxs)(Fb,{children:[(0,oi.jsxs)(Ob,{children:[(0,oi.jsx)(Ib,{children:"Allow Messages"}),(0,oi.jsx)(Bb,{children:"Allow clients to send messages"})]}),(0,oi.jsxs)(Vb,{children:[(0,oi.jsx)(Ub,{type:"checkbox",checked:p.allowMessages,onChange:e=>$("allowMessages",e.target.checked)}),(0,oi.jsx)(Hb,{})]})]}),(0,oi.jsxs)(Gb,{children:[(0,oi.jsxs)(Yb,{onClick:()=>{j(!0)},className:"secondary",whileHover:{scale:1.02},whileTap:{scale:.98},children:[(0,oi.jsx)(Kh,{size:16}),"Export Data"]}),(0,oi.jsxs)(Yb,{onClick:()=>{C(!0)},className:"danger",whileHover:{scale:1.02},whileTap:{scale:.98},children:[(0,oi.jsx)(Up,{size:16}),"Delete Account"]})]})]})]}),(0,oi.jsx)(cm,{isOpen:f,onClose:()=>m(!1),onVerify:async e=>{z(!0),_(null);try{const t={name:`${p.firstName} ${p.lastName}`.trim(),email:p.email,phone:p.phone,bio:p.bio,currentPassword:e},n=await i(t);n.success?(m(!1),z(!1),dt.success("Profile updated successfully",{position:"bottom-right",autoClose:3e3})):(_(n.error||"Failed to update profile"),z(!1))}catch(t){_("An error occurred while updating profile"),z(!1)}},title:"Verify Password",description:"Enter your current password to save profile changes",loading:T,error:A}),(0,oi.jsx)(cm,{isOpen:k,onClose:()=>j(!1),onVerify:async e=>{try{z(!0),_(null);const t=dt.loading("Preparing your data export...",{position:"bottom-right"}),n=await ii.exportData(e);dt.dismiss(t),n.success?(dt.success(`Data export completed! Check your email (${n.email}) for the exported files.`,{position:"bottom-right",autoClose:5e3}),j(!1)):_(n.error||"Failed to export data")}catch(t){console.error("Export data error:",t),_("Failed to export data. Please try again later.")}finally{z(!1)}},title:"Export Data",description:"Enter your password to export your data securely",loading:T,error:A}),(0,oi.jsx)(cm,{isOpen:S,onClose:()=>C(!1),onVerify:async e=>{try{z(!0),_(null);(await ii.verifyPassword(e)).success?(C(!1),E(!0)):_("Password is incorrect. Please try again.")}catch(t){console.error("Password verification error:",t),_("Failed to verify password. Please try again.")}finally{z(!1)}},title:"Delete Account",description:"Enter your password to proceed with account deletion",loading:T,error:A}),(0,oi.jsx)(cw,{isOpen:P,onClose:()=>E(!1),onConfirm:async()=>{try{z(!0),_(null);const e=await ii.deleteAccount();e.success?(dt.success("Account deleted successfully. You will be logged out.",{position:"bottom-right",autoClose:3e3}),localStorage.removeItem("token"),localStorage.removeItem("user"),setTimeout(()=>{window.location.href="/login"},2e3)):_(e.error||"Failed to delete account. Please try again.")}catch(e){console.error("Delete account error:",e),_("Failed to delete account. Please try again later.")}finally{z(!1)}},loading:T,error:A,theme:o}),(0,oi.jsx)(Rm,{isOpen:g,onClose:()=>x(!1),onPasswordChange:async(e,t)=>{z(!0),_(null);try{const n=await ii.changePassword(e,t);n.success?(x(!1),z(!1),dt.success("Password changed successfully! Please log in again with your new password.",{position:"bottom-right",autoClose:5e3}),setTimeout(()=>{},2e3)):(_(n.error||"Failed to change password"),z(!1))}catch(n){_("An error occurred while changing password"),z(!1)}},loading:T,error:A}),(0,oi.jsx)(Tb,{isOpen:y,onClose:()=>v(!1),current2FAStatus:p.twoFactorAuth,onStatusChange:e=>{h(t=>({...t,twoFactorAuth:e})),dt.success(e?"Two-factor authentication enabled!":"Two-factor authentication disabled!",{position:"bottom-right",autoClose:3e3})}}),(0,oi.jsx)(dw,{isOpen:b,onClose:()=>w(!1),theme:o})]})},pw=uu("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]),hw=uu("MapPin",[["path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",key:"2oe9fu"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]),fw=uu("Building",[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",ry:"2",key:"76otgf"}],["path",{d:"M9 22v-4h6v4",key:"r93iot"}],["path",{d:"M8 6h.01",key:"1dz90k"}],["path",{d:"M16 6h.01",key:"1x0f13"}],["path",{d:"M12 6h.01",key:"1vi96p"}],["path",{d:"M12 10h.01",key:"1nrarc"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M16 10h.01",key:"1m94wz"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M8 10h.01",key:"19clt8"}],["path",{d:"M8 14h.01",key:"6423bh"}]]),mw=ei(cu.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`,gw=ei(cu.div)`
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`,xw=ei.div`
  padding: 24px 24px 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 24px;
`,yw=ei.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 8px;
`,vw=ei.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
  }
`,bw=ei.div`
  padding: 0 24px 24px 24px;
`,ww=ei.form`
  display: grid;
  gap: 20px;
`,kw=ei.div`
  display: grid;
  gap: 8px;
`,jw=ei.label`
  font-weight: 500;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 6px;
`,Sw=ei.input`
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`,Cw=ei.select`
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`,Pw=ei.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,Ew=ei.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`,Tw=ei.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  &.primary {
    background: #3b82f6;
    color: white;

    &:hover {
      background: #2563eb;
    }

    &:disabled {
      background: #9ca3af;
      cursor: not-allowed;
    }
  }

  &.secondary {
    background: #f3f4f6;
    color: #374151;

    &:hover {
      background: #e5e7eb;
    }
  }
`,zw=ei.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e7eb;
`,Aw=e=>{let{isOpen:n,onClose:r,onBeneficiaryAdded:i}=e;const[o,a]=(0,t.useState)(!1),[s,l]=(0,t.useState)({name:"",email:"",phone:"",address:"",account_number:"",bank_name:"",bank_code:"",account_type:"checking",relationship:"friend",notes:""}),c=(e,t)=>{l(n=>({...n,[e]:t}))};return(0,oi.jsx)(Vp,{children:n&&(0,oi.jsx)(mw,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:r,children:(0,oi.jsxs)(gw,{initial:{scale:.9,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.9,opacity:0},onClick:e=>e.stopPropagation(),children:[(0,oi.jsxs)(xw,{children:[(0,oi.jsxs)(yw,{children:[(0,oi.jsx)(rh,{size:24}),"Add New Beneficiary"]}),(0,oi.jsx)(vw,{onClick:r,children:(0,oi.jsx)(Up,{size:20})})]}),(0,oi.jsx)(bw,{children:(0,oi.jsxs)(ww,{onSubmit:async e=>{if(e.preventDefault(),!s.name||!s.email||!s.account_number||!s.bank_name)return void dt.error("Please fill in all required fields");if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email))try{a(!0);(await ii.createBeneficiary(s)).success&&(dt.success("Beneficiary added successfully!"),l({name:"",email:"",phone:"",address:"",account_number:"",bank_name:"",bank_code:"",account_type:"checking",relationship:"friend",notes:""}),i&&i(),r())}catch(t){console.error("Failed to add beneficiary:",t),dt.error("Failed to add beneficiary. Please try again.")}finally{a(!1)}else dt.error("Please enter a valid email address")},children:[(0,oi.jsx)(zw,{children:"Personal Information"}),(0,oi.jsxs)(kw,{children:[(0,oi.jsxs)(jw,{children:[(0,oi.jsx)(rh,{size:16}),"Full Name *"]}),(0,oi.jsx)(Sw,{type:"text",value:s.name,onChange:e=>c("name",e.target.value),placeholder:"John Doe",required:!0})]}),(0,oi.jsxs)(Pw,{children:[(0,oi.jsxs)(kw,{children:[(0,oi.jsx)(jw,{children:"Email Address *"}),(0,oi.jsx)(Sw,{type:"email",value:s.email,onChange:e=>c("email",e.target.value),placeholder:"john@example.com",required:!0})]}),(0,oi.jsxs)(kw,{children:[(0,oi.jsxs)(jw,{children:[(0,oi.jsx)(pw,{size:16}),"Phone Number"]}),(0,oi.jsx)(Sw,{type:"tel",value:s.phone,onChange:e=>c("phone",e.target.value),placeholder:"+1 (555) 123-4567"})]})]}),(0,oi.jsxs)(kw,{children:[(0,oi.jsxs)(jw,{children:[(0,oi.jsx)(hw,{size:16}),"Address"]}),(0,oi.jsx)(Sw,{type:"text",value:s.address,onChange:e=>c("address",e.target.value),placeholder:"123 Main St, City, State 12345"})]}),(0,oi.jsx)(zw,{children:"Banking Information"}),(0,oi.jsxs)(kw,{children:[(0,oi.jsxs)(jw,{children:[(0,oi.jsx)(th,{size:16}),"Account Number *"]}),(0,oi.jsx)(Sw,{type:"text",value:s.account_number,onChange:e=>c("account_number",e.target.value),placeholder:"1234567890",required:!0})]}),(0,oi.jsxs)(Pw,{children:[(0,oi.jsxs)(kw,{children:[(0,oi.jsxs)(jw,{children:[(0,oi.jsx)(fw,{size:16}),"Bank Name *"]}),(0,oi.jsx)(Sw,{type:"text",value:s.bank_name,onChange:e=>c("bank_name",e.target.value),placeholder:"Bank of America",required:!0})]}),(0,oi.jsxs)(kw,{children:[(0,oi.jsx)(jw,{children:"Bank Code / Routing Number"}),(0,oi.jsx)(Sw,{type:"text",value:s.bank_code,onChange:e=>c("bank_code",e.target.value),placeholder:"123456789"})]})]}),(0,oi.jsxs)(Pw,{children:[(0,oi.jsxs)(kw,{children:[(0,oi.jsx)(jw,{children:"Account Type"}),(0,oi.jsxs)(Cw,{value:s.account_type,onChange:e=>c("account_type",e.target.value),children:[(0,oi.jsx)("option",{value:"checking",children:"Checking"}),(0,oi.jsx)("option",{value:"savings",children:"Savings"}),(0,oi.jsx)("option",{value:"business",children:"Business"}),(0,oi.jsx)("option",{value:"money_market",children:"Money Market"})]})]}),(0,oi.jsxs)(kw,{children:[(0,oi.jsx)(jw,{children:"Relationship"}),(0,oi.jsxs)(Cw,{value:s.relationship,onChange:e=>c("relationship",e.target.value),children:[(0,oi.jsx)("option",{value:"family",children:"Family"}),(0,oi.jsx)("option",{value:"friend",children:"Friend"}),(0,oi.jsx)("option",{value:"business",children:"Business"}),(0,oi.jsx)("option",{value:"vendor",children:"Vendor"}),(0,oi.jsx)("option",{value:"employee",children:"Employee"}),(0,oi.jsx)("option",{value:"other",children:"Other"})]})]})]}),(0,oi.jsxs)(kw,{children:[(0,oi.jsx)(jw,{children:"Notes (Optional)"}),(0,oi.jsx)(Sw,{type:"text",value:s.notes,onChange:e=>c("notes",e.target.value),placeholder:"Additional notes about this beneficiary..."})]}),(0,oi.jsxs)(Ew,{children:[(0,oi.jsx)(Tw,{type:"button",className:"secondary",onClick:r,children:"Cancel"}),(0,oi.jsx)(Tw,{type:"submit",className:"primary",disabled:o,children:o?"Adding...":"Add Beneficiary"})]})]})})]})})})},_w=ei.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`,Mw=ei.div`
  margin-bottom: 32px;
`,$w=ei.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
`,Nw=ei.p`
  color: #64748b;
  font-size: 16px;
`,Rw=ei.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 24px;
`,Lw=ei.input`
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  min-width: 300px;
  background: white;
  color: #1e293b;
  transition: all 0.2s ease;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: #1a1a1a;
    box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
  }
`,Dw=ei.button`
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  padding: 12px 16px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  color: #64748b;

  &:hover {
    background: #f1f5f9;
    border-color: #1a1a1a;
    color: #1e293b;
  }
`,Fw=ei(cu.button)`
  background: linear-gradient(135deg, #1a1a1a, #333333);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
`,Ow=ei.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`,Iw=ei(cu.div)`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }
`,Bw=ei.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`,Vw=ei.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1a1a1a, #333333);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: 600;
  flex-shrink: 0;
`,Uw=ei.div`
  flex: 1;
`,Hw=ei.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
`,Ww=ei.p`
  color: #64748b;
  font-size: 14px;
  margin-bottom: 4px;
`,qw=ei.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`,Yw=ei.div`
  text-align: center;
`,Gw=ei.div`
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 4px;
`,Kw=ei.div`
  font-size: 12px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,Qw=ei.div`
  display: flex;
  gap: 8px;
`,Xw=ei.button`
  background: none;
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f1f5f9;
    color: #1a1a1a;
    transform: scale(1.1);
  }

  &.danger:hover {
    background: #fef2f2;
    color: #ef4444;
  }
`,Zw=()=>{const[e,n]=(0,t.useState)(""),[r,i]=(0,t.useState)([]),[o,a]=(0,t.useState)(!0),[s,l]=(0,t.useState)(!1);(0,t.useEffect)(()=>{c()},[]);const c=async()=>{try{a(!0);const e=await ii.getBeneficiaries();e.success&&i(e.beneficiaries)}catch(e){console.error("Failed to load beneficiaries:",e),dt.error("Failed to load beneficiaries")}finally{a(!1)}},d=r.filter(t=>t.name.toLowerCase().includes(e.toLowerCase())||t.email.toLowerCase().includes(e.toLowerCase()));return(0,oi.jsxs)(_w,{children:[(0,oi.jsxs)(Mw,{children:[(0,oi.jsxs)($w,{children:[(0,oi.jsx)(rh,{size:28}),"Clients"]}),(0,oi.jsx)(Nw,{children:"Manage your music clients and track their purchases"})]}),(0,oi.jsxs)(Rw,{children:[(0,oi.jsx)(Lw,{placeholder:"Search clients by name or email...",value:e,onChange:e=>n(e.target.value)}),(0,oi.jsxs)(Dw,{children:[(0,oi.jsx)(_x,{size:16}),"Filter"]}),(0,oi.jsxs)(Fw,{onClick:()=>{l(!0)},whileHover:{scale:1.02},whileTap:{scale:.98},children:[(0,oi.jsx)(Lg,{size:16}),"Add Client"]})]}),(0,oi.jsx)(Ow,{children:d.map((e,t)=>{var n;return(0,oi.jsxs)(Iw,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.4,delay:.1*t},children:[(0,oi.jsxs)(Bw,{children:[(0,oi.jsx)(Vw,{children:(null===(n=e.name)||void 0===n?void 0:n.charAt(0))||"B"}),(0,oi.jsxs)(Uw,{children:[(0,oi.jsx)(Hw,{children:e.name}),(0,oi.jsx)(Ww,{children:e.email})]})]}),(0,oi.jsxs)(qw,{children:[(0,oi.jsxs)(Yw,{children:[(0,oi.jsx)(Gw,{children:e.account_number}),(0,oi.jsx)(Kw,{children:"Account"})]}),(0,oi.jsxs)(Yw,{children:[(0,oi.jsx)(Gw,{children:e.bank_name}),(0,oi.jsx)(Kw,{children:"Bank"})]}),(0,oi.jsxs)(Yw,{children:[(0,oi.jsx)(Gw,{children:e.relationship}),(0,oi.jsx)(Kw,{children:"Relationship"})]})]}),(0,oi.jsxs)(Qw,{children:[(0,oi.jsx)(Xw,{onClick:()=>{return t=e.id,void dt.info(`Editing client ${t}...`,{position:"bottom-right",autoClose:2e3});var t},children:(0,oi.jsx)(Yf,{size:16})}),(0,oi.jsx)(Xw,{className:"danger",onClick:()=>{return t=e.id,void dt.error(`Client ${t} deleted!`,{position:"bottom-right",autoClose:3e3});var t},children:(0,oi.jsx)(ig,{size:16})})]})]},e.id)})}),(0,oi.jsx)(Aw,{isOpen:s,onClose:()=>l(!1),onBeneficiaryAdded:()=>{c()}})]})},Jw=uu("Volume2",[["polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5",key:"16drj5"}],["path",{d:"M15.54 8.46a5 5 0 0 1 0 7.07",key:"ltjumu"}],["path",{d:"M19.07 4.93a10 10 0 0 1 0 14.14",key:"1kegas"}]]),ek=uu("Play",[["polygon",{points:"5 3 19 12 5 21 5 3",key:"191637"}]]),tk=uu("Video",[["path",{d:"m22 8-6 4 6 4V8Z",key:"50v9me"}],["rect",{width:"14",height:"12",x:"2",y:"6",rx:"2",ry:"2",key:"1rqjg6"}]]),nk=uu("FileAudio",[["path",{d:"M17.5 22h.5c.5 0 1-.2 1.4-.6.4-.4.6-.9.6-1.4V7.5L14.5 2H6c-.5 0-1 .2-1.4.6C4.2 3 4 3.5 4 4v3",key:"1013sb"}],["polyline",{points:"14 2 14 8 20 8",key:"1ew0cm"}],["path",{d:"M10 20v-1a2 2 0 1 1 4 0v1a2 2 0 1 1-4 0Z",key:"gqt63y"}],["path",{d:"M6 20v-1a2 2 0 1 0-4 0v1a2 2 0 1 0 4 0Z",key:"cf7lqx"}],["path",{d:"M2 19v-3a6 6 0 0 1 12 0v3",key:"1acxgf"}]]),rk=uu("Square",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]]),ik=uu("Maximize2",[["polyline",{points:"15 3 21 3 21 9",key:"mznyad"}],["polyline",{points:"9 21 3 21 3 15",key:"1avn1i"}],["line",{x1:"21",x2:"14",y1:"3",y2:"10",key:"ota7mn"}],["line",{x1:"3",x2:"10",y1:"21",y2:"14",key:"1atl0r"}]]),ok=uu("SkipBack",[["polygon",{points:"19 20 9 12 19 4 19 20",key:"o2sva"}],["line",{x1:"5",x2:"5",y1:"19",y2:"5",key:"1ocqjk"}]]),ak=uu("Pause",[["rect",{width:"4",height:"16",x:"6",y:"4",key:"iffhe4"}],["rect",{width:"4",height:"16",x:"14",y:"4",key:"sjin7j"}]]),sk=uu("SkipForward",[["polygon",{points:"5 4 15 12 5 20 5 4",key:"16p6eg"}],["line",{x1:"19",x2:"19",y1:"5",y2:"19",key:"futhcm"}]]),lk=uu("VolumeX",[["polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5",key:"16drj5"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15",key:"1ewh16"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15",key:"5ykzw1"}]]),ck=ei(cu.div)`
  position: fixed;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  z-index: 1000;
  
  /* Minimized state - like YouTube mini player */
  &.minimized {
    bottom: 20px;
    right: 20px;
    width: 300px;
    height: 230px;
    top: unset;
    left: unset;
    transform: none;
    border-radius: 8px;
  }
  
  /* Default windowed state - starts here */
  &.windowed {
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    width: 800px;
    height: 600px;
    bottom: unset;
    right: unset;
  }
  
  /* Maximized state - full screen */
  &.maximized {
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    max-width: none !important;
    max-height: none !important;
    transform: none !important;
    border-radius: 0;
  }
`,dk=ei.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  padding: 0 8px 0 12px;
  user-select: none;
  cursor: move;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &.minimized {
    height: 28px;
    padding: 0 6px 0 8px;
    border-bottom: none;
  }
`,uk=ei.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
`,pk=ei.span`
  font-size: 14px;
  flex-shrink: 0;
`,hk=ei.span`
  color: white;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
  
  .minimized & {
    font-size: 11px;
    max-width: 150px;
  }
`,fk=ei.div`
  display: flex;
  align-items: center;
  gap: 1px;
`,mk=ei.button`
  width: 46px;
  height: 32px;
  border: none;
  background: transparent;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.15s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  &.minimize:hover {
    background: rgba(255, 193, 7, 0.8);
  }
  
  &.maximize:hover {
    background: rgba(40, 167, 69, 0.8);
  }
  
  &.close:hover {
    background: rgba(220, 53, 69, 0.9);
  }
  
  &:active {
    background: rgba(255, 255, 255, 0.2);
  }
`,gk=ei.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.3) 30%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0.3) 70%,
    rgba(0, 0, 0, 0.8) 100%
  );
  opacity: ${e=>e.$show?1:0};
  transition: opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px;
`,xk=ei.div`
  width: 100%;
  height: 3px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  overflow: hidden;
  margin-top: auto;
  margin-bottom: 8px;
`,yk=ei.div`
  height: 100%;
  background: #ff0000;
  border-radius: 2px;
  transition: width 0.1s ease;
`,vk=ei.div`
  display: flex;
  justify-content: flex-end;
  gap: 4px;
`,bk=ei.button`
  width: 32px;
  height: 32px;
  border: none;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`,wk=ei.div`
  position: relative;
  width: 100%;
  height: 100%;
  
  &.minimized {
    height: calc(100% - 60px);
  }
`,kk=ei.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #000;
  
  &.minimized {
    height: 60px;
    object-fit: cover;
  }
`,jk=ei.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  
  &.minimized {
    height: 60px;
  }
`,Sk=ei.div`
  text-align: center;
  color: white;
`,Ck=ei.div`
  display: flex;
  align-items: end;
  justify-content: center;
  gap: 2px;
  height: 60px;
  margin-bottom: 20px;
`,Pk=ei.div`
  width: 3px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 2px;
  transition: height 0.3s ease;
  
  &.playing {
    animation: pulse 1s ease-in-out infinite alternate;
  }
  
  @keyframes pulse {
    from { opacity: 0.5; }
    to { opacity: 1; }
  }
`,Ek=ei.div`
  text-align: center;
`,Tk=ei.h3`
  margin: 0 0 8px 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
`,zk=ei.p`
  margin: 0;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
`,Ak=ei.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`,_k=ei.div`
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`,Mk=ei.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
`,$k=ei.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: #ef4444;
  color: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 12px;
`,Nk=ei.div`
  font-weight: 500;
`,Rk=ei.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`,Lk=ei(cu.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  padding: 16px;
  
  &.minimized {
    position: relative;
    background: rgba(0, 0, 0, 0.9);
    padding: 8px 12px;
  }
`,Dk=ei.div`
  margin-bottom: 16px;
`,Fk=ei.div`
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  position: relative;
  cursor: pointer;
  margin-bottom: 8px;
  
  &:hover {
    height: 8px;
  }
`,Ok=ei.div`
  height: 100%;
  background: #3b82f6;
  border-radius: 3px;
  transition: width 0.1s ease;
`,Ik=ei.div`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background: #3b82f6;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translate(-50%, -50%) scale(1.2);
  }
`,Bk=ei.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
`,Vk=ei.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`,Uk=ei.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,Hk=ei.div`
  flex: 1;
  text-align: center;
  margin: 0 16px;
`,Wk=ei.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,qk=ei.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  &.danger:hover {
    background: rgba(239, 68, 68, 0.2);
    color: #fca5a5;
  }
`,Yk=ei.button`
  background: #3b82f6;
  border: none;
  color: white;
  cursor: pointer;
  padding: 12px;
  border-radius: 50%;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #2563eb;
    transform: scale(1.05);
  }
  
  &.playing {
    background: #059669;
  }
`,Gk=ei.div`
  font-weight: 500;
  font-size: 0.9rem;
  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Kk=ei.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,Qk=ei.input`
  width: 80px;
  appearance: none;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  outline: none;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    background: #3b82f6;
    border-radius: 50%;
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    background: #3b82f6;
    border-radius: 50%;
    cursor: pointer;
    border: none;
  }
`,Xk=e=>{var n,r,i;let{document:o,onClose:a,onDelete:s,onDownload:l,isMinimized:c=!1,onToggleSize:d}=e;const[u,p]=(0,t.useState)(!1),[h,f]=(0,t.useState)(!1),[m,g]=(0,t.useState)(0),[x,y]=(0,t.useState)(0),[v,b]=(0,t.useState)(.7),[w,k]=(0,t.useState)(!1),[j,S]=(0,t.useState)(!0),[C,P]=(0,t.useState)(null),[E,T]=(0,t.useState)(!0),[z,A]=(0,t.useState)(null),[_,M]=(0,t.useState)(!1),$=(0,t.useRef)(null),N=(0,t.useRef)(null),R=(0,t.useRef)(null),L=(null===o||void 0===o||null===(n=o.file_type)||void 0===n?void 0:n.startsWith("video/"))||(null===o||void 0===o||null===(r=o.file_name)||void 0===r?void 0:r.toLowerCase().includes(".mp4"))||(null===o||void 0===o||null===(i=o.filename)||void 0===i?void 0:i.toLowerCase().includes(".mp4"));(0,t.useEffect)(()=>{$.current&&($.current.volume=v)},[v]),(0,t.useEffect)(()=>(null!==o&&void 0!==o&&o.id&&(async()=>{try{S(!0),P(null),console.log("Loading media file for document:",o.id);const e=await fetch(`http://localhost:5000/api/documents/${o.id}/stream`,{headers:{Authorization:`Bearer ${localStorage.getItem("monexa_token")}`}});if(!e.ok)throw new Error(`Failed to load media: ${e.status} ${e.statusText}`);const t=await e.blob(),n=URL.createObjectURL(t);console.log("Media blob created, size:",t.size,"type:",t.type),A(n)}catch(C){console.error("Failed to load media:",C),P(`Failed to load media: ${C.message}`)}finally{S(!1)}})(),()=>{z&&URL.revokeObjectURL(z)}),[o.id]),(0,t.useEffect)(()=>{const e=$.current;if(!e)return;const t=()=>{y(e.duration),S(!1)},n=()=>{g(e.currentTime)},r=()=>{f(!1),g(0)},i=()=>{P("Failed to load media file"),S(!1)},o=()=>{S(!1)};return e.addEventListener("loadedmetadata",t),e.addEventListener("timeupdate",n),e.addEventListener("ended",r),e.addEventListener("error",i),e.addEventListener("canplay",o),()=>{e.removeEventListener("loadedmetadata",t),e.removeEventListener("timeupdate",n),e.removeEventListener("ended",r),e.removeEventListener("error",i),e.removeEventListener("canplay",o)}},[o]),(0,t.useEffect)(()=>{if(L&&!c){return(()=>{T(!0),R.current&&clearTimeout(R.current),R.current=setTimeout(()=>{h&&T(!1)},3e3)})(),()=>{R.current&&clearTimeout(R.current)}}},[h,L,c]);const D=async()=>{if($.current)try{h?($.current.pause(),f(!1)):(await $.current.play(),f(!0))}catch(C){console.error("Playback error:",C),P("Playback failed")}},F=e=>{if(!$.current)return;const t=Math.max(0,Math.min(x,m+e));$.current.currentTime=t,g(t)},O=e=>{if(!e||isNaN(e))return"0:00";return`${Math.floor(e/60)}:${Math.floor(e%60).toString().padStart(2,"0")}`},I=x>0?m/x*100:0;return C?(0,oi.jsxs)($k,{children:[(0,oi.jsx)(Nk,{children:C}),(0,oi.jsx)(Rk,{onClick:a,children:(0,oi.jsx)(Up,{size:20})})]}):(0,oi.jsxs)(ck,{className:c?"minimized":u?"maximized":"windowed",initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.9},transition:{type:"spring",stiffness:300,damping:30},onMouseEnter:c?()=>M(!0):void 0,onMouseLeave:c?()=>M(!1):void 0,onMouseMove:()=>{L&&!c&&(T(!0),R.current&&clearTimeout(R.current),R.current=setTimeout(()=>{h&&T(!1)},3e3))},children:[!c&&(0,oi.jsxs)(dk,{children:[(0,oi.jsxs)(uk,{children:[(0,oi.jsx)(pk,{children:L?"\ud83c\udfac":"\ud83c\udfb5"}),(0,oi.jsx)(hk,{children:o.title||o.file_name})]}),(0,oi.jsxs)(fk,{children:[(0,oi.jsx)(mk,{onClick:()=>{d(),p(!1)},className:"minimize",children:(0,oi.jsx)(Dg,{size:14})}),(0,oi.jsx)(mk,{onClick:()=>{p(!u)},className:"maximize",children:u?(0,oi.jsx)(nb,{size:12}):(0,oi.jsx)(rk,{size:12})}),(0,oi.jsx)(mk,{onClick:a,className:"close",children:(0,oi.jsx)(Up,{size:14})})]})]}),(0,oi.jsxs)(wk,{className:c?"minimized":"",children:[L?(0,oi.jsx)(kk,{ref:$,src:z,poster:o.thumbnail,className:c?"minimized":"",onClick:D}):(0,oi.jsxs)(jk,{className:c?"minimized":"",children:[(0,oi.jsx)("audio",{ref:$,src:z}),(0,oi.jsxs)(Sk,{children:[(0,oi.jsx)(Ck,{children:Array.from({length:50},(e,t)=>(0,oi.jsx)(Pk,{style:{height:Math.random()*(h?80:20)+10+"%",animationDelay:.1*t+"s"},className:h?"playing":""},t))}),(0,oi.jsxs)(Ek,{children:[(0,oi.jsx)(Tk,{children:o.title||o.file_name}),(0,oi.jsx)(zk,{children:"Audio Track"})]})]})]}),j&&(0,oi.jsxs)(Ak,{children:[(0,oi.jsx)(_k,{}),(0,oi.jsx)(Mk,{children:"Loading media..."})]}),c&&(0,oi.jsxs)(gk,{$show:_,children:[(0,oi.jsx)(xk,{children:(0,oi.jsx)(yk,{style:{width:`${I}%`}})}),(0,oi.jsxs)(vk,{children:[(0,oi.jsx)(bk,{onClick:()=>{c&&d(),p(!1)},children:(0,oi.jsx)(ik,{size:16})}),(0,oi.jsx)(bk,{onClick:a,children:(0,oi.jsx)(Up,{size:16})})]})]})]}),(0,oi.jsx)(Vp,{children:(E||!L)&&!c&&(0,oi.jsxs)(Lk,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:20},className:c?"minimized":"",children:[(0,oi.jsxs)(Dk,{children:[(0,oi.jsxs)(Fk,{ref:N,onClick:e=>{if(!N.current||!$.current||!x)return;const t=N.current.getBoundingClientRect(),n=(e.clientX-t.left)/t.width*x;$.current.currentTime=n,g(n)},children:[(0,oi.jsx)(Ok,{style:{width:`${I}%`}}),(0,oi.jsx)(Ik,{style:{left:`${I}%`}})]}),(0,oi.jsxs)(Bk,{children:[(0,oi.jsx)("span",{children:O(m)}),(0,oi.jsx)("span",{children:O(x)})]})]}),(0,oi.jsxs)(Vk,{children:[(0,oi.jsxs)(Uk,{children:[(0,oi.jsx)(qk,{onClick:()=>F(-10),children:(0,oi.jsx)(ok,{size:c?16:20})}),(0,oi.jsx)(Yk,{onClick:D,className:h?"playing":"",children:h?(0,oi.jsx)(ak,{size:c?18:24}):(0,oi.jsx)(ek,{size:c?18:24})}),(0,oi.jsx)(qk,{onClick:()=>F(10),children:(0,oi.jsx)(sk,{size:c?16:20})})]}),(0,oi.jsx)(Hk,{children:c&&(0,oi.jsx)(Gk,{children:o.title||o.file_name})}),(0,oi.jsxs)(Wk,{children:[(0,oi.jsxs)(Kk,{children:[(0,oi.jsx)(qk,{onClick:()=>{w?(b(.7),k(!1)):(b(0),k(!0))},children:w||0===v?(0,oi.jsx)(lk,{size:c?16:18}):(0,oi.jsx)(Jw,{size:c?16:18})}),(0,oi.jsx)(Qk,{type:"range",min:"0",max:"1",step:"0.01",value:w?0:v,onChange:e=>{const t=parseFloat(e.target.value);b(t),k(0===t)}})]}),(0,oi.jsx)(qk,{onClick:l,children:(0,oi.jsx)(Kh,{size:c?16:18})}),(0,oi.jsx)(qk,{onClick:s,className:"danger",children:(0,oi.jsx)(ig,{size:c?16:18})})]})]})]})})]})},Zk=ei.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
`,Jk=ei.div`
  margin-bottom: 32px;
`,ej=ei.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`,tj=ei.p`
  color: #6b7280;
  font-size: 1.1rem;
  margin-bottom: 24px;
`,nj=ei.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
`,rj=ei.input`
  flex: 1;
  min-width: 300px;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`,ij=ei.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #f9fafb;
    border-color: #9ca3af;
  }
`,oj=ei(cu.button)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #2563eb;
  }
  
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`,aj=(ei(cu.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
`,ei(cu.div)`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`),sj=(ei.div`
  position: relative;
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`,ei.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: white;
  backdrop-filter: blur(10px);
`,ei.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s;
  cursor: pointer;
  
  ${aj}:hover & {
    opacity: 1;
  }
`,ei.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: #3b82f6;
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #2563eb;
    transform: scale(1.05);
  }
  
  &.playing {
    background: #059669;
  }
`),lj=(ei.div`
  padding: 20px;
`,ei.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`,ei.div`
  flex: 1;
`,ei.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
  line-height: 1.3;
`,ei.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #6b7280;
  font-size: 0.875rem;
`,ei.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  background: #dcfce7;
  color: #166534;
`,ei.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-size: 0.875rem;
  color: #6b7280;
`,ei.div`
  display: flex;
  gap: 8px;
  border-top: 1px solid #f3f4f6;
  padding-top: 16px;
`,ei.button`
  ${e=>"sm"===e.size?"\n    padding: 8px 10px;\n    gap: 4px;\n    font-size: 0.75rem;\n  ":"\n    flex: 1;\n    padding: 8px 12px;\n    gap: 6px;\n    font-size: 0.875rem;\n  "}
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #f9fafb;
    border-color: #9ca3af;
  }
  
  &.primary {
    background: #3b82f6;
    border-color: #3b82f6;
    color: white;
    
    &:hover {
      background: #2563eb;
    }
  }
  
  &.danger {
    background: #ef4444;
    border-color: #ef4444;
    color: white;
    
    &:hover {
      background: #dc2626;
    }
  }
`),cj=ei.div`
  text-align: center;
  padding: 48px 24px;
  color: #6b7280;
`,dj=ei.div`
  margin: 0 auto 16px;
  width: 64px;
  height: 64px;
  background: #f3f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
`,uj=(ei.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 300px;
  z-index: 1000;
`,ei.div`
  flex: 1;
`,ei.div`
  font-weight: 600;
  color: #1f2937;
  font-size: 0.875rem;
`,ei.div`
  display: flex;
  gap: 8px;
  align-items: center;
`,ei.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #3b82f6;
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #2563eb;
  }
`,ei.input`
  width: 80px;
`,ei(cu.div)`
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
`),pj=ei.div`
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
`,hj=ei.div`
  display: flex;
  align-items: center;
  padding: 16px 24px;
`,fj=ei.div`
  font-weight: 600;
  font-size: 0.875rem;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  width: ${e=>e.width||"auto"};
  flex-shrink: 0;
`,mj=ei.div`
  background: white;
`,gj=ei(cu.div)`
  display: flex;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #f3f4f6;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f9fafb;
  }
  
  &:last-child {
    border-bottom: none;
  }
`,xj=ei.div`
  width: 50px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
`,yj=ei.div`
  width: 300px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`,vj=ei.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,bj=ei.div`
  flex: 1;
  min-width: 0;
`,wj=ei.div`
  font-weight: 600;
  color: #1f2937;
  font-size: 0.875rem;
  margin-bottom: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,kj=ei.div`
  color: #6b7280;
  font-size: 0.75rem;
`,jj=ei.div`
  width: 100px;
  flex-shrink: 0;
`,Sj=ei.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  background: #dbeafe;
  color: #1e40af;
  text-transform: uppercase;
`,Cj=ei.div`
  width: 100px;
  flex-shrink: 0;
  color: #6b7280;
  font-size: 0.875rem;
`,Pj=ei.div`
  width: 140px;
  flex-shrink: 0;
  color: #6b7280;
  font-size: 0.875rem;
`,Ej=ei.div`
  width: 160px;
  flex-shrink: 0;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`,Tj=()=>{const[e,n]=(0,t.useState)(!1),[r,i]=(0,t.useState)([]),[o,a]=(0,t.useState)(!1),[s,l]=(0,t.useState)(""),[c,d]=(0,t.useState)(null),[u,p]=(0,t.useState)(!1);(0,t.useEffect)(()=>{h()},[]);const h=async()=>{try{a(!0),console.log("Loading documents...");const t=await ii.getDocuments();var e;if(console.log("Documents API response:",t),t&&t.success)console.log("Documents found:",(null===(e=t.documents)||void 0===e?void 0:e.length)||0,"documents"),i(t.documents||[]),t.documents&&t.documents.length>0&&dt.success(`Loaded ${t.documents.length} beats!`);else console.log("API call failed or no documents:",t),dt.error("Failed to load beats: "+((null===t||void 0===t?void 0:t.error)||"Unknown error"))}catch(t){console.error("Failed to load documents:",t),dt.error("Failed to load documents: "+t.message)}finally{a(!1)}},f=async e=>{try{const t=await fetch(`http://localhost:5000/api/documents/${e.id}/download`,{headers:{Authorization:`Bearer ${localStorage.getItem("monexa_token")}`}});if(!t.ok)throw new Error("Download failed");const n=await t.blob(),r=URL.createObjectURL(n),i=window.document.createElement("a");i.href=r,i.download=e.title||e.file_name||e.filename,window.document.body.appendChild(i),i.click(),window.document.body.removeChild(i),URL.revokeObjectURL(r),dt.success("Download started!")}catch(t){console.error("Download error:",t),dt.error("Failed to download file")}},m=async e=>{if(window.confirm("Are you sure you want to delete this beat?"))try{dt.success("Beat deleted successfully!"),h()}catch(t){console.error("Delete error:",t),dt.error("Failed to delete beat")}},g=r.filter(e=>{var t,n,r;return("beat"===e.category||"video"===e.category)&&((null===(t=e.title)||void 0===t?void 0:t.toLowerCase().includes(s.toLowerCase()))||(null===(n=e.filename)||void 0===n?void 0:n.toLowerCase().includes(s.toLowerCase()))||(null===(r=e.file_name)||void 0===r?void 0:r.toLowerCase().includes(s.toLowerCase())))}),x=e=>{if(0===e)return"0 Bytes";const t=Math.floor(Math.log(e)/Math.log(1024));return parseFloat((e/Math.pow(1024,t)).toFixed(2))+" "+["Bytes","KB","MB","GB"][t]};return(0,oi.jsxs)(Zk,{children:[(0,oi.jsxs)(Jk,{children:[(0,oi.jsxs)(ej,{children:[(0,oi.jsx)(Tv,{size:28}),"Media Library"]}),(0,oi.jsx)(tj,{children:"Manage your music and video collection, track your creative portfolio"}),(0,oi.jsxs)(nj,{children:[(0,oi.jsx)(rj,{placeholder:"Search media by title or filename...",value:s,onChange:e=>l(e.target.value)}),(0,oi.jsxs)(ij,{children:[(0,oi.jsx)(_x,{size:16}),"Filter"]}),(0,oi.jsxs)(oj,{onClick:()=>{document.getElementById("file-upload").click()},disabled:e,whileHover:{scale:1.02},whileTap:{scale:.98},children:[(0,oi.jsx)(Gh,{size:16}),e?"Uploading...":"Upload Media"]}),(0,oi.jsx)("input",{id:"file-upload",type:"file",style:{display:"none"},onChange:async e=>{const t=e.target.files;if(!t||0===t.length)return;const r=t[0];console.log("Selected file:",r.name,"Type:",r.type,"Size:",r.size);const i=["audio/mpeg","audio/wav","audio/ogg","audio/mp3","audio/flac","audio/aac","audio/x-wav","audio/x-mpeg","video/mp4","video/mpeg","video/quicktime","video/x-msvideo","video/webm"];if(!i.includes(r.type))return console.error("File type not allowed:",r.type,"Allowed types:",i),void dt.error(`File type "${r.type}" not supported. Please upload audio files (MP3, WAV, OGG, FLAC, AAC) or video files (MP4, MOV, AVI, WebM)`);const o=r.type.startsWith("video/")?209715200:52428800;if(r.size>o){const e=r.type.startsWith("video/")?"200MB":"50MB";return void dt.error(`File size too large. Maximum size is ${e}.`)}try{n(!0),console.log("Starting upload process...");const e=new FormData;e.append("document",r),e.append("title",r.name.replace(/\.[^/.]+$/,""));const t=r.type.startsWith("video/")?"video":"beat";e.append("category",t),console.log("FormData created with:"),console.log("- File:",r.name,r.type,r.size),console.log("- Title:",r.name.replace(/\.[^/.]+$/,"")),console.log("- Category:",t);const i=r.type.startsWith("video/")?"video":"beat";dt.info(`Uploading ${i}...`,{autoClose:1e3});const o=await ii.uploadDocument(e);if(console.log("Upload response:",o),o&&o.success)dt.success(`${i.charAt(0).toUpperCase()+i.slice(1)} uploaded successfully!`),h();else{console.log("Upload failed:",o);const e=(null===o||void 0===o?void 0:o.error)||(null===o||void 0===o?void 0:o.message)||"Unknown error";dt.error("Upload failed: "+e)}}catch(a){console.error("Upload error:",a),dt.error("Failed to upload beat: "+a.message)}finally{n(!1),e.target.value=""}},accept:"audio/*,video/*,.mp3,.wav,.ogg,.flac,.aac,.m4a,.mp4,.mov,.avi,.webm"})]})]}),o?(0,oi.jsxs)(cj,{children:[(0,oi.jsx)(dj,{children:(0,oi.jsx)(Jw,{size:24})}),(0,oi.jsx)("h3",{children:"Loading beats..."})]}):0===g.length?(0,oi.jsxs)(cj,{children:[(0,oi.jsx)(dj,{children:(0,oi.jsx)(Tv,{size:24})}),(0,oi.jsx)("h3",{children:"No media found"}),(0,oi.jsx)("p",{children:"Upload your first audio or video file to get started!"})]}):(0,oi.jsxs)(uj,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.1},children:[(0,oi.jsx)(pj,{children:(0,oi.jsxs)(hj,{children:[(0,oi.jsx)(fj,{width:"50px"}),(0,oi.jsx)(fj,{width:"300px",children:"Track"}),(0,oi.jsx)(fj,{width:"100px",children:"Format"}),(0,oi.jsx)(fj,{width:"100px",children:"Size"}),(0,oi.jsx)(fj,{width:"140px",children:"Upload Date"}),(0,oi.jsx)(fj,{width:"160px",children:"Actions"})]})}),(0,oi.jsx)(mj,{children:g.map((e,t)=>{var n,r,i,o,a;return(0,oi.jsxs)(gj,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{duration:.4,delay:.05*t},children:[(0,oi.jsx)(xj,{children:(0,oi.jsx)(sj,{onClick:()=>(e=>{console.log("Opening media player for document:",e.id),d(e),p(!1)})(e),className:(null===c||void 0===c?void 0:c.id)===e.id?"playing":"",children:(0,oi.jsx)(ek,{size:16})})}),(0,oi.jsxs)(yj,{children:[(0,oi.jsx)(vj,{children:null!==(n=e.file_type)&&void 0!==n&&n.startsWith("video/")||null!==(r=e.file_name)&&void 0!==r&&r.toLowerCase().includes(".mp4")?(0,oi.jsx)(tk,{size:20,color:"#FF6B35"}):(0,oi.jsx)(nk,{size:20,color:"#FF6B35"})}),(0,oi.jsxs)(bj,{children:[(0,oi.jsx)(wj,{children:e.title||e.file_name}),(0,oi.jsx)(kj,{children:null!==(i=e.file_type)&&void 0!==i&&i.startsWith("video/")||null!==(o=e.file_name)&&void 0!==o&&o.toLowerCase().includes(".mp4")?"Video Track":"Audio Track"})]})]}),(0,oi.jsx)(jj,{children:(0,oi.jsx)(Sj,{children:(a=e.file_name||e.filename,a?a.split(".").pop().toUpperCase():"")})}),(0,oi.jsx)(Cj,{children:x(e.file_size||0)}),(0,oi.jsx)(Pj,{children:new Date(e.uploaded_at||e.created_at).toLocaleDateString()}),(0,oi.jsxs)(Ej,{children:[(0,oi.jsx)(lj,{onClick:()=>f(e),size:"sm",children:(0,oi.jsx)(Kh,{size:14})}),(0,oi.jsx)(lj,{onClick:()=>m(),className:"danger",size:"sm",children:(0,oi.jsx)(ig,{size:14})})]})]},e.id)})})]}),(0,oi.jsx)(Vp,{children:c&&(0,oi.jsx)(Xk,{document:c,onClose:()=>{d(null)},onDelete:async e=>{await m(),d(null)},onDownload:async e=>{await f(e)},isMinimized:u,onToggleSize:()=>{p(!u)}})})]})},zj=uu("BarChart3",[["path",{d:"M3 3v18h18",key:"1s2lah"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]]),Aj=uu("PieChart",[["path",{d:"M21.21 15.89A10 10 0 1 1 8 2.83",key:"k2fpak"}],["path",{d:"M22 12A10 10 0 0 0 12 2v10z",key:"1rfc4y"}]]),_j=uu("Activity",[["path",{d:"M22 12h-4l-3 9L9 3l-3 9H2",key:"d5dnw9"}]]),Mj=ei.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`,$j=ei.div`
  margin-bottom: 32px;
`,Nj=ei.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
`,Rj=ei.p`
  color: #64748b;
  font-size: 16px;
`,Lj=ei.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`,Dj=ei(cu.div)`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }
`,Fj=ei.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`,Oj=ei.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #1a1a1a, #333333);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`,Ij=ei.div`
  font-size: 32px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
`,Bj=ei.div`
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
`,Vj=ei.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: ${e=>e.positive?"#10b981":"#ef4444"};
  font-weight: 600;
`,Uj=ei.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
`,Hj=ei(cu.div)`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
`,Wj=ei.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`,qj=ei.div`
  height: 300px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  font-size: 16px;
  border: 2px dashed #e2e8f0;
`,Yj=ei(cu.div)`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
`,Gj=ei.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`,Kj=ei.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,Qj=ei.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
  }
`,Xj=ei.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: linear-gradient(135deg, #1a1a1a, #333333);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`,Zj=ei.div`
  flex: 1;
`,Jj=ei.div`
  font-weight: 600;
  color: #1e293b;
  font-size: 14px;
`,eS=ei.div`
  font-size: 12px;
  color: #64748b;
`,tS=()=>{const e=[{id:1,title:"Total Revenue",value:"$8,420",change:"+12.5%",positive:!0,icon:Wh},{id:2,title:"Beats Sold",value:"47",change:"+8.2%",positive:!0,icon:rg},{id:3,title:"Active Clients",value:"23",change:"+5.1%",positive:!0,icon:rh},{id:4,title:"Conversion Rate",value:"68%",change:"-2.3%",positive:!1,icon:zj}],t=[{id:1,text:'New beat "Midnight Vibes" sold to Artist XYZ',time:"2 hours ago",icon:Wh},{id:2,text:'Client Producer ABC purchased "Summer Heat"',time:"4 hours ago",icon:rg},{id:3,text:"New client Rapper DEF registered",time:"6 hours ago",icon:rh},{id:4,text:'Beat "Urban Flow" uploaded to library',time:"1 day ago",icon:oh},{id:5,text:"Monthly revenue target achieved",time:"2 days ago",icon:zj}];return(0,oi.jsxs)(Mj,{children:[(0,oi.jsxs)($j,{children:[(0,oi.jsxs)(Nj,{children:[(0,oi.jsx)(oh,{size:28}),"Analytics"]}),(0,oi.jsx)(Rj,{children:"Track your music business performance and insights"})]}),(0,oi.jsx)(Lj,{children:e.map((e,t)=>(0,oi.jsxs)(Dj,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.4,delay:.1*t},children:[(0,oi.jsx)(Fj,{children:(0,oi.jsx)(Oj,{children:(0,oi.jsx)(e.icon,{size:20})})}),(0,oi.jsx)(Ij,{children:e.value}),(0,oi.jsx)(Bj,{children:e.title}),(0,oi.jsxs)(Vj,{positive:e.positive,children:[e.positive?"\u2197":"\u2198"," ",e.change]})]},e.id))}),(0,oi.jsxs)(Uj,{children:[(0,oi.jsxs)(Hj,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.2},children:[(0,oi.jsxs)(Wj,{children:[(0,oi.jsx)(zj,{size:20}),"Sales Performance"]}),(0,oi.jsx)(qj,{children:"Sales Chart - Revenue over time"})]}),(0,oi.jsxs)(Hj,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.3},children:[(0,oi.jsxs)(Wj,{children:[(0,oi.jsx)(Aj,{size:20}),"Genre Distribution"]}),(0,oi.jsx)(qj,{children:"Genre Chart - Beat sales by genre"})]})]}),(0,oi.jsxs)(Yj,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.4},children:[(0,oi.jsxs)(Gj,{children:[(0,oi.jsx)(_j,{size:20}),"Recent Activity"]}),(0,oi.jsx)(Kj,{children:t.map((e,t)=>(0,oi.jsxs)(Qj,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{duration:.4,delay:.5+.1*t},children:[(0,oi.jsx)(Xj,{children:(0,oi.jsx)(e.icon,{size:16})}),(0,oi.jsxs)(Zj,{children:[(0,oi.jsx)(Jj,{children:e.text}),(0,oi.jsx)(eS,{children:e.time})]})]},e.id))})]})]})},nS=ei.div`
  display: flex;
  height: 100vh;
  background-color: ${e=>e.theme.colors.background||e.theme.colors.primary};
  font-family: 'Inter', sans-serif;
  ${e=>"glassmorphism"===e.theme.name&&'\n    background: url("/images/morphism.png") center/cover no-repeat fixed;\n  '}
`,rS=ei.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-left: 280px;
`,iS=ei.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  background-color: ${e=>e.theme.colors.background||e.theme.colors.primary};
  display: flex;
  gap: 24px;
  ${e=>"glassmorphism"===e.theme.name&&"\n    background: transparent;\n  "}
`,oS=ei.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`,aS=ei.div`
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;function sS(){const e=Q(),{theme:t}=fi(),n="/"===e.pathname||"/dashboard"===e.pathname;return(0,oi.jsxs)(iS,{theme:t,children:[(0,oi.jsx)(oS,{children:(0,oi.jsxs)(me,{children:[(0,oi.jsx)(he,{path:"/",element:(0,oi.jsx)(qf,{})}),(0,oi.jsx)(he,{path:"/dashboard",element:(0,oi.jsx)(qf,{})}),(0,oi.jsx)(he,{path:"/profile",element:(0,oi.jsx)(tg,{})}),(0,oi.jsx)(he,{path:"/my-account",element:(0,oi.jsx)(Ax,{})}),(0,oi.jsx)(he,{path:"/payment-history",element:(0,oi.jsx)(Jx,{})}),(0,oi.jsx)(he,{path:"/transaction-history",element:(0,oi.jsx)(Ly,{})}),(0,oi.jsx)(he,{path:"/cards",element:(0,oi.jsx)(Cv,{})}),(0,oi.jsx)(he,{path:"/notifications",element:(0,oi.jsx)(Xv,{})}),(0,oi.jsx)(he,{path:"/settings",element:(0,oi.jsx)(uw,{})}),(0,oi.jsx)(he,{path:"/beneficiaries",element:(0,oi.jsx)(Zw,{})}),(0,oi.jsx)(he,{path:"/documents",element:(0,oi.jsx)(Tj,{})}),(0,oi.jsx)(he,{path:"/applications",element:(0,oi.jsx)(tS,{})})]})}),!n&&(0,oi.jsx)(aS,{})]})}function lS(){const{theme:e}=fi();return(0,oi.jsxs)(nS,{theme:e,children:[(0,oi.jsx)(xh,{}),(0,oi.jsxs)(rS,{children:[(0,oi.jsx)(Uh,{}),(0,oi.jsx)(sS,{})]}),(0,oi.jsx)(Jp,{})]})}function cS(){const{isAuthenticated:e,isLoading:t,isSessionLocked:n}=si();return t?(0,oi.jsx)("div",{style:{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#f8fafc"},children:(0,oi.jsx)("div",{style:{fontSize:"18px",color:"#64748b",fontWeight:"500"},children:"Loading Monexa..."})}):n?(0,oi.jsx)(Rp,{}):e?(0,oi.jsx)(lS,{}):(0,oi.jsx)(vp,{})}const dS=function(){return(0,oi.jsx)(mi,{children:(0,oi.jsx)(li,{children:(0,oi.jsxs)(Ce,{children:[(0,oi.jsx)(cS,{}),(0,oi.jsx)(et,{position:"bottom-right",autoClose:3e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"light",toastStyle:{backgroundColor:"#ffffff",color:"#1e293b",borderRadius:"12px",boxShadow:"0 10px 25px rgba(0, 0, 0, 0.1)",border:"1px solid #e2e8f0"}})]})})})};i.createRoot(document.getElementById("root")).render((0,oi.jsx)(t.StrictMode,{children:(0,oi.jsx)(dS,{})}))})()})();
//# sourceMappingURL=main.477235d6.js.map