#!/bin/bash

#define the server and client directories
SERVER_DIR="server"
CLIENT_DIR="client"

#function to check if a port is available
check_port() {
    PORT=$1
    nc -z localhost $PORT
    if [ $? -eq 0 ]; then
        echo "Port $PORT is in use."
        exit 1
    fi
}

#function to install dependencies and start the server
start_server() {
    echo "Navigating to server directory: $SERVER_DIR"
    cd $SERVER_DIR || { echo "Server directory not found!"; exit 1; }

    echo "Installing server dependencies..."
    npm install

    #check if port 3000 is available
    check_port 3000

    echo "Starting the server..."
    node index.js
}

#function to install dependencies and start the client
start_client() {
    echo "Navigating to client directory: $CLIENT_DIR"
    cd $CLIENT_DIR || { echo "Client directory not found!"; exit 1; }

    echo "Installing client dependencies..."
    npm install

    echo "Starting the client..."
    PORT=3001 npm start
}

#run the server and client
start_server &
start_client
