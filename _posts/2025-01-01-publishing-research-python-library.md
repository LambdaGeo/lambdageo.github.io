---
layout: post
title: "Shipping a Python Library to PyPI: The Complete Checklist"
date: 2025-01-01 00:00:00 -0300
description: Everything you need to take a Python library from research code to a production-grade PyPI package — packaging, testing, CI/CD, docs, and common pitfalls.
tags: [python, pypi, packaging, github-actions, mkdocs, mypy, open-source]
categories: tutorial
related_posts: false
toc:
  sidebar: left
---

A checklist-driven walkthrough for shipping a Python library — from cleaning up research code to automating releases on PyPI. Covers the decisions that actually matter and the gotchas that cost hours.

---

## 1. Code Quality

### Type Annotations

Annotate all public functions, methods, and class attributes. Add `from __future__ import annotations` at the top of every file for forward references.

```python
# Before
def process(self, idx):
    ...

# After
from __future__ import annotations
from typing import Any

def process(self, idx: Any) -> int:
    ...
```

Run `mypy` in CI — catching type errors before users do is the cheapest bug fix:

```bash
mypy your_package --ignore-missing-imports
```

### Docstrings: NumPy style

NumPy style is the standard in scientific Python and is natively parsed by `mkdocstrings`. Write the docstring once, get API docs for free.

```python
def compute(data: list[float], scale: float = 1.0) -> float:
    """
    Compute a scaled result from input data.

    Parameters
    ----------
    data : list of float
        Input values to process.
    scale : float, optional
        Scaling factor, by default 1.0.

    Returns
    -------
    float
        Scaled result.

    Examples
    --------
    >>> compute([1.0, 2.0, 3.0], scale=2.0)
    12.0
    """
```

> If your class uses `setup()` instead of `__init__()` for parameters, keep the `Parameters` section only in `setup()`. `mkdocstrings` will emit warnings if it can't match parameters to the actual signature.

### Enums over Integer Constants

```python
# Before — conflicts with tools that introspect __annotations__
class MyModel:
    INACTIVE = 0
    ACTIVE = 1

# After
from enum import IntEnum

class MyState(IntEnum):
    INACTIVE = 0
    ACTIVE = 1
```

### Naming Conventions

All identifiers, docstrings, and comments in **English**. All names in **snake_case**. Non-negotiable for JOSS submission and PyPI discoverability.

```python
# Before
def setup(self, growthRate=0.08, maxPopulation=1000):

# After
def setup(self, growth_rate: float = 0.08, max_population: int = 1000):
```

### Consistent Lifecycle Pattern

If your library exposes a model or component API, define a fixed lifecycle and document it in every example. It is the #1 source of user errors.

```
setup()       → configure parameters
initialize()  → set initial state
execute()     → run one step
```

### Performance in Hot Loops

Prefer NumPy array ops over per-element Pandas access inside simulation loops:

```python
# Slow — DataFrame overhead on every call
result = self.get_neighbors(idx).fillna(0).sum()

# Fast — raw NumPy
result = self.neighbor_values(idx).sum()
```

Document the tradeoff in the slower method's docstring so users know when to use each.

---

## 2. Bug Prevention

### Defensive Guards for Edge Cases

Bugs that surface only on non-square inputs or boundary conditions are the hardest to reproduce. Guard early:

```python
if key in collection:
    collection[key] = value
```

Ensure consistent conventions — IDs, coordinate systems, key formats — across all modules. Mixed conventions only break on edge cases.

### Headless Compatibility

Any library with a GUI backend will crash in CI, Docker, or headless servers unless you disable it by default:

```python
def __init__(self, *args, **kwargs):
    kwargs.setdefault("gui", False)
    kwargs.setdefault("animation", False)
    super().__init__(*args, **kwargs)
```

Users who want the GUI opt in explicitly. CI works out of the box.

---

## 3. Testing

```
tests/
    test_core.py          — expected behavior
    test_edge_cases.py    — non-square inputs, boundary conditions, silent failures
```

Prioritize tests for things that fail silently — wrong output, not exceptions:

```python
def test_nonsquare_input():
    result = process(rows=3, cols=5)
    assert result.shape == (3, 5)

def test_out_of_bounds_ignored():
    """Should not raise KeyError or IndexError."""
    apply_pattern(data, pattern=large_pattern)
```

```bash
pytest tests/
mypy your_package
```

---

## 4. Packaging

### `pyproject.toml` is the single source of truth

If you have a `setup.py`, reduce it to a stub:

```python
# setup.py — stub only
from setuptools import setup
setup()
```

### Minimal `pyproject.toml`

```toml
[build-system]
requires = ["setuptools>=61.0", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "your-package"
version = "0.1.0"
description = "One-liner describing your library."
readme = { file = "README.md", content-type = "text/markdown" }
authors = [
    { name = "Your Name", email = "you@example.com" },
]
license = { text = "MIT" }
requires-python = ">=3.10"
dependencies = [
    "numpy>=1.25.0",
    "pandas>=2.0.0",
]

[project.optional-dependencies]
dev = ["mypy", "pytest", "mkdocs", "mkdocstrings[python]", "mkdocs-material"]

[project.urls]
Homepage = "https://github.com/yourorg/your-package"
```

**Rules:**

