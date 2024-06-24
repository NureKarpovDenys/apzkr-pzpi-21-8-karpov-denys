import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <div className="">
      <form className="m-auto grid w-[500px] bg-slate-600">
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required minLength={6} />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <button formAction={login}>Log in</button>
        <button formAction={signup} type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
}
