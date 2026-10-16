# IndieDuck Cyber Edition bill of materials

Per robot, for IndieDuck Cyber Edition on platform P1 (design R25). Printed parts split into platform P1 (27) and the Cyber exterior (28) in `indieduck-cad` `COMPONENTS.csv`. Electronics detail and how to make the Robot HAT: [docs/electronics/robot-hat.md](docs/electronics/robot-hat.md); its full design files are in [hardware/electronics/pollen-rpi-robot-hat/](hardware/electronics/pollen-rpi-robot-hat/). **Status**: *CAD* means modelled and counted in the R25 assembly; *Derived* means from the design's interface rules but not individually modelled; *To confirm* means not yet specified. Nothing here is physically verified.

## Actuators

| Item | Specification | Qty | Used for | Status | Notes |
|---|---|---|---|---|---|
| Serial bus servo | Feetech HD-1910-C001, 5.0 V regulated, TTL bus, 1 Mbit/s | 15 | 10 leg joints (hip yaw, roll, pitch, knee, ankle per leg), neck pitch, head pitch, head yaw, head roll, mouth | CAD | Add 1-2 spares per robot; leg servos take most fall loads |
| Servo output horn | Disc horn, 16 mm diameter, 3 mm, 4 holes on 12 mm circle | 15 | One per joint | CAD | Usually supplied with the servo; confirm before ordering separately |

## Bearings

| Item | Specification | Qty | Used for | Status | Notes |
|---|---|---|---|---|---|
| Thin-section ball bearing | 16 x 22 x 4 mm thin-section bearing (often sold as ET2216) | 5 | Hip roll x2, hip pitch x2 (second supports), jaw pivot x1 | CAD |  |
| Miniature ball bearing | 693, 3 x 8 x 4 mm | 1 | Neck pitch second support | CAD |  |

## Fasteners (modelled)

| Item | Specification | Qty | Used for | Status | Notes |
|---|---|---|---|---|---|
| Pan or cheese head screw | M2 x 8 | 12 | Head module x8, fixed camera carrier x2, hip pitch clamps x2 | CAD | Head height in CAD about 1.4 mm |
| Pan or cheese head screw | M2 x 6 | 2 | Head module | CAD |  |
| Pan or cheese head screw | M2 x 4 | 6 | Head module x4, fixed camera carrier x2 | CAD |  |
| Socket head cap screw | M2 x 6 | 4 | Head module (jaw bearing tower) | CAD |  |
| Socket head cap screw | M2 x 8 | 2 | Neck bearing retainer | CAD |  |
| Pan or cheese head screw | M2 x 12 | 2 | Hip roll clamps | CAD |  |
| Hex nut | M2, 1.6 mm | 6 | Neck retainer x2, hip roll clamps x2, hip pitch clamps x2 | CAD |  |
| Socket head cap screw | M3 x 16 | 1 | Jaw pivot | CAD |  |
| Shoulder screw | 3 mm shoulder, M3 thread, 14.2 mm overall, 5.5 mm head | 1 | Neck pitch pivot | CAD | Confirm off-the-shelf size or machine from M3 bolt |
| Hex nut | M3, 2.4 mm | 1 | Neck pitch pivot | CAD |  |
| Flat washer | 3.4 x 9.6 x 0.8 mm | 2 | Pivot washers L/R | CAD |  |
| Spacer | 3.1 ID x 4.2 OD x 2.5 mm | 1 | Neck pivot, outer | CAD | Brass or printed; not in the printed-parts list |
| Spacer | 3.1 ID x 4.2 OD x 2.0 mm | 1 | Neck pivot, inner | CAD | Brass or printed; not in the printed-parts list |

## Fasteners (derived)

| Item | Specification | Qty | Used for | Status | Notes |
|---|---|---|---|---|---|
| Self-tapping screw for horns | M2 x 6 (length per part thickness) | 60 | 4 per horn x 15 joints, into 1.7 mm pilots | Derived | From the horn interface (4 holes on 12 mm circle); verify count per link |
| Servo case mounting screw | M2 x 8 (length per cradle wall) | 60 | Up to 4 per servo x 15 | Derived | Upper bound; R25 cradles may use fewer; confirm per cradle |
| Cover screws | M2 x 8, self-tapping | 34 | Torso front 2, torso rear 2, pelvis rear 2, pelvis front 2 (through the torso front), helmet roof 4, helmet lower 4, camera face 2, hip cowls 3 each, thigh caps 3 each, shin caps 2 each; into 1.7 mm pilots in printed posts | CAD | Decision D27; counts from the Cyber Edition CAD; buy as part of an M2 assortment |
| M2.5 standoffs and screws | M2.5 x 11 standoffs with screws | 4 | Radxa Zero 3W and HAT stack | To confirm | Board supports not yet modelled |

## Electronics

