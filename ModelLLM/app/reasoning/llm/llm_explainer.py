from groq import Groq
from app.core.config import settings

client = Groq(api_key=settings.GROQ_API_KEY)


def explain_condition(disease: str, severity: str) -> str:
    """
    Generate a patient-friendly explanation of a medical condition
    using the Groq LLM API.
    """
    prompt = f"""
You are a medical information assistant.
Explain the condition "{disease}" in simple terms.
Severity level: {severity}.
Do not diagnose or prescribe.
Always advise consulting a healthcare professional.
Keep the explanation under 200 words.
"""

    try:
        response = client.chat.completions.create(
            model=settings.GROQ_MODEL,
            messages=[
                {"role": "system", "content": "You are a helpful medical information assistant. Provide clear, accurate medical information without diagnosing or prescribing."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=400
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Unable to generate explanation at this time. Please consult a healthcare professional about {disease}."
