#!/usr/bin/env python3
"""
Updates latest buttion state to a file. This is intended 
to be run as a daemon. The behaviour here is that we assume
that a press of the button flips the state.
"""
import time
from argparse import ArgumentParser


def parse_args():
    parser = ArgumentParser(description="Updates latest buttion state to a file.")
    parser.add_argument("-f", "--file", type=str, help="Output file name")
    parser.add_argument(
        "-i", "--interval", type=float, default=0.1, help="Interval between checks"
    )
    return parser.parse_args()


def main(args=None):
    if args is None:
        args = parse_args()

    state = 0
    with open(args.file, "w") as f:
        f.write(str(state))

    while True:
        pass


if __name__ == "__main__":
    main()
