import { Route, Routes } from 'react-router-dom';
import './scss/app.scss';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import FullProject from './pages/FullProject';
import AddPost from './pages/AddPost';
import Login from './pages/Login';

const App: React.FC = () => {
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route path="" element={<Home />} />
				<Route path="/projects/:id" element={<FullProject />} />
				<Route path="/projects/:id/edit" element={<AddPost />} />
				<Route path="/add-project" element={<AddPost />} />
				<Route path="/admin" element={<Login />} />
			</Route>
		</Routes>
	);
};

export default App;
