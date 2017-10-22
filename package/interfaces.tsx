
export interface IMenuProps {
    id: string;
    items?: IMenuItem[];
}

export interface IMenuState {
    isVisible: boolean;
    top: number;
    left: number;
    args?: null | undefined | number | string;
}

export interface IMenuItem {
    label: string;
    action?: {(args?: null | undefined | number | string): void};
}

export interface IContextMenu extends React.PureComponent{
    id?: string;
}

export interface IContextMenuTrigger extends React.PureComponent {
    id?: string;
    args?: null | undefined | number | string;
    showContextMenu?: (event: React.MouseEvent<HTMLElement>) => void;
}