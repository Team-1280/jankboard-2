# Jankboard 2

A remastered version of the original Jankboard, with a focus on minimizing the Jank portion. Designed from the ground up to be easy to maintain and extend, unlike the original.
The frontend is powered by Svelte 4 (unfortunately, we had to drop support for the bleeding edge Svelte 5 due to lack of Vite support).
This project is closed source (for now) and licensed under a modified BSD 3.0 license.

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
