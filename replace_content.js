const fs = require('fs');

let t = fs.readFileSync('assets/App3D-f554a111_v2.js', 'utf8');
const original = t;

t = t.replace('manifesto:{title:"////// Manifesto",text:"Our mission is to build the next generation of consumer brands at the intersection of Community, AI, and crypto."}',
'manifesto:{title:"////// About Me",text:"Professional WordPress Developer, SEO Expert, Google Ads Specialist, and Social Media Marketer based in Jhansi, UP. Building digital empires since 2022."}');

t = t.replace('copyright:"// Copyright © 2026"', 'copyright:"// Copyright © 2025 Anshul Kushwaha"');

t = t.replace('rights:`Igloo, Inc.\\nAll Rights Reserved.`', 'rights:`Anshul Kushwaha\\nJhansi, UP.`');

t = t.replace('social:[{name:"X",link:"https://twitter.com/iglooinc"},{name:"LI",link:"https://www.linkedin.com/company/igloo-incorporated"}]',
'social:[{name:"IG",link:"https://www.instagram.com/_anshul.kushwaha"},{name:"LI",link:"https://www.linkedin.com/in/anshul-kushwaha-jhansi/"}]');

// Cube 1
t = t.replace('title:"PORTFOLIO_CO_01 Pudgy Penguins"', 'title:"PORTFOLIO_01 WordPress Dev"');
t = t.replace('hash:"pudgy-penguins"', 'hash:"wordpress-dev"');

const pudgyText = `Pudgy Penguins, a creative venture founded in 2021, quickly gained attention for its unique IP and engaging community. In 2022, the company was acquired by Igloo Inc., a strategic move aimed at expanding its reach and capabilities. The acquisition by Igloo Inc. was part of a broader vision to transform and reposition Pudgy Penguins as a next-generation entertainment company and the face of Web3 worldwide.\n\nWe believe in a future where intellectual property, digital collectibles, and communities are born and thrive on the blockchain. Since our acquisition, Pudgy Penguins has leveraged its onchain origins to create a new model for consumer brands, shifting from a brand-and-consumer approach to a brand-and-participant model. Our business strategy focuses on expanding a vast range of content mediums, products, and experiences, driving people onchain into the new era of the internet. By harnessing the power of our vibrant community and the rich and whimsical universe of Pudgy Penguins, we\'re revolutionizing the way IP is created and experienced.`;
const wordpressText = `A professional website is the foundation of every successful online business. Every site I build is modern, fast-loading, and mobile-friendly — designed to convert visitors into customers.\n\nCustom Dev, WooCommerce, Landing Pages, Speed Optimization, Security, Responsive, SEO-Friendly.`;
t = t.replace(pudgyText, wordpressText);

t = t.replace('social:[{name:"X",link:"https://x.com/pudgypenguins"},{name:"IG",link:"https://instagram.com/pudgypenguins"},{name:"LI",link:"https://www.linkedin.com/company/pudgy-penguins"},{name:"TK",link:"https://www.tiktok.com/@pudgypenguins"}]', 'social:[]');
t = t.replace('links:[{name:"website",link:"https://www.pudgypenguins.com"}]', 'links:[{name:"portfolio",link:"https://anshulkushwaha-jhansi.vercel.app/"}]');

// Cube 2
t = t.replace('title:"PORTFOLIO_CO_02 Overpass"', 'title:"PORTFOLIO_02 SEO Expert"');
t = t.replace('hash:"overpass"', 'hash:"seo-expert"');

const overpassText = `OverpassIP was established as a solution to a significant licensing challenge faced by Pudgy Penguins, marking its inception with a crucial breakthrough in NFT licensing. The company empowers NFT holders by allowing them to submit their digital assets for potential licensing opportunities, offering a platform where collections can significantly amplify their growth and engagement. By participating in OverpassIP, collections open up a realm of possibilities for their brands, bringing their holders along for the ride through expansive licensing avenues.\n\nMoreover, brands seeking to enhance their initiatives can access a curated pool of NFTs on OverpassIP, selecting the intellectual property that best aligns with their strategic goals. This innovative approach not only facilitates dynamic partnerships between NFT creators and brands but also pioneers new frontiers in the utilization of digital assets within the broader market.`;
const seoText = `I deploy advanced SEO strategies that help businesses rank higher and attract quality organic traffic without paying per click. Real, lasting results.\n\nKeyword Research, On-Page SEO, Technical SEO, Local SEO, Audit, Link Building, GSC.`;
t = t.replace(overpassText, seoText);

t = t.replace('social:[{name:"X",link:"https://twitter.com/OverpassIP"}]', 'social:[]');
t = t.replace('links:[{name:"website",link:"https://www.overpassip.com"}]', 'links:[{name:"portfolio",link:"https://anshulkushwaha-jhansi.vercel.app/"}]');

// Cube 3
t = t.replace('title:"PORTFOLIO_CO_03 Abstract"', 'title:"PORTFOLIO_03 Google Ads"');
t = t.replace('hash:"abstract"', 'hash:"google-ads"');

const abstractText = `Introducing Abstract, the blockchain for consumer crypto, pioneering culture, community, and creativity onchain. We believe that consumer crypto is the breakthrough opportunity to bring billions of people onchain and the final frontier for consumer crypto adoption. The dominant consumer crypto chain will be the single greatest distribution channel-bringing users, liquidity, partnerships, and community to crypto-native builders and global brands.\n\nThrough a combination of culture & community building, a brand-new economic mechanism, cutting-edge cryptography, and dedicated builder & brand support, Abstract allows those building for the masses to scale and flourish.`;
const adsText = `I create targeted campaigns that put your business in front of exactly the right audience at the right moment — maximizing ROI on every rupee spent.\n\nSearch Ads, Display Ads, YouTube Ads, Remarketing, Local Ads, Conversion Tracking.`;
t = t.replace(abstractText, adsText);

t = t.replace('social:[{name:"X",link:"https://x.com/abstractchain"},{name:"LI",link:"https://www.linkedin.com/company/abstract-foundation/about/"}]', 'social:[]');
t = t.replace('links:[{name:"website",link:"https://cubelabs.xyz"}]', 'links:[{name:"portfolio",link:"https://anshulkushwaha-jhansi.vercel.app/"}]');


// End footer links
t = t.replace('links:[{title:"LinkedIn",url:"https://www.linkedin.com/company/igloo-incorporated",vdb:"peachesbody_64",scale:1.2},{title:"X / Twitter",url:"https://www.twitter.com/iglooinc",vdb:"x_64",scale:1.3},{title:"Medium",url:"https://medium.com/@iglooinc",vdb:"medium_32",scale:1.25}]',
'links:[{title:"LinkedIn",url:"https://www.linkedin.com/in/anshul-kushwaha-jhansi/",vdb:"peachesbody_64",scale:1.2},{title:"Instagram",url:"https://www.instagram.com/_anshul.kushwaha",vdb:"x_64",scale:1.3}]');

if (t !== original) {
    fs.writeFileSync('assets/App3D-f554a111_v2.js', t, 'utf8');
    console.log("Success: Replaced strings in App3D");
} else {
    console.log("Error: No strings were replaced.");
}
