export const apiData = {
    baseUrl: `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3001'}`,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    },
    credentials: 'include',
};
