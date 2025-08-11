import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const DashBoard = () => {
  const [show, setShow] = useState(true);

  setTimeout(() => {
    setShow(false);
  }, 3000);


  return (
    <div className="h-screen ">
      <div className="flex justify-center items-center h-screen">
        <AnimatePresence>
          {show && (
            <motion.div
              exit={{
                opacity: 0,
                y:-50
              }}
              transition={{
                duration: 1,
              }}
            >
              <div className="overflow-y-hidden h-20">
                <motion.div
                  initial={{
                    opacity: 0,
                    filter: "blur(5xl)",
                    y: 50,
                  }}
                  animate={{
                    opacity: 100,
                    y: 0,
                  }}
                  transition={{
                    duration: 1,
                  }}
                  className="text-6xl font-[600]"
                >
                  Welcome To MasterJi's Playlist
                </motion.div>
              </div>
              <div className="overflow-hidden w-100 mx-auto">
                <motion.p
                  initial={{
                    x: -500,
                  }}
                  animate={{
                    x: 0,
                  }}
                  transition={{
                    duration: 2,
                    ease: "circOut",
                  }}
                  className="text-center text-3xl text-muted-foreground"
                >
                  Play what's in your mood
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

          {
            !show && (
              <motion.div
                initial={{
                  opacity:0,
                  y:100,
                  scale:0.9,
                  borderRadius:"30px"
                }}
                animate={{
                  opacity:100,
                  y:0,
                  scale:1,
                  borderRadius:"0"
                }}
                transition={{
                  duration:1.2,
                }}
                className="absolute bg-red-500 h-screen w-full scale"
              >
                aryan
              </motion.div>
            )
          }
       
      </div>
    </div>
  );
};

export default DashBoard;
