'use client';
import { BASE_URL, restApi } from '@/api';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface FormData {
  email: string;
  password: string;
}
const Page = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setErrorMessage('');
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, data, {
        withCredentials: true,
      });

      // window.localStorage.setItem("access_token", response.data.token);
      await router.push('/crm/user');
    } catch (e: any) {
      setErrorMessage(e.response.data.message);
    }
  };

  return (
    <main className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
      <div className="relative flex flex-col justify-center h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
          <h1 className="text-3xl font-semibold text-center text-purple-700">
            LOG IN
          </h1>
          {errorMessage != '' && (
            <div className="alert alert-error">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{errorMessage}</span>
              </div>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="label">
                <span className="text-base label-text">Email</span>
              </label>
              <input
                {...register('email')}
                type="text"
                placeholder="Email Address"
                className="w-full input input-bordered input-primary"
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                {...register('password')}
                className="w-full input input-bordered input-primary "
              />
              <span className="label-text-alt">
                {errors.email && errors.email.message}
              </span>
            </div>
            <div>
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Page;
