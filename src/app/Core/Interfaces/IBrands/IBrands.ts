// In src/app/Core/Interfaces/IBrands/ibrands.ts
export interface IBrands {
  results: number;
  metadata: Metadata;
  data: IBrand[];
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}

export interface IBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
