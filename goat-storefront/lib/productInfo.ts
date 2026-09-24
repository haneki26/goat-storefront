// Structured facts for GOAT PWO, taken from the live product page.
// Keep in sync with the tub label. Amounts are per 15 g serving.
// TODO: move these into Shopify metafields so they are editable in the admin (and reusable by the app).

export const PWO_INFO = {
  tagline: ["Train Harder.", "Stay Sharper.", "No Crash."],
  intro: "A tea-based pre-workout with electrolytes. Clean energy, sharp focus and hydration for your whole session.",
  highlights: [
    { title: "Explosive energy + laser focus", text: "230 mg caffeine paired with 230 mg L-theanine for smooth, jitter-free drive." },
    { title: "Electrolytes for hydration", text: "Potassium and sodium to keep you going through long, hard sessions." },
    { title: "100% vegan and cruelty-free", text: "Plant-friendly, with nothing you'd rather not have in your shaker." },
    { title: "Made in Norway", text: "Produced with quality assurance." },
  ],
  // grams per serving (mg converted), used for the bar chart
  formula: [
    { name: "L-Arginine", label: "2.90 g", g: 2.9 },
    { name: "L-Citrulline", label: "2.30 g", g: 2.3 },
    { name: "Maltodextrin", label: "2.05 g", g: 2.05 },
    { name: "L-Alanine", label: "1.90 g", g: 1.9 },
    { name: "Acetyl L-Carnitine", label: "0.87 g", g: 0.87 },
    { name: "L-Taurine", label: "0.58 g", g: 0.58 },
    { name: "L-Tyrosine", label: "0.48 g", g: 0.48 },
    { name: "Beta-Alanine", label: "0.40 g", g: 0.4 },
    { name: "Caffeine Anhydrous", label: "230 mg", g: 0.23 },
    { name: "L-Theanine", label: "230 mg", g: 0.23 },
    { name: "Tripotassium Citrate", label: "40 mg", g: 0.04 },
    { name: "Sodium Chloride", label: "2 mg", g: 0.002 },
  ],
  nutrition: [
    { k: "Energy", v: "~9 kcal" },
    { k: "Fat", v: "0 g" },
    { k: "Carbs", v: "~2.05 g" },
    { k: "Protein", v: "0.1 g" },
    { k: "Salt", v: "0.002 g" },
  ],
  steps: [
    { title: "Mix", text: "1 scoop (15 g) in 300 ml cold water." },
    { title: "Shake", text: "Shake well until fully dissolved." },
    { title: "Train", text: "Drink 15 to 30 minutes before you start." },
  ],
  note: "For intense sessions: 2 scoops in 500 ml water. Do not exceed 2 scoops per day.",
};

export const isPwo = (p: { productType: string; title: string }) => p.productType !== "BUNDLE" && /pwo/i.test(p.title);
