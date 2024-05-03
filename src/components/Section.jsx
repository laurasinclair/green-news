import classNames from 'classnames';
import styles from './styles/Section.module.sass'

export default function Section({children, size = 's'}) {
	const sizeClasses = {
        xs: styles['section-extrasmall'],
        s: styles['section-small'],
        m: styles['section-medium'],
        l: styles['section-large'],
    };

    const sectionSizeClass = sizeClasses[size] || sizeClasses.m;

    const sectionContainerClass = classNames(styles.section, sectionSizeClass);

	return (
        <section className={sectionContainerClass}>
			{children}
		</section>
	)
}
