import { Board } from "./board";

export interface Game {
    LeftBoard: Board;
    RightBoard: Board;
    Id: string;
}
