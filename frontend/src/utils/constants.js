export const apiData = {
    baseUrl: `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3001'}`,
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: 'include',
};
