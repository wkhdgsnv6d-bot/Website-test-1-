#!/usr/bin/env python3
"""
Generates the temporary SVG placeholder imagery used across the Acacia Kitchens
site. Every file it writes is meant to be replaced with a real photograph —
keep the filename, swap the contents, and no HTML needs to change.

Run from the project root:  python3 tools/generate-placeholders.py
"""

import os
import random

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = os.path.join(ROOT, "assets", "img")

# Palettes: (wall top, wall bottom, cabinetry, benchtop, timber, floor)
PALETTES = {
    "charcoal": ("#26282B", "#15171A", "#1E2023", "#E8E6E1", "#B98A5A", "#2E3034"),
    "linen": ("#F3F0EB", "#E4DFD6", "#EFECE6", "#FBFAF8", "#C49A67", "#DCD5C9"),
    "timber": ("#EFE9E1", "#DED5C7", "#A9784B", "#F4F2ED", "#C89A63", "#CFC5B4"),
    "stone": ("#E9E7E3", "#D6D3CD", "#3A3D40", "#F6F5F2", "#BE9264", "#C9C5BD"),
    "night": ("#1A1C1F", "#0E1012", "#232629", "#D9D6D0", "#A87B4E", "#1F2124"),
    "warm": ("#F6F1E9", "#E8DFD1", "#4A4238", "#F2EDE4", "#D2A874", "#DCD1BF"),
}

ORDER = list(PALETTES.keys())


def esc(text):
    return (
        text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    )


def scene(width, height, palette, seed, label, variant=0):
    """An abstract, deliberately non-photographic stand-in for a kitchen shot."""
    rng = random.Random(seed)
    wall_a, wall_b, cab, bench, timber, floor = PALETTES[palette]
    uid = f"g{seed}"
    p = []
    a = p.append

    a(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" '
      f'width="{width}" height="{height}" role="img" aria-label="{esc(label)}" '
      f'preserveAspectRatio="xMidYMid slice">')
    a("<defs>")
    a(f'<linearGradient id="{uid}wall" x1="0" y1="0" x2="0" y2="1">'
      f'<stop offset="0" stop-color="{wall_a}"/><stop offset="1" stop-color="{wall_b}"/></linearGradient>')
    a(f'<linearGradient id="{uid}tim" x1="0" y1="0" x2="1" y2="1">'
      f'<stop offset="0" stop-color="{timber}"/>'
      f'<stop offset="0.55" stop-color="{timber}" stop-opacity="0.82"/>'
      f'<stop offset="1" stop-color="#8A5F37"/></linearGradient>')
    a(f'<linearGradient id="{uid}bench" x1="0" y1="0" x2="1" y2="0">'
      f'<stop offset="0" stop-color="{bench}"/><stop offset="1" stop-color="{bench}" stop-opacity="0.86"/></linearGradient>')
    a(f'<linearGradient id="{uid}light" x1="0.2" y1="0" x2="0.8" y2="1">'
      f'<stop offset="0" stop-color="#FFFFFF" stop-opacity="0.30"/>'
      f'<stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/></linearGradient>')
    a(f'<linearGradient id="{uid}vig" x1="0" y1="0" x2="0" y2="1">'
      f'<stop offset="0" stop-color="#000000" stop-opacity="0.18"/>'
      f'<stop offset="0.45" stop-color="#000000" stop-opacity="0"/>'
      f'<stop offset="1" stop-color="#000000" stop-opacity="0.26"/></linearGradient>')
    a("</defs>")

    # Wall + floor
    a(f'<rect width="{width}" height="{height}" fill="url(#{uid}wall)"/>')
    floor_y = int(height * 0.74)
    a(f'<rect y="{floor_y}" width="{width}" height="{height - floor_y}" fill="{floor}"/>')

    # Raking window light
    a(f'<polygon points="{int(width*0.05)},0 {int(width*0.46)},0 {int(width*0.30)},{height} '
      f'{int(width*-0.06)},{height}" fill="url(#{uid}light)"/>')

    # Overhead cabinetry
    top_y = int(height * 0.08)
    top_h = int(height * 0.26)
    a(f'<rect x="{int(width*0.52)}" y="{top_y}" width="{int(width*0.44)}" height="{top_h}" '
      f'fill="{cab}" rx="{max(2, int(width*0.004))}"/>')
    doors = 4 if variant % 2 == 0 else 3
    seg = (width * 0.44) / doors
    for i in range(1, doors):
        x = int(width * 0.52 + seg * i)
        a(f'<line x1="{x}" y1="{top_y}" x2="{x}" y2="{top_y+top_h}" stroke="#000" stroke-opacity="0.16" stroke-width="2"/>')
    for i in range(doors):
        hx = int(width * 0.52 + seg * i + seg * 0.5)
        a(f'<rect x="{hx - int(seg*0.16)}" y="{top_y + top_h - int(height*0.035)}" '
          f'width="{int(seg*0.32)}" height="{max(3, int(height*0.006))}" fill="#C7A15A" fill-opacity="0.85" rx="2"/>')

    # Splashback
    a(f'<rect x="{int(width*0.52)}" y="{top_y+top_h}" width="{int(width*0.44)}" '
      f'height="{int(height*0.16)}" fill="{bench}" fill-opacity="0.55"/>')

    # Tall timber joinery bank
    a(f'<rect x="{int(width*0.03)}" y="{int(height*0.06)}" width="{int(width*0.20)}" '
      f'height="{int(height*0.68)}" fill="url(#{uid}tim)"/>')
    for i in range(7):
        gy = int(height * 0.06) + rng.randint(10, int(height * 0.66))
        a(f'<line x1="{int(width*0.03)}" y1="{gy}" x2="{int(width*0.23)}" y2="{gy + rng.randint(-6, 6)}" '
          f'stroke="#5E3F22" stroke-opacity="0.13" stroke-width="{rng.choice([1,1,2])}"/>')

    # Island / base run + stone benchtop
    isl_y = int(height * 0.52)
    a(f'<rect x="{int(width*0.28)}" y="{isl_y}" width="{int(width*0.60)}" height="{int(height*0.24)}" fill="{cab}"/>')
    a(f'<rect x="{int(width*0.26)}" y="{isl_y - int(height*0.045)}" width="{int(width*0.64)}" '
      f'height="{int(height*0.05)}" fill="url(#{uid}bench)" rx="{max(2, int(height*0.006))}"/>')
    for i in range(5):
        vx = int(width * 0.28) + rng.randint(0, int(width * 0.58))
        a(f'<line x1="{vx}" y1="{isl_y - int(height*0.042)}" x2="{vx + rng.randint(20, 90)}" '
          f'y2="{isl_y - int(height*0.012)}" stroke="#8E8A82" stroke-opacity="0.22" stroke-width="1"/>')

    # Pendant lights
    pendants = 3 if variant % 3 != 1 else 2
    for i in range(pendants):
        px = int(width * (0.36 + i * (0.44 / max(1, pendants - 1) if pendants > 1 else 0)))
        a(f'<line x1="{px}" y1="0" x2="{px}" y2="{int(height*0.30)}" stroke="#C7A15A" stroke-opacity="0.55" stroke-width="2"/>')
        a(f'<circle cx="{px}" cy="{int(height*0.33)}" r="{int(height*0.035)}" fill="#C7A15A" fill-opacity="0.28"/>')
        a(f'<circle cx="{px}" cy="{int(height*0.33)}" r="{int(height*0.016)}" fill="#F6E3BC" fill-opacity="0.75"/>')

    a(f'<rect width="{width}" height="{height}" fill="url(#{uid}vig)"/>')

    # Discreet placeholder marker so staff can spot un-swapped imagery
    fs = max(9, int(min(width, height) * 0.028))
    a(f'<text x="{width - int(width*0.03)}" y="{height - int(height*0.045)}" text-anchor="end" '
      f'font-family="Helvetica, Arial, sans-serif" font-size="{fs}" letter-spacing="{fs*0.18:.1f}" '
      f'fill="#FFFFFF" fill-opacity="0.42">PLACEHOLDER</text>')
    a("</svg>")
    return "\n".join(p)


