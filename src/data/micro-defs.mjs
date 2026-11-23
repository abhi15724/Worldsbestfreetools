// Registry of all micro tools. Each tool is one short definition: category, slug, name, description, fields, run function.
import {parseField} from './micro-lib.mjs';
import a from './micro-everyday.mjs';
import b from './micro-creator.mjs';
import c from './micro-dev.mjs';
import d from './micro-image.mjs';
export const MICRO=[...a,...b,...c,...d];
export const byslug=Object.fromEntries(MICRO.map(m=>[m.s,m]));
export {parseField};
