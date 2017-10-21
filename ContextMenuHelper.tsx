import * as Constants from "./Constants";
import { ContextMenu } from "./ContextMenu";
import { IContextMenu, IMenuState } from "./Interfaces";

export class ContextMenuHelper {
    
    private static _instance: ContextMenuHelper;
    private _menus: IContextMenu[];
    
    public static getInstance() {
        if (!ContextMenuHelper._instance) {
            ContextMenuHelper._instance = new ContextMenuHelper();
        }
        return this._instance;
    }

    public add(menu: IContextMenu) {
        try {
            const menus = this._menus;
            const index = this._menus.indexOf(menu);
 
            if (index === -1) {
                menus.push(menu);
            }

        } catch (error) {
            console.log(error);
        }
    }

    public remove(menu: IContextMenu) {
        try {
            const menus = this._menus;
            const index = this._menus.indexOf(menu);
            
            if (index > -1) {
                menus.splice(index, 1);
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    public showMenuById(id: string, newTop: number, newLeft: number) {
        const newState: IMenuState = {
            isVisible: true,
            top: newTop,
            left: newLeft,
        }

        const menus = this._menus as ContextMenu[];
        for (let menu of menus) {
            if (menu.props.id === id) {
                menu.setState(newState);
            } else {
                menu.setState(Constants.DEFAULT_MENU_STATE);
            }
        }
    }

    private constructor() {
        this._menus = [];
        window.onclick = this._handleWindowClick.bind(this);
        window.oncontextmenu = this._preventDefaultContextMenu;
    }

    private _preventDefaultContextMenu(event: PointerEvent) {
        event.preventDefault();
    }

    private _handleWindowClick() {
        for (let menu of this._menus) {
            menu.setState(Constants.DEFAULT_MENU_STATE);
        }
    }
}