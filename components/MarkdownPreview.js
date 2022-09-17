import md from "markdown-it";
export default function MarkdownPreview({about}) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: md({
          html: true,
          linkify: true,
          typographer: true,
          xhtmlOut: true,
        }).render(about?about:""),
      }}
    />
  );
}
