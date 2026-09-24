const fs = require('fs');

let t = fs.readFileSync('assets/App3D-f554a111_v2.js', 'utf8');

// 1. Change all links to peachesbody_64 with scale 1.4
const oldLinks = 'links:[{title:"LinkedIn",url:"https://www.linkedin.com/in/anshul-kushwaha-jhansi/",vdb:"medium_32",scale:1.3},{title:"Instagram",url:"https://www.instagram.com/_anshul.kushwaha1/",vdb:"i_64",scale:1.3},{title:"Snapchat",url:"https://www.snapchat.com/add/mr_anshuu2005?share_id=zPHrntYGMrM&locale=en-US",vdb:"s_64",scale:1.3},{title:"Facebook",url:"https://www.facebook.com/share/1FXTPp9ZpB/",vdb:"f_64",scale:1.3}]';
const newLinks = 'links:[{title:"LinkedIn",url:"https://www.linkedin.com/in/anshul-kushwaha-jhansi/",vdb:"peachesbody_64",scale:1.3},{title:"Instagram",url:"https://www.instagram.com/_anshul.kushwaha1/",vdb:"peachesbody_64",scale:1.3},{title:"Snapchat",url:"https://www.snapchat.com/add/mr_anshuu2005?share_id=zPHrntYGMrM&locale=en-US",vdb:"peachesbody_64",scale:1.3},{title:"Facebook",url:"https://www.facebook.com/share/1FXTPp9ZpB/",vdb:"peachesbody_64",scale:1.3}]';
t = t.replace(oldLinks, newLinks);

// 2. Add mesh to the hook
const oldHook = 'window.updateOverlay&&window.updateOverlay(this.parent.currentLink),';
const newHook = 'window.updateOverlay&&window.updateOverlay(this.parent.currentLink,this.parent.mesh),';
t = t.replace(oldHook, newHook);

fs.writeFileSync('assets/App3D-f554a111_v2.js', t, 'utf8');
console.log("Updated App3D for colors and penguins");
