export type Offer = {
  store: string;
  price: number;
  url: string;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  offers: Offer[];
};

export const products: Product[] = [
  {
    id: "nike-air-force-1-white",
    name: "Nike Air Force 1 '07 White",
    brand: "Nike",
    category: "Tenis",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    offers: [
      { store: "Nike", price: 2399, url: "#" },
      { store: "Liverpool", price: 2499, url: "#" },
      { store: "Palacio de Hierro", price: 2699, url: "#" },
      { store: "Innovasport", price: 2449, url: "#" },
    ],
  },
  {
    id: "adidas-samba-og",
    name: "Adidas Samba OG",
    brand: "Adidas",
    category: "Tenis",
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=80",
    offers: [
      { store: "Adidas", price: 2199, url: "#" },
      { store: "Liverpool", price: 2299, url: "#" },
      { store: "Palacio de Hierro", price: 2399, url: "#" },
    ],
  },
  {
    id: "polo-ralph-lauren-navy",
    name: "Polo Ralph Lauren Classic Fit",
    brand: "Ralph Lauren",
    category: "Playeras",
    image:
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=900&q=80",
    offers: [
      { store: "Liverpool", price: 1899, url: "#" },
      { store: "Palacio de Hierro", price: 2099, url: "#" },
    ],
  },
];