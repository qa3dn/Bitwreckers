#!/bin/bash

echo "Starting Bitwreckers Development Environment..."
echo "================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed or not in PATH"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed or not in PATH"
    echo "Please install npm"
    exit 1
fi

# Make the script executable
chmod +x start-all.js

# Start the main script
echo "Starting all services..."
node start-all.js

