import fs from "fs";
import path from "path";

const root = path.join(process.cwd(), "content");

function w(dir, file, obj) {
  const d = path.join(root, dir);
  fs.mkdirSync(d, { recursive: true });
  fs.writeFileSync(path.join(d, `${file}.json`), JSON.stringify(obj, null, 2));
}

const episodes = [
  {
    id: "bb-pilot",
    slug: "bb-pilot",
    title: "Pilot",
    code: "S01E01",
    season: 1,
    episodeNumber: 1,
    runtime: 58,
    director: "Vince Gilligan",
    writer: "Vince Gilligan",
    imdbRating: 8.2,
    synopsis:
      "Diagnosed with cancer, Walter White partners with former student Jesse Pinkman to cook meth.",
    series: ["breaking-bad"],
    characterIds: ["walter-white", "jesse-pinkman", "skyler-white", "hank-schrader"],
    locationIds: ["desert-spot"],
    quoteIds: [],
    timelineYear: 2008,
    relatedIds: ["walter-white", "jesse-pinkman", "rv", "krazy-8"],
    sceneTimeline: [
      { timestamp: "00:00", label: "Birthday breakfast" },
      { timestamp: "15:00", label: "Cancer diagnosis" },
      { timestamp: "35:00", label: "Desert cook" },
      { timestamp: "50:00", label: "RV crash" },
    ],
    addedAt: "2026-07-14",
  },
  {
    id: "ozymandias",
    slug: "ozymandias",
    title: "Ozymandias",
    code: "S05E14",
    season: 5,
    episodeNumber: 14,
    runtime: 47,
    director: "Rian Johnson",
    writer: "Vince Gilligan",
    imdbRating: 10,
    synopsis:
      "Hank discovers Walt is Heisenberg. Everything collapses in the desert.",
    series: ["breaking-bad"],
    characterIds: [
      "walter-white",
      "jesse-pinkman",
      "hank-schrader",
      "jack-welker",
      "marie-schrader",
    ],
    deathIds: ["death-hank-schrader", "death-steve-gomez"],
    locationIds: ["desert-spot"],
    quoteIds: ["quote-i-am-the-one-who-knocks"],
    objectIds: ["pink-teddy-bear"],
    timelineYear: 2010,
    references: ["Shelley poem Ozymandias"],
    callbacks: ["To'hajiilee shootout setup"],
    foreshadowing: ["Walt buried money"],
    continuity: ["Hank finally catches Heisenberg"],
    behindTheScenes: ["Rian Johnson directed this acclaimed episode"],
    bestScenes: ["Hank arrest", "Hank death", "Holly kidnapping"],
    sceneTimeline: [
      { timestamp: "00:00", label: "Train robbery aftermath" },
      { timestamp: "12:00", label: "Desert confrontation" },
      { timestamp: "25:00", label: "Hank dies" },
      { timestamp: "35:00", label: "Family fight" },
      { timestamp: "42:00", label: "Kidnapping Holly" },
    ],
    consequences: ["Walt goes on the run", "Jesse enslaved by neo-Nazis"],
    relatedIds: ["walter-white", "hank-schrader", "jesse-pinkman", "death-hank-schrader"],
    addedAt: "2026-07-14",
  },
  {
    id: "bcs-chicanery",
    slug: "bcs-chicanery",
    title: "Chicanery",
    code: "S03E05",
    season: 3,
    episodeNumber: 5,
    runtime: 47,
    director: "Daniel Sackheim",
    writer: "Gordon Smith",
    imdbRating: 9.5,
    synopsis: "Jimmy cross-examines Chuck in a devastating malpractice hearing.",
    series: ["better-call-saul"],
    characterIds: ["saul-goodman", "chuck-mcgill", "kim-wexler", "howard-hamlin"],
    locationIds: ["hhmm"],
    quoteIds: ["quote-chicanery"],
    timelineYear: 2003,
    relatedIds: ["saul-goodman", "chuck-mcgill", "kim-wexler", "hhmm"],
    sceneTimeline: [
      { timestamp: "00:00", label: "Hearing begins" },
      { timestamp: "20:00", label: "Jimmy cross-examination" },
      { timestamp: "40:00", label: "Chicanery monologue" },
    ],
    addedAt: "2026-07-14",
  },
  {
    id: "bb-face-off",
    slug: "bb-face-off",
    title: "Face Off",
    code: "S04E13",
    season: 4,
    episodeNumber: 13,
    runtime: 51,
    synopsis: "Walt eliminates Gus with a wheelchair bomb.",
    series: ["breaking-bad"],
    characterIds: ["walter-white", "gustavo-fring", "jesse-pinkman", "hector-salamanca"],
    timelineYear: 2010,
    relatedIds: ["walter-white", "gustavo-fring", "hector-salamanca"],
    addedAt: "2026-07-12",
  },
  {
    id: "bb-felina",
    slug: "bb-felina",
    title: "Felina",
    code: "S05E16",
    season: 5,
    episodeNumber: 16,
    runtime: 56,
    synopsis: "Walt returns to Albuquerque for a final reckoning.",
    series: ["breaking-bad"],
    characterIds: ["walter-white", "jesse-pinkman", "jack-welker", "lydia-rodarte-quayle"],
    timelineYear: 2010,
    relatedIds: ["walter-white", "jesse-pinkman", "weapon-m60"],
    addedAt: "2026-07-12",
  },
  {
    id: "bb-box-cutter",
    slug: "bb-box-cutter",
    title: "Box Cutter",
    code: "S04E01",
    season: 4,
    episodeNumber: 1,
    runtime: 46,
    series: ["breaking-bad"],
    characterIds: ["gustavo-fring", "walter-white", "jesse-pinkman"],
    relatedIds: ["gustavo-fring", "superlab"],
    addedAt: "2026-07-11",
  },
  {
    id: "bcs-hero",
    slug: "bcs-hero",
    title: "Hero",
    code: "S01E04",
    season: 1,
    episodeNumber: 4,
    series: ["better-call-saul"],
    characterIds: ["saul-goodman"],
    relatedIds: ["saul-goodman", "saul-office"],
    addedAt: "2026-07-11",
  },
  {
    id: "bcs-bad-choice-road",
    slug: "bcs-bad-choice-road",
    title: "Bad Choice Road",
    code: "S05E09",
    season: 5,
    episodeNumber: 9,
    series: ["better-call-saul"],
    characterIds: ["lalo-salamanca", "gustavo-fring", "mike-ehrmantraut"],
    relatedIds: ["lalo-salamanca", "gustavo-fring"],
    addedAt: "2026-07-11",
  },
  {
    id: "bb-crawl-space",
    slug: "bb-crawl-space",
    title: "Crawl Space",
    code: "S04E11",
    season: 4,
    episodeNumber: 11,
    series: ["breaking-bad"],
    characterIds: ["walter-white", "skyler-white"],
    relatedIds: ["walter-white", "skyler-white"],
    addedAt: "2026-07-10",
  },
  {
    id: "bb-gliding-over-all",
    slug: "bb-gliding-over-all",
    title: "Gliding Over All",
    code: "S05E08",
    season: 5,
    episodeNumber: 8,
    series: ["breaking-bad"],
    characterIds: ["walter-white", "mike-ehrmantraut", "lydia-rodarte-quayle"],
    relatedIds: ["walter-white", "mike-ehrmantraut"],
    addedAt: "2026-07-10",
  },
  {
    id: "ec-el-camino",
    slug: "ec-el-camino",
    title: "El Camino: A Breaking Bad Movie",
    code: "Film",
    season: 0,
    episodeNumber: 0,
    runtime: 122,
    synopsis: "Jesse Pinkman escapes captivity.",
    series: ["el-camino"],
    characterIds: ["jesse-pinkman", "badger", "skinny-pete"],
    timelineYear: 2010,
    relatedIds: ["jesse-pinkman"],
    addedAt: "2026-07-09",
  },
];

