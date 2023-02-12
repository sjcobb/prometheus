import React, { useState } from 'react';
import { TimeRangeControls } from '@perses-dev/dashboards';
import { Box, Button, Stack, Typography, Grid } from '@mui/material';
import { PrometheusTimeSeriesQuery } from '@perses-dev/prometheus-plugin';
import { MemoTimeSeriesPanel } from './TimeSeriesPanel';
import { PanelOptions } from '../../pages/graph/Panel';

export interface PersesQueryPanelProps {
  options: PanelOptions;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onQueryChange: (query?: any) => void;
  onRemovePanel: () => void;
  pastQueries: string[];
  id: string;
}

export function PersesQueryPanel(props: PersesQueryPanelProps) {
  const { onQueryChange, onRemovePanel } = props;
  const defaultQuerySpec = {
    query: '',
    datasource: undefined,
  };
  const [activeQuery, setActiveQuery] = useState(defaultQuerySpec);

  return (
    <Box>
      <Box p={1} display={'flex'} justifyContent="space-between">
        <Box>
          <Typography variant="h2">Graph</Typography>
        </Box>
        <Stack direction={'row'} spacing={2}>
          <Stack direction={'row'} spacing={1}>
            <TimeRangeControls />
          </Stack>
        </Stack>
      </Box>
      <Grid container>
        <Grid item xs={12}>
          <Stack>
            <Box
              mb={2}
              sx={{
                // hides inputs for datasource and series name format
                // TODO: instead export and use PromQLEditor from @perses-dev/prometheus-plugin
                '& .MuiFormControl-root': { display: 'none' },
              }}
            >
              <PrometheusTimeSeriesQuery.OptionsEditorComponent
                value={activeQuery}
                onChange={(e) => {
                  setActiveQuery({ query: e.query, datasource: undefined });
                  onQueryChange(e.query);
                }}
              />
            </Box>
            <Box sx={{ position: 'relative' }}>
              <MemoTimeSeriesPanel query={activeQuery.query} />
            </Box>
            <Stack direction={'row'} spacing={2} justifyContent="flex-end">
              <Box>
                <Button onClick={onRemovePanel}>Remove Panel</Button>
              </Box>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
