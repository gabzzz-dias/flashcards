import Image from "next/image"
import logo from "@/assets/logo.png"

export default function Logo() {
  return (
    <div className="flex flex-col items-center">
      <Image src={logo || "/placeholder.svg"} alt="MedFlashcards Logo" width={220} height={220} priority />
    </div>
  )
}

