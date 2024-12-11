import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchResults from './SearchResults';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import SearchInput from './SearchInput';
import { SettingsOutlined } from '@mui/icons-material';
import Filters from './Filters';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { clearUser } from '../redux/slices/userSlice';

const SearchBar = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [totalResult, setTotalResult] = useState(null);
    const [timeTaken, setTimeTaken] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const dispatch = useDispatch();

    const debounceTimeoutRef = useRef(null);

    const [dateRange, setDateRange] = useState('all');
    const [sortBy, setSortBy] = useState('byPopularity');
    const [type, setType] = useState('story');

    const [isFirstLoad, setIsFirstLoad] = useState(true);

    // const username = useSelector((state) => state.auth.username);
    const username = useSelector((state) => state?.auth?.user?.name); // Assuming 'name' holds the user's full name
    

    const [customDate, setCustomDate] = useState({
        startDate: '',
        endDate: '',
    });

    const fetchSearchResults = async (page = 0, searchQuery = '', tags = 'story', searchByDate = 'all', withFilters = false) => {
        try {
            setLoading(true);
            const url = withFilters
                ?
                searchByDate
                    // ? `https://hn.algolia.com/api/v1/search_by_date?query=${searchQuery}&tags=${tags}&page=${page}&numericFilters=created_at_i>${searchByDate}`
                    ? `https://hn.algolia.com/api/v1/search_by_date?query=${searchQuery}&tags=${tags}&page=${page}`
                    : `https://hn.algolia.com/api/v1/search?query=${searchQuery}&tags=${tags}&page=${page}`
                : `https://hn.algolia.com/api/v1/search`;

            const response = await axios.get(url);
            const data = response.data;

            setResults(data.hits);
            setTotalResult(data?.nbHits);
            setTimeTaken(data?.processingTimeMS);
            setTotalPages(data.nbPages);
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isFirstLoad) {
            fetchSearchResults(0, '', '', '', false);
            setIsFirstLoad(false);
        }
    }, [isFirstLoad]);

    useEffect(() => {
        if (!isFirstLoad) {
            fetchSearchResults(page, query, type, dateRange, true);
            // navigate(`/?query=${query}&tags=${type}&page=${page}&numericFilters=created_at_i>${dateRange}`);
            navigate(`/?query=${query}&tags=${type}&page=${page}`);
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
                setPage(0);
                fetchSearchResults(0, newQuery, type, dateRange, true);
                navigate(`/?query=${newQuery}&tags=${type}`);
            } else {
                fetchSearchResults(0, '', '', '', false);
            }
        }, 500);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        fetchSearchResults(newPage, query, type, dateRange, true);
        navigate(`/?query=${query}&tags=${type}&page=${newPage}`);
    };

    return (
        <div style={{ overflowX: 'hidden' }}>
            <AppBar position="relative" sx={{ backgroundColor: '#FF742B', zIndex: 1201, width: '100%' }}>
                <Toolbar sx={{ display: 'flex', alignItems: 'center', height: '60px' }}>
                    <Typography variant="h3" sx={{ fontSize: '1.2rem', color: '#ffffff', marginRight: '16px' }}>
                        Hi,<br />{username}
                    </Typography>
                    <Box component="img" src="https://hn.algolia.com/public/899d76bbc312122ee66aaaff7f933d13.png" alt="Hacker News Logo" sx={{ height: '50px', mr: 2, cursor: 'pointer' }} 
                    onClick={() => navigate('/')}
                    />
                    <Typography variant="h3" sx={{ fontSize: '1.2rem', color: '#000000', marginRight: '16px', cursor: 'pointer' }}
                        onClick={() => navigate('/')}
                    >
                        Search<br />Hacker News
                    </Typography>
                    <Box sx={{ flexGrow: 1, height: '50px', ml: 2, mr: 3, mt: 1 }}>
                        <SearchInput query={query} handleChange={handleChange} />
                    </Box>
                    {/* <SettingsOutlined sx={{ color: 'black', ml: 2, cursor: "pointer" }} fontSize='large' /> */}
                    <Button 
                        variant="contained" 
                        color="none" 
                        style={{border: "1px solid white", }}
                        onClick={handleLogout}
                        sx={{ ml: 2 }}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            <Box sx={{ width: '100%', paddingRight: '20px', paddingLeft: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Filters
                    type={type}
                    setType={setType}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                    customDate={customDate}
                    setCustomDate={setCustomDate}
                />

                <Typography sx={{ color: 'black', fontSize: '12px', fontWeight: 400, textAlign: 'right', paddingRight: 10 }}>
                    {totalResult?.toLocaleString()} results ({(timeTaken / 1000).toFixed(3)} seconds)
                </Typography>
            </Box>

            <Box sx={{ width: '100%', paddingLeft: '10px' }}>
                <SearchResults
                    results={results}
                    loading={loading}
                    page={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    query={query}
                />
            </Box>
        </div>
    );
};

export default SearchBar;
