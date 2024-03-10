# Jankboard 2

[![maintainability status](https://api.codeclimate.com/v1/badges/4bedd567dbf60ec87164/maintainability)](https://codeclimate.com/repos/65dfbdc904f9ed00bbf381c8/maintainability)
![build](https://github.com/Team-1280/Jankboard-2/actions/workflows/main.yml/badge.svg)
![build all platforms](https://github.com/Team-1280/Jankboard-2/actions/workflows/publish-all.yml/badge.svg)

Team 1280's custom, powerful, and opinionated dashboard for controlling FRC
Robots, built with [Svelte](https://svelte.dev/) and
[TypeScript](https://www.typescriptlang.org/), and powered by
[Rust (Tauri)](https://tauri.app/).

Unlike Shuffleboard, which attempts to provide an unopinionated "blank slate"
with an easy to configure and modular environment for displaying robot data,
Jankboard 2 is purpose built for Team 1280's Swerve drivebase robots and their
needs. It's tightly integrated with our proprietary robot features, like
collision warning and detection, and displays robot drive modes.

Shuffleboard, while easy to set up, lacks the fine-grained adjustments and
customization which are afforded by a fully custom solution. The UI looks
outdated and is quite ugly. In stark contrast, Jankboard's UI is reminiscient of
and inspired by dashboards designed by car manufacturers, making it easy for the
driver to get the information they need at a glance, without squinting at
Shuffleboard's tiny and ugly UIs. It even includes a full 3D robot
visualization, synced directly with the robot's movements in real life.

Even though the dashboard's layout and design are highly opinionated and not
meant to be heavily modular, features can still be easily extended via a drop-in
app system which supports easy drop-in app integration. Jankboard 2 ships with a
few apps by default, featuring a camera feed, robot settings configurator, and
even a music player and games.

## Installation guide

We recommend installing the latest stable release binaries from
[our release page](https://github.com/Team-1280/Jankboard-2/releases/), if
you're just looking to run the Jankboard. Alternatively, if you can't find
release binaries for your system, follow the directions below in the
[For developers](#for-developers) section to build it from source. We will
periodically update the releases with new builds when we come out with stable
versions, and we follow [semantic versioning](https://semver.org/).

## A brief footnote on the name "Jankboard 2"

The name "Jankboard" comes from Team 1280's original attempt at creating a
custom dashboard. Though it looked and functioned superficially similar to
Jankboard 2, it was not designed with maintainability in mind and became
exceptionally difficult to extend and develop as the codebase became bloated.
Jankboard 2 is a version redesigned from the ground up with the goal of easy
maintainability and richer features. It contains both a completely rewritten
frontend and backend, which have been improved in almost every possible way. You
can view the original version at
[its archived repository.](https://github.com/Team-1280/Jankboard-Super-Jank/tree/f42715f5ae1897e95ef15103b16ba6e764d2c0be)

## For developers

If you would like to contribute to Jankboard 2, there's only a few simple steps
to get the development build up and running.

### Prerequisites

- Rust and `cargo`. Check the [Rust docs](https://www.rust-lang.org/learn) for
  more information. We recommend you install Rust using `rustup`. Keep in mind
  that this is ONLY necessary for development, release binaries do not require
  Rust.
- `pnpm`, for installing dependencies and the `vite` development server.
- Ideally, NodeJS, but it's technically not required as `pnpm` brings its own
  node binary.

### Installation steps

1. Clone the repository. The `client` folder contains the vast majority of the
   source code for the desktop app.

2. `cd` into the `client` folder. The configuration files and `package.json`,
   This is where stuff like `package.json` and configuration files for our
   various tooling are housed. The `client/src-tauri` directory contains the
   Rust source code and `cargo` configuration files for the backend that
   interfaces with the robot via Network Tables.
3. Run `pnpm install` to install dependencies.

4. To run the desktop app in developer mode (with automatic hot stateful reload
   and other useful features like error reporting), make sure you're in the
   `client` directory and run `pnpm run tauri dev`. This will install and build
   the Rust dependencies via `cargo` and initialize the `vite` development
   server for the frontend. Note that since this is basically just running the
   `vite` development server and then connecting the Tauri webview to it, there
   may be slightly inconsistent behavior in dev mode versus production mode.
5. To create a production binary, run `pnpm run tauri build`. Tauri

6. To create a production binary, run `npm run tauri build`. Tauri
   cross-compilation is still in beta, so you should generally try to build
   targeting the same OS you're currently running. Check
   [the Tauri docs](https://tauri.app/v1/guides/building/) for more information.
   We also have some Github Actions set up to automatically compile a production
   build for all platforms, but this is expensive (uses over 30 minutes of our
   quota), and should only be used for publishing new major releases.

## Troubleshooting common issues

- If you're experiencing issues with TypeScript type checking or dependency
  resolution, try opening your editor directly in the `client` directory so it
  picks up the `tsconfig.json` and uses the project's own TypeScript language
  server.
- If you don't have access to a development environment that supports running
  standalone executables (eg. Github Codespaces), you can try running
  `pnpm run dev` instead of `pnpm run tauri dev`, which will open a development
  server at `localhost:5173` with the frontend running in the web. However, app
  behavior may be inconsistent and you will not get any features from the Rust
  backend.

## Current progress and improvements over (original) Jankboard

- Layout, toasts/notifications, music player, and app system ported.
- Toast and audio cue system is much more robust
- Transitions added almost everywhere to make things smoother
- Tauri app created successfully, currently still using Flask backend
- Visualization vastly improved with Threlte (Three.js) powered 3D robot
  simulation
- Robot model ported successfully via massive optimization through polygon
  decimation
- Added settings app with options to disable certain features and developer
  tools for testing
- Created dynamic voice prompt system to support new languages very easily
- Overhaul backend in Rust
- Overhaul visualization (especially camera)
- Added Vlad's voice lines (AT LAST)

## TODO

- Camera cutout overlay
- Overhaul audio player system
- Further integrate telemetry (like GPWS, collision warning, etc)
- Finish re-creating / adding various voice alerts and sequences
