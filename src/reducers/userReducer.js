const initialState = {
  data: [],
  memberships: [],
  currentUser: false,
  pending: false
}

const usersReducer = (state = initialState, action) => {

  let users, memberships

  switch(action.type) {

    case "BEGIN_USERS_REQUEST":
      return {...state, data: [...state.data], pending: true};

    case "ADD_USERS":

      users = action.users.map( user => {
        return {
          id: user.id,
          name: user.attributes.name,
          username: user.attributes.username,
          email: user.attributes.email,
          bio: user.attributes.bio,
          avatar: user.attributes.avatar,
          currentlyReading: !!user.attributes.favoriteBookIsbn13 ? user.attributes.favoriteBookIsbn13.replace(/-/g, '') : null,
          commentIds: user.relationships.comments.data.map( comment => comment.id )
        };
      });

      memberships = action.memberships.map( membership => {
        return {
          id: membership.id,
          clubId: membership.attributes.clubId.toString(),
          userId: membership.attributes.userId.toString(),
          isMod: membership.attributes.mod
        };
      });


      return {...state, data: state.data.concat(users), memberships: state.memberships.concat(memberships), pending: false};

      case "ADD_CLUB":
      memberships = state.memberships.concat(action.membership);
      return {...state, memberships, pending: false}

    case "LOGIN_USER":
      const {
        id,
        attributes: {
          name, username, email, bio, avatar, favoriteBookIsbn13
        },
        relationships: {
          comments: {
            data: comments
          }
        }
      } = action.userData; 

      const currentUser =  {
        id: id,
        name: name,
        username: username,
        email: email,
        bio: bio,
        avatar: avatar,
        currentlyReading: !!favoriteBookIsbn13 ? favoriteBookIsbn13.replace(/-/g, '') : null,
        commentIds: comments.map(comment => comment.id)
      };

      users = state.data.map( user => user.id !== currentUser ? user : currentUser );

      return {...state, data: users, currentUser: currentUser, pending: false}

    case "LEAVE_CLUB":
      memberships = state.memberships.filter( m => m.id !== action.id );
      return {...state, memberships, pending: false};
      
    case "LOGOUT_USER":
      localStorage.clear();
      return {...state, currentUser: false, pending: false};

    default:
      return state;
  };
};

export default usersReducer;