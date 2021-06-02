import React, { useEffect, useState } from 'react'
import { Breadcrumbs, Link, Typography } from '@material-ui/core'
import { NavigateNext } from '@material-ui/icons'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import useStyles from './Styles'

const EXCLUSIONS = ['edit']

const HeaderRoutes = () => {
  const classes = useStyles()
  const { location } = useHistory()
  const [breadcrumbs, setBreadcrumbs] = useState([])
  const [currentPath, setCurrentPath] = useState(null)
  let composedPath = ''

  useEffect(() => {
    const url = location.pathname
    const paths = url.substring(1, url.length).split('/')
    setCurrentPath(() => textSanitize(paths.pop()))
    setBreadcrumbs(() => paths)
  }, [location])

  const textSanitize = (text) => text.replace(/-/g, ' ')

  return (
    <Breadcrumbs
      separator={<NavigateNext fontSize="small" />}
      aria-label="breadcrumb"
      className={classes.breadcrumbs}
    >
      {breadcrumbs.map((text, index) => {
        composedPath = `${composedPath}/${text}`
        if (EXCLUSIONS.includes(text)) {
          return (
            <Typography
              key={`${text}-${index}`}
              variant="body1"
              color="inherit"
            >
              {text}
            </Typography>
          )
        }

        return (
          <Link
            key={`${text}-${index}`}
            variant="body1"
            color="inherit"
            to={composedPath}
            component={RouterLink}
          >
            {text}
          </Link>
        )
      })}

      <Typography variant="body1" color="textPrimary">
        {currentPath}
      </Typography>
    </Breadcrumbs>
  )
}

export default HeaderRoutes
