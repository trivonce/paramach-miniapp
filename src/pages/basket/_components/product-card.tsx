"use client"

import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion"
import { useState, useRef } from "react"
import { Trash } from "lucide-react"
import AddButton from "@/components/add-button"

const ProductCard = () => {
  const [isDeleted, setIsDeleted] = useState(false)
  const dragX = useMotionValue(0)
  const controls = useAnimation()
  const threshold = 80
  const isAtThreshold = useRef(false)

  const progress = useTransform(dragX, [-threshold, 0], [1, 0], { clamp: true })

  const radius = 12
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = useTransform(progress, (p) => circumference * (1 - p))

  if (isDeleted) {
    return null
  }

  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-end px-4 pointer-events-none">
        <div className="relative w-10 h-10">
          <svg className="absolute w-10 h-10" viewBox="0 0 28 28">
            <motion.circle
              cx="14"
              cy="14"
              r={radius}
              fill="none"
              stroke="red"
              strokeWidth="1"
              strokeDasharray={circumference}
              style={{ strokeDashoffset }}
            />
          </svg>
          <motion.div style={{ opacity: progress }} className="absolute inset-0 flex items-center justify-center">
            <Trash className="w-5 h-5 text-red-500" />
          </motion.div>
        </div>
      </div>

      <motion.div
        drag="x"
        style={{ x: dragX }}
        dragDirectionLock
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.5}
        onDrag={(_, info) => {
          let newX = Math.min(0, info.offset.x)

          if (newX <= -threshold) {
            newX = -threshold
            isAtThreshold.current = true
          } else {
            isAtThreshold.current = false
          }

          dragX.set(newX)
        }}
        onDragEnd={() => {
          if (isAtThreshold.current) {
            controls
              .start({
                x: -300,
                opacity: 0,
                transition: {
                  type: "tween",
                  duration: 0.5,
                  ease: "easeOut",
                },
              })
              .then(() => {
                setIsDeleted(true)
              })
          } else {
            controls.start({
              x: 0,
              transition: {
                type: "tween",
                duration: 2,
                ease: [0.16, 1, 0.3, 1],
              },
            })

            const resetDragX = () => {
              const currentX = dragX.get()
              if (Math.abs(currentX) < 0.1) {
                dragX.set(0)
                return
              }
              dragX.set(currentX * 0.95)
              requestAnimationFrame(resetDragX)
            }
            resetDragX()
          }
        }}
        animate={controls}
        className="dark:bg-gray-900 bg-white rounded-xl flex items-stretch gap-4 overflow-hidden relative"
      >
        <div className="w-[120px] relative z-[1] flex items-center overflow-hidden">
          <img
            className="absolute left-0 top-0 w-full h-full object-cover -z-[1] blur-sm"
            src="https://placehold.co/600x400"
            alt="placeholder"
          />
          <img className="object-contain" src="https://placehold.co/600x400" alt="Product" />
        </div>

        <div className="flex flex-col justify-between py-2">
          <div className="mb-3">
            <h1 className="font-medium">Shakaladli Paramach</h1>
            <p className="mt-1 dark:text-gray-300 text-sm font-baloo">7000 so'm</p>
          </div>
          <AddButton className="w-[120px]" />
        </div>
      </motion.div>
    </div>
  )
}

export default ProductCard

