// @ts-ignore
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { motion } from "framer-motion";

import "@splidejs/react-splide/css";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

const SlideShow = ({ images }: { images: string[] }) => {
  const [hovering, setHovering] = useState(false);
  return (
    <Splide
      options={{
        autoplay: "true",
        perPage: 1,
        start: 0,
        rewind: true,
        padding: {left:'3rem',right:'3rem'},
        gap: "1rem",
      }}
      hasTrack={false}
    >
      <SplideTrack>
        {images.map((image, idx) => (
          <SplideSlide key={idx} className="flex items-center">
            <Dialog>
              <DialogTrigger
                className="relative"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
              >
                <Image
                  src={image}
                  alt="screenshot"
                  width={1000}
                  height={1000}
                  className="w-full rounded-lg h-auto"
                />
                <AnimatePresence>
                  {hovering && (
                    <motion.div
                      className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 text-white backdrop-blur-[1px]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Click to zoom
                    </motion.div>
                  )}
                </AnimatePresence>
              </DialogTrigger>
              <DialogContent className="m-0 flex h-[90svh] w-[calc(100vw-2rem)] max-w-6xl flex-col border-none bg-transparent p-0 outline-none">
                <DialogHeader className="w-full">
                  <DialogTitle className="sr-only">
                    Project screenshots
                  </DialogTitle>
                  <DialogDescription>
                    {image.split("/").pop()}
                  </DialogDescription>
                </DialogHeader>
                <Image
                  src={image}
                  alt="screenshot"
                  width={1000}
                  height={1000}
                  className="min-h-0 w-full flex-1 object-contain"
                />
              </DialogContent>
            </Dialog>
          </SplideSlide>
        ))}
      </SplideTrack>
      <div className="splide__progress">
        <div className="splide__progress__bar"></div>
      </div>
    </Splide>
  );
};
export default SlideShow;
