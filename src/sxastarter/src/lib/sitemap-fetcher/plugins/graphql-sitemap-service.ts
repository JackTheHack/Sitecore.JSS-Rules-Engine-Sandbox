import {
  StaticPath,
  constants,
  SiteInfo,
} from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';
import { SitemapFetcherPlugin } from '..';
import { GetStaticPathsContext } from 'next';
import { siteResolver } from 'lib/site-resolver';
import { MultisitePersonalizeGraphQLSitemapService} from 'sitecore-jss-rule-engine-nextjs'

class GraphqlSitemapServicePlugin implements SitemapFetcherPlugin {
  _graphqlSitemapService: MultisitePersonalizeGraphQLSitemapService;

  constructor() {
    this._graphqlSitemapService = new MultisitePersonalizeGraphQLSitemapService({
      endpoint: config.graphQLEndpoint,
      apiKey: config.sitecoreApiKey,
      sites: [...new Set(siteResolver.sites.map((site: SiteInfo) => site.name))],
    });
  }

  async exec(context?: GetStaticPathsContext): Promise<StaticPath[]> {
    if (process.env.JSS_MODE === constants.JSS_MODE.DISCONNECTED) {
      return [];
    }
    return process.env.EXPORT_MODE
      ? this._graphqlSitemapService.fetchExportSitemap(config.defaultLanguage)
      : this._graphqlSitemapService.fetchSSGSitemap(context?.locales || []);
  }
}

export const graphqlSitemapServicePlugin = new GraphqlSitemapServicePlugin();
