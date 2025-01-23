import Groq from "groq-sdk";

export default async function getGropChatCompletion(liste: any, nb_attend: any){
    let ecoute = "";
    liste.forEach((element: any) => {
        ecoute += `- ["${element[0]}", "${element[1]}"],\n`;
    });

    const groq = new Groq({ apiKey: process.env.EXPO_PUBLIC_GROQ_API ,  dangerouslyAllowBrowser: true});

    const res= await groq.chat.completions.create({
        messages: [
        {
            role: "user",
            content: `Dans le cadre d’une application de catalogage social dédiée aux albums de musique, tu vas devoir m’aider à proposer des recommandations d’album à un utilisateurs.
Je vais te donner les ${liste.length} derniers albums que l’utilisateur à apprécié.
${ecoute}
En te basant sur ces albums, leur genre musical ainsi que leurs caractéristiques audio, peux-tu recommander à l’utilisateur très exactement ${nb_attend} albums qu’il serait en mesure d’apprécier ? Sachant que ces albums doivent être anglophones,  déjà sortis, originaux et sans erreur. Ne propose surtout pas d’albums qui font partie de la liste que je t’ai donnée. Essaie de proposer des artistes plutôt underground.
Tu dois uniquement renvoyer un tableau contenant les nom des albums et artistes en respectant le format suivant : 
["Nom_de_l_album","Nom_de_l_artiste"], 
Ta réponse ne doit contenir aucune autre forme de texte, pas la moindre phrase de présentation.
`,
        },
        ],
        model: "llama-3.3-70b-versatile",
    });

    const result= JSON.parse(`[${res.choices[0].message.content?.replace(/“|”/g, '"').replace(/^\[\n\[/g,"[").replace(/\]\n\]$/g, "]")}]`);
    return result;
}