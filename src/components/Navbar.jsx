import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const Navbar = () => {
    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#FF742B', height: '60px', padding: '0 20px' }}>
            <Toolbar sx={{ height: '60px' }}>
                <Box
                    component="img"
                    src="https://hn.algolia.com/public/899d76bbc312122ee66aaaff7f933d13.png"
                    alt="Hacker News Logo"
                    sx={{ height: '50px', mr: 2 }}
                />

                <Typography
                    variant="h3"
                    sx={{ flexGrow: 1, fontSize: '1.2rem', color: '#000000' }}
                >
                    Search<br />Hacker News
                </Typography>


                <Box
                    component="img"
                    src="https://hn.algolia.com/public/38a9c67b12016b52267071c530ff2e78.svg"
                    alt="Logo"
                    sx={{ height: '30px' }}
                />
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
