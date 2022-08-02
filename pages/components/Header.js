

export default function Header(){
    return( 
    <div className="mx-10">
         <div className="flex flex-col  px-10 py-6 sm:space-y-4  md:flex-row md:justify-between">
        <h1 className="tracking-wide text-xl text-gray-400 uppercase"><span className="italic text-2xl text-blue-100">Reviews</span> by <span className="text-red-500 font-bold">Stephen</span> </h1>

        <div className="auth text-white">
            <a href="/api/auth/signin" className="bg-black px-6 py-2 capitalize font-bold text-xl border border-white rounded shadow-xl hover:bg-red-500 hover:border-none transition-all">sign in</a>
        </div>
    </div>
    </div>
   
)

}