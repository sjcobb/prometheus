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
          proxyUrl: '/data/m3',
        };
      }
      return undefined;
    },
    // getGlobalDatasource: async (selector) => {
    //   return fetchGlobalDatasourceList(selector.kind, selector.name ? undefined : true, selector.name).then((list) => {
    //     // hopefully it should return at most one element
    //     if (list[0] !== undefined) {
    //       return {
    //         resource: list[0],
    //         proxyUrl: getProxyUrl(list[0]),
    //       };
    //     }
    //   });
    // },
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

// const datasource: GlobalDatasource = {
//   kind: 'GlobalDatasource',
//   metadata: {
//     name: 'PrometheusDemo',
//     created_at: '',
//     updated_at: '',
//     version: 0,
//   },
//   spec: {
//     default: true,
//     display: {
//       name: 'Prometheus Demo',
//     },
//     plugin: {
//       kind: 'PrometheusDatasource',
//       spec: {
//         // direct_url: 'https://prometheus.demo.do.prometheus.io',
//         direct_url: 'http://localhost:9090',
//       },
//     },
//   },
// };

// const datasource: GlobalDatasource = {
//   kind: 'GlobalDatasource',
//   metadata: {
//     name: 'PrometheusDemo',
//     created_at: '',
//     updated_at: '',
//     version: 0,
//   },
//   spec: {
//     default: true,
//     plugin: {
//       kind: 'PrometheusDatasource',
//       spec: {
//         proxy: {
//           kind: 'HTTPProxy',
//           spec: { url: 'https://prometheus.demo.do.prometheus.io' },
//         },
//       },
//     },
//   },
// };

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
