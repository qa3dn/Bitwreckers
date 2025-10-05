#!/usr/bin/env python3
import requests
import json

# Supabase configuration
SUPABASE_URL = "https://iprvecbzvzzyrepzlsho.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcnZlY2J6dnp6eXJlcHpsc2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDYwNjQsImV4cCI6MjA3NTE4MjA2NH0.aPzFSPMW4szPrBJDIwiD3sVPLGivRP91hornxvIqwrU"

def execute_sql(sql_query):
    """Execute SQL query using Supabase REST API"""
    url = f"{SUPABASE_URL}/rest/v1/rpc/exec_sql"
    headers = {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
        "Content-Type": "application/json"
    }
    
    data = {
        "sql": sql_query
    }
    
    try:
        response = requests.post(url, headers=headers, json=data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}")
        return False

def main():
    print("Setting up contact_messages table...")
    
    # Read SQL file
    with open('create_contact_messages_table.sql', 'r', encoding='utf-8') as f:
        sql_content = f.read()
    
    # Split into individual statements
    statements = [stmt.strip() for stmt in sql_content.split(';') if stmt.strip()]
    
    for i, statement in enumerate(statements):
        print(f"\nExecuting statement {i+1}/{len(statements)}...")
        print(f"SQL: {statement[:100]}...")
        
        success = execute_sql(statement)
        if success:
            print("✅ Success")
        else:
            print("❌ Failed")
    
    print("\nSetup completed!")

if __name__ == "__main__":
    main()

