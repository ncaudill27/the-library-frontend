import { flashMessage } from './messages';

const begin = func => func({type: "BEGIN_USERS_REQUEST"});
const token = localStorage.getItem('token');

const fetchUsers = () => {
  return (dispatch) => {
    begin(dispatch);
    fetch('/api/v1/users')
    .then(res => res.json())
    .then(json => dispatch(addUsers(json)));
  };
};

const addUsers = ({data, included}) => ({
  type: "ADD_USERS",
  users: data,
  memberships: included
});

const addClub = membership => ({
  type: "ADD_CLUB",
  membership
});

const loginRequest = payload => {
  const requestObj = {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    'body': JSON.stringify(payload)
  };

  console.log(requestObj)
  return dispatch => {
    begin(dispatch);
    fetch('/auth/login', requestObj)
    .then(res => res.json())
    .then(response => {      
      if (response.failure) return dispatch(flashMessage(response.failure));
      localStorage.setItem('token', response.auth_token);
      dispatch(loginUser(response.user.data));
    })
    .catch(errors => console.log(errors)); 
  }
}

const authorizeToken = () => {
  const requestObj = {
    'method': 'POST',
    'headers': {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    }
  };
  return dispatch => {
    begin(dispatch);
    fetch('/auth/auto', requestObj)
    .then(res => res.json())
    .then(response => {
      if (response.failure) return dispatch(flashMessage(response.failure));
      dispatch(loginUser(response.data));
    });
  };
};

const userPostRequest = payload => {
  const requestObj = {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    },
    'body': JSON.stringify(payload)
  }
  
  return dispatch => {
    begin(dispatch);
    fetch('/api/v1/users', requestObj)
    .then(res => res.json())
    .then(response => {
      if (response.errors) return dispatch(flashMessage(response.errors));
      localStorage.setItem('token', response.auth_token);
      dispatch(loginUser(response.user.data));
    });
  };
};

const updateUserRequest = (payload, userId) => {
  const requestObj = {
    'method': 'PATCH',
    'headers': {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    'body': JSON.stringify(payload)
  };

  return dispatch => {
    begin(dispatch);
    fetch(`/api/v1/users/${userId}`, requestObj)
    .then(res => res.json())
    .then(response => {
      dispatch(loginUser(response.user.data));
    });
  };
};

const memberJoinRequest = payload => {
  const requestObj = {
    'method': 'POST',
    'headers': {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    'body': JSON.stringify(payload)
  };

  return dispatch => {
    begin(dispatch);
    fetch(`/api/v1/memberships`, requestObj)
    .then(res => res.json())
    .then( async response => {
      if (response.errors) return console.log(response.errors);
      dispatch(addClub(response));
    });
  };
};

const memberLeaveRequest = membershipId => {
  const requestObj = {
    'method': 'DELETE',
    'headers': {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  return dispatch => {
    begin(dispatch);
    fetch(`/api/v1/memberships/${membershipId}`, requestObj)
    .then(res => res.json())
    .then(response => {
      if (response.errors) return console.log(response.errors);
      dispatch(leaveClub(response));
    })
  };
}

const leaveClub = ({id, clubId, userId}) => ({
  type: "LEAVE_CLUB",
  id,
  clubId,
  userId
})

const loginUser = userData => ({
  type: "LOGIN_USER",
  userData
});

const logOutUser = () => ({
  type: "LOGOUT_USER"
});



export {
  fetchUsers,
  addClub,
  authorizeToken,
  loginRequest,
  logOutUser,
  loginUser,
  userPostRequest,
  updateUserRequest,
  memberJoinRequest,
  memberLeaveRequest,
  leaveClub
};