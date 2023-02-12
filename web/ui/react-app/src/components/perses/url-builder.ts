const apiPrefix = '/api/v1';

export type URLParams = {
  resource: string;
  name?: string;
  project?: string;
  queryParams?: URLSearchParams;
  apiPrefix?: string;
};

export default function buildURL(params: URLParams): string {
  let url = params.apiPrefix === undefined ? apiPrefix : params.apiPrefix;
  if (params.project !== undefined && params.project.length > 0) {
    url = `${url}/projects/${encodeURIComponent(params.project)}`;
  }
  url = `${url}/${params.resource}`;
  if (params.name !== undefined && params.name.length > 0) {
    url = `${url}/${encodeURIComponent(params.name)}`;
  }

  if (params.queryParams !== undefined) {
    url = `${url}?${params.queryParams.toString()}`;
  }
  return url;
}
