# IndieDuck platform changelog

The **platform** is the mechanism, electronics and sensors every IndieDuck edition shares. It has one public number: P1, P2 and so on. Each version is described in full in `platform/P<n>.yaml`, including the internal versions of its mechanism (M), electronics (E) and sensors (S). Any change to the platform applies to every edition.

## How versions change

| Change | Example | New version | What follows |
|---|---|---|---|
| **Minor**: compatible | A stronger bracket with the same interfaces; a connector with the same pinout; a firmware fix; documentation | P1.0 to P1.1 | Existing editions, printed parts and policies keep working |
| **Major**: breaking | The joint chain or joint ranges change; where covers attach, or the space they must clear; mass changes noticeably; connectors or voltages; the sensor set or its placement; a different servo family | P1 to P2 | Every edition re-runs the verifier (`tools/edition_verify.py`); simulator models are regenerated; policies are retrained |

A **preview** (for example P1.0-preview) is a platform that has not yet been physically built and bench-tested. Changes found during its first build do not create a new version.

All four repositories are tagged for each platform release (`platform-P1.0`, ...), so anyone can check out exactly what matches their robot. Editions state the platform they were verified on, and trained policies record it; the runtime refuses a policy built for a different platform or edition.

## Proposing a platform change

1. Open an issue in [indieduck](https://github.com/armature-ai-labs/indieduck/issues) titled `Platform change: <summary>`, saying which part of the platform changes, why, and whether it is minor or major.
2. The change is reviewed more widely than an edition, because every edition depends on it.
3. Every edition is re-verified against the change.
4. For a major change: simulator models regenerated, policies retrained, edition maturity levels updated.
5. The release is tagged and recorded here with migration notes. The previous major version stays supported for a stated period, because built robots and kits do not change overnight.

## Versions

### P1.0-preview (15 October 2026)

The first platform: 15 Feetech HD-1910 servos on the R20 joint chain with the R17/R18 supports and a redrawn head base; Radxa Zero 3W with the Pollen Robot HAT rev D1; body and head IMUs, one camera, a depth sensor and a microphone. Joint ranges verified in CAD with the Cyber Edition exterior fitted. Edition: IndieDuck Cyber Edition. Details: [P1.yaml](P1.yaml).

To become P1.0: build and bench-test the first robot; size the 5 V servo supply; test the Radxa power arrangement with the HAT; settle the servo chain wiring (decision D20); design the cover fixings.
