import { useRouter } from 'next/router';
import { Navbar } from "@nextui-org/react";
import { Layout } from "./Layout.js";
import NewLogo from "./NewLogo";
import {useState} from "react";

export default function MyNavbar({setCurrentTab}:any) {
    const router = useRouter();
    const [currentLink, setCurrentLink] = useState(0);
    const handleLinkClick = (linkIndex:number) => {
        if (linkIndex == 1) {
            setCurrentTab("addDevice");
        } else if (linkIndex == 2) {
            setCurrentTab("deviceList");
        } else if (linkIndex == 3) {
            setCurrentTab("roomList");
        } else if (linkIndex == 4) {
            setCurrentTab("settings");
        } else {
            setCurrentTab("default");
        }
        setCurrentLink(linkIndex);
    }

    return (
        <Navbar isBordered variant="sticky" maxWidth={'fluid'}>
            <Navbar.Content hideIn="xs" variant="underline">
                <Navbar.Link isActive={currentLink===1} onClick={() => handleLinkClick(1)}>
                    Dodaj urządzenie
                </Navbar.Link>
                <Navbar.Link isActive={currentLink===2} onClick={() => handleLinkClick(2)}>
                    Lista urządzeń
                </Navbar.Link>
            </Navbar.Content>

            <Navbar.Brand onClick={() => handleLinkClick(0)} css={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
            }}>
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