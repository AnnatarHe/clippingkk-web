import React from 'react'
import { hot } from 'react-hot-loader/root'
import { Router } from '@reach/router'
import styles from './Root.css'

import PageLoading from './components/loading/loading'

const IndexPage = React.lazy(() => import('./pages/index/index'))
const PrivacyPolicy = React.lazy(() => import('./pages/policy/privacy'))
const DashContainer = React.lazy(() => import('./components/dashboard-container/container'))
const ReleasePage = React.lazy(() => import('./pages/release/release'))
const AuthPage = React.lazy(() => import('./pages/auth/auth'))
const HomePage = React.lazy(() => import('./pages/home/home'))
const UploaderPage = React.lazy(() => import('./pages/uploader/uploader'))
const ClippingPage = React.lazy(() => import('./pages/clipping/clipping'))
const SquarePage = React.lazy(() => import('./pages/square/square'))

@hot
class Root extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <React.Suspense fallback={<PageLoading />}>
          <Router>
            <IndexPage path="/" />
            <PrivacyPolicy path="/policy/privacy" />
            <ReleasePage path="/release/:platform" />
            <AuthPage path="/auth" />
            <DashContainer path="dash/:userid">
              <HomePage path="home" />
              <UploaderPage path="upload" />
              <SquarePage path="square" />
              <ClippingPage path="/clippings/:clippingid" />
            </DashContainer>
          </Router>
        </React.Suspense>
      </div>
    )
  }
}

export default Root
