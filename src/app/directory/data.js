const industries = [
    {
      name: "Modern Manufacturing Co.",
      description: "Leading manufacturer specializing in precision engineering and innovative production solutions.",
      products: [
        { name: "Industrial Machinery", description: "High-precision manufacturing equipment", price: 50000, images: ["/api/placeholder/400/300"] },
        { name: "Custom Tools", description: "Specialized tooling solutions", price: 25000, images: ["/test.svg.svg"] },
        { name: "Industrial Machinery", description: "High-precision manufacturing equipment", price: 50000, images: ["/api/placeholder/400/300"] },
        { name: "Industrial Machinery", description: "High-precision manufacturing equipment", price: 50000, images: ["/api/placeholder/400/300"] },
        { name: "Industrial Machinery", description: "High-precision manufacturing equipment", price: 50000, images: ["/api/placeholder/400/300"] },
        { name: "Industrial Machinery", description: "High-precision manufacturing equipment", price: 50000, images: ["/api/placeholder/400/300"] },
      ],
      materials: ["Steel", "Aluminum", "Titanium", "Composite Materials"],
      gstInfo: "GST123456789",
      contactNumber: "+91 9034954039",
      email: "contact@modernmfg.com",
      address: "Industrial Area Phase 1, Sector 5",
      vacancy: { available: true, description: "Hiring skilled engineers and technicians" },
      images: [
        "/test.svg.svg",
        "https://via.placeholder.com/400",
        "https://via.placeholder.com/400"
      ]
    },
    {
      name: "Tech Innovators Ltd.",
      description: "Pioneers in software development and IT solutions for businesses worldwide.",
      products: [
        { name: "Enterprise Software", description: "Customizable software for enterprise resource planning", price: 75000, images: ["/api/placeholder/400/300"] },
        { name: "Cloud Storage Solutions", description: "Scalable cloud storage for businesses", price: 20000, images: ["/api/placeholder/400/300"] }
      ],
      materials: ["Software", "Cloud Infrastructure", "Data Centers"],
      gstInfo: "GST987654321",
      contactNumber: "+91 9023486735",
      email: "info@techinnovators.com",
      address: "Tech Park, Sector 45",
      vacancy: { available: false, description: "No vacancies at the moment" },
      images: [
        "https://via.placeholder.com/400",
        "https://via.placeholder.com/400",
        "https://via.placeholder.com/400"
      ]
    },
    {
      name: "Green Energy Solutions",
      description: "Sustainable energy solutions for eco-conscious businesses.",
      products: [
        { name: "Solar Panels", description: "Efficient solar panels for clean energy", price: 30000, images: ["/api/placeholder/400/300"] },
        { name: "Wind Turbines", description: "High-capacity wind turbines for energy generation", price: 150000, images: ["/api/placeholder/400/300"] }
      ],
      materials: ["Solar Cells", "Wind Blades", "Steel", "Composite Materials"],
      gstInfo: "GST246810121",
      contactNumber: "+91 9876543210",
      email: "contact@greenenergy.com",
      address: "Eco Park, Sector 9",
      vacancy: { available: true, description: "Hiring renewable energy engineers" },
      images: [
        "https://via.placeholder.com/400",
        "https://via.placeholder.com/400",
        "https://via.placeholder.com/400"
      ]
    },
    {
      name: "Smart Home Systems",
      description: "Revolutionizing home automation with cutting-edge smart technologies.",
      products: [
        { name: "Smart Thermostat", description: "AI-powered thermostat for optimal climate control", price: 12000, images: ["/api/placeholder/400/300"] },
        { name: "Smart Security Camera", description: "AI-driven security cameras with cloud storage", price: 18000, images: ["/api/placeholder/400/300"] }
      ],
      materials: ["Plastic", "Metal", "Glass"],
      gstInfo: "GST555555555",
      contactNumber: "+91 8567823456",
      email: "info@smarthome.com",
      address: "Smart City, Sector 13",
      vacancy: { available: true, description: "Hiring software developers for smart systems" },
      images: [
        "https://via.placeholder.com/400",
        "https://via.placeholder.com/400",
        "https://via.placeholder.com/400"
      ]
    },
    {
      name: "FoodTech Solutions",
      description: "Innovative technology solutions for the food processing industry.",
      products: [
        { name: "Food Processing Equipment", description: "Machines for large-scale food processing", price: 200000, images: ["/api/placeholder/400/300"] },
        { name: "Automated Packaging Systems", description: "Robotic systems for efficient packaging", price: 50000, images: ["/api/placeholder/400/300"] }
      ],
      materials: ["Stainless Steel", "Plastic", "Silicone"],
      gstInfo: "GST789101112",
      contactNumber: "+91 8234956712",
      email: "contact@foodtech.com",
      address: "FoodTech Park, Sector 7",
      vacancy: { available: false, description: "No vacancies at the moment" },
      images: [
        "https://via.placeholder.com/400",
        "https://via.placeholder.com/400",
        "https://via.placeholder.com/400"
      ]
    },
    {
      name: "Auto Components Ltd.",
      description: "Manufacturer of high-quality automotive components.",
      products: [
        { name: "Brake Pads", description: "Durable and reliable brake pads for vehicles", price: 5000, images: ["/api/placeholder/400/300"] },
        { name: "Suspension Systems", description: "High-performance suspension systems for vehicles", price: 15000, images: ["/api/placeholder/400/300"] }
      ],
      materials: ["Rubber", "Steel", "Aluminum"],
      gstInfo: "GST333444555",
      contactNumber: "+91 8937456123",
      email: "info@autocomp.com",
      address: "Auto Component Street, Sector 6",
      vacancy: { available: true, description: "Hiring mechanical engineers and assembly line workers" },
      images: [
        "https://via.placeholder.com/400",
        "https://via.placeholder.com/400",
        "https://via.placeholder.com/400"
      ]
    },
    {
      name: "Construction Equipment Co.",
      description: "Provider of top-tier construction machinery and equipment.",
      products: [
        { name: "Excavators", description: "Heavy-duty excavators for construction sites", price: 100000, images: ["/api/placeholder/400/300"] },
        { name: "Cranes", description: "Mobile cranes for lifting heavy loads", price: 250000, images: ["/api/placeholder/400/300"] }
      ],
      materials: ["Steel", "Hydraulic Systems"],
      gstInfo: "GST646464646",
      contactNumber: "+91 9876231457",
      email: "contact@construcequip.com",
      address: "Construction Yard, Sector 3",
      vacancy: { available: true, description: "Hiring machine operators and technicians" },
      images: [
        "https://via.placeholder.com/400",
        "https://via.placeholder.com/400",
        "https://via.placeholder.com/400"
      ]
    },
    {
      name: "Medical Equipment Solutions",
      description: "Specializing in advanced medical equipment for healthcare providers.",
      products: [
        { name: "MRI Machines", description: "High-resolution MRI machines for hospitals", price: 500000, images: ["/api/placeholder/400/300"] },
        { name: "Surgical Tools", description: "Precision surgical tools for operating rooms", price: 25000, images: ["/api/placeholder/400/300"] }
      ],
      materials: ["Steel", "Plastics", "Glass"],
      gstInfo: "GST123987456",
      contactNumber: "+91 9812345678",
      email: "info@medequip.com",
      address: "Healthcare Zone, Sector 8",
      vacancy: { available: true, description: "Hiring medical equipment technicians" },
      images: [
        "https://via.placeholder.com/400",
        "https://via.placeholder.com/400",
        "https://via.placeholder.com/400"
      ]
    },
    {
      name: "Furniture & Interiors Ltd.",
      description: "Designing and manufacturing innovative furniture for modern spaces.",
      products: [
        { name: "Office Desks", description: "Ergonomic office desks for comfortable workspaces", price: 15000, images: ["/api/placeholder/400/300"] },
        { name: "Sofas", description: "Stylish and comfortable sofas for homes and offices", price: 30000, images: ["/api/placeholder/400/300"] }
      ],
      materials: ["Wood", "Fabric", "Metal"],
      gstInfo: "GST987654123",
      contactNumber: "+91 9938475610",
      email: "contact@furnitureinteriors.com",
      address: "Furniture Park, Sector 2",
      vacancy: { available: true, description: "Hiring interior designers and carpenters" },
      images: [
        "https://via.placeholder.com/400",
        "https://via.placeholder.com/400",
        "https://via.placeholder.com/400"
      ]
    }
  ];


  export default industries;