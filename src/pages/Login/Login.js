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

export default function Login() {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		email: '',
		password: '',
	});
	const [mess, setMess] = useState({
		status: '',
		mess: '',
	});
	const [loading, setLoading] = useState(false);

	const postForm = async () => {
		let headersList = {
			"Content-Type": "application/json" 
		   }
		   
		   let bodyContent = JSON.stringify({
			 "email" : `${form.email}`,
			 "password":  `${form.password}`
		   });
		   
		   let reqOptions = {
			 url: "https://eshop-ecommert.herokuapp.com/api/login",
			 method: "POST",
			 headers: headersList,
			 data: bodyContent,
		   }
		   
		   return await axios.request(reqOptions);
	};

	const handleSubmit = e => {
		e.preventDefault();
		setLoading(true);
		postForm()
			.then(res => {
				let token = res.data.authorisation.token;
				localStorage.setItem('token', token);
				setMess({
					status: 'success',
					mess: 'Đăng nhập thành công! Đang chuyển hướng...',
				});
				setLoading(false);
				setTimeout(() => navigate('/home'), 1000);
			})
			.catch(err => {
				setLoading(false);
				setMess({
					status: 'error',
					mess: err.message,
				});
			});
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
						<Box component='form' onSubmit={handleSubmit}>
							<h2 style={{ textAlign: 'center' }}>Login</h2>
							<div style={{ textAlign: 'center' }}>
								<TextField
									label='Email'
									onChange={e => setForm({ ...form, email: e.target.value })}
									required
									type='email'
								/>
							</div>
							<div style={{ textAlign: 'center' }}>
								<TextField
									label='Password'
									onChange={e => setForm({ ...form, password: e.target.value })}
									required
									sx={{ marginTop: 1 }}
									type='password'
								/>
							</div>
							<div style={{ textAlign: 'center' }}>
								<Button variant='contained' color='success' sx={{ marginTop: 5, alignItems: 'center' }} type='submit'>
									Submit
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
