import * as React from "react";
import * as Constants from "./Constants";

interface IProps {
    id: string;
}

interface IState {

}

export class MenuWrapper extends React.PureComponent <IProps, IState> {
    public constructor(props: IProps) {
        super(props);
        this._handleRightClick.bind(this);
    }

    public render() {
        const {
            id
        } = this.props;
        
        return(
            <div 
                id={id} 
                className={Constants.CLASS_MENU_WRAPPER}
                onContextMenu={(event: React.MouseEvent<HTMLElement>) => this._handleRightClick(event)}
            >
                {this.props.children}
            </div>
        );
    }

    private _handleRightClick(event: React.MouseEvent<HTMLElement>) {
        
    }
}
