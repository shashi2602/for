import md from "markdown-it";
export function MarkdownPreview(props) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: md({
          html: true,
          linkify: true,
          typographer: true,
          xhtmlOut: true,
        }).render(props.about),
      }}
    />
  );
}
