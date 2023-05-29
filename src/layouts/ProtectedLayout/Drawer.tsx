import Divider from '@mui/material/Divider';
import MUIDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { DRAWER_WIDTH } from './constants';
import NavigationList from './NavigationList';

type DrawerProps = {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
};

const Drawer = ({ mobileOpen, handleDrawerToggle }: DrawerProps) => {
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <NavigationList />
    </div>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <MUIDrawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
          },
        }}
      >
        {drawer}
      </MUIDrawer>
      <MUIDrawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
          },
        }}
        open
      >
        {drawer}
      </MUIDrawer>
    </Box>
  );
};

export default Drawer;
