(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{118:function(e,t){},127:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=n(14),c=n.n(r),o=n(129),s=n(124),u=n(5),f=n(7),l=n(65),m=n.n(l),h=n(66),d=n.n(h),w=n(11),v=n.n(w),g=n(23),b=n(128),p=function(e,t,n){var a=new ArrayBuffer(44),i=new DataView(a);return i.setUint8(0,"R".charCodeAt(0)),i.setUint8(1,"I".charCodeAt(0)),i.setUint8(2,"F".charCodeAt(0)),i.setUint8(3,"F".charCodeAt(0)),i.setUint32(4,e.byteLength/2+44,!0),i.setUint8(8,"W".charCodeAt(0)),i.setUint8(9,"A".charCodeAt(0)),i.setUint8(10,"V".charCodeAt(0)),i.setUint8(11,"E".charCodeAt(0)),i.setUint8(12,"f".charCodeAt(0)),i.setUint8(13,"m".charCodeAt(0)),i.setUint8(14,"t".charCodeAt(0)),i.setUint8(15," ".charCodeAt(0)),i.setUint32(16,16,!0),i.setUint16(20,1,!0),i.setUint16(22,t,!0),i.setUint32(24,n,!0),i.setUint32(28,1*n*2),i.setUint16(32,2*t),i.setUint16(34,16,!0),i.setUint8(36,"d".charCodeAt(0)),i.setUint8(37,"a".charCodeAt(0)),i.setUint8(38,"t".charCodeAt(0)),i.setUint8(39,"a".charCodeAt(0)),i.setUint32(40,e.byteLength,!0),function(e,t){var n=new Uint8Array(e.byteLength+t.byteLength);return n.set(new Uint8Array(e),0),n.set(new Uint8Array(t),e.byteLength),n.buffer}(a,e)},y=new(window.AudioContext||window.webkitAudioContext),O=y.createAnalyser(),S=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:32768,n=arguments.length>2?arguments[2]:void 0,a=arguments.length>3?arguments[3]:void 0;return new Promise(function(i){O.fftSize=t,y.decodeAudioData(p(e,a,n),function(e){var t=y.createBufferSource();t.buffer=e,t.connect(O);var n=O.fftSize,a=new Uint8Array(n);O.getByteTimeDomainData(a),t.start(),i(a)})})},A=function(e,t,n,a,i){t.fillStyle=i.fillStyle,t.fillRect(0,0,n,a),t.lineWidth=i.lineWidth,t.strokeStyle=i.strokeStyle,t.beginPath();for(var r=e.length,c=1*n/r,o=0,s=0;s<r;s++){var u=e[s]/128*a/2;0===s?t.moveTo(o,u):t.lineTo(o,u),o+=c}t.lineTo(n,a/2),t.stroke()},W=Object(f.c)(Object(u.b)(Object(f.b)("store"),Object(u.a)(function(e){var t=e.navigatorMicStream;return b.a(t)},u.e),Object(u.f)(function(e){var t=e.fillStyle,n=e.store,a=(n.spectrumInfo,n.config);return{styles:{fillStyle:t,strokeStyle:"rgb(0, 0, 0)",lineWidth:1},fftSize:32768,rate:a.mic.rate,channels:a.mic.channels}}),Object(u.c)({componentDidMount:function(){var e=Object(g.a)(v.a.mark(function e(){var t,n,a,i,r,c,o,s,u,f=this;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=this.props,n=t.navigatorMicStream,a=t.fftSize,i=t.rate,r=t.channels,c=document.querySelector(".sinewave"),o=c.width,s=c.height,(u=c.getContext("2d")).clearRect(0,0,c.width,c.height),n.on("data",function(){var e=Object(g.a)(v.a.mark(function e(t){var n;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S(t,a,i,r);case 2:n=e.sent,A(n,u,o,s,f.props.styles);case 4:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}());case 6:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()}),Object(u.d)(o.a({sineWaveHeight:s.a(["store","windowInfo","sineWaveHeight"]),sineWaveWidth:s.a(["store","windowInfo","sineWaveWidth"]),wavesCount:s.a(["wavesCount"])})))(function(e){var t=e.sineWaveHeight,n=e.sineWaveWidth;return i.a.createElement("div",{className:"d-flex flex-row"},i.a.createElement("canvas",{className:"sinewave",width:n,height:t}))})),j=new(window.AudioContext||window.webkitAudioContext),C=j.createAnalyser(),U=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2048,n=arguments.length>2?arguments[2]:void 0,a=arguments.length>3?arguments[3]:void 0;return new Promise(function(i){C.fftSize=t,j.decodeAudioData(p(e,a,n),function(e){var t=j.createBufferSource();t.buffer=e,t.connect(C);var n=C.fftSize,a=new Uint8Array(n);C.getByteFrequencyData(a),t.start(),i(a)})})},x=function(e,t,n,a,i){t.fillStyle=i.fillStyle,t.fillRect(0,0,n,a),t.beginPath();for(var r,c=e.length,o=n/c*2.5,s=0,u=0;u<c;u++)r=e[u],t.fillStyle=i.strokeStyle,t.fillRect(s,a-r/2,o,r/2),s+=o+1},I=function(e){return e>30?"rgb(255, ".concat(100-e||0,",  ").concat(100-e||0,")"):"rgb(".concat(155+e,", 255, ").concat(155+e,")")},M=Object(u.b)(Object(f.b)("store"),Object(u.a)(function(e){var t=e.navigatorMicStream;return b.a(t)},u.e),Object(u.f)(function(e){var t=e.store,n=t.spectrumInfo,a=t.config;return{styles:{fillStyle:I(n.meanOfBreathR),strokeStyle:"rgb(0, 0, 0)",lineWidth:1},fftSize:2048,rate:a.mic.rate,channels:a.mic.channels}}),Object(u.c)({componentDidMount:function(){var e=this,t=this.props,n=t.navigatorMicStream,a=t.fftSize,i=t.channels,r=t.rate,c=t.store,o=document.querySelector(".frequency-bars"),s=o.width,u=o.height,f=o.getContext("2d");f.clearRect(0,0,o.width,o.height),n.on("data",function(){var t=Object(g.a)(v.a.mark(function t(n){var o;return v.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,U(n,a,r,i);case 2:o=t.sent,x(o,f,s,u,e.props.styles),c.spectrumInfo.setMean(o),c.spectrumInfo.setMax(o);case 6:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()),n.on("error",alert)}}),Object(u.d)(o.a({frequencyHeight:s.a(["store","windowInfo","frequencyHeight"]),frequencyWidth:s.a(["store","windowInfo","frequencyWidth"])})))(Object(f.c)(function(e){var t=e.frequencyHeight,n=e.frequencyWidth;return i.a.createElement("canvas",{className:"frequency-bars",width:n,height:t})})),E=Object(u.b)(Object(f.b)("store"),Object(u.d)(o.a({spectrumInfo:s.a(["store","spectrumInfo"]),config:s.a(["store","config"]),backgroundColor:s.a(["backgroundColor"])})))(Object(f.c)(function(e){var t=e.spectrumInfo,n=e.config,a=e.backgroundColor;return i.a.createElement("div",{style:{backgroundColor:a}},i.a.createElement("div",{className:"d-flex flex-row justify-content-between"},i.a.createElement("p",null,"Mean: ",t.mean," "),i.a.createElement("p",null,"Max: ",t.max," "),i.a.createElement("p",null,"MB:",t.meanOfBreath," / ",t.meanOfBreathR," %"),i.a.createElement("p",null,"M:")),i.a.createElement("div",{className:"d-flex flex-column justify-content-between"},i.a.createElement("p",null,"Config:  "),i.a.createElement("p",null,"Url: ",n.url," "),i.a.createElement("p",null,"Mic Rate: ",n.mic.rate," "),i.a.createElement("p",null,"Mic Channels: ",n.mic.channels," "),i.a.createElement("p",null,"Mic Name: ",n.mic.device," "),i.a.createElement("p",null,"Time To Listen: ",n.timeToListen," "),i.a.createElement("p",null,"Min RateDif: ",n.minRateDif," ")))})),k=Object(f.b)("store")(E),B=(n(125),"".concat(window.location.hostname,":").concat(window.location.port)),R=d()(B),q=Object(u.b)(Object(f.b)("store"),Object(u.d)(o.a({spectrumInfo:s.a(["store","spectrumInfo"]),windowInfo:s.a(["store","windowInfo"]),config:s.a(["store","config"])})),Object(u.g)("navigatorMicStream","setStream",null),Object(u.c)({componentDidMount:function(){var e=this;this.props.windowInfo.init(),this.props.config.setUrl(B),m()(R).on("mic-stream",function(t,n){var a=n.mic;e.props.setStream(t),e.props.config.setMic(a.rate,a.channels,a.device)})}}))(Object(f.c)(function(e){var t=e.navigatorMicStream,n=e.spectrumInfo,a=e.config,r=I(n.meanOfBreathR);return i.a.createElement("div",{className:"container-fluid",style:{padding:0}},a.mic.rate&&i.a.createElement(W,{navigatorMicStream:t,fillStyle:r}),a.mic.rate&&i.a.createElement(M,{navigatorMicStream:t,fillStyle:r}),i.a.createElement(k,{backgroundColor:r}))}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var L=n(130),_=n(62),D=n(123),T=n(6),H=null,z=function(e,t){e>t.minRateDif?H||(H=function(){var e=new(window.AudioContext||window.webkitAudioContext),t=e.createOscillator();return t.type="square",t.frequency.setValueAtTime(2e3,e.currentTime),t.connect(e.destination),t}()).start():(H&&H.stop(),H=null)},N=n(67),P=n(68),F=function(){function e(t){Object(N.a)(this,e),this._statOfListen=null,this._isListening=!0,this._time=t.timeToListen,this._means=[],this._mean=0,this.listen=this.listen.bind(this)}return Object(P.a)(e,[{key:"listen",value:function(e){if(this._isListening){this._statOfListen=this._statOfListen||(new Date).getTime();var t=((new Date).getTime()-this._statOfListen)/1e3,n=parseInt(t,10)-1;n<0||(this._means[n]=this._means[n]||[],this._means[n].push(e),t>this._time&&(this._isListening=!1,this._mean=L.a(this._means.map(_.a(D.a,0)))))}}},{key:"getMean",value:function(){return this._mean}}]),e}(),V=n(69),J={timeToListen:10,minRateDif:30},$=T.a.model("SpectrumInfo",{mic:T.a.frozen({rate:T.a.number,channels:T.a.number,device:T.a.string}),url:T.a.string,timeToListen:T.a.number,minRateDif:T.a.number}).actions(function(e){return{setMic:function(t,n,a){e.mic={rate:t,channels:n,device:a}},setUrl:function(t){e.url=t}}}).create(Object(V.a)({mic:{rate:0,channels:0,device:1},url:""},J)),G=new F(J),K={spectrumInfo:T.a.model("SpectrumInfo",{mean:T.a.number,max:T.a.number,meanOfBreath:T.a.number,meanOfBreathR:T.a.number}).actions(function(e){return{setMean:function(t){e.mean=parseInt(L.a(t),10),G.listen(e.mean),e.meanOfBreath=G.getMean(),e.meanOfBreath&&(e.meanOfBreathR=parseInt(100-100*e.meanOfBreath/e.mean,10)),e.meanOfBreathR&&z(e.meanOfBreathR,J)},setMax:function(t){e.max=_.a(D.a,0,t)}}}).create({mean:0,max:0,meanOfBreath:0,meanOfBreathR:0}),windowInfo:T.a.model("WindowInfo",{sineWaveHeight:T.a.number,frequencyHeight:T.a.number,sineWaveWidth:T.a.number,frequencyWidth:T.a.number}).actions(function(e){return{init:function(){var t=window.innerHeight;e.sineWaveHeight=.7*t/2,e.frequencyHeight=.7*t/2,e.sineWaveWidth=window.innerWidth,e.frequencyWidth=window.innerWidth}}}).create({sineWaveHeight:0,frequencyHeight:0,sineWaveWidth:0,frequencyWidth:0}),config:$};c.a.render(i.a.createElement(f.a,{store:K},i.a.createElement(q,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},70:function(e,t,n){e.exports=n(127)},81:function(e,t){},83:function(e,t){}},[[70,2,1]]]);
//# sourceMappingURL=main.b38aaa43.chunk.js.map