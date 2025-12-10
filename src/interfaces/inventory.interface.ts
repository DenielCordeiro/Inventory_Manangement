import { Cellphone } from "./cellphone.interface";
import { Chip } from "./chip.interface";
import { Notebook } from "./notebook.interface";

export interface Inventory {
    chips?: Chip[];  
    cellPhones?: Cellphone[];
    notebooks?: Notebook[];
}