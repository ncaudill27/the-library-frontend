import { apiEnvironment } from "../utils/apiEnvironment"

const fetchComments = () => {
  return dispatch => {
    dispatch({ type: "BEGIN_COMMENTS_REQUEST" })
    fetch(apiEnvironment("/api/v1/comments"))
      .then(res => res.json())
      .then(json => dispatch(addComments(json)))
  }
}

const addComments = comments => ({
  type: "ADD_COMMENTS",
  comments,
})

const postComment = payload => dispatch => {
  dispatch({ type: "BEGIN_COMMENTS_REQUEST" })
  fetch(apiEnvironment("/api/v1/comments"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then(res => res.json())
    .then(json => dispatch(acceptPost(json)))
    .catch(errors => console.log(errors))
}

const deleteCommentRequest = commentId => {
  const token = localStorage.getItem("token")
  const requestObj = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(commentId),
  }

  return dispatch => {
    dispatch({ type: "BEGIN_COMMENTS_REQUEST" })
    fetch(apiEnvironment(`/api/v1/comments/${commentId}`), requestObj)
      .then(res => res.json())
      .then(response => {
        dispatch(deleteComment(response))
      })
  }
}

const patchCommentRequest = payload => {
  const token = localStorage.getItem("token")
  const requestObj = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  }

  return dispatch => {
    dispatch({ type: "BEGIN_PATCH_COMMENTS_REQUEST", id: payload.id })
    fetch(`/api/v1/comments/${payload.id}`, requestObj)
      .then(res => res.json())
      .then(response => {
        console.log(response)
        dispatch(patchComment(response))
      })
  }
}

const acceptPost = payload => ({
  type: "POST_COMMENT",
  payload,
})

const deleteComment = payload => ({
  type: "DELETE_COMMENT",
  payload,
})

const patchComment = payload => ({
  type: "PATCH_COMMENT",
  payload,
})

export { fetchComments, postComment, deleteCommentRequest, patchCommentRequest }
