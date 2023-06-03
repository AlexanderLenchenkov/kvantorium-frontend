import clsx from 'clsx';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/auth/slice';
import { selectIsAuth } from '../redux/auth/selectors';
import { useAppDispatch } from '../redux/store';
import { mainURL } from '../axios';

const Header: React.FC = () => {
	const dispatch = useAppDispatch();
	const isAuth = useSelector(selectIsAuth);

	const [isMenuOpened, setIsMenuOpened] = useState(false);
	return (
		<header className="flex flex-col">
			<div className="hidden lg:block bg-[#074575]">
				<div className="container mx-auto h-12 flex text-white  text-sm items-center justify-between">
					<div className="flex gap-10">
						<a href="mailto:KvantoriumPerm@gmail.com">KvantoriumPerm@gmail.com</a>
						<span>ежедневно,9:00–20:00</span>
						<a href="tel:+73422144269">+7(342)214-42-69</a>
					</div>
					<a href="http://perminnovation.ru">
						ЧОУ ДПО Центр Инновационного развития человеческого <br />
						потенциала и управления знаниями
					</a>
				</div>
			</div>
			<div className="bg-white">
				<div className="container font-semibold text-base mx-auto py-3 flex justify-between items-center">
					<Link to="/" className="">
						<img
							className="h-11 w-auto"
							src={`${mainURL}/uploads/categories/logo.png`}
							alt="Logo"
						/>
					</Link>
					<nav className="hidden lg:flex">
						<ul className="inline-flex items-center">
							<li>
								<a
									className="inline-block text-[#074575] hover:text-[#07a7e3] py-3 px-4"
									href="https://kvantorium-perm.ru/">
									Главная
								</a>
							</li>
							<li>
								<a
									className="inline-block text-[#074575] hover:text-[#07a7e3] py-3 px-4"
									href="https://kvantorium-perm.ru/">
									Кванториум
								</a>
							</li>
							<li>
								<a
									className="inline-block text-[#074575] hover:text-[#07a7e3] py-3 px-4"
									href="https://kvantorium-perm.ru/">
									Обучение
								</a>
							</li>
							<li>
								<a
									className="inline-block text-[#074575] hover:text-[#07a7e3] py-3 px-4"
									href="https://kvantorium-perm.ru/news/">
									Новости
								</a>
							</li>
							<li>
								<a
									className="inline-block text-[#074575] hover:text-[#07a7e3] py-3 px-4"
									href="https://vk.com/albums-166686902">
									Медиа
								</a>
							</li>
							<li>
								<a
									className="inline-block text-[#074575] hover:text-[#07a7e3] py-3 px-4"
									href="https://kvantorium-perm.ru/kvant-work-time/">
									Контакты
								</a>
							</li>
						</ul>
					</nav>
					<div className="flex lg:hidden items-center gap-3">
						<div
							onClick={() => setIsMenuOpened((prev) => !prev)}
							className="flex lg:hidden z-30 flex-col justify-between">
							{isMenuOpened ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-auto h-9 text-[#074575]">
									<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
								</svg>
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-auto h-9 text-[#074575]">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
									/>
								</svg>
							)}
						</div>
						<div
							className={clsx(
								'burger-menu absolute z-20 bg-white top-0 left-0 w-screen py-5  overflow-hidden ',
								isMenuOpened || 'hidden',
							)}>
							<nav className="flex h-full justify-center items-center">
								<ul className="flex flex-col text-2xl">
									<li>
										<a
											className="inline-block text-[#074575] hover:text-[#07a7e3] py-3 px-4"
											href="https://kvantorium-perm.ru/">
											Главная
										</a>
									</li>
									<li>
										<a
											className="inline-block text-[#074575] hover:text-[#07a7e3] py-3 px-4"
											href="https://kvantorium-perm.ru/">
											Кванториум
										</a>
									</li>
									<li>
										<a
											className="inline-block text-[#074575] hover:text-[#07a7e3] py-3 px-4"
											href="https://kvantorium-perm.ru/">
											Обучение
										</a>
									</li>
									<li>
										<a
											className="inline-block text-[#074575] hover:text-[#07a7e3] py-3 px-4"
											href="https://kvantorium-perm.ru/news/">
											Новости
										</a>
									</li>
									<li>
										<a
											className="inline-block text-[#074575] hover:text-[#07a7e3] py-3 px-4"
											href="https://vk.com/albums-166686902">
											Медиа
										</a>
									</li>
									<li>
										<a
											className="inline-block text-[#074575] hover:text-[#07a7e3] py-3 px-4"
											href="https://kvantorium-perm.ru/kvant-work-time/">
											Контакты
										</a>
									</li>
								</ul>
							</nav>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
