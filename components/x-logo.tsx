import Image from "next/image"

export function XLogo({ className = "w-14" }: { className?: string }) {
  return (
    <Image
      src="/images/websitelogo.jpg"
      alt="Fight Night logo"
      width={240}
      height={160}
      className={`${className} h-auto`}
    />
  )
}
