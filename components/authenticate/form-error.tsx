"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

const FormError = ({ message }: { message?: string }) => {
  useEffect(() => {
    if (message) {
      toast.error(message);
    }
  }, [message]);

  return null;
};

export default FormError;
