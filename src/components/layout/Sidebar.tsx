import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as UsersIcon,
  Message as MessageIcon,
  Business as BuildingIcon,
  Warning as AlertIcon,
  Help as HelpIcon,
  Tag as TagIcon,
  BarChart as AnalyticsIcon,
  Menu as MenuIcon,
  School as GraduationCapIcon,
} from '@mui/icons-material';
import { useUIStore } from "@/stores/ui";

const navigation = [
  { name: "Dashboard", href: "/", icon: DashboardIcon },
  { name: "Users", href: "/users", icon: UsersIcon },
  { name: "Posts", href: "/posts", icon: MessageIcon },
  { name: "Academic Structure", href: "/academic", icon: BuildingIcon },
  { name: "Reports", href: "/reports", icon: AlertIcon },
  { name: "Questions", href: "/questions", icon: HelpIcon },
  { name: "Tags", href: "/tags", icon: TagIcon },
  { name: "Analytics", href: "/analytics", icon: AnalyticsIcon },
];

const SIDEBAR_WIDTH = 280;
const SIDEBAR_COLLAPSED_WIDTH = 64;

export default function Sidebar() {
  const location = useLocation();
  const theme = useTheme();
  const { sidebarCollapsed, toggleSidebar } = useUIStore();

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box 
        sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: sidebarCollapsed ? 'center' : 'space-between',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        {!sidebarCollapsed && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <GraduationCapIcon color="primary" sx={{ fontSize: 32 }} />
            <Typography variant="h5" fontWeight="bold" color="primary">
              GradBook
            </Typography>
          </Box>
        )}
        <IconButton onClick={toggleSidebar} size="small">
          <MenuIcon />
        </IconButton>
      </Box>

      <List sx={{ flexGrow: 1, py: 2 }}>
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const IconComponent = item.icon;
          
          return (
            <ListItem key={item.name} disablePadding sx={{ px: 1 }}>
              <ListItemButton
                component={Link}
                to={item.href}
                selected={isActive}
                sx={{
                  borderRadius: 2,
                  mx: 1,
                  mb: 0.5,
                  minHeight: 48,
                  justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                  px: sidebarCollapsed ? 1.5 : 2,
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                    },
                    '& .MuiListItemIcon-root': {
                      color: theme.palette.primary.contrastText,
                    },
                  },
                }}
              >
                <ListItemIcon 
                  sx={{ 
                    minWidth: sidebarCollapsed ? 0 : 40,
                    justifyContent: 'center',
                  }}
                >
                  <IconComponent />
                </ListItemIcon>
                {!sidebarCollapsed && (
                  <ListItemText 
                    primary={item.name} 
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
          boxSizing: 'border-box',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: 'hidden',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}