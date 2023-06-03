import React from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { Project } from '../../redux/project/types';
import { User } from '../../redux/user/types';
import { fetchRemoveProject } from '../../redux/project/asyncActions';
import { useAppDispatch } from '../../redux/store';
import { mainURL } from '../../axios';

type ProjectCardProps = {
	project: Project;
	isEditable: boolean;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isEditable }) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { _id, name, imageUrl, students, teacher } = project;
	const teacherFullName = `${teacher.lastName} ${teacher.firstName}`;

	const studentsFullName = students
		.map((obj: User) => `${obj.lastName} ${obj.firstName}`)
		.join(', ');

	const onClickEdit = () => {
		navigate(`/projects/${_id}/edit`);
	};
	const onClickRemove = () => {
		if (window.confirm('Вы действительно хотите удалить проект?')) {
			dispatch(fetchRemoveProject(_id));
		}
	};

	return (
		<div className="flex flex-wrap border-2 border-transparent rounded-xl bg-white  relative hover:shadow-lg  hover:border-blue-500 transition-all ease-in-out duration-500 p-5">
			{isEditable && (
				<div className="z-10 flex gap-2 absolute top-7 right-7">
					<span
						onClick={onClickEdit}
						className="bg-white/70 cursor-pointer rounded-lg p-3 hover:bg-white transition-all">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-7 h-7 text-blue-600 hover:text-blue-500 transition-all">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
							/>
						</svg>
					</span>

					<span
						onClick={onClickRemove}
						className="bg-white/70 cursor-pointer rounded-lg p-3 hover:bg-white transition-all">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							className="w-7 h-7 text-red-600 hover:text-red-500 transition-all">
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</span>
				</div>
			)}
			{imageUrl && (
				<img
					className=" max-h-[500px] min-w-full opacity-80 object-cover rounded-md mb-3"
					src={`${mainURL}${imageUrl}`}
					alt="preview"
				/>
			)}
			<div className="flex flex-col justify-between">
				<div>
					<Link to={`/projects/${_id}`}>
						<h3 className="mb-2 inline-block text-gray-700 cursor-pointer hover:text-blue-500 font-bold text-2xl">
							{name}
						</h3>
					</Link>
					{/* <p className="text-gray-500">{description}</p> */}
				</div>
				<div className="flex flex-col mt-2 text-gray-600">
					<div>
						<span className="font-semibold">Руководитель: </span>
						<span>{teacherFullName}</span>
					</div>
					<div>
						<span className="font-semibold">Участники: </span>
						<span>{studentsFullName}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectCard;
