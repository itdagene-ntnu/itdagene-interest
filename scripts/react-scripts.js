const { spawnSync } = require('child_process');

const command = process.argv[2];
const supportedCommands = new Set(['build', 'start', 'test']);

if (!supportedCommands.has(command)) {
  console.error('Usage: node scripts/react-scripts.js <build|start|test>');
  process.exit(1);
}

const legacyProviderOption = '--openssl-legacy-provider';
const nodeMajorVersion = Number(process.versions.node.split('.')[0]);
const childEnvironment = { ...process.env };
const nodeOptions = (childEnvironment.NODE_OPTIONS || '')
  .split(/\s+/)
  .filter(Boolean)
  .filter((option) => option !== legacyProviderOption);

if (nodeMajorVersion >= 17) {
  nodeOptions.push(legacyProviderOption);
}

if (nodeOptions.length > 0) {
  childEnvironment.NODE_OPTIONS = nodeOptions.join(' ');
} else {
  delete childEnvironment.NODE_OPTIONS;
}

const result = spawnSync(
  process.execPath,
  [
    require.resolve('react-scripts/bin/react-scripts.js'),
    command,
    ...process.argv.slice(3),
  ],
  {
    env: childEnvironment,
    stdio: 'inherit',
  }
);

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status === null ? 1 : result.status);
