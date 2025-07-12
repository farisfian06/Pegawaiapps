import { IoIosLock, IoMdMailOpen } from "react-icons/io";
import useLogin from "./hooks/useLogin";

const LoginPage = () => {
  const { form, onSubmit } = useLogin();
  return (
    <section className="dark:bg-gray-900">
      <div className="container flex justify-center min-h-screen items-center">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex shadow-2xl w-full h-fit max-w-md md:max-w-screen-lg rounded-2xl overflow-hidden *:py-14 mt-12"
        >
          <div className="bg-slate-100 dark:bg-gray-800 w-full md:w-3/5 px-8 flex flex-col gap-8 justify-center items-center">
            <h1 className="font-bold text-center text-primary text-2xl leading-none">
              Hello! <br />
              <span className="text-black dark:text-white font-normal text-base">
                Sign in to your account
              </span>
            </h1>
            <div className="w-full space-y-2">
              <div className="flex gap-2 py-2 px-5 items-center rounded-full bg-slate-50 dark:bg-gray-700 shadow-lg">
                <IoMdMailOpen size={25} className="text-primary" />
                <input
                  {...form.register("email")}
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="bg-transparent w-full text-black dark:text-white px-3 py-2 rounded-full border border-gray-300 dark:border-gray-600 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent hover:shadow-lg dark:placeholder-gray-400"
                />
              </div>
              <p className="text-red-500 text-sm pl-4">
                {form.formState.errors.email?.message}
              </p>
            </div>
            <div className="w-full space-y-2">
              <div className="flex gap-2 py-2 px-5 items-center rounded-full bg-slate-50 dark:bg-gray-700 shadow-lg">
                <IoIosLock size={25} className="text-primary" />
                <input
                  {...form.register("password")}
                  type="password"
                  placeholder="Password"
                  className="bg-transparent w-full text-black dark:text-white px-3 py-2 rounded-full border border-gray-300 dark:border-gray-600 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent hover:shadow-lg dark:placeholder-gray-400"
                />
              </div>
              <p className="text-red-500 text-sm pl-4">
                {form.formState.errors.password?.message}
              </p>
            </div>
            <button
              type="submit"
              className="hover:cursor-pointer text-center py-2 px-8 bg-gradient-to-br from-primary to-tertiary rounded-full font-primaryBold text-slate-50 shadow-lg hover:opacity-90"
            >
              Sign In
            </button>
          </div>
          <div className="bg-gradient-to-br from-primary from-35% to-tertiary w-2/5 px-4 *:text-center flex-col gap-2 justify-center items-center hidden md:flex">
            <h2 className="font-bold text-2xl text-slate-50">Welcome Back!!</h2>
            <p className="text-slate-50">Log in to continue your journey.</p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