| Item | Specification | Qty | Used for | Status | Notes |
|---|---|---|---|---|---|
| Single-board computer | Radxa Zero 3W (Rockchip RK3566), 2 GB RAM or more, with eMMC preferred | 1 | Runtime, policy inference, camera | CAD | One 22-pin 0.5 mm 4-lane MIPI CSI connector, 1 x USB 3.0 host (500 mA), 1 x USB 2.0 OTG for power |
| Storage | microSD card, 32 GB, A1 or better | 1 | Operating system if the Radxa has no eMMC | To confirm | Not needed with an eMMC SKU |
| Power and bus board | Pollen Robotics RPI Robot HAT rev D1, 65 x 30.9 mm, 4-layer 1.0 mm | 1 | Servo bus (TTL and RS-485), body IMU, audio, Qwiic ports, logic 5 V | CAD | Not sold separately: order fabricated and assembled. Full design copied in hardware/electronics/pollen-rpi-robot-hat/; how to order and bring up: docs/electronics/robot-hat.md. Chip list below |
| GPIO header pair | 2 x 20, 2.54 mm (male on Radxa; the HAT's female header is in its BOM) | 1 | Radxa to HAT | CAD |  |
| Indicator LED | 2 mm LED with series resistor | 1 | Camera indicator | CAD | Driven from a GPIO |

## Power

| Item | Specification | Qty | Used for | Status | Notes |
|---|---|---|---|---|---|
| Servo supply (missing from the HAT) | 5.0 V buck converter, 10 A or more continuous, input 6-8.4 V | 1 | Regulated 5.0 V servo rail for the 15 HD-1910s (decision D7) | To confirm | The HAT's only regulator (AP63205) is 2 A for logic; size from bench current measurement |
| Battery | Sony NP-F550-type 2S Li-ion (7.4 V nominal), 70.8 x 38.6 x 20.6 mm | 1 | Main power | CAD (provisional) | CAD envelope matches NP-F550; an NP-F970 will not fit |
| Battery plate | NP-F battery holder with contacts | 1 | Battery mounting and contacts | To confirm | Not modelled |
| Power switch | Inline switch rated for peak servo current | 1 | Main power | To confirm | Not on the HAT |
| Battery charger | NP-F (2S Li-ion) charger | 1 | Charging | To confirm | Not part of the robot |

## Sensors

| Item | Specification | Qty | Used for | Status | Notes |
|---|---|---|---|---|---|
| Body IMU | LSM6DSV16X, on the HAT (U12) | 1 | Trunk orientation for the policy | CAD | Included in the HAT; decision D19: no separate bus IMU board |
| Head IMU | LSM6DSV16X breakout with Qwiic (JST-SH 4-pin), envelope about 19 x 7.6 mm | 1 | Head orientation | CAD | Connects to a HAT Qwiic port |
| Camera | Raspberry Pi Camera v2-compatible (Sony IMX219) on the Radxa CSI port | 1 | Vision, in one eye | Decided | Decision D18: one camera; the other eye is cosmetic (no camera board fitted) |
| Time-of-flight depth sensor | ST VL53L8CX (or VL53L5CX) multizone module with Qwiic | 1 | Range sensing in the face | To confirm | Firmware-supported by the runtime lineage; I2C address 0x29 |
| Microphone | MEMS microphone, on the HAT (MK1) | 1 | Audio input | CAD | Included in the HAT |

## Audio

| Item | Specification | Qty | Used for | Status | Notes |
|---|---|---|---|---|---|
| Speaker | Small 8 ohm, 1-2 W speaker | 1 | Audio output via the HAT's PAM8406 amplifier | To confirm | Optional; not modelled in R25 CAD |

## Wiring

| Item | Specification | Qty | Used for | Status | Notes |
|---|---|---|---|---|---|
| Servo bus cable | 3-pin Feetech HD-series lead | 15 | Three daisy chains: left leg 5, right leg 5, neck/head/mouth 5 | Derived | One per servo; many servos ship with one. Lengths about 100-150 mm (legs), 200-250 mm (head chain through the neck) |
| Servo bus adapter | JST-EH 3-pin (HAT J13/J14) to Feetech 3-pin | 2 | HAT to the first servo of two chains | To confirm | Decision D20 (open): three chains, two TTL ports. Option A: the third chain continues off another chain. Option B: a 3-way splitter (next line). See docs/electronics/robot-hat.md |
| 3-way servo bus splitter (option B only) | Passive hub, Feetech 3-pin, rated for the servo current | 1 | Gives each of the three chains its own lead | To confirm | Only if option B is chosen under decision D20 |
| Qwiic cable | JST-SH 4-pin, about 250-300 mm | 2 | Head IMU and ToF sensor to HAT through the neck | To confirm |  |
| Camera ribbon | 22-pin 0.5 mm to 15-pin 1.0 mm FFC, about 200-300 mm | 1 | Camera to Radxa through the neck | To confirm | Pi Zero-style camera cable |
| Battery and servo power leads | Silicone wire, 18 AWG, with connectors | 1 | Battery to switch, buck converter and HAT | To confirm | The HAT takes power through its motor connectors (+BATT, 5-28 V); its screw terminals are audio only |
| Speaker and LED leads | 2-wire, 26 AWG | 2 | Speaker to HAT terminal, LED to GPIO | To confirm |  |
| Cable management | Small cable ties and spiral wrap | 1 | Routing through hips and neck | To confirm | Assortment |

## Printed parts

| Item | Specification | Qty | Used for | Status | Notes |
|---|---|---|---|---|---|
| Structural parts | PLA, dark appearance | 19 | Trunk, neck, head base and brackets, hip supports, thighs, shank structures, cradles | CAD | See COMPONENTS.csv in indieduck-cad |
| Exterior shells and caps | PLA, white appearance | 16 | Helmet, face bezel, camera carrier, torso and pelvis panels, hip cowls, thigh/shin/toe caps | CAD | HelmetLower prints upside down |
| Colour parts | PLA, orange appearance | 14 | Feet, jaw, jaw surrounds, head rims, rear bumper, optical rings, torso inlays | CAD | Optical rings and inlays need a retention method |
| Soles | TPU 95A | 2 | Feet | CAD |  |
| Support parts | PLA, structural | 4 | Jaw bearing tower, jaw bearing keeper, jaw bearing plug, neck bearing retainer | CAD | Added to COMPONENTS.csv on 14 October 2026 (were modelled but unlisted) |

## Chip-level detail: Robot HAT rev D1

From Pollen's production BOM (`ASE01187-D1`, 52 lines). Order the board assembled; this is for understanding and sourcing.

| Ref | Part | Function |
|---|---|---|
| U9 | AP63205 | 5 V, 2 A synchronous buck: logic and Radxa supply (not servos) |
| U10, Q2 | LM5050-1 with 5 A N-channel MOSFET | Ideal-diode reverse protection on the input |
| U6, U7, U5 | SN74LVC1G125, SN74LVC1G126, 74LVC1G08 | Half-duplex TTL servo bus buffers and direction logic |
| U8 | GM3088E | RS-485 transceiver (Dynamixel-4 ports; unused with Feetech TTL) |
| U12 | LSM6DSV16X | Body IMU |
| U2, Y1 | TLV320AIC3104 with 12 MHz oscillator | Audio codec |
| U1 | PAM8406D | Class-D speaker amplifier |
| MK1 | MEMS microphone (LCSC C7587901) | Audio input |
| U3 | XC6206P182 | 1.8 V LDO for the codec |
| U4 | CAT24C32 (not fitted) | HAT ID EEPROM |
| J13, J14 / J3, J11 | JST-EH 3-pin / 4-pin | TTL / RS-485 servo bus ports |
| J5 to J8 | JST-SH 4-pin | Qwiic I2C ports |
| J1, J2, J9 | 2-pin screw terminals | Power input and speaker |
| J4 | 2 x 20 female header | Radxa GPIO |
| about 70 parts | Passives, ferrites, diodes, test points | Support |

## Totals

- Servos: 15 (plus 1 to 2 spares). Bearings: 5 x 16x22x4, 1 x 693.
- Modelled fasteners: 28 M2 screws (12 x M2x8, 6 x M2x4, 2 x M2x6 pan, 4 x M2x6 socket, 2 x M2x8 socket, 2 x M2x12), 6 M2 nuts, 1 M3x16, 1 M3 shoulder screw, 1 M3 nut, 2 washers, 2 spacers.
- Derived and to-confirm fasteners: up to 60 horn screws, up to 60 servo case screws, about 30 cover screws, 4 standoffs. Buying a stainless M2 assortment (4, 6, 8, 10, 12 mm) plus M2 nuts covers these.
- Printed parts: 55, all listed with STEP and STL exports in `indieduck-cad` `COMPONENTS.csv`. Sliced so far: 39 parts on seven P2S plates, about 360 g PLA and 34 g TPU.
- Electronics: Radxa Zero 3W, Robot HAT rev D1 (with body IMU, audio and Qwiic), 5 V servo supply, head IMU, one camera (D18), ToF sensor, LED, optional speaker, NP-F550 battery with plate, switch and charger.
- Wires: 15 servo bus cables, 2 bus adapters (plus a splitter under option B), 2 Qwiic cables, camera ribbon, power, speaker and LED leads, cable management.

Open items before a first full build: servo supply sizing (bench current measurement), servo chain option (D20), cover fixings (most cover screw holes have no matching boss yet), SBC standoffs, cable routing, battery plate. See the R25 limits in `indieduck-cad/README.md`.