def write(path, content):
    full = os.path.join(IMG, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, "w", encoding="utf-8") as fh:
        fh.write(content)


SERVICES = [
    "custom-kitchens", "kitchen-renovations", "bathroom-vanities", "laundry-cabinetry",
    "wardrobes", "walk-in-robes", "entertainment-units", "tv-units",
    "home-office-cabinetry", "storage-solutions", "commercial-cabinetry",
    "reception-counters", "shop-fit-outs", "custom-joinery",
    "cabinet-manufacturing", "cabinet-installation", "outdoor-kitchens",
]

PROJECTS = [
    "riverside-entertainer", "coastal-galley", "hillside-butlers",
    "queenslander-restoration", "alfresco-outdoor-kitchen", "executive-office-fitout",
    "master-suite-robe", "boutique-retail-counter",
]


def main():
    # Hero + key feature imagery
    write("hero-kitchen.svg", scene(1920, 1080, "charcoal", 1, "Custom kitchen by Acacia Kitchens — placeholder image", 0))
    write("about-workshop.svg", scene(1200, 900, "timber", 2, "Acacia Kitchens workshop — placeholder image", 1))
    write("about-team.svg", scene(1200, 900, "warm", 3, "The Acacia Kitchens team — placeholder image", 2))
    write("awards-feature.svg", scene(1400, 900, "night", 4, "Award-winning outdoor kitchen — placeholder image", 0))
    write("process-feature.svg", scene(1400, 900, "linen", 5, "Design consultation — placeholder image", 1))
    write("cta-texture.svg", scene(1920, 900, "night", 6, "Custom cabinetry detail — placeholder image", 2))
    write("contact-showroom.svg", scene(1200, 800, "stone", 7, "Acacia Kitchens showroom — placeholder image", 0))
    write("og-image.svg", scene(1200, 630, "charcoal", 8, "Acacia Kitchens — custom kitchens Townsville", 0))

    for i, slug in enumerate(SERVICES):
        write(f"services/{slug}.svg",
              scene(1200, 900, ORDER[i % len(ORDER)], 100 + i,
                    f"{slug.replace('-', ' ').title()} — placeholder image", i))

    for i, slug in enumerate(PROJECTS):
        for shot in range(1, 4):
            write(f"projects/{slug}-{shot}.svg",
                  scene(1600, 1100, ORDER[(i + shot) % len(ORDER)], 200 + i * 10 + shot,
                        f"{slug.replace('-', ' ').title()} — placeholder image {shot}", i + shot))

    for i in range(1, 7):
        write(f"instagram/post-{i}.svg",
              scene(800, 800, ORDER[i % len(ORDER)], 300 + i,
                    f"Instagram post {i} — placeholder image", i))

    print("Placeholder imagery written to assets/img/")


if __name__ == "__main__":
    main()
