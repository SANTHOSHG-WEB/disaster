export interface QuizQuestion {
    id: string;
    question: string;
    type: 'multiple-choice' | 'true-false';
    options?: string[];
    correctAnswer: string;
    explanation: string;
}

export interface Module {
    id: string;
    title: string;
    videoId: string;
    videoUrl: string;
    duration: string;
    description: string;
    gameType: 'drag-drop' | 'maze' | 'spot-hazard' | 'memory-match' | 'simulation';
    gameData: any;
    quizQuestions: QuizQuestion[];
}

export const modules: Module[] = [
    {
        id: '1',
        title: 'Introduction to Disaster Management',
        videoId: 'FVwvbS-0q18',
        videoUrl: 'https://youtu.be/FVwvbS-0q18?si=RUbBWNqRwTmKkDlE',
        duration: '5:53',
        description: 'Learn the fundamentals of disaster management and why preparedness is crucial for everyone.',
        gameType: 'drag-drop',
        gameData: {
            instruction: 'Drag disaster types to their correct preparation categories',
            items: [
                { id: 1, text: 'Earthquake', category: 'natural' },
                { id: 2, text: 'Fire', category: 'human-made' },
                { id: 3, text: 'Flood', category: 'natural' },
                { id: 4, text: 'Chemical Spill', category: 'human-made' }
            ],
            categories: [
                { id: 'natural', label: 'Natural Disasters' },
                { id: 'human-made', label: 'Human-Made Disasters' }
            ]
        },
        quizQuestions: [
            {
                id: '1-1',
                question: 'What is the primary goal of disaster management?',
                type: 'multiple-choice',
                options: [
                    'To predict all disasters',
                    'To reduce risks and minimize impacts',
                    'To completely prevent disasters',
                    'To rebuild after disasters'
                ],
                correctAnswer: 'To reduce risks and minimize impacts',
                explanation: 'Disaster management focuses on reducing risks and minimizing impacts through preparedness, response, and recovery.'
            },
            {
                id: '1-2',
                question: 'India has a high disaster vulnerability index.',
                type: 'true-false',
                correctAnswer: 'true',
                explanation: 'India is highly vulnerable to various natural disasters due to its geographical location and climate conditions.'
            },
            {
                id: '1-3',
                question: 'Which phase comes first in disaster management?',
                type: 'multiple-choice',
                options: ['Response', 'Recovery', 'Preparedness', 'Mitigation'],
                correctAnswer: 'Mitigation',
                explanation: 'Mitigation is the first phase, focused on reducing or eliminating disaster risks before they occur.'
            }
        ]
    },
    {
        id: '2',
        title: 'Earthquake Safety 101',
        videoId: 'MllUVQM3KVk',
        videoUrl: 'https://youtu.be/MllUVQM3KVk?si=3HdAsFBebG0aI5NW',
        duration: '5:54',
        description: 'Understanding earthquakes, their causes, and immediate safety responses.',
        gameType: 'simulation',
        gameData: {
            theme: 'earthquake',
            instruction: 'Survive the Earthquake!',
            scenarios: [
                {
                    id: 1,
                    phase: 'Main Shock',
                    description: 'The ground starts shaking violently!',
                    options: [
                        { id: 'run', text: 'Run Outside', correct: false, feedback: 'Running during shaking increases injury risk from falling debris!' },
                        { id: 'drop', text: 'Drop, Cover, Hold On', correct: true, feedback: 'Perfect! This protects you from falling objects.' },
                        { id: 'door', text: 'Stand in Doorway', correct: false, feedback: 'Doorways are not stronger and leave you exposed.' }
                    ]
                },
                {
                    id: 2,
                    phase: 'Aftershock',
                    description: 'The shaking stops, but it might start again.',
                    options: [
                        { id: 'elevator', text: 'Take Elevator', correct: false, feedback: 'Never use elevators after an earthquake!' },
                        { id: 'stairs', text: 'Check for Safe Exit', correct: true, feedback: 'Correct. Use stairs if safe and clear.' },
                        { id: 'window', text: 'Look out Window', correct: false, feedback: 'Stay away from glass that might shatter.' }
                    ]
                }
            ]
        },
        quizQuestions: [
            {
                id: '2-1',
                question: 'During an earthquake, what should you do first?',
                type: 'multiple-choice',
                options: [
                    'Run outside immediately',
                    'Drop, Cover, and Hold On',
                    'Stand in a doorway',
                    'Hide under a bed'
                ],
                correctAnswer: 'Drop, Cover, and Hold On',
                explanation: 'Drop to hands and knees, take cover under a desk/table, and hold on until shaking stops.'
            },
            {
                id: '2-2',
                question: 'The "Triangle of Life" theory is recommended for earthquake safety.',
                type: 'true-false',
                correctAnswer: 'false',
                explanation: 'The "Triangle of Life" theory is not recommended. "Drop, Cover, and Hold On" is the official safety method.'
            },
            {
                id: '2-3',
                question: 'If you are outdoors during an earthquake, you should:',
                type: 'multiple-choice',
                options: [
                    'Run to the nearest building',
                    'Stay away from buildings, trees, and power lines',
                    'Lie flat on the ground',
                    'Find a car to hide under'
                ],
                correctAnswer: 'Stay away from buildings, trees, and power lines',
                explanation: 'Stay in an open area away from anything that could fall on you.'
            }
        ]
    },
    {
        id: '3',
        title: 'Earthquake Recovery',
        videoId: 'BLEPakj1YTY',
        videoUrl: 'https://youtu.be/BLEPakj1YTY?si=vxHU_WqvoBw9JrfZ',
        duration: '3:38',
        description: 'Post-earthquake procedures, aftershock preparedness, and recovery steps.',
        gameType: 'memory-match',
        gameData: {
            instruction: 'Match earthquake terms with their correct actions',
            pairs: [
                { id: 1, term: 'Aftershock', action: 'Be prepared for additional shaking' },
                { id: 2, term: 'Evacuation', action: 'Leave building if structurally damaged' },
                { id: 3, term: 'First Aid', action: 'Help injured people immediately' },
                { id: 4, term: 'Gas Leak', action: 'Turn off gas and avoid electrical switches' }
            ]
        },
        quizQuestions: [
            {
                id: '3-1',
                question: 'After an earthquake stops, what should you check first?',
                type: 'multiple-choice',
                options: [
                    'Your phone for messages',
                    'Yourself and others for injuries',
                    'The TV for news',
                    'Your valuables'
                ],
                correctAnswer: 'Yourself and others for injuries',
                explanation: 'Immediately check for injuries and provide first aid as needed.'
            },
            {
                id: '3-2',
                question: 'Aftershocks are always weaker than the main earthquake.',
                type: 'true-false',
                correctAnswer: 'false',
                explanation: 'While usually weaker, aftershocks can sometimes be as strong or stronger than the initial quake.'
            },
            {
                id: '3-3',
                question: 'If you smell gas after an earthquake, what should you do?',
                type: 'multiple-choice',
                options: [
                    'Turn on the lights to check',
                    'Light a match to see',
                    'Turn off the main gas valve',
                    'Call the gas company from inside'
                ],
                correctAnswer: 'Turn off the main gas valve',
                explanation: 'Turn off the gas at the main valve and open windows. Do not use matches or electrical switches.'
            }
        ]
    },
    {
        id: '4',
        title: 'Flood Preparedness',
        videoId: 'pi_nUPcQz_A',
        videoUrl: 'https://youtube.com/watch?v=pi_nUPcQz_A&feature=shared',
        duration: '9:15',
        description: 'Understanding flood types, early warning signs, and preparation strategies.',
        gameType: 'maze',
        gameData: {
            instruction: 'Navigate to safety through the flooded area',
            startX: 0,
            startY: 0,
            endX: 9,
            endY: 9,
            obstacles: [[2, 2], [3, 2], [4, 2], [2, 5], [6, 7], [7, 7], [5, 5], [8, 2], [1, 8]]
        },
        quizQuestions: [
            {
                id: '4-1',
                question: 'How much water can knock you down while walking?',
                type: 'multiple-choice',
                options: ['2 inches', '6 inches', '12 inches', '18 inches'],
                correctAnswer: '6 inches',
                explanation: 'Just 6 inches of fast-moving water can knock you down.'
            },
            {
                id: '4-2',
                question: 'A "Flash Flood" is dangerous because:',
                type: 'multiple-choice',
                options: [
                    'It happens very slowly',
                    'It only happens at night',
                    'It occurs within 6 hours of rain',
                    'It involves clean water'
                ],
                correctAnswer: 'It occurs within 6 hours of rain',
                explanation: 'Flash floods develop quickly, often within 6 hours of heavy rainfall, leaving little time to react.'
            },
            {
                id: '4-3',
                question: 'What is the safest place to be during a flood?',
                type: 'multiple-choice',
                options: [
                    'In a car',
                    'In the basement',
                    'On high ground',
                    'Near a river bank'
                ],
                correctAnswer: 'On high ground',
                explanation: 'Always move to higher ground and stay away from floodwaters.'
            }
        ]
    },
    {
        id: '5',
        title: 'Flood Safety & Rescue',
        videoId: '43M5mZuzHF8',
        videoUrl: 'https://youtu.be/43M5mZuzHF8?si=JmzXjONwaCRquaj2',
        duration: '8:00',
        description: 'Advanced flood safety, rescue procedures, and post-flood recovery.',
        gameType: 'drag-drop',
        gameData: {
            instruction: 'Sort into Flood Safety Do\'s and Don\'ts',
            categories: [
                { id: 'do', label: 'Do This' },
                { id: 'dont', label: 'Don\'t Do This' }
            ],
            items: [
                { id: 1, text: 'Monitor weather alerts', category: 'do' },
                { id: 2, text: 'Move to higher ground', category: 'do' },
                { id: 3, text: 'Walk through moving water', category: 'dont' },
                { id: 4, text: 'Drive through flooded roads', category: 'dont' }
            ]
        },
        quizQuestions: [
            {
                id: '5-1',
                question: 'If trapped in a building during a flood, you should:',
                type: 'multiple-choice',
                options: [
                    'Go to the basement',
                    'Go to the highest floor',
                    'Stay on the ground floor',
                    'Go outside'
                ],
                correctAnswer: 'Go to the highest floor',
                explanation: 'Move to the highest floor and signal for help from there.'
            },
            {
                id: '5-2',
                question: 'Why should you avoid driving through floodwater?',
                type: 'multiple-choice',
                options: [
                    'It ruins the car paint',
                    'Provide better traction',
                    '2 feet of water can float a car',
                    'The water is cold'
                ],
                correctAnswer: '2 feet of water can float a car',
                explanation: 'Just 2 feet of rushing water can carry away most vehicles, including SUVs.'
            },
            {
                id: '5-3',
                question: 'Floodwater is often contaminated with sewage and chemicals.',
                type: 'true-false',
                correctAnswer: 'true',
                explanation: 'Floodwaters carry sewage, chemicals, and sharp debris, posing significant health risks.'
            }
        ]
    },
    {
        id: '6',
        title: 'Fire Safety Basics',
        videoId: '6qH6fjLxgrU',
        videoUrl: 'https://youtube.com/watch?v=Xgc90CoJbDI&feature=shared',
        duration: '7:30',
        description: 'Fire safety, prevention, evacuation procedures, and firefighting basics.',
        gameType: 'simulation',
        gameData: {
            theme: 'fire',
            instruction: 'Escape the House Fire!',
            scenarios: [
                {
                    id: 1,
                    phase: 'Alarm Sounds',
                    description: 'The smoke alarm is beeping loudly!',
                    options: [
                        { id: 'ignore', text: 'Ignore it', correct: false, feedback: 'Never ignore a smoke alarm!' },
                        { id: 'check', text: 'Check it out', correct: false, feedback: 'Don\'t waste time. Initiate escape plan.' },
                        { id: 'feel', text: 'Feel door for heat', correct: true, feedback: 'Correct! Check if fire is on the other side.' }
                    ]
                },
                {
                    id: 2,
                    phase: 'Escape',
                    description: 'The room is filling with smoke.',
                    options: [
                        { id: 'run', text: 'Run out', correct: false, feedback: 'Smoke rises. You might inhale toxic fumes.' },
                        { id: 'crawl', text: 'Crawl low', correct: true, feedback: 'Yes! Cleaner air is near the floor.' },
                        { id: 'hide', text: 'Hide in closet', correct: false, feedback: 'Don\'t hide! Rescuers need to find you.' }
                    ]
                },
                {
                    id: 3,
                    phase: 'Outside',
                    description: 'You are safely outside.',
                    options: [
                        { id: 'reenter', text: 'Go back for pets', correct: false, feedback: 'Never stick re-enter a burning building.' },
                        { id: 'call', text: 'Call 101', correct: true, feedback: 'Correct. Call emergency services immediately.' },
                        { id: 'wait', text: 'Wait for rain', correct: false, feedback: 'Every second counts. Call help.' }
                    ]
                }
            ]
        },
        quizQuestions: [
            {
                id: '6-1',
                question: 'What number do you call for Fire Department in India?',
                type: 'multiple-choice',
                options: ['100', '101', '102', '108'],
                correctAnswer: '101',
                explanation: 'Fire Department emergency number in India is 101.'
            },
            {
                id: '6-2',
                question: 'If your clothes catch fire, what should you do?',
                type: 'multiple-choice',
                options: [
                    'Run fast',
                    'Stop, Drop, and Roll',
                    'Wave your arms',
                    'Pour water on yourself immediately'
                ],
                correctAnswer: 'Stop, Drop, and Roll',
                explanation: 'Stop moving, drop to the ground, and roll to smother the flames.'
            },
            {
                id: '6-3',
                question: 'How often should you test your smoke alarms?',
                type: 'multiple-choice',
                options: [
                    'Every month',
                    'Every year',
                    'Never',
                    'Every 5 years'
                ],
                correctAnswer: 'Every month',
                explanation: 'Smoke alarms should be tested monthly to ensure they are working properly.'
            }
        ]
    },
    {
        id: '7',
        title: 'Landslide Awareness',
        videoId: 'krJLnXpemtQ',
        videoUrl: 'https://youtu.be/krJLnXpemtQ?si=XSKk_NG0IYQ0RWNx',
        duration: '6:45',
        description: 'Understanding landslide risks, warning signs, and safety measures.',
        gameType: 'memory-match',
        gameData: {
            instruction: 'Match landslide warning signs with descriptions',
            pairs: [
                { id: 1, term: 'Ground cracks', action: 'Visible fissures' },
                { id: 2, term: 'Tilting trees', action: 'Leaning trees' }
            ]
        },
        quizQuestions: [
            {
                id: '7-1',
                question: 'Landslides are most common during:',
                type: 'multiple-choice',
                options: ['Dry seasons', 'Heavy rainfall', 'Winter', 'Full moon'],
                correctAnswer: 'Heavy rainfall',
                explanation: 'Heavy rainfall saturates soil and increases landslide risk.'
            },
            {
                id: '7-2',
                question: 'Which is a warning sign of an impending landslide?',
                type: 'multiple-choice',
                options: [
                    'Clear blue skies',
                    'Doors or windows sticking',
                    'Dry soil',
                    'Birds singing'
                ],
                correctAnswer: 'Doors or windows sticking',
                explanation: 'Sticking doors/windows indicate the house structure is shifting due to ground movement.'
            },
            {
                id: '7-3',
                question: 'If you are caught in a landslide and cannot escape, you should:',
                type: 'multiple-choice',
                options: [
                    'Stand still',
                    'Curl into a ball and protect your head',
                    'Climb a tree',
                    'Run uphill'
                ],
                correctAnswer: 'Curl into a ball and protect your head',
                explanation: 'This position protects your vital organs and head from impact.'
            }
        ]
    },
    {
        id: '8',
        title: 'Hurricane Preparedness',
        videoId: 'xHRbnuB9F1I',
        videoUrl: 'https://youtu.be/xHRbnuB9F1I?si=McasRTDIWs-66JF4',
        duration: '8:20',
        description: 'Hurricane preparedness, safety during storms, and post-hurricane actions.',
        gameType: 'drag-drop',
        gameData: {
            instruction: 'Sort hurricane supplies by priority',
            categories: [
                { id: 'essential', label: 'Essential Supplies' },
                { id: 'non-essential', label: 'Non-Essential' }
            ],
            items: [
                { id: 1, text: 'Water supply (3 days)', category: 'essential' },
                { id: 2, text: 'Video Games', category: 'non-essential' },
                { id: 3, text: 'First Aid Kit', category: 'essential' },
                { id: 4, text: 'Fancy Clothes', category: 'non-essential' }
            ]
        },
        quizQuestions: [
            {
                id: '8-1',
                question: 'The eye of a hurricane is:',
                type: 'multiple-choice',
                options: ['Dangerous', 'Calm', 'Fast', 'Cold'],
                correctAnswer: 'Calm',
                explanation: 'The eye is the calm center of the storm.'
            },
            {
                id: '8-2',
                question: 'Boarding up windows prevents:',
                type: 'multiple-choice',
                options: [
                    'Rain from entering',
                    'Shattered glass from flying debris',
                    'Sunlight from entering',
                    'Noise'
                ],
                correctAnswer: 'Shattered glass from flying debris',
                explanation: 'Boarding up windows protects against dangerous flying debris.'
            },
            {
                id: '8-3',
                question: 'What is a "Storm Surge"?',
                type: 'multiple-choice',
                options: [
                    'A sudden rainstorm',
                    'High winds',
                    'Abnormal rise of water generated by a storm',
                    'Thunder'
                ],
                correctAnswer: 'Abnormal rise of water generated by a storm',
                explanation: 'Storm surge is the dangerous rise in sea level caused by hurricane winds.'
            }
        ]
    },
    {
        id: '9',
        title: 'Forest Fire Safety',
        videoId: '_bNLtjHG9dM',
        videoUrl: 'https://youtu.be/_bNLtjHG9dM?si=6SkguPkfFEE7zFPg',
        duration: '7:10',
        description: 'Forest fire behavior, prevention, evacuation, and firefighting support.',
        gameType: 'maze',
        gameData: {
            instruction: 'Escape the forest fire',
            startX: 0,
            startY: 0,
            endX: 9,
            endY: 9,
            obstacles: [[3, 3], [4, 3], [5, 3], [2, 6], [7, 1], [8, 8], [1, 4]]
        },
        quizQuestions: [
            {
                id: '9-1',
                question: 'Most forest fires are caused by:',
                type: 'multiple-choice',
                options: ['Lightning', 'Human activities', 'Animals', 'Sun'],
                correctAnswer: 'Human activities',
                explanation: '90% of forest fires are human-caused.'
            },
            {
                id: '9-2',
                question: 'To prevent forest fires, you should NEVER:',
                type: 'multiple-choice',
                options: [
                    'Camp in the forest',
                    'Leave a campfire unattended',
                    'Hike on trails',
                    'Pick flowers'
                ],
                correctAnswer: 'Leave a campfire unattended',
                explanation: 'Always ensure campfires are completely extinguished before leaving.'
            },
            {
                id: '9-3',
                question: 'If trapped by a forest fire, you should seek:',
                type: 'multiple-choice',
                options: [
                    'Thick bushes',
                    'A bare area like a clearing or road',
                    'The top of a hill',
                    'A pile of leaves'
                ],
                correctAnswer: 'A bare area like a clearing or road',
                explanation: 'Find an area with little or no fuel (trees/brush) for the fire.'
            }
        ]
    },
    {
        id: '10',
        title: 'Course Conclusion',
        videoId: 'OGWxPR5V-5U',
        videoUrl: 'https://youtube.com/watch?v=OGWxPR5V-5U&feature=shared',
        duration: '9:00',
        description: 'Course summary and continuing your disaster preparedness journey.',
        gameType: 'memory-match',
        gameData: {
            instruction: 'Match emergency numbers',
            pairs: [
                { id: 1, term: '100', action: 'Police' },
                { id: 2, term: '108', action: 'Disaster' }
            ]
        },
        quizQuestions: [
            {
                id: '10-1',
                question: 'Most important aspect of DM is:',
                type: 'multiple-choice',
                options: ['Equipment', 'Knowledge', 'Location', 'Insurance'],
                correctAnswer: 'Knowledge',
                explanation: 'Being prepared and informed is key.'
            },
            {
                id: '10-2',
                question: 'Who is responsible for disaster preparedness?',
                type: 'multiple-choice',
                options: [
                    'Only the government',
                    'Only firefighters',
                    'Everyone, including you',
                    'Only doctors'
                ],
                correctAnswer: 'Everyone, including you',
                explanation: 'Disaster resilience requires community and individual participation.'
            },
            {
                id: '10-3',
                question: 'What should be in your "Go Bag"?',
                type: 'multiple-choice',
                options: [
                    'Video games',
                    'Essential supplies like water and first aid',
                    'School books',
                    'Kitchen appliances'
                ],
                correctAnswer: 'Essential supplies like water and first aid',
                explanation: 'A Go Bag should contain critical survival items for 72 hours.'
            }
        ]
    }
];
