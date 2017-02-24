import { Thread } from "./index";

export interface Board {
    id: string;
    name: string;
    threads: Thread[];
}