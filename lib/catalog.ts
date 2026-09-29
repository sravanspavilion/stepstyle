export type Badge = {
  label: string;
  /** `neutral` = white chip, `dark` = black chip, `danger` = red chip, `muted` = blue-grey chip */
  tone: "neutral" | "dark" | "danger" | "muted";
};

export type Colorway = {
  name: string;
  /** swatch background + optional second dot for the sole colour */
  hex: string;
  accent?: string;
};

export type GalleryShot = {
  src: string;
  alt: string;
  /** short caption rendered on the thumbnail rail */
  caption: string;
};

export type Spec = {
  icon: string;
  title: string;
  body: string;
};

export type CareStep = {
  step: string;
  title: string;
  body: string;
};

export type Review = {
  author: string;
  rating: number;
  quote: string;
  meta: string;
};

export type Silhouette =
  | "Sneakers"
  | "Penny Loafers"
  | "Running Trainers"
  | "Everyday Slides"
  | "Chelsea Boots"
  | "Shirts"
  | "Overshirts"
  | "Trousers";

export type ProductKind = "footwear" | "apparel" | "accessory";

export type Product = {
  id: string;
  slug: string;
  name: string;
  /** short colour/variant line shown under the title */
  variant: string;
  /** longer descriptor used on the PDP */
  descriptor: string;
  sku: string;
  kind: ProductKind;
  silhouette: Silhouette;
  department: string;
  /** eyebrow above the PDP title */
  collection: string;
  price: number;
  mrp: number;
  rating: number;
  reviewCount: number;
  badges: Badge[];
  colorways: Colorway[];
  gallery: GalleryShot[];
  sizes: { label: string; stock: number }[];
  material: string;
  materials: string[];
  colors: string[];
  specs: Spec[];
  care: CareStep[];
  reviews: Review[];
  /** extras surfaced on the PDP trust list / PDP bullets */
  highlights: string[];
  isNew?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
};

const img = (id: string) => `https://lh3.googleusercontent.com/aida-public/${id}`;

export const LOGO_SRC =
  "https://lh3.googleusercontent.com/aida/AEtjO1U6dKHNIlHlQVAfMK4oBdsy6UK6S6EHAGZ0zvwnFx8AvFCvG2wLz8abNqTLbK2clvjEa-UlVT7fGpyIbBXFNcPzqjNew1DjZaWyPQCg9kEtNHpJJWIZxTNRT16Bl4Ph-UnOmsmID05gRBGgkTsxKGy4W7KFv3O3mcfsjHl0b8IgUZi6Vm729N3LnANPsHOi3dK4MeTnB2Ns6fIH73u92b6tdszd-Nii_Rf3EuoKqxvKesgkNWkfrD6OxTA";

/**
 * LOGO_SRC is a 512x512 square canvas, but the wordmark inside it is only
 * 395x65 (≈6.08:1) and left-aligned — the canvas is ~97% empty transparency.
 * Rendering the square as-is scales the letterforms down to ~13% of the box,
 * which makes the brand mark illegible, so `components/ui/logo.tsx` crops to
 * this box. Re-measure with a canvas pixel scan if the asset is ever replaced.
 */
export const LOGO_CANVAS = 512;
export const LOGO_INK = { x: 4, y: 224, width: 395, height: 65 } as const;

