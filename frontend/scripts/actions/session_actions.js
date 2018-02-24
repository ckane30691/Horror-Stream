export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS";
//Get current user(me) from token in localStorage
export const ME_FROM_TOKEN = 'ME_FROM_TOKEN';
export const ME_FROM_TOKEN_SUCCESS = 'ME_FROM_TOKEN_SUCCESS';
export const ME_FROM_TOKEN_FAILURE = 'ME_FROM_TOKEN_FAILURE';
export const RESET_TOKEN = 'RESET_TOKEN';

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const receiveSessionErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

let accessToken;

export const makeRequest = function makeRequest(url) {
    const headers = {};
    if (accessToken) {
        headers['Authorization'] = 'JWT ' + accessToken;
    }
    fetch(url, { headers: headers })
        .then((response) => {
            $('#status').val(response.statusText);
            response.text()
                .then((text) => {
                    $('#output').val(text);
                });
        });
};

export const login = (provider) => dispatch => {
    window.authenticateCallback = function(token) {
        accessToken = token;
        $('#accessToken').val(accessToken);
        // console.log(res);
        sessionStorage.setItem('jwtToken', token);
        console.log(sessionStorage);
        dispatch(receiveCurrentUser(token));
    };
    window.open('/api/authentication/' + provider + '/start');
};

export const logout = () => dispatch => {
  sessionStorage.removeItem('jwtToken');
  dispatch(receiveCurrentUser(null));
};
