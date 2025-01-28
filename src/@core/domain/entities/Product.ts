export enum ProductCategory {
  ELETRONICOS = 'Eletrônicos',
  ROUPAS = 'Roupas',
  ELETRODOMESTICOS = 'Eletrodomésticos',
  LIVROS = 'Livros',
  MERCEARIA = 'Mercearia',
  BELEZA = 'Beleza',
  ESPORTES = 'Esportes',
  BRINQUEDOS = 'Brinquedos',
  MOVEIS = 'Móveis',
  AUTOMOTIVO = 'Automotivo',
  OTHER = 'Outros',
}

export class Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  description?: string;
  stockQuantity: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
    Object.assign(this, data);
  }
}
