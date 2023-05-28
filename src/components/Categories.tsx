import React from 'react';
import { Category } from '../redux/category/types';
import { mainURL } from '../axios';

type CategoriesProps = {
	items: Category[];
};

const Categories: React.FC<CategoriesProps> = ({ items }) => {
	return (
		<ul className="mt-2">
			{items.map((obj) => (
				<li
					key={obj._id}
					className="hover:bg-gray-200 px-2  text-gray-600 hover:text-blue-500 rounded-md py-4 cursor-pointer transition-all duration-300">
					<div className="flex items-center ">
						<img className="w-6 h-6 mr-3" src={`${mainURL}${obj.imageUrl}`} alt="kvantum" />
						{obj.name}
					</div>
				</li>
			))}
		</ul>
	);
};

export default Categories;