for (const e of episodes) {
  w("episodes", e.slug, {
    type: "episode",
    tags: [],
    deathIds: e.deathIds ?? [],
    locationIds: e.locationIds ?? [],
    quoteIds: e.quoteIds ?? [],
    objectIds: e.objectIds ?? [],
    references: e.references ?? [],
    callbacks: e.callbacks ?? [],
    foreshadowing: e.foreshadowing ?? [],
    continuity: e.continuity ?? [],
    behindTheScenes: e.behindTheScenes ?? [],
    bestScenes: e.bestScenes ?? [],
    sceneTimeline: e.sceneTimeline ?? [],
    consequences: e.consequences ?? [],
    ...e,
  });
}

const locations = [
  {
    id: "superlab",
    slug: "superlab",
    title: "Superlab",
    summary: "Gus Fring underground meth lab under laundry.",
    lat: 35.0844,
    lng: -106.6504,
    series: ["breaking-bad"],
    characterIds: ["walter-white", "jesse-pinkman", "gustavo-fring"],
    episodeIds: ["bb-box-cutter", "ozymandias"],
    organizationIds: ["gus-empire"],
    history: ["Built by Gus for 99% pure production"],
    relatedIds: ["gustavo-fring", "walter-white", "jesse-pinkman", "gus-empire"],
  },
  {
    id: "los-pollos-hermanos",
    slug: "los-pollos-hermanos",
    title: "Los Pollos Hermanos",
    summary: "Gus fast food front.",
    lat: 35.1109,
    lng: -106.6101,
    series: ["breaking-bad", "better-call-saul"],
    characterIds: ["gustavo-fring"],
    organizationIds: ["gus-empire"],
    relatedIds: ["gustavo-fring", "gus-empire"],
  },
  {
    id: "a1a-car-wash",
    slug: "a1a-car-wash",
    title: "A1A Car Wash",
    summary: "White family car wash used for laundering.",
    lat: 35.0875,
    lng: -106.5342,
    series: ["breaking-bad"],
    characterIds: ["walter-white", "skyler-white"],
    relatedIds: ["walter-white", "skyler-white"],
  },
  {
    id: "saul-office",
    slug: "saul-office",
    title: "Saul Goodman Office",
    summary: "Strip mall law office.",
    lat: 35.1189,
    lng: -106.6064,
    series: ["breaking-bad", "better-call-saul"],
    characterIds: ["saul-goodman"],
    relatedIds: ["saul-goodman"],
  },
  {
    id: "hhmm-loc",
    slug: "hhmm",
    title: "Hamlin Hamlin McGill",
    summary: "Prestigious ABQ law firm offices.",
    lat: 35.0848,
    lng: -106.6511,
    series: ["better-call-saul"],
    characterIds: ["saul-goodman", "kim-wexler", "chuck-mcgill", "howard-hamlin"],
    organizationIds: ["hhmm"],
    relatedIds: ["saul-goodman", "kim-wexler", "chuck-mcgill"],
  },
  {
    id: "desert-spot",
    slug: "desert-spot",
    title: "Tohajiilee Desert",
    summary: "Remote desert where pivotal confrontations occur.",
    lat: 35.5,
    lng: -107.0,
    series: ["breaking-bad"],
    characterIds: ["walter-white", "hank-schrader", "jesse-pinkman"],
    episodeIds: ["ozymandias"],
    relatedIds: ["ozymandias", "walter-white", "hank-schrader"],
  },
  {
    id: "chuck-house",
    slug: "chuck-house",
    title: "Chuck McGill House",
    lat: 35.0965,
    lng: -106.6682,
    series: ["better-call-saul"],
    characterIds: ["chuck-mcgill"],
    relatedIds: ["chuck-mcgill"],
  },
  {
    id: "jesse-house",
    slug: "jesse-house",
    title: "Jesse Pinkman House",
    lat: 35.1022,
    lng: -106.5891,
    series: ["breaking-bad"],
    characterIds: ["jesse-pinkman"],
    relatedIds: ["jesse-pinkman"],
  },
  {
    id: "dea-office",
    slug: "dea-office",
    title: "DEA Albuquerque Office",
    lat: 35.0844,
    lng: -106.6504,
    series: ["breaking-bad"],
    organizationIds: ["dea"],
    characterIds: ["hank-schrader"],
    relatedIds: ["dea", "hank-schrader"],
  },
  {
    id: "casa-tranquila",
    slug: "casa-tranquila",
    title: "Casa Tranquila",
    lat: 35.0612,
    lng: -106.7123,
    series: ["breaking-bad", "better-call-saul"],
    characterIds: ["hector-salamanca"],
    relatedIds: ["hector-salamanca", "object-hector-bell"],
  },
];

