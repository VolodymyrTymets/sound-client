(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{121:function(e,t){},128:function(e,t,n){},132:function(e,t,n){"use strict";n.r(t);var i=n(0),a=n.n(i),r=n(16),o=n.n(r),c=n(134),s=n(127),f=n(2),m=n(7),u=n(67),h=n.n(u),l=n(68),d=n.n(l),w=n(12),v=n.n(w),g=n(23),b=n(133),p=function(e,t,n){var i=new ArrayBuffer(44),a=new DataView(i);return a.setUint8(0,"R".charCodeAt(0)),a.setUint8(1,"I".charCodeAt(0)),a.setUint8(2,"F".charCodeAt(0)),a.setUint8(3,"F".charCodeAt(0)),a.setUint32(4,e.byteLength/2+44,!0),a.setUint8(8,"W".charCodeAt(0)),a.setUint8(9,"A".charCodeAt(0)),a.setUint8(10,"V".charCodeAt(0)),a.setUint8(11,"E".charCodeAt(0)),a.setUint8(12,"f".charCodeAt(0)),a.setUint8(13,"m".charCodeAt(0)),a.setUint8(14,"t".charCodeAt(0)),a.setUint8(15," ".charCodeAt(0)),a.setUint32(16,16,!0),a.setUint16(20,1,!0),a.setUint16(22,t,!0),a.setUint32(24,n,!0),a.setUint32(28,1*n*2),a.setUint16(32,2*t),a.setUint16(34,16,!0),a.setUint8(36,"d".charCodeAt(0)),a.setUint8(37,"a".charCodeAt(0)),a.setUint8(38,"t".charCodeAt(0)),a.setUint8(39,"a".charCodeAt(0)),a.setUint32(40,e.byteLength,!0),function(e,t){var n=new Uint8Array(e.byteLength+t.byteLength);return n.set(new Uint8Array(e),0),n.set(new Uint8Array(t),e.byteLength),n.buffer}(i,e)},y=function(e,t,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:32768,a=arguments.length>4?arguments[4]:void 0,r=arguments.length>5?arguments[5]:void 0;return new Promise(function(o){t.fftSize=i,e.decodeAudioData(p(n,r,a),function(n){var i=e.createBufferSource();i.buffer=n,i.connect(t);var a=t.fftSize,r=new Uint8Array(a);t.getByteTimeDomainData(r),i.start(),o(r)})})},O=function(e,t,n,i,a){t.fillStyle=a.fillStyle,t.fillRect(0,0,n,i),t.lineWidth=a.lineWidth,t.strokeStyle=a.strokeStyle,t.beginPath();for(var r=e.length,o=1*n/r,c=0,s=0;s<r;s++){var f=e[s]/128*i/2;0===s?t.moveTo(c,f):t.lineTo(c,f),c+=o}t.lineTo(n,i/2),t.stroke()},D=Object(m.c)(Object(f.b)(Object(m.b)("store"),Object(f.a)(function(e){var t=e.navigatorMicStream;return b.a(t)},f.f),Object(f.h)(function(e){var t=e.color,n=e.store,i=(n.spectrumInfo,n.config);return{styles:{fillStyle:"white",strokeStyle:t,lineWidth:1},fftSize:32768,rate:i.mic.rate,channels:i.mic.channels,sinewaveScale:i.sinewaveScale}}),Object(f.c)({componentDidMount:function(){var e=Object(g.a)(v.a.mark(function e(){var t,n,i,a,r,o,c,s,f,m,u,h,l=this;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=this.props,n=t.navigatorMicStream,i=t.fftSize,a=t.rate,r=t.channels,o=t.sinewaveScale,c=new(window.AudioContext||window.webkitAudioContext),s=c.createAnalyser(),f=document.querySelector(".sinewave"),m=f.width,u=f.height,(h=f.getContext("2d")).clearRect(0,0,f.width,f.height),n.on("data",function(){var e=Object(g.a)(v.a.mark(function e(t){var n;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y(c,s,t,i,a,r,o);case 2:n=e.sent,O(n,h,m,u,l.props.styles);case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}());case 8:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()}),Object(f.d)(c.a({sineWaveHeight:s.a(["store","windowInfo","sineWaveHeight"]),sineWaveWidth:s.a(["store","windowInfo","sineWaveWidth"]),wavesCount:s.a(["wavesCount"])})))(function(e){var t=e.sineWaveHeight,n=e.sineWaveWidth;return a.a.createElement("div",{className:"d-flex flex-row"},a.a.createElement("canvas",{className:"sinewave",width:n,height:t}))})),x=function(e,t,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:2048,a=arguments.length>4?arguments[4]:void 0,r=arguments.length>5?arguments[5]:void 0;return new Promise(function(o){t.fftSize=i,e.decodeAudioData(p(n,r,a),function(n){var i=e.createBufferSource();i.buffer=n,i.connect(t);var a=t.fftSize,r=new Uint8Array(a);t.getByteFrequencyData(r),i.start(),o(r)})})},S=function(e,t,n,i,a,r,o){i.fillRect(0,0,a,r),i.beginPath();for(var c,s=e.length,f=a/s*2.5,m=0,u=0;u<s;u++)c=e[u],i.fillStyle=o.strokeStyle,i.fillRect(m,r-c,f,c),m+=f+1;i.fillStyle=o.fillStyle},_=Object(f.b)(m.c,Object(m.b)("store"),Object(f.a)(function(e){var t=e.navigatorMicStream;return b.a(t)},f.f),Object(f.h)(function(e){var t=e.color,n=e.store,i=(n.spectrumInfo,n.config);return{styles:{fillStyle:"white",strokeStyle:t,lineWidth:1},fftSize:256,rate:i.mic.rate,channels:i.mic.channels,minRateDif:i.minRateDif}}),Object(f.c)({componentDidMount:function(){var e=this,t=this.props,n=t.navigatorMicStream,i=t.fftSize,a=t.channels,r=t.rate,o=t.store,c=(t.minRateDif,new(window.AudioContext||window.webkitAudioContext)),s=c.createAnalyser(),f=document.querySelector(".frequency-bars"),m=f.width,u=f.height,h=f.getContext("2d");h.clearRect(0,0,f.width,f.height),n.on("data",function(){var t=Object(g.a)(v.a.mark(function t(n){var f;return v.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,x(c,s,n,i,r,a);case 2:f=t.sent,S(f,o.spectrumInfo,0,h,m,u,e.props.styles),o.spectrumInfo.setMean(f);case 5:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()),n.on("error",alert)}}),Object(f.d)(c.a({frequencyHeight:s.a(["store","windowInfo","frequencyHeight"]),frequencyWidth:s.a(["store","windowInfo","frequencyWidth"])})))(function(e){var t=e.frequencyHeight,n=e.frequencyWidth;return a.a.createElement("canvas",{className:"frequency-bars",width:n,height:t})}),R=n(135),W=Object(f.b)(Object(m.b)("store"),Object(f.d)(c.a({spectrumInfo:s.a(["store","spectrumInfo"]),config:s.a(["store","config"]),distance:R.a(c.a({min:s.a(["store","config","minRateDif"]),max:s.a(["store","config","maxRateDif"]),ratting:s.a(["store","spectrumInfo","meanOfBreathR"])}),function(e){return function(e,t,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:6;if(n<e)return null;if(n>t)return 0;var a=(t-n)/((t-e)/i);return Math.round(a)}(e.min,e.max,e.ratting||0)})})))(Object(m.c)(function(e){var t=e.spectrumInfo,n=e.config,i=e.distance;return t.timeLeft<=0?a.a.createElement("div",null,a.a.createElement("h1",{className:"text-center",style:{color:t.color}},null!==i?"".concat(i," mm"):"-"),a.a.createElement("div",{className:"d-flex flex-column justify-content-center"},a.a.createElement("h3",{className:"text-center"},a.a.createElement("small",{className:"text-muted"},"Spectrum: "),t.meanOfBreath," / ",t.mean," = ",t.meanOfBreathR," %"),a.a.createElement("h5",{className:"text-center"},a.a.createElement("small",{className:"text-muted"},"Range: "),n.minRateDif,"  / ",n.maxRateDif))):a.a.createElement("h1",{className:"text-center"},t.timeLeft)})),C=Object(m.b)("store")(W),I=(n(128),Object(f.b)(Object(m.b)("store"),Object(f.d)(c.a({windowInfo:s.a(["store","windowInfo"])})),Object(f.g)({onInteractWithWindowClick:function(e){var t=e.windowInfo;return function(){return t.interactWithWindow()}}}))(function(e){var t=e.onInteractWithWindowClick;return a.a.createElement("div",{onClick:t,className:"interact-window"},a.a.createElement("p",{onClick:t},"Tab to Start"))})),j=(n(130),"".concat(window.location.hostname,":").concat(window.location.port)),B=d()(j),T=Object(f.b)(Object(f.a)(function(e){return!e.windowInfo.isInteracted},Object(f.e)(I)))(Object(m.c)(function(e){var t=e.navigatorMicStream,n=e.spectrumInfo,i=e.config;return a.a.createElement("div",{className:"container-fluid",style:{padding:0}},i.mic.rate&&a.a.createElement(D,{navigatorMicStream:t,color:n.color}),i.mic.rate&&a.a.createElement(_,{navigatorMicStream:t,color:n.color}),a.a.createElement(C,null))})),A=Object(f.b)(m.c,Object(m.b)("store"),Object(f.d)(c.a({spectrumInfo:s.a(["store","spectrumInfo"]),windowInfo:s.a(["store","windowInfo"]),config:s.a(["store","config"])})),Object(f.i)("navigatorMicStream","setStream",null),Object(f.c)({componentDidMount:function(){var e=this;this.props.windowInfo.init(),this.props.config.setUrl(j),h()(B).on("mic-stream",function(t,n){var i=n.mic,a=n.minRateDif,r=n.minBreathTime,o=n.maxRateDif;e.props.setStream(t),e.props.config.setRate(a,o),e.props.config.setMinBreathTime(r),e.props.config.setMic(i.rate,i.channels,i.device),e.props.spectrumInfo.changeConfig({minRateDif:a,minBreathTime:r})})}}))(Object(m.c)(T));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var U=n(136),k=n(41),L=n(126),M=n(5),N=n(69),E=n(70),q=null,H=function(){q||(q=function(){var e=new(window.AudioContext||window.webkitAudioContext),t=e.createOscillator();return t.type="square",t.frequency.setValueAtTime(2e3,e.currentTime),t.connect(e.destination),t}()).start()},z=function(){function e(t){Object(N.a)(this,e),this._statOfListen=null,this._isListening=!0,this._time=t.timeToListen,this._minBreathTime=t.minBreathTime,this._minRateDif=t.minRateDif,this._lastColorNotificationDate=null,this._lastSoundNotificationDate=null,this._means=[],this._mean=0,this._maxes=[],this._max=0,this.listen=this.listen.bind(this)}return Object(E.a)(e,[{key:"changeConfig",value:function(e){this._time=e.timeToListen||this._time,this._minBreathTime=e.minBreathTime||this._minBreathTime,this._minRateDif=e.minRateDif||this._minRateDif}},{key:"listen",value:function(e,t){if(this._isListening){this._statOfListen=this._statOfListen||(new Date).getTime();var n=((new Date).getTime()-this._statOfListen)/1e3,i=parseInt(n,10)-1;i<0||(this._means[i]=this._means[i]||[],this._maxes[i]=this._maxes[i]||[],this._means[i].push(e),this._maxes[i].push(t),n>this._time&&(this._isListening=!1,this._mean=U.a(this._means.map(k.a(L.a,0))),this._max=U.a(this._maxes.map(k.a(L.a,0)))))}}},{key:"getMean",value:function(){return this._mean}},{key:"getMax",value:function(){return this._max}},{key:"getTimeLeft",value:function(){if(!this._isListening)return 0;var e=((new Date).getTime()-this._statOfListen)/1e3;return this._time-parseInt(e,10)}},{key:"getColor",value:function(e){if(this._isListening)return"black";this._lastColorNotificationDate=this._lastColorNotificationDate||(new Date).getTime();var t=(new Date).getTime()-this._lastColorNotificationDate;return e>this._minRateDif&&t>=this._minBreathTime?"rgb(255, ".concat(155-(e+15)||0,",  ").concat(155-(e+15)||0,")"):"blue"}},{key:"soundNotify",value:function(e){this._lastSoundNotificationDate=this._lastSoundNotificationDate||(new Date).getTime();var t=(new Date).getTime()-this._lastSoundNotificationDate;return e>this._minRateDif&&t>=this._minBreathTime?(console.log("----\x3e soundStart "),H()):(console.log("----\x3e soundStop"),q&&q.stop(),void(q=null))}}]),e}(),P=n(71),F={timeToListen:10,minRateDif:50,maxRateDif:90,sinewaveScale:1.9,minBreathTime:100},V=M.a.model("SpectrumInfo",{mic:M.a.frozen({rate:M.a.number,channels:M.a.number,device:M.a.string}),url:M.a.string,timeToListen:M.a.number,minRateDif:M.a.number,maxRateDif:M.a.number,sinewaveScale:M.a.number,minBreathTime:M.a.number}).actions(function(e){return{setMic:function(t,n,i){e.mic={rate:t,channels:n,device:i}},setUrl:function(t){e.url=t},setRate:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F.minRateDif,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:F.maxRateDif;e.minRateDif=t,e.maxRateDif=n},setMaxRateDif:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F.maxRateDif;e.maxRateDif=t},setMinBreathTime:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F.minBreathTime;e.minBreathTime=t}}}).create(Object(P.a)({mic:{rate:0,channels:0,device:1},url:""},F)),J=new z(F),$={spectrumInfo:M.a.model("SpectrumInfo",{mean:M.a.number,max:M.a.number,meanOfBreath:M.a.number,meanOfBreathR:M.a.number,timeLeft:M.a.number,color:M.a.string}).actions(function(e){return{setMean:function(t){e.mean=parseInt(U.a(t),10),e.max=k.a(L.a,0,t),J.listen(e.mean,e.max),e.meanOfBreath=J.getMean(),e.timeLeft=J.getTimeLeft(),e.meanOfBreath&&(e.meanOfBreathR=parseInt(100-100*e.meanOfBreath/e.mean,10)||0,e.meanOfBreathR=e.meanOfBreathR>0?e.meanOfBreathR:0),e.color=J.getColor(e.meanOfBreathR),e.meanOfBreathR&&J.soundNotify(e.meanOfBreathR)},changeConfig:function(e){J.changeConfig(e)}}}).create({mean:0,max:0,meanOfBreath:0,meanOfBreathR:0,timeLeft:-1,color:"black"}),windowInfo:M.a.model("WindowInfo",{sineWaveHeight:M.a.number,frequencyHeight:M.a.number,sineWaveWidth:M.a.number,frequencyWidth:M.a.number,isInteracted:M.a.boolean}).actions(function(e){return{init:function(){var t=window.innerHeight;e.sineWaveHeight=.35*t,e.frequencyHeight=.35*t,e.sineWaveWidth=window.innerWidth,e.frequencyWidth=window.innerWidth},interactWithWindow:function(){e.isInteracted=!0}}}).create({sineWaveHeight:0,frequencyHeight:0,sineWaveWidth:0,frequencyWidth:0,isInteracted:!1}),config:V};o.a.render(a.a.createElement(m.a,{store:$},a.a.createElement(A,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},72:function(e,t,n){e.exports=n(132)},83:function(e,t){},85:function(e,t){}},[[72,2,1]]]);
//# sourceMappingURL=main.0f89340c.chunk.js.map