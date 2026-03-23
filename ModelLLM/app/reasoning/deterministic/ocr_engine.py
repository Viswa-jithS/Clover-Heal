from pathlib import Path
import fitz  # PyMuPDF


class OCRExtractionError(Exception):
    pass


def extract_report_text(path: str) -> str:
    """
    Extract text from medical PDF reports.
    Handles multi-page PDFs and basic cleaning.
    """

    file_path = Path(path)

    if not file_path.exists():
        raise OCRExtractionError("Report file not found.")

    try:
        doc = fitz.open(file_path)
    except Exception as e:
        raise OCRExtractionError(f"Failed to open PDF: {str(e)}")

    extracted_text = []

    for page in doc:
        text = page.get_text("text")
        if text:
            extracted_text.append(text)

    doc.close()

    full_text = " ".join(extracted_text)

    return _clean_extracted_text(full_text)


def _clean_extracted_text(text: str) -> str:
    """
    Normalize medical report text.
    """

    text = text.replace("\n", " ")
    text = " ".join(text.split())
    return text.strip()