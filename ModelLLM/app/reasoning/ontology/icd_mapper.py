import xml.etree.ElementTree as ET
from rapidfuzz import process, fuzz

ICD_MAP = {}

def load_icd():
    tree = ET.parse("data/icd/icd10cm_2026.xml")
    root = tree.getroot()

    for diag in root.iter("diag"):
        name_elem = diag.find("name")
        desc_elem = diag.find("desc")

        if name_elem is not None and desc_elem is not None:
            code = name_elem.text.strip()
            description = desc_elem.text.strip()

            ICD_MAP[description.lower()] = {
                "code": code,
                "description": description
            }

load_icd()

def get_icd_chapter(code):
    if not code:
        return None

    first_letter = code[0]

    if first_letter == "I":
        return "Diseases of the circulatory system"
    if first_letter == "J":
        return "Diseases of the respiratory system"
    if first_letter == "K":
        return "Diseases of the digestive system"
    if first_letter == "E":
        return "Endocrine, nutritional and metabolic diseases"

    return "Other"

def map_to_icd(disease_name: str, threshold=75):
    disease_name = disease_name.lower()

    # Exact match
    if disease_name in ICD_MAP:
        entry = ICD_MAP[disease_name]
        return {
            "code": entry["code"],
            "description": entry["description"],
            "chapter": get_icd_chapter(entry["code"]),
            "match_confidence": 100
        }

    # Fuzzy match
    match = process.extractOne(
        disease_name,
        ICD_MAP.keys(),
        scorer=fuzz.token_sort_ratio
    )

    if match and match[1] >= threshold:
        entry = ICD_MAP[match[0]]
        return {
            "code": entry["code"],
            "description": entry["description"],
            "chapter": get_icd_chapter(entry["code"]),
            "match_confidence": match[1]
        }

    return None
