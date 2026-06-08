interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
  meter?: { credits: number };
  cost?: Record<string, unknown>;
  provider?: string;
}

/**
 * Harry Potter API MCP (hp-api.onrender.com) — keyless.
 * Characters / wizards, Hogwarts houses, students & staff, spells.
 */


const BASE = 'https://hp-api.onrender.com/api';
const UA = 'pipeworx/1.0 (+https://pipeworx.io)';

const HOUSES = ['gryffindor', 'slytherin', 'hufflepuff', 'ravenclaw'];

interface HpChar {
  name?: string;
  alternate_names?: string[];
  species?: string;
  gender?: string;
  house?: string;
  dateOfBirth?: string;
  ancestry?: string;
  patronus?: string;
  hogwartsStudent?: boolean;
  hogwartsStaff?: boolean;
  actor?: string;
  alive?: boolean;
  wand?: unknown;
  image?: string;
}

interface HpSpell {
  name?: string;
  description?: string;
}

const mapChar = (c: HpChar) => ({
  name: c.name,
  alternate_names: c.alternate_names,
  species: c.species,
  gender: c.gender,
  house: c.house,
  date_of_birth: c.dateOfBirth,
  ancestry: c.ancestry,
  patronus: c.patronus,
  hogwarts_student: c.hogwartsStudent,
  hogwarts_staff: c.hogwartsStaff,
  actor: c.actor,
  alive: c.alive,
  wand: c.wand,
  image: c.image,
});

const tools: McpToolExport['tools'] = [
  {
    name: 'list_characters',
    description:
      'List Harry Potter characters (wizards, witches, and other figures). Optionally filter by Hogwarts house (Gryffindor, Slytherin, Hufflepuff, Ravenclaw) and/or a name substring.',
    inputSchema: {
      type: 'object',
      properties: {
        house: {
          type: 'string',
          description: 'Hogwarts house: gryffindor, slytherin, hufflepuff, or ravenclaw.',
        },
        search: { type: 'string', description: 'Case-insensitive name substring filter (client-side).' },
      },
    },
  },
  {
    name: 'list_students',
    description: 'List all Hogwarts students from the Harry Potter universe.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'list_staff',
    description: 'List all Hogwarts staff (professors and other employees) from the Harry Potter universe.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'list_spells',
    description: 'List Harry Potter spells with their effects. Optionally filter by a spell-name substring.',
    inputSchema: {
      type: 'object',
      properties: {
        search: { type: 'string', description: 'Case-insensitive spell-name substring filter.' },
      },
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'list_characters': {
      const house = (args.house as string | undefined)?.trim().toLowerCase();
      const search = (args.search as string | undefined)?.trim().toLowerCase();
      const path = house ? `/characters/house/${encodeURIComponent(house)}` : '/characters';
      const data = (await hpGet(path)) as HpChar[];
      let filtered = Array.isArray(data) ? data : [];
      if (search) filtered = filtered.filter((c) => (c.name ?? '').toLowerCase().includes(search));
      return { count: filtered.length, characters: filtered.slice(0, 60).map(mapChar) };
    }
    case 'list_students': {
      const data = await hpGet('/characters/students');
      if (!Array.isArray(data)) return data;
      return { count: data.length, students: data.slice(0, 60).map(mapChar) };
    }
    case 'list_staff': {
      const data = await hpGet('/characters/staff');
      if (!Array.isArray(data)) return data;
      return { count: data.length, staff: data.map(mapChar) };
    }
    case 'list_spells': {
      const search = (args.search as string | undefined)?.trim().toLowerCase();
      const data = (await hpGet('/spells')) as HpSpell[];
      let filtered = Array.isArray(data) ? data : [];
      if (search) filtered = filtered.filter((s) => (s.name ?? '').toLowerCase().includes(search));
      return { count: filtered.length, spells: filtered.map((s) => ({ name: s.name, description: s.description })) };
    }
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function hpGet(path: string): Promise<unknown> {
  const res = await fetch(`${BASE}${path}`, { headers: { Accept: 'application/json', 'User-Agent': UA } });
  if (!res.ok) {
    return { error: res.status, message: await res.text().then((t) => t.slice(0, 200)) };
  }
  return res.json();
}

export default { tools, callTool, meter: { credits: 1 } } satisfies McpToolExport;
