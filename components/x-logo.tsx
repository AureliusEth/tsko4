import Image from "next/image"

export function XLogo({ className = "w-16" }: { className?: string }) {
  return (
    <Image
      src="/images/websitelogo.jpg"
      alt="Fight Night logo"
      width={120}
      height={80}
      className={`${className} h-auto`}
    />
  )
}
