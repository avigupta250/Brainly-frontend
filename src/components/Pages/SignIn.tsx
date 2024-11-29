
import { useForm, SubmitHandler } from 'react-hook-form';
import { apiConnector } from '../../operations/apiconnector';
import {endPoints} from "../../operations/api"
import {  useNavigate } from 'react-router-dom';

interface SignupFormInputs {
  username: string;
  password: string;
}

const SignIn= () => {
    const navigate=useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const onSubmit: SubmitHandler<SignupFormInputs> = (data) => {
    console.log('Form Data:', data);
    const fetchData = async () => {
        try {
          const response = await apiConnector({
            method: "post",
            url: endPoints.SIGN_IN,
            bodyData:{
                email:data.username,
                password:data.password
            }

           
            
          });
          localStorage.setItem("token",response.data.token)
          console.log("Response Data:", response.data);
        navigate("/dashboard")
          
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      
      fetchData();
    alert(`Signup Successful! Username: ${data.username}`);
  };

  return (
    <div className="flex  items-center justify-center min-h-screen bg-gray-100">
      <div className=" max-w-md p-6 bg-white rounded-md shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-700">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="email"
              id="username"
              {...register('username', { required: 'Username is required' })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="text"
              id="password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
