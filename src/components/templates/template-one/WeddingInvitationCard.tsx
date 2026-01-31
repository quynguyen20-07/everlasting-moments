import { motion } from "framer-motion";

type InvitationCardProps = {
  groomName: string;
  brideName: string;
  dateText: string;
  timeText: string;
  location: string;
  address: string;
};

const WeddingInvitationCard = ({
  groomName,
  brideName,
  dateText,
  timeText,
  location,
  address,
}: InvitationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="
        relative
        w-full
        min-h-[525px]
        bg-white
        p-6
        flex
        items-center
        justify-center
        shadow-[0px_4px_16px_0px_#00000040]
      "
    >
      {/* Góc trái trên */}
      <span className="pointer-events-none absolute top-3 left-3 w-1/3 h-1/3 border-t-2 border-l-2 border-gray-300" />

      {/* Góc phải dưới */}
      <span className="pointer-events-none absolute bottom-3 right-3 w-1/3 h-1/3 border-b-2 border-r-2 border-gray-300" />

      {/* Inner border */}
      <div className="w-full h-full px-6 py-10 text-center flex flex-col justify-between">
        {/* Header */}
        <p className="font-['Aleo'] text-sm tracking-wide mb-6">
          TIỆC MỪNG LỄ THÀNH HÔN
        </p>

        {/* Names */}
        <div>
          <h1 className="font-['Playfair_Display'] text-3xl font-semibold tracking-wide">
            {groomName?.toUpperCase()}
          </h1>

          <p className="font-['Great_Vibes'] text-2xl my-2">and</p>

          <h1 className="font-['Playfair_Display'] text-3xl font-semibold tracking-wide mb-6">
            {brideName?.toUpperCase()}
          </h1>
        </div>

        {/* Time */}
        <div>
          <p className="font-['Aleo'] text-sm mb-2">ĐƯỢC TỔ CHỨC VÀO LÚC</p>
          <p className="font-['Aleo'] text-sm font-medium">
            {timeText} | {dateText}
          </p>
        </div>

        {/* Location */}
        <div className="mt-6">
          <h2 className="font-['Playfair_Display'] text-xl font-semibold mb-2">
            {location.toUpperCase()}
          </h2>
          <p className="font-['Aleo'] text-xs leading-relaxed mb-6">
            {address}
          </p>
        </div>

        {/* Footer */}
        <div>
          <p className="font-['Great_Vibes'] text-sm italic mb-6">
            Sự hiện diện của Quý khách là niềm vinh hạnh cho gia đình chúng tôi!
          </p>

          <div className="flex justify-center">
            <motion.img
              src="https://res.cloudinary.com/nguyen-the-quy/image/upload/v1769888849/Vowly/vkwwr3lsf6mvlizt5ibr.png"
              alt="decorative divider"
              className="w-[120px] h-auto opacity-80"
              animate={{ y: [0, -2, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeddingInvitationCard;
