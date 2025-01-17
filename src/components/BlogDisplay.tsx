import { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import '../styles/Markdown.css';
import '../styles/Code.css';

interface DisplayProps {
    fileName: string;
}

interface DisplayState {
    markdown: string;
}

class BlogDisplay extends Component<DisplayProps, DisplayState> {
  constructor(props: DisplayProps) {
    super(props);
    this.state = { markdown: '' };
  }

  componentDidMount() {
    const { fileName } = this.props;
    fetch(`/blogs/${fileName}.md`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((text) => {
        this.setState({ markdown: text });
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        this.setState({ markdown: 'Failed to load content.' });
      });
  }

  render() {
    const { markdown } = this.state;
    return (
      <ReactMarkdown className="markdown-body scrollPage is-top-overflowing">
        {markdown}
      </ReactMarkdown>
    );
  }
}

export default BlogDisplay;
