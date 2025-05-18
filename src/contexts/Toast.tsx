import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import uniqueId from "lodash.uniqueid";
import { ToastContainer } from "components/Toast";

export type ToastContextType = {
  addToast: (content: string) => void;
  removeToast: (id: string) => void;
};

export type Toast = {
  id: string;
  content: string;
};

const ToastContext = createContext<ToastContextType>({
  addToast: () => {},
  removeToast: () => {},
});

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (content: string) => {
      setToasts((toasts) => [...toasts, { id: uniqueId(), content }]);
    },
    [setToasts],
  );

  const removeToast = useCallback(
    (id: string) => {
      setToasts((toasts) => toasts.filter((t) => t.id !== id));
    },
    [setToasts],
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      <ToastContainer toasts={toasts} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
