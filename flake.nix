{
  description = "A robot control dashboard, purpose-built for Team 1280's robot competing in the 2024 FIRST Robotics Competition.";

  inputs = {
    flake-parts.url = "github:hercules-ci/flake-parts";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs =
    inputs@{ flake-parts, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "aarch64-darwin"
        "x86_64-darwin"
      ];
      perSystem =
        {
          pkgs,
          config,
          ...
        }:
        {
          packages = rec {
            default = jankboard;
            jankboard = pkgs.callPackage ./client { inherit splashscreen; };
            splashscreen = pkgs.callPackage ./splash-screen { };
          };

          devShells.default = pkgs.mkShell {
            # provide all of the build inputs of the derivation to the
            # devShell, plus some additional development tools
            packages =
              config.packages.jankboard.buildInputs
              ++ config.packages.jankboard.nativeBuildInputs
              ++ (with pkgs; [
                rust-analyzer
                rustfmt
                clippy
                svelte-language-server
                typescript-language-server
                tailwindcss-language-server
                taplo
                prettierd
              ]);

            # we must provide LD_LIBRARY_PATH to tauri so that it doesn't unalive itself
            shellHook = ''
              export LD_LIBRARY_PATH=${pkgs.lib.makeLibraryPath config.packages.default.buildInputs}:${pkgs.lib.makeLibraryPath config.packages.default.nativeBuildInputs}:$LD_LIBRARY_PATH
              export XDG_DATA_DIRS=${pkgs.gsettings-desktop-schemas}/share/gsettings-schemas/${pkgs.gsettings-desktop-schemas.name}:${pkgs.gtk3}/share/gsettings-schemas/${pkgs.gtk4.name}:$XDG_DATA_DIRS
            '';
          };
        };
    };
}
