const industries = [
  {
    name: "Textile Manufacturing",
    description: "A leading manufacturer of high-quality textiles specializing in cotton and synthetic fabrics for domestic and international markets. Our state-of-the-art facility employs over 200 skilled workers and uses sustainable manufacturing practices.",
    images: [
      "/placeholder.png",
      "/placeholder.png",
      "/placeholder.png"
    ],
    materials: ["Cotton", "Polyester", "Silk", "Wool", "Synthetic Blends"],
    contactNumber: "+91 98765 43210",
    email: "contact@textileindustry.com",
    address: "Plot 45, IPCA Industrial Area, Sector 5, Noida, UP 201301",
    gstInfo: "22AAAAA0000A1Z5",
    vacancy: {
      available: true,
      description: "Currently hiring for Production Supervisor, Quality Control Manager, and Machine Operators. Send resume to hr@textileindustry.com"
    },
    products: [
      {
        name: "Premium Cotton Fabric",
        description: "100% organic cotton fabric suitable for garments, home furnishings, and industrial applications.",
        price: "250",
        images: ["/placeholder.png"]
      },
      {
        name: "Polyester Blend",
        description: "Durable polyester-cotton blend fabric with excellent color retention properties.",
        price: "180",
        images: ["/placeholder.png"]
      },
      {
        name: "Silk Fabric",
        description: "Luxurious pure silk fabric for premium garments and special occasions.",
        price: "1200",
        images: ["/placeholder.png"]
      },
      {
        name: "Printed Cotton",
        description: "Designer printed cotton fabric with various patterns for fashion and home decor.",
        price: "350",
        images: ["/placeholder.png"]
      },
      {
        name: "Denim Material",
        description: "High-quality denim fabric in various weights and finishes.",
        price: "450",
        images: ["/placeholder.png"]
      }
    ]
  },
  {
    name: "Automotive Components",
    description: "Manufacturer of precision-engineered automotive components supplying to major car and two-wheeler brands across India and abroad. ISO 9001:2015 certified with a focus on innovation and quality.",
    images: [
      "/placeholder.png",
      "/placeholder.png",
      "/placeholder.png"
    ],
    materials: ["Aluminum", "Steel", "Rubber", "Plastic Polymers", "Carbon Fiber"],
    contactNumber: "+91 99876 54321",
    email: "info@autocomponents.com",
    address: "23-B, IPCA Auto Zone, Phase II, Gurugram, Haryana 122001",
    gstInfo: "06BBBBB0000B1Z3",
    vacancy: {
      available: false,
      description: ""
    },
    products: [
      {
        name: "Brake Systems",
        description: "Complete brake assemblies and components for passenger vehicles with advanced safety features.",
        price: "8500",
        images: ["/placeholder.png"]
      },
      {
        name: "Engine Pistons",
        description: "Precision-engineered engine pistons made from high-grade aluminum alloy.",
        price: "1200",
        images: ["/placeholder.png"]
      },
      {
        name: "Transmission Parts",
        description: "Various transmission components including gears, shafts, and synchromesh systems.",
        price: "7500",
        images: ["/placeholder.png"]
      },
      {
        name: "Suspension Components",
        description: "Durable suspension parts including shock absorbers and control arms.",
        price: "4200",
        images: ["/placeholder.png"]
      }
    ]
  },
  {
    name: "Pharmaceutical Manufacturing",
    description: "WHO-GMP certified pharmaceutical manufacturing facility producing a wide range of generic and specialized medicines. Our R&D department is constantly working on innovative formulations to address healthcare needs.",
    images: [
      "/placeholder.png",
      "/placeholder.png",
      "/placeholder.png"
    ],
    materials: ["APIs", "Excipients", "Packaging Materials", "Chemical Compounds"],
    contactNumber: "+91 98765 12345",
    email: "contact@pharmaindustry.com",
    address: "Pharma Complex, IPCA Pharma Park, Baddi, Himachal Pradesh 173205",
    gstInfo: "02CCCCC0000C1Z8",
    vacancy: {
      available: true,
      description: "Hiring for Quality Assurance Manager, Microbiologist, and Production Chemists. Email your CV to careers@pharmaindustry.com"
    },
    products: [
      {
        name: "Analgesic Tablets",
        description: "Pain relief medication available in various strengths and formulations.",
        price: "85",
        images: ["/placeholder.png"]
      },
      {
        name: "Antibiotics",
        description: "Broad-spectrum antibiotics for treating various bacterial infections.",
        price: "120",
        images: ["/placeholder.png"]
      },
      {
        name: "Vitamins & Supplements",
        description: "Comprehensive range of vitamins and dietary supplements for all age groups.",
        price: "250",
        images: ["/placeholder.png"]
      },
      {
        name: "Cough Syrup",
        description: "Effective cough suppressant and expectorant formulations.",
        price: "95",
        images: ["/placeholder.png"]
      }
    ]
  },
  {
    name: "Food Processing",
    description: "FSSAI certified food processing unit specializing in ready-to-eat meals, snacks, and traditional Indian food products. Using hygienic processing methods and quality ingredients to deliver authentic taste.",
    images: [
      "/placeholder.png",
      "/placeholder.png",
      "/placeholder.png"
    ],
    materials: ["Grains", "Pulses", "Spices", "Fruits", "Vegetables", "Dairy"],
    contactNumber: "+91 97654 32109",
    email: "info@foodprocessing.com",
    address: "Food Park, IPCA Industrial Estate, Sanand, Gujarat 382110",
    gstInfo: "24DDDDD0000D1Z1",
    vacancy: {
      available: true,
      description: "Openings for Food Technologists, Quality Inspectors, and Production Supervisors. Apply with resume to hr@foodprocessing.com"
    },
    products: [
      {
        name: "Ready-to-Eat Meals",
        description: "Preservative-free ready-to-eat traditional Indian meals with long shelf life.",
        price: "120",
        images: ["/placeholder.png"]
      },
      {
        name: "Healthy Snacks",
        description: "Nutritious snacks made from natural ingredients with no artificial additives.",
        price: "85",
        images: ["/placeholder.png"]
      },
      {
        name: "Spice Blends",
        description: "Authentic Indian spice blends for various regional cuisines.",
        price: "150",
        images: ["/placeholder.png"]
      },
      {
        name: "Fruit Preserves",
        description: "Natural fruit preserves and jams made from seasonal Indian fruits.",
        price: "180",
        images: ["/placeholder.png"]
      }
    ]
  },
  {
    name: "Electronics Manufacturing",
    description: "State-of-the-art electronics manufacturing facility producing consumer electronics, PCBs, and electronic components. Supporting the Make in India initiative with locally manufactured products.",
    images: [
      "/placeholder.png",
      "/placeholder.png",
      "/placeholder.png"
    ],
    materials: ["Semiconductor Components", "PCB Materials", "Copper", "Silicon", "Polymers"],
    contactNumber: "+91 98123 45678",
    email: "contact@electronicsmanufacturing.com",
    address: "Tech Zone, IPCA Electronics Park, Greater Noida, UP 201308",
    gstInfo: "09EEEEE0000E1Z6",
    vacancy: {
      available: true,
      description: "Urgently hiring Electronics Engineers, PCB Designers, and Assembly Line Technicians. Apply at careers@electronicsmanufacturing.com"
    },
    products: [
      {
        name: "Smart Home Devices",
        description: "IoT-enabled smart home automation devices for modern living.",
        price: "3500",
        images: ["/images/products/smart-home.jpg"]
      },
      {
        name: "PCB Assemblies",
        description: "Custom PCB design and manufacturing services for various applications.",
        price: "1200",
        images: ["/images/products/pcb.jpg"]
      },
      {
        name: "LED Lighting Solutions",
        description: "Energy-efficient LED lighting products for residential and commercial use.",
        price: "750",
        images: ["/images/products/led-lighting.jpg"]
      },
      {
        name: "Power Banks",
        description: "High-capacity portable power banks with fast charging capabilities.",
        price: "1500",
        images: ["/images/products/power-banks.jpg"]
      }
    ]
  },
  {
    name: "Furniture Manufacturing",
    description: "Premium furniture manufacturer creating elegant and durable furniture pieces for homes and offices. Combining traditional craftsmanship with modern design and sustainable materials.",
    images: [
      "/images/industries/furniture1.jpg",
      "/images/industries/furniture2.jpg",
      "/images/industries/furniture3.jpg"
    ],
    materials: ["Solid Wood", "Engineered Wood", "Metal", "Fabric", "Leather", "Glass"],
    contactNumber: "+91 95678 12345",
    email: "info@furnituremanufacturer.com",
    address: "Furniture Hub, IPCA Industrial Area, Chakan, Pune, Maharashtra 410501",
    gstInfo: "27FFFFF0000F1Z9",
    vacancy: {
      available: false,
      description: ""
    },
    products: [
      {
        name: "Office Furniture",
        description: "Ergonomic office chairs, desks, and conference tables for corporate environments.",
        price: "15000",
        images: ["/images/products/office-furniture.jpg"]
      },
      {
        name: "Living Room Sets",
        description: "Elegant sofa sets and living room furniture in various designs and materials.",
        price: "45000",
        images: ["/images/products/living-room.jpg"]
      },
      {
        name: "Bedroom Collections",
        description: "Complete bedroom sets including beds, wardrobes, and side tables.",
        price: "60000",
        images: ["/images/products/bedroom.jpg"]
      },
      {
        name: "Outdoor Furniture",
        description: "Weather-resistant outdoor furniture for gardens, balconies, and patios.",
        price: "25000",
        images: ["/images/products/outdoor-furniture.jpg"]
      }
    ]
  },
  {
    name: "Renewable Energy Solutions",
    description: "Pioneering renewable energy company manufacturing solar panels, wind turbines, and energy storage solutions. Contributing to India's green energy mission with innovative and affordable clean energy products.",
    images: [
      "/images/industries/energy1.jpg",
      "/images/industries/energy2.jpg",
      "/images/industries/energy3.jpg"
    ],
    materials: ["Solar Cells", "Wind Turbine Components", "Battery Materials", "Electronic Components"],
    contactNumber: "+91 98765 87654",
    email: "contact@renewableenergy.com",
    address: "Green Energy Park, IPCA Renewable Zone, Chennai, Tamil Nadu 600096",
    gstInfo: "33GGGGG0000G1Z2",
    vacancy: {
      available: true,
      description: "Looking for Solar Engineers, Energy Storage Specialists, and Project Managers. Send CV to opportunities@renewableenergy.com"
    },
    products: [
      {
        name: "Solar Panels",
        description: "High-efficiency solar panels for residential and commercial applications.",
        price: "18000",
        images: ["/images/products/solar-panels.jpg"]
      },
      {
        name: "Wind Turbines",
        description: "Small to medium-sized wind turbines for decentralized power generation.",
        price: "250000",
        images: ["/images/products/wind-turbines.jpg"]
      },
      {
        name: "Energy Storage Solutions",
        description: "Advanced battery systems for storing renewable energy.",
        price: "85000",
        images: ["/images/products/energy-storage.jpg"]
      },
      {
        name: "Solar Water Heaters",
        description: "Efficient solar water heating systems for residential use.",
        price: "35000",
        images: ["/images/products/solar-heater.jpg"]
      }
    ]
  },
  {
    name: "Agricultural Equipment",
    description: "Manufacturer of innovative agricultural equipment and machinery designed for Indian farming conditions. Our products help increase farm productivity while reducing manual labor through appropriate mechanization.",
    images: [
      "/images/industries/agri1.jpg",
      "/images/industries/agri2.jpg",
      "/images/industries/agri3.jpg"
    ],
    materials: ["Steel", "Aluminum", "Rubber", "Hydraulic Components", "Engine Parts"],
    contactNumber: "+91 97865 43210",
    email: "info@agriequipment.com",
    address: "Agro Park, IPCA Rural Industries Zone, Ludhiana, Punjab 141001",
    gstInfo: "03HHHHH0000H1Z5",
    vacancy: {
      available: false,
      description: ""
    },
    products: [
      {
        name: "Mini Tractors",
        description: "Compact tractors suitable for small and medium farms with excellent fuel efficiency.",
        price: "350000",
        images: ["/images/products/mini-tractor.jpg"]
      },
      {
        name: "Rotavators",
        description: "Soil preparation equipment for efficient field preparation and weed control.",
        price: "85000",
        images: ["/images/products/rotavator.jpg"]
      },
      {
        name: "Water Pumps",
        description: "High-capacity water pumps for irrigation with diesel and electric variants.",
        price: "25000",
        images: ["/images/products/water-pump.jpg"]
      },
      {
        name: "Harvesting Equipment",
        description: "Specialized equipment for harvesting various crops with minimal grain loss.",
        price: "120000",
        images: ["/images/products/harvester.jpg"]
      }
    ]
  }
];

export default industries;