import { Image } from "@nextui-org/react";

function Logo() {
    return (
        <Image
            src="/logo.svg"
            alt="Placeholder Logo"
            width={500}
            height={300}
            objectFit="cover"
        />
    );
}

export default Logo;