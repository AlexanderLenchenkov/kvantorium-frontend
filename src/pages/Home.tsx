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
import emptyImg from '../assets/empty.png';
import { Button, Spinner, Typography } from '@material-tailwind/react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

const Home: React.FC = () => {
	const dispatch = useAppDispatch();
	const { name, categoryId } = useSelector(selectFilter);
	const projects = useSelector(selectProjects);

	const isAuth = useSelector(selectIsAuth) || !!localStorage.getItem('token');

	const getProjects = async () => {
		const search: string = name ? `name=${name}&` : '';
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
			window.localStorage.removeItem('token');
			dispatch(logout());
		}
	};

	React.useEffect(() => {
		document.title = 'Кванториум';
		dispatch(fetchCategories()).then(() => getProjects());
	}, []);

	React.useEffect(() => {
		getProjects();
	}, [name, categoryId]);

	const items = projects.status === Status.SUCCESS ? projects.items : [];

	const content = !(
		projects.status === Status.LOADING ||
		projects.status === Status.ERROR ||
		!projects.items
	) ? (
		items.length > 0 ? (
			items.map((obj) => <ProjectCard key={obj._id} project={obj} isEditable={isAuth} />)
		) : (
			<div className="m-auto flex flex-col items-center justify-center gap-2">
				<img src={emptyImg} alt="Empty" />
				<Typography variant="h2" color="gray">
					Ничего не найдено
				</Typography>
			</div>
		)
	) : null;
	const spinner =
		projects.status === Status.LOADING ? <Spinner className="h-16 w-16 m-auto" /> : null;
	const errorMessage =
		projects.status === 'error' ? (
			<div className="m-auto flex flex-col  items-center justify-center text-gray-700">
				<ExclamationCircleIcon className="h-24 w-24 " />
				<Typography variant="h3">Ошибка загрузки данных</Typography>
				<Typography className="font-bold text-md" variant="paragraph">
					Повторите попытку позже
				</Typography>
			</div>
		) : null;

	return (
		<div className="flex flex-col container mx-auto my-3 md:my-5">
			{!!localStorage.getItem('token') && isAuth && (
				<div className="flex gap-2 mb-3 sm:self-end">
					<Link to="/add-project">
						<Button variant="gradient">Добавить проект</Button>
					</Link>
					<Button color="red" variant="gradient" onClick={onClickLogout}>
						Выйти
					</Button>
				</div>
			)}

			<Typography color="gray" variant="h2" className="mb-2 sm:mb-4">
				{name ? `Проекты по запросу: "${name}"` : 'Все проекты'}
			</Typography>
			<div className="flex h-full items-start relative flex-col-reverse lg:flex-row gap-4">
				<div className="w-full h-full flex flex-col lg:w-3/4 gap-y-4">
					{content}
					{spinner}
					{errorMessage}
				</div>
				<FilterBlock />
			</div>
		</div>
	);
};

export default Home;
