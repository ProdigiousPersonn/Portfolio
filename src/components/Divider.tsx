import { Component, createRef } from "react";
import "@styles/Components/Divider.css";

interface DividerProps {
  text: string;
  duration?: number;
  className?: string;
  textSize?: string | number;
}

class Divider extends Component<DividerProps> {
  containerRef = createRef<HTMLDivElement>();

  generateTextRepeats(text: string) {
    const repeats: JSX.Element[] = [];
    for (let i = 0; i < 20; i++) {
      repeats.push(<span key={i}>{text}</span>);
    }
    return repeats;
  }

  render() {
    const { text, duration = 10, className = "", textSize = "24px" } = this.props;

    return (
      <div className={`dividerContainer ${className}`}>
        <div className="dividerLine"/>
        <div className="dividerMarquee" ref={this.containerRef}>
          <div
            className="dividerTrack"
            style={{ animationDuration: `${duration}s`, fontSize: textSize }}
          >
            {this.generateTextRepeats(text)}
          </div>
          <div
            className="dividerTrack"
            style={{ animationDuration: `${duration}s`, fontSize: textSize }}
          >
            {this.generateTextRepeats(text)}
          </div>
        </div>
        <div className="dividerLine"/>
      </div>
    );
  }
}

export default Divider;
