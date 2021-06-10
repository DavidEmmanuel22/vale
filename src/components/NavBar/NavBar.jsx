import React, { useContext } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import clsx from 'clsx'
import { Person } from '@material-ui/icons'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { Button, Hidden } from '@material-ui/core'
import { GeneralLayoutStyle } from 'components/Layouts/DashboardLayout/GeneralLayoutStyle'
import { UserContext } from '../../context/userContext'
import { useHistory } from 'react-router'
import { Link } from "react-router-dom"

const NavBar = () => {
	const classes = GeneralLayoutStyle()
	const {
		isAuthenticated,
		user,
		logout,
		drawOpen,
		handleDrawerOpen
	} = useContext(UserContext)

	const history = useHistory()

	return (
		<AppBar
			position="sticky"
			className={clsx(classes.appBar, {
				[classes.appBarShift]: drawOpen
			})}
		>
			<Toolbar className={classes.toolbar}>
				<Hidden smDown>
					<Link to="/">
						<img
							width="200px"
							style={{ objectFit: 'contain' }}
							src="/logo-appbar.png"
						></img>
					</Link>
				</Hidden>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={() => handleDrawerOpen(!drawOpen)}
					edge="start"
					className={classes.menuButton}
				>
					<MenuIcon />
				</IconButton>
				<Button
					color="secondary"
					variant="contained"
					onClick={() => {
						logout()
						history.push('/')
					}}
					className={''}
					startIcon={<Person />}
				>
					Cerrar Sesion{' '}
				</Button>
			</Toolbar>
		</AppBar>
	)
}

export default NavBar
