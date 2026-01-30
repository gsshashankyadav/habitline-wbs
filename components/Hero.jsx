'use client';

import { motion, useScroll, useTransform, easeInOut } from 'motion/react';
import { Play } from 'lucide-react';
import { useRef } from 'react';
import SlideButton from './SlideButton';
export default function Hero() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  });

  const imageRef = useRef(null);

  const { scrollYProgress: imageScroll } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(imageScroll, [0, 1], [0, 100], { ease: easeInOut });

  // Left vector: pt-40 → pt-0
  const leftPaddingTop = useTransform(scrollYProgress, [0, 1], [120, 0, 160], { ease: easeInOut });

  // Right vector: pt-0 → pt-40
  const rightPaddingTop = useTransform(scrollYProgress, [0, 1], [120, 160, 0], { ease: easeInOut });
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
      className="relative w-full min-h-screen pt-[160px] md:pt-50 px-6 overflow-hidden"
      id="hero"
    >
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage:
            'url(/hero.png)',

          backgroundPosition: ' 61% center',
          backgroundSize: 'cover',

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
        <motion.div variants={itemVariants} className="flex justify-center mb-5">
          <div className="inline-flex items-center font-bold gap-[10px] bg-white/10 backdrop-blur-md p-[6px] rounded-full border border-white/20">
            <span className="inline-flex items-center justify-center bg-[#131515] text-white text-sm font-semibold px-[8px] rounded-full">
              New
            </span>
            <span className="text-white text-sm font-medium pe-3">
              A calmer way to build habits
            </span>
          </div>
        </motion.div>

        {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-[44px] md:text-6xl lg:text-[90px] font-medium text-white text-center mb-5 md:mb-10 leading-[1]"
          >
            Build <br className="md:hidden"/>habits that<br className="hidden md:block"/> actually stick
          </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-[22px] text-white font-medium text-center mb-5 mx-auto md:mb-10 leading-[1.4]"
          style={{ fontFamily: `"Google Sans Flex Variable","Google Sans Flex Variable Placeholder",sans-serif` }}
        >
          You see the right habits at the right<br className=" "/> time so your day never feels
          crowded.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-[50px] text-lg font-medium leading-[1.2]"
        >
          <SlideButton
            className="px-[26px] text-[16px] py-[12px] md:px-[34px] md:text-[18px] md:py-[16px] bg-white text-gray-900 rounded-full shadow-lg w-fit"
          >
            Start tracking for free
          </SlideButton>
          <SlideButton
            className="px-[26px] text-[16px] py-[12px] md:px-[34px] md:text-[18px] md:py-[16px] bg-gradient-to-b from-white/0 to-white/10  border-2 border-white/20 text-white rounded-full flex items-center justify-center gap-2 w-fit"
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
          className="flex flex-col md:flex-row gap-2 md:gap-[40px] md:justify-center w-full md:w-3/4 mx-auto overflow-hidden h-[70vh] "
        >
          {/* Mobile Top Row (Left + Right) */}
          <div className="flex gap-4 justify-center md:hidden">
            {/* Left Vector */}
            <motion.div
              
              className="w-1/2 max-w-[160px]"
            >
              <img
                src="/hero-vector-left.svg"
                alt="Left illustration"
                loading="eager"
                fetchpriority="high"
                className="w-full h-auto border border-[4px] border-white/10 rounded-3xl shadow-lg"
              />
            </motion.div>

            {/* Right Vector */}
            <motion.div
             
              className="w-1/2 max-w-[160px]"
            >
              <img
                src="/hero-vector-right.svg"
                alt="Right illustration"
                loading="eager"
                fetchpriority="high"
                className="w-full h-auto border border-[4px] border-white/10 rounded-3xl shadow-lg"
              />
            </motion.div>
          </div>
          <motion.div className="block md:hidden relative w-[70%] mx-auto"   >
            <motion.img ref={imageRef} style={{ y }}
              src="/hero-vector-main.svg"
              alt="Main illustration"
              loading="eager"
              fetchpriority="high"
              className="w-full h-auto border border-[4px] border-white/10 rounded-3xl shadow-lg"
            />
          </motion.div>
          {/* Desktop Left Vector */}
          <motion.div
            style={{ paddingTop: leftPaddingTop }}
            className="hidden md:block w-full max-w-[240px] pt-20"
          >
            <img
              src="/hero-vector-left.svg"
              alt="Left illustration"
              loading="eager"
              fetchpriority="high"
              className="w-full h-auto border border-[6px] border-white/10 rounded-[16px] shadow-lg"
            />
          </motion.div>

          {/* Center Vector */}
          <motion.div className="hidden md:block relative w-[360px]" >
            <img
              src="/hero-vector-main.svg"
              alt="Main illustration"
              loading="eager"
              fetchpriority="high"
              className="w-full h-auto border border-[6px] w-[453px] border-white/10 rounded-[50px] shadow-lg"
            />
          </motion.div>

          {/* Desktop Right Vector */}
          <motion.div
            style={{ paddingTop: rightPaddingTop }}
            className="hidden md:block w-full max-w-[240px] pt-30"
          >
            <img
              src="/hero-vector-right.svg"
              alt="Right illustration"
              loading="eager"
              fetchpriority="high"
              className="w-full h-auto border border-[6px] border-white/10 rounded-[16px] shadow-lg"
            />
          </motion.div>
        </motion.div>

      </motion.div>

      {/* Hero Divider */}
      <div className="absolute bottom-0 left-0 right-0 w-full z-10">
        <div className='h-5 md:h-15 absolute bottom-0 left-0 right-0 w-full bg-[#F7F7F7]'  ></div>
        <img
          src="/hero-divider.svg"
          alt="Section divider"
          className="w-full h-auto scale-x-125 blur-[10px] md:blur-[25px]"
          
        />

      </div>
    </section>
  );
}
