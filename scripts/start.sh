#!/bin/bash

#define the server and client directories
SERVER_DIR="../server"
CLIENT_DIR="../client"

#function to start the server
start_server() {
    echo "Navigating to server directory: $SERVER_DIR"
    cd $SERVER_DIR || { echo "Server directory not found!"; exit 1; }

    echo "Starting the server..."
    node index.js
}

#function to start the client
start_client() {
    echo "Navigating to client directory: $CLIENT_DIR"
    cd $CLIENT_DIR || { echo "Client directory not found!"; exit 1; }

    echo "Starting the client..."
    PORT=3001 npm start

}

#run the server and client
start_server &
start_client