import { Link, useLocation } from "react-router-dom";
import { 
    Box, Drawer, List, ListItem, ListItemButton, 
    ListItemIcon, ListItemText, Typography, Divider, 
    Chip, Avatar 
} from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import { ROUTES } from "../../shared/constants";

interface SidebarProps {
    nombreEmpresa?: string;
    backgroundColor?: string;
    padding?: number;
    isOffline?: boolean;
}

const DRAWER_WIDTH = 280;

export const Sidebar = ({
    nombreEmpresa = "Financia Crédito",
    backgroundColor = "#0f172a", 
    isOffline = false,
}: SidebarProps) => {
    const location = useLocation();

    const menuItems = [
        { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
        { text: "Clientes", icon: <PeopleIcon />, path: `/${ROUTES.CLIENTES}` },
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: DRAWER_WIDTH,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { 
                    width: DRAWER_WIDTH, 
                    boxSizing: 'border-box',
                    backgroundColor: backgroundColor,
                    color: '#f8fafc',
                    borderRight: 'none',
                    boxShadow: '4px 0px 10px rgba(0,0,0,0.1)'
                },
            }}
        >
            <Box sx={{ p: 3, textAlign: 'center' }}>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                    <Avatar sx={{ bgcolor: '#4f46e5', width: 40, height: 40 }}>
                        {nombreEmpresa.charAt(0)}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: -0.5 }}>
                        {nombreEmpresa}
                    </Typography>
                </Stack>
                
                <Chip 
                    label={isOffline ? "Offline" : "Online"} 
                    color={isOffline ? "error" : "success"}
                    size="small"
                    sx={{ mt: 2, height: 20, fontSize: '0.65rem', fontWeight: 'bold' }}
                />
            </Box>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mx: 2 }} />

         
            <List sx={{ px: 2, mt: 2 }}>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path || 
                                   (item.path !== "/" && location.pathname.includes(item.path));
                    
                    return (
                        <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                            <ListItemButton
                                component={Link}
                                to={item.path}
                                sx={{
                                    borderRadius: '12px',
                                    backgroundColor: isActive ? 'rgba(79, 70, 229, 0.15)' : 'transparent',
                                    color: isActive ? '#818cf8' : '#94a3b8',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                        color: '#f8fafc'
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <ListItemIcon sx={{ 
                                    color: 'inherit', 
                                    minWidth: 40,
                                    '& svg': { fontSize: 22 }
                                }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText 
                                    primary={item.text} 
                                    primaryTypographyProps={{ 
                                        fontSize: '0.95rem', 
                                        fontWeight: isActive ? 600 : 500 
                                    }} 
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

          
            <Box sx={{ mt: 'auto', p: 3, textAlign: 'center' }}>
                <Box sx={{ 
                    p: 2, 
                    borderRadius: '16px', 
                    bgcolor: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
                        Desarrollado por
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#f8fafc' }}>
                        Monica Villegas
                    </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: '#475569', mt: 2, display: 'block' }}>
                    v1.0.0 • 2026
                </Typography>
            </Box>
        </Drawer>
    );
};

const Stack = ({ children, ...props }: any) => (
    <Box display="flex" {...props}>{children}</Box>
);