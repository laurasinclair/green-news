import { Link } from 'react-router-dom';
import styles from './styles/Button.module.sass';
import classNames from 'classnames';

export default function Button({ link, text, type = 'primary', fullWidth = false, iconRight, iconLeft, onClick }) {
    const typeStyles = {
        primary: styles['btn-primary'],
        secondary: styles['btn-secondary'],
        'primary-outline': styles['btn-primary-outline'],
        'secondary-outline': styles['btn-secondary-outline'],
    };

    const buttonTypeClass = typeStyles[type] || typeStyles.primary;

    const buttonClasses = classNames(
        buttonTypeClass,
        { [styles['full-width']]: fullWidth },
        { [styles['icon-left']]: iconLeft },
        { [styles['icon-right']]: iconRight }
    );

    return (
        <Link to={link} className={buttonClasses} onClick={onClick}>
            {iconLeft}
            {text}
            {iconRight}
        </Link>
    );
}
