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
        };
    };
}
