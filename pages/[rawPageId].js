// notion lib
import { getAllPagesInSpace, idToUuid, uuidToId } from 'notion-utils'

// user lib
import Notion from '../lib/notion'
import { resolveNotionPageId } from '../lib/resolve-notion-page'
import NotionPage from '../components/NotionPage'
import { getCanonicalPageId } from '../lib/map-page-url'

//配置文件
import { config, isDev } from '../lib/config'


export async function getStaticProps({ params }) {
    try {
        const rawPageId = params.rawPageId
        const pageId = resolveNotionPageId(rawPageId)

        const recordMap = await Notion.getPage(pageId)

        return {
            props: {
                recordMap,
                pageId
            },
            revalidate: 10
        }
    } catch (err) {
        console.log('error: ', err)
        throw err;
    }
}

export async function getStaticPaths() {
    if (isDev) {
        return {
            paths: [],
            fallback: true
        }
    }

    const pageMap = await getAllPagesInSpace(
        config.notion.rootNotionPageId,
        config.notion.rootNotionSpaceId,
        Notion.getPage.bind(Notion),
        {
            traverseCollections: false
        }
    )


    const skips = config.skip.map((elem) => elem.pageId)

    const canonicalPageMap = Object.keys(pageMap).reduce((map, pageId) => {
        if (skips.indexOf(pageId) > -1) return map

        const recordMap = pageMap[pageId]
        if (!recordMap) {
            throw new Error(`Error loading page "${pageId}"`)
        }

        const canonicalPageId = getCanonicalPageId(pageId, recordMap)

        if (map[canonicalPageId]) {
            console.error('error duplicate canonical page id',
                canonicalPageId,
                pageId,
                map[canonicalPageId]
            )

            return map
        } else {
            return {
                ...map,
                [canonicalPageId]: pageId
            }
        }
    },
        {}
    )

    const paths = Object.keys(canonicalPageMap).map((rawPageId) => ({
        params: {
            rawPageId
        }
    }))

    return {
        paths: paths,
        fallback: true
    }
}

export default function notionPage({ recordMap, pageId}) {
    if (!recordMap) return null;
    return <NotionPage recordMap={recordMap} pageId={pageId}/>
}
