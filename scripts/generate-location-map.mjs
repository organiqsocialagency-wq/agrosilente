import { readFileSync, writeFileSync } from 'node:fs';

// Geographic roads and building footprints, drawn as a quiet, branded static map.
// Source: © OpenStreetMap contributors, ODbL 1.0 (see data/location-map.json).
const data = JSON.parse(readFileSync(new URL('./data/location-map.json', import.meta.url), 'utf8'));
const width = 880, height = 560;
const center = { lat: 40 + 45 / 60 + 42.1 / 3600, lon: 17 + 20 / 60 + 27.1 / 3600 };
const rad = Math.PI / 180;
const mercatorY = lat => Math.log(Math.tan(Math.PI / 4 + lat * rad / 2));
const projectedWidth = 620 / (6378137 * Math.cos(center.lat * rad));
const scale = width / projectedWidth;
const project = ({ lat, lon }) => [width / 2 + (lon - center.lon) * rad * scale, height / 2 - (mercatorY(lat) - mercatorY(center.lat)) * scale];
const path = geometry => geometry.map((p,i) => `${i ? 'L' : 'M'}${project(p).map(v=>v.toFixed(1)).join(' ')}`).join('');
const visible = feature => feature.geometry.some(p => { const [x,y]=project(p); return x>-250 && x<width+250 && y>-250 && y<height+250; });
const features = data.elements.filter(visible);
const areas = features.filter(e=>e.tags.landuse || e.tags.natural).map(e => {
  const fill = ['forest','orchard','grass','meadow'].includes(e.tags.landuse) || e.tags.natural==='wood' ? '#dce1ce' : e.tags.landuse==='residential' ? '#e9dfcf' : '#eee5d4';
  return `<path d="${path(e.geometry)}Z" fill="${fill}" opacity=".8"/>`;
}).join('');
const buildings = features.filter(e=>e.tags.building).map(e=>`<path d="${path(e.geometry)}Z" fill="#e1d3bf" stroke="#d5c5ae" stroke-width=".7"/>`).join('');
const roads = features.filter(e=>e.tags.highway && !['steps','footway','path'].includes(e.tags.highway));
const roadWidth = e => ['primary','secondary','tertiary'].includes(e.tags.highway) ? 10 : e.tags.highway==='track' ? 3 : e.tags.highway==='service' ? 4 : 6;
const strokes = (outline) => roads.map(e=>`<path d="${path(e.geometry)}" stroke="${outline ? '#d2d3cb' : '#fffaf0'}" stroke-width="${roadWidth(e)+(outline?2:0)}"/>`).join('');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="880" height="560" viewBox="0 0 880 560" role="img" aria-labelledby="title desc">
<title id="title">Trullo Natalino — Contrada Pentimone, Locorotondo</title>
<desc id="desc">Mappa con un segnaposto a forma di trullo sulla posizione 40°45′42.1″N 17°20′27.1″E. Cartografia © OpenStreetMap contributors, ODbL 1.0.</desc>
<defs><clipPath id="bounds"><rect width="880" height="560"/></clipPath><filter id="shadow" x="-60%" y="-50%" width="220%" height="210%"><feDropShadow dx="0" dy="5" stdDeviation="7" flood-color="#493323" flood-opacity=".2"/></filter></defs>
<g clip-path="url(#bounds)"><rect width="880" height="560" fill="#f3ecdf"/>${areas}${buildings}<g fill="none" stroke-linejoin="round" stroke-linecap="round">${strokes(true)}${strokes(false)}</g></g>
<g transform="translate(440 280)">
<circle r="36" fill="#bb6e4e" opacity=".1"/><circle r="19" fill="none" stroke="#bb6e4e" stroke-opacity=".28" stroke-width="1.5"/><circle r="5" fill="#a55837"/>
<g filter="url(#shadow)">
<path d="M-35-24V-65H-44L0-115 44-65H35V-24H12L0-2-12-24Z" fill="#fffaf2" stroke="#fffaf2" stroke-width="7" stroke-linejoin="round"/>
<path d="M-44-65 0-115 44-65Z" fill="#a55837"/>
<path d="M-27-84H27M-17-96H17M-36-73H36" fill="none" stroke="#f2d5bc" stroke-width="1.7" stroke-linecap="round"/>
<path d="M-5-112V-119M-8-119H8" fill="none" stroke="#704421" stroke-width="3" stroke-linecap="round"/><circle cx="0" cy="-124" r="4.5" fill="#704421"/>
<path d="M-7-24V-43a7 7 0 0 1 14 0v19Z" fill="#704421"/>
<rect x="-25" y="-51" width="8" height="10" rx="1" fill="#bb6e4e"/><rect x="17" y="-51" width="8" height="10" rx="1" fill="#bb6e4e"/>
</g>
<g transform="translate(0 36)"><rect x="-150" y="0" width="300" height="80" rx="15" fill="#fffaf2" fill-opacity=".95"/><text x="0" y="33" text-anchor="middle" fill="#493323" font-family="Georgia,serif" font-size="28">Trullo Natalino</text><text x="0" y="59" text-anchor="middle" fill="#876c54" font-family="Arial,sans-serif" font-size="16" letter-spacing="1.5">CONTRADA PENTIMONE</text></g>
</g>
<g fill="#8c8a7c" font-family="Arial,sans-serif" font-size="15"><text x="836" y="35" text-anchor="middle">N</text><path d="M836 46 830 65 836 60 842 65Z" fill="#8c8a7c"/></g>
</svg>`;
writeFileSync(new URL('../public/maps/trullo-natalino.svg', import.meta.url),svg);
console.log(`Mappa creata: ${roads.length} strade, posizione ${center.lat.toFixed(6)}, ${center.lon.toFixed(6)}`);
