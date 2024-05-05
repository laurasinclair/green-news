import { Container, Row, Col } from 'react-bootstrap';
import { Logo } from '@components';
import styles from './styles/Hero.module.sass';
import classNames from 'classnames';

export default function Hero({ size = 'm', title, h3, leadText, hasLogo, className }) {
    // Define the size classes
    const sizeClasses = {
        s: styles['hero-small'],
        m: styles['hero-medium'],
        l: styles['hero-large'],
    };

    // Get the appropriate hero size class
    const heroSizeClass = sizeClasses[size] || sizeClasses.m;

    return (
        <div className={classNames('hero', styles.hero, heroSizeClass, className)}>
            <Container fluid className={styles.test}>
                <Row>
                    <Col sm={9} lg={8}>
                        {h3 && <h3 className={styles['mb-3']}>{h3}</h3>}
                        {hasLogo && <Logo size='s' hasText />}
                        <h1 className={styles['mt-2']}>{title}</h1>
                        {leadText && <p>{leadText}</p>}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}