import React from 'react';
import { contextMenus } from './helpers.js';
import './component.css';

const CLASS_MENU_WRAPPER = "menu-wrapper";
const CLASS_CONTEXT_MENU = "context-menu";
const CLASS_MENU_ITEMS_CONTAINER = "menu-items-container";
const CLASS_MENU_ITEM = "context-menu-item";
const CLASS_MENU_ITEM_CONTENT = "context-menu-item-content";

let mousePosition = {
    x: 0,
    y: 0
}

export class ContextMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false
        };

        contextMenus.push(this);
    }

    renderChildren() {
        // handle zero children
        if(!this.props.children)
            return({})

        try {
            let index = 0;
            const children = React.Children.toArray(this.props.children);
            return children.map((child) => {
                index++;
                let key = "context-menu-" + index;
                return (
                    <div
                         className={CLASS_MENU_ITEM}
                         key={key} 
                         tabIndex="-1"
                    >
                         {child}
                    </div>
                )
            });
        }
        catch(error) {
            return({})
        }
    }

    render() {
        const { children,
                id
            } = this.props;
        
        if (!this.state.isVisible)
            return <div/>
            
        let top = mousePosition.y;
        let left = mousePosition.x;
        
        return(
            <div id={id}
                 ref={id}
                 className={CLASS_CONTEXT_MENU} 
                 role="menu" 
                 tabIndex="-1"
                 style={{position:"absolute", left, top}}
            >
                <nav className={CLASS_MENU_ITEMS_CONTAINER} tabIndex="-1">
                    {this.renderChildren(children)}
                </nav>
            </div>
        )
    }
}

export class MenuItem extends React.Component {
    render() {
        const { id
        } = this.props;

        return(
            <div className={CLASS_MENU_ITEM_CONTENT}
                 id={id} role="menuitem" 
                 tabIndex="-1" 
                 onClick={this.handleMenuItemClick.bind(this)}
            >
                {this.props.children}
            </div>
        )
    }

    handleMenuItemClick() {
        let click = this.props.onClick;
        if(click) {
            click();
        }

        for(var i = 0; i < contextMenus.length; i++) {
            contextMenus[i].setState({
                isVisible: false
            });
        }
    }
}

export class MenuWrapper extends React.Component {
    render() {
        const {
            id
        } = this.props;
        
        return(
            <div 
                id={id} 
                className={CLASS_MENU_WRAPPER}
                onContextMenu={() => this.handleRightClick(id)} 
                onMouseMove={this.handleMouseMove.bind(this)}
            >
                {this.props.children}
            </div>
        );
    }

    handleMouseMove(event) {
        mousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    }

    // open the correct <ContextMenu> when the <MenuWrapper> component is right-clicked
    // close the <ContextMenu> if the id doesn't match
    handleRightClick(id) {
        if (contextMenus) {
            for(var i = 0; i < contextMenus.length; i++) {
                var menu = contextMenus[i];
                if (menu.props.id === id) {
                    menu.setState({
                        isVisible: true
                    });
                }
                else {
                    menu.setState({
                        isVisible: false
                    });
                }
            }
        }
    }
}
