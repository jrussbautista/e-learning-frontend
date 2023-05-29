import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SubjectIcon from '@mui/icons-material/Subject';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const NavigationList = () => {
  const menuItems = [
    {
      title: 'Dashboard',
      icon: <DashboardIcon />,
    },
    {
      title: 'Subjects',
      icon: <SubjectIcon />,
    },
    {
      title: 'Courses',
      icon: <MenuBookIcon />,
    },
  ];

  return (
    <List>
      {menuItems.map((menuItem) => (
        <ListItem key={menuItem.title} disablePadding>
          <ListItemButton>
            <ListItemIcon>{menuItem.icon}</ListItemIcon>
            <ListItemText primary={menuItem.title} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default NavigationList;
