import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import logo from "../../assets/images/cartesi-logo.svg"

const Header = () => {
    return (
        <AppBar elevation={0} sx={{ backgroundColor: '#1b1a1e' }} >
            <Toolbar>
                <Box display="flex" alignItems="center">
                    <img src={logo} width="50" />
                    <Typography sx={{ color: theme => theme.palette.primary.main, pl: 1 }} fontWeight="500" variant="h1">
                        Cartesi Marketplace
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
