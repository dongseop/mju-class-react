# Expo SDK32 MobX Boilerplate #

## How to start ##
1) Open the root directory of the project after cloning the repo
2) `yarn`
3) `expo start`
4) Open the expo mobile app and select the running project

## Notes ##
This is based on the `expo init` tab template but with MobX added for state management. The home screen has been modified to allow changing of 2 state variables to give you an idea of how it works.

The state store can be found in `stores/Application.State.Mobx.js`.

It also includes `mobx-persist` to allow state to be saved to `asyncStorage`.