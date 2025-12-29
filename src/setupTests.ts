import * as matchers from '@testing-library/jest-dom/matchers';
import {expect} from 'vitest';

const rawMatchers: unknown = (matchers as { default?: unknown }).default ?? matchers;
const jestDomMatchers = rawMatchers as Parameters<typeof expect.extend>[0];

expect.extend(jestDomMatchers);
