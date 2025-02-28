# Installing Cairo

```sh
$ brew install cairo freetype libffi libjpeg libpng zlib
```

## Sample Transcript
```
Warning: cairo 1.18.2 is already installed and up-to-date.
To reinstall 1.18.2, run:
  brew reinstall cairo
Warning: freetype 2.13.3 is already installed and up-to-date.
To reinstall 2.13.3, run:
  brew reinstall freetype
libpng 1.6.44 is already installed but outdated (so it will be upgraded).
==> Downloading https://ghcr.io/v2/homebrew/core/libffi/manifests/3.4.6
######################################################################### 100.0%
==> Fetching libffi
==> Downloading https://ghcr.io/v2/homebrew/core/libffi/blobs/sha256:e81237234a3
######################################################################### 100.0%
==> Downloading https://ghcr.io/v2/homebrew/core/jpeg/manifests/9f
######################################################################### 100.0%
==> Fetching jpeg
==> Downloading https://ghcr.io/v2/homebrew/core/jpeg/blobs/sha256:15c7bc3002bdb
######################################################################### 100.0%
==> Downloading https://ghcr.io/v2/homebrew/core/libpng/manifests/1.6.46
######################################################################### 100.0%
==> Fetching libpng
==> Downloading https://ghcr.io/v2/homebrew/core/libpng/blobs/sha256:5a44a2e8483
######################################################################### 100.0%
==> Downloading https://ghcr.io/v2/homebrew/core/zlib/manifests/1.3.1
######################################################################### 100.0%
==> Fetching zlib
==> Downloading https://ghcr.io/v2/homebrew/core/zlib/blobs/sha256:f867540472a59
######################################################################### 100.0%
==> Pouring libffi--3.4.6.arm64_sonoma.bottle.tar.gz
==> Caveats
libffi is keg-only, which means it was not symlinked into /opt/homebrew,
because macOS already provides this software and installing another version in
parallel can cause all kinds of trouble.

For compilers to find libffi you may need to set:
  export LDFLAGS="-L/opt/homebrew/opt/libffi/lib"
  export CPPFLAGS="-I/opt/homebrew/opt/libffi/include"
==> Summary
🍺  /opt/homebrew/Cellar/libffi/3.4.6: 18 files, 764.4KB
==> Running `brew cleanup libffi`...
Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.
Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
==> Pouring jpeg--9f.arm64_sonoma.bottle.tar.gz
==> Caveats
jpeg is keg-only, which means it was not symlinked into /opt/homebrew,
because it conflicts with `jpeg-turbo`.

If you need to have jpeg first in your PATH, run:
  echo 'export PATH="/opt/homebrew/opt/jpeg/bin:$PATH"' >> ~/.zshrc

For compilers to find jpeg you may need to set:
  export LDFLAGS="-L/opt/homebrew/opt/jpeg/lib"
  export CPPFLAGS="-I/opt/homebrew/opt/jpeg/include"
==> Summary
🍺  /opt/homebrew/Cellar/jpeg/9f: 22 files, 903.5KB
==> Running `brew cleanup jpeg`...
==> Upgrading libpng
  1.6.44 -> 1.6.46 
==> Pouring libpng--1.6.46.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/libpng/1.6.46: 28 files, 1.4MB
==> Running `brew cleanup libpng`...
Removing: /opt/homebrew/Cellar/libpng/1.6.44... (28 files, 1.3MB)
Removing: /Users/dan/Library/Caches/Homebrew/libpng_bottle_manifest--1.6.44... (8.1KB)
Removing: /Users/dan/Library/Caches/Homebrew/libpng--1.6.44... (449.4KB)
==> Pouring zlib--1.3.1.arm64_sonoma.bottle.tar.gz
==> Caveats
zlib is keg-only, which means it was not symlinked into /opt/homebrew,
because macOS already provides this software and installing another version in
parallel can cause all kinds of trouble.

For compilers to find zlib you may need to set:
  export LDFLAGS="-L/opt/homebrew/opt/zlib/lib"
  export CPPFLAGS="-I/opt/homebrew/opt/zlib/include"
==> Summary
🍺  /opt/homebrew/Cellar/zlib/1.3.1: 14 files, 403.5KB
==> Running `brew cleanup zlib`...
==> Upgrading 1 dependent of upgraded formulae:
Disable this behaviour by setting HOMEBREW_NO_INSTALLED_DEPENDENTS_CHECK.
Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
fontconfig 2.15.0 -> 2.16.0
==> Downloading https://ghcr.io/v2/homebrew/core/fontconfig/manifests/2.16.0
######################################################################### 100.0%
==> Checking for dependents of upgraded formulae...
==> No broken dependents found!
==> Caveats
==> libffi
libffi is keg-only, which means it was not symlinked into /opt/homebrew,
because macOS already provides this software and installing another version in
parallel can cause all kinds of trouble.

For compilers to find libffi you may need to set:
  export LDFLAGS="-L/opt/homebrew/opt/libffi/lib"
  export CPPFLAGS="-I/opt/homebrew/opt/libffi/include"
==> jpeg
jpeg is keg-only, which means it was not symlinked into /opt/homebrew,
because it conflicts with `jpeg-turbo`.

If you need to have jpeg first in your PATH, run:
  echo 'export PATH="/opt/homebrew/opt/jpeg/bin:$PATH"' >> ~/.zshrc

For compilers to find jpeg you may need to set:
  export LDFLAGS="-L/opt/homebrew/opt/jpeg/lib"
  export CPPFLAGS="-I/opt/homebrew/opt/jpeg/include"
==> zlib
zlib is keg-only, which means it was not symlinked into /opt/homebrew,
because macOS already provides this software and installing another version in
parallel can cause all kinds of trouble.

For compilers to find zlib you may need to set:
  export LDFLAGS="-L/opt/homebrew/opt/zlib/lib"
  export CPPFLAGS="-I/opt/homebrew/opt/zlib/include"
```