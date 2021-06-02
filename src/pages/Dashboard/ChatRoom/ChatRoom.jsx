import { AppBar, Button, Drawer, Grid, makeStyles, Toolbar } from '@material-ui/core'
import React from 'react'
import { Message } from '../Messages/Message'
import { NavBarChat } from '../NavBarChat/NavBarChat'
import "./ChatRoom.css"
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import moment from "moment"

const drawerWidth = 800;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		zIndex: 100,
	},
	appBarShift: {
		width: `100%`,
		marginLeft: 0,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	toolbar: {
		display: "flex",
		justifyContent: "flex-start"
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
		position: "absolute",
		backgroundColor: "transparent",
		border: "none"
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-start',
		backgroundColor: "transparent"
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginRight: -drawerWidth,
		borderRadius: 10,
		backgroundColor: "#fff",
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginRight: 0,
		backgroundColor: "#fff",
		borderRadius: 10,
	},
}));



export const ChatRoom = () => {

	const [open, setOpen] = React.useState(false)
	const classes = useStyles();
	const theme = useTheme();

	const handleDrawerOpen = () => {
		setOpen(!open);

		console.log("hhehe");
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};


	return (
		<div style={{ position: "relative", zIndex: 200, }} id="chatContainer">
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position="absolute"
					className={clsx(classes.appBar, {
						[classes.appBarShift]: open,
					})}
				>
					<Toolbar className={classes.toolbar}>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							className={classes.menuButton}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" noWrap>
							{moment().format('MMMM Do YYYY, h:mm:ss a')}
						</Typography>
					</Toolbar>
				</AppBar>
				<main
					className={clsx(classes.content, {
						[classes.contentShift]: open,
					})}
				>
					<div className={classes.drawerHeader} />
					<div style={{}}>
						<Typography variant="h6" noWrap>
							Recientes
						</Typography>
						<Grid container>
							<Grid item xs={12}>
								<div className="card-container">
									<div>
										<img src="/images/no-avatar.png"></img>
										<p className="card-name" style={{ marginRight: "auto", }}>Someone Someone</p>
										<p className="card-date">
											27/01/2021
									</p>
									</div>
									<p className="card-message">The Message......</p>
								</div>
							</Grid>
							<Grid item xs={12}>
								<div className="card-container">
									<div>
										<img src="/images/no-avatar.png"></img>
										<p className="card-name" style={{ marginRight: "auto", }}>Someone Someone</p>
										<p className="card-date">
											27/01/2021
									</p>
									</div>
									<p className="card-message">The Message......</p>
								</div>
							</Grid>
							<Grid item xs={12}>
								<div className="card-container">
									<div>
										<img src="/images/no-avatar.png"></img>
										<p className="card-name" style={{ marginRight: "auto", }}>Someone Someone</p>
										<p className="card-date">
											27/01/2021
									</p>
									</div>
									<p className="card-message">The Message......</p>
								</div>
							</Grid>
							<Grid item xs={12}>
								<div className="card-container">
									<div>
										<img src="/images/no-avatar.png"></img>
										<p className="card-name" style={{ marginRight: "auto", }}>Someone Someone</p>
										<p className="card-date">
											27/01/2021
									</p>
									</div>
									<p className="card-message">The Message......</p>
								</div>
							</Grid>
						</Grid>
					</div>
				</main>
				<Drawer
					className={classes.drawer}
					variant="persistent"
					anchor="right"
					open={open}
					classes={{
						paper: classes.drawerPaper,
					}}
				>
					<div className={classes.drawerHeader}>

					</div>
					<Grid container style={{width:"100%", height:"100%", backgroundColor:"#fff"}}>
						hello
					</Grid>
				</Drawer>

			</div>
		</div>
	)
}
