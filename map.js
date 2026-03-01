// ─── Configuration ────────────────────────────────────────────────────────────
//
// Set up your Google Sheet:
//   1. Create a sheet with two columns: "Country" and "Category"
//   2. Fill rows like:  Ireland | together
//                       Spain   | ciaran
//                       France  | rachel
//   3. File > Share > Publish to web > choose your sheet > CSV > Publish
//   4. Copy the URL and paste it below
//
const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTS8uM73tNnHT7DKutGqoUzvrPNHXfpSv47vpMhfNnYMnYjf8UvJus6bEJqDtXm2PqRJwew33VOo6vi/pub?gid=0&single=true&output=csv";

// Fallback data shown when no Sheet URL is configured
const SAMPLE_DATA = [
  { country: "Ireland",        category: "together" },
  { country: "United Kingdom", category: "together" },
  { country: "France",         category: "together" },
  { country: "Spain",          category: "together" },
  { country: "Italy",          category: "together" },
  { country: "Portugal",       category: "together" },
  { country: "Germany",        category: "together" },
  { country: "Netherlands",    category: "together" },
  { country: "United States",  category: "ciaran"   },
  { country: "Canada",         category: "ciaran"   },
  { country: "Japan",          category: "rachel"   },
  { country: "Australia",      category: "rachel"   },
];

// ─── Country data  (ISO 3166-1 numeric ID → display name) ────────────────────

