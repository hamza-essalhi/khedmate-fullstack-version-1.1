
import React from 'react'
import { motion } from "framer-motion";
import loadingImg from '../../images/Spinner-1s-200px.png'
function Loading() {
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
                duration: 0.5,
                delay: 0.1,
            }}
            className="loading"
        >
            <img src={loadingImg} alt="" />
        </motion.div>
    )
}

export default Loading