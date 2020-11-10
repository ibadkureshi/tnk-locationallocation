function _inherits(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&_setPrototypeOf(e,n)}function _setPrototypeOf(e,n){return(_setPrototypeOf=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}function _createSuper(e){var n=_isNativeReflectConstruct();return function(){var t,i=_getPrototypeOf(e);if(n){var o=_getPrototypeOf(this).constructor;t=Reflect.construct(i,arguments,o)}else t=i.apply(this,arguments);return _possibleConstructorReturn(this,t)}}function _possibleConstructorReturn(e,n){return!n||"object"!=typeof n&&"function"!=typeof n?_assertThisInitialized(e):n}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,n){if(e){if("string"==typeof e)return _arrayLikeToArray(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?_arrayLikeToArray(e,n):void 0}}function _iterableToArray(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _arrayLikeToArray(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,i=new Array(n);t<n;t++)i[t]=e[t];return i}function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,n){for(var t=0;t<n.length;t++){var i=n[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function _createClass(e,n,t){return n&&_defineProperties(e.prototype,n),t&&_defineProperties(e,t),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{i1rK:function(e,n,t){"use strict";t.r(n),t.d(n,"NewAnalysisModule",(function(){return Se}));var i=t("ofXK"),o=t("tyNb"),a=t("3Pt+"),r=t("fXoL"),s=t("cn6w"),c=t("+rOU"),l=t("XNiG"),u=t("rDax"),b=t("JwMs"),h=t("/KA4"),p=t("1G5W"),f=t("pdGh"),d=t("FwiY"),m=t("GR68"),g=t("2Suw");function z(e,n){if(1&e){var t=r.Xb();r.Wb(0,"nz-message",2),r.ec("destroyed",(function(e){return r.wc(t),r.ic().remove(e.id,e.userAction)})),r.Vb()}2&e&&r.nc("instance",n.$implicit)}function v(e,n){1&e&&r.Rb(0,"i",10)}function y(e,n){1&e&&r.Rb(0,"i",11)}function C(e,n){1&e&&r.Rb(0,"i",12)}function k(e,n){1&e&&r.Rb(0,"i",13)}function S(e,n){1&e&&r.Rb(0,"i",14)}function w(e,n){if(1&e&&(r.Ub(0),r.Rb(1,"span",15),r.Tb()),2&e){var t=r.ic();r.Cb(1),r.nc("innerHTML",t.instance.content,r.xc)}}var _,T,V,x,O,W,P,M=0,E=((T=function(){function e(n,t){_classCallCheck(this,e),this.cdr=n,this.nzConfigService=t,this.instances=[],this.destroy$=new l.a,this.updateConfig()}return _createClass(e,[{key:"ngOnInit",value:function(){this.subscribeConfigChange()}},{key:"ngOnDestroy",value:function(){this.destroy$.next(),this.destroy$.complete()}},{key:"create",value:function(e){var n=this.onCreate(e);return this.instances.length>=this.config.nzMaxStack&&(this.instances=this.instances.slice(1)),this.instances=[].concat(_toConsumableArray(this.instances),[n]),this.readyInstances(),n}},{key:"remove",value:function(e){var n=this,t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];this.instances.some((function(i,o){return i.messageId===e&&(n.instances.splice(o,1),n.instances=_toConsumableArray(n.instances),n.onRemove(i,t),n.readyInstances(),!0)}))}},{key:"removeAll",value:function(){var e=this;this.instances.forEach((function(n){return e.onRemove(n,!1)})),this.instances=[],this.readyInstances()}},{key:"onCreate",value:function(e){return e.options=this.mergeOptions(e.options),e.onClose=new l.a,e}},{key:"onRemove",value:function(e,n){e.onClose.next(n),e.onClose.complete()}},{key:"readyInstances",value:function(){this.cdr.detectChanges()}},{key:"mergeOptions",value:function(e){var n=this.config,t=n.nzDuration,i=n.nzAnimate,o=n.nzPauseOnHover;return Object.assign({nzDuration:t,nzAnimate:i,nzPauseOnHover:o},e)}}]),e}()).\u0275fac=function(e){r.dc()},T.\u0275dir=r.Lb({type:T}),T),I=((_=function(){function e(n){_classCallCheck(this,e),this.cdr=n,this.destroyed=new r.n,this.eraseTimer=null}return _createClass(e,[{key:"ngOnInit",value:function(){this.options=this.instance.options,this.options.nzAnimate&&(this.instance.state="enter"),this.autoClose=this.options.nzDuration>0,this.autoClose&&(this.initErase(),this.startEraseTimeout())}},{key:"ngOnDestroy",value:function(){this.autoClose&&this.clearEraseTimeout()}},{key:"onEnter",value:function(){this.autoClose&&this.options.nzPauseOnHover&&(this.clearEraseTimeout(),this.updateTTL())}},{key:"onLeave",value:function(){this.autoClose&&this.options.nzPauseOnHover&&this.startEraseTimeout()}},{key:"destroy",value:function(){var e=this,n=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.options.nzAnimate?(this.instance.state="leave",this.cdr.detectChanges(),setTimeout((function(){e.destroyed.next({id:e.instance.messageId,userAction:n})}),200)):this.destroyed.next({id:this.instance.messageId,userAction:n})}},{key:"initErase",value:function(){this.eraseTTL=this.options.nzDuration,this.eraseTimingStart=Date.now()}},{key:"updateTTL",value:function(){this.autoClose&&(this.eraseTTL-=Date.now()-this.eraseTimingStart)}},{key:"startEraseTimeout",value:function(){var e=this;this.eraseTTL>0?(this.clearEraseTimeout(),this.eraseTimer=setTimeout((function(){return e.destroy()}),this.eraseTTL),this.eraseTimingStart=Date.now()):this.destroy()}},{key:"clearEraseTimeout",value:function(){null!==this.eraseTimer&&(clearTimeout(this.eraseTimer),this.eraseTimer=null)}}]),e}()).\u0275fac=function(e){r.dc()},_.\u0275dir=r.Lb({type:_}),_),A={nzAnimate:!0,nzDuration:3e3,nzMaxStack:7,nzPauseOnHover:!0,nzTop:24},R=((P=function(e){_inherits(t,e);var n=_createSuper(t);function t(e,i){var o;return _classCallCheck(this,t),(o=n.call(this,e,i)).destroy$=new l.a,o.instances=[],o}return _createClass(t,[{key:"subscribeConfigChange",value:function(){var e=this;this.nzConfigService.getConfigChangeEventForComponent("message").pipe(Object(p.a)(this.destroy$)).subscribe((function(){return e.updateConfig()}))}},{key:"updateConfig",value:function(){this.config=Object.assign(Object.assign(Object.assign({},A),this.config),this.nzConfigService.getConfigForComponent("message")),this.top=Object(h.j)(this.config.nzTop),this.cdr.markForCheck()}}]),t}(E)).\u0275fac=function(e){return new(e||P)(r.Qb(r.h),r.Qb(g.a))},P.\u0275cmp=r.Kb({type:P,selectors:[["nz-message-container"]],exportAs:["nzMessageContainer"],features:[r.zb],decls:2,vars:3,consts:[[1,"ant-message"],[3,"instance","destroyed",4,"ngFor","ngForOf"],[3,"instance","destroyed"]],template:function(e,n){1&e&&(r.Wb(0,"div",0),r.Cc(1,z,1,1,"nz-message",1),r.Vb()),2&e&&(r.Bc("top",n.top),r.Cb(1),r.nc("ngForOf",n.instances))},directives:function(){return[i.j,B]},encapsulation:2,changeDetection:0}),P),L=((W=function e(){_classCallCheck(this,e)}).\u0275mod=r.Ob({type:W}),W.\u0275inj=r.Nb({factory:function(e){return new(e||W)}}),W),j=((O=function(e){_inherits(t,e);var n=_createSuper(t);function t(e,i,o){var a;return _classCallCheck(this,t),(a=n.call(this,e,i,o)).componentPrefix="message-",a}return _createClass(t,[{key:"success",value:function(e,n){return this.createInstance({type:"success",content:e},n)}},{key:"error",value:function(e,n){return this.createInstance({type:"error",content:e},n)}},{key:"info",value:function(e,n){return this.createInstance({type:"info",content:e},n)}},{key:"warning",value:function(e,n){return this.createInstance({type:"warning",content:e},n)}},{key:"loading",value:function(e,n){return this.createInstance({type:"loading",content:e},n)}},{key:"create",value:function(e,n,t){return this.createInstance({type:e,content:n},t)}},{key:"createInstance",value:function(e,n){return this.container=this.withContainer(R),this.container.create(Object.assign(Object.assign({},e),{createdAt:new Date,messageId:this.getInstanceId(),options:n}))}}]),t}(function(){function e(n,t,i){_classCallCheck(this,e),this.nzSingletonService=n,this.overlay=t,this.injector=i}return _createClass(e,[{key:"remove",value:function(e){this.container&&(e?this.container.remove(e):this.container.removeAll())}},{key:"getInstanceId",value:function(){return"".concat(this.componentPrefix,"-").concat(M++)}},{key:"withContainer",value:function(e){var n=this.nzSingletonService.getSingletonWithKey(this.componentPrefix);if(n)return n;var t=this.overlay.create({hasBackdrop:!1,scrollStrategy:this.overlay.scrollStrategies.noop(),positionStrategy:this.overlay.position().global()}),i=new c.b(e,null,this.injector),o=t.attach(i);return t.overlayElement.style.zIndex="1010",n||(this.container=n=o.instance,this.nzSingletonService.registerSingletonWithKey(this.componentPrefix,n)),n}}]),e}())).\u0275fac=function(e){return new(e||O)(r.ac(b.d),r.ac(u.d),r.ac(r.r))},O.\u0275prov=Object(r.Mb)({factory:function(){return new O(Object(r.ac)(b.d),Object(r.ac)(u.d),Object(r.ac)(r.o))},token:O,providedIn:L}),O),B=((x=function(e){_inherits(t,e);var n=_createSuper(t);function t(e){var i;return _classCallCheck(this,t),(i=n.call(this,e)).destroyed=new r.n,i}return t}(I)).\u0275fac=function(e){return new(e||x)(r.Qb(r.h))},x.\u0275cmp=r.Kb({type:x,selectors:[["nz-message"]],inputs:{instance:"instance"},outputs:{destroyed:"destroyed"},exportAs:["nzMessage"],features:[r.zb],decls:10,vars:9,consts:[[1,"ant-message-notice",3,"mouseenter","mouseleave"],[1,"ant-message-notice-content"],[1,"ant-message-custom-content",3,"ngClass"],[3,"ngSwitch"],["nz-icon","","nzType","check-circle",4,"ngSwitchCase"],["nz-icon","","nzType","info-circle",4,"ngSwitchCase"],["nz-icon","","nzType","exclamation-circle",4,"ngSwitchCase"],["nz-icon","","nzType","close-circle",4,"ngSwitchCase"],["nz-icon","","nzType","loading",4,"ngSwitchCase"],[4,"nzStringTemplateOutlet"],["nz-icon","","nzType","check-circle"],["nz-icon","","nzType","info-circle"],["nz-icon","","nzType","exclamation-circle"],["nz-icon","","nzType","close-circle"],["nz-icon","","nzType","loading"],[3,"innerHTML"]],template:function(e,n){1&e&&(r.Wb(0,"div",0),r.ec("mouseenter",(function(){return n.onEnter()}))("mouseleave",(function(){return n.onLeave()})),r.Wb(1,"div",1),r.Wb(2,"div",2),r.Ub(3,3),r.Cc(4,v,1,0,"i",4),r.Cc(5,y,1,0,"i",5),r.Cc(6,C,1,0,"i",6),r.Cc(7,k,1,0,"i",7),r.Cc(8,S,1,0,"i",8),r.Tb(),r.Cc(9,w,2,1,"ng-container",9),r.Vb(),r.Vb(),r.Vb()),2&e&&(r.nc("@moveUpMotion",n.instance.state),r.Cb(2),r.nc("ngClass","ant-message-"+n.instance.type),r.Cb(1),r.nc("ngSwitch",n.instance.type),r.Cb(1),r.nc("ngSwitchCase","success"),r.Cb(1),r.nc("ngSwitchCase","info"),r.Cb(1),r.nc("ngSwitchCase","warning"),r.Cb(1),r.nc("ngSwitchCase","error"),r.Cb(1),r.nc("ngSwitchCase","loading"),r.Cb(1),r.nc("nzStringTemplateOutlet",n.instance.content))},directives:[i.i,i.m,i.n,f.b,d.b],encapsulation:2,data:{animation:[m.c]},changeDetection:0}),x),F=((V=function e(){_classCallCheck(this,e)}).\u0275mod=r.Ob({type:V}),V.\u0275inj=r.Nb({factory:function(e){return new(e||V)},imports:[[i.c,u.e,d.c,f.a,L]]}),V),X=t("ocnv"),N=t("B+r4"),D=t("PTRe"),q=t("OzZK"),G=t("z4wI"),H=t("zAKX"),K=t("mrSG"),U=t("RwU8"),Q=t("C2AL");function $(e,n){1&e&&(r.Wb(0,"h3"),r.Ec(1," Please upload a csv file with coordinates in the form < latitude, longitude> (2 columns)."),r.Vb())}function J(e,n){if(1&e){var t=r.Xb();r.Wb(0,"div"),r.Wb(1,"span",4),r.Ec(2),r.Vb(),r.Wb(3,"span",5),r.Ec(4),r.Vb(),r.Wb(5,"span",6),r.Wb(6,"button",7),r.ec("click",(function(){return r.wc(t),r.ic().removeFile()})),r.Vb(),r.Vb(),r.Vb()}if(2&e){var i=r.ic();r.Cb(2),r.Gc(" ",i.filename," "),r.Cb(2),r.Gc("",i.fileSize,"MB"),r.Cb(2),r.nc("nzSize","small")}}var Y,Z=((Y=function(){function e(n,t){_classCallCheck(this,e),this.msg=n,this.commonApi=t,this.loading=!1,this.markers=new r.n,this.csvBlob=new r.n}return _createClass(e,[{key:"postMethod",value:function(e){return Object(K.a)(this,void 0,void 0,regeneratorRuntime.mark((function n(){var t;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return this.fileToUpload=e.item(0),this.filename=this.fileToUpload.name,this.fileSize=this.bytesToMegaBytes(this.fileToUpload.size),this.loading=!0,n.prev=1,n.next=4,this.commonApi.extractCsv(this.fileToUpload);case 4:t=n.sent,this.msg.info("Successful csv upload"),this.markers.emit(t),this.csvBlob.emit(this.fileToUpload),n.next=11;break;case 8:n.prev=8,n.t0=n.catch(1),this.msg.error("Error on upload"),console.log(n.t0);case 11:return n.abrupt("return",(this.loading=!1,!1));case 12:case"end":return n.stop()}}),n,this,[[1,8]])})))}},{key:"bytesToMegaBytes",value:function(e){return(9.5367431640625e-7*e).toFixed(2)}},{key:"removeFile",value:function(){this.filename=null}}]),e}()).\u0275fac=function(e){return new(e||Y)(r.Qb(j),r.Qb(s.a))},Y.\u0275cmp=r.Kb({type:Y,selectors:[["app-tkn-upload"]],outputs:{markers:"markers",csvBlob:"csvBlob"},decls:5,vars:2,consts:[[1,"upload-wrap"],["id","myForm","type","file","name","file",1,"file-upload-input",3,"change"],[1,"drag-text"],[4,"ngIf"],[1,"filename"],[1,"filesize"],[1,"remove"],["nz-button","","nzType","primary",3,"nzSize","click"]],template:function(e,n){1&e&&(r.Wb(0,"div",0),r.Wb(1,"input",1),r.ec("change",(function(e){return n.postMethod(e.target.files)})),r.Vb(),r.Wb(2,"div",2),r.Cc(3,$,2,0,"h3",3),r.Cc(4,J,7,3,"div",3),r.Vb(),r.Vb()),2&e&&(r.Cb(3),r.nc("ngIf",!n.filename&&!n.loading),r.Cb(1),r.nc("ngIf",n.filename))},directives:[i.k,q.a,U.a,Q.a],styles:["[_nghost-%COMP%]     .avatar-uploader>.ant-upload{width:128px;height:128px}.upload-wrap[_ngcontent-%COMP%]{margin-top:20px;position:relative;background:#f0eeee;border:1px solid #e3e1e1;height:150px;display:flex;justify-content:center;align-items:center}.upload-wrap[_ngcontent-%COMP%]:hover{background-color:#e4e4e4}.drag-text[_ngcontent-%COMP%]{text-align:center}.file-upload-input[_ngcontent-%COMP%]{position:absolute;margin:0;padding:0;width:100%;height:100%;outline:none;opacity:0;cursor:pointer}.filename[_ngcontent-%COMP%]{font-size:18px}.filesize[_ngcontent-%COMP%]{font-size:10px;font-style:italic;padding:0 5px}"]}),Y),ee=t("WlLC"),ne=t("nJia");function te(e,n){if(1&e){var t=r.Xb();r.Wb(0,"div",1),r.Wb(1,"div",2),r.Wb(2,"div"),r.Wb(3,"span",3),r.Ec(4,"Step 2"),r.Vb(),r.Ec(5,": Please select the area by drawing a rectangle from the map toolbar. "),r.Vb(),r.Vb(),r.Wb(6,"app-tnk-maps",8),r.ec("boundingBox",(function(e){return r.wc(t),r.ic().getBoundingBox(e)})),r.Vb(),r.Vb()}if(2&e){var i=r.ic();r.Cb(6),r.nc("markers",i.markers)}}function ie(e,n){if(1&e){var t=r.Xb();r.Wb(0,"div",1),r.Wb(1,"div",2),r.Wb(2,"div"),r.Wb(3,"span",3),r.Ec(4,"Step 3"),r.Vb(),r.Ec(5,": Please fill the required details. Note that computation time increases exponentially with the grid size and max p-value. "),r.Vb(),r.Vb(),r.Wb(6,"div",9),r.Wb(7,"form",10),r.ec("ngSubmit",(function(){return r.wc(t),r.ic().submitForm()})),r.Wb(8,"div",11),r.Wb(9,"div",12),r.Wb(10,"nz-form-item"),r.Wb(11,"nz-form-label",13),r.Ec(12,"Task Name "),r.Vb(),r.Wb(13,"nz-form-control",14),r.Rb(14,"input",15),r.Vb(),r.Vb(),r.Vb(),r.Wb(15,"div",12),r.Wb(16,"nz-form-item"),r.Wb(17,"nz-form-label",16),r.Ec(18,"Grid Length "),r.Wb(19,"button",17),r.Ec(20,"?"),r.Vb(),r.Vb(),r.Wb(21,"nz-form-control",18),r.Rb(22,"nz-input-number",19),r.Vb(),r.Vb(),r.Vb(),r.Wb(23,"div",12),r.Wb(24,"nz-form-item"),r.Wb(25,"nz-form-label",20),r.Ec(26,"Out of bounds points "),r.Wb(27,"button",21),r.Ec(28,"?"),r.Vb(),r.Vb(),r.Wb(29,"nz-form-control",22),r.Wb(30,"nz-select",23),r.Rb(31,"nz-option",24),r.Rb(32,"nz-option",24),r.Vb(),r.Vb(),r.Vb(),r.Vb(),r.Wb(33,"div",12),r.Wb(34,"nz-form-item"),r.Wb(35,"nz-form-label",25),r.Ec(36,"Cost type "),r.Wb(37,"button",26),r.Ec(38,"?"),r.Vb(),r.Vb(),r.Wb(39,"nz-form-control",27),r.Wb(40,"nz-select",28),r.Rb(41,"nz-option",24),r.Rb(42,"nz-option",24),r.Vb(),r.Vb(),r.Vb(),r.Vb(),r.Wb(43,"div",12),r.Wb(44,"nz-form-item"),r.Wb(45,"nz-form-label",29),r.Ec(46,"Min p-value"),r.Vb(),r.Wb(47,"nz-form-control",30),r.Rb(48,"nz-input-number",31),r.Vb(),r.Vb(),r.Vb(),r.Wb(49,"div",12),r.Wb(50,"nz-form-item"),r.Wb(51,"nz-form-label",32),r.Ec(52,"Max p-value"),r.Wb(53,"button",33),r.Ec(54,"?"),r.Vb(),r.Vb(),r.Wb(55,"nz-form-control",30),r.Rb(56,"nz-input-number",34),r.Vb(),r.Vb(),r.Vb(),r.Vb(),r.Vb(),r.Vb(),r.Vb()}if(2&e){var i=r.ic(),o=r.uc(11);r.Cb(7),r.nc("formGroup",i.validateForm),r.Cb(1),r.nc("nzGutter",10),r.Cb(1),r.nc("nzSpan",12),r.Cb(2),r.nc("nzSm",12)("nzXs",24),r.Cb(2),r.nc("nzSm",12)("nzXs",24),r.Cb(2),r.nc("nzSpan",12),r.Cb(2),r.nc("nzSm",12)("nzXs",24),r.Cb(2),r.nc("nzSize","small"),r.Cb(2),r.nc("nzSm",12)("nzXs",24),r.Cb(1),r.nc("nzMin",1)("nzMax",50)("nzStep",1),r.Cb(1),r.nc("nzSpan",12),r.Cb(2),r.nc("nzSm",12)("nzXs",24),r.Cb(2),r.nc("nzSize","small"),r.Cb(2),r.nc("nzSm",12)("nzXs",24),r.Cb(2),r.nc("nzLabel","include")("nzValue","include"),r.Cb(1),r.nc("nzLabel","exclude")("nzValue","exclude"),r.Cb(1),r.nc("nzSpan",12),r.Cb(2),r.nc("nzSm",12)("nzXs",24),r.Cb(2),r.nc("nzSize","small"),r.Cb(2),r.nc("nzSm",12)("nzXs",24),r.Cb(2),r.nc("nzLabel","time")("nzValue","time"),r.Cb(1),r.nc("nzLabel","distance")("nzValue","distance"),r.Cb(1),r.nc("nzSpan",12),r.Cb(2),r.nc("nzSm",12)("nzXs",24),r.Cb(2),r.nc("nzSm",12)("nzXs",24),r.Cb(1),r.nc("nzMin",1)("nzMax",i.maxPvaluesBounds)("nzStep",1),r.Cb(1),r.nc("nzSpan",12),r.Cb(2),r.nc("nzSm",12)("nzXs",24),r.Cb(2),r.nc("nzTooltipTitle",o)("nzSize","small"),r.Cb(2),r.nc("nzSm",12)("nzXs",24),r.Cb(1),r.nc("nzMin",1)("nzMax",i.maxPvaluesBounds)("nzStep",1)}}function oe(e,n){1&e&&(r.Wb(0,"span"),r.Ec(1,"Maximum p-value can't be larger than (1"),r.Wb(2,"sub"),r.Ec(3,"/4"),r.Vb(),r.Ec(4," ) * gridLength"),r.Wb(5,"sup"),r.Ec(6,"2"),r.Vb(),r.Ec(7," or 25"),r.Vb())}function ae(e,n){if(1&e){var t=r.Xb();r.Wb(0,"button",35),r.ec("click",(function(){return r.wc(t),r.ic().startNewTask()})),r.Ec(1," Start new task "),r.Vb()}}var re,se,ce,le,ue,be,he=[{path:"",component:(re=function(){function e(n,t,i,o){_classCallCheck(this,e),this.commonApi=n,this.msg=t,this.fb=i,this._router=o,this.loading=!1,this.boxes=[!0,!0,!0],this.showMapSelection=!1,this.formIsValid=!1,this.maxPvaluesBounds=25,this.markers=[],this.boundingBox=null,this.taskMeta={name:"this is a test",time:{submit:"12:38:00"},job_type:"pmedian",properties:{type:"geographic",cost_type:"time",demand_pts:{if_out_of_bounds:"exclude"},box:{sw:"52.25,-0.1",ne:"52.5,0.4",grid_height:"None",grid_length:10},p_val:{min:3,max:5}}}}return _createClass(e,[{key:"ngOnInit",value:function(){var e=this;this.validateForm=this.fb.group({name:[null,[a.o.required]],gridLength:[10,[a.o.required]],minVal:[1,[a.o.required]],maxVal:[2,[a.o.required]],costType:["distance",[a.o.required]],dataPoints:["exclude",[a.o.required]]}),this.validateForm.get("gridLength").valueChanges.subscribe((function(n){e.validateForm.patchValue({minVal:1,maxVal:null})})),this.validateForm.statusChanges.subscribe((function(n){e.validateMaxValue(),e.setMaxPValueBound(),e.formIsValid="VALID"===n}))}},{key:"setMaxPValueBound",value:function(){var e=this.validateForm.value.gridLength;if(e){var n=Math.floor(.25*Math.pow(e,2));0===n?n=1:n>=25&&(n=25),this.maxPvaluesBounds=n}}},{key:"validateMaxValue",value:function(){var e=this.validateForm.value,n=e.minVal,t=e.maxVal;return!(!t&&n)&&(t>=n||(this.validateForm.patchValue({minVal:1,maxVal:null}),this.msg.warning("Max p value must be equal or greater than min p value"),!1))}},{key:"updateConfirmValidator",value:function(){var e=this;Promise.resolve().then((function(){return e.validateForm.controls.checkPassword.updateValueAndValidity()}))}},{key:"submitForm",value:function(){for(var e in this.validateForm.controls)this.validateForm.controls[e].markAsDirty(),this.validateForm.controls[e].updateValueAndValidity()}},{key:"getMarkers",value:function(e){var n=this;this.csvMarkers=e,this.showMapSelection=!0,this.boundingBox=null,this.markers=e,this.loading=!0,setTimeout((function(){n.boxes[0]=!1,n.loading=!1}),500)}},{key:"getCsvBlob",value:function(e){this.csv=e}},{key:"getBoundingBox",value:function(e){this.boundingBox=e}},{key:"startNewTask",value:function(){var e=this,n=this.validateForm.value,t=n.gridLength,i=n.maxVal,o=n.minVal,a=n.name,r=n.dataPoints,s=n.costType,c={sw:null,ne:null,grid_height:null,grid_length:null},l=this.boundingBox,u=l._northEast,b=l._southWest;c.sw="".concat(b.lat,",").concat(b.lng),c.ne="".concat(u.lat,",").concat(u.lng),c.grid_height="None",c.grid_length=t,this.taskMeta.properties.box=c,this.taskMeta.name=a,this.taskMeta.properties.demand_pts.if_out_of_bounds=r,this.taskMeta.properties.cost_type=s,this.taskMeta.properties.p_val.max=i,this.taskMeta.properties.p_val.min=o,this.commonApi.newTask(this.csv,this.taskMeta).then((function(n){e.msg.info("Task ".concat(a," has started")),e._router.navigate([""])})).catch((function(n){e.msg.error("Error starting new task")}))}}]),e}(),re.\u0275fac=function(e){return new(e||re)(r.Qb(s.a),r.Qb(j),r.Qb(a.d),r.Qb(o.b))},re.\u0275cmp=r.Kb({type:re,selectors:[["app-new-analysis"]],decls:13,vars:3,consts:[["id","new-analysis"],[1,"box","border","shadow"],[1,"step"],[1,"highlight"],[3,"markers","csvBlob"],["class","box border shadow",4,"ngIf"],["titleTemplate",""],["nz-button","","nzType","primary",3,"click",4,"ngIf"],[3,"markers","boundingBox"],[1,"row"],["nz-form","",3,"formGroup","ngSubmit"],["nz-row","",3,"nzGutter"],["nz-col","",3,"nzSpan"],["nzRequired","","nzFor","name",3,"nzSm","nzXs"],["nzErrorTip","Please enter a valid task name!",3,"nzSm","nzXs"],["nz-input","","formControlName","name","id","name"],["nzRequired","","nzFor","gridLength",3,"nzSm","nzXs"],["nz-button","","nz-tooltip","","nzTooltipTitle","The selected area will be split into a\n                  grid of almost squares. By providing the number of grid-boxes per row (Grid Length) the Grid\n                  Height is automatically selected so that each grid-box is < as square as possible> .","nzType","default","nzShape","circle",1,"custom-tooltip",3,"nzSize"],["nzErrorTip","Please enter a valid grid length!",3,"nzSm","nzXs"],["formControlName","gridLength","id","gridLength",3,"nzMin","nzMax","nzStep"],["nzRequired","","nzFor","dataPoints",3,"nzSm","nzXs"],["nz-button","","nz-tooltip","","nzTooltipTitle","Currenly all data points lying outside the\n                  selected area are discarded.","nzType","default","nzShape","circle",1,"custom-tooltip",3,"nzSize"],["nzErrorTip","Please select what to do with the points!",3,"nzSm","nzXs"],["nzShowSearch","","formControlName","dataPoints","nzPlaceHolder","Excluded Points Action","id","dataPoints"],[3,"nzLabel","nzValue"],["nzRequired","","nzFor","costType",3,"nzSm","nzXs"],["nz-button","","nz-tooltip","","nzTooltipTitle","Should the distance between A and B be measured in meters or\n                  second (i.e. driving time)","nzType","default","nzShape","circle",1,"custom-tooltip",3,"nzSize"],["nzErrorTip","Please select distance or time",3,"nzSm","nzXs"],["nzShowSearch","","formControlName","costType","nzPlaceHolder","Action For Excluded Points","id","costType"],["nzRequired","","nzFor","minVal",3,"nzSm","nzXs"],["nzErrorTip","Please enter a valid p-value!",3,"nzSm","nzXs"],["formControlName","minVal","id","minVal",3,"nzMin","nzMax","nzStep"],["nzRequired","","nzFor","maxVal",3,"nzSm","nzXs"],["nz-button","","nz-tooltip","","nzType","default","nzShape","circle",1,"custom-tooltip",3,"nzTooltipTitle","nzSize"],["formControlName","maxVal","id","maxVal",3,"nzMin","nzMax","nzStep"],["nz-button","","nzType","primary",3,"click"]],template:function(e,n){1&e&&(r.Wb(0,"div",0),r.Wb(1,"div",1),r.Wb(2,"div",2),r.Wb(3,"div"),r.Wb(4,"span",3),r.Ec(5,"Step 1"),r.Vb(),r.Ec(6,": Please upload a csv file. "),r.Vb(),r.Vb(),r.Wb(7,"app-tkn-upload",4),r.ec("markers",(function(e){return n.getMarkers(e)}))("csvBlob",(function(e){return n.getCsvBlob(e)})),r.Vb(),r.Vb(),r.Cc(8,te,7,1,"div",5),r.Cc(9,ie,57,54,"div",5),r.Cc(10,oe,8,0,"ng-template",null,6,r.Dc),r.Cc(12,ae,2,0,"button",7),r.Vb()),2&e&&(r.Cb(8),r.nc("ngIf",n.showMapSelection),r.Cb(1),r.nc("ngIf",n.boundingBox),r.Cb(3),r.nc("ngIf",n.markers.length>0&&n.boundingBox&&n.formIsValid))},directives:[Z,i.k,ee.a,a.p,a.l,X.b,a.g,N.c,N.a,X.c,X.d,X.a,D.a,a.c,a.k,a.f,q.a,U.a,Q.a,ne.b,G.a,H.b,H.a],styles:["#new-analysis[_ngcontent-%COMP%]   .step[_ngcontent-%COMP%]{font-weight:400;margin-bottom:40px;display:flex;justify-content:space-between;align-items:center}#new-analysis[_ngcontent-%COMP%]   .step[_ngcontent-%COMP%]   .highlight[_ngcontent-%COMP%]{font-weight:600}#new-analysis[_ngcontent-%COMP%]   #gridLength[_ngcontent-%COMP%]{width:100%}.custom-tooltip[_ngcontent-%COMP%]{margin-left:5px}"]}),re)}],pe=((se=function e(){_classCallCheck(this,e)}).\u0275mod=r.Ob({type:se}),se.\u0275inj=r.Nb({factory:function(e){return new(e||se)},imports:[[o.e.forChild(he)],o.e]}),se),fe=t("xVJt"),de=(t("FtGj"),t("tk/3"),t("79xS"),t("LRne"),t("HDdC"),t("quSY"),t("eIep"),t("lJxs"),t("pLZG"),t("R0Ic"),t("nLfN")),me=t("Rm4T"),ge=((le=function e(){_classCallCheck(this,e)}).\u0275mod=r.Ob({type:le}),le.\u0275inj=r.Nb({factory:function(e){return new(e||le)},imports:[[i.c,d.c,f.a]]}),le),ze=((ce=function e(){_classCallCheck(this,e)}).\u0275mod=r.Ob({type:ce}),ce.\u0275inj=r.Nb({factory:function(e){return new(e||ce)},imports:[[i.c,a.h,de.b,ne.a,ge,me.b,d.c]]}),ce),ve=t("CSM4"),ye=((ue=function e(){_classCallCheck(this,e)}).\u0275mod=r.Ob({type:ue}),ue.\u0275inj=r.Nb({factory:function(e){return new(e||ue)},imports:[[i.c,ze,F,ve.a]]}),ue),Ce=t("pKmL"),ke=t("UPf0"),Se=((be=function e(){_classCallCheck(this,e)}).\u0275mod=r.Ob({type:be}),be.\u0275inj=r.Nb({factory:function(e){return new(e||be)},imports:[[i.c,pe,fe.a,ye,ve.a,Ce.a,ke.a]]}),be)}}]);