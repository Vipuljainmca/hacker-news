import { Box, InputBase, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchInput = ({ query, handleChange, isMobile }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                boxShadow: 1,
                padding: '4px',
                width: '100%',
                position: 'relative',
                height: '35px'
            }}
        >
            <SearchIcon sx={{ color: '#FF742B', mr: 1, fontSize: 30 }} />
            <InputBase
                value={query}
                onChange={handleChange}
                placeholder="Search stories by title, url or author"
                sx={{
                    flexGrow: 1,
                    border: 'none',
                    outline: 'none',
                    padding: '8px',
                    fontSize: '16px',
                    lineHeight: '18.4px',
                    color: 'rgba(0, 0, 0, 0.75)',
                    borderRadius: 0,
                    borderColor: 'rgba(0, 0, 0, 0)',
                    height: '42px',
                    width: '100%',
                    boxShadow: 'none',
                    fontWeight: 300,
                    backgroundColor: '#fff',
                }}
            />
           {!isMobile && <Typography variant="body2" sx={{
                marginRight: '8px',
                color: 'rgba(33, 36, 61, .5)',
                fontSize: '12px',
                marginLeft: '8px',
                position: 'absolute',
                right: '95px',
                top: '50%',
                transform: 'translateY(-50%)',
                userSelect: 'none',
            }}>
                Search By
            </Typography>}
           {!isMobile && <Box
                component="img"
                src="https://hn.algolia.com/public/38a9c67b12016b52267071c530ff2e78.svg"
                alt="Logo"
                sx={{ height: '20px', marginLeft: '4px', marginRight: '4px' }}
            />}
        </Box>
    );
};

export default SearchInput;