const COUNTRIES = [
  [4,   "Afghanistan"],
  [8,   "Albania"],
  [12,  "Algeria"],
  [20,  "Andorra"],
  [24,  "Angola"],
  [28,  "Antigua and Barbuda"],
  [32,  "Argentina"],
  [51,  "Armenia"],
  [36,  "Australia"],
  [40,  "Austria"],
  [31,  "Azerbaijan"],
  [44,  "Bahamas"],
  [48,  "Bahrain"],
  [50,  "Bangladesh"],
  [52,  "Barbados"],
  [112, "Belarus"],
  [56,  "Belgium"],
  [84,  "Belize"],
  [204, "Benin"],
  [64,  "Bhutan"],
  [68,  "Bolivia"],
  [70,  "Bosnia and Herzegovina"],
  [72,  "Botswana"],
  [76,  "Brazil"],
  [96,  "Brunei"],
  [100, "Bulgaria"],
  [854, "Burkina Faso"],
  [108, "Burundi"],
  [132, "Cape Verde"],
  [116, "Cambodia"],
  [120, "Cameroon"],
  [124, "Canada"],
  [140, "Central African Republic"],
  [148, "Chad"],
  [152, "Chile"],
  [156, "China"],
  [170, "Colombia"],
  [174, "Comoros"],
  [178, "Republic of the Congo"],
  [180, "Democratic Republic of the Congo"],
  [188, "Costa Rica"],
  [191, "Croatia"],
  [192, "Cuba"],
  [196, "Cyprus"],
  [203, "Czech Republic"],
  [208, "Denmark"],
  [262, "Djibouti"],
  [212, "Dominica"],
  [214, "Dominican Republic"],
  [218, "Ecuador"],
  [818, "Egypt"],
  [222, "El Salvador"],
  [226, "Equatorial Guinea"],
  [232, "Eritrea"],
  [233, "Estonia"],
  [748, "Eswatini"],
  [231, "Ethiopia"],
  [242, "Fiji"],
  [246, "Finland"],
  [250, "France"],
  [254, "French Guiana"],
  [266, "Gabon"],
  [270, "Gambia"],
  [268, "Georgia"],
  [276, "Germany"],
  [288, "Ghana"],
  [300, "Greece"],
  [308, "Grenada"],
  [320, "Guatemala"],
  [324, "Guinea"],
  [624, "Guinea-Bissau"],
  [328, "Guyana"],
  [332, "Haiti"],
  [340, "Honduras"],
  [348, "Hungary"],
  [352, "Iceland"],
  [356, "India"],
  [360, "Indonesia"],
  [364, "Iran"],
  [368, "Iraq"],
  [372, "Ireland"],
  [376, "Israel"],
  [380, "Italy"],
  [388, "Jamaica"],
  [392, "Japan"],
  [400, "Jordan"],
  [398, "Kazakhstan"],
  [404, "Kenya"],
  [296, "Kiribati"],
  [414, "Kuwait"],
  [417, "Kyrgyzstan"],
  [418, "Laos"],
  [428, "Latvia"],
  [422, "Lebanon"],
  [426, "Lesotho"],
  [430, "Liberia"],
  [434, "Libya"],
  [438, "Liechtenstein"],
  [440, "Lithuania"],
  [442, "Luxembourg"],
  [450, "Madagascar"],
  [454, "Malawi"],
  [458, "Malaysia"],
  [462, "Maldives"],
  [466, "Mali"],
  [470, "Malta"],
  [584, "Marshall Islands"],
  [478, "Mauritania"],
  [480, "Mauritius"],
  [484, "Mexico"],
  [583, "Micronesia"],
  [498, "Moldova"],
  [492, "Monaco"],
  [496, "Mongolia"],
  [499, "Montenegro"],
  [504, "Morocco"],
  [508, "Mozambique"],
  [104, "Myanmar"],
  [516, "Namibia"],
  [520, "Nauru"],
  [524, "Nepal"],
  [528, "Netherlands"],
  [554, "New Zealand"],
  [558, "Nicaragua"],
  [562, "Niger"],
  [566, "Nigeria"],
  [408, "North Korea"],
  [807, "North Macedonia"],
  [578, "Norway"],
  [512, "Oman"],
  [586, "Pakistan"],
  [585, "Palau"],
  [591, "Panama"],
  [598, "Papua New Guinea"],
  [600, "Paraguay"],
  [604, "Peru"],
  [608, "Philippines"],
  [616, "Poland"],
  [620, "Portugal"],
  [634, "Qatar"],
  [642, "Romania"],
  [643, "Russia"],
  [646, "Rwanda"],
  [882, "Samoa"],
  [674, "San Marino"],
  [678, "São Tomé and Príncipe"],
  [682, "Saudi Arabia"],
  [686, "Senegal"],
  [688, "Serbia"],
  [694, "Sierra Leone"],
  [702, "Singapore"],
  [703, "Slovakia"],
  [705, "Slovenia"],
  [90,  "Solomon Islands"],
  [706, "Somalia"],
  [710, "South Africa"],
  [410, "South Korea"],
  [728, "South Sudan"],
  [724, "Spain"],
  [144, "Sri Lanka"],
  [736, "Sudan"],
  [740, "Suriname"],
  [752, "Sweden"],
  [756, "Switzerland"],
  [760, "Syria"],
  [158, "Taiwan"],
  [762, "Tajikistan"],
  [834, "Tanzania"],
  [764, "Thailand"],
  [626, "Timor-Leste"],
  [768, "Togo"],
  [776, "Tonga"],
  [780, "Trinidad and Tobago"],
  [788, "Tunisia"],
  [792, "Turkey"],
  [795, "Turkmenistan"],
  [798, "Tuvalu"],
  [800, "Uganda"],
  [804, "Ukraine"],
  [784, "United Arab Emirates"],
  [826, "United Kingdom"],
  [840, "United States"],
  [858, "Uruguay"],
  [860, "Uzbekistan"],
  [548, "Vanuatu"],
  [336, "Vatican City"],
  [862, "Venezuela"],
  [704, "Vietnam"],
  [887, "Yemen"],
  [894, "Zambia"],
  [716, "Zimbabwe"],
];

// Build lookup tables from the COUNTRIES array
const ID_TO_NAME = {};
const NAME_TO_ID = {};

for (const [id, name] of COUNTRIES) {
  ID_TO_NAME[id] = name;
  NAME_TO_ID[name.toLowerCase()] = id;
}

// Common aliases people might type in the spreadsheet
const ALIASES = {
  "usa":                          840,
  "us":                           840,
  "united states of america":     840,
  "uk":                           826,
  "great britain":                826,
  "czechia":                      203,
  "türkiye":                      792,
  "turkiye":                      792,
  "south korea":                  410,
  "korea":                        410,
  "north korea":                  408,
  "drc":                          180,
  "dr congo":                     180,
  "congo (kinshasa)":             180,
  "congo (brazzaville)":          178,
  "cabo verde":                   132,
  "sao tome and principe":        678,
  "uae":                          784,
  "brunei darussalam":            96,
  "bolivia (plurinational state)":68,
  "iran (islamic republic of)":   364,
  "syria (arab republic)":        760,
  "eswatini":                     748,
  "swaziland":                    748,
  "north macedonia":              807,
  "macedonia":                    807,
  "timor leste":                  626,
  "east timor":                   626,
  "palestine":                    275,
  "palestinian territories":      275,
  "laos (lao pdr)":               418,
  "lao pdr":                      418,
  "vatican":                      336,
  "holy see":                     336,
  // UK constituent countries
  "england":                      826,
  "scotland":                     826,
  "wales":                        826,
  "northern ireland":             826,
  // Territories that may appear in the sheet
  "hong kong":                    344,
  "aruba":                        533,
  "curacao":                      531,
  "curaçao":                      531,
  "puerto rico":                  630,
  "bonaire":                      535,
};