export const products: Product[] = [
  {
    id: "p-01",
    slug: "classic-minimalist-leather-sneaker",
    name: "Classic Minimalist Leather Sneaker",
    variant: "Triple White / Natural Gum",
    descriptor: "Full-Grain Italian Nappa Leather with Ortho-Cushion Sole",
    sku: "STS-SNEAK-01W",
    kind: "footwear",
    silhouette: "Sneakers",
    department: "Men",
    collection: "Performance Essentials",
    price: 2499,
    mrp: 3499,
    rating: 4.9,
    reviewCount: 420,
    isBestSeller: true,
    badges: [{ label: "Bestseller", tone: "neutral" }],
    colorways: [
      { name: "Chalk White / Natural Gum", hex: "#F6F5F0", accent: "#B8860B" },
      { name: "Jet Black / Monochrome", hex: "#1C1B1B" },
      { name: "Earth Taupe Suede", hex: "#A39382" },
      { name: "Slate Blue Nappa", hex: "#4A5D6E" },
    ],
    gallery: [
      {
        src: img("AB6AXuB6IbIJVz-ECgn3JVAN8mYzu3sDiA_1ttQJXi0PU4cdGSyrX4cAy3sO9FZmrHmN2tuTLmRuF8ld8mnj1LfMdnSGFdHXJQKX_2Omq_jyq7FgePxplyRhtsuuG8SkNKBWzxH-lvFcax3-M0Voxax5_e3ly4uhsfSTFhR6X22r0sxUqjx7IuNMAk2ZF-3k_0WgZYsWUhtdhh5m9c423m4ZAeZ0_NhwDhyz4ZqT2BCjaWCBlLeL1BdY8Bo3lA"),
        alt: "Classic Minimalist Leather Sneaker - hero lateral angle",
        caption: "Hero",
      },
      {
        src: img("AB6AXuD1cmHVkswPvVR140ie_5VdhHjQAdSvDP0MzmXe_uNP3F1l38vm14GRsgoCexE7qz3AODd6i3EneLhalzTimU4eRtJrwuqzu-06rnvD-jtoxuY6xAWOwtkcKl5UOmtO8RWLAm2zpTN4GGFjIqeLKXAEts3JVKp_-bZC-jmoMJhW6iOfcFrkeVj1WAvJQKhjWxVHvkHBPgCtSaWgL4WANCf9iG-ppKj3JeeFxleF7nQEQK1GNQl_iRF6kw"),
        alt: "Lateral profile of a chalk white sneaker with gum sole",
        caption: "Lateral",
      },
      {
        src: img("AB6AXuAXrgmp_LTGANrbgV-2wv1LLbd2UrEb6KP8AWFuO2TmXaDCTeNqGdEvftE9kr3DPeyOhxswTkUGkR9CdNoAxU28iwLuWIDxoTVRf-En9jRji-BYnSUkS_6hrSk-Mnf4tCgt87g1-CMnaqvLB6DFS0yKz6S_D-dvxLIaA4TQW8mevhX4Gcwux_L3ijc946Pe9jKIOOyxR2FB9BIFv-JeRfsQaWsfoIuuA9cCGqfbFs9tvD9EO1VGeh0PBQ"),
        alt: "Top-down flat lay of a pair of white minimalist sneakers",
        caption: "Top-Down",
      },
      {
        src: img("AB6AXuBwUkmkd9vn8z6LPa4C0fDm05xc386gP3K2ZjS2tYz84hi461S_wDHRtvm3Tzl9XSxNBofFQ9dqL9KKWk8RxDG8h5MVrzbJQS531ZOxAc70FOKAuQ9mHXb-G8lTQ_9g-xAjd398NQSz8HWVpiM-Pz6GKMkKE-P_7c78WM3NJFhCRxps8wGkjgE8lMRReJxGbRqdUzO0-C7DKlnQ_GQN8i_XN3CaLINYLBVrT0ilQV7xP4xb5oTfjFg3Cw"),
        alt: "Macro detail of the vulcanized gum cupsole and heel counter",
        caption: "Cupsole",
      },
      {
        src: img("AB6AXuCFks3ABtvcwGoKSQQXFI7Xy8jswcn40R-04aDwId2IhyvAcSC7Z6JaUqG6pJVotU-bbqHjjLZ870QpVRgHBzHq6lf-3YiV3mLHcDxeNjIZggyasG2uApRxxu8tad2XTDFMSXa4dzJxpRJ0d1vaEQww_zGltzP01FqTE_xvgwBvaLjzKobjU7v7LTrvXFQUulsc4t24hJvPdvSIe32Fkbl3CBCgVccH2EzRmxnpLIe6KN6onxfXs7Tqwg"),
        alt: "On-foot street style shot of white leather sneakers with olive trousers",
        caption: "On-Foot",
      },
      {
        src: img("AB6AXuBt_VaFiz_z4DvgNUF1OmH3pZOWSbZZ0JI667E9F9fG0VF8hvTlfrZvu7VY3OFeyXtxeMFf_tlnIrCeGLYSeojsWUwSYoc3yf6CBVrLz2BLhBB1Z7AwskBbv2MionHq_WTOOK9xE4PNZEJNX0fiJFPN74mvsyIxAk-TdbfkxW5GDZW8HLhgm29X75mlbvjz3zsJkzjhlHyGAl608zT52uiNMslrBMH2LKC7Q_yd8pH-ieUXkeHy7QoDDw"),
        alt: "Outsole showing the geometric herringbone traction pattern",
        caption: "Traction",
      },
    ],
    sizes: [
      { label: "UK 6", stock: 2 },
      { label: "UK 7", stock: 6 },
      { label: "UK 8", stock: 9 },
      { label: "UK 9", stock: 12 },
      { label: "UK 10", stock: 8 },
      { label: "UK 11", stock: 5 },
      { label: "UK 12", stock: 0 },
    ],
    material: "Italian Calfskin",
    materials: ["Italian Calfskin", "Breathable Supima Mesh"],
    colors: ["Triple White", "Jet Black", "Earth Taupe", "Slate Blue"],
    highlights: [
      "Ultra-soft Supima Cotton",
      "360° Flexible Mobility",
      "Thermoregulating Fabric",
      "Machine Wash & Wear",
    ],
    specs: [
      {
        icon: "layers",
        title: "Italian Nappa Upper",
        body: "Sourced from family-run tanneries in Arzignano. Ultra-soft full grain temper that conforms to natural foot kinetics over time without deep creasing.",
      },
      {
        icon: "footprint",
        title: "Ortho-Density Insole",
        body: "Removable dual-density recycled PU footbed with micro-perforated leather top layer. Built for all-day 15,000+ step shock absorption.",
      },
      {
        icon: "anchor",
        title: "Vulcanized Gum Cupsole",
        body: "360-degree lock-stitch sidewall construction connecting upper directly to natural gum sole. Eliminates delamination risks common with glued sneakers.",
      },
      {
        icon: "clean_hands",
        title: "Antimicrobial Interior",
        body: "Lined with silky-soft calfskin and treated with plant-derived silver ion solution for natural odor neutrality even without socks.",
      },
    ],
    care: [
      {
        step: "Step 01",
        title: "Dry Dust & Debris Wipe",
        body: "Use a soft horsehair brush to sweep away loose dirt along the welt and tongue seams after wear.",
      },
      {
        step: "Step 02",
        title: "Natural Leather Balm",
        body: "Apply a dime-sized amount of beeswax-based neutral cream every 4-6 weeks to preserve supple moisture.",
      },
      {
        step: "Step 03",
        title: "Natural Cedar Tree Storage",
        body: "Insert cedar shoetrees between outings to absorb ambient foot perspiration and retain toe-spring alignment.",
      },
    ],
    reviews: [
      {
        author: "Vikramaditya S.",
        rating: 5,
        quote:
          "Wears UK 9 in Nike and Stan Smiths—bought UK 9 here and it fits absolutely like a tailored glove. Leather quality is superior to kicks that cost triple.",
        meta: "Ordered: UK 9 • Chalk White / Gum",
      },
      {
        author: "Arjun Mehta",
        rating: 5,
        quote:
          "Zero heel slip and zero blister break-in period. Wore them straight through a 4-day conference in Bangalore. Incredible support in the arch.",
        meta: "Ordered: UK 10 • Jet Black",
      },
      {
        author: "Devika Raman",
        rating: 5,
        quote:
          "Clean minimal design with zero loud logos. You can dress this right under a blazer or pair it with cotton gym shorts. Highly recommend.",
        meta: "Ordered: UK 8 • Chalk White / Gum",
      },
    ],
  },
  {
    id: "p-02",
    slug: "aeroglide-daily-running-shoe",
    name: "AeroGlide Daily Running Shoe",
    variant: "Jet Black / Cobalt Pulse",
    descriptor: "Engineered Knit Upper with Cobalt Pulse Midsole",
    sku: "STS-RUN-02BK",
    kind: "footwear",
    silhouette: "Running Trainers",
    department: "Men",
    collection: "Performance Essentials",
    price: 2999,
    mrp: 3999,
    rating: 4.8,
    reviewCount: 180,
    isNew: true,
    badges: [{ label: "New", tone: "dark" }],
    colorways: [
      { name: "Jet Black / Cobalt Pulse", hex: "#111111", accent: "#003EA8" },
      { name: "Slate Grey / Volt", hex: "#585F6C" },
      { name: "Bone White / Ice", hex: "#E8E6DF" },
    ],
    gallery: [
      {
        src: img("AB6AXuBR7vE__VGZlru2kH1KwE-rVhYZ46CfqXxzBsVXkfv-MwbXPdundNA64JTj7vRDyXbGnWANEMjfwtHrqeI2GlDD4quM9-noSv5K4UOAB9UPFVVY0Wbot0zUoMCQE6ckO7qOmgwjSOFS4y79lF0neKqNWWD4IYayFMsEoYJVRRZFkWPxYHyOauZUuIMvjhs8ADJys7ZwdAST_FIL6BN8AinOVCIaZE2wbc7RFhorZhKm_QjhQCjGYoBUGQ"),
        alt: "AeroGlide running shoe on a floating pedestal",
        caption: "Profile",
      },
      {
        src: img("AB6AXuBgWMfe_Md9VHaU3sknW0fYhXq5knoQBtIo7tFq8igcnr99TnXEi0u8uldzgD2VjOlY_xlrGODmhYbwjr8FMAjn-adWiPr5h_vsuILWZL-M7dFT_DgwjprPfDxMjdndDIIWkogW2tKMfmHi-uDAWM_pL1PTqGW3ylve9lGy5-Hp80CcpVQhLLq1h_5T3kGkjMCdIcG_109IXcPqaim7nsaheuECImdzk_W0n3z6P_3YCmC5j76P2tENEA"),
        alt: "AeroGlide side profile in jet black knit",
        caption: "Lateral",
      },
    ],
    sizes: [
      { label: "UK 7", stock: 4 },
      { label: "UK 8", stock: 7 },
      { label: "UK 9", stock: 11 },
      { label: "UK 10", stock: 9 },
      { label: "UK 11", stock: 4 },
    ],
    material: "Breathable Supima Mesh",
    materials: ["Breathable Supima Mesh", "High-Rebound EVA Foam"],
    colors: ["Jet Black", "Slate Grey", "Bone White"],
    highlights: ["Seamless Knit Upper", "Cobalt Pulse Midsole", "Reflective Heel Tab", "Machine Washable"],
    specs: [
      {
        icon: "speed",
        title: "Seamless Engineered Knit",
        body: "Single-piece upper with zonal density mapping so the knit stretches exactly where your stride needs it and nowhere else.",
      },
      {
        icon: "bolt",
        title: "Cobalt Pulse Midsole",
        body: "Supercritical nitrogen-infused foam with a 38mm stack height for a soft landing and an energetic toe-off.",
      },
      {
        icon: "visibility",
        title: "Reflective Heel Geometry",
        body: "A wrap-around reflective film keeps the rear geometry visible in low light without adding bulk.",
      },
      {
        icon: "recycling",
        title: "Recycled Knit Yarn",
        body: "Approximately 45% of the upper yarn is spun from post-consumer plastic recovered within 50km of the mill.",
      },
    ],
    care: [
      { step: "Step 01", title: "Loosen The Lace Grid", body: "Always fully release the laces and pull the tongue forward before washing to protect the knit structure." },
      { step: "Step 02", title: "Cold Machine Wash", body: "30°C, no fabric softener — softener clogs the engineered mesh and dulls the reflective film." },
      { step: "Step 03", title: "Air Dry Away From Heat", body: "Loosen the laces wide and air dry at room temperature. Direct heat will warp the midsole geometry." },
    ],
    reviews: [
      {
        author: "Nikhil Rao",
        rating: 5,
        quote: "Logged my first sub-25 minute 5k in these. The transition is smooth and there is zero heel slip on descents.",
        meta: "Ordered: UK 9 • Jet Black",
      },
      {
        author: "Sana Fernandes",
        rating: 4,
        quote: "Genuinely comfortable for long commutes. I would buy a second pair in the slate colourway.",
        meta: "Ordered: UK 8 • Jet Black",
      },
    ],
  },
  {
    id: "p-03",
    slug: "milano-suede-penny-loafer",
    name: "Milano Suede Penny Loafer",
    variant: "Earth Taupe Hand-Finished",
    descriptor: "Hand-Finished Italian Suede Moc-Toe",
    sku: "STS-LOAF-03TP",
    kind: "footwear",
    silhouette: "Penny Loafers",
    department: "Men",
    collection: "Atelier Series",
    price: 3499,
    mrp: 4999,
    rating: 4.9,
    reviewCount: 95,
    isTrending: true,
    badges: [{ label: "Limited", tone: "muted" }],
    colorways: [
      { name: "Earth Taupe", hex: "#A38C7B" },
      { name: "Dark Espresso", hex: "#3D2F25" },
    ],
    gallery: [
      {
        src: img("AB6AXuB6EnYolHt_1KZLH0Bdn0hPWtkO5zKNcPxcVSqVlqGTKwtIVF87HtISWk19mAx24a848ykNrymIMVUZwnUdMpVb5d6k4PoCkE4i5s_I0MRZ4htkBwck284a7kE17lLmaRIMU4zfCddVqTci2D1vEG3POM5tJaeUEmVbg0RgntgZRIEf2FqJR5RpPp0mY4DglUqm_fxyg504rolmka8wWo7LWs_uiRxkSkKfKLspHYSW47PqCkW9in1Fnw"),
        alt: "Milano suede penny loafer on a neutral podium",
        caption: "Profile",
      },
      {
        src: img("AB6AXuB3Ue99ofona3yZ_xRwfbFycmoyOtG6oyPP9LA4d-9cWjEE5jW3W8tvMuS2CWbfIn7FOc6pz59Gcw-YDzgI1OZIyxnUs7VS2AXW4El4mXQxH0S887F5QfMGyHme9LJMrHS1K_-aj5iHkAvd2K9a8iI2PZ0M4bMFTCU5OdwUuKW09Vl_Hu8TZEqSHMJalq4JmZj3E_qjZXf8ijqZO1a64ewPZNI9ktMi6omhlIOCll9Q9STN4DvNnTHbQw"),
        alt: "Earth taupe suede penny loafer on a sculpted stone pedestal",
        caption: "Detail",
      },
    ],
    sizes: [
      { label: "UK 7", stock: 3 },
      { label: "UK 8", stock: 5 },
      { label: "UK 9", stock: 7 },
      { label: "UK 10", stock: 6 },
      { label: "UK 11", stock: 2 },
    ],
    material: "Italian Calfskin",
    materials: ["Italian Calfskin", "Heavy Organic Canvas"],
    colors: ["Earth Taupe", "Dark Espresso"],
    highlights: ["Hand-Finished Moc-Toe", "Blake-Stitched Sole", "Leather-Felted Bed", "Unlined Interior"],
    specs: [
      {
        icon: "content_cut",
        title: "Hand-Finished Moc-Toe",
        body: "The raised apron is cut and skived by hand before saddle stitching, so the profile reads clean under tailoring.",
      },
      {
        icon: "handyman",
        title: "Blake-Stitched Sole",
        body: "A single lock-stitch runs through the upper and leather outsole, letting the sole be resoled instead of replaced.",
      },
      {
        icon: "texture",
        title: "Italian Suede Nap",
        body: "Dense short-nap suede from Tuscany that resists creasing and develops a subtle patina at the flex point.",
      },
      {
        icon: "workspace_premium",
        title: "Unlined Leather Interior",
        body: "No synthetic lining means no blisters, and the whole shoe breathes the way a good handmade loafer should.",
      },
    ],
    care: [
      { step: "Step 01", title: "Suede Eraser Pass", body: "Work a dry suede eraser across the nap after each wear to lift surface marks before they set." },
      { step: "Step 02", title: "Suede Conditioner", body: "Apply a water-free suede conditioner twice a year to keep the nap supple without darkening the taupe." },
      { step: "Step 03", title: "Store Flat & Shaped", body: "Keep shoe trees in the toes and store flat so the apron does not curl while the shoe is off-foot." },
    ],
    reviews: [
      {
        author: "Imran Qureshi",
        rating: 5,
        quote: "Wore these to a wedding and then straight to a client dinner. The taupe is far more versatile than the photos suggest.",
        meta: "Ordered: UK 9 • Earth Taupe",
      },
    ],
  },
  {
    id: "p-04",
    slug: "urban-drift-foam-slide",
    name: "Urban Drift Foam Slide",
    variant: "Slate Grey Cloud Recovery",
    descriptor: "Sculptural High-Rebound EVA Foam Slide",
    sku: "STS-SLD-04GY",
    kind: "footwear",
    silhouette: "Everyday Slides",
    department: "Unisex",
    collection: "Recovery Lab",
    price: 1299,
    mrp: 1799,
    rating: 4.7,
    reviewCount: 310,
    isTrending: true,
    badges: [{ label: "Hot", tone: "danger" }],
    colorways: [
      { name: "Slate Grey", hex: "#585F6C" },
      { name: "Chalk", hex: "#F3F3F3" },
      { name: "Jet Black", hex: "#111111" },
      { name: "Sandstone", hex: "#C9BFAE" },
    ],
    gallery: [
      {
        src: img("AB6AXuAXM2R9fw810mFq5jn4F6SWDiFOdTOMSCAk4qwUcBGhzak9oPLwztqaarFRCfvRKmENkjq2EpX64ogbac6mAj01lITSkajqObcN51KeeBgTqy0EtULuYFUQCVgUgAt5e4dOuu6Nxar8_5kOTweycASnPgOjy8mfdwVhFXBogN-D5d7MVqP-Q2fLV8Qe1VO_o11z6WM920ayVw_PPvqymOdTR9_oHyuC0d0lja57YQ1ukFO_lSYIKdTTTA"),
        alt: "Sculptural matte slate grey slide on limestone",
        caption: "Profile",
      },
      {
        src: img("AB6AXuBGeirKmt_atfP93PHSZCRRSYnz7QVXZeik3DLUcAXQI-kMguFdpXi7Uk_ziI6rZElIBSPC4LSXxBtSUscHYHTV8QXIKlX_kgvIRdzFYNnDMo3C-XRPzfYkJaewXoMwwl07fPxTirlXMH48biCQgcwt2-Qgi1fVhr5FRJQxATv17AfKYXBbuWotKq358ggEc7uSmssLHkRotoCx2IhRJeouNubae5MCobi6f2o0AmxVRGd6N1gLb0bMqw"),
        alt: "Slide sandal in matte slate grey high-resilience foam",
        caption: "Detail",
      },
    ],
    sizes: [
      { label: "UK 6", stock: 8 },
      { label: "UK 7", stock: 10 },
      { label: "UK 8", stock: 12 },
      { label: "UK 9", stock: 14 },
      { label: "UK 10", stock: 9 },
      { label: "UK 11", stock: 5 },
    ],
    material: "High-Rebound EVA Foam",
    materials: ["High-Rebound EVA Foam", "Breathable Supima Mesh"],
    colors: ["Slate Grey", "Chalk", "Jet Black", "Sandstone"],
    highlights: ["Cloud Recovery Footbed", "Seamless One-Piece Mold", "Splash-Proof Grip", "Indoor-Outdoor Safe"],
    specs: [
      {
        icon: "cloud",
        title: "Cloud Recovery Footbed",
        body: "A contoured high-arch footbed with a raised heel wall that returns energy across the whole foot rather than the heel alone.",
      },
      {
        icon: "view_in_ar",
        title: "Seamless One-Piece Mold",
        body: "Moulded in a single pour so there are no glue lines to separate — a common failure point in cheaper slides.",
      },
      {
        icon: "waves",
        title: "Splash-Proof Grip",
        body: "Textured channels on the footbed move water away from the skin, making it safe for showers and wet floors.",
      },
      {
        icon: "scale",
        title: "Indoor-Outdoor Safe",
        body: "A soft-density compound keeps footsteps quiet on tile while still resisting slip on wet stone.",
      },
    ],
    care: [
      { step: "Step 01", title: "Rinse & Air Dry", body: "Rinse with cool water after a shower and leave out of direct sun — heat is the enemy of EVA." },
      { step: "Step 02", title: "Wipe The Channels", body: "The footbed channels trap grit; a soft brush every few weeks keeps them clear." },
      { step: "Step 03", title: "Avoid Hot Cars", body: "Parked dashboards in summer can warp the mould. Store indoors when the shoe is not in use." },
    ],
    reviews: [
      {
        author: "Rohan Chawla",
        rating: 5,
        quote: "The footbed geometry supports high arches naturally. Best recovery footwear I have owned at this price.",
        meta: "Ordered: UK 9 • Slate Grey",
      },
      {
        author: "Aisha Kulkarni",
        rating: 4,
        quote: "Bought a second pair for the gym bag. Sizing runs true and the grip holds on wet tiles.",
        meta: "Ordered: UK 7 • Chalk",
      },
    ],
  },
  {
    id: "p-05",
    slug: "monochrome-heritage-low-runner",
    name: "Monochrome Heritage Low Runner",
    variant: "Off-White / Cream Nappa",
    descriptor: "Vintage Court Silhouette in Nappa & Suede",
    sku: "STS-RUN-05OW",
    kind: "footwear",
    silhouette: "Sneakers",
    department: "Men",
    collection: "Heritage Archive",
    price: 2799,
    mrp: 3699,
    rating: 4.95,
    reviewCount: 630,
    isBestSeller: true,
    badges: [{ label: "#1 In Footwear", tone: "dark" }],
    colorways: [
      { name: "Off-White / Cream", hex: "#F4F2EE" },
      { name: "Warm Sand", hex: "#DFDCD5" },
    ],
    gallery: [
      {
        src: img("AB6AXuB-dh4CVIU4rGHb83BrokMKAVnD9VPg2RAhnZYn4nGivJzz4JVI1to1E_C1rZWsHyqfcv-NJM3Vpo-zBcf5rcFLd1B0NXOMMPHtHg_VCnfrm_EQAQLEJpKE6PJm1M1AdhD9Yptf7Xy7iN9XSv4P8OOHGSH-TtX3OqdEJzlaF6AqAEstntWVJL2HtlxF0cI4qnkFZa5cYq-YSbo_65GMeQRcY-AiGRj39MtNSvkSSqi9PQ-b0ASxnioo6w"),
        alt: "Monochrome Heritage Low Runner in off-white nappa on white",
        caption: "Profile",
      },
      {
        src: img("AB6AXuDVMB7SDmg3N13zpljqsMVqRSQQYudN21UYtXkxb8wCCBKTGbKeKyJ4u-OLx1uN0WYZSYEi-7YloNPOYB2yYecNHwZDNeS9yndxxFWk8icXF_kpavQqeH4Hr4OycAZCaniPaCJA0P01YxL7uWFUN_ZAOKwQh9weTEbbHIiVmKeIR2VNDiMHwZLR2VbQzm219iBPWIW0kjMtXsOe72_dV-ND0-Hkn-Tx7AkWLgMezehp0kQybPTEMhYOkQ"),
        alt: "Retro low-top court trainer with beige accents",
        caption: "Lateral",
      },
    ],
    sizes: [
      { label: "UK 7", stock: 6 },
      { label: "UK 8", stock: 9 },
      { label: "UK 9", stock: 15 },
      { label: "UK 10", stock: 11 },
      { label: "UK 11", stock: 7 },
    ],
    material: "Italian Calfskin",
    materials: ["Italian Calfskin", "Heavy Organic Canvas"],
    colors: ["Off-White", "Warm Sand"],
    highlights: ["Arch-Support Insole", "Breathable Nappa Upper", "Natural Rubber Sole", "Reinforced Heel"],
    specs: [
      {
        icon: "footprint",
        title: "Arch-Support Insole",
        body: "Contoured footbed wrapped in breathable nappa calfskin so the interior stays comfortable barefoot.",
      },
      {
        icon: "texture",
        title: "Nappa & Suede Panels",
        body: "Off-white nappa across the quarter panel with cream suede overlays for a soft, low-contrast finish.",
      },
      {
        icon: "circle",
        title: "Natural Rubber Sole",
        body: "Gum-washed natural rubber with a moulded pivot circle for a natural heel-to-toe transition.",
      },
      {
        icon: "verified",
        title: "Reinforced Heel Counter",
        body: "A stiff internal counter keeps the rear profile from collapsing through the life of the shoe.",
      },
    ],
    care: [
      { step: "Step 01", title: "Brush The Overlays", body: "Suede and nappa need different tools — use the horsehair brush on suede and a soft cloth on nappa." },
      { step: "Step 02", title: "Neutral Cream", body: "A beeswax-based neutral cream every 4-6 weeks keeps off-white from yellowing at the flex point." },
      { step: "Step 03", title: "Cedar Shoetrees", body: "Insert cedar trees between outings to absorb moisture and hold toe-spring alignment." },
    ],
    reviews: [
      {
        author: "Farhan Ali",
        rating: 5,
        quote: "620 buyers cannot be wrong. The off-white stays off-white and the arch support is genuinely there.",
        meta: "Ordered: UK 9 • Off-White / Cream",
      },
    ],
  },
  {
    id: "p-06",
    slug: "strata-perforated-slip-on",
    name: "Strata Perforated Slip-On",
    variant: "Warm Sand / Cloud White",
    descriptor: "Perforated Slip-On With Memory Collar",
    sku: "STS-SLP-06SD",
    kind: "footwear",
    silhouette: "Sneakers",
    department: "Unisex",
    collection: "Everyday Uniform",
    price: 2899,
    mrp: 3999,
    rating: 4.79,
    reviewCount: 240,
    badges: [{ label: "All Day Fit", tone: "neutral" }],
    colorways: [
      { name: "Warm Sand", hex: "#D6CCBE" },
      { name: "Jet Black", hex: "#1C1B1B" },
    ],
    gallery: [
      {
        src: img("AB6AXuBPrtsbbXTuxuxFZVjgnpiDoI-PXhuKtmqkD_jvHtHMgtlRVc7I-OeU6NJQSYRBzBOtz25j2Wh0gI65EP09rXs98IvRSHBpBLid8h8zf4jHwOmZCy1jGQza0wF2mpyT6GM_D3ldc1L8zsNLzPJJyBJGWck4LVTttaqtC4eB5pb9ZOy2ddaSFs48vwKxwtbtoZRC8qstI8Ip-9PAJyBGnKUnBz0sWyMP_pKXJGDkeYMqg6KuBTEsKXtqQg"),
        alt: "Warm sand perforated slip-on sneaker with vulcanized cupsole",
        caption: "Profile",
      },
      {
        src: img("AB6AXuC4TXsBnMO_UWTHJ5NulZFiDTf6isA74MtmVj6QdVOOG1BjJXDblwRBFSRWQNNQxIs21HacIzOcvA_5NZh7TZxMgKYBRqHdy7rDNiJWeXhYgu5fmQGGn9ZebKYFkQMf-I2HDx525c5VoV-tG7Tx9ZEZQcEFJ2gWaTs0GJqioq4xJDj7_OiGeOpGXvlnGDu2Es9rokBbcu_m2V4Oj0leo_CGHLWsOLvY0awLl3m_6wg2wVD3UgxyCkn1Ww"),
        alt: "Sand taupe slip-on sneaker from perforated Italian suede",
        caption: "Lateral",
      },
    ],
    sizes: [
      { label: "UK 6", stock: 5 },
      { label: "UK 7", stock: 7 },
      { label: "UK 8", stock: 10 },
      { label: "UK 9", stock: 12 },
      { label: "UK 10", stock: 8 },
      { label: "UK 11", stock: 4 },
    ],
    material: "Italian Calfskin",
    materials: ["Italian Calfskin", "Breathable Supima Mesh"],
    colors: ["Warm Sand", "Jet Black"],
    highlights: ["Elasticated Gussets", "Memory Foam Collar", "Perforated Ventilation", "Vulcanized Cupsole"],
    specs: [
      {
        icon: "all_inclusive",
        title: "Elasticated Gussets",
        body: "Side gussets let you slip the shoe on without loosening a single lace — genuinely one-handed.",
      },
      {
        icon: "memory",
        title: "Memory Foam Collar",
        body: "A moulded memory collar takes the shape of your heel within a few wears and holds it thereafter.",
      },
      {
        icon: "air",
        title: "Perforated Ventilation",
        body: "Laser perforation across the vamp moves heat without compromising the clean upper line.",
      },
      {
        icon: "anchor",
        title: "Vulcanized Cupsole",
        body: "A low-profile cupsole keeps the shoe visually light and flexible enough to pack flat for travel.",
      },
    ],
    care: [
      { step: "Step 01", title: "Wipe The Perforations", body: "Use a soft dry cloth so grit does not work its way through the perforations into the lining." },
      { step: "Step 02", title: "Spot Clean Only", body: "Clean the upper with a damp cloth and mild soap — the elastic gussets should not be soaked." },
      { step: "Step 03", title: "Air Out The Collar", body: "Let the memory collar air out between wears so it fully returns to its moulded shape." },
    ],
    reviews: [
      {
        author: "Meera Joshi",
        rating: 5,
        quote: "Elasticated collar with memory cushioning for effortless transit — exactly as described. Airport security speed.",
        meta: "Ordered: UK 8 • Warm Sand",
      },
    ],
  },
  {
    id: "p-07",
    slug: "veloce-carbon-knit-trainer",
    name: "Veloce Carbon Knit Trainer",
    variant: "Stealth Carbon / Acid Accent",
    descriptor: "Technical Carbon Knit Race-Day Trainer",
    sku: "STS-RUN-07SL",
    kind: "footwear",
    silhouette: "Running Trainers",
    department: "Men",
    collection: "Performance Lab",
    price: 3299,
    mrp: 4499,
    rating: 4.85,
    reviewCount: 145,
    isNew: true,
    badges: [{ label: "New Drop", tone: "dark" }],
    colorways: [
      { name: "Stealth Carbon", hex: "#1B1C1D" },
      { name: "Graphite", hex: "#404754" },
    ],
    gallery: [
      {
        src: img("AB6AXuBnWKLqyo5wR-oKySH4MAg6AAIqsI35QbZHRy27MYkWPL-4jh-48KJTqkJMqcXYz2U_TbPR5c5F5W-dXNWV5sfDy7HovZoJd_lixOx-a_XeXhL0NFXL3CvIMwQSQhaELDqKOExjd22WbQZSzmQGbRQeYAOody0Wn-Ql8khTFdI3bH6IhknCe0C_YCkAqVUpzW4fbUzhvzz_xlDU6aqRw72JGICEBwSV142Hz8Cmg-c8arWWk5Q8gO9w1g"),
        alt: "Technical black carbon knit trainer with acid-lime accents",
        caption: "Profile",
      },
    ],
    sizes: [
      { label: "UK 7", stock: 4 },
      { label: "UK 8", stock: 6 },
      { label: "UK 9", stock: 8 },
      { label: "UK 10", stock: 7 },
      { label: "UK 11", stock: 3 },
    ],
    material: "Breathable Supima Mesh",
    materials: ["Breathable Supima Mesh", "High-Rebound EVA Foam"],
    colors: ["Stealth Carbon", "Graphite"],
    highlights: ["Carbon Monofilament Upper", "Acid Pull Tab", "Race-Day Geometry", "Reflective Underlay"],
    specs: [
      {
        icon: "science",
        title: "Carbon Monofilament Upper",
        body: "A monofilament yarn is knitted into the upper for controlled stretch and long-term shape retention.",
      },
      {
        icon: "key",
        title: "Acid Pull Tab",
        body: "A high-visibility acid-green pull tab doubles as a reflective accent and an easy on/off grip.",
      },
      {
        icon: "speed",
        title: "Race-Day Geometry",
        body: "A 40mm stack with a 6mm drop tuned for tempo work and recovery days rather than pure sprinting.",
      },
      {
        icon: "dark_mode",
        title: "Reflective Underlay", body: "A reflective underlay sits beneath the knit so the shoe is visible in low light without looking reflective in daylight." },
    ],
    care: [
      { step: "Step 01", title: "Remove The Shoetrees", body: "Take out any foam inserts before washing so the upper is not held in a stretched shape." },
      { step: "Step 02", title: "Mesh Bag Wash", body: "Use a mesh laundry bag on a 30°C delicate cycle to protect the carbon monofilament structure." },
      { step: "Step 03", title: "Reshape The Tongue", body: "Pull the tongue forward and reshape by hand while drying so the collar does not crease." },
    ],
    reviews: [
      { author: "Karan Sethi", rating: 5, quote: "Fastest tempo session I have had in a neutral trainer. The carbon upper holds its shape perfectly.", meta: "Ordered: UK 9 • Stealth Carbon" },
    ],
  },
  {
    id: "p-08",
    slug: "architect-chelsea-boot",
    name: "Architect Chelsea Boot",
    variant: "Oiled Charcoal Nubuck",
    descriptor: "Oiled Nubuck With Black Crepe Sole",
    sku: "STS-BOOT-08CH",
    kind: "footwear",
    silhouette: "Chelsea Boots",
    department: "Men",
    collection: "Atelier Series",
    price: 4199,
    mrp: 5999,
    rating: 4.92,
    reviewCount: 88,
    badges: [{ label: "Premium", tone: "muted" }],
    colorways: [
      { name: "Oiled Charcoal", hex: "#2A2C30" },
      { name: "Dark Tan", hex: "#52443C" },
    ],
    gallery: [
      {
        src: img("AB6AXuC3aK1OAJgxWZcP_pKOTBFD0tR92Ix5BlItRVUUZ__jBsd_aFHlP3fG1wnmjFaPXV2JAPmImGaWWJ83bkYaE3ztETntzjJrUcf6HlMogSx_gu_X-XK421e0FOlFpQAJR4NfybUvK4XQIeGJHDbzpuAfCK6WdyLyh5WMQpvpmeM3Xjv98u7Vk_fYDaQcVQC-NB6IQ7HCZPWUxlpx2qb81lb4rnZgC2OiqwYqdTh7J2zJnIjyq5Iwp8744A"),
        alt: "Architect Chelsea boot in oiled charcoal nubuck with crepe sole",
        caption: "Profile",
      },
    ],
    sizes: [
      { label: "UK 7", stock: 2 },
      { label: "UK 8", stock: 3 },
      { label: "UK 9", stock: 5 },
      { label: "UK 10", stock: 4 },
      { label: "UK 11", stock: 1 },
    ],
    material: "Italian Calfskin",
    materials: ["Italian Calfskin", "Heavy Organic Canvas"],
    colors: ["Oiled Charcoal", "Dark Tan"],
    highlights: ["Elastomer Twin Gussets", "Crepe Outsole", "Oiled Nubuck Upper", "Storm Welt"],
    specs: [
      { icon: "link", title: "Elastomer Twin Gussets", body: "Twin elastic gussets are stitched with a tight pitch so they pull on easily yet hold their shape for years." },
      { icon: "landscape", title: "Crepe Outsole", body: "A natural crepe sole is moulded with a shallow siping pattern for grip on wet pavement." },
      { icon: "water_drop", title: "Oiled Nubuck Upper", body: "The nubuck is drum-oiled for a deep, water-resistant finish that ages into a richer tone." },
      { icon: "verified", title: "Storm Welt", body: "A storm welt stitches the upper to a storm sole, keeping light rain out of the seam." },
    ],
    care: [
      { step: "Step 01", title: "Brush Before Waterproofing", body: "Work a brass nubuck brush over the nap so the oils settle evenly before you add protector." },
      { step: "Step 02", title: "Waterproof Spray", body: "Apply a nubuck-safe protector every 6-8 weeks, more often in monsoon conditions." },
      { step: "Step 03", title: "Boot Trees Always", body: "Use boot trees between wears to hold the shaft and prevent the ankle crease from setting." },
    ],
    reviews: [
      { author: "Aditya Menon", rating: 5, quote: "Wore these through a full monsoon and not a single drop got through the seam. The crepe grip is superb on wet stone.", meta: "Ordered: UK 9 • Oiled Charcoal" },
    ],
  },
  {
    id: "p-09",
    slug: "heavy-linen-field-overshirt",
    name: "Heavy Linen Field Overshirt",
    variant: "Moss Green / Relaxed",
    descriptor: "Pre-Washed 320GSM European Flax Linen",
    sku: "STS-OVR-09MO",
    kind: "apparel",
    silhouette: "Overshirts",
    department: "Men",
    collection: "Everyday Uniform",
    price: 2199,
    mrp: 2899,
    rating: 4.88,
    reviewCount: 380,
    isBestSeller: true,
    badges: [{ label: "Essential Fit", tone: "dark" }],
    colorways: [
      { name: "Moss Green", hex: "#4A5840" },
      { name: "Charcoal", hex: "#3A3A3C" },
      { name: "Ecru", hex: "#DCD3C4" },
    ],
    gallery: [
      {
        src: img("AB6AXuA_ahABbMfk1Z2sCLgeav1-gnxUs6Xz4rqSV918uIYu5t2eXPo-CFTmqnjvib3OUtjyHPhWz8RRIrFjWHS6z7nnhv_0SiyuMQSsFa3d8pl9lfLo7n5fb9QWUzbneIfjxU4iSlN-1mfmR-xS9qqHhqoEBIVI8jZIia5cyDentZ7MPRkRJHCdT3TSp5l3OaB4SES4vdgoLzTftCfRf_M_6JbXf6pVHaGFkfG7I3QHAm-RzbxRO4KKJfXMgw"),
        alt: "Charcoal linen chore overshirt buttoned casually",
        caption: "Detail",
      },
      {
        src: img("AB6AXuDMBvVjHbbaaPkqNLAeietRXIHCss7wRkGKFPBjrCryBxjXW-jPhlyI7DDpEnWtZ0gMRQCjDMcAzylmMJ2gApkXfMxwvc5W1fpLBm-5-orIvshMJnvkULLeo9TAwWHwZ0IPez2ilFIcxFT4D1StGrlY85pidot-t0aL7Fg3nrvUXS5jNkEYyGf9vTBVKfs6JrOS4iEbGVGD-mAy0Zoyqe6nIhr4SbyEHoUXM4KvYVEK0YrY3pqrQ0sB5w"),
        alt: "Structured heavyweight linen overshirt folded on a stone pedestal",
        caption: "Flat Lay",
      },
    ],
    sizes: [
      { label: "S", stock: 6 },
      { label: "M", stock: 11 },
      { label: "L", stock: 9 },
      { label: "XL", stock: 4 },
    ],
    material: "Heavy Organic Canvas",
    materials: ["Heavy Organic Canvas"],
    colors: ["Moss Green", "Charcoal", "Ecru"],
    highlights: ["Zero-Shrink Pre-Wash", "Structured Drape", "Corozo Buttons", "Garment Dyed"],
    specs: [
      { icon: "straighten", title: "Zero-Shrink Pre-Wash", body: "The cloth is fully relaxed and pre-washed before cutting, so the size you buy is the size it stays." },
      { icon: "architecture", title: "Structured Drape", body: "A 320GSM weave holds the shoulder line and does not billow the way generic linen does." },
      { icon: "radio_button_checked", title: "Corozo Buttons", body: "Tagua-nut corozo buttons age alongside the garment instead of cracking like plastic." },
      { icon: "palette", title: "Garment Dyed", body: "Dyed as a finished garment for a softer, lived-in surface from the very first wear." },
    ],
    care: [
      { step: "Step 01", title: "Cold Wash", body: "30°C, gentle cycle, with like colours. Mild detergent only." },
      { step: "Step 02", title: "Line Dry", body: "Line dry out of direct sun to keep the olive tone from fading unevenly." },
      { step: "Step 03", title: "Steam, Don't Press", body: "A handheld steamer relaxes creases without crushing the weave's natural texture." },
    ],
    reviews: [
      { author: "Kavya Singhania", rating: 5, quote: "The drape is sublime. It does not billow like generic linen; there is a real architectural weight to the textile.", meta: "Ordered: M • Moss Green" },
    ],
  },
  {
    id: "p-10",
    slug: "crisp-oxford-supima-shirt",
    name: "Crisp Oxford Supima Shirt",
    variant: "Eggshell White / Relaxed Fit",
    descriptor: "Wrinkle-Resistant Supima Cotton Oxford",
    sku: "STS-SHT-10EG",
    kind: "apparel",
    silhouette: "Shirts",
    department: "Men",
    collection: "Everyday Uniform",
    price: 1899,
    mrp: 2499,
    rating: 4.8,
    reviewCount: 265,
    badges: [{ label: "Wrinkle Free", tone: "neutral" }],
    colorways: [
      { name: "Eggshell White", hex: "#F2EFE7" },
      { name: "Sky Stripe", hex: "#BFD3E3" },
    ],
    gallery: [
      {
        src: img("AB6AXuACn-_cap6CNqMtrW2bkqBp9d1tyKSCGeiJ2qnZFbLW5vTZe1k9oOinS1YdjlOsTWa03UNqlwemZLWMoMRVgWeVHriFf57VpCj6fBRGqZER00agSoJcsqd6Z5Co2WzTMWciXpvVRKyVXbXW86qGOZppspj8V6r8i14TeoU-e3jZmfkCQ1YRQsT5G7jSk3zapYcdC0fmn-y-PK6bHuv9gwyNWea5TepTFjYYCKdx8PvrzU_xmiI2vkGW6A"),
        alt: "Tailored white Supima Oxford shirt folded on a linen background",
        caption: "Flat Lay",
      },
    ],
    sizes: [
      { label: "S", stock: 8 },
      { label: "M", stock: 12 },
      { label: "L", stock: 10 },
      { label: "XL", stock: 5 },
    ],
    material: "Heavy Organic Canvas",
    materials: ["Heavy Organic Canvas", "Breathable Supima Mesh"],
    colors: ["Eggshell White", "Sky Stripe"],
    highlights: ["Wrinkle-Resistant Weave", "Supima Long Staple", "Relaxed Cut", "Mother-of-Pearl Buttons"],
    specs: [
      { icon: "auto_awesome", title: "Wrinkle-Resistant Weave", body: "A high-twist Supima yarn is woven tight so the shirt recovers on its own after a packed day." },
      { icon: "content_cut", title: "Supima Long Staple", body: "Extra-long staple fibres resist pilling, so the collar keeps its roll wash after wash." },
      { icon: "checkroom", title: "Relaxed Cut", body: "A slightly dropped shoulder and roomier body make it equally good untucked or tucked." },
      { icon: "brightness_6", title: "Mother-of-Pearl Buttons", body: "Sustainably harvested mother-of-pearl buttons are cross-stitched for a secure closure." },
    ],
    care: [
      { step: "Step 01", title: "Unbutton The Collar", body: "Always unbutton the top button and collar before washing to reduce creasing at the band." },
      { step: "Step 02", title: "Wash Then Hang", body: "Hang immediately on a wide hanger while damp to let the body drop out naturally." },
      { step: "Step 03", title: "Iron The Collar Last", body: "Press the collar and cuffs last, using a cloth barrier to avoid a shine on the poplin." },
    ],
    reviews: [
      { author: "Tarun Bedi", rating: 5, quote: "Survives a 14-hour flight and a conference day without a single visible crease.", meta: "Ordered: M • Eggshell White" },
    ],
  },
  {
    id: "p-11",
    slug: "architect-tapered-chinos",
    name: "Architect Tapered Chinos",
    variant: "Muted Olive / Comfort Waist",
    descriptor: "4-Way Stretch Tapered Twill Chinos",
    sku: "STS-CHN-11OL",
    kind: "apparel",
    silhouette: "Trousers",
    department: "Men",
    collection: "Everyday Uniform",
    price: 1599,
    mrp: 1999,
    rating: 4.7,
    reviewCount: 198,
    badges: [{ label: "Tailored Fit", tone: "muted" }],
    colorways: [
      { name: "Muted Olive", hex: "#5A6349" },
      { name: "Charcoal", hex: "#3B3C3E" },
      { name: "Sandstone", hex: "#C4B49B" },
    ],
    gallery: [
      {
        src: img("AB6AXuDp9I2SJbMff2ZCzJAtFPf9nlqHvuN_VnaTEY__--ev3BjL84p7BwrCjJRrINr7ALJPH2wj47VDsTBdF4DzdjRJKjkwedA13UcBEr74xv0JJwjjoMIo-k5wPSGMDEmoGtZkue68m069szF1k1h96mjyQLhLRjUD71knW9w776Qh_QWpgWcwUJ4PUyOGvPE94gToeWNkr-CI9MzYb6N5IahYnxA9gkMvC3b_WGOpfQHiF9rTlNjljAC-ww"),
        alt: "Olive tailored tapered chinos laid flat on a stone backdrop",
        caption: "Flat Lay",
      },
      {
        src: img("AB6AXuDdDGLlA_u8VxnFk8H2imE01KLkMkqBCKAAfW46LV-0mRCOjg7D_LCMAbI957Ut9JfZ0WXgkTZ1bT3DdaUb8CcM5_ZHhB2uYSkhmrjTDhZRsTz_X3avAuGeYmbam_07sZkQmAl_n7e0miPo1YtnMA_WE4Tt8jx9fp0tl80qefUAU8oQJsWn5Ic4YwbNwV9xkgNw8GeXDOfFzCsGcP36H_snW5L2W2BXkLtbGa4_gNv_UUsvb31_gXe6yQ"),
        alt: "Tapered olive drab chinos showing a single front pleat",
        caption: "Detail",
      },
    ],
    sizes: [
      { label: "30", stock: 7 },
      { label: "32", stock: 13 },
      { label: "34", stock: 11 },
      { label: "36", stock: 6 },
    ],
    material: "Heavy Organic Canvas",
    materials: ["Heavy Organic Canvas"],
    colors: ["Muted Olive", "Charcoal", "Sandstone"],
    highlights: ["4-Way Stretch", "Hidden Comfort Waist", "Single Front Pleat", "Unfinished Hem"],
    specs: [
      { icon: "cyclone", title: "4-Way Stretch", body: "A small percentage of elastane blended into the twill gives real freedom of movement without losing the drape." },
      { icon: "visibility_off", title: "Hidden Comfort Waist", body: "An internal elasticated waistband replaces the usual drawstring for a cleaner, more tailored line." },
      { icon: "format_align_left", title: "Single Front Pleat", body: "One deep front pleat gives the tapered leg room to fall cleanly without pulling at the hip." },
      { icon: "content_cut", title: "Unfinished Hem", body: "The leg arrives unhemmed so a tailor can set the break to your shoe." },
    ],
    care: [
      { step: "Step 01", title: "Wash Inside Out", body: "Turn the chinos inside out to protect the twill surface from abrasion in the drum." },
      { step: "Step 02", title: "Cold Wash, Low Spin", body: "A low spin protects the stretch fibres and helps the waistband keep its recovery." },
      { step: "Step 03", title: "Steam The Pleat", body: "Hang and steam the front pleat to restore the drape after a wash." },
    ],
    reviews: [
      { author: "Varun Pillai", rating: 4, quote: "The hidden waistband is the whole point. I wear these on long travel days without any pinch.", meta: "Ordered: 32 • Muted Olive" },
    ],
  },
];

