import ReactDOM from 'react-dom';

let contextMenus = [];

window.onclick = handleWindowClick;
window.oncontextmenu = preventDefaultOnContextMenu;

function handleWindowClick(event) {
    for(var i = 0; i < contextMenus.length; i++) {
        let menu = contextMenus[i];

        if(!ReactDOM.findDOMNode(menu).contains(event.target)) {
            menu.setState({
                isVisible: false
            });
        }
    }
}

function preventDefaultOnContextMenu(e) {
    e.preventDefault();
}

export {
    contextMenus
}