import { atom } from "jotai";

export const cardPropsAtom = atom({
    fileName: "Rabithua.json",
    location: [
        "Bonjour",
        "Profile",
    ],
    codes: [
        {
            key: "namee",
            value: "Rabithua",
        },
        {
            key: "role",
            value: "Web Developer",
        },
        {
            key: "skills",
            value: ["React", "Typescript"],
        },
        {
            key: "motto",
            value: "Code is Poetry",
        },
    ],
    cursor: "Bonjour/Rabithua#2",
});

export const cardStateAtom = atom({
    drawIng: false,
});
