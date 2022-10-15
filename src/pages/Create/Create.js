import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

export default function Create() {
	const [loading, setLoading] = useState(false);
	const [mess, setMess] = useState({
		status: '',
		mess: '',
	});
	const [form, setForm] = useState({
		name: '',
		desc: '',
		price: '',
	});
	const navigate = useNavigate();

	const handleSubmit = async e => {
		e.preventDefault();
		setLoading(true);
		let headersList = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${localStorage.getItem('token')}`,
		};

		let bodyContent = JSON.stringify(form);

		let reqOptions = {
			url: 'https://eshop-ecommert.herokuapp.com/api/products/create',
			method: 'POST',
			headers: headersList,
			data: bodyContent,
		};

		await axios
			.request(reqOptions)
			.then(res => {
				setForm({
					name: '',
					desc: '',
					price: '',
				});
				setLoading(false);
				setMess({
					status: 'success',
					mess: 'Tạo mới thành công! Về trang chủ...',
				});
				setTimeout(() => navigate('/home'), 1000);
			})
			.catch(err => {
				setForm({
					name: '',
					desc: '',
					price: '',
				});
				setLoading(false);
				setMess({
					status: 'success',
					mess: 'Tạo mới thành công! Về trang chủ...',
				});
				setTimeout(() => navigate('/home'), 1000);

				//setMess({
				//	status: 'error',
				//	mess: err.message,
				//});
			});
	};

	const handleBack = () => {
		setMess({
			status: 'navigate',
			mess: 'Đang chuyển hướng về trang chủ...',
		});
		setTimeout(() => navigate('/home'), 1500);
	};

	return loading ? (
		<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<CircularProgress />
		</Box>
	) : (
		<>
			<Grid container item>
				<Grid item xs></Grid>
				<Grid item xs={5}>
					<Paper elevation={3} sx={{ padding: 2, marginTop: 10 }}>
						{mess && mess.status === 'error' ? <Alert severity='error'>{mess.mess}</Alert> : ''}
						{mess && mess.status === 'success' ? <Alert severity='success'>{mess.mess}</Alert> : ''}
						{mess && mess.status === 'navigate' ? <Alert severity='info'>{mess.mess}</Alert> : ''}
						<Box component='form' onSubmit={handleSubmit}>
							<h2 style={{ textAlign: 'center' }}>Create a new product</h2>
							<div style={{ textAlign: 'center' }}>
								<TextField
									label='Name'
									onChange={e => setForm({ ...form, name: e.target.value })}
									required
									type='text'
									value={form.name}
								/>
							</div>
							<div style={{ textAlign: 'center' }}>
								<TextField
									label='Desc'
									onChange={e => setForm({ ...form, desc: e.target.value })}
									required
									sx={{ marginTop: 1 }}
									type='text'
									value={form.desc}
								/>
							</div>
							<div style={{ textAlign: 'center' }}>
								<TextField
									label='Price'
									onChange={e => setForm({ ...form, price: e.target.value })}
									required
									sx={{ marginTop: 1 }}
									type='number'
									value={form.price}
								/>
							</div>
							<div style={{ textAlign: 'center' }}>
								<Button variant='contained' color='success' sx={{ marginTop: 5, alignItems: 'center' }} type='submit'>
									Submit
								</Button>
							</div>
							<div style={{ textAlign: 'center' }}>
								<Button
									variant='outlined'
									color='success'
									sx={{ marginTop: 1, alignItems: 'center' }}
									onClick={handleBack}>
									Cancel
								</Button>
							</div>
						</Box>
					</Paper>
				</Grid>
				<Grid item xs></Grid>
			</Grid>
		</>
	);
}
