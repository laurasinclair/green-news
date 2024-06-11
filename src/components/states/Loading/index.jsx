import React from 'react'
import classNames from 'classnames'

import styles from './index.module.sass';
import loader from '@img/loader.svg'

function Loading() {
  return (
    <div className={styles.loading}>
      <img src={loader} alt="Loading..." className={classNames(styles.loading_image, 'mb-3')} />
    </div>
  )
}

export default Loading