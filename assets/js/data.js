// Mock Product Database
const products = [
    {
        id: 1,
        name: "Intel Core i9-14900K",
        category: "Processor",
        price: 215000,
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=600&auto=format&fit=crop",
        rating: 5,
        inStock: true,
        specs: ["24 Cores / 32 Threads", "Up to 6.0 GHz", "LGA 1700"]
    },
    {
        id: 2,
        name: "AMD Ryzen 9 7950X3D",
        category: "Processor",
        price: 235000,
        image: "https://images.unsplash.com/photo-1626218174358-7769486c4b79?q=80&w=600&auto=format&fit=crop",
        rating: 5,
        inStock: true,
        specs: ["16 Cores / 32 Threads", "Up to 5.7 GHz", "AM5"]
    },
    {
        id: 3,
        name: "NVIDIA GeForce RTX 4090",
        category: "Graphics Card",
        price: 780000,
        image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?q=80&w=600&auto=format&fit=crop",
        rating: 5,
        inStock: false,
        specs: ["24GB GDDR6X", "DLSS 3.0", "PCIe 4.0"]
    },
    {
        id: 4,
        name: "ASUS ROG Strix B650E-F",
        category: "Motherboard",
        price: 105000,
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
        rating: 4,
        inStock: true,
        specs: ["AM5 Socket", "DDR5 Support", "PCIe 5.0 x16"]
    },
    {
        id: 5,
        name: "Corsair Vengeance RGB 32GB (2x16GB) DDR5",
        category: "RAM",
        price: 48000,
        image: "https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=600&auto=format&fit=crop",
        rating: 5,
        inStock: true,
        specs: ["6000MHz", "CL30", "RGB Lighting"]
    },
    {
        id: 6,
        name: "Samsung 990 PRO 2TB NVMe",
        category: "Storage",
        price: 65000,
        image: "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?q=80&w=600&auto=format&fit=crop",
        rating: 5,
        inStock: true,
        specs: ["PCIe Gen4 x4", "Up to 7450 MB/s Read", "M.2 2280"]
    },
    {
        id: 7,
        name: "Corsair RM850x 850W",
        category: "Power Supply",
        price: 52000,
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=600&auto=format&fit=crop",
        rating: 4,
        inStock: true,
        specs: ["80+ Gold", "Fully Modular", "135mm Fan"]
    },
    {
        id: 8,
        name: "Lian Li O11 Dynamic EVO",
        category: "Casing",
        price: 58000,
        image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=600&auto=format&fit=crop",
        rating: 5,
        inStock: true,
        specs: ["Mid-Tower", "Tempered Glass", "Dual Chamber"]
    }
];

// Utility functions
const formatPrice = (price) => {
    return new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(price);
};

// Expose to window for global access
window.db = {
    products,
    formatPrice
};
