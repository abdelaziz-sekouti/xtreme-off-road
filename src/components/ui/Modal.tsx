import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
}

export default function Modal({ isOpen, onClose, type = 'info', title, message }: ModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  const icons = {
    success: <CheckCircle className="w-8 h-8 text-green-500" />,
    error: <XCircle className="w-8 h-8 text-red-500" />,
    warning: <AlertTriangle className="w-8 h-8 text-yellow-500" />,
    info: <Info className="w-8 h-8 text-blue-500" />,
  };

  const colors = {
    success: 'border-green-500',
    error: 'border-red-500',
    warning: 'border-yellow-500',
    info: 'border-blue-500',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setIsVisible(false); setTimeout(onClose, 300); }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-white rounded-2xl shadow-2xl border-2 ${colors[type]} overflow-hidden`}
          >
            <div className="p-6 text-center">
              <div className="flex justify-center mb-4">
                {icons[type]}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
              <p className="text-gray-600">{message}</p>
            </div>
            <div className="bg-gray-50 px-6 py-4 flex justify-center">
              <button
                onClick={() => { setIsVisible(false); setTimeout(onClose, 300); }}
                className={`px-8 py-2 rounded-lg font-medium transition ${
                  type === 'success' ? 'bg-green-500 hover:bg-green-600 text-white' :
                  type === 'error' ? 'bg-red-500 hover:bg-red-600 text-white' :
                  type === 'warning' ? 'bg-yellow-500 hover:bg-yellow-600 text-white' :
                  'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                OK
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Helper hook for using modal
export function useModal() {
  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
  }>({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
  });

  const showModal = (type: 'success' | 'error' | 'warning' | 'info', title: string, message: string) => {
    setModal({ isOpen: true, type, title, message });
  };

  const closeModal = () => {
    setModal(prev => ({ ...prev, isOpen: false }));
  };

  return { modal, showModal, closeModal };
}
