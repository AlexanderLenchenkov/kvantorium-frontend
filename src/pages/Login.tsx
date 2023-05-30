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
			<div className=" my-7 bg-white p-10 rounded-xl">
				<h3 className="styles-title text-3xl font-bold text-gray-800 text-center mb-5">
					Вход в аккаунт
				</h3>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="mb-3">
						<label className="block text-md font-semibold text-gray-700">Логин</label>
						<div className="mt-2">
							<input
								{...register('login', { required: 'Укажите логин' })}
								type="text"
								className={clsx(
									'block w-full outline-none text-xl rounded-sm p-2 border border-gray-300 py-1.5 text-gray-900',
									errors.login?.message && 'border-red-600',
								)}
							/>
							<span className="w-full text-center text-red-600">{errors.login?.message}</span>
						</div>
					</div>
					<div className="mb-5">
						<label className="block text-md font-semibold text-gray-700">Пароль</label>
						<div className="mt-2">
							<input
								{...register('password', { required: 'Укажите пароль' })}
								type="password"
								className={clsx(
									'block w-full outline-none text-xl rounded-sm p-2 border border-gray-300 py-1.5 text-gray-900',
									errors.password?.message && 'border-red-600',
								)}
							/>
							<span className="w-full text-center text-red-600">{errors.password?.message}</span>
						</div>
					</div>
					<button
						type="submit"
						className="w-full uppercase rounded-md bg-blue-600 p-3 text-ьв font-semibold text-white hover:bg-blue-500">
						Войти
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
