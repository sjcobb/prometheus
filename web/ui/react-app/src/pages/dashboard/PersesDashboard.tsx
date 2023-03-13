import { FC } from 'react';
import { Typography } from '@mui/material';
import { DashboardResource } from '@perses-dev/core';
import { ViewDashboard } from '@perses-dev/dashboards';
// import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useDatasourceApi } from '../../components/perses/datasource-api';
import { PersesDashboardProviders } from '../../components/perses/PersesDashboardProviders';

const defaultDashboard: DashboardResource = {
  kind: 'Dashboard',
  metadata: {
    name: '',
    project: '',
    version: 0,
    created_at: '',
    updated_at: '',
  },
  spec: {
    panels: {
      ChartFirst: {
        kind: 'Panel',
        spec: {
          display: { name: 'Chart First' },
          plugin: {
            kind: 'TimeSeriesChart',
            spec: {
              queries: [
                {
                  kind: 'TimeSeriesQuery',
                  spec: {
                    plugin: {
                      kind: 'PrometheusTimeSeriesQuery',
                      spec: { query: 'up' },
                    },
                  },
                },
              ],
            },
          },
        },
      },
      ChartSecond: {
        kind: 'Panel',
        spec: {
          display: { name: 'Chart Second' },
          plugin: {
            kind: 'TimeSeriesChart',
            spec: {
              queries: [
                {
                  kind: 'TimeSeriesQuery',
                  spec: {
                    plugin: {
                      kind: 'PrometheusTimeSeriesQuery',
                      spec: { query: 'node_memory_Buffers_bytes' },
                    },
                  },
                },
              ],
            },
          },
        },
      },
    },
    layouts: [
      {
        kind: 'Grid',
        spec: {
          display: { title: 'Row 1', collapse: { open: true } },
          items: [
            {
              x: 0,
              y: 0,
              width: 12,
              height: 11,
              content: { $ref: '#/spec/panels/ChartFirst' },
            },
            {
              x: 12,
              y: 0,
              width: 12,
              height: 11,
              content: { $ref: '#/spec/panels/ChartSecond' },
            },
          ],
        },
      },
    ],
    variables: [],
    duration: '1h',
  },
};

const PersesDashboard: FC = () => {
  const datasourceApi = useDatasourceApi();

  // const [homeDashboard, setHomeDashboard] = useLocalStorage('prom-home-dashboard', defaultDashboard);

  // const handleDashboardSave = useCallback((data: DashboardResource) => {
  //   // TODO: save dashboard in Local Storage
  //   return data;
  // }, []);

  return (
    <PersesDashboardProviders dashboard={defaultDashboard}>
      <ViewDashboard
        dashboardResource={defaultDashboard}
        datasourceApi={datasourceApi}
        dashboardTitleComponent={<Typography variant="h3">Home Dashboard</Typography>}
        // onSave={handleDashboardSave}
        // onDiscard={handleDashboardDiscard}
        initialVariableIsSticky={false}
        isReadonly={false}
        // isEditing={isEditing}
      />
    </PersesDashboardProviders>
  );
};

export default PersesDashboard;
