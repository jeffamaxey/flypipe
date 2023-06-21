import os
import re
import subprocess

from git import Repo

RE_BRANCH = "^release/(\d+)\.(\d)+\.(\d)+"


os.chdir(os.path.dirname(os.path.realpath(__file__)))
releases_by_minor_version = {}
for ref in Repo("..").remote().refs:
    branch = ref.remote_head
    if match := re.match(RE_BRANCH, branch):
        major, minor, patch = match[1], match[2], match[3]
        releases_by_minor_version.setdefault((major, minor), []).append(
            (major, minor, patch)
        )

doc_versions = [
    "(" + r"\.".join(max(versions)) + ")"
    for versions in releases_by_minor_version.values()
]
doc_versions_re = r'release/({doc_versions})'.format(doc_versions='|'.join(doc_versions))
if 'PRODUCTION_DOCS_DEPLOY' not in os.environ or os.environ['PRODUCTION_DOCS_DEPLOY'] == '0':
    doc_versions_re += '|main'
subprocess.check_output([
    'sphinx-multiversion', f'-Dsmv_branch_whitelist={doc_versions_re}', './source', './build/html'])
