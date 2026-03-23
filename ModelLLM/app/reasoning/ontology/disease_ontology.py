from lxml import etree

DOID_MAP = {}

def load_doid():
    tree = etree.parse("data/ontology/doid.owl")
    root = tree.getroot()

    for elem in root.iter():
        if "label" in elem.tag:
            disease_name = elem.text
            DOID_MAP[disease_name.lower()] = disease_name

load_doid()

def map_to_doid(disease_name: str):
    return DOID_MAP.get(disease_name.lower(), None)
