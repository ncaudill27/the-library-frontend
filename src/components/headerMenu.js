import React from "react"

const HeaderMenu = () => {
  const classes = useStyles()

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={open}
      onClose={handleClose}
    >
      <MenuLink
        href="/bestsellers"
        text="NY Times Bestsellers"
        handleClose={handleClose}
      />
      <MenuLink href="/clubs" text="Browse Clubs" handleClose={handleClose} />
      {!!currentUsersClubs().length ? (
        <MenuItem disabled>Your clubs</MenuItem>
      ) : null}
      {currentUser && <ClubList styling="sidebar" handleClose={handleClose} />}
      {currentUser && (
        <MenuItem className={classes.create}>
          <Link href="/clubs/new" color="inherit" underline="none">
            Create New Club
          </Link>
        </MenuItem>
      )}
    </Menu>
  )
}

// forward ref so mui knows where to put menu
const MenuLink = forwardRef(({ href, text, handleClose }, ref) => {
  const classes = useStyles()

  return (
    <MenuItem onClick={handleClose} className={classes.menuItem} ref={ref}>
      <Link href={href} className={classes.link} underline="none">
        {text}
      </Link>
    </MenuItem>
  )
})

export default HeaderMenu
