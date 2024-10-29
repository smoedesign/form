"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FaTwitter, FaInstagram, FaBehance, FaFacebookF, FaLinkedinIn } from 'react-icons/fa'
import Image from 'next/image'
import { useRef } from "react";
import Contact from '@/app/actions/mail'


export function ComingSoonComponent() {

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col justify-center items-center p-4">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="mb-8"
      >
      <Image alt='smoedesign logo' src={"logo.svg"} width={120} height={120} />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-5xl font-bold mb-8 text-center"
      >
        SMOE DESIGN
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xl mb-12 text-center max-w-md"
      >
        Crafting digital experiences that inspire and engage. 
        We're working hard to bring you something amazing.
      </motion.div>

    

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-xl mb-6 text-center max-w-md"
      >
        join our waiting list!
      </motion.div>

    <Contact />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-lg mb-8 text-center"
      >
        For more information, send us a mail at{' '}
        <a href="mailto:hello@smoedesign.com" className="text-blue-400 hover:text-blue-300 transition-colors">
          hello@smoedesign.com
        </a>
      </motion.div>

      <div className="flex space-x-4">
        <a href="https://x.com/smoedesign" className="text-gray-400 hover:text-white transition-colors">
          <FaTwitter size={24} />
        </a>
        <a href="https://www.instagram.com/smoedesign/" className="text-gray-400 hover:text-white transition-colors">
          <FaInstagram size={24} />
        </a>

        <a href="https://www.facebook.com/smoedesign.fb/" className="text-gray-400 hover:text-white transition-colors">
          <FaFacebookF size={24} />
        </a>
        <a href="https://tr.linkedin.com/company/smoedesign-linkedin" className="text-gray-400 hover:text-white transition-colors">
          <FaLinkedinIn size={24} />
        </a>
      </div>
    </div>
  )
}