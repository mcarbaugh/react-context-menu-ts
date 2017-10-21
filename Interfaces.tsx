
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
    action?: () => void;
}

export interface IContextMenu extends React.PureComponent{
    id?: string;
}

export interface IContextMenuEnabled extends React.PureComponent {
    handleRightClick: (event: React.MouseEvent<HTMLElement>) => void;
}