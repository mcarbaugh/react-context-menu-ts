import * as React from "react";
import { ContextMenuHelper } from "./ContextMenuHelper";
import { IMenuItem } from "./IMenuItem";
import * as Constants from "./Constants";
import "./ContextMenu.css";

interface IProps {
    id?: string;
    items?: IMenuItem[];
}

interface IState {
    isVisible: boolean;
    top: number;
    left: number;
}

export class ContextMenu extends React.PureComponent <IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isVisible: false,
            top: 0,
            left: 0,
        };
    }

    public render() {
        const {
            id,
            items,
        } = this.props;
        
        const top = this.state.top;
        const left = this.state.left;
            
        if (!this.state.isVisible) {
            return <div/>
        }        
        
        return(
            <div 
                id={id}
                ref={id}
                className={Constants.CLASS_CONTEXT_MENU} 
                role="menu"
                style={{position:"absolute", left, top}}
            >
                <nav className={Constants.CLASS_MENU_ITEMS_CONTAINER}>
                    {this._renderItems(items)}
                </nav>
            </div>
        )
    }

    private _renderItems(items?: IMenuItem[]) {      
        try {
            if(!items) {
                return({})
            }

            return items.map((item, i) => {
                return (
                    <div
                         className={Constants.CLASS_MENU_ITEM}
                         key={"context-menu-" + i} 
                    >
                         {item}
                    </div>
                )
            });
        }
        catch(error) {
            return({})
        }
    }
}