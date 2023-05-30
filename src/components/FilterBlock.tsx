import React from 'react';
import Search from './Search';
import Categories from './Categories';
import { useAppDispatch } from '../redux/store';
import { fetchCategories } from '../redux/category/asyncActions';
import { useSelector } from 'react-redux';
import { selectCategories } from '../redux/category/selectors';
import { Status } from '../redux/types';

type FilterBlockProps = {
	className?: string | undefined;
};

const FilterBlock: React.FC<FilterBlockProps> = ({ className }) => {
	const dispatch = useAppDispatch();
	const categories = useSelector(selectCategories);

	React.useEffect(() => {
		dispatch(fetchCategories);
	}, []);

	return (
		<div className={className}>
			<div>
				<h5 className="font-bold text-lg uppercase text-gray-700 mb-2">Поиск:</h5>
				<Search />
			</div>

			{categories.status === Status.LOADING ? (
				<div>Загрузка...</div>
			) : (
				<div>
					<h5 className="font-bold text-lg uppercase text-gray-700 mb-2">Квантум:</h5>
					<Categories items={categories.items} />
				</div>
			)}
		</div>
	);
};

export default FilterBlock;