for (const [alias, id] of Object.entries(ALIASES)) {
  NAME_TO_ID[alias] = id;
}

// ─── Color map ────────────────────────────────────────────────────────────────

const COLORS = {
  together: "#fbbf24",
  ciaran:   "#38bdf8",
  rachel:   "#f472b6",
  land:     "#1e3558",
  sphere:   "#0d2035",
  border:   "#0d1f38",
  graticule:"rgba(255,255,255,0.04)",
};

// ─── State ────────────────────────────────────────────────────────────────────

let visitedMap = new Map(); // numericId (number) → category string

// ─── Category normalisation ───────────────────────────────────────────────────
// Maps whatever labels are used in the sheet to "together" | "ciaran" | "rachel"

const CATEGORY_MAP = {
  "together":      "together",
  "both":          "together",
  "both visited":  "together",
  "ciaran":        "ciaran",
  "ciarán":        "ciaran",
  "ciaran alone":  "ciaran",
  "ciarán alone":  "ciaran",
  "rachel":        "rachel",
  "rachel alone":  "rachel",
};

function normalizeCategory(raw) {
  return CATEGORY_MAP[raw.toLowerCase().trim()] ?? null;
}

// ─── CSV parsing ──────────────────────────────────────────────────────────────

function parseCSVLine(line) {
  const result = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { field += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (ch === "," && !inQuotes) {
      result.push(field);
      field = "";
    } else {
      field += ch;
    }
  }
  result.push(field);
  return result;
}

function parseCSV(text) {
  text = text.replace(/^\uFEFF/, ""); // strip BOM
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  const header = parseCSVLine(lines[0]).map(h => h.trim().toLowerCase());
  const ci = header.indexOf("country");
  const ca = header.indexOf("category");

  if (ci === -1 || ca === -1) {
    console.error("Sheet must have 'Country' and 'Category' columns.");
    return [];
  }

  return lines.slice(1)
    .filter(l => l.trim())
    .map(l => {
      const cols = parseCSVLine(l);
      const raw = (cols[ca] || "").trim();
      const category = normalizeCategory(raw);
      if (raw && !category) {
        console.warn(`Unrecognised category: "${raw}" for "${cols[ci]}" — expected: Both Visited, Ciarán alone, Rachel alone`);
      }
      return { country: (cols[ci] || "").trim(), category };
    })
    .filter(r => r.country && r.category);
}

// ─── Data fetching ────────────────────────────────────────────────────────────

async function fetchWorld() {
  const res = await fetch(
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
  );
  return res.json();
}

async function fetchCountries() {
  if (SHEET_CSV_URL === "YOUR_GOOGLE_SHEET_CSV_URL_HERE") {
    console.info("Using sample data. Set SHEET_CSV_URL in map.js to load your sheet.");
    return SAMPLE_DATA;
  }
  try {
    const res = await fetch(SHEET_CSV_URL);
    const text = await res.text();
    // If Google returns HTML (e.g. login page), fall back
    if (text.trimStart().startsWith("<")) throw new Error("Got HTML instead of CSV");
    return parseCSV(text);
  } catch (e) {
    console.warn("Could not load Google Sheet, using sample data:", e.message);
    return SAMPLE_DATA;
  }
}

// ─── Map rendering ────────────────────────────────────────────────────────────

