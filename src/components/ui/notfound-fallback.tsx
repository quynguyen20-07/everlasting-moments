import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  title?: string;
  error?: ReactNode;
};

const NotfoundFallback = ({
  title = "Không tìm thấy dữ liệu",
  error = "Dữ liệu không tồn tại hoặc đã bị gỡ.",
}: Props) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background invitation-pattern">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center px-4"
      >
        <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-muted flex items-center justify-center">
          <svg
            className="w-12 h-12 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="font-display text-2xl text-foreground mb-2">{title}</h1>
        <p className="font-elegant text-muted-foreground mb-6">{error}</p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 gold-gradient text-primary-foreground rounded-2xl font-medium hover:opacity-90 transition-opacity"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Về trang chủ
        </a>
      </motion.div>
    </div>
  );
};

export default NotfoundFallback;
