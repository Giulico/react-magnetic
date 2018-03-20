import * as React from 'react';
import './App.css';
import Magnetic from '../Magnetic/Magnetic';
import Button from '../Button/Button';

type MagneticProps = {
  setRef(ref: HTMLElement): void
};

const loaded = () => ({ loaded: true });

class App extends React.Component {

  state = {
    loaded: false
  };

  componentDidMount() {
    window.addEventListener('load', e => {
      this.setState(loaded);
    });
  }

  render() {
    return (
      <div className="App">
        <Magnetic
          padding={100}
          loaded={this.state.loaded}
        >
          {(magnetic: MagneticProps) => <Button setRef={magnetic.setRef} text="hover me" />}
        </Magnetic>
      </div>
    );
  }
}

export default App;
