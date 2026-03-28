import { Category } from "./category";

export type Transaction = {
  id: string;
  amount: number;
  date: string;
  category: Category;
  note: string
};