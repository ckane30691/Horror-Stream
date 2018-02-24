export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS";
//Get current user(me) from token in localStorage
export const ME_FROM_TOKEN = 'ME_FROM_TOKEN';

const ROOT_URL = location.href.indexOf('localhost') > 0 ?
  'http://localhost:3000/api'
  : '/api';

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

export const meFromToken = (tokenFromStorage) => (dispatch) => {
  //check if the token is still valid, if so, get me from the server
  const headers = {};
  if (tokenFromStorage) {
      headers['Authorization'] = 'Bearer ' + tokenFromStorage;
  }
  const request = $.ajax({
    method: 'get',
    url: `${ROOT_URL}/me/from/token?token=${tokenFromStorage}`,
    headers: {
      headers
    }
  }).then(res => {
    // console.log(res);
    if (res && res.token) {
      sessionStorage.setItem('jwtToken', res.token);
      dispatch(receiveCurrentUser(res.token));
    } else {
      sessionStorage.removeItem('jwtToken');//remove token from storage
      dispatch(receiveSessionErrors(res));
    }
  });

  return {
    type: ME_FROM_TOKEN,
    payload: request
  };
};
