(this.webpackJsonpsocialcybersecurity=this.webpackJsonpsocialcybersecurity||[]).push([[0],{22:function(e,t,a){e.exports=a(32)},32:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(15),c=a.n(l),s=a(5),o=a(6),u=a(8),i=a(7),m=function(e){Object(u.a)(a,e);var t=Object(i.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"Home"},r.a.createElement("header",{className:"home-header"},r.a.createElement("h1",null,"welcome to social cybersecurity!")))}}]),a}(r.a.Component),h=function(e){Object(u.a)(a,e);var t=Object(i.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).handleNewUserChange=function(e){n.setState({newUser:e.target.value})},n.handleRemoveUserChange=function(e){var t=e.target;if(t.checked)n.state.removedUsers.push(t.name);else for(var a=0;a<n.state.removedUsers.length;a++)n.state.removedUsers[a]==t.name&&n.state.removedUsers.splice(a,1)},n.handleNewUserSubmit=function(e){fetch("".concat(localStorage.getItem("ip"),"/admin_page"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({form:"newUser",newUser:n.state.newUser})}).then((function(e){return e.json()})).then((function(e){console.log("Success:",e)})).catch((function(e){console.error("Error:",e)}))},n.handleRemoveUserSubmit=function(e){fetch("".concat(localStorage.getItem("ip"),"/admin_page"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({form:"removeUsers",removedUsers:n.state.removedUsers})}).then((function(e){return e.json()})).then((function(e){console.log("Success:",e)})).catch((function(e){console.error("Error:",e)}))},n.state={users:[],newUser:"",removedUsers:[]},n}return Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=this;fetch("".concat(localStorage.getItem("ip"),"/admin_page")).then((function(e){return e.json()})).then((function(t){return e.setState({users:t.users.map((function(e){return{name:e,isChecked:!1}}))})}))}},{key:"render",value:function(){var e=this,t=this.state.users.map((function(t){return r.a.createElement(r.a.Fragment,null,r.a.createElement("input",{name:t.name,id:t.name,type:"checkbox",onChange:e.handleRemoveUserChange}),r.a.createElement("label",{for:t.name}," ",t.name," ")," ",r.a.createElement("br",null))}));return r.a.createElement("div",{className:"Admin"},r.a.createElement("header",{className:"admin-header"},r.a.createElement("h3",null,"this is the admin only page!"),r.a.createElement("h4",null,"---register a new user---"),r.a.createElement("form",{onSubmit:this.handleNewUserSubmit},r.a.createElement("label",null,"enter username of new user:"),r.a.createElement("br",null),r.a.createElement("input",{name:"new",type:"text",value:this.state.newUser,onChange:this.handleNewUserChange}),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("input",{type:"submit",value:"Register"})),r.a.createElement("h4",null,"---remove users---"),r.a.createElement("form",{onSubmit:this.handleRemoveUserSubmit},r.a.createElement("p",null,"current users:"),t,r.a.createElement("br",null),r.a.createElement("input",{type:"submit",value:"Remove"}))))}}]),a}(r.a.Component),d=a(13),b=a(16),p=a(1),E=function(e){Object(u.a)(a,e);var t=Object(i.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).handleCheckChange=function(e){var t=e.target,a=Object(b.a)(Object(b.a)({},n.state.mcChoices),{},Object(d.a)({},t.name,t.checked));n.setState({mcChoices:a})},n.handleTextChange=function(e){n.setState({shortResponse:e.target.value})},n.handleSubmit=function(e){fetch("".concat(localStorage.getItem("ip"),"/login_data"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n.state)}).then((function(e){return e.json()})).then((function(e){console.log("Success:",e)})).catch((function(e){console.error("Error:",e)})),n.setState({submitted:!0})},n.state={name:"",mcQuestion:"",mcChoices:{},shortQuestion:"",shortResponse:"",submitted:!1},n}return Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=this;fetch("".concat(localStorage.getItem("ip"),"/login_data")).then((function(e){return e.json()})).then((function(t){return e.setState({name:t.name,mcQuestion:t.mcQuestion,mcChoices:t.mcChoices,shortQuestion:t.shortQuestion})}))}},{key:"render",value:function(){var e=this;if(this.state.submitted)return r.a.createElement(p.a,{to:"/socialcybersecurity/result"});var t=Object.keys(this.state.mcChoices).map((function(t){return r.a.createElement(r.a.Fragment,null,r.a.createElement("input",{name:t,id:t,type:"checkbox",onChange:e.handleCheckChange}),r.a.createElement("label",{for:t}," ",t," ")," ",r.a.createElement("br",null))}));return r.a.createElement("div",{className:"Login"},r.a.createElement("header",{className:"login-header"},r.a.createElement("h3",null,"hello, ",this.state.name,"!"),r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("p",null,this.state.mcQuestion),t,r.a.createElement("br",null),r.a.createElement("label",null,this.state.shortQuestion),r.a.createElement("br",null),r.a.createElement("input",{name:"short",type:"text",value:this.state.shortResponse,onChange:this.handleTextChange}),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("input",{type:"submit",value:"Submit"}))))}}]),a}(r.a.Component),f=function(e){Object(u.a)(a,e);var t=Object(i.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).handleAgendaChange=function(e){n.setState({agenda:e.target.value.split("\n")})},n.handleAttendanceChange=function(e){for(var t=e.target,a=t.name.slice(0,-4),r=0;r<n.state.users.length;r++)if(n.state.users[r].name==a){var l=n.state.users[r];n.state.users.splice(r,1),t.checked?l.attendance=!0:l.attendance=!1,n.state.users.splice(r,0,l)}},n.handleUpdatesChange=function(e){for(var t=e.target,a=t.name.slice(0,-8),r=t.value.split("\n"),l=0;l<n.state.users.length;l++)if(n.state.users[l].name==a){var c=n.state.users[l];n.state.users.splice(l,1),c.updates=r,n.state.users.splice(l,0,c)}},n.handleTodoChange=function(e){for(var t=e.target,a=t.name.slice(0,-5),r=t.value.split("\n"),l=0;l<n.state.users.length;l++)if(n.state.users[l].name==a){var c=n.state.users[l];n.state.users.splice(l,1),c.todo=r,n.state.users.splice(l,0,c)}},n.handleSubmit=function(e){fetch("".concat(localStorage.getItem("ip"),"/notes"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n.state)}).then((function(e){return e.json()})).then((function(e){console.log("Success:",e)})).catch((function(e){console.error("Error:",e)})),n.setState({submitted:!0})},n.state={users:[],agenda:[],submitted:!1},n}return Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=this;fetch("".concat(localStorage.getItem("ip"),"/notes")).then((function(e){return e.json()})).then((function(t){return e.setState({users:t.users.map((function(e){return{name:e,attendance:!1,updates:[],todo:[]}}))})}))}},{key:"render",value:function(){var e=this,t=this.state.users.map((function(t){return r.a.createElement(r.a.Fragment,null,r.a.createElement("input",{name:t.name+"-att",id:t.name+"-att",type:"checkbox",onChange:e.handleAttendanceChange}),r.a.createElement("label",{for:t.name+"-att"}," ",t.name," ")," ",r.a.createElement("br",null))})),a=this.state.users.map((function(t){return r.a.createElement(r.a.Fragment,null,r.a.createElement("label",{for:t.name+"-updates"}," ",t.name," updates: ")," ",r.a.createElement("br",null),r.a.createElement("textarea",{name:t.name+"-updates",id:t.name+"-updates",onChange:e.handleUpdatesChange}),r.a.createElement("br",null))})),n=this.state.users.map((function(t){return r.a.createElement(r.a.Fragment,null,r.a.createElement("label",{for:t.name+"-todo"}," ",t.name," to-do: ")," ",r.a.createElement("br",null),r.a.createElement("textarea",{name:t.name+"-todo",id:t.name+"-todo",onChange:e.handleTodoChange}),r.a.createElement("br",null))}));return r.a.createElement("div",{className:"Update"},r.a.createElement("header",{className:"update-header"},r.a.createElement("h3",null,"update meeting notes"),r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("h4",null,"Attendance"),t,r.a.createElement("br",null),r.a.createElement("label",{for:"agenda"},"Agenda:"),r.a.createElement("br",null),r.a.createElement("textarea",{name:"agenda",id:"agenda",onChange:this.handleAgendaChange}),r.a.createElement("br",null),r.a.createElement("h4",null,"Updates"),a,r.a.createElement("br",null),r.a.createElement("h4",null,"To-do"),n,r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("input",{type:"submit",value:"Submit"}))))}}]),a}(r.a.Component),g=function(e){Object(u.a)(a,e);var t=Object(i.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).state={msg:"error: no message"},n}return Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=this;fetch("".concat(localStorage.getItem("ip"),"/result")).then((function(e){return e.json()})).then((function(t){return e.setState({msg:t.msg})}))}},{key:"render",value:function(){return r.a.createElement("div",{className:"Result"},r.a.createElement("header",{className:"result-header"},r.a.createElement("h1",null,this.state.msg)))}}]),a}(r.a.Component),v=a(11),y=function(e){Object(u.a)(a,e);var t=Object(i.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return r.a.createElement(v.a,null,r.a.createElement("div",null,r.a.createElement("nav",null,r.a.createElement("h3",null,r.a.createElement("a",{href:"/"},"Home")),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(v.b,{to:"/socialcybersecurity"},"Social Cybersecurity Home")),r.a.createElement("li",null,r.a.createElement(v.b,{to:"/socialcybersecurity/admin"},"Admin Only")),r.a.createElement("li",null,r.a.createElement(v.b,{to:"/socialcybersecurity/login"},"Login")),r.a.createElement("li",null,r.a.createElement(v.b,{to:"/socialcybersecurity/update"},"Update Notes")))),r.a.createElement(p.d,null,r.a.createElement(p.b,{path:"/socialcybersecurity/admin"},r.a.createElement(h,null)),r.a.createElement(p.b,{path:"/socialcybersecurity/login"},r.a.createElement(E,null)),r.a.createElement(p.b,{path:"/socialcybersecurity/update"},r.a.createElement(f,null)),r.a.createElement(p.b,{path:"/socialcybersecurity/result"},r.a.createElement(g,null)),r.a.createElement(p.b,{path:"/socialcybersecurity"},r.a.createElement(m,null)))))}}]),a}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));localStorage.setItem("ip","http://35.221.40.171:8080"),c.a.render(r.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[22,1,2]]]);
//# sourceMappingURL=main.34f67b3e.chunk.js.map