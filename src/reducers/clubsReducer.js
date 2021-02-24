const initialState = {
  data: [],
  pending: false 
};

const clubsReducer = (state = initialState, action) => {

  let club, clubs;

  switch(action.type) {

    case "BEGIN_CLUBS_REQUEST":
      return { ...state, data: [...state.data], pending: true };

    case "ADD_CLUBS":
      clubs = action.clubs.data.map( club => {
        return {
          id: club.id,
          name: club.attributes.name,
          description: club.attributes.description,
          avatar: club.attributes.avatar,
          activeBook: club.attributes.activeBookIsbn13,
          threadIds: club.relationships.boards.data.map( board => board.id ),
        };
      });

      return { ...state, data: state.data.concat(clubs), pending: false };

    case "CREATE_CLUB":
      let {
        id,
        attributes: {
          name,
          description
        }
      } = action.club.data;
      
      club = {
        id,
        name,
        description,
        activeBook: "9780545010221",
        threadIds: []
      };

      return { ...state, data: state.data.concat(club), pending: false };

      case "UPDATE_CLUB":
        console.log(action.avatar);
        
        club = state.data.find( c => c.id === action.id );
        club.name = action.name;
        club.avatar = action.avatar;
        club.description = action.description;
        club.activeBook = action.activeBookIsbn13;

        console.log(club);
        
        clubs = state.data.map( c => c.id !== action.id ? c : club );
        console.log(clubs);
        
        return { ...state, data: clubs, pending: false };

      
    default:
      return state;
  };
};

export default clubsReducer;