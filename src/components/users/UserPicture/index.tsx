import * as React from 'react';

import placeholder from 'images/placeholder_1-1.jpg';
import classnames from 'classnames';
import styles from './index.module.sass';

type Props = {
	src?: string;
	alt: string;
	size?: number;
	className?: string;
};

export default function UserPicture({
	src,
	alt,
	size = 100,
	className,
}: Props) {
	return (
		<div
			className={classnames(styles.userPicture, className)}
			style={{ width: `${size || 100}px`, height: `${size || 100}px` }}>
			<img
				src={src || placeholder}
				alt={alt}
				width={size || 100}
				height={size || 100}
				loading='lazy'
			/>
		</div>
	);
}
