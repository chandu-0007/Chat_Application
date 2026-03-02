import { redirect } from "next/navigation";;
import GetToken from "./lib/getToken";
import Link from "next/link";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWork";
import Footer from "./components/Footer";
export default async function Home() {
  const token = await GetToken();

  if (token) {
    redirect("/dashboard");
  }
  return (
    <>
      <div className="relative min-h-screen font-sans overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/LandingImg.png')",
          }}
        />

        <div className="relative z-10 pt-4 px-8">
          {/* Your content here */}
          <div className="flex justify-between  ">
            <div className="font-serif text-xl ">
              Chat-Me
            </div>

            {/* section  */}
            <div className="flex gap-10  text-lg font-light ">
              <div
                className="cursor-pointer hover:font-normal "
              >Home</div>
              <div
                className="cursor-pointer hover:font-normal ">Features</div>
              <div
                className="cursor-pointer hover:font-normal "
              >About</div>
              <div
                className="cursor-pointer hover:font-normal "
              >Price</div>
              <div
                className="cursor-pointer hover:font-normal "
              >How it Works</div>

            </div>

            {/* FIXED LINK */}
            <Link href="/signin">
              <button className="bg-white/50 text-sm p-1 rounded-md w-24 flex gap-1.5 items-center justify-center hover:-translate-y-1 hover:bg-white/30">
                Login
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-3.5 bg-black text-white rounded-full"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </Link>
          </div>
          <div className=" flex justify-between mt-30">
            <div>
              <div
                className="bg-white/40 w-35 flex justify-center  gap-0.5  h-8 rounded-lg items-center  
                cursor-pointer 
               shadow-[0_8px_20px_-5px_rgba(0,0,0,0.4)] pt-0.5 text-center  animate-pulse hover:-translate-y-1  text-black ">
                Watch Demo
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                  className="size-4 m-0.5">
                  <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
                </svg>

              </div>
              <h2 className="text-5xl font-semibold  font-sans">Connect. Chat.</h2>
              <h2 className="text-5xl font-semibold  font-sans">Build Communities — Instantly.</h2>
            </div>
          </div>
          <div className=" flex justify-end-safe mt-60  mr-15 ">
            <div>
              <p className="text-xl  font-extralight  font-sans ">
               Experience seamless real-time messaging built for speed and simplicity.
              </p>
              <p className="text-xl font-extralight  font-sans ">
                 Stay connected with friends, teams, and communities anytime, anywhere.
              </p>
              <p className="text-xl font-extralight  font-sans ">
               Share moments, ideas, and conversations without limits.
              </p>
              <p className="text-xl font-extralight font-sans ">
                All in one secure and beautifully designed platform.
              </p>
             
            </div>
            <div className=" w-auto  flex ">
              <Link href={"/signup"} >
                <button className=" bg-white/50 text-center  px-2.5 mt-5 ml-2 flex  gap-1 hover:bg-white/30 justify-center items-center   shadow-[0_8px_20px_-5px_rgba(0,0,0,0.4)] rounded-md  w-auto h-8 ">
                  Build our first Dashborad
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 hover:animate-ping">
                    <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd" />
                  </svg>

                </button>
              </Link>
            </div>
          </div>

          {/* // loop runing of the features  */}

        </div>
      </div>
      {/* features section */}
      <section className="bg-gradient-to-b from-transparent via-slate-400  text-black py-20  mt-0 pt-6">
        <h1  className="text-4xl  uppercase tracking-tighter  font-bold text-center mb-1 mt-6   ">Everything You Need for Seamless Conversations</h1>
         <p className="text-center font-extralight ">
          Powerful features designed to make messaging faster, smarter, and more enjoyable across all your devices.
         </p>
         <Features/>
          <HowItWorks/>
      </section>

      {/* last section
      */}
     
      <section className=" h-100 bg-gradient-to-b from-transparent via-slate-900 to-black text-white py-20">
        <Footer/>
      </section>
    </>
  );
}

