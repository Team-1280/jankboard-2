# Jankboard 2

[![maintainability status](https://api.codeclimate.com/v1/badges/4bedd567dbf60ec87164/maintainability)](https://codeclimate.com/repos/65dfbdc904f9ed00bbf381c8/maintainability)

A remastered version of the original Jankboard, with a focus on minimizing the Jank portion. Designed from the ground up to be easy to maintain and extend, unlike the original.
The frontend is powered by Svelte 4 (unfortunately, we had to drop support for the bleeding edge Svelte 5 due to lack of Vite support).
This project is closed source (for now) and licensed under a modified BSD 3.0 license.

## Installation guide

We recommend installing the latest stable release binaries from [our release page](https://github.com/Team-1280/Jankboard-2/releases/), if you're just looking to run the Jankboard. Alternatively, if you can't find release binaries for your system,
follow the directions below in the **For developers** section to build it from source.

## For developers

If you would like to contribute to Jankboard 2, there's only a few simple steps to get the development build up and running.

### Prerequisites

- Rust and `cargo`. Check the [Rust docs](https://www.rust-lang.org/learn) for more information. We recommend you install Rust using `rustup`. Keep in mind that this is ONLY necessary for development, release binaries do not require Rust.
- NodeJS and `npm`, for installing dependencies and the `vite` development server.
- If you would like the install the (deprecated) Python backend, you will need to install the `poetry` package manager.

### Installation steps

1. Clone the repository. The `app` folder contains most of the (deprecated) Python code that powers the telemetry. The `client` folder contains the code for the desktop app. The `client/src-tauri` contains the Rust source code for the backend that interfaces with the robot via Network Tables. The python backend in `app` is currently being deprecated in favor of a Rust backend. If you need to run it for any reason, check the section below (**Troubleshooting common issues**).
2. `cd` into the `client` folder. The configuration files and `package.json`, as well as project code for the desktop app are all stored here. To install dependencies, simply run `npm i`.
3. To run the desktop app in developer mode (with automatic hot stateful reload and other useful features like error reporting), make sure you're in the `client` directory and run `npm run tauri dev`. This will install and build the Rust dependencies via `cargo` and initialize the `vite` development server for the frontend. Note that since this is basically just running the `vite` development server and then connecting the Tauri webview to it, there may be slightly inconsistent behavior in dev mode versus production mode.
4. To create a production binary, run `npm run tauri build`. Tauri cross-compilation is still in beta, so you should generally try to build targeting the same OS you're currently running. Check [the Tauri docs](https://tauri.app/v1/guides/building/) for more information.

## Troubleshooting common issues

- If you're experiencing issues with TypeScript type checking or dependency resolution, try opening your editor directly in the `client` directory so it picks up the `tsconfig.json` and uses the project's own TypeScript language server.
- If you don't have access to a development environment that supports running standalone executables (eg. Github Codespaces), you can try running `npm run dev` instead of `npm run tauri dev`, which will open a development server at `localhost:5173` with the frontend running in the web. However, app behavior may be inconsistent and you will not get any features from the Rust backend.
- If for some reason you need to install and use the Python backend, run `poetry install --no-root` in the root directory of the project to install dependencies. You can start the server with `poetry run flask --app app/server.py run --host localhost --port 1280` (it must be running at port `1280` for the frontend to detect it), and it only works when the frontend is running in development mode.

## Current progress and improvements over (original) Jankboard

- Layout, toasts/notifications, music player, and app system ported.
- Toast and audio cue system is much more robust
- Transitions added almost everywhere to make things smoother
- Tauri app created successfully, currently still using Flask backend
- Visualization vastly improved with Threlte (Three.js) powered 3D robot simulation
- Robot model ported successfully via massive optimization through polygon decimation
- Added settings app with options to disable certain features and developer tools for testing

## TODO

- Camera cutout overlay
- Overhaul audio player system
- Overhaul visualization (especially camera)
- Overhaul backend in Rust
- Further integrate telemetry (like GPWS, collision warning, etc)
- Finish re-creating / adding various voice alerts and sequences
- Create dynamic voice prompt system to support new languages very easily
- Add dynamic voice prompt fallback to support incremental voice prompt migration
