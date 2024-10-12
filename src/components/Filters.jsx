import { Box, FormControl, Select, MenuItem, Typography } from '@mui/material';
import { DATERANGE, SORTBY, TYPEMENU } from '../constants/data';

const Filters = ({ type = 'stories', setType, sortBy = 'byPopularity', setSortBy, dateRange = 'all-time', setDateRange }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ fontSize: '12px', marginRight: '8px' }}>
                <span >Search</span>
            </Typography>
            <FormControl variant='standard' sx={{ minWidth: 100, mr: 1 }}>
                <Select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    displayEmpty
                    sx={{
                        fontSize: '14px',
                        padding: '0 4px 0 8px',
                        border: 'solid 1px #c3c3c3',
                        borderRadius: '2px',
                        color: '#5c5c5c',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        height: '30px',
                    }}
                >
                    {TYPEMENU.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            {item.value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Typography sx={{ fontSize: '12px', marginRight: '8px' }}>
                <span>by</span>
            </Typography>
            <FormControl variant='standard' sx={{ minWidth: 100, mr: 1 }}>
                <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    sx={{
                        fontSize: '14px',
                        padding: '0 4px 0 8px',
                        border: 'solid 1px #c3c3c3',
                        borderRadius: '2px',
                        color: '#5c5c5c',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        height: '30px',
                    }}
                >
                    {SORTBY.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            {item.value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Typography sx={{ fontSize: '12px', marginRight: '8px' }}>
                <span>for</span>
            </Typography>
            <FormControl variant='standard' sx={{ minWidth: 100, mr: 1 }}>
                <Select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    sx={{
                        fontSize: '14px',
                        padding: '0 4px 0 8px',
                        border: 'solid 1px #c3c3c3',
                        borderRadius: '2px',
                        color: '#5c5c5c',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        height: '30px',
                    }}
                >
                    {DATERANGE.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            {item.value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default Filters;
