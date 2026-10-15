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

1. Read the platform rules: [PLATFORM.md](https://github.com/armature-ai-labs/indieduck-cad/blob/main/platform/PLATFORM.md). An edition changes only the exterior and leaves the platform's parts unchanged.
2. Model the exterior around the platform in FreeCAD, starting from Cyber Edition's assembly.
3. Open a pull request adding `editions/<your-edition>/` to [indieduck-cad](https://github.com/armature-ai-labs/indieduck-cad), with an `edition.yaml` modelled on [Cyber's](https://github.com/armature-ai-labs/indieduck-cad/blob/main/editions/cyber/edition.yaml), your FreeCAD source and STEP/STL exports.
4. The maintainers run the joint sweeps and clearance checks, record the edition's ranges, then generate its simulator model and training task.

Submission templates, automatic checks and a web form for designers who do not use GitHub are planned next.
