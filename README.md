# Jankboard

![build](https://github.com/couscousdude/jankboard/actions/workflows/main.yml/badge.svg)
[![https://good-labs.github.io/greater-good-affirmation/assets/images/badge.svg](https://good-labs.github.io/greater-good-affirmation/assets/images/badge.svg)](https://good-labs.github.io/greater-good-affirmation)

This repository hosts the last version of the source code for the Jankboard
worked on by [me](https://github.com/youwen5).

Jankboard is the fully custom control interface designed in-house by Team 1280
for the 2024 season of the
[FIRST Robotics Competition](https://en.wikipedia.org/wiki/FIRST_Robotics_Competition).
The FIRST Robotics Competition is an international high-school robotics
competition which runs annually. Teams spend six weeks designing, prototyping,
and building a robot to compete in each year's game. The goals for each game
vary by year.

Though this is a Team 1280 project, it's hosted on my GitHub account as I wrote
the vast majority of the code and retain rights to it via the
[license](./LICENSE). A small portion of this codebase was contributed by
@quantum9innovation. I've released it as free and open source software,
compliant with Team 1280's policies for post-competition software stewardship.

The Jankboard is a fully functional control interface designed to be used with
our 2024 robot. It is intended to work alongside the FRC Game Tools application,
which is required by the rules to handle processing robot control inputs. The
Jankboard is a dashboard which receives the telemetry data from the robot and
displays it for the driver. It also processes it to provide useful features. It
replaces the standard "Shuffleboard" dashboard program provided by FIRST, and
has a much cleaner and purpose-built UI.

Jankboard is built with [Tauri](https://tauri.app/), which is a framework for
building desktop application with Rust and webviews. Unlike Electron, it
leverages the platforms built-in web technologies (Chromium on Windows, WebKit
on Linux and MacOS) to avoid shipping a massive bloated binary with a bundled
browser. Our (my) choice of web framework is [Svelte](https://svelte.dev/), a
modern framework with a compiler. To interface with and collect telemetry from
the robot, a Rust backend implements the low-level networking and communication
details and streams the received data back to the frontend UI. As soon as new
data is received, the frontend is updated immediately. We found that this
provided more than enough speed for our purposes, since the robot sends new
telemetry at a rate of 10 Hz. We chose this tech stack because building
beautiful and functional UIs is easiest with the Web, and it allowed us to
rapidly build the application during our 6-week development period.

<!-- prettier-ignore -->
> [!IMPORTANT]
> If you are interested in forking this project or utilizing portions of it for
> your (personal or on behalf of your organization) use, please see
> [the licensing section](#licensing) for a detailed explanation of what this
> project's status as free software entails.

---

<table>
<tr><td><b>Table of Contents:</b></td></tr>

  <tr>
<td><!--toc:start-->

- [Jankboard 2](#jankboard-2)
  - [Installation guide](#installation-guide)
  - [A brief footnote on the name "Jankboard 2"](#a-brief-footnote-on-the-name-jankboard-2)
  - [For developers](#for-developers)
    - [Prerequisites](#prerequisites)
    - [Installation steps](#installation-steps)
  - [Troubleshooting common issues](#troubleshooting-common-issues)
  - [Current progress and improvements over (original) Jankboard](#current-progress-and-improvements-over-original-jankboard)
  - [TODO](#todo)
  <!--toc:end-->

</tr>
</table>

---

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

1. Clone the repository. The `client` directory contains the vast majority of
   the source code for the desktop app, while the `splash-screen` directory
   contains the source code for the splash screen displayed before the app
   loads. You don't have to touch anything in `splash-screen` unless you want to
   modify it, in which case check the README in `splash-screen` for more
   information.
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
6. To create a production binary, run `pnpm run tauri build`. Tauri
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

## Licensing

This project is released as free software under the
[GNU General Public License](./LICENSE). What that entails for a developer
seeking to use portions of this codebase, or even the entirety of the codebase,
for your own purposes, is the following:

You are given the right to copy, modify, and distribute this software, in its
entirety or just a portion of it, with or without modification, provided you
meet the following requirements:

- If you do make modifications to the software, you are required to release
  them, also under the terms of the GPL v3, **if you are planning to distribute
  the software**. However, this is not required if you are not planning to
  distribute it. See below.
- You may modify or use it however you'd like personally or internally (within
  an organization, like your robotics team), without releasing your changes or
  code under the GPL. This means that if you make a custom dashboard based on
  this code for your own robotics team, you do not have to release the code as
  long as you are not planning to distribute your custom dashboard to other
  robotics teams or publish it publicly on the internet. If you do intend to
  distribute it, then you must release the modified source under the terms of
  the GPL v3.
  - We think that this is fair - if you intend to keep an internal private tool,
    we should not stop you from doing so. However, if you intend to publish your
    tool or share it with others, then you should also publish or share the
    source code for the benefit of other developers and robotics teams, as we
    have done here.

See the full license text of the [GPL](./LICENSE) if you need further
clarification. The above is simply an explanation of the license, if any
conflicts between the above text and the license text arise, then the original
license text takes precedence.
