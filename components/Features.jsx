import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import { useState, useRef } from "react";
import SlideButton from "./SlideButton";
import {
  Plane,
  BedDouble,
  PauseCircle,
  Calendar
} from "lucide-react";


const desktopData = [
  { label: 'Workout', value: 88, color: '#f97316' },
  { label: 'Meditation', value: 100, color: '#a855f7' },
  { label: 'Reading', value: 71, color: '#fb923c' },
];

const mobileData = [
  { label: 'Workout', value: 88, color: '#f97316' },
  { label: 'Reading', value: 71, color: '#fb923c' },
  { label: 'Meditation', value: 100, color: '#a855f7' },
];

const ProgressRing = ({ item, isMeditation, centerMeditation }) => (
  <div
    className={`text-center ${centerMeditation && isMeditation ? 'col-span-2' : ''
      }`}
  >
    <div
      className={`relative mx-auto mb-2
        ${isMeditation
          ? 'w-28 h-28 sm:w-32 sm:h-32'
          : 'w-20 h-20 sm:w-24 sm:h-24'
        }
      `}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 60 60"
        style={{ transform: 'rotate(-90deg)' }}
      >
        <circle
          cx="30"
          cy="30"
          r="25"
          fill="none"
          stroke="#374151"
          strokeWidth="3"
        />
        <circle
          cx="30"
          cy="30"
          r="25"
          fill="none"
          stroke={item.color}
          strokeWidth="3"
          strokeDasharray={`${item.value * 1.57} 157`}
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs sm:text-sm font-bold">
          {item.value}%
        </span>
      </div>
    </div>

    <p className="text-xs text-gray-300">{item.label}</p>
  </div>
);


const badges = [
  {
    label: "Weekend Flexibility",
    icon: Calendar,
    color: "rgb(59,130,246)", // blue
  },
  {
    label: "Rest Day Credit",
    icon: BedDouble,
    color: "rgb(34,197,94)", // green
  },
  {
    label: "Pause Streak Option",
    icon: PauseCircle,
    color: "rgb(37,99,235)", // indigo
  },
  {
    label: "Travel Mode Active",
    icon: Plane,
    color: "rgb(255,76,0)", // orange
  },
];

