
export interface IMenuProps {
    id: string;
    items?: IMenuItem[];
}

export interface IMenuState {
    isVisible: boolean;
    top: number;
    left: number;
}

export interface IMenuItem {
    label: string;
    action?: {(args?: null | number | string): void};
    args?: string;
}

export interface IContextMenu extends React.PureComponent{
    id?: string;
}

export interface IContextMenuTrigger extends React.PureComponent {
    id?: string;
    showContextMenu?: (event: React.MouseEvent<HTMLElement>) => void;
}