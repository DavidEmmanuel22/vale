import React, { useState } from 'react'
import Badge from '@material-ui/core/Badge'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core'

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

export default function BadgeAvatars({ image, onEdit, setImageUrl, setImgData }) {
	const classes = useStyles()

	const handleDeleteImage = () => {
		setImageUrl(false)
		setImgData(false)
		console.log("deleting");
	}

	return (
		<div style={{ display:"flex", flexDirection:"column", }} className={classes.root}>
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
							<label style={{ cursor: "pointer", display: !onEdit ? "none" : image === "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" ? "none" : "block" }} onClick={handleDeleteImage}>
								<DeleteIcon color="primary" />
							</label>
							*/}
						</>
					}
				>
					<Avatar alt="Profile Image" className={classes.large} src={image} />
				</Badge>
			</label>
			<a color="primary" variant="contained" style={{ cursor: "pointer", display: !onEdit ? "none" : image === "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" ? "none" : "block" }} onClick={handleDeleteImage}>Eliminar Imagen</a>
		</div>
	)
}
