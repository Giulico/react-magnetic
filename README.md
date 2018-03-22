# react-magnetic
HOC that converts DOM element into magnet.



[![React title slider](https://media.giphy.com/media/8AjafeLU37sPc6PX3Z/giphy.gif)](https://giulico.github.io/react-magnetic/)

[Demo](https://giulico.github.io/react-magnetic/)

## Example
```javascript
  <Magnetic
    loaded={this.state.loaded}
  >
    {(magnetic: MagneticProps) => <Button setRef={magnetic.setRef} text="hover me" />}
  </Magnetic>
```

You only need to tell Magnetic which is the DOM element to animate (calling `props.setRef()`) and when the DOM is loaded (with `props.loaded`)

## Optional props

- `padding` (default: 0) - Magnet could starts move when the mouse is close to it
- `damp` (default: 0.5) - The magnet strenght
