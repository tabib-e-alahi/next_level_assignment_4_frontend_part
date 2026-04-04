"use client"

import ErrorPage from "@/components/modules/error/ErrorPage";


export default function error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorPage error={error} reset={reset} />
  );
}