import { ContentCell } from "../enumerations/content-cell.enum";
import { ShipInfo } from "./ship-info";

export interface FireTarget {
    Row: number;
    Column: number;
    Content: ContentCell;
    Side: string;
    Id: string;
    PlayerId: string;
    ShipInfo:ShipInfo;
}
