import { useEffect, useRef, useState, SyntheticEvent, KeyboardEvent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Box, ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList, Stack, Typography } from '@mui/material';
import ChevronDown from 'mdi-material-ui/ChevronDown';

interface StatusMenuProps {
  agentMode: boolean;
}

export function StatusMenu(props: StatusMenuProps) {
  const { agentMode } = props;
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction="row" spacing={2}>
      <Box
        sx={(theme) => ({
          a: {
            color: theme.palette.text.primary,
          },
        })}
      >
        <Button
          ref={anchorRef}
          aria-controls={open ? 'status-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <Typography
            sx={(theme) => ({
              color: theme.palette.grey[500],
              textTransform: 'none',
            })}
          >
            Status
            <ChevronDown />
          </Typography>
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} placement="bottom-start" transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="status-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose}>
                      <RouterLink to="status">Runtime & Build Information</RouterLink>
                    </MenuItem>
                    {!agentMode && (
                      <MenuItem onClick={handleClose}>
                        <RouterLink to="tsdb-status"> TSDB Status</RouterLink>
                      </MenuItem>
                    )}
                    <MenuItem onClick={handleClose}>
                      <RouterLink to="flags">Command-Line Flags</RouterLink>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <RouterLink to="config">Configuration</RouterLink>
                    </MenuItem>
                    {!agentMode && (
                      <MenuItem onClick={handleClose}>
                        <RouterLink to="rules">Rules</RouterLink>
                      </MenuItem>
                    )}
                    <MenuItem onClick={handleClose}>
                      <RouterLink to="targets">Targets</RouterLink>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <RouterLink to="service-discovery">Service Discovery</RouterLink>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>
    </Stack>
  );
}
