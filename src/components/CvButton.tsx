import { forwardRef, AnchorHTMLAttributes } from "react";

const ResumeButton = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(
  (props, ref) => {
    return (
      <a
        ref={ref}
        className="cvButton bevelContainer"
        href="https://docs.google.com/document/d/15XsQiQ9Ve6SaYzA75a2NN_CBKZd0AZw5pGCpJen6u_k/export?format=pdf"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        Download Resume
      </a>
    );
  }
);

ResumeButton.displayName = "ResumeButton";

export default ResumeButton;
