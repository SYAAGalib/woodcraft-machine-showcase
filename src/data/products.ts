
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  fullDescription: string;
  specifications: { [key: string]: string };
  warranty: string;
  price: string;
  images: string[];
  category: string;
  featured: boolean;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'CNC Machines',
    slug: 'cnc-machines',
    description: 'Precision Computer Numerical Control machines for automated wood cutting and shaping',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
    productCount: 3
  },
  {
    id: '2',
    name: 'Saw Mills',
    slug: 'saw-mills',
    description: 'Heavy-duty sawmill equipment for lumber processing and wood cutting operations',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop',
    productCount: 2
  },
  {
    id: '3',
    name: 'Wood Dryers',
    slug: 'wood-dryers',
    description: 'Industrial kiln dryers for efficient moisture removal from lumber',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop',
    productCount: 2
  },
  {
    id: '4',
    name: 'Edge Banders',
    slug: 'edge-banders',
    description: 'Professional edge banding machines for furniture and cabinetry finishing',
    image: 'https://images.unsplash.com/photo-1581092335878-8c7c4c3b1e1c?w=800&h=600&fit=crop',
    productCount: 2
  },
  {
    id: '5',
    name: 'Planers',
    slug: 'planers',
    description: 'Thickness planers and surface planers for smooth wood finishing',
    image: 'https://images.unsplash.com/photo-1587845216857-8296ee1b4f7b?w=800&h=600&fit=crop',
    productCount: 2
  },
  {
    id: '6',
    name: 'Sanders',
    slug: 'sanders',
    description: 'Industrial sanders for surface preparation and finishing',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop',
    productCount: 2
  }
];

