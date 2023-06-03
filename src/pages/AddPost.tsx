/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
// import SimpleMDE from 'react-simplemde-editor';
// import 'easymde/dist/easymde.min.css';
import axios from '../axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { useAppDispatch } from '../redux/store';
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
import { Button, Card, Input, Typography } from '@material-tailwind/react';
import { InformationCircleIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
// import { Editor } from '@tinymce/tinymce-react';

interface ProjectFields {
	name: string;
	description: string;
	tags: string;
	category: string;
	dateStart?: Date;
	dateEnd?: Date;
	teacher: string;
	students: string[];
	imageUrl: File;
	projectUrl: File[];
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
		getValues,
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
				setValue('category', data.category._id);
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

	// const files = React.useState<File>();

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

	// const editorRef = React.useRef(null);
	// const log = () => {
	// 	if (editorRef.current) {
	// 		console.log(editorRef.current.getContent());
	// 	}
	// };

	// if (!window.localStorage.getItem('token') && !isAuth) {
	// 	return <Navigate to="/" />;
	// }

	return (
		<div className="container  mx-auto ">
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					{...register('imageUrl', {
						required: {
							value: true,
							message: 'pfuhepb afqk',
						},
					})}
					type="file"
				/>
				<img src={getValues('imageUrl').webkitRelativePath} alt="" />
				{errors.imageUrl && <div>{errors.imageUrl.message}</div>}
				<button>send</button>
			</form>

			<Card className="p-5 my-7 rounded-xl" shadow={false}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-col gap-5">
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
										{value.map((f, index) => (
											<span key={index}>f.name</span>
										))}
										{/* {value} */}
									</div>
								</>
							)}
						/>
						<div>
							<Input
								variant="static"
								size="lg"
								error={!!errors.name}
								labelProps={{ className: 'text-2xl text font-bold' }}
								{...register('name', {
									required: {
										value: true,
										message: 'Заполните наименование!',
									},
								})}
								placeholder="Наименование проекта..."
							/>
							{errors.name && (
								<Typography
									variant="small"
									color="red"
									className="flex items-center gap-1 font-normal mt-1">
									<InformationCircleIcon className="w-4 h-4 -mt-px" />
									{errors.name.message}
								</Typography>
							)}
						</div>
						<div>
							<Input
								variant="static"
								{...register('tags', {
									required: {
										value: true,
										message: 'Заполните теги!',
									},
								})}
								placeholder="Теги..."
								label="Теги"></Input>
							{errors.tags && (
								<Typography
									variant="small"
									color="red"
									className="flex items-center gap-1 font-normal mt-1">
									<InformationCircleIcon className="w-4 h-4 -mt-px" />
									{errors.tags.message}
								</Typography>
							)}
						</div>

						<div>
							<Typography variant="small" className={clsx('text-gray-600 mb-1')}>
								Квантум
							</Typography>
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
										aria-label="fsdf"
										placeholder="Выберите квантум..."
										options={categoryOptions}
										value={getCategoryValue(value)}
										onChange={(newValue) => onChange((newValue as Option).value)}
									/>
								)}
							/>
							{errors.category && (
								<Typography
									variant="small"
									color="red"
									className="flex items-center gap-1 font-normal mt-1">
									<InformationCircleIcon className="w-4 h-4 -mt-px" />
									{errors.category.message}
								</Typography>
							)}
						</div>
						<div>
							<Typography variant="small" className={clsx('text-gray-600 mb-1')}>
								Руководитель
							</Typography>
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
							{errors.category && (
								<Typography
									variant="small"
									color="red"
									className="flex items-center gap-1 font-normal mt-1">
									<InformationCircleIcon className="w-4 h-4 -mt-px" />
									{errors.category.message}
								</Typography>
							)}
						</div>
						<div>
							<Typography variant="small" className={clsx('text-gray-600 mb-1')}>
								Участники
							</Typography>
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
							{errors.category && (
								<Typography
									variant="small"
									color="red"
									className="flex items-center gap-1 font-normal mt-1">
									<InformationCircleIcon className="w-4 h-4 -mt-px" />
									{errors.category.message}
								</Typography>
							)}
						</div>
						<div>
							<Typography variant="small" className={clsx('text-gray-600 mb-1')}>
								Дата начала проекта
							</Typography>
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
						<div>
							<Typography variant="small" className={clsx('text-gray-600 mb-1')}>
								Дата окончания проекта
							</Typography>
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
						{/* <div className="border border-gray-300">
							<Editor
								onInit={(evt, editor) => (editorRef.current = editor)}
								initialValue="<p>This is the initial content of the editor.</p>"
								init={{
									height: 500,
									menubar: true,
									plugins: [
										'advlist autolink lists link image charmap print preview anchor',
										'searchreplace visualblocks code fullscreen',
										'insertdatetime media table paste code help wordcount',
									],
									toolbar:
										'undo redo | formatselect | ' +
										'bold italic backcolor | alignleft aligncenter ' +
										'alignright alignjustify | bullist numlist outdent indent | ' +
										'removeformat | help',
									content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
								}}
							/>
							<Button onClick={log}>Log</Button>
						</div> */}
						<div className="mt-5 flex items-center justify-end gap-2">
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
			</Card>
		</div>
	);
};

export default AddPost;
