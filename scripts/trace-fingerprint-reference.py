from __future__ import annotations

import math
import sys
from collections import defaultdict
from pathlib import Path

import numpy as np
from PIL import Image


Point = tuple[int, int]


def perpendicular_distance(point: Point, start: Point, end: Point) -> float:
    if start == end:
        return math.dist(point, start)

    x, y = point
    x1, y1 = start
    x2, y2 = end
    numerator = abs((y2 - y1) * x - (x2 - x1) * y + x2 * y1 - y2 * x1)
    denominator = math.hypot(y2 - y1, x2 - x1)
    return numerator / denominator


def rdp(points: list[Point], epsilon: float) -> list[Point]:
    if len(points) < 3:
        return points

    start = points[0]
    end = points[-1]
    distance = 0.0
    index = 0

    for candidate_index, point in enumerate(points[1:-1], start=1):
        candidate_distance = perpendicular_distance(point, start, end)
        if candidate_distance > distance:
            distance = candidate_distance
            index = candidate_index

    if distance <= epsilon:
        return [start, end]

    left = rdp(points[: index + 1], epsilon)
    right = rdp(points[index:], epsilon)
    return left[:-1] + right


def simplify_closed(points: list[Point], epsilon: float = 1.6) -> list[Point]:
    points = points[:-1]
    if len(points) < 6:
        return points

    left_index = min(range(len(points)), key=lambda index: (points[index][0], points[index][1]))
    right_index = max(range(len(points)), key=lambda index: (points[index][0], points[index][1]))

    if left_index > right_index:
        left_index, right_index = right_index, left_index

    first_chain = points[left_index : right_index + 1]
    second_chain = points[right_index:] + points[: left_index + 1]
    return rdp(first_chain, epsilon)[:-1] + rdp(second_chain, epsilon)[:-1]


def trace_boundaries(mask: np.ndarray) -> list[list[Point]]:
    height, width = mask.shape
    outgoing: dict[Point, list[Point]] = defaultdict(list)

    for y in range(height):
        for x in range(width):
            if not mask[y, x]:
                continue

            if y == 0 or not mask[y - 1, x]:
                outgoing[(x, y)].append((x + 1, y))
            if x == width - 1 or not mask[y, x + 1]:
                outgoing[(x + 1, y)].append((x + 1, y + 1))
            if y == height - 1 or not mask[y + 1, x]:
                outgoing[(x + 1, y + 1)].append((x, y + 1))
            if x == 0 or not mask[y, x - 1]:
                outgoing[(x, y + 1)].append((x, y))

    unused = {(start, end) for start, ends in outgoing.items() for end in ends}
    contours: list[list[Point]] = []
    direction_index = {(1, 0): 0, (0, 1): 1, (-1, 0): 2, (0, -1): 3}

    while unused:
        start_edge = next(iter(unused))
        start, current = start_edge
        unused.remove(start_edge)
        contour = [start, current]
        previous = start

        while current != start:
            candidates = [end for end in outgoing[current] if (current, end) in unused]
            if not candidates:
                break

            incoming_direction = direction_index[(current[0] - previous[0], current[1] - previous[1])]

            def turn_priority(candidate: Point) -> int:
                outgoing_direction = direction_index[(candidate[0] - current[0], candidate[1] - current[1])]
                turn = (outgoing_direction - incoming_direction) % 4
                return {1: 0, 0: 1, 3: 2, 2: 3}[turn]

            next_point = min(candidates, key=turn_priority)
            unused.remove((current, next_point))
            previous, current = current, next_point
            contour.append(current)

        if contour[-1] == contour[0] and len(contour) > 8:
            contours.append(simplify_closed(contour))

    return contours


def format_number(number: float) -> str:
    rounded = round(number, 2)
    if rounded.is_integer():
        return str(int(rounded))
    return f"{rounded:.2f}".rstrip("0").rstrip(".")


def contour_to_bezier(contour: list[Point]) -> str:
    commands = [f"M{format_number(contour[0][0])} {format_number(contour[0][1])}"]
    count = len(contour)

    for index in range(count):
        previous = contour[(index - 1) % count]
        current = contour[index]
        following = contour[(index + 1) % count]
        after_following = contour[(index + 2) % count]
        first_control = (
            current[0] + (following[0] - previous[0]) / 6,
            current[1] + (following[1] - previous[1]) / 6,
        )
        second_control = (
            following[0] - (after_following[0] - current[0]) / 6,
            following[1] - (after_following[1] - current[1]) / 6,
        )
        commands.append(
            "C"
            f"{format_number(first_control[0])} {format_number(first_control[1])} "
            f"{format_number(second_control[0])} {format_number(second_control[1])} "
            f"{format_number(following[0])} {format_number(following[1])}"
        )

    commands.append("Z")
    return "".join(commands)


def polygon_area(contour: list[Point]) -> float:
    return sum(
        contour[index][0] * contour[(index + 1) % len(contour)][1]
        - contour[(index + 1) % len(contour)][0] * contour[index][1]
        for index in range(len(contour))
    ) / 2


def main() -> None:
    source_path = Path(sys.argv[1])
    output_path = Path(sys.argv[2])
    image = Image.open(source_path).convert("L")
    pixels = np.asarray(image)
    mask = pixels < 145

    ys, xs = np.where(mask)
    margin = 4
    min_x = max(int(xs.min()) - margin, 0)
    max_x = min(int(xs.max()) + margin + 1, image.width)
    min_y = max(int(ys.min()) - margin, 0)
    max_y = min(int(ys.max()) + margin + 1, image.height)

    cropped_mask = mask[min_y:max_y, min_x:max_x]
    contours = trace_boundaries(cropped_mask)

    path_parts: list[str] = []
    for contour in contours:
        if len(contour) < 3 or abs(polygon_area(contour)) < 16:
            continue
        path_parts.append(contour_to_bezier(contour))

    width = max_x - min_x
    height = max_y - min_y
    svg = (
        '<svg xmlns="http://www.w3.org/2000/svg" '
        f'viewBox="0 0 {width} {height}" role="img" aria-label="Fingerprint">'
        '<path fill="#142441" fill-rule="evenodd" d="'
        + "".join(path_parts)
        + '"/></svg>\n'
    )

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(svg, encoding="utf-8")


if __name__ == "__main__":
    main()
