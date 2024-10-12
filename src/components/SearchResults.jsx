import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Typography, Box, Pagination as MuiPagination } from '@mui/material';

const SearchResults = ({ results = [], loading = false, page, totalPages, onPageChange, query }) => {
    if (loading) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    if (results?.length === 0 && !loading) {
        return <Typography variant="h6">No results found</Typography>;
    }

    const highlightText = (text, query) => {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        const parts = text.split(regex);
        return parts.map((part, index) =>
            regex.test(part) ? <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span> : part
        );
    };

    const timeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);
        let interval = Math.floor(seconds / 31536000);

        if (interval > 1) return `${interval} years ago`;
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) return `${interval} months ago`;
        interval = Math.floor(seconds / 86400);
        if (interval > 1) return `${interval} days ago`;
        interval = Math.floor(seconds / 3600);
        if (interval > 1) return `${interval} hours ago`;
        interval = Math.floor(seconds / 60);
        if (interval > 1) return `${interval} minutes ago`;
        return `${seconds} seconds ago`;
    };

    // const decodeHtmlEntities = (html) => {
    //     const txt = document.createElement("textarea");
    //     txt.innerHTML = html;
    //     console.log(txt.value);
        
    //     return txt.value;
    // };


    return (
        <Box sx={{ paddingBottom: '10px', width: '100%', pr: { xs: '5px', sm: '10px' }, pl: { xs: '5px', sm: '10px' } }}>
            <List sx={{ width: '100%', padding: 0 }}>
                {results.map((item) => (
                    <ListItem key={item.objectID} sx={{ padding: '0' }}>
                        <ListItemText
                            primary={
                                <Typography Typography variant="body1" component="span" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' }, lineHeight: 'normal', color: 'rgb(0, 0, 0)', letterSpacing: 1 }}>
                                    {item?.title &&
                                        <span style={{ fontWeight: 400 }}>
                                            {item?.title ? highlightText(item?.title, query) : 'No Title'}
                                        </span>
                                    }
                                    {item?.url &&
                                        <span style={{ marginLeft: '4px', fontSize: { xs: '0.6rem', sm: '0.7rem' }, letterSpacing: 1 }}>
                                            (
                                            <Link style={{ color: '#828282', fontWeight: 510 }} to={item.url} target="_blank" rel="noopener noreferrer">
                                                {item?.url ? highlightText(item?.url, query) : 'No Url'}
                                            </Link>
                                            )
                                        </span>
                                    }
                                </Typography>
                            }
                            secondary={
                                <>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                        sx={{
                                            display: 'block',
                                            marginTop: '4px',
                                            fontSize: { xs: '0.6em', sm: '0.7em' },
                                            color: 'dimgray',
                                            wordWrap: 'break-word',
                                        }}
                                    >
                                        {item.points} points | {item.author} | {timeAgo(item.created_at)} | {item.num_comments} comments

                                    </Typography>
                                    <Typography>
                                        {
                                            item?.story_text &&

                                            <div className="highlighted-text"
                                            dangerouslySetInnerHTML={{
                                                __html: highlightText((item.story_text), query)
                                            }}
                                            >
                                                {/* {item?.story_text && highlightText(decodeHtmlEntities(item.story_text), query)} */}

                                            </div>

                                        }
                                    </Typography>
                                </>
                            }
                        />
                        {item.story_text && (
                            <Typography
                                sx={{
                                    padding: { xs: '4px 0', sm: '8px 0' },
                                    color: "#000",
                                    fontSize: { xs: '10px', sm: '12px' },
                                    width: "100%",
                                    paddingLeft: ".5rem",
                                    lineHeight: "normal",
                                    fontWeight: 400,
                                    wordWrap: 'break-word',
                                }}
                            >
                                {item.story_text.value}
                            </Typography>
                        )}
                    </ListItem>
                ))}
            </List>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
                <MuiPagination
                    page={page}
                    count={totalPages}
                    onChange={(e, value) => onPageChange(value)}
                    sx={{ '& .MuiPaginationItem-root': { fontSize: { xs: '0.75rem', sm: '1rem' } } }}
                />
            </Box>
        </Box>
    );
};

export default SearchResults;
