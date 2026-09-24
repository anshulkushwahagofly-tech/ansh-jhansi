const fs = require('fs');
let t = fs.readFileSync('assets/App3D-f554a111_v2.js', 'utf8');

// The original code has: this.mesh=new Ce(e,new fe({uniforms:{tMap:{value:le.load("ui/logo-datatexture.ktx2","datatexture")},...
// We will replace `this.mesh=new Ce(e,new fe({uniforms:` with `this.mesh=new Ce(e,new fe({uniforms:`; this.mesh.visible=false; 
// Wait, no. We can just add this.mesh.visible=!1 right after this.mesh=new Ce(...)
// Let's match the class constructor / init.

t = t.replace('this.mesh=new Ce(e,new fe({uniforms:{tMap:{value:le.load("ui/logo-datatexture.ktx2","datatexture")}', 
'this.mesh=new Ce(e,new fe({uniforms:{tMap:{value:le.load("ui/logo-datatexture.ktx2","datatexture")}');

// It's safer to just inject `this.mesh.visible=!1;` after the statement, but since it's a huge minified statement, let's just do:
t = t.replace('uShow:{value:q.devScene?1:0}', 'uShow:{value:0}');

fs.writeFileSync('assets/App3D-f554a111_v2.js', t, 'utf8');
console.log("Replaced uShow to 0");
