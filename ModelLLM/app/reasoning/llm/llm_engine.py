import json
from groq import Groq
from app.core.config import settings

client = Groq(api_key=settings.GROQ_API_KEY)

SYSTEM_PROMPT = """
You are a clinical assistant.
Extract structured medical signals from user comments.
Return JSON only.
Do NOT guess diseases.
Do NOT provide diagnosis.
Only extract:

{
  "risk_factors": [],
  "symptom_modifiers": [],
  "suggested_questions": []
}
"""


def analyze_free_text_with_llm(user_text: str) -> dict:
    """
    Analyze free text using Groq LLM to extract
    risk factors, symptom modifiers, and suggested follow-up questions.
    """
    if not user_text or not user_text.strip():
        return {
            "risk_factors": [],
            "symptom_modifiers": [],
            "suggested_questions": []
        }

    try:
        response = client.chat.completions.create(
            model=settings.GROQ_MODEL,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_text}
            ],
            response_format={"type": "json_object"},
            temperature=0.3,
            max_tokens=512
        )
        return json.loads(response.choices[0].message.content)
    except Exception:
        return {
            "risk_factors": [],
            "symptom_modifiers": [],
            "suggested_questions": []
        }
