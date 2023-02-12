import React, { useMemo } from 'react';
import { useTheme } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter5Adapter } from 'use-query-params/adapters/react-router-5';
import { DashboardResource, DurationString, TimeRangeValue } from '@perses-dev/core';
import { ChartsThemeProvider, EChartsTheme, generateChartsTheme, PersesChartsTheme } from '@perses-dev/components';
import { DashboardProvider, DatasourceStoreProvider, TemplateVariableProvider } from '@perses-dev/dashboards';
import {
  PluginRegistry,
  TimeRangeProvider as PersesTimeRangeProvider,
  // useInitialTimeRange,
} from '@perses-dev/plugin-system';
import { bundledPluginLoader } from './PersesPluginRegistry';
import { useDatasourceApi } from './datasource-api';

// app specific echarts option overrides
const ECHARTS_THEME_OVERRIDES: EChartsTheme = {
  // https://echarts.apache.org/en/theme-builder.html
  color: ['#516b91', '#59c4e6', '#edafda', '#93b7e3', '#a5e7f0', '#cbb0e3'],
  categoryAxis: {
    splitLine: {
      show: true,
    },
  },
  valueAxis: {
    // show: false,
  },
  // https://echarts.apache.org/en/option.html#series-line.type
  line: {},
};

function TimeRangeProvider({
  dashboardDuration,
  children,
}: {
  dashboardDuration: DurationString;
  children: React.ReactNode;
}) {
  // const initialTimeRange: TimeRangeValue = useInitialTimeRange(dashboardDuration);
  const initialTimeRange: TimeRangeValue = { pastDuration: '1h' };
  return (
    <PersesTimeRangeProvider initialTimeRange={initialTimeRange} enabledURLParams={false}>
      {children}
    </PersesTimeRangeProvider>
  );
}

type PersesDashboardProvidersProps = {
  dashboard: DashboardResource;
  children: React.ReactNode;
};

export function PersesDashboardProviders({ dashboard, children }: PersesDashboardProvidersProps) {
  const datasourceApi = useDatasourceApi();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 0,
      },
    },
  });

  const muiTheme = useTheme();
  // https://github.com/perses/perses/blob/main/ui/components/src/utils/theme-gen.ts
  const chartsTheme: PersesChartsTheme = useMemo(() => {
    return generateChartsTheme(muiTheme, ECHARTS_THEME_OVERRIDES);
  }, [muiTheme]);

  return (
    <QueryClientProvider client={queryClient}>
      <QueryParamProvider adapter={ReactRouter5Adapter}>
        <PluginRegistry
          pluginLoader={bundledPluginLoader}
          defaultPluginKinds={{
            Panel: 'TimeSeriesChart',
          }}
        >
          <ChartsThemeProvider chartsTheme={chartsTheme}>
            <DatasourceStoreProvider dashboardResource={dashboard} datasourceApi={datasourceApi}>
              <DashboardProvider initialState={{ dashboardResource: dashboard }}>
                <TemplateVariableProvider initialVariableDefinitions={dashboard.spec.variables}>
                  <TimeRangeProvider dashboardDuration={dashboard.spec.duration}>{children}</TimeRangeProvider>
                </TemplateVariableProvider>
              </DashboardProvider>
            </DatasourceStoreProvider>
          </ChartsThemeProvider>
        </PluginRegistry>
      </QueryParamProvider>
    </QueryClientProvider>
  );
}
