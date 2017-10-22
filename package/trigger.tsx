import * as React from 'react';
import * as Constants from './constants';
import { IContextMenuTrigger } from './interfaces';
import { ContextMenuHelper } from './helper';

interface Props {
    id: string;
    args?: null | undefined | number | string;
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
        menuHelper.showMenuById(this.props.id, this.props.args, event.clientY, event.clientX);
    }
}