for (const l of locations) {
  w("locations", l.slug, {
    type: "location",
    tags: [],
    eventIds: [],
    episodeIds: l.episodeIds ?? [],
    addedAt: "2026-07-14",
    ...l,
  });
}

const orgs = [
  {
    id: "dea",
    slug: "dea",
    title: "Drug Enforcement Administration",
    summary: "Federal agency hunting Heisenberg.",
    memberIds: ["hank-schrader"],
    locationIds: ["dea-office"],
    history: ["Hank leads Heisenberg investigation"],
    relatedIds: ["hank-schrader", "dea-office"],
  },
  {
    id: "cartel",
    slug: "cartel",
    title: "Juarez Cartel",
    summary: "Salamanca-dominated cartel.",
    memberIds: [
      "don-eladio",
      "bolsa-salamanca",
      "hector-salamanca",
      "tuco-salamanca",
      "lalo-salamanca",
      "the-twins",
    ],
    history: ["Rival to Gus empire"],
    relatedIds: ["don-eladio", "hector-salamanca", "lalo-salamanca", "gustavo-fring"],
  },
  {
    id: "gus-empire",
    slug: "gus-empire",
    title: "Gus Fring Empire",
    summary: "Los Pollos distribution network.",
    memberIds: ["gustavo-fring", "mike-ehrmantraut", "walter-white", "jesse-pinkman"],
    businessIds: ["los-pollos-hermanos-biz"],
    locationIds: ["superlab", "los-pollos-hermanos"],
    history: ["Built over 20 years"],
    relatedIds: ["gustavo-fring", "mike-ehrmantraut", "superlab", "los-pollos-hermanos"],
  },
  {
    id: "hhmm",
    slug: "hhmm",
    title: "Hamlin Hamlin McGill",
    summary: "Albuquerque law firm.",
    memberIds: ["chuck-mcgill", "howard-hamlin", "kim-wexler", "saul-goodman"],
    locationIds: ["hhmm-loc"],
    history: ["Founded by Chuck and Howard"],
    relatedIds: ["saul-goodman", "kim-wexler", "chuck-mcgill", "howard-hamlin"],
  },
  {
    id: "schweikart-cokely",
    slug: "schweikart-cokely",
    title: "Schweikart & Cokely",
    memberIds: ["kim-wexler"],
    relatedIds: ["kim-wexler"],
  },
  {
    id: "davis-main",
    slug: "davis-main",
    title: "Davis & Main",
    memberIds: ["saul-goodman", "kim-wexler"],
    relatedIds: ["saul-goodman", "kim-wexler"],
  },
];

