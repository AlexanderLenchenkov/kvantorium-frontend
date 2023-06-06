import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = () => {
	return (
		<ContentLoader
			speed={2}
			width={790}
			height={544}
			viewBox="0 0 790 544"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb">
			<rect x="0" y="6" rx="0" ry="0" width="6" height="530" />
			<rect x="784" y="6" rx="0" ry="0" width="6" height="530" />
			<rect x="0" y="536" rx="0" ry="0" width="790" height="6" />
			<rect x="16" y="16" rx="2" ry="2" width="400" height="30" />
			<rect x="16" y="56" rx="4" ry="4" width="758" height="400" />
			<rect x="0" y="0" rx="0" ry="0" width="790" height="6" />
			<rect x="16" y="466" rx="2" ry="2" width="758" height="60" />
		</ContentLoader>
	);
};

export default Skeleton;
