import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/useToast";
import { Copy, Check } from "lucide-react";

export interface BankAccountInfo {
  id: string;
  role: "bride" | "groom";
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  qrCodeImg?: string;
}

interface BankAccountModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  brideAcc: BankAccountInfo;
  groomAcc: BankAccountInfo;
}

export default function BankAccountModal({
  isOpen,
  setIsOpen,
  brideAcc,
  groomAcc,
}: BankAccountModalProps) {
  const [activeTab, setActiveTab] = useState<"bride" | "groom">("bride");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({ title: "Đã sao chép số tài khoản" });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const renderAccount = (account: BankAccountInfo) => (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      className="flex flex-col items-center gap-4"
    >
      {/* QR */}
      <div className="w-52 h-52 rounded-xl overflow-hidden border bg-white">
        <img
          src={account.qrCodeImg}
          alt="QR ngân hàng"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Info */}
      <div className="text-center">
        <p className="font-semibold text-lg">{account.accountHolder}</p>
        <p className="text-sm text-muted-foreground">{account.bankName}</p>
        <p className="font-mono text-lg tracking-wider">
          {account.accountNumber}
        </p>
      </div>

      {/* Copy */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => copyToClipboard(account.accountNumber, account.id)}
        className="gap-2"
      >
        {copiedId === account.id ? (
          <>
            <Check className="w-4 h-4" /> Đã sao chép
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" /> Sao chép số TK
          </>
        )}
      </Button>
    </motion.div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-display">
            Quà Mừng Cưới
          </DialogTitle>
          <p className="text-center text-sm text-muted-foreground">
            Quét mã QR để gửi quà mừng
          </p>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex justify-center gap-10 mt-2">
          <button
            onClick={() => setActiveTab("bride")}
            className={`pb-1 border-b-2 transition ${
              activeTab === "bride"
                ? "border-rose-500 text-rose-500"
                : "border-transparent text-muted-foreground"
            }`}
          >
            Cô dâu
          </button>
          <button
            onClick={() => setActiveTab("groom")}
            className={`pb-1 border-b-2 transition ${
              activeTab === "groom"
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-muted-foreground"
            }`}
          >
            Chú rể
          </button>
        </div>

        {/* Content */}
        <div className="min-h-[360px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {activeTab === "bride" ? (
              <motion.div key="bride">{renderAccount(brideAcc)}</motion.div>
            ) : (
              <motion.div key="groom">{renderAccount(groomAcc)}</motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