for (const o of orgs) {
  w("organizations", o.slug, {
    type: "organization",
    tags: [],
    series: ["breaking-bad", "better-call-saul"],
    businessIds: o.businessIds ?? [],
    eventIds: [],
    timelineEvents: [],
    addedAt: "2026-07-14",
    ...o,
  });
}

const businesses = [
  {
    id: "los-pollos-hermanos-biz",
    slug: "los-pollos-hermanos",
    title: "Los Pollos Hermanos",
    ownerIds: ["gustavo-fring"],
    locationId: "los-pollos-hermanos",
    relatedIds: ["gustavo-fring", "los-pollos-hermanos", "gus-empire"],
  },
  {
    id: "a1a-car-wash-biz",
    slug: "a1a-car-wash",
    title: "A1A Car Wash",
    ownerIds: ["skyler-white", "walter-white"],
    locationId: "a1a-car-wash",
    relatedIds: ["walter-white", "skyler-white", "a1a-car-wash"],
  },
  {
    id: "gray-matter",
    slug: "gray-matter",
    title: "Gray Matter Technologies",
    ownerIds: ["walter-white"],
    history: ["Walt sold his share for $5000"],
    relatedIds: ["walter-white"],
  },
  {
    id: "vamonos-pest",
    slug: "vamonos-pest",
    title: "Vamonos Pest",
    ownerIds: ["saul-goodman"],
    employeeIds: ["jesse-pinkman"],
    relatedIds: ["saul-goodman", "jesse-pinkman"],
  },
  {
    id: "saul-office-biz",
    slug: "saul-office",
    title: "Saul Goodman Law Office",
    ownerIds: ["saul-goodman"],
    locationId: "saul-office",
    relatedIds: ["saul-goodman", "saul-office"],
  },
  {
    id: "mesa-verde",
    slug: "mesa-verde",
    title: "Mesa Verde",
    relatedIds: ["kim-wexler"],
  },
];

