export default function HowItWorks() {
  const steps = [
    {
      title: "Create Account",
      desc: "Sign up and set up your profile بسهولة.",
    },
    {
      title: "Add Friends",
      desc: "Connect with people and build your network.",
    },
    {
      title: "Start Chatting",
      desc: "Send messages and share media instantly.",
    },
  ];

  return (
    <section className=" text-black py-20 px-6">

      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold">
          Start Chatting in Seconds
        </h2>
        <p className="mt-4 ">
          Simple steps to get connected and start conversations instantly.
        </p>
      </div>

      {/* Steps */}
      <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {steps.map((step, i) => (
          <div key={i} className="text-center ">

            {/* Number Circle */}
            <div className="w-14 h-14 mx-auto flex items-center  justify-center 
                            rounded-full bg-violet-600 font-bold text-lg">
              {i + 1}
            </div>

            {/* Title */}
            <h3 className="mt-6 text-2xl font-semibold">
              {step.title}
            </h3>

            {/* Desc */}
            <p className="mt-2 text-lg">
              {step.desc}
            </p>

          </div>
        ))}
      </div>
    </section>
  );
}