import { memo, useMemo } from 'react';

interface CaptionIconProps {
  text: string;
  imagePath: string;
  layout?: 'column' | 'row';
  gap?: number | string;
  fontSize?: number | string;
  iconScale?: number;
}

const CaptionIcon = memo<CaptionIconProps>(({
  text = "Language",
  imagePath = "",
  layout = 'column',
  gap = 7,
  fontSize = '1rem',
  iconScale = 1.5
}) => {
  const isRow = layout === 'row';

  const containerStyle = useMemo(() => ({
    display: 'flex',
    flexDirection: isRow ? 'row' as const : 'column' as const,
    alignItems: 'center' as const,
    textAlign: isRow ? 'left' as const : 'center' as const,
    gap: gap,
    fontSize: fontSize,
    paddingRight: isRow ? gap : 0
  }), [isRow, gap, fontSize]);

  const imgStyle = useMemo(() => ({
    width: `${iconScale}em`,
    height: `${iconScale}em`,
    display: 'inline-block',
  }), [iconScale]);

  return (
    <div style={containerStyle}>
      <img
        src={imagePath}
        style={imgStyle}
        alt={text}
        loading="lazy"
      />
      <span>{text}</span>
    </div>
  );
});

CaptionIcon.displayName = 'CaptionIcon';

export default CaptionIcon;