export const products: Product[] = [
  // CNC Machines
  {
    id: '1',
    name: 'DW-CNC-3020 Desktop CNC Router',
    slug: 'dw-cnc-3020-desktop-router',
    description: 'Compact desktop CNC router perfect for small workshops and prototyping',
    fullDescription: 'The DW-CNC-3020 is a versatile desktop CNC router designed for precision cutting, engraving, and milling operations. Perfect for small workshops, hobbyists, and prototyping applications. Features a robust aluminum frame construction with high-precision linear guides for smooth operation.',
    specifications: {
      'Working Area': '300 x 200 x 50mm',
      'Spindle Power': '800W Water-Cooled',
      'Max Speed': '3000mm/min',
      'Resolution': '0.01mm',
      'Control System': 'Mach3/GRBL Compatible',
      'Power Supply': '110V/220V'
    },
    warranty: '2 years comprehensive warranty including parts and service',
    price: 'Request Quote',
    images: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop'
    ],
    category: 'cnc-machines',
    featured: true,
    tags: ['CNC', 'Router', 'Desktop', 'Precision']
  },
  {
    id: '2',
    name: 'DW-CNC-1325 Industrial CNC Router',
    slug: 'dw-cnc-1325-industrial-router',
    description: 'Heavy-duty industrial CNC router for large-scale production',
    fullDescription: 'The DW-CNC-1325 is a professional-grade CNC router designed for high-volume production environments. Features a massive working area and powerful spindle for handling large panels and thick materials with precision.',
    specifications: {
      'Working Area': '1300 x 2500 x 200mm',
      'Spindle Power': '4.5KW Air-Cooled',
      'Max Speed': '15000mm/min',
      'Resolution': '0.005mm',
      'Control System': 'DSP/Syntec System',
      'Drive System': 'Servo Motors'
    },
    warranty: '3 years comprehensive warranty with on-site service',
    price: 'Request Quote',
    images: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop'
    ],
    category: 'cnc-machines',
    featured: false,
    tags: ['CNC', 'Industrial', 'Large Format', 'Production']
  },
  {
    id: '3',
    name: 'DW-CNC-6090 Multi-Head CNC',
    slug: 'dw-cnc-6090-multi-head',
    description: 'Multi-spindle CNC router for high-efficiency batch processing',
    fullDescription: 'The DW-CNC-6090 features multiple spindles for simultaneous processing, dramatically increasing productivity for batch operations. Ideal for furniture manufacturers and cabinet makers.',
    specifications: {
      'Working Area': '600 x 900 x 150mm',
      'Spindle Power': '3KW x 4 Units',
      'Max Speed': '12000mm/min',
      'Resolution': '0.01mm',
      'Control System': 'Advanced Multi-Head Controller',
      'Vacuum System': 'Built-in Vacuum Table'
    },
    warranty: '2 years comprehensive warranty',
    price: 'Request Quote',
    images: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop'
    ],
    category: 'cnc-machines',
    featured: false,
    tags: ['CNC', 'Multi-Head', 'Batch Processing', 'Efficient']
  },
  
  // Saw Mills
  {
    id: '4',
    name: 'DW-SAW-500 Horizontal Band Saw',
    slug: 'dw-saw-500-horizontal-band',
    description: 'Heavy-duty horizontal band saw for lumber processing',
    fullDescription: 'The DW-SAW-500 is a robust horizontal band saw designed for continuous lumber processing operations. Features automatic feed system and precision cutting capabilities.',
    specifications: {
      'Cutting Capacity': '500mm Diameter',
      'Blade Length': '5500mm',
      'Motor Power': '15KW',
      'Feed Speed': 'Variable 0-30m/min',
      'Blade Speed': '40m/s',
      'Weight': '2500kg'
    },
    warranty: '2 years comprehensive warranty',
    price: 'Request Quote',
    images: [
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop'
    ],
    category: 'saw-mills',
    featured: true,
    tags: ['Band Saw', 'Lumber', 'Industrial', 'Automatic']
  },
  {
    id: '5',
    name: 'DW-SAW-1200 Circular Saw Mill',
    slug: 'dw-saw-1200-circular-mill',
    description: 'Large circular saw mill for high-volume lumber production',
    fullDescription: 'The DW-SAW-1200 circular saw mill is designed for high-volume lumber production with precision and efficiency. Features automatic log handling and computerized cut optimization.',
    specifications: {
      'Log Diameter': '1200mm Max',
      'Blade Diameter': '1400mm',
      'Motor Power': '45KW',
      'Cutting Speed': '60m/min',
      'Feed System': 'Hydraulic',
      'Control': 'PLC Automatic'
    },
    warranty: '3 years comprehensive warranty',
    price: 'Request Quote',
    images: [
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop'
    ],
    category: 'saw-mills',
    featured: false,
    tags: ['Circular Saw', 'High Volume', 'Automated', 'Lumber Mill']
  },

  // Wood Dryers
  {
    id: '6',
    name: 'DW-DRY-2000 Kiln Dryer',
    slug: 'dw-dry-2000-kiln-dryer',
    description: 'High-capacity kiln dryer for commercial lumber operations',
    fullDescription: 'The DW-DRY-2000 is a state-of-the-art kiln dryer designed for commercial lumber drying operations. Features precise temperature and humidity control for optimal drying results.',
    specifications: {
      'Capacity': '20 Cubic Meters',
      'Temperature Range': '40-80°C',
      'Humidity Control': 'Automatic',
      'Drying Time': '7-21 Days',
      'Energy Source': 'Steam/Electric',
      'Control System': 'PLC with HMI'
    },
    warranty: '2 years comprehensive warranty',
    price: 'Request Quote',
    images: [
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop'
    ],
    category: 'wood-dryers',
    featured: true,
    tags: ['Kiln Dryer', 'Commercial', 'Automated', 'Energy Efficient']
  },
  {
    id: '7',
    name: 'DW-DRY-500 Dehumidification Dryer',
    slug: 'dw-dry-500-dehumidification',
    description: 'Energy-efficient dehumidification dryer for premium lumber',
    fullDescription: 'The DW-DRY-500 uses advanced dehumidification technology for gentle, energy-efficient drying of premium lumber while maintaining wood quality.',
    specifications: {
      'Capacity': '5 Cubic Meters',
      'Temperature Range': '35-65°C',
      'Humidity Range': '15-85% RH',
      'Power Consumption': '12KW',
      'Drying Time': '14-28 Days',
      'Control': 'Digital Microprocessor'
    },
    warranty: '2 years comprehensive warranty',
    price: 'Request Quote',
    images: [
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop'
    ],
    category: 'wood-dryers',
    featured: false,
    tags: ['Dehumidification', 'Energy Efficient', 'Premium Quality', 'Gentle Drying']
  },

  // Edge Banders
  {
    id: '8',
    name: 'DW-EDGE-300 Automatic Edge Bander',
    slug: 'dw-edge-300-automatic-bander',
    description: 'Fully automatic edge banding machine for professional furniture making',
    fullDescription: 'The DW-EDGE-300 is a professional-grade automatic edge banding machine designed for high-quality furniture and cabinet production. Features pre-milling, edge application, trimming, and buffing in one pass.',
    specifications: {
      'Panel Thickness': '10-60mm',
      'Edge Thickness': '0.4-3mm',
      'Feed Speed': '10-24m/min',
      'Glue System': 'Hot Melt',
      'Functions': 'Pre-mill, Glue, Trim, Scrape, Buffer',
      'Power Supply': '380V/50Hz'
    },
    warranty: '2 years comprehensive warranty',
    price: 'Request Quote',
    images: [
      'https://images.unsplash.com/photo-1581092335878-8c7c4c3b1e1c?w=800&h=600&fit=crop'
    ],
    category: 'edge-banders',
    featured: true,
    tags: ['Edge Banding', 'Automatic', 'Furniture', 'Professional']
  },
  {
    id: '9',
    name: 'DW-EDGE-150 Manual Edge Bander',
    slug: 'dw-edge-150-manual-bander',
    description: 'Compact manual edge banding machine for small workshops',
    fullDescription: 'The DW-EDGE-150 is a compact, user-friendly manual edge banding machine perfect for small workshops and custom furniture makers. Offers excellent value and versatility.',
    specifications: {
      'Panel Thickness': '8-50mm',
      'Edge Thickness': '0.4-2mm',
      'Feed Speed': 'Manual Control',
      'Glue System': 'Hot Melt',
      'Functions': 'Glue, Trim',
      'Weight': '180kg'
    },
    warranty: '1 year comprehensive warranty',
    price: 'Request Quote',
    images: [
      'https://images.unsplash.com/photo-1581092335878-8c7c4c3b1e1c?w=800&h=600&fit=crop'
    ],
    category: 'edge-banders',
    featured: false,
    tags: ['Edge Banding', 'Manual', 'Compact', 'Small Workshop']
  },

  // Planers
  {
    id: '10',
    name: 'DW-PLANE-400 Thickness Planer',
    slug: 'dw-plane-400-thickness-planer',
    description: 'Heavy-duty thickness planer for precise lumber dimensioning',
    fullDescription: 'The DW-PLANE-400 is a robust thickness planer designed for accurate lumber dimensioning in commercial operations. Features spiral cutterhead for superior finish quality.',
    specifications: {
      'Planing Width': '400mm',
      'Planing Thickness': '6-160mm',
      'Feed Speed': '6-12m/min',
      'Motor Power': '7.5KW',
      'Cutterhead': 'Spiral Carbide',
      'Weight': '850kg'
    },
    warranty: '2 years comprehensive warranty',
    price: 'Request Quote',
    images: [
      'https://images.unsplash.com/photo-1587845216857-8296ee1b4f7b?w=800&h=600&fit=crop'
    ],
    category: 'planers',
    featured: true,
    tags: ['Thickness Planer', 'Heavy Duty', 'Spiral Cutterhead', 'Commercial']
  },
  {
    id: '11',
    name: 'DW-PLANE-600 Surface Planer',
    slug: 'dw-plane-600-surface-planer',
    description: 'Professional surface planer for smooth wood finishing',
    fullDescription: 'The DW-PLANE-600 surface planer delivers exceptional surface quality for professional woodworking applications. Features precision fence system and dust collection.',
    specifications: {
      'Planing Width': '600mm',
      'Table Length': '2000mm',
      'Motor Power': '5.5KW',
      'Cutterhead Speed': '5000 RPM',
      'Fence': 'Adjustable Precision',
      'Dust Port': '150mm'
    },
    warranty: '2 years comprehensive warranty',
    price: 'Request Quote',
    images: [
      'https://images.unsplash.com/photo-1587845216857-8296ee1b4f7b?w=800&h=600&fit=crop'
    ],
    category: 'planers',
    featured: false,
    tags: ['Surface Planer', 'Professional', 'Precision', 'Dust Collection']
  },

  // Sanders
  {
    id: '12',
    name: 'DW-SAND-900 Wide Belt Sander',
    slug: 'dw-sand-900-wide-belt-sander',
    description: 'Industrial wide belt sander for large panel finishing',
    fullDescription: 'The DW-SAND-900 wide belt sander is designed for high-volume panel sanding operations. Features multiple abrasive grits and variable speed control for optimal finishing.',
    specifications: {
      'Sanding Width': '900mm',
      'Thickness Capacity': '5-200mm',
      'Belt Speed': '8-24m/s',
      'Motor Power': '11KW',
      'Feed Speed': '2-12m/min',
      'Dust Collection': 'Built-in System'
    },
    warranty: '2 years comprehensive warranty',
    price: 'Request Quote',
    images: [
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop'
    ],
    category: 'sanders',
    featured: true,
    tags: ['Wide Belt Sander', 'Industrial', 'Panel Finishing', 'Variable Speed']
  },
  {
    id: '13',
    name: 'DW-SAND-300 Drum Sander',
    slug: 'dw-sand-300-drum-sander',
    description: 'Precision drum sander for smooth surface preparation',
    fullDescription: 'The DW-SAND-300 drum sander provides consistent surface preparation with precise thickness control. Perfect for hardwood flooring and fine furniture applications.',
    specifications: {
      'Drum Width': '300mm',
      'Thickness Range': '3-100mm',
      'Motor Power': '3KW',
      'Feed Speed': '1-6m/min',
      'Dust Collection': '100mm Port',
      'Weight': '320kg'
    },
    warranty: '2 years comprehensive warranty',
    price: 'Request Quote',
    images: [
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop'
    ],
    category: 'sanders',
    featured: false,
    tags: ['Drum Sander', 'Precision', 'Thickness Control', 'Fine Finishing']
  }
];

export const featuredProducts = products.filter(product => product.featured);

export const getProductsByCategory = (categorySlug: string) => {
  return products.filter(product => product.category === categorySlug);
};

export const getProductBySlug = (slug: string) => {
  return products.find(product => product.slug === slug);
};

export const getCategoryBySlug = (slug: string) => {
  return categories.find(category => category.slug === slug);
};
