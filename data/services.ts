export interface Service {
  id: string;
  name: string;
  nameAl: string; // Albanian translation
  slug: string;
  description: string;
  descriptionAl: string; // Albanian translation
  duration: number; // minutes
  price: number;
  category: 'eyebrows' | 'lashes' | 'facials' | 'makeup' | 'hair' | 'nails' | 'other';
  images: string[];
  features: string[];
  featuresAl: string[];
  aftercare: string[];
  aftercareAl: string[];
  isPopular?: boolean;
}

export const services: Service[] = [
  // EYEBROWS & LASHES SERVICES
  {
    id: 'eyebrow-threading',
    name: 'Eyebrow Threading',
    nameAl: 'Formimi i Vetullave',
    slug: 'eyebrow-threading',
    description: 'Professional eyebrow shaping using traditional threading technique for perfect arch',
    descriptionAl: 'Formimi profesional i vetullave me teknikën tradicionale të konakut',
    duration: 30,
    price: 15,
    category: 'eyebrows',
    images: ['/images/eyes-1.jpg', '/images/eyes-2.jpg'],
    features: ['Precise shaping', 'Natural look', 'Long-lasting results', 'No chemicals'],
    featuresAl: ['Formim i saktë', 'Pamje natyrale', 'Rezultate afatgjata', 'Pa kimikate'],
    aftercare: ['Avoid touching for 2 hours', 'Apply soothing gel if needed', 'No makeup for 2 hours'],
    aftercareAl: ['Mos e prekni për 2 orë', 'Aplikoni xhel qetësues nëse nevojitet', 'Pa makeup për 2 orë'],
    isPopular: true
  },
  {
    id: 'lash-extensions',
    name: 'Eyelash Extensions',
    nameAl: 'Zgjerimi i Qerpikëve',
    slug: 'lash-extensions',
    description: 'Individual premium lash extensions for natural or dramatic volume',
    descriptionAl: 'Zgjerimi individual i qerpikëve me cilësi premium për vëllim natyral ose dramatik',
    duration: 120,
    price: 80,
    category: 'lashes',
    images: ['/images/eyes-3.jpg', '/images/eyes-1.jpg'],
    features: ['Custom volume', 'Various lengths', 'Waterproof', 'Silk or mink options'],
    featuresAl: ['Vëllim i personalizuar', 'Gjatësi të ndryshme', 'Rezistent ndaj ujit', 'Opsione mëndafshi ose mink'],
    aftercare: ['No water for 24h', 'Use oil-free products', 'Brush daily', 'Sleep on back'],
    aftercareAl: ['Pa ujë për 24 orë', 'Përdorni produkte pa vaj', 'Krehini çdo ditë', 'Flini shpinë'],
    isPopular: true
  },
  {
    id: 'lash-lift',
    name: 'Lash Lift & Tint',
    nameAl: 'Ngritja dhe Ngjyrosja e Qerpikëve',
    slug: 'lash-lift-tint',
    description: 'Natural lash enhancement with lifting and tinting for fuller appearance',
    descriptionAl: 'Përmirësimi natyral i qerpikëve me ngritje dhe ngjyrosje për pamje më të plotë',
    duration: 60,
    price: 45,
    category: 'lashes',
    images: ['/images/eyes-2.jpg'],
    features: ['Natural enhancement', 'No daily mascara needed', 'Lasts 6-8 weeks'],
    featuresAl: ['Përmirësim natyral', 'Pa nevojë për maskara të përditshme', 'Zgjat 6-8 javë'],
    aftercare: ['No water for 24h', 'No oil-based products', 'Gentle cleansing'],
    aftercareAl: ['Pa ujë për 24 orë', 'Pa produkte me bazë vaji', 'Pastrimi i butë']
  },

  // HAIR & MAKEUP SERVICES
  {
    id: 'bridal-makeup',
    name: 'Bridal Makeup',
    nameAl: 'Makeup i Nuses',
    slug: 'bridal-makeup',
    description: 'Complete bridal makeup package with trial session included',
    descriptionAl: 'Paketa e plotë e makeup-it të nuses me provë të përfshirë',
    duration: 180,
    price: 150,
    category: 'makeup',
    images: ['/images/hair-makeup-1.jpg', '/images/hair-makeup-2.jpg'],
    features: ['Trial session included', 'Long-lasting formula', 'Touch-up kit provided', 'Professional photos'],
    featuresAl: ['Sesioni i provës i përfshirë', 'Formulë afatgjatë', 'Kit për rifreskim', 'Foto profesionale'],
    aftercare: ['Use provided touch-up kit', 'Avoid oil-based cleansers', 'Remove gently'],
    aftercareAl: ['Përdorni kit-in për rifreskim', 'Shmangni pastrzuesit me vaj', 'Hiqni butësisht'],
    isPopular: true
  },
  {
    id: 'hair-styling',
    name: 'Professional Hair Styling',
    nameAl: 'Stilimi Profesional i Flokëve',
    slug: 'hair-styling',
    description: 'Expert hair styling for special occasions and events',
    descriptionAl: 'Stilimi ekspert i flokëve për raste të veçanta dhe evenimente',
    duration: 90,
    price: 60,
    category: 'hair',
    images: ['/images/hair-makeup-3.jpg', '/images/hair-makeup-4.jpg'],
    features: ['Event styling', 'Hair accessories included', 'Long-lasting hold', 'Consultation included'],
    featuresAl: ['Stilim për evenimente', 'Aksesorë flokësh të përfshirë', 'Mbajtje afatgjatë', 'Konsultim i përfshirë'],
    aftercare: ['Use recommended products', 'Gentle brushing', 'Avoid excessive heat'],
    aftercareAl: ['Përdorni produktet e rekomanduara', 'Krehje e butë', 'Shmangni nxehtësinë e tepërt']
  },
  {
    id: 'special-occasion-makeup',
    name: 'Special Occasion Makeup',
    nameAl: 'Makeup për Raste të Veçanta',
    slug: 'special-occasion-makeup',
    description: 'Glamorous makeup for parties, photoshoots, and special events',
    descriptionAl: 'Makeup i shkëlqyer për festa, foto sesione dhe evenimente të veçanta',
    duration: 90,
    price: 70,
    category: 'makeup',
    images: ['/images/hair-makeup-5.jpg', '/images/hair-makeup-1.jpg'],
    features: ['Custom look design', 'High-quality products', 'Photo-ready finish', 'Color matching'],
    featuresAl: ['Dizajni i personalizuar', 'Produkte me cilësi të lartë', 'Përfundim gati për foto', 'Përputhje ngjyrash'],
    aftercare: ['Blot excess oil gently', 'Use setting spray', 'Touch up as needed'],
    aftercareAl: ['Thithni vajin e tepërt butësisht', 'Përdorni spray fiksues', 'Rifreskoni sipas nevojës']
  },

  // FACIAL SERVICES
  {
    id: 'deep-cleansing-facial',
    name: 'Deep Cleansing Facial',
    nameAl: 'Facial i Thellë Pastërzues',
    slug: 'deep-cleansing-facial',
    description: 'Comprehensive facial treatment for deep pore cleansing and skin rejuvenation',
    descriptionAl: 'Trajtim facial i plotë për pastrimin e thellë të poreve dhe rigjenerimin e lëkurës',
    duration: 75,
    price: 65,
    category: 'facials',
    images: ['/images/shop-1.jpg'],
    features: ['Deep pore cleansing', 'Exfoliation', 'Hydrating mask', 'Facial massage'],
    featuresAl: ['Pastrimi i thellë i poreve', 'Eksfolimi', 'Maskë hidratuese', 'Masazh facial'],
    aftercare: ['Use gentle cleanser', 'Apply sunscreen daily', 'Moisturize regularly'],
    aftercareAl: ['Përdorni pastrues të butë', 'Aplikoni kremë dielli çdo ditë', 'Lagështoni rregullisht']
  },
  {
    id: 'anti-aging-facial',
    name: 'Anti-Aging Facial',
    nameAl: 'Facial Anti-Aging',
    slug: 'anti-aging-facial',
    description: 'Advanced anti-aging treatment with collagen boost and wrinkle reduction',
    descriptionAl: 'Trajtim i avancuar anti-aging me stimulim kolagjeni dhe reduktim rrudhash',
    duration: 90,
    price: 85,
    category: 'facials',
    images: ['/images/shop-2.jpg'],
    features: ['Collagen stimulation', 'Fine line reduction', 'Skin firming', 'Luxury serums'],
    featuresAl: ['Stimulimi i kolagjenit', 'Reduktimi i vijave të holla', 'Përforcimi i lëkurës', 'Serum luksoze'],
    aftercare: ['Avoid sun exposure', 'Use anti-aging products', 'Stay hydrated'],
    aftercareAl: ['Shmangni ekspozimin ndaj diellit', 'Përdorni produkte anti-aging', 'Qëndroni të hidratuar']
  },

  // ADDITIONAL SERVICES
  {
    id: 'consultation',
    name: 'Beauty Consultation',
    nameAl: 'Konsultim Bukurie',
    slug: 'beauty-consultation',
    description: 'Personalized beauty consultation to determine the best treatments for you',
    descriptionAl: 'Konsultim i personalizuar bukurie për të përcaktuar trajtimet më të mira për ju',
    duration: 30,
    price: 0,
    category: 'other',
    images: ['/images/shop-3.jpg'],
    features: ['Skin analysis', 'Treatment recommendations', 'Product advice', 'Personalized plan'],
    featuresAl: ['Analiza e lëkurës', 'Rekomandime trajtimi', 'Këshilla produktesh', 'Plan i personalizuar'],
    aftercare: ['Follow recommended routine', 'Book follow-up appointment', 'Track progress'],
    aftercareAl: ['Ndiqni rutinën e rekomanduar', 'Rezervoni takim vijues', 'Ndiqni progresin']
  }
];

export const serviceCategories = [
  { id: 'eyebrows', name: 'Eyebrows', nameAl: 'Vetullat', slug: 'eyebrows' },
  { id: 'lashes', name: 'Eyelashes', nameAl: 'Qerpikët', slug: 'lashes' },
  { id: 'makeup', name: 'Makeup', nameAl: 'Makeup', slug: 'makeup' },
  { id: 'hair', name: 'Hair Styling', nameAl: 'Stilimi i Flokëve', slug: 'hair' },
  { id: 'facials', name: 'Facials', nameAl: 'Trajtim Facial', slug: 'facials' },
  { id: 'other', name: 'Other Services', nameAl: 'Shërbime të Tjera', slug: 'other' }
];

// Helper functions
export const getServiceById = (id: string): Service | undefined => {
  return services.find(service => service.id === id);
};

export const getServicesByCategory = (category: string): Service[] => {
  return services.filter(service => service.category === category);
};

export const getPopularServices = (): Service[] => {
  return services.filter(service => service.isPopular);
};
