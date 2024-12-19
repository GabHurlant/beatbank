type FontConfig = {
    h: [number][], // [fontSize, lineHeight]
    p: [number, string][], // [fontSize, lineHeight, fontStyle]
};

export const Font: FontConfig={
    h:[
        [36],
        [30],
        [24],
        [20],
        [18],
    ],
    p:[
        [16,"bold"],
        [16,"regular"],
        [14,"regular"],
        [12,"regular"],
    ]
}