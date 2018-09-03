import { FireTarget } from "./fire-target";

export interface Board {
    Positions: Array<Array<FireTarget>>;
    IdPlayer:string;
}
