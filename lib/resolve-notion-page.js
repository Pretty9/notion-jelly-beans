
// 配置文件
import { parsePageId } from "notion-utils";
import { config } from "./config";

export function resolveNotionPageId(rawPageId) {
    let pageId = null

    if(rawPageId && rawPageId !== 'index') {
        pageId = parsePageId(rawPageId)
        if(!pageId) {
            pageId = config.override[rawPageId]
        }

    } else {
        pageId = config.notion.rootNotionPageId
    }
    
    if(!pageId) pageId = config.notion.rootNotionPageId

    return pageId
}