for (const b of businesses) {
  w("businesses", b.slug === "los-pollos-hermanos" ? "los-pollos-hermanos" : b.slug, {
    type: "business",
    tags: [],
    series: ["breaking-bad", "better-call-saul"],
    summary: b.summary ?? "",
    employeeIds: b.employeeIds ?? [],
    ownerIds: b.ownerIds ?? [],
    history: b.history ?? [],
    timelineEvents: [],
    addedAt: "2026-07-14",
    ...b,
  });
}

const quotes = [
  {
    id: "quote-i-am-the-one-who-knocks",
    slug: "i-am-the-one-who-knocks",
    title: "I am the one who knocks.",
    text: "I am the one who knocks.",
    speakerId: "walter-white",
    episodeId: "ozymandias",
    context: "Walt confronts Skyler about danger.",
    tags: ["dark", "iconic"],
    series: ["breaking-bad"],
    relatedIds: ["walter-white", "ozymandias"],
  },
  {
    id: "quote-say-my-name",
    slug: "say-my-name",
    title: "Say my name.",
    text: "Say my name.",
    speakerId: "walter-white",
    episodeId: "bb-gliding-over-all",
    context: "Walt demands recognition from Declan.",
    tags: ["iconic"],
    series: ["breaking-bad"],
    relatedIds: ["walter-white"],
  },
  {
    id: "quote-better-call-saul",
    slug: "better-call-saul",
    title: "Better call Saul!",
    text: "Better call Saul!",
    speakerId: "saul-goodman",
    episodeId: "bcs-hero",
    tags: ["funny", "iconic"],
    series: ["better-call-saul"],
    relatedIds: ["saul-goodman"],
  },
  {
    id: "quote-chicanery",
    slug: "chicanery",
    title: "Chicanery monologue",
    text: "He did it all for the recognition.",
    speakerId: "saul-goodman",
    episodeId: "bcs-chicanery",
    tags: ["emotional"],
    series: ["better-call-saul"],
    relatedIds: ["saul-goodman", "bcs-chicanery"],
  },
  {
    id: "quote-yo-mr-white",
    slug: "yo-mr-white",
    title: "Yo, Mr. White!",
    text: "Yo, Mr. White!",
    speakerId: "jesse-pinkman",
    episodeId: "bb-pilot",
    tags: ["funny"],
    series: ["breaking-bad"],
    relatedIds: ["jesse-pinkman"],
  },
];

for (const q of quotes) {
  w("quotes", q.slug, { type: "quote", ...q, addedAt: "2026-07-14" });
}

const deaths = [
  {
    id: "death-hank-schrader",
    slug: "hank-schrader",
    title: "Death of Hank Schrader",
    victimId: "hank-schrader",
    killerId: "jack-welker",
    episodeId: "ozymandias",
    method: "Gunshot",
    reason: "Executed by neo-Nazis",
    tags: ["gun"],
    series: ["breaking-bad"],
    relatedIds: ["hank-schrader", "jack-welker", "ozymandias"],
  },
  {
    id: "death-steve-gomez",
    slug: "steve-gomez",
    title: "Death of Steve Gomez",
    victimId: "steve-gomez",
    killerId: "jack-welker",
    episodeId: "ozymandias",
    method: "Gunshot",
    tags: ["gun"],
    series: ["breaking-bad"],
    relatedIds: ["ozymandias"],
  },
  {
    id: "death-gus-fring",
    slug: "gus-fring",
    title: "Death of Gustavo Fring",
    victimId: "gustavo-fring",
    killerId: "walter-white",
    episodeId: "bb-face-off",
    method: "Explosion",
    tags: ["explosion"],
    series: ["breaking-bad"],
    relatedIds: ["gustavo-fring", "walter-white", "bb-face-off"],
  },
  {
    id: "death-tuco",
    slug: "tuco-salamanca",
    title: "Death of Tuco Salamanca",
    victimId: "tuco-salamanca",
    episodeId: "bb-mandala",
    method: "Gunshot",
    accidental: false,
    series: ["breaking-bad"],
    relatedIds: ["tuco-salamanca"],
  },
];

for (const d of deaths) {
  w("deaths", d.slug, {
    type: "death",
    accidental: false,
    suicide: false,
    tags: d.tags ?? [],
    addedAt: "2026-07-14",
    ...d,
  });
}