/* ---------------------------------------------------------------------------
   Editorial content
--------------------------------------------------------------------------- */

export const categories = [
  {
    title: "Men",
    eyebrow: "Essential Series",
    copy: "Tailored daily shirts, relaxed trousers, minimal sneakers",
    href: "/shoes",
    span: "md:col-span-7",
    height: "h-[420px]",
    image: img("AB6AXuBh6CD8X2edVaC9ByduWvUoJGY-af1XrnllK_YuCWI1FOa0L4K0hLLOmW3fsaghtow0nnucfEQct_rMe0itsQ_qyKhmqGdYy1w0LcWjvW49TO2kqxS6S5a52glpJ1h9muUsoQpZkGrd20k6BTS6K7EEoJX1qq8lLy4DDWNGZS3q3noNUuKaExsg2OY3ABj7b9CauncdIqKYZQYTPO8f05nPtnGHMvJ4gfVb3JjR89uHbhWkWpBnv0sZ_w"),
    alt: "Model in an architectural interior wearing an olive linen shirt and cream leather shoes",
    showArrow: true,
  },
  {
    title: "Women",
    eyebrow: "Modern Uniform",
    copy: "Contemporary footwear, crisp linen, curated daily wear",
    href: "/shoes",
    span: "md:col-span-5",
    height: "h-[420px]",
    image: img("AB6AXuAelG6jZbcCGsRHH6n4TrPImlgSPspi0v7CDs7aJkX39J5QTD23ohc3pvKzVbDBEE3Nnw1ScZeIoHj0p_3u2XkI4zxNZ_6qsLOiXpnglgmhrWeQKFqm8q9dPLqTdRwvWFPXCRq7JnGdFXinXSvkVvje42CICW4qvR3nS1iwjBnK844YzxxIgi--hoVgpgyZZrmW8It2hlTNrhCi59I_jy8F8LQYAwofZ2V9gE9c5Yf07AAMIEPw05GldA"),
    alt: "Woman in a beige poplin shirt and tailored cigarette trousers with monochrome sneakers",
    showArrow: true,
  },
  {
    title: "Shoes",
    eyebrow: "Signature Soles",
    copy: "Signature sneakers, dress loafers, sport runners",
    href: "/shoes",
    span: "md:col-span-4",
    height: "h-[360px]",
    image: img("AB6AXuB85NKr-E1oQgG6TBz1W7dOweXGCUw6e7ZSzNRbZ9xcO6DCmx3IUugNJcWLtu5CvxZjStTEtUE9ayqVd8tq3w8o7pE-gCLiMCTpUjtFKuAzZzFAMhuMTyjGRrLzEPsq0X4KVxv-5w-bDzIfG1Slh1t_SGDqaxpyYcSCUFfy0EKCt0kND-stmCCfrFiSOnmahtmNCwsKoPHNkcv4OOELRfVYu5-1T_NcWcpq2Rv8--tFVpPMcM7NzqNVjQ"),
    alt: "Pair of pristine white handcrafted leather low-top sneakers on a concrete plinth",
    showArrow: false,
  },
  {
    title: "Clothing",
    eyebrow: "Apparel Engineering",
    copy: "Ultra-breathable tees, tailored denim & chore coats",
    href: "/shoes",
    span: "md:col-span-4",
    height: "h-[360px]",
    image: img("AB6AXuCSCSMgDR6gLUzwNsR-tVHphMNLLssRWsaz5xvpA05lLZXU5mgO4RgYkj6ifAzpkP6P3l9V6JoVBaEGyB5agF11LiLiC9W0lcv6yOHLO-Wt-F8qupz24Bo_bSrxJdVikEVY8BSdHO4EywuOr2oeqkde88vQ0bb_EcLxC6E-qNtFDtdLLtFt8m0rY3gn5rtum2u19t7R3qeE1B4yYGs4Xw2v6ALy5-sNNknrwkAdCnYyZxVqV5mTE_MJVQ"),
    alt: "Rack of heavyweight supima cotton t-shirts, chore jackets and washed denim",
    showArrow: false,
  },
  {
    title: "Sneakers",
    eyebrow: "Performance Lab",
    copy: "Limited drops, classic retros, cloud foam trainers",
    href: "/shoes",
    span: "md:col-span-4",
    height: "h-[360px]",
    image: img("AB6AXuAsjDreRJJCLZT-1txO_qXHwjGm-ydJt1V2fBbuzGilUcO1hnP7aVHUWvUKV8eKvx5vXkOy931uT94yu7Fky8MF3XgxuBURr8AEt_AAtka5OSMqv8TmupLod6lgh0eY-w5ic_mwWudf3OANM05PyRN0Y-za-nbYCMcixqHL0yvJV0iQaJzNsgn4SnUZ1Gszhum24UIucnJEnab41aBhIEOULA4nGBZ6I8R3bRpZeMzpmvOTdJjd51Yycg"),
    alt: "Technical runner sneaker with aerodynamic details and cobalt micro accents",
    showArrow: false,
  },
] as const;

