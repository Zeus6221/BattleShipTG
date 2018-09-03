import { ContentCell } from "../enumerations/content-cell.enum";

export interface FireTarget {
    Row: number;
    Column: number;
    Content: ContentCell;
    Side: string;
    Id: string;
    PlayerId: string;
}
