
import requests, json, os
from dotenv import load_dotenv
# load_dotenv()

token = os.getenv('NOTION_KEY')
databaseId = os.getenv('NOTION_DATABASE_ID')
pageId = os.getenv('NOTION_PAGE_ID')
headers = {
    "Authorization": "Bearer " + token,
    "Content-Type": "application/json",
    "Notion-Version": "2021-05-13"
}

def textRid(text_block):

    f = open("journal.txt", "w")
    f.write(text_block)
    f.close()

    stream = os.popen('cat journal.txt | rid')
    output = stream.read()
    print(output)

    os.remove("journal.txt")


def readPage(pageId):
    readUrl = f"https://api.notion.com/v1/blocks/{pageId}/children?page_size=100"
    res = requests.request("GET", readUrl, headers=headers)
    data = res.json()

    bullet_count = 0
    paragraph_count = 0
    text_block = ""

    for i in range(len(data['results'])):
        block = data['results'][i]
        type = block['type']

        if len(block[type]['text']) > 0:
            if type == 'bulleted_list_item':
                bullet_count += 1
                text_block += block[type]['text'][0]['plain_text'] + " "
            elif type == 'paragraph':
                paragraph_count += 1
                text_block += block[type]['text'][0]['plain_text'] + " "

    print(bullet_count, "bullet points")
    print(paragraph_count, "paragraphs")
    textRid(text_block)
        

def readDatabase(databaseId):
    readUrl = f"https://api.notion.com/v1/databases/{databaseId}/query"

    res = requests.request("POST", readUrl, headers=headers)
    data = res.json()

    for i in range(len(data['results'])):
        print('Calling readPage(' + data['results'][i]['id'] + ')')
        readPage(data['results'][i]['id'])


# readDatabase(databaseId)
readPage(pageId)