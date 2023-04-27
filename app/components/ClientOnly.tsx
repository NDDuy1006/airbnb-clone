"use client"

import { useEffect, useState } from "react";

interface ClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly = (props: ClientOnlyProps) => {
  const {children} = props

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null
  }

  return (
    <>
      {children}
    </>
  )
};

export default ClientOnly;

/*
*** This components takes care of hydration
*/