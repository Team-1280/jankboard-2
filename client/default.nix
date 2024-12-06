{
  stdenv,
  rustPlatform,
  nodejs,
  pnpm_9,
  cargo,
  rustc,
  cargo-tauri,
  pkg-config,
  gtk4,
  webkitgtk_4_0,
  libsoup,
  wrapGAppsHook4,
  splashscreen,
  gst_all_1,
  lib,
}:

let
  inherit (builtins) fromJSON readFile;
  pnpm = pnpm_9;
in
stdenv.mkDerivation (finalAttrs: {
  pname = "jankboard";
  version = (fromJSON (readFile "${finalAttrs.src}/src-tauri/tauri.conf.json")).package.version;

  src = ./.;

  sourceRoot = "client/src-tauri";

  pnpmDeps = pnpm.fetchDeps {
    inherit (finalAttrs) pname version src;
    hash = "sha256-u8g1E/onxB90Jq7J0TdtUgTVELbcG4eq5nrtyXczF8I=";
  };

  pnpmRoot = "..";

  cargoDeps = rustPlatform.importCargoLock {
    lockFile = ./src-tauri/Cargo.lock;
  };

  nativeBuildInputs = [
    rustPlatform.cargoSetupHook
    cargo
    rustc
    cargo-tauri.hook
    nodejs
    pnpm.configHook
    pkg-config
  ] ++ lib.optional stdenv.targetPlatform.isLinux wrapGAppsHook4;

  buildInputs =
    [
      splashscreen
    ]
    ++ lib.optional stdenv.targetPlatform.isLinux webkitgtk_4_0
    ++ lib.optional stdenv.targetPlatform.isLinux gst_all_1.gstreamer
    ++ lib.optional stdenv.targetPlatform.isLinux gst_all_1.gst-plugins-good
    ++ lib.optional stdenv.targetPlatform.isLinux gst_all_1.gst-plugins-base
    ++ lib.optional stdenv.targetPlatform.isLinux libsoup
    ++ lib.optional stdenv.targetPlatform.isLinux gtk4;

  preConfigure = ''
    # pnpm.configHook has to write to .., as our sourceRoot is set to src-tauri
    chmod +w ..
    # eagerly create stats.html output of rollup-plugin-visualizer to chmod and
    # avoid permission errors during build
    touch ../stats.html
    chmod +w ../stats.html

    chmod +w ../public
  '';

  preBuild = ''
    cp ${splashscreen}/splashscreen.html ../public/splashscreen.html
  '';
})
