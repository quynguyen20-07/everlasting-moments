import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { QRCodeSVG } from "qrcode.react";
import { ColorType } from "@/types";
import { useState } from "react";

export interface BankAccountInfo {
  id: string;
  role: "bride" | "groom";
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  branch?: string;
  qrCodeUrl?: string;
}

interface BankAccountSectionProps {
  colors?: ColorType;
  brideAccount?: BankAccountInfo;
  groomAccount?: BankAccountInfo;
  brideName?: string;
  groomName?: string;
}

export default function BankAccountSection({
  colors,
  brideAccount,
  groomAccount,
  brideName = "Cô dâu",
  groomName = "Chú rể",
}: BankAccountSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"bride" | "groom">("bride");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  // Mock data for demo if no accounts provided
  const defaultBrideAccount: BankAccountInfo = brideAccount || {
    id: "bride-1",
    role: "bride",
    bankName: "MB Bank",
    accountNumber: "0329204426",
    accountHolder: brideName,
  };

  const defaultGroomAccount: BankAccountInfo = groomAccount || {
    id: "groom-1",
    role: "groom",
    bankName: "Techcombank",
    accountNumber: "6432222222",
    accountHolder: groomName,
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast({
        title: "Đã sao chép!",
        description: `Số tài khoản ${text} đã được sao chép.`,
      });
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      toast({
        title: "Lỗi",
        description: "Không thể sao chép. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
  };

  // Generate VietQR URL for bank transfer
  const generateVietQRUrl = (account: BankAccountInfo) => {
    // VietQR standard format for generating QR
    const bankBin: Record<string, string> = {
      "MB Bank": "970422",
      Techcombank: "970407",
      Vietcombank: "970436",
      BIDV: "970418",
      VietinBank: "970415",
      ACB: "970416",
      Agribank: "970405",
      TPBank: "970423",
      Sacombank: "970403",
      VPBank: "970432",
    };

    const bin = bankBin[account.bankName] || "970422";
    return `https://img.vietqr.io/image/${bin}-${account.accountNumber}-compact.png`;
  };

  const renderAccountCard = (account: BankAccountInfo, label: string) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center p-4"
    >
      {/* QR Code */}
      <div
        className="w-48 h-48 mb-4 rounded-lg overflow-hidden border-2 flex items-center justify-center bg-white"
        style={{ borderColor: activeTab === "bride" ? "#dc2626" : "#2563eb" }}
      >
        {account.qrCodeUrl ? (
          <img
            src={account.qrCodeUrl}
            alt={`QR Code ${label}`}
            className="w-full h-full object-contain"
          />
        ) : (
          <img
            src={generateVietQRUrl(account)}
            alt={`VietQR ${label}`}
            className="w-full h-full object-contain"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = "none";
              const parent = target.parentElement;
              if (parent) {
                const fallback = document.createElement("div");
                fallback.className =
                  "flex items-center justify-center w-full h-full";
                parent.appendChild(fallback);
              }
            }}
          />
        )}
      </div>

      {/* Account Info */}
      <div className="text-center space-y-1">
        <h4 className="font-display text-xl font-semibold text-foreground">
          {account.accountHolder}
        </h4>
        <p className="text-muted-foreground text-sm">{account.bankName}</p>
        <p className="font-mono text-lg tracking-wider text-foreground">
          {account.accountNumber}
        </p>
      </div>

      {/* Copy Button */}
      <Button
        variant="outline"
        size="sm"
        className="mt-4 gap-2"
        style={{
          borderColor: activeTab === "bride" ? "#dc2626" : "#2563eb",
          color: activeTab === "bride" ? "#dc2626" : "#2563eb",
        }}
        onClick={() => copyToClipboard(account.accountNumber, account.id)}
      >
        {copiedId === account.id ? (
          <>
            <Check className="w-4 h-4" />
            Đã sao chép
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            Sao chép số TK
          </>
        )}
      </Button>
    </motion.div>
  );

  return (
    <>
      {/* Gift Box Button - Fixed position or can be placed in section */}
      <section className="py-12 px-4">
        <div className="max-w-md mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex justify-center">
              <div
                className="w-48 h-48 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: `${colors?.primary}20` }}
              >
                <Gift style={{ color: colors?.primary }} size={120} />
              </div>
            </div>

            <h3
              className="font-display text-2xl md:text-3xl"
              style={{ color: colors?.primary }}
            >
              Hộp Quà Cưới
            </h3>

            <p className="text-muted-foreground font-elegant">
              Thay cho tiền mặt, bạn có thể gửi quà mừng qua tài khoản ngân hàng
            </p>

            <Button
              onClick={() => setIsOpen(true)}
              className="gap-2 w-full"
              style={{
                backgroundColor: colors?.primary,
                color: "white",
              }}
            >
              <Gift className="w-4 h-4" />
              Gửi Quà Mừng
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Bank Account Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-center font-display text-2xl">
              Hộp Quà Yêu Thương
            </DialogTitle>
            <p className="text-center text-muted-foreground text-sm">
              Quét QR code để gửi yêu thương trực tiếp tới:
            </p>
          </DialogHeader>

          {/* Tab Buttons */}
          <div className="flex justify-center gap-8 my-4">
            <button
              onClick={() => setActiveTab("bride")}
              className={`text-lg font-medium transition-all pb-1 border-b-2 ${
                activeTab === "bride"
                  ? "text-red-500 border-red-500"
                  : "text-muted-foreground border-transparent hover:text-red-400"
              }`}
            >
              Cô dâu
            </button>
            <button
              onClick={() => setActiveTab("groom")}
              className={`text-lg font-medium transition-all pb-1 border-b-2 ${
                activeTab === "groom"
                  ? "text-blue-500 border-blue-500"
                  : "text-muted-foreground border-transparent hover:text-blue-400"
              }`}
            >
              Chú rể
            </button>
          </div>

          {/* Account Cards */}
          <div className="min-h-[320px]">
            <AnimatePresence mode="wait">
              {activeTab === "bride" ? (
                <div key="bride">
                  {renderAccountCard(defaultBrideAccount, "Cô dâu")}
                </div>
              ) : (
                <div key="groom">
                  {renderAccountCard(defaultGroomAccount, "Chú rể")}
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Close Button */}
          <div className="flex justify-center pt-2">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="px-8"
            >
              Đóng
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
