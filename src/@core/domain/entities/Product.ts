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
  PETSHOP = 'PETSHOP',
  SAUDE = 'SAUDE',
  INFORMATICA = 'INFORMATICA',
  JARDIM = 'JARDIM',
  BEBIDAS = 'BEBIDAS',
  ARTIGOS_FESTA = 'ARTIGOS_FESTA',
  JOIAS = 'JOIAS',
  CALCADOS = 'CALCADOS',
  ARTESANATO = 'ARTESANATO',
  PAPELARIA = 'PAPELARIA',
  MUSICA = 'MUSICA',
  VIDEO_GAME = 'VIDEO_GAME',
  SERVICOS = 'SERVICOS',
  INDUSTRIAL = 'INDUSTRIAL',
  CONSTRUCAO = 'CONSTRUCAO',
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
