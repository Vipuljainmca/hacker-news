import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchResults from './SearchResults';
import { AppBar, Box, Button, Toolbar, Typography, Grid } from '@mui/material';
import SearchInput from './SearchInput';
import Filters from './Filters';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { clearUser } from '../redux/slices/userSlice';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const SearchBar = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [totalResult, setTotalResult] = useState(null);
    const [timeTaken, setTimeTaken] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const dispatch = useDispatch();

    const debounceTimeoutRef = useRef(null);

    const [dateRange, setDateRange] = useState('all');
    const [sortBy, setSortBy] = useState('byPopularity');
    const [type, setType] = useState('story');

    const [isFirstLoad, setIsFirstLoad] = useState(true);

    const username = useSelector((state) => state?.auth?.user?.name);

    function getTimestamp(dateString) {
        return Math.floor(new Date(dateString).getTime() / 1000);
    }

    const [customDate, setCustomDate] = useState({
        startDate: '',
        endDate: '',
    });

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const fetchSearchResults = async (page = 1, searchQuery = '', tags = 'story', searchByDate = 'all', withFilters = false) => {
        try {
            setLoading(true);
            let url = withFilters
                ? sortBy !== 'byPopularity'
                    ? `https://hn.algolia.com/api/v1/search_by_date?query=${searchQuery}&tags=${tags}&page=${page - 1}`
                    : `https://hn.algolia.com/api/v1/search?query=${searchQuery}&tags=${tags}&page=${page - 1}`
                : `https://hn.algolia.com/api/v1/search`;
            if (dateRange !== 'all' && dateRange !== 'custom') {
                url += `&numericFilters=created_at_i>${dateRange}`;
            }
            if (dateRange === 'custom' && customDate?.startDate && customDate?.endDate) {
                url += `&numericFilters=created_at_i>=${getTimestamp(customDate?.startDate)},created_at_i<=${getTimestamp(customDate?.endDate)}`;
            }

            const response = await axios.get(url);
            // navigate('/?' + url.slice(30, url.length));

            const data = response.data;
            setResults(data.hits);
            setTotalResult(data?.nbHits);
            setTimeTaken(data?.processingTimeMS);
            setTotalPages(data.nbPages);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isFirstLoad) {
            fetchSearchResults(1, '', '', '', false);
            setIsFirstLoad(false);
        }
    }, [isFirstLoad]);

    useEffect(() => {
        if (!isFirstLoad) {
            fetchSearchResults(page, query, type, dateRange, true);
        }
    }, [type, dateRange, sortBy]);

    const handleLogout = () => {
        dispatch(clearUser());
        navigate('/login');
    };

    const handleChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);

        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(() => {
            if (newQuery.trim() !== '') {
                setPage(1);
                fetchSearchResults(1, newQuery, type, dateRange, true);
            } else {
                fetchSearchResults(1, '', '', '', false);
            }
        }, 500);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        fetchSearchResults(newPage, query, type, dateRange, true);
    };

    return (
        <div style={{ overflowX: 'hidden' }}>
            <AppBar position="relative" sx={{ backgroundColor: '#FF742B', zIndex: 1201, width: '100%' }}>
                <Toolbar sx={{ display: 'flex', alignItems: 'center', height: '60px', flexWrap: 'nowrap' }}>
                    <Typography
                        variant="h3"
                        sx={{ fontSize: isMobile ? '1rem' : '1.2rem', color: '#ffffff', marginRight: '16px' }}
                    >
                        Hi,<br />{username}
                    </Typography>
                    <Box
                        component="img"
                        src="https://hn.algolia.com/public/899d76bbc312122ee66aaaff7f933d13.png"
                        alt="Hacker News Logo"
                        sx={{ height: '40px', mr: 2, cursor: 'pointer' }}
                        onClick={() => navigate('/')}
                    />
                   {!isMobile && <Typography
                        variant="h3"
                        sx={{ fontSize: isMobile ? '0.9rem' : '1.2rem', color: '#000000', marginRight: '16px', cursor: 'pointer' }}
                        onClick={() => navigate('/')}
                    >
                        Search<br />Hacker News
                    </Typography>}
                    <Box sx={{ flexGrow: 1, height: '50px', ml: 2, mr: 3, mt: 1 }}>
                        <SearchInput query={query} handleChange={handleChange} isMobile={isMobile} />
                    </Box>
                    {!isMobile && (
                        <Button
                            variant="contained"
                            color="none"
                            style={{ border: '1px solid white' }}
                            onClick={handleLogout}
                            sx={{ ml: 2 }}
                        >
                            Logout
                        </Button>
                    )}
                </Toolbar>
            </AppBar>

            <Box
                sx={{
                    // width: '100%',
                    padding: isMobile ? '10px' : '20px',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    // alignItems: 'center',
                    justifyContent: isMobile ? "flex-start" : 'space-between',
                }}
            >
                <Filters
                isMobile={isMobile}
                    page={page}
                    query={query}
                    type={type}
                    setType={setType}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                    customDate={customDate}
                    setCustomDate={setCustomDate}
                    fetchSearchResults={fetchSearchResults}
                />

                <Typography
                    sx={{
                        color: 'black',
                        fontSize: '12px',
                        fontWeight: 400,
                        textAlign: isMobile ? 'center' : 'right',
                        paddingRight: isMobile ? 0 : 10,
                    }}
                >
                    {totalResult?.toLocaleString()} results ({(timeTaken / 1000).toFixed(3)} seconds)
                </Typography>
            </Box>

            <Box sx={{ width: '100%', paddingLeft: isMobile ? '5px' : '10px' }}>
                <SearchResults
                    results={results}
                    loading={loading}
                    page={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    query={query}
                />
            </Box>

            {isMobile && (
                <Button
                    variant="contained"
                    color="none"
                    fullWidth
                    style={{ marginTop: '10px' }}
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            )}
        </div>
    );
};

export default SearchBar;