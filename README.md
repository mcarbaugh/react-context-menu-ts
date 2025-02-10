## react-context-menu-ts

#### 1.) Import the libraries into your project.
```ts
import * as ContextMenu from '../baseClasses/react-context-menu/index';
```
<br></br>
#### 2.) Implement a function in your class.
```ts
private saySomething(message: string) {
    alert(message);
}
```
<br></br>
#### 3.) Add markup to the the render() method.
```ts
<ContextMenu.Trigger id="ContextMenu", args: 'Hello there!'>
    <div>
      <h1>Hello World</div>
    </div>
</ContextMenu.Trigger>
<ContextMenu.Component
    id="ContextMenu" 
    items={[
        {label: 'Increment', action: incrementCounter},
        {label: 'Decrement', action: decrementCounter},
        {label: 'Reset', action: resetCounter},
        {label: 'Say Something', action: this.saySomething},
    ]}
/>
```

