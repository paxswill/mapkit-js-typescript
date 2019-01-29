#!/usr/bin/env python3
import collections
import sys
import pprint

def format_input(full_string):
    starting = full_string.strip().rstrip()
    lines = starting.split('\n')
    props = collections.OrderedDict()
    line_iter = iter(lines)
    for line in line_iter:
        line = line.strip().rstrip()
        if ' ' in line:
            continue
        next_line = next(line_iter)
        props[line] = next_line
    return props

def print_props(props):
    entries = []
    for prop, doc in props.items():
        sub_entry = []
        sub_entry.append(f'/** {doc} */')
        if 'boolean' in doc or 'Boolean' in doc:
            data_type = 'boolean'
        elif 'integer' in doc or 'Integer' in doc:
            data_type = 'number'
        elif 'number' in doc or 'Number' in doc:
            data_type = 'number'
        else:
            data_type = 'any'
        sub_entry.append(f'{prop}: {data_type}')
        entries.append('\n'.join(sub_entry))
    print('\n\n'.join(entries))

if __name__ == '__main__':
    all_input = sys.stdin.read()
    props = format_input(all_input)
    print_props(props)
