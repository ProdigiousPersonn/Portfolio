import { Component } from 'react';

interface CaptionIconProps {
  text: string;
  imageSize?: number;
  imagePath: string;
}

class CaptionIcon extends Component<CaptionIconProps> {
    render() {
        const { text = "Language", imagePath = "", imageSize = "50px" } = this.props;

        const containerStyle = {
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center' as const,
            textAlign: 'center' as const,
        };

        return (
            <div style={containerStyle}>
                <img 
                    src={imagePath} 
                    style={{ width: imageSize, height: imageSize }} 
                    alt={text} 
                />
                <p>{text}</p>
            </div>
        );
    }
}

export default CaptionIcon;
