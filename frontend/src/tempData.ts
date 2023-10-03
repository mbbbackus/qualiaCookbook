export const QUALIA_COOKBOOK_ID = '0';

export default {
    nodes: [
        {
            id: '0',
            name: 'Qualia Cookbook',
            image: 'qclogo.png',
            description: `
                <p>Qualia Cookbook is a web application that allows users to search for recipes based on ingredients they have on hand. Users can also create an account to save recipes to their profile.</p>`,
            connections: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']            
        },
        {
            id: '1',
            name: 'Qualia',
            description: `Qualia is the concept of sense data`,
            connections: ['2', '3', '4', '5', '6', '7', '8', '9', '10'] 
        },
        {
            id: '2',
            name: 'Valence',
            description: `Valence is the concept of some qualia feeling 'good' or 'bad'`,
            connections: ['1', '3', '4', '5', '6', '7', '8', '9', '10'] 
        },
        {
            id: '3',
            name: 'Viscosity',
            description: `Viscosity is the idea that some qualia flow more slowly than others`,
            connections: ['1', '2', '4', '5', '6', '7', '8', '9', '10'] 
        },
        {
            id: '4',
            name: 'Cracking Qualia',
            description: `Cracking Qualia is the methodological approach to understanding qualia`,
            connections: ['1', '2', '3', '5', '6', '7', '8', '9', '10'] 
        },
        {
            id: '5',
            name: 'AI Alignment',
            description: `AI Alignment is the concept of ensuring that AI is aligned with human values`,
            connections: ['1', '2', '3', '4', '6', '7', '8', '9', '10'] 
        },
        {
            id: '6',
            name: 'Veganism',
            description: `Veganism is the practice of abstaining from the use of animal products, particularly in diet, and an associated philosophy that rejects the commodity status of animals.`,
            connections: ['1', '2', '3', '4', '5', '7', '8', '9', '10'] 
        },
        {
            id: '7',
            name: 'Narrative',
            description: `Narrative is the concept of a story, but both in terms of mental health and art`,
            connections: ['1', '2', '3', '4', '5', '6', '8', '9', '10'] 
        },
        {
            id: '8',
            name: 'Platonism',
            description: `Platonism is the concept of the world of forms, in which qualia could exists, along with math and morality`,
            connections: ['1', '2', '3', '4', '5', '6', '7', '9', '10'] 
        },
        {
            id: '9',
            name: 'Flow',
            description: `Flow is the concept of being in the zone`,
            connections: ['1', '2', '3', '4', '5', '6', '7', '8', '10'] 
        },
        {
            id: '10',
            name: 'Jhana',
            description: `Jhana is a type of meditative state of mind`,
            connections: ['1', '2', '3', '4', '5', '6', '7', '8', '9'] 
        }
    ]
}