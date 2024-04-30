import { Container, Row, Col } from 'react-bootstrap';
import Logo from './Logo';
import styles from './styles/Hero.module.sass';
import classNames from 'classnames';

export default function Hero({ size = 'm', title, h3, leadText, hasLogo }) {
    // Define the size classes
    const sizeClasses = {
        s: styles['hero-small'],
        m: styles['hero-medium'],
        l: styles['hero-large'],
    };

    // Get the appropriate hero size class
    const heroSizeClass = sizeClasses[size] || sizeClasses.m;

    // Create the hero's container class
    const heroContainerClass = classNames(styles.hero, heroSizeClass);

    return (
        <div className={heroContainerClass}>
            <Container fluid>
                <Row className={styles.row}>
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