import { getPageProperty } from 'notion-utils'

export function getPageTweet(block, recordMap) {
    return getPageProperty('Tweet', block, recordMap)
}