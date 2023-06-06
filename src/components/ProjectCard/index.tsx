import React from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { Project } from '../../redux/project/types';
import { fetchRemoveProject } from '../../redux/project/asyncActions';
import { useAppDispatch } from '../../redux/store';
import { mainURL } from '../../axios';
import { Button, Card, Typography } from '@material-tailwind/react';
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline';

type ProjectCardProps = {
	project: Project;
	isEditable: boolean;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isEditable }) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { _id, name, imageUrl, description } = project;

	const onClickEdit = () => {
		navigate(`/projects/${_id}/edit`);
	};

	const onClickRemove = () => {
		if (window.confirm('Вы действительно хотите удалить проект?')) {
			dispatch(fetchRemoveProject(_id));
		}
	};

	return (
		<Card
			shadow={false}
			className="flex flex-col gap-y-2 border-2 border-transparent rounded-md bg-white  relative hover:shadow-lg  hover:border-blue-500 transition-all ease-in-out duration-500 p-3">
			<div className="flex flex-col gap-y-2">
				<Link to={`/projects/${_id}`}>
					<Typography className="hover:text-blue-500" variant="h3" color="gray">
						{name}
					</Typography>
				</Link>
			</div>

			{imageUrl && (
				<img
					className="max-h-[180px] sm:max-h-[250px] md:max-h-[300px] lg:max-h-[400px] xl:max-h-[450px] screen- min-w-full object-cover rounded-sm"
					src={`${mainURL}${imageUrl}`}
					alt="preview"
				/>
			)}

			<Typography>{description}</Typography>

			{isEditable && (
				<div className="flex justify-end gap-2">
					<Button
						onClick={onClickEdit}
						className="flex items-center gap-1 rounded-md shadow-none"
						color="blue"
						variant="gradient"
						size="md">
						<PencilSquareIcon strokeWidth={2} className="w-4 h-4" />
						Редактировать
					</Button>

					<Button
						onClick={onClickRemove}
						className="flex items-center gap-1 rounded-md shadow-none"
						variant="gradient"
						color="red"
						size="md">
						<XCircleIcon strokeWidth={2} className="w-4 h-4" />
						Удалить
					</Button>
				</div>
			)}
		</Card>
	);
};

export default ProjectCard;
