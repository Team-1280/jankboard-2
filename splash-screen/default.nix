{
  stdenv,
  pnpm_9,
  nodejs,
}:
let
  pnpm = pnpm_9;
in
stdenv.mkDerivation (finalAttrs: {
  pname = "splash-screen";
  version = "0.1.0";

  src = ./.;

  pnpmDeps = pnpm.fetchDeps {
    inherit (finalAttrs) pname version src;
    hash = "sha256-qnjrzna5BUAeTtdnD6FAFL2LBOfXxhbofmtiIpIbv8k=";
  };

  nativeBuildInputs = [
    pnpm.configHook
    nodejs
  ];

  preConfigure = ''
    chmod +w .
  '';

  buildPhase = ''
    pnpm build
  '';

  installPhase = ''
    mkdir -p $out
    cp ./dist/index.html $out/splashscreen.html
  '';
})
