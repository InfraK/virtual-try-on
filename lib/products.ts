export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  sizes: string[];
  materials: string[];
  care: string[];
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Black Joggers',
    price: 64.99,
    description: 'Comfortable athletic joggers with tapered fit',
    image: '/products/black-joggers.jpg',
    category: 'Pants',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    materials: ['85% Cotton', '15% Polyester'],
    care: ['Machine wash cold', 'Tumble dry low', 'Do not bleach'],
  },
  {
    id: '2',
    name: 'Cable Knit Cardigan',
    price: 119.99,
    description: 'Classic cable knit cardigan with button closure',
    image: '/products/cable-knit-cardigan.jpg',
    category: 'Sweaters',
    sizes: ['S', 'M', 'L', 'XL'],
    materials: ['75% Wool', '25% Acrylic'],
    care: ['Hand wash cold', 'Lay flat to dry', 'Do not bleach'],
  },
  {
    id: '3',
    name: 'Classic White Tee',
    price: 49.99,
    description: 'Premium cotton t-shirt with a modern fit',
    image: '/products/classic-white-tee.jpg',
    category: 'Shirts',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    materials: ['100% Organic Cotton'],
    care: ['Machine wash cold', 'Tumble dry low', 'Do not bleach'],
  },
  {
    id: '4',
    name: 'Denim Jacket',
    price: 129.99,
    description: 'Timeless denim jacket with vintage wash',
    image: '/products/denim-jacket.jpg',
    category: 'Jackets',
    sizes: ['S', 'M', 'L', 'XL'],
    materials: ['98% Cotton', '2% Elastane'],
    care: ['Machine wash cold', 'Hang dry', 'Iron on low heat'],
  },
  {
    id: '5',
    name: 'Floral Summer Dress',
    price: 99.99,
    description: 'Elegant floral dress perfect for any occasion',
    image: '/products/floral-summer-dress.jpg',
    category: 'Dresses',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    materials: ['100% Viscose'],
    care: ['Hand wash cold', 'Hang dry', 'Iron on low heat'],
  },
  {
    id: '6',
    name: 'Leather Bomber Jacket',
    price: 299.99,
    description: 'Premium leather bomber jacket with quilted lining',
    image: '/products/leather-bomber-jacket.jpg',
    category: 'Jackets',
    sizes: ['S', 'M', 'L', 'XL'],
    materials: ['100% Genuine Leather', 'Polyester Lining'],
    care: ['Professional leather clean only', 'Do not wash'],
  },
  {
    id: '7',
    name: 'Maxi Evening Dress',
    price: 159.99,
    description: 'Elegant maxi dress for special occasions',
    image: '/products/maxi-evening-dress.jpg',
    category: 'Dresses',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    materials: ['95% Polyester', '5% Elastane'],
    care: ['Dry clean only', 'Do not wash'],
  },
  {
    id: '8',
    name: 'Slim Fit Chinos',
    price: 79.99,
    description: 'Versatile chinos with modern slim fit',
    image: '/products/slim-fit-chinos.jpg',
    category: 'Pants',
    sizes: ['28', '30', '32', '34', '36', '38'],
    materials: ['97% Cotton', '3% Elastane'],
    care: ['Machine wash cold', 'Tumble dry low', 'Iron on medium heat'],
  },
  {
    id: '9',
    name: 'Striped Button Down',
    price: 69.99,
    description: 'Classic striped shirt with modern tailoring',
    image: '/products/striped-button-down.jpg',
    category: 'Shirts',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    materials: ['60% Cotton', '40% Polyester'],
    care: ['Machine wash cold', 'Tumble dry low', 'Iron on medium heat'],
  },
  {
    id: '10',
    name: 'Wool Blend Sweater',
    price: 94.99,
    description: 'Cozy wool blend sweater with modern cut',
    image: '/products/wool-blend-sweater.jpg',
    category: 'Sweaters',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    materials: ['70% Wool', '30% Acrylic'],
    care: ['Hand wash cold', 'Lay flat to dry', 'Do not bleach'],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}
