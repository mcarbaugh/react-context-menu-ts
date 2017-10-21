import * as React from "react";
import * as Constants from "./Constants";
import { IContextMenuEnabled } from "./Interfaces";
import { ContextMenuHelper } from "./ContextMenuHelper";

interface IProps {
    id: string;
}

interface IState {

}

export class MenuWrapper extends React.PureComponent <IProps, IState> implements IContextMenuEnabled {
    public constructor(props: IProps) {
        super(props);
        this.handleRightClick.bind(this);
    }

    public render() {
        const {
            id
        } = this.props;
        
        return(
            <div 
                id={id} 
                className={Constants.CLASS_MENU_WRAPPER}
                onContextMenu={(event: React.MouseEvent<HTMLElement>) => this.handleRightClick(event)}
            >
                {this.props.children}
            </div>
        );
    }

    public handleRightClick(event: React.MouseEvent<HTMLElement>) {
        const menuHelper = ContextMenuHelper.getInstance();
        menuHelper.showMenuById(this.props.id, event.clientY, event.clientX);
    }
}
