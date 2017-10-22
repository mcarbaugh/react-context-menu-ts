import * as Constants from './constants';
import { Component } from './component';
import { IContextMenu, IMenuState } from './interfaces';

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
            throw (error);
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
            throw (error);
        }
    }

    public showMenuById(id: string, newArgs: null | undefined | number | string, newTop: number, newLeft: number) {
        const newState: IMenuState = {
            isVisible: true,
            top: newTop,
            left: newLeft,
            args: newArgs
        };

        const menus = this._menus as Component[];
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