function BadgePill({ item }) {
  const Icon = item.icon;


  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-black/5  whitespace-nowrap"

    >
      <span
        className="flex items-center shadow-md justify-center w-8 h-8 rounded-full"
        style={{
          backgroundColor: item.color,
          boxShadow: `0px 8px 20px rgba(${item.color.replace(
            "rgb(",
            ""
          ).replace(")", "")}, 0.25)`,
        }}
      >
        <Icon className="w-4 h-4 text-white" />
      </span>

      <span className="text-sm font-medium text-gray-900">
        {item.label}
      </span>
    </motion.div>
  );
}

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };
  const duplicated = [...badges, ...badges, ...badges];
  const x = useMotionValue(0);
  const [dragging, setDragging] = useState(false);

  // Scroll trigger for dashboard helper image
  const helperRef = useRef(null);
  const { scrollYProgress: helperScrollY } = useScroll({
    target: helperRef,
    offset: ["start end", "end start"],
  });
  const helperY = useTransform(helperScrollY, [0, 1], [0, -50]);

  return (
    <motion.section
      id="whats-inside"
      className="w-full bg-[#F7F7F7] px-6 pb-20 "
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="mb-12">
          <motion.div variants={badgeVariants} className="inline-block mb-4">
            <div className="bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-black">
              Habits with structure
            </div>
          </motion.div>
          <div className='flex flex-col justify-between md:flex-row md:items-bottom md:gap-8'>
            <motion.h2
              variants={cardVariants}
              className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              A layout that keeps<br /> your day clear.
            </motion.h2>
            <motion.p
              variants={cardVariants}
              className="text-gray-600 max-w-md text-lg"
            >
              Habitline brings clarity to your routines with clean cards, realistic progress tracking,
              and guidance that adapts to your day.
            </motion.p>
          </div>
        </div>

        {/* Grid Layout */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
        >
          {/* Top Left - Flexible Streak Rules */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4 }}
            className="bg-gray-200 border border-gray-200 rounded-3xl p-8 md:col-span-1"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Flexible streak rules</h3>
            <p className="text-gray-800 text-lg mb-8">
              Traditional habit trackers are too rigid. Miss<br />one day and your 50-day streak is gone forever.
            </p>

            {/* 28 Day Streak Card */}
            <div className="bg-white rounded-2xl p-6 mb-6">
              <img src="streak-vector.svg" alt="" loading="lazy" decoding="async" />
            </div>
            {/* Habit Badges */}
            <div className="relative w-full overflow-hidden py-6">
              <motion.div
                className="flex gap-4 cursor-grab active:cursor-grabbing"
                style={{ x }}
                animate={
                  dragging
                    ? false
                    : { x: ["0%", "-50%"] } // 👉 right → left
                }
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
                drag="x"
                dragConstraints={{ left: -1000, right: 0 }}
                dragElastic={0.1}
                onDragStart={() => setDragging(true)}
                onDragEnd={() => setDragging(false)}
              >
                {duplicated.map((item, idx) => (
                  <BadgePill key={idx} item={item} />
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Top Right - Smart Daily Planner */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4 }}
            className="rounded-3xl p-8 text-white overflow-hidden relative"
            style={{ backgroundImage: "url('/card-2.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <h3 className="text-2xl font-bold mb-2">Smart daily planner</h3>
            <p className="text-white text-lg mb-8">
              A simple view that shows only the habits<br /> that match your current time of day.
            </p>

            {/* Phone Mockup */}
            <div className=" bg-gradient-to-b
  from-[rgba(19,21,21,0.3)]
  to-[rgba(19,21,21,0.5)]
  backdrop-blur-[40px] rounded-2xl p-4 border border-white/20 aspect-video flex items-center justify-center">
              <img src="smart-daily-planner.png" alt="" loading="lazy" decoding="async" />
            </div>
          </motion.div>

          {/* Middle Full Width - Routine Stacks */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4 }}
            className="overflow-hidden rounded-3xl p-8 text-white md:col-span-2 h-auto md:h-96 relative"
            style={{ backgroundImage: "url('/card-3.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden ">
              <div>
                <h3 className="text-2xl font-bold mb-3">Routine stacks</h3>
                <p className="text-gray-300 mb-6 text-lg">
                  Group habits into simple blocks so your day feels organized instead of scattered.
                </p>
                <SlideButton
                  className="bg-white text-gray-900 font-bold px-6 py-3 rounded-full hover:bg-gray-100 transition-colors"
                >
                  Start your routine now
                </SlideButton>
                <p className="text-gray-400 text-xs mt-4">
                  "Simple blocks help you stay on track without thinking."
                </p>
              </div>

              {/* Phone Mockup with Tasks */}
              <div ref={helperRef} className="mx-auto relative mt-8 md:mt-0 h-64 md:h-auto w-full flex justify-center">
                <motion.img style={{ y: helperY }} src="card-dashboard-helper.png" className='absolute -left-[15px] md:-left-[45px] top-[40px] md:top-[60px] w-32 md:w-48 z-10' alt="" loading="lazy" decoding="async" />
                <img src="/icons/mobile-dashboard-vector.svg" className="w-auto h-full overflow-hidden" alt="" loading="lazy" decoding="async" />
              </div>
            </div>
          </motion.div>

          {/* Bottom Left - Weekly Reflection */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4 }}
            className="bg-gray-800 rounded-3xl p-8 text-white"
            style={{ backgroundImage: "url('/card-4.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <h3 className="text-2xl font-bold mb-2">Weekly reflection</h3>
            <p className="text-gray-300 text-lg mb-8">
              A clear summary of your week that highlights what improved and what needs adjusting.
            </p>

            {/* Your week at a glance */}
            <div className="bg-gray-900 rounded-2xl p-6 mb-6">
              <p className="text-center text-white font-bold text-md  mb-6">Your week at a glance</p>

              {/* Progress Rings */}

              {/* Mobile */}
              <div className="grid grid-cols-2 gap-y-6 mb-8 sm:hidden">
                {mobileData.map((item, index) => {
                  const isMeditation = item.label === 'Meditation';

                  return (
                    <ProgressRing
                      key={index}
                      item={item}
                      isMeditation={isMeditation}
                      centerMeditation
                    />
                  );
                })}
              </div>

              {/* Desktop */}
              <div className="hidden sm:flex justify-around items-end mb-8">
                {desktopData.map((item, index) => {
                  const isMeditation = item.label === 'Meditation';

                  return (
                    <ProgressRing
                      key={index}
                      item={item}
                      isMeditation={isMeditation}
                    />
                  );
                })}
              </div>



              {/* Stats */}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5">
              <div className=" backdrop-blur-[30px] p-5 border font-bold bg-gradient-to-b from-[rgba(19,21,21,0.5)] to-[rgba(19,21,21,0.5)] border-white/20 rounded-3xl" >
                <div className='flex justify-between items-center gap-2 text-white mb-5'>
                  <p className="text-xl ">Streaks<br />completed</p>
                  <p className="text-3xl">12</p>
                </div>
                <p className="text-md text-gray-500">3 streaks improved</p>
              </div>
              <div className=" backdrop-blur-[30px] p-5 border font-bold bg-gradient-to-b from-[rgba(19,21,21,0.5)] to-[rgba(19,21,21,0.5)] border-white/20 rounded-3xl " >
                <div className='flex justify-between items-center gap-2 text-white mb-5'>
                  <p className="text-xl ">Focused<br />sessions</p>
                  <p className="text-3xl ">07</p>
                </div>
                <p className="text-md text-gray-500">Total time: 4h 20m</p>
              </div>
            </div>

          </motion.div>

          {/* Bottom Right - Gentle Reminders */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4 }}
            className="bg-black rounded-3xl p-8 text-white relative overflow-hidden"
          >
            <h3 className="text-2xl font-bold mb-2">Gentle reminders</h3>
            <p className="text-gray-300 text-lg mb-8">
              Short, calm nudges that help you stay consistent without pushing too hard.
            </p>

            {/* Notification Popup */}
            <div className="md:h-[80%] h-auto flex items-center justify-center ">
              <div className=" 
              relative
  
  h-min
  p-10

  border
  border-white/10
  rounded-[20px]

  bg-white/10
  backdrop-blur-[50px]

  shadow-[0px_8px_20px_0px_rgba(19,21,21,0.05)]

  overflow-visible">
                <motion.img
                  src="/icons/bell.png"
                  className="w-20 absolute -top-10 -left-8 origin-top"
                  animate={{ rotate: [0, -10, 10, -6, 6, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  alt=""
                />

                <div className="flex items-start gap-3 mb-4">

                  <div>
                    <p className="text-sm text-gray-400">8:30 PM • Evening Wind-Down</p>
                    <p className="text-lg font-bold text-white">Take a 5-minute break</p>
                    <p className="text-sm text-gray-400">You've been focused for a while.</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-white text-gray-900 text-xs font-bold py-2 rounded-lg hover:bg-gray-100"
                  >
                    I'm on it
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 border border-gray-600 text-white text-xs font-bold py-2 rounded-lg hover:bg-gray-700"
                  >
                    Later
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
