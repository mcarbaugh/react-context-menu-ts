import { IMenuItem } from "./Interfaces";

export class MenuItem implements IMenuItem {
    label: string;
    action?: () => void;
}