(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{118:function(e,t){},125:function(e,t,n){},129:function(e,t,n){"use strict";n.r(t);var i=n(0),a=n.n(i),r=n(15),o=n.n(r),c=n(131),s=n(124),f=n(2),h=n(7),m=n(65),u=n.n(m),l=n(66),d=n.n(l),w=n(11),v=n.n(w),g=n(23),b=n(130),p=function(e,t,n){var i=new ArrayBuffer(44),a=new DataView(i);return a.setUint8(0,"R".charCodeAt(0)),a.setUint8(1,"I".charCodeAt(0)),a.setUint8(2,"F".charCodeAt(0)),a.setUint8(3,"F".charCodeAt(0)),a.setUint32(4,e.byteLength/2+44,!0),a.setUint8(8,"W".charCodeAt(0)),a.setUint8(9,"A".charCodeAt(0)),a.setUint8(10,"V".charCodeAt(0)),a.setUint8(11,"E".charCodeAt(0)),a.setUint8(12,"f".charCodeAt(0)),a.setUint8(13,"m".charCodeAt(0)),a.setUint8(14,"t".charCodeAt(0)),a.setUint8(15," ".charCodeAt(0)),a.setUint32(16,16,!0),a.setUint16(20,1,!0),a.setUint16(22,t,!0),a.setUint32(24,n,!0),a.setUint32(28,1*n*2),a.setUint16(32,2*t),a.setUint16(34,16,!0),a.setUint8(36,"d".charCodeAt(0)),a.setUint8(37,"a".charCodeAt(0)),a.setUint8(38,"t".charCodeAt(0)),a.setUint8(39,"a".charCodeAt(0)),a.setUint32(40,e.byteLength,!0),function(e,t){var n=new Uint8Array(e.byteLength+t.byteLength);return n.set(new Uint8Array(e),0),n.set(new Uint8Array(t),e.byteLength),n.buffer}(i,e)},y=function(e,t,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:32768,a=arguments.length>4?arguments[4]:void 0,r=arguments.length>5?arguments[5]:void 0;return new Promise(function(o){t.fftSize=i,e.decodeAudioData(p(n,r,a),function(n){var i=e.createBufferSource();i.buffer=n,i.connect(t);var a=t.fftSize,r=new Uint8Array(a);t.getByteTimeDomainData(r),i.start(),o(r)})})},O=function(e,t,n,i,a){t.fillStyle=a.fillStyle,t.fillRect(0,0,n,i),t.lineWidth=a.lineWidth,t.strokeStyle=a.strokeStyle,t.beginPath();for(var r=e.length,o=1*n/r,c=0,s=0;s<r;s++){var f=e[s]/128*i/2;0===s?t.moveTo(c,f):t.lineTo(c,f),c+=o}t.lineTo(n,i/2),t.stroke()},_=Object(h.c)(Object(f.b)(Object(h.b)("store"),Object(f.a)(function(e){var t=e.navigatorMicStream;return b.a(t)},f.f),Object(f.h)(function(e){var t=e.color,n=e.store,i=(n.spectrumInfo,n.config);return{styles:{fillStyle:"white",strokeStyle:t,lineWidth:1},fftSize:32768,rate:i.mic.rate,channels:i.mic.channels,sinewaveScale:i.sinewaveScale}}),Object(f.c)({componentDidMount:function(){var e=Object(g.a)(v.a.mark(function e(){var t,n,i,a,r,o,c,s,f,h,m,u,l=this;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=this.props,n=t.navigatorMicStream,i=t.fftSize,a=t.rate,r=t.channels,o=t.sinewaveScale,c=new(window.AudioContext||window.webkitAudioContext),s=c.createAnalyser(),f=document.querySelector(".sinewave"),h=f.width,m=f.height,(u=f.getContext("2d")).clearRect(0,0,f.width,f.height),n.on("data",function(){var e=Object(g.a)(v.a.mark(function e(t){var n;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y(c,s,t,i,a,r,o);case 2:n=e.sent,O(n,u,h,m,l.props.styles);case 4:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}());case 8:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()}),Object(f.d)(c.a({sineWaveHeight:s.a(["store","windowInfo","sineWaveHeight"]),sineWaveWidth:s.a(["store","windowInfo","sineWaveWidth"]),wavesCount:s.a(["wavesCount"])})))(function(e){var t=e.sineWaveHeight,n=e.sineWaveWidth;return a.a.createElement("div",{className:"d-flex flex-row"},a.a.createElement("canvas",{className:"sinewave",width:n,height:t}))})),S=function(e,t,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:2048,a=arguments.length>4?arguments[4]:void 0,r=arguments.length>5?arguments[5]:void 0;return new Promise(function(o){t.fftSize=i,e.decodeAudioData(p(n,r,a),function(n){var i=e.createBufferSource();i.buffer=n,i.connect(t);var a=t.fftSize,r=new Uint8Array(a);t.getByteFrequencyData(r),i.start(),o(r)})})},W=function(e,t,n,i,a,r,o){i.fillRect(0,0,a,r),i.beginPath();for(var c,s=e.length,f=a/s*2.5,h=0,m=0;m<s;m++)c=e[m],i.fillStyle=o.strokeStyle,i.fillRect(h,r-c,f,c),h+=f+1;i.fillStyle=o.fillStyle},j=Object(f.b)(h.c,Object(h.b)("store"),Object(f.a)(function(e){var t=e.navigatorMicStream;return b.a(t)},f.f),Object(f.h)(function(e){var t=e.color,n=e.store,i=(n.spectrumInfo,n.config);return{styles:{fillStyle:"white",strokeStyle:t,lineWidth:1},fftSize:256,rate:i.mic.rate,channels:i.mic.channels,minRateDif:i.minRateDif}}),Object(f.c)({componentDidMount:function(){var e=this,t=this.props,n=t.navigatorMicStream,i=t.fftSize,a=t.channels,r=t.rate,o=t.store,c=(t.minRateDif,new(window.AudioContext||window.webkitAudioContext)),s=c.createAnalyser(),f=document.querySelector(".frequency-bars"),h=f.width,m=f.height,u=f.getContext("2d");u.clearRect(0,0,f.width,f.height),n.on("data",function(){var t=Object(g.a)(v.a.mark(function t(n){var f;return v.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,S(c,s,n,i,r,a);case 2:f=t.sent,W(f,o.spectrumInfo,0,u,h,m,e.props.styles),o.spectrumInfo.setMean(f);case 5:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()),n.on("error",alert)}}),Object(f.d)(c.a({frequencyHeight:s.a(["store","windowInfo","frequencyHeight"]),frequencyWidth:s.a(["store","windowInfo","frequencyWidth"])})))(function(e){var t=e.frequencyHeight,n=e.frequencyWidth;return a.a.createElement("canvas",{className:"frequency-bars",width:n,height:t})}),I=Object(f.b)(Object(h.b)("store"),Object(f.d)(c.a({spectrumInfo:s.a(["store","spectrumInfo"]),config:s.a(["store","config"])})))(Object(h.c)(function(e){var t=e.spectrumInfo,n=e.config;return t.timeLeft<=0?a.a.createElement("div",null,a.a.createElement("div",{className:"d-flex flex-column justify-content-center"},a.a.createElement("h1",{className:"text-center"},t.meanOfBreathR," % / ",n.minRateDif," %"),a.a.createElement("h1",{className:"text-center"},t.mean," / ",t.meanOfBreath))):a.a.createElement("h1",{className:"text-center"},t.timeLeft)})),B=Object(h.b)("store")(I),D=(n(125),Object(f.b)(Object(h.b)("store"),Object(f.d)(c.a({windowInfo:s.a(["store","windowInfo"])})),Object(f.g)({onInteractWithWindowClick:function(e){var t=e.windowInfo;return function(){return t.interactWithWindow()}}}))(function(e){var t=e.onInteractWithWindowClick;return a.a.createElement("div",{onClick:t,className:"interact-window"},a.a.createElement("p",{onClick:t},"Tab to Start"))})),C=(n(127),"".concat(window.location.hostname,":").concat(window.location.port)),R=d()(C),x=Object(f.b)(Object(f.a)(function(e){return!e.windowInfo.isInteracted},Object(f.e)(D)))(Object(h.c)(function(e){var t=e.navigatorMicStream,n=e.spectrumInfo,i=e.config;return a.a.createElement("div",{className:"container-fluid",style:{padding:0}},i.mic.rate&&a.a.createElement(_,{navigatorMicStream:t,color:n.color}),i.mic.rate&&a.a.createElement(j,{navigatorMicStream:t,color:n.color}),a.a.createElement(B,null))})),U=Object(f.b)(h.c,Object(h.b)("store"),Object(f.d)(c.a({spectrumInfo:s.a(["store","spectrumInfo"]),windowInfo:s.a(["store","windowInfo"]),config:s.a(["store","config"])})),Object(f.i)("navigatorMicStream","setStream",null),Object(f.c)({componentDidMount:function(){var e=this;this.props.windowInfo.init(),this.props.config.setUrl(C),u()(R).on("mic-stream",function(t,n){var i=n.mic,a=n.minRateDif,r=n.minBreathTime;e.props.setStream(t),e.props.config.setMinRateDif(a),e.props.config.setMinBreathTime(r),e.props.config.setMic(i.rate,i.channels,i.device),e.props.spectrumInfo.changeConfig({minRateDif:a,minBreathTime:r})})}}))(Object(h.c)(x));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var A=n(132),T=n(62),k=n(123),L=n(5),M=n(67),E=n(68),q=function(){function e(t){Object(M.a)(this,e),this._statOfListen=null,this._isListening=!0,this._time=t.timeToListen,this._minBreathTime=t.minBreathTime,this._minRateDif=t.minRateDif,this._lastNotificationDate=null,this._means=[],this._mean=0,this._maxes=[],this._max=0,this.listen=this.listen.bind(this)}return Object(E.a)(e,[{key:"changeConfig",value:function(e){this._time=e.timeToListen||this._time,this._minBreathTime=e.minBreathTime||this._minBreathTime,this._minRateDif=e.minRateDif||this._minRateDif}},{key:"listen",value:function(e,t){if(this._isListening){this._statOfListen=this._statOfListen||(new Date).getTime();var n=((new Date).getTime()-this._statOfListen)/1e3,i=parseInt(n,10)-1;i<0||(this._means[i]=this._means[i]||[],this._maxes[i]=this._maxes[i]||[],this._means[i].push(e),this._maxes[i].push(t),n>this._time&&(this._isListening=!1,this._mean=A.a(this._means.map(T.a(k.a,0))),this._max=A.a(this._maxes.map(T.a(k.a,0)))))}}},{key:"getMean",value:function(){return this._mean}},{key:"getMax",value:function(){return this._max}},{key:"getTimeLeft",value:function(){if(!this._isListening)return 0;var e=((new Date).getTime()-this._statOfListen)/1e3;return this._time-parseInt(e,10)}},{key:"getColor",value:function(e){if(this._isListening)return"black";this._lastNotificationDate=this._lastNotificationDate||(new Date).getTime();var t=(new Date).getTime()-this._lastNotificationDate;return e>this._minRateDif&&t>=this._minBreathTime?"rgb(255, ".concat(155-(e+15)||0,",  ").concat(155-(e+15)||0,")"):"blue"}}]),e}(),H=n(69),N={timeToListen:10,minRateDif:10,sinewaveScale:1.9,minBreathTime:100},z=L.a.model("SpectrumInfo",{mic:L.a.frozen({rate:L.a.number,channels:L.a.number,device:L.a.string}),url:L.a.string,timeToListen:L.a.number,minRateDif:L.a.number,sinewaveScale:L.a.number,minBreathTime:L.a.number}).actions(function(e){return{setMic:function(t,n,i){e.mic={rate:t,channels:n,device:i}},setUrl:function(t){e.url=t},setMinRateDif:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N.minRateDif;e.minRateDif=t},setMinBreathTime:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N.minBreathTime;e.minBreathTime=t}}}).create(Object(H.a)({mic:{rate:0,channels:0,device:1},url:""},N)),P=new q(N),F={spectrumInfo:L.a.model("SpectrumInfo",{mean:L.a.number,max:L.a.number,meanOfBreath:L.a.number,meanOfBreathR:L.a.number,timeLeft:L.a.number,color:L.a.string}).actions(function(e){return{setMean:function(t){e.mean=parseInt(A.a(t),10),e.max=T.a(k.a,0,t),P.listen(e.mean,e.max),e.meanOfBreath=P.getMean(),e.timeLeft=P.getTimeLeft(),e.meanOfBreath&&(e.meanOfBreathR=parseInt(100-100*e.meanOfBreath/e.mean,10)||0,e.meanOfBreathR=e.meanOfBreathR>0?e.meanOfBreathR:0),e.color=P.getColor(e.meanOfBreathR),e.meanOfBreathR&&e.meanOfBreathR},changeConfig:function(e){P.changeConfig(e)}}}).create({mean:0,max:0,meanOfBreath:0,meanOfBreathR:0,timeLeft:-1,color:"black"}),windowInfo:L.a.model("WindowInfo",{sineWaveHeight:L.a.number,frequencyHeight:L.a.number,sineWaveWidth:L.a.number,frequencyWidth:L.a.number,isInteracted:L.a.boolean}).actions(function(e){return{init:function(){var t=window.innerHeight;e.sineWaveHeight=.35*t,e.frequencyHeight=.35*t,e.sineWaveWidth=window.innerWidth,e.frequencyWidth=window.innerWidth},interactWithWindow:function(){e.isInteracted=!0}}}).create({sineWaveHeight:0,frequencyHeight:0,sineWaveWidth:0,frequencyWidth:0,isInteracted:!1}),config:z};o.a.render(a.a.createElement(h.a,{store:F},a.a.createElement(U,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},70:function(e,t,n){e.exports=n(129)},81:function(e,t){},83:function(e,t){}},[[70,2,1]]]);
//# sourceMappingURL=main.883d7cd8.chunk.js.map