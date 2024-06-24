import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <form className="mx-auto mt-10 flex w-[400px] flex-col gap-2 bg-orange-400 p-6">
      <div>
        <label className="inline-block" htmlFor="email">
          Email
        </label>
        <input
          className="block w-full p-2"
          id="email"
          name="email"
          type="email"
          required
          minLength={6}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          className="block w-full p-2"
          id="password"
          name="password"
          type="password"
          required
        />
      </div>
      <div>
        <button
          className="mb-2 mt-2 block w-full bg-neutral-100 p-2 hover:underline"
          formAction={login}
        >
          Log in
        </button>
        <button
          className="block w-full bg-neutral-100 p-2 hover:underline"
          formAction={signup}
          type="submit"
        >
          Sign up
        </button>
      </div>
    </form>
  );
}
