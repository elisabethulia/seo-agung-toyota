export interface Car {
  id: string;
  name: string;
  slug: string;
  type: string;
  price: number;
  image: string;
  colors: string[];
  description: string;
  features: string[];
}

export const cars: Car[] = [
  {
    id: "1",
    name: "Toyota Avanza",
    slug: "toyota-avanza",
    type: "MPV",
    price: 239700000,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1000&auto=format&fit=crop", // placeholder
    colors: ["Putih", "Hitam", "Silver", "Abu-abu"],
    description: "Mobil keluarga legendaris yang kini hadir dengan desain lebih modern, ruang kabin lebih luas, dan fitur keselamatan yang lebih lengkap. Avanza terbaru siap menemani perjalanan keluarga Anda dengan nyaman dan aman.",
    features: ["7 Seater", "Mesin 1.5L Dual VVT-i", "Toyota Safety Sense (TSS)", "Head Unit 9 Inch"]
  },
  {
    id: "2",
    name: "Toyota Kijang Innova Zenix",
    slug: "toyota-innova-zenix",
    type: "MPV / Crossover",
    price: 430400000,
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=1000&auto=format&fit=crop", // placeholder
    colors: ["Platinum White Pearl", "Attitude Black", "Silver Metallic"],
    description: "Kijang Innova generasi terbaru yang bertransformasi menjadi crossover dengan platform TNGA dan opsi mesin Hybrid. Memberikan kenyamanan kelas atas layaknya mobil premium.",
    features: ["Platform TNGA", "Opsi Hybrid EV", "Panoramic Retractable Roof", "Captain Seat"]
  },
  {
    id: "3",
    name: "Toyota Fortuner",
    slug: "toyota-fortuner",
    type: "SUV",
    price: 573700000,
    image: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=1000&auto=format&fit=crop", // placeholder
    colors: ["Super White", "Attitude Black", "Dark Gray Mica"],
    description: "Tangguh di segala medan dan elegan di jalanan perkotaan. SUV kebanggaan Toyota dengan performa mesin diesel yang bertenaga serta fitur modern untuk petualangan Anda.",
    features: ["Mesin Diesel 2.8L", "Desain Eksterior GR Sport", "Kick Sensor Power Back Door", "Surround Monitor"]
  },
  {
    id: "4",
    name: "Toyota Yaris Cross",
    slug: "toyota-yaris-cross",
    type: "SUV Compact",
    price: 351000000,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1000&auto=format&fit=crop", // placeholder
    colors: ["Super White", "Attitude Black", "Spicy Scarlet"],
    description: "SUV Compact yang stylish, dilengkapi teknologi Hybrid EV pertama di kelasnya. Yaris Cross menawarkan efisiensi bahan bakar maksimal dengan desain yang memikat para jiwa muda.",
    features: ["Teknologi Hybrid EV", "Panoramic Glass Roof", "Toyota Safety Sense (TSS)", "Multicolor Ambient Illumination"]
  }
];

export const getCarBySlug = (slug: string): Car | undefined => {
  return cars.find(car => car.slug === slug);
};
