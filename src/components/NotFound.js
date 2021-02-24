import React, { Component } from 'react'
import { Container, Button, Typography, Link } from '@material-ui/core';

class NotFound extends Component {
  render () {
    return <Container maxWidth='sm'>
      <Typography variant='h1'>404: Not found</Typography>
      <Link href='/' component={Button}>Back to home</Link>
    </Container>
  }
}

export default NotFound;