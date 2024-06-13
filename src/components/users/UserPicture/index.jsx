import placeholder from '@img/placeholder_1-1.jpg'
import classnames from 'classnames'
import styles from './index.module.sass';

export default function UserPicture ({src, alt, size = '100px', className}) {
    return (
		<div className={classnames(styles.userPicture, className)} style={{width: size, height: size}}>
			<img src={src || placeholder} alt={alt} />
		</div>
	)
}