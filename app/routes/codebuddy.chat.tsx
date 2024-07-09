export default function Chat() {
  return (
    <div className="p-3  h-100">
      <div className="md-content" data-md-component="content">
        <article className="md-content__inner md-typeset">
          <div>
            <h1 id="introduction-to-focus-selection">
              Introduction to Focus Selection
              <a className="headerlink" href="#introduction-to-focus-selection" title="Permanent link">
                ¶
              </a>
            </h1>
            <p>
              codebuddy offers a versatile range of focuses to address various coding needs and scenarios, thereby
              enhancing your development experience through tailored support. Each focus is meticulously designed to
              harness capabilities, targeting specific aspects of your coding projects—from general coding queries to
              in-depth code analysis and documentation. Familiarizing yourself with these focuses will enable you to
              leverage codebuddy more effectively, ensuring you receive the most pertinent assistance precisely when you
              need it.
            </p>
            <h2 id="focus-options">
              Focus Options
              <a className="headerlink" href="#focus-options" title="Permanent link">
                ¶
              </a>
            </h2>
            <ul>
              <li>
                <p>
                  <a href="current-file/">
                    <strong>Current File</strong>
                  </a>
                  : Focuses on the current file you working on, allowing you to send selected code to codebuddy for
                  detailed analysis and assistance. Offers two focus options (Selected Lines, Selected Component) to
                  refine the context for responses. Supports a variety of commands tailored to enhancing your code
                  within the scope of the selected file.
                </p>
              </li>
              <li>
                <p>
                  <a href="git-diff/">
                    <strong>Git Diff</strong>
                  </a>
                  : Expands codebuddy focus to encompass changes across your entire project workspace, enabling you to
                  manage and review code changes effectively. This mode provides insights into local, staged, or
                  committed changes. Git-Diff supports commands for managing commits, documentation, code quality, and
                  more.
                </p>
              </li>
            </ul>
            <h2 id="selecting-a-focus">
              Selecting a Focus
              <a className="headerlink" href="#selecting-a-focus" title="Permanent link">
                ¶
              </a>
            </h2>
            <ol>
              <li>
                <strong>Add Focus</strong>: Within codebuddy chat, click on the <code>+</code> button, or type{" "}
                <code>@</code> in the chat and use the keyboard arrows.
              </li>
              <li>
                <strong>Choose Your Focus</strong>: Select the focus that best fits your current coding task or
                question. Consider the scope of your query and whether it pertains to general coding knowledge, specific
                code files, or broader project changes.
              </li>
              <li>
                <strong>Switch Focus as Needed</strong>: You can switch the focus at any time based on the evolving
                needs of your development work. codebuddy seamlessly adapts to the selected focus, providing
                contextually relevant assistance.
              </li>
            </ol>
          </div>
        </article>
      </div>
    </div>
  );
}
