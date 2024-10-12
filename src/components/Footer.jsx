import { Container, Grid, Link, Typography, Box } from '@mui/material';

const Footer = () => {
    const links = [
        { text: 'About', url: '#' },
        { text: 'Setting', url: '#' },
        { text: 'Help', url: '#' },
        { text: 'API Documentation', url: '#' },
        { text: 'Hacker News', url: '#' },
        { text: 'Fork/Contribute', url: '#' },
        { text: 'Cool Apps', url: '#' },
    ];

    return (
        <Box
            component="footer"
            sx={{
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'black',
                boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
                p: 3
            }}
        >
            <Container maxWidth="lg">
                <Grid container justifyContent="center" alignItems="center" >
                    {links.map((link, index) => (
                        <Grid item key={index}>
                            <Typography
                                variant="body2"
                                component="span"
                                sx={{
                                    fontSize: '12px',
                                    fontWeight: 400,
                                    lineHeight: 'normal',
                                    color: 'rgb(246, 246, 239)'
                                }}
                            >
                                <Link href={link.url} underline="none" color="inherit">
                                    {link.text}
                                </Link>
                            </Typography>

                            {index < links.length - 1 && (
                                <Typography variant="body2" component="span" sx={{ mx: 1 }}>
                                    •
                                </Typography>
                            )}
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;