export const heroImage = {
  src: img("AB6AXuBk240ymvNeVL43D9cT2r9Yp7bd7CVyoZ9eRcupKipOTKP53Lx2plc6-cyP1DRFLSxr83VO43zSdmMzL8SQWNT1_N7M8WZYxtb8OwMWuq1qGOMzNXrE5whoVY-g2du1iMR5f9ezibIECryU-uP21wOHile16G63h5MeIHQlT7NVx2kYbcarIgyPlvdm1DFTTcj9KOMtH5ow1pEHQyXuDD3s8g27u5DARNtRIqDqcP3iR0nj9S3n6NepAg"),
  alt: "STEPSTYLE editorial season drop",
};

export const heroPerks = [
  { icon: "footprint", title: "Premium Italian Sole Tech", copy: "High-density shock absorption" },
  { icon: "eco", title: "Ethically Sourced Linen", copy: "100% certified organic fibres" },
  { icon: "schedule", title: "Designed for 24/7 Comfort", copy: "From morning desk to late soirées" },
];

export const featuredSlugs = [
  "classic-minimalist-leather-sneaker",
  "aeroglide-daily-running-shoe",
  "milano-suede-penny-loafer",
  "urban-drift-foam-slide",
];

export const bestSellerSlugs = [
  "monochrome-heritage-low-runner",
  "heavy-linen-field-overshirt",
  "strata-perforated-slip-on",
];

