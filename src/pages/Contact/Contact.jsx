import {
	Grid,
	TextField,
	Slide,
	Button,
	InputAdornment,
	Hidden,
	Zoom
} from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import SendIcon from '@material-ui/icons/Send'
import React, { useState, useContext } from 'react'
import Typography from '@material-ui/core/Typography'
import valeThor from '../../assets/Contact/donVale.svg'
import EmailIcon from '@material-ui/icons/Email'
import PersonIcon from '@material-ui/icons/Person'
import { useFormik } from 'formik'
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid'
import MessageIcon from '@material-ui/icons/Message'
import { contactValidation, loginValidation } from './ContactValidation'
import './Contact.css'
import { ClientNavBar, Footer } from 'pages/Home/Home'
import { Link, useHistory } from 'react-router-dom'
import { createMail, clientMessageHistory } from 'requests/createMail'
import CircularProgress from '@material-ui/core/CircularProgress'
import { EmojiPeople } from '@material-ui/icons'
import { UserContext } from 'context/userContext'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const Contact = () => {
	const [contactForm, setContactForm] = useState({
		name: '',
		email: '',
		phoneNumber: '',
		message: ''
	})

	const history = useHistory()
	const [loginForm, setLoginForm] = useState({
		name: '',
		email: '',
		phoneNumber: ''
	})
	const [openAlert, setOpenAlert] = useState(false)
	const [openErrorAlert, setOpenErrorAlert] = useState(false)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [errorCreateChat, setErrorCreateChat] = useState(false)
	const { hiddeContactView, showContact, showContactView } = useContext(
		UserContext
	)
	const Alert = (props) => {
		return <MuiAlert elevation={6} variant="filled" {...props} />
	}
	const matches = useMediaQuery('(max-width:600px)')

	const contactFormikValidation = useFormik({
		initialValues: contactForm,
		onSubmit: async (formValue) => {
			setLoading(true)
			const { success, response, error } = await createMail({
				name: formValue.name,
				emailUser: formValue.email,
				telUser: formValue.phoneNumber,
				messageData: formValue.message
			})
			if (success && response) {
				if (response.error) {
					setErrorCreateChat(true)
					setOpenErrorAlert(true)
					setLoading(false)

					setTimeout(() => {
						setError(false)
						setOpenErrorAlert(false)
					}, 6000)
				} else {
					//console.log(response)
					setOpenAlert(true)
					setLoading(false)
					setTimeout(() => {
						history.push({
							pathname: '/mail',
							state: { email: formValue.email }
						})
						localStorage.setItem('idChat', response.data.chat._id)

						//localStorage.setItem('emailUser', response.data.message.idChat)
					}, 6000)
				}
			}
			contactFormikValidation.resetForm({
				values: {
					name: '',
					email: '',
					phoneNumber: '',
					message: ''
				}
			})
		},
		validationSchema: contactValidation
	})

	const loginFormikValidation = useFormik({
		initialValues: loginForm,
		onSubmit: async (formValue) => {
			setLoading(true)
			const { success, response, error } = await clientMessageHistory(
				formValue.email
			)
			if (error) {
				console.log(error)
				setError(true)
				setOpenErrorAlert(true)
			}
			if (success && response) {
				if (response.data.length > 0) {
					const resp = response.data[0].message.idChat
					localStorage.setItem('idChat', resp)
					history.push({
						pathname: '/mail',
						state: { email: formValue.email }
					})
					localStorage.setItem('email', formValue.email)
				} else {
					setError(true)
					setOpenErrorAlert(true)

					setTimeout(() => {
						setError(false)
						setOpenErrorAlert(false)
						setLoading(false)
					}, 6000)
				}
			}
			loginFormikValidation.resetForm({
				values: {
					name: '',
					email: '',
					phoneNumber: '',
					message: ''
				}
			})
		},
		validationSchema: loginValidation
	})

	const contactContent = (
		<>
			<ClientNavBar />

			<Grid container style={{ height: '100vh' }}>
				<Hidden xsDown>
					<Grid
						className="contact__section"
						style={!showContact ? { backgroundColor: '#003634' } : null}
						item
						xs={12}
						sm={6}
						md={6}
					>
						<div className="contact__img-shadow">
							<Hidden xlDown={!showContact} lgDown={!showContact}>
								<Zoom
									timeout={600}
									in
									direction="down"
									mountOnEnter
									unmountOnExit
								>
									<div className="contact__welcome-message">
										<h2>
											Lorem ipsum dolor sit,
											<Button
												variant="contained"
												color="primary"
												startIcon={<MessageIcon />}
												className="contact__welcome-login"
												onClick={() => {
													hiddeContactView()
												}}
											>
												{' '}
												Historial{' '}
											</Button>
											amet consectetur adipisicing elit. Deserunt recusandae
											quae vel sit obcaecati mollitia similique consequatur
											libero adipisci, incidunt harum perspiciatis doloremque
										</h2>
									</div>
								</Zoom>

								<img className="contact__img" src={valeThor} />
							</Hidden>
						</div>
					</Grid>
				</Hidden>

				<Grid item xs={12} sm={6} md={6}>
					<form
						onSubmit={
							!showContact
								? loginFormikValidation.handleSubmit
								: contactFormikValidation.handleSubmit
						}
						className={`contact__form ${!showContact ? 'contact__form-login' : ''
							}`}
					>
						<Typography className="contact__input" variant="h4">
							{`${!showContact ? 'Historial Mensajes' : 'Cont??ctanos'}`}
						</Typography>

						<TextField
							className="contact__input"
							label="Nombre"
							variant="filled"
							name="name"
							value={
								!showContact
									? loginFormikValidation.values.name
									: contactFormikValidation.values.name
							}
							onChange={
								!showContact
									? loginFormikValidation.handleChange
									: contactFormikValidation.handleChange
							}
							error={
								!showContact
									? Boolean(loginFormikValidation.touched.name) &&
									Boolean(loginFormikValidation.errors.name)
									: showContact &&
									Boolean(contactFormikValidation.touched.name) &&
									Boolean(contactFormikValidation.errors.name)
							}
							helperText={
								!showContact
									? loginFormikValidation.touched.name &&
									loginFormikValidation.errors.name
									: showContact &&
									contactFormikValidation.touched.name &&
									contactFormikValidation.errors.name
							}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<PersonIcon color="primary" />
									</InputAdornment>
								)
							}}
							inputProps={{
								maxLength: 25
							}}
						/>

						<TextField
							className="contact__input"
							label="Correo Electr??nico"
							type="email"
							variant="filled"
							name="email"
							value={
								!showContact
									? loginFormikValidation.values.email
									: contactFormikValidation.values.email
							}
							onChange={
								!showContact
									? loginFormikValidation.handleChange
									: contactFormikValidation.handleChange
							}
							error={
								!showContact
									? Boolean(loginFormikValidation.touched.email) &&
									Boolean(loginFormikValidation.errors.email)
									: showContact &&
									Boolean(contactFormikValidation.touched.email) &&
									Boolean(contactFormikValidation.errors.email)
							}
							helperText={
								!showContact
									? loginFormikValidation.touched.email &&
									loginFormikValidation.errors.email
									: showContact &&
									contactFormikValidation.touched.email &&
									contactFormikValidation.errors.email
							}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<EmailIcon color="primary" />
									</InputAdornment>
								)
							}}
							inputProps={{
								maxLength: 60
							}}
						/>
						<TextField
							className="contact__input"
							label="Tel??fono"
							variant="filled"
							type="number"
							name="phoneNumber"
							value={
								!showContact
									? loginFormikValidation.values.phoneNumber
									: contactFormikValidation.values.phoneNumber
							}
							onChange={
								!showContact
									? loginFormikValidation.handleChange
									: contactFormikValidation.handleChange
							}
							error={
								!showContact
									? Boolean(loginFormikValidation.touched.phoneNumber) &&
									Boolean(loginFormikValidation.errors.phoneNumber)
									: showContact &&
									Boolean(contactFormikValidation.touched.phoneNumber) &&
									Boolean(contactFormikValidation.errors.phoneNumber)
							}
							helperText={
								!showContact
									? loginFormikValidation.touched.phoneNumber &&
									loginFormikValidation.errors.phoneNumber
									: showContact &&
									contactFormikValidation.touched.phoneNumber &&
									contactFormikValidation.errors.phoneNumber
							}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<PhoneAndroidIcon color="primary" />
									</InputAdornment>
								)
							}}
							onInput={(e) => {
								e.target.value = Math.max(0, parseInt(e.target.value))
									.toString()
									.slice(0, 10)
							}}
						/>
						<Hidden xlDown={!showContact} lgDown={!showContact}>
							<TextField
								className="contact__input"
								label="Mensaje"
								multiline
								rows={3}
								variant="filled"
								name="message"
								value={contactFormikValidation.values.message}
								onChange={contactFormikValidation.handleChange}
								error={
									contactFormikValidation.touched.message &&
									Boolean(contactFormikValidation.errors.message)
								}
								helperText={
									contactFormikValidation.touched.message &&
									contactFormikValidation.errors.message
								}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<MessageIcon color="primary" />
										</InputAdornment>
									)
								}}
								inputProps={{
									maxLength: 500
								}}
							/>
						</Hidden>

						<div style={{ position: 'relative' }}>
							<Button
								variant="contained"
								color="primary"
								type="submit"
								disabled={loading && !error}
								endIcon={<SendIcon />}
							>
								{`${!showContact ? 'Entrar' : 'Enviar'}`}
							</Button>
							{loading && !error && (
								<CircularProgress
									style={{
										position: 'absolute',
										top: '18%',
										left: '46%'
									}}
									size={24}
								/>
							)}
						</div>
						{matches && (
							<Hidden xlDown={!showContact} lgDown={!showContact}>
								<span className="contact__register">
									??Ya est??s registrado?{' '}
									<span
										onClick={() => {
											hiddeContactView()
										}}
									>
										Ingresar
									</span>
								</span>
							</Hidden>
						)}
						{matches && (
							<Hidden xlDown={showContact} lgDown={showContact}>
								<span className="contact__register">
									??No est??s registrado?{' '}
									<span onClick={() => showContactView()}>Registrate</span>
								</span>
							</Hidden>
						)}
					</form>
				</Grid>
			</Grid>
			{/* <Footer /> */}
		</>
	)
	return (
		<>
			{contactContent}

			{showContact && (
				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
					open={openAlert}
					onClose={() => {
						setOpenAlert(false)
					}}
					autoHideDuration={6000}
				>
					<Slide timeout={600} in mountOnEnter unmountOnExit>
						<div>
							<Alert severity="success">
								Mensaje enviado, en un momento te redireccionaremos a tu
								historial de mensajes
							</Alert>
						</div>
					</Slide>
				</Snackbar>
			)}

			{error && !showContact && (
				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
					open={openErrorAlert}
					onClose={() => {
						setOpenErrorAlert(false)
					}}
					autoHideDuration={6000}
				>
					<Slide timeout={600} in mountOnEnter unmountOnExit>
						<div>
							<Alert severity="warning">
								Usuario no encontrado, le invitamos a{' '}
								{
									<Button
										variant="contained"
										color="primary"
										endIcon={<EmojiPeople />}
										style={{ cursor: 'pointer', fontWeight: 'bold' }}
										onClick={() => showContactView()}
									>
										registrarse
									</Button>
								}
							</Alert>
						</div>
					</Slide>
				</Snackbar>
			)}

			{errorCreateChat && showContact && (
				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
					open={openErrorAlert}
					onClose={() => {
						setOpenErrorAlert(false)
					}}
					autoHideDuration={6000}
				>
					<Slide timeout={600} in mountOnEnter unmountOnExit>
						<div>
							<Alert severity="warning">
								Este usuario ya existe, le invitamos a ingresar a su{' '}
								{
									<Button
										variant="contained"
										color="primary"
										endIcon={<MessageIcon />}
										style={{ cursor: 'pointer', fontWeight: 'bold' }}
										onClick={() => hiddeContactView()}
									>
										historial
									</Button>
								}
							</Alert>
						</div>
					</Slide>
				</Snackbar>
			)}
		</>
	)
}

export default Contact
