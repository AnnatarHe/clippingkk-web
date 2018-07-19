import React from 'react'
import styles from './Hero.css'

class Hero extends React.PureComponent {
  render() {
    return (
        <div className={styles.hero}>
          <div className={styles.titleField}>
            <h1 className={styles.title}>
              Kindle Viewer
            </h1>
            <h4 className={styles.subTitle}>
              A new Vision to read
            </h4>
            <a href="https://www.microsoft.com/store/apps/9NMPMXC5X2CM" target="_blank" className={styles.downloadBtn}>Download now</a>
          </div>
        </div>
    )
  }
}

export default Hero
