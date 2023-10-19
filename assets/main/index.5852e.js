window.__require=function e(t,r,a){function n(o,s){if(!r[o]){if(!t[o]){var c=o.split("/");if(c=c[c.length-1],!t[c]){var l="function"==typeof __require&&__require;if(!s&&l)return l(c,!0);if(i)return i(c,!0);throw new Error("Cannot find module '"+o+"'")}o=c}var u=r[o]={exports:{}};t[o][0].call(u.exports,function(e){return n(t[o][1][e]||e)},u,u.exports,e,t,r,a)}return r[o].exports}for(var i="function"==typeof __require&&__require,o=0;o<a.length;o++)n(a[o]);return n}({CardData:[function(e,t){"use strict";cc._RF.push(t,"00d34jElcpJLqNqoG8rjtEV","CardData");var r=cc.Class({name:"Card",properties:{color:0,number:0}});cc.Class({extends:cc.Component,getInitialDeck:function(){for(var e=[],t=1;t<=4;++t)for(var a=0;a<=9;++a)for(var n=0;n<2;++n){var i=new r;i.color=t,i.number=a,e.push(i)}for(var o=0;o<2;++o){var s=new r;s.color=5,s.number=0,e.push(s)}return e}}),cc._RF.pop()},{}],CardUIManager:[function(e,t){"use strict";cc._RF.push(t,"699beS1pBRDuqb4yHiTB2fQ","CardUIManager"),cc.Class({extends:cc.Component,properties:{hand:{default:[],visible:!1,tooltip:"\u624b\u724c\u6570\u7ec4\uff0c\u7528\u6765\u5b58\u50a8\u624b\u724c\u4fe1\u606f"},deck:{default:[],visible:!1,tooltip:"\u724c\u5e93\uff0c\u7528\u4e8e\u5b58\u50a8\u5269\u4f59\u7684\u724c"},TemPlayCard:{default:[],visible:!1,tooltip:"\u51fa\u724c\u66ab\u5b58"},_cardContainer:cc.Node,RummyGameManager:{default:null,type:cc.Component,tooltip:"\u5c0dRummyGameManager\u7ec4\u4ef6\u7684\u5f15\u7528"},gameManager:{default:null,type:cc.Node,tooltip:"\u5c0dGameManager\u7ec4\u4ef6\u7684\u5f15\u7528"},layout:{default:null,type:cc.Layout},isCardSelected:{default:!1,visible:!1},cardArea:{default:null,type:cc.Node,tooltip:"\u53c3\u8003\u5230CardArea\u7bc0\u9ede"},MainPlayerDrewBool:!1,cardSlots:[],TemcardSlots:[]},onLoad:function(){var e=this;this.cardSlots=new Array(135).fill(null).map(function(){return{status:"NULL",cardId:null}}),this.TemcardSlots=this.cardSlots,this.MainPlayerDrewBool=!1,this.RummyGameManager=cc.find("Canvas").getComponent("RummyGameManager"),this.gameManager=cc.find("Canvas/GameManager").getComponent("GameManager"),this.CardPrefab=cc.find("Canvas/BG/DownPanel/CardHolder/Card"),this.CardHolder=cc.find("Canvas/BG/DownPanel/CardHolder"),this.cardArea=cc.find("Canvas/BG/CardArea"),this.PreviousButton=cc.find("Canvas/BG/RightPanel/PreviousButton"),this.Confirmbutton=cc.find("Canvas/BG/RightPanel/Confirmbutton"),this.DeckNumBtn=cc.find("Canvas/BG/RightPanel/DrawButton"),this._isDragging=!1,this._selectedCard=null,this.layout=this.CardHolder.getComponent(cc.Layout),this.cardAreaCount=[];var t=0;this.cardArea.children.forEach(function(r){r.hasCard=!1,e.cardAreaCount[t]=r,t++})},CardReader:function(e){if(this.CardPrefab.active=!0,Array.isArray(e))if(this.CardPrefab){for(var t=0;t<e.length+1;t++){var r=this.CardHolder.getChildByName("Card_"+t);r&&r.destroy()}for(var a=0;a<e.length;a++){var n=cc.instantiate(this.CardPrefab);n.name="Card_"+a,this.CardHolder.addChild(n),this._displaySingleCard(e[a],n),n.on(cc.Node.EventType.TOUCH_START,this.onCardTouchStart,this),n.on(cc.Node.EventType.TOUCH_MOVE,this.onCardTouchMove,this),n.on(cc.Node.EventType.TOUCH_END,this.onCardTouchEnd,this),n.on(cc.Node.EventType.TOUCH_CANCEL,this.onCardTouchEnd,this)}this.CardPrefab.active=!1}else console.error("\u73a9\u5bb6\u9884\u5236\u4f53\u4e0d\u5b58\u5728\u6216\u672a\u8bbe\u7f6e\u3002\u8bf7\u786e\u4fdd 'CardPrefab' \u5c5e\u6027\u5df2\u6b63\u786e\u8bbe\u7f6e\u3002");else console.error("CardReader\u9700\u8981\u4e00\u4e2a\u6570\u7ec4\u7c7b\u578b\u7684\u53c2\u6570\uff01")},_displaySingleCard:function(e,t){var r=t.getComponent(cc.Sprite),a="UI/Card/"+e;t.cardInfo=e,cc.resources.load(a,cc.SpriteFrame,function(e,t){e?cc.error("\u627e\u4e0d\u5230\u5361\u724c\u56fe\u50cf\uff1a"+a+".png",e):r.spriteFrame=t})},SameColorBtn:function(){this.layout.enabled=!0,this.hand.sort(function(e,t){return Math.floor((e-1)/10)-Math.floor((t-1)/10)||e-t}),this.CardReader(this.hand)},SameNumBtn:function(){this.layout.enabled=!0,this.hand.sort(function(e,t){var r=e%10,a=t%10,n=Math.floor(e/10);return Math.floor(t/10),5===n?1:r-a||e-t}),this.CardReader(this.hand)},OtherPlayerdrawCard:function(e){if(this.RummyGameManager.deck.length>0){var t=Math.floor(Math.random()*this.RummyGameManager.deck.length),r=this.RummyGameManager.deck.splice(t,1)[0],a=""+r.color+r.number;this.RummyGameManager.playerHands[e].push(a)}else console.warn("\u724c\u5e93\u5df2\u7a7a\uff0c\u65e0\u6cd5\u62bd\u724c\uff01");this.RummyGameManager.updatePlayerHand(e,this.RummyGameManager.playerHands[e]),e==this.RummyGameManager.MainPlayerOrder&&(this.hand=this.RummyGameManager.playerHands[e],this.layout.enabled=!0,this.CardReader(this.hand))},drawCard:function(){this.MainPlayerDrewBool=!0,console.log("\u4e3b\u73a9\u5bb6\u62bd\u724c\u5224\u5b9a:",this.MainPlayerDrewBool),this.layout.enabled=!0;var e=this.RummyGameManager.currentPlayerIndex;if(this.RummyGameManager.deck.length>0){var t=Math.floor(Math.random()*this.RummyGameManager.deck.length),r=this.RummyGameManager.deck.splice(t,1)[0],a=""+r.color+r.number;this.RummyGameManager.playerHands[e].push(a),this.hand.push(a),this.CardReader(this.hand)}else console.warn("\u724c\u5e93\u5df2\u7a7a\uff0c\u65e0\u6cd5\u62bd\u724c\uff01");this.RummyGameManager.updateUI(),this.RummyGameManager.currentState="endRound","function"==typeof this.RummyGameManager.onStateChanged&&this.RummyGameManager.onStateChanged()},onCardTouchStart:function(e){if(!this.isCardSelected){var t=e.currentTarget;this.selectedCard=t,this._isDragging=!0,this.layout&&(this.layout.enabled=!1),this.originalPosition=e.currentTarget.position,this.isCardSelected=!0}},onCardTouchEnd:function(e){var t=this;if(this.selectedCard===e.currentTarget){this._isDragging=!1;var r=this.cardArea.children.find(function(e){return t._isCardOverlapping(t.selectedCard,e)&&!e.hasCard}),a=function(){var e=cc.moveTo(.1,t.originalPosition),r=cc.callFunc(function(){t.selectedCard=null,t.isCardSelected=!1}),a=cc.sequence(e,r);t.selectedCard.runAction(a)};if(r){var n=this.cardArea.children.indexOf(r);if(!this.RummyGameManager.isPlacementValid(n,this.selectedCard.cardInfo))return console.error("\u653e\u7f6e\u5931\u6557\uff01"),void a();var i="UI/Card/"+this.selectedCard.cardInfo;cc.resources.load(i,cc.SpriteFrame,function(e,a){if(e)cc.error("\u627e\u4e0d\u5230\u5361\u724c\u5716\u50cf\uff1a"+i+".png",e);else{t.Confirmbutton.active=!0,t.DeckNumBtn.active=!1;var n=r.parent.children.indexOf(r);t.setCardStatus(n,!0,t.selectedCard.cardInfo),t.RummyGameManager.fillCorrectPlayAreas(),console.log("\u66f4\u65b0\u540e\u7684correctPlayAreas:",JSON.stringify(t.RummyGameManager.correctPlayAreas)),r.getComponent(cc.Sprite).spriteFrame=a;var o=cc.instantiate(t.CardPrefab);o.getComponent(cc.Sprite).spriteFrame=a,o.name="Card",o.setPosition(new cc.Vec2(0,0)),o.active=!0,r.addChild(o),o.on(cc.Node.EventType.TOUCH_START,t.onCardMoveTouchStart,t),o.on(cc.Node.EventType.TOUCH_MOVE,t.onCardTouchMove,t),o.on(cc.Node.EventType.TOUCH_END,t.onCardTouchEnd,t),o.on(cc.Node.EventType.TOUCH_CANCEL,t.onCardTouchEnd,t)}}),r.hasCard=!0;var o=this.hand.indexOf(this.selectedCard.cardInfo);o>-1&&this.hand.splice(o,1),this.RummyGameManager.addToPlayArea(n,this.selectedCard.cardInfo),this.RummyGameManager.playerHands[this.RummyGameManager.MainPlayerOrder]=this.hand,this.selectedCard.destroy(),this.layout&&(this.layout.enabled=!0,this.layout.updateLayout()),this.isCardSelected=!1,this.RummyGameManager.updateUI()}else a()}},_isCardOverlapping:function(e,t){var r=e.getBoundingBoxToWorld(),a=t.getBoundingBoxToWorld();return r.intersects(a)},onCardTouchMove:function(e){if(this._isDragging&&this.selectedCard){var t=e.getDelta();this.selectedCard.x+=t.x,this.selectedCard.y+=t.y}},confirmPlayBtn:function(){this.RummyGameManager.currentState="endRound"},cancelPlay:function(){this.hand=[].concat(this.RummyGameManager.playerHands[playerIndex]),this.CardReader(this.hand)},onCardMoveTouchStart:function(e){if(!this.isCardSelected){var t=e.currentTarget,r=t.getComponent(cc.Sprite).spriteFrame;if(t.cardInfo=r.name,null!=t.index?this.setCardStatus(t.index,!0,r.name):console.error("Touched card does not have an index."),this.selectedCard=t,this.layout&&(this.layout.enabled=!1),this.isCardSelected=!0,this.originalPosition=this.selectedCard.position.clone(),this._isDragging=!0,t.parent){var a=t.parent.getComponent(cc.Sprite);a&&(a.spriteFrame=null)}}},setCardStatus:function(e,t,r){void 0===r&&(r=null),e>=0&&e<this.TemcardSlots.length?(this.TemcardSlots[e].status=t,this.TemcardSlots[e].cardId=r):console.error("Invalid card slot index:",e)},getCardStatus:function(e){return e>=0&&e<this.TemcardSlots.length?this.TemcardSlots[e].status:(console.error("Invalid card slot index:",e),"INVALID")},getCardId:function(e){return e>=0&&e<this.TemcardSlots.length?this.TemcardSlots[e].cardId:(console.error("Invalid card slot index:",e),"INVALID")}}),cc._RF.pop()},{}],GameManager:[function(e,t){"use strict";cc._RF.push(t,"93268rjeCxDdaxw5B7i6p5+","GameManager");var r=cc.Class({name:"Player",properties:{id:cc.Integer,hand:{default:[],type:cc.Object},level:cc.Integer,avatar:cc.SpriteFrame,time:cc.Float,name:cc.String,record:cc.Integer}});e("CardData"),cc.Class({extends:cc.Component,properties:{players:{default:[],type:r},currentDeck:{default:[],type:cc.Object},numPlayers:0,StartCardNum:0,roundTime:0,MainPlayerOrder:0,playAreas:[]},onLoad:function(){this.CardData=cc.find("Canvas/CardData").getComponent("CardData"),this.currentDeck=this.CardData.getInitialDeck(),this.numPlayers=4,this.roundTime=20,this.StartCardNum=10,this.MainPlayerOrder=0,this.playAreas=[],this.setNumPlayers(this.numPlayers),this.setRandomDataForPlayers(),this.shuffleDeck(this.currentDeck)},setNumPlayers:function(e){this.players=[];for(var t=0;t<e;t++){var a=new r;this.players.push(a)}},setRandomDataForPlayers:function(){for(var e=1;e<this.players.length;e++){var t=this.players[e];t.id=Math.floor(1e4*Math.random()),t.level=Math.floor(10*Math.random())+1,t.time=300*Math.random(),t.name="Player_"+t.id,t.record=Math.floor(50*Math.random())}},initPlayersData:function(e){this.setNumPlayers(e),this.setRandomDataForPlayers()},shuffleDeck:function(e){for(var t=e.length-1;t>0;t--){var r=Math.floor(Math.random()*(t+1)),a=[e[r],e[t]];e[t]=a[0],e[r]=a[1]}}}),cc._RF.pop()},{CardData:"CardData"}],RummyGameManager:[function(e,t){"use strict";var r;function a(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(r)return(r=r.call(e)).next.bind(r);if(Array.isArray(e)||(r=n(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var a=0;return function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function n(e,t){if(e){if("string"==typeof e)return i(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?i(e,t):void 0}}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}function o(){o=function(){return e};var e={},t=Object.prototype,r=t.hasOwnProperty,a="function"==typeof Symbol?Symbol:{},n=a.iterator||"@@iterator",i=a.asyncIterator||"@@asyncIterator",s=a.toStringTag||"@@toStringTag";function c(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{c({},"")}catch(I){c=function(e,t,r){return e[t]=r}}function l(e,t,r,a){var n=t&&t.prototype instanceof h?t:h,i=Object.create(n.prototype),o=new A(a||[]);return i._invoke=function(e,t,r){var a="suspendedStart";return function(n,i){if("executing"===a)throw new Error("Generator is already running");if("completed"===a){if("throw"===n)throw i;return{value:void 0,done:!0}}for(r.method=n,r.arg=i;;){var o=r.delegate;if(o){var s=M(o,r);if(s){if(s===d)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===a)throw a="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);a="executing";var c=u(e,t,r);if("normal"===c.type){if(a=r.done?"completed":"suspendedYield",c.arg===d)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(a="completed",r.method="throw",r.arg=c.arg)}}}(e,r,o),i}function u(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(I){return{type:"throw",arg:I}}}e.wrap=l;var d={};function h(){}function f(){}function p(){}var m={};c(m,n,function(){return this});var y=Object.getPrototypeOf,g=y&&y(y(S([])));g&&g!==t&&r.call(g,n)&&(m=g);var v=p.prototype=h.prototype=Object.create(m);function C(e){["next","throw","return"].forEach(function(t){c(e,t,function(e){return this._invoke(t,e)})})}function P(e,t){function a(n,i,o,s){var c=u(e[n],e,i);if("throw"!==c.type){var l=c.arg,d=l.value;return d&&"object"==typeof d&&r.call(d,"__await")?t.resolve(d.__await).then(function(e){a("next",e,o,s)},function(e){a("throw",e,o,s)}):t.resolve(d).then(function(e){l.value=e,o(l)},function(e){return a("throw",e,o,s)})}s(c.arg)}var n;this._invoke=function(e,r){function i(){return new t(function(t,n){a(e,r,t,n)})}return n=n?n.then(i,i):i()}}function M(e,t){var r=e.iterator[t.method];if(void 0===r){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=void 0,M(e,t),"throw"===t.method))return d;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var a=u(r,e.iterator,t.arg);if("throw"===a.type)return t.method="throw",t.arg=a.arg,t.delegate=null,d;var n=a.arg;return n?n.done?(t[e.resultName]=n.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,d):n:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,d)}function b(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function T(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function A(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(b,this),this.reset(!0)}function S(e){if(e){var t=e[n];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var a=-1,i=function t(){for(;++a<e.length;)if(r.call(e,a))return t.value=e[a],t.done=!1,t;return t.value=void 0,t.done=!0,t};return i.next=i}}return{next:w}}function w(){return{value:void 0,done:!0}}return f.prototype=p,c(v,"constructor",p),c(p,"constructor",f),f.displayName=c(p,s,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===f||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,p):(e.__proto__=p,c(e,s,"GeneratorFunction")),e.prototype=Object.create(v),e},e.awrap=function(e){return{__await:e}},C(P.prototype),c(P.prototype,i,function(){return this}),e.AsyncIterator=P,e.async=function(t,r,a,n,i){void 0===i&&(i=Promise);var o=new P(l(t,r,a,n),i);return e.isGeneratorFunction(r)?o:o.next().then(function(e){return e.done?e.value:o.next()})},C(v),c(v,s,"Generator"),c(v,n,function(){return this}),c(v,"toString",function(){return"[object Generator]"}),e.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function r(){for(;t.length;){var a=t.pop();if(a in e)return r.value=a,r.done=!1,r}return r.done=!0,r}},e.values=S,A.prototype={constructor:A,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(T),!e)for(var t in this)"t"===t.charAt(0)&&r.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function a(r,a){return o.type="throw",o.arg=e,t.next=r,a&&(t.method="next",t.arg=void 0),!!a}for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n],o=i.completion;if("root"===i.tryLoc)return a("end");if(i.tryLoc<=this.prev){var s=r.call(i,"catchLoc"),c=r.call(i,"finallyLoc");if(s&&c){if(this.prev<i.catchLoc)return a(i.catchLoc,!0);if(this.prev<i.finallyLoc)return a(i.finallyLoc)}else if(s){if(this.prev<i.catchLoc)return a(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return a(i.finallyLoc)}}}},abrupt:function(e,t){for(var a=this.tryEntries.length-1;a>=0;--a){var n=this.tryEntries[a];if(n.tryLoc<=this.prev&&r.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var o=i?i.completion:{};return o.type=e,o.arg=t,i?(this.method="next",this.next=i.finallyLoc,d):this.complete(o)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),d},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),T(r),d}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var a=r.completion;if("throw"===a.type){var n=a.arg;T(r)}return n}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,r){return this.delegate={iterator:S(e),resultName:t,nextLoc:r},"next"===this.method&&(this.arg=void 0),d}},e}function s(e,t,r,a,n,i,o){try{var s=e[i](o),c=s.value}catch(l){return void r(l)}s.done?t(c):Promise.resolve(c).then(a,n)}function c(e){return function(){var t=this,r=arguments;return new Promise(function(a,n){var i=e.apply(t,r);function o(e){s(i,a,n,o,c,"next",e)}function c(e){s(i,a,n,o,c,"throw",e)}o(void 0)})}}cc._RF.push(t,"35c0bsmUcdPD6bo7K1mX9Mm","RummyGameManager"),cc.Class(((r={extends:cc.Component,properties:{startBgNode:cc.Node,BG:cc.Node,Stop:cc.Node,DeckNumLabel:null,numPlayers:null,playerStatus:[],playerHands:[],playerLv:[],playerTime:[],playername:[],MainPlayerOrder:null,CardHolderBlock:null,CardIsOKBool:null,remainingTime:300,ValidCount:0,playerDeck:{default:[],visible:!1,tooltip:"\u73a9\u5bb6\u7684\u724c\u5e93\uff0c\u7528\u4e8e\u5b58\u50a8\u73a9\u5bb6\u7684\u724c"},hand:{default:[],visible:!1,tooltip:"\u624b\u724c\u6570\u7ec4\uff0c\u7528\u6765\u5b58\u50a8\u624b\u724c\u4fe1\u606f"},_cardContainer:cc.Node,cardUIManager:{default:null,type:cc.Component,tooltip:"\u5bf9CardUIManager\u7ec4\u4ef6\u7684\u5f15\u7528"},gameManager:{default:null,type:cc.Node,tooltip:"The GameManager node"},playAreas:{default:[],visible:!1,tooltip:"\u5b58\u50a8\u6bcf\u4e2a\u51fa\u724c\u533a\u7684\u724c"},TepplayAreas:{default:[],visible:!1,tooltip:"\u66ab\u6642\u5b58\u50a8\u6bcf\u4e2a\u56de\u5408\u51fa\u724c\u533a\u7684\u724c"},players:{default:[],type:[cc.Node]},currentPlayerIndex:null,currentState:{default:"null",notify:function(){this.onStateChanged()}},timerLabel:cc.Label,countdown:0,timerBar:{default:null,type:cc.Sprite},ROUND_TIME:30},onLoad:function(){this.ValidCount=0,this.startBgNode=cc.find("Canvas/START_BG"),this.BG=cc.find("Canvas/BG"),this.Stop=cc.find("Canvas/BG/Stop"),this.timerBar=cc.find("Canvas/BG/LeftPanel/Player/Panel/Bar/BarFill"),this.gameManager=cc.find("Canvas/GameManager").getComponent("GameManager"),this.CardHolderBlock=cc.find("Canvas/BG/DownPanel/CardHolderBlock"),this.DeckNumLabel=cc.find("Canvas/BG/RightPanel/DrawButton/DeckNumLabel").getComponent(cc.Label),this.DeckNumBtn=cc.find("Canvas/BG/RightPanel/DrawButton").getComponent(cc.Button)},initSystem:function(){this.CardIsOKBool=!1,this.startBgNode.active=!1,this.BG.active=!0,this.deck=this.gameManager.currentDeck,this.numPlayers=this.gameManager.numPlayers,this.StartCardNum=this.gameManager.StartCardNum,this.MainPlayerOrder=this.gameManager.MainPlayerOrder,this.ROUND_TIME=this.gameManager.roundTime,this.playAreas=this.gameManager.playAreas,this.TepplayAreas=this.playAreas,this.correctPlayAreas=[],this.TemcardSlots=[]},InitGame:function(){var e=this;return c(o().mark(function t(){var r,a;return o().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.initSystem(),e.initPlayers(e.numPlayers),e.playerStatus=Array(e.numPlayers).fill("waitForPlayerAction"),r=0;case 4:if(!(r<e.numPlayers)){t.next=12;break}return t.next=7,e.drawInitialHand(r,e.StartCardNum);case 7:a=t.sent,e.updatePlayerHand(r,a);case 9:r++,t.next=4;break;case 12:e.cardUIManager.hand=e.playerHands[e.MainPlayerOrder].map(Number),e.StartGame();case 14:case"end":return t.stop()}},t)}))()},StartGame:function(){console.log("\u4e3b\u73a9\u5bb6\u624b\u724c\u66ab\u6642\u5b58\u53d6"+this.cardUIManager.hand),console.log("\u904a\u6232\u958b\u59cb"),this.displayPlayerHandOnUI(this.MainPlayerOrder),this.DeckNumLabel.string=""+this.deck.length,this.currentPlayerIndex=0,this.currentState="startRound"},onStateChanged:function(){switch(this.currentState){case"startRound":this.beginRound(),console.log("\u56de\u5408\u958b\u59cb");break;case"playerAction":this.waitForPlayerAction();break;case"endRound":this.endRound();break;case"endGame":this.endGame()}},beginRound:function(){this.correctPlayAreas=[],this.currentPlayerIndex==this.MainPlayerOrder?(this.DeckNumBtn.interactable=!0,this.CardHolderBlock.active=!1):(this.DeckNumBtn.interactable=!1,this.CardHolderBlock.active=!0),this.playerStatus[this.currentPlayerIndex]="startRound";var e=cc.find("Canvas/BG/LeftPanel/Player_"+this.currentPlayerIndex);e?(e.scale=1.2,this.timerBar=cc.find("Panel/Bar/BarFill",e).getComponent(cc.Sprite),this.timerBar.fillRange=1,this.countdown=this.ROUND_TIME,this.schedule(this.updateTimer,1)):console.error("\u627e\u4e0d\u5230\u73a9\u5bb6\u7bc0\u9ede: Player_"+this.currentPlayerIndex)},waitForPlayerAction:function(){},endRound:function(){var e=this;if(console.log("\u4e3b\u8981\u73a9\u5bb6\u662f\u5426\u6b63\u78ba\u51fa\u724c",this.ConfirmCorrectPlayAreas()),this.TepplayAreas.length!==this.correctPlayAreas.length||this.TepplayAreas.every(function(t,r){var a;return(null==t?void 0:t.toString())===(null==(a=e.correctPlayAreas[r])?void 0:a.toString())}),this.currentPlayerIndex==this.MainPlayerOrder&&(this.cardUIManager.Confirmbutton.active=!1,this.cardUIManager.DeckNumBtn.active=!0),this.ConfirmCorrectPlayAreas()){var t;(t=this.TempPlayAreas).push.apply(t,this.correctPlayAreas),this.cardUIManager.MainPlayerDrewBool=!1,this.cardUIManager.Confirmbutton.active=!1,this.cardUIManager.DeckNumBtn.active=!0}else{this.TepplayAreas.forEach(function(t){e.cardUIManager.setCardStatus(t,null,null)}),console.log("\u4e3b\u8981\u73a9\u5bb6\u662f\u5426\u6b63\u78ba\u51fa\u724c1",this.TepplayAreas);var r=this.TepplayAreas.filter(function(t){return!e.correctPlayAreas.includes(t)});r.length>0&&r.forEach(function(t){e.playerHands[e.MainPlayerOrder].push(t)}),console.log("\u4e3b\u8981\u73a9\u5bb6\u662f\u5426\u6b63\u78ba\u51fa\u724c2",this.cardUIManager.hand),this.updateUI(),this.currentPlayerIndex==this.MainPlayerOrder?(this.cardUIManager.Confirmbutton.active=!1,this.cardUIManager.DeckNumBtn.active=!0,this.cardUIManager.MainPlayerDrewBool?this.cardUIManager.MainPlayerDrewBool=!1:this.cardUIManager.OtherPlayerdrawCard(this.currentPlayerIndex)):(this.correctPlayAreas=this.TepplayAreas,this.cardUIManager.OtherPlayerdrawCard(this.currentPlayerIndex))}var a=cc.find("Canvas/BG/LeftPanel/Player_"+this.currentPlayerIndex);a?(a.scale=1,this.cardUIManager.Confirmbutton.active=!1,this.timerBar=cc.find("Panel/Bar/BarFill",a).getComponent(cc.Sprite),this.timerBar.fillRange=0,this.unschedule(this.updateTimer),this.currentPlayerIndex=(this.currentPlayerIndex+1)%this.numPlayers,this.currentState="startRound"):console.error("\u627e\u4e0d\u5230\u73a9\u5bb6\u8282\u70b9: Player_"+this.currentPlayerIndex)},updateTimer:function(){this.countdown--,this.timerBar.fillRange=this.countdown/this.ROUND_TIME,this.countdown<=0&&(this.unschedule(this.updateTimer),this.currentState="endRound")},updateUI:function(){for(var e=0;e<this.numPlayers;e++)this.updatePlayerHand(e,this.playerHands[e]);this.DeckNumLabel.string=""+this.deck.length},initPlayers:function(e){this.playerStatus=Array(e).fill("\u7b49\u5f85\u4e2d"),this.playerHands=Array.from({length:e},function(){return[]});var t=cc.find("Canvas/BG/LeftPanel"),r=cc.find("Canvas/BG/LeftPanel/Player");if(r){for(var a=0;a<this.numPlayers;a++){var n=cc.instantiate(r);n.name="Player_"+a,t.addChild(n)}r.active=!1}else console.error("\u73a9\u5bb6\u9884\u5236\u4f53\u4e0d\u5b58\u5728\u6216\u672a\u8bbe\u7f6e\u3002\u8bf7\u786e\u4fdd 'playerPrefab' \u5c5e\u6027\u5df2\u6b63\u786e\u8bbe\u7f6e\u3002")},drawInitialHand:function(e,t){var r=this;return c(o().mark(function a(){var n,i,s,c,l,u;return o().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:n=[],i=[].concat(r.deck),s=0;case 3:if(!(s<t)){a.next=16;break}if(!(i.length>0)){a.next=11;break}c=Math.floor(Math.random()*i.length),l=i.splice(c,1)[0],u=10*l.color+l.number,n.push(u),a.next=13;break;case 11:return console.error("\u724c\u7ec4\u5df2\u7ecf\u7528\u5b8c\uff0c\u65e0\u6cd5\u62bd\u53d6\u66f4\u591a\u724c\u3002"),a.abrupt("break",16);case 13:s++,a.next=3;break;case 16:return r.gameManager.shuffleDeck(i),r.deck=i,r.playerHands[e]=n,a.abrupt("return",n);case 20:case"end":return a.stop()}},a)}))()},updatePlayerHand:function(e,t){this.playerHands[e]=t;var r=cc.find("Canvas/BG/LeftPanel/Player_"+e);r?(cc.find("Panel/Card/CardNum",r).getComponent(cc.Label).string=""+t.length,this.DeckNumLabel.string=""+this.deck.length):console.error("\u627e\u4e0d\u5230\u73a9\u5bb6\u8282\u70b9: Player_"+e)},displayPlayerHandOnUI:function(e){this.cardUIManager?this.cardUIManager.CardReader(this.playerHands[e]):console.error("CardUIManager\u7ec4\u4ef6\u672a\u8bbe\u7f6e\u6216\u627e\u4e0d\u5230!")},addToPlayArea:function(e,t){if(null==e||!t)return console.error("\u65e0\u6548\u7684\u53c2\u6570"),!1;if(!this.isPlacementValid(e,t))return console.error("\u653e\u7f6e\u4e0d\u5408\u6cd5"),!1;for(;this.TepplayAreas.length<=e;)this.TepplayAreas.push(null);return this.TepplayAreas[e]||(this.TepplayAreas[e]=[]),this.TepplayAreas[e].push(t),!0},isPlacementValid:function(e,t){if(null==t)return console.error("\u932f\u8aa4: \u50b3\u5165\u7684\u5361\u7247\u4fe1\u606f\u7121\u6548\u3002"),!1;if(!this.TepplayAreas||e<0||e>=this.TepplayAreas.length)return console.error("\u932f\u8aa4: \u5617\u8a66\u8a2a\u554f\u7684\u5340\u57df\u7d22\u5f15\u7121\u6548\u6216 TepplayAreas \u672a\u521d\u59cb\u5316\u3002"),!1;var r=this.TepplayAreas[e]||[],a=e>0?this.TepplayAreas[e-1]:[],n=e<this.TepplayAreas.length-1?this.TepplayAreas[e+1]:[];return 0===r.length?50===t||a.includes(50)||n.includes(50)?(this.TepplayAreas[e]=[t],!0):!(!(a.length>0&&this.canMerge(a,[t]))&&!(n.length>0&&this.canMerge([t],n))&&(0===a.length&&0===n.length?(this.TepplayAreas[e]=[t],0):(console.error("\u653e\u7f6e\u5931\u6557: \u65b0\u724c\u8207 i-1 \u6216 i+1 \u4e0d\u80fd\u5f62\u6210\u6709\u6548\u7d44\u5408\u3002"),1))):this.canMerge(r,[t])?(this.TepplayAreas[e].push(t),!0):(console.error("\u653e\u7f6e\u5931\u6557: \u65b0\u724c\u8207\u7576\u524d\u4f4d\u7f6e\u7684\u724c\u4e0d\u80fd\u5f62\u6210\u6709\u6548\u7d44\u5408\u3002"),!1)},isValidCombination:function(e){var t=this.determineAreaType(e);if(!t)return!1;if("sequence"===t){for(var r=e.map(function(e){return e%10}).sort(function(e,t){return e-t}),a=1;a<r.length;a++)if(r[a]-r[a-1]!=1){if(!e.includes(50))return!1;if(r[a]-r[a-1]>2)return!1}return!0}if("sameNumber"===t){var n=new Set(e),i=e.map(function(e){return e%10}),o=new Set(i);return!(o.size>2||2===o.size&&!e.includes(50))&&n.size===e.length}return!1},canMerge:function(e,t){var r=[].concat(e,t),a=this.determineAreaType(r);return"sequence"===a?"sameNumber"!==this.determineAreaType(e)&&"sameNumber"!==this.determineAreaType(t)&&this.isValidCombination(r):"sameNumber"===a&&this.isValidCombination(r)},formsSequence:function(e){for(var t=[].concat(e).sort(function(e,t){return e-t}),r=1;r<t.length;r++)if(t[r]-t[r-1]!=1&&50!==t[r]&&50!==t[r-1])return!1;return!0},formsSameNumber:function(e){for(var t,r=e[0]%10,n=a(e);!(t=n()).done;){var i=t.value;if(i%10!==r&&50!==i)return!1}return!0},determineAreaType:function(e){if(e.length<2)return null;var t=e.map(function(e){return Math.floor(e/10)}),r=e.map(function(e){return e%10});return t.every(function(e){return e===t[0]})?"sequence":r.every(function(e){return e===r[0]})?"sameNumber":null},isCardCompatibleForSequence:function(e,t){var r=this.TepplayAreas[e-1],a=this.TepplayAreas[e+1],n=function(e){return Math.floor(e/10)===Math.floor(t/10)};return!(r&&!n(r)||a&&!n(a))},isColorUniqueInSet:function(e,t){var r=this.TepplayAreas[e]||[],a=Math.floor(t/10);return!r.map(function(e){return Math.floor(e/10)}).includes(a)},isCardCompatibleForSameNumber:function(e,t){var r=this.TepplayAreas[e]||[];if(r[0]%10!=t%10)return!1;var a=r.map(function(e){return Math.floor(e/10)}),n=Math.floor(t/10);return!a.includes(n)},isCardCompatible:function(e,t,r){var a=Math.floor(e/10),n=e%10,i=Math.floor(t/10),o=t%10;return null===r?a===i&&1===Math.abs(n-o)||n===o&&a!==i:!0===r?a===i&&1===Math.abs(n-o):n===o&&a!==i},removeFromPlayArea:function(e,t){var r=this.TepplayAreas[e];if(r){var a=r.indexOf(t);a>-1&&r.splice(a,1)}}}).isPlacementValid=function(e,t){var r=this.TepplayAreas[e]||[],a=e>0?this.TepplayAreas[e-1]:null,n=e<this.TepplayAreas.length-1?this.TepplayAreas[e+1]:null;if(0===r.length){if(a||n){var i=!1;return(50===t||a&&a.includes(50)||n&&n.includes(50))&&(i=!0),a&&!i&&(i=this.canMerge(a,[t])),n&&!i&&(i=this.canMerge([t],n)),!!i}return this.TepplayAreas[e]=[t],!0}return!!this.canMerge(r,[t])&&(this.TepplayAreas[e].push(t),!0)},r.fillCorrectPlayAreas=function(){for(var e=this,t=[],r=0;r<135;r++){var a=this.cardUIManager.getCardStatus(r),n=this.cardUIManager.getCardId(r);if(1==a)t.push(n);else if(t.length>=2){for(var i=function(r){var a=e.correctPlayAreas[r];if(t.some(function(e){return a.includes(e)}))return t.length>a.length&&(e.correctPlayAreas[r]=[].concat(t)),t=[],"break"},o=0;o<this.correctPlayAreas.length&&"break"!==i(o);o++);t.length>=2&&(this.correctPlayAreas.push([].concat(t)),t=[])}else t=[]}t.length>=2&&this.correctPlayAreas.push([].concat(t))},r.ConfirmCorrectPlayAreas=function(){if(!this.correctPlayAreas||0===this.correctPlayAreas.length)return!1;for(var e=0;e<this.correctPlayAreas.length;e++){var t=this.correctPlayAreas[e];if(!t||0===t.length||!this.isCardSequenceValid(t))return!1}return!0},r.isCardSequenceValid=function(e){if(!e||null===e||0===e.length)return!1;if(e.length<3)return!1;var t=-1!==e.indexOf(50);t&&(e=e.filter(function(e){return 50!==e}));var r=e.map(function(e){return Math.floor(e/10)}),n=e.map(function(e){return e%10});if(r.every(function(e){return e===r[0]})){n.sort(function(e,t){return e-t});for(var i,o=n[0],s=a(n);!(i=s()).done;){if(i.value!==o){if(!t)return!1;t=!1}o++}return!0}return!!n.every(function(e){return e===n[0]})&&new Set(r).size===r.length},r)),cc._RF.pop()},{}]},{},["CardData","CardUIManager","GameManager","RummyGameManager"]);