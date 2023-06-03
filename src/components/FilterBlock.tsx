import React from 'react';
import Search from './Search';
import Categories from './Categories';
import { useAppDispatch } from '../redux/store';
import { fetchCategories } from '../redux/category/asyncActions';
import { useSelector } from 'react-redux';
import { selectCategories } from '../redux/category/selectors';
import { Status } from '../redux/types';
import { setCategoryId, setName } from '../redux/filter/slice';

type FilterBlockProps = {
	className?: string | undefined;
};

const FilterBlock: React.FC<FilterBlockProps> = ({ className }) => {
	const dispatch = useAppDispatch();
	const categories = useSelector(selectCategories);

	React.useEffect(() => {
		dispatch(fetchCategories);
	}, []);

	const onChangeCategory = React.useCallback((id: string) => {
		dispatch(setCategoryId(id));
	}, []);

	const onChangeSearch = React.useCallback((value: string) => {
		dispatch(setName(value));
	}, []);

	return (
		<div className={className}>
			<div>
				<h5 className="font-bold text-lg uppercase text-gray-700 mb-2">Поиск:</h5>
				<Search onChange={onChangeSearch} />
			</div>

			{categories.status === Status.LOADING ? (
				<div>Загрузка...</div>
			) : (
				<div>
					<h5 className="font-bold text-lg uppercase text-gray-700 mb-2">Квантум:</h5>
					<Categories onChange={onChangeCategory} items={categories.items} />
				</div>
			)}
		</div>
	);
};

export default FilterBlock;
