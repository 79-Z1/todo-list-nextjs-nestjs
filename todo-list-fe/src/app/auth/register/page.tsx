'use client';
import { FormEvent, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import AuthForm from '../page';
import { toast } from 'react-toastify';
import { RequestBody, authFetch } from '@/helpers/fetch';

export default function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { push } = useRouter();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const payload: RequestBody = {
			email,
			password,
		};
		if (!email.trim()) return toast.error('Không được để trống email!');
		if (!password.trim())
			return toast.error('Không được để trống mật khẩu!');
		const url = 'http://localhost:3001/api/auth/signup';

		const data = await authFetch(url, payload);
		if (data && !data.error) {
			localStorage.setItem('UserId', data['user']['id']);
			localStorage.setItem(
				'Authorization',
				data['tokens']['accessToken'],
			);
			localStorage.setItem(
				'RefreshToken',
				data['tokens']['refreshToken'],
			);
			push('/todo');
		}
	};

	return (
		<AuthForm
			setEmail={(e: any) => {
				setEmail(e);
			}}
			setPassword={(e: any) => {
				setPassword(e);
			}}
			handleSubmit={(e: any) => {
				handleSubmit(e);
			}}
		/>
	);
}
