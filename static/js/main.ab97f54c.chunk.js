(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{153:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(12),i=n.n(o),c=(n(82),n(18)),s=n(19),l=n(21),u=n(20),h=n(22),m=n(69),g=n.n(m),p=n(14),d=n.n(p),b=n(156),v=n(76),f=n(63),E=function(e){function t(e){var n;Object(c.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).handleChange=function(e){var t=n.props.onUpdate;n.setState({selectedOption:e}),t({selectedOption:e})};var a=n.props.login;return n.state={selectedOption:{value:a,label:a},options:[]},n}return Object(h.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("https://kalitamih.github.io/rss-mentor-dashboard/result.json").then(function(e){return e.json()}).then(function(e){return f.map(e,function(e,t){return Object.assign({value:t,label:t})})}).then(function(t){return e.setState({options:t})})}},{key:"render",value:function(){var e=this.state.selectedOption,t=this.state.options;return r.a.createElement("div",null,r.a.createElement(v.a,{value:e,onChange:this.handleChange,options:t}))}}]),t}(a.Component),k=(n(68),n(63)),I={"in progress":"yellow",checking:"red",checked:"DarkRed",todo:"grey"},y=function(e){function t(e){var n;Object(c.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).getGithubName=function(){var e=n.props.login;fetch("https://api.github.com/user/".concat(e)).then(function(e){return e.json()}).then(function(e){return n.setState({githubLogin:e.login.toLowerCase()}),n.getDataFromServer(),e.login}).then(function(e){return localStorage.setItem("mentor",e.toLowerCase())})},n.getDataFromServer=function(){var e=n.state.githubLogin,t=localStorage.getItem("login")?localStorage.getItem("mentor"):e;fetch("https://kalitamih.github.io/rss-mentor-dashboard/result.json").then(function(e){return e.json()}).then(function(e){return e[t]}).then(function(e){return k.map(e,function(e,t){var n=parseInt(e.cv,10)||0===parseInt(e.cv,10)?"green":I[e.cv],a=parseInt(e.corejs,10)||0===parseInt(e.corejs,10)?"green":I[e.corejs],o=parseInt(e.markup,10)||0===parseInt(e.markup,10)?"green":I[e.markup],i=parseInt(e.activist,10)||0===parseInt(e.activist,10)?"green":I[e.activist],c=parseInt(e.youtube,10)||0===parseInt(e.youtube,10)?"green":I[e.youtube],s=parseInt(e.scoreboard,10)||0===parseInt(e.scoreboard,10)?"green":I[e.scoreboard],l=parseInt(e.game,10)||0===parseInt(e.game,10)?"green":I[e.game],u=parseInt(e["course work"],10)||0===parseInt(e["course work"],10)?"green":I[e["course work"]],h=parseInt(e.presentation,10)||0===parseInt(e.presentation,10)?"green":I[e.presentation];return r.a.createElement("tr",{key:t},r.a.createElement("td",null,t),r.a.createElement("td",{style:{background:n}},e.cv),r.a.createElement("td",{style:{background:a}},e.corejs),r.a.createElement("td",{style:{background:o}},e.markup),r.a.createElement("td",{style:{background:i}},e.activist),r.a.createElement("td",{style:{background:c}},e.youtube),r.a.createElement("td",{style:{background:s}},e.scoreboard),r.a.createElement("td",{style:{background:l}},e.game),r.a.createElement("td",{style:{background:u}},e["course work"]),r.a.createElement("td",{style:{background:h}},e.presentation))})}).then(function(e){return n.setState({options:e})}).then(localStorage.setItem("login","success"))},n.handleChange=function(e){localStorage.setItem("mentor",e.selectedOption.value),n.getDataFromServer()},n.state={options:[],githubLogin:""};return window.performance&&1===performance.navigation.type&&localStorage.removeItem("login"),n}return Object(h.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.getGithubName()}},{key:"render",value:function(){var e=this.state.options,t=this.state.githubLogin;return r.a.createElement("div",null,t&&localStorage.getItem("login")?r.a.createElement("div",null,r.a.createElement(E,{onUpdate:this.handleChange,login:t}),r.a.createElement(b.a,null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null),r.a.createElement("th",null,"CV"),r.a.createElement("th",null,"CoreJS"),r.a.createElement("th",null,"Markup"),r.a.createElement("th",null,"Activist"),r.a.createElement("th",null,"Youtube"),r.a.createElement("th",null,"Scoreboard"),r.a.createElement("th",null,"Game"),r.a.createElement("th",null,"Course work"),r.a.createElement("th",null,"Presentation"))),r.a.createElement("tbody",null,e))):r.a.createElement("p",{className:"loading"},"Loading"))}}]),t}(a.Component);d.a.initializeApp({apiKey:"AIzaSyBJEDmqx_T5oLr4zyIkLN_hdT7BswaDrjQ",authDomain:"rss-mentor-dashboard-c9bf6.firebaseapp.com"});var O=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={isSignedIn:!1},n.uiConfig={signInFlow:"popup",signInOptions:[d.a.auth.GithubAuthProvider.PROVIDER_ID],callbacks:{signInSuccess:function(){return!1}}},n.componentDidMount=function(){d.a.auth().onAuthStateChanged(function(e){n.setState({isSignedIn:!!e})})},n.singOut=function(){d.a.auth().signOut(),localStorage.removeItem("login")},n}return Object(h.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this,t=this.state.isSignedIn;return r.a.createElement("div",{className:"App"},t?r.a.createElement("div",null,r.a.createElement(y,{login:d.a.auth().currentUser.providerData[0].uid}),r.a.createElement("button",{type:"submit",onClick:function(){return e.singOut()},className:"buttonSignOut"},"Sign out!")):r.a.createElement(g.a,{uiConfig:this.uiConfig,firebaseAuth:d.a.auth()}))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(O,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},68:function(e,t,n){},77:function(e,t,n){e.exports=n(153)},82:function(e,t,n){}},[[77,2,1]]]);
//# sourceMappingURL=main.ab97f54c.chunk.js.map