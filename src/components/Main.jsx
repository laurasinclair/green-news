import classnames from 'classnames';
import styles from './styles/Main.module.sass'

export default function Main({children, className}) {
	return (
        <main className={classnames(styles.main, className)}>
			{children}
		</main>
	)
}