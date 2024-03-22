import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   fetch("https://dummyjson.com/auth/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       // username: user,
  //       // password: password,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((json) => {
  //       console.log(json);
  //       if (json.token) {
  //         localStorage.setItem("token", json.token);
  //         // setPassword("");
  //         // setUser("");
  //         return navigate("/");
  //       }

  //       // esto se ejecuta si no hay token
  //       // setError("Nel Pastel || You shall not pass!!!");
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const onSubmit = async (data) => {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    });

    const json = await response.json();

    if (json.token) {
      localStorage.setItem("token", json.token);
      navigate("/");
      return;
    }

    setError("root", { message: "You shall not pass!!!!" });

    console.log(json);
  };

  return (
    <main className="flex flex-row items-center justify-center">
      <form
        action=""
        className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="sm:col-span-4">
          <label
            for="username"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Username
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                required
                type="text"
                name="username"
                id="username"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Enter User"
                {...register("username", {
                  minLength: 3,
                  message: "min 3 chars",
                })}
              />
            </div>
          </div>
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}

          <label
            for="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                required
                type="password"
                name="password"
                id="password"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Enter Password"
                {...register("password")}
              />
            </div>
          </div>

          {errors.root && <p className="text-red-500">{errors.root.message}</p>}

          <button className="rounded-full">Login</button>
        </div>
      </form>
    </main>
  );
};

export default Login;
