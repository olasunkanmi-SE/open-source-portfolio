import hljs from "highlight.js";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import "highlight.js/styles/atom-one-dark.css"; // Import the desired theme

interface IMarkDownPreview {
  markdown: string;
}
export const MarkDownPreview = ({ markdown }: IMarkDownPreview) => {
  useEffect(() => {
    hljs.highlightAll();
  }, [markdown]);

  return (
    <div>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
};
