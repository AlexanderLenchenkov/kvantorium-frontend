import { Typography } from '@material-tailwind/react';
import React from 'react';

const Footer: React.FC = () => {
	return (
		<footer>
			<div className="bg-white py-4">
				<div className="flex items-center justify-center container mx-auto">
					<Typography color="gray">© 2019 Кванториум Фотоника</Typography>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
