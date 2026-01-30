export type Marketplace = {
  id: string;
  name: string;
  description: string;
  logo: string
};

export const MARKETPLACES: Marketplace[] = [
  {
    id: 'fravega',
    name: 'Frávega',
    description: 'Gestión de catálogo y precios',
    logo: '/marketplace/fravega.png',
  },
  {
    id: 'oncity',
    name: 'OnCity',
    description: 'Publicaciones y stock',
    logo: '/marketplace/oncity.png',
  },
  {
    id: 'megatone',
    name: 'Megatone',
    description: 'Ventas y sincronización',
    logo: '/marketplace/Megatone.svg',
  },
];