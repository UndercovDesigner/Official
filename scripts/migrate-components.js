const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const uiDirectory = path.join(__dirname, '..', 'components', 'ui');

try {
  const files = fs.readdirSync(uiDirectory);

  const components = files
    .map(file => {
      // Get component name from filename (e.g., 'button.tsx' -> 'button')
      return file.split('.')[0];
    })
    // Filter out hook files that aren't components
    .filter(component => !component.startsWith('use-'));

  console.log(`Found ${components.length} components to migrate...`);

  for (const component of components) {
    console.log(`\nMigrating ${component}...`);
    try {
      // The --yes flag automatically confirms prompts
      // The --overwrite flag ensures existing files are replaced
      const command = `npx shadcn@latest add ${component} --overwrite --yes`;
      // Use stdio: 'inherit' to show the output of the command in real-time
      execSync(command, { stdio: 'inherit' });
      console.log(`✅ Successfully reinstalled ${component}`);
    } catch (error) {
      console.error(`❌ Failed to reinstall ${component}.`);
      // Log the full error for debugging
      console.error(error);
      // Decide if you want to stop on error or continue
      // process.exit(1); 
    }
  }

  console.log('\n🎉 All components have been processed.');

} catch (error) {
  console.error('❌ Could not read the components directory:', error.message);
  process.exit(1);
} 