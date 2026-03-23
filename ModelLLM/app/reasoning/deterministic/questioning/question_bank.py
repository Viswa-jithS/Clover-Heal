QUESTION_BANK = {
    "general": [
        {
            "id": "duration",
            "question": "How long have the symptoms been present?",
            "type": "choice",
            "options": ["<24h", "1–3 days", ">3 days"],
            "scores": [0, 1, 2]
        },
        {
            "id": "age",
            "question": "Your age group?",
            "type": "choice",
            "options": ["<18", "18–40", "41–60", ">60"],
            "scores": [1, 1, 2, 3]
        }
    ],

    "cardiac": [
        {
            "id": "chest_severity",
            "question": "How severe is the chest discomfort?",
            "type": "scale",
            "range": [1, 10],
            "score_map": [(7, 4), (4, 2)]
        },
        {
            "id": "exertion",
            "question": "Does it worsen with physical activity?",
            "type": "yes_no",
            "yes_score": 3,
            "no_score": 0
        }
    ],

    "respiratory": [
        {
            "id": "rest_breathlessness",
            "question": "Breathlessness while resting?",
            "type": "yes_no",
            "yes_score": 3,
            "no_score": 0
        },
        {
            "id": "cough_duration",
            "question": "Cough lasting more than 3 days?",
            "type": "yes_no",
            "yes_score": 2,
            "no_score": 0
        }
    ],

    "neurological": [
        {
            "id": "fainting",
            "question": "Any fainting or blackouts?",
            "type": "yes_no",
            "yes_score": 4,
            "no_score": 0
        }
    ],

    "gastrointestinal": [
        {
            "id": "vomiting",
            "question": "Repeated vomiting?",
            "type": "yes_no",
            "yes_score": 2,
            "no_score": 0
        },
        {
            "id": "blood",
            "question": "Blood in vomit or stool?",
            "type": "yes_no",
            "yes_score": 4,
            "no_score": 0
        }
    ]
}
