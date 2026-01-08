import { Users, Send } from "lucide-react";
import { motion } from "framer-motion";
import { ColorScheme } from "@/types";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

export type RSVPData = {
  name: string;
  phone: string;
  guests: number | string;
  attending: boolean;
};

export type RSVPSectionProps = {
  colors: ColorScheme;
  rsvpData: RSVPData;
  setRsvpData: React.Dispatch<React.SetStateAction<RSVPData>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const RSVPSection: React.FC<RSVPSectionProps> = ({
  colors,
  rsvpData,
  setRsvpData,
  onSubmit,
}) => {
  return (
    <section
      id="rsvp"
      className="py-20 md:py-28"
      style={{ background: `${colors.accent}05` }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <Users
            className="w-14 h-14 mx-auto mb-6"
            style={{ color: colors.primary }}
          />
          <h2
            className="font-display text-4xl md:text-5xl font-bold mb-4"
            style={{ color: colors.text }}
          >
            Xác Nhận Tham Dự
          </h2>
          <p className="text-lg" style={{ color: colors.muted }}>
            Vui lòng cho chúng tôi biết bạn có thể tham dự hay không
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={onSubmit}
          className="max-w-2xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label
                className="block text-sm font-semibold mb-3"
                style={{ color: colors.text }}
              >
                Tên của bạn *
              </label>
              <Input
                placeholder="Nhập tên đầy đủ"
                value={rsvpData.name}
                onChange={(e) =>
                  setRsvpData({ ...rsvpData, name: e.target.value })
                }
                required
                className="rounded-xl border-2 p-4"
                style={{
                  borderColor: `${colors.primary}30`,
                  background: "white",
                }}
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold mb-3"
                style={{ color: colors.text }}
              >
                Số điện thoại *
              </label>
              <Input
                placeholder="Nhập số điện thoại"
                value={rsvpData.phone}
                onChange={(e) =>
                  setRsvpData({ ...rsvpData, phone: e.target.value })
                }
                required
                className="rounded-xl border-2 p-4"
                style={{
                  borderColor: `${colors.primary}30`,
                  background: "white",
                }}
              />
            </div>
            <div className="md:col-span-2">
              <label
                className="block text-sm font-semibold mb-3"
                style={{ color: colors.text }}
              >
                Số người tham dự *
              </label>
              <Input
                type="number"
                min="1"
                max="10"
                value={rsvpData.guests}
                onChange={(e) =>
                  setRsvpData({ ...rsvpData, guests: e.target.value })
                }
                required
                className="rounded-xl border-2 p-4"
                style={{
                  borderColor: `${colors.primary}30`,
                  background: "white",
                }}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button
              type="button"
              size="lg"
              className={`flex-1 rounded-xl py-6 text-lg font-semibold transition-all ${
                rsvpData.attending ? "shadow-lg scale-105" : ""
              }`}
              style={{
                background: rsvpData.attending
                  ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
                  : `${colors.accent}20`,
                color: rsvpData.attending ? "white" : colors.text,
                border: `2px solid ${
                  rsvpData.attending ? colors.primary : `${colors.primary}30`
                }`,
              }}
              onClick={() => setRsvpData({ ...rsvpData, attending: true })}
            >
              💖 Sẽ Tham Dự
            </Button>
            <Button
              type="button"
              size="lg"
              className={`flex-1 rounded-xl py-6 text-lg font-semibold transition-all ${
                !rsvpData.attending ? "shadow-lg scale-105" : ""
              }`}
              style={{
                background: !rsvpData.attending
                  ? `linear-gradient(135deg, ${colors.muted} 0%, ${colors.text}80 100%)`
                  : `${colors.accent}20`,
                color: !rsvpData.attending ? "white" : colors.text,
                border: `2px solid ${
                  !rsvpData.attending ? colors.muted : `${colors.primary}30`
                }`,
              }}
              onClick={() => setRsvpData({ ...rsvpData, attending: false })}
            >
              😔 Không Tham Dự
            </Button>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full rounded-xl py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            style={{
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
              color: "white",
            }}
          >
            <Send className="w-5 h-5 mr-2" />
            Gửi Xác Nhận
          </Button>
        </motion.form>
      </div>
    </section>
  );
};

export default RSVPSection;
