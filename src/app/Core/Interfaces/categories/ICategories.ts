// src/app/Core/Interfaces/categories/ICategories.ts
export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface ICategories {
  data: ICategory[];
  message?: string;  // optional, if not always present
  status?: string;   // optional, if not always present
}
