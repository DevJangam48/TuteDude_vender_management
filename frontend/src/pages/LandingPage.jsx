import React from "react";
import { motion } from "framer-motion";
import LandingNavbar from "../components/layout/LandingNavbar";
import { useUI } from "../context/UIContext";

const heroVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: "easeOut" } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stepCardVariants = {
  hover: { scale: 1.04, boxShadow: "0 8px 32px 0 rgba(60,180,70,0.18)" },
};

const LandingPage = () => {
  const { openLoginModal } = useUI();

  return (
    <div className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 text-gray-800 font-sans min-h-screen w-full overflow-x-hidden relative w-screen">
      <LandingNavbar />
      {/* Vibrant blurred circles */}
      <div className="fixed left-10 -top-40 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 z-0"></div>
      <div className="fixed right-10 top-20 w-56 h-56 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 z-0"></div>
      <div className="fixed right-1/3 bottom-10 w-48 h-48 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 z-0"></div>

      {/* Hero */}
      <motion.main
        initial="hidden"
        animate="visible"
        variants={heroVariants}
        className="relative pt-36 pb-20 lg:pt-48 lg:pb-32 z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-green-100/60 via-white/10 to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.98, y: -30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 mb-5 drop-shadow-lg"
          >
            Bulk Savings{" "}
            <span className="inline-block animate-gradient bg-gradient-to-r from-green-500 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Redefined
            </span>
            .<br />
            <span className="text-green-600 drop-shadow-md">
              Order Produce Together
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mt-8 max-w-2xl mx-auto text-xl text-gray-700 font-medium"
          >
            MandiPool makes it effortless for Pune food vendors to unite and
            purchase ultra-fresh produce at unbeatable rates—straight from the
            source, with no daily hassles.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.5 }}
            className="mt-12"
          >
            <button
              onClick={openLoginModal}
              className="inline-block bg-gradient-to-r from-green-500 via-teal-400 to-green-400 text-white text-xl font-bold px-10 py-5 rounded-full shadow-2xl hover:from-green-700 hover:via-emerald-600 hover:to-teal-500 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 focus:ring-2 focus:ring-green-400"
            >
              View Today's Prices
            </button>
          </motion.div>
        </div>
      </motion.main>

      {/* How It Works Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight drop-shadow-md">
              How It Works
            </h2>
            <p className="mt-3 text-lg text-gray-600">
              Three steps to group-powered produce savings.
            </p>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {/* Step Cards with glass effect */}
            {[
              {
                title: "Check Daily Prices",
                desc: "Log in each morning to find the lowest group prices on market-fresh produce.",
                num: 1,
                color: "from-green-200/60 via-white/40 to-green-100/60",
              },
              {
                title: "Place Your Order",
                desc: "Fill your cart—every zone’s orders are pooled for the juiciest bulk deals.",
                num: 2,
                color: "from-blue-100/60 via-white/40 to-blue-200/60",
              },
              {
                title: "Enjoy the Savings",
                desc: "Receive premium-quality produce, with deep discounts thanks to group buying.",
                num: 3,
                color: "from-purple-100/60 via-white/50 to-purple-200/60",
              },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                whileHover="hover"
                variants={stepCardVariants}
                className={`text-center relative p-6 rounded-3xl shadow-xl border border-gray-100 bg-gradient-to-br ${step.color} backdrop-blur-md transition-all`}
              >
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-green-400 to-blue-300 text-white mx-auto text-3xl font-extrabold shadow-lg drop-shadow-md">
                  {step.num}
                </div>
                <h3 className="mt-6 text-2xl font-bold text-gray-800">
                  {step.title}
                </h3>
                <p className="mt-3 text-gray-600 text-lg">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonial Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="py-20 relative z-20"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-green-50/60 via-white/60 to-transparent pointer-events-none"></div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl bg-white/70 shadow-xl backdrop-blur-md px-8 py-10"
          >
            <p className="text-3xl font-semibold text-gray-900 mb-4 leading-relaxed tracking-tight">
              “MandiPool has changed the way I run my business. I&apos;m saving
              at least{" "}
              <span className="text-green-600 font-extrabold">15%</span> on
              vegetables every day, and the quality is fantastic. It&apos;s so
              simple!”
            </p>
            <p className="mt-6 text-xl font-bold text-gray-700">
              — Gupta Chaat, FC Road
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer CTA */}
      <footer className="bg-gradient-to-r from-green-700 via-emerald-700 to-blue-600  z-30">
        <div className="max-w-7xl mx-auto py-14 px-4 sm:px-6 lg:py-18 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white drop-shadow-md tracking-tight">
            Ready to Save like Never Before?
          </h2>
          <p className="mt-4 text-xl text-gray-100">
            Dozens of Pune vendors have joined. Experience the group-buying
            revolution tomorrow.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
