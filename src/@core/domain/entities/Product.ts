export enum ProductCategory {
  ELETRONICOS = 'ELETRONICOS',
  ROUPAS = 'ROUPAS',
  ELETRODOMESTICOS = 'ELETRODOMESTICOS',
  LIVROS = 'LIVROS',
  MERCEARIA = 'MERCEARIA',
  BELEZA = 'BELEZA',
  ESPORTES = 'ESPORTES',
  BRINQUEDOS = 'BRINQUEDOS',
  MOVEIS = 'MOVEIS',
  AUTOMOTIVO = 'AUTOMOTIVO',
  OUTROS = 'OUTROS',
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
