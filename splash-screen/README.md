# Jankboard 2 Splash Screen

This directory contains the source code for the splash screen used by the Tauri
app. It's a standalone Svelte + Vite project, with its own separate
dependencies. In most cases, you won't ever have to touch the code in this
directory unless you want to modify the loading screen. However, if you do
decide to modify the files in this directory, keep in mind that **_they will not
be reflected in the app until you compile and replace the_** `splashscreen.html`
**_file in_** `/client/public`. Read more below to figure out how to do that.

## How it works

Tauri allows you to add a splash screen to display before your app loads by
adding a file to the output directory called `splashscreen.html`. This is done
in Jankboard 2 by adding the `splashscreen.html` file to the `public` directory,
as recommended by Tauri's docs. However, since it's just one HTML file, we can't
typically use a framework like Svelte, which outputs a CSS and JS bundle. While
we can definitely write a simple splash screen in a raw HTML file, we miss out
on nice Svelte features like easy to write animations. The Vite project in this
directory solves that by using
[vite-plugin-singlefile](https://github.com/richardtallent/vite-plugin-singlefile)
to inline all CSS and JS outputted by Svelte's compiler into the HTML, resulting
in a nice single `index.html` output in `./dist`, which can then be renamed as
`splashscreen.html` and moved into the main Jankboard 2 project to be used as
the loading splash screen. The best part about this is that since Svelte is
meant to be compiled into such a small bundle size, there are virtually zero
downsides to doing this versus writing the splash screen in raw HTML. We can
easily write a nice looking splash screen using the same techniques as our
existing codebase without having to deal with raw HTML and CSS. If you don't
need to modify the splash screen, you **don't need to touch this project!**
`splashscreen.html` is already included in the main project and you don't have
to build it yourself here. If you do want to modify this splash screen, continue
to the instructions below.

## Installation and development instructions

**Again, you don't need to do this if you don't want to modify the splash
screen!**

1. Install dependencies via `pnpm install`.
2. Run `pnpm dev` to start the development server.
3. After you're done making your changes, run `pnpm build`. This will output a
   single `index.html` file to `./dist`, which contains all of the JS and CSS
   inlined.
4. Rename this outputted `index.html` to `splashscreen.html`, and then move it
   into `/client/public`, replacing the existing `splashscreen.html`.
