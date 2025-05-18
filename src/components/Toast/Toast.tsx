import { ReactNode, useEffect } from "react";
import { useToast, type Toast as ToastType } from "contexts/Toast";
import { TextSansRegular } from "components/Typography";
import { ToastPortal, Wrapper } from "./Toast.styled";

type ToastProps = {
  id: string;
  children: ReactNode;
};

export const Toast = ({ children, id }: ToastProps) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [id, removeToast]);

  return (
    <Wrapper>
      <TextSansRegular>{children}</TextSansRegular>
    </Wrapper>
  );
};

type ToastContainerProps = {
  toasts: ToastType[];
};

export const ToastContainer = ({ toasts }: ToastContainerProps) => {
  return (
    <ToastPortal>
      {toasts.map((toast) => (
        <Toast key={toast.id} id={toast.id}>
          {toast.content}
        </Toast>
      ))}
    </ToastPortal>
  );
};
