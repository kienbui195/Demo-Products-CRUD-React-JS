import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Create from './pages/Create/Create';
import Edit from './pages/Edit/Edit';

function App() {
	return (
		<>
			<Routes>
				{/* Login */}
				<Route path='/' element={<Login />} />

				{/* Home */}
				<Route path='/home' element={<Home />} />
				
				{/* Create */}
				<Route path='/create' element={<Create />} />

				{/* Edit */}
				<Route path='/edit' element={<Edit />} />
			</Routes>
		</>
	);
}

export default App;
