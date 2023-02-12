import { Datasource, GlobalDatasource } from '@perses-dev/core';
import { DatasourceStoreProviderProps } from '@perses-dev/dashboards';
// import { fetchGlobalDatasourceList } from './datasource-client';

export function useDatasourceApi(): DatasourceStoreProviderProps['datasourceApi'] {
  return {
    getDatasource: async (/*project, selector*/) => {
      return undefined;
    },
    getGlobalDatasource: async (selector) => {
      if (selector.kind === 'PrometheusDatasource' && selector.name === undefined) {
        return {
          resource: datasource,
          proxyUrl: '',
          // proxyUrl: 'http://localhost:9090',
        };
      }
      return undefined;
    },
    listDatasources: async (/*project, pluginKind*/) => {
      return [];
    },
    listGlobalDatasources: async (pluginKind) => {
      if (pluginKind === datasource.spec.plugin.kind) {
        return [datasource];
      }
      return [];
    },
  };
}

const datasource: GlobalDatasource = {
  kind: 'GlobalDatasource',
  metadata: {
    name: 'PrometheusDemoBrowser',
    created_at: '',
    updated_at: '',
    version: 0,
  },
  spec: {
    default: false,
    plugin: {
      kind: 'PrometheusDatasource',
      spec: { direct_url: 'https://prometheus.demo.do.prometheus.io' },
    },
  },
};

// Helper function for getting a proxy URL from a datasource or global datasource
export function getProxyUrl(datasource: Datasource | GlobalDatasource) {
  let url = `/proxy`;
  if (datasource.kind === 'Datasource') {
    url += `/projects/${encodeURIComponent(datasource.metadata.project)}`;
  }
  url += `/${datasource.kind.toLowerCase()}s/${encodeURIComponent(datasource.metadata.name)}`;
  return url;
}
