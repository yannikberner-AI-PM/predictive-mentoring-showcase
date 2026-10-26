"""Offline showcase checks; no comprehensive security or application audit."""
import argparse
import hashlib
import json
from pathlib import Path
import re
import struct

ROOT = Path(__file__).resolve().parents[1]
EXPECTED = {
    '.gitignore', 'README.md', 'LICENSE', 'MANIFEST.sha256', 'package.json',
    'assets/app-icon.png', 'components/README.md',
    'components/src/db/types.ts', 'components/src/db/categories.ts',
    'components/src/db/dataOwnerPolicy.ts',
    'components/src/services/llm/types.ts',
    'components/src/services/llm/routing.ts',
    'components/src/services/llm/fallback.ts',
    'docs/ARCHITECTURE.md', 'docs/SECURITY.md', 'docs/STATUS.md',
    'docs/PROVENANCE.json', 'docs/VALIDATION.md',
    'scripts/validate.py', 'tests/components.test.mjs', 'tests/resolve-ts.mjs',
}


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def check():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, help='Optional private source root, read-only')
    args = parser.parse_args()
    actual = {str(p.relative_to(ROOT)) for p in ROOT.rglob('*')
              if p.is_file() and '.git' not in p.relative_to(ROOT).parts}
    assert actual == EXPECTED, 'Inventory mismatch: ' + str(sorted(actual ^ EXPECTED))
    assert not any((ROOT / p).is_symlink() for p in actual), 'Symlink not permitted'
    manifest = {}
    for line in (ROOT / 'MANIFEST.sha256').read_text().splitlines():
        digest, name = line.split('  ', 1)
        assert re.fullmatch('[a-f0-9]{64}', digest)
        assert name not in manifest, 'Duplicate manifest entry'
        manifest[name] = digest
    assert set(manifest) == actual - {'MANIFEST.sha256'}, 'Manifest inventory mismatch'
    for name, digest in manifest.items():
        assert sha(ROOT / name) == digest, 'Hash mismatch: ' + name
    provenance = json.loads((ROOT / 'docs/PROVENANCE.json').read_text())
    copied = provenance['copied']
    assert len(copied) == 7
    assert {r['destination'] for r in copied} == {
        p for p in EXPECTED if p.startswith('components/src/') or p == 'assets/app-icon.png'
    }
    for row in copied + provenance['analysis_evidence']:
        source = Path(row['source'])
        assert not source.is_absolute() and '..' not in source.parts
        assert re.fullmatch('[a-f0-9]{64}', row['sha256'])
        if 'destination' in row:
            assert sha(ROOT / row['destination']) == row['sha256']
        if args.source:
            assert sha(args.source / source) == row['sha256'], 'Source changed: ' + str(source)
    links = 0
    for name in actual:
        p = ROOT / name
        if p.suffix == '.png':
            data = p.read_bytes()
            assert data[:8] == b'\x89PNG\r\n\x1a\n'
            offset = 8
            chunks = []
            while offset < len(data):
                size = struct.unpack('>I', data[offset:offset + 4])[0]
                chunks.append(data[offset + 4:offset + 8])
                offset += size + 12
            assert offset == len(data) and set(chunks) <= {b'IHDR', b'IDAT', b'IEND'}
            continue
        text = p.read_text()
        # Narrow patterns only: a pass is not a general secret-freedom guarantee.
        patterns = [r'/Users/' + r'[A-Za-z0-9]', r'-----BEGIN [A-Z ]*PRIVATE KEY-----',
                    r'gh[pousr]_[A-Za-z0-9]{20,}', r'github_pat_[A-Za-z0-9_]{20,}',
                    r'AKIA[A-Z0-9]{16}', r'sk-[A-Za-z0-9]{24,}',
                    r'eyJ[A-Za-z0-9_-]{12,}\.[A-Za-z0-9_-]{12,}\.[A-Za-z0-9_-]{12,}']
        for pattern in patterns:
            assert not re.search(pattern, text), 'Sensitive pattern in ' + name
        if p.suffix == '.md':
            for target in re.findall(r'\]\(([^)]+)\)|src="([^"]+)"', text):
                link = next(v for v in target if v)
                if re.match(r'https?://|mailto:|#', link):
                    continue
                dest = (p.parent / link.split('#')[0]).resolve()
                assert ROOT in dest.parents and dest.is_file(), 'Broken/outside link: ' + link
                links += 1
    print('OK: {} allowlisted files; {} manifest hashes; {} copied hashes; {} local links; PNG chunks; limited sensitive-pattern scan'.format(
        len(actual), len(manifest), len(copied), links))
    if args.source:
        print('OK: {} source fingerprints match private working tree (read-only)'.format(
            len(copied) + len(provenance['analysis_evidence'])))


if __name__ == '__main__':
    check()
