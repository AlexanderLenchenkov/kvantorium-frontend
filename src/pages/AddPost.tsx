import React from 'react';
// import SimpleMDE from 'react-simplemde-editor';
// import 'easymde/dist/easymde.min.css';
import axios from '../axios';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { useAppDispatch } from '../redux/store';
import { selectIsAuth } from '../redux/auth/selectors';
import { selectCategories } from '../redux/category/selectors';
import { selectUsers } from '../redux/user/selectors';
import { Status } from '../redux/types';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { fetchUsers } from '../redux/user/asyncActions';
import { fetchCategories } from '../redux/category/asyncActions';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { Project } from '../redux/project/types';
import Dropzone from 'react-dropzone';
import { Button, Input } from '@material-tailwind/react';

interface ProjectFields {
	name: string;
	description: string;
	tags: string;
	category: string;
	dateStart?: Date;
	dateEnd?: Date;
	teacher: string;
	students: string[];
	imageUrl: string;
	projectUrl: string;
}

interface Option {
	value: string;
	label: string;
}

const AddPost: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		control,
	} = useForm<ProjectFields>({ mode: 'onChange' });

	const onSubmit: SubmitHandler<ProjectFields> = (data) => {
		console.log(data);
	};

	const { id } = useParams();
	const dispatch = useAppDispatch();

	const users = useSelector(selectUsers);
	const categories = useSelector(selectCategories);
	const userOptions: Option[] =
		users.status === Status.SUCCESS
			? users.items.map(
					(user) => ({ value: user._id, label: `${user.lastName} ${user.firstName}` } as Option),
			  )
			: [];

	const categoryOptions: Option[] =
		categories.status === Status.SUCCESS
			? categories.items.map(
					(category) => ({ value: category._id, label: category.name } as Option),
			  )
			: [];

	const isAuth = useSelector(selectIsAuth);
	const inputFileRef = React.useRef(null);

	const isEditing = Boolean(id);

	React.useEffect(() => {
		dispatch(fetchUsers());
		dispatch(fetchCategories());

		const loadData = async () => {
			if (id) {
				const { data } = await axios.get<Project>(`/projects/${id}`);
				console.log('data', data);
				// setImageUrl(data.imageUrl);
				setValue('name', data.name);
				setValue('tags', data.tags.reduce((res, tag) => `${res},${tag}`, '').slice(1, -1));
				setValue('category', data.category);
				setValue('teacher', data.teacher._id);
				setValue(
					'students',
					data.students.map((student) => student._id),
				);
				setValue('dateStart', new Date(data.dateStart));
				setValue('dateEnd', new Date(data.dateEnd));
			}

			// setIsLoading(false);
		};
		loadData();
	}, []);

	// const handleChangeFile = async (event: any) => {
	// 	try {
	// 		const formData = new FormData();
	// 		const file = event.target.files[0];
	// 		formData.append('image', file);
	// 		const { data } = await axios.post('upload', formData);
	// 		setImageUrl(data.url);
	// 	} catch (error) {
	// 		console.warn(error);
	// 		alert('Ошибка при загрузке файла');
	// 	}
	// };
	// const onClickRemoveImage = () => {
	// 	setImageUrl('');
	// };
	// const handleChangeDate = (newValue: any) => {
	// 	setDate(newValue);
	// };

	// const onClickCancel = () => {
	// 	navigate('/');
	// };

	// const onSubmit = async () => {
	// 	try {
	// 		setIsLoading(true);

	// 		const fields = {
	// 			name,
	// 			imageUrl,
	// 			tags: [...tags.trim().split(',')],
	// 			description: description,
	// 			dateStart: new Date(date.startDate),
	// 			dateEnd: new Date(date.endDate),
	// 			category: selectedCategory.value,
	// 			teacher: selectedTeacher.value,
	// 			students: [...selectedStudents.map((obj) => obj.value)],
	// 			projectUrl: imageUrl,
	// 		};

	// 		console.log(id);
	// 		const { data } = isEditing
	// 			? await axios.patch(`/projects/${id}`, fields)
	// 			: await axios.post('/projects', fields);

	// 		const _id = isEditing ? id : data._id;
	// 		navigate(`/projects/${_id}`);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	// const onChangeDescription = React.useCallback((value) => {
	// 	setDescription(value);
	// }, []);

	// const options = React.useMemo(
	// 	() => ({
	// 		spellChecker: false,
	// 		maxHeight: '400px',
	// 		autofocus: true,
	// 		placeholder: 'Введите текст...',
	// 		status: false,
	// 		autosave: {
	// 			enabled: true,
	// 			delay: 1000,
	// 		},
	// 	}),
	// 	[],
	// );

	if (!window.localStorage.getItem('token') && !isAuth) {
		return <Navigate to="/" />;
	}

	const getTeacherValue = (value: string) => {
		return value ? userOptions.find((option) => option.value === value) : '';
	};

	const getCategoryValue = (value: string) => {
		return value ? categoryOptions.find((option) => option.value === value) : '';
	};

	const getStudentsValue = (value: string[]) => {
		console.log(value);
		return value ? userOptions.filter((option) => value.includes(option.value)) : [];
	};

	return (
		<div className="container  mx-auto ">
			<div className=" bg-white p-5 my-7 rounded-xl">
				<form onSubmit={handleSubmit(onSubmit)}>
					<Controller
						control={control}
						name="projectUrl"
						render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
							<>
								<Dropzone onDrop={onChange}>
									{({ getRootProps, getInputProps }) => (
										<div
											className="w-full h-[300px] bg-gray-100 rounded-md flex justify-center items-center"
											{...getRootProps()}>
											<input name="projectUrl" onBlur={onBlur} {...getInputProps()} type="text" />
											<p>Drag 'n' drop files here, or click to select files</p>
										</div>
									)}
								</Dropzone>
								<div>
									{/* {value.map((f, index) => (
										<span key={index}>f.name</span>
									))} */}
									{value}
								</div>
							</>
						)}
					/>
					;
					<div className="mt-3">
						<Input
							variant="static"
							size="lg"
							className="text text-3xl"
							labelProps={{ className: 'text-2xl text font-bold' }}
							{...register('name', {
								required: {
									value: true,
									message: 'Наименование обязательное поле!',
								},
							})}
							placeholder="Наименование проекта..."
						/>
						<input
							{...register('name', {
								required: {
									value: true,
									message: 'Наименование обязательное поле!',
								},
							})}
							placeholder="Наименование проекта..."
							type="text"
							className="block w-full text-2xl sm:text-4xl font-bold border-0 outline-none py-1.5 text-gray-900"
						/>
						{errors.name && (
							<span className="w-full text-center text-red-600">{errors.name.message}</span>
						)}
					</div>
					<div className="mt-2">
						{/* <input
							{...register('tags', {
								required: {
									value: true,
									message: 'Наименование обязательное поле!',
								},
							})}
							placeholder="Тэги..."
							type="text"
							className="block w-full text-xl border-b-2 outline-none hover:border-gray-700 focus:border-blue-500 py-1.5 text-gray-900 "
						/> */}
						<Input
							variant="static"
							{...register('tags', {
								required: {
									value: true,
									message: 'Наименование обязательное поле!',
								},
							})}
							placeholder="aboba"
							label="Теги"></Input>
						{errors.tags && (
							<span className="w-full text-center text-red-600">{errors.tags.message}</span>
						)}
					</div>
					<div className="mt-3">
						<Controller
							control={control}
							name="category"
							rules={{
								required: {
									value: true,
									message: 'Jlkjflkds',
								},
							}}
							render={({ field: { onChange, value } }) => (
								<Select
									placeholder="Выберите квантум..."
									options={categoryOptions}
									value={getCategoryValue(value)}
									onChange={(newValue) => onChange((newValue as Option).value)}
								/>
							)}
						/>
						{errors.category && (
							<span className="w-full text-center text-red-600">{errors.category.message}</span>
						)}
					</div>
					<div className="mt-3">
						<Controller
							control={control}
							name="teacher"
							rules={{
								required: {
									value: true,
									message: 'Jlkjflkds',
								},
							}}
							render={({ field: { onChange, value } }) => (
								<Select
									placeholder="Выберите руководителя..."
									options={userOptions}
									value={getTeacherValue(value)}
									onChange={(newValue) => onChange((newValue as Option).value)}
								/>
							)}
						/>
						{errors.teacher && (
							<span className="w-full text-center text-red-600">{errors.teacher.message}</span>
						)}
					</div>
					<div className="mt-3">
						<Controller
							control={control}
							name="students"
							rules={{
								required: {
									value: true,
									message: 'Jlkjflkds',
								},
							}}
							render={({ field: { onChange, value } }) => (
								<Select
									isMulti={true}
									placeholder="Выберите участников..."
									options={userOptions}
									value={getStudentsValue(value)}
									onChange={(newValue) =>
										onChange((newValue as Option[]).map((option) => option.value))
									}
								/>
							)}
						/>
						{errors.teacher && (
							<span className="w-full text-center text-red-600">{errors.teacher.message}</span>
						)}
					</div>
					<div className="mt-3">
						<Controller
							control={control}
							name="dateStart"
							rules={{
								required: {
									value: true,
									message: 'Jlkjflkds',
								},
							}}
							render={({ field: { onChange, value } }) => (
								<DatePicker
									className="border border-gray-300 rounded-md w-full p-2"
									placeholderText="Дата начала..."
									onChange={(date) => onChange(date)}
									selected={value}
									dateFormat="dd.MM.yyyy"
								/>
							)}
						/>
					</div>
					<div className="mt-3">
						<Controller
							control={control}
							name="dateEnd"
							rules={{
								required: {
									value: true,
									message: 'Jlkjflkds',
								},
							}}
							render={({ field: { onChange, value } }) => (
								<DatePicker
									className="border border-gray-300 rounded-md w-full p-2"
									placeholderText="Дата конца..."
									onChange={(date) => onChange(date)}
									selected={value}
									dateFormat="dd.MM.yyyy"
								/>
							)}
						/>
					</div>
					<div className="styles-buttons">
						<div className="mt-6 flex items-center justify-end gap-x-2">
							<Button variant="text">Отмена</Button>
							<Button type="submit" variant="gradient">
								{isEditing ? 'Сохранить' : 'Опубликовать'}
							</Button>
						</div>
					</div>
				</form>

				{/* <div className=" bg-white p-5 my-7 rounded-xl">
				<button
					onClick={() => inputFileRef.current.click()}
					className="rounded-md mb-4 bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
					Загрузить изображение
				</button>
				<input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
				{imageUrl && (
					<>
						<button
							onClick={onClickRemoveImage}
							className="rounded-md ml-3 bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
							Удалить
						</button>

						<div className="bg-gray-300  rounded-lg">
							<img
								className="h-[40rem] w-full rounded-lg mx-auto object-cover object-center"
								src={`http://localhost:4444${imageUrl}`}
								alt="Uploaded"
							/>
						</div>
					</>
				)}

					<SimpleMDE
					className="mt-4 w-full font-sans text-lg"
					value={description}
					onChange={onChangeDescription}
					options={options}
				/>
				
			</div> */}
			</div>
		</div>
	);
};

export default AddPost;
