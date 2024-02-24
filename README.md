# Jankboard 2

A remastered version of the original Jankboard, with a focus on minimizing the Jank portion. Designed from the ground up to be easy to maintain and extend, unlike the original.
The frontend is powered by Svelte 4 (unfortunately, we had to drop support for the bleeding edge Svelte 5 due to lack of Vite support).
This project is closed source (for now) and licensed under a modified BSD 3.0 license.

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