- Libraries use **`>=`** (flexible). Applications use **`==`** (pinned). Never pin in a library.
- List **all direct runtime dependencies** explicitly — including transitive ones that may not always be installed.
- Dev tools go in `[project.optional-dependencies]`, not in `dependencies`.

### Verify in a clean virtualenv

Missing transitive dependencies only appear in clean environments. Always test there before publishing:

```bash
python -m venv /tmp/test_pkg
source /tmp/test_pkg/bin/activate
pip install -e .
python -c "import your_package; print('OK')"
deactivate
```

### `requirements.txt` — dev only

```
# pip install -e .        → installs runtime deps from pyproject.toml
# pip install -r requirements.txt → installs dev tools

mypy
pytest
mkdocs
mkdocstrings[python]
mkdocs-material
```

---

## 5. Examples

```
examples/
    cli/           — runnable scripts
    notebooks/     — Jupyter notebooks
    data/          — sample data
```

Each example must be self-contained. Any required usage order must be documented with a comment — not just assumed.

---

## 6. Documentation

### Setup

```bash
pip install mkdocs mkdocs-material mkdocstrings[python] mkdocs-jupyter
```

### `mkdocs.yml`

```yaml
site_name: Your Package
plugins:
  - search
  - mkdocstrings:
      handlers:
        python:
          options:
            docstring_style: numpy
            show_source: true
  - mkdocs-jupyter:
      include: ["*.ipynb"]

theme:
  name: material
  language: en

markdown_extensions:
  - pymdownx.highlight
  - pymdownx.superfences
  - pymdownx.arithmatex:
      generic: true

extra_javascript:
  - https://unpkg.com/mathjax@3/es5/tex-mml-chtml.js
```

### API Reference Pages

One `.md` per module — `mkdocstrings` pulls docstrings automatically:

```markdown
# MyClass

::: your_package.module.MyClass
```

### Deploy

```bash
mkdocs gh-deploy
```

Docs deployment is fully independent of PyPI. Update them at any time without creating a release.

---

## 7. CI/CD with GitHub Actions

### `ci.yml` — every push to main

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - name: Install
        run: pip install -e ".[dev]"
      - name: Test
        run: pytest tests/
      - name: Type check
        run: mypy your_package --ignore-missing-imports
```

### `publish.yml` — on GitHub Release

```yaml
name: Publish to PyPI
on:
  release:
    types: [published]
  workflow_dispatch:

permissions:
  contents: read

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.x"
      - name: Build
        run: |
          pip install build
          python -m build
      - uses: actions/upload-artifact@v4
        with:
          name: release-dists
          path: dist/

  publish:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: release-dists
          path: dist/
      - uses: pypa/gh-action-pypi-publish@release/v1
        with:
          password: ${{ secrets.PYPI_API_TOKEN }}
          packages-dir: dist/
```

> ⚠️ **Critical gotcha:** with token-based auth, do **not** add `id-token: write` to the publish job. It forces OIDC (Trusted Publishing), which silently ignores your token and causes authentication failures with no useful error message.

### Testing workflows without a Release

`workflow_dispatch` lets you trigger any workflow manually from the GitHub UI on any branch — no release needed. Use it to validate the publish pipeline before going live.

---

## 8. Publication Process

### Pre-flight checklist

- [ ] `pytest tests/` — all green
- [ ] `mypy your_package` — no errors
- [ ] Version bumped in `pyproject.toml`
- [ ] Clean virtualenv install verified
- [ ] Validated on TestPyPI

### Build

```bash
rm -rf dist/
python -m build
ls dist/
# your-package-0.1.0-py3-none-any.whl
# your-package-0.1.0.tar.gz
```

### Validate on TestPyPI

```bash
twine upload --repository testpypi dist/*
# Username: __token__
# Password: your TestPyPI token

# Verify
python -m venv /tmp/test_release
source /tmp/test_release/bin/activate
pip install \
  --index-url https://test.pypi.org/simple/ \
  --extra-index-url https://pypi.org/simple/ \
  your-package
python -c "import your_package; print('OK')"
deactivate
```

`--extra-index-url` is required: your dependencies are on real PyPI, not TestPyPI.

### Publish

Create a GitHub Release tagged `v0.1.0`. The `publish.yml` workflow triggers automatically.

### Verify from PyPI

```bash
python -m venv /tmp/verify && source /tmp/verify/bin/activate
pip install your-package
python -c "import your_package; print('OK')"
deactivate
```

---

## 9. Post-release Fixes

PyPI **does not allow overwriting** a published version. Your options:

- **Yank** — the version stays indexed but `pip install` won't pick it up by default. Use the PyPI web UI: Release history → Yank.
- **Patch release** — bump to `0.1.1` and publish normally.
- **Re-run failed workflow** — if the Actions workflow failed after a release was created, go to Actions → Re-run failed jobs. No new release needed.

---

## Quick Reference

```bash
# Development
pip install -e .
pip install -r requirements.txt
pytest tests/
mypy your_package

# Build and publish
python -m build
twine upload --repository testpypi dist/*   # TestPyPI
twine upload dist/*                          # PyPI

# Docs
mkdocs serve        # preview
mkdocs gh-deploy    # deploy to GitHub Pages

# Verify
pip install your-package
pip install \
  --index-url https://test.pypi.org/simple/ \
  --extra-index-url https://pypi.org/simple/ \
  your-package
```
