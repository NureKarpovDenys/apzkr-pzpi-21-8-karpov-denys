import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  const isUserLoggedIn = !(error || !data?.user);

  return (
    <html lang="en" className="bg-neutral-400">
      <body className={inter.className}>
        <header className="flex justify-between bg-orange-400 p-3 text-lg">
          <div>
            <Link
              href="/"
              className="mr-2 inline-block bg-neutral-200 p-1.5 hover:underline"
            >
              Main
            </Link>
            {isUserLoggedIn && (
              <>
                <Link
                  href="/admin"
                  className="mr-2 inline-block bg-neutral-200 p-1.5 hover:underline"
                >
                  Admin
                </Link>
                <Link
                  href="/data/cargos"
                  className="mr-2 inline-block bg-neutral-200 p-1.5 hover:underline"
                >
                  Cargos
                </Link>
                <Link
                  href="/data/clients"
                  className="mr-2 inline-block bg-neutral-200 p-1.5 hover:underline"
                >
                  Clients
                </Link>
                <Link
                  href="/data/points"
                  className="mr-2 inline-block bg-neutral-200 p-1.5 hover:underline"
                >
                  Points
                </Link>
                <Link
                  href="/data/locations"
                  className="mr-2 inline-block bg-neutral-200 p-1.5 hover:underline"
                >
                  Locations
                </Link>{" "}
              </>
            )}
          </div>
          {isUserLoggedIn ? (
            <div>
              <Link
                className="mr-2 inline-block bg-neutral-200 p-1.5 hover:underline"
                href="/private"
              >
                Profile
              </Link>
              <form
                className="mr-2 inline-block bg-neutral-200 p-1.5 hover:cursor-pointer hover:underline"
                action={async () => {
                  "use server";

                  const supabase = createClient();
                  await supabase.auth.signOut();
                }}
              >
                <input type="submit" className="" value="Log Out"></input>
              </form>
            </div>
          ) : (
            <div>
              <Link
                className="mr-2 inline-block bg-neutral-200 p-1.5 hover:underline"
                href="/login"
              >
                Log In
              </Link>
            </div>
          )}
        </header>
        {children}
      </body>
    </html>
  );
}
