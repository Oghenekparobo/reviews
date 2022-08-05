import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "./components/Header";
import { getItem } from "lib/data ";
import prisma from "lib/prisma";
import Link from "next/link";

export default function Home({ restaurant, thingToDo, hotel }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const loading = status === "loading";
  if (loading) return "loading";

  if (session && session.user.isAdmin) {
    router.push("/admin");
    return;
  }

  return (
    <div>
      <Head>
        <title>The best in town</title>
        <meta name="description" content="Private Area" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="text-center wrapper bg-gradient-to-b from-black-500 to-black-500  relative inset-0">
        <div className="absolute">
          <img
            src="./feeling.jpg"
            alt="background image"
            className="h-screen w-screen object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-200 mix-blend-multiply"></div>
        </div>

        <nav className="relative">
          <Header />
        </nav>

        <div className="relative text-white">
          <h1 className="pt-10 font-extrabold text-2xl uppercase font-semi-bold">
            The best in town
          </h1>

          <div className="grid md:grid-cols-3">
            {restaurant && (
              <div>
                <h2 className="mt-10 font-bold">Restaurants</h2>

          
                  {restaurant.map((item, index) => (
                    <Link href={`/${item.id}`} key={index}>
                    <a className="cursor-pointer block" >{item.name}</a>
                    </Link>
                  ))}
              
              </div>
            )}
              {hotel && (
                <div>
                  <h2 className="mt-10 font-bold">Hotels</h2>

                    {hotel.map((item, index) => (
                       <Link href={`/${item.id}`} key={index}>
                       <a className="cursor-pointer block" >{item.name}</a>
                       </Link>
                    ))}
                
                </div>
              )}
              {thingToDo && (
                <div>
                  <h2 className="mt-10 font-bold">Things to do</h2>

                
                    {thingToDo.map((item, index) => (
                        <Link href={`/${item.id}`} key={index}>
                        <a className="cursor-pointer block" >{item.name}</a>
                        </Link>
                    ))}
      
                </div>
              )}
            </div>
          </div>
        </div>
    </div>
  );
}

export async function getServerSideProps() {
  let restaurant = await getItem(prisma, "restaurant");
  restaurant = JSON.parse(JSON.stringify(restaurant));

  let thingToDo =await getItem(prisma, "thing-to-do");
  thingToDo = JSON.parse(JSON.stringify(thingToDo));

  let hotel = await getItem(prisma, "hotel");
  hotel = JSON.parse(JSON.stringify(hotel));

  return {
    props: {
      restaurant,
      thingToDo,
      hotel,
    },
  };
}
