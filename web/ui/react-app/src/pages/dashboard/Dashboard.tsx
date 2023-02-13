import { Typography } from '@mui/material';
import { DashboardResource } from '@perses-dev/core';
import { ViewDashboard } from '@perses-dev/dashboards';
import { useDatasourceApi } from '../../components/perses/datasource-api';
import { PersesDashboardProviders } from '../../components/perses/PersesDashboardProviders';

const Dashboard = () => {
  const datasourceApi = useDatasourceApi();

  const data: DashboardResource = {
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
        Default: {
          kind: 'Panel',
          spec: {
            display: { name: 'Default' },
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
                width: 24,
                height: 10,
                content: { $ref: '#/spec/panels/Default' },
              },
            ],
          },
        },
      ],
      variables: [],
      duration: '1h',
    },
  };

  return (
    <PersesDashboardProviders dashboard={data}>
      <ViewDashboard
        dashboardResource={data}
        datasourceApi={datasourceApi}
        dashboardTitleComponent={<Typography variant="h2">Home Dashboard</Typography>}
        // onSave={handleDashboardSave}
        // onDiscard={handleDashboardDiscard}
        initialVariableIsSticky={false}
        isReadonly={false}
        // isEditing={isEditing}
      />
    </PersesDashboardProviders>
  );
};

export default Dashboard;
