import React from 'react';
import { useSelector } from 'react-redux';
import { fetchProjects } from '../redux/project/asyncActions';
import { fetchCategories } from '../redux/category/asyncActions';
import { selectIsAuth } from '../redux/auth/selectors';
import { selectProjects } from '../redux/project/selectors';
import { Status } from '../redux/types';
import ProjectCard from '../components/ProjectCard';
import { useAppDispatch } from '../redux/store';
import FilterBlock from '../components/FilterBlock';
import { selectFilter } from '../redux/filter/selectors';
import { Link } from 'react-router-dom';
import { logout } from '../redux/auth/slice';

const Home: React.FC = () => {
	const dispatch = useAppDispatch();
	const { name, categoryId } = useSelector(selectFilter);
	const projects = useSelector(selectProjects);

	const isAuth = useSelector(selectIsAuth) || !!localStorage.getItem('token');

	const getProjects = async () => {
		const search: string = name ? `name=${name}` : '';
		const category: string = categoryId !== 'all' ? `category=${categoryId}` : '';
		dispatch(
			fetchProjects({
				name: search,
				category,
			}),
		);
	};

	const onClickLogout = () => {
		if (window.confirm('Вы действительно хотите выйти?')) {
			dispatch(logout());
			window.localStorage.removeItem('token');
		}
	};

	React.useEffect(() => {
		dispatch(fetchCategories()).then(() => getProjects());
	}, []);

	React.useEffect(() => {
		getProjects();
	}, [name, categoryId]);

	const items =
		projects.status === Status.SUCCESS
			? projects.items.map((obj) => <ProjectCard key={obj._id} project={obj} isEditable={isAuth} />)
			: null;
	const skeleton = projects.status === 'loading' ? <div>Загрузка...</div> : null;
	const errorMessage = projects.status === 'error' ? <div>Ошибка загрузки данных</div> : null;

	return (
		<div className="container mx-auto  my-7">
			{isAuth && (
				<div className="flex justify-between gap-3 w-full mb-3 shadow-sm bg-white border border-gray-200 p-4 rounded-xl">
					<div className="flex gap-x-2">
						<Link
							to="/add-project"
							className="block rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
							Добавить проект
						</Link>
					</div>
					<div className="flex gap-x-2">
						<button
							onClick={onClickLogout}
							className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
							Выйти
						</button>
					</div>
				</div>
			)}
			<div className="flex items-start relative flex-col-reverse lg:flex-row gap-x-4">
				<div className="w-full lg:w-3/4 space-y-4">
					{items}
					{skeleton}
					{errorMessage}
				</div>
				<FilterBlock className="flex flex-col gap-3 w-full mb-3 lg:mb-0 lg:sticky lg:top-3 lg:w-1/4 shadow-sm bg-white border border-gray-200 p-4 rounded-xl" />
			</div>
		</div>
	);
};

export default Home;
