# Submit an edition to IndieDuck

An **edition** is a complete IndieDuck design: a new exterior on the shared mechanism, **platform P1**. IndieDuck Cyber Edition is the first one. This guide takes you from an idea to a published edition. You need FreeCAD and a GitHub account; if you don't use GitHub, see [Not on GitHub](#not-on-github).

Every edition follows four rules, set out in full in [PLATFORM.md](https://github.com/armature-ai-labs/indieduck-cad/blob/main/platform/PLATFORM.md):

1. **It's a duck:** a two-legged robot with a duck-like head and bill.
2. **It changes only the exterior.** Platform parts (structure, joints, servos, electronics, feet and soles) stay exactly as they are. Mechanism improvements go to the platform and benefit every edition.
3. **It doesn't block the joints.** Covers must clear the mechanism through its full verified ranges.
4. **It's open:** your work is licensed Apache-2.0 and you are credited by name.

## 1. Propose your edition

Open an issue in [indieduck](https://github.com/armature-ai-labs/indieduck/issues) titled `Edition proposal: <name>`, with:

- the name, and a short id in lower case (`cyber`, `retro`, `harbour`); it becomes the folder name and the model ID `indieduck-<id>`
- one or more sketches or renders of the look
- who is designing it

The maintainers confirm the id is free and that the idea fits the rules, so you don't spend weeks on something that can't be accepted.

## 2. Set up

- **FreeCAD 1.1.4** (other 1.1.x versions usually work)
- **git**, and a fork of [indieduck-cad](https://github.com/armature-ai-labs/indieduck-cad)
- Optional: a 3D printer, to test-fit your parts on a printed platform

```
git clone https://github.com/<you>/indieduck-cad.git
cd indieduck-cad
mkdir -p editions/<id>/native editions/<id>/exports/step editions/<id>/exports/stl editions/<id>/previews
cp editions/cyber/native/IndieDuck_Cyber_Assembly.FCStd editions/<id>/native/IndieDuck_<Name>_Assembly.FCStd
```

## 3. Design in FreeCAD

Open your copy of the assembly. It is the complete robot in its standing pose: platform P1 plus the Cyber exterior.

1. **Delete the Cyber exterior.** Its 28 parts are the rows of `COMPONENTS.csv` with `edition = cyber` (helmet, rims, bumper, face bezel, camera face, optical rings, torso and pelvis panels, inlays, cowls, thigh, shin and toe caps, and the jaw with its surrounds). Delete nothing else.
2. **Model your exterior around the platform.** Leave every remaining part exactly where it is; the assembly coordinates (millimetres) are shared by every tool downstream.
3. **Give every new part a `MovingBody` property** naming the joint link it is fixed to. A part fixed to the hip bracket moves with `left_hip_roll_link`; a helmet moves with `head_roll_link`. Add it in FreeCAD with *Add Property* (type String). The links are:

    | Link | What moves with it |
    |---|---|
    | `trunk_base` | Body, torso and pelvis covers |
    | `neck_pitch_link`, `head_pitch_link`, `head_yaw_link` | Neck and head brackets |
    | `head_roll_link` | The head: helmet, face, rims, eyes |
    | `mouth_link` | The jaw |
    | `left_hip_yaw_link`, `left_hip_roll_link`, `left_hip_pitch_link`, `left_knee_link`, `left_ankle_link` | Left leg, from hip to foot (`right_` for the right leg) |

4. **Name parts clearly** in PascalCase, with `_L` or `_R` for paired parts: `HelmetShell`, `WingCover_L`.

### Design rules

| Rule | Why |
|---|---|
| Leave at least **1 mm** between your parts and anything that moves relative to them | Joints sweep through nearby space; Cyber needed its covers trimmed to clear them |
| Keep clear of the joints through these ranges: hip yaw -19 to 0 deg (left, mirrored right), hip roll -18 to 22, hip pitch -90 to 0, knee -85 to 46, ankle 0 to 78, neck -65 to +27.5, head pitch -35 to 85, head yaw +-90, head roll -25 to +11, jaw 0 to 30 | These are platform P1's verified ranges; an edition that reduces them must say so |
| Fix covers to **structure**, never to a servo body | Screws can't go into servo cases |
| The jaw may be restyled, but must use the platform's jaw pivot, bearing and horn interface | So the mouth still works |
| Walls of at least **2 mm**, 2.5 mm on the flat top of the head | The head top is load-bearing in the forward roll |
| Each part fits a **256 x 256 mm** print bed, and has a flat face to print on (or note how to print it) | So anyone can print it |
| Aim for an exterior mass similar to Cyber's (28 parts, 164 cm3, about 204 g if printed solid) | Mass changes balance and the trained policies |

Make each part a single valid solid. In FreeCAD, *Part > Check Geometry* should report no errors.

## 4. Export

For every exterior part, export STEP and STL **in assembly coordinates** (don't move parts to the origin):

```
editions/<id>/exports/step/<Name>_<Part>.step
editions/<id>/exports/stl/<Name>_<Part>.stl
editions/<id>/exports/IndieDuck_<Name>_Assembly.step     (whole robot)
```

Add four preview images to `editions/<id>/previews/`: assembly (three-quarter view), front, side and rear.

## 5. Describe your edition

Create `editions/<id>/edition.yaml`, modelled on [Cyber's](https://github.com/armature-ai-labs/indieduck-cad/blob/main/editions/cyber/edition.yaml):

```yaml
id: harbour
name: IndieDuck Harbour Edition
form_factor: duck
platform: P1
designers:
  - name: Your Name
    link: https://your-profile-or-site
licence: Apache-2.0
maturity: concept
native_assembly: native/IndieDuck_Harbour_Assembly.FCStd
parts: COMPONENTS.csv rows with edition = harbour
fixing_method: How each cover is held on (screws into which structure, clips, adhesive)
mass_estimate_g: 190
notes: Anything reviewers should know (reduced ranges, print orientation, open questions)
```

Then add one row per part to `COMPONENTS.csv`:

| Column | Your value |
|---|---|
| `revision` | `R25` (the current design revision of the repository) |
| `assembly_link` | The part's label in your FreeCAD file |
| `native_file` | `editions/<id>/native/IndieDuck_<Name>_Assembly.FCStd` |
| `native_object` | The part's object name in FreeCAD |
| `material` | For example `PLA, white appearance` or `TPU 95A` |
| `step`, `stl` | The export paths |
| `volume_mm3` | The part's volume (FreeCAD: select it, Python console `obj.Shape.Volume`) |
| `scope`, `edition` | `edition` and your id |

If any of your geometry comes from someone else's work, list its source and licence in `THIRD_PARTY_NOTICES.md`. Only openly licensed sources compatible with Apache-2.0 can be accepted.

## 6. Check before you submit

- [ ] Platform parts unchanged and in place
- [ ] Every new part has a `MovingBody` and passes *Check Geometry*
- [ ] 1 mm clearance from moving parts at the standing pose
- [ ] STEP and STL for every part, in assembly coordinates; every STL is closed
- [ ] `edition.yaml`, `COMPONENTS.csv` rows, previews
- [ ] Your FreeCAD file opens on its own (no links to files outside the repository)
- [ ] Third-party sources listed, or none used

## 7. Open a pull request

Open a pull request from your fork to `indieduck-cad`, titled `Edition: <Name>`, linking your proposal issue and pasting the checklist above. By opening it, you agree to license your contribution under Apache-2.0.

## What happens next

The maintainers take it from here, moving it up the maturity levels in [EDITIONS.md](EDITIONS.md):

1. **Review:** licence, files and the rules above. You may be asked for changes.
2. **CAD-verified:** every joint is swept in 1 degree steps with your exterior fitted. Parts that block a joint are trimmed with your agreement, or the edition's reduced ranges are recorded.
3. **Sim-ready:** your edition gets its simulator model (`indieduck-<id>`), a training task, and a place in the assembly guide and simulator.
4. **Trained, Built, Official:** policies, physical builds by the community, and possibly kits.

You are credited in `edition.yaml`, the editions catalog, the repository's `CONTRIBUTORS.md` and the release notes.

## Not on GitHub

Open an issue with your files attached as a zip (FreeCAD source plus exports), or ask in the issue for help, and a maintainer will turn it into a pull request with you credited. A web form for submissions is planned.

## Questions

Ask in your proposal issue, or open a [discussion issue](https://github.com/armature-ai-labs/indieduck/issues). Platform improvements (anything that changes the mechanism) are welcome too, as separate proposals: they apply to every edition, so they get a wider review.
