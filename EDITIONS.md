# IndieDuck editions

IndieDuck is one shared mechanism, the **platform**, with **editions** that give it different exteriors. Every edition is a duck. A platform change or upgrade applies to every edition; each edition gets its own verified joint ranges, simulator model, training task and policies.

## Catalog

| Edition | Designers | Platform | Maturity | Model ID | Files |
|---|---|---|---|---|---|
| IndieDuck Cyber Edition (design R25) | [Zankar Savalia](https://www.linkedin.com/in/zankarvs/) | P1 | Sim-ready | `indieduck-cyber` | [CAD](https://github.com/armature-ai-labs/indieduck-cad/tree/main/editions/cyber) · [simulator](https://armature-ai-labs.github.io/indieduck-rl/) · [assembly guide](https://armature-ai-labs.github.io/indieduck/) |

## Maturity levels

| Level | Meaning |
|---|---|
| Concept | CAD submitted with a clear licence |
| CAD-verified | Files valid, every joint swept, ranges recorded |
| Sim-ready | Simulator model generated and checked against the CAD |
| Trained | At least one policy works in simulation |
| Built | Someone has built it and recorded test results |
| Official | Maintained by Armature AI Labs and offered in kits |

## Proposing an edition

The full step-by-step guide is [SUBMIT-AN-EDITION.md](SUBMIT-AN-EDITION.md): propose it in an issue, design the exterior in FreeCAD around platform P1, export and describe it, then open a pull request to `indieduck-cad`. The maintainers verify it and move it up the maturity levels.

Submission templates, automatic checks and a web form for designers who do not use GitHub are planned next.
