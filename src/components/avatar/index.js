/* eslint-disable react/display-name */
import React from 'react'
import { UserContext } from '../../context/userContext'
import Badge from '@material-ui/core/Badge'
import Avatar from '@material-ui/core/Avatar'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'
import { uploadImage } from '../../requests/allValedores'

const UserAvatar = React.forwardRef(({ onEdit, errorImageHandler }, ref) => {
    const { user } = React.useContext(UserContext)

    const defaultUrlImage = 'https://dev.valevaledor.com/images/no-avatar.png'
    const initialUrlImage = user.urlImage ? user.urlImage : defaultUrlImage

    const [urlImage, setUrlImage] = React.useState(initialUrlImage)

    React.useImperativeHandle(ref, () => {
        return {
            test: () => test(),
            rollbackImage: () => rollbackToLastImage(),
            urlImage: () => urlImage
        }
    })

    const valiateImage = imageName => {
        const validExtensions = ['png', 'jpg', 'jpeg', 'gif']

        const fileName = imageName.split('.')
        const extension = fileName[fileName.length - 1]
        return validExtensions.find(ext => ext === extension)
    }

    const rollbackToLastImage = () => {
        setUrlImage(initialUrlImage)
    }

    const handleChangeImage = e => {
        if (e.target.files[0]) {
            if (valiateImage(e.target.files[0].name)) {
                const reader = new FileReader()
                reader.addEventListener('load', () => {
                    /*setImgData(reader.result)
							  setImageTitle(e.target.files[0].name)
							  console.log('Image was charged')*/
                    handleUploadImage(reader.result, e.target.files[0].name)
                })
                reader.readAsDataURL(e.target.files[0])
            } else {
                errorImageHandler('El tipo de archivo especificado no esta permitido')
            }
        }
    }

    const handleUploadImage = async (imgData, imageTitle) => {
        const { success, response, error } = await uploadImage(imgData, imageTitle)

        if (success && response) {
            if (response.error) {
                return
            }
            console.log(response)
            setUrlImage(response.data.urlImage)
        }
    }

    const handleDeleteImage = () => {
        setUrlImage(defaultUrlImage)
    }

    const test = () => {
        console.log('test')
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <input
                style={{ display: 'none' }}
                accept='image/*'
                id='avatar-input'
                onChange={handleChangeImage}
                type='file'
            />
            <label htmlFor={onEdit ? 'avatar-input' : ''}>
                <Badge
                    overlap='circle'
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    style={{ cursor: 'pointer' }}
                    badgeContent={
                        <AddPhotoAlternateIcon style={{ display: onEdit ? 'block' : 'none' }} color='secondary' />
                    }
                >
                    <Avatar style={{ width: '100px', height: '100px' }} src={urlImage}>
                        A
                    </Avatar>
                </Badge>
            </label>
            <a
                href='#'
                style={{
                    marginTop: '10px',
                    /*display:
            urlImage === defaultUrlImage ? 'none' : onEdit ? 'block' : 'none'*/
                    color: !onEdit ? 'transparent' : '',
                    cursor: onEdit ? 'pointer' : 'default'
                }}
                onClick={() => {
                    onEdit && handleDeleteImage()
                }}
            >
                Eliminar Imagen
            </a>
        </div>
    )
})

export default UserAvatar
