import { use, useEffect, useState } from "react"

export default function settings() {
    const [settings, setSettings] = useState([])
    useEffect(() => {
        fetch("http://localhost:3001/settings", {
            method: "GET",
            headers: {'Content-Type': 'application/json','Accept': 'application/json'}
        })
        .then(response => response.json())
        .then(data => setSettings(data))
    }, [])

    return (
        <div>
            {settings.map((setting) => (
                <div key={setting.settingName}>
                    <p>{setting.settingName}</p>
                    <p>{setting.settingValue}</p>
                    </div>
            ))}
        </div>
    )
}