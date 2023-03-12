import React from 'react';
import { Panel } from '@perses-dev/dashboards';

export function PromQueryPanel({ query }: { query: string }) {
  return (
    <Panel
      definition={{
        kind: 'Panel',
        spec: {
          display: {
            description: '',
            name: '',
          },
          plugin: {
            kind: 'TimeSeriesChart',

            spec: {
              legend: {
                position: 'Right',
              },
              queries: [
                {
                  kind: 'TimeSeriesQuery',
                  spec: {
                    plugin: {
                      kind: 'PrometheusTimeSeriesQuery',
                      spec: {
                        query,
                      },
                    },
                  },
                },
              ],
            },
          },
        },
      }}
    />
  );
}

// Only re-render the panel when the query changes
export const MemoPromQueryPanel = React.memo(PromQueryPanel);
