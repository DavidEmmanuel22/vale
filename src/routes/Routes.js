import React, { useContext, useRef, useEffect } from 'react'
import { Switch, Route, useLocation, Redirect } from 'react-router-dom'
import { ClientNavBar, Home } from '../pages/Home/Home'
import ForgotPassword from 'components/ForgotPasword/ForgotPassword'
import UpdatePassword from 'components/ResetPassword/UpdatePassword'
import GeneralLayout from 'components/Layouts/DashboardLayout/GeneralLayout'
import Historial from 'pages/valedores/Historial'
import { UserContext } from '../context/userContext'
import PrivateRoute from './PrivateRoute'
import Contact from 'pages/Contact/Contact'
import dashboardRoutes from './dashboardRoutes'
import valedorRoutes from './valedorRoutes'
import BussinesRoutes from './bussinesRoutes'
import { Mail } from 'pages/Mail/Mail'
import { Vale } from 'pages/valedores/Vale'
import { Business } from 'components/Business/Business'
import SingleBusinessHistory from 'pages/negocios/SingleBusinessHistory'
import ValedorPayment from 'pages/ValedorPayment'

const Routes = () => {
    const { isAuthenticated, user } = useContext(UserContext)
    const refToScroll = useRef(null)
    const path = useLocation()

    const scrollToTop = () => {
        refToScroll.current.scrollIntoView({ behavior: 'smooth' })
    }
    useEffect(() => {
        scrollToTop()
    }, [path])
    return (
        <div ref={refToScroll}>
            <Switch>
                {user.role === 'Admin' &&
                    dashboardRoutes.map((route, index) => (
                        <PrivateRoute key={index} isAuthenticated={isAuthenticated} exact path={route.path}>
                            <GeneralLayout routes={dashboardRoutes}>
                                <route.component></route.component>
                            </GeneralLayout>
                        </PrivateRoute>
                    ))}
                {user.role === 'Valedor' &&
                    valedorRoutes.map((route, index) => (
                        <PrivateRoute key={index} isAuthenticated={isAuthenticated} exact path={route.path}>
                            <GeneralLayout routes={valedorRoutes}>
                                <route.component></route.component>
                            </GeneralLayout>
                        </PrivateRoute>
                    ))}
                {user.role === 'Bussines' &&
                    BussinesRoutes.map((route, index) => (
                        <PrivateRoute key={index} isAuthenticated={isAuthenticated} exact path={route.path}>
                            <GeneralLayout routes={BussinesRoutes}>
                                <route.component></route.component>
                            </GeneralLayout>
                        </PrivateRoute>
                    ))}
                <PrivateRoute exact isAuthenticated={isAuthenticated} path='/dashboard/negocio/:idBusiness'>
                    <GeneralLayout routes={dashboardRoutes}>
                        <SingleBusinessHistory></SingleBusinessHistory>
                    </GeneralLayout>
                </PrivateRoute>

                <PrivateRoute exact isAuthenticated={isAuthenticated} path='/dashboard/valedor/:idValedor'>
                    <GeneralLayout routes={dashboardRoutes}>
                        <ValedorPayment></ValedorPayment>
                    </GeneralLayout>
                </PrivateRoute>

                <PrivateRoute exact isAuthenticated={isAuthenticated} path='/valedores/history'>
                    <GeneralLayout routes={dashboardRoutes}>
                        <Historial />
                    </GeneralLayout>
                </PrivateRoute>

                <Route exact path='/forgot-password'>
                    <ForgotPassword />
                </Route>

                <Route exact path='/update-password/:token'>
                    <UpdatePassword />
                </Route>

                <Route exact path='/mail'>
                    <ClientNavBar />
                    <Mail />
                </Route>

                <Route exact path='/business'>
                    <Business />
                </Route>

                <Route exact path='/contact'>
                    <Contact />
                </Route>

                <Route exact path='/vale'>
                    <GeneralLayout routes={valedorRoutes}>
                        <Vale />
                    </GeneralLayout>
                </Route>

                <Route exact path='/'>
                    <Home />
                </Route>

                <Route path='/'>
                    <Redirect to='/'></Redirect>
                </Route>
            </Switch>
        </div>
    )
}

export default Routes
