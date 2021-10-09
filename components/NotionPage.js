// react lib
// import { useRouter } from '_next@11.1.2@next/dist/client/router'

// nextjs lib
import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

// notion lib
import { NotionRenderer, Code, Collection, CollectionRow } from 'react-notion-x'
import { getPageTitle } from 'notion-utils'


// other lib
import useDarkMode from 'use-dark-mode'
import { Tweet, TwitterContextProvider } from 'react-static-tweets'
import cs from 'classnames'

// user lib
import { Loading } from './Loading'

// 自定义样式
import styles from './styles.module.css'

// 配置文件
import { config } from '../lib/config'
import NotionFooter from './NotionFooter'
import { mapPageUrl } from '../lib/map-page-url'


// --------override components------------
const Pdf = dynamic(() => import('react-notion-x').then((notion) => notion.Pdf))

const Equation = dynamic(() =>
    import('react-notion-x').then((notion) => notion.Equation)
)


const Modal = dynamic(
    () => import('react-notion-x').then((notion) => notion.Modal),
    { ssr: false }
)
// ------------------------------------------


export default function NotionPage({ recordMap, pageId }) {
    //
    const router = useRouter()
   

    // Notion页面Title
    const title = getPageTitle(recordMap) || config.name

    // 夜晚模式
    const darkMode = useDarkMode(false, { classNameDark: 'dark-mode' })

    if (router.isFallback) {
        return <Loading />
    }
    
    //
    const siteMapPageUrl = mapPageUrl(recordMap)
    return (
        <>
            <Head>
                <title> {title} </title>
            </Head>

            <NotionRenderer
                bodyClassName={cs(
                    styles.notion,
                    pageId === config.notion.rootNotionPageId && 'index-page'
                )}
                components={{
                    pageLink: ({
                        href,
                        as,
                        passHref,
                        prefetch,
                        replace,
                        scroll,
                        shallow,
                        locale,
                        ...props
                    }) => (
                        <Link
                            href={href}
                            as={as}
                            passHref={passHref}
                            prefetch={prefetch}
                            replace={replace}
                            scroll={scroll}
                            shallow={shallow}
                            locale={locale}
                        >
                            <a {...props} />
                        </Link>
                    ),
                    code: Code,
                    collection: Collection,
                    collectionRow: CollectionRow,
                    tweet: Tweet,
                    modal: Modal,
                    pdf: Pdf,
                    equation: Equation
                }}
                footer={
                    <NotionFooter
                        isDarkMode={darkMode.value}
                        toggleDarkMode={darkMode.toggle}
                    />
                }
                mapPageUrl={siteMapPageUrl}
                recordMap={recordMap}
                darkMode={darkMode.value}
                rootPageId={config.notion.rootNotionPageId}
                fullPage={true}
            />
        </>
    )
}