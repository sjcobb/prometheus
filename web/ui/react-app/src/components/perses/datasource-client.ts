import { Datasource, fetchJson, GlobalDatasource } from '@perses-dev/core';
import buildURL from './url-builder';

const datasourceResource = 'datasources';
const globalDatasourceResource = 'globaldatasources';

function buildDatasourceQueryParameters(kind?: string, defaultDatasource?: boolean, name?: string) {
  const q = new URLSearchParams();
  if (kind !== undefined) {
    q.append('kind', kind);
  }
  if (defaultDatasource !== undefined) {
    q.append('default', String(defaultDatasource));
  }
  if (name !== undefined) {
    q.append('name', name);
  }
  return q;
}

export function fetchDatasourceList(project: string, kind?: string, defaultDatasource?: boolean, name?: string) {
  const url = buildURL({
    resource: datasourceResource,
    project: project,
    queryParams: buildDatasourceQueryParameters(kind, defaultDatasource, name),
  });
  return fetchJson<Datasource[]>(url);
}

export function fetchGlobalDatasourceList(kind?: string, defaultDatasource?: boolean, name?: string) {
  const url = buildURL({
    resource: globalDatasourceResource,
    queryParams: buildDatasourceQueryParameters(kind, defaultDatasource, name),
  });
  return fetchJson<GlobalDatasource[]>(url);
}
