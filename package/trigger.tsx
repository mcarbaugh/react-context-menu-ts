import * as React from 'react';
import * as Constants from './constants';
import { IContextMenuTrigger } from './interfaces';
import { ContextMenuHelper } from './helper';

interface Props {
    id: string;
}

interface State {

}

export class Trigger extends React.PureComponent <Props, State> implements IContextMenuTrigger {
    public constructor(props: Props) {
        super(props);
        this.showContextMenu = this.showContextMenu.bind(this);
    }

    public render() {
        const {
            id
        } = this.props;

        return(
            <div 
                id={id} 
                className={Constants.CLASS_MENU_WRAPPER}
                onContextMenu={this.showContextMenu}
            >
                {this.props.children}
            </div>
        );
    }

    public showContextMenu(event: React.MouseEvent<HTMLElement>) {
        const menuHelper = ContextMenuHelper.getInstance();
        menuHelper.showMenuById(this.props.id, event.clientY, event.clientX);
    }
}
