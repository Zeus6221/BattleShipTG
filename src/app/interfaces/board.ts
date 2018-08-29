import { ImpactStatus } from "../enumerations/impact-status.enum";

export interface Board {
    positions: Array<Array<ImpactStatus>>;
}
