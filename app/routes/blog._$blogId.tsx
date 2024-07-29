// import { json } from "@remix-run/node";
// import { useLoaderData } from "@remix-run/react";
// import { format } from "date-fns";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
// import ReactMarkdown from "react-markdown";
// import { Container, Badge } from "react-bootstrap";

// export const loader = async ({ params }) => {
//   // In a real app, you'd fetch this data from a database
//   const post = {
//     id: params.postId,
//     title: "Introduction to React Hooks",
//     date: "2024-07-15",
//     tags: ["react", "hooks"],
//     content: `
// # Introduction to React Hooks

// React Hooks are a powerful feature that allow you to use state and other React features without writing a class. Let's look at a simple example:

// \`\`\`jsx
// import React, { useState } from 'react';

// function Counter() {
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <p>You clicked {count} times</p>
//       <button onClick={() => setCount(count + 1)}>
//         Click me
//       </button>
//     </div>
//   );
// }
// \`\`\`

// This is just the beginning of what you can do with Hooks. They provide a more direct API to the React concepts you already know: props, state, context, refs, and lifecycle.
//     `,
//   };

//   return json({ post });
// };

// export default function Post() {
//   const { post } = useLoaderData();

//   return (
//     <Container className="my-4">
//       <h1 className="display-4 mb-3">{post.title}</h1>
//       <div className="mb-4 d-flex justify-content-between align-items-center">
//         <span className="text-muted">{format(new Date(post.date), "MMMM d, yyyy")}</span>
//         <div>
//           {post.tags.map((tag) => (
//             <Badge key={tag} bg="secondary" className="me-1">
//               #{tag}
//             </Badge>
//           ))}
//         </div>
//       </div>
//       <ReactMarkdown
//         children={post.content}
//         components={{
//           code({ node, inline, className, children, ...props }) {
//             const match = /language-(\w+)/.exec(className || "");
//             return !inline && match ? (
//               <SyntaxHighlighter
//                 children={String(children).replace(/\n$/, "")}
//                 style={atomDark}
//                 language={match[1]}
//                 PreTag="div"
//                 {...props}
//               />
//             ) : (
//               <code className={className} {...props}>
//                 {children}
//               </code>
//             );
//           },
//         }}
//       />
//     </Container>
//   );
// }
