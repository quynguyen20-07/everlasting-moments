import { motion } from "framer-motion";

type TopAlbumCoverProps = {
  image: string;
};

const TopAlbumCover = ({ image }: TopAlbumCoverProps) => {
  return (
    <section className="relative w-full overflow-hidden py-6">
      {/* Background image */}
      <img
        src={image}
        alt="Top Album Cover"
        className="w-full h-auto object-cover"
      />

      {/* Text overlay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="
          absolute
          bottom-10
          right-8
          text-right
          pointer-events-none
        "
      >
        {/* Just */}
        <div
          className="
            font-['1FTV_VIP_Anisa_Signature']
            font-normal
            text-[96px]
            leading-[95px]
            text-white
          "
        >
          Just
        </div>

        {/* Married */}
        <div
          className="
            font-['1FT_VIP_Asbor_Fashion']
            font-normal
            text-[51.61px]
            leading-[57.34px]
            text-white
            -mt-2
          "
        >
          Married
        </div>
      </motion.div>
    </section>
  );
};

export default TopAlbumCover;
