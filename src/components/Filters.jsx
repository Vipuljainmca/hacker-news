import {
    Box,
    Button,
    FormControl,
    MenuItem,
    Popover,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { DATERANGE, SORTBY, TYPEMENU } from '../constants/data';
import { useState } from 'react';

const Filters = ({ type = 'story', setType, sortBy = 'byPopularity', setSortBy, dateRange = 'all', setDateRange, customDate, setCustomDate }) => {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleCustomDateChange = (e) => {
        setCustomDate({
            ...customDate,
            [e.target.name]: e.target.value,
        });
    };

    const handleApply = () => {
        setAnchorEl(null);
    };

    const handleCancel = () => {
        setCustomDate({ startDate: '', endDate: '' });
        // setDateRange('all');
        setAnchorEl(null);
    };

    const handlePopoverOpen = (event) => {
        console.log(event);
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

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
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: 2 }}>
                <FormControl variant="standard" sx={{ minWidth: 100, mr: 1, mb: 2 }}>
                    <Select
                        value={dateRange}
                        onChange={(e) => {
                            setDateRange(e.target.value);
                            if (e.target.value !== 'custom') {
                                setCustomDate({ startDate: '', endDate: '' });
                                setAnchorEl(null)
                            }
                        }}
                        onClick={handlePopoverOpen}
                        sx={{
                            fontSize: '14px',
                            padding: '0 4px 0 8px',
                            border: 'solid 1px #c3c3c3',
                            borderRadius: '2px',
                            color: '#5c5c5c',
                        }}
                    >
                        {DATERANGE.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                                {item.value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handlePopoverClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    {dateRange === 'custom' && (
                        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                            <Typography variant="h6">Custom Date Range</Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <TextField
                                    label="From"
                                    type="date"
                                    name="startDate"
                                    value={customDate.startDate}
                                    onChange={handleCustomDateChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    label="To"
                                    type="date"
                                    name="endDate"
                                    value={customDate.endDate}
                                    onChange={handleCustomDateChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Box>
                            <Box sx={{ mt: 1, display: 'flex', gap: 2 }}>
                                <Button variant="outlined" color="error" onClick={handleCancel}>
                                    Cancel
                                </Button>
                                <Button variant="contained" color="primary" onClick={handleApply}>
                                    Apply
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Popover>
            </Box>
        </Box>
    );
};

export default Filters;
