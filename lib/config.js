export const config = {
    author: 'Pretty9',
    name: 'Pretty9的空间站🚀',
    notion: {
        rootNotionPageId: 'f154ec1a48154fc083ac0ea3229700c1',
        rootNotionSpaceId: null,
    },
    social: {
        twitter: 'theGrapeWall',
        github: 'Pretty9'
    },
    override: {
        'index': 'f154ec1a48154fc083ac0ea3229700c1',
        'about': '3d9738f7ea9242aeb572e31aa1eea170',
        'note': '285d7bb00f34479088d0223f9d89290f',
        //'blog': 'b3546d3309af49f0810f15c0ad35205b',
        'contact': '68c5c2061e0c44ec98016fab2055b9d7'
    },
    skip: [
        //{ pageId: 'b3546d3309af49f0810f15c0ad35205b', to: 'https://pretty9.notion.site/pretty9/b3546d3309af49f0810f15c0ad35205b?v=f07da7a3cea54fb5901a5b44dc50a9e3' },
        
    ],
    icp: '辽ICP备19016095号-1',
    blogPageId: 'b3546d3309af49f0810f15c0ad35205b'
}

export const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV

export const inversePageUrlOverrides = Object.keys(config.override).reduce((acc, uri) => {
    const pageId = config.override[uri]

    return {
        ...acc,
        [pageId]: uri
    }
}, {})
