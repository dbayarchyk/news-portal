import extendFetchWithBaseAPI from './extend-fetch-with-base-api';

const fetchAPI: typeof window.fetch = extendFetchWithBaseAPI(fetch);

export default fetchAPI;
