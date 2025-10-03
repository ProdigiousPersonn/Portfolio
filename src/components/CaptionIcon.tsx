import { Component } from 'react';

interface CaptionIconProps {
  text: string;
  imagePath: string;
  layout?: 'column' | 'row';
  gap?: number | string;
  fontSize?: number | string;
  iconScale?: number;
}

class CaptionIcon extends Component<CaptionIconProps> {
    render() {
        const { 
            text = "Language", 
            imagePath = "", 
            layout = 'column',
            gap = 7,
            fontSize = '1rem',
            iconScale = 1.5
        } = this.props;

        const isRow = layout === 'row';

        const containerStyle = {
            display: 'flex',
            flexDirection: isRow ? 'row' as const : 'column' as const,
            alignItems: 'center' as const,
            textAlign: isRow ? 'left' as const : 'center' as const,
            gap: gap,
            fontSize: fontSize,
            paddingRight: isRow ? gap : 0
        };

        const imgStyle = {
            width: `${iconScale}em`,
            height: `${iconScale}em`,
            display: 'inline-block',
        };

        return (
            <div style={containerStyle}>
                <img 
                    src={imagePath} 
                    style={imgStyle} 
                    alt={text} 
                />
                <span>{text}</span>
            </div>
        );
    }
}

export default CaptionIcon;
