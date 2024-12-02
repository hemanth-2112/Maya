const products = [
    {
      id: 1,
      name: "Infinix ZERO 30",
      price: 14999,
      rating: 5,
      reviews: 21,
      description: "The 50MP selfie camera has a f/2.45 lens with phase-detect autofocus.",
      image: "./IMAGES/pexels-zeleboba-29005357.jpg"
    },
    {
      id: 2,
      name: "Premium Cotton Solid Shirt for Man",
      price: 699,
      rating: 4,
      reviews: 230,
      description: "A Shirt is a main apparel of attraction wear for men.",
      image: "./IMAGES/wgxv5_512.webp"
    },
    {
      id: 3,
      name: "Journal The Passion Within",
      price: 499,
      rating: 4,
      reviews: 501,
      description: "The 50MP selfie camera has a f/2.45 lens with phase-detect autofocus.",
      image: "./IMAGES/pexels-pixabay-256450.jpg"
    },
    {
      id: 4,
      name: "boAt Immortal 141 TWS Gaming Earbuds",
      price: 999,
      rating: 3,
      reviews: 441,
      description: "Up to 40 Hrs Playtime, Signature Sound, Beast Mode, IPX4 Resistance.",
      image: "./IMAGES/610z9IGnvUL._SX425_.jpg"
    },
    {
      id: 5,
      name: "STI Men's Plain Regular Spread Collar Olive Shirts",
      price: 239,
      rating: 2,
      reviews: 111,
      description: "Fabric: Polyester, Sleeve Length: Short Sleeves, Pattern: Checked.",
      image: "./IMAGES/wwrsd_512.webp"
    },
    {
      id: 6,
      name: "boAt Wave Sigma 3 Smart Watch",
      price: 1399,
      rating: 4,
      reviews: 94,
      description: "700+ Active Modes: Elevate your fitness routine with a diverse range of 700+ active modes.",
      image: "./IMAGES/pexels-javaistan-12636163.jpg"
    },
    {
      id: 7,
      name: "Vinayaka Fab Set of 2 Velvet Throw Pillow Covers",
      price: 499,
      rating: 5,
      reviews: 64,
      description: "Soft Decorative Cushion Covers Cases with Gold Leather for Sofa Bedroom Livingroom Car.",
      image: "./IMAGES/51Pv4mnHS0L._SX300_SY300_QL70_FMwebp_.webp"
    },
    {
      id: 8,
      name: "SOLARA Unbreakable Water Bottle 1 Litre",
      price: 699,
      rating: 5,
      reviews: 11325,
      description: "Leakproof Durable BPA-Free Non-Toxic Water bottle for office, gym, and outdoor activities.",
      image: "./IMAGES/817HG+TJKhL._SL1500_.jpg"
    },
    {
      id: 9,
      name: "Noise ColorFit Pro 3 Smart Watch",
      price: 4499,
      rating: 4,
      reviews: 25432,
      description: "1.55\" HD display, heart rate monitor, SpO2 tracking, waterproof, fitness and sleep monitoring.",
      image: "./IMAGES/NoiseColorFitUltra3-JetBlack_1.webp"
    },
    {
      id: 10,
      name: "boAt Airdopes 441 Pro Wireless Earbuds",
      price: 2999,
      rating: 5,
      reviews: 78560,
      description: "Immersive audio with Bluetooth 5.0, 150 hours playback, IPX7 water resistance.",
      image: "./IMAGES/Artboard1copy4_8daadcdf-ccd0-44d5-a32f-8d8b37e6bd66_700x.webp"
    },
    {
      id: 11,
      name: "Prestige Iris 750W Mixer Grinder",
      price: 3199,
      rating: 4,
      reviews: 15860,
      description: "Powerful 750 watts motor, 3 stainless steel jars, one juicer jar, multipurpose grinding.",
      image: "./IMAGES/mixer.jpg"
    },
    {
      id: 12,
      name: "Pigeon by Stovekraft Electric Kettle 1.5 Litre",
      price: 999,
      rating: 4,
      reviews: 22344,
      description: "High-grade stainless steel, 1500W, automatic cut-off, ideal for boiling water, tea, and coffee.",
      image: "./IMAGES/pigen.jpg"
    },
    {
      id: 13,
      name: "Fossil Gen 6 Smartwatch",
      price: 19995,
      rating: 5,
      reviews: 1250,
      description: "5 ATM water resistance, 1.28\" AMOLED display, heart rate monitor, and GPS tracking.",
      image: "./IMAGES/Fossil.jpg"
    },
    {
      id: 14,
      name: "Canon EOS 1500D DSLR Camera",
      price: 32999,
      rating: 4,
      reviews: 3000,
      description: "24.1MP, Full HD video recording, 18-55mm lens kit, WiFi & Bluetooth connectivity.",
      image: "./IMAGES/CanonEOS.jpg"
    },
    {
      id: 15,
      name: "Apple AirPods Pro (2nd Gen)",
      price: 24900,
      rating: 5,
      reviews: 10500,
      description: "Active Noise Cancellation, Transparency Mode, Sweat & Water-Resistant, and 6 hours of listening time.",
      image: "./IMAGES/Apple _AirPods.jpg"
    },
    {
      id: 16,
      name: "Samsung Galaxy Buds 2 Pro",
      price: 14999,
      rating: 5,
      reviews: 4500,
      description: "3D surround sound, 24-bit Hi-Fi audio, ANC, and ergonomic design for a secure fit.",
      image: "./IMAGES/Samsung Galaxy S23 Ultra.jpg"
    },
    {
      id: 17,
      name: "Fitbit Charge 5 Fitness Tracker",
      price: 10999,
      rating: 5,
      reviews: 5900,
      description: "Built-in GPS, Daily Readiness Score, 20+ Exercise Modes, Sleep Tracking, and SpO2 Monitoring.",
      image: "./IMAGES/Fitbit.jpg"
    },
    {
      id: 18,
      name: "Oculus Quest 2 VR Headset",
      price: 34990,
      rating: 5,
      reviews: 6000,
      description: "All-in-one virtual reality headset with 256GB storage, 120Hz refresh rate, and wireless gameplay.",
      image: "./IMAGES/OculusQuest2VRHeadset.jpg"
    },
    {
      id: 19,
      name: "JBL Charge 5 Bluetooth Speaker",
      price: 15999,
      rating: 5,
      reviews: 8500,
      description: "20 hours of playtime, IP67 waterproof & dustproof, Bass Radiators, and JBL PartyBoost.",
      image: "./IMAGES/JBL5BluetoothSpeaker.jpg"
    },
    {
      id: 20,
      name: "Dyson V11 Absolute Cordless Vacuum Cleaner",
      price: 49900,
      rating: 5,
      reviews: 1200,
      description: "Powerful suction, intelligent optimization, and up to 60 minutes of fade-free runtime.",
      image: "./IMAGES/DysonV11AbsoluteCordlessVacuumleaner.jpg"
    },
    {
      id: 21,
      name: "Logitech MX Master 3 Wireless Mouse",
      price: 5999,
      rating: 5,
      reviews: 3000,
      description: "Ergonomic design, customizable buttons, 70 days of battery life, and hyper-fast scrolling.",
      image: "./IMAGES/LogitechMMaster3WirelessMouse.jpg"
    },
    {
      id: 22,
      name: "Razer Kraken V3 Gaming Headset",
      price: 7999,
      rating: 5,
      reviews: 1500,
      description: "RGB Chroma lighting, THX Spatial Audio, noise-canceling mic, and ultra-comfortable design.",
      image: "./IMAGES/RazerKrakenV3GamingHeadset.jpg"
    }
  ];
  
  localStorage.setItem("products", JSON.stringify(products));
