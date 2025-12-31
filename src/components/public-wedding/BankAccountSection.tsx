import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Copy, Check, Gift } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { BankAccount } from "@/types/graphql";

interface BankAccountSectionProps {
  bankAccounts: BankAccount[];
  brideFullName?: string;
  groomFullName?: string;
}

export function BankAccountSection({ bankAccounts, brideFullName, groomFullName }: BankAccountSectionProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  if (!bankAccounts || bankAccounts.length === 0) return null;

  const activeBankAccounts = bankAccounts.filter((account) => account.isActive);

  if (activeBankAccounts.length === 0) return null;

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast({
        title: "Đã sao chép!",
        description: "Số tài khoản đã được sao chép vào clipboard.",
      });
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast({
        title: "Không thể sao chép",
        description: "Vui lòng sao chép thủ công.",
        variant: "destructive",
      });
    }
  };

  // Generate VietQR content for Vietnamese banks
  const generateVietQRContent = (account: BankAccount) => {
    return `${account.bankName}|${account.accountNumber}|${account.accountHolder}`;
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-champagne-light/20">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-champagne/20 flex items-center justify-center">
            <Gift className="w-8 h-8 text-champagne" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Mừng Cưới
          </h2>
          <p className="font-elegant text-muted-foreground max-w-md mx-auto">
            Sự hiện diện của bạn là món quà quý giá nhất. Nếu muốn gửi thêm lời chúc phúc,
            xin mời quý khách có thể chuyển khoản qua các tài khoản dưới đây.
          </p>
          <div className="ornament-divider max-w-xs mx-auto mt-4">
            <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        </motion.div>

        {/* Bank accounts grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {activeBankAccounts.map((account, index) => (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-6 md:p-8 rounded-2xl shadow-elegant text-center"
            >
              {/* Determine if this is for bride or groom based on account holder name */}
              <div className="mb-4">
                <span className="text-2xl">
                  {account.accountHolder.toLowerCase().includes(brideFullName?.toLowerCase() || "") ? "👰" : "🤵"}
                </span>
              </div>

              {/* QR Code */}
              <div className="inline-block p-4 bg-background rounded-2xl shadow-soft mb-6">
                {account.qrCodeUrl ? (
                  <img
                    src={account.qrCodeUrl}
                    alt={`QR Code - ${account.bankName}`}
                    className="w-48 h-48 object-contain"
                  />
                ) : (
                  <QRCodeSVG
                    value={generateVietQRContent(account)}
                    size={192}
                    level="M"
                    className="w-48 h-48"
                  />
                )}
              </div>

              {/* Bank info */}
              <div className="space-y-3">
                <h3 className="font-display text-xl text-foreground">
                  {account.bankName}
                </h3>
                
                {account.branch && (
                  <p className="text-sm text-muted-foreground">
                    {account.branch}
                  </p>
                )}

                {/* Account number with copy button */}
                <div className="flex items-center justify-center gap-2">
                  <span className="font-mono text-lg font-semibold text-foreground">
                    {account.accountNumber}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(account.accountNumber, account.id)}
                    className="h-8 w-8 p-0"
                  >
                    {copiedId === account.id ? (
                      <Check className="w-4 h-4 text-champagne" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>

                <p className="font-elegant text-muted-foreground">
                  {account.accountHolder}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Thank you note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10 font-elegant text-muted-foreground italic"
        >
          Xin chân thành cảm ơn quý khách! 💕
        </motion.p>
      </div>
    </section>
  );
}
