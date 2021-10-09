import { config } from '../lib/config'
import NotionPage from '../components/NotionPage'
import Notion from '../lib/notion'

export async function getStaticProps() {
  const recordMap = await Notion.getPage(config.notion.rootNotionPageId)
  return { props: { recordMap } }
}


export default function Home({ recordMap }) {
  return (
    <NotionPage recordMap={recordMap} pageId={config.notion.rootNotionPageId}/>
  )
}
