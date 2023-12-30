
import Link from "next/link";
import { Fragment } from "react";
import { getDatabase, getPage, getBlocks } from "@/lib/notion.js";
import { databaseId } from "@/app/projects/page";
import { Text } from '@/app/projects/[slug]/text'

const renderBlock = (block) => {
  const { type, id } = block;
  const value = block[type];
  
  switch (type) {
    case "paragraph":
      return (
        <p>
          <Text text={value.rich_text} />
        </p>
      );
    case "heading_1":
      return (
        <h1>
          <Text text={value.rich_text} />
        </h1>
      );
    case "heading_2":
      return (
        <h2>
          <Text text={value.rich_text} />
        </h2>
      );
    case "heading_3":
      return (
        <h3>
          <Text text={value.rich_text} />
        </h3>
      );
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <li>
          <Text text={value.rich_text} />
        </li>
      );
    case "to_do":
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />{" "}
            <Text text={value.rich_text} />
          </label>
        </div>
      );
    case "toggle":
      return (
        <details>
          <summary>
            <Text text={value.rich_text} />
          </summary>
          {value.children?.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </details>
      );
    case "child_page":
      return <p>{value.title}</p>;
    case "image":
      const src =
        value.type === "external" ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0].plain_text : "";
      return (
        <figure>
          <img src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    default:
      return `❌ Unsupported block (${
        type === "unsupported" ? "unsupported by Notion API" : type
      })`;
  }
};

export default async function Page({ params }) {
    const id = params.slug;

    const page = await getPage(id);
    const blocks = await getBlocks(id);

    const childBlocks = await Promise.all(
        blocks
        .filter((block) => block.has_children)
        .map(async (block) => {
            return {
            id: block.id,
            children: await getBlocks(block.id),
            };
        })
    );
    const blocksWithChildren = blocks.map((block) => {
        if (block.has_children && !block[block.type].children) {
            block[block.type]["children"] = childBlocks.find(
                (x) => x.id === block.id
            )?.children;
        }
        return block;
    });

    if (!page || !blocks) {
        return <div />;
    }
    return (   
        <article>
        <h1>
            <Text text={page.properties.Name.title} />
        </h1>
        <section>
            {blocks.map((block) => (
                <Fragment key={block.id}>{renderBlock(block)}</Fragment>
            ))}
        </section>
        </article>
    );
}