export interface GalleryItem {
  id: string;
  type: 'photo' | 'screenshot';
  aspect: 'square' | 'tall' | 'wide';
  src?: string;
  quote?: string;
  author?: string;
  handle?: string;
  placeholder?: boolean;
}

export const galleryItems: GalleryItem[] = [
  { id: '1', type: 'screenshot', aspect: 'square', placeholder: true, quote: "Best Flutter conference in Africa! The sessions were next level 🚀", author: "Dev Mustapha", handle: "@devmustapha" },
  { id: '2', type: 'photo', aspect: 'tall', placeholder: true },
  { id: '3', type: 'screenshot', aspect: 'square', placeholder: true, quote: "The workshops at #FlutterBytes were so hands-on. Already applying it!", author: "Flutter Dev NG", handle: "@flutterdev_ng" },
  { id: '4', type: 'photo', aspect: 'square', placeholder: true },
  { id: '5', type: 'screenshot', aspect: 'square', placeholder: true, quote: "Met so many amazing devs at FBC2025. The networking is unmatched 🙌", author: "Mobile Engineer", handle: "@mobileengineer" },
  { id: '6', type: 'photo', aspect: 'tall', placeholder: true },
  { id: '7', type: 'screenshot', aspect: 'square', placeholder: true, quote: "FlutterBytes 2025 was incredible. The AI sessions opened my mind 🤯", author: "Nikki Flutter", handle: "@nikkiflutter" },
  { id: '8', type: 'photo', aspect: 'square', placeholder: true },
  { id: '9', type: 'screenshot', aspect: 'square', placeholder: true, quote: "Finally met my Flutter Twitter fam IRL at #FlutterBytes. Community >> ❤️", author: "Chisom Builds", handle: "@chisom_builds" },
  { id: '10', type: 'photo', aspect: 'tall', placeholder: true },
];
