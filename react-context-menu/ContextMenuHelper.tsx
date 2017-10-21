import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Constants from "./Constants";
import { IContextMenu, IMenuState } from "./Interfaces";

export class ContextMenuHelper {
    private static _instance: ContextMenuHelper;
    private _menus: IContextMenu[];

    private constructor() {
        this._menus = [];
        window.onclick = this._handleWindowClick.bind(this);
        window.oncontextmenu = this._preventDefaultContextMenu;
    }

    public getInstance() {
        if (!ContextMenuHelper._instance) {
            ContextMenuHelper._instance = new ContextMenuHelper();
        }

        return this;
    }

    public add(menu: IContextMenu) {
        try {
            const menus = this._menus;
            const index = this._menus.indexOf(menu);

            if(index === -1) {
                menus.push(menu);
            }

        } catch(error) {
            console.log(error);
        }
    }

    public remove(menu: IContextMenu) {
        try {
            const menus = this._menus;
            const index = this._menus.indexOf(menu);
            
            if(index > -1) {
                menus.splice(index, 1);
            }
            
        } catch(error) {
            console.log(error);
        }
    }

    public showMenuById(id: string, top: number, left: number) {
        const newState: IMenuState = {
            isVisible: true,
            top: top,
            left: left
        };

        for(let menu of this._menus) {
            if(menu.id === id) {
                  menu.setState(newState);
            } else {
                menu.setState(Constants.DEFAULT_MENU_STATE);
            }
        }
    }

    private _preventDefaultContextMenu(event: PointerEvent) {
        event.preventDefault();
    }

    private _handleWindowClick(event: PointerEvent) {
        for(let menu of this._menus) {
            menu.setState(Constants.DEFAULT_MENU_STATE);
        }
    }
}