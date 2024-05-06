import { BoxArrowUpRight } from 'react-bootstrap-icons'
import { Container, Row, Col } from 'react-bootstrap'
import styles from './styles/Footer.module.sass'

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<Container fluid>
				<Row className="justify-content-between">
					<Col>
						<p>
							Made with 🖤 (and a lot of coffee) by Laura.
							Have a look at my{' '}
							<a href="#" className="wavy" target="_blank" rel="noreferrer">
								GitHub <BoxArrowUpRight size="15" />
							</a>
							!
						</p>
					</Col>
					<Col sm="2" className="d-flex justify-content-end">
						<p>
							<a href="https://www.linkedin.com/in/laurasnclr/" target="_blank" rel="noreferrer" className="ms-sm-3">
								<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none">
									<path d="M22.476 0H7.524C3.38 0 0 3.38 0 7.524V22.5C0 26.62 3.38 30 7.524 30H22.5c4.143 0 7.524-3.38 7.524-7.524V7.524C30 3.38 26.62 0 22.476 0zM10 24.286H5.714v-12.38H10v12.38zM7.833 10c-1.214 0-2.2-.976-2.2-2.2s.976-2.2 2.2-2.2 2.2.976 2.2 2.2c-.024 1.214-1 2.2-2.2 2.2h0zM24.3 24.286h-3.595v-6c0-1.452-.19-3.31-2.167-3.31-2.024 0-2.357 1.57-2.357 3.214v6.095H12.62v-12.38h3.333v1.667h.095c.524-.952 1.738-1.7 3.643-1.7 3.928 0 4.62 2.262 4.62 5.62v6.786z" fill="#2B3B20" />
								</svg>
							</a>

							<a href="https://www.instagram.com/laura.snclr/" target="_blank" rel="noreferrer" className="ms-sm-2">
								<svg xmlns="http://www.w3.org/2000/svg" width="32" height="30" fill="none">
									<path
										fillRule="evenodd"
										d="M9.33.184c-2.567.1-4.78.706-6.564 2.4C.97 4.303.353 6.427.238 8.845c-.072 1.508-.488 12.9.727 15.89.82 2.015 2.437 3.565 4.564 4.355.99.37 2.126.618 3.787.692 13.894.602 19.044.275 21.217-5.046.385-.948.65-2.03.724-3.613.635-13.326-.103-16.213-2.525-18.527C26.81.76 24.553-.488 9.33.184zM9.46 27.1c-1.522-.066-2.347-.308-2.897-.512-1.386-.515-2.427-1.507-2.96-2.824-.926-2.27-.618-13.054-.537-14.798.08-1.71.445-3.27 1.703-4.48C6.313 3 8.328 2.27 22.054 2.862c1.79.077 3.428.423 4.692 1.625 1.56 1.49 2.334 3.432 1.703 16.5-.07 1.452-.323 2.24-.537 2.764-1.412 3.462-4.66 3.943-18.47 3.338h.016zM22.205 7.034c0 .985.837 1.786 1.873 1.786s1.874-.8 1.874-1.786-.84-1.786-1.874-1.786-1.873.8-1.873 1.786h0zM7.735 14.98c0 4.222 3.588 7.645 8.014 7.645s8.014-3.42 8.014-7.645-3.588-7.644-8.014-7.644-8.014 3.434-8.014 7.644h0zm2.812 0c0-2.74 2.327-4.962 5.2-4.962s5.2 2.223 5.2 4.962-2.327 4.964-5.2 4.964-5.2-2.223-5.2-4.964"
										fill="#2B3B20"
									/>
								</svg>
							</a>
						</p>
					</Col>
				</Row>
			</Container>
		</footer>
	)
}
