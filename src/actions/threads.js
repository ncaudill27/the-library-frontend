const begin = func => func({type: "BEGIN_THREADS_REQUEST"});

const fetchThreads = () => {
  return (dispatch) => {
    begin(dispatch);
    fetch('/api/v1/boards')
    .then(res => res.json())
    .then(json => dispatch(addThreads(json)));
  };
};

const addThreads = threadsJSON => ({
  type: "ADD_THREADS",
  threads: threadsJSON
});

const postThread = (payload) => {
  const token = localStorage.getItem('token');
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
    fetch('/api/v1/boards', requestObj)
    .then(res => res.json())
    .then(response => {
      if (response.errors) return console.log(response.errors);
      dispatch(addThread(response.thread.data));
    });
  };
};

const addThread = (payload) => ({
  type: "ADD_THREAD",
  payload
});

export {fetchThreads, postThread};