export const uniformBundle = {
  eyebrow: "Uniform Capsule #04",
  titleTop: "Everyday Style.",
  titleBottom: "everyday",
  titleTail: "Comfort.",
  copy: "Engineered for workdays that seamlessly turn into evenings out. Wrinkle-resistant Supima cotton shirts, 4-way stretch tailored chinos, and architecturally cushioned everyday soles.",
  items: ["crisp-oxford-supima-shirt", "architect-tapered-chinos"],
  savingLabel: "Save 15%",
};

export const trustFeatures = [
  { icon: "local_shipping", title: "Free Express Shipping", copy: "Complimentary dispatch across India on all orders over ₹999." },
  { icon: "published_with_changes", title: "7-Day Instant Returns", copy: "Seamless doorstep pickup and immediate refund initiation." },
  { icon: "verified", title: "100% Certified Authentic", copy: "Ethically sourced materials and precision artisan craftsmanship." },
  { icon: "support_agent", title: "24/7 Dedicated Support", copy: "Direct priority WhatsApp sizing & concierge order assistance." },
];

export const editorialReviews = [
  {
    quote:
      "I took the Classic Minimalist sneakers straight to a 4-day design conference in Mumbai—clocked 18,000 steps daily without a single blister. They match tailored trousers just as effortlessly as selvedge denim.",
    author: "Aakash Mehta",
    role: "Architect & Creative Director",
  },
  {
    quote:
      "The drape of the linen shirt is sublime. It doesn’t billow like generic linen; there’s a real architectural weight to the textile. Customer service swapped my shoe size within 24 hours without asking ten questions.",
    author: "Kavya Singhania",
    role: "Brand Strategist",
  },
  {
    quote:
      "The Urban Drift foam slides are hands down the best recovery footwear I’ve owned. The footbed geometry supports high arches naturally. Truly elevated everyday luxury at an accessible price point.",
    author: "Rohan Chawla",
    role: "Product Lead",
  },
];

export const catalogFootnote = [
  { icon: "verified", title: "Direct Atelier Craft", copy: "We eliminate markup layers. High-grade full-grain leather footwear made accessible directly from certified craft centres." },
  { icon: "recycling", title: "Zero-Plastic Delivery", copy: "Every pair arrives in 100% recycled unbleached fibre cartons with zero polyurethane tape or redundant bubble linings." },
  { icon: "local_shipping", title: "Prompt Metro Delivery", copy: "Orders processed with priority fulfilment across Bengaluru, Mumbai, Delhi-NCR, Hyderabad within 24–48 hours." },
];

export const careAddOns = [
  {
    id: "care-spray",
    name: "Shoe Protector Spray",
    variant: "Nano hydrophobic shield (200ml)",
    price: 499,
    tag: "Shoe Care",
    image: img("AB6AXuCQBZn3D0AdQXlO5lGge7B4xyq9k5vMdCTb-h4p8WeXq3mKj6NEbgXYrfalNU6R2Pczb1JXWeAiHdm1dWEBNm2vbeugwFYfvo0yDsi1Kd5P5K8-WPBqYdxlMvQEYZQjt-4a9wYXTJLpjZ2tv_wgKQBslMFJcf14MIhNagO3dSH-nNtlrXPeziQiz_lDyhgSLsEDSbz8RbiH76STpbpILZA6zk1BmNB9zomOJxiICUbLDsm5bIaUlNfIew"),
    alt: "Matte black waterproof sneaker protector spray bottle",
  },
  {
    id: "care-socks",
    name: "Organic Cotton Socks (3-Pack)",
    variant: "Chalk, Charcoal & Sand Taupe",
    price: 599,
    tag: "Essentials",
    image: img("AB6AXuDsTgXGZi9K53kP0_KdqUevO-27ckiBMlQsa8WgK-uMlsVmrGjyKpx3BahlfmMXKc67iqsUKpxJ4NHpTZ13chMTGh09gVU_4rwuA4m-npocxmKclNNYfPz_9cAPRVYAZ7x8Y9C45xE0Cn5rEoz7W60-5swWxSwO_E9n97AD6zo2SSBXXMH0HANvVdvUxfMcMt2XF1imXg_rqS0V7vOd82YfScFnEhliTDiphp5LgW3AwlCD7Yu1ro52sg"),
    alt: "Three folded pairs of organic ribbed cotton socks in neutral tones",
  },
  {
    id: "care-brush",
    name: "Suede & Leather Brush",
    variant: "Crafted natural horsehair bristles",
    price: 299,
    tag: "Shoe Care",
    image: img("AB6AXuB7boSMOs-xUEdEgfimZl0PMMdNjLHcVcv5HMYqtNQqoNPJ3zyBJ9Qz1dSX0myAVUzy-Nim7g3z4tKPYui41WDWnflBU8G9kpM6AIE2pd4w00GSDzvKhWiVouQSDIemAKD1q1zZYkU4VhH5mhT-hJ4MMfGvxIDb1NvBa3Jzy0LV29OWCtV84680KGDrb4Z4C0f6ssAyoeo937kijEhNNOLLWo3o5SUW_iLW47aDfPBAfn2d0IY1rMP_5A"),
    alt: "Solid beechwood and horsehair sneaker cleaning brush",
  },
] as const;

