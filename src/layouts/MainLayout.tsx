import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const MainLayout: React.FC = () => {
	return (
		<>
			<Header />
			<main className="flex">
				<Outlet />
			</main>
			<Footer />
		</>
	);
};

export default MainLayout;
