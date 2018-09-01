import { ContentCell } from "../enumerations/content-cell.enum";

export interface FireTarget {
    row:number;
    column:number;
    content: ContentCell
    id :string;
}