function renderMap(world, rows) {
  // Build visitedMap and warn on unknowns
  for (const { country, category } of rows) {
    const id = NAME_TO_ID[country.toLowerCase().trim()];
    if (id !== undefined) {
      visitedMap.set(id, category);
    } else {
      console.warn(`Unrecognised country: "${country}" — check spelling or add an alias in map.js`);
    }
  }

  // Stats
  const counts = { together: 0, ciaran: 0, rachel: 0 };
  for (const cat of visitedMap.values()) {
    if (cat in counts) counts[cat]++;
  }
  document.getElementById("n-together").textContent = counts.together;
  document.getElementById("n-ciaran").textContent   = counts.ciaran;
  document.getElementById("n-rachel").textContent   = counts.rachel;

  // SVG setup — fixed viewBox, CSS handles scaling
  const W = 960, H = 540;

  const svg = d3.select("#map")
    .attr("viewBox", `0 0 ${W} ${H}`)
    .attr("preserveAspectRatio", "xMidYMid meet");

  const projection = d3.geoNaturalEarth1()
    .scale(153)
    .translate([W / 2, H / 2]);

  const path = d3.geoPath().projection(projection);

  // Ocean sphere background
  svg.append("path")
    .datum({ type: "Sphere" })
    .attr("d", path)
    .attr("fill", COLORS.sphere);

  // Graticule
  svg.append("path")
    .datum(d3.geoGraticule()())
    .attr("d", path)
    .attr("fill", "none")
    .attr("stroke", COLORS.graticule)
    .attr("stroke-width", 0.5);

  // Countries group (zoom target)
  const g = svg.append("g");

  const countries = topojson.feature(world, world.objects.countries);

  // France (250) is a MultiPolygon that bundles French Guiana, Guadeloupe, etc.
  // Split each sub-polygon out and resolve its real ID by checking the centroid.
  // A sub-polygon whose centroid is in South America is assigned ID 254 (French Guiana).
  const OVERSEAS_SPLITS = {
    250: coords => {                         // France
      const [lon, lat] = d3.geoCentroid({ type: "Feature", geometry: { type: "Polygon", coordinates: coords } });
      return (lon < -30 && lat < 15) ? 254 : 250;  // South America → French Guiana
    },
  };

  const features = [];
  for (const feature of countries.features) {
    const baseId = +feature.id;
    const splitter = OVERSEAS_SPLITS[baseId];
    if (splitter && feature.geometry?.type === "MultiPolygon") {
      for (const coords of feature.geometry.coordinates) {
        features.push({
          type: "Feature",
          geometry: { type: "Polygon", coordinates: coords },
          properties: feature.properties,
          _id: splitter(coords),
        });
      }
    } else {
      feature._id = baseId;
      features.push(feature);
    }
  }

  const tooltip = document.getElementById("tooltip");

  g.selectAll(".country")
    .data(features)
    .join("path")
    .attr("class", "country")
    .attr("d", path)
    .attr("fill", d => {
      const cat = visitedMap.get(d._id);
      return cat ? COLORS[cat] : COLORS.land;
    })
    .attr("stroke", COLORS.border)
    .attr("stroke-width", 0.4)
    .on("mousemove", function (event, d) {
      const numId = d._id;
      const name  = ID_TO_NAME[numId] || null;
      const cat   = visitedMap.get(numId) || null;

      if (!name) { tooltip.classList.remove("visible"); return; }

      const catLabel = cat === "together" ? "Together"
                     : cat === "ciaran"   ? "Ciarán"
                     : cat === "rachel"   ? "Rachel"
                     : null;

      tooltip.innerHTML =
        `<div class="tt-name">${name}</div>` +
        (catLabel
          ? `<div class="tt-cat ${cat}">${catLabel}</div>`
          : `<div class="tt-cat none">not yet visited</div>`);

      tooltip.classList.add("visible");

      // Position: keep tooltip on screen
      const TW = tooltip.offsetWidth + 16;
      const TH = tooltip.offsetHeight + 16;
      const x  = event.clientX + 14;
      const y  = event.clientY - 10;
      tooltip.style.left = (x + TW > window.innerWidth  ? event.clientX - TW : x) + "px";
      tooltip.style.top  = (y + TH > window.innerHeight ? event.clientY - TH : y) + "px";
    })
    .on("mouseleave", () => tooltip.classList.remove("visible"));

  // Sphere border on top
  svg.append("path")
    .datum({ type: "Sphere" })
    .attr("d", path)
    .attr("fill", "none")
    .attr("stroke", "rgba(255,255,255,0.08)")
    .attr("stroke-width", 0.8);

  // Zoom & pan
  const zoom = d3.zoom()
    .scaleExtent([1, 8])
    .on("zoom", event => g.attr("transform", event.transform));

  svg.call(zoom);

  // Double-click to reset
  svg.on("dblclick.zoom", () =>
    svg.transition().duration(500).call(zoom.transform, d3.zoomIdentity)
  );
}

// ─── Init ─────────────────────────────────────────────────────────────────────

async function init() {
  const [world, rows] = await Promise.all([fetchWorld(), fetchCountries()]);
  renderMap(world, rows);
}

init().catch(console.error);
