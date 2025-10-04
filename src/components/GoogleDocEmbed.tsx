import React from "react";

type Props = {
  publicUrl: string;
  height?: string | number;
  className?: string;
};

function extractDocId(url: string): string | null {
  const m =
    url.match(/\/d\/([a-zA-Z0-9-_]+)/) ||
    url.match(/[?&]id=([a-zA-Z0-9-_]+)/);
  return m ? m[1] : null;
}

const GoogleDocEmbed: React.FC<Props> = ({
  publicUrl,
  className,
}) => {
  const id = extractDocId(publicUrl);
  if (!id) return <div>Invalid Google Docs link</div>;

  const src = `https://docs.google.com/document/d/${id}/preview`;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
      className={className}
    >
      <iframe
        title="Google Doc"
        src={src}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
        frameBorder={0}
        allowFullScreen
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
      />
    </div>
  );
};

export default GoogleDocEmbed;
