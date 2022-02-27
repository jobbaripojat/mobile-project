# React Native mobile project

This project uses Javascript and the React Native framework to create a unified platform with its own appstore. The user would be able to choose and install client apps they want to the host platform. Options to save the state of a program and continuing where it was left off were planned.

The installation packages for individual apps were stored in the Google Cloud Service and then downloaded on to the machine per user request. In its current state, the program fetches information from the cloud using Restful web services as a middle-man in communication and installs the downloaded package to the host program. An attempt was made to import the installation packages dynamically during runtime, but it failed and the program needs a full rebuild to include and display the installed programs.
