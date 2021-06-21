import React, { useState } from 'react'
import Badge from '@material-ui/core/Badge'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		'& > *': {
			margin: theme.spacing(1)
		}
	},
	large: {
		width: theme.spacing(12),
		height: theme.spacing(12)
	}
}))

export default function BadgeAvatars({ image, onEdit, setImageUrl }) {
	const classes = useStyles()
	const [imgData, setImgData] = useState(null)

	const onChangePicture = (e) => {
		if (e.target.files[0]) {
			const reader = new FileReader()
			reader.addEventListener('load', () => {
				setImgData(reader.result)
			})
			reader.readAsDataURL(e.target.files[0])
		}
	}

	return (
		<div style={{ justifyContent: 'center' }} className={classes.root}>
			<label
				style={{ cursor: "pointer" }}
				htmlFor="contained-button-file">
				<Badge
					overlap="circle"
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right'
					}}
					badgeContent={
						<>
							<label htmlFor="contained-button-file" style={{ cursor: "pointer", display: onEdit ? "block" : "none" }}>
								<AddPhotoAlternateIcon color="secondary" />
							</label>
							{/*
								<label style={{ cursor: "pointer", display: !onEdit ? "none" : image === "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" ? "none" : "block" }} onClick={() => setImageUrl("https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png")}>
									<DeleteIcon color="primary" />
								</label>
							*/}
						</>
					}
				>
					<Avatar alt="Profile Image" className={classes.large} src={image} />
				</Badge>
			</label>
		</div>
	)
}
