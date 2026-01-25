
import { motion, useMotionValue } from 'motion/react';
import { Star } from 'lucide-react';
import SlideButton from './SlideButton';
import { useState } from "react";

const cardDataLeft = [
  {
    id: 1,
    type: 'image',
    image: '/phone-off.png',
    label: 'Phone off',
  },
  {
    id: 2,
    type: 'text',
    icon: 'icons/walking.svg',
    bgColor: '#FF4C00',
    label: 'Morning Walk',
  },
  {
    id: 3,
    type: 'image',
    image: '/women-stretching.png',
    label: 'stretching',
  },
  {
    id: 4,
    type: 'text',
    icon: 'icons/phone-off.svg',
    bgColor: '#0283A7',
    label: 'Phone off by 10:30',
  },
];

const cardDataRight = [
  {
    id: 1,
    type: 'text',
    icon: 'icons/water-drop.svg',
    bgColor: '#0059ff',
    label: 'Track water',
  },
  {
    id: 2,
    type: 'image',
    image: '/bottle.png',
    label: 'Water bottle',
  },
  {
    id: 3,
    type: 'text',
    icon: 'icons/write-journal.svg',
    bgColor: '#FF00A1',
    label: 'Write journal',
  },
  {
    id: 4,
    type: 'image',
    image: '/write-journal.png',
    label: 'Write journal',
  },
];

const CardItem = ({ item }) => {
  if (item.type === 'image') {
    return (
      <motion.div
        className="flex-shrink-0 w-40 h-40 rounded-3xl overflow-hidden shadow-lg"
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.label}
          className="w-full h-full object-cover"
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex-shrink-0 w-40 h-40 bg-white rounded-3xl shadow-lg flex flex-col items-center justify-center p-5 text-center"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className={`text-4xl mb-2 p-3 bg-[${item.bgColor}] rounded-3xl shadow-[0px_10px_15px_0px_rgba(${item.bgColor})] `} style={{
        backgroundColor: item.bgColor,
        boxShadow: `0px 10px 15px 0px rgba(${item.bgColorRgb}, 0.5)`
      }}><img
          src={item.icon || "/placeholder.svg"}
          alt={item.label}
          className="w-6 h-6  object-contain"
        /></div>
      <p className="text-md font-semibold text-gray-900">{item.label}</p>
    </motion.div>
  );
};

const InfiniteCarousel = ({ items, direction = "left" }) => {
  const duplicatedItems = [...items, ...items, ...items];
  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="relative w-full overflow-hidden py-8">
      <motion.div
        className="flex gap-4 cursor-grab active:cursor-grabbing"
        style={{ x }}
        animate={
          isDragging
            ? false
            : {
              x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
            }
        }
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        drag="x"
        dragConstraints={{ left: -1000, right: 0 }}
        dragElastic={0.1}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
      >
        {duplicatedItems.map((item, idx) => (
          <CardItem key={`${item.id}-${idx}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
};
export default function BuildSteadyDaily() {
  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="w-full pb-20 md:pb-60 px-6 bg-[#F7F7F7] relative overflow-hidden ">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <motion.span
              className="text-3xl md:text-5xl font-bold text-gray-900 max-w-5xl"
              custom={0}
              variants={headingVariants}
            >
              Build steady daily{' '}
              <div className="inline-block h-12 w-25 overflow-hidden rounded-3xl align-middle relative">

                {/* Image 1 */}
                <motion.img
                  src="/cycling.png"
                  className="absolute inset-0 h-12 w-25 rounded-3xl object-cover"
                  animate={{ opacity: [1, 1, 0] }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.28, 0.38],
                  }}
                />

                {/* Image 2 */}
                <motion.img
                  src="/women.png"
                  className="absolute inset-0 h-12 w-25 rounded-3xl object-cover"
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0.28, 0.38, 0.72, 0.82],
                  }}
                />

                {/* Image 3 */}
                <motion.img
                  src="/flower.png"
                  className="absolute inset-0 h-12 w-25 rounded-3xl object-cover"
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0.68, 0.78, 1, 1],
                  }}
                />

              </div>
              {' '}
              habits with a <br /> layout that keeps your mornings,<br /> evenings,{' '}
              <span className="inline-block"><div className='inline-block h-12 w-15 pt-1'><img src="/icons/sun-cloude.svg" className='' alt="" srcset="" /></div> and focus</span> simple to follow.
            </motion.span>
          </div>

          <motion.p variants={itemVariants} className="text-gray-600 text-xl font-semibold mt-12 mb-4">
            Used by people to improve routines.
          </motion.p>

          <motion.div variants={itemVariants} className="flex justify-center gap-3 flex-wrap">
            {['#Mornings', '#Routines', '#Busy parents', '#Remote teams'].map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-gray-200 text-black font-medium  rounded-full text-sm font-medium">
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Carousels with Phone Mockup */}

        {/* Carousels with Phone Mockup */}

        <motion.div
          className="relative mb-12 flex items-center justify-center flex-col min-h-[60vh] md:h-[100vh]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <InfiniteCarousel items={cardDataLeft} direction="left" />

          {/* Phone Mockup */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-60 md:w-80"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="relative w-full overflow-hidden">
              {/* Phone Screen */}
              <img
                src="/dashboard-mockup.png"
                alt="App interface"
                className="w-full h-full object-cover"
              />
              {/* Notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl" />
            </div>
          </motion.div>

          <InfiniteCarousel items={cardDataRight} direction="right" />
        </motion.div>

        {/* Rating and Download */}
        <motion.div
          className="flex flex-col items-center gap-6 "
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Rating */}
          <motion.div variants={itemVariants} className="flex items-center gap-2">

            <span className="  bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-sm font-semibold text-gray-700">
              <div className='flex items-center gap-2'>
                <Star

                  size={16}
                  className="fill-orange-400 text-orange-400"
                /> 4.7 rating <span className=' text-gray-500'>(based on 120 reviews)</span></div></span>
          </motion.div>

          {/* Description */}
          <motion.p variants={itemVariants} className="text-center text-lg font-medium text-gray-600 max-w-2xl z-10">
            Stay consistent with a system that fits into real life. Simple cards,<br /> clear routines, and gentle pushes help
            you build streaks that lasts.
          </motion.p>

          {/* Download Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4 z-10 w-full md:w-auto">
            <SlideButton
              className="flex items-center justify-center gap-2 px-8 py-4 bg-black text-white rounded-full font-semibold"
            >
              <span className="flex items-center gap-2">
                <img src="/icons/apple-logo.svg" className="w-4" alt="" />
                Download for iPhone
              </span>
            </SlideButton>

            <SlideButton
              className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-200 text-gray-900 rounded-full font-semibold"
            >
              <span className="flex items-center gap-2">
                <img src="/icons/android-logo.svg" className="w-4" alt="" />
                Get it on Android
              </span>
            </SlideButton>
          </motion.div>

        </motion.div>

        {/* Section Divider with Clouds */}
        <div className="absolute bottom-0 left-0 w-full h-64 ">
          <div className="w-full h-full scale-100">
            {/* Cloud Left - Fade in from left */}
            <motion.img
              src="/cloud-left.png"
              alt="Cloud left"
              className="absolute bottom-0 left-0 w-64 h-auto"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            />

            {/* Cloud Center - Fade in from bottom */}
            <motion.img
              src="/cloud-center.png"
              alt="Cloud center"
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-auto"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            />

            {/* Cloud Right - Fade in from right */}
            <motion.img
              src="/cloud-right.png"
              alt="Cloud right"
              className="absolute bottom-0 right-0 w-64 h-auto"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
