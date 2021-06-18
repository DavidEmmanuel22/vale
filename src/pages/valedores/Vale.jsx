import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { valeHistory } from 'requests/allValedores'
import { Paper } from '@material-ui/core'

export const Vale = () => {
	const [vale, setVale] = useState('')
	const history = useHistory()
	const folio = history.location.state.idFolio

	useEffect(() => {
		async function getAllVales() {
			const { success, error, response } = await valeHistory(folio)
			if (success && response) {
				console.log(response);
				console.log(response.error);
				if (!response.error) {
					setVale(response)
				}
			}
		}
		getAllVales()
	}, [vale])
	return (
		<>
			<Paper style={{ height: 570, width: '100%' }}>
				<div
					style={{ maxWidth: 960 }}
					/// onContextMenu={(e) => e.preventDefault()}
					dangerouslySetInnerHTML={{ __html: vale }}
				/>
			</Paper>
		</>
	)
}