const objects = [
  {
    id: "pink-teddy-bear",
    slug: "pink-teddy-bear",
    title: "Pink Teddy Bear",
    meaning: "Foreshadowing of Wayfarer 515 crash",
    symbolism: "Loss of innocence, consequences of Walt actions",
    episodeIds: ["ozymandias"],
    series: ["breaking-bad"],
    relatedIds: ["ozymandias", "symbol-pink"],
  },
  {
    id: "object-hector-bell",
    slug: "hector-bell",
    title: "Hector's Bell",
    meaning: "Communication device after stroke",
    symbolism: "Patience and revenge",
    episodeIds: ["bb-face-off"],
    series: ["breaking-bad", "better-call-saul"],
    relatedIds: ["hector-salamanca", "bb-face-off"],
  },
  {
    id: "object-walt-hat",
    slug: "walt-hat",
    title: "Heisenberg Pork Pie Hat",
    symbolism: "Transformation into Heisenberg",
    series: ["breaking-bad"],
    relatedIds: ["walter-white"],
  },
];

for (const o of objects) {
  w("objects", o.slug, {
    type: "object",
    tags: [],
    timelineEvents: [],
    episodeIds: o.episodeIds ?? [],
    addedAt: "2026-07-14",
    ...o,
  });
}

const vehicles = [
  {
    id: "rv",
    slug: "rv",
    title: "The RV",
    ownerId: "jesse-pinkman",
    episodeIds: ["bb-pilot"],
    history: ["Mobile meth lab", "Buried in desert"],
    series: ["breaking-bad"],
    relatedIds: ["jesse-pinkman", "walter-white", "bb-pilot"],
  },
  {
    id: "pontiac-aztek",
    slug: "pontiac-aztek",
    title: "Pontiac Aztek",
    ownerId: "walter-white",
    episodeIds: ["bb-pilot"],
    series: ["breaking-bad"],
    relatedIds: ["walter-white"],
  },
  {
    id: "mike-car",
    slug: "mike-car",
    title: "Mike's Chrysler",
    ownerId: "mike-ehrmantraut",
    series: ["breaking-bad", "better-call-saul"],
    relatedIds: ["mike-ehrmantraut"],
  },
];

for (const v of vehicles) {
  w("vehicles", v.slug, {
    type: "vehicle",
    tags: [],
    episodeIds: v.episodeIds ?? [],
    history: v.history ?? [],
    addedAt: "2026-07-14",
    ...v,
  });
}

const weapons = [
  {
    id: "weapon-m60",
    slug: "m60",
    title: "M60 Machine Gun",
    usageHistory: ["Walt mows down Jack's gang in Felina"],
    episodeIds: ["bb-felina"],
    series: ["breaking-bad"],
    relatedIds: ["walter-white", "bb-felina", "jack-welker"],
  },
  {
    id: "weapon-ricin",
    slug: "ricin",
    title: "Ricin",
    usageHistory: ["Walt poisons Lydia"],
    episodeIds: ["bb-felina"],
    series: ["breaking-bad"],
    relatedIds: ["walter-white", "lydia-rodarte-quayle"],
  },
  {
    id: "weapon-box-cutter",
    slug: "box-cutter",
    title: "Box Cutter",
    usageHistory: ["Gus kills Victor"],
    episodeIds: ["bb-box-cutter"],
    series: ["breaking-bad"],
    relatedIds: ["gustavo-fring", "bb-box-cutter"],
  },
];

for (const wp of weapons) {
  w("weapons", wp.slug, {
    type: "weapon",
    tags: [],
    addedAt: "2026-07-14",
    ...wp,
  });
}

const drugs = [
  {
    id: "blue-meth",
    slug: "blue-meth",
    title: "Blue Sky Meth",
    chemicalNotes: "99.1% pure crystalline methamphetamine. Blue tint from P2P process.",
    episodeIds: ["bb-pilot"],
    series: ["breaking-bad"],
    relatedIds: ["walter-white", "jesse-pinkman"],
  },
  {
    id: "drug-ricin",
    slug: "ricin",
    title: "Ricin",
    chemicalNotes: "Protein toxin from castor beans. Walt and Jesse manufacture small doses.",
    series: ["breaking-bad"],
    relatedIds: ["walter-white", "weapon-ricin"],
  },
  {
    id: "drug-lily-valley",
    slug: "lily-of-the-valley",
    title: "Lily of the Valley",
    chemicalNotes: "Plant toxin Walt uses to poison Brock.",
    series: ["breaking-bad"],
    relatedIds: ["walter-white"],
  },
];

