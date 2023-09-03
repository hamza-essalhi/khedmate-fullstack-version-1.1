import React from 'react'
import { motion } from "framer-motion";
export default function Message ({ messages }) {
   
    return (
      <motion.div
      variants={{
          start: {
              x: -10,
          },
          end: {
              x: 0,
          },
      }}
      initial="start"
      animate="end"
      transition={{
          duration: 3,
          delay: 0.1,
      }} className='message-alert'>
        {messages.messages.map((message, index) => (
          <motion.div
          variants={{
              start: {
                  x: 400,
              },
              end: {
                  x: 0,
              },
          }}
          initial="start"
          animate="end"
          transition={{
              duration: 1,
              delay: 0.1,
          }} key={index}>{message}</motion.div>
        ))}
      </motion.div>
    );
  };
