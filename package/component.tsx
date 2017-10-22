import * as React from 'react';
import { ContextMenuHelper } from './helper';
import { IMenuItem, IMenuProps, IMenuState, IContextMenu } from './interfaces';
import * as Constants from './constants';
import './component.css';

export class Component extends React.PureComponent <IMenuProps, IMenuState> implements IContextMenu {
    public constructor(props: IMenuProps) {
        super(props);
        this.state = {
            isVisible: false,
            top: 0,
            left: 0,
        };
    }

    public componentDidMount() {
        const menuHelper = ContextMenuHelper.getInstance();
        menuHelper.add(this);
    }

    public componentWillUnmount() {
        const menuHelper = ContextMenuHelper.getInstance();
        menuHelper.remove(this);
    }

    public render() {
        const {
            id,
            items,
        } = this.props;
        
        const top = this.state.top;
        const left = this.state.left;
            
        if (!this.state.isVisible) {
            return <div id={id}/>;
        }        

        return (
            <div 
                id={id}
                ref={id}
                className={Constants.CLASS_CONTEXT_MENU} 
                role="menu"
                style={{position: 'absolute', top, left}}
            >
                <nav className={Constants.CLASS_MENU_ITEMS_CONTAINER}>
                    {this._renderItems(items)}
                </nav>
            </div>
        );
    }

    private _renderItems(items?: IMenuItem[]) {      
        try {
            if (!items) {
                return({});
            }

            const menuItems = items as IMenuItem[];
            return menuItems.map((item, i) => {

                const invokeAction = () => {
                    if (item.args && item.action) {
                        item.action(item.args);
                    } else if (item.action) {
                        item.action();
                    }
                };

                return (
                    <div
                        className={Constants.CLASS_MENU_ITEM}
                        key={'context-menu-' + i}
                        onClick={invokeAction}
                    >
                         {item.label}
                    </div>
                );
            });
        } catch (error) {
            return ({});
        }
    }
}