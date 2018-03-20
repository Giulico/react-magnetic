import * as React from 'react';
import './Button.css';

type Props = {
  text: string,
  setRef(ref: HTMLElement | null): void
};

class Button extends React.Component<Props> {

  button: HTMLElement | null;

  componentDidMount() {
    if (typeof this.props.setRef === 'function') {
      this.props.setRef(this.button);
    }
  }

  render() {
    return (
      <button
        className="Button"
        ref={c => this.button = c}
      >
        {this.props.text}
      </button>
    );
  }

}

export default Button;