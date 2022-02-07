import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_KEY })

async function getItem() {
  const pageId = 'afe8bd0509e84e2f88231f933260eec4';
  const response = await notion.pages.retrieve({ page_id: pageId });
  console.log(response);
  // const result = response.results;
  console.log(response);

  for (let i=0; i<result.length; i++) {
    const content_type = result[i].type;
    // console.log(content_type);
    // console.log(result[i]);
    // console.log(result[i]);
  }

  // const databaseId = 'afe8bd0509e84e2f88231f933260eec4';
  // const db_response = await notion.blocks.children.list({

  //   database_id: databaseId,
  // });
  // console.log(db_response);
}

getItem()
