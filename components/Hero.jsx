'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { Play } from 'lucide-react';
import { useRef } from 'react';
import SlideButton from './SlideButton';
export default function Hero() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  });

  // Left vector: pt-40 → pt-0
  const leftPaddingTop = useTransform(scrollYProgress, [0, 1], [160, 0]);

  // Right vector: pt-0 → pt-40
  const rightPaddingTop = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen pt-32 md:pt-50 px-6 overflow-hidden"
      id="hero"
    >
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage:
            'url(/hero.png)',

          backgroundPosition: 'top center',

        }}
      />

      {/* Dark Overlay */}
      <div
        className="absolute inset-0 z-5"
        style={{
          backgroundColor: '#131515',
          opacity: 0.4,
        }}
      />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Top Section with Tagline */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <div className="inline-flex items-center font-bold gap-3 bg-white/10 backdrop-blur-md px-1 py-1 rounded-full border border-white/20">
            <span className="inline-flex items-center justify-center bg-gray-800 text-white text-xs font-semibold px-3 py-1 rounded-full">
              New
            </span>
            <span className="text-white text-sm font-medium pe-2">
              A calmer way to build habits
            </span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl lg:text-8xl font-bold text-white text-center mb-6 leading-tight"
        >
          Build habits that <br /> actually stick
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-white font-bold text-center mb-10 max-w-2xl mx-auto"
        >
          You see the right habits at the right<br />time so your day never feels
          crowded.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16 text-lg font-semibold"
        >
          <SlideButton
            className="px-8 py-3 bg-white text-gray-900 rounded-full shadow-lg"
          >
            Start tracking for free
          </SlideButton>
          <SlideButton
            className="px-8 py-3 bg-gradient-to-b from-white/0 to-white/10  border-2 border-white/20 text-white rounded-full flex items-center justify-center gap-2"
          >
            <span className="flex items-center gap-2">
              <Play className="w-5 h-5 fill-white" />
              Watch demo
            </span>
          </SlideButton>
        </motion.div>

        {/* Phone Mockups Section */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row gap-6 justify-center w-full md:w-3/4 mx-auto"
        >
          {/* Mobile Top Row (Left + Right) */}
          <div className="flex gap-4 justify-center md:hidden">
            {/* Left Vector */}
            <motion.div
              style={{ paddingTop: leftPaddingTop }}
              className="w-1/2 max-w-[160px]"
            >
              <img
                src="/hero-vector-left.svg"
                alt="Left illustration"
                loading="eager"
                fetchpriority="high"
                className="w-full h-auto border border-[8px] border-white/10 rounded-3xl shadow-lg"
              />
            </motion.div>

            {/* Right Vector */}
            <motion.div
              style={{ paddingTop: rightPaddingTop }}
              className="w-1/2 max-w-[160px]"
            >
              <img
                src="/hero-vector-right.svg"
                alt="Right illustration"
                loading="eager"
                fetchpriority="high"
                className="w-full h-auto border border-[8px] border-white/10 rounded-3xl shadow-lg"
              />
            </motion.div>
          </div>

          {/* Desktop Left Vector */}
          <motion.div
            style={{ paddingTop: leftPaddingTop }}
            className="hidden md:block w-full max-w-[200px]"
          >
            <img
              src="/hero-vector-left.svg"
              alt="Left illustration"
              loading="eager"
              fetchpriority="high"
              className="w-full h-auto border border-[8px] border-white/10 rounded-3xl shadow-lg"
            />
          </motion.div>

          {/* Center Vector */}
          <motion.div className="relative w-[20rem] md:w-[40rem] max-w-md mx-auto">
            <img
              src="/hero-vector-main.svg"
              alt="Main illustration"
              loading="eager"
              fetchpriority="high"
              className="w-full h-auto border border-[8px] border-white/10 rounded-3xl shadow-lg"
            />
          </motion.div>

          {/* Desktop Right Vector */}
          <motion.div
            style={{ paddingTop: rightPaddingTop }}
            className="hidden md:block w-full max-w-[200px]"
          >
            <img
              src="/hero-vector-right.svg"
              alt="Right illustration"
              loading="eager"
              fetchpriority="high"
              className="w-full h-auto border border-[8px] border-white/10 rounded-3xl shadow-lg"
            />
          </motion.div>
        </motion.div>

      </motion.div>

      {/* Hero Divider */}
      <div className="absolute bottom-0 left-0 right-0 w-full z-10">
        <div className='h-15 absolute bottom-0 left-0 right-0 w-full bg-[#F7F7F7]'  ></div>
        <img
          src="/hero-divider.svg"
          alt="Section divider"
          className="w-full h-auto scale-x-125"
          style={{ filter: 'blur(25px)' }}
        />

      </div>
    </section>
  );
}