for (const dr of drugs) {
  w("drugs", dr.slug, {
    type: "drug",
    tags: [],
    episodeIds: dr.episodeIds ?? [],
    addedAt: "2026-07-14",
    ...dr,
  });
}

const symbols = [
  {
    id: "symbol-purple",
    slug: "purple",
    title: "Purple",
    color: "#9333ea",
    appearances: ["Marie Schrader wardrobe and home decor"],
    series: ["breaking-bad"],
    relatedIds: ["marie-schrader"],
  },
  {
    id: "symbol-yellow",
    slug: "yellow",
    title: "Yellow",
    color: "#eab308",
    appearances: ["Los Pollos Hermanos branding", "Jesse wardrobe"],
    relatedIds: ["los-pollos-hermanos", "gustavo-fring"],
  },
  {
    id: "symbol-green",
    slug: "green",
    title: "Green",
    color: "#2d5016",
    appearances: ["Heisenberg identity", "Money stacks"],
    relatedIds: ["walter-white"],
  },
  {
    id: "symbol-pink",
    slug: "pink",
    title: "Pink",
    color: "#ec4899",
    appearances: ["Pink teddy bear", "Breast cancer awareness"],
    relatedIds: ["pink-teddy-bear"],
  },
];

for (const s of symbols) {
  w("symbols", s.slug, {
    type: "symbol",
    tags: [],
    series: ["breaking-bad", "better-call-saul"],
    addedAt: "2026-07-14",
    ...s,
  });
}

const events = [
  {
    id: "event-gray-matter",
    slug: "gray-matter-founded",
    title: "Gray Matter Founded",
    year: 1985,
    participantIds: ["walter-white"],
    relatedIds: ["gray-matter", "walter-white"],
  },
  {
    id: "event-train-heist",
    slug: "train-heist",
    title: "Train Heist",
    year: 2010,
    participantIds: ["walter-white", "jesse-pinkman", "todd-alquist"],
    relatedIds: ["walter-white", "jesse-pinkman"],
  },
  {
    id: "event-hank-death",
    slug: "hank-death",
    title: "Hank Schrader Killed",
    year: 2010,
    participantIds: ["hank-schrader", "jack-welker", "walter-white"],
    episodeId: "ozymandias",
    relatedIds: ["death-hank-schrader", "ozymandias"],
  },
];

for (const ev of events) {
  w("events", ev.slug, {
    type: "event",
    tags: [],
    series: ["breaking-bad"],
    addedAt: "2026-07-14",
    ...ev,
  });
}

const cases = [
  {
    id: "case-sandpiper",
    slug: "sandpiper",
    title: "Sandpiper Crossing Class Action",
    clientIds: ["elderly-clients"],
    lawyerIds: ["saul-goodman", "kim-wexler"],
    outcome: "HHM takes over case from Jimmy",
    series: ["better-call-saul"],
    relatedIds: ["saul-goodman", "kim-wexler", "hhmm"],
  },
];

for (const c of cases) {
  w("cases", c.slug, {
    type: "case",
    tags: [],
    addedAt: "2026-07-14",
    ...c,
  });
}

const easterEggs = [
  {
    id: "egg-pink-bear",
    slug: "pink-bear-foreshadow",
    title: "Pink Bear Foreshadowing",
    summary: "Half-burned pink teddy bear appears before plane crash reveal.",
    series: ["breaking-bad"],
    relatedIds: ["pink-teddy-bear"],
  },
  {
    id: "egg-color-marie",
    slug: "marie-purple",
    title: "Marie Purple Motif",
    summary: "Marie wears purple in nearly every scene.",
    relatedIds: ["marie-schrader", "symbol-purple"],
  },
];

for (const egg of easterEggs) {
  w("easter-eggs", egg.slug, {
    type: "object",
    tags: ["easter-egg"],
    episodeIds: [],
    addedAt: "2026-07-14",
    ...egg,
  });
}

console.log("Seed content complete");
