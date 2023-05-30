import React from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { fetchProjects } from '../redux/project/asyncActions';
import { fetchCategories } from '../redux/category/asyncActions';
import { selectIsAuth } from '../redux/auth/selectors';
import { selectCategories } from '../redux/category/selectors';
import { selectProjects } from '../redux/project/selectors';
import { Status } from '../redux/types';
import ProjectCard from '../components/ProjectCard';
import Categories from '../components/Categories';
import { useAppDispatch } from '../redux/store';
import FilterBlock from '../components/FilterBlock';

const Home: React.FC = () => {
	const dispatch = useAppDispatch();
	const projects = useSelector(selectProjects);

	const isAuth = useSelector(selectIsAuth);

	React.useEffect(() => {
		dispatch(fetchProjects());
		dispatch(fetchCategories());
	}, []);

	const items =
		projects.status === Status.SUCCESS
			? projects.items.map((obj) => <ProjectCard key={obj._id} project={obj} isEditable={isAuth} />)
			: null;
	const skeleton = projects.status === 'loading' ? <div>Загрузка...</div> : null;
	const errorMessage = projects.status === 'error' ? <div>Ошибка загрузки данных</div> : null;

	return (
		<div className="flex items-start relative flex-col-reverse lg:flex-row my-7 gap-x-4 container mx-auto">
			<div className="w-full lg:w-3/4 space-y-4">
				{items}
				{skeleton}
				{errorMessage}
			</div>
			<FilterBlock className="flex flex-col gap-3 w-full mb-3 lg:mb-0 lg:sticky lg:top-3 lg:w-1/4 shadow-sm bg-white border border-gray-200 p-4 rounded-xl" />
		</div>
	);
};

export default Home;