export const completeTheLook = {
  eyebrow: "Curated Uniform",
  title: "Complete The Look",
  badge: "Bundle Discount: Save ₹800 instantly",
  addons: ["crisp-oxford-supima-shirt", "architect-tapered-chinos"],
  bundleSaving: 800,
};

export const recentlyViewed = [
  {
    slug: "urban-drift-foam-slide",
    department: "Footwear",
    name: "Blackout Stealth Nappa Low",
    price: 2699,
    image: img("AB6AXuCSJtKlA8gs1VZRPIjhvs0SD9t9ONHdMpau8jo6RhiieeyVA61DhNgYjcTBOSRmUcqGKj6a9VW9BxjkNExRSE3sqKb-mzoz_qeupEcDcF9rAlSU8tsa-GDnLp5q0L6B_5gQnEbXJ0bmvUZkLWqwDj7vfPas3ns1_jwBPs259kdtQYZK-h-adbcO1MmxNsLUHIVcPpZMTbTAHnrxBGvJ3t-o_RJCGYVRWIt3pstf30Eezr5tCCwY0H2GNg"),
    alt: "Monochrome deep jet black nubuck low-top sneaker",
  },
  {
    slug: "milano-suede-penny-loafer",
    department: "Footwear",
    name: "Desert Taupe Suede Trainer",
    price: 2799,
    image: img("AB6AXuAHEi2DGeYLT5G1kAwftO6YXymET4BSk_iLsRJohkHagx-A9qMn2TUWP57tPeleK6RKCEwoJB-dWwigtsvaPEsdPXkoZe8_EyIzqTSeGE7PBrLdCkKsrlZ6TP1rHFm6uLrcMkSXSoX71Dj9nN3RDWmcNPbseB-2qE-s_5C4ZHA-8RSqwrPGMMCczlCNwe5d2JTAO20jFw36ANKg6BDlHnbBwX8vQBcxjuAV_MTRc7-nCQuTM6VBWCeFyw"),
    alt: "Warm desert sand suede minimalist low profile trainer",
  },
  {
    slug: "veloce-carbon-knit-trainer",
    department: "Footwear",
    name: "Court Minimalist - Navy Tab",
    price: 2499,
    image: img("AB6AXuBFkXD5ptrVuYWhyusc4a-dSWZ-vgy3o72IZdZ3EqEIxzpcTJH_bhGJsqDqK7HqpMkVOiFQhnTMMmiuLAcAxa9KxOq00gnptNxzO03DTkxv8jycHMTQs7i4-b7vgXwWDbMWB_NSm_XafVl7eUkYD_lplNkwbrM1S_1DPVdNwaY64dN4mnMm2Yge9rhhY39KYKUZbjJMrsuqylpPnrAcbBzsCfmmH6YD3-rVvBXq4uFEbVFMY06-umWjkA"),
    alt: "Clean minimal court sneaker with a navy blue nappa back tab",
  },
  {
    slug: "heavy-linen-field-overshirt",
    department: "Apparel",
    name: "450GSM Organic Loopback Crew",
    price: 1799,
    image: img("AB6AXuDQcVr7L4S8611THJEI0zQKG51y11NCmLRKYerj4go_Ex-HUIM1wpC1ri-sleXWwAGgsVrtTQsdJvO2VxI1-A0ltuB8P_f_KelbWDkanJGFRD4m7xavgvMNlhmpqL44U-zCcRvXz6EZme_ZG4kcg3xahCJg8K7zoaiitwHCafwjVDT_SkkNLi-DuWviODo3HYpG7V58Xy8isFh_iK67K6rTnNlzBrKyWRrkBrvDXF27BklfGlB4_6g-vw"),
    alt: "Heavy organic loopback cotton oversized crewneck sweater",
  },
] as const;

