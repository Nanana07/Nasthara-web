import * as React from "react"
import Image from "next/image"

export const Logo = (props: { className?: string }) => (
    <Image src="/nasthara.png" alt="Nasthara Logo" width={32} height={32} {...props} />
)
