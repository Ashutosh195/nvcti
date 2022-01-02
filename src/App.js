import React, { lazy, Suspense, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './hoc/privateRoute'
import AdminRoute from './hoc/adminRoute'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loading from './components/common/Loading'
import Error from './pages/Error'
import ComingSoon from './pages/ComingSoon'

const Contact = lazy(() => import('./pages/Contact'))
const Homepage = lazy(() => import('./pages/Homepage'))
const Facilities = lazy(() => import('./pages/Facilities'))
const Register = lazy(() => import('./pages/Register'))
const About = lazy(() => import('./pages/About'))
const Events = lazy(() => import('./pages/Events'))
const UpcomingEvents = lazy(() => import('./pages/UpcomingEvents'))
const FlagshipEvents = lazy(() => import('./pages/FlagshipEvents'))
const FlagshipEventEditions = lazy(() =>
  import('./pages/FlagshipEventEditions')
)
const MicEvents = lazy(() => import('./pages/MicEvents'))
const OtherEvents = lazy(() => import('./pages/OtherEvents'))
const Login = lazy(() => import('./pages/Login'))
const Profile = lazy(() => import('./pages/Profile'))
const AdminLogin = lazy(() => import('./pages/AdminLogin'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))
const LabInchargeDashboard = lazy(() => import('./pages/LabInchargeDashboard'))
const IdeaDetails = lazy(() =>
  import('./components/Admin/adminDashboard/ideaDetails')
)
const LabIdeaDetails = lazy(() =>
  import('./components/Admin/LabInchargeDashboard/ideaDetails')
)
const Confirmation = lazy(() => import('./pages/Confirmation'))
const Gallery = lazy(() => import('./pages/Gallery'))

const App = () => {
  useEffect(() => {

    let offlineWarning = (e) => {
      toast.warn("You're offline!", {
        position: 'top-right',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    }

    let onlineNotice = (e) => {
      toast.success('Back online!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    }

    window.addEventListener('offline', offlineWarning)
    window.addEventListener('online', onlineNotice)

  }, [])


  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/facilities" component={Facilities} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/about" component={About} />
        <Route exact path="/events" component={Events} />
        <Route exact path="/upcoming-events" component={UpcomingEvents} />
        <Route
          path="/flagship-events/:event"
          component={FlagshipEventEditions}
        />
        <Route exact path="/flagship-events" component={FlagshipEvents} />
        <Route exact path="/mic-events" component={MicEvents} />
        <Route exact path="/other-events" component={OtherEvents} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/confirm/:id" component={Confirmation} />
        <Route exact path="/admin_login" component={AdminLogin} />
        <Route exact path="/coming_soon" component={ComingSoon} />
        <AdminRoute exact path="/Admin_dashboard" admin={true} component={AdminDashboard} />
        <AdminRoute exact path="/Labincharge_dashboard" labincharge={true} component={LabInchargeDashboard} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <AdminRoute
          exact
          path="/idea_details/:title/:id"
          component={IdeaDetails}
        />
        <AdminRoute
          exact
          labincharge={true} 
          path="/lab_idea_details/:title/:id"
          component={LabIdeaDetails}
        />
        <Route path="/gallery/:title/:date" component={Gallery} />
        <Route path="/" component={Error} />
      </Switch>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Suspense>
  )
}

export default App;
