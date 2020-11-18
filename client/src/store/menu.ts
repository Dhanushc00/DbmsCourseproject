import Axios from "../axios";

export interface Imenuvalues {
  id: string;
  name: string;
  qty: number;
  price: number;
}

export interface IItemMenu {
  ItemID: string;
  ItemPrice: number;
  ItemName: string;
  Item_Status: string;
  Quantity: number;
}

export type ItemMenuAction = {
    type: string
    id: number
}
