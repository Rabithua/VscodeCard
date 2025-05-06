import { atom } from "jotai";

export interface CardProps {
    fileName: string;
    location: string[];
    codes: { key: string; value: string | string[] }[];
    cursor: string;
    cardBackend: {
        motto: string;
        github: {
            days: number;
            toDate: string;
            allContributions: number;
        };
    };
}

export interface CardState {
    drawIng: boolean;
    aspectRatio: string;
    borderRadius: boolean;
    windowBar: {
        hidden: boolean;
    };
    fileDirector: {
        hidden: boolean;
    };
    codeDirector: {
        hidden: boolean;
    };
    footBar: {
        hidden: boolean;
    };
    cardBackend: {
        motto: {
            hidden: boolean;
        };
    };
    lineNumber: {
        hidden: boolean;
    };
    saveDot: {
        hidden: boolean;
    };
}

export const cardPropsAtom = atom<CardProps>({
    fileName: "Rabithua",
    location: [
        "bonjour",
        "geek",
    ],
    codes: [
        {
            key: "name",
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
    cardBackend: {
        motto: "The best way to predict the future is to invent it.",
        github: {
            days: 182,
            toDate: "2025-05-04T00:00:00Z",
            allContributions: 501,
        },
    },
});

export const cardStateAtom = atom<CardState>({
    drawIng: false,
    aspectRatio: "177 / 114",
    borderRadius: false,
    windowBar: {
        hidden: false,
    },
    fileDirector: {
        hidden: false,
    },
    codeDirector: {
        hidden: false,
    },
    footBar: {
        hidden: true,
    },
    cardBackend: {
        motto: {
            hidden: true,
        },
    },
    lineNumber: {
        hidden: false,
    },
    saveDot: {
        hidden: true,
    },
});

export const cardRatioStrings = [
    "1 / 1", // Square
    "3 / 2", // Traditional photo ratio
    "4 / 3", // Traditional screen ratio
    "19 / 12", // Custom ratio
    "177 / 114", // Custom ratio
    "16 / 9", // Widescreen ratio
    "1.618 / 1", // Golden ratio
    "1.414 / 1", // √2 ratio
    "1.91 / 1", // Social media card
    "2.39 / 1", // Cinema ratio
];
