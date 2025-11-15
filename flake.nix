{
  description = "Glog flake";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = {nixpkgs, ...}: let
    forAllSystems = function:
      nixpkgs.lib.genAttrs [
        "x86_64-linux"
        "x86_64-darwin"
        "aarch64-linux"
        "aarch64-darwin"
      ] (system: function (import nixpkgs {inherit system;}));
  in {
    devShells = forAllSystems (
      pkgs:
        with pkgs; {
          default = mkShell.override {stdenv = stdenvNoLibs;} {
            buildInputs = [
              biome
              nodejs
              nodePackages.typescript
              nodePackages.pnpm
            ];
          };
        }
    );
  };
}
