import psycopg2

DATABASE_URL = "postgresql://postgres:1712@localhost:5432/cloverheal_db"

def main():
    try:
        print("Connecting to database...")
        conn = psycopg2.connect(DATABASE_URL)
        conn.autocommit = True
        cur = conn.cursor()

        # Add the assigned_admin_id column
        print("Adding assigned_admin_id column to cases table...")
        try:
            cur.execute("ALTER TABLE cases ADD COLUMN assigned_admin_id UUID REFERENCES users(id);")
            print("Successfully added assigned_admin_id column.")
        except psycopg2.errors.DuplicateColumn:
            print("Column assigned_admin_id already exists.")

        cur.close()
        conn.close()
        print("Database migration complete.")
    except Exception as e:
        print(f"Error during database migration: {e}")

if __name__ == "__main__":
    main()
