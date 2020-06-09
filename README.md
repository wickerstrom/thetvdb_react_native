# TheTVDB - React Native Client

TheTVDB - React Native Client is a React Native application for Android and iOS which enables the user to search and get information about tv series.

## Installation

1. Go to https://reactnative.dev/docs/environment-setup to learn how to set up a development environment on your machine.
2. Go to https://thetvdb.com/api-information to register and get credentials to use the TheTVDB-API.
3. Clone this repository.
4. Go to project root and run "npm install".
5. Add a .env-file in the root of the React Native Project-folder (./thetvdb_react_native), with your own TheTVDB-API credentials:

```bash
APIKEY="[YOUR API-KEY]"
USERKEY="[YOUR USERKEY]"
USERNAME="[YOUR USERNAME]"
```

6. run "react-native run-android" / "react-native run-ios".

## Usage

This application consists of two views, one where the user is able to search among tv series, and another view where the user can see details about a particular tv series.

## Further Improvements

Due to time limitations there are some things that could be improved in the future:

- Adding tests
- Develop the tv series details page, with more information and styling.
- Adding persistence, store the API response data and read it for repeated requests. Even
  when offline.
- Create a favorite shows list
- Further develop the UX/UI.
