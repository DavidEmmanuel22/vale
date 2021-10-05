import { Grid, IconButton, makeStyles, Paper, Popover, Tooltip, Typography } from '@material-ui/core'
import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import _ from 'lodash'
import SingleBusinessTable from 'components/Tables/SingleBusinessTable'
import { FilterList } from '@material-ui/icons'
import DateRange from 'components/filters/DateRangePicker'
import { Alert } from '@material-ui/lab'
import { RowProvider } from 'assets/Helpers/RowContext'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    mainPaper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: `calc(100vh - 182px)`,
        overflowY: 'scroll'
    },
    titlePaper: {
        padding: theme.spacing(2),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: '65px'
    },
    title: {
        color: 'black'
    }
}))

const SingleBusinessHistory = () => {
    const { idBusiness } = useParams()
    const location = useLocation()

    const [anchorEl, setAnchorEl] = React.useState(null)

    const [state, setState] = React.useState([
        {
            startDate: null,
            endDate: null,
            key: 'selection'
        }
    ])

    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    function handleSelectRange(item) {
        setState([item.selection])
    }

    function handleSelectAll() {
        console.log('select all')
        setState([
            {
                startDate: null,
                endDate: null,
                key: 'selection'
            }
        ])
    }

    const classes = useStyles()

    const noRowsComponent = <Alert severity='info'>¡Ups! Parece que no existen registros del negocio</Alert>

    return (
        <Grid container spacing={1} style={{ height: '100%' }}>
            <Grid item xs={12}>
                <Paper className={classes.titlePaper}>
                    <Typography component='h4' className={classes.title}>
                        Historial de compras - {_.get(location, 'state.business.bussinesName')}
                    </Typography>
                    <Tooltip title='Mostrar filtros' onClick={handleClick} style={{ marginRight: '30px' }}>
                        <IconButton aria-describedby={id}>
                            <FilterList color='primary'></FilterList>
                        </IconButton>
                    </Tooltip>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left'
                        }}
                        style={{ overflow: 'scroll' }}
                    >
                        <DateRange
                            date={state}
                            onRangeChange={handleSelectRange}
                            onSelectAll={handleSelectAll}
                        ></DateRange>
                    </Popover>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.mainPaper}>
                    <RowProvider component={noRowsComponent}>
                        <SingleBusinessTable
                            dateRange={state}
                            business={_.get(location, 'state.business', {})}
                        ></SingleBusinessTable>
                    </RowProvider>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default SingleBusinessHistory
