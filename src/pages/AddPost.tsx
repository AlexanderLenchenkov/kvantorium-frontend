/* eslint-disable no-mixed-spaces-and-tabs */
import React, { ChangeEvent } from 'react';
// import SimpleMDE from 'react-simplemde-editor';
// import 'easymde/dist/easymde.min.css';
import axios, { mainURL } from '../axios';
import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
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
import { Project, ProjectFields } from '../redux/project/types';
import { Button, Card, Input, Textarea, Typography } from '@material-tailwind/react';
import { InformationCircleIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { PaperClipIcon } from '@heroicons/react/24/outline';
import { selectIsAuth } from '../redux/auth/selectors';
// import { Editor } from '@tinymce/tinymce-react';

export interface Option {
	value: string;
	label: string;
}

const AddPost: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		setValue,
		control,
	} = useForm<ProjectFields>({ mode: 'onChange' });

	const { id } = useParams();

	const isAuth = useSelector(selectIsAuth);

	const users = useSelector(selectUsers);
	const categories = useSelector(selectCategories);
	const userOptions: Option[] =
		users.status === Status.SUCCESS
			? users.items.map(
					(user) => ({ value: user._id, label: `${user.lastName} ${user.firstName}` } as Option),
			  )
			: [];

	const onSubmit: SubmitHandler<ProjectFields> = async (data) => {
		try {
			const { data: res } = isEditing
				? await axios.patch(`/projects/${id}`, data)
				: await axios.post('/projects', data);
			// const res = await dispatch(fetchAddProject(data));
			const _id = isEditing ? id : res._id;
			navigate(`/projects/${_id}`);
		} catch (err) {
			console.warn('err');
			alert('Ошибка при отправке статьи!');
		}
	};

	const categoryOptions: Option[] =
		categories.status === Status.SUCCESS
			? categories.items.map(
					(category) => ({ value: category._id, label: category.name } as Option),
			  )
			: [];

	const isEditing = Boolean(id);

	React.useEffect(() => {
		document.title = 'Добавление проекта';
		dispatch(fetchUsers());
		dispatch(fetchCategories());

		const loadData = async () => {
			if (id) {
				try {
					const { data } = await axios.get<Project>(`/projects/${id}`);
					console.log('data', data);
					setValue('imageUrl', data.imageUrl);
					setValue('projectUrl', data.projectUrl);
					setValue('name', data.name);
					setValue('description', data.description);
					setValue('tags', data.tags.reduce((res, tag) => `${res},${tag}`, '').slice(1, -1));
					setValue('category', data.category._id);
					setValue('teacher', data.teacher._id);
					setValue(
						'students',
						data.students.map((student) => student._id),
					);
					setValue('dateStart', new Date(data.dateStart));
					setValue('dateEnd', new Date(data.dateEnd));
				} catch (err) {
					console.warn(err);
					alert('Ошибка при получении проекта!');
				}
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

	// const handleChangeDate = (newValue: any) => {
	// 	setDate(newValue);
	// };

	const onClickCancel = () => {
		navigate('/');
	};

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

	const handleChangeImage = async (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) {
			alert('Выберите файл!');
			return;
		}

		if (!event.target.files[0].type.includes('image')) {
			alert('Выберите изображение!');
			return;
		}

		if (event.target.files[0].size / 1024 / 1024 > 5) {
			alert('Размер изображения должен быть меньше 5 Мб!');
			return;
		}

		try {
			const formData = new FormData();
			const file = event.target.files[0];
			formData.append('file', file);
			const { data } = await axios.post('/upload', formData);
			// console.log(`${mainURL}${data.url}`);
			console.log(`${mainURL}${data.url}`);
			setValue('imageUrl', data.url);
		} catch (err) {
			console.warn(err);
			alert('Ошибка при загрузке файла!');
		}
	};

	const handleChangeProject = async (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) {
			alert('Выберите файл!');
			return;
		}

		if (event.target.files[0].size / 1024 / 1024 > 30) {
			alert('Размер файла должен быть меньше 30 Мб!');
			return;
		}

		try {
			const formData = new FormData();
			const file = event?.target?.files[0];
			formData.append('file', file);
			const { data } = await axios.post('/upload', formData);
			// console.log(`${mainURL}${data.url}`);
			console.log(`${mainURL}${data.url}`);
			setValue('projectUrl', data.url);
		} catch (err) {
			console.warn(err);
			alert('Ошибка при загрузке файла!');
		}
	};

	const handleRemoveImage = async () => {
		const fields: any = {
			file: getValues('imageUrl'),
		};
		const { data } = await axios.delete('/upload', fields);

		console.log(data);
	};

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

	const inputImageRef = React.createRef<HTMLInputElement>();
	const inputProjectRef = React.createRef<HTMLInputElement>();

	// const onChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	if (!event.target.files) {
	// 		return;
	// 	}
	// 	if (event.target.files[0].type.includes('image')) {
	// 		setValue('image', event.target.files[0]);
	// 	}
	// };

	if (!(localStorage.getItem('token') || isAuth)) {
		return <Navigate to="/" />;
	}
	return (
		<Card className="p-5 my-5 container max-w-5xl mx-auto rounded-xl" shadow={false}>
			<Typography variant="h2" className="text-3xl md:text-4xl md-4 md:mb-5">
				{id ? 'Редактирование проекта' : 'Добавление проекта'}
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col gap-3 md:gap-5">
					<div className="project-image ">
						<Controller
							name="imageUrl"
							control={control}
							render={({ field: { value } }) => (
								<>
									<Typography
										variant="small"
										className={clsx('mb-1', errors.projectUrl ? 'text-red-600' : 'text-gray-600')}>
										Превью проекта
									</Typography>
									<div className="flex flex-col gap-3">
										<div className="flex gap-2">
											<Button size="sm" onClick={() => inputImageRef?.current?.click()}>
												{value ? 'Обновить изображение' : 'Добавить изображение'}
											</Button>
											{value && (
												<Button size="sm" onClick={() => handleRemoveImage()} color="red">
													Удалить
												</Button>
											)}
										</div>
										<input ref={inputImageRef} type="file" onChange={handleChangeImage} hidden />
										{value && (
											<>
												<div className="bg-gray-300  rounded-lg">
													<img
														className="h-[20rem] md:h-[30rem] w-full rounded-lg mx-auto object-cover object-center"
														src={`${mainURL}${value}`}
														alt="Uploaded"
													/>
												</div>
											</>
										)}
									</div>
								</>
							)}
						/>
					</div>
					<div className="project-name">
						<Input
							variant="outlined"
							size="lg"
							label="Наименование"
							error={!!errors.name}
							labelProps={{ className: 'text-2xl text font-bold' }}
							{...register('name', {
								required: {
									value: true,
									message: 'Обязательное поле.',
								},
							})}
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
					<div className="project-description">
						<Textarea
							variant="outlined"
							// size="lg"
							label="Краткое описание"
							error={!!errors.description}
							labelProps={{ className: 'text-2xl text font-bold' }}
							{...register('description', {
								required: {
									value: true,
									message: 'Обязательное поле.',
								},
							})}
						/>
						{errors.description && (
							<Typography
								variant="small"
								color="red"
								className="flex items-center gap-1 font-normal mt-1">
								<InformationCircleIcon className="w-4 h-4 -mt-px" />
								{errors.description.message}
							</Typography>
						)}
					</div>
					<div className="project-tags">
						<Input
							variant="outlined"
							error={!!errors.tags}
							{...register('tags', {
								required: {
									value: true,
									message: 'Обязательное поле.',
								},
							})}
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
					<div className="project-category">
						<Controller
							control={control}
							name="category"
							rules={{
								required: {
									value: true,
									message: 'Обязательное поле.',
								},
							}}
							render={({ field: { onChange, value } }) => (
								<>
									<Typography
										variant="small"
										className={(clsx('mb-1'), errors.category ? 'text-red-600' : 'text-gray-600')}>
										Квантум
									</Typography>
									<Select
										className="outline-red-500"
										isClearable
										placeholder="Выберите квантум"
										options={categoryOptions}
										value={getCategoryValue(value)}
										onChange={(newValue) => onChange((newValue as Option).value)}
									/>
								</>
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
					<div className="project-teacher">
						<Controller
							control={control}
							name="teacher"
							rules={{
								required: {
									value: true,
									message: 'Обязательное поле',
								},
							}}
							render={({ field: { onChange, value } }) => (
								<>
									<Typography
										variant="small"
										className={(clsx('mb-1'), errors.teacher ? 'text-red-600' : 'text-gray-600')}>
										Руководитель
									</Typography>
									<Select
										placeholder="Выберите руководителя"
										options={userOptions}
										value={getTeacherValue(value)}
										onChange={(newValue) => onChange((newValue as Option).value)}
									/>
								</>
							)}
						/>
						{errors.teacher && (
							<Typography
								variant="small"
								color="red"
								className="flex items-center gap-1 font-normal mt-1">
								<InformationCircleIcon className="w-4 h-4 -mt-px" />
								{errors.teacher.message}
							</Typography>
						)}
					</div>
					<div className="project-students">
						<Controller
							control={control}
							name="students"
							rules={{
								required: {
									value: true,
									message: 'Обязательное поле.',
								},
							}}
							render={({ field: { onChange, value } }) => (
								<>
									<Typography
										variant="small"
										className={(clsx('mb-1'), errors.students ? 'text-red-600' : 'text-gray-600')}>
										Участники
									</Typography>
									<Select
										isMulti={true}
										placeholder="Выберите участников..."
										options={userOptions}
										value={getStudentsValue(value)}
										onChange={(newValue) =>
											onChange((newValue as Option[]).map((option) => option.value))
										}
									/>
								</>
							)}
						/>
						{errors.students && (
							<Typography
								variant="small"
								color="red"
								className="flex items-center gap-1 font-normal mt-1">
								<InformationCircleIcon className="w-4 h-4 -mt-px" />
								{errors.students.message}
							</Typography>
						)}
					</div>
					<div className="project-dateStart">
						<Controller
							control={control}
							name="dateStart"
							rules={{
								required: {
									value: false,
									message: 'Обязательное поле.',
								},
							}}
							render={({ field: { onChange, value } }) => (
								<>
									<Typography
										variant="small"
										className={(clsx('mb-1'), errors.dateStart ? 'text-red-600' : 'text-gray-600')}>
										Дата начала проекта
									</Typography>
									<DatePicker
										className="border border-gray-300 rounded-md w-full p-2 outline-blue-600"
										placeholderText="Дата начала"
										onChange={(date) => onChange(date)}
										selected={value}
										dateFormat="dd.MM.yyyy"
									/>
								</>
							)}
						/>
						{errors.dateStart && (
							<Typography
								variant="small"
								color="red"
								className="flex items-center gap-1 font-normal mt-1">
								<InformationCircleIcon className="w-4 h-4 -mt-px" />
								{errors.dateStart.message}
							</Typography>
						)}
					</div>
					<div className="project-dateEnd">
						<Controller
							control={control}
							name="dateEnd"
							rules={{
								required: {
									value: false,
									message: 'Обязательное поле.',
								},
							}}
							render={({ field: { onChange, value } }) => (
								<>
									<Typography
										variant="small"
										className={(clsx('mb-1'), errors.dateEnd ? 'text-red-600' : 'text-gray-600')}>
										Дата окончания проекта
									</Typography>
									<DatePicker
										className="border border-gray-300 rounded-md w-full p-2 outline-blue-600"
										placeholderText="Дата окончания"
										onChange={(date) => onChange(date)}
										selected={value}
										dateFormat="dd.MM.yyyy"
									/>
								</>
							)}
						/>
						{errors.dateEnd && (
							<Typography
								variant="small"
								color="red"
								className="flex items-center gap-1 font-normal mt-1">
								<InformationCircleIcon className="w-4 h-4 -mt-px" />
								{errors.dateEnd.message}
							</Typography>
						)}
					</div>
					<div className="project-file">
						<Controller
							name="projectUrl"
							control={control}
							render={({ field: { value } }) => (
								<>
									<Typography
										variant="small"
										className={clsx('mb-1', errors.projectUrl ? 'text-red-600' : 'text-gray-600')}>
										Файл проекта
									</Typography>
									<div className="flex flex-col gap-3">
										<div className="flex gap-2">
											<Button size="sm" onClick={() => inputProjectRef?.current?.click()}>
												{value ? 'Обновить проект' : 'Добавить проект'}
											</Button>
											{value && (
												<Button size="sm" onClick={() => handleRemoveImage()} color="red">
													Удалить
												</Button>
											)}
										</div>
										<input
											ref={inputProjectRef}
											type="file"
											onChange={handleChangeProject}
											hidden
										/>
										{value && (
											<Typography
												variant="paragraph"
												className="flex items-center p-3 rounded-md font-semibold gap-2 bg-gray-200">
												<PaperClipIcon strokeWidth={2} className="w-7 h-7" />
												{value.length > 20
													? `${value.substring(9).substring(0, 20)}...`
													: value.substring(9)}
											</Typography>
										)}
									</div>
								</>
							)}
						/>
					</div>

					{/* <div className=" bg-white p-5 my-7 rounded-xl">
				<SimpleMDE
					className="mt-4 w-full font-sans text-lg"
					value={description}
					onChange={onChangeDescription}
					options={options}
				/>
			</div> */}

					{/* <div className="project-file">
						<Controller
							control={control}
							name="project"
							render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
								<div className="w-full h-[350px] gap-2 flex">
									<Dropzone onDrop={onChange}>
										{({ getRootProps, getInputProps }) => (
											<Card
												shadow={false}
												className={clsx(
													'bg-gray-200 p-3 rounded-xl flex flex-col justify-center items-center',
													value && value.length ? 'w-1/2' : 'w-full',
												)}
												{...getRootProps()}>
												<input name="project" onBlur={onBlur} {...getInputProps()} type="text" />
												<CloudArrowUpIcon strokeWidth={1} className="h-[200px]" />
												<Typography className="text-xl font-bold">
													Drag and drop files here, or click to select files
												</Typography>
											</Card>
										)}
									</Dropzone>
									{value && value.length > 0 && (
										<div className="w-1/2 lg: flex flex-col justify-between">
											<div className="flex flex-col gap-2 overflow-y-auto overflow-x-clip">
												{value.map((file, index) => (
													<div
														key={index}
														className=" flex items-center justify-between  p-2 rounded-md bg-gray-200 gap-2">
														<div className="flex items-center gap-2">
															<DocumentIcon strokeWidth={2} className="h-10 w-10" />
															<div className="flex flex-col">
																<Typography className="text-xl font-bold">
																	{file.name.length > 35
																		? `${file.name.substring(0, 35)}....${file.type.substring(
																				file.type.indexOf('/') + 1,
																		  )}`
																		: file.name}
																</Typography>
																<Typography className="text-md text-gray-600">
																	{(file.size / 1024 / 1024).toFixed(2)} Мб
																</Typography>
															</div>
														</div>

														<XMarkIcon
															onClick={() =>
																setValue(
																	'project',
																	value.filter((_, ind) => ind !== index),
																)
															}
															className="w-7 h-7 cursor-pointer justify-self-end"
														/>
													</div>
												))}
											</div>
											<Button onClick={() => setValue('project', [])}>Очистить</Button>
										</div>
									)}
								</div>
							)}
						/>
					</div> */}

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
					<div className="flex items-center justify-end gap-2">
						<Button onClick={() => onClickCancel()} variant="text">
							Отмена
						</Button>
						<Button type="submit" variant="gradient">
							{isEditing ? 'Сохранить' : 'Опубликовать'}
						</Button>
					</div>
				</div>
			</form>
		</Card>
	);
};

export default AddPost;
