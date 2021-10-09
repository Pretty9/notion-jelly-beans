import { uuidToId } from 'notion-utils'
import { config, inversePageUrlOverrides } from "./config"

import {
    parsePageId,
    getCanonicalPageId as getCanonicalPageIdImpl
  } from 'notion-utils'

  
export const mapPageUrl = (recordMap) => (pageId='') => {

    for(let index in config.skip) {
        const skip = config.skip[index]
        if(uuidToId(pageId) == skip.pageId) {
            return skip.to
        }
    }

    if(uuidToId(pageId) == config.notion.rootNotionPageId) {
        return '/'
    } else {
        return `/${getCanonicalPageId(pageId, recordMap)}`
    }
}

export function getCanonicalPageId(pageId, recordMap) {
    const cleanPageId = parsePageId(pageId, { uuid: false })
    if(!cleanPageId) {
        return null
    }
    const override = inversePageUrlOverrides[cleanPageId]
    if (override) {
        return override
    } else {
        return getCanonicalPageIdImpl(pageId, recordMap, { uuid: true})
    }
}