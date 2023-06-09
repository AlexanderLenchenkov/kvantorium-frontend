import React from 'react';
import { Link, useParams } from 'react-router-dom';

import axios, { mainURL } from '../axios';
import { Project } from '../redux/project/types';
import { Button, Card, Spinner, Typography } from '@material-tailwind/react';
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
				if (data?.name) {
					document.title = data.name;
				}
			})
			.catch((err) => {
				console.warn(err);
				alert('Ошибка при получении статьи');
			});
		setIsLoading(false);
	}, []);

	if (!data) {
		return <Spinner />;
	}

	return isLoading ? (
		<Spinner />
	) : (
		<div className="container max-w-6xl my-5 mx-auto">
			<Card className="flex bg-white flex-col text-gray-800 rounded-lg">
				<div className="project-top p-4 flex flex-col gap-4">
					<Typography
						variant="h1"
						className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black">
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
							className="w-full xl:h-[600px] object-cover"
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

						{data.projectUrl && (
							<a className="my-4" href={`${mainURL}${data.projectUrl}`} target="_blank" download>
								<Button color="green" fullWidth>
									Скачать проект
								</Button>
							</a>
						)}

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
