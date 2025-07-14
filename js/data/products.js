// Sample product data
const products = [
    {
        id: 1,
        title: "Cosmic Harmony",
        price: 49.99,
        originalPrice: 59.99,
        description: "A stunning abstract representation of cosmic energy and universal harmony.",
        category: "abstract",
        images: [
            "images/products/1.jpg",
            "images/products/2.jpg",
            "images/products/3.jpg"
        ],
        rating: 4.5,
        reviewCount: 24,
        badge: "Bestseller",
        badgeClass: "badge-bestseller",
        featured: true,
        inStock: true
    },
    {
        id: 2,
        title: "Mountain Serenity",
        price: 39.99,
        description: "Breathtaking digital landscape capturing majestic mountain ranges at dawn.",
        category: "landscape",
        images: [
            "images/products/2.jpg",
            "images/products/1.jpg"
        ],
        rating: 4,
        reviewCount: 18,
        badge: "New",
        badgeClass: "badge-new",
        featured: true,
        inStock: true
    },
    {
        id: 3,
        title: "Urban Portrait",
        price: 59.99,
        description: "Contemporary portrait with urban influences and vibrant colors.",
        category: "portrait",
        images: [
            "images/products/1.jpg",
            "images/products/2.jpg"
        ],
        
        rating: 5,
        reviewCount: 32,
        featured: true,
        inStock: true
    },
    {
        id: 4,
        title: "Ocean Dreams",
        price: 45.99,
        originalPrice: 55.99,
        description: "Minimalist ocean waves in calming blue tones.",
        category: "minimalist",
        images: [
            "images/products/1.jpg",
            "images/products/2.jpg"
        ],
        
        rating: 4.5,
        reviewCount: 21,
        badge: "Sale",
        badgeClass: "badge-sale",
        featured: true,
        inStock: true
    },
    {
        id: 5,
        title: "Ocean Dreams",
        price: 45.99,
        originalPrice: 55.99,
        description: "Minimalist ocean waves in calming blue tones.",
        category: "minimalist",
        images: [
            "images/products/1.jpg",
            "images/products/2.jpg"
        ],

        rating: 4.5,
        reviewCount: 21,
        badge: "Sale",
        badgeClass: "badge-sale",
        featured: true,
        inStock: true
    },
    {
        id: 6,
        title: "Ocean Dreams",
        price: 45.99,
        originalPrice: 55.99,
        description: "Minimalist ocean waves in calming blue tones.",
        category: "minimalist",
        images: [
            "images/products/1.jpg",
            "images/products/2.jpg"
        ],

        rating: 4.5,
        reviewCount: 21,
        badge: "Sale",
        badgeClass: "badge-sale",
        featured: true,
        inStock: true
    },
    {
        id: 7,
        title: "Ocean Dreams",
        price: 45.99,
        originalPrice: 55.99,
        description: "Minimalist ocean waves in calming blue tones.",
        category: "minimalist",
        images: [
            "images/products/1.jpg",
            "images/products/2.jpg"
        ],

        rating: 4.5,
        reviewCount: 21,
        badge: "Sale",
        badgeClass: "badge-sale",
        featured: true,
        inStock: true
    },
    {
        id: 8,
        title: "Ocean Dreams",
        price: 45.99,
        originalPrice: 55.99,
        description: "Minimalist ocean waves in calming blue tones.",
        category: "minimalist",
        images: [
            "images/products/1.jpg",
            "images/products/2.jpg"
        ],

        rating: 4.5,
        reviewCount: 21,
        badge: "Sale",
        badgeClass: "badge-sale",
        featured: true,
        inStock: true
    },
    {
        id: 9,
        title: "Ocean Dreams",
        price: 45.99,
        originalPrice: 55.99,
        description: "Minimalist ocean waves in calming blue tones.",
        category: "minimalist",
        images: [
            "images/products/1.jpg",
            "images/products/2.jpg"
        ],

        rating: 4.5,
        reviewCount: 21,
        badge: "Sale",
        badgeClass: "badge-sale",
        featured: true,
        inStock: true
    },
    {
        id: 10,
        title: "Ocean Dreams",
        price: 45.99,
        originalPrice: 55.99,
        description: "Minimalist ocean waves in calming blue tones.",
        category: "minimalist",
        images: [
            "images/products/1.jpg",
            "images/products/2.jpg"
        ],

        rating: 4.5,
        reviewCount: 21,
        badge: "Sale",
        badgeClass: "badge-sale",
        featured: true,
        inStock: true
    },
];

// You could also add functions for fetching from an API:
/*
async function fetchProducts() {
    try {
        const response = await fetch('https://your-api.com/products');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}
*/

export default products;