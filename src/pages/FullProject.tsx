import React from 'react';
import { Link, useParams } from 'react-router-dom';

import axios, { mainURL } from '../axios';
import { Project } from '../redux/project/types';
import { Card, Spinner, Typography } from '@material-tailwind/react';
import { EyeIcon } from '@heroicons/react/24/outline';

const FullProject: React.FC = () => {
	const [data, setData] = React.useState<Project | null>(null);
	const [isLoading, setIsLoading] = React.useState(true);
	const { id } = useParams();

	React.useEffect(() => {
		setIsLoading(true);
		axios
			.get<Project>(`projects/${id}`)
			.then((res) => {
				setData(res.data);
			})
			.catch((err) => {
				console.warn(err);
				alert('Ошибка при получении статьи');
			});
		setIsLoading(false);
	}, []);

	// const formatDate = (dateStr: string): string => {
	// 	// const formatDate = data
	// 	// 	? new Date(dateStr).toLocaleDateString('ru', {
	// 	// 			year: 'numeric',
	// 	// 			month: 'long',
	// 	// 			day: 'numeric',})
	// 	// 	: '';
	// 	// return formatDate;
	// 	return dateStr;
	// };

	if (!data) {
		return <Spinner />;
	}

	// <ul className="flex gap-4">
	// 							{data.tags.map((tag, index) => (
	// 								<li className="text-gray-500 font-semibold text-xl" key={index}>{`#${tag}`}</li>
	// 							))}
	// 						</ul>

	return isLoading ? (
		<Spinner />
	) : (
		<div className="container max-w-6xl my-5 mx-auto">
			<Card className="flex bg-white flex-col text-gray-800 rounded-lg">
				<div className="project-top p-4 flex flex-col gap-4">
					<Typography variant="h1" className="text-6xl font-black">
						{data.name}
					</Typography>

					<div>
						<Typography className="text-xl text-gray-600">{data.category.name}</Typography>
						{data.dateStart && data.dateEnd ? (
							<Typography className="text-xl text-gray-600 italic">
								Длительность: {new Date(data.dateStart).toLocaleDateString()} -{' '}
								{new Date(data.dateEnd).toLocaleDateString()}
							</Typography>
						) : null}
					</div>
				</div>
				<div className="projct-middle">
					{data.imageUrl ? (
						<img
							className="w-full h-[600px] object-cover"
							src={`${mainURL}${data.imageUrl}`}
							alt="Preview"
						/>
					) : null}
				</div>
				<div className="project-bottom p-4 flex flex-col gap-4">
					<Typography variant="paragraph" className="text-xl">
						{data.description}
					</Typography>

					<div className="flex flex-col gap-1">
						<div>
							<Typography className="text-md font-bold text-gray-600">
								Руководитель: {data.teacher.lastName} {data.teacher.firstName}
							</Typography>
							<Typography className="text-md font-bold text-gray-600">
								Участники:{' '}
								{data.students
									.reduce((res, student) => `${res} ${student.lastName} ${student.firstName},`, '')
									.slice(1, -1)}
							</Typography>
						</div>
						<div className="flex flex-wrap gap-2">
							{data.tags.map((tag) => (
								<Link to="/">
									<Typography className="text-gray-500 font-bold text-md hover:text-gray-600">
										#{tag}
									</Typography>
								</Link>
							))}
						</div>

						<Typography className="text-gray-400 font-bold flex gap-1 items-center">
							<EyeIcon strokeWidth={2} className="w-6 h-6" />
							{data.viewsCount}
						</Typography>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default FullProject;
