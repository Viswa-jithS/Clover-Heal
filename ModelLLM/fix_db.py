import sys
import os
sys.path.append(os.getcwd())
from sqlalchemy import create_engine, text
from app.core.config import settings

engine = create_engine(settings.DATABASE_URL)
with engine.connect() as conn:
    print("Adding name column...")
    try:
        conn.execute(text("ALTER TABLE users ADD COLUMN IF NOT EXISTS name VARCHAR;"))
        conn.commit()
        conn.execute(text("UPDATE users SET name = 'Admin' WHERE name IS NULL;"))
        conn.commit()
        conn.execute(text("ALTER TABLE users ALTER COLUMN name SET NOT NULL;"))
        conn.commit()
        print("Success!")
    except Exception as e:
        print(f"Error: {e}")
