const initialState = {
  data: [],
  pending: false,
  editing: 0,
}

const commentsReducer = (state = initialState, action) => {
  let comment, comments

  switch (action.type) {
    case "BEGIN_COMMENTS_REQUEST":
      return { ...state, data: [...state.data], pending: true }

    case "BEGIN_PATCH_COMMENTS_REQUEST":
      return { ...state, data: [...state.data], pending: true, id: action.id }

    case "ADD_COMMENTS":
      comments = action.comments.data.map(comment => {
        return {
          id: comment.id,
          content: comment.attributes.content,
          userId: comment.relationships.user.data.id,
          threadId: comment.relationships.board.data.id,
          posted: new Date(comment.attributes.createdAt),
        }
      })

      return { ...state, data: state.data.concat(comments), pending: false }

    case "POST_COMMENT":
      comment = action.payload.data
      const postObj = {
        id: comment.id,
        content: comment.attributes.content,
        userId: comment.relationships.user.data.id,
        threadId: comment.relationships.board.data.id,
        posted: new Date(comment.attributes.createdAt),
      }

      return { ...state, data: [...state.data, postObj], pending: false }

    case "DELETE_COMMENT":
      const toDelete = action.payload.comment_id
      comments = state.data.filter(({ id }) => id !== toDelete)

      return { ...state, data: comments, pending: false }

    case "PATCH_COMMENT":
      comment = action.payload.data
      const patchObj = {
        id: comment.id,
        content: comment.attributes.content,
        userId: comment.relationships.user.data.id,
        threadId: comment.relationships.board.data.id,
        posted: new Date(comment.attributes.createdAt),
      }
      comments = state.data.map(c => (c.id !== patchObj.id ? c : patchObj))

      return { ...state, data: comments, pending: false, id: 0 }

    default:
      return state
  }
}

export default commentsReducer
