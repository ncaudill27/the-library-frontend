import React, { useState, forwardRef } from 'react';
import { connect } from 'react-redux';
import { memberJoinRequest, memberLeaveRequest } from '../actions/users';
/* ------------
  Material imports
---------- */
import { makeStyles, Menu, IconButton, MenuItem, Box, Link  } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/MenuBook';

const useStyles = makeStyles( theme => ({
  cog: {
    position: 'absolute',
    top: theme.spacing(-3.5),
    right: '0',
  },
  menuItem: {
    backgroundColor: '#fff',
    color: theme.palette.secondary.dark,
    marginBottom: theme.spacing(0.25)
  },
}));

const MembershipButton = forwardRef( ({currentUserIsMember, handleClose, handleLeave, handleJoin}, ref) => {
  const classes = useStyles();

  return (
    currentUserIsMember
    ? (
      <MenuItem onClick={handleClose} className={classes.menuItem} ref={ref}>
        <Box onClick={handleLeave}>
          Leave Club
        </Box>
      </MenuItem>
    )
    : (
      <MenuItem onClick={handleClose} className={classes.menuItem} ref={ref}>
        <Box onClick={handleJoin}>
          Join Club
        </Box>
      </MenuItem>
    )
  );
});

const ModOptions = ({currentUserIsMod, handleClose, toggleModMembers}) => {
  const classes = useStyles();

  return (
    currentUserIsMod
    ? <>
        <MenuItem onClick={handleClose} className={classes.menuItem}>
          <Box onClick={toggleModMembers}>
            Current members
          </Box>
        </MenuItem>
        <MenuItem onClose={handleClose} className={classes.menuItem}>
          <Link
            href='/avatar-selection'
            color='inherit'
            underline='none'
          >
            Choose new avatar
          </Link>
        </MenuItem>
        <MenuItem className={classes.menuItem}>
          <Link
            href='/bestsellers'
            color='inherit'
            underline='none'
          >
            Set new book
          </Link>
        </MenuItem>
      </>
    : null
  )
}

const ClubMenu = ({id, currentUser, currentUserIsMod, currentUserIsMember, memberships, memberJoinRequest, toggleModMembers}) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleMenu = e => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  
  const handleJoin = () => {
    const payload = {
      membership: {
        club_id: id
      }
    };

    memberJoinRequest(payload);
  }

  const findMembershipId = ({clubId, userId}) => {
    return memberships.find( m => m.userId === userId && m.clubId === clubId )
    .id;
  }

  const handleLeave = () => {
    const membershipId = findMembershipId({clubId: id, userId: currentUser.id});
    memberLeaveRequest(membershipId);
  }

  return <>
    {
      currentUser
      ? (
        <IconButton onClick={handleMenu} edge='end' aria-label='menu' className={classes.cog}>
          <SettingsIcon color='secondary' />
        </IconButton>
      )
      : null
    }
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom', 
        horizontal: 'right'
      }}
      open={open}
      onClose={handleClose}
      getContentAnchorEl={null}
    >
      <MembershipButton currentUserIsMember={currentUserIsMember} handleLeave={handleLeave} handleJoin={handleJoin} handleClose={handleClose} />
      <ModOptions currentUserIsMod={currentUserIsMod} handleClose={handleClose} toggleModMembers={toggleModMembers} />
    </Menu>
  </>
}

const mapStateToProps = ({users}) => ({
  currentUser: users.currentUser,
  memberships: users.memberships
})
export default connect(mapStateToProps, { memberJoinRequest, memberLeaveRequest })(ClubMenu);