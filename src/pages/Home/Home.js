import axios from 'axios';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

const Home = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [mess, setMess] = useState({
		status: '',
		mess: '',
	});
	const navigate = useNavigate();

	const getProductsApi = async () => {
		const token = localStorage.getItem('token');

		let headersList = {
			Authorization: `Bearer ${token}`,
		};

		let reqOptions = {
			url: 'http://eshop-ecommert.herokuapp.com/api/products',
			method: 'GET',
			headers: headersList,
		};

		return await axios.request(reqOptions);
	};

	const handleDelete = async id => {
		const token = localStorage.getItem('token');

		let headersList = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		};

		let reqOptions = {
			url: `http://eshop-ecommert.herokuapp.com/api/products/${id}`,
			method: 'DELETE',
			headers: headersList,
		};

		if (window.confirm('Are U Sure?')) {
			await axios
				.request(reqOptions)
				.then(res => {
					setMess({
						status: 'success',
						mess: res.data.message,
					});
				})
				.catch(err => {
					setMess({
						status: 'error',
						mess: err.message,
					});
				});
		}
	};

	const handleLogout = () => {
		if (window.confirm('Are U Sure?')) {
			setMess({
				status: 'navigate',
				mess: 'Đang chuyển về Log In...',
			});

			localStorage.removeItem('token');
			setTimeout(() => navigate('/'), 1000);
		}
	};

	const handleEdit = name => {
		setMess({
			status: 'navigate',
			mess: 'Đang chuyển hướng sang trang chỉnh sửa...',
		});

		setTimeout(() => navigate('/edit', { state: name }), 1000);
	};

	const handleCreate = () => {
		setMess({
			status: 'navigate',
			mess: 'Đang chuyển hướng trang...',
		});
		setTimeout(() => {
			navigate('/create');
		}, 1500);
	};

	useEffect(() => {
		getProductsApi()
			.then(res => {
				setProducts(res.data.data);
				setLoading(false);
			})
			.catch(err => {
				setLoading(false);
				setMess({
					status: 'error',
					mess: err.message,
				});
			});
	});

	return loading ? (
		<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<CircularProgress />
		</Box>
	) : (
		<>
			<Grid container spacing={1}>
				<Grid item xs></Grid>
				<Grid item xs={8}>
					<Paper sx={{ padding: 1, height: 600 }}>
						{mess && mess.status === 'error' ? <Alert severity='error'>{mess.mess}</Alert> : ''}
						{mess && mess.status === 'navigate' ? <Alert severity='info'>{mess.mess}</Alert> : ''}
						{mess && mess.status === 'success' ? <Alert severity='success'>{mess.mess}</Alert> : ''}
						<h3>List Products</h3>
						<Button variant='outlined' color='success' onClick={handleCreate}>
							Create
						</Button>
						<Button variant='outlined' color='success' onClick={handleLogout}>
							Logout
						</Button>
						<TableContainer component={Paper}>
							<Table sx={{ minWidth: 700 }} aria-label='customized table'>
								<TableHead>
									<TableRow>
										<StyledTableCell>#</StyledTableCell>
										<StyledTableCell align='left'>Id</StyledTableCell>
										<StyledTableCell align='left'>Name</StyledTableCell>
										<StyledTableCell align='left'>Description</StyledTableCell>
										<StyledTableCell align='left'>Price</StyledTableCell>
										<StyledTableCell align='left'></StyledTableCell>
										<StyledTableCell align='left'></StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{products.slice(0, 5).map((product, index) => (
										<StyledTableRow key={index}>
											<StyledTableCell component='th' scope='row'>
												{index + 1}
											</StyledTableCell>
											<StyledTableCell align='left'>{product.id}</StyledTableCell>
											<StyledTableCell align='left'>{product.name}</StyledTableCell>
											<StyledTableCell align='left'>{product.des}</StyledTableCell>
											<StyledTableCell align='left'>{product.price}</StyledTableCell>
											<StyledTableCell align='left'>
												<Button variant='contained' color='error' onClick={() => handleDelete(product.id)}>
													Delete
												</Button>
											</StyledTableCell>
											<StyledTableCell align='left'>
												<Button variant='contained' color='success' onClick={() => handleEdit(product.name)}>
													Edit
												</Button>
											</StyledTableCell>
										</StyledTableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Paper>
				</Grid>
				<Grid item xs></Grid>
			</Grid>
		</>
	);
};

export default Home;
