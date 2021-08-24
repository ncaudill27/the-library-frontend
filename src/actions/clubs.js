import { addClub } from "./users"
import { flashMessage } from "./messages"
import { apiEnvironment } from "../utils/apiEnvironment"

const begin = func => func({ type: "BEGIN_CLUBS_REQUEST" })
const token = localStorage.getItem("token")

const addClubs = clubsJSON => ({
  type: "ADD_CLUBS",
  clubs: clubsJSON,
})

const getClubsRequest = () => {
  return dispatch => {
    begin(dispatch)
    fetch(apiEnvironment("/api/v1/clubs"))
      .then(res => res.json())
      .then(json => dispatch(addClubs(json)))
  }
}

const postClubRequest = payload => {
  const requestObj = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  }

  return dispatch => {
    begin(dispatch)
    return fetch(apiEnvironment("/api/v1/clubs", requestObj))
      .then(res => res.json())
      .then(async response => {
        console.log(response)
        if (response.errors) return dispatch(flashMessage(response.errors))
        await dispatch(createClub(response.club))

        dispatch(addClub(response.membership))
        return response
      })
  }
}

const patchClubRequest = (payload, clubId) => {
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
    begin(dispatch)
    fetch(apiEnvironment(`/api/v1/clubs/${clubId}`), requestObj)
      .then(res => res.json())
      .then(response => {
        if (response.error) console.log(response.error)
        dispatch(updateClub(response.data))
      })
  }
}

const createClub = clubJSON => ({
  type: "CREATE_CLUB",
  club: clubJSON,
})

const updateClub = ({
  id,
  attributes: { name, description, avatar, activeBookIsbn13 },
}) => ({
  type: "UPDATE_CLUB",
  id,
  name,
  description,
  avatar,
  activeBookIsbn13,
})

export { getClubsRequest, postClubRequest, patchClubRequest }
