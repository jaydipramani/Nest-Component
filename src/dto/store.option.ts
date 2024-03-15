import { StoreType } from "./StoreType";


export type StoreOptions = Partial<{
  storeName: string;
  storeType: StoreType;
  storeDir: string;
}>;