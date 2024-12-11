export const SUCCESS_MSG_TYPE = "success";
export const WARNING_MSG_TYPE = "warning";
export const ERROR_MSG_TYPE = "error";
export const INFO_MSG_TYPE = "info";
export const SUCCESS_MESSAGE = "success";

export const TYPEMENU = [
    { id: '(story,poll,comment,job,show_hn,ask_hn,launch_hn)', value: 'All', name : "All" },
    { id: 'story', value: 'Stories', name : "Stories" },
    { id: 'comment', value: 'Comment', name : "Comment" },
    { id: 'ask_hn', value: 'Ask HN', name : "Ask HN" },
    { id: 'show_hn', value: 'Show HN', name : "Show HN" },
    { id: 'launch_hn', value: 'Launch HN', name : "Launch HN" },
    { id: 'job', value: 'Jobs', name : "Jobs" },
    { id: 'poll', value: 'Polls', name : "Polls" },
];

// export const DATERANGE = [
//     { id: 'all', value: 'All Time' },
//     { id: 'last24h', value: 'Last 24h' },
//     { id: 'pastWeek', value: 'Past Week' },
//     { id: 'pastMonth', value: 'Past Month' },
//     { id: 'pastYear', value: 'Past Year' },
//     { id: 'custom', value: 'Custom Range' },
// ];
const currentTimestamp = Math.floor(Date.now() / 1000);

// Calculate timestamps for each range
export const DATERANGE = [
  { id: 'all', value: 'All Time', timestamp: "all" }, 
  { id: 'last24h', value: 'Last 24h', timestamp: currentTimestamp - 86400 },
  { id: 'pastWeek', value: 'Past Week', timestamp: currentTimestamp - 604800 },
  { id: 'pastMonth', value: 'Past Month', timestamp: currentTimestamp - 2592000 },
  { id: 'pastYear', value: 'Past Year', timestamp: currentTimestamp - 31536000 },
  { id: 'custom', value: 'Custom Range', timestamp: "custom" } 
];
export const SORTBY = [
    { id: 'byDate', value: 'Date' },
    { id: 'byPopularity', value: 'Popularity' },
];




