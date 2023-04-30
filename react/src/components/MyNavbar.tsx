import { useRouter } from 'next/router';
import { Navbar } from "@nextui-org/react";
import { Layout } from "./Layout.js";
import NewLogo from "./NewLogo";
import {useState} from "react";

export default function MyNavbar() {
    const router = useRouter();
    const [currentLink, setCurrentLink] = useState(0);
    const handleLinkClick = (linkIndex:number) => {
        setCurrentLink(linkIndex);
    }

    return (
        <Navbar isBordered variant="sticky">
            <Navbar.Content hideIn="xs" variant="underline">
                <Navbar.Link isActive={currentLink===1} onClick={() => handleLinkClick(1)}>
                    Dodaj urządzenie
                </Navbar.Link>
                <Navbar.Link isActive={currentLink===2} onClick={() => handleLinkClick(2)}>
                    Lista urządzeń
                </Navbar.Link>
            </Navbar.Content>

            <Navbar.Brand>
                <NewLogo />
            </Navbar.Brand>

            <Navbar.Content hideIn="xs" variant="underline">
                <Navbar.Link isActive={currentLink===3} onClick={() => handleLinkClick(3)}>
                    Lista Pokoi
                </Navbar.Link>
                <Navbar.Link isActive={currentLink===4} onClick={() => handleLinkClick(4)}>
                    Ustawienia
                </Navbar.Link>
            </Navbar.Content>
        </Navbar>
    );
}