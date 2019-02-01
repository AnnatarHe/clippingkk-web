import React from 'react'
import { Link } from '@reach/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux';
const styles = require('./navigation-bar.css')


const leftMenu = [{
  icon: 'book',
  dest: (id: number) => `/dash/${id}/home`
}, {
  icon: 'book-open',
  dest: (id: number) => `/dash/${id}/home`
}, {
  icon: 'cloud-upload-alt',
  dest: (id: number) => `/dash/${id}/upload`
}, {
  icon: 'user',
  dest: (id: number) => `/dash/${id}/home`
}]


// @ts-ignore
@connect(({ user })=> ({ id: user.profile.id, name: user.profile.name }))
class NavigationBar extends React.PureComponent<any, any> {
  render() {
    return (
      <nav className={styles.navbar}>
        <div className={styles.menu}>
          <img 
            src="https://via.placeholder.com/100/#2196f3e6?Text=clippingkk"
            alt="clippingkk logo"
            className={styles.logo}
          />
          <ul className={styles.menuUl}>
            {leftMenu.map(item => (
              <li className={styles.menuItem}>
                <Link to={item.dest(this.props.dest)}>
                  <FontAwesomeIcon icon={item.icon as any} color="#ffffff" size="2x" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <ul className={styles.settings}>
          <li className={styles.setting}>
              <FontAwesomeIcon icon="cog" color="#ffffff" size="2x" />
          </li>
          <li className={styles.setting}>
              <FontAwesomeIcon icon="sign-out-alt" color="#ffffff" size="2x" />
          </li>
        </ul>
      </nav>
    )
  }
}

export default NavigationBar
