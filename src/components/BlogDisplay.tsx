import { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import '../styles/Markdown.css'
import '../styles/Code.css'

interface Display {
    markdown: string;
}

class Display extends Component<any, any> {
  constructor(props : {}) {
    super(props);
    this.state = { markdown: '' };
  }

  componentDidMount() {
    fetch('public/blogs/test.md').then((response) => response.text())
        .then((text) => {
            this.setState({ markdown: text })
            console.log(text)
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        }
    );
      
  }

  render() {
    const state = this.state
    return <ReactMarkdown className="markdown-body">{state.markdown}</ReactMarkdown>;
  }
}

export default Display;
