/* eslint-disable no-unneeded-ternary */
import React, { useState, useEffect } from 'react'
import Hidden from '@material-ui/core/Hidden'
import './uploadImage.css'

const UploadImage = ({ onEdit, photoURI = '' }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [nameOfPhoto, setNameOfPhoto] = useState(false)
  const [newPhotoURL, setNewPhotoURL] = useState(false)
  const [filePhoto, setFilePhoto] = useState('')

  const photo = null // when auth return photo uri, is gonna be hero

  const onFileSelected = (e) => {
    setFilePhoto(e.target.files[0])
    console.log(e.target.files[0].mozFullPath)
  }

  const onDragOver = (e) => {
    e.preventDefault()
    onEdit && setNameOfPhoto(' ')
  }
  const onDragLeave = (e) => {
    onEdit && setNameOfPhoto('')
  }
  const onDrop = (e) => {
    e.preventDefault()
    console.log('hees')
    console.log(e.dataTransfer.files[0])
    onEdit && setFilePhoto(e.dataTransfer.files[0])
  }

  return (
    <div className="profile-image-container">
      {/*<figure onDrop={e => onDrop(e)} onDragOver={e => onDragOver(e)} onDragLeave={e => onDragLeave(e)}>
				<div className='container column'>
					<small>Drag an image or pick one</small>
					{isLoading ? (
						<LoadingSpinner />
					) : (
						<label htmlFor='uploadImage'>
							<UploadIcon color={nameOfPhoto ? '#0982be' : '#929292'} width={40} height={40} />
						</label>
					)}
					<small className='name-photo'>{nameOfPhoto}</small>
					<input
						type='file'
						name='uploadImage'
						id='uploadImage'
						accept='image/*'
						onChange={e => onFileSelected(e)}
					/>
				</div>
				<img className='photo' src={newPhotoURL ? newPhotoURL : photo || '/images/profile-bone.jpg'} alt='Photo' />
					</figure>*/}
    </div>
  )
}

export default UploadImage
