import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_KEY })

function getDataFromText(text_block) {
  console.log(text_block);
}

async function getText(blockId) {
  const response = await notion.blocks.children.list({
    block_id: blockId,
  });
  const result = response.results;
  var text_block = "";

  for (let i=0; i<result.length; i++) {
    const content_type = result[i].type;
    if (content_type === "paragraph") {
      const text = result[i].paragraph.text
      for (let j=0; j<text.length; j++) {
        text_block += text[j].plain_text + ' ';
      }
    }
  }
}

async function getData() {
  const databaseId = process.env.NOTION_DATABASE_ID;
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  const result = response.results

  for (let i=0; i<result.length; i++) {
    console.log("calling getText(" + result[i].id + ")");
    getText(result[i].id);
  }
}