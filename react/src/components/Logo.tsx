import Image from 'next/image';

function Logo() {
    return (
        <Image
            src="/logo.svg"
            alt="Moje zdjęcie"
            width={500}
            height={300}
        />
    );
}

export default Logo;