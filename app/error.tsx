"use client";

import { useEffect } from "react";
import EmptyState from "./components/EmptyState";

interface IProps {
  error: Error;
};

const ErrorState = (props: IProps) => {
  useEffect(() => {
    console.error(props.error);
  }, [props.error]);

  return (
    <EmptyState
      title="Oops"
      subtitle="Something went wrong. Try again later."
    />
  )
};

export default ErrorState;

