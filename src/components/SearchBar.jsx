import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchResults from './SearchResults';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import SearchInput from './SearchInput';
import { SettingsOutlined } from '@mui/icons-material';
import Filters from './Filters';
import { useSelector } from 'react-redux';

const SearchBar = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [totalResult, setTotalResult] = useState(null);
    const [timeTaken, setTimeTaken] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const debounceTimeoutRef = useRef(null);

    const username = useSelector((state) => state.auth.username);

    const fetchSearchResults = async (searchQuery = '', page = 0) => {
        try {
            setLoading(true);
            const response = await fetch(`https://hn.algolia.com/api/v1/search?query=${searchQuery}&page=${page}`);
            const data = await response.json();
            setResults(data.hits);
            setTotalResult(data?.nbHits);
            setTimeTaken(data?.processingTimeMS);
            setTotalPages(data.nbPages);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSearchResults('', 0);
    }, []);

    const handleChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);

        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(() => {
            if (newQuery.trim() !== '') {
                setPage(0);
                fetchSearchResults(newQuery, 0);
                navigate(`/?query=${newQuery}&page=0`);
            } else {

                fetchSearchResults('', 0);
            }
        }, 500);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        fetchSearchResults(query, newPage);
        navigate(`/?query=${query}&page=${newPage}`);
    };

    return (
        <div style={{ overflowX: 'hidden' }}>
            <AppBar position="relative" sx={{ backgroundColor: '#FF742B', zIndex: 1201, width: '100%' }}>
                <Toolbar sx={{ display: 'flex', alignItems: 'center', height: '60px' }}>
                    <Typography
                        variant="h3"
                        sx={{ fontSize: '1.2rem', color: '#ffffff', marginRight: '16px' }}
                    >
                        Hi,<br />{username}
                    </Typography>
                    <Box
                        component="img"
                        src="https://hn.algolia.com/public/899d76bbc312122ee66aaaff7f933d13.png"
                        alt="Hacker News Logo"
                        sx={{ height: '50px', mr: 2 }}
                    />

                    <Typography
                        variant="h3"
                        sx={{ fontSize: '1.2rem', color: '#000000', marginRight: '16px' }}
                    >
                        Search<br />Hacker News
                    </Typography>

                    <Box sx={{ flexGrow: 1, height: '50px', ml: 2, mr: 3, mt: 1 }}>
                        <SearchInput query={query} handleChange={handleChange} />
                    </Box>

                    <SettingsOutlined sx={{ color: 'black', ml: 2, cursor: "pointer" }} fontSize='large' />
                </Toolbar>
            </AppBar>

            <Box
                sx={{
                    paddingTop: '10px',
                    width: '100%',
                    paddingRight: '20px',
                    paddingLeft: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Filters />


                <Typography
                    sx={{
                        color: 'black',
                        fontSize: '12px',
                        fontWeight: 400,
                        textAlign: 'right',
                        paddingRight: 10
                    }}
                >
                    {totalResult?.toLocaleString()} results ({(timeTaken / 1000).toFixed(3)} seconds)
                </Typography>
            </Box>


            <Box sx={{ paddingTop: '10px', width: '100%', paddingLeft: '10px' }}>
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
