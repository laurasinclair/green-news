import * as React from 'react';
import { useState, useEffect } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import { Button, Hero, Section, UploadImage, Loading } from 'components';
import { useUserContext } from 'context';
import SavedArticle from '../../components/articles/SavedArticle';
import { Article } from 'src/types';
import { useNavigate } from 'react-router-dom';
import { paths } from 'router/paths';

export default function UserPage() {
	const { currentUser, handleLogOut } = useUserContext();
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		if (!currentUser.isLoggedIn) {
			navigate(paths.base);
		}
	});

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault();
		handleLogOut();
		navigate(paths.base);
	};

	// just updating the page title to the user name
	useEffect(() => {
		if (currentUser && currentUser._id) {
			setLoading(false);
			document.title = `${window.name} | ${currentUser.userInfo.firstName} ${currentUser?.userInfo.lastName} ⛭ User settings`;
		}
	}, [currentUser, setLoading]);

	return (
		<>
			<Row>
				{loading ? (
					<Loading />
				) : (
					currentUser &&
					currentUser._id && (
						<>
							<Container fluid>
								<Hero
									title={`Hello, ${currentUser?.userInfo.firstName} ${currentUser?.userInfo.lastName}!`}
									leadText='Happy to see you here! 🌿'
									size='m'
								/>
							</Container>

							<Section>
								<Container fluid>
									<Row>
										<Col sm='3'>
											<h3>Personal info</h3>
										</Col>
										<Col>
											<div className='bg-01'>
												<Row>
													<Col>
														<div>
															<h4>Username</h4>
															<p className='inputfield'>
																{currentUser?.userInfo.username}
															</p>
														</div>
													</Col>
												</Row>
												<Row>
													<Col sm='6'>
														<div>
															<h4>First name</h4>
															<p className='inputfield'>
																{
																	currentUser?.userInfo
																		.firstName
																}
															</p>
														</div>
													</Col>
													<Col sm='6'>
														<div>
															<h4>Last name</h4>
															<p className='inputfield'>
																{currentUser?.userInfo.lastName}
															</p>
														</div>
													</Col>
												</Row>

												<div>
													<h4>Profile picture</h4>
													<UploadImage imageSize={100} />
												</div>
											</div>
										</Col>
									</Row>
								</Container>
							</Section>

							<Section>
								<Container fluid>
									<h2>Saved articles</h2>
									<p>
										{currentUser.isLoggedIn && (
											<strong>
												{currentUser.userInfo.savedArticles.length}{' '}
												article
												{currentUser.userInfo.savedArticles.length >
												1
													? 's'
													: ''}{' '}
												saved
												{currentUser.userInfo.savedArticles.length <
													1 && ' :('}
											</strong>
										)}
									</p>

									<Row className='gx-3 gx-md-4'>
										{currentUser.userInfo.savedArticles &&
										currentUser.userInfo.savedArticles.length > 0 ? (
											currentUser.userInfo.savedArticles.map(
												(article: Article, i: number) => {
													return (
														<Col
															sm={6}
															md={4}
															lg={3}
															key={i}
															className='mb-4'>
															<SavedArticle
																articleTitle={
																	article.articleTitle
																}
															/>
														</Col>
													);
												}
											)
										) : (
											<Col className='mb-4'>
												<p>
													We can&apos;t access your saved articles
													now :(
												</p>
											</Col>
										)}
									</Row>
								</Container>
							</Section>
							<Section>
								<Container fluid>
									<Row>
										<Col>
											<Button
												label='Log out'
												type='primary-outline'
												fullWidth
												onClick={handleClick}
											/>
										</Col>
									</Row>
								</Container>
							</Section>
						</>
					)
				)}
			</Row>
		</>
	);
}
