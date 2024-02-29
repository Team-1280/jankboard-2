# Jankboard 2

[![maintainability status](https://api.codeclimate.com/v1/badges/4bedd567dbf60ec87164/maintainability)](https://codeclimate.com/repos/65dfbdc904f9ed00bbf381c8/maintainability)

A remastered version of the original Jankboard, with a focus on minimizing the Jank portion. Designed from the ground up to be easy to maintain and extend, unlike the original.
The frontend is powered by Svelte 4 (unfortunately, we had to drop support for the bleeding edge Svelte 5 due to lack of Vite support).
This project is closed source (for now) and licensed under a modified BSD 3.0 license.

## Installation guide

We recommend installing the latest stable release binaries from [our release page](https://github.com/Team-1280/Jankboard-2/releases/), if you're just looking to run the Jankboard. Currently, there is no stable release which includes telemetry uplink, which is in alpha.

## For developers

If you would like to contribute to Jankboard 2, there's only a few simple steps to get the development build up and running.

### Prerequisites

- Rust and `cargo`. Check the [Rust docs](https://www.rust-lang.org/learn) for more information. We recommend you install Rust using `rustup`. Keep in mind that this is ONLY necessary for development, release binaries do not require Rust.
- NodeJS and `npm`, for installing dependencies and the `vite` development server.
- If you would like the install the (deprecated) Python backend, you will need to install the `poetry` package manager.

1. Clone the repository. The `app` folder contains most of the (soon to be deprecated) Python code that powers the telemetry. The `client` folder contains the code for the desktop app. The `client/src-tauri` contains the  The python backend in `app` is currently being deprecated in favor of a Rust backend. If you need to run it for any reason, check the section below (**Troubleshooting common issues**).
2. `cd` into the `client` folder. The configuration files and `package.json`, as well as project code for the desktop app are all stored here. To install dependencies, simply run `npm i`.
3. To run the desktop app in developer mode (with automatic hot stateful reload and other useful features like error reporting), make sure you're in the `client` directory and run `npm run tauri dev`. This will install and build the Rust dependencies via `cargo` and initialize the `vite` development server for the frontend. Note that since this is basically just running the `vite` development server and then connecting the Tauri webview to it, there may be slightly inconsistent behavior in dev mode versus production mode.
4. To run the frontend, first `cd` into the `client` directory. This is where the project files for the frontend are stored, including `package.json` and various configuration files.
5. To create a production binary, run `npm run tauri dev`. Tauri cross-compilation is still in beta, so you should generally try to build targetting the same OS you're currently running. Check [the Tauri docs](https://tauri.app/v1/guides/building/) for more information.

## Troubleshooting common issues

- If you're experiencing issues with TypeScript type checking or dependency resolution, try opening your editor directly in the `client` directory so it picks up the `tsconfig.json` and uses the project's own TypeScript language server.
- If you don't have access to a development environment that supports running standalone executables (eg. Github Codespaces), you can try running `npm run dev` instead of `npm run tauri dev`, which will open a development server at `localhost:5173` with the frontend running in the web. However, this may break at any time as critical functionality is more directly attached to the Rust backend.
- If for some reason you need to install and use the Python backend while we are migrating to Rust, run `poetry install --no-root` in the root directory of the project to install dependencies. You can start the server with `poetry run flask --app app/server.py run --host localhost --port 1280` (it must be running at port `1280` for the frontend to detect it).

## Current progress

- Basic UI layout complete
- Media player working with a few small issues
- App system working smoothly
- Camera feed likely working
- Frontend syncs basic telemetry data with robot through the same Socket-IO code that powered Jankboard v1
- Notification service installed, with Toast and audio capability

## TODO

- Camera cutout overlay
- Overhaul audio player system
- Robot visualization (3D, in Threlte).
- Overhaul backend
- Further integrate telemetry (like GPWS, collision warning, etc)
- Finish re-creating / adding various voice alerts and sequences
