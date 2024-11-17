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
          ...
        }:
        rec {
          packages = rec {
            default = jankboard;
            jankboard = pkgs.callPackage ./client { inherit splashscreen; };
            splashscreen = pkgs.callPackage ./splash-screen { };
          };
          devShells.default =
            let
              libraries = with pkgs; [
                gtk3
                cairo
                gdk-pixbuf
                glib
                dbus
                openssl_3
                librsvg
              ];
            in
            pkgs.mkShell {
              # import dependencies from packages
              inputsFrom = pkgs.lib.attrsToList packages;

              # additional build inputs required for various rust crates
              buildInputs = with pkgs; [
                curl
                wget
              ];

              shellHook = ''
                export LD_LIBRARY_PATH=${pkgs.lib.makeLibraryPath libraries}:$LD_LIBRARY_PATH
                export XDG_DATA_DIRS=${pkgs.gsettings-desktop-schemas}/share/gsettings-schemas/${pkgs.gsettings-desktop-schemas.name}:${pkgs.gtk4}/share/gsettings-schemas/${pkgs.gtk4.name}:$XDG_DATA_DIRS
              '';
            };

        };
    };
}
