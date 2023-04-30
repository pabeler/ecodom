import * as React from "react"
import Image from "next/image";
function NewLogo({props}:any) {
    return (
        <Image
            src="/logo.svg"
            alt="Moje zdjęcie"
            width={250}
            height={250}
        />
    );
}
export default NewLogo;
