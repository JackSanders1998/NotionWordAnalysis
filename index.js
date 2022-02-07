import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_KEY })

async function getText(blockId) {
  const response = await notion.blocks.children.list({
    block_id: blockId,
  });
  const result = response.results;
  console.log(result);

  for (let i=0; i<result.length; i++) {
    const content_type = result[i].type;

    console.log(content_type);
    console.log(result[i].paragraph);
    console.log(result[i].bulleted_list_item);
  }
}

async function getData() {
  const databaseId = process.env.NOTION_DATABASE_ID;
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  const result = response.results
  console.log(result);

  for (let i=0; i<result.length; i++) {
    console.log("calling getText(" + result[i].id + ")");
    getText(result[i].id);
  }
}


getData()