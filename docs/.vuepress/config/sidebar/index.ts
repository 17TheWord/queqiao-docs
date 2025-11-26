import type { SidebarOptions } from '@vuepress/theme-default'
import eventsV2Sidebar from './events/v2'
import eventsV1Sidebar from './events/v1'
import apiV2Sidebar from './api/v2'
import apiV1Sidebar from './api/v1'
import deploySidebar from './deploy'
import configSidebar from './config'
import standardDevSidebar from './development/standard-dev'
import quickStartSidebar from './development/quick-start'

export default {
    "/introduction": "heading",
    "/deploy/": deploySidebar,
    "/config/": configSidebar,
    "/commands": "heading",
    '/events/v2/': eventsV2Sidebar,
    "/events/v1/": eventsV1Sidebar,
    "/api/v2/": apiV2Sidebar,
    "/api/v1/": apiV1Sidebar,
    '/faq': 'heading',
    '/development/contributing/standard-dev/': standardDevSidebar,
    '/development/contributing/quick-start/': quickStartSidebar,
} as SidebarOptions
