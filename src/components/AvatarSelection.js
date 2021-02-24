import React, { Component } from 'react';
import Unsplash, { toJson } from 'unsplash-js';
import { connect } from 'react-redux';
import { updateUserRequest } from '../actions/users';
import { patchClubRequest } from '../actions/clubs';
import LeftArrow from '../return.png';
import RightArrow from '../arrow.png';
import Avatar from './Avatar';
import AvatarPreview from './AvatarPreview';

class AvatarSelection extends Component {

  unsplash = new Unsplash({ accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY });

  state = {
    photos: [],
    page: this.props.page,
    search: this.props.search,
    preview: '',
    toUpdate: this.props.currentUser.username
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log(this.state));
  }

  handleSearch = e => {
    e.preventDefault();
    this.fetchSelections();
  }

  setPreview = e => this.setState({ preview: e.target.src });

  setUpdateTarget = e => this.setState({ toUpdate: e.target.value }, ()=> console.log(typeof this.state.toUpdate));

  clearPreview = () => this.setState({ preview: '', toUpdate: this.props.currentUser.username });

  componentDidMount() {
    this.fetchSelections();
  }

  renderSelections = () => {
    return this.state.photos.map( ({id, photo}) =>
      <div key={id} onClick={this.setPreview}>
        <Avatar key={id} avatar={photo} />
      </div>
    );
  }
  
  fetchSelections = async () => {
    const photos = await this.unsplash.search.collections(this.state.search, this.state.page, 5)
    .then(toJson)
    .then( json => json.results
      .map( obj => obj.preview_photos
        .map( photo => ({id: photo.id, photo: photo.urls.raw}))
      )
    );
    this.setState({ photos: photos.flat() });
  }
  
  nextPage = () => this.setState( prevState => {
    return { page: prevState.page + 1 }
  }, this.fetchSelections);

  previousPage = () => {
    if (this.state.page > 1) this.setState( prevState => {
      return { page: prevState.page - 1 }
    }, this.fetchSelections)
  }

  navigation = () => 
    <div className='navigation'>
      <img onClick={this.previousPage} src={LeftArrow} alt='previous page arrow' />
      <h2>{this.state.page}</h2>
      <img onClick={this.nextPage} src={RightArrow} alt='next page arrow' />
    </div>;
  
  updateUserAvatar = () => {
    const {
      props: {
        currentUser: {
          id
        },
        updateUserRequest
      },
      state: {
        preview
      },
      clearPreview
    } = this;

    const payload = {
      user: {
        id,
        avatar: preview
      }
    };

    updateUserRequest(payload, id);
    clearPreview();
  }

  updateClubAvatar = () => {
    const {
      props: {
        clubs,
        patchClubRequest
      },
      state: {
        toUpdate,
        preview
      },
      clearPreview
    } = this;

    const club = clubs.find( c => c.id === toUpdate )
    const payload = {
      club: {
        id: club.id,
        avatar: preview
      }
    };

    patchClubRequest(payload, club.id);
    clearPreview();
  }

  handleUpdate = () => {
    const {
      props: {
        currentUser: {
          username
        }
      },
      state: {
        toUpdate
      },
      updateClubAvatar,
      updateUserAvatar 
    } = this;

    toUpdate === username ? updateUserAvatar() : updateClubAvatar();
  }

  searchBar = () => 
    <form onSubmit={this.handleSearch}>
      <label>Category
      <input type='text' name='search' value={this.state.search} onChange={this.handleChange} />
      </label>
      <input type='submit' value='Search' />
    </form>
  
  render() {
    const {
      state: {
        preview
      },
      props: {
        clubsCurrentUserMods,
        currentUser
      },
      searchBar,
      clearPreview,
      renderSelections,
      navigation,
      setUpdateTarget,
      handleUpdate
    } = this;
    
    return (
      <div className='Avatar-selection'>
        <h2>Choose an avatar!</h2>
        {
          preview
          ? <AvatarPreview
              src={preview}
              cancel={clearPreview}
              clubsCurrentUserMods={clubsCurrentUserMods}
              currentUser={currentUser}
              setUpdateTarget={setUpdateTarget}
              handleUpdate={handleUpdate}
            />
          : null
        }
        { searchBar() }
        <div className='photo-selection'>
          { renderSelections() }
        </div>
        { navigation() }
      </div>
    );
  };
}

AvatarSelection.defaultProps = {
  page: 1,
  search: 'Nature'
}

const mapStateToProps = ({users, clubs}) => ({memberships: users.memberships, clubs: clubs.data});


export default connect( mapStateToProps, { updateUserRequest, patchClubRequest } )(AvatarSelection);