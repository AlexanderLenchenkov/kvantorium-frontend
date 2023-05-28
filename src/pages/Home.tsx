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

const Home: React.FC = () => {
	const dispatch = useAppDispatch();
	const projects = useSelector(selectProjects);
	const categories = useSelector(selectCategories);

	const isAuth = useSelector(selectIsAuth);
	const [searchInput, setSearchInput] = React.useState('');
	const [filterKvantum, setfilterKvantum] = React.useState(true);

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
			<div className="w-full mb-3 lg:mb-0 lg:sticky lg:top-3 lg:w-1/4 shadow-sm bg-white border border-gray-200 p-4 rounded-xl">
				<div className="mb-3">
					<h5 className="font-bold text-lg uppercase text-gray-700 mb-2">Поиск:</h5>
					<input
						value={searchInput}
						onChange={(e) => setSearchInput(e.target.value)}
						type="text"
						placeholder="проект..."
						className="block w-full outline-none hover:border-gray-400 focus:border-gray-500 text-md rounded-md py-1 px-2 px border border-gray-300 text-gray-900"
					/>
				</div>

				<div>
					<h5>
						<button
							onClick={() => setfilterKvantum((prev) => !prev)}
							className="flex justify-between uppercase items-center w-full cursor-pointer font-bold text-lg text-gray-700 transition-all ease-in-out">
							Тип квантума
							<span className={clsx(filterKvantum && 'rotate-180')}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-5 h-5">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M19.5 8.25l-7.5 7.5-7.5-7.5"
									/>
								</svg>
							</span>
						</button>
					</h5>
					<div
						className={
							filterKvantum
								? 'h-auto overflow-hidden transition-all duration-300 ease-in-out'
								: 'h-0 overflow-hidden transition-all duration-300 ease-in-out'
						}>
						<Categories items={categories.items} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
