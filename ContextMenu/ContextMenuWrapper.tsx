import * as React from "react";
import * as Constants from "./Constants";

interface IProps {

}

interface IState {

}

export class MenuWrapper extends React.PureComponent <IProps, IState> {
    render() {
        const {
            id
        } = this.props;
        
        return(
            <div 
                id={id} 
                className={Constants.CLASS_MENU_WRAPPER}
                // onContextMenu={() => this.handleRightClick(id)}
            >
                {this.props.children}
            </div>
        );
    }
/*
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
*/
}
