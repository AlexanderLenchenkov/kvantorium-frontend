import React from 'react';
import { useParams } from 'react-router-dom';

import axios, { mainURL } from '../axios';
import { Project } from '../redux/project/types';

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
		return <div>download...</div>;
	}

	return isLoading ? (
		<div>download...</div>
	) : (
		<div className="my-7 mx-auto text-gray-800 rounded-lg max-w-6xl px-4">
			<div className="bg-white rounded-lg">
				{data.imageUrl ? (
					<img
						className="w-full h-[700px] rounded-t-lg object-cover"
						src={`${mainURL}${data.imageUrl}`}
						alt="Preview"
					/>
				) : null}
				<div className="p-10">
					<h1 className="text-8xl font-black">{data.name}</h1>
					<div className="mt-5">{data.category.name}</div>
					<div className="mt-5 flex justify-between">
						<ul className="flex gap-4">
							{data.tags.map((tag, index) => (
								<li className="text-gray-500 font-semibold text-xl" key={index}>{`#${tag}`}</li>
							))}
						</ul>
						<div className="flex text-gray-500 gap-2 text-xl">
							<div className="font-semibold italic">Даты:</div>
							{/* <div className="font-bold">{`${data.dateStart.getUTCDate()} - ${data.dateEnd.getUTCDate()}`}</div> */}
						</div>
					</div>
					<div className="flex gap-4 mt-5">
						<h3 className="text-gray-700 italic font-semibold text-2xl">Руководитель проекта: </h3>
						<span className="block text-gray-700 font-bold text-2xl">{`${data.teacher.lastName} ${data.teacher.firstName}`}</span>
					</div>
					<div className="flex gap-4 mt-2">
						<h3 className="text-gray-700 italic font-semibold text-2xl">Участники проекта:</h3>
						<ul className="flex gap-3">
							{data.students.map((obj) => (
								<li
									className="block text-gray-700 font-bold text-2xl"
									key={obj._id}>{`${obj.lastName} ${obj.firstName}`}</li>
							))}
						</ul>
					</div>
					{/* <ReactMarkdown
					className="text-xl leading-9 text-gray-700 mt-7"
					children={data.description}
				/> */}
					<ul className="flex gap-4 text-gray-400 font-semibold font mt-7">
						<li className="flex gap-1 items-center justify-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2}
								stroke="currentColor"
								className="w-6 h-6">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
							<span>{data.viewsCount}</span>
						</li>
						<li className="flex gap-1 items-center justify-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2.3}
								stroke="currentColor"
								className="w-5 h-5">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
								/>
							</svg>
							<span>{3}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default FullProject;
