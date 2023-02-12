import React from 'react';
import { TimeSeriesChart } from '@perses-dev/panels-plugin';

export function TimeSeriesPanel({ query }: { query: string }) {
  return (
    <TimeSeriesChart.PanelComponent
      contentDimensions={{
        width: 1200,
        height: 500,
      }}
      spec={{
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
      }}
    />
  );
}

// Only re-render the panel when the query changes
export const MemoTimeSeriesPanel = React.memo(TimeSeriesPanel);
