import React from 'react';
import { useAppDispatch } from '../redux/store';
import { fetchCategories } from '../redux/category/asyncActions';
import { useSelector } from 'react-redux';
import { selectCategories } from '../redux/category/selectors';
import { Status } from '../redux/types';
import { setCategoryId, setName } from '../redux/filter/slice';
import { Card, Input, Spinner, Typography } from '@material-tailwind/react';
import Select from 'react-select';
import debounce from 'lodash.debounce';

interface Option {
	value: string;
	label: string;
}

const FilterBlock: React.FC = () => {
	const dispatch = useAppDispatch();
	const categories = useSelector(selectCategories);
	const [search, setSearch] = React.useState('');

	const categoryOptions: Option[] = [{ _id: 'all', name: 'Все' }, ...categories.items].map(
		(item) => ({ value: item._id, label: item.name } as Option),
	);

	const [selectedCategory, setSelectedCategory] = React.useState(categoryOptions[0]);

	React.useEffect(() => {
		dispatch(fetchCategories);
	}, []);

	const onChangeSearch = (value: string) => {
		setSearch(value);
		updateSearchValue(value);
	};

	const updateSearchValue = React.useCallback(
		debounce((str: string) => {
			dispatch(setName(str));
		}, 500),
		[],
	);

	const onChangeCategory = (value: string) => {
		console.log(value);
		dispatch(setCategoryId(value));
		const newValue = categoryOptions.find((option) => option.value === value);
		return setSelectedCategory(newValue ? newValue : categoryOptions[0]);
	};

	return (
		<Card
			className="flex gap-y-3 w-full lg:mb-0 lg:sticky lg:top-3 lg:w-1/4 p-3 pt-6 rounded-md"
			shadow={false}>
			<Input
				value={search}
				onChange={(e) => onChangeSearch(e.target.value)}
				variant="static"
				label="Поиск"
				placeholder="Поиск"
			/>

			{categories.status === Status.LOADING ? (
				<Spinner className="m-auto w-10 h-10 my-5" />
			) : (
				<div>
					<Typography className="text-sm mb-1 text-gray-600">Квантум</Typography>
					<Select
						placeholder="Выберите категорию"
						options={categoryOptions}
						value={selectedCategory}
						onChange={(newValue) => onChangeCategory((newValue as Option).value)}
					/>
				</div>
			)}
		</Card>
	);
};

export default FilterBlock;
