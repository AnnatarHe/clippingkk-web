import React from 'react'
import { hot } from 'react-hot-loader/root'
import styles from './Root.css'

import PageLoading from './components/loading/loading'
import RouterContainer from './components/router-container/router';

const IndexPage = React.lazy(() => import('./pages/index/index'))
const PrivacyPolicy = React.lazy(() => import('./pages/policy/privacy'))
const DashContainer = React.lazy(() => import('./components/dashboard-container/container'))
const ReleasePage = React.lazy(() => import('./pages/release/release'))
const AuthPage = React.lazy(() => import('./pages/auth/auth'))
const SignupPage = React.lazy(() => import('./pages/auth/signup'))
const SigninPage = React.lazy(() => import('./pages/auth/signin'))
const HomePage = React.lazy(() => import('./pages/home/home'))
const UploaderPage = React.lazy(() => import('./pages/uploader/uploader'))
const ClippingPage = React.lazy(() => import('./pages/clipping/clipping'))
const SquarePage = React.lazy(() => import('./pages/square/square'))
const BookPage = React.lazy(() => import('./pages/book/book'))
const GithubOAuthPage = React.lazy(() => import('./pages/auth/github'))
const ProfilePage = React.lazy(() => import('./pages/profile/profile'))

@hot
class Root extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <React.Suspense fallback={<PageLoading />}>
          <RouterContainer>
            <IndexPage path="/" />
            <PrivacyPolicy path="/policy/privacy" />
            <ReleasePage path="/release/:platform" />
            <AuthPage path="/auth">
              <SigninPage path="signin" />
              <SignupPage path="signup" />
            </AuthPage>
            <GithubOAuthPage path="/oauth/github" />
            <DashContainer path="dash/:userid">
              <HomePage path="home" />
              <UploaderPage path="upload" />
              <SquarePage path="square" />
              <ClippingPage path="/clippings/:clippingid" />
              <BookPage path="book/:bookid" />
              <ProfilePage path="profile" />
            </DashContainer>
          </RouterContainer>
        </React.Suspense>
      </div>
    )
  }
}

export default Root