export const sizeChart = [
  { uk: "UK 6", cm: "25.0 cm", us: "US 7.0", eu: "EU 40" },
  { uk: "UK 7", cm: "25.8 cm", us: "US 8.0", eu: "EU 41" },
  { uk: "UK 8", cm: "26.6 cm", us: "US 9.0", eu: "EU 42" },
  { uk: "UK 9", cm: "27.5 cm", us: "US 10.0", eu: "EU 43" },
  { uk: "UK 10", cm: "28.3 cm", us: "US 11.0", eu: "EU 44" },
  { uk: "UK 11", cm: "29.1 cm", us: "US 12.0", eu: "EU 45" },
];

/* Facet definitions drive both the sidebar counts and the filter chips.
   Every facet starts unselected so the catalog lands on the full rotation —
   set `defaultOn: true` on a facet to make it part of the landing view. */
export const catalogFilters = {
  departments: [
    { label: "Men", count: 32, defaultOn: false },
    { label: "Women", count: 24, defaultOn: false },
    { label: "Unisex Standard", count: 16, defaultOn: false },
  ],
  silhouettes: [
    { label: "Sneakers", count: 28, defaultOn: false },
    { label: "Penny Loafers", count: 7, defaultOn: false },
    { label: "Running Trainers", count: 9, defaultOn: false },
    { label: "Everyday Slides", count: 4, defaultOn: false },
    { label: "Chelsea Boots", count: 3, defaultOn: false },
    { label: "Overshirts", count: 6, defaultOn: false },
  ],
  sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12", "UK 13"],
  colors: [
    { name: "Triple White", hex: "#F8F9FA" },
    { name: "Jet Black", hex: "#111111" },
    { name: "Earth Taupe", hex: "#B89F8A" },
    { name: "Slate Grey", hex: "#585F6C" },
    { name: "Olive Drab", hex: "#4A5840" },
    { name: "Navy Cobalt", hex: "#1B2B48" },
  ],
  materials: [
    { label: "Italian Calfskin", count: 19 },
    { label: "Breathable Supima Mesh", count: 14 },
    { label: "Heavy Organic Canvas", count: 8 },
    { label: "High-Rebound EVA Foam", count: 7 },
  ],
  sortOptions: ["Recommended", "Newest First", "Price: Low to High", "Price: High to Low", "Top Rated"],
};

export const promo = {
  code: "FIRSTSTEP10",
  label: "10% Welcoming Discount Applied",
  threshold: 999,
  deliveryFee: 149,
};

/**
 * Store WhatsApp — the whole checkout hands off here, so the number is the
 * single point of failure for taking an order. `wa.me` only accepts E.164
 * digits: no `+`, spaces or dashes, and the country code is mandatory (a bare
 * 10-digit number will not resolve).
 */
export const whatsapp = {
  phone: "918547287811",
  display: "+91 85472 87811",
};

export const navItems = [
  { label: "Men", href: "/shoes" },
  { label: "Women", href: "/shoes" },
  { label: "Shoes", href: "/shoes" },
  { label: "Clothing", href: "/shoes" },
  { label: "Accessories", href: "/shoes" },
  { label: "New Arrivals", href: "/shoes?tab=new" },
  { label: "Best Sellers", href: "/shoes?tab=featured" },
  { label: "Sale", href: "/shoes?tab=sale", flag: "-30%" },
];

export const footerColumns = [
  {
    heading: "Shop",
    links: [
      { label: "Men's Footwear & Apparel", href: "/shoes" },
      { label: "Women's Footwear & Apparel", href: "/shoes" },
      { label: "Technical Sneakers", href: "/shoes" },
      { label: "Everyday Uniform", href: "/shoes" },
      { label: "Seasonal Drops", href: "/shoes" },
    ],
  },
  {
    heading: "Customer Care",
    links: [
      { label: "Track Order", href: "/cart" },
      { label: "Shipping & Delivery", href: "/shoes" },
      { label: "Returns & Exchanges", href: "/shoes" },
      { label: "Footwear Sizing Guide", href: "/shoes" },
      { label: "Frequently Asked Questions", href: "/shoes" },
    ],
  },
];

/* ---------------------------------------------------------------------------
   Lookups
--------------------------------------------------------------------------- */

export const productBySlug = new Map(products.map((p) => [p.slug, p]));

export function getProduct(slug: string) {
  return productBySlug.get(slug);
}

export function getProducts(slugs: string[]) {
  return slugs.map((slug) => productBySlug.get(slug)).filter((p): p is Product => Boolean(p));
}

export function getFeatured() {
  return getProducts(featuredSlugs);
}

export function getBestSellers() {
  return getProducts(bestSellerSlugs);
}

export function discountPercent(price: number, mrp: number) {
  if (!mrp || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}
