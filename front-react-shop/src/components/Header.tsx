import { AppBar, Toolbar, Typography, Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export default function Header() {
    const items = useSelector((state: RootState) => state.cart.items);
    const totalItens = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <AppBar position="static" sx={{ mb: 3 }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Minha Loja Tech
                </Typography>
                <IconButton color="inherit">
                    <Badge badgeContent={totalItens} color="error">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}
