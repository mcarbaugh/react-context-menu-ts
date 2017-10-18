import React from 'react';
import { contextMenus } from './helpers.js';
import './component.css';

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
            return this.props.children.map((child) => {
                index++;
                let key = "context-menu-" + index;
                return (
                    <div
                         className="context-menu-item"
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
                className,
                id
            } = this.props;
        
        if (!this.state.isVisible)
            return <div/>
            
        return(
            <div id={id}
                 ref={id}
                 className={className} 
                 role="menu" 
                 tabIndex="-1"
            >
                <div className="menu-items-container" tabIndex="-1">
                    {this.renderChildren(children)}
                </div>
            </div>
        )
    }
}

export class MenuItem extends React.Component {
    render() {
        const { id
        } = this.props;

        return(
            <div className="context-menu-item-content" 
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
            <div id={id} onContextMenu={() => this.handleRightClick(id)}>
                {this.props.children}
            </div>
        );
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
