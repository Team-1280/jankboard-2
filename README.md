# Jankboard

[![](https://img.shields.io/static/v1?logo=nixos&logoColor=white&label=&message=Built%20with%20Nix&color=41439a)](https://nixos.org/)

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
[@quantum9innovation](https://github.com/quantum9Innovation/). I've released it
as free and open source software under the GPL v3, as permitted by Team 1280's
policies for post-competition software stewardship.

You can try it out effortlessly on Linux if you have the [Nix package
manager](https://nixos.org/) installed with
[flakes](https://zero-to-nix.com/concepts/flakes) enabled. This repository
provides a Nix flake that hermetically compiles Jankboard from source.
Otherwise, you can compile it with the installation instructions detailed
below.

```bash
nix run github:youwen5/jankboard
```

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
<td>

<!--toc:start-->

- [Jankboard](#jankboard)
  - [Installation guide](#installation-guide)
  - [A brief note on the name "Jankboard"](#a-brief-note-on-the-name-jankboard)
  - [For developers](#for-developers)
    - [Prerequisites](#prerequisites)
    - [Installation steps](#installation-steps)
      - [Some notes:](#some-notes)
  - [Troubleshooting common issues](#troubleshooting-common-issues)
  - [Licensing](#licensing)
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

## A brief note on the name "Jankboard"

The name "Jankboard" comes from Team 1280's original attempt at creating a
custom dashboard. Though it looked and functioned superficially similar to
Jankboard, it was not designed with maintainability in mind and became
exceptionally difficult to extend and develop as the codebase became bloated.
Jankboard is a version redesigned from the ground up with the goal of easy
maintainability and richer features. It contains both a completely rewritten
frontend and backend, which have been improved in almost every possible way.

## For developers

If you would like to contribute to Jankboard, there's only a few simple steps to
get the development build up and running. Please keep in mind that the following
is only necessary if you are building from source; the binaries have no external
dependencies.

### Prerequisites

- Rust and `cargo`. Check the [Rust docs](https://www.rust-lang.org/learn) for
  more information.
- `pnpm`, for installing dependencies and the `vite` development server.
- NodeJS

### Installation steps

1. Clone the repository using your preferred method.
2. Enter the `client` directory. This is where the majority of the app's source
   code lives.
3. Run `pnpm install` to download all required NPM dependencies.
4. To create a production build, run `pnpm tauri build`. This will use Cargo to
   fetch and build all the Rust dependencies, then compile the app and output an
   executable for your platform in `target`.
5. To launch a developer build with hot reloading and convenient debugging
   features, run `pnpm tauri dev`.

#### Some notes:

- The `client` directory contains the vast majority of the source code for the
  desktop app, while the `splash-screen` directory contains the source code for
  the splash screen displayed before the app loads. You don't have to touch
  anything in `splash-screen` unless you want to modify it, in which case check
  the [README](./splash-screen/README.md) in `splash-screen` for more
  information.

- Tauri cross-compilation is still in beta, so you should build targeting the
  same OS you're currently running. For example, create Windows builds from
  Windows. Check [the Tauri docs](https://tauri.app/v1/guides/building/) for
  more information. We also have some Github Actions set up to automatically
  compile a production build for all platforms, but this is expensive (uses over
  30 minutes of our quota), and should only be used for publishing new major
  releases.

## Troubleshooting common issues

- If you're experiencing issues with TypeScript type checking or dependency
  resolution, try opening your editor directly in the `client` directory so it
  picks up the `tsconfig.json` and uses the project's own TypeScript language
  server.

## Licensing

This project is released as free software under the terms of the
[GNU General Public License](./LICENSE). What that entails for a developer
seeking to use portions of this codebase, or even the entirety of the codebase,
for their own purposes, is the following:

You are given the freedom (rights) to copy, modify, and distribute this
software, in its entirety or just a portion of it, with or without modification,
provided you meet the following requirements:

- If you do make modifications to the software, you are required to release the
  source code of your modifications, also under the terms of the GPL v3, **if
  you are planning to distribute the software**. However, this is **not required
  if you are not planning to distribute it**. See below.
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
