import * as React from 'react';
import { bounds, isCollided } from '../../shared/utils';
import * as I from '../../shared/interfaces';
import { TweenLite, Elastic } from 'gsap';

interface OptionalProps {
  damp?: number;
  delay?: number;
  padding?: number;
}

interface Props extends OptionalProps {
    loaded: boolean;
    children(props: Object): any;
}

/**
 * Assumtions:
 * - Children must be one single element. Magnetic uses it's bounds to calculate the effect params
 */
class Magnetic extends React.Component<Props> {

  public static defaultProps: OptionalProps = {
    damp: 0.5,
    padding: 0,
    delay: 0,
  };

  childRef: HTMLElement | null;
  childBounds: I.Bounds;
  mouseCoords: {
    x: number,
    y: number,
  };
  isHooked: boolean = false;

  componentDidMount() {
    window.addEventListener('mousemove', this.updateMouseCoords);
    this.raf();
  }

  componentWillUpdate(nextProps: Props) {
    if (nextProps.loaded !== this.props.loaded && nextProps) {
      this.registerBounds();
    }
  }

  render() {
    return (
      (typeof this.props.children === 'function')
        ? this.props.children({
          setRef: this.setChildRef
        })
        : console.log('Damn! Magnetic can\'t render this children!', this.props.children)
    );
  }

  raf = () => {
    const safaMove = this.props.loaded && this.childBounds && this.mouseCoords;
    if (safaMove && isCollided(this.mouseCoords, this.childBounds)) {
      const damp = this.props.damp || 1;
      TweenLite.to(this.childRef, 0.3, {
        x: (this.mouseCoords.x - this.childBounds.left - (this.childBounds.width / 2)) * damp,
        y: (this.mouseCoords.y - this.childBounds.top - (this.childBounds.height / 2)) * damp,
      });
      this.isHooked = true;
    }
    if (safaMove && !isCollided(this.mouseCoords, this.childBounds) && this.isHooked) {
      TweenLite.to(this.childRef, 1.5, {
        x: 0,
        y: 0,
        ease: Elastic.easeOut.config(1, 0.3),
        onComplete: this.clean
      });
      this.isHooked = false;
    }
    requestAnimationFrame(this.raf);
  }

  updateMouseCoords = (e: MouseEvent) => {
    this.mouseCoords = {
      x: e.clientX,
      y: e.clientY,
    };
  }

  registerBounds() {
    if (this.childRef) {
      const { padding } = this.props;
      const b: I.Bounds = bounds(this.childRef);
      this.childBounds = {
        bottom: b.bottom + padding!,
        height: b.height + (padding! * 2),
        left: b.left - padding!,
        right: b.right + padding!,
        top: b.top - padding!,
        width: b.width + (padding! * 2),
      };
    }
  }

  clean = () => {
    TweenLite.set(this.childRef, {
      clearProps: 'transform'
    });
  }

  setChildRef = (ref: HTMLElement) => this.childRef = ref;

}

export default Magnetic;