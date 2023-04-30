import * as React from "react"
import Image from "next/image";
function NewLogo({props}:any) {
    return (
        <Image
            src="/logo1.svg"
            alt="Moje zdjęcie"
            width={100}
            height={70}
        />
    );
}
export default NewLogo;
