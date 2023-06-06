import clsx from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchAuth } from '../redux/auth/asyncActions';
import { AuthParams } from '../redux/auth/types';
import { selectIsAuth } from '../redux/auth/selectors';
import { useAppDispatch } from '../redux/store';
import { User } from '../redux/user/types';
import { Button, Input, Typography } from '@material-tailwind/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

const Login: React.FC = () => {
	const dispatch = useAppDispatch();
	const isAuth = useSelector(selectIsAuth);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AuthParams>({
		mode: 'onChange',
	});

	const onSubmit = async (data: AuthParams) => {
		const auth = await dispatch(fetchAuth(data));

		if (!auth.payload) {
			return alert('Не удалось авторизоваться!');
		}
		const token = (auth.payload as User).token;
		if (token) {
			window.localStorage.setItem('token', token);
			console.log(window.localStorage.getItem('token'));
		}
	};

	if (isAuth) {
		return <Navigate to="/" />;
	}

	return (
		<div className="container max-w-[500px] mx-auto">
			<div className=" my-5 bg-white p-5 rounded-xl">
				<Typography variant="h3" className="text-gray-800 text-center mb-4">
					Вход в аккаунт
				</Typography>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-col gap-4">
						<div>
							<Input
								variant="outlined"
								size="lg"
								label="Логин"
								error={!!errors.login}
								labelProps={{ className: 'text-2xl text font-bold' }}
								{...register('login', {
									required: {
										value: true,
										message: 'Заполните логин.',
									},
								})}
							/>
							{errors.login && (
								<Typography
									variant="small"
									color="red"
									className="flex items-center gap-1 font-normal mt-1">
									<InformationCircleIcon className="w-4 h-4 -mt-px" />
									{errors.login.message}
								</Typography>
							)}
						</div>

						<div>
							<Input
								type="password"
								variant="outlined"
								size="lg"
								label="Пароль"
								error={!!errors.password}
								labelProps={{ className: 'text-2xl text font-bold' }}
								{...register('password', {
									required: {
										value: true,
										message: 'Заполните пароль.',
									},
								})}
							/>
							{errors.password && (
								<Typography
									variant="small"
									color="red"
									className="flex items-center gap-1 font-normal mt-1">
									<InformationCircleIcon className="w-4 h-4 -mt-px" />
									{errors.password.message}
								</Typography>
							)}
						</div>
						<Button type="submit">Войти</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